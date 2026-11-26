import { join } from "node:path";
import { PROBES, type ProbeSpec } from "../chores/probes.ts";
import type { ProbeId, ProbeResult, RunningProbe } from "../chores/schema.ts";
import { WORKSPACE_ROOT_EXCLUDE_ENV } from "../chores/workspace-scope.ts";
import type { Exec } from "./api.ts";
import { REFERENCE_DIR } from "./signals.ts";
import { type ChoresStore, isStale, probeOf } from "./store.ts";

// The only background sweep that spends real machine time: probes run one at a time across the whole sandbox, through
// the daemon's workload classes (`api.exec`), and a sweep starts only while no agent turn runs and stops between probes
// the moment one starts (`api.events.onActivity`). A failure is recorded as a probe state, never thrown, and holds its
// slot for an hour (store.ts, RETRY_MS), not the probe's own TTL. Moved from the daemon's chores/probe-runner.ts on
// 2026-11-26; it ran in every daemon, gated on this extension being on, and now runs only where this backend does.

// How often the sweep checks for expired measurements; frequent enough for a part-time sandbox to refresh.
export const TICK_MS = 30 * 60_000;
// Delay before the first sweep, long enough to be behind image pulls, installs and the first index build.
export const WARMUP_MS = 5 * 60_000;
// How long the `available` line may take to say whether the tool is here, and what it may print doing so.
const AVAILABLE_TIMEOUT_MS = 30_000;
const AVAILABLE_CAPTURE_BYTES = 1024 * 1024;
// Past the 1 MiB default, since knip/jscpd can emit megabytes of JSON, which a cut makes unparsable; past it the probe
// fails rather than parsing half a document. The exec door's own ceiling.
const PROBE_CAPTURE_BYTES = 64 * 1024 * 1024;
// Chars kept from the end of a dying tool's output, enough to name the cause without bloating the panel.
const REASON_TAIL = 400;
// Chars kept from the front of unrecognised output; the first line says which kind of failure this is.
const REASON_HEAD = 160;

const tail = (text: string): string => text.trim().slice(-REASON_TAIL);
const head = (text: string): string => {
    const trimmed = text.trim();
    return trimmed.length <= REASON_HEAD ? trimmed : `${trimmed.slice(0, REASON_HEAD)}…`;
};

/**
 * Runs one probe and returns what to record; never throws, so every outcome becomes a ProbeResult instead of a silent
 * gap. `workspaceRoot`: the probe measures the workspace's own root repo, whose scanners step over the reference shelf.
 */
export const runProbe = async (exec: Exec, spec: ProbeSpec, cwd: string, nowMs: number, workspaceRoot = false): Promise<ProbeResult> => {
    const started = Date.now();
    const finish = (rest: Omit<ProbeResult, "id" | "ranAt" | "tookMs">): ProbeResult => ({
        id: spec.id,
        ranAt: nowMs,
        tookMs: Date.now() - started,
        ...rest,
    });

    // Only the workspace root gets the shelf's name: root-anchored scanner exclusions a real repo's own refs/ must not
    // have. Empty reads as unset to the probes' `${…:+…}` expansions, which is what a repo gets (the exec door lays this
    // over the daemon's environment and cannot unset a name).
    const env = { [WORKSPACE_ROOT_EXCLUDE_ENV]: workspaceRoot ? REFERENCE_DIR : `` };
    const label = `${spec.id} probe`;

    try {
        const available = await exec([`sh`, `-c`, spec.available], {
            class: `command`,
            cwd,
            env,
            timeoutMs: AVAILABLE_TIMEOUT_MS,
            outputBytes: AVAILABLE_CAPTURE_BYTES,
            label,
        });
        if (available.refused !== undefined) {
            return finish({ state: `failed`, reason: `the sandbox had no room to run it: ${available.refused}` });
        }
        if (available.exitCode !== 0 || available.truncated) {
            // Missing tool, not a failure; the reason names what's missing rather than restating the probe.
            return finish({ state: `unavailable`, reason: spec.unavailable });
        }

        // A measurement is the heaviest thing this sweep does (knip, jscpd over a whole repo): queued with builds and
        // tests in the sandbox's heavy-command queue rather than competing with them.
        const ran = await exec([`sh`, `-c`, spec.command], {
            class: `toolchain`,
            cwd,
            env,
            timeoutMs: spec.timeoutMs,
            outputBytes: PROBE_CAPTURE_BYTES,
            label,
        });
        if (ran.refused !== undefined) {
            return finish({ state: `failed`, reason: `the sandbox had no room to run it: ${ran.refused}` });
        }
        if (ran.exitCode !== 0 || ran.truncated) {
            const reason =
                ran.ended === `timeout`
                    ? `timed out after ${Math.round(spec.timeoutMs / 1000)}s`
                    : ran.truncated
                      ? `printed more than ${PROBE_CAPTURE_BYTES / 1024 / 1024} MB`
                      : tail(`${ran.stderr}${ran.stdout}`) || (ran.spawnError ?? ``);
            return finish({ state: `failed`, reason: reason === `` ? `the command exited without output` : reason });
        }
        const facts = spec.parse(ran.stdout);
        if (facts === undefined) {
            return finish({ state: `failed`, reason: `could not read the tool's output: ${head(ran.stdout) || `it printed nothing`}` });
        }
        return finish({ state: `ok`, facts });
    } catch (error) {
        // The exec door refused the request itself (a daemon restarting, a class the manifest lost): no measurement.
        return finish({ state: `failed`, reason: `the sandbox did not run it: ${error instanceof Error ? error.message : String(error)}` });
    }
};

