#!/usr/bin/env node
// Writes the code chores' automation templates into intentic-extension.json from this extension's chores book
// (src/chores, read as TypeScript by Node's own type stripping): one template per chore the book says is worth running
// unattended, its prompt the book's own. The sandbox computed these itself until 2026-11-26; now they are this
// extension's, offered while it is on, and static in the manifest so the daemon reads them like any extension's. Every
// other template (the two chores the book cannot measure, review-agent-work and dreaming-session) is left as it is. Run
// it after changing the book; `--check` writes nothing and exits 1 when the manifest differs from it.
import { readFile, writeFile } from "node:fs/promises";
import { CHORES, choreAutomationPrompt } from "../src/chores/index.ts";

const MANIFEST = new URL("../intentic-extension.json", import.meta.url);

/** The book's scheduled chores, as the templates the composer offers. */
export const bookTemplates = () =>
    CHORES.flatMap((chore) => {
        const prompt = choreAutomationPrompt(chore);
        return chore.automation === undefined || prompt === undefined
            ? []
            : [
                  {
                      id: chore.id,
                      title: chore.title,
                      // An open string from the book; an unknown name falls back to the icon set's default glyph.
                      icon: chore.icon,
                      trigger: { kind: "schedule", cron: chore.automation.cron },
                      description: chore.description,
                      guard: chore.automation.guard,
                      prompt,
                      note: chore.automation.note,
                      offer: "create",
                      chore: true,
                  },
              ];
    });

const main = async () => {
    const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
    const book = bookTemplates();
    const fromBook = new Set(book.map((template) => template.id));
    // Hand-written ones first, as they stand; the book's after them, in the book's order.
    const kept = (manifest.contributes.automationTemplates ?? []).filter((template) => !fromBook.has(template.id));
    const next = { ...manifest, contributes: { ...manifest.contributes, automationTemplates: [...kept, ...book] } };
    const text = `${JSON.stringify(next, null, 4)}\n`;
    if (process.argv.includes("--check")) {
        const current = await readFile(MANIFEST, "utf8");
        if (current !== text) {
            process.stderr.write("intentic-extension.json's chore templates are behind the chores book: run `node scripts/chore-templates.mjs`\n");
            process.exit(1);
        }
        return;
    }
    await writeFile(MANIFEST, text);
};

if (import.meta.url === `file://${process.argv[1]}`) {
    await main();
}
