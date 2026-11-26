import { spawn } from "node:child_process";
import type { Exec, ExecResult } from "./api.ts";

// The exec door as the daemon answers it, run on this machine instead: the command as given (never a shell of its own),
// the daemon's environment with the request's laid over it, each stream kept to `outputBytes` and marked truncated past
// it, and a deadline that kills it and says so. For the runner's tests, which check real shell behaviour (a missing
// tool, a non-zero exit, unreadable output) rather than a mock's idea of it. No admission, no queue: nothing is refused.
export const localExec: Exec = async (argv, options = {}) =>
    await new Promise<ExecResult>((resolve) => {
        const [command, ...args] = argv;
        const limit = options.outputBytes ?? 1024 * 1024;
        const child = spawn(command ?? ``, args, { cwd: options.cwd, env: { ...process.env, ...options.env }, stdio: [`ignore`, `pipe`, `pipe`] });
        const streams = { stdout: ``, stderr: `` };
        let truncated = false;
        let ended: ExecResult["ended"];
        const keep = (name: keyof typeof streams) => (chunk: Buffer) => {
            const room = limit - Buffer.byteLength(streams[name]);
            if (chunk.length > room) {
                truncated = true;
            }
            streams[name] += chunk.subarray(0, Math.max(room, 0)).toString(`utf8`);
        };
        child.stdout.on(`data`, keep(`stdout`));
        child.stderr.on(`data`, keep(`stderr`));
        const timer = setTimeout(() => {
            ended = `timeout`;
            child.kill(`SIGKILL`);
        }, options.timeoutMs ?? 10 * 60_000);
        child.on(`error`, (error) => {
            clearTimeout(timer);
            resolve({ waitedMs: 0, ...streams, truncated, spawnError: error.message });
        });
        child.on(`close`, (code, signal) => {
            clearTimeout(timer);
            resolve({ waitedMs: 0, ...streams, truncated, ended, exitCode: code ?? undefined, signal: signal ?? undefined });
        });
    });