// Only what the runner needs, so it's testable without a host.
export interface ProbeRunnerDeps {
    readonly root: string;
    readonly store: ChoresStore;
    readonly exec: Exec;
    // Every repo under the workspace root as the daemon discovers them (`GET /workspace/repos`); the root's own is "".
    readonly repos: () => Promise<readonly string[]>;
    // Whether any agent turn runs now: the sweep defers to the owner's own work.
    readonly live: () => boolean;
    readonly log: (message: string) => void;
}

// Every (repo, probe) pair whose cache has expired, tier 1 before tier 2, so a sandbox up only briefly still refreshes
// the cheap advisories first.
const expired = async (deps: ProbeRunnerDeps, repos: readonly string[], nowMs: number): Promise<{ repo: string; spec: ProbeSpec }[]> => {
    const cache = await deps.store.probes();
    return PROBES.toSorted((left, right) => left.tier - right.tier).flatMap((spec) =>
        repos.filter((repo) => isStale(probeOf(cache, repo, spec.id), spec.ttlMs, nowMs)).map((repo) => ({ repo, spec })),
    );
};

export interface ProbeRunner {
    // One sweep: every expired measurement queued, unless a turn runs or the lane is already draining.
    readonly sweep: () => Promise<void>;
    // Refreshes one repo's probe now, ignoring its TTL; resolves once recorded, the route does not await it. Always
    // queues rather than declining, even when the lane is busy.
    readonly refresh: (repo: string, id: ProbeId) => Promise<void>;
    // What's running and what's waiting, since the probe cache still shows the stale measurement being replaced.
    readonly running: () => readonly RunningProbe[];
}

const laneKey = (entry: { repo: string; id: ProbeId }): string => `${entry.repo}|${entry.id}`;

export const createProbeRunner = (deps: ProbeRunnerDeps): ProbeRunner => {
    // Index 0 is running, the rest wait; replaced wholesale each change so `running()` hands out a stable snapshot.
    let lane: readonly RunningProbe[] = [];

    const record = async (repo: string, spec: ProbeSpec): Promise<void> => {
        const result = await runProbe(deps.exec, spec, join(deps.root, repo), Date.now(), repo === ``);
        await deps.store.recordProbe(repo, result);
        deps.log(`probe ${spec.id} on ${repo === `` ? `the workspace` : repo}: ${result.state} in ${result.tookMs} ms`);
    };

    const leave = (key: string): void => {
        lane = lane.filter((waiting) => laneKey(waiting) !== key);
    };

    // Runs the lane's head to completion; `finally` ensures a throw doesn't leave an entry parked as running forever.
    const claim = async (entry: RunningProbe, spec: ProbeSpec): Promise<void> => {
        const key = laneKey(entry);
        lane = lane.map((waiting) => (laneKey(waiting) === key ? { ...waiting, startedAt: Date.now() } : waiting));
        try {
            await record(entry.repo, spec);
        } finally {
            leave(key);
        }
    };

    // Drains the lane oldest-first until empty, re-reading it each pass so a request that arrives mid-run joins the
    // queue already draining.
    let draining: Promise<void> | undefined;
    const drainLane = async (): Promise<void> => {
        for (let next = lane[0]; next !== undefined; next = lane[0]) {
            const spec = PROBES.find((probe) => probe.id === next.id);
            if (spec === undefined) {
                leave(laneKey(next));
                continue;
            }
            await claim(next, spec);
        }
    };
    const pump = (): Promise<void> => {
        draining ??= drainLane().finally(() => (draining = undefined));
        return draining;
    };

    // Joins the lane, or the request already in it: two clicks on one row are one measurement, same as a sweep that
    // already queued it.
    const enqueue = (repo: string, id: ProbeId): Promise<void> => {
        if (!lane.some((entry) => laneKey(entry) === laneKey({ repo, id }))) {
            lane = [...lane, { repo, id, askedAt: Date.now() }];
        }
        return pump();
    };

    return {
        sweep: async () => {
            // The owner's own work always comes first; this sweep is background-only and defers to any live turn.
            if (draining !== undefined || deps.live()) {
                return;
            }
            const repos = [``, ...(await deps.repos())];
            const due = await expired(deps, repos, Date.now());
            await deps.store.pruneProbes(repos);
            for (const { repo, spec } of due) {
                // Re-checked between probes, not the top only: a long sweep can outlast the owner starting to work.
                if (deps.live()) {
                    return;
                }
                await enqueue(repo, spec.id);
            }
        },
        refresh: async (repo, id) => {
            if (!PROBES.some((probe) => probe.id === id)) {
                return;
            }
            await enqueue(repo, id);
        },
        // Entries are replaced wholesale, never mutated, so handing them out shares no state.
        running: () => lane,
    };
};
