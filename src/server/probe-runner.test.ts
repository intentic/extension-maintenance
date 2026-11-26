import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { probeSpec } from "../chores/probes.ts";
import type { ProbeResult } from "../chores/schema.ts";
import type { Exec } from "./api.ts";
import { createProbeRunner, runProbe } from "./probe-runner.ts";
import { choresStore } from "./store.ts";
import { localExec } from "./testing.ts";

// Moved with the runner from the daemon's chores/chores.integration.test.ts (2026-11-26).

const dirs: string[] = [];
const scaffold = async (files: Record<string, string>): Promise<string> => {
    const dir = await mkdtemp(join(tmpdir(), `chores-`));
    dirs.push(dir);
    for (const [path, content] of Object.entries(files)) {
        await mkdir(join(dir, path, `..`), { recursive: true });
        await writeFile(join(dir, path), content);
    }
    return dir;
};
afterEach(async () => {
    await Promise.all(dirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

// Every outcome from runProbe is a recorded result, never a silent gap. Tested against real commands, not mocks, since
// what's verified is actual shell behavior: a missing tool, a non-zero exit, unreadable output.
describe(`runProbe`, () => {
    // Real spec shape, trivial commands, so the test measures the runner, not pnpm.
    const fakeSpec = (over: Partial<ReturnType<typeof probeSpec>>) => ({ ...probeSpec(`outdated`), ...over });

    test(`a tool this repository does not have is unavailable, not a clean result`, async () => {
        const dir = await scaffold({ "package.json": `{}` });
        const result = await runProbe(localExec, fakeSpec({ available: `exit 1` }), dir, 1000);
        expect(result).toMatchObject({ id: `outdated`, state: `unavailable`, ranAt: 1000 });
        expect(result.facts).toBeUndefined();
    });

    test(`an unavailable probe's reason is what is missing, never a restatement of the probe`, async () => {
        const dir = await scaffold({ "package.json": `{}` });
        const result = await runProbe(localExec, fakeSpec({ available: `exit 1` }), dir, 1000);
        expect(result.reason).toBe(probeSpec(`outdated`).unavailable);
        expect(result.reason).not.toContain(probeSpec(`outdated`).title.toLowerCase());
    });

    test(`a command that dies carries the tail of what it printed, so the panel can say why`, async () => {
        const dir = await scaffold({ "package.json": `{}` });
        const result = await runProbe(localExec, fakeSpec({ available: `true`, command: `echo "ERR_PNPM_NO_LOCKFILE" >&2; exit 1` }), dir, 1000);
        expect(result.state).toBe(`failed`);
        expect(result.reason).toContain(`ERR_PNPM_NO_LOCKFILE`);
    });

    test(`output the parser cannot recognise is a failure`, async () => {
        const dir = await scaffold({ "package.json": `{}` });
        const garbage = `not json at all`;
        const result = await runProbe(localExec, fakeSpec({ available: `true`, command: `echo "${garbage}"` }), dir, 1000);
        expect(result.state).toBe(`failed`);
        expect(result.reason).toContain(garbage);
    });

    // The front is quoted since these tools print megabytes of JSON; the tail is usually mid-array noise, not the
    // error.
    test(`an unrecognisable output is quoted from its start, and bounded`, async () => {
        const dir = await scaffold({ "package.json": `{}` });
        const command = `echo "ERR_KNIP_CONFIG unresolved entry"; echo '{"issues":[${`x`.repeat(500)}'`;
        const result = await runProbe(localExec, fakeSpec({ available: `true`, command }), dir, 1000);
        expect(result.reason).toContain(`ERR_KNIP_CONFIG unresolved entry`);
        expect(result.reason).toMatch(/…$/u);
        expect(result.reason?.length).toBeLessThan(200);
    });

    test(`a command that exits zero with usable output succeeds`, async () => {
        const dir = await scaffold({ "package.json": `{}` });
        const result = await runProbe(localExec, fakeSpec({ available: `true`, command: `echo '{"vue":{"current":"1.0.0","latest":"2.0.0"}}'; exit 0` }), dir, 1000);
        expect(result.state).toBe(`ok`);
        expect(result.facts).toEqual({
            id: `outdated`,
            packages: [{ name: `vue`, current: `1.0.0`, latest: `2.0.0`, kind: `major`, section: `dependencies` }],
        });
    });

    test(`a command that hangs is killed and says so rather than holding the lane forever`, async () => {
        const dir = await scaffold({ "package.json": `{}` });
        const result = await runProbe(localExec, fakeSpec({ available: `true`, command: `sleep 5`, timeoutMs: 200 }), dir, 1000);
        expect(result.state).toBe(`failed`);
        expect(result.reason).toContain(`timed out`);
    });

    // The exec door's answers the runner meets only through the daemon: no room for the command, or a refusal of the
    // request itself. Neither is a measurement, and neither may throw out of the runner.
    test(`a command the sandbox had no room for, or refused outright, is a failed probe naming why`, async () => {
        const noRoom: Exec = async () => ({ refused: `memory stayed short for 10 minutes`, waitedMs: 600_000, stdout: ``, stderr: ``, truncated: false });
        expect(await runProbe(noRoom, probeSpec(`outdated`), `/nowhere`, 1000)).toMatchObject({ state: `failed`, reason: expect.stringContaining(`memory stayed short`) });
        const refused: Exec = async () => {
            throw new Error(`daemon answered 403 for POST /extension/exec`);
        };
        expect(await runProbe(refused, probeSpec(`outdated`), `/nowhere`, 1000)).toMatchObject({ state: `failed`, reason: expect.stringContaining(`403`) });
    });

    // The availability check is cheap and runs as an agent's command would; the measurement takes its turn in the
    // heavy-command queue.
    test(`asks for the command class to look and the toolchain class to measure`, async () => {
        const classes: (string | undefined)[] = [];
        const recording: Exec = async (argv, options) => {
            classes.push(options?.class);
            return await localExec(argv, options);
        };
        const dir = await scaffold({ "package.json": `{}` });
        await runProbe(recording, fakeSpec({ available: `true`, command: `echo '{}'` }), dir, 1000);
        expect(classes).toEqual([`command`, `toolchain`]);
    });
});

// One measurement at a time, every request eventually served, exercised through the real run path: probes resolve
// `unavailable` in ms since the temp repo has no manifest.
describe(`the runner's lane`, () => {
    const runner = async (over: { live?: () => boolean; repos?: readonly string[] } = {}) => {
        const dir = await scaffold({});
        const store = choresStore(dir);
        return {
            store,
            runner: createProbeRunner({
                root: dir,
                store,
                exec: localExec,
                repos: async () => over.repos ?? [],
                // A background sweep defers to live turns; a manually requested probe runs regardless, asserted below.
                live: over.live ?? (() => false),
                log: () => undefined,
            }),
        };
    };

    // Both calls are made before either resolves, the exact race that could silently drop one.
    test(`a second request made while one is running is queued, not dropped`, async () => {
        const { store, runner: probes } = await runner();
        await Promise.all([probes.refresh(``, `outdated`), probes.refresh(``, `audit`)]);
        expect((await store.probesFor(``)).map((probe) => probe.id).toSorted()).toEqual([`audit`, `outdated`]);
    });

    // Read synchronously right after the call, since the entry must be visible before the probe resolves.
    test(`what is waiting is visible before it runs, and gone once it has`, async () => {
        const { runner: probes } = await runner();
        const running = probes.refresh(``, `outdated`);
        expect(probes.running().map((entry) => entry.id)).toEqual([`outdated`]);
        await running;
        expect(probes.running()).toEqual([]);
    });

    test(`the same probe asked for twice joins the request already in the lane`, async () => {
        const { runner: probes } = await runner();
        const first = probes.refresh(``, `outdated`);
        expect(probes.running()).toHaveLength(1);
        await Promise.all([first, probes.refresh(``, `outdated`)]);
        expect(probes.running()).toEqual([]);
    });

    test(`an unknown probe id does not park in the lane`, async () => {
        const { runner: probes } = await runner();
        await probes.refresh(``, `nonsense` as ProbeResult["id"]);
        expect(probes.running()).toEqual([]);
    });

    test(`a sweep measures nothing while a turn runs, and everything expired once none does`, async () => {
        let live = true;
        const { store, runner: probes } = await runner({ live: () => live });
        await probes.sweep();
        expect(await store.probes()).toEqual({});
        live = false;
        await probes.sweep();
        expect((await store.probesFor(``)).length).toBeGreaterThan(0);
    });

    test(`a sweep drops the measurements of a repo the daemon no longer lists, and measures the ones it does`, async () => {
        const { store, runner: probes } = await runner({ repos: [`app`] });
        await store.recordProbe(`gone`, { id: `outdated`, state: `ok`, ranAt: 1, tookMs: 1 });
        await probes.sweep();
        expect(Object.keys(await store.probes()).toSorted()).toEqual([``, `app`]);
    });
});

describe(`workspace-root probe scope`, () => {
    test(`the UI probe does not become available from a framework manifest inside the reference shelf`, async () => {
        const dir = await scaffold({
            "refs/upstream/package.json": JSON.stringify({ dependencies: { react: `1.0.0` } }),
            "refs/upstream/Card.tsx": `export const Card = () => null`,
        });
        expect(await runProbe(localExec, probeSpec(`ui`), dir, 1000, true)).toMatchObject({ state: `unavailable` });
        expect(await runProbe(localExec, probeSpec(`ui`), dir, 1000)).toMatchObject({ state: `ok` });
    });

    test(`the UI scan skips the shelf but keeps a repository-local refs directory`, async () => {
        const dir = await scaffold({
            "package.json": JSON.stringify({ dependencies: { react: `1.0.0` } }),
            "refs/upstream/Hidden.tsx": `export const Hidden = () => null`,
            "app/refs/Visible.tsx": `export const Visible = () => null`,
        });
        const root = await runProbe(localExec, probeSpec(`ui`), dir, 1000, true);
        const repo = await runProbe(localExec, probeSpec(`ui`), dir, 1000);
        expect(root).toMatchObject({ state: `ok`, facts: { id: `ui`, scan: { components: [`app/refs/Visible.tsx`] } } });
        expect(repo).toMatchObject({
            state: `ok`,
            facts: { id: `ui`, scan: { components: [`app/refs/Visible.tsx`, `refs/upstream/Hidden.tsx`] } },
        });
    });
});
