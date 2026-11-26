import { defineConfig, type Plugin } from "vite";

/* The bundler writes a string literal's escaped control characters (yaml's `'\x02'` token markers) back as the raw
   bytes, which makes git and every diff viewer read the committed bundle as binary. They can only stand inside a string,
   a template, a regular expression or a comment, where the `\uXXXX` escape means the same character, so they are
   written back escaped. */
const CONTROL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/gu;
const escapeControlBytes = (): Plugin => ({
    name: `escape-control-bytes`,
    generateBundle: (_options, bundle) => {
        for (const output of Object.values(bundle)) {
            if (output.type === `chunk`) {
                output.code = output.code.replace(CONTROL, (byte) => `\\u${byte.charCodeAt(0).toString(16).padStart(4, `0`)}`);
            }
        }
    },
});

/* The backend bundle: dist/server.js, the manifest's `server` entry. Nothing but node builtins is provided at runtime, so
   everything it imports (the book, zod, yaml, @intentic/base) is bundled in. Runs after the UI build, which empties dist/. */
export default defineConfig({
    plugins: [escapeControlBytes()],
    build: {
        ssr: "src/server/server.ts",
        outDir: "dist",
        emptyOutDir: false,
        target: "node22",
        rollupOptions: { output: { entryFileNames: "server.js" } },
    },
    ssr: { noExternal: true },
});
