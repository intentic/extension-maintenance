import { choreById } from "../chores/chores.ts";
import { PROBES } from "../chores/probes.ts";
import { ChoreLedgerWriteSchema, ChoreProbeRequestSchema, type ChoresReport } from "../chores/schema.ts";
import type { ProbeRunner } from "./probe-runner.ts";
import type { SharedChoreSignals } from "./signals.ts";
import type { ChoresStore } from "./store.ts";

// This backend's namespace (`/x/<id>/…`, prefix stripped), which the views reach through `api.backend`:
//   GET  /report  every repo's standing evidence in one read, since the rail badge polls all of it on a timer
//   POST /probe   measure one repo again now; answers at once, the result arrives in the next report
//   POST /ledger  record a verdict, or snooze one: a chore has one current answer
// The daemon's GET /chores, POST /chores/probe and POST /chores/ledger until 2026-11-26, with the same bodies. No
// run-a-chore route: a chore run is an ordinary isolated agent turn (POST /agent). No verdicts either: this serves
// measurements, and the book (src/chores/verdict.ts) decides what's due in the browser.

// "root" is the wire id for the workspace's own repo; the filesystem and the probe cache call it the empty string.
export const REPO_ROOT = `root`;
const repoDir = (repo: string): string => (repo === REPO_ROOT ? `` : repo);
const repoId = (dir: string): string => (dir === `` ? REPO_ROOT : dir);

export interface RoutesDeps {
    readonly store: ChoresStore;
    readonly runner: ProbeRunner;
    readonly signals: SharedChoreSignals;
    // Every repo the daemon discovers under the workspace root, by its wire id; the root's own is not among them.
    readonly repos: () => Promise<readonly string[]>;
    readonly log: (message: string) => void;
    // The runtime the sandbox runs on, read off the process rather than off a manifest.
    readonly node: string;
}

const json = (body: unknown, status = 200): Response => Response.json(body, { status });
const refuse = (status: number, message: string): Response => json({ message }, status);

const bodyOf = async (request: Request): Promise<unknown> => {
    try {
        return (await request.json()) as unknown;
    } catch {
        return undefined;
    }
};

export const choresRoutes = (deps: RoutesDeps) => {
    const knownRepo = async (repo: string): Promise<boolean> => repo === REPO_ROOT || (await deps.repos()).includes(repo);

    const report = async (): Promise<ChoresReport> => {
        const asked = deps.signals.asked();
        const cache = await deps.store.probes();
        // One repo after another, not all at once: a walk per repo at once would compete with the search box's own.
        const repos = [];
        for (const repo of [REPO_ROOT, ...(await deps.repos())]) {
            repos.push({ repo, probes: Object.values(cache[repoDir(repo)] ?? {}), signals: await deps.signals.of(repoDir(repo), asked) });
        }
        return {
            repos,
            ledger: await deps.store.ledger(),
            // Read here, not a route of its own, so a probe finishing mid-read can't show as both done and running.
            running: deps.runner.running().map(({ repo, id, askedAt, startedAt }) => ({ repo: repoId(repo), id, askedAt, startedAt })),
            node: deps.node,
        };
    };

    const probe = async (request: Request): Promise<Response> => {
        const parsed = ChoreProbeRequestSchema.safeParse(await bodyOf(request));
        if (!parsed.success) {
            return refuse(400, `expected { repo, id }, with id one of ${PROBES.map((spec) => spec.id).join(`, `)}`);
        }
        const { repo, id } = parsed.data;
        if (!(await knownRepo(repo))) {
            return refuse(404, `no repo named "${repo}"`);
        }
        // Not awaited: refresh queues the measurement and returns; the report shows it as running right away.
        void deps.runner.refresh(repoDir(repo), id).catch((error: unknown) => {
            deps.log(`the ${id} probe asked for on ${repo} failed: ${error instanceof Error ? error.message : String(error)}`);
        });
        return json({ ok: true });
    };

    const record = async (request: Request): Promise<Response> => {
        const parsed = ChoreLedgerWriteSchema.safeParse(await bodyOf(request));
        if (!parsed.success) {
            return refuse(400, `expected a ledger entry: ${parsed.error.issues.map((issue) => `${issue.path.join(`.`)} ${issue.message}`).join(`; `)}`);
        }
        if (!(await knownRepo(parsed.data.repo))) {
            return refuse(404, `no repo named "${parsed.data.repo}"`);
        }
        // An unknown chore id would render as a ledger row the panel can't show, indistinguishable from data loss.
        if (choreById(parsed.data.chore) === undefined) {
            return refuse(400, `no chore named "${parsed.data.chore}"`);
        }
        await deps.store.recordLedger(parsed.data);
        return json({ ok: true });
    };

    /** The namespace's handler; `undefined` for a path that is not this backend's, which the host answers 404. */
    return async (request: Request): Promise<Response | undefined> => {
        const { pathname } = new URL(request.url);
        const route = `${request.method} /${pathname.replace(/^\/+|\/+$/gu, ``)}`;
        switch (route) {
            case `GET /report`:
                return json(await report());
            case `POST /probe`:
                return await probe(request);
            case `POST /ledger`:
                return await record(request);
            default:
                return undefined;
        }
    };
};
