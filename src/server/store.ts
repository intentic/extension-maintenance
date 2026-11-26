import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { type ChoreLedgerEntry, ChoreLedgerEntrySchema, type ProbeId, type ProbeResult, ProbeResultSchema } from "../chores/schema.ts";

// The probe cache and the ledger of what was done about each chore: two files under .intentic/records/chores/, the
// same two the daemon kept until 2026-11-26 (chores/chores-store.ts there), so a sandbox that ran the daemon's probes
// keeps its measurements and its verdicts when this backend takes over. In the workspace's .intentic, not this
// extension's state directory: both are point-in-time evidence about this workspace that isolated turns read and a
// bundle carries (`carry` in the contract's workspace-state table), and the manifest's `contributes.files` invalidates
// the views' reads on a write here. One file each, not one per repo, since the rail badge reads them whole.
//
// Read leniently and written by changing only what moved: an entry this version cannot read (one a newer version wrote)
// is skipped on read and kept as it was on write, and a file that is not JSON at all is read as empty and never
// written over.

export const CHORES_DIR = join(".intentic", "records", "chores");
export const PROBES_FILE = join(CHORES_DIR, "probes.json");
export const LEDGER_FILE = join(CHORES_DIR, "ledger.json");

// repo -> probe id -> its last result; the workspace's own root repo is keyed by the empty string.
export type ProbeCache = Readonly<Record<string, Readonly<Partial<Record<ProbeId, ProbeResult>>>>>;

type Json = unknown;

const isObject = (value: Json): value is Record<string, Json> => typeof value === `object` && value !== null && !Array.isArray(value);

// The file's JSON, `undefined` when it does not exist yet; a file that exists but does not parse throws, so nothing
// writes over it.
const readRaw = async (path: string): Promise<Json> => {
    let text: string;
    try {
        text = await readFile(path, `utf8`);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === `ENOENT`) {
            return undefined;
        }
        throw error;
    }
    try {
        return JSON.parse(text) as Json;
    } catch {
        throw new Error(`${path} is not JSON; left as it is`);
    }
};

// Written whole through a rename, so a reader (the views, a turn's shell) never sees half of it.
const writeRaw = async (path: string, value: Json): Promise<void> => {
    await mkdir(dirname(path), { recursive: true });
    const scratch = `${path}.${process.pid}.${Date.now().toString(36)}.tmp`;
    await writeFile(scratch, `${JSON.stringify(value, undefined, 2)}\n`);
    await rename(scratch, path);
};

// One file's read-change-write, serialized against every other change to it from this process. `change` answering
// its input unchanged writes nothing.
const jsonFile = (path: string) => {
    let queue: Promise<unknown> = Promise.resolve();
    return {
        read: async (): Promise<Json> => await readRaw(path).catch(() => undefined),
        update: (change: (raw: Json) => Json): Promise<void> => {
            const next = queue.then(async () => {
                const raw = await readRaw(path);
                const changed = change(raw);
                if (changed !== raw) {
                    await writeRaw(path, changed);
                }
            });
            queue = next.catch(() => undefined);
            return next;
        },
    };
};

const probesOf = (raw: Json): ProbeCache => {
    if (!isObject(raw)) {
        return {};
    }
    return Object.fromEntries(
        Object.entries(raw).map(([repo, probes]) => [
            repo,
            Object.fromEntries(
                Object.entries(isObject(probes) ? probes : {}).flatMap(([id, result]) => {
                    const parsed = ProbeResultSchema.safeParse(result);
                    return parsed.success && parsed.data.id === id ? [[id, parsed.data]] : [];
                }),
            ),
        ]),
    );
};

const ledgerOf = (raw: Json): ChoreLedgerEntry[] =>
    (Array.isArray(raw) ? raw : []).flatMap((entry: Json) => {
        const parsed = ChoreLedgerEntrySchema.safeParse(entry);
        return parsed.success ? [parsed.data] : [];
    });

export interface ChoresStore {
    readonly probes: () => Promise<ProbeCache>;
    readonly probesFor: (repo: string) => Promise<ProbeResult[]>;
    readonly recordProbe: (repo: string, result: ProbeResult) => Promise<void>;
    readonly ledger: () => Promise<ChoreLedgerEntry[]>;
    // Upserts by repo + chore: one current verdict, no growing history of past runs.
    readonly recordLedger: (entry: ChoreLedgerEntry) => Promise<void>;
    // Drops cached results for repos that no longer exist, so a deleted clone's data doesn't linger.
    readonly pruneProbes: (repos: readonly string[]) => Promise<void>;
}

/** The store over `<workspaceRoot>/.intentic/records/chores/`. */
export const choresStore = (workspaceRoot: string): ChoresStore => {
    const probeFile = jsonFile(join(workspaceRoot, PROBES_FILE));
    const ledgerFile = jsonFile(join(workspaceRoot, LEDGER_FILE));
    const probes = async (): Promise<ProbeCache> => probesOf(await probeFile.read());
    return {
        probes,
        probesFor: async (repo) => Object.values((await probes())[repo] ?? {}),
        recordProbe: (repo, result) =>
            probeFile.update((raw) => {
                const cache = isObject(raw) ? raw : {};
                const held = cache[repo];
                return { ...cache, [repo]: { ...(isObject(held) ? held : {}), [result.id]: result } };
            }),
        ledger: async () => ledgerOf(await ledgerFile.read()),
        recordLedger: (entry) =>
            ledgerFile.update((raw) => {
                const rows = Array.isArray(raw) ? (raw as Json[]) : [];
                // Only rows this version reads are matched; one it cannot read is kept as it was.
                const same = (row: Json): boolean => {
                    const parsed = ChoreLedgerEntrySchema.safeParse(row);
                    return parsed.success && parsed.data.repo === entry.repo && parsed.data.chore === entry.chore;
                };
                return [...rows.filter((row) => !same(row)), entry];
            }),
        pruneProbes: (repos) =>
            probeFile.update((raw) => {
                if (!isObject(raw)) {
                    return raw;
                }
                const live = new Set(repos);
                const kept = Object.entries(raw).filter(([repo]) => live.has(repo));
                // Unchanged by reference when nothing was dropped, so the common case writes nothing.
                return kept.length === Object.keys(raw).length ? raw : Object.fromEntries(kept);
            }),
    };
};

// Retry lease for a failed/unavailable probe (not a real measurement), distinct from an ok result's TTL.
const RETRY_MS = 3_600_000;

// A result is stale once older than its lease (TTL for ok, RETRY_MS otherwise). Shared by the sweep and the on-demand
// route so "stale" can't drift between them.
export const isStale = (result: ProbeResult | undefined, ttlMs: number, nowMs: number): boolean =>
    result === undefined || nowMs - result.ranAt >= (result.state === `ok` ? ttlMs : RETRY_MS);

export const probeOf = (cache: ProbeCache, repo: string, id: ProbeId): ProbeResult | undefined => cache[repo]?.[id];
