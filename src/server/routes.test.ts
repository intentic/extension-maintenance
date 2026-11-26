import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { ChoresReportSchema } from "../chores/schema.ts";
import { createProbeRunner } from "./probe-runner.ts";
import { choresRoutes } from "./routes.ts";
import { sharedChoreSignals } from "./signals.ts";
import { choresStore } from "./store.ts";
import { localExec } from "./testing.ts";

// The three routes the views reach through `api.backend`, which the daemon served as GET /chores, POST /chores/probe and
// POST /chores/ledger until 2026-11-26: the same bodies, the same refusals.

const dirs: string[] = [];
afterEach(async () => {
    await Promise.all(dirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

const backend = async () => {
    const root = await mkdtemp(join(tmpdir(), `chores-routes-`));
    dirs.push(root);
    const store = choresStore(root);
    const repos = async (): Promise<readonly string[]> => [`app`];
    const runner = createProbeRunner({ root, store, exec: localExec, repos, live: () => false, log: () => undefined });
    const signals = sharedChoreSignals({ root, codeFiles: async () => 3, log: () => undefined });
    const handle = choresRoutes({ store, runner, signals, repos, log: () => undefined, node: `v24.0.0` });
    const call = async (method: string, path: string, body?: unknown): Promise<Response | undefined> =>
        await handle(
            new Request(`http://backend${path}`, {
                method,
                ...(body === undefined ? {} : { body: JSON.stringify(body), headers: { "content-type": `application/json` } }),
            }),
        );
    return { store, runner, call };
};

const entry = { repo: `app`, chore: `dead-code`, ranAt: 1, runId: `r1`, outcome: `acted`, digest: `abc` };

describe(`GET /report`, () => {
    test(`every repo's evidence, the workspace's own first under its wire id, with the ledger and the runtime`, async () => {
        const { store, call } = await backend();
        await store.recordProbe(``, { id: `audit`, state: `ok`, ranAt: 1, tookMs: 1 });
        await store.recordLedger({ ...entry, outcome: `acted` });
        const response = await call(`GET`, `/report`);
        expect(response?.status).toBe(200);
        const report = ChoresReportSchema.parse(await response?.json());
        expect(report.repos.map((repo) => repo.repo)).toEqual([`root`, `app`]);
        expect(report.repos[0]?.probes.map((probe) => probe.id)).toEqual([`audit`]);
        expect(report.repos[1]?.signals.totals.files).toBe(3);
        expect(report.ledger).toHaveLength(1);
        expect(report.node).toBe(`v24.0.0`);
    });

    test(`a measurement asked for shows as running under the repo's wire id`, async () => {
        const { runner, call } = await backend();
        const measuring = runner.refresh(``, `outdated`);
        const report = ChoresReportSchema.parse(await (await call(`GET`, `/report`))?.json());
        await measuring;
        expect(report.running.map(({ repo, id }) => [repo, id])).toEqual([[`root`, `outdated`]]);
    });
});

describe(`POST /probe`, () => {
    test(`queues the measurement and answers at once`, async () => {
        const { runner, call } = await backend();
        const response = await call(`POST`, `/probe`, { repo: `app`, id: `knip` });
        expect(response?.status).toBe(200);
        expect(await response?.json()).toEqual({ ok: true });
        expect(runner.running().map(({ repo, id }) => [repo, id])).toEqual([[`app`, `knip`]]);
    });

    test(`refuses a repo the daemon does not list, and a probe nobody defines`, async () => {
        const { call } = await backend();
        expect((await call(`POST`, `/probe`, { repo: `../etc`, id: `knip` }))?.status).toBe(404);
        expect((await call(`POST`, `/probe`, { repo: `app`, id: `lighthouse` }))?.status).toBe(400);
    });
});

describe(`POST /ledger`, () => {
    test(`records a verdict, replacing the chore's last one`, async () => {
        const { store, call } = await backend();
        expect((await call(`POST`, `/ledger`, entry))?.status).toBe(200);
        expect((await call(`POST`, `/ledger`, { ...entry, repo: `root`, digest: `def`, snoozedUntil: 5 }))?.status).toBe(200);
        expect((await call(`POST`, `/ledger`, { ...entry, repo: `root`, digest: `ghi` }))?.status).toBe(200);
        expect((await store.ledger()).map((row) => [row.repo, row.digest])).toEqual([
            [`app`, `abc`],
            [`root`, `ghi`],
        ]);
    });

    // An unknown chore id would render as a ledger row the panel can't show, indistinguishable from data loss.
    test(`refuses a chore the book does not define, a repo the daemon does not list, and a malformed row`, async () => {
        const { store, call } = await backend();
        expect((await call(`POST`, `/ledger`, { ...entry, chore: `polish-the-brass` }))?.status).toBe(400);
        expect((await call(`POST`, `/ledger`, { ...entry, repo: `gone` }))?.status).toBe(404);
        expect((await call(`POST`, `/ledger`, { repo: `app` }))?.status).toBe(400);
        expect(await store.ledger()).toEqual([]);
    });
});

test(`a path that is not one of the three is left to the host`, async () => {
    const { call } = await backend();
    expect(await call(`GET`, `/chores`)).toBeUndefined();
    expect(await call(`DELETE`, `/ledger`)).toBeUndefined();
});
