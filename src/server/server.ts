import { join } from "node:path";
import { startPeriodic } from "@intentic/base/async";
import type { ExtensionServerApi, ServerActivation } from "@intentic/extension-api";
import { z } from "zod";
import type { MaintenanceServerApi } from "./api.ts";
import { createProbeRunner, TICK_MS, WARMUP_MS } from "./probe-runner.ts";
import { choresRoutes } from "./routes.ts";
import { sharedChoreSignals } from "./signals.ts";
import { choresStore } from "./store.ts";

// The backend: the code-health probes, the evidence they leave and the ledger of what was done about it, which the
// daemon ran for this extension until 2026-11-26 (its chores/ module). It runs only while this extension is on, so a
// sandbox without it runs no probe at all; the daemon gated its own sweep on this extension the same way.
//
// What it asks of the daemon, each declared in the manifest: whether any agent turn runs (`permissions.events`:
// `activity`), commands under the workload classes (`permissions.exec`: `command` for the cheap "is this tool here?",
// `toolchain` for the measurement, queued with every agent's builds), the repositories the daemon discovers and the
// file search's count of a repo's code files (`permissions.daemon`). Everything else it reads off the disk.

const ReposSchema = z.object({ repos: z.array(z.string()) });
const FilesFoundSchema = z.object({ files: z.number() });

// What counts as code for the size a survey needs: source files, not data, configuration or prose, so a scaffold of
// config files does not pass for a codebase.
const CODE_FILES = `**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs,vue,svelte,astro,py,go,rs,java,kt,kts,swift,rb,php,c,h,cc,cpp,cxx,hpp,cs,scala,dart,lua,sh}`;

export const activateServer = (host: ExtensionServerApi): ServerActivation => {
    // SAFETY: the host this runs in is at least 2.52.0 (`engines.intentic`), whose api carries the members api.ts types
    // ahead of the published SDK.
    const api = host as unknown as MaintenanceServerApi;
    const store = choresStore(api.workspaceRoot);
    const repos = async (): Promise<readonly string[]> => ReposSchema.parse(await api.daemon.json(`/workspace/repos`)).repos;
    // The search box's own file listing (a ripgrep walk in the daemon, tens of ms), not a walk in this process.
    const codeFiles = async (repo: string): Promise<number> => {
        const query = new URLSearchParams({ mode: `files`, query: CODE_FILES, limit: `1`, ...(repo === `` ? {} : { dir: repo }) });
        return FilesFoundSchema.parse(await api.daemon.json(`/workspace/search?${query.toString()}`)).files;
    };

    // Taken for live until the stream says otherwise, so no sweep starts before the sandbox has said it is idle.
    let live = true;
    const activity = api.events.onActivity((heard) => {
        live = heard.live;
    });

    const signals = sharedChoreSignals({ root: api.workspaceRoot, codeFiles, log: api.log });
    const files = api.workspace.onDidChangeFiles((paths) => signals.changed(paths));
    const runner = createProbeRunner({ root: api.workspaceRoot, store, exec: api.exec, repos, live: () => live, log: api.log });
    api.routes.mount(choresRoutes({ store, runner, signals, repos, log: api.log, node: process.version }));

    const sweep = startPeriodic({
        warmupMs: WARMUP_MS,
        everyMs: TICK_MS,
        run: () => runner.sweep(),
        onError: (error) => api.log(`the probe sweep failed: ${error instanceof Error ? error.message : String(error)}`),
    });
    api.log(`probes sweep every ${TICK_MS / 60_000} minutes into ${join(api.workspaceRoot, `.intentic`, `records`, `chores`)}`);

    return {
        // A probe already running finishes in the daemon's queue and is recorded by nobody; the next sweep finds it
        // stale and runs it again.
        deactivate: () => {
            sweep.dispose();
            files.dispose();
            activity.dispose();
        },
    };
};
