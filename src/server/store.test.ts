import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import type { ChoreLedgerEntry, ProbeResult } from "../chores/schema.ts";
import { choresStore, isStale, LEDGER_FILE, PROBES_FILE } from "./store.ts";

// Moved with the store from the daemon's chores/chores.integration.test.ts (2026-11-26), with what taking over the
// daemon's files asks of it.

const dirs: string[] = [];
const workspace = async (): Promise<string> => {
    const dir = await mkdtemp(join(tmpdir(), `chores-store-`));
    dirs.push(dir);
    return dir;
};
afterEach(async () => {
    await Promise.all(dirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

const result = (over: Partial<ProbeResult> & Pick<ProbeResult, "id">): ProbeResult => ({ state: `ok`, ranAt: 1, tookMs: 1, ...over });
const entry = (over: Partial<ChoreLedgerEntry> = {}): ChoreLedgerEntry => ({
    repo: `app`,
    chore: `dead-code`,
    ranAt: 1,
    runId: `r1`,
    outcome: `acted`,
    digest: `abc`,
    ...over,
});

describe(`the store`, () => {
    test(`keeps one result per repo per probe, and one ledger row per repo per chore`, async () => {
        const chores = choresStore(await workspace());
        await chores.recordProbe(`app`, result({ id: `outdated` }));
        await chores.recordProbe(`app`, result({ id: `audit` }));
        await chores.recordProbe(`app`, result({ id: `outdated`, ranAt: 2 }));
        expect(await chores.probesFor(`app`)).toHaveLength(2);
        expect((await chores.probesFor(`app`)).find((probe) => probe.id === `outdated`)?.ranAt).toBe(2);

        await chores.recordLedger(entry());
        await chores.recordLedger(entry({ digest: `def` }));
        await chores.recordLedger(entry({ chore: `duplication` }));
        expect(await chores.ledger()).toHaveLength(2);
        expect((await chores.ledger()).find((row) => row.chore === `dead-code`)?.digest).toBe(`def`);
    });

    test(`repos keep their own measurements`, async () => {
        const chores = choresStore(await workspace());
        await chores.recordProbe(`app`, result({ id: `outdated` }));
        await chores.recordProbe(``, result({ id: `outdated` }));
        expect(await chores.probesFor(`app`)).toHaveLength(1);
        expect(await chores.probesFor(``)).toHaveLength(1);
        expect(await chores.probesFor(`never-existed`)).toEqual([]);
    });

    test(`prune drops repos that no longer exist and leaves the rest`, async () => {
        const chores = choresStore(await workspace());
        await chores.recordProbe(`app`, result({ id: `outdated` }));
        await chores.recordProbe(`gone`, result({ id: `outdated` }));
        await chores.pruneProbes([``, `app`]);
        expect(await chores.probesFor(`app`)).toHaveLength(1);
        expect(await chores.probesFor(`gone`)).toEqual([]);
    });

    test(`writes made at once all land`, async () => {
        const chores = choresStore(await workspace());
        await Promise.all([`outdated`, `audit`, `knip`, `jscpd`].map((id) => chores.recordProbe(`app`, result({ id: id as ProbeResult["id"] }))));
        expect(await chores.probesFor(`app`)).toHaveLength(4);
    });

    test(`staleness is measured from when the probe completed, and an absent one is always stale`, () => {
        expect(isStale(undefined, 100, 1000)).toBe(true);
        expect(isStale(result({ id: `audit`, ranAt: 950 }), 100, 1000)).toBe(false);
        expect(isStale(result({ id: `audit`, ranAt: 900 }), 100, 1000)).toBe(true);
    });

    test(`a probe that did not measure is retried on the hour, whatever its TTL`, () => {
        const week = 7 * 86_400_000;
        const hour = 3_600_000;
        for (const state of [`failed`, `unavailable`] as const) {
            expect(isStale(result({ id: `knip`, state, ranAt: 0 }), week, hour - 1)).toBe(false);
            expect(isStale(result({ id: `knip`, state, ranAt: 0 }), week, hour)).toBe(true);
        }
        // A real measurement (state ok) still gets the full week, not the hourly retry.
        expect(isStale(result({ id: `knip`, ranAt: 0 }), week, hour)).toBe(false);
    });
});

// The daemon wrote these two files until 2026-11-26; this backend reads the same paths, so a sandbox keeps its
// measurements and its verdicts across the move without anything converting them.
describe(`the daemon's files`, () => {
    const seed = async (files: Record<string, string>): Promise<string> => {
        const root = await workspace();
        for (const [path, content] of Object.entries(files)) {
            await mkdir(join(root, path, `..`), { recursive: true });
            await writeFile(join(root, path), content);
        }
        return root;
    };

    test(`a cache and a ledger the daemon left are read as they are`, async () => {
        const root = await seed({
            [PROBES_FILE]: JSON.stringify({ "": { audit: result({ id: `audit`, ranAt: 5 }) }, app: { knip: result({ id: `knip`, state: `failed`, reason: `x` }) } }),
            [LEDGER_FILE]: JSON.stringify([entry(), entry({ repo: `root`, chore: `security-advisories`, outcome: `clean`, snoozedUntil: 9 })]),
        });
        const chores = choresStore(root);
        expect(await chores.probesFor(``)).toEqual([result({ id: `audit`, ranAt: 5 })]);
        expect(await chores.probesFor(`app`)).toEqual([result({ id: `knip`, state: `failed`, reason: `x` })]);
        expect(await chores.ledger()).toHaveLength(2);
    });

    test(`an entry this version cannot read is skipped on read and kept as it was on write`, async () => {
        const unknownRow = { repo: `app`, chore: `dead-code`, verdict: `from a newer build` };
        const unknownProbe = { id: `lighthouse`, state: `ok`, ranAt: 1, tookMs: 1 };
        const root = await seed({
            [PROBES_FILE]: JSON.stringify({ app: { lighthouse: unknownProbe } }),
            [LEDGER_FILE]: JSON.stringify([unknownRow]),
        });
        const chores = choresStore(root);
        expect(await chores.ledger()).toEqual([]);
        expect(await chores.probesFor(`app`)).toEqual([]);
        await chores.recordLedger(entry());
        await chores.recordProbe(`app`, result({ id: `audit` }));
        expect(JSON.parse(await readFile(join(root, LEDGER_FILE), `utf8`))).toEqual([unknownRow, entry()]);
        expect(JSON.parse(await readFile(join(root, PROBES_FILE), `utf8`))).toEqual({ app: { lighthouse: unknownProbe, audit: result({ id: `audit` }) } });
    });

    test(`a file that is not JSON is read as empty and never written over`, async () => {
        const root = await seed({ [LEDGER_FILE]: `{ half a write` });
        const chores = choresStore(root);
        expect(await chores.ledger()).toEqual([]);
        await expect(chores.recordLedger(entry())).rejects.toThrow(`not JSON`);
        expect(await readFile(join(root, LEDGER_FILE), `utf8`)).toBe(`{ half a write`);
    });
});
