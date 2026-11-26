import { readdir, readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import type { ChorePackage, ChoreShape, ChoreSignals } from "../chores/schema.ts";
import { readWorkspaceManifests, type WorkspaceManifest } from "./workspace-manifests.ts";

// The cheap half of a chore's evidence, read off the disk for every report: each package's manifest facts, the repo's
// shape (documents, Dockerfiles, CI files, lockfile, declared dependencies) and how many code files it holds. The
// probes (probe-runner.ts) are the expensive half. Moved from the daemon's chores/chore-signals.ts on 2026-11-26.

// The workspace's reference shelf (`refs/`, @intentic/constants' REFERENCE_DIR): a clone kept to read, never this
// workspace's own code, so the workspace root's shape walk steps over it.
export const REFERENCE_DIR = `refs`;

const exists = async (path: string): Promise<boolean> =>
    await stat(path).then(
        () => true,
        () => false,
    );

// The architecture doc a package is expected to have: its own README, checked for existence only.
const docPath = (repoDir: string, packageDir: string): string => join(repoDir, packageDir, `README.md`);

const dependencyNames = (manifest: Record<string, unknown>, block: string): string[] => {
    const deps = manifest[block];
    return typeof deps === `object` && deps !== null ? Object.keys(deps) : [];
};

const enginesOf = (manifest: Record<string, unknown>): Record<string, string> | undefined => {
    const engines = manifest[`engines`];
    if (typeof engines !== `object` || engines === null) {
        return undefined;
    }
    const pairs = Object.entries(engines).filter((entry): entry is [string, string] => typeof entry[1] === `string`);
    return pairs.length === 0 ? undefined : Object.fromEntries(pairs);
};

// A repo with no pnpm workspace has no packages; that's a true answer, not a gap. The root manifest is deliberately not
// folded in as a pseudo-package.
export const packageSignals = async (repoDir: string, manifests?: readonly WorkspaceManifest[]): Promise<ChorePackage[]> =>
    await Promise.all(
        (manifests ?? (await readWorkspaceManifests(repoDir))).map(async ({ dir, name, manifest }) => {
            const entry: ChorePackage = {
                dir,
                name,
                dependencies: dependencyNames(manifest, `dependencies`),
                devDependencies: dependencyNames(manifest, `devDependencies`),
                documented: await exists(docPath(repoDir, dir)),
            };
            // `engines` is omitted, not undefined, when absent.
            const engines = enginesOf(manifest);
            return engines === undefined ? entry : Object.assign(entry, { engines });
        }),
    );

// Bounds the Dockerfile/doc walk's depth and count; a read the rail badge polls must not walk a whole tree.
const SHAPE_DEPTH = 3;
const SHAPE_LIMIT = 20;

// CI files by convention; `.github/workflows` is a directory, the rest are single files at the repo root.
const CI_FILES = [`.gitlab-ci.yml`, `.circleci/config.yml`, `azure-pipelines.yml`, `Jenkinsfile`, `.drone.yml`, `bitbucket-pipelines.yml`];
const WORKFLOWS_DIR = join(`.github`, `workflows`);

const entriesOf = async (dir: string) => await readdir(dir, { withFileTypes: true }).catch(() => []);

const listDir = async (dir: string): Promise<string[]> => (await entriesOf(dir)).filter((entry) => entry.isFile()).map((entry) => entry.name);

// Not a glob library, not unbounded recursion: a bounded walk may miss a file, which beats an unbounded poll.
const IGNORED = new Set([`node_modules`, `.git`, `dist`, `build`, `.cache`, `coverage`, `.venv`, `target`, `vendor`]);

const findFiles = async (root: string, matches: (name: string) => boolean, skipRootReference = false): Promise<string[]> => {
    const found: string[] = [];
    let frontier = [``];
    for (let depth = 0; depth <= SHAPE_DEPTH && frontier.length > 0 && found.length < SHAPE_LIMIT; depth++) {
        const next: string[] = [];
        // One level read at once, then folded in frontier order, so what is found (and where the limit cuts) is the
        // same as reading each directory in turn.
        const levels = await Promise.all(frontier.map((relative) => entriesOf(join(root, relative))));
        for (const [index, relative] of frontier.entries()) {
            for (const entry of levels[index] ?? []) {
                const path = relative === `` ? entry.name : `${relative}/${entry.name}`;
                const rootReference = skipRootReference && relative === `` && entry.name === REFERENCE_DIR;
                if (entry.isDirectory() && !rootReference && !IGNORED.has(entry.name) && !entry.name.startsWith(`.`)) {
                    next.push(path);
                } else if (entry.isFile() && matches(entry.name) && found.length < SHAPE_LIMIT) {
                    found.push(path);
                }
            }
        }
        frontier = next;
    }
    return found;
};

// Matches `Dockerfile`, `Dockerfile.prod`, `web.Dockerfile`; compose files are not counted, they orchestrate images.
const isDockerfile = (name: string): boolean => name === `Dockerfile` || name.startsWith(`Dockerfile.`) || name.endsWith(`.Dockerfile`);

const DEP_BLOCKS = [`dependencies`, `devDependencies`, `peerDependencies`, `optionalDependencies`];

// Reads the root manifest directly, since a single-package repo has no workspace packages to read otherwise. All four
// dependency blocks count, since peerDependencies is how a UI framework or component library is declared.
const declaredDeps = async (repoDir: string, manifests: readonly WorkspaceManifest[]): Promise<string[]> => {
    const names = new Set<string>();
    const collect = (manifest: Record<string, unknown>): void => {
        for (const block of DEP_BLOCKS) {
            for (const name of dependencyNames(manifest, block)) {
                names.add(name);
            }
        }
    };
    try {
        collect(JSON.parse(await readFile(join(repoDir, `package.json`), `utf8`)) as Record<string, unknown>);
    } catch {
        // No root manifest, or one that fails to parse; workspace packages below are still read.
    }
    for (const { manifest } of manifests) {
        collect(manifest);
    }
    return [...names].toSorted();
};

const LOCKFILES = [`pnpm-lock.yaml`, `package-lock.json`, `yarn.lock`, `bun.lockb`];
const present = async (repoDir: string, files: readonly string[]): Promise<string[]> => {
    const found = await Promise.all(files.map((file) => exists(join(repoDir, file))));
    return files.filter((_file, index) => found[index]);
};

// Every check is a stat or shallow readdir, cheap enough for a read the rail badge polls. `docs` looks for the
// repository map itself, not just the directory, since an empty `docs/architecture/` has nothing to gate on.
export const choreShape = async (repoDir: string, workspaceRoot = false, manifests?: readonly WorkspaceManifest[]): Promise<ChoreShape> => {
    const listed = manifests ?? (await readWorkspaceManifests(repoDir));
    const [docs, dockerfiles, workflows, ciFiles, lockfiles, packageManifest, deps] = await Promise.all([
        findFiles(join(repoDir, `docs`, `architecture`), (name) => name.endsWith(`.md`)),
        findFiles(repoDir, isDockerfile, workspaceRoot),
        listDir(join(repoDir, WORKFLOWS_DIR)),
        present(repoDir, CI_FILES),
        present(repoDir, LOCKFILES),
        exists(join(repoDir, `package.json`)),
        declaredDeps(repoDir, listed),
    ]);
    return {
        docs,
        dockerfiles,
        ci: [...workflows.filter((name) => name.endsWith(`.yml`) || name.endsWith(`.yaml`)).map((name) => `${WORKFLOWS_DIR}/${name}`), ...ciFiles],
        lockfile: lockfiles.length > 0,
        packageManifest,
        deps,
    };
};

export interface SignalsDeps {
    readonly root: string;
    // How many code files the repo holds ("" is the workspace root); the server asks the daemon's own file search.
    readonly codeFiles: (repo: string) => Promise<number>;
    readonly log: (message: string) => void;
}

const choreSignals = async (deps: SignalsDeps, repo: string): Promise<ChoreSignals> => {
    const repoDir = join(deps.root, repo);
    const counting = deps.codeFiles(repo).catch((error: unknown) => {
        deps.log(`could not count ${repo === `` ? `the workspace's` : `${repo}'s`} code files, listing it without a size: ${error instanceof Error ? error.message : String(error)}`);
        return 0;
    });
    const [files, manifests] = await Promise.all([counting, readWorkspaceManifests(repoDir)]);
    const [packages, shape] = await Promise.all([packageSignals(repoDir, manifests), choreShape(repoDir, repo === ``, manifests)]);
    return {
        packages,
        shape,
        // Retired with the iq index that ranked them (2026-11-18), sent empty in the shape the book reads; `indexed:
        // false` keeps the book from acting on them.
        hotspots: [],
        keyModules: [],
        totals: { files, symbols: 0, complexity: 0, hotspots: 0 },
        indexed: false,
    };
};

// How long a finished reading of a repo serves the next caller, unless a file under it changed first.
const KEEP_MS = 10_000;

// One repo's reading in flight, the order it began in, and the reading queued behind it for callers that asked after.
interface Flight {
    readonly begun: number;
    readonly reading: Promise<ChoreSignals>;
    next?: Promise<ChoreSignals>;
}

interface Kept {
    readonly at: number;
    readonly reading: ChoreSignals;
}

export interface SharedChoreSignals {
    // A caller's place in line, taken as it arrives, before it asks for any repo.
    readonly asked: () => number;
    // A reading begun after `asked`, shared with everyone who was already waiting, or a finished one no file change has
    // touched in the last ten seconds.
    readonly of: (repo: string, asked: number) => Promise<ChoreSignals>;
    // Workspace-relative paths that changed (the workspace's file events); an empty batch is "anything may have".
    readonly changed: (paths: readonly string[]) => void;
}

// The rail badge and the panel ask at once, each walking every repo, so the second would pay for every reading the first
// had just taken. A reading is shared with callers that asked before it began; a finished one serves the next caller
// for a few seconds unless the workspace says a file under that repo changed.
export const sharedChoreSignals = (deps: SignalsDeps, now: () => number = Date.now): SharedChoreSignals => {
    let clock = 0;
    const flights = new Map<string, Flight>();
    const kept = new Map<string, Kept>();
    const begin = (repo: string): Promise<ChoreSignals> => {
        const reading = choreSignals(deps, repo);
        const flight: Flight = { begun: (clock += 1), reading };
        flights.set(repo, flight);
        // Kept while a next reading is queued behind it, which takes its place as it begins.
        const settled = (): void => {
            if (flights.get(repo) === flight && flight.next === undefined) {
                flights.delete(repo);
            }
        };
        void flight.reading.then((signals) => {
            // A reading that counted no code is not kept: a count that failed reads as none, and the next ask should
            // try again.
            if (signals.totals.files > 0) {
                kept.set(repo, { at: now(), reading: signals });
            }
            settled();
        }, settled);
        return flight.reading;
    };
    return {
        asked: () => (clock += 1),
        of: (repo, asked) => {
            const flight = flights.get(repo);
            if (flight === undefined) {
                const hit = kept.get(repo);
                if (hit !== undefined && now() - hit.at < KEEP_MS) {
                    return Promise.resolve(structuredClone(hit.reading));
                }
                kept.delete(repo);
                return begin(repo);
            }
            if (flight.begun > asked) {
                return flight.reading;
            }
            flight.next ??= flight.reading.then(
                () => begin(repo),
                () => begin(repo),
            );
            return flight.next;
        },
        changed: (paths) => {
            if (paths.length === 0) {
                kept.clear();
                return;
            }
            // The workspace root's reading walks every folder, so any change reaches it; a repo's, only one under it.
            for (const repo of [...kept.keys()]) {
                if (repo === `` || paths.some((path) => path === repo || path.startsWith(`${repo}/`))) {
                    kept.delete(repo);
                }
            }
        },
    };
};
