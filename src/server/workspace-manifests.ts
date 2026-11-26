import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";

// The workspace packages of a pnpm monorepo, read straight from the filesystem: pnpm-workspace.yaml's globs name package
// dirs, and each dir's package.json names the package and declares its engines and dependencies. The daemon's reader
// (workspace/deps/workspace-manifests.ts in intentic/intentic) is the one this follows, rule for rule, since an extension
// reaches only the SDK; every read is asynchronous, since the backend host is one process every backend shares.

export type PackageManifest = { name?: unknown } & Record<string, unknown>;

// One workspace package as its manifest declares it, with its dir.
export interface WorkspaceManifest {
    readonly dir: string;
    readonly name: string;
    readonly manifest: PackageManifest;
}

const WORKSPACE_FILE = `pnpm-workspace.yaml`;

const exists = async (path: string): Promise<boolean> =>
    await stat(path).then(
        () => true,
        () => false,
    );

const globsOf = (workspaceFile: string): string[] => {
    const packages = (parse(workspaceFile) as { packages?: unknown } | null | undefined)?.packages;
    return Array.isArray(packages) ? packages.filter((glob): glob is string => typeof glob === `string`) : [];
};

// Expands one pnpm glob into repo-relative dirs; a literal dir or trailing `/*` only, `**` skipped, a missing parent
// nothing. Sorted by name: readdir's order is the filesystem's, so without it which dir keeps a name two claim would
// vary by host. Negations are the caller's: a `!dir` line must be read with the line it excludes from.
const expandGlob = async (repoDir: string, glob: string): Promise<string[]> => {
    if (glob.includes(`**`)) {
        return [];
    }
    if (!glob.endsWith(`/*`)) {
        return (await exists(join(repoDir, glob, `package.json`))) ? [glob] : [];
    }
    const prefix = glob.slice(0, -2);
    const entries = await readdir(join(repoDir, prefix), { withFileTypes: true }).catch(() => []);
    return entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => `${prefix}/${entry.name}`)
        .toSorted();
};

// A `!dir` line excludes a dir pnpm itself does not install (a store shell built by Xcode or Bubblewrap). Exact paths
// only: a glob negation is unknown here and would be wrongly kept.
const negated = (globs: readonly string[]): Set<string> =>
    new Set(globs.filter((glob) => glob.startsWith(`!`)).map((glob) => glob.slice(1).replace(/\/+$/u, ``)));

/**
 * Every workspace package of the repo at `repoDir`, in glob order. A repo with no workspace file has none; a dir without
 * a readable, parseable, named package.json isn't a workspace package (pnpm's own view); a name two dirs claim stays with
 * the first.
 */
export const readWorkspaceManifests = async (repoDir: string): Promise<WorkspaceManifest[]> => {
    const workspaceFile = await readFile(join(repoDir, WORKSPACE_FILE), `utf8`).catch(() => undefined);
    if (workspaceFile === undefined) {
        return [];
    }
    let globs: string[];
    try {
        globs = globsOf(workspaceFile);
    } catch {
        // A workspace file that is not YAML declares nothing pnpm could install either.
        return [];
    }
    const excluded = negated(globs);
    const expanded = await Promise.all(globs.filter((glob) => !glob.startsWith(`!`)).map((glob) => expandGlob(repoDir, glob)));
    const dirs = expanded.flat().filter((dir) => !excluded.has(dir));
    const texts = await Promise.all(dirs.map((dir) => readFile(join(repoDir, dir, `package.json`), `utf8`).catch(() => undefined)));
    const found: WorkspaceManifest[] = [];
    const seen = new Set<string>();
    for (const [index, dir] of dirs.entries()) {
        let manifest: PackageManifest;
        try {
            manifest = JSON.parse(texts[index] ?? ``) as PackageManifest;
        } catch {
            continue;
        }
        if (typeof manifest !== `object` || manifest === null || typeof manifest.name !== `string` || seen.has(manifest.name)) {
            continue;
        }
        seen.add(manifest.name);
        found.push({ dir, name: manifest.name, manifest });
    }
    return found;
};
