import type { ExtensionServerApi } from "@intentic/extension-api";

// What this backend is handed by its host, as far as it uses it.
//
// (2026-11-26) The published @intentic/extension-api (1.431.0) carries extension API 2.48.0; `api.events` and `api.exec`
// arrived in 2.50.0, which this extension's `engines.intentic` floor (^2.52.0) guarantees at runtime but no published
// package types yet. They are typed here from the SDK's own source (`_shared/extension-api/src/server.ts` in
// intentic/intentic), the members this backend calls and nothing else. Drop this block for the SDK's own types once
// @intentic/extension-api >= 2.52 is published.

// Whether any agent turn is running in the sandbox, as `api.events.onActivity` hears it.
export interface SandboxActivity {
    readonly live: boolean;
}

// The workload classes `api.exec` runs under, each declared in `permissions.exec`.
export type ExecClass = "command" | "toolchain";

export interface ExecOptions {
    readonly class?: ExecClass;
    readonly cwd?: string;
    readonly env?: Readonly<Record<string, string>>;
    readonly stdin?: string;
    readonly timeoutMs?: number;
    readonly outputBytes?: number;
    readonly keep?: "head" | "tail";
    readonly label?: string;
    readonly signal?: AbortSignal;
}

export interface ExecResult {
    readonly refused?: string | undefined;
    readonly waitedMs: number;
    readonly exitCode?: number | undefined;
    readonly signal?: string | undefined;
    readonly stdout: string;
    readonly stderr: string;
    readonly truncated: boolean;
    readonly ended?: "timeout" | "aborted" | undefined;
    readonly spawnError?: string | undefined;
}

export type Exec = (argv: readonly string[], options?: ExecOptions) => Promise<ExecResult>;

interface Disposable {
    dispose(): void;
}

// The 2.50.0 members, as `ExtensionServerApi` declares them in the SDK's source.
interface Api250 {
    readonly events: {
        onActivity(listener: (activity: SandboxActivity) => void): Disposable;
    };
    readonly exec: Exec;
}
// (end of the block to drop)

export type MaintenanceServerApi = Pick<ExtensionServerApi, "workspaceRoot" | "log" | "routes" | "daemon" | "workspace"> & Api250;
