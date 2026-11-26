import assert from "node:assert/strict";
import { access, constants, readFile, stat } from "node:fs/promises";
import { test } from "node:test";
import { ExtensionManifestSchema, extensionIdOf } from "@intentic/extension-manifest";

/* The manifest against the rules the daemon enforces at install time, with the published schema, not a copy of it. */

const here = (path) => new URL(`../${path}`, import.meta.url);
const manifest = JSON.parse(await readFile(here(`intentic-extension.json`), `utf8`));

test(`parses with the published schema and installs under the identity the listing names`, () => {
    const parsed = ExtensionManifestSchema.parse(manifest);
    assert.equal(extensionIdOf(parsed), `intentic.maintenance`);
    assert.match(parsed.engines.intentic, /^\^2\./u, `a caret range on a major the host has never heard of is refused silently`);
});

/* The entry is the file the host fetches and imports from a blob URL; in the monorepo this extension had none. */
test(`every path the manifest promises exists`, async () => {
    assert.equal(manifest.entry, `dist/extension.js`);
    const promised = [manifest.entry, manifest.server].filter((path) => path !== undefined);
    for (const card of manifest.contributes?.capabilities ?? []) {
        promised.push(card.skill);
    }
    for (const path of promised) {
        await access(here(path), constants.R_OK).catch(() => assert.fail(`${path} is missing: run \`pnpm build\` before publishing`));
    }
});

/* The daemon only prepends the directory to PATH, so a mode-644 file is a command that cannot run. */
test(`every shipped tool is executable`, async (t) => {
    const bin = manifest.contributes?.bin;
    if (bin === undefined) {
        t.skip(`no bin contribution`);
        return;
    }
    const { readdir } = await import(`node:fs/promises`);
    const tools = await readdir(here(bin));
    assert.ok(tools.length > 0, `${bin} ships no tools`);
    for (const tool of tools) {
        const mode = (await stat(here(`${bin}/${tool}`))).mode;
        assert.ok(mode & 0o111, `${tool} is not executable`);
        assert.match(await readFile(here(`${bin}/${tool}`), `utf8`), /^#!\/usr\/bin\/env node\n/u);
    }
});

/* The Agent SDK recognises a plugin by this file alone; a directory without it installs clean and teaches nothing. */
test(`the agent contribution is a Claude Code plugin`, async (t) => {
    const plugin = manifest.contributes?.agent?.path;
    if (plugin === undefined) {
        t.skip(`no agent contribution`);
        return;
    }
    await access(here(`${plugin}/.claude-plugin/plugin.json`), constants.R_OK);
});

/* The code chores' templates moved here from the sandbox's own catalogue (2026-11-26): every chore this extension's book
   (src/chores) schedules has one, filed as a chore and offered one-click, on the book's own schedule. The prompt text is
   not compared here; scripts/chore-templates.mjs rewrites them from the book. */
test(`every chore the book schedules has a template, as a one-click chore on the book's schedule`, async () => {
    const { CHORES } = await import(`../src/chores/index.ts`);
    const templates = new Map((manifest.contributes?.automationTemplates ?? []).map((template) => [template.id, template]));
    for (const chore of CHORES.filter((entry) => entry.automation !== undefined)) {
        const template = templates.get(chore.id);
        assert.ok(template !== undefined, `${chore.id} has no template`);
        assert.deepEqual(template.trigger, { kind: `schedule`, cron: chore.automation.cron });
        assert.equal(template.chore, true);
        assert.equal(template.offer, `create`);
    }
});

/* The two the book cannot measure: an agent's diff after its turn, and the fleet's own session history. */
test(`the hand-written chores wake on a settled turn and on a session count, not on a guard`, () => {
    const byId = new Map((manifest.contributes?.automationTemplates ?? []).map((template) => [template.id, template]));
    assert.deepEqual(byId.get(`review-agent-work`)?.trigger, { kind: `workspace`, event: `turn.settled` });
    assert.deepEqual(byId.get(`dreaming-session`)?.trigger, { kind: `schedule`, cron: `0 5 * * *`, afterSessions: 30 });
    assert.equal(byId.get(`dreaming-session`)?.guard, undefined);
    for (const template of byId.values()) {
        assert.equal(template.chore, true, `${template.id} is filed as a chore`);
    }
});

/* (2026-11-26) The job this extension starts runs for, declared here since the sandbox's own table stopped listing it, under
   the id that table gave it: the owner's stored choice of setup names it, so it never changes. */
test(`declares its model role under the id a stored choice names`, () => {
    assert.deepEqual(
        manifest.contributes?.modelRoles?.map((role) => [role.id, role.setup]),
        [[`maintenance-chore`, `medium`]],
    );
});
