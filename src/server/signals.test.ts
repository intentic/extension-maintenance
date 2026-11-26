import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, test } from "vitest";
import { choreShape, packageSignals, sharedChoreSignals, type SignalsDeps } from "./signals.ts";

// Moved with the signals from the daemon's chores/chores.integration.test.ts and chore-signals.integration.test.ts
// (2026-11-26).

const dirs: string[] = [];
const scaffold = async (files: Record<string, string>): Promise<string> => {
    const dir = await mkdtemp(join(tmpdir(), `chores-signals-`));
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

describe(`package signals`, () => {
    test(`read engines and dependency names, and whether the package has a document`, async () => {
        const dir = await scaffold({
            "pnpm-workspace.yaml": `packages:\n  - "_libs/*"\n`,
            "_libs/one/package.json": JSON.stringify({
                name: `@x/one`,
                engines: { node: `>=22` },
                dependencies: { zod: `^4` },
                devDependencies: { vitest: `^2` },
            }),
            "_libs/two/package.json": JSON.stringify({ name: `@x/two` }),
            // A package's doc is its README; `documented` is just a stat on the package dir.
            "_libs/one/README.md": `# one`,
        });
        expect(await packageSignals(dir)).toEqual([
            { dir: `_libs/one`, name: `@x/one`, engines: { node: `>=22` }, dependencies: [`zod`], devDependencies: [`vitest`], documented: true },
            { dir: `_libs/two`, name: `@x/two`, dependencies: [], devDependencies: [], documented: false },
        ]);
    });

    // The root manifest is deliberately not counted as a pseudo-package; a plain repo would otherwise report one
    // undocumented package.
    test(`a repo that is not a workspace reports no packages at all`, async () => {
        const dir = await scaffold({ "package.json": JSON.stringify({ name: `plain` }) });
        expect(await packageSignals(dir)).toEqual([]);
    });

    test(`a negated dir is not a package, and a name two dirs claim stays with the first`, async () => {
        const dir = await scaffold({
            "pnpm-workspace.yaml": `packages:\n  - libs/*\n  - "!libs/shell"\n`,
            "libs/a/package.json": JSON.stringify({ name: `@x/same` }),
            "libs/b/package.json": JSON.stringify({ name: `@x/same` }),
            "libs/shell/package.json": JSON.stringify({ name: `@x/shell` }),
        });
        expect((await packageSignals(dir)).map((entry) => entry.dir)).toEqual([`libs/a`]);
    });
});

// Checks presence of files only: cheap, checkable, and not arguable. A false negative hides a chore forever; a false
// positive shows one that can never be acted on.
describe(`repo shape`, () => {
    test(`finds documents, Dockerfiles by either convention, workflows and the lockfile`, async () => {
        const dir = await scaffold({
            "package.json": `{}`,
            "pnpm-lock.yaml": ``,
            Dockerfile: `FROM node`,
            "_apps/web/web.Dockerfile": `FROM nginx`,
            ".github/workflows/ci.yml": `on: push`,
            ".github/workflows/release.yaml": `on: tag`,
            // `docs` counts the map (docs/architecture); package READMEs are counted separately by packageSignals.
            "docs/architecture/repo.md": `# repo`,
        });
        const found = await choreShape(dir);
        expect(found.lockfile).toBe(true);
        expect(found.packageManifest).toBe(true);
        expect(found.dockerfiles.toSorted()).toEqual([`Dockerfile`, `_apps/web/web.Dockerfile`]);
        expect(found.ci.toSorted()).toEqual([`.github/workflows/ci.yml`, `.github/workflows/release.yaml`]);
        expect(found.docs).toEqual([`repo.md`]);
    });

    test(`an empty repository rules everything out rather than guessing`, async () => {
        const found = await choreShape(await scaffold({ "README.md": `# hi` }));
        expect(found).toEqual({ docs: [], dockerfiles: [], ci: [], lockfile: false, packageManifest: false, deps: [] });
    });

    test(`a single-package app declares its dependencies even though it has no workspace packages`, async () => {
        const dir = await scaffold({
            "package.json": JSON.stringify({ dependencies: { react: `^19.0.0` }, devDependencies: { tailwindcss: `^4.0.0`, vite: `^6.0.0` } }),
        });
        expect(await packageSignals(dir)).toEqual([]);
        expect((await choreShape(dir)).deps).toEqual([`react`, `tailwindcss`, `vite`]);
    });

    test(`a workspace unions the root manifest with every package's`, async () => {
        const dir = await scaffold({
            "package.json": JSON.stringify({ devDependencies: { turbo: `^2.0.0` } }),
            "pnpm-workspace.yaml": `packages:\n  - _apps/*\n`,
            "_apps/web/package.json": JSON.stringify({ name: `@x/web`, dependencies: { vue: `^3.4.0` } }),
        });
        expect((await choreShape(dir)).deps).toEqual([`turbo`, `vue`]);
    });

    test(`peer and optional dependencies count, and a name is never repeated`, async () => {
        const dir = await scaffold({
            "package.json": JSON.stringify({
                dependencies: { react: `^19.0.0` },
                peerDependencies: { react: `^19.0.0`, "@angular/core": `^19.0.0` },
            }),
        });
        expect((await choreShape(dir)).deps).toEqual([`@angular/core`, `react`]);
    });

    test(`a manifest that does not parse leaves the rest of the shape intact`, async () => {
        const found = await choreShape(await scaffold({ "package.json": `{ not json`, Dockerfile: `FROM node` }));
        expect(found.deps).toEqual([]);
        expect(found.dockerfiles).toEqual([`Dockerfile`]);
    });

    test(`an empty docs directory is not documentation`, async () => {
        const dir = await scaffold({ "docs/architecture/.gitkeep": `` });
        expect((await choreShape(dir)).docs).toEqual([]);
    });

    test(`the single-file CI conventions count too`, async () => {
        expect((await choreShape(await scaffold({ ".gitlab-ci.yml": `stages: []` }))).ci).toEqual([`.gitlab-ci.yml`]);
        expect((await choreShape(await scaffold({ Jenkinsfile: `pipeline {}` }))).ci).toEqual([`Jenkinsfile`]);
    });

    // node_modules is the ignored dir most likely to hide a Dockerfile, since many packages ship one.
    test(`the sweep does not descend into ignored directories`, async () => {
        const dir = await scaffold({ "node_modules/some-dep/Dockerfile": `FROM node`, "dist/Dockerfile": `FROM node` });
        expect((await choreShape(dir)).dockerfiles).toEqual([]);
    });

    test(`workspace shape skips only the top-level reference shelf`, async () => {
        const dir = await scaffold({
            "refs/upstream/Dockerfile": `FROM hidden`,
            "app/refs/Dockerfile": `FROM visible`,
        });
        expect((await choreShape(dir, true)).dockerfiles).toEqual([`app/refs/Dockerfile`]);
        expect((await choreShape(dir)).dockerfiles.toSorted()).toEqual([`app/refs/Dockerfile`, `refs/upstream/Dockerfile`]);
    });
});

// The rail badge and the panel list at once. A reading of a repo is shared only with a caller that asked before it
// began, so whatever either is shown was read after it asked; one begun earlier is waited out and read again.
describe(`shared readings`, () => {
    // The file-count half held open per call until the test lets it go, counting the readings each repo got.
    const heldCount = async () => {
        const begun: string[] = [];
        const releases: (() => void)[] = [];
        const deps: SignalsDeps = {
            root: await scaffold({}),
            codeFiles: async (repo) => {
                begun.push(repo);
                await new Promise<void>((resolve) => releases.push(resolve));
                return begun.length;
            },
            log: () => undefined,
        };
        return { deps, begun, release: () => releases.shift()?.() };
    };

    const settle = (): Promise<void> => new Promise<void>((resolve) => setTimeout(resolve, 1));

    test(`a finished reading serves the next caller until a file under the repo changes`, async () => {
        const { deps, begun, release } = await heldCount();
        const shared = sharedChoreSignals(deps);
        const first = shared.of(`a`, shared.asked());
        await settle();
        release();
        expect((await first).totals.files).toBe(1);
        expect((await shared.of(`a`, shared.asked())).totals.files).toBe(1);
        expect(begun).toEqual([`a`]);
        // A change elsewhere leaves it; one under it reads again.
        shared.changed([`b/README.md`]);
        expect((await shared.of(`a`, shared.asked())).totals.files).toBe(1);
        shared.changed([`a/package.json`]);
        const changed = shared.of(`a`, shared.asked());
        await settle();
        release();
        expect((await changed).totals.files).toBe(2);
        expect(begun).toEqual([`a`, `a`]);
    });

    test(`a finished reading is read again once it is ten seconds old`, async () => {
        const { deps, begun, release } = await heldCount();
        let now = 0;
        const shared = sharedChoreSignals(deps, () => now);
        const first = shared.of(`a`, shared.asked());
        await settle();
        release();
        await first;
        now = 10_000;
        const later = shared.of(`a`, shared.asked());
        await settle();
        release();
        await later;
        expect(begun).toEqual([`a`, `a`]);
    });

    test(`a reading begun after a caller asked is shared with it, and one begun before is read again once it is done`, async () => {
        const { deps, begun, release } = await heldCount();
        const shared = sharedChoreSignals(deps);

        const badge = shared.asked();
        const badgeFirst = shared.of(`a`, badge);
        await settle();
        // The panel asks while the badge's reading of `a` is under way: that reading began first, so it is not the panel's.
        const panel = shared.asked();
        const panelFirst = shared.of(`a`, panel);
        await settle();
        expect(begun).toEqual([`a`]);
        release();
        const badgeA = await badgeFirst;
        await settle();
        expect(begun).toEqual([`a`, `a`]);
        release();
        const panelA = await panelFirst;
        expect(panelA).not.toBe(badgeA);
        expect(panelA.totals.files).toBe(2);

        // The badge moves on to `b` after the panel asked: that reading is the panel's as much as the badge's.
        const badgeSecond = shared.of(`b`, badge);
        const panelSecond = shared.of(`b`, panel);
        await settle();
        expect(begun).toEqual([`a`, `a`, `b`]);
        release();
        expect(await panelSecond).toBe(await badgeSecond);
    });

    test(`everyone who asked while a reading was under way shares the one that follows it`, async () => {
        const { deps, begun, release } = await heldCount();
        const shared = sharedChoreSignals(deps);
        const under = shared.of(`a`, shared.asked());
        await settle();
        const late = [shared.of(`a`, shared.asked()), shared.of(`a`, shared.asked()), shared.of(`a`, shared.asked())];
        release();
        await under;
        await settle();
        release();
        const answers = await Promise.all(late);
        expect(begun).toEqual([`a`, `a`]);
        expect(new Set(answers).size).toBe(1);
    });

    // A count that fails costs the list that repo's size, never the list: the manifests are still read, and the next ask
    // tries again.
    test(`a failing file count lists the repo without a size, and is not kept`, async () => {
        const root = await scaffold({
            "package.json": JSON.stringify({ dependencies: { vue: `^3.0.0` } }),
            "pnpm-workspace.yaml": `packages:\n  - libs/*\n`,
            "libs/one/package.json": JSON.stringify({ name: `@x/one`, dependencies: { zod: `^4.0.0` } }),
        });
        let asked = 0;
        const said: string[] = [];
        const shared = sharedChoreSignals({
            root,
            codeFiles: async () => {
                asked += 1;
                throw new Error(`daemon answered 403 for GET /workspace/search`);
            },
            log: (message) => said.push(message),
        });

        const reading = await shared.of(``, shared.asked());
        expect(reading.packages).toEqual([{ dir: `libs/one`, name: `@x/one`, dependencies: [`zod`], devDependencies: [], documented: false }]);
        expect(reading.shape).toEqual({ docs: [], dockerfiles: [], ci: [], lockfile: false, packageManifest: true, deps: [`vue`, `zod`] });
        expect([reading.hotspots, reading.keyModules]).toEqual([[], []]);
        expect(reading.totals).toEqual({ files: 0, symbols: 0, complexity: 0, hotspots: 0 });
        expect(reading.indexed).toBe(false);
        expect(said).toEqual([`could not count the workspace's code files, listing it without a size: daemon answered 403 for GET /workspace/search`]);

        await shared.of(``, shared.asked());
        expect(asked).toBe(2);
    });
});
