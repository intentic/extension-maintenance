import { hostSlot as e, sandboxLedger as t, sandboxPoll as n } from "@intentic/extension-api";
import { ExtensionManifestSchema as r } from "@intentic/extension-manifest";
import { Fragment as i, computed as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createSlots as u, createTextVNode as d, createVNode as f, defineComponent as p, normalizeClass as m, openBlock as h, ref as ee, renderList as te, toDisplayString as g, unref as _, watch as ne, withCtx as v } from "vue";
import { AgentRunButton as re, Button as ie, DisclosureRow as ae, Icon as oe, Notice as se, PageAction as ce, ProjectChip as le, RepoRail as ue, RowGroup as de, SegmentedControl as fe, SplitView as pe, StatusBadge as me, freshness as he, noticeOf as ge, timeAgo as _e, ui as ve, useAgentRunPick as ye, useNow as be } from "@intentic/extension-ui";
import { useQuery as xe, useQueryClient as y } from "@tanstack/vue-query";
//#region \0rolldown/runtime.js
var Se = Object.defineProperty, b = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, Ce = (e, t) => {
	let n = {};
	for (var r in e) Se(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || Se(n, Symbol.toStringTag, { value: "Module" }), n;
}, x, we = b((() => {
	x = (e, t, n) => `${e} ${e === 1 ? t : n ?? (/(s|x|z|ch|sh)$/.test(t) ? `${t}es` : `${t}s`)}`;
})), Te, Ee, S, De, Oe = b((() => {
	Te = 2166136261, Ee = 16777619, S = (...e) => {
		let t = e.join("\0"), n = Te;
		for (let e = 0; e < t.length; e++) n = ((n ^ t.charCodeAt(e)) >>> 0) * Ee, n >>>= 0;
		return n.toString(36).padStart(7, "0");
	}, De = (e) => e <= 0 ? -1 : Math.floor(Math.log2(e));
})), ke, Ae, je, Me, Ne = b((() => {
	ke = ({ subject: e, why: t, diagnosis: n, goal: r, invariants: i, done: a }) => [
		e,
		`Why: ${t} ${n}`,
		r,
		`${i} ${a}`
	].join("\n\n"), Ae = "The measurement woke you; it did not decide anything. Read the repository before you touch it, and treat every finding as a claim to verify rather than a task to execute. If a finding is wrong, say why in one line and leave it. A run that verifies ten and fixes two is a good run.", je = "Keep it mechanical and separately explainable: nothing lands that you could not justify on its own line of the summary. Do not reformat, rename or \"while I was in here\" anything the finding did not name. Run the repository's own type-check and tests before you finish, and if you cannot make them pass, leave the change out and say so.", Me = "Change nothing. This is a survey: the output is your findings, cited file:line, and a recommendation the owner can act on or dismiss. Where you would propose an edit, describe it and where it would go instead of making it.";
})), Pe, Fe, Ie, Le, Re, ze, Be, Ve, He, Ue, We, Ge, Ke, qe, Je, Ye, Xe = b((() => {
	Pe = [
		{
			id: "react",
			label: "React",
			packages: ["react"]
		},
		{
			id: "vue",
			label: "Vue",
			packages: ["vue"]
		},
		{
			id: "angular",
			label: "Angular",
			packages: ["@angular/core"]
		}
	], Fe = ["tailwindcss"], Ie = (e) => Pe.filter((t) => t.packages.some((t) => e.includes(t))), Le = (e) => Fe.some((t) => e.includes(t)), Re = [
		"!**/node_modules/**",
		"!**/dist/**",
		"!**/build/**",
		"!**/.next/**",
		"!**/out/**",
		"!**/coverage/**",
		"!**/vendor/**",
		"!**/generated/**",
		"!**/*.{test,spec,stories}.*"
	], ze = [
		"*.vue",
		"*.tsx",
		"*.jsx",
		"*.component.ts"
	], Be = [
		"*.vue",
		"*.tsx",
		"*.jsx",
		"*.html",
		"*.svelte",
		"*.astro"
	], Ve = "-\\[(#[0-9a-fA-F]{3,8}|(rgb|hsl)a?\\(|[0-9]+(\\.[0-9]+)?px)", He = [
		{
			id: "react-class-component",
			framework: "react",
			label: "class components",
			replacement: "function components with hooks",
			pattern: "extends\\s+(React\\.)?(Pure)?Component\\b",
			globs: ["*.tsx", "*.jsx"]
		},
		{
			id: "react-legacy-render",
			framework: "react",
			label: "the legacy ReactDOM.render entry point",
			replacement: "createRoot from react-dom/client",
			pattern: "ReactDOM\\.render\\(",
			globs: [
				"*.tsx",
				"*.jsx",
				"*.ts",
				"*.js"
			]
		},
		{
			id: "react-unsafe-lifecycle",
			framework: "react",
			label: "the pre-16.3 lifecycle methods",
			replacement: "effects, or the UNSAFE_ prefixed names if the behaviour is genuinely wanted",
			pattern: "\\bcomponentWill(Mount|ReceiveProps|Update)\\b",
			globs: ["*.tsx", "*.jsx"]
		},
		{
			id: "react-prop-types",
			framework: "react",
			label: "runtime prop-types",
			replacement: "the component's own TypeScript props type",
			pattern: "from\\s+[\\x22\\x27]prop-types[\\x22\\x27]",
			globs: ["*.tsx", "*.jsx"]
		},
		{
			id: "vue-options-api",
			framework: "vue",
			label: "the Options API",
			replacement: "<script setup> with the Composition API",
			pattern: "<script[^>]*\\bsetup\\b",
			globs: ["*.vue"],
			absent: !0
		},
		{
			id: "vue-2-lifecycle",
			framework: "vue",
			label: "the Vue 2 teardown hooks",
			replacement: "beforeUnmount and unmounted",
			pattern: "\\bbeforeDestroy\\s*[(:]|\\bdestroyed\\s*(\\(\\s*\\)\\s*\\{|:\\s*(async\\s+)?(function|\\(\\s*\\)\\s*=>))",
			globs: ["*.vue"]
		},
		{
			id: "vue-global-api",
			framework: "vue",
			label: "the Vue 2 global constructor",
			replacement: "createApp and defineComponent",
			pattern: "\\b(new\\s+Vue\\(|Vue\\.extend\\()",
			globs: [
				"*.vue",
				"*.ts",
				"*.js"
			]
		},
		{
			id: "angular-ngmodule",
			framework: "angular",
			label: "NgModule declarations",
			replacement: "standalone components",
			pattern: "@NgModule\\(",
			globs: ["*.ts"]
		},
		{
			id: "angular-structural-directives",
			framework: "angular",
			label: "the structural directives",
			replacement: "the built-in control flow blocks",
			pattern: "\\*ng(If|For|Switch)\\b",
			globs: ["*.html", "*.ts"]
		},
		{
			id: "angular-module-providers",
			framework: "angular",
			label: "the module-based providers",
			replacement: "the provide* functions in the application config",
			pattern: "\\b(HttpClientModule|BrowserAnimationsModule|RouterModule\\.forRoot)\\b",
			globs: ["*.ts"]
		}
	], Ue = (e) => He.find((t) => t.id === e), We = (e) => e.replace(/^\.\//, ""), Ge = 3, Ke = /^(base|the)/, qe = /(v[0-9]+|new|old|legacy|copy|component|[0-9]+)$/, Je = /* @__PURE__ */ new Set([
		"index",
		"app",
		"main",
		"root",
		"page",
		"layout",
		"loading",
		"error",
		"template",
		"default",
		"notfound"
	]), Ye = (e) => {
		let t = ((We(e).split("/").pop() ?? "").split(".")[0] ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
		if (t === "" || Je.has(t)) return;
		let n = t.replace(qe, ""), r = (n.length >= Ge ? n : t).replace(Ke, "");
		return r.length >= Ge ? r : t;
	};
})), Ze, Qe, $e, et = b((() => {
	Ze = "INTENTIC_WORKSPACE_ROOT_EXCLUDE", Qe = `\${${Ze}:+--glob=!/\${${Ze}}/**}`, $e = `\${${Ze}:+--ignore=\${${Ze}}/**}`;
})), C, tt, nt, rt, it, w, at, ot, st, ct, lt, ut, dt, ft, pt, mt, ht, gt, _t, vt, yt, bt, xt, St, Ct, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt, Nt, Pt, Ft, It, Lt, Rt, zt, Bt, Vt, Ht, Ut, Wt, Gt, Kt, qt, Jt, Yt = b((() => {
	we(), Oe(), Ne(), Xe(), et(), C = 864e5, tt = "/tmp/intentic-chore-audit.json", nt = "/tmp/intentic-chore-knip.json", rt = "/tmp/intentic-chore-jscpd", it = `${rt}/jscpd-report.json`, w = (e) => e === "root" || e === "" ? "the workspace root repository" : e, at = (e) => e === "root" || e === "" ? "workspace root" : e, ot = (e) => `${e.kind} · ${e.name} ${e.current} → ${e.latest}`, st = (e, t) => {
		let n = e.probes.get(t);
		if (n?.state === "ok" && n.facts !== void 0 && n.facts.id === t) return n.facts;
	}, ct = /* @__PURE__ */ new Set(["critical", "high"]), lt = {
		id: "security-advisories",
		title: "Patch security advisories",
		icon: "shield",
		description: "Published advisories against this dependency tree, and the ones whose fix is a version bump.",
		kind: "carrying",
		criterion: "pnpm audit reports an advisory of high or critical severity against the resolved tree.",
		applies: (e) => e.shape.lockfile ? void 0 : "no lockfile",
		stance: "act",
		needs: ["audit"],
		cadenceMs: 0,
		automation: {
			cron: "0 4 * * *",
			guard: `pnpm audit --json > ${tt} 2>/dev/null; [ "$(jq '(.metadata.vulnerabilities.high // 0) + (.metadata.vulnerabilities.critical // 0)' ${tt} 2>/dev/null || echo 0)" -gt 0 ]`,
			note: "nightly · high + critical only",
			report: tt,
			woke: `pnpm audit's report for this workspace is in ${tt} (JSON), and it woke you because it carries a high or critical advisory.`
		},
		assess: (e) => {
			let t = st(e, "audit");
			if (t === void 0) return;
			let n = t.advisories.filter((e) => ct.has(e.severity));
			if (n.length === 0) return;
			let r = n.filter((e) => !e.dev), i = n.filter((e) => e.patched !== void 0);
			return {
				headline: `${x(n.length, "advisory", "advisories")}, ${i.length} with a published fix`,
				detail: n.toSorted((e, t) => e.name.localeCompare(t.name)).map((e) => `${e.severity} · ${e.name}, ${e.title}${e.patched === void 0 ? " (no patch yet)" : ""}`),
				digest: S(...n.map((e) => `${e.name}@${e.severity}`).toSorted()),
				severity: r.length > 0 ? "warning" : "info",
				why: `pnpm audit reports ${x(n.length, "high or critical advisory", "high or critical advisories")} against ${w(e.repo)}, ${r.length} reaching a production dependency path, ${i.length} with a published patched range: ${n.map((e) => `${e.name} (${e.severity}${e.dev ? ", dev-only" : ""}${e.patched === void 0 ? ", no patch" : `, fixed in ${e.patched}`})`).join("; ")}.`
			};
		},
		diagnosis: "An advisory with a published fix is a version bump someone has to actually make; one without is a risk to decide about.",
		goal: "For each advisory, establish whether this workspace reaches the vulnerable code path at all: a transitive dependency of a build-time tool is a different problem from one in a running service. Where the fix is a version bump the lockfile can absorb, make it. Where it needs a real upgrade or has no patch published, leave it and say what it would take. Never rewrite application code to route around a CVE.",
		done: "Done when `pnpm audit` reports fewer high/critical advisories than it did, and the repository's type-check and tests pass."
	}, ut = 20, dt = {
		id: "dependencies-outdated",
		title: "Update dependencies",
		icon: "arrow-circle-up",
		description: "How far behind the registry this tree has drifted, and which majors are waiting.",
		kind: "accruing",
		criterion: "A dependency is a major version behind, or more than 20 are behind by any amount.",
		applies: (e) => e.shape.packageManifest ? void 0 : "no package.json",
		stance: "act",
		needs: ["outdated"],
		cadenceMs: 30 * C,
		assess: (e) => {
			let t = st(e, "outdated");
			if (t === void 0) return;
			let n = t.packages.filter((e) => e.kind === "major");
			if (!(n.length === 0 && t.packages.length < ut)) return {
				headline: n.length === 0 ? `${x(t.packages.length, "package")} behind` : `${x(n.length, "major")} waiting, ${t.packages.length} behind in total`,
				detail: n.toSorted((e, t) => e.name.localeCompare(t.name)).map(ot),
				digest: S(...n.map((e) => `${e.name}@${e.latest}`).toSorted(), `total:${De(t.packages.length)}`),
				severity: "info",
				why: `pnpm outdated reports ${x(t.packages.length, "dependency", "dependencies")} behind the registry in ${w(e.repo)}, ${n.length} of them by a major version${n.length === 0 ? "" : `: ${n.map((e) => `${e.name} ${e.current} → ${e.latest}`).join("; ")}`}.`
			};
		},
		diagnosis: "Version drift is cheap to fix continuously and expensive to fix in one go, because the majors start depending on each other.",
		goal: "Take the patch and minor upgrades in one pass: those are what the lockfile can absorb without argument. Then take the majors ONE AT A TIME, reading each one's changelog for breaking changes before you touch anything, and stop at the first one that needs more than a mechanical fix: leave it, and say what it would take. Do not batch majors; a failing test after eight of them is a bisect nobody wanted.",
		done: "Done when the repository's type-check and tests pass, and your summary names every major you took and every one you left, with the reason."
	}, ft = {
		id: "dead-code",
		title: "Clear out dead code",
		icon: "trash",
		description: "Files, exports and dependencies nothing in this repository references any more.",
		kind: "accruing",
		criterion: "knip reports at least one unreferenced file, export or dependency.",
		applies: (e) => e.shape.packageManifest ? void 0 : "no package.json",
		stance: "act",
		needs: ["knip"],
		cadenceMs: 14 * C,
		automation: {
			cron: "0 3 * * *",
			guard: `pnpm exec knip --version >/dev/null 2>&1 || { echo "knip is not a devDependency of this repo"; exit 1; }; pnpm exec knip --reporter json > ${nt} && { echo "no dead code"; exit 1; }`,
			note: "nightly · wakes only on findings",
			report: nt,
			woke: `knip's findings for this workspace are in ${nt} (JSON), and it woke you because there are some.`
		},
		assess: (e) => {
			let t = st(e, "knip");
			if (t === void 0) return;
			let { files: n, exports: r, types: i, dependencies: a, devDependencies: o, sample: s } = t.deadCode;
			if (n + r + i + a + o !== 0) return {
				headline: `${x(n, "unreferenced file")}, ${x(r + i, "unused export")}, ${x(a + o, "unused dependency", "unused dependencies")}`,
				detail: s.map((e) => `unreferenced · ${e}`),
				digest: S(...s.toSorted(), `exports:${De(r + i)}`, `deps:${De(a + o)}`),
				severity: "info",
				why: `knip reports ${x(n, "unreferenced file")}, ${r + i} unused exports and ${a + o} unused dependencies in ${w(e.repo)}${s.length === 0 ? "" : `, among them ${s.join(", ")}`}.`
			};
		},
		diagnosis: "Code nothing reaches still has to be read, type-checked and kept compiling by everyone who works nearby.",
		goal: "Re-run knip yourself first: this measurement is hours old and the tree has moved. Then check each finding against how the file is actually used: knip is confidently wrong about anything reachable from OUTSIDE the repository, which means a package's public entry points, files a bundler or framework loads by convention, and types consumed only by a downstream package. Delete what is genuinely unreachable. Leave the false positives and list them in one line each, so the next run's reader knows they were considered rather than missed.",
		done: "Done when knip reports fewer findings, the repository's type-check and tests pass, and nothing you deleted is reachable from another package."
	}, pt = 5, mt = {
		id: "duplication",
		title: "Find duplication worth collapsing",
		icon: "clone",
		description: "Copy-paste that has grown past a fifth of a percent of the tree. Reports only, extracting is a design call.",
		kind: "drifting",
		criterion: "jscpd reports more than 5% of the scanned tree duplicated.",
		stance: "report",
		needs: ["jscpd"],
		cadenceMs: 30 * C,
		automation: {
			cron: "0 3 * * 1",
			guard: `pnpm dlx jscpd ${$e} --reporters json --output ${rt} --min-lines 12 --threshold 100 . >/dev/null 2>&1; [ "$(jq '.statistics.total.percentage // 0 | floor' ${it} 2>/dev/null || echo 0)" -ge ${pt} ]`,
			note: `weekly · wakes above ${pt}% duplication`,
			report: it,
			woke: `jscpd's clone report for this workspace is in ${it}, and it woke you because duplication is above ${pt}%.`
		},
		assess: (e) => {
			let t = st(e, "jscpd");
			if (t === void 0 || t.duplication.percentage < pt) return;
			let { percentage: n, clones: r, top: i } = t.duplication;
			return {
				headline: `${n.toFixed(1)}% of the tree is duplicated, across ${x(r, "clone")}`,
				detail: i.map((e) => `${e.lines} lines · ${e.first} ↔ ${e.second}`),
				digest: S(`pct:${Math.round(n)}`, ...i.map((e) => `${e.first}|${e.second}`).toSorted()),
				severity: "info",
				why: `jscpd reports ${n.toFixed(1)}% duplication across ${x(r, "clone")} in ${w(e.repo)}; the largest are ${i.map((e) => `${e.first} ↔ ${e.second} (${e.lines} lines)`).join("; ")}.`
			};
		},
		diagnosis: "Duplication only costs anything when the copies have to change together, and only some of it does.",
		goal: "Report the clones where the copies genuinely have to change together. For each: cite both file:line ranges, say what the shared concept actually is, and name where the extraction would live. Then say explicitly which of the reported clones you are NOT recommending against: generated files, deliberately repetitive tests, and lookalikes owned by different subsystems, so the next reader knows the list was triaged rather than truncated.",
		done: "Done when every clone in the report has either a named extraction or a one-line reason it should stay."
	}, ht = 60, gt = {
		id: "test-strength",
		title: "Strengthen tests that would not notice a bug",
		icon: "list-check",
		description: "Whether the suite would actually fail if the code broke, which is a different question from whether it passes.",
		kind: "accruing",
		criterion: `Stryker's mutation score for the repo is under ${ht}%.`,
		stance: "act",
		needs: ["mutation"],
		cadenceMs: 7 * C,
		assess: (e) => {
			let t = st(e, "mutation");
			if (t === void 0 || t.mutation.score >= ht) return;
			let { score: n, killed: r, survived: i, survivors: a } = t.mutation;
			return {
				headline: `${i} injected faults went unnoticed, ${n}% of them caught`,
				detail: a.map((e) => `${e.file}:${e.line} · ${e.mutator} → ${e.replacement} · survived`),
				digest: S(`bucket:${De(100 - n)}`, ...a.map((e) => `${e.file}:${e.line}`).toSorted()),
				severity: "info",
				why: `Stryker caught ${r} of ${r + i} injected faults in ${w(e.repo)} (${n}%), under the ${ht}% floor. Code that can be changed with every test still green: ${a.map((e) => `${e.file}:${e.line} (${e.mutator} → ${e.replacement})`).join("; ")}.`
			};
		},
		diagnosis: "Tests that run the code without checking what it produced pass whether or not the code is right, and no other check in this repository can tell the difference.",
		goal: "Take the survivors one at a time and, for each, decide which of two things it is. Either the mutation changes behaviour somebody depends on, in which case add the assertion that would have failed — usually at a BOUNDARY, and usually exact where the existing test was relational: pinning `bucketOf(0)` to its value catches what `not.toBe(bucketOf(1))` cannot. Or it is an equivalent mutant, code whose change genuinely cannot be observed, in which case say so and leave it. Do not chase the percentage: adding an assertion nobody needs to satisfy a number is exactly the ceremony this is meant to detect.",
		done: "Done when every named survivor has either a new assertion that fails without the change, or a one-line note saying why it cannot be observed."
	}, _t = {
		id: "documentation-refresh",
		title: "Document what nothing explains",
		icon: "file-edit",
		description: "Packages in this repository with no README, new ones first.",
		kind: "drifting",
		criterion: "A workspace package has no README.",
		applies: (e) => e.packages.length > 0 ? void 0 : "not a workspace",
		stance: "act",
		needs: [],
		cadenceMs: 90 * C,
		assess: (e) => {
			let t = e.signals.packages.filter((e) => !e.documented);
			if (t.length !== 0) return {
				headline: `${x(t.length, "package")} of ${e.signals.packages.length} have no document`,
				detail: t.map((e) => `${e.name} · ${e.dir}`),
				digest: S(...t.map((e) => e.dir).toSorted()),
				severity: "info",
				why: `${x(t.length, "package")} of ${e.signals.packages.length} in ${w(e.repo)} have no README: ${t.map((e) => e.dir).join(", ")}.`
			};
		},
		diagnosis: "A package nobody can read the shape of gets worked in by guesswork, and the guesses accumulate.",
		goal: "Follow this workspace's own documentation conventions: read them first, they are not optional and they are not generic. For each undocumented package, read the package before you write a word about it, and produce the document its conventions call for: what the package is FOR, how it fits the system, and which files matter. Explain at the module level. Never describe code line by line, and never document a package you did not read.",
		done: "Done when every package you named has a document that a newcomer could use to find the file they need, and no other file changed."
	}, vt = 3, yt = (e) => {
		if (e.length === 0) return 0;
		let t = e.toSorted((e, t) => e - t), n = Math.floor(t.length / 2);
		return t.length % 2 == 0 ? ((t[n - 1] ?? 0) + (t[n] ?? 0)) / 2 : t[n] ?? 0;
	}, bt = {
		id: "complexity",
		title: "Simplify what everything waits on",
		icon: "wave-pulse",
		description: "Files that both churn and carry the repository, where edits are slow and ripple outward.",
		kind: "accruing",
		criterion: "A file in the hotspot ranking is also a key module, or its branching is three times the median of that ranking.",
		stance: "act",
		needs: [],
		cadenceMs: 30 * C,
		assess: (e) => {
			if (!e.signals.indexed || e.signals.hotspots.length === 0) return;
			let t = new Set(e.signals.keyModules.map((e) => e.path)), n = yt(e.signals.hotspots.map((e) => e.complexity)), r = e.signals.hotspots.filter((e) => t.has(e.path) || e.complexity >= n * vt);
			if (r.length === 0) return;
			let i = (e, r) => t.has(e) ? "churns and the rest of the repository imports it" : `${r} branch points against a median of ${n}`;
			return {
				headline: `${x(r.length, "file")} where every edit is slow and ripples outward`,
				detail: r.map((e) => `${e.path}, ${e.commits} commits, ${i(e.path, e.complexity)}`),
				digest: S(...r.map((e) => e.path).toSorted()),
				severity: "info",
				why: `${x(r.length, "file")} in ${w(e.repo)} are both change magnets and structurally tangled: ${r.map((e) => `${e.path} (${e.commits} commits, ${e.complexity} branch points)`).join("; ")}.`
			};
		},
		diagnosis: "A file that changes constantly and branches heavily makes every edit near it slow and easy to get wrong.",
		goal: "Take ONE file: the worst of them, and no more. Read it first. If the rest of the repository imports it, separate the stable contract from the churn: a narrow surface for importers, the volatile implementation private behind it. If it is simply tangled, flatten it where it stands: edge cases as early returns, compound conditions behind named predicates, long chains as lookups, and extract a unit only if a cohesive one falls out. Behaviour stays identical, and no re-export shims are left behind.",
		done: "Done when `iq hotspots` reports materially fewer branch points for that file, the repository's checks pass, and no importer changed meaning."
	}, xt = {
		16: "2023-09-11",
		18: "2025-04-30",
		20: "2026-04-30",
		22: "2027-04-30",
		24: "2028-04-30"
	}, St = 90 * C, Ct = {
		id: "runtime-eol",
		title: "Move off an end-of-life runtime",
		icon: "bolt",
		description: "Whether the Node this sandbox runs still receives security patches.",
		kind: "carrying",
		criterion: "The Node release this sandbox runs is past its end-of-life date, or within 90 days of it.",
		applies: (e) => e.shape.packageManifest ? void 0 : "no package.json",
		stance: "act",
		needs: [],
		cadenceMs: 0,
		assess: (e) => {
			let t = Number.parseInt(e.node.replace(/^v/, ""), 10), n = xt[t];
			if (Number.isNaN(t) || n === void 0) return;
			let r = Date.parse(`${n}T00:00:00Z`);
			if (e.nowMs < r - St) return;
			let i = e.nowMs >= r, a = Math.round(Math.abs(r - e.nowMs) / C), o = e.signals.packages.filter((e) => e.engines?.node !== void 0);
			return {
				headline: i ? `Node ${t} stopped receiving security patches ${a} days ago` : `Node ${t} reaches end of life in ${a} days`,
				detail: [
					`running · ${e.node}`,
					`end of life · ${n}`,
					...o.map((e) => `pinned · ${e.name} requires node ${e.engines?.node ?? ""}`)
				],
				digest: S(`node:${t}`, i ? "eol" : "approaching"),
				severity: i ? "warning" : "info",
				why: `This sandbox runs ${e.node}, and Node ${t} ${i ? `reached end of life on ${n}` : `reaches end of life on ${n}`}, ${x(o.length, "package")} in ${w(e.repo)} pin a node engine range.`
			};
		},
		diagnosis: "An unsupported runtime stops receiving security patches, so every advisory against it stays open permanently.",
		goal: "Establish what actually pins this runtime: the image's own base, the workspace's nodeVersion, and each package's engines range. Propose the smallest move to a supported LTS, which of those pins have to change, in what order, and what is likely to break at that boundary. Make the pin changes that are mechanical; do NOT attempt the image rebuild itself.",
		done: "Done when the pins name a supported release, the repository's type-check and tests pass on it, and anything needing a rebuild is named as such."
	}, wt = [
		{
			category: "date handling",
			members: [
				"moment",
				"dayjs",
				"date-fns",
				"luxon",
				"js-joda"
			]
		},
		{
			category: "HTTP clients",
			members: [
				"axios",
				"got",
				"node-fetch",
				"superagent",
				"undici",
				"request"
			]
		},
		{
			category: "schema validation",
			members: [
				"zod",
				"yup",
				"joi",
				"ajv",
				"superstruct",
				"valibot"
			]
		},
		{
			category: "utility belts",
			members: [
				"lodash",
				"underscore",
				"ramda",
				"remeda"
			]
		},
		{
			category: "state stores",
			members: [
				"redux",
				"mobx",
				"zustand",
				"jotai",
				"recoil",
				"pinia",
				"valtio"
			]
		},
		{
			category: "UUID generation",
			members: [
				"uuid",
				"nanoid",
				"cuid",
				"shortid",
				"ulid"
			]
		},
		{
			category: "test runners",
			members: [
				"jest",
				"mocha",
				"ava",
				"tap"
			]
		}
	], Tt = {
		id: "library-overlap",
		title: "Settle on one library per job",
		icon: "box",
		description: "Two dependencies solving the same problem, both shipped, both maintained, one picked at random.",
		kind: "drifting",
		criterion: "Two or more installed dependencies do the same job.",
		applies: (e) => e.packages.length > 0 ? void 0 : "not a workspace",
		stance: "report",
		needs: [],
		cadenceMs: 90 * C,
		assess: (e) => {
			let t = new Set(e.signals.packages.flatMap((e) => [...e.dependencies, ...e.devDependencies])), n = wt.map(({ category: e, members: n }) => ({
				category: e,
				found: n.filter((e) => t.has(e))
			})).filter(({ found: e }) => e.length > 1);
			if (n.length !== 0) return {
				headline: `${x(n.length, "job")} done by more than one library`,
				detail: n.map(({ category: e, found: t }) => `${e} · ${t.join(", ")}`),
				digest: S(...n.map(({ category: e, found: t }) => `${e}:${t.toSorted().join("+")}`).toSorted()),
				severity: "info",
				why: `${w(e.repo)} depends on more than one library for the same job: ${n.map(({ category: e, found: t }) => `${e} (${t.join(", ")})`).join("; ")}.`
			};
		},
		diagnosis: "Two libraries for one job means both ship, both need upgrading, and new code picks whichever the neighbouring file used.",
		goal: "For each overlapping pair, find out which one is actually used. How many call sites each has, whether one is a transitive dependency nobody chose, and whether either is unmaintained. Recommend the one to keep and estimate the migration honestly, including the call sites where the two libraries genuinely differ in behaviour. Where the overlap is deliberate or the second is only transitive, say so and close the question.",
		done: "Done when every overlapping pair has a recommendation with a call-site count behind it, or a reason the overlap is fine."
	}, Et = 8, Dt = Pe.map((e) => e.label).join(", "), Ot = (e) => Ie(e.shape.deps).length > 0 ? void 0 : `no ${Dt}`, kt = (e) => e >= 1048576 ? `${(e / 1048576).toFixed(1)} MB` : `${Math.round(e / 1024)} kB`, At = 50, jt = 3, Mt = (e) => e.replace(/[.-](?=[A-Za-z0-9_-]*[0-9])[A-Za-z0-9_-]{8,}(\.[a-z0-9]+)$/, "$1"), Nt = {
		id: "bundle-weight",
		title: "Split what the browser downloads first",
		icon: "download",
		description: "What the last build put on disk, and whether it arrives as one download or several.",
		kind: "accruing",
		criterion: "A single asset is more than half of the build's total transfer size.",
		applies: Ot,
		stance: "report",
		needs: ["bundle"],
		cadenceMs: 30 * C,
		assess: (e) => {
			let t = st(e, "bundle");
			if (t === void 0) return;
			let { assets: n, totalGzip: r, dir: i } = t.bundle;
			if (n.length < jt || r === 0) return;
			let a = n.toSorted((e, t) => t.gzip - e.gzip), o = a[0];
			if (o === void 0) return;
			let s = o.gzip / r * 100;
			if (!(s < At)) return {
				headline: `${o.path} is ${Math.round(s)}% of the ${kt(r)} this build ships`,
				detail: a.slice(0, Et).map((e) => `${kt(e.gzip)} gzipped · ${e.path} (${kt(e.bytes)} on disk)`),
				digest: S(`total:${De(r)}`, ...a.slice(0, 5).map((e) => Mt(e.path)).toSorted()),
				severity: "info",
				why: `The build output in ${i}/ of ${w(e.repo)} is ${kt(r)} gzipped across ${x(n.length, "asset")}, and ${o.path} alone is ${kt(o.gzip)} of it: ${Math.round(s)}%. The next largest are ${a.slice(1, 4).map((e) => `${e.path} (${kt(e.gzip)})`).join(", ")}. This is the last build someone ran, read off disk; nothing rebuilt it to measure.`
			};
		},
		diagnosis: "Everything in the first chunk is downloaded and parsed before anything renders, whether or not the visitor needed it.",
		goal: "Find out what is actually IN the dominant chunk before proposing anything: the repository's own bundler can report this, and a recommendation made without it is guesswork. Then report the split worth making: which routes or features could load on demand, which dependencies are pulled in wholesale for one function, and which are only used behind an interaction nobody has yet had. Name the boundary for each and estimate what it saves. Where the chunk is genuinely all first-paint code, say so and close it.",
		done: "Done when every recommendation names a specific import boundary and the bytes it would move out of the first download."
	}, Pt = {
		id: "framework-idiom",
		title: "Finish the framework migrations",
		icon: "history",
		description: "Code still written the way the framework used to recommend, long after it stopped.",
		kind: "accruing",
		criterion: "A file uses a framework idiom that framework's own maintainers have replaced.",
		applies: Ot,
		stance: "act",
		needs: ["ui"],
		cadenceMs: 60 * C,
		assess: (e) => {
			let t = st(e, "ui");
			if (t === void 0) return;
			let n = new Set(Ie(e.signals.shape.deps).map((e) => e.id)), r = t.scan.idioms.flatMap(({ id: e, files: t }) => {
				let r = Ue(e);
				return r === void 0 || !n.has(r.framework) || t.length === 0 ? [] : [{
					rule: r,
					files: t
				}];
			});
			if (r.length === 0) return;
			let i = r.reduce((e, t) => e + t.files.length, 0), a = r.toSorted((e, t) => t.files.length - e.files.length);
			return {
				headline: `${x(r.length, "retired idiom")} still in use, across ${x(i, "file")}`,
				detail: a.map((e) => `${x(e.files.length, "file")} · ${e.rule.label} → ${e.rule.replacement}`),
				digest: S(...a.map((e) => `${e.rule.id}:${De(e.files.length)}`).toSorted()),
				severity: "info",
				why: `${w(e.repo)} still uses ${x(r.length, "idiom")} its framework has replaced: ${a.map((e) => `${e.rule.label} in ${x(e.files.length, "file")} (replaced by ${e.rule.replacement})`).join("; ")}. A sample of the files: ${a.flatMap((e) => e.files.slice(0, 3)).slice(0, Et).join(", ")}.`
			};
		},
		diagnosis: "A retired idiom keeps working until the major release that drops it, and then it is an emergency inside somebody else's upgrade.",
		goal: "Take ONE idiom, the one with the most files, and no more. Convert the files where the conversion is mechanical and the behaviour is provably identical. Stop at the first file that needs a design decision: a class component with genuine error-boundary semantics, an NgModule that something outside the repository imports: leave it, and say what it would take. Do not convert an idiom the repository has deliberately kept: if the newest code uses it too, that is a choice, and reporting it as one is the useful answer.",
		done: "Done when a re-scan reports fewer files on that idiom, the repository's type-check and tests pass, and every file you skipped has a one-line reason."
	}, Ft = {
		id: "component-overlap",
		title: "Settle on one component per job",
		icon: "copy",
		description: "Components built twice, the same name in two places, or the same logic under two names.",
		kind: "drifting",
		criterion: "Two component files reduce to the same name, or a duplicated block spans two components.",
		applies: Ot,
		stance: "report",
		needs: ["ui", "jscpd"],
		cadenceMs: 90 * C,
		assess: (e) => {
			let t = st(e, "ui"), n = st(e, "jscpd");
			if (t === void 0 || n === void 0) return;
			let r = /* @__PURE__ */ new Map();
			for (let e of t.scan.components) {
				let t = Ye(e);
				t !== void 0 && r.set(t, [...r.get(t) ?? [], We(e)]);
			}
			let i = [...r].filter(([, e]) => e.length > 1).map(([e, t]) => ({
				stem: e,
				paths: t.toSorted()
			})).toSorted((e, t) => t.paths.length - e.paths.length), a = new Set(t.scan.components.map(We)), o = n.duplication.top.filter((e) => a.has(We(e.first)) && a.has(We(e.second)));
			if (i.length === 0 && o.length === 0) return;
			let s = [...i.length === 0 ? [] : [`${x(i.length, "name")} used by more than one component`], ...o.length === 0 ? [] : [`${x(o.length, "clone")} spanning two of them`]];
			return {
				headline: s.join(", "),
				detail: [...i.slice(0, Et).map((e) => `${e.stem} · ${e.paths.join(", ")}`), ...o.map((e) => `${e.lines} shared lines · ${We(e.first)} ↔ ${We(e.second)}`)],
				digest: S(...i.map((e) => `${e.stem}:${e.paths.join("+")}`).toSorted(), ...o.map((e) => `${We(e.first)}|${We(e.second)}`).toSorted()),
				severity: "info",
				why: `${w(e.repo)} has ${s.join(" and ")}, out of ${x(t.scan.components.length, "component file")} scanned. ${i.length === 0 ? "" : `The names: ${i.slice(0, Et).map((e) => `${e.stem} (${e.paths.join(", ")})`).join("; ")}. `}${o.length === 0 ? "" : `The clones: ${o.map((e) => `${We(e.first)} ↔ ${We(e.second)}, ${e.lines} lines`).join("; ")}.`}`
			};
		},
		diagnosis: "A component built twice is maintained once, whichever copy the next person happens to open is the one that gets the fix.",
		goal: "Read every file in each group before saying anything about it; a shared name is a reason to look, not a finding on its own. For each group, say whether these genuinely do the same job, and if they do, name the one to keep and count the call sites that would have to move. Where the answer is that the same LOGIC is duplicated rather than the whole component: the same fetch and loading state, the same form validation, the same list virtualization written twice: say so, and name the hook or composable it should become and where it would live. Where two components share a name and nothing else, say that too and close it: a false family is worth one line, and the next reader needs to know it was considered.",
		done: "Done when every group has either a component to keep with a call-site count, a shared unit to extract with a home, or a reason it is fine."
	}, It = {
		id: "tailwind-arbitrary-values",
		title: "Put hard-coded styles back on the scale",
		icon: "palette",
		description: "Colours and sizes written inline in the markup, around the theme that already defines them.",
		kind: "drifting",
		criterion: "A Tailwind class hard-codes a colour or a pixel size instead of using the theme's scale.",
		applies: (e) => Le(e.shape.deps) ? void 0 : "no Tailwind",
		stance: "act",
		needs: ["ui"],
		cadenceMs: 30 * C,
		assess: (e) => {
			let t = st(e, "ui");
			if (t === void 0) return;
			let { bypasses: n } = t.scan;
			if (n.length === 0) return;
			let r = n.reduce((e, t) => e + t.count, 0), i = n.toSorted((e, t) => t.count - e.count).slice(0, Et);
			return {
				headline: `${x(r, "hard-coded value")} across ${x(n.length, "file")}`,
				detail: i.map((e) => `${e.path} · ${x(e.count, "value")}`),
				digest: S(...i.map((e) => e.path).toSorted(), `files:${De(n.length)}`, `total:${De(r)}`),
				severity: "info",
				why: `${w(e.repo)} has ${x(r, "Tailwind class", "Tailwind classes")} hard-coding a colour or a pixel size across ${x(n.length, "file")}; the heaviest are ${i.slice(0, 5).map((e) => `${e.path} (${e.count})`).join(", ")}.`
			};
		},
		diagnosis: "Every inline colour is a place the theme cannot reach, a palette change lands everywhere except the files that opted out of it.",
		goal: "Read the theme first: the Tailwind config, or the CSS that defines the tokens, so you know what the scale actually offers. Then replace the values that have a token: an exact palette match, a spacing step, a type size. Where a value is CLOSE to a token but not equal, do not round it silently; that is a visual change wearing a refactor's clothes. List those separately with both values and let the owner decide. Where a value has no token and should: a brand colour used in nine places, say that the theme is missing an entry rather than editing nine files.",
		done: "Done when a re-scan reports fewer hard-coded values, nothing renders differently, and every value you left has a one-line reason."
	}, Lt = ({ id: e, title: t, icon: n, description: r, diagnosis: i, goal: a, done: o, cadenceDays: s, applies: c }) => ({
		id: e,
		title: t,
		icon: n,
		description: r,
		kind: "surveying",
		criterion: `${s} days have passed since this review was last run.`,
		applies: c,
		stance: "report",
		needs: [],
		cadenceMs: s * C,
		survey: !0,
		assess: (t) => ({
			headline: `Not surveyed in ${s} days`,
			detail: [`Cadence · every ${s} days`],
			digest: S(e, `period:${Math.floor(t.nowMs / (s * C))}`),
			severity: "info",
			why: `This is a periodic review of ${w(t.repo)}, run every ${s} days; nothing measured it, it is due because it has been that long.`
		}),
		diagnosis: i,
		goal: a,
		done: o
	}), Rt = 25, zt = Lt({
		id: "standardize-patterns",
		title: "Standardize the cross-cutting patterns",
		icon: "sitemap",
		description: "Error handling, validation, logging, configuration, retries, pagination, the things every file does slightly differently.",
		diagnosis: "Cross-cutting concerns drift one file at a time, and the cost only shows up when someone has to work across several of them.",
		goal: "Pick the cross-cutting concerns this repository actually has: error handling, input validation, logging, configuration, retries, pagination, serialization, and for each, survey how it is done. Name the dominant pattern, the outliers, and which of the outliers are deliberate. Recommend ONE convention per concern with a file to point at as the reference implementation, and estimate the size of the conversion. Do not convert anything.",
		done: "Done when each concern has a named convention, a reference file, and a count of the sites that diverge from it.",
		cadenceDays: 90,
		applies: (e) => e.totals.files >= Rt ? void 0 : `only ${e.totals.files} indexed files`
	}), Bt = Lt({
		id: "deprecated-apis",
		title: "Audit deprecated APIs",
		icon: "exclamation-triangle",
		description: "Language, runtime and framework APIs this code still uses that their own maintainers have moved on from.",
		diagnosis: "A deprecated API works right up until the upgrade that removes it, and then it is an emergency during someone else's migration.",
		goal: "Survey what this repository uses that its own dependencies have deprecated: read the framework and runtime versions in use, check their deprecation notices, and search for the call sites. Include the repository's OWN deprecations: anything its code marks as deprecated and still calls. Rank by when each one actually breaks, not by how many call sites it has, and name the replacement for each. Change nothing.",
		done: "Done when every deprecation has call sites cited, a replacement named, and the release it is expected to break in.",
		cadenceDays: 90,
		applies: (e) => e.shape.packageManifest ? void 0 : "no package.json"
	}), Vt = Lt({
		id: "documentation-drift",
		title: "Re-read the documentation against the code",
		icon: "file",
		description: "Whether what the documents claim is still what the code does, the drift no tool can measure.",
		diagnosis: "Documentation is trusted in proportion to how recently it was true, and a document that is quietly wrong is worse than a missing one.",
		goal: "Read this repository's architecture documents against the code they describe. Report every claim that is no longer true, citing the document line and the file that contradicts it. Prioritise the claims someone would ACT on, where a subsystem lives, what owns what, which file to change: over prose that has merely aged. Do not rewrite the documents; produce the list of what is wrong.",
		done: "Done when every architecture document has been read and every false claim is listed with both sides cited.",
		cadenceDays: 90,
		applies: (e) => e.shape.docs.length > 0 ? void 0 : "no architecture documents"
	}), Ht = Lt({
		id: "ci-hygiene",
		title: "Tighten the CI pipeline",
		icon: "bolt",
		description: "What the pipeline re-does every run: uncached installs, rebuilt layers, jobs that could run in parallel.",
		diagnosis: "A slow pipeline is paid on every push by everyone, and it degrades one uncached step at a time without anyone deciding to.",
		goal: "Read this repository's pipeline definitions and report what it pays for repeatedly: dependency installs with no cache key, build outputs recomputed between jobs, steps that are serial for no reason, and matrix legs that duplicate each other's work. For each, name the file and step, say roughly what it costs per run, and give the change that would fix it. Where a step is slow because it genuinely has to be, say so: a pipeline that is honestly expensive is not a finding.",
		done: "Done when every finding names a file, a step, and a concrete change, and anything deliberately slow is called out as such.",
		cadenceDays: 90,
		applies: (e) => e.shape.ci.length > 0 ? void 0 : "no CI pipeline"
	}), Ut = Lt({
		id: "docker-image",
		title: "Slim the container image",
		icon: "box",
		description: "Layer order, build context and final size, what ships in the image that did not need to.",
		diagnosis: "Image size is paid on every pull and every cold start, and layer order decides how much of a build is cache hits.",
		goal: "Read this repository's Dockerfiles and report what makes the image larger or the build slower than it needs to be: layers ordered so that a source edit invalidates the dependency install, build-time toolchains left in the final stage, a build context that ships the whole repository, and package caches never cleaned. For each, cite the file and line, and name the change. Do not rewrite the Dockerfiles: an image that fails to build is a much worse problem than one that is larger than ideal.",
		done: "Done when every finding cites a Dockerfile line and names the change, with the ones that would need a base-image swap called out separately.",
		cadenceDays: 90,
		applies: (e) => e.shape.dockerfiles.length > 0 ? void 0 : "no Dockerfile"
	}), Wt = [
		{
			kind: "carrying",
			label: "Carrying",
			caption: "a risk this repository is running today, someone else decides when it becomes urgent"
		},
		{
			kind: "accruing",
			label: "Accruing",
			caption: "cheap now, expensive later, and always getting later"
		},
		{
			kind: "drifting",
			label: "Drifting",
			caption: "the shape of the thing is diverging from the idea of it"
		},
		{
			kind: "surveying",
			label: "Surveying",
			caption: "periodic reads with nothing measuring them, due because it has been that long"
		}
	], Gt = [
		lt,
		Ct,
		dt,
		ft,
		bt,
		gt,
		Nt,
		Pt,
		_t,
		mt,
		Tt,
		Ft,
		It,
		zt,
		Bt,
		Vt,
		Ht,
		Ut
	], Kt = Wt.map(({ kind: e }) => e), qt = Gt.toSorted((e, t) => Kt.indexOf(e.kind) - Kt.indexOf(t.kind)), Jt = (e, t, n) => ke({
		subject: `${e.title} in ${w(n)}.`,
		why: `${t.why} You were woken because: ${e.criterion} ${Ae}`,
		diagnosis: e.diagnosis,
		goal: e.goal,
		invariants: e.stance === "act" ? je : Me,
		done: e.done
	});
})), Xt, Zt, Qt, $t, en, tn, nn, rn, an, on, sn, cn, ln, un, dn, fn, pn, mn, hn, gn, _n, vn, yn, bn, xn, Sn, Cn, wn, Tn, En, Dn, On, kn, An, jn, Mn, Nn, Pn, Fn, In = b((() => {
	Xe(), et(), Xt = 864e5, Zt = (e) => {
		let t = e.indexOf("{");
		if (t !== -1) try {
			let n = JSON.parse(e.slice(t));
			return typeof n == "object" && n && !Array.isArray(n) ? n : void 0;
		} catch {
			return;
		}
	}, Qt = (e) => typeof e == "string" && e !== "" ? e : void 0, $t = (e) => Array.isArray(e) ? e.length : 0, en = (e) => e.replace(/^[^\d]*/, "").split(".").map((e) => Number.parseInt(e, 10) || 0), tn = (e, t) => {
		let [n = 0, r = 0] = en(e), [i = 0, a = 0] = en(t);
		return i === n ? a === r ? "patch" : "minor" : "major";
	}, nn = (e) => {
		let t = Zt(e);
		if (t === void 0) return;
		let n = [];
		for (let [e, r] of Object.entries(t)) {
			if (typeof r != "object" || !r) continue;
			let t = r, i = Qt(t.current), a = Qt(t.latest);
			i !== void 0 && a !== void 0 && i !== a && n.push({
				name: e,
				current: i,
				latest: a,
				kind: tn(i, a),
				section: Qt(t.dependencyType) ?? "dependencies"
			});
		}
		return {
			id: "outdated",
			packages: n
		};
	}, rn = /* @__PURE__ */ new Set([
		"critical",
		"high",
		"moderate",
		"low",
		"info"
	]), an = (e) => {
		let t = Zt(e);
		if (t === void 0) return;
		let n = t.advisories;
		if (n === void 0) return {
			id: "audit",
			advisories: []
		};
		if (typeof n != "object" || !n) return;
		let r = [];
		for (let e of Object.values(n)) {
			if (typeof e != "object" || !e) continue;
			let t = e, n = Qt(t.module_name), i = Qt(t.severity);
			if (n === void 0 || i === void 0 || !rn.has(i)) continue;
			let a = Qt(t.patched_versions), o = Array.isArray(t.findings) ? t.findings : [];
			r.push({
				name: n,
				severity: i,
				title: Qt(t.title) ?? n,
				...a === void 0 || a === "<0.0.0" ? {} : { patched: a },
				dev: o.length > 0 && o.every((e) => e.dev === !0)
			});
		}
		return {
			id: "audit",
			advisories: r
		};
	}, on = 8, sn = (e) => {
		let t = Zt(e)?.issues;
		if (!Array.isArray(t)) return;
		let n = t.filter((e) => typeof e == "object" && !!e), r = (e) => n.reduce((t, n) => t + $t(n[e]), 0);
		return {
			id: "knip",
			deadCode: {
				files: r("files"),
				exports: r("exports"),
				types: r("types"),
				dependencies: r("dependencies"),
				devDependencies: r("devDependencies"),
				sample: n.flatMap((e) => $t(e.files) === 0 ? [] : Qt(e.file) ?? []).slice(0, on)
			}
		};
	}, cn = 5, ln = (e) => {
		let t = Zt(e), n = t?.statistics;
		if (typeof n != "object" || !n) return;
		let r = n.total, i = typeof r == "object" && r ? r.percentage : void 0, a = Array.isArray(t?.duplicates) ? t.duplicates : [], o = (e) => typeof e == "object" && e ? Qt(e.name) ?? "?" : "?";
		return {
			id: "jscpd",
			duplication: {
				percentage: typeof i == "number" ? i : 0,
				clones: a.length,
				top: a.map((e) => ({
					lines: typeof e.lines == "number" ? e.lines : 0,
					first: o(e.firstFile),
					second: o(e.secondFile)
				})).toSorted((e, t) => t.lines - e.lines).slice(0, cn)
			}
		};
	}, un = 8, dn = /* @__PURE__ */ new Set(["Killed", "Timeout"]), fn = /* @__PURE__ */ new Set(["Survived", "NoCoverage"]), pn = (e) => {
		if (typeof e != "object" || !e) return [];
		let t = e.mutants;
		return Array.isArray(t) ? t.filter((e) => typeof e == "object" && !!e) : [];
	}, mn = (e) => {
		let t = e.location, n = typeof t == "object" && t ? t.start : void 0, r = typeof n == "object" && n ? n.line : void 0;
		return typeof r == "number" ? r : 0;
	}, hn = (e, t) => ({
		file: e,
		line: mn(t),
		mutator: Qt(t.mutatorName) ?? "?",
		replacement: Qt(t.replacement) ?? "(removed)"
	}), gn = (e) => {
		let t = {
			killed: 0,
			survived: 0,
			inconclusive: 0,
			survivors: []
		};
		for (let [n, r] of Object.entries(e)) for (let e of pn(r)) {
			let r = Qt(e.status) ?? "";
			if (dn.has(r)) {
				t.killed++;
				continue;
			}
			if (!fn.has(r)) {
				t.inconclusive++;
				continue;
			}
			t.survived++, t.survivors.push(hn(n, e));
		}
		return t;
	}, _n = (e) => {
		let t = Zt(e)?.files;
		if (typeof t != "object" || !t || Array.isArray(t)) return;
		let n = gn(t), r = n.killed + n.survived;
		return {
			id: "mutation",
			mutation: {
				score: r === 0 ? 100 : Math.round(n.killed / r * 100),
				killed: n.killed,
				survived: n.survived,
				inconclusive: n.inconclusive,
				survivors: n.survivors.slice(0, un)
			}
		};
	}, vn = "UI", yn = 2e3, bn = 500, xn = ".", Sn = (e) => [...[...e, ...Re].map((e) => `-g '${e}'`), Qe].join(" "), Cn = (e) => {
		let t = e.lastIndexOf(":");
		if (t <= 0) return;
		let n = Number.parseInt(e.slice(t + 1), 10);
		return Number.isNaN(n) || n <= 0 ? void 0 : {
			path: We(e.slice(0, t)),
			count: n
		};
	}, wn = (e) => `rg --no-messages ${e.absent === void 0 ? "-l" : "--files-without-match"} -e '${e.pattern}' ${Sn(e.globs)} ${xn} 2>/dev/null | sort | head -n ${bn} | awk '{print "IDIOM\\t${e.id}\\t" $0}'`, Tn = () => [
		`echo ${vn}`,
		`rg --files ${Sn(ze)} ${xn} 2>/dev/null | sort | head -n ${yn} | awk '{print "COMPONENT\\t" $0}'`,
		`rg --no-messages --count-matches -e '${Ve}' ${Sn(Be)} ${xn} 2>/dev/null | sort | head -n ${bn} | awk '{print "BYPASS\\t" $0}'`,
		...He.map(wn),
		"true"
	].join("; "), En = (e) => {
		let t = e.split("\n").map((e) => e.trim());
		if (t.find((e) => e !== "") !== vn) return;
		let n = [], r = [], i = /* @__PURE__ */ new Map();
		for (let e of t) {
			let [t, ...a] = e.split("	");
			if (t === "COMPONENT" && a[0] !== void 0) n.push(We(a[0]));
			else if (t === "BYPASS") {
				let e = Cn(a.join("	"));
				e !== void 0 && r.push(e);
			} else if (t === "IDIOM" && a[0] !== void 0) {
				let e = We(a.slice(1).join("	"));
				e !== "" && i.set(a[0], [...i.get(a[0]) ?? [], e]);
			}
		}
		return {
			id: "ui",
			scan: {
				components: n,
				bypasses: r,
				idioms: [...i].map(([e, t]) => ({
					id: e,
					files: t
				}))
			}
		};
	}, Dn = [
		"dist",
		"build",
		"out",
		"public/build"
	], On = "DIR", kn = 40, An = () => [
		"dir=\"\"",
		`for d in ${Dn.join(" ")}; do if [ -d "$d" ]; then dir="$d"; break; fi; done`,
		"[ -n \"$dir\" ] || exit 0",
		`printf '${On}\\t%s\\n' "$dir"`,
		`find "\$dir" -type f \\( -name '*.js' -o -name '*.mjs' -o -name '*.cjs' -o -name '*.css' \\) -exec sh -c 'for f; do printf "ASSET\\t%s\\t%s\\t%s\\n" "\$(wc -c <"\$f")" "\$(gzip -c "\$f" | wc -c)" "\$f"; done' _ {} + 2>/dev/null | sort -k2 -rn | head -n ${kn}`
	].join("; "), jn = (e) => {
		let t = e.split("\n").map((e) => e.trim()), n = t.find((e) => e.startsWith(`${On}\t`));
		if (n === void 0) return;
		let r = [];
		for (let e of t) {
			let [t, n, i, ...a] = e.split("	");
			if (t !== "ASSET" || a.length === 0) continue;
			let o = Number.parseInt(n ?? "", 10), s = Number.parseInt(i ?? "", 10);
			Number.isNaN(o) || Number.isNaN(s) || r.push({
				path: a.join("	"),
				bytes: o,
				gzip: s
			});
		}
		return {
			id: "bundle",
			bundle: {
				dir: n.slice(On.length + 1),
				totalBytes: r.reduce((e, t) => e + t.bytes, 0),
				totalGzip: r.reduce((e, t) => e + t.gzip, 0),
				assets: r
			}
		};
	}, Mn = "/tmp/intentic-chore-jscpd", Nn = "reports/mutation/mutation.json", Pn = [
		{
			id: "outdated",
			title: "Dependency versions",
			measures: "how far behind the registry each dependency is",
			tier: 1,
			ttlMs: Xt,
			timeoutMs: 3e5,
			available: "test -f package.json",
			unavailable: "no package.json",
			command: "pnpm outdated -r --json 2>/dev/null || true",
			parse: nn
		},
		{
			id: "audit",
			title: "Security advisories",
			measures: "published advisories against this dependency tree",
			tier: 1,
			ttlMs: Xt,
			timeoutMs: 3e5,
			available: "test -f pnpm-lock.yaml || test -f package-lock.json",
			unavailable: "no lockfile",
			command: "pnpm audit --json 2>/dev/null || true",
			parse: an
		},
		{
			id: "knip",
			title: "Unreachable code",
			measures: "files, exports and dependencies nothing references",
			tier: 2,
			ttlMs: 7 * Xt,
			timeoutMs: 9e5,
			available: "pnpm exec knip --version >/dev/null 2>&1",
			unavailable: "knip is not a devDependency",
			command: "pnpm exec knip --reporter json --no-exit-code 2>/dev/null || true",
			parse: sn
		},
		{
			id: "jscpd",
			title: "Copy-paste",
			measures: "how much of the tree is duplicated elsewhere in it",
			tier: 2,
			ttlMs: 7 * Xt,
			timeoutMs: 12e5,
			available: "test -f package.json",
			unavailable: "no package.json",
			command: `pnpm dlx jscpd ${$e} --reporters json --output ${Mn} --min-lines 12 --threshold 100 . >/dev/null 2>&1; cat ${Mn}/jscpd-report.json 2>/dev/null`,
			parse: ln
		},
		{
			id: "mutation",
			title: "Test strength",
			measures: "how much of the code could break with every test still green",
			tier: 2,
			ttlMs: 30 * Xt,
			timeoutMs: 54e5,
			available: "{ test -f stryker.conf.mjs || test -f stryker.conf.json; } && pnpm exec stryker --version >/dev/null 2>&1",
			unavailable: "no stryker config in this repo",
			command: `pnpm exec stryker run --reporters json --incremental >/dev/null 2>&1 || true; cat ${Nn} 2>/dev/null`,
			parse: _n
		},
		{
			id: "ui",
			title: "Front-end source",
			measures: "components, hard-coded styles and idioms the framework has replaced",
			tier: 1,
			ttlMs: Xt,
			timeoutMs: 3e5,
			available: `rg -l --no-messages -g '**/package.json' -g '!**/node_modules/**' ${Qe} -e '[\\x22](${[...Pe.flatMap((e) => e.packages), ...Fe].join("|")})[\\x22]\\s*:' . >/dev/null`,
			unavailable: "no package here declares a UI framework or Tailwind",
			command: Tn(),
			parse: En
		},
		{
			id: "bundle",
			title: "Build output",
			measures: "what the last build put on disk for a browser to download",
			tier: 1,
			ttlMs: Xt,
			timeoutMs: 3e5,
			available: `find ${Dn.join(" ")} -maxdepth 4 -type f \\( -name '*.js' -o -name '*.mjs' -o -name '*.css' \\) 2>/dev/null | head -n 1 | grep -q .`,
			unavailable: "no build output on disk, this reads the last build, it never runs one",
			command: An(),
			parse: jn
		}
	], Fn = (e) => {
		let t = Pn.find((t) => t.id === e);
		if (t === void 0) throw Error(`chores: no probe named "${e}"`);
		return t;
	};
})), Ln, Rn, zn, Bn, Vn, Hn, Un, Wn, Gn, Kn = b((() => {
	Yt(), In(), Ln = (e, t) => {
		let n = e.flatMap((e) => {
			let n = t.get(e);
			return n?.state === "ok" ? [n.ranAt] : [];
		});
		return n.length === 0 ? void 0 : Math.min(...n);
	}, Rn = (e, t, n) => e.survey === !0 && t !== void 0 ? `Surveyed ${Math.round((n - t.ranAt) / 864e5)} days ago` : "Nothing to do", zn = (e, t) => e.flatMap((e) => {
		let n = t.get(e), r = Fn(e);
		return n === void 0 ? [`${r.title} · not measured yet`] : n.state === "ok" ? [] : n.state === "unavailable" ? [`${r.title} · ${n.reason ?? "not available in this repository"}`] : [`${r.title} · failed${n.reason === void 0 ? "" : `, ${n.reason}`}`];
	}), Bn = (e, t, n) => {
		let r = {
			chore: e,
			repo: t.repo,
			lastRun: n,
			settled: !1,
			prompt: void 0
		}, i = e.applies?.(t.signals);
		if (i !== void 0) return {
			...r,
			state: "not-applicable",
			severity: "info",
			headline: i,
			detail: [],
			digest: "",
			measuredAt: void 0
		};
		let a = zn(e.needs, t.probes);
		if (a.length > 0) return {
			...r,
			state: "unavailable",
			severity: "info",
			headline: "Not measured",
			detail: a,
			digest: "",
			measuredAt: void 0
		};
		let o = Ln(e.needs, t.probes), s = e.assess(t);
		if (s === void 0) return {
			...r,
			state: "clear",
			severity: "info",
			headline: Rn(e, n, t.nowMs),
			detail: [],
			digest: "",
			measuredAt: o
		};
		let c = n !== void 0 && e.cadenceMs > 0 && t.nowMs - n.ranAt >= e.cadenceMs, l = n?.digest === s.digest && !c;
		if (e.survey === !0 && n !== void 0 && t.nowMs - n.ranAt < e.cadenceMs) return {
			...r,
			state: "clear",
			severity: "info",
			headline: Rn(e, n, t.nowMs),
			detail: s.detail,
			digest: s.digest,
			measuredAt: o
		};
		let u = Jt(e, s, t.repo);
		return n?.snoozedUntil !== void 0 && n.snoozedUntil > t.nowMs ? {
			...r,
			state: "snoozed",
			severity: "info",
			headline: s.headline,
			detail: s.detail,
			digest: s.digest,
			measuredAt: o,
			prompt: u
		} : l && n?.outcome === "clean" ? {
			...r,
			state: "clear",
			severity: "info",
			headline: "Checked, the findings did not hold up",
			detail: s.detail,
			digest: s.digest,
			measuredAt: o
		} : n !== void 0 && o !== void 0 && n.ranAt > o ? {
			...r,
			state: "stale",
			severity: "info",
			headline: s.headline,
			detail: s.detail,
			digest: s.digest,
			measuredAt: o
		} : {
			...r,
			state: "due",
			severity: s.severity,
			headline: s.headline,
			detail: s.detail,
			digest: s.digest,
			measuredAt: o,
			prompt: u,
			settled: l
		};
	}, Vn = (e) => {
		let { lastRun: t, digest: n } = e;
		if (t !== void 0 && n !== "" && t.digest === n) return {
			outcome: t.outcome,
			ranAt: t.ranAt
		};
	}, Hn = (e) => e.settled || e.state === "stale", Un = (e, t) => `${e}|${t}`, Wn = (e, t) => {
		let n = new Map(e.ledger.map((e) => [Un(e.repo, e.chore), e]));
		return e.repos.flatMap(({ repo: r, probes: i, signals: a }) => {
			let o = {
				repo: r,
				probes: new Map(i.map((e) => [e.id, e])),
				signals: a,
				node: e.node,
				nowMs: t
			};
			return qt.map((e) => Bn(e, o, n.get(Un(r, e.id))));
		});
	}, Gn = (e, t) => e.filter((e) => e.state === "due" && !e.settled && t[Un(e.repo, e.chore.id)] !== e.digest);
})), qn = b((() => {
	Yt(), Oe(), Ne(), In(), et(), Xe(), Kn();
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/util.js
function Jn(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function Yn(e, t = "|") {
	return e.map((e) => ur(e)).join(t);
}
function Xn(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function Zn(e) {
	return { get value() {
		{
			let t = e();
			return Object.defineProperty(this, "value", { value: t }), t;
		}
	} };
}
function Qn(e) {
	return e == null;
}
function $n(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function er(e, t) {
	let n = e / t, r = Math.round(n), i = 4 * 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
function tr(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== Ir) return r === void 0 && (r = Ir, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function T(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function nr(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function rr(e) {
	return JSON.stringify(e);
}
function ir(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function ar(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function or(e) {
	if (ar(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return ar(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function sr(e) {
	return or(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
function cr(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function lr(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function E(e) {
	let t = e;
	if (!t) return {};
	if (typeof t == "string") return { error: () => t };
	if (t?.message !== void 0) {
		if (t?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
		t.error = t.message;
	}
	return delete t.message, typeof t.error == "string" ? {
		...t,
		error: () => t.error
	} : t;
}
function ur(e) {
	return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function dr(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function fr(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	return lr(e, nr(e._zod.def, {
		get shape() {
			let e = {};
			for (let r of Reflect.ownKeys(t)) {
				if (!Object.prototype.hasOwnProperty.call(n.shape, r)) throw Error(`Unrecognized key: "${String(r)}"`);
				t[r] && T(e, r, n.shape[r]);
			}
			return T(this, "shape", e), e;
		},
		checks: []
	}));
}
function pr(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	return lr(e, nr(e._zod.def, {
		get shape() {
			let r = { ...e._zod.def.shape };
			for (let e of Reflect.ownKeys(t)) {
				if (!Object.prototype.hasOwnProperty.call(n.shape, e)) throw Error(`Unrecognized key: "${String(e)}"`);
				t[e] && delete r[e];
			}
			return T(this, "shape", r), r;
		},
		checks: []
	}));
}
function mr(e, t) {
	if (!or(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = e._zod.def.shape;
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return lr(e, nr(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return T(this, "shape", n), n;
	} }));
}
function hr(e, t) {
	if (!or(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return lr(e, nr(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return T(this, "shape", n), n;
	} }));
}
function gr(e, t) {
	if (!t?._zod?.def) throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return lr(e, nr(e._zod.def, {
		get shape() {
			let n = {
				...e._zod.def.shape,
				...t._zod.def.shape
			};
			return T(this, "shape", n), n;
		},
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function _r(e, t, n, r = "partial") {
	let i = t._zod.def.checks;
	if (i && i.length > 0) throw Error(`.${r}() cannot be used on object schemas containing refinements`);
	return lr(t, nr(t._zod.def, {
		get shape() {
			let r = t._zod.def.shape, i = { ...r };
			if (n) for (let t of Reflect.ownKeys(n)) {
				if (!Object.prototype.hasOwnProperty.call(r, t)) throw Error(`Unrecognized key: "${String(t)}"`);
				n[t] && (i[t] = e ? new e({
					type: "optional",
					innerType: r[t]
				}) : r[t]);
			}
			else for (let t of Reflect.ownKeys(r)) i[t] = e ? new e({
				type: "optional",
				innerType: r[t]
			}) : r[t];
			return T(this, "shape", i), i;
		},
		checks: []
	}));
}
function vr(e, t, n) {
	return lr(t, nr(t._zod.def, { get shape() {
		let r = t._zod.def.shape, i = { ...r };
		if (n) for (let t of Reflect.ownKeys(n)) {
			if (!Object.prototype.hasOwnProperty.call(i, t)) throw Error(`Unrecognized key: "${String(t)}"`);
			n[t] && (i[t] = new e({
				type: "nonoptional",
				innerType: r[t]
			}));
		}
		else for (let t of Reflect.ownKeys(r)) i[t] = new e({
			type: "nonoptional",
			innerType: r[t]
		});
		return T(this, "shape", i), i;
	} }));
}
function yr(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function br(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function xr(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function Sr(e) {
	return typeof e == "string" ? e : e?.message;
}
function Cr(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function wr(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : Sr(e.inst?._zod.def?.error?.(e)) ?? Sr(a?.(e)) ?? Sr(t?.error?.(e)) ?? Sr(n.customError?.(e)) ?? Sr(n.localeError?.(e)) ?? "Invalid input", { inst: s, schema: c, continue: l, input: u, ...d } = e;
	return d.path ??= [], d.message = o, t?.reportInput && (d.input = u), d;
}
function Tr(e) {
	let t = e.length;
	if (!Vr.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function Er(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Dr(e) {
	let t = typeof e;
	switch (t) {
		case "number": return Number.isNaN(e) ? "nan" : "number";
		case "object": {
			if (e === null) return "null";
			if (Array.isArray(e)) return "array";
			let t = e;
			if (t && Object.getPrototypeOf(t) !== Object.prototype && "constructor" in t && t.constructor) return t.constructor.name;
		}
	}
	return t;
}
function Or(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
function kr(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : Mr(e, n, r.value);
	}
}
function Ar(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function jr(e, t, n) {
	return Ar(e, t, n, !1);
}
function Mr(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : Ar(this, t, n.bind(this));
		},
		set(e) {
			Ar(this, t, e);
		}
	});
}
function Nr(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
function D(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	if (t in r && Hr !== e._zod) {
		Hr = void 0;
		return;
	}
	Hr = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, Wr);
			let e = Ur;
			Ur = !1;
			try {
				let r = n(this);
				return Ur ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), Ur ||= e, r;
			} catch (n) {
				throw delete this[t], Ur ||= e, n;
			}
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				value: e
			});
		}
	});
}
function Pr(e, t, n, r) {
	let i = Nr(e, t);
	i && Object.defineProperty(i, t, {
		configurable: !0,
		get() {
			let e = {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: void 0
			};
			return Object.defineProperty(this, t, e), e.value = n(this), Object.defineProperty(this, t, e), e.value;
		},
		set(e) {
			Object.defineProperty(this, t, {
				configurable: !0,
				writable: !0,
				enumerable: r,
				value: e
			});
		}
	});
}
function Fr(e) {
	let t = () => e;
	return t[Gr] = !0, t;
}
var Ir, Lr, Rr, zr, Br, Vr, Hr, Ur, Wr, Gr, Kr = b((() => {
	ti(), Ir = /* @__PURE__*/ Symbol("evaluating"), Lr = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {}, Rr = /* @__PURE__*/ Zn(() => {
		if (ei.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
		try {
			return Function(""), !0;
		} catch {
			return !1;
		}
	}), zr = /* @__PURE__*/ new Set([
		"string",
		"number",
		"symbol"
	]), Br = {
		safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
		int32: [-2147483648, 2147483647],
		uint32: [0, 4294967295],
		float32: [-34028234663852886e22, 34028234663852886e22],
		float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
	}, Vr = /[\uD800-\uDBFF]/, Ur = !1, Wr = {
		configurable: !0,
		get() {
			Ur = !0;
		}
	}, Gr = "~constantCatch";
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/core.js
function qr(e) {
	let t = Zr;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return Zr = null, new e();
			}
			try {
				return new e();
			} finally {
				t.stackTraceLimit = n;
			}
		}
	}
	return new e();
}
function O(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			Xr.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", Xr);
			} finally {
				Xr.value = void 0;
			}
		}
		if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), kr(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? qr(u) : this;
		c(t, e);
		let n = t._zod.deferred;
		if (n) {
			for (let e of n) e();
			t._zod.deferred = void 0;
		}
		let i = globalThis.__zod_globalConfig?.postProcessor;
		return i && i(t), t;
	}
	return Object.defineProperty(d, "init", { value: c }), Object.defineProperty(d, Symbol.hasInstance, { value: (t) => r?.Parent && t instanceof r.Parent ? !0 : t?._zod?.traits?.has(e) }), Object.defineProperty(d, "name", { value: e }), d;
}
function Jr(e) {
	return e && Object.assign(ei, e), ei;
}
var Yr, Xr, Zr, Qr, $r, ei, ti = b((() => {
	Kr(), Xr = {
		value: void 0,
		enumerable: !1
	}, Zr = "captureStackTrace" in Error ? Error : null, Qr = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	}, $r = class extends Error {
		constructor(e) {
			super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
		}
	}, (Yr = globalThis).__zod_globalConfig ?? (Yr.__zod_globalConfig = {}), ei = globalThis.__zod_globalConfig;
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/errors.js
function ni() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, Xn, 2), e.message;
}
function ri(e) {
	this._zod.message = e;
}
function ii(e, t, n) {
	return Object.prototype.hasOwnProperty.call(e, t) || (t === "__proto__" ? Object.defineProperty(e, t, {
		value: n(),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : e[t] = n()), e[t];
}
function ai(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? ii(n, i.path[0], () => []).push(t(i)) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function oi(e, t = (e) => e.message) {
	let n = { _errors: [] }, r = (e, i = []) => {
		for (let a of e.issues) if (a.code === "invalid_union" && a.errors.length) a.errors.map((e) => r({ issues: e }, [...i, ...a.path]));
		else if (a.code === "invalid_key") r({ issues: a.issues }, [...i, ...a.path]);
		else if (a.code === "invalid_element") r({ issues: a.issues }, [...i, ...a.path]);
		else {
			let e = [...i, ...a.path];
			if (e.length === 0) n._errors.push(t(a));
			else {
				let r = n, i = 0;
				for (; i < e.length;) {
					let n = e[i], o = i === e.length - 1;
					if (n === "_errors") {
						o && r._errors.push(t(a)), i++;
						continue;
					}
					Object.prototype.hasOwnProperty.call(r, n) || Object.defineProperty(r, n, {
						value: { _errors: [] },
						enumerable: !0,
						writable: !0,
						configurable: !0
					});
					let s = r[n];
					o && s._errors.push(t(a)), r = s, i++;
				}
			}
		}
	};
	return r(e), n;
}
var si, ci, li, ui, di, fi, pi, mi = b((() => {
	ti(), Kr(), si = {
		get: ni,
		set: ri,
		enumerable: !0,
		configurable: !0
	}, ci = {
		value: void 0,
		enumerable: !1
	}, li = {
		value: void 0,
		enumerable: !1
	}, ui = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), di = (e, t) => {
		e.name = "$ZodError", ci.value = e._zod, Object.defineProperty(e, "_zod", ci), li.value = t, Object.defineProperty(e, "issues", li), ci.value = void 0, li.value = void 0, Object.defineProperty(e, "message", si);
		let n = Object.getPrototypeOf(e);
		ui.has(n) || (ui.add(n), Object.defineProperty(n, "toString", {
			configurable: !0,
			enumerable: !1,
			get() {
				let e = () => this.message;
				return Object.defineProperty(this, "toString", {
					value: e,
					configurable: !0,
					writable: !0
				}), e;
			},
			set(e) {
				Object.defineProperty(this, "toString", {
					value: e,
					configurable: !0,
					writable: !0
				});
			}
		}));
	}, fi = O("$ZodError", di), pi = O("$ZodError", di, void 0, { Parent: Error });
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/parse.js
function hi(e, t) {
	return {
		callee: t?.callee ?? e,
		Err: t?.Err
	};
}
var gi, _i, vi, yi, bi, xi, Si, Ci, wi, Ti, Ei, Di, Oi, ki, Ai = b((() => {
	ti(), mi(), Kr(), gi = (e) => {
		let t = (n, r, i, a) => {
			let o = i ? {
				...i,
				async: !1
			} : { async: !1 }, s = n._zod.run({
				value: r,
				issues: []
			}, o);
			if (s instanceof Promise) throw new Qr();
			if (s.issues.length) {
				let n = new ((a?.Err) ?? e)(s.issues.map((e) => wr(e, o, Jr())));
				throw Lr(n, a?.callee ?? t), n;
			}
			return s.value;
		};
		return t;
	}, _i = (e) => {
		let t = async (n, r, i, a) => {
			let o = i ? {
				...i,
				async: !0
			} : { async: !0 }, s = n._zod.run({
				value: r,
				issues: []
			}, o);
			if (s instanceof Promise && (s = await s), s.issues.length) {
				let n = new ((a?.Err) ?? e)(s.issues.map((e) => wr(e, o, Jr())));
				throw Lr(n, a?.callee ?? t), n;
			}
			return s.value;
		};
		return t;
	}, vi = (e) => (t, n, r) => {
		let i = r ? {
			...r,
			async: !1
		} : { async: !1 }, a = t._zod.run({
			value: n,
			issues: []
		}, i);
		if (a instanceof Promise) throw new Qr();
		return a.issues.length ? {
			success: !1,
			error: new (e ?? fi)(a.issues.map((e) => wr(e, i, Jr())))
		} : {
			success: !0,
			data: a.value
		};
	}, yi = /* @__PURE__*/ vi(pi), bi = (e) => async (t, n, r) => {
		let i = r ? {
			...r,
			async: !0
		} : { async: !0 }, a = t._zod.run({
			value: n,
			issues: []
		}, i);
		return a instanceof Promise && (a = await a), a.issues.length ? {
			success: !1,
			error: new e(a.issues.map((e) => wr(e, i, Jr())))
		} : {
			success: !0,
			data: a.value
		};
	}, xi = /* @__PURE__*/ bi(pi), Si = (e) => {
		let t = gi(e), n = (e, r, i, a) => {
			let o = i ? {
				...i,
				direction: "backward"
			} : { direction: "backward" };
			return t(e, r, o, hi(n, a));
		};
		return n;
	}, Ci = (e) => {
		let t = gi(e), n = (e, r, i, a) => t(e, r, i, hi(n, a));
		return n;
	}, wi = (e) => {
		let t = _i(e), n = async (e, r, i, a) => {
			let o = i ? {
				...i,
				direction: "backward"
			} : { direction: "backward" };
			return await t(e, r, o, hi(n, a));
		};
		return n;
	}, Ti = (e) => {
		let t = _i(e), n = async (e, r, i, a) => await t(e, r, i, hi(n, a));
		return n;
	}, Ei = (e) => (t, n, r) => {
		let i = r ? {
			...r,
			direction: "backward"
		} : { direction: "backward" };
		return vi(e)(t, n, i);
	}, Di = (e) => (t, n, r) => vi(e)(t, n, r), Oi = (e) => async (t, n, r) => {
		let i = r ? {
			...r,
			direction: "backward"
		} : { direction: "backward" };
		return bi(e)(t, n, i);
	}, ki = (e) => async (t, n, r) => bi(e)(t, n, r);
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/regexes.js
function ji(e) {
	return RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
function Mi() {
	return new RegExp(qi, "u");
}
function Ni(e) {
	return RegExp(`^${e}$`);
}
function Pi(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : e.seconds ? `${t}:[0-5]\\d(?:\\.\\d+)?` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Fi(e) {
	return RegExp(`^${Pi(e)}$`);
}
function Ii(e) {
	let t = ["Z"];
	e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let n = `${Pi({
		precision: e.precision,
		seconds: !0
	})}(?:${t.join("|")})`, r = e.local ? `${n}|${Pi({ precision: e.precision })}` : n;
	return RegExp(`^${na}T(?:${r})$`);
}
var Li, Ri, zi, Bi, Vi, Hi, Ui, Wi, Gi, Ki, qi, Ji, Yi, Xi, Zi, Qi, $i, ea, ta, na, ra, ia, aa, oa, sa, ca, la, ua = b((() => {
	Li = /^[cC][0-9a-z]{6,}$/, Ri = /^[0-9a-z]+$/, zi = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, Bi = /^[0-9a-vA-V]{20}$/, Vi = /^[A-Za-z0-9]{27}$/, Hi = /^[a-zA-Z0-9_-]{21}$/, Ui = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Wi = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Gi = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Ki = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, qi = "^[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$", Ji = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Yi = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Xi = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Zi = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Qi = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, $i = /^[A-Za-z0-9_-]*$/, ea = /^https?$/, ta = /^\+[1-9]\d{6,14}$/, na = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", ra = /*@__PURE__*/ Ni(na), ia = (e) => {
		let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return RegExp(`^${t}$`);
	}, aa = /^-?\d+$/, oa = /^-?\d+(?:\.\d+)?$/, sa = /^(?:true|false)$/i, ca = /^[^A-Z]*$/, la = /^[^a-z]*$/;
})), k, da, fa, pa, ma, ha, ga, _a, va, ya, ba, xa, Sa, Ca, wa, Ta, Ea, Da, Oa = b((() => {
	ti(), ua(), Kr(), k = /*@__PURE__*/ O("$ZodCheck", (e, t) => {
		var n;
		e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
	}), da = (e) => {
		let t = e.value;
		return !Qn(t) && t.length !== void 0;
	}, fa = {
		number: "number",
		bigint: "bigint",
		object: "date"
	}, pa = /*@__PURE__*/ O("$ZodCheckLessThan", (e, t) => {
		k.init(e, t);
		let n = fa[typeof t.value];
		e._zod.onattach.push((e) => {
			let n = e._zod.bag, r = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? Infinity;
			t.value < r && (t.inclusive ? n.maximum = t.value : n.exclusiveMaximum = t.value);
		}), e._zod.check = (r) => {
			(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
				origin: fa[typeof r.value] ?? n,
				code: "too_big",
				maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
				input: r.value,
				inclusive: t.inclusive,
				inst: e,
				continue: !t.abort
			});
		};
	}), ma = /*@__PURE__*/ O("$ZodCheckGreaterThan", (e, t) => {
		k.init(e, t);
		let n = fa[typeof t.value];
		e._zod.onattach.push((e) => {
			let n = e._zod.bag, r = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? -Infinity;
			t.value > r && (t.inclusive ? n.minimum = t.value : n.exclusiveMinimum = t.value);
		}), e._zod.check = (r) => {
			(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
				origin: fa[typeof r.value] ?? n,
				code: "too_small",
				minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
				input: r.value,
				inclusive: t.inclusive,
				inst: e,
				continue: !t.abort
			});
		};
	}), ha = /*@__PURE__*/ O("$ZodCheckMultipleOf", (e, t) => {
		k.init(e, t), e._zod.onattach.push((e) => {
			var n;
			(n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
		}), e._zod.check = (n) => {
			if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
			(typeof n.value == "bigint" ? t.value !== BigInt(0) && n.value % t.value === BigInt(0) : er(n.value, t.value) === 0) || n.issues.push({
				origin: typeof n.value,
				code: "not_multiple_of",
				divisor: t.value,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), ga = /*@__PURE__*/ O("$ZodCheckNumberFormat", (e, t) => {
		k.init(e, t), t.format = t.format || "float64";
		let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = Br[t.format];
		e._zod.onattach.push((e) => {
			let r = e._zod.bag;
			r.format = t.format, r.minimum = i, r.maximum = a, n && (r.pattern = aa);
		}), e._zod.check = (o) => {
			let s = o.value;
			if (n) {
				if (!Number.isInteger(s)) {
					o.issues.push({
						expected: r,
						format: t.format,
						code: "invalid_type",
						continue: !1,
						input: s,
						inst: e
					});
					return;
				}
				if (!Number.isSafeInteger(s)) {
					s > 0 ? o.issues.push({
						input: s,
						code: "too_big",
						maximum: 2 ** 53 - 1,
						note: "Integers must be within the safe integer range.",
						inst: e,
						origin: r,
						inclusive: !0,
						continue: !t.abort
					}) : o.issues.push({
						input: s,
						code: "too_small",
						minimum: -(2 ** 53 - 1),
						note: "Integers must be within the safe integer range.",
						inst: e,
						origin: r,
						inclusive: !0,
						continue: !t.abort
					});
					return;
				}
			}
			s < i && o.issues.push({
				origin: "number",
				input: s,
				code: "too_small",
				minimum: i,
				inclusive: !0,
				inst: e,
				continue: !t.abort
			}), s > a && o.issues.push({
				origin: "number",
				input: s,
				code: "too_big",
				maximum: a,
				inclusive: !0,
				inst: e,
				continue: !t.abort
			});
		};
	}), _a = /*@__PURE__*/ O("$ZodCheckMaxLength", (e, t) => {
		var n;
		k.init(e, t), (n = e._zod.def).when ?? (n.when = da), e._zod.onattach.push((e) => {
			let n = e._zod.bag.maximum ?? Infinity;
			t.maximum < n && (e._zod.bag.maximum = t.maximum);
		}), e._zod.check = (n) => {
			let r = n.value, i = r.length;
			if ((typeof r == "string" && i > t.maximum ? Tr(r) : i) <= t.maximum) return;
			let a = Er(r);
			n.issues.push({
				origin: a,
				code: "too_big",
				maximum: t.maximum,
				inclusive: !0,
				input: r,
				inst: e,
				continue: !t.abort
			});
		};
	}), va = /*@__PURE__*/ O("$ZodCheckMinLength", (e, t) => {
		var n;
		k.init(e, t), (n = e._zod.def).when ?? (n.when = da), e._zod.onattach.push((e) => {
			let n = e._zod.bag.minimum ?? -Infinity;
			t.minimum > n && (e._zod.bag.minimum = t.minimum);
		}), e._zod.check = (n) => {
			let r = n.value, i = r.length;
			if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? Tr(r) : i) >= t.minimum) return;
			let a = Er(r);
			n.issues.push({
				origin: a,
				code: "too_small",
				minimum: t.minimum,
				inclusive: !0,
				input: r,
				inst: e,
				continue: !t.abort
			});
		};
	}), ya = /*@__PURE__*/ O("$ZodCheckLengthEquals", (e, t) => {
		var n;
		k.init(e, t), (n = e._zod.def).when ?? (n.when = da), e._zod.onattach.push((e) => {
			let n = e._zod.bag;
			n.minimum = t.length, n.maximum = t.length, n.length = t.length;
		}), e._zod.check = (n) => {
			let r = n.value, i = r.length, a = typeof r == "string" && i >= t.length && i <= t.length * 2 ? Tr(r) : i;
			if (a === t.length) return;
			let o = Er(r), s = a > t.length;
			n.issues.push({
				origin: o,
				...s ? {
					code: "too_big",
					maximum: t.length
				} : {
					code: "too_small",
					minimum: t.length
				},
				inclusive: !0,
				exact: !0,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), ba = /*@__PURE__*/ O("$ZodCheckStringFormat", (e, t) => {
		var n, r;
		k.init(e, t), e._zod.onattach.push((e) => {
			let n = e._zod.bag;
			n.format = t.format, t.pattern && (n.patterns ??= /* @__PURE__ */ new Set(), n.patterns.add(t.pattern));
		}), t.pattern ? (n = e._zod).check ?? (n.check = (n) => {
			t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
				origin: "string",
				code: "invalid_format",
				format: t.format,
				input: n.value,
				...t.pattern ? { pattern: t.pattern.toString() } : {},
				inst: e,
				continue: !t.abort
			});
		}) : (r = e._zod).check ?? (r.check = () => {});
	}), xa = /*@__PURE__*/ O("$ZodCheckRegex", (e, t) => {
		ba.init(e, t), e._zod.check = (n) => {
			t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "regex",
				input: n.value,
				pattern: t.pattern.toString(),
				inst: e,
				continue: !t.abort
			});
		};
	}), Sa = /*@__PURE__*/ O("$ZodCheckLowerCase", (e, t) => {
		t.pattern ??= ca, ba.init(e, t);
	}), Ca = /*@__PURE__*/ O("$ZodCheckUpperCase", (e, t) => {
		t.pattern ??= la, ba.init(e, t);
	}), wa = /*@__PURE__*/ O("$ZodCheckIncludes", (e, t) => {
		k.init(e, t);
		let n = cr(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position},}${n}` : n);
		t.pattern = r, e._zod.onattach.push((e) => {
			let t = e._zod.bag;
			t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(r);
		}), e._zod.check = (n) => {
			n.value.includes(t.includes, t.position) || n.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "includes",
				includes: t.includes,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Ta = /*@__PURE__*/ O("$ZodCheckStartsWith", (e, t) => {
		k.init(e, t);
		let n = RegExp(`^${cr(t.prefix)}.*`);
		t.pattern ??= n, e._zod.onattach.push((e) => {
			let t = e._zod.bag;
			t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
		}), e._zod.check = (n) => {
			n.value.startsWith(t.prefix) || n.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "starts_with",
				prefix: t.prefix,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Ea = /*@__PURE__*/ O("$ZodCheckEndsWith", (e, t) => {
		k.init(e, t);
		let n = RegExp(`.*${cr(t.suffix)}$`);
		t.pattern ??= n, e._zod.onattach.push((e) => {
			let t = e._zod.bag;
			t.patterns ??= /* @__PURE__ */ new Set(), t.patterns.add(n);
		}), e._zod.check = (n) => {
			n.value.endsWith(t.suffix) || n.issues.push({
				origin: "string",
				code: "invalid_format",
				format: "ends_with",
				suffix: t.suffix,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Da = /*@__PURE__*/ O("$ZodCheckOverwrite", (e, t) => {
		k.init(e, t), e._zod.check = (e) => {
			e.value = t.tx(e.value);
		};
	});
})), ka, Aa = b((() => {
	ka = class {
		constructor(e = [], t = {}) {
			this.content = [], this.indent = 0, this.args = e, this.closed = t;
		}
		indented(e) {
			this.indent += 1, e(this), --this.indent;
		}
		write(e) {
			if (typeof e == "function") {
				e(this, { execution: "sync" }), e(this, { execution: "async" });
				return;
			}
			let t = e.split("\n").filter((e) => e), n = Math.min(...t.map((e) => e.length - e.trimStart().length)), r = t.map((e) => e.slice(n)).map((e) => " ".repeat(this.indent * 2) + e);
			for (let e of r) this.content.push(e);
		}
		compile() {
			let e = Function, t = this?.content ?? [""];
			return new e(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {\n${t.join("\n")}\n};`)(...Object.values(this.closed));
		}
	};
})), ja, Ma = b((() => {
	ja = {
		major: 4,
		minor: 5,
		patch: 4
	};
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/schemas.js
function Na(e) {
	return {
		validate: (t) => {
			try {
				return co(yi(e, t));
			} catch {
				return xi(e, t).then(co);
			}
		},
		vendor: "zod",
		version: 1
	};
}
function Pa(e, t) {
	if (!t.normalize && t.protocol?.source === ea.source && !/^https?:\/\//i.test(e)) return 1;
	try {
		return new URL(e);
	} catch {
		return 2;
	}
}
function Fa(e) {
	return e.replace(mo, "");
}
function Ia(e, t) {
	return t.lastIndex = 0, t.test(e.hostname);
}
function La(e, t) {
	return t.lastIndex = 0, t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol);
}
function Ra(e) {
	if (!Oo.test(e)) return !1;
	try {
		return new URL(`http://[${e}]`), !0;
	} catch {
		return !1;
	}
}
function za(e) {
	let t = e.split("/");
	if (t.length !== 2) return !1;
	let [n, r] = t;
	if (!r) return !1;
	let i = Number(r);
	return `${i}` !== r || i < 0 || i > 128 ? !1 : Ra(n);
}
function Ba(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
function Va(e) {
	if (!$i.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return Ba(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
function Ha(e, t = null) {
	try {
		let n = e.split(".");
		if (n.length !== 3) return !1;
		let [r] = n;
		if (!r) return !1;
		let i = JSON.parse(atob(r));
		return !("typ" in i && i?.typ !== "JWT" || !i.alg || t && (!("alg" in i) || i.alg !== t));
	} catch {
		return !1;
	}
}
function Ua(e, t, n) {
	e.issues.length && t.issues.push(...xr(n, e.issues)), t.value[n] = e.value;
}
function Wa(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...xr(n, e.issues));
		}
		if (!o && i === void 0) {
			e.issues.length || t.issues.push({
				code: "invalid_type",
				expected: "nonoptional",
				input: void 0,
				path: [n]
			});
			return;
		}
		e.value === void 0 ? o && (t.value[n] = void 0) : t.value[n] = e.value;
	}
}
function Ga(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : Ho, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = dr(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function Ka(e, t, n, r, i, a) {
	let o = [], s = i.keySet, c = i.catchall._zod, l = c.def.type, u = c.optin, d = c.optout;
	for (let i in t) {
		if (s.has(i)) continue;
		if (i === "__proto__") {
			l === "never" && o.push(i);
			continue;
		}
		if (l === "never") {
			o.push(i);
			continue;
		}
		let a = c.run({
			value: t[i],
			issues: []
		}, r);
		a instanceof Promise ? e.push(a.then((e) => Wa(e, n, i, t, u, d))) : Wa(a, n, i, t, u, d);
	}
	return o.length && n.issues.push({
		code: "unrecognized_keys",
		keys: o,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
function qa(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !yr(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => wr(e, r, Jr())))
	}), t);
}
function Ja(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (or(e) && or(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		Object.prototype.hasOwnProperty.call(i, "__proto__") && delete i.__proto__;
		for (let n of r) {
			if (n === "__proto__") continue;
			let r = Ja(e[n], t[n]);
			if (!r.valid) return {
				valid: !1,
				mergeErrorPath: [n, ...r.mergeErrorPath]
			};
			i[n] = r.data;
		}
		return {
			valid: !0,
			data: i
		};
	}
	if (Array.isArray(e) && Array.isArray(t)) {
		if (e.length !== t.length) return {
			valid: !1,
			mergeErrorPath: []
		};
		let n = [];
		for (let r = 0; r < e.length; r++) {
			let i = e[r], a = t[r], o = Ja(i, a);
			if (!o.valid) return {
				valid: !1,
				mergeErrorPath: [r, ...o.mergeErrorPath]
			};
			n.push(o.data);
		}
		return {
			valid: !0,
			data: n
		};
	}
	return {
		valid: !1,
		mergeErrorPath: []
	};
}
function Ya(e, t, n) {
	let r = /* @__PURE__ */ new Map(), i, a = /* @__PURE__ */ new Map(), o = (e, t) => {
		let n;
		if (e.code === "unrecognized_keys" && !e.path?.length) i ??= e, n = e.keys;
		else if (e.code === "invalid_key" && e.origin === "record" && e.path?.length === 1) {
			let t = String(e.path[0]);
			a.has(t) || a.set(t, e), n = [t];
		} else return !1;
		for (let e of n) r.has(e) || r.set(e, {}), r.get(e)[t] = !0;
		return !0;
	};
	for (let n of t.issues) o(n, "l") || e.issues.push(n);
	for (let t of n.issues) o(t, "r") || e.issues.push(t);
	let s = [...r].filter(([, e]) => e.l && e.r).map(([e]) => e);
	if (s.length) {
		let t = i ? s.filter((e) => i.keys.includes(e)) : [];
		t.length && e.issues.push({
			...i,
			keys: t
		});
		for (let n of s) !t.includes(n) && a.has(n) && e.issues.push(a.get(n));
	}
	let c = Ja(t.value, n.value);
	if (!c.valid) {
		if (yr(e)) return e;
		throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`);
	}
	return e.value = c.data, e;
}
function Xa(e, t) {
	for (let n = e.length - 1; n >= 0; n--) if (!(t === "optin" ? e[n]._zod.optin !== void 0 : e[n]._zod.optout === "optional")) return n + 1;
	return 0;
}
function Za(e, t, n) {
	e.issues.length && t.issues.push(...xr(n, e.issues)), t.value[n] = e.value;
}
function Qa(e, t, n, r, i) {
	for (let a = 0; a < n.length; a++) {
		let o = e[a], s = a < r.length;
		if (!s && a >= i && n[a]._zod.optin === "optional") {
			t.value.length = a;
			break;
		}
		if (o.issues.length) {
			if (!s && a >= i) {
				t.value.length = a;
				break;
			}
			t.issues.push(...xr(a, o.issues));
		}
		t.value[a] = o.value;
	}
	for (let e = t.value.length - 1; e >= r.length && n[e]._zod.optout === "optional" && t.value[e] === void 0; e--) t.value.length = e;
	return t;
}
function $a(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
function eo(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
function to(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
function no(e, t, n, r) {
	return t.issues.length ? (e.value = n.catchValue({
		...t,
		value: e.value,
		error: { issues: t.issues.map((e) => wr(e, r, Jr())) },
		input: e.value
	}), e) : (e.value = t.value, t.memo && (e.memo = !0), e);
}
function ro(e, t, n) {
	return e.issues.some((e) => e.code !== "unrecognized_keys") ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
function io(e, t, n) {
	if (e.issues.length) return e.aborted = !0, e;
	if ((n.direction || "forward") === "forward") {
		let r = t.transform(e.value, e);
		return r instanceof Promise ? r.then((r) => ao(e, r, t.out, n)) : ao(e, r, t.out, n);
	}
	{
		let r = t.reverseTransform(e.value, e);
		return r instanceof Promise ? r.then((r) => ao(e, r, t.in, n)) : ao(e, r, t.in, n);
	}
}
function ao(e, t, n, r) {
	return e.issues.length ? (e.aborted = !0, e) : n._zod.run({
		value: t,
		issues: e.issues
	}, r);
}
function oo(e) {
	return e.memo || (e.value = Object.freeze(e.value)), e;
}
function so(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(Or(e));
	}
}
var A, co, lo, j, uo, fo, po, mo, ho, go, _o, vo, yo, bo, xo, So, Co, wo, To, Eo, Do, Oo, ko, Ao, jo, Mo, No, Po, Fo, Io, Lo, Ro, zo, Bo, Vo, Ho, Uo, Wo, Go, Ko, qo, Jo, Yo, Xo, Zo, Qo, $o, es, ts, ns, rs, is, as, os, ss, cs, ls, us, ds, fs = b((() => {
	Oa(), ti(), Aa(), Ai(), ua(), Kr(), Ma(), A = /*@__PURE__*/ O("$ZodType", (e, t) => {
		var n;
		e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = ja;
		let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
		for (let t of i) for (let n of t._zod.onattach) n(e);
		if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
			e._zod.run = e._zod.parse;
		});
		else {
			let t = (t, n, r) => {
				if (t.memo) return t;
				let i = yr(t), a;
				for (let o of n) {
					if (o._zod.def.when) {
						if (br(t) || !o._zod.def.when(t)) continue;
					} else if (i) continue;
					let n = t.issues.length, s = o._zod.check(t);
					if (s instanceof Promise && r?.async === !1) throw new Qr();
					if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
						await s, t.issues.length !== n && (Cr(t.issues, n, e), i ||= yr(t, n));
					});
					else {
						if (t.issues.length === n) continue;
						Cr(t.issues, n, e), i ||= yr(t, n);
					}
				}
				return a ? a.then(() => t) : t;
			}, n = (n, r, a) => {
				if (yr(n)) return n.aborted = !0, n;
				let o = t(r, i, a);
				if (o instanceof Promise) {
					if (a.async === !1) throw new Qr();
					return o.then((t) => e._zod.parse(t, a));
				}
				return e._zod.parse(o, a);
			};
			e._zod.run = (r, a) => {
				if (a.skipChecks) return e._zod.parse(r, a);
				if (a.direction === "backward") {
					let t = e._zod.parse({
						value: r.value,
						issues: []
					}, {
						...a,
						skipChecks: !0
					});
					return t instanceof Promise ? t.then((e) => n(e, r, a)) : n(t, r, a);
				}
				let o = e._zod.parse(r, a);
				if (o instanceof Promise) {
					if (a.async === !1) throw new Qr();
					return o.then((e) => t(e, i, a));
				}
				return t(o, i, a);
			};
		}
	}, {
		get "~standard"() {
			return jr(this, "~standard", Na(this));
		},
		set "~standard"(e) {
			Ar(this, "~standard", e);
		}
	}), co = (e) => e.success ? { value: e.data } : { issues: e.error?.issues }, lo = /*@__PURE__*/ O("$ZodString", (e, t) => {
		A.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? ia(e._zod.bag), e._zod.parse = (n, r) => {
			if (t.coerce) try {
				n.value = String(n.value);
			} catch {}
			return typeof n.value == "string" || n.issues.push({
				expected: "string",
				code: "invalid_type",
				input: n.value,
				inst: e
			}), n;
		};
	}), j = /*@__PURE__*/ O("$ZodStringFormat", (e, t) => {
		ba.init(e, t), lo.init(e, t);
	}), uo = /*@__PURE__*/ O("$ZodGUID", (e, t) => {
		t.pattern ??= Wi, j.init(e, t);
	}), fo = /*@__PURE__*/ O("$ZodUUID", (e, t) => {
		if (t.version) {
			let e = {
				v1: 1,
				v2: 2,
				v3: 3,
				v4: 4,
				v5: 5,
				v6: 6,
				v7: 7,
				v8: 8
			}[t.version];
			if (e === void 0) throw Error(`Invalid UUID version: "${t.version}"`);
			t.pattern ??= Gi(e);
		} else t.pattern ??= Gi();
		j.init(e, t);
	}), po = /*@__PURE__*/ O("$ZodEmail", (e, t) => {
		t.pattern ??= Ki, j.init(e, t);
	}), mo = /[\t\n\r]/g, ho = /*@__PURE__*/ O("$ZodURL", (e, t) => {
		j.init(e, t), e._zod.check = (n) => {
			try {
				let r = n.value.trim(), i = Pa(r, t);
				if (i === 1) {
					n.issues.push({
						code: "invalid_format",
						format: "url",
						note: "Invalid URL format",
						input: n.value,
						inst: e,
						continue: !t.abort
					});
					return;
				}
				if (i === 2) {
					n.issues.push({
						code: "invalid_format",
						format: "url",
						input: n.value,
						inst: e,
						continue: !t.abort
					});
					return;
				}
				t.hostname && !Ia(i, t.hostname) && n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid hostname",
					pattern: t.hostname.source,
					input: n.value,
					inst: e,
					continue: !t.abort
				}), t.protocol && !La(i, t.protocol) && n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid protocol",
					pattern: t.protocol.source,
					input: n.value,
					inst: e,
					continue: !t.abort
				}), n.value = t.normalize ? i.href : Fa(r);
				return;
			} catch {
				n.issues.push({
					code: "invalid_format",
					format: "url",
					input: n.value,
					inst: e,
					continue: !t.abort
				});
			}
		};
	}), go = /*@__PURE__*/ O("$ZodEmoji", (e, t) => {
		t.pattern ??= Mi(), j.init(e, t);
	}), _o = /*@__PURE__*/ O("$ZodNanoID", (e, t) => {
		if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1)) throw Error(`Invalid nanoid length: ${t.length}`);
		t.pattern ??= t.length === void 0 ? Hi : ji(t.length), j.init(e, t);
	}), vo = /*@__PURE__*/ O("$ZodCUID", (e, t) => {
		t.pattern ??= Li, j.init(e, t);
	}), yo = /*@__PURE__*/ O("$ZodCUID2", (e, t) => {
		t.pattern ??= Ri, j.init(e, t);
	}), bo = /*@__PURE__*/ O("$ZodULID", (e, t) => {
		t.pattern ??= zi, j.init(e, t);
	}), xo = /*@__PURE__*/ O("$ZodXID", (e, t) => {
		t.pattern ??= Bi, j.init(e, t);
	}), So = /*@__PURE__*/ O("$ZodKSUID", (e, t) => {
		t.pattern ??= Vi, j.init(e, t);
	}), Co = /*@__PURE__*/ O("$ZodISODateTime", (e, t) => {
		t.pattern ??= Ii(t), j.init(e, t), (t.local || t.precision === -1) && (e._zod.bag.laxFormat = !0, e._zod.onattach.push((e) => {
			e._zod.bag.laxFormat = !0;
		}));
	}), wo = /*@__PURE__*/ O("$ZodISODate", (e, t) => {
		t.pattern ??= ra, j.init(e, t);
	}), To = /*@__PURE__*/ O("$ZodISOTime", (e, t) => {
		t.pattern ??= Fi(t), j.init(e, t);
	}), Eo = /*@__PURE__*/ O("$ZodISODuration", (e, t) => {
		t.pattern ??= Ui, j.init(e, t);
	}), Do = /*@__PURE__*/ O("$ZodIPv4", (e, t) => {
		t.pattern ??= Ji, j.init(e, t), e._zod.bag.format = "ipv4";
	}), Oo = /^[0-9a-fA-F:.]+$/, ko = /*@__PURE__*/ O("$ZodIPv6", (e, t) => {
		t.pattern ??= Yi, j.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
			Ra(n.value) || n.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Ao = /*@__PURE__*/ O("$ZodCIDRv4", (e, t) => {
		t.pattern ??= Xi, j.init(e, t);
	}), jo = /*@__PURE__*/ O("$ZodCIDRv6", (e, t) => {
		t.pattern ??= Zi, j.init(e, t), e._zod.check = (n) => {
			za(n.value) || n.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Mo = /*@__PURE__*/ O("$ZodBase64", (e, t) => {
		t.pattern ??= Qi, j.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
			Ba(n.value) || n.issues.push({
				code: "invalid_format",
				format: "base64",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), No = /*@__PURE__*/ O("$ZodBase64URL", (e, t) => {
		t.pattern ??= $i, j.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
			Va(n.value) || n.issues.push({
				code: "invalid_format",
				format: "base64url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Po = /*@__PURE__*/ O("$ZodE164", (e, t) => {
		t.pattern ??= ta, j.init(e, t);
	}), Fo = /*@__PURE__*/ O("$ZodJWT", (e, t) => {
		j.init(e, t), e._zod.check = (n) => {
			Ha(n.value, t.alg) || n.issues.push({
				code: "invalid_format",
				format: "jwt",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Io = /*@__PURE__*/ O("$ZodNumber", (e, t) => {
		A.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? oa, e._zod.parse = (n, r) => {
			if (t.coerce) try {
				n.value = Number(n.value);
			} catch {}
			let i = n.value;
			if (typeof i == "number" && !Number.isNaN(i) && Number.isFinite(i)) return n;
			let a = typeof i == "number" ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : String(i) : void 0;
			return n.issues.push({
				expected: "number",
				code: "invalid_type",
				input: i,
				inst: e,
				...a ? { received: a } : {}
			}), n;
		};
	}), Lo = /*@__PURE__*/ O("$ZodNumberFormat", (e, t) => {
		ga.init(e, t), Io.init(e, t);
	}), Ro = /*@__PURE__*/ O("$ZodBoolean", (e, t) => {
		A.init(e, t), e._zod.pattern = sa, e._zod.parse = (n, r) => {
			if (t.coerce) try {
				n.value = !!n.value;
			} catch {}
			let i = n.value;
			return typeof i == "boolean" || n.issues.push({
				expected: "boolean",
				code: "invalid_type",
				input: i,
				inst: e
			}), n;
		};
	}), zo = /*@__PURE__*/ O("$ZodUnknown", (e, t) => {
		A.init(e, t), e._zod.parse = (e) => e;
	}), Bo = /*@__PURE__*/ O("$ZodNever", (e, t) => {
		A.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
			expected: "never",
			code: "invalid_type",
			input: t.value,
			inst: e
		}), t);
	}), Vo = /*@__PURE__*/ O("$ZodArray", (e, t) => {
		A.init(e, t);
		let n = ei.memoizer;
		n?.attach(e), e._zod.parse = (r, i) => {
			let a = r.value;
			if (!Array.isArray(a)) return r.issues.push({
				expected: "array",
				code: "invalid_type",
				input: a,
				inst: e
			}), r;
			r.value = n ? n.alloc(e, r, Array(a.length), i) : Array(a.length);
			let o = [];
			for (let e = 0; e < a.length; e++) {
				let n = a[e], s = t.element._zod.run({
					value: n,
					issues: []
				}, i);
				s instanceof Promise ? o.push(s.then((t) => Ua(t, r, e))) : Ua(s, r, e);
			}
			return o.length ? Promise.all(o).then(() => r) : r;
		};
	}), Ho = [], Uo = /* @__PURE__ */ new WeakMap(), Wo = /*@__PURE__*/ O("$ZodObject", (e, t) => {
		if (A.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
			let e = t.shape;
			Uo.set(t, e), Object.defineProperty(t, "shape", { get: () => {
				let n = { ...e };
				return Object.defineProperty(t, "shape", { value: n }), Uo.set(t, n), n;
			} });
		}
		let n = Zn(() => Ga(t));
		D(e, "propValues", (e) => {
			let t = e.def.shape, n = {};
			for (let e in t) {
				let r = t[e]._zod;
				if (r.values) {
					Object.prototype.hasOwnProperty.call(n, e) || T(n, e, /* @__PURE__ */ new Set());
					for (let t of r.values) n[e].add(t);
					r.optin !== void 0 && n[e].add(void 0);
				}
			}
			return n;
		});
		let r = ar, i = t.catchall, a, o = ei.memoizer;
		o?.attach(e), e._zod.parse = (t, s) => {
			a ??= n.value;
			let c = t.value;
			if (!r(c)) return t.issues.push({
				expected: "object",
				code: "invalid_type",
				input: c,
				inst: e
			}), t;
			t.value = o ? o.alloc(e, t, {}, s) : {};
			let l = [], u = a.shape;
			for (let e of a.allKeys) {
				if (e === "__proto__") continue;
				let n = u[e], r = n._zod.optin, i = n._zod.optout, a = n._zod.run({
					value: c[e],
					issues: []
				}, s);
				a instanceof Promise ? l.push(a.then((n) => Wa(n, t, e, c, r, i))) : Wa(a, t, e, c, r, i);
			}
			return i ? Ka(l, c, t, s, n.value, e) : l.length ? Promise.all(l).then(() => t) : t;
		};
	}), Go = /*@__PURE__*/ O("$ZodObjectJIT", (e, t) => {
		Wo.init(e, t);
		let n = e._zod.parse, r = Zn(() => Ga(t)), i = ei.memoizer, a = (t) => {
			let n = r.value, a = n.symbolKeys, o = new ka(["payload", "ctx"], {
				shape: t,
				inst: e,
				memo: i,
				syms: a
			}), s = (e) => `shape[${e}]._zod.run({ value: input[${e}], issues: [] }, ctx)`, c = (e, t) => `
          for (let i = 0; i < ${e}.issues.length; i++) {
            const iss = ${e}.issues[i];
            iss.path = iss.path ? [${t}, ...iss.path] : [${t}];
            payload.issues.push(iss);
          }`;
			o.write("const input = payload.value;");
			let l = Object.create(null), u = 0;
			for (let e of n.allKeys) l[e] = `key_${u++}`;
			o.write(i ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
			for (let e of n.allKeys) {
				if (e === "__proto__") continue;
				let n = l[e], r = typeof e == "symbol" ? `syms[${a.indexOf(e)}]` : rr(e), i = `${r} in input`, u = t[e], d = u?._zod?.optin, f = d !== void 0, p = u?._zod?.optout === "optional";
				if (o.write(`const ${n} = ${s(r)};`), f && p) {
					let e = d === "optional" ? `${n}_present` : `${n}.value !== undefined || ${n}_present`;
					o.write(`
        const ${n}_present = ${i};
        if (!${n}.issues.length || ${n}_present) {
          if (${n}.issues.length) {${c(n, r)}
          }

          if (${e}) {
            newResult[${r}] = ${n}.value;
          }
        }

      `);
				} else f ? o.write(`
        if (${n}.issues.length) {${c(n, r)}
        }
        
        if (${n}.value === undefined) {
          if (${i}) {
            newResult[${r}] = undefined;
          }
        } else {
          newResult[${r}] = ${n}.value;
        }

      `) : o.write(`
        const ${n}_present = ${i};
        if (${n}.issues.length) {${c(n, r)}
        }
        if (!${n}_present && !${n}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${r}]
          });
        }

        if (${n}_present) {
          newResult[${r}] = ${n}.value;
        }

      `);
			}
			return o.write("payload.value = newResult;"), o.write("return payload;"), o.compile();
		}, o, s = ar, c = !ei.jitless, l = c && Rr.value, u = t.catchall, d;
		e._zod.parse = (i, f) => {
			d ??= r.value;
			let p = i.value;
			return s(p) ? c && l && f?.async === !1 && f.jitless !== !0 ? (o ||= a(t.shape), i = o(i, f), u ? Ka([], p, i, f, d, e) : i) : n(i, f) : (i.issues.push({
				expected: "object",
				code: "invalid_type",
				input: p,
				inst: e
			}), i);
		};
	}), Ko = /*@__PURE__*/ O("$ZodUnion", (e, t) => {
		A.init(e, t), D(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), D(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), D(e, "values", (e) => {
			if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
		}), D(e, "pattern", (e) => {
			if (e.def.options.every((e) => e._zod.pattern)) {
				let t = e.def.options.map((e) => e._zod.pattern);
				return RegExp(`^(${t.map((e) => $n(e.source)).join("|")})$`);
			}
		});
		let n = t.options.length === 1 ? t.options[0]._zod.run : null;
		e._zod.parse = (r, i) => {
			if (n) return n(r, i);
			let a = !1, o = [];
			for (let e of t.options) {
				let t = e._zod.run({
					value: r.value,
					issues: []
				}, i);
				if (t instanceof Promise) o.push(t), a = !0;
				else {
					if (t.issues.length === 0) return t;
					o.push(t);
				}
			}
			return a ? Promise.all(o).then((t) => qa(t, r, e, i)) : qa(o, r, e, i);
		};
	}), qo = /*@__PURE__*/ O("$ZodDiscriminatedUnion", (e, t) => {
		t.inclusive = !1, Ko.init(e, t);
		let n = e._zod.parse;
		D(e, "propValues", (e) => {
			let t = {};
			for (let n of e.def.options) {
				let r = n._zod.propValues;
				if (!r || Object.keys(r).length === 0) throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(n)}"`);
				for (let [e, n] of Object.entries(r)) {
					Object.prototype.hasOwnProperty.call(t, e) || T(t, e, /* @__PURE__ */ new Set());
					for (let r of n) t[e].add(r);
				}
			}
			return t;
		}), t.options.forEach((e, n) => {
			let r = Uo.get(e._zod.def);
			if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator)) throw Error(`Invalid discriminated union option at index "${n}"`);
		});
		let r = Zn(() => {
			let e = t.options, n = /* @__PURE__ */ new Map();
			for (let r of e) {
				let e = r._zod.propValues?.[t.discriminator];
				if (!e || e.size === 0) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
				for (let t of e) {
					if (n.has(t)) throw Error(`Duplicate discriminator value "${String(t)}"`);
					n.set(t, r);
				}
			}
			return n;
		});
		e._zod.parse = (i, a) => {
			let o = i.value;
			if (!ar(o)) return i.issues.push({
				code: "invalid_type",
				expected: "object",
				input: o,
				inst: e
			}), i;
			let s = r.value.get(o?.[t.discriminator]);
			return s ? s._zod.run(i, a) : t.unionFallback || a.direction === "backward" ? n(i, a) : (i.issues.push({
				code: "invalid_union",
				errors: [],
				note: "No matching discriminator",
				discriminator: t.discriminator,
				options: Array.from(r.value.keys()),
				input: o,
				path: [t.discriminator],
				inst: e
			}), i);
		};
	}), Jo = /*@__PURE__*/ O("$ZodIntersection", (e, t) => {
		A.init(e, t), e._zod.parse = (e, n) => {
			let r = e.value, i = t.left._zod.run({
				value: r,
				issues: []
			}, n), a = t.right._zod.run({
				value: r,
				issues: []
			}, n);
			return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => Ya(e, t, n)) : Ya(e, i, a);
		};
	}), Yo = /*@__PURE__*/ O("$ZodTuple", (e, t) => {
		A.init(e, t);
		let n = t.items, r = ei.memoizer;
		r?.attach(e), e._zod.parse = (i, a) => {
			let o = i.value;
			if (!Array.isArray(o)) return i.issues.push({
				input: o,
				inst: e,
				expected: "tuple",
				code: "invalid_type"
			}), i;
			i.value = r ? r.alloc(e, i, [], a) : [];
			let s = [], c = Xa(n, "optin"), l = Xa(n, "optout");
			if (!t.rest) {
				if (o.length < c) return i.issues.push({
					code: "too_small",
					minimum: c,
					inclusive: !0,
					input: o,
					inst: e,
					origin: "array"
				}), i;
				o.length > n.length && i.issues.push({
					code: "too_big",
					maximum: n.length,
					inclusive: !0,
					input: o,
					inst: e,
					origin: "array"
				});
			}
			let u = Array(n.length);
			for (let e = 0; e < n.length; e++) {
				let t = n[e]._zod.run({
					value: o[e],
					issues: []
				}, a);
				t instanceof Promise ? s.push(t.then((t) => {
					u[e] = t;
				})) : u[e] = t;
			}
			if (t.rest) {
				let e = n.length - 1, r = o.slice(n.length);
				for (let n of r) {
					e++;
					let r = t.rest._zod.run({
						value: n,
						issues: []
					}, a);
					r instanceof Promise ? s.push(r.then((t) => Za(t, i, e))) : Za(r, i, e);
				}
			}
			return s.length ? Promise.all(s).then(() => Qa(u, i, n, o, l)) : Qa(u, i, n, o, l);
		};
	}), Xo = /*@__PURE__*/ O("$ZodRecord", (e, t) => {
		A.init(e, t);
		let n = ei.memoizer;
		n?.attach(e), e._zod.parse = (r, i) => {
			let a = r.value;
			if (!or(a)) return r.issues.push({
				expected: "record",
				code: "invalid_type",
				input: a,
				inst: e
			}), r;
			let o = [], s = t.keyType._zod.values;
			if (s && !t.partial) {
				r.value = n ? n.alloc(e, r, {}, i) : {};
				let c = /* @__PURE__ */ new Set();
				for (let n of s) if (typeof n == "string" || typeof n == "number" || typeof n == "symbol") {
					if (c.add(typeof n == "number" ? n.toString() : n), n === "__proto__") continue;
					let s = t.keyType._zod.run({
						value: n,
						issues: []
					}, i);
					if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
					if (s.issues.length) {
						r.issues.push({
							code: "invalid_key",
							origin: "record",
							issues: s.issues.map((e) => wr(e, i, Jr())),
							input: n,
							path: [n],
							inst: e
						});
						continue;
					}
					let l = s.value;
					if (l === "__proto__") continue;
					let u = t.valueType._zod.run({
						value: a[n],
						issues: []
					}, i);
					u instanceof Promise ? o.push(u.then((e) => {
						e.issues.length && r.issues.push(...xr(n, e.issues)), r.value[l] = e.value;
					})) : (u.issues.length && r.issues.push(...xr(n, u.issues)), r.value[l] = u.value);
				}
				let l;
				for (let e in a) if (!c.has(e)) {
					if (t.mode === "loose") {
						if (e === "__proto__") continue;
						r.value[e] = a[e];
					} else l ??= [], l.push(e);
				}
				l && l.length > 0 && r.issues.push({
					code: "unrecognized_keys",
					input: a,
					inst: e,
					keys: l,
					continue: !0
				});
			} else {
				r.value = n ? n.alloc(e, r, {}, i) : {};
				let c;
				for (let n of Reflect.ownKeys(a)) {
					if (n === "__proto__" || !Object.prototype.propertyIsEnumerable.call(a, n)) continue;
					let l = t.keyType._zod.run({
						value: n,
						issues: []
					}, i);
					if (l instanceof Promise) throw Error("Async schemas not supported in object keys currently");
					if (typeof n == "string" && oa.test(n) && l.issues.length) {
						let e = t.keyType._zod.run({
							value: Number(n),
							issues: []
						}, i);
						if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
						e.issues.length === 0 && (l = e);
					}
					if (l.issues.length) {
						t.mode === "loose" ? r.value[n] = a[n] : s ? (c ??= [], c.push(n)) : r.issues.push({
							code: "invalid_key",
							origin: "record",
							issues: l.issues.map((e) => wr(e, i, Jr())),
							input: n,
							path: [n],
							inst: e
						});
						continue;
					}
					let u = l.value;
					if (u === "__proto__") continue;
					let d = t.valueType._zod.run({
						value: a[n],
						issues: []
					}, i);
					d instanceof Promise ? o.push(d.then((e) => {
						e.issues.length && r.issues.push(...xr(n, e.issues)), r.value[u] = e.value;
					})) : (d.issues.length && r.issues.push(...xr(n, d.issues)), r.value[u] = d.value);
				}
				c && c.length > 0 && r.issues.push({
					code: "unrecognized_keys",
					input: a,
					inst: e,
					keys: c,
					continue: !0
				});
			}
			return o.length ? Promise.all(o).then(() => r) : r;
		};
	}), Zo = /*@__PURE__*/ O("$ZodEnum", (e, t) => {
		A.init(e, t);
		let n = Jn(t.entries), r = new Set(n);
		e._zod.values = r;
		let i = n.filter((e) => zr.has(typeof e));
		e._zod.pattern = RegExp(i.length ? `^(${i.map((e) => cr(e.toString())).join("|")})$` : "^[^\\s\\S]$"), e._zod.parse = (t, i) => {
			let a = t.value;
			return r.has(a) || t.issues.push({
				code: "invalid_value",
				values: n,
				input: a,
				inst: e
			}), t;
		};
	}), Qo = /*@__PURE__*/ O("$ZodLiteral", (e, t) => {
		A.init(e, t);
		let n = new Set(t.values);
		e._zod.values = n, e._zod.pattern = RegExp(t.values.length ? `^(${t.values.map((e) => typeof e == "string" ? cr(e) : e ? cr(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$"), e._zod.parse = (r, i) => {
			let a = r.value;
			return n.has(a) || r.issues.push({
				code: "invalid_value",
				values: t.values,
				input: a,
				inst: e
			}), r;
		};
	}), $o = /*@__PURE__*/ O("$ZodTransform", (e, t) => {
		A.init(e, t), e._zod.optin = "optional", ei.memoizer?.guard(e), e._zod.parse = (n, r) => {
			if (r.direction === "backward") throw new $r(e.constructor.name);
			let i = t.transform(n.value, n);
			if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n));
			if (i instanceof Promise) throw new Qr();
			return n.value = i, n;
		};
	}), es = /*@__PURE__*/ O("$ZodOptional", (e, t) => {
		A.init(e, t), D(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", D(e, "values", (e) => {
			let t = e.def.innerType._zod.values;
			return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
		}), D(e, "pattern", (e) => {
			let t = e.def.innerType._zod.pattern;
			return t ? RegExp(`^(${$n(t.source)})?$`) : void 0;
		}), e._zod.parse = (e, n) => {
			if (e.value === void 0) {
				if (t.innerType._zod.optin !== "defaulted") return e;
				let r = t.innerType._zod.run({
					value: e.value,
					issues: []
				}, n);
				return r instanceof Promise ? r.then((t) => $a(e, t)) : $a(e, r);
			}
			return t.innerType._zod.run(e, n);
		};
	}), ts = /*@__PURE__*/ O("$ZodExactOptional", (e, t) => {
		es.init(e, t), D(e, "values", (e) => e.def.innerType._zod.values), D(e, "pattern", (e) => e.def.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
	}), ns = /*@__PURE__*/ O("$ZodNullable", (e, t) => {
		A.init(e, t), D(e, "optin", (e) => e.def.innerType._zod.optin), D(e, "optout", (e) => e.def.innerType._zod.optout), D(e, "pattern", (e) => {
			let t = e.def.innerType._zod.pattern;
			return t ? RegExp(`^(${$n(t.source)}|null)$`) : void 0;
		}), D(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
	}), rs = /*@__PURE__*/ O("$ZodDefault", (e, t) => {
		A.init(e, t), e._zod.optin = "defaulted", D(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			if (e.value === void 0) return e.value = t.defaultValue, e;
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => eo(e, t)) : eo(r, t);
		};
	}), is = /*@__PURE__*/ O("$ZodPrefault", (e, t) => {
		A.init(e, t), e._zod.optin = "defaulted", D(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
	}), as = /*@__PURE__*/ O("$ZodNonOptional", (e, t) => {
		A.init(e, t), D(e, "values", (e) => {
			let t = e.def.innerType._zod.values;
			return t ? new Set([...t].filter((e) => e !== void 0)) : void 0;
		}), e._zod.parse = (n, r) => {
			let i = t.innerType._zod.run(n, r);
			return i instanceof Promise ? i.then((t) => to(t, e)) : to(i, e);
		};
	}), os = /*@__PURE__*/ O("$ZodCatch", (e, t) => {
		A.init(e, t), D(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), D(e, "optout", (e) => e.def.innerType._zod.optout), D(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((r) => no(e, r, t, n)) : no(e, r, t, n);
		};
	}), ss = /*@__PURE__*/ O("$ZodPipe", (e, t) => {
		A.init(e, t), D(e, "values", (e) => e.def.in._zod.values), D(e, "optin", (e) => e.def.in._zod.optin), D(e, "optout", (e) => e.def.out._zod.optout), D(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
			if (n.direction === "backward") {
				let r = t.out._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => ro(e, t.in, n)) : ro(r, t.in, n);
			}
			let r = t.in._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => ro(e, t.out, n)) : ro(r, t.out, n);
		};
	}), cs = /*@__PURE__*/ O("$ZodCodec", (e, t) => {
		A.init(e, t), D(e, "values", (e) => e.def.in._zod.values), D(e, "optin", (e) => e.def.in._zod.optin), D(e, "optout", (e) => e.def.out._zod.optout), D(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
			if ((n.direction || "forward") === "forward") {
				let r = t.in._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => io(e, t, n)) : io(r, t, n);
			}
			{
				let r = t.out._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => io(e, t, n)) : io(r, t, n);
			}
		};
	}), ls = /*@__PURE__*/ O("$ZodReadonly", (e, t) => {
		A.init(e, t), D(e, "propValues", (e) => e.def.innerType._zod.propValues), D(e, "values", (e) => e.def.innerType._zod.values), D(e, "optin", (e) => e.def.innerType?._zod?.optin), D(e, "optout", (e) => e.def.innerType?._zod?.optout), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then(oo) : oo(r);
		};
	}), us = /*@__PURE__*/ O("$ZodLazy", (e, t) => {
		A.init(e, t), tr(e._zod, "innerType", () => {
			let e = t;
			return e._cachedInner ||= t.getter(), e._cachedInner;
		}), D(e, "pattern", (e) => e.innerType?._zod?.pattern), D(e, "propValues", (e) => e.innerType?._zod?.propValues), D(e, "optin", (e) => e.innerType?._zod?.optin ?? void 0), D(e, "optout", (e) => e.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n) => e._zod.innerType._zod.run(t, n);
	}), ds = /*@__PURE__*/ O("$ZodCustom", (e, t) => {
		k.init(e, t), A.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
			let r = n.value, i = t.fn(r);
			if (i instanceof Promise) return i.then((t) => so(t, n, r, e));
			so(i, n, r, e);
		};
	});
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/memoizer.js
function ps(e) {
	return e.map((e) => e.path ? {
		...e,
		path: e.path.slice()
	} : { ...e });
}
function ms(e, t) {
	let n = xs.get(e);
	if (n !== void 0) return n;
	if (t.has(e)) return !0;
	t.add(e);
	let r = !1, i = (e) => {
		!r && e?._zod && ms(e, t) && (r = !0);
	}, a = e._zod.def;
	switch (a.type) {
		case "object":
			for (let e of Reflect.ownKeys(a.shape)) i(a.shape[e]);
			i(a.catchall);
			break;
		case "array":
			i(a.element);
			break;
		case "tuple":
			for (let e of a.items) i(e);
			i(a.rest);
			break;
		case "record":
		case "map":
			i(a.keyType), i(a.valueType);
			break;
		case "set":
			i(a.valueType);
			break;
		case "union":
			for (let e of a.options) i(e);
			break;
		case "intersection":
			i(a.left), i(a.right);
			break;
		case "optional":
		case "nullable":
		case "default":
		case "prefault":
		case "catch":
		case "readonly":
		case "nonoptional":
		case "promise":
		case "success":
			i(a.innerType);
			break;
		case "pipe":
			i(a.in), i(a.out);
			break;
		case "function":
			i(a.input), i(a.output);
			break;
		case "lazy":
			i(e._zod.innerType);
			break;
		case "template_literal":
		case "string":
		case "number":
		case "int":
		case "boolean":
		case "bigint":
		case "symbol":
		case "undefined":
		case "null":
		case "void":
		case "never":
		case "any":
		case "unknown":
		case "date":
		case "nan":
		case "enum":
		case "literal":
		case "file":
		case "transform":
		case "custom": break;
		default: for (let e in a) {
			let t = Object.getOwnPropertyDescriptor(a, e);
			if (!t || t.get) continue;
			let n = t.value;
			if (n && typeof n == "object") {
				if (n._zod) i(n);
				else if (Array.isArray(n)) for (let e of n) i(e);
			}
		}
	}
	return t.delete(e), xs.set(e, r), r;
}
function hs(e, t) {
	let n = e.buckets.get(t);
	return n || (n = /* @__PURE__ */ new Map(), e.buckets.set(t, n)), n;
}
function gs() {
	return ws;
}
function _s(e, t) {
	let n = e[ys]?.backEdges;
	return n !== void 0 && typeof t == "object" && !!t && n.has(t);
}
var vs, ys, bs, xs, Ss, Cs, ws, Ts = b((() => {
	vs = class extends Error {
		constructor() {
			super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
		}
	}, ys = "~memo", bs = [], xs = /*@__PURE__*/ new WeakMap(), Cs = [], ws = {
		alloc(e, t, n) {
			let r = Ss;
			if (!r) return n;
			Ss = void 0;
			let i = {
				value: n,
				issues: null
			};
			return r.set(t.value, i), Cs.push(i), n;
		},
		guard(e) {
			var t;
			(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
				let t = e._zod.parse, n = (e, n) => {
					if (n.direction !== "backward" && _s(n, e.value)) throw new vs();
					return t(e, n);
				};
				e._zod.parse = n, e._zod.run === t && (e._zod.run = n);
			});
		},
		attach(e) {
			var t;
			let n, r, i;
			(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
				let t = e._zod.parse, a = (o, s) => {
					if (n === void 0 && (n = ms(e, /* @__PURE__ */ new Set()), !n)) return e._zod.parse = t, e._zod.run === a && (e._zod.run = t), t(o, s);
					let c = o.value;
					if (typeof c != "object" || !c) return t(o, s);
					let l = s[ys];
					l || (l = {
						buckets: /* @__PURE__ */ new Map(),
						backEdges: void 0
					}, s[ys] = l);
					let u;
					r === s ? u = i : (u = hs(l, e), r = s, i = u);
					let d = u.get(c);
					if (d) return o.value = d.value, d.issues ? d.issues.length && o.issues.push(...ps(d.issues)) : (o.memo = !0, l.backEdges ?? (l.backEdges = /* @__PURE__ */ new Set()), l.backEdges.add(d.value)), o;
					Ss = u;
					let f = Cs.length, p = t(o, s);
					Ss = void 0;
					let m = Cs.length > f ? Cs.pop() : void 0;
					return p instanceof Promise ? p.then((e) => (m && (m.issues = e.issues.length ? ps(e.issues) : bs), e)) : (m && (m.issues = p.issues.length ? ps(p.issues) : bs), p);
				};
				e._zod.parse = a, e._zod.run === t && (e._zod.run = a);
			});
		}
	};
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/locales/en.js
function Es() {
	return { localeError: Ds() };
}
var Ds, Os = b((() => {
	Kr(), Ds = () => {
		let e = {
			string: {
				unit: "characters",
				verb: "to have"
			},
			file: {
				unit: "bytes",
				verb: "to have"
			},
			array: {
				unit: "items",
				verb: "to have"
			},
			set: {
				unit: "items",
				verb: "to have"
			},
			map: {
				unit: "entries",
				verb: "to have"
			}
		};
		function t(t) {
			return e[t] ?? null;
		}
		let n = {
			regex: "input",
			email: "email address",
			url: "URL",
			emoji: "emoji",
			uuid: "UUID",
			uuidv4: "UUIDv4",
			uuidv6: "UUIDv6",
			nanoid: "nanoid",
			guid: "GUID",
			cuid: "cuid",
			cuid2: "cuid2",
			ulid: "ULID",
			xid: "XID",
			ksuid: "KSUID",
			datetime: "ISO datetime",
			date: "ISO date",
			time: "ISO time",
			duration: "ISO duration",
			ipv4: "IPv4 address",
			ipv6: "IPv6 address",
			mac: "MAC address",
			cidrv4: "IPv4 range",
			cidrv6: "IPv6 range",
			base64: "base64-encoded string",
			base64url: "base64url-encoded string",
			json_string: "JSON string",
			e164: "E.164 number",
			credit_card: "credit card number",
			jwt: "JWT",
			template_literal: "input"
		}, r = { nan: "NaN" };
		function i(e, t) {
			return e === "number" && typeof t == "number" && !Number.isFinite(t) ? String(t) : r[e] ?? e;
		}
		return (e) => {
			switch (e.code) {
				case "invalid_type": return `Invalid input: expected ${i(e.expected)}, received ${i(Dr(e.input), e.input)}`;
				case "invalid_value": return e.values.length === 1 ? `Invalid input: expected ${ur(e.values[0])}` : `Invalid option: expected one of ${Yn(e.values, "|")}`;
				case "too_big": {
					let n = e.exact ? "exactly " : e.inclusive ? "<=" : "<", r = t(e.origin);
					return r ? `Too big: expected ${e.origin ?? "value"} to have ${n}${e.maximum.toString()} ${r.unit ?? "elements"}` : `Too big: expected ${e.origin ?? "value"} to be ${n}${e.maximum.toString()}`;
				}
				case "too_small": {
					let n = e.exact ? "exactly " : e.inclusive ? ">=" : ">", r = t(e.origin);
					return r ? `Too small: expected ${e.origin} to have ${n}${e.minimum.toString()} ${r.unit}` : `Too small: expected ${e.origin} to be ${n}${e.minimum.toString()}`;
				}
				case "invalid_format": {
					let t = e;
					return t.format === "starts_with" ? `Invalid string: must start with "${t.prefix}"` : t.format === "ends_with" ? `Invalid string: must end with "${t.suffix}"` : t.format === "includes" ? `Invalid string: must include "${t.includes}"` : t.format === "regex" ? `Invalid string: must match pattern ${t.pattern}` : `Invalid ${n[t.format] ?? e.format}`;
				}
				case "not_multiple_of": return `Invalid number: must be a multiple of ${e.divisor}`;
				case "unrecognized_keys": return `Unrecognized key${e.keys.length > 1 ? "s" : ""}: ${Yn(e.keys, ", ")}`;
				case "invalid_key": return `Invalid key in ${e.origin}`;
				case "invalid_union": return e.options && Array.isArray(e.options) && e.options.length > 0 ? `Invalid discriminator value. Expected ${e.options.map((e) => `'${e}'`).join(" | ")}` : e.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
				case "invalid_element": return `Invalid value in ${e.origin}`;
				default: return "Invalid input";
			}
		};
	};
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/registries.js
function ks() {
	return new js();
}
var As, js, Ms, Ns = b((() => {
	js = class {
		constructor() {
			this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
		}
		add(e, ...t) {
			let n = t[0];
			return this._map.set(e, n), n && typeof n == "object" && "id" in n && this._idmap.set(n.id, e), this;
		}
		clear() {
			return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
		}
		remove(e) {
			let t = this._map.get(e);
			return t && typeof t == "object" && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
		}
		get(e) {
			let t = e._zod.parent;
			if (t) {
				let n = { ...this.get(t) ?? {} };
				delete n.id;
				let r = {
					...n,
					...this._map.get(e)
				};
				return Object.keys(r).length ? r : void 0;
			}
			return this._map.get(e);
		}
		has(e) {
			return this._map.has(e);
		}
	}, (As = globalThis).__zod_globalRegistry ?? (As.__zod_globalRegistry = ks()), Ms = globalThis.__zod_globalRegistry;
})), Ps = b((() => {}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function Fs(e, t) {
	return new e({
		type: "string",
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Is(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ls(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Rs(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function zs(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Bs(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Vs(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Hs(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Us(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ws(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Gs(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ks(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function qs(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Js(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ys(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Xs(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Zs(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Qs(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function $s(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ec(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function tc(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function nc(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function rc(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ic(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ac(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function oc(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function sc(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function cc(e, t) {
	return new e({
		type: "number",
		checks: [],
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function lc(e, t) {
	return new e({
		type: "number",
		coerce: !0,
		checks: [],
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function uc(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function dc(e, t) {
	return new e({
		type: "boolean",
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function fc(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function pc(e, t) {
	return new e({
		type: "never",
		...E(t)
	});
}
// @__NO_SIDE_EFFECTS__
function mc(e, t) {
	return new pa({
		check: "less_than",
		...E(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function hc(e, t) {
	return new pa({
		check: "less_than",
		...E(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function gc(e, t) {
	return new ma({
		check: "greater_than",
		...E(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function _c(e, t) {
	return new ma({
		check: "greater_than",
		...E(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function vc(e, t) {
	return new ha({
		check: "multiple_of",
		...E(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function yc(e, t) {
	return new _a({
		check: "max_length",
		...E(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function bc(e, t) {
	return new va({
		check: "min_length",
		...E(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function xc(e, t) {
	return new ya({
		check: "length_equals",
		...E(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function Sc(e, t) {
	return new xa({
		check: "string_format",
		format: "regex",
		...E(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function Cc(e) {
	return new Sa({
		check: "string_format",
		format: "lowercase",
		...E(e)
	});
}
// @__NO_SIDE_EFFECTS__
function wc(e) {
	return new Ca({
		check: "string_format",
		format: "uppercase",
		...E(e)
	});
}
// @__NO_SIDE_EFFECTS__
function Tc(e, t) {
	return new wa({
		check: "string_format",
		format: "includes",
		...E(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function Ec(e, t) {
	return new Ta({
		check: "string_format",
		format: "starts_with",
		...E(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function Dc(e, t) {
	return new Ea({
		check: "string_format",
		format: "ends_with",
		...E(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function Oc(e) {
	return new Da({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function kc(e) {
	return /* @__PURE__ */ Oc((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function Ac() {
	return /* @__PURE__ */ Oc((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function jc() {
	return /* @__PURE__ */ Oc((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function Mc() {
	return /* @__PURE__ */ Oc((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function Nc() {
	return /* @__PURE__ */ Oc((e) => ir(e));
}
// @__NO_SIDE_EFFECTS__
function Pc(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...E(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Fc(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...E(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Ic(e, t) {
	let n = /* @__PURE__ */ Lc((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(Or(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", "input" in r || (r.input = t.value), r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(Or(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function Lc(e, t) {
	let n = new k({
		check: "custom",
		...E(t)
	});
	return n._zod.check = e, n;
}
// @__NO_SIDE_EFFECTS__
function Rc(e, t) {
	let n = E(t), r = n.truthy ?? [
		"true",
		"1",
		"yes",
		"on",
		"y",
		"enabled"
	], i = n.falsy ?? [
		"false",
		"0",
		"no",
		"off",
		"n",
		"disabled"
	];
	n.case !== "sensitive" && (r = r.map((e) => typeof e == "string" ? e.toLowerCase() : e), i = i.map((e) => typeof e == "string" ? e.toLowerCase() : e));
	let a = new Set(r), o = new Set(i), s = e.Codec ?? cs, c = e.Boolean ?? Ro, l = new s({
		type: "pipe",
		in: new (e.String ?? lo)({
			type: "string",
			error: n.error
		}),
		out: new c({
			type: "boolean",
			error: n.error
		}),
		transform: ((e, t) => {
			let r = e;
			return n.case !== "sensitive" && (r = r.toLowerCase()), a.has(r) ? !0 : !o.has(r) && (t.issues.push({
				code: "invalid_value",
				expected: "stringbool",
				values: [...a, ...o],
				input: t.value,
				inst: l,
				continue: !1
			}), {});
		}),
		reverseTransform: ((e, t) => e === !0 ? r[0] || "true" : i[0] || "false"),
		error: n.error
	});
	return l._zod.bag.truthy = r, l._zod.bag.falsy = i, l._zod.bag.case = n.case ?? "insensitive", l;
}
var zc = b((() => {
	Oa(), fs(), Kr();
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/to-json-schema.js
function Bc(e, ...t) {
	for (let n of t) for (let t of Reflect.ownKeys(n)) Object.prototype.propertyIsEnumerable.call(n, t) && T(e, t, n[t]);
	return e;
}
function Vc(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? Ms,
		target: t,
		unrepresentable: e?.unrepresentable ?? "throw",
		override: e?.override ?? (() => {}),
		io: e?.io ?? "output",
		counter: 0,
		seen: /* @__PURE__ */ new Map(),
		sharedDefsExtractedFor: void 0,
		sharedEmitDoneFor: void 0,
		cycles: e?.cycles ?? "ref",
		reused: e?.reused ?? "inline",
		intersections: [],
		deferred: [],
		external: e?.external ?? void 0
	};
}
function M(e, t, n, r, i) {
	let a = typeof t.unrepresentable == "function" ? t.unrepresentable({
		zodSchema: e,
		path: r.path,
		message: i
	}) : t.unrepresentable;
	if (a === "any") return !1;
	if (a === void 0 || a === "throw") throw Error(i);
	return Object.assign(n, a), !0;
}
function N(e, t, n = {
	path: [],
	schemaPath: []
}) {
	var r;
	let i = e._zod.def, a = t.seen.get(e);
	if (a) return a.count++, n.schemaPath.includes(e) && (a.cycle = n.path), a.schema;
	let o = {
		schema: {},
		count: 1,
		cycle: void 0,
		path: n.path
	};
	t.seen.set(e, o), t.sharedDefsExtractedFor = void 0, t.sharedEmitDoneFor = void 0;
	let s = e._zod.toJSONSchema?.();
	if (s) o.schema = s;
	else {
		let r = {
			...n,
			schemaPath: [...n.schemaPath, e],
			path: n.path
		};
		if (e._zod.processJSONSchema) e._zod.processJSONSchema(t, o.schema, r);
		else {
			let n = o.schema, a = t.processors[i.type];
			if (!a) throw Error(`[toJSONSchema]: Non-representable type encountered: ${i.type}`);
			a(e, t, n, r);
		}
		let a = e._zod.parent;
		a && (o.ref ||= a, N(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Bc(o.schema, c), t.io === "input" && Yc(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function Hc(e) {
	return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function Uc(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	if (e.external && e.sharedDefsExtractedFor === e.external) return;
	let r = /* @__PURE__ */ new Map();
	for (let t of e.seen.entries()) {
		let n = e.metadataRegistry.get(t[0])?.id;
		if (n) {
			let e = r.get(n);
			if (e && e !== t[0]) throw Error(`Duplicate schema id "${n}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
			r.set(n, t[0]);
		}
	}
	let i = (t) => {
		let r = e.target === "draft-2020-12" ? "$defs" : "definitions";
		if (e.external) {
			let n = e.external.registry.get(t[0])?.id, i = e.external.uri ?? ((e) => e);
			if (n) return { ref: i(n) };
			let a = t[1].defId ?? t[1].schema.id ?? `schema${e.counter++}`;
			return t[1].defId = a, {
				defId: a,
				ref: `${i("__shared")}#/${r}/${Hc(a)}`
			};
		}
		let i = `#/${r}/`;
		if (t[1] === n && !t[1].schema.id) return { ref: "#" };
		let a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + Hc(a)
		};
	}, a = (e) => {
		if (e[1].schema.$ref) return;
		let t = e[1], { ref: n, defId: r } = i(e);
		t.def = { ...t.schema }, r && (t.defId = r);
		let a = t.schema;
		for (let e in a) delete a[e];
		a.$ref = n;
	};
	if (e.cycles === "throw") for (let t of e.seen.entries()) {
		let e = t[1];
		if (e.cycle) throw Error(`Cycle detected: #/${e.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
	}
	for (let n of e.seen.entries()) {
		let r = n[1];
		if (t === n[0]) {
			a(n);
			continue;
		}
		if (e.external) {
			let r = e.external.registry.get(n[0])?.id;
			if (t !== n[0] && r) {
				a(n);
				continue;
			}
		}
		if (e.metadataRegistry.get(n[0])?.id) {
			a(n);
			continue;
		}
		if (r.cycle) {
			a(n);
			continue;
		}
		if (r.count > 1 && e.reused === "ref") {
			a(n);
			continue;
		}
	}
	e.external && (e.sharedDefsExtractedFor = e.external);
}
function Wc(e) {
	let t = e.anyOf;
	if (!Array.isArray(t) || t.length === 0 || e.type !== void 0) return;
	let n = [];
	for (let e of t) {
		if (!e || typeof e != "object") return;
		Wc(e);
		let t = Object.keys(e);
		if (t.length !== 1 || t[0] !== "type") return;
		let r = e.type;
		for (let e of Array.isArray(r) ? r : [r]) {
			if (typeof e != "string") return;
			n.includes(e) || n.push(e);
		}
	}
	delete e.anyOf, e.type = n.length === 1 ? n[0] : n;
}
function Gc(e) {
	let t = e.additionalProperties;
	return t === void 0 || t === !1 || typeof t != "object" || !t ? null : Object.keys(t).length ? t : null;
}
function Kc(e) {
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || n.type !== "object") return null;
		for (let e in n) if (!Xc.has(e)) return null;
		t.push(n);
	}
	let n = {}, r = /* @__PURE__ */ new Set();
	for (let e of t) {
		for (let r in e.properties) {
			if (Object.prototype.hasOwnProperty.call(n, r)) continue;
			let e = [];
			for (let n of t) {
				let t = n.properties?.[r] ?? Gc(n);
				t != null && (e.some((e) => JSON.stringify(e) === JSON.stringify(t)) || e.push(t));
			}
			T(n, r, e.length === 1 ? e[0] : Kc(e) ?? { allOf: e });
		}
		for (let t of e.required ?? []) r.add(t);
	}
	let i = {
		type: "object",
		properties: n
	};
	if (r.size && (i.required = [...r]), t.every((e) => e.additionalProperties === !1)) i.additionalProperties = !1;
	else {
		let e = [];
		for (let n of t) {
			let t = Gc(n);
			t && !e.some((e) => JSON.stringify(e) === JSON.stringify(t)) && e.push(t);
		}
		e.length === 1 ? i.additionalProperties = e[0] : e.length > 1 && (i.additionalProperties = { allOf: e });
	}
	return i;
}
function qc(e) {
	let t = e.allOf;
	if (!Array.isArray(t) || t.length < 2) return;
	for (let t of Xc) if (t in e) return;
	let n = t.filter((e) => Zc.some((t) => Array.isArray(e[t]))), r = null;
	if (!n.length) r = Kc(t);
	else {
		let e = n[0], i = Zc.find((t) => Array.isArray(e[t]));
		if (Object.keys(e).length !== 1) return;
		let a = t.filter((t) => t !== e), o = e[i].map((e) => Kc([...a, e]));
		if (o.some((e) => !e)) return;
		r = { [i]: o };
	}
	r && (delete e.allOf, Bc(e, r));
}
function Jc(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : Bc(i, s), Bc(i, a), t._zod.parent === o) for (let e in i) e !== "$ref" && e !== "allOf" && (e in a || delete i[e]);
			if (s.$ref && n.def) for (let e in i) e !== "$ref" && e !== "allOf" && e in n.def && JSON.stringify(i[e]) === JSON.stringify(n.def[e]) && delete i[e];
		}
		let s = t._zod.parent;
		if (s && s !== o) {
			r(s);
			let t = e.seen.get(s);
			if (t?.schema.$ref && (i.$ref = t.schema.$ref, t.def)) for (let e in i) e !== "$ref" && e !== "allOf" && e in t.def && JSON.stringify(i[e]) === JSON.stringify(t.def[e]) && delete i[e];
		}
		e.override({
			zodSchema: t,
			jsonSchema: i,
			path: n.path ?? []
		});
	};
	if (!e.external || e.sharedEmitDoneFor !== e.external) {
		for (let t of [...e.seen.entries()].reverse()) r(t[0]);
		if (e.target !== "openapi-3.0") for (let t of e.seen.entries()) Wc(t[1].def ?? t[1].schema);
		for (let t of e.deferred) t();
		if (e.intersections.length) {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.seen.values()) for (let e of [n.schema, n.def]) {
				let n = e?.allOf;
				if (!Array.isArray(n)) continue;
				let r = t.get(n);
				r ? r.push(e) : t.set(n, [e]);
			}
			for (let n of e.intersections) for (let e of t.get(n) ?? []) qc(e);
		}
	}
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	Bc(i, n.defId ? n.schema : n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	if (!e.external || e.sharedEmitDoneFor !== e.external) for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, T(o, e.defId, e.def));
	}
	e.external && (e.sharedEmitDoneFor = e.external), e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: $c(t, "input", e.processors),
					output: $c(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function Yc(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return Yc(r.element, n);
	if (r.type === "set") return Yc(r.valueType, n);
	if (r.type === "lazy") return Yc(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch") return Yc(r.innerType, n);
	if (r.type === "intersection") return Yc(r.left, n) || Yc(r.right, n);
	if (r.type === "record" || r.type === "map") return Yc(r.keyType, n) || Yc(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : Yc(r.in, n) || Yc(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if (Yc(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if (Yc(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if (Yc(e, n)) return !0;
		return !!(r.rest && Yc(r.rest, n));
	}
	return !1;
}
var Xc, Zc, Qc, $c, el = b((() => {
	Ns(), Kr(), Xc = /* @__PURE__ */ new Set([
		"type",
		"properties",
		"required",
		"additionalProperties"
	]), Zc = ["oneOf", "anyOf"], Qc = (e, t = {}) => (n) => {
		let r = Vc({
			...n,
			processors: t
		});
		return N(e, r), Uc(r, e), Jc(r, e);
	}, $c = (e, t, n = {}) => (r) => {
		let { libraryOptions: i, target: a } = r ?? {}, o = Vc({
			...i ?? {},
			target: a,
			io: t,
			processors: n
		});
		return N(e, o), Uc(o, e), Jc(o, e);
	};
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/json-schema-processors.js
function tl(e) {
	let t = e._zod.def;
	return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? tl(t.out) : t.type === "catch" ? tl(t.innerType) : e._zod.optin;
}
function nl(e, t, n) {
	if (t.$ref) {
		if (n.has(t)) return t;
		n.add(t);
		let r = e.get(t)?.def;
		if (!r) return t;
		let i = nl(e, r, n);
		return i === r ? t : i;
	}
	for (let r of ["anyOf", "oneOf"]) {
		let i = t[r];
		if (!Array.isArray(i)) continue;
		let a = i.map((t) => nl(e, t, n));
		a.some((e, t) => e !== i[t]) && (t = {
			...t,
			[r]: a
		});
	}
	let r = Array.isArray(t.type) ? t.type : [t.type], i = !r.includes("string") && r.some((e) => e === "number" || e === "integer"), a = t.enum ?? (t.const === void 0 ? void 0 : [t.const]);
	if (!i && !a?.some((e) => typeof e == "number")) return t;
	let { minimum: o, maximum: s, exclusiveMinimum: c, exclusiveMaximum: l, multipleOf: u, format: d, id: f, ...p } = t;
	return p.enum ? p.enum = p.enum.map((e) => typeof e == "number" ? String(e) : e) : typeof p.const == "number" && (p.const = String(p.const)), i ? (p.type = "string", a || (p.pattern = (r.includes("number") ? oa : aa).source), p) : p;
}
function rl(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.seen.values()) n.def && !t.has(n.schema) && t.set(n.schema, n);
	let n = /* @__PURE__ */ new Map();
	for (let r of Fl.get(e) ?? []) {
		let i = e.seen.get(r), a = (i?.def ?? i?.schema)?.propertyNames;
		if (!a || a === !0 || n.has(a)) continue;
		let o = nl(t, a, /* @__PURE__ */ new Set());
		o !== a && n.set(a, o);
	}
	if (n.size) for (let t of e.seen.values()) for (let e of [t.schema, t.def]) {
		let t = e && n.get(e.propertyNames);
		t && (e.propertyNames = t);
	}
}
function il(e, t, n, r, i) {
	let a = !1, o = JSON.stringify(e, (e, t) => typeof t == "bigint" ? (a = !0, null) : t);
	return a ? (M(t, n, r, i, "BigInt defaults cannot be represented in JSON Schema"), zl) : JSON.parse(o);
}
function al(e, t) {
	if ("_idmap" in e) {
		let n = e, r = Vc({
			...t,
			processors: Jl
		}), i = {};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			N(n, r);
		}
		let a = {};
		r.external = {
			registry: n,
			uri: t?.uri,
			defs: i
		};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			Uc(r, n), T(a, t, Jc(r, n));
		}
		return Object.keys(i).length > 0 && (a.__shared = { [r.target === "draft-2020-12" ? "$defs" : "definitions"]: i }), { schemas: a };
	}
	let n = Vc({
		...t,
		processors: Jl
	});
	return N(e, n), Uc(n, e), Jc(n, e);
}
var ol, sl, cl, ll, ul, dl, fl, pl, ml, hl, gl, _l, vl, yl, bl, xl, Sl, Cl, wl, Tl, El, Dl, Ol, kl, Al, jl, Ml, Nl, Pl, Fl, Il, Ll, Rl, zl, Bl, Vl, Hl, Ul, Wl, Gl, Kl, ql, Jl, Yl = b((() => {
	ua(), el(), Kr(), ol = {
		guid: "uuid",
		url: "uri",
		datetime: "date-time",
		json_string: "json-string",
		regex: ""
	}, sl = (e, t, n, r) => {
		let i = n;
		i.type = "string";
		let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l, laxFormat: u } = e._zod.bag;
		if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = ol[s] ?? s, i.format === "" && delete i.format, (s === "time" || u) && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
			let e = [...c];
			e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
				...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
				pattern: e.source
			}))]);
		}
	}, cl = (e, t, n, r) => {
		let i = n, { minimum: a, maximum: o, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: u } = e._zod.bag;
		i.type = typeof s == "string" && s.includes("int") ? "integer" : "number";
		let d = typeof u == "number" && u >= (a ?? -Infinity), f = typeof l == "number" && l <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
		d ? p ? (i.minimum = u, i.exclusiveMinimum = !0) : i.exclusiveMinimum = u : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = l, i.exclusiveMaximum = !0) : i.exclusiveMaximum = l : typeof o == "number" && (i.maximum = o), typeof c == "number" && (Number.isFinite(c) && c !== 0 ? i.multipleOf = Math.abs(c) : M(e, t, i, r, `A multipleOf divisor of ${c} cannot be represented in JSON Schema`));
	}, ll = (e, t, n, r) => {
		n.type = "boolean";
	}, ul = (e, t, n, r) => {
		M(e, t, n, r, "BigInt cannot be represented in JSON Schema");
	}, dl = (e, t, n, r) => {
		M(e, t, n, r, "Symbols cannot be represented in JSON Schema");
	}, fl = (e, t, n, r) => {
		t.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
	}, pl = (e, t, n, r) => {
		M(e, t, n, r, "Undefined cannot be represented in JSON Schema");
	}, ml = (e, t, n, r) => {
		M(e, t, n, r, "Void cannot be represented in JSON Schema");
	}, hl = (e, t, n, r) => {
		n.not = {};
	}, gl = (e, t, n, r) => {}, _l = (e, t, n, r) => {}, vl = (e, t, n, r) => {
		M(e, t, n, r, "Date cannot be represented in JSON Schema");
	}, yl = (e, t, n, r) => {
		let i = e._zod.def, a = Jn(i.entries);
		if (a.length === 0) {
			n.not = {};
			return;
		}
		a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
	}, bl = (e, t, n, r) => {
		let i = e._zod.def;
		if (i.values.length === 0) {
			n.not = {};
			return;
		}
		let a = [];
		for (let o of i.values) if (o === void 0) {
			if (M(e, t, n, r, "Literal `undefined` cannot be represented in JSON Schema")) return;
		} else if (typeof o == "bigint") {
			if (M(e, t, n, r, "BigInt literals cannot be represented in JSON Schema")) return;
			a.push(Number(o));
		} else a.push(o);
		if (a.length !== 0) {
			if (a.length === 1) {
				let e = a[0];
				n.type = e === null ? "null" : typeof e, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [e] : n.const = e;
			} else a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), a.every((e) => typeof e == "boolean") && (n.type = "boolean"), a.every((e) => e === null) && (n.type = "null"), n.enum = a;
		}
	}, xl = (e, t, n, r) => {
		M(e, t, n, r, "NaN cannot be represented in JSON Schema");
	}, Sl = (e, t, n, r) => {
		let i = n, a = e._zod.pattern;
		if (!a) throw Error("Pattern not found in template literal");
		i.type = "string", i.pattern = a.source;
	}, Cl = (e, t, n, r) => {
		let i = n, a = {
			type: "string",
			format: "binary",
			contentEncoding: "binary"
		}, { minimum: o, maximum: s, mime: c } = e._zod.bag;
		o !== void 0 && (a.minLength = o), s !== void 0 && (a.maxLength = s), c ? c.length === 1 ? (a.contentMediaType = c[0], Object.assign(i, a)) : (Object.assign(i, a), i.anyOf = c.map((e) => ({ contentMediaType: e }))) : Object.assign(i, a);
	}, wl = (e, t, n, r) => {
		n.type = "boolean";
	}, Tl = (e, t, n, r) => {
		M(e, t, n, r, "Custom types cannot be represented in JSON Schema");
	}, El = (e, t, n, r) => {
		M(e, t, n, r, "Function types cannot be represented in JSON Schema");
	}, Dl = (e, t, n, r) => {
		M(e, t, n, r, "Transforms cannot be represented in JSON Schema");
	}, Ol = (e, t, n, r) => {
		M(e, t, n, r, "Map cannot be represented in JSON Schema");
	}, kl = (e, t, n, r) => {
		M(e, t, n, r, "Set cannot be represented in JSON Schema");
	}, Al = (e, t, n, r) => {
		let i = n, a = e._zod.def, { minimum: o, maximum: s } = e._zod.bag;
		typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = N(a.element, t, {
			...r,
			path: [...r.path, "items"]
		});
	}, jl = (e, t, n, r) => {
		let i = n, a = e._zod.def, o = a.shape;
		if (Object.getOwnPropertySymbols(o).length && M(e, t, i, r, "Symbol keys cannot be represented in JSON Schema")) return;
		i.type = "object", i.properties = {};
		for (let e in o) T(i.properties, e, N(o[e], t, {
			...r,
			path: [
				...r.path,
				"properties",
				e
			]
		}));
		let s = new Set(Object.keys(o)), c = new Set([...s].filter((e) => {
			let n = a.shape[e];
			return t.io === "input" ? tl(n) === void 0 : n._zod.optout === void 0;
		}));
		c.size > 0 && (i.required = Array.from(c)), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = N(a.catchall, t, {
			...r,
			path: [...r.path, "additionalProperties"]
		})) : t.io === "output" && (i.additionalProperties = !1);
	}, Ml = (e, t, n, r) => {
		let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => N(e, t, {
			...r,
			path: [
				...r.path,
				a ? "oneOf" : "anyOf",
				n
			]
		}));
		a ? n.oneOf = o : n.anyOf = o;
	}, Nl = (e, t, n, r) => {
		let i = e._zod.def, a = N(i.left, t, {
			...r,
			path: [
				...r.path,
				"allOf",
				0
			]
		}), o = N(i.right, t, {
			...r,
			path: [
				...r.path,
				"allOf",
				1
			]
		}), s = (e) => "allOf" in e && Object.keys(e).length === 1, c = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
		n.allOf = c, t.intersections.push(c);
	}, Pl = (e, t, n, r) => {
		let i = n, a = e._zod.def;
		i.type = "array";
		let o = t.target === "draft-2020-12" ? "prefixItems" : "items", s = t.target === "draft-2020-12" || t.target === "openapi-3.0" ? "items" : "additionalItems", c = a.items.map((e, n) => N(e, t, {
			...r,
			path: [
				...r.path,
				o,
				n
			]
		})), l = a.rest ? N(a.rest, t, {
			...r,
			path: [
				...r.path,
				s,
				...t.target === "openapi-3.0" ? [a.items.length] : []
			]
		}) : null, u = a.items.length;
		for (; u > 0;) {
			let e = a.items[u - 1];
			if (!(t.io === "input" ? tl(e) !== void 0 : e._zod.optout === "optional")) break;
			u--;
		}
		let d = a.items.length, f = !a.rest;
		t.target === "draft-2020-12" ? (i.prefixItems = c, f ? i.items = !1 : l && (i.items = l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : t.target === "openapi-3.0" ? (i.items = { anyOf: c }, l && i.items.anyOf.push(l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : (i.items = c, f ? i.additionalItems = !1 : l && (i.additionalItems = l), u > 0 && (i.minItems = u), f && (i.maxItems = d));
		let { minimum: p, maximum: m } = e._zod.bag;
		typeof p == "number" && (i.minItems = p), typeof m == "number" && (i.maxItems = m);
	}, Fl = /* @__PURE__ */ new WeakMap(), Il = (e, t, n, r) => {
		let i = n, a = e._zod.def;
		i.type = "object";
		let o = a.keyType, s = o._zod.bag?.patterns;
		if (a.mode === "loose" && s && s.size > 0) {
			let e = N(a.valueType, t, {
				...r,
				path: [
					...r.path,
					"patternProperties",
					"*"
				]
			});
			i.patternProperties = {};
			for (let t of s) T(i.patternProperties, t.source, e);
		} else {
			if (t.target === "draft-07" || t.target === "draft-2020-12") {
				i.propertyNames = N(a.keyType, t, {
					...r,
					path: [...r.path, "propertyNames"]
				});
				let n = Fl.get(t);
				n || (n = [], Fl.set(t, n), t.deferred.push(() => rl(t))), n.push(e);
			}
			i.additionalProperties = N(a.valueType, t, {
				...r,
				path: [...r.path, "additionalProperties"]
			});
		}
		let c = o._zod.values, l = t.io === "input" && tl(a.valueType) !== void 0;
		if (c && !a.partial && !l) {
			let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
			e.length > 0 && (i.required = e.map(String));
		}
	}, Ll = (e, t, n, r) => {
		let i = e._zod.def, a = N(i.innerType, t, r), o = t.seen.get(e);
		t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
	}, Rl = (e, t, n, r) => {
		let i = e._zod.def;
		N(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, zl = Symbol(), Bl = (e, t, n, r) => {
		let i = e._zod.def;
		N(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
		let o = il(i.defaultValue, e, t, n, r);
		o !== zl && (n.default = o);
	}, Vl = (e, t, n, r) => {
		let i = e._zod.def;
		N(i.innerType, t, r);
		let a = t.seen.get(e);
		if (a.ref = i.innerType, t.io !== "input") return;
		let o = il(i.defaultValue, e, t, n, r);
		o !== zl && (n._prefault = o);
	}, Hl = (e, t, n, r) => {
		let i = e._zod.def;
		N(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
		let o;
		try {
			o = i.catchValue(void 0);
		} catch {
			M(e, t, n, r, "Dynamic catch values are not supported in JSON Schema");
			return;
		}
		n.default = o;
	}, Ul = (e, t, n, r) => {
		let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
		N(o, t, r);
		let s = t.seen.get(e);
		s.ref = o;
	}, Wl = (e, t, n, r) => {
		let i = e._zod.def;
		N(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType, n.readOnly = !0;
	}, Gl = (e, t, n, r) => {
		let i = e._zod.def;
		N(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, Kl = (e, t, n, r) => {
		let i = e._zod.def;
		N(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, ql = (e, t, n, r) => {
		let i = e._zod.innerType;
		N(i, t, r);
		let a = t.seen.get(e);
		a.ref = i;
	}, Jl = {
		string: sl,
		number: cl,
		boolean: ll,
		bigint: ul,
		symbol: dl,
		null: fl,
		undefined: pl,
		void: ml,
		never: hl,
		any: gl,
		unknown: _l,
		date: vl,
		enum: yl,
		literal: bl,
		nan: xl,
		template_literal: Sl,
		file: Cl,
		success: wl,
		custom: Tl,
		function: El,
		transform: Dl,
		map: Ol,
		set: kl,
		array: Al,
		object: jl,
		union: Ml,
		intersection: Nl,
		tuple: Pl,
		record: Il,
		nullable: Ll,
		nonoptional: Rl,
		default: Bl,
		prefault: Vl,
		catch: Hl,
		pipe: Ul,
		readonly: Wl,
		promise: Gl,
		optional: Kl,
		lazy: ql
	};
})), Xl = b((() => {
	ti(), Ai(), mi(), fs(), Ts(), Oa(), Ma(), Kr(), ua(), Os(), Ns(), Aa(), Ps(), zc(), el(), Yl(), el();
})), Zl = b((() => {
	Xl();
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/errors.js
function Ql(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		enumerable: !1,
		get() {
			let e = n(this);
			return Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			}), e;
		},
		set(e) {
			Object.defineProperty(this, t, {
				value: e,
				configurable: !0,
				writable: !0
			});
		}
	});
}
var $l, eu, tu, nu = b((() => {
	Xl(), Kr(), $l = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), eu = (e, t) => {
		fi.init(e, t), e.name = "ZodError";
		let n = Object.getPrototypeOf(e);
		$l.has(n) || ($l.add(n), Ql(n, "format", (e) => (t) => oi(e, t)), Ql(n, "flatten", (e) => (t) => ai(e, t)), Ql(n, "addIssue", (e) => (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, Xn, 2);
		}), Ql(n, "addIssues", (e) => (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, Xn, 2);
		}), Object.defineProperty(n, "isEmpty", {
			configurable: !0,
			enumerable: !1,
			get() {
				return this.issues.length === 0;
			}
		}));
	}, tu = /*@__PURE__*/ O("ZodError", eu, void 0, { Parent: Error });
})), ru, iu, au, ou, su, cu, lu, uu, du, fu, pu, mu, hu = b((() => {
	Xl(), nu(), ru = /* @__PURE__ */ gi(tu), iu = /* @__PURE__ */ _i(tu), au = /* @__PURE__ */ vi(tu), ou = /* @__PURE__ */ bi(tu), su = /* @__PURE__ */ Si(tu), cu = /* @__PURE__ */ Ci(tu), lu = /* @__PURE__ */ wi(tu), uu = /* @__PURE__ */ Ti(tu), du = /* @__PURE__ */ Ei(tu), fu = /* @__PURE__ */ Di(tu), pu = /* @__PURE__ */ Oi(tu), mu = /* @__PURE__ */ ki(tu);
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/schemas.js
function gu() {
	ei.localeError || Jr(Es());
}
function _u() {
	ei.memoizer || Jr({ memoizer: gs() });
}
function P(e) {
	return /* @__PURE__ */ Fs(Wu, e);
}
function vu(e) {
	return /* @__PURE__ */ Hs(Qu, e);
}
function yu(e) {
	return /* @__PURE__ */ Qs(cd, e);
}
function bu(e) {
	return /* @__PURE__ */ $s(ld, e);
}
function F(e) {
	return /* @__PURE__ */ cc(md, e);
}
function xu(e) {
	return /* @__PURE__ */ uc(hd, e);
}
function I(e) {
	return /* @__PURE__ */ dc(gd, e);
}
function Su() {
	return /* @__PURE__ */ fc(_d);
}
function Cu(e) {
	return /* @__PURE__ */ pc(vd, e);
}
function L(e, t) {
	return /* @__PURE__ */ Pc(yd, e, t);
}
function R(e, t) {
	let n = {
		type: "object",
		shape: e ?? {},
		...E(t)
	};
	return new bd(n);
}
function wu(e, t) {
	return new bd({
		type: "object",
		shape: e,
		catchall: Cu(),
		...E(t)
	});
}
function Tu(e, t) {
	return new bd({
		type: "object",
		shape: e,
		catchall: Su(),
		...E(t)
	});
}
function Eu(e, t) {
	return new xd({
		type: "union",
		options: e,
		...E(t)
	});
}
function z(e, t, n) {
	return new Sd({
		type: "union",
		options: t,
		discriminator: e,
		...E(n)
	});
}
function Du(e, t) {
	return new Cd({
		type: "intersection",
		left: e,
		right: t
	});
}
function Ou(e, t, n) {
	let r = t instanceof A;
	return new wd({
		type: "tuple",
		items: e,
		rest: r ? t : null,
		...E(r ? n : t)
	});
}
function B(e, t, n) {
	return !t || !t._zod ? new Td({
		type: "record",
		keyType: P(),
		valueType: e,
		...E(t)
	}) : new Td({
		type: "record",
		keyType: e,
		valueType: t,
		...E(n)
	});
}
function ku(e, t, n) {
	return new Td({
		type: "record",
		keyType: e,
		valueType: t,
		...E(n),
		partial: !0
	});
}
function V(e, t) {
	let n = Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e;
	return new Ed({
		type: "enum",
		entries: n,
		...E(t)
	});
}
function H(e, t) {
	return new Dd({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...E(t)
	});
}
function Au(e) {
	return new Od({
		type: "transform",
		transform: e
	});
}
function ju(e) {
	return new kd({
		type: "optional",
		innerType: e
	});
}
function Mu(e) {
	return new Ad({
		type: "optional",
		innerType: e
	});
}
function Nu(e) {
	return new jd({
		type: "nullable",
		innerType: e
	});
}
function Pu(e, t) {
	return new Md({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : sr(t);
		}
	});
}
function Fu(e, t) {
	return new Nd({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : sr(t);
		}
	});
}
function Iu(e, t) {
	return new Pd({
		type: "nonoptional",
		innerType: e,
		...E(t)
	});
}
function Lu(e, t) {
	return new Fd({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : Fr(t)
	});
}
function Ru(e, t) {
	return new Id({
		type: "pipe",
		in: e,
		out: t
	});
}
function zu(e) {
	return new Rd({
		type: "readonly",
		innerType: e
	});
}
function Bu(e) {
	return new zd({
		type: "lazy",
		getter: e
	});
}
function Vu(e, t = {}) {
	return /* @__PURE__ */ Fc(Bd, e, t);
}
function Hu(e, t) {
	return /* @__PURE__ */ Ic(e, t);
}
var U, Uu, Wu, W, Gu, Ku, qu, Ju, Yu, Xu, Zu, Qu, $u, ed, td, nd, rd, id, ad, od, sd, cd, ld, ud, dd, fd, pd, md, hd, gd, _d, vd, yd, bd, xd, Sd, Cd, wd, Td, Ed, Dd, Od, kd, Ad, jd, Md, Nd, Pd, Fd, Id, Ld, Rd, zd, Bd, Vd, Hd = b((() => {
	Xl(), Yl(), el(), Os(), Zl(), hu(), U = /*@__PURE__*/ O("ZodType", (e, t) => (gu(), A.init(e, t), e.def = t, e.type = t.type, e), {
		check(...e) {
			let t = this.def;
			return this.clone(nr(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
				check: e,
				def: { check: "custom" },
				onattach: []
			} } : e)] }), { parent: !0 });
		},
		with(...e) {
			return this.check(...e);
		},
		clone(e, t) {
			return lr(this, e, t);
		},
		brand() {
			return this;
		},
		register(e, t) {
			return e.add(this, t), this;
		},
		refine(e, t) {
			return this.check(Vu(e, t));
		},
		superRefine(e, t) {
			return this.check(Hu(e, t));
		},
		overwrite(e) {
			return this.check(/* @__PURE__ */ Oc(e));
		},
		optional() {
			return ju(this);
		},
		exactOptional() {
			return Mu(this);
		},
		nullable() {
			return Nu(this);
		},
		nullish() {
			return ju(Nu(this));
		},
		nonoptional(e) {
			return Iu(this, e);
		},
		array() {
			return L(this);
		},
		or(e) {
			return Eu([this, e]);
		},
		and(e) {
			return Du(this, e);
		},
		transform(e) {
			return Ru(this, Au(e));
		},
		default(e) {
			return Pu(this, e);
		},
		prefault(e) {
			return Fu(this, e);
		},
		catch(e) {
			return Lu(this, e);
		},
		pipe(e) {
			return Ru(this, e);
		},
		readonly() {
			return zu(this);
		},
		describe(e) {
			let t = this.clone();
			return Ms.add(t, { description: e }), t;
		},
		meta(...e) {
			if (e.length === 0) return Ms.get(this);
			let t = this.clone();
			return Ms.add(t, e[0]), t;
		},
		isOptional() {
			return this.safeParse(void 0).success;
		},
		isNullable() {
			return this.safeParse(null).success;
		},
		apply(e, ...t) {
			return t.length === 0 ? e(this) : e(this, ...t);
		},
		get "~standard"() {
			return jr(this, "~standard", {
				...Na(this),
				jsonSchema: {
					input: $c(this, "input"),
					output: $c(this, "output")
				}
			});
		},
		set "~standard"(e) {
			Ar(this, "~standard", e);
		},
		parse: function e(t, n) {
			return ru(this, t, n, { callee: e });
		},
		parseAsync: async function e(t, n) {
			return await iu(this, t, n, { callee: e });
		},
		safeParse(e, t) {
			return au(this, e, t);
		},
		async safeParseAsync(e, t) {
			return ou(this, e, t);
		},
		get spa() {
			return this?.safeParseAsync;
		},
		set spa(e) {
			Ar(this, "spa", e);
		},
		encode: function e(t, n) {
			return su(this, t, n, { callee: e });
		},
		decode: function e(t, n) {
			return cu(this, t, n, { callee: e });
		},
		encodeAsync: async function e(t, n) {
			return await lu(this, t, n, { callee: e });
		},
		decodeAsync: async function e(t, n) {
			return await uu(this, t, n, { callee: e });
		},
		safeEncode(e, t) {
			return du(this, e, t);
		},
		safeDecode(e, t) {
			return fu(this, e, t);
		},
		async safeEncodeAsync(e, t) {
			return pu(this, e, t);
		},
		async safeDecodeAsync(e, t) {
			return mu(this, e, t);
		},
		toJSONSchema(e) {
			return Qc(this, {})(e);
		},
		get description() {
			return Ms.get(this)?.description;
		},
		get _def() {
			return this._zod.def;
		}
	}), Uu = /*@__PURE__*/ O("_ZodString", (e, t) => {
		lo.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => sl(e, t, n, r);
		let n = e._zod.bag;
		e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null;
	}, {
		regex(...e) {
			return this.check(/* @__PURE__ */ Sc(...e));
		},
		includes(...e) {
			return this.check(/* @__PURE__ */ Tc(...e));
		},
		startsWith(...e) {
			return this.check(/* @__PURE__ */ Ec(...e));
		},
		endsWith(...e) {
			return this.check(/* @__PURE__ */ Dc(...e));
		},
		min(...e) {
			return this.check(/* @__PURE__ */ bc(...e));
		},
		max(...e) {
			return this.check(/* @__PURE__ */ yc(...e));
		},
		length(...e) {
			return this.check(/* @__PURE__ */ xc(...e));
		},
		nonempty(...e) {
			return this.check(/* @__PURE__ */ bc(1, ...e));
		},
		lowercase(e) {
			return this.check(/* @__PURE__ */ Cc(e));
		},
		uppercase(e) {
			return this.check(/* @__PURE__ */ wc(e));
		},
		trim() {
			return this.check(/* @__PURE__ */ Ac());
		},
		normalize(...e) {
			return this.check(/* @__PURE__ */ kc(...e));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ jc());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ Mc());
		},
		slugify() {
			return this.check(/* @__PURE__ */ Nc());
		}
	}), Wu = /*@__PURE__*/ O("ZodString", (e, t) => {
		lo.init(e, t), Uu.init(e, t);
	}, {
		email(e) {
			return this.check(/* @__PURE__ */ Is(Yu, e));
		},
		url(e) {
			return this.check(/* @__PURE__ */ Hs(Qu, e));
		},
		jwt(e) {
			return this.check(/* @__PURE__ */ rc(pd, e));
		},
		emoji(e) {
			return this.check(/* @__PURE__ */ Us($u, e));
		},
		guid(e) {
			return this.check(/* @__PURE__ */ Ls(Xu, e));
		},
		uuid(e) {
			return this.check(/* @__PURE__ */ Rs(Zu, e));
		},
		uuidv4(e) {
			return this.check(/* @__PURE__ */ zs(Zu, e));
		},
		uuidv6(e) {
			return this.check(/* @__PURE__ */ Bs(Zu, e));
		},
		uuidv7(e) {
			return this.check(/* @__PURE__ */ Vs(Zu, e));
		},
		nanoid(e) {
			return this.check(/* @__PURE__ */ Ws(ed, e));
		},
		cuid(e) {
			return this.check(/* @__PURE__ */ Gs(td, e));
		},
		cuid2(e) {
			return this.check(/* @__PURE__ */ Ks(nd, e));
		},
		ulid(e) {
			return this.check(/* @__PURE__ */ qs(rd, e));
		},
		base64(e) {
			return this.check(/* @__PURE__ */ ec(ud, e));
		},
		base64url(e) {
			return this.check(/* @__PURE__ */ tc(dd, e));
		},
		xid(e) {
			return this.check(/* @__PURE__ */ Js(id, e));
		},
		ksuid(e) {
			return this.check(/* @__PURE__ */ Ys(ad, e));
		},
		ipv4(e) {
			return this.check(/* @__PURE__ */ Xs(od, e));
		},
		ipv6(e) {
			return this.check(/* @__PURE__ */ Zs(sd, e));
		},
		cidrv4(e) {
			return this.check(/* @__PURE__ */ Qs(cd, e));
		},
		cidrv6(e) {
			return this.check(/* @__PURE__ */ $s(ld, e));
		},
		e164(e) {
			return this.check(/* @__PURE__ */ nc(fd, e));
		},
		datetime(e) {
			return this.check(/* @__PURE__ */ ic(Gu, e));
		},
		date(e) {
			return this.check(/* @__PURE__ */ ac(Ku, e));
		},
		time(e) {
			return this.check(/* @__PURE__ */ oc(qu, e));
		},
		duration(e) {
			return this.check(/* @__PURE__ */ sc(Ju, e));
		}
	}), W = /*@__PURE__*/ O("ZodStringFormat", (e, t) => {
		j.init(e, t), Uu.init(e, t);
	}), Gu = /*@__PURE__*/ O("ZodISODateTime", (e, t) => {
		Co.init(e, t), W.init(e, t);
	}), Ku = /*@__PURE__*/ O("ZodISODate", (e, t) => {
		wo.init(e, t), W.init(e, t);
	}), qu = /*@__PURE__*/ O("ZodISOTime", (e, t) => {
		To.init(e, t), W.init(e, t);
	}), Ju = /*@__PURE__*/ O("ZodISODuration", (e, t) => {
		Eo.init(e, t), W.init(e, t);
	}), Yu = /*@__PURE__*/ O("ZodEmail", (e, t) => {
		po.init(e, t), W.init(e, t);
	}), Xu = /*@__PURE__*/ O("ZodGUID", (e, t) => {
		uo.init(e, t), W.init(e, t);
	}), Zu = /*@__PURE__*/ O("ZodUUID", (e, t) => {
		fo.init(e, t), W.init(e, t);
	}), Qu = /*@__PURE__*/ O("ZodURL", (e, t) => {
		ho.init(e, t), W.init(e, t);
	}), $u = /*@__PURE__*/ O("ZodEmoji", (e, t) => {
		go.init(e, t), W.init(e, t);
	}), ed = /*@__PURE__*/ O("ZodNanoID", (e, t) => {
		_o.init(e, t), W.init(e, t);
	}), td = /*@__PURE__*/ O("ZodCUID", (e, t) => {
		vo.init(e, t), W.init(e, t);
	}), nd = /*@__PURE__*/ O("ZodCUID2", (e, t) => {
		yo.init(e, t), W.init(e, t);
	}), rd = /*@__PURE__*/ O("ZodULID", (e, t) => {
		bo.init(e, t), W.init(e, t);
	}), id = /*@__PURE__*/ O("ZodXID", (e, t) => {
		xo.init(e, t), W.init(e, t);
	}), ad = /*@__PURE__*/ O("ZodKSUID", (e, t) => {
		So.init(e, t), W.init(e, t);
	}), od = /*@__PURE__*/ O("ZodIPv4", (e, t) => {
		Do.init(e, t), W.init(e, t);
	}), sd = /*@__PURE__*/ O("ZodIPv6", (e, t) => {
		ko.init(e, t), W.init(e, t);
	}), cd = /*@__PURE__*/ O("ZodCIDRv4", (e, t) => {
		Ao.init(e, t), W.init(e, t);
	}), ld = /*@__PURE__*/ O("ZodCIDRv6", (e, t) => {
		jo.init(e, t), W.init(e, t);
	}), ud = /*@__PURE__*/ O("ZodBase64", (e, t) => {
		Mo.init(e, t), W.init(e, t);
	}), dd = /*@__PURE__*/ O("ZodBase64URL", (e, t) => {
		No.init(e, t), W.init(e, t);
	}), fd = /*@__PURE__*/ O("ZodE164", (e, t) => {
		Po.init(e, t), W.init(e, t);
	}), pd = /*@__PURE__*/ O("ZodJWT", (e, t) => {
		Fo.init(e, t), W.init(e, t);
	}), md = /*@__PURE__*/ O("ZodNumber", (e, t) => {
		Io.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => cl(e, t, n, r);
		let n = e._zod.bag;
		e.minValue = Math.max(n.minimum ?? -Infinity, n.exclusiveMinimum ?? -Infinity) ?? null, e.maxValue = Math.min(n.maximum ?? Infinity, n.exclusiveMaximum ?? Infinity) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? .5), e.isFinite = !0, e.format = n.format ?? null;
	}, {
		gt(e, t) {
			return this.check(/* @__PURE__ */ gc(e, t));
		},
		gte(e, t) {
			return this.check(/* @__PURE__ */ _c(e, t));
		},
		min(e, t) {
			return this.check(/* @__PURE__ */ _c(e, t));
		},
		lt(e, t) {
			return this.check(/* @__PURE__ */ mc(e, t));
		},
		lte(e, t) {
			return this.check(/* @__PURE__ */ hc(e, t));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ hc(e, t));
		},
		int(e) {
			return this.check(xu(e));
		},
		safe(e) {
			return this.check(xu(e));
		},
		positive(e) {
			return this.check(/* @__PURE__ */ gc(0, e));
		},
		nonnegative(e) {
			return this.check(/* @__PURE__ */ _c(0, e));
		},
		negative(e) {
			return this.check(/* @__PURE__ */ mc(0, e));
		},
		nonpositive(e) {
			return this.check(/* @__PURE__ */ hc(0, e));
		},
		multipleOf(e, t) {
			return this.check(/* @__PURE__ */ vc(e, t));
		},
		step(e, t) {
			return this.check(/* @__PURE__ */ vc(e, t));
		},
		finite() {
			return this;
		}
	}), hd = /*@__PURE__*/ O("ZodNumberFormat", (e, t) => {
		Lo.init(e, t), md.init(e, t);
	}), gd = /*@__PURE__*/ O("ZodBoolean", (e, t) => {
		Ro.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => ll(e, t, n, r);
	}), _d = /*@__PURE__*/ O("ZodUnknown", (e, t) => {
		zo.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => _l(e, t, n, r);
	}), vd = /*@__PURE__*/ O("ZodNever", (e, t) => {
		Bo.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => hl(e, t, n, r);
	}), yd = /*@__PURE__*/ O("ZodArray", (e, t) => {
		_u(), Vo.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Al(e, t, n, r), e.element = t.element;
	}, {
		min(e, t) {
			return this.check(/* @__PURE__ */ bc(e, t));
		},
		nonempty(e) {
			return this.check(/* @__PURE__ */ bc(1, e));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ yc(e, t));
		},
		length(e, t) {
			return this.check(/* @__PURE__ */ xc(e, t));
		},
		unwrap() {
			return this.element;
		}
	}), bd = /*@__PURE__*/ O("ZodObject", (e, t) => {
		_u(), Go.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => jl(e, t, n, r), Pr(e, "shape", (e) => e._zod.def.shape, !1);
	}, {
		keyof() {
			return V(Object.keys(this._zod.def.shape));
		},
		catchall(e) {
			return this.clone({
				...this._zod.def,
				catchall: e
			});
		},
		passthrough() {
			return this.clone({
				...this._zod.def,
				catchall: Su()
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: Su()
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: Cu()
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0
			});
		},
		extend(e) {
			return mr(this, e);
		},
		safeExtend(e) {
			return hr(this, e);
		},
		merge(e) {
			return gr(this, e);
		},
		pick(e) {
			return fr(this, e);
		},
		omit(e) {
			return pr(this, e);
		},
		partial(...e) {
			return _r(kd, this, e[0]);
		},
		exactPartial(...e) {
			return _r(Ad, this, e[0], "exactPartial");
		},
		required(...e) {
			return vr(Pd, this, e[0]);
		}
	}), xd = /*@__PURE__*/ O("ZodUnion", (e, t) => {
		Ko.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ml(e, t, n, r), e.options = t.options;
	}), Sd = /*@__PURE__*/ O("ZodDiscriminatedUnion", (e, t) => {
		xd.init(e, t), qo.init(e, t);
	}), Cd = /*@__PURE__*/ O("ZodIntersection", (e, t) => {
		Jo.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Nl(e, t, n, r);
	}), wd = /*@__PURE__*/ O("ZodTuple", (e, t) => {
		_u(), Yo.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Pl(e, t, n, r);
	}, {
		rest(e) {
			return this.clone({
				...this._zod.def,
				rest: e
			});
		},
		partial() {
			let e = this._zod.def;
			if (e.checks?.length) throw Error(".partial() cannot be used on tuple schemas containing refinements");
			return this.clone({
				...e,
				items: e.items.map((e) => new kd({
					type: "optional",
					innerType: e
				}))
			});
		}
	}), Td = /*@__PURE__*/ O("ZodRecord", (e, t) => {
		_u(), Xo.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Il(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
	}), Ed = /*@__PURE__*/ O("ZodEnum", (e, t) => {
		Zo.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => yl(e, t, n, r), e.enum = t.entries, e.options = Object.values(t.entries);
		let n = new Set(Object.keys(t.entries));
		e.extract = (e, r) => {
			let i = {};
			for (let r of e) if (n.has(r)) i[r] = t.entries[r];
			else throw Error(`Key ${r} not found in enum`);
			return new Ed({
				...t,
				checks: [],
				...E(r),
				entries: i
			});
		}, e.exclude = (e, r) => {
			let i = { ...t.entries };
			for (let t of e) if (n.has(t)) delete i[t];
			else throw Error(`Key ${t} not found in enum`);
			return new Ed({
				...t,
				checks: [],
				...E(r),
				entries: i
			});
		};
	}), Dd = /*@__PURE__*/ O("ZodLiteral", (e, t) => {
		Qo.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => bl(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
			if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
			return t.values[0];
		} });
	}), Od = /*@__PURE__*/ O("ZodTransform", (e, t) => {
		_u(), $o.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Dl(e, t, n, r), e._zod.parse = (n, r) => {
			if (r.direction === "backward") throw new $r(e.constructor.name);
			n.addIssue = (r) => {
				if (typeof r == "string") n.issues.push(Or(r, n.value, t));
				else {
					let t = r;
					t.fatal && (t.continue = !1), t.code ??= "custom", "input" in t || (t.input = n.value), t.inst ??= e, n.issues.push(Or(t));
				}
			};
			let i = t.transform(n.value, n);
			return i instanceof Promise ? i.then((e) => (n.value = e, n)) : (n.value = i, n);
		};
	}), kd = /*@__PURE__*/ O("ZodOptional", (e, t) => {
		es.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Kl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Ad = /*@__PURE__*/ O("ZodExactOptional", (e, t) => {
		ts.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Kl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), jd = /*@__PURE__*/ O("ZodNullable", (e, t) => {
		ns.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ll(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Md = /*@__PURE__*/ O("ZodDefault", (e, t) => {
		rs.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Bl(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
	}), Nd = /*@__PURE__*/ O("ZodPrefault", (e, t) => {
		is.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Vl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Pd = /*@__PURE__*/ O("ZodNonOptional", (e, t) => {
		as.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Rl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Fd = /*@__PURE__*/ O("ZodCatch", (e, t) => {
		os.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Hl(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
	}), Id = /*@__PURE__*/ O("ZodPipe", (e, t) => {
		ss.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ul(e, t, n, r), e.in = t.in, e.out = t.out;
	}), Ld = /*@__PURE__*/ O("ZodCodec", (e, t) => {
		Id.init(e, t), cs.init(e, t);
	}), Rd = /*@__PURE__*/ O("ZodReadonly", (e, t) => {
		ls.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Wl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), zd = /*@__PURE__*/ O("ZodLazy", (e, t) => {
		us.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => ql(e, t, n, r), e.unwrap = () => e._zod.def.getter();
	}), Bd = /*@__PURE__*/ O("ZodCustom", (e, t) => {
		ds.init(e, t), U.init(e, t), e._zod.processJSONSchema = (t, n, r) => Tl(e, t, n, r);
	}), Vd = (...e) => /* @__PURE__ */ Rc({
		Codec: Ld,
		Boolean: gd,
		String: Wu
	}, ...e);
})), Ud = b((() => {
	Xl();
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/iso.js
function Wd(e) {
	return /* @__PURE__ */ ic(Gu, e);
}
var Gd = b((() => {
	Xl(), Hd();
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/coerce.js
function G(e) {
	return /* @__PURE__ */ lc(md, e);
}
var Kd = b((() => {
	Xl(), Hd();
})), qd = b((() => {
	Xl(), Hd(), Zl(), nu(), hu(), Ud(), Yl(), Ns(), Kr(), Zl(), Gd(), Hd(), fs(), Os(), Kd();
})), K = b((() => {
	qd(), qd();
})), Jd, Yd, Xd, Zd, Qd, $d, ef, tf = b((() => {
	K(), Jd = (e) => {
		if (typeof e != "object" || !e || !("~orpc" in e)) return;
		let { route: t } = e["~orpc"];
		if (t?.method !== void 0 && t.path !== void 0) return {
			method: t.method,
			path: t.path
		};
	}, Yd = (e) => {
		let t = [];
		for (let [n, r] of Object.entries(e)) if (typeof r == "object" && r) for (let [e, i] of Object.entries(r)) {
			let r = Jd(i);
			r !== void 0 && t.push({
				name: `${n}.${e}`,
				method: r.method,
				path: r.path
			});
		}
		return t.toSorted((e, t) => e.name.localeCompare(t.name));
	}, Xd = /* @__PURE__ */ new Set([
		"required",
		"enum",
		"anyOf",
		"oneOf",
		"allOf"
	]), Zd = (e, t) => {
		if (Array.isArray(e)) {
			let n = e.map((e) => Zd(e));
			return t !== void 0 && Xd.has(t) ? n.toSorted((e, t) => JSON.stringify(e).localeCompare(JSON.stringify(t))) : n;
		}
		return typeof e != "object" || !e ? e : Object.entries(e).toSorted(([e], [t]) => e.localeCompare(t)).map(([e, t]) => [e, Zd(t, e)]);
	}, Qd = (e) => {
		let t = JSON.stringify(Zd(e)), n = 2166136261;
		for (let e = 0; e < t.length; e++) n ^= t.charCodeAt(e), n = Math.imul(n, 16777619) >>> 0;
		return n.toString(36);
	}, $d = (e) => {
		if (typeof e != "object" || !e || !("~orpc" in e)) return;
		let { inputSchema: t, outputSchema: n } = e["~orpc"];
		try {
			return Qd({
				in: t === void 0 ? void 0 : al(t, { io: "input" }),
				out: n === void 0 ? void 0 : al(n, { io: "output" })
			});
		} catch {
			return;
		}
	}, ef = (e) => {
		let t = {};
		for (let [n, r] of Object.entries(e)) if (typeof r == "object" && r) for (let [e, i] of Object.entries(r)) {
			if (Jd(i) === void 0) continue;
			let r = $d(i);
			r !== void 0 && (t[`${n}.${e}`] = r);
		}
		return t;
	};
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/@orpc+shared@1.14.13/node_modules/@orpc/shared/dist/index.mjs
function nf(e) {
	return e[0] ?? {};
}
function rf(e) {
	let t = Promise.resolve();
	return (...n) => t = t.catch(() => {}).then(() => e(...n));
}
function af(e) {
	return !e || typeof e != "object" ? !1 : "next" in e && typeof e.next == "function" && Symbol.asyncIterator in e && typeof e[Symbol.asyncIterator] == "function";
}
function of(e) {
	return sf(e) ? Object.getPrototypeOf(e)?.constructor : null;
}
function sf(e) {
	return !!e && (typeof e == "object" || typeof e == "function");
}
var cf, lf, uf, df, ff = b((() => {
	cf = "@orpc/shared", lf = "1.14.13", `${cf}${lf}`, uf = Symbol.asyncDispose ?? Symbol.for("asyncDispose"), df = class {
		#e = !1;
		#t = !1;
		#n;
		#r;
		constructor(e, t) {
			this.#n = t, this.#r = rf(async () => {
				if (this.#e) return {
					done: !0,
					value: void 0
				};
				try {
					let t = await e();
					return t.done && (this.#e = !0), t;
				} catch (e) {
					throw this.#e = !0, e;
				} finally {
					this.#e && !this.#t && (this.#t = !0, await this.#n("next"));
				}
			});
		}
		next() {
			return this.#r();
		}
		async return(e) {
			return this.#e = !0, this.#t || (this.#t = !0, await this.#n("return")), {
				done: !0,
				value: e
			};
		}
		async throw(e) {
			throw this.#e = !0, this.#t || (this.#t = !0, await this.#n("throw")), e;
		}
		async [uf]() {
			this.#e = !0, this.#t || (this.#t = !0, await this.#n("dispose"));
		}
		[Symbol.asyncIterator]() {
			return this;
		}
	};
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/@orpc+client@1.14.13/node_modules/@orpc/client/dist/shared/client.DexhfmWd.mjs
function pf(e, t) {
	return t ?? vf[e]?.status ?? 500;
}
function mf(e, t) {
	return t || vf[e]?.message || e;
}
function hf(e) {
	return e < 200 || e >= 400;
}
var gf, _f, vf, yf, bf, xf = b((() => {
	ff(), gf = "@orpc/client", _f = "1.14.13", vf = {
		BAD_REQUEST: {
			status: 400,
			message: "Bad Request"
		},
		UNAUTHORIZED: {
			status: 401,
			message: "Unauthorized"
		},
		FORBIDDEN: {
			status: 403,
			message: "Forbidden"
		},
		NOT_FOUND: {
			status: 404,
			message: "Not Found"
		},
		METHOD_NOT_SUPPORTED: {
			status: 405,
			message: "Method Not Supported"
		},
		NOT_ACCEPTABLE: {
			status: 406,
			message: "Not Acceptable"
		},
		TIMEOUT: {
			status: 408,
			message: "Request Timeout"
		},
		CONFLICT: {
			status: 409,
			message: "Conflict"
		},
		PRECONDITION_FAILED: {
			status: 412,
			message: "Precondition Failed"
		},
		PAYLOAD_TOO_LARGE: {
			status: 413,
			message: "Payload Too Large"
		},
		UNSUPPORTED_MEDIA_TYPE: {
			status: 415,
			message: "Unsupported Media Type"
		},
		UNPROCESSABLE_CONTENT: {
			status: 422,
			message: "Unprocessable Content"
		},
		TOO_MANY_REQUESTS: {
			status: 429,
			message: "Too Many Requests"
		},
		CLIENT_CLOSED_REQUEST: {
			status: 499,
			message: "Client Closed Request"
		},
		INTERNAL_SERVER_ERROR: {
			status: 500,
			message: "Internal Server Error"
		},
		NOT_IMPLEMENTED: {
			status: 501,
			message: "Not Implemented"
		},
		BAD_GATEWAY: {
			status: 502,
			message: "Bad Gateway"
		},
		SERVICE_UNAVAILABLE: {
			status: 503,
			message: "Service Unavailable"
		},
		GATEWAY_TIMEOUT: {
			status: 504,
			message: "Gateway Timeout"
		}
	}, bf = class e extends Error {
		defined;
		code;
		status;
		data;
		static {
			let t = Symbol.for(`__${gf}@${_f}/error/ORPC_ERROR_CONSTRUCTORS__`);
			globalThis[t] ??= /* @__PURE__ */ new WeakSet(), yf = globalThis[t], yf.add(e);
		}
		constructor(e, ...t) {
			let n = nf(t);
			if (n.status !== void 0 && !hf(n.status)) throw Error("[ORPCError] Invalid error status code.");
			let r = mf(e, n.message);
			super(r, n), this.code = e, this.status = pf(e, n.status), this.defined = n.defined ?? !1, this.data = n.data;
		}
		toJSON() {
			return {
				defined: this.defined,
				code: this.code,
				status: this.status,
				message: this.message,
				data: this.data
			};
		}
		static [Symbol.hasInstance](e) {
			if (yf.has(this)) {
				let t = of(e);
				if (t && yf.has(t)) return !0;
			}
			return super[Symbol.hasInstance](e);
		}
	};
}));
function Sf(e) {
	return kf.test(e);
}
function Cf(e) {
	if (Sf(e)) throw new Of("Event's id must not contain a carriage return or newline character");
}
function wf(e) {
	if (!Number.isInteger(e) || e < 0) throw new Of("Event's retry must be a integer and >= 0");
}
function Tf(e) {
	if (Sf(e)) throw new Of("Event's comment must not contain a carriage return or newline character");
}
function Ef(e, t) {
	if (t.id === void 0 && t.retry === void 0 && !t.comments?.length) return e;
	if (t.id !== void 0 && Cf(t.id), t.retry !== void 0 && wf(t.retry), t.comments !== void 0) for (let e of t.comments) Tf(e);
	return new Proxy(e, { get(e, n, r) {
		return n === Af ? t : Reflect.get(e, n, r);
	} });
}
function Df(e) {
	return sf(e) ? Reflect.get(e, Af) : void 0;
}
var Of, kf, Af, jf = b((() => {
	ff(), Of = class extends TypeError {}, TransformStream, kf = /\r\n|[\n\r]/, Af = Symbol("ORPC_EVENT_SOURCE_META");
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/@orpc+client@1.14.13/node_modules/@orpc/client/dist/shared/client.BLtwTQUg.mjs
function Mf(e, t) {
	let n = async (e) => {
		let n = await t.error(e);
		if (n !== e) {
			let t = Df(e);
			t && sf(n) && (n = Ef(n, t));
		}
		return n;
	};
	return new df(async () => {
		let { done: r, value: i } = await (async () => {
			try {
				return await e.next();
			} catch (e) {
				throw await n(e);
			}
		})(), a = await t.value(i, r);
		if (a !== i) {
			let e = Df(i);
			e && sf(a) && (a = Ef(a, e));
		}
		return {
			done: r,
			value: a
		};
	}, async () => {
		try {
			await e.return?.();
		} catch (e) {
			throw await n(e);
		}
	});
}
var Nf = b((() => {
	ff(), jf();
})), Pf = b((() => {
	ff(), xf(), Nf(), jf();
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/@orpc+contract@1.14.13/node_modules/@orpc/contract/dist/shared/contract.D_dZrO__.mjs
function Ff(e, t) {
	return {
		...e,
		...t
	};
}
function If(e) {
	return e instanceof Rf || (typeof e == "object" || typeof e == "function") && e !== null && "~orpc" in e && typeof e["~orpc"] == "object" && e["~orpc"] !== null && "errorMap" in e["~orpc"] && "route" in e["~orpc"] && "meta" in e["~orpc"];
}
var Lf, Rf, zf = b((() => {
	Pf(), Lf = class extends Error {
		issues;
		data;
		constructor(e) {
			super(e.message, e), this.issues = e.issues, this.data = e.data;
		}
	}, Rf = class {
		"~orpc";
		constructor(e) {
			if (e.route?.successStatus && hf(e.route.successStatus)) throw Error("[ContractProcedure] Invalid successStatus.");
			if (Object.values(e.errorMap).some((e) => e && e.status && !hf(e.status))) throw Error("[ContractProcedure] Invalid error status code.");
			this["~orpc"] = e;
		}
	};
}));
//#endregion
//#region ../../../tmp/extbuild/maintenance/node_modules/.pnpm/@orpc+contract@1.14.13/node_modules/@orpc/contract/dist/index.mjs
function Bf(e, t) {
	return {
		...e,
		...t
	};
}
function Vf(e, t) {
	return {
		...e,
		...t
	};
}
function Hf(e, t) {
	return e.path ? {
		...e,
		path: `${t}${e.path}`
	} : e;
}
function Uf(e, t) {
	return {
		...e,
		tags: [...t, ...e.tags ?? []]
	};
}
function Wf(e, t) {
	return e ? `${e}${t}` : t;
}
function Gf(e, t) {
	return e ? [...e, ...t] : t;
}
function Kf(e, t) {
	let n = e;
	return t.prefix && (n = Hf(n, t.prefix)), t.tags?.length && (n = Uf(n, t.tags)), n;
}
function qf(e, t) {
	if (If(e)) return new Rf({
		...e["~orpc"],
		errorMap: Ff(t.errorMap, e["~orpc"].errorMap),
		route: Kf(e["~orpc"].route, t)
	});
	if (typeof e != "object" || !e) return e;
	let n = {};
	for (let r in e) n[r] = qf(e[r], t);
	return n;
}
function Jf(e, t) {
	return { "~standard": {
		[Xf]: {
			yields: e,
			returns: t
		},
		vendor: "orpc",
		version: 1,
		validate(n) {
			return af(n) ? { value: Mf(n, {
				async value(n, r) {
					let i = r ? t : e;
					if (!i) return n;
					let a = await i["~standard"].validate(n);
					if (a.issues) throw new bf("EVENT_ITERATOR_VALIDATION_FAILED", {
						message: "Event iterator validation failed",
						cause: new Lf({
							issues: a.issues,
							message: "Event iterator validation failed",
							data: n
						})
					});
					return a.value;
				},
				error: async (e) => e
			}) } : { issues: [{
				message: "Expect event iterator",
				path: []
			}] };
		}
	} };
}
var Yf, q, Xf, J = b((() => {
	zf(), ff(), Pf(), Yf = class e extends Rf {
		constructor(e) {
			super(e), this["~orpc"].prefix = e.prefix, this["~orpc"].tags = e.tags;
		}
		$meta(t) {
			return new e({
				...this["~orpc"],
				meta: t
			});
		}
		$route(t) {
			return new e({
				...this["~orpc"],
				route: t
			});
		}
		$input(t) {
			return new e({
				...this["~orpc"],
				inputSchema: t
			});
		}
		errors(t) {
			return new e({
				...this["~orpc"],
				errorMap: Ff(this["~orpc"].errorMap, t)
			});
		}
		meta(t) {
			return new e({
				...this["~orpc"],
				meta: Bf(this["~orpc"].meta, t)
			});
		}
		route(t) {
			return new e({
				...this["~orpc"],
				route: Vf(this["~orpc"].route, t)
			});
		}
		input(t) {
			return new e({
				...this["~orpc"],
				inputSchema: t
			});
		}
		output(t) {
			return new e({
				...this["~orpc"],
				outputSchema: t
			});
		}
		prefix(t) {
			return new e({
				...this["~orpc"],
				prefix: Wf(this["~orpc"].prefix, t)
			});
		}
		tag(...t) {
			return new e({
				...this["~orpc"],
				tags: Gf(this["~orpc"].tags, t)
			});
		}
		router(e) {
			return qf(e, this["~orpc"]);
		}
	}, q = new Yf({
		errorMap: {},
		route: {},
		meta: {}
	}), Xf = Symbol("ORPC_EVENT_ITERATOR_DETAILS");
})), Zf, Qf = b((() => {
	Zf = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;
})), $f, ep, tp, np, rp = b((() => {
	K(), V(["helper", "run"]), $f = [
		{
			id: "commit-message",
			label: "Commit messages",
			blurb: "The subject written when an agent's work lands, and the release note under it.",
			kind: "helper",
			icon: "file-edit"
		},
		{
			id: "session-title",
			label: "Session titles",
			blurb: "The name a conversation wears on the board, written a second into its first turn.",
			kind: "helper",
			icon: "pencil"
		},
		{
			id: "safety-judge",
			label: "Safety judge",
			blurb: "Which model reads your safety policy before a flagged command runs.",
			kind: "helper",
			icon: "shield"
		},
		{
			id: "loop-verdict",
			label: "Loop verdicts",
			blurb: "Whether a loop's iteration met the goal, or the loop goes round again.",
			kind: "helper",
			icon: "check-square"
		},
		{
			id: "persona-router",
			label: "Persona routing",
			blurb: "Which model reads a new chat's first message and picks the persona for it.",
			kind: "helper",
			icon: "users"
		},
		{
			id: "pipeline-fix",
			label: "Pipeline fixes",
			blurb: "The agent started by Fix on a red pipeline.",
			kind: "run",
			trigger: "pressed",
			icon: "wave-pulse"
		},
		{
			id: "deployment-fix",
			label: "Deployment fixes",
			blurb: "The agent started by Fix on a deployment that is down.",
			kind: "run",
			trigger: "pressed",
			icon: "server"
		},
		{
			id: "maintenance-chore",
			label: "Maintenance chores",
			blurb: "A chore run started from the Maintenance board.",
			kind: "run",
			trigger: "pressed",
			icon: "wrench"
		},
		{
			id: "documentation-run",
			label: "Documentation runs",
			blurb: "A pass over a repo's own documentation.",
			kind: "run",
			trigger: "pressed",
			icon: "book"
		},
		{
			id: "acceptance-run",
			label: "Acceptance runs",
			blurb: "One session per story in an acceptance fan-out.",
			kind: "run",
			trigger: "pressed",
			icon: "list-check"
		},
		{
			id: "pre-push-fix",
			label: "Pre-push fixes",
			blurb: "The fix proposed when a check fails on the way to a push.",
			kind: "run",
			trigger: "pressed",
			icon: "cloud-upload"
		},
		{
			id: "approval-queue",
			label: "Approvals queue",
			blurb: "The turn that publishes or acts on what you approved.",
			kind: "run",
			trigger: "pressed",
			icon: "check-circle"
		},
		{
			id: "extension-review",
			label: "Extension update reviews",
			blurb: "The agent that reads an extension update before it is applied.",
			kind: "run",
			trigger: "unprompted",
			icon: "box"
		},
		{
			id: "loop-iteration",
			label: "Loop iterations",
			blurb: "Each round of a loop working towards its goal.",
			kind: "run",
			trigger: "unprompted",
			icon: "repeat"
		}
	], ep = $f.map((e) => e.id), tp = V(ep), np = (e) => $f.filter((t) => e(t)), np((e) => e.kind === "helper"), np((e) => e.kind === "run" && e.trigger === "pressed"), np((e) => e.kind === "run" && e.trigger === "unprompted");
})), ip, ap, op, sp, cp, lp = b((() => {
	ip = {
		runtime: "claude-code",
		steering: !0,
		permissions: "modes",
		questions: !0,
		mcp: "full",
		execution: ["shell", "js"],
		effort: !0,
		fastMode: !0,
		isolation: "namespace",
		commands: !0,
		terminals: !0,
		recovery: !0,
		instructions: "replace",
		skillDiscovery: "native",
		rulebook: "hooks",
		secrets: "masked"
	}, ap = {
		runtime: "codex",
		steering: !0,
		permissions: "plan",
		questions: !0,
		mcp: "browser",
		execution: ["shell"],
		effort: !0,
		fastMode: !1,
		isolation: "namespace",
		commands: !0,
		terminals: !1,
		recovery: !1,
		instructions: "replace",
		skillDiscovery: "native",
		rulebook: "approval",
		secrets: "none"
	}, op = {
		runtime: "opencode",
		steering: !1,
		permissions: "plan",
		questions: !1,
		mcp: "none",
		execution: ["shell"],
		effort: !1,
		fastMode: !1,
		isolation: "cwd",
		commands: !1,
		terminals: !1,
		recovery: !1,
		instructions: "append",
		skillDiscovery: "prompt",
		rulebook: "refuse-only",
		secrets: "none"
	}, sp = {
		...op,
		runtime: "opencode-gemini"
	}, cp = {
		runtime: "cursor",
		steering: !1,
		permissions: "plan",
		questions: !0,
		mcp: "tools",
		execution: ["shell"],
		effort: !0,
		fastMode: !1,
		isolation: "cwd",
		commands: !1,
		terminals: !1,
		recovery: !0,
		instructions: "append",
		skillDiscovery: "prompt",
		rulebook: "hooks",
		secrets: "none"
	};
})), up, dp, fp, pp = b((() => {
	lp(), up = [
		{
			id: "claude",
			label: "Claude Code",
			vendor: "Claude",
			accountLabel: "Claude",
			destination: "Anthropic",
			brand: "claude",
			access: {
				kind: "subscription",
				requirement: "Claude subscription",
				runs: "Claude Code"
			},
			auth: { kind: "oauth" },
			planLimits: !0,
			runtimes: {
				native: ip,
				claudeCode: ip
			}
		},
		{
			id: "codex",
			label: "Codex",
			vendor: "ChatGPT",
			accountLabel: "ChatGPT",
			destination: "ChatGPT",
			brand: "codex",
			access: {
				kind: "subscription",
				requirement: "ChatGPT subscription",
				runs: "Codex"
			},
			auth: {
				kind: "translator",
				cliProxy: "codex"
			},
			planLimits: !0,
			runtimes: {
				native: ap,
				claudeCode: ip
			}
		},
		{
			id: "grok",
			label: "Grok",
			vendor: "xAI",
			accountLabel: "Grok",
			destination: "x.ai",
			brand: "grok",
			access: {
				kind: "subscription",
				requirement: "SuperGrok subscription",
				runs: "Grok"
			},
			auth: {
				kind: "translator",
				cliProxy: "xai"
			},
			planLimits: !1,
			runtimes: {
				native: op,
				claudeCode: ip
			}
		},
		{
			id: "kimi",
			label: "Kimi Code",
			vendor: "Kimi Code",
			accountLabel: "Kimi Code",
			destination: "Kimi Code",
			brand: "kimi",
			access: {
				kind: "subscription",
				requirement: "Kimi Code subscription",
				runs: "Kimi Code"
			},
			auth: {
				kind: "translator",
				cliProxy: "kimi"
			},
			planLimits: !0,
			runtimes: {
				native: ip,
				claudeCode: ip
			}
		},
		{
			id: "gemini",
			label: "Google",
			vendor: "Google",
			accountLabel: "Google",
			destination: "Google",
			brand: "gemini",
			access: {
				kind: "free",
				requirement: "Google sign-in",
				runs: "Gemini, Claude and GPT-OSS under Claude Code"
			},
			auth: {
				kind: "translator",
				cliProxy: "antigravity"
			},
			planLimits: !0,
			runtimes: {
				native: sp,
				claudeCode: sp
			}
		},
		{
			id: "cursor",
			label: "Cursor",
			vendor: "Cursor",
			accountLabel: "Cursor",
			destination: "Cursor",
			brand: "cursor",
			access: {
				kind: "subscription",
				requirement: "Cursor Pro subscription",
				runs: "Cursor Agent"
			},
			auth: { kind: "oauth" },
			planLimits: !1,
			runtimes: {
				native: cp,
				claudeCode: cp
			}
		},
		{
			id: "meta",
			label: "Meta",
			vendor: "Meta",
			accountLabel: "Meta",
			destination: "Meta",
			brand: "meta",
			access: {
				kind: "subscription",
				requirement: "Muse Code subscription",
				runs: "Muse Spark under Claude Code"
			},
			auth: {
				kind: "minted",
				variants: [{
					id: "meta",
					label: "Meta",
					flow: "device",
					anthropicBase: "https://api.meta.ai",
					catalogBase: "https://api.meta.ai/v1"
				}]
			},
			planLimits: !1,
			runtimes: {
				native: ip,
				claudeCode: ip
			}
		},
		{
			id: "zai",
			label: "Z.ai",
			vendor: "Z.ai",
			accountLabel: "Z.ai",
			destination: "Z.ai",
			brand: "zai",
			access: {
				kind: "subscription",
				requirement: "Z.ai GLM Coding Plan",
				runs: "GLM under Claude Code"
			},
			auth: {
				kind: "minted",
				variants: [{
					id: "zai",
					label: "Z.ai international",
					flow: "device",
					anthropicBase: "https://api.z.ai/api/anthropic",
					catalogBase: "https://api.z.ai/api/coding/paas/v4"
				}, {
					id: "bigmodel",
					label: "BigModel (中国大陆)",
					flow: "redirect",
					anthropicBase: "https://open.bigmodel.cn/api/anthropic",
					catalogBase: "https://open.bigmodel.cn/api/coding/paas/v4"
				}]
			},
			planLimits: !1,
			runtimes: {
				native: ip,
				claudeCode: ip
			}
		}
	], dp = up.map((e) => e.id), new Map(up.map((e) => [e.id, e])), fp = up.filter((e) => e.auth.kind === "translator").map((e) => e.id), up.filter((e) => e.auth.kind === "minted").map((e) => e.id);
})), mp, hp = b((() => {
	K(), mp = R({
		subject: P(),
		detail: P()
	});
})), gp, _p, vp, yp, bp, xp, Sp = b((() => {
	K(), hp(), R({
		type: H("runner-hello"),
		token: P(),
		version: P(),
		image: P(),
		channel: P().optional(),
		overlayHash: P().optional(),
		definitionToml: P().optional()
	}), R({
		agent: P().optional(),
		account: P().optional(),
		model: P().optional()
	}), Eu([
		R({
			ok: H(!0),
			kind: H("oauth"),
			accessToken: P(),
			account: P().optional()
		}),
		R({
			ok: H(!0),
			kind: H("parent-translator"),
			model: P(),
			trial: I().optional()
		}),
		R({
			ok: H(!0),
			kind: H("endpoint"),
			baseUrl: P(),
			authToken: P(),
			model: P(),
			trial: I().optional()
		}),
		R({
			ok: H(!1),
			code: V([
				"subscription-required",
				"claude-reauth",
				"trial-unavailable"
			]).optional(),
			message: P()
		})
	]), R({
		account: P().min(1),
		rejected: P().min(1)
	}), R({ accessToken: P().optional() }), gp = R({
		cpus: F().int().positive(),
		memoryMb: F().int().positive(),
		freeDiskMb: F().int().nonnegative(),
		load: F().nonnegative()
	}), _p = V([
		"current",
		"outdated",
		"unknown"
	]), R({
		id: P(),
		host: P().optional(),
		online: I(),
		version: P().optional(),
		image: P().optional(),
		channel: P().optional(),
		overlayHash: P().optional(),
		facts: gp.optional(),
		lastSeen: F().optional(),
		parity: _p,
		drift: L(mp).optional()
	}), vp = R({
		op: V(["pull", "push"]),
		conversationId: P().min(1),
		branch: P().min(1),
		repos: L(R({
			repo: P().min(1),
			dir: P(),
			mainBranch: P().min(1)
		}))
	}), yp = Eu([R({
		kind: H("line"),
		text: P()
	}), R({
		kind: H("done"),
		ok: I(),
		detail: P().optional()
	})]), bp = R({
		conversationId: P().min(1),
		branch: P().min(1),
		prompt: P(),
		provider: P(),
		harness: P(),
		model: P().optional(),
		effort: P().optional(),
		thinking: I().optional(),
		fast: I().optional(),
		account: P().optional(),
		sessionId: P().optional(),
		attachments: L(R({
			path: P().min(1),
			bytesBase64: P()
		})).optional()
	}), xp = Eu([R({ kind: H("local") }), R({
		kind: H("runner"),
		id: P().min(1)
	})]);
})), Y, Cp, wp, Tp = b((() => {
	K(), Y = P().min(1).max(60).regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/), Cp = P().regex(/^[A-Za-z0-9][A-Za-z0-9._/-]*$/).max(200), wp = V(["on", "off"]).default("off");
})), Ep, Dp, Op, kp, Ap, jp, Mp, Np, Pp, Fp, Ip, Lp, Rp, zp, Bp, Vp, Hp, Up, Wp, X = b((() => {
	K(), Qf(), rp(), pp(), Sp(), Tp(), Ep = P().min(1), Dp = R({ provider: V(dp) }), Op = V(["native", "claude-code"]), kp = R({
		repo: P(),
		base: P().min(1)
	}), Ap = R({
		file: P().min(1).describe("The file open in the editor, as a workspace path."),
		startLine: F().int().min(1).optional().describe("First line of the selection, counting from one. Leave both out when the whole file is the context."),
		endLine: F().int().min(1).optional().describe("Last line of the selection, counting from one."),
		selection: P().max(2e4).optional().describe("The selected text itself. Cut it down before sending if it is long: this is context, not an upload.")
	}), jp = P().regex(Zf), Mp = R({
		automationId: P(),
		provider: P(),
		channelId: P().optional(),
		author: P().optional()
	}), V([
		"schedule",
		"event",
		"listener",
		"webchat",
		"issues",
		"workspace",
		"workflow"
	]), Np = V([
		"allow",
		"hold",
		"deny"
	]), Pp = V(["sandbox", "device"]), Fp = V([
		"git.destructive",
		"files.destructive",
		"system.destructive",
		"container.state",
		"secrets.access",
		"package.publish",
		"network.outbound"
	]), Ip = R({
		schedule: Np.default("allow"),
		event: Np.default("allow"),
		listener: Np.default("allow"),
		webchat: Np.default("allow"),
		issues: Np.default("hold"),
		workspace: Np.default("allow"),
		workflow: V(["allow", "deny"]).default("allow")
	}), Lp = V([
		"default",
		"plan",
		"bypassPermissions"
	]), Rp = R({
		conversationId: jp,
		index: F().int().nonnegative(),
		files: V(["then", "now"])
	}), zp = R({
		prompt: P().describe("What to say to the agent. May be empty if you are only attaching files."),
		title: P().max(80).optional().describe("A title for a conversation this turn is opening. Ignored for a conversation that already has one."),
		attachments: L(P().min(1)).max(20).optional().describe("Files to hand the agent along with the prompt, as workspace paths. Upload them first."),
		agent: Ep.optional().describe("Which model provider serves this turn. Leave it out for Claude."),
		harness: Op.optional().describe("Which agentic loop runs the turn. Leave it out to use each provider's own."),
		account: P().optional().describe("Which of that provider's connected accounts pays for the turn. Leave it out for the first one."),
		actsAs: Y.optional().describe("Which persona the turn speaks as out in the world. Not the same as which account pays for it."),
		sessionId: P().optional().describe("Resume this provider session instead of starting a fresh one."),
		conversationId: jp.optional().describe("The conversation this turn belongs to. You choose it, it survives model switches, and it is how you address the conversation later. Naming one that does not exist opens it."),
		isolated: I().optional().describe("Work in this conversation's own private copy of the repos rather than the shared tree, so several agents can work at once. Needs a conversation id."),
		startIn: P().max(200).optional().describe("Which folder the conversation opens in, relative to the workspace root; the project it belongs to. Decided on the first turn. A persona that names its own start folder wins."),
		placement: xp.optional().describe("Where this conversation runs: this sandbox (leave it out), or a paired runner by id. Decided on the first turn; later turns follow the conversation."),
		worktreeBase: L(kp).min(1).max(50).optional().describe("Pin a new private copy to these exact commits instead of today's workspace. Used when several agents must start from identical files."),
		autoLand: I().optional().describe("Whether this turn's work merges into the workspace when it finishes. Overrides the conversation's own setting for this turn only."),
		runRole: tp.optional().describe("What started this turn, when it was not a person typing: which of the sandbox's per-job model lists answers for it. Only used when the turn names no model of its own."),
		origin: Mp.optional().describe("Set by the sandbox alone: this turn opened a conversation on behalf of a message from outside rather than a person."),
		forkOf: R({
			conversationId: jp.describe("The conversation this one was cut from."),
			keep: F().int().nonnegative().describe("How many of that conversation's messages to copy in before this turn runs."),
			files: V(["then", "now"]).describe("Which files the fork opens on: \"now\" is the workspace as it stands, \"then\" is the files as they were at the cut, which needs a private copy.")
		}).optional().describe("Where this conversation was cut from, on its first turn only. Only the client knows this, so only the client can say it."),
		model: P().optional().describe("Which model to use. Leave it out for the provider's default."),
		unattended: I().optional().describe("Nobody chose a model for this turn because a screen started it rather than a person. The sandbox then fills in the model its owner picked for unwatched work."),
		outsideWake: P().min(1).optional().describe("Content from outside caused this turn, and what to call the source. It is what makes the sandbox treat the turn as carrying somebody else's words."),
		permissionMode: Lp.optional().describe("How tool calls are gated: ask before each tool, propose a plan first, or run everything. The agent can move itself between these mid-turn."),
		allowedTools: L(P().min(1)).optional().describe("Narrow the turn to these tools. Leave it out for everything the runtime has. For a turn driven by an outside message this list is the real boundary, because prompt wording is only advice."),
		effort: P().optional().describe("How hard the model should think, where the provider offers a choice."),
		thinking: I().optional().describe("Whether to show the model's reasoning as it works."),
		fast: I().optional().describe("Ask for the same work at a higher rate for a higher price. A request rather than a promise: the answer says what actually happened."),
		tierHold: I().optional().describe("Run exactly the model that was picked, even when the turn looks simple enough for a cheaper one. The judgement is still recorded; nothing is substituted."),
		editorContext: Ap.optional().describe("What the user has open in their editor, folded into the prompt so that pointing words like \"this\" resolve.")
	}).refine((e) => e.prompt.trim().length > 0 || (e.attachments?.length ?? 0) > 0, { message: "prompt or attachments required" }).refine((e) => e.isolated !== !0 || e.conversationId !== void 0, { message: "isolated requires conversationId" }).refine((e) => e.worktreeBase === void 0 || e.isolated === !0 && e.conversationId !== void 0, { message: "worktreeBase requires an isolated conversationId" }).refine((e) => e.origin === void 0 || e.conversationId !== void 0, { message: "origin requires conversationId" }).refine((e) => e.forkOf === void 0 || e.conversationId !== void 0, { message: "forkOf requires conversationId" }).refine((e) => e.forkOf?.files !== "then" || e.isolated === !0, { message: "forkOf.files \"then\" requires isolated" }), Bp = R({
		agent: P().min(1).describe("Which provider."),
		model: P().min(1).describe("Which of its models. Both or neither, because a model name only means anything to the provider that serves it."),
		account: P().optional().describe("Which connected account of that provider pays, by its daemon-minted id. Leave it out for whichever has headroom."),
		harness: Op.optional().describe("Which agentic loop runs it. Leave it out to use the provider's own."),
		effort: P().optional().describe("How hard that model should think, where it offers a choice. Leave it out to take the model's own default."),
		thinking: I().optional().describe("Whether this model reasons before it answers, where that is a choice it offers."),
		fast: I().optional().describe("Ask for this model's work at a higher rate for a higher price. A request rather than a promise.")
	}).optional(), Vp = (e) => ({
		agent: e.provider,
		model: e.model,
		...e.account === void 0 ? {} : { account: e.account },
		...e.harness === void 0 ? {} : { harness: e.harness },
		...e.effort === void 0 ? {} : { effort: e.effort },
		...e.thinking === void 0 ? {} : { thinking: e.thinking },
		...e.fast === void 0 ? {} : { fast: e.fast }
	}), Hp = R({
		provider: Ep.describe("Which provider serves this work."),
		model: P().min(1).describe("Which of its models. Both halves, because a model name only means anything to the provider that serves it."),
		effort: P().optional().describe("How hard this model should think, where it offers a choice. Leave it out to take the model's own default."),
		thinking: I().optional().describe("Whether this model reasons before it answers, where that is a choice it offers."),
		fast: I().optional().describe("Ask for this model's work at a higher rate for a higher price. A request rather than a promise."),
		harness: Op.optional().describe("Which agentic loop runs it. Leave it out to use the provider's own.")
	}), Up = R({ run: P().describe("The id of the run that just started. Hand it back when you attach, so the stream resumes rather than replaying.") }), Wp = R({
		conversationId: jp.describe("Which conversation to watch."),
		run: P().optional().describe("The run you were watching. If a newer turn has started since, the head names that one instead, and its rows are that turn's.")
	});
})), Gp, Kp, qp, Jp, Yp, Xp, Zp, Qp, $p, em, tm, nm, rm, im, am = b((() => {
	K(), pp(), X(), Gp = Eu([
		H("all"),
		H("none"),
		R({ models: L(P().min(1)).min(1) })
	]), Kp = R({
		kind: P(),
		label: P().optional(),
		utilization: F(),
		resetsAt: F().optional(),
		gates: Gp
	}), qp = R({
		windows: L(Kp),
		measuredAt: F()
	}), Jp = R({
		available: I().describe("Whether the provider will reopen this account's session window right now. The only thing a button may be drawn from."),
		reason: P().optional().describe("Why not, in the provider's own word, when it gave one. Absent when it is available, or when the provider said nothing."),
		nextAvailableAt: F().optional().describe("When the next reset may be claimed, in epoch seconds, where the provider publishes it. Absent means unknown, never 'now'."),
		weeklyResetsAt: F().optional().describe("When the weekly allowance itself reopens, in epoch seconds, where the provider publishes it.")
	}), Yp = R({
		result: V([
			"reset",
			"already_used",
			"not_limited",
			"ineligible",
			"unavailable",
			"error"
		]).describe("What the provider did. Only `reset` reopened the window; every other value means nothing changed."),
		nextAvailableAt: F().optional().describe("When another reset may be claimed, in epoch seconds, where the provider published it."),
		detail: P().optional().describe("What went wrong, in words, for the two outcomes that are this sandbox's fault rather than the plan's.")
	}), Xp = R({
		at: F().describe("When it refused, in milliseconds."),
		kind: V([
			"limit",
			"auth",
			"entitlement"
		]).describe("Three different noes, kept apart because what fixes each is different. A spent allowance is answered by waiting; a refused credential by signing in again; and an entitlement refusal, where somebody has switched this off for your seat, by neither of those. That last one authenticates fine and reports healthy limits the whole time it refuses everything."),
		message: P().describe("The provider's own words, verbatim. The only part that says which limit or which credential."),
		account: P().optional().describe("Which account was serving, where that is known."),
		model: P().optional().describe("Which model the refused turn was on, where that is known.")
	}), Zp = R({ refusals: B(P(), Xp).describe("The most recent refusal per provider. Read alongside an account's usage: that says how full it was when last checked, this says whether it has since started saying no.") }), Qp = R({
		name: P(),
		label: P(),
		usage: qp.optional(),
		cooling: R({
			until: F().optional(),
			reason: P().optional()
		}).optional()
	}), $p = R(Object.fromEntries(fp.map((e) => [e, L(Qp)]))), em = z("kind", [
		R({
			kind: H("plan").describe("Answering a plan the agent proposed."),
			requestId: P().min(1).describe("Which card you are answering, from the frame that raised it."),
			approve: I().describe("Whether to go ahead. Approving means the plan then runs without a prompt per tool, because being asked whether a plan you just approved may run its first command is not a question worth having."),
			feedback: P().optional().describe("Why not, which goes back to the model as the reason.")
		}),
		R({
			kind: H("question").describe("Answering a question the agent asked."),
			requestId: P().min(1).describe("Which card you are answering."),
			answers: B(P(), L(P())).optional().describe("What you chose, keyed by the question, with the chosen labels or your own words."),
			cancelled: I().optional().describe("Dismissing it instead, which tells the agent to carry on using sensible defaults rather than leaving it waiting.")
		}),
		R({
			kind: H("permission").describe("Answering a request to use a tool."),
			requestId: P().min(1).describe("Which card you are answering."),
			decision: V([
				"once",
				"always",
				"deny"
			]).describe("Once allows this call alone; always allows that whole tool for the rest of the conversation; no blocks it."),
			feedback: P().optional().describe("Why not, which goes back to the model as the reason.")
		}),
		R({
			kind: H("browser_help").describe("Answering a request for help in the agent's browser: a captcha, a password it does not hold, a check on your phone."),
			requestId: P().min(1).describe("Which card you are answering."),
			helped: I().describe("Whether you cleared it. Yes means the turn carries on from the page as you left it; no tells the agent so, and it moves on rather than waiting for ever."),
			note: P().optional().describe("Anything the agent should know, which goes back to it either way.")
		}),
		R({
			kind: H("terminal_help").describe("Answering a request for help at a terminal: a code to type, a confirmation only a person can give."),
			requestId: P().min(1).describe("Which card you are answering."),
			helped: I().describe("Whether you did it. Yes also hands the agent what the terminal now says, because a person answering a prompt is exactly the moment the agent cannot see."),
			note: P().optional().describe("Anything the agent should know, which goes back to it either way.")
		}),
		R({
			kind: H("capability_offer").describe("Answering a request to connect something the agent needs."),
			requestId: P().min(1).describe("Which card you are answering."),
			connect: I().describe("Yes keeps the agent waiting while you set it up, and it carries on the moment the connection comes alive. No tells it to continue without. The reply itself connects nothing: setting it up is still your own doing.")
		}),
		R({
			kind: H("payment_offer").describe("Answering a request to pay for something."),
			requestId: P().min(1).describe("Which card you are answering."),
			approve: I().describe("Yes releases exactly one payment. Anything else spends nothing. This click is the only way the money can move.")
		}),
		R({
			kind: H("credential_offer").describe("Releasing a credential the agent may only use once a named person says so."),
			requestId: P().min(1).describe("Which card you are answering."),
			approve: I().describe("Yes releases it, as far as the card says (this one use, or the rest of the conversation). Only the people the card names can answer at all, yes or no.")
		})
	]), tm = R({
		conversationId: P().min(1).describe("Which running conversation to interrupt."),
		text: P().max(2e4).describe("What to say to it. It arrives mid-turn without stopping the turn."),
		attachments: L(P().min(1)).max(20).optional().describe("Files to send with it, as workspace paths. A screenshot dropped in mid-turn with no words is a legitimate thing to send."),
		editorContext: Ap.optional().describe("What you have open, folded in so that pointing words resolve.")
	}).refine((e) => e.text.trim().length > 0 || (e.attachments?.length ?? 0) > 0, { message: "text or attachments required" }), nm = R({ conversationId: P().min(1).describe("Which conversation's running turn to cancel.") }), rm = R({
		agent: Ep.describe("Which provider serves the re-run."),
		harness: Op.describe("Which agentic loop runs it."),
		account: P().optional().describe("Which of that provider's accounts pays for it. Leave it out for the first one."),
		model: P().optional().describe("Which model. Leave it out to keep the one the refused turn named."),
		carry: I().optional().describe("When the account changes, keep the provider session (the model keeps everything, and re-reads all of it once on the other account) rather than opening a fresh one seeded from the record. Ignored when the provider changes, or when nothing changes.")
	}), im = R({
		conversationId: P().min(1).describe("Which conversation's held turn to run again."),
		routing: rm.optional().describe("Who serves the re-run, when the conversation has been re-pointed since it was refused. Leave it out to run it on whatever the turn carried.")
	});
})), om, sm = b((() => {
	K(), pp(), om = V(fp);
})), cm, lm, um, dm, fm, pm, mm, hm, gm, _m, vm, ym, bm, xm, Sm, Cm, wm, Tm = b((() => {
	K(), am(), sm(), cm = R({
		id: P().describe("The account's id, which is what a turn names to spend on it and what disconnecting takes."),
		label: P().describe("What it is called here, which somebody can change."),
		email: P().optional().describe("Who it signs in as, in the provider's own words. Kept beside the label rather than folded into it, so a renamed account can still say whose it is. Absent when the provider says nothing, which is exactly when renaming is the only answer."),
		organization: P().optional().describe("Which organisation it belongs to, where the provider says."),
		scope: P().optional().describe("What the credential is permitted to do, in the provider's terms."),
		connectedAt: F().describe("When it was connected, in milliseconds."),
		needsReauth: I().optional().describe("Its stored credential can no longer be renewed and somebody has to sign in again. Absent means healthy, or not checked yet."),
		detail: P().optional().describe("Why, in words a person can act on."),
		usage: qp.optional().describe("How full its plan limits were when last measured, so a picker can show what is left before committing work to it. Absent until a reading exists, which reads as unknown rather than as nothing left.")
	}), lm = R({ accounts: L(cm).describe("The connected accounts. Tokens never travel in this shape: being in this list is what connected means.") }), um = R({ force: Vd().default(!1).describe("Measure the plan limits again before answering, rather than serving a recent reading. Slower, and the right thing when somebody has just changed a plan and is asking whether what they can see is still true.") }), dm = R({ id: P().min(1).describe("Which account.") }), fm = R({
		id: P().min(1).describe("Which account."),
		label: P().max(80).describe("The new name. Blank restores the one derived from the sign-in, rather than leaving a nameless row.")
	}), pm = V([
		"device",
		"redirect",
		"paste"
	]), mm = R({
		url: P().describe("The page to open and sign in on."),
		code: P().describe("The one-time code the page will ask for, where the vendor issues one. Blank when the page is already addressed to this attempt."),
		state: P().describe("For a redirect sign-in, the marker in the address the browser lands on, so a pasted URL can be recognised as this attempt's. Blank otherwise."),
		flow: pm.describe("How this attempt ends. A device sign-in finishes by itself and you watch the account list; a redirect needs the address it landed on handed back; a paste needs the code the page showed."),
		variant: P().describe("Which of the provider's estates this attempt signs in to. Blank for a provider with one."),
		handshake: P().describe("This attempt's id, for finishing or abandoning it. Not a credential and not redeemable: the proof that completes the sign-in never leaves the sandbox."),
		expiresAt: F().describe("When this attempt stops being answerable, in milliseconds, so a card can stop waiting instead of spinning.")
	}), hm = R({ variant: P().min(1).optional().describe("Which estate to sign in to. Absent takes the provider's default.") }), gm = R({
		handshake: P().min(1).describe("Which attempt this belongs to."),
		code: P().optional().describe("The code the sign-in page showed, for a paste sign-in."),
		redirectUrl: P().optional().describe("The address the browser was sent to, whole, for a redirect sign-in. The grant is inside it."),
		label: P().optional().describe("What to call the account. Blank derives one from the sign-in.")
	}), _m = R({ account: cm.optional().describe("The account it connected, where the sign-in ends here. Absent means keep watching the account list.") }), vm = R({ handshake: P().min(1).describe("Which attempt to stop waiting on.") }), ym = R({
		url: P().describe("The page to open."),
		code: P().describe("The one-time code, where the provider uses one."),
		state: P().min(1).describe("The handshake's id, which status reads and the finishing call sends back."),
		flow: V(["device", "redirect"]).describe("Which shape this is. A device sign-in finishes by itself and you poll the attempt; a redirect needs the address it landed on handed back. Said outright rather than guessed at from whether a code happens to exist.")
	}), bm = z("status", [
		R({ status: H("wait") }),
		R({ status: H("ok") }),
		R({
			status: H("error"),
			error: P().min(1)
		})
	]), xm = R({
		provider: om.describe("Which provider."),
		redirectUrl: P().min(1).describe("The address the browser was sent to, whole. The grant is inside it."),
		state: P().min(1).describe("The handshake this belongs to. A mismatch is refused.")
	}), Sm = V(["reasoning", "fast"]), Cm = R({
		id: P().describe("What to name when asking for this model."),
		label: P().describe("What to call it on screen."),
		efforts: L(P()).optional().describe("The thinking levels it accepts, where the provider says. Empty means use your own defaults."),
		description: P().optional().describe("What it is good for, in the provider's own words. Absent where the provider publishes only ids, which is the honest answer rather than something to paper over with a hand-written table."),
		badges: L(Sm).optional().describe("What it is known for, where the provider says so."),
		contextWindow: F().optional().describe("How many tokens this model will accept in one request, where the server publishes it.")
	}), wm = R({
		models: L(Cm).describe("What this provider serves, in its own preference order, which is not rearranged here. Never empty."),
		default: P().describe("Which one a fresh conversation starts on. Always present.")
	});
})), Z, Em, Dm, Q, $ = b((() => {
	K(), Z = R({ ok: H(!0).describe("Always true. A route that answers this either did the thing or refused with a status; there is no third outcome to report.") }), Em = V([
		"viewer",
		"collaborator",
		"maintainer",
		"owner"
	]), V([
		"viewer",
		"collaborator",
		"maintainer"
	]), Dm = R({ token: P().min(1).describe("The freshly minted credential. The previous one stopped working the moment this answered.") }), Q = R({ repo: P().describe("Which repository. \"root\" is the workspace itself; anything else is a repository's folder relative to the workspace root, URL-encoded.") });
})), Om, km = b((() => {
	J(), X(), Tm(), $(), Om = {
		start: q.route({
			method: "POST",
			path: "/accounts/{provider}/login/start",
			summary: "Begin connecting an account",
			description: "Hands back the page to sign in on, and the code it will ask for where there is one. The sandbox holds the proof and finishes what it can itself: a device sign-in lands in the account list on its own, a paste or a redirect needs one thing brought back to the finishing call."
		}).input(Dp.extend(hm.shape)).output(mm),
		complete: q.route({
			method: "POST",
			path: "/accounts/{provider}/login/complete",
			summary: "Finish a sign-in with what the page handed back",
			description: "Takes the code the page showed, or the address a redirect landed on, and finishes the attempt. Answers with the account where the exchange ends here; otherwise the sandbox still has a mint to do and the row appears in the account list."
		}).input(Dp.extend(gm.shape)).output(_m),
		cancel: q.route({
			method: "POST",
			path: "/accounts/{provider}/login/cancel",
			summary: "Abandon a sign-in",
			description: "Stops waiting on a sign-in nobody completed. An abandoned attempt also expires on its own."
		}).input(Dp.extend(vm.shape)).output(Z),
		accounts: q.route({
			method: "GET",
			path: "/accounts/{provider}",
			summary: "Connected accounts of a provider",
			description: "Each connected account with how full its plan limits were when last measured, where the provider publishes any. Ask for a fresh measurement and it takes one before answering, which is slower. The credentials themselves never travel: being in this list is what connected means."
		}).input(Dp.extend(um.shape)).output(lm),
		rename: q.route({
			method: "POST",
			path: "/accounts/{provider}/rename",
			summary: "Rename an account",
			description: "Changes the label one account shows under, so several are tellable apart. Blank restores the one derived from the sign-in."
		}).input(Dp.extend(fm.shape)).output(cm),
		disconnect: q.route({
			method: "POST",
			path: "/accounts/{provider}/disconnect",
			summary: "Disconnect an account",
			description: "Clears one stored credential, and stops any sign-in still in flight for this provider. The others stay connected."
		}).input(Dp.extend(dm.shape)).output(Z)
	};
})), Am, jm, Mm, Nm, Pm, Fm = b((() => {
	K(), X(), Am = R({
		id: P().describe("The entry's own id."),
		at: F().describe("When it happened, in milliseconds. Also what you page by."),
		provider: P().optional().describe("Which outside service, when one was involved. Absent for the sandbox's own events."),
		account: P().optional().describe("Which account handled it. Absent for the sandbox's own events and for work run on a provider's default."),
		direction: V([
			"in",
			"out",
			"system"
		]).describe("Whether something arrived, something went out, or the sandbox did it to itself."),
		type: P().describe("Exactly what happened: a message received or sent, a reaction, a turn starting or ending, a rule doing something. A rule that ran and passed says nothing here, because a feed of green ticks is one the eye learns to skip."),
		channelId: P().optional().describe("Which channel or thread it happened in."),
		author: P().optional().describe("Who sent it, for something that arrived."),
		actor: P().optional().describe("Who asked for the turn, as the sandbox verified it: a member's email, or token:<label> for a program's control token. Absent for a wake nothing asked for."),
		content: P().optional().describe("The message, in full, whichever direction it went."),
		method: P().optional().describe("The verb of an outgoing call."),
		endpoint: P().optional().describe("The address of an outgoing call. Credentials travel in headers, so they are never here."),
		sessionId: P().optional().describe("The provider session behind it."),
		turnId: P().optional().describe("Ties one turn's entries together. A turn writes several, and read as separate rows they say one thing several times, so a feed groups on this."),
		conversationId: P().optional().describe("Which conversation. This, rather than the provider session, is what the same agent means across a feed, because a session is retired whenever the model changes."),
		title: P().optional().describe("What that conversation was called at the time. Copied in rather than looked up, because an audit entry must still read as words years later, after the conversation has been renamed or pruned."),
		origin: Mp.optional().describe("What woke the conversation from outside, when something did. It is how a turn gets filed under the chat service that caused it rather than under the model that served it."),
		automationIds: L(P()).optional().describe("Which automations were involved."),
		outcome: V(["ok", "error"]).optional().describe("How it ended."),
		error: P().optional().describe("What went wrong, when something did."),
		extra: B(P(), Su()).optional().describe("Whatever else the source had to say: attachments, participants, a recording's path. Shape varies by source.")
	}), jm = R({
		provider: P().optional().describe("Narrow it to one outside service."),
		limit: G().min(1).max(500).default(100).describe("How many entries to return."),
		before: G().optional().describe("Only entries older than this timestamp, so paging walks backwards through the feed.")
	}), Mm = R({ events: L(Am).describe("The audit entries, newest first.") }), Nm = R({
		capabilityId: P().describe("Which connection."),
		provider: P().describe("Which service it is."),
		gateway: V([
			"ready",
			"connecting",
			"pairing",
			"disconnected",
			"idle"
		]).describe("Idle means it is up but has nothing to listen for, which is different from a connection that should be up and is not. Pairing means somebody started a sign-in and never finished it, which no amount of waiting will fix."),
		lastError: P().optional().describe("The most recent thing that went wrong on it.")
	}), Pm = R({
		connections: L(Nm).describe("Each source feeding the record, and whether it is working. Probed now rather than remembered."),
		voice: R({
			channelId: P().describe("Which channel."),
			channelName: P().describe("What it is called."),
			startedAt: F().describe("When it joined, in milliseconds."),
			participants: L(P()).describe("Who else is in it.")
		}).optional().describe("A voice call the sandbox is currently in, when it is in one.")
	});
})), Im, Lm = b((() => {
	J(), Fm(), Im = {
		list: q.route({
			method: "GET",
			path: "/activity",
			summary: "What the agent has done out in the world",
			description: "The audit trail of actions taken on outside services. Read-only on purpose: entries are written by the sandbox alone, which is what makes it a record worth trusting."
		}).input(jm).output(Mm),
		status: q.route({
			method: "GET",
			path: "/activity/status",
			summary: "Whether the audit trail is being kept",
			description: "Which sources are feeding the record and whether each is working."
		}).output(Pm)
	};
})), Rm, zm, Bm, Vm, Hm, Um, Wm, Gm, Km, qm, Jm, Ym, Xm, Zm, Qm, $m, eh = b((() => {
	K(), Rm = /^[A-Za-z_][A-Za-z0-9_]*$/, zm = P().regex(Rm).max(128), Bm = R({
		key: zm.describe("The name to store it under, which is the name a process will find it by."),
		value: P().min(1).describe("The value. It goes straight to your sandbox and never through the platform.")
	}), Vm = R({ keys: L(P()).describe("The names that exist here. Only the names: the values never leave the sandbox.") }), Hm = R({ key: zm.describe("Which secret, by name.") }), Um = R({ value: P().describe("The value itself. The only place in this API one is ever returned.") }), Wm = V(["use", "conversation"]).describe("How far one release goes: `use` asks again every single time (one click releases exactly one use), `conversation` covers the rest of this conversation and is forgotten when the daemon restarts."), Gm = V(["secret", "capability"]).describe("Whether this gate covers one stored secret, by the name a reference carries, or one whole connected capability, by its id."), Km = V([
		"shell",
		"code",
		"browser",
		"session",
		"otp"
	]).describe("What the credential was about to be used for: a shell command, a script, typing into a page, mounting a connected account, or one one-time code."), qm = R({
		subject: P().min(1).describe("What is gated: a secret's name, or a connected capability's id."),
		kind: Gm,
		approvers: L(P().min(3)).min(1).describe("Exactly who may release it, by email, from the people on the Access roster. Not a seniority floor: nobody outside this list can release it, the owner included, unless the owner is on it."),
		scope: Wm
	}), Jm = R({ gates: L(qm).describe("Every gate in force. Names, subjects and approver addresses only: this answer never carries a credential.") }), Ym = R({ subject: P().min(1).describe("Which gate, by the secret name or capability id it covers.") }), Xm = R({
		subject: P().min(1).describe("What to ask for: the secret's name, or the connected capability's id."),
		why: P().max(280).optional().describe("One line on what it is for. The only words on the card that are the agent's."),
		conversationId: P().optional().describe("Which conversation to raise the card in. The CLI fills this from the running turn.")
	}), Zm = R({
		granted: H(!0).describe("Always true: a refusal is an error with a sentence, never a `false` here."),
		approvedBy: P().describe("Who released it."),
		message: P().describe("What the grant means in practice, and what to do next.")
	}), Qm = R({
		key: P().describe("What identifies it. Unique across the whole inventory, so several accounts of one provider each get their own entry."),
		kind: V([
			"env",
			"generated",
			"capability",
			"provider"
		]).describe("Where it came from: you set it, the sandbox generated it, a connection needs it, or it is a model account's credential."),
		label: P().optional().describe("A friendlier name, for entries that have one."),
		status: V([
			"missing",
			"set",
			"connected"
		]).describe("Whether it exists and, for a connection, whether it is working."),
		requiredBy: L(R({
			resourceId: P().describe("Which resource."),
			type: P().describe("What kind of resource it is.")
		})).describe("What is waiting on it. Empty for a connection's or an account's own credential."),
		storedAt: P().describe("Where it actually lives, in words."),
		revealable: I().describe("Whether its value can be shown at all. Everything except a model account's credential can be."),
		ci: R({
			synced: I().describe("Whether the pipeline has it."),
			pushedAt: P().optional().describe("When it was last sent there.")
		}).optional().describe("Whether a copy has been given to the build pipeline."),
		lastUse: R({
			at: F().describe("When, in milliseconds."),
			lane: V([
				"shell",
				"code",
				"browser"
			]).describe("How it was used: a command, a script, or typed into a page."),
			detail: P().optional().describe("Where it went: the start of the command or script, or the site. Names and destinations only, never values."),
			approvedBy: P().optional().describe("Who released it for that use, when it is gated. Absent when nothing had to be approved.")
		}).optional().describe("The last time an agent actually spent this secret. Absent while it never has been, which most never are."),
		gate: R({
			approvers: L(P()).describe("Who may release it, by email. Nobody else can, whatever their role."),
			scope: Wm
		}).optional().describe("Who has to release this before the agent can use it, and for how long one release lasts. Absent when it is not gated.")
	}), $m = R({ entries: L(Qm).describe("One entry per secret this sandbox knows about, from every place they live. No values, ever.") });
})), th, nh, rh, ih, ah, oh, sh, ch, lh, uh, dh, fh, ph, mh, hh, gh, _h, vh, yh, bh, xh, Sh, Ch, wh, Th, Eh, Dh, Oh, kh, Ah, jh, Mh, Nh = b((() => {
	K(), X(), eh(), th = R({
		label: P().describe("The choice, in a few words."),
		description: P().describe("What picking it means."),
		preview: P().optional().describe("Something to look at while deciding: a mock-up, a snippet, a layout.")
	}), nh = R({
		question: P().describe("What the agent is asking."),
		header: P().describe("A short label for the question."),
		multiSelect: I().describe("Whether more than one answer can be picked."),
		options: L(th).describe("The choices offered. A free-text answer is always possible as well.")
	}), rh = R({
		text: P().describe("What would run."),
		language: V(["bash", "javascript"]).describe("Which of the two backends it is written for, named as the grammar that colours it."),
		truncated: I().describe("Whether this is an excerpt of a longer program, so the card can say so instead of ending mid-word. An excerpt always carries the flagged fragment: the beginning, then a window around the fragment, with any skipped middle written into the text as a bracketed count."),
		spans: L(R({
			start: F().int().nonnegative(),
			end: F().int().nonnegative()
		})).describe("Which fragments of the text the pattern match fired on: every matched class's, or, under the hard rule, only the class the title names. Offsets into text, in order, never overlapping.")
	}), ih = R({
		toolName: P().describe("Which tool it wants to use."),
		title: P().optional().describe("The whole question, as a sentence, exactly as the runtime words it."),
		displayName: P().optional().describe("A short phrase for the button, such as read file."),
		description: P().optional().describe("More about what it is asking for."),
		reason: P().optional().describe("Why it is asking at all: a rule, the current mode, something that looked risky."),
		path: P().optional().describe("Which file it concerns, when it concerns one."),
		alwaysLabel: P().optional().describe("The wording for an always-allow answer. Present only when there is something an always could actually remember; without it the only answers are once and no."),
		program: rh.optional().describe("The program this card is holding, when the card is about one. Present on a command gate's card and absent on every other permission ask."),
		explain: P().optional().describe("One plain sentence saying what the program does and why it is being asked about, where the title says something else. Written by the judge that read your safety policy, never by the agent being gated.")
	}), ah = R({
		card: P().describe("Which connection is being asked for."),
		name: P().describe("What it is called, as the catalogue titles it rather than as the agent named it."),
		why: P().optional().describe("The agent's case for connecting it, and the only words on this card that are the agent's.")
	}), oh = R({
		url: P().describe("What is being paid for."),
		description: P().optional().describe("What the endpoint says it is."),
		payTo: P().describe("Where the money goes, taken verbatim from the endpoint's own demand."),
		network: P().describe("On which network."),
		asset: P().describe("In which token."),
		assetName: P().describe("That token's name. It is pegged to the dollar, which is what lets every amount here read as dollars."),
		amountUsd: P().describe("The exact price. Not a ceiling: this scheme has no ranges, so this is the whole spend."),
		spentTodayUsd: P().describe("What has already gone out today."),
		dailyCapUsd: P().describe("What may go out in a day."),
		why: P().optional().describe("The agent's case for paying, and the only words on this card that are the agent's.")
	}), sh = R({
		subject: P().describe("Which credential is being asked for."),
		kind: Gm,
		lane: Km,
		detail: P().optional().describe("Where it would go: the start of the command, the site, or what is being mounted. Never a value: the command still reads as a reference at this point."),
		why: P().optional().describe("The agent's case for using it, and the only words on this card that are the agent's."),
		approvers: L(P()).describe("Who may release it. A click from anyone else is refused and leaves the card standing."),
		scope: Wm
	}), ch = R({
		name: P().describe("What to type, without the leading slash."),
		description: P().describe("What it does."),
		hint: P().optional().describe("What its argument should look like, shown after the name.")
	}), lh = R({ agent: Ep.optional().describe("Whose commands to read. Leave it out for Claude.") }), uh = R({ commands: L(ch).describe("The shortcut commands, as the provider last published them.") }), dh = R({
		content: P().describe("The item, as the agent wrote it."),
		status: V([
			"pending",
			"in_progress",
			"completed"
		]).describe("Where it is."),
		activeForm: P().optional().describe("How to phrase it while it is happening, so a screen can say what the agent is doing rather than what it plans to do.")
	}), fh = R({
		tokens: F().describe("How much the latest request sent, all told."),
		contextWindow: F().describe("How much the model can hold. The gap between these two is how close the conversation is to being compacted."),
		cachedAt: F().optional().describe("When that request last touched the provider's prompt cache, in milliseconds. The cache's clock runs from here, since a read refreshes it as a write does."),
		cacheTtlMs: F().optional().describe("How long that cache entry lives from `cachedAt`, in milliseconds.")
	}), ph = V([
		"read",
		"edit",
		"delete",
		"move",
		"search",
		"execute",
		"think",
		"fetch",
		"other"
	]), mh = V([
		"pending",
		"in_progress",
		"completed",
		"failed"
	]), hh = R({
		path: P().describe("The file, as a workspace path, whatever directory the tool was run from."),
		line: F().optional().describe("Which line, counting from one.")
	}), gh = z("type", [
		R({
			type: H("text").describe("Plain output."),
			text: P().describe("What the tool said.")
		}),
		R({
			type: H("diff").describe("A change to a file."),
			path: P().describe("Which file, as a workspace path."),
			oldText: P().optional().describe("What was there. Absent for a new file, or where the previous contents are not known."),
			newText: P().describe("What is there now."),
			truncated: I().optional().describe("One of the two sides was too large to send whole.")
		}),
		R({
			type: H("image").describe("A picture the tool produced."),
			path: P().describe("Where it is, as a workspace path. A path rather than the bytes, because the workspace already serves it, sending it inline would bloat every stored record, and this way the picture stays openable afterwards.")
		})
	]), _h = R({
		path: P().describe("Where it lives, as a workspace path."),
		title: P().describe("What it is called: its opening heading, or its file name."),
		markdown: P().describe("The document itself."),
		truncated: I().optional().describe("It was clipped at the wire cap; the file on disk has more."),
		plan: I().optional().describe("It is one of the CLI's plan files, written to be approved rather than merely read.")
	}), vh = P().describe("What to send back when you answer."), yh = {
		requestId: vh,
		text: P().describe("The plan itself."),
		document: _h.optional().describe("The write-up this plan refers to, when the plan itself is a pointer to one.")
	}, bh = {
		requestId: vh,
		questions: L(nh).describe("What it wants to know."),
		document: _h.optional().describe("The document this turn wrote and is asking about, so the choice can be read beside it.")
	}, xh = { requestId: vh }, Sh = {
		requestId: P(),
		session: P(),
		account: P(),
		message: P()
	}, Ch = {
		requestId: P(),
		session: P(),
		message: P()
	}, wh = {
		requestId: P(),
		offer: ah
	}, Th = {
		requestId: P(),
		offer: oh
	}, Eh = {
		requestId: P(),
		offer: sh
	}, Dh = R({
		outcome: V(["connected", "unfinished"]),
		id: P().optional()
	}), Oh = R({
		outcome: V(["paid", "failed"]),
		amountUsd: P(),
		transaction: P().optional(),
		network: P().optional()
	}), kh = R({
		outcome: V(["released", "refused"]),
		approvedBy: P().optional()
	}), Ah = R({
		kind: H("plan").describe("The agent has written a plan and is waiting for a yes."),
		...yh
	}), jh = R({
		kind: H("question").describe("The agent has asked you something and is waiting."),
		...bh
	}), Mh = ih.extend({
		kind: H("permission").describe("The agent wants to use a tool it needs permission for."),
		...xh
	}), z("kind", [
		Ah,
		jh,
		Mh
	]);
})), Ph = b((() => {})), Fh = b((() => {})), Ih, Lh, Rh = b((() => {
	Ph(), Fh(), Ih = ".intentic", Lh = "481795963975-cq9msl6higcd91joidrfp8mjlkuq5fk3.apps.googleusercontent.com", `${Lh}`;
})), zh, Bh, Vh, Hh, Uh = b((() => {
	K(), zh = /^[a-zA-Z_][a-zA-Z0-9_]{0,39}$/, Bh = R({
		name: P().regex(zh),
		type: V([
			"string",
			"number",
			"boolean",
			"string[]"
		]),
		description: P().min(1),
		required: I()
	}), Vh = (e) => {
		let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
		for (let r of e) t.has(r.name) && n.add(r.name), t.add(r.name);
		return [...n];
	}, Hh = L(Bh).min(1).max(16).superRefine((e, t) => {
		for (let n of Vh(e)) t.addIssue({
			code: "custom",
			message: `Output field names must be unique; "${n}" is repeated.`
		});
	});
})), Wh, Gh, Kh, qh, Jh, Yh, Xh, Zh, Qh, $h, eg, tg, ng, rg, ig, ag = b((() => {
	K(), Rh(), Uh(), X(), Tp(), Wh = V(["fresh", "continue"]), Gh = z("kind", [
		R({ kind: H("none").describe("It produces nothing but its work. The classic make the suite pass: what it leaves behind is a passing suite, and asking it to also file a report is asking it to spend a round on paperwork.") }),
		R({ kind: H("claim").describe("Each round says whether it is done and why. Structured prose: done is a value read rather than a sentence interpreted. Self-assessment, so advisory by construction; it exists because plenty of goals have no command that could check them.") }),
		R({
			kind: H("json").describe("Each round writes a real answer in a shape you declared. This is the one that makes a step's output usable as the next step's input: a paragraph mentioning three files cannot be fed to anything, a list of three files can."),
			fields: Hh.describe("The shape that answer has to match.")
		})
	]), Kh = z("kind", [R({
		kind: H("command").describe("Run something and see if it passes. Deterministic, free, and the only signal here whose answer does not come from a model. A passing test suite beats any amount of self-report."),
		command: P().min(1).describe("The command to run in the conversation's own tree. Exiting cleanly means satisfied.")
	}), R({
		kind: H("judge").describe("Put the question to a separate model with no tools, which reads the round's own report and rules on it, having done none of the work and nothing invested in its being finished."),
		rubric: P().min(1).describe("What that judge is asked."),
		model: P().optional().describe("Which model judges. Leave it out for the cheap one the other small jobs use.")
	})]), qh = R({
		done: I().describe("Whether the goal is met. Reading this is the whole point of the file."),
		reason: P().describe("Why, in one line. The most-read sentence in the feature: the next round reads it first and the history shows it."),
		evidence: P().optional().describe("What was checked to know that. Optional, so a round with nothing to point at says so by leaving it out rather than by inventing a sentence."),
		data: B(P(), Su()).optional().describe("The declared answer, for a loop that asked for one, checked against the shape it declared.")
	}), Jh = 50, Yh = R({
		conversationId: jp.describe("The conversation to loop. It need not exist yet: naming a fresh one opens it, which is what lets run this until it passes be the first thing you ever say."),
		goal: P().min(1).describe("What done means, in your words. It goes into every round's instructions and into the judge's question, so the model is told the bar rather than left to infer it."),
		prompt: P().min(1).describe("What each round is asked to do. The suite passes is the goal; run the tests, take the top failure, fix it is the instruction."),
		context: Wh.describe("How each round meets the last. Starting fresh makes the files the memory rather than the conversation, so the twentieth round reads the tree as clearly as the first, and costs a re-read each time. Carrying on is cheaper and keeps the reasoning, which suits a short polish-this loop and degrades on long ones: a session that has spent eleven rounds arguing for its own approach is the worst available judge of whether that approach is finished."),
		output: Gh,
		checks: L(Kh).describe("What else has to be true, all of them together. A list because the suite passes and the report is written is a real bar, and running it as two loops would do the work twice."),
		maxIterations: F().int().min(1).max(Jh).describe("How many rounds before it gives up. A loop that has not got there in fifty is not one round short of it."),
		maxSpendUsd: F().positive().optional().describe("A ceiling on what the whole loop may spend, in dollars. Optional for a short loop somebody is watching, and strongly wanted otherwise: this is the first thing here that can keep spending with nobody pressing anything between rounds."),
		stallLimit: F().int().min(1).describe("Stop after this many rounds in a row that changed nothing on disk. The guard that matters most: a loop's failure is not runaway success, it is an agent re-reading the same three files, restating the same plan and declaring more work remains, eleven times. Every one of those rounds succeeds, so only the tree not moving catches it."),
		isolated: I().describe("Whether it works in the conversation's own private copy or in the shared tree. It also decides where a check runs: testing the shared tree would be testing code this loop has not merged yet."),
		agent: Ep.optional().describe("Which provider the rounds run on. Absent falls back to the conversation's own last choice."),
		harness: Op.optional().describe("Which agentic loop they run on."),
		account: P().optional().describe("Which account pays."),
		model: P().optional().describe("Which model."),
		actsAs: Y.optional().describe("Which persona the rounds act as. It matters here: every round is unwatched, and an unwatched turn naming no persona reaches no signed-in account at all, so pinning one is how a loop gets hands."),
		worktreeBase: L(kp).min(1).max(50).optional().describe("Pin the private copy to these exact commits, so a restart cannot quietly change what the loop is working on."),
		autoLand: I().optional().describe("Whether the work merges as it goes.")
	}), `${Ih}`, Xh = R({
		n: F().int().min(1).describe("Which round this was."),
		at: F().describe("When it ran, in milliseconds."),
		outcome: V([
			"continue",
			"done",
			"error"
		]).describe("How the round ended, which is not the same question as how the loop did. A round that errored does not end the loop by itself: a failing turn is often exactly what the next round is meant to fix."),
		detail: P().optional().describe("What the check said, in its own words. What a run history is actually read for: why it kept going, and why it stopped."),
		costUsd: F().optional().describe("What the round cost, in dollars."),
		changed: I().describe("Whether anything on disk moved. Three unchanged rounds in a row is the shape of a loop that is not working."),
		sessionId: P().optional().describe("The session it ran on, and the way from a history row to a readable record.")
	}), Zh = V([
		"running",
		"done",
		"exhausted",
		"stalled",
		"overspent",
		"stopped",
		"error"
	]), Qh = Yh.extend({
		state: Zh.describe("How it ended, and each of these is a different thing to be told. Out of rounds says give it more room; stalled says it is not making progress and more room will not help. Overspent, stopped by a person, and the loop itself failing are all their own answers."),
		startedAt: F().describe("When it began, in milliseconds."),
		endedAt: F().optional().describe("When it ended, in milliseconds."),
		resumed: F().int().min(0).describe("How many times the sandbox restarted under it and picked it back up. Counted rather than flagged, so a loop whose round reliably kills the sandbox is not resurrected on every boot for ever."),
		detail: P().optional().describe("Why it ended, for the endings whose reason is not in their name."),
		iterations: L(Xh).describe("Every round, in order. Why it stopped at the fourth is the question a loop gets read for, and this is the answer.")
	}), $h = R({ loops: L(Qh).describe("Every loop this workspace has run, newest first, kept after they end.") }), eg = R({ conversationId: jp.describe("Which conversation's loop.") }), tg = R({
		id: Y.describe("The design's id."),
		name: P().min(1).max(60).describe("What to call it. Short, because it has to be readable on a small badge."),
		description: P().max(280).optional().describe("What it is for, in one line. Optional, because a well-named loop has already said it."),
		prompt: P().optional().describe("What each round is asked to do, when that is worth saying separately from the goal. Absent means each round works towards the goal however it sees fit."),
		context: Wh.describe("How each round meets the last: starting clean, or carrying on."),
		output: Gh.describe("What it has to produce."),
		checks: L(Kh).describe("What else has to be true."),
		maxIterations: F().int().min(1).max(Jh).describe("How many rounds before it gives up."),
		maxSpendUsd: F().positive().optional().describe("A ceiling on what it may spend, in dollars."),
		stallLimit: F().int().min(1).describe("Stop after this many rounds in a row that changed nothing.")
	}), ng = R({ designs: L(tg).describe("Saved loops: the machinery with the goal left out, so one design can be pointed at a different job every time.") }), rg = R({
		design: tg.describe("The design to write."),
		create: I().describe("Whether you mean to make a new one or replace an existing one, so an id that happens to collide cannot silently overwrite the one you had.")
	}), ig = R({ id: Y.describe("Which saved loop.") });
})), og, sg, cg, lg, ug, dg, fg, pg, mg, hg, gg, _g, vg, yg, bg, xg, Sg, Cg, wg, Tg, Eg, Dg, Og, kg, Ag, jg, Mg, Ng, Pg, Fg, Ig, Lg, Rg, zg, Bg, Vg = b((() => {
	K(), X(), ag(), og = V([
		"idle",
		"running",
		"awaiting",
		"stopping",
		"dismissing",
		"stopped",
		"resuming",
		"landing",
		"ready",
		"landed",
		"conflict",
		"error",
		"interrupted"
	]), sg = R({
		tool: P().optional().describe("The last tool it reached for."),
		target: P().optional().describe("What it reached for that tool with: a file, a command, a URL."),
		todo: P().optional().describe("The item on its own list that it is working through.")
	}), cg = R({
		done: F().describe("Items it has completed."),
		total: F().describe("Items on the list. Never zero: a conversation that kept no list carries no clause at all.")
	}), lg = R({
		plan: I().describe("It has proposed a plan and is waiting for a yes."),
		question: I().describe("It has asked you something."),
		permission: I().describe("It wants to use a tool it needs permission for."),
		capability: I().describe("It needs something connected that is not connected yet."),
		credential: I().describe("It is waiting for a named person to release a credential. The one pause that may not be yours to clear, whatever your role."),
		conflict: I().describe("Its work cannot be merged without somebody resolving a clash.")
	}), ug = R({
		at: F().describe("When the turn that left this ended, in milliseconds."),
		steps: R({
			open: F().describe("Items on it that were never completed."),
			total: F().describe("Items on the whole list."),
			next: P().optional().describe("The one it would have done next: what it was working through, or the first still waiting.")
		}).optional().describe("The agent's own checklist where that turn left it. Absent for a conversation that kept no list."),
		check: P().optional().describe("The end-of-turn check that was still failing when the turn ended, by name.")
	}), dg = R({
		subject: P().describe("One line saying what the merged work did, read off the code rather than off the opening request. A conversation that asks for an audit and then spends four turns fixing what it found needs a subject about the fixes."),
		note: P().optional().describe("The same change said to somebody who uses the product, for a repository that keeps a changelog. Usually absent, because most changes are not ones a user would notice."),
		breaking: P().optional().describe("What this change takes away, for anything already relying on it. Nearly always absent: it is for removals, not for additions.")
	}), fg = R({
		provider: P().min(1).describe("Which provider was asked."),
		model: P().min(1).describe("Which of its models."),
		status: V([
			"asking",
			"answered",
			"refused",
			"skipped"
		]).describe("How this one went. Skipped means it was not asked at all, because it refused a few minutes ago and the walk stepped over it."),
		at: F().optional().describe("When it started being asked, in milliseconds. Absent for one that was skipped, which cost no time."),
		ms: F().optional().describe("How long it took. Absent while it is still being asked."),
		reason: P().optional().describe("Why it refused, in its own words.")
	}), pg = R({
		startedAt: F().describe("When the drafting began, in milliseconds."),
		steps: L(fg).describe("Each model that was asked, in the order they were spent, so the list is the timeline. Empty with no outcome means the diff is still being read."),
		outcome: V(["written", "failed"]).optional().describe("How it ended. Absent means it is still going."),
		reason: P().optional().describe("The one-line account of a failure, for a screen with one line to spend. The steps carry each model's own words."),
		finishedAt: F().optional().describe("When it ended, in milliseconds.")
	}), mg = V([
		"workspace",
		"diverged",
		"binary"
	]), hg = R({
		id: P().describe("The conversation id, which is how every other call addresses it."),
		sessionId: P().optional().describe("The provider session behind the last turn. It is retired whenever the model or account changes."),
		title: P().optional().describe("What to call it: the first prompt cut to one line, unless somebody renamed it."),
		status: og.describe("What it is doing. Stopping and stopped are the two halves of somebody pressing stop, because a cancel is not instant; dismissing is the same window for a question waved away, which ends the turn too but owes the user nothing; resuming means the sandbox is already putting right whatever killed the turn; landing means its work is being carried into the workspace right now, and nothing may act on its branch until that settles."),
		failure: P().optional().describe("Why the last turn failed, in the words it died on. Absent unless it did, and cleared the moment it runs again. Carried here because the word error on its own is not an answer, least of all for a run nobody was watching."),
		failureCode: P().optional().describe("Which kind of failure it was, as the turn's own error frame coded it. Absent for a failure nothing could classify, which reads as the plain red line it is."),
		limitResetsAt: F().optional().describe("When the spent allowance reopens, in epoch seconds. Absent when the provider publishes no instant."),
		limitHeld: I().optional().describe("Whether the refused turn is held whole, so sending again re-runs it instead of appending to it."),
		limitScheduled: I().optional().describe("Whether the held turn is already booked to go again at the reset, so nobody has to press anything."),
		limitMoving: P().optional().describe("The account the held turn is being moved to by the owner's policy, while that move is booked."),
		provider: Ep.describe("Which model provider it runs on."),
		harness: Op.describe("Which agentic loop it runs on."),
		runner: P().optional().describe("The runner this conversation runs on. Absent means this sandbox."),
		startIn: P().optional().describe("Which folder it opened in, relative to the workspace root. Absent means the root."),
		actsAs: P().optional().describe("Which persona its first turn acted as. Absent for an ordinary chat."),
		model: P().optional().describe("What its last turn ran with. Kept per conversation so opening it restores the choices made in it, rather than whatever some other tab last picked."),
		effort: P().optional().describe("How hard that turn was told to think."),
		thinking: I().optional().describe("Whether that turn showed its reasoning."),
		fast: I().optional().describe("Whether that turn asked for higher speed. What was asked for, not what was served."),
		tier: V(["fast", "standard"]).optional().describe("How hard its last turn looked to the complexity judge. What the next turn's preview needs, not what actually ran."),
		tierHold: I().optional().describe("Whether this conversation is pinned to the picked model, so a turn that looks simple is never moved to a cheaper one."),
		account: P().optional().describe("Which connected account paid for it."),
		branch: P().optional().describe("The branch its private copy works on. Absent for a conversation that works directly in the shared tree."),
		autoLand: I().optional().describe("This conversation's own answer to whether its work merges automatically. Absent means it follows the sandbox-wide setting, which is the common case."),
		resumeAfterOutage: I().optional(),
		resumeAfterLimit: I().optional(),
		moveAfterLimit: I().optional(),
		landRequested: R({
			email: P().describe("Who asked."),
			name: P().optional().describe("Their display name."),
			at: F().describe("When they asked, in milliseconds.")
		}).optional().describe("A collaborator has asked a maintainer to merge this work. Cleared by whichever merge or discard answers it. Absent means nobody is waiting."),
		origin: Mp.optional().describe("Where the conversation came from when nobody typed it: a chat mention, a visitor's message, a webhook. Absent means a person started it."),
		startedBy: P().optional().describe("Who asked for the first turn, as the sandbox verified it: a member's email, or token:<label> for a program's control token. Absent when nothing was verified (a wake, a loopback caller)."),
		forkedFrom: Rp.optional().describe("The conversation this one was cut from. Recorded once and never cleared: it is the relationship, not a pending state."),
		base: P().optional().describe("The commit its private copy started from, shortened."),
		costUsd: F().optional().describe("What it has cost so far, in dollars. A subagent's spend is its own and is not folded in here."),
		inputTokens: F().optional().describe("Tokens sent."),
		outputTokens: F().optional().describe("Tokens received."),
		contextTokens: F().optional().describe("How much of the window the conversation currently fills."),
		contextWindow: F().optional().describe("How large that window is."),
		promptCache: R({
			at: F().describe("When its last request touched the provider's prompt cache, in milliseconds."),
			ttlMs: F().describe("How long that entry lives from `at`, in milliseconds.")
		}).optional().describe("When this conversation's prompt cache was last kept alive and how long it lasts, which together say when picking the conversation up stops being cheap. Absent when the provider publishes nothing to ground it on."),
		activity: sg.optional().describe("What it is doing at this moment."),
		checklist: cg.optional().describe("How far it is through its own checklist. Absent for a conversation that kept no list, which is most short ones."),
		landedMessageDraft: pg.optional().describe("The whole story of this merge's commit message being written: which models were asked, how long each took, what refused and in what words. Forgotten on restart, which is right, because a restart also killed the drafting it describes."),
		landedMessage: dg.optional().describe("What this conversation's merged work is called, once the drafting above has finished. It arrives on the same push that ends the draft, so the promise and the answer travel together."),
		startedAt: F().optional().describe("When the running turn started, in milliseconds. Absent when none is running."),
		updatedAt: F().describe("When it last did something, in milliseconds. Reading it does not count."),
		seenAt: F().optional().describe("When somebody last opened it, in milliseconds. Newer activity than this is what makes it unread. Kept by the sandbox rather than by a browser, so clearing site data or picking up a phone does not resurrect every badge."),
		attention: lg.describe("Which kinds of waiting-for-you it is doing."),
		conflictCauses: L(mg).optional().describe("Why its work will not merge, and so who can clear it: your own uncommitted edits, which only you can commit or stash, against a moved main line or an unmergeable binary, which the conversation can redo on its own copy. Absent unless it is refusing to merge."),
		unfinished: ug.optional().describe("What its last turn left open: steps it never completed, a check still failing. Absent for a turn that finished what it started."),
		turns: F().optional().describe("Turns it has finished."),
		toolUses: F().optional().describe("Tools it has used, over its whole life."),
		subagents: R({
			running: F().describe("Subagents working right now."),
			total: F().describe("Subagents it has started over its whole life.")
		}).optional().describe("Subagents and child agents this one delegated to. Absent means it never has, which is most conversations. Their spend is their own and is not folded into this conversation's cost."),
		diff: R({
			files: F().describe("Files touched."),
			insertions: F().describe("Lines added."),
			deletions: F().describe("Lines removed.")
		}).optional().describe("Everything it has written, measured from where it started. Independent of how much has been merged."),
		landedPresence: R({
			landed: F().describe("Paths this conversation merged in."),
			present: F().describe("How many of them are still there, either pending or committed.")
		}).optional().describe("Present only when some of what it merged has since been thrown away. Absent is the steady state: its presence is the signal, so an ordinary card spends no line on it."),
		loop: R({
			state: Zh.describe("How the loop is going."),
			iteration: F().int().min(0).describe("Which round it is on."),
			maxIterations: F().int().min(1).describe("How many rounds it will attempt before giving up."),
			goal: P().describe("What it is looping towards.")
		}).optional().describe("The loop driving this conversation, if one is. Absent for an ordinary conversation, which is nearly all of them."),
		workflow: R({
			runId: P().describe("The run this belongs to, which is how a board groups its steps together."),
			name: P().describe("The workflow's name."),
			step: P().describe("Which step this conversation is on now. It moves when steps are chained."),
			index: F().int().min(1).describe("This step's place in the workflow, counting from one."),
			total: F().int().min(1).describe("How many steps the workflow has.")
		}).optional().describe("The workflow run this conversation is a step of. Without it, a four-step run reads as four unrelated conversations that happen to have started together."),
		watches: L(R({
			id: P().describe("The daemon's handle for this watch, the same one the agent was given when it armed it."),
			note: P().describe("The agent's own line on what it is waiting for."),
			intervalSeconds: F().int().min(1).describe("How often the check runs."),
			deadlineAt: F().describe("When it gives up and wakes the conversation anyway, in milliseconds. Every watch has one.")
		})).optional().describe("Outside conditions this conversation is parked on, each of which will wake it. Absent means none, which is nearly every conversation: an armed watch is why a finished-looking agent starts working by itself, and why a hosted machine will not go idle."),
		archivedAt: F().optional().describe("When it was put away, in milliseconds. Nothing was lost: its branch, its record and every counter stayed, and bringing it back gives it a fresh working copy. Absent means it is live on the board.")
	}), gg = R({ id: P().min(1).describe("Which conversation.") }), _g = gg.extend({
		before: G().int().optional().describe("Return the messages before this position in the record: the `from` of the page below. Absent asks for the most recent turns."),
		turns: G().int().min(1).max(200).optional().describe("How many of the user's turns to return, newest first. Absent takes the daemon's default.")
	}), vg = R({ ids: L(P().min(1)).max(500).optional().describe("Which conversations to put away. Leave it out for every finished one that can be archived right now.") }), yg = R({ ids: L(P().min(1)).min(1).max(500).describe("Which conversations.") }), bg = R({
		moved: L(hg).describe("What actually moved, whole, rather than the fleet afterwards. Two archives finishing at once would each carry a snapshot from a different instant, and swapping one in wholesale would let the slower answer resurrect what the faster one just filed away."),
		rev: F().describe("The version of the fleet that includes this move, so a caller can hold its own optimistic change until it sees a list at least that new.")
	}), xg = bg.extend({ failed: L(R({
		id: P().describe("Which conversation stayed on the board."),
		reason: P().describe("Why its working copy could not be released, in the words the failure came with.")
	})).describe("The conversations this press could not put away, each with the reason, so the board can say it instead of reporting silence.") }), Sg = R({ removed: L(P()).describe("Which conversations were deleted, as ids. Ids rather than whole cards, because these no longer exist anywhere: there is nothing left to show and nothing to put back.") }), Cg = R({
		query: P().trim().min(2).describe("What to look for. Searched against what was said, both sides of the conversation, and nothing else: not the thinking, not the tool output, which between them name nearly every identifier in the workspace and would return most of the board."),
		caseSensitive: Vd().optional().describe("Whether capitals matter.")
	}), wg = V(["user", "agent"]), Tg = R({
		text: P().describe("The matching line, with a little either side of it."),
		speaker: wg.describe("Who said it. Carried with the words rather than beside them, because a line of the agent's prose under a card reads as something you typed until the row says otherwise.")
	}), Eg = R({
		id: P().describe("Which conversation matched."),
		snippet: Tg.optional().describe("Why, in its own words. Absent when the title was the match, which the card already shows: repeating it underneath is noise where evidence was wanted.")
	}), Dg = R({
		matches: L(Eg).describe("What matched, from the live fleet and the archive together."),
		scanned: F().describe("How many conversations were actually read, so a screen can say when a search saw less than everything rather than implying it saw all of it."),
		indexing: I().describe("Whether what was said is still being read in the background. True means this answer can still grow, so a screen must say it is incomplete rather than presenting it as the whole list.")
	}), Og = R({
		id: P().min(1).describe("Which conversation."),
		title: P().trim().min(1).max(80).describe("What to call it from now on.")
	}), kg = R({
		id: P().min(1).describe("Which conversation."),
		text: P().trim().min(1).max(8e3).describe("The words to put in the agent's mouth. Bounded just above what the next turn can carry whole, because a line too long to be handed over intact would reach the agent truncated and quietly break the very thing this is for.")
	}), Ag = R({
		id: P().min(1).describe("Which conversation."),
		autoLand: I().nullable().describe("Whether its work merges automatically when a turn finishes. Null clears the override and goes back to following the sandbox-wide setting, so a conversation does not sit holding a frozen copy of a default it has quietly stopped following.")
	}), jg = R({
		id: P().min(1).describe("Which conversation."),
		resumeAfterOutage: I().nullable().describe("Whether it retries by itself when the model provider was what failed. Null clears the override back to the sandbox-wide setting.")
	}), Mg = R({
		id: P().min(1).describe("Which conversation."),
		resumeAfterLimit: I().nullable().describe("Whether the turn a spent allowance refused is sent again by itself once the window reopens. Null clears the override back to the sandbox-wide setting.")
	}), Ng = R({
		id: P().min(1).describe("Which conversation."),
		moveAfterLimit: I().nullable().describe("Whether the turn a spent allowance refused is moved to another connected account of the same provider that has room, as soon as the refusal lands. Null clears the override back to the sandbox-wide setting.")
	}), Pg = R({
		id: P().min(1).describe("Which conversation."),
		repo: P().min(1).describe("Which repository."),
		path: P().min(1).describe("Which file, relative to that repository.")
	}), Fg = R({
		path: P().describe("Which file."),
		reason: mg.describe("Why it would not merge, and the three have nothing in common but the symptom. Your own uncommitted edits on that path, where yours is the copy at risk. The shared tree having moved under the conversation since it started, where nothing of yours is at risk. Or a file git cannot merge at all, where no automatic answer exists.")
	}), Ig = R({
		repo: P().describe("Which repository."),
		paths: L(Fg).describe("The files that genuinely would not apply. Not the whole change: reporting everything whenever the cause could not be pinned down turned four real conflicts into a wall of fourteen."),
		clean: F().describe("How many files in this repository passed but remain held with the refused composition. Zero alongside an empty list means the repository could not be reached at all."),
		mainBranch: P().optional().describe("The branch your own checkout is on, which is what the conversation has to rebase onto. Carried because only the sandbox can see it. Absent where there is no name to give.")
	}), Lg = R({
		landed: I().describe("Whether the entire composed change was applied."),
		conflicts: L(Ig).optional().describe("What stopped the whole composed change, grouped per repository."),
		resolving: L(R({
			repo: P().describe("Which repository."),
			paths: L(P()).describe("Which files now hold conflict markers to sort out by hand.")
		})).optional().describe("Files left half-merged when you asked to carry the whole composition with its conflicts marked for resolution."),
		held: I().optional().describe("Nothing was applied and nothing failed: there is work waiting on the branch for a deliberate merge. Not merged on its own cannot say that, because on its own it means refused.")
	}), Rg = V([
		"check",
		"merge",
		"measure"
	]), zg = V(["cumulative", "outstanding"]), Bg = R({
		id: P().min(1).describe("Which conversation's work to merge."),
		mode: Rg.optional().describe("How to apply it. The default applies every repository or none, so a refusal leaves the workspace exactly as it was. The other carries the whole composition and leaves conflicted paths with markers to resolve by hand."),
		span: zg.optional().describe("How much of the work to take. Leave it out for everything not yet merged."),
		force: I().optional().describe("Go ahead despite a check that would otherwise refuse.")
	});
})), Hg, Ug = b((() => {
	K(), Hg = R({
		status: V([
			"allowed",
			"allowed_warning",
			"rejected"
		]),
		resetsAt: F().optional(),
		rateLimitType: P().optional(),
		utilization: F().optional()
	});
})), Wg, Gg = b((() => {
	K(), Wg = V([
		"off",
		"cooldown",
		"on"
	]);
})), Kg, qg, Jg, Yg, Xg, Zg, Qg, $g, e_, t_, n_, r_, i_, a_, o_, s_ = b((() => {
	K(), Kg = R({
		name: P().describe("Its id, and what the close route takes."),
		label: P().optional().describe("What to call it on screen."),
		kind: V([
			"shell",
			"panel",
			"agent",
			"job",
			"process"
		]).describe("What sort of thing it is: a terminal somebody opened, a repository's dev server, where an agent's commands run, a job the sandbox started, or a background process that is watched rather than typed into."),
		running: I().describe("Whether it is alive. A finished one-shot job leaves a dead shell behind, which reads as false and is how it gets swept up."),
		activityAt: F().describe("When it last produced output, in milliseconds. Zero means it did not say, which is unknown rather than 1970."),
		exitCode: F().optional().describe("How the last thing in it ended. Absent while that pane is still alive."),
		command: P().optional().describe("What is running in it right now. Absent when it is sitting at a prompt. Not a second spelling of whether it is alive: this says whether anything is happening, which is what a close button should ask about before it ends something."),
		extensionId: P().optional().describe("Which extension declared this process, when one did."),
		processName: P().optional().describe("Which of that extension's processes it is, which together with the id above addresses its start and stop routes."),
		help: R({
			requestId: P().describe("What to send back when you answer, through the agent reply route."),
			message: P().describe("What the agent needs, in its own words."),
			requestedAt: F().describe("When it asked, in milliseconds.")
		}).optional().describe("The agent has stopped at something only a person can clear, and is waiting at this terminal. Present only while it is waiting.")
	}), qg = R({ sessions: L(Kg).describe("Every live surface the sandbox is holding, in one list, because the question they all answer is the same one.") }), Jg = R({ name: P().describe("Which terminal.") }), Yg = R({
		name: P().describe("Which terminal."),
		lines: G().min(1).max(1e5).default(2e4).describe("How far back to ask for. Clamped to the history that actually exists.")
	}), Xg = R({
		name: P().describe("Which terminal this is from."),
		text: P().describe("The history, oldest line first, with wrapped lines rejoined so a copied address or path comes back whole."),
		lines: F().describe("How many lines you got."),
		truncated: I().describe("It stopped because you asked for that many, not because the history ran out.")
	}), Zg = R({
		id: P().describe("Stable for the life of the page, which is what lets a tab survive a refresh of this list. Its address changes as the agent navigates and its position changes when a sibling closes."),
		title: P().optional().describe("The page's title. Absent mid-navigation, which is exactly when a tab still has to be drawn."),
		url: P().describe("Where it is."),
		active: I().describe("The one the agent last touched, or for a finished session, the one it ended on. Exactly one page has this.")
	}), Qg = R({
		name: P().describe("Its id, and what the close route takes."),
		label: P().describe("What to call it on screen: the open page's title, or its site, or which browser this is."),
		server: P().describe("Which browser drives it: the credential-free one, or a signed-in account's. The difference between a throwaway page and one logged in as you, which is worth saying out loud."),
		running: I().describe("Whether it is still open. A closed one is listed for a while with the pages it had, as the record of where the agent went."),
		activityAt: F().describe("When it last did anything, in milliseconds."),
		finishedAt: F().optional().describe("When it closed, in milliseconds. Absent while it is open."),
		help: R({
			requestId: P().describe("What to send back when you answer, through the agent reply route."),
			message: P().describe("What the agent needs, in its own words."),
			requestedAt: F().describe("When it asked, in milliseconds.")
		}).optional().describe("The agent has hit something only a person can clear: a captcha, a password it does not hold, a check on your phone. Present only while it is waiting."),
		pages: L(Zg).describe("Every page it has open. A browser holds several at once, which is the reason it is listed apart from the terminals.")
	}), $g = R({ sessions: L(Qg).describe("Every browser the agents have running, open or recently closed.") }), e_ = R({ name: P().describe("Which browser.") }), t_ = V(["subagent", "spawned"]), n_ = V([
		"pending",
		"running",
		"blocked",
		"completed",
		"failed",
		"killed",
		"paused"
	]), r_ = R({
		state: V([
			"verified",
			"unproven",
			"failing",
			"no-code"
		]).describe("Whether anything proved its work: a check passed after its last edit, it changed code and nothing checked it, a check ran and failed, or it changed no code at all."),
		paths: L(P()).optional().describe("The code files it changed, most recent last. The first few; the record holds the rest."),
		check: P().optional().describe("The command that spoke: the one that cleared it, or the one that failed. Named rather than summarised, so a targeted test is not read as the whole suite.")
	}), i_ = R({
		id: P().describe("The id of the tool call that started it (an SDK child) or the child's own conversation id (a spawned one); either way both sides already hold it, so a card links to its subagent with the id it has and the subagent points back the same way."),
		kind: t_.describe("What sort of subagent: one the runtime's own Task tool spawned in-process, or a full child agent the daemon started for the turn. It changes only how you watch it."),
		conversationId: P().describe("The conversation whose turn started it, and the way back to the chat it belongs to."),
		agentType: P().optional().describe("What kind of subagent it is."),
		description: P().optional().describe("What it was asked to do, in one line."),
		model: P().optional().describe("Which model it runs on."),
		provider: P().optional().describe("Which provider serves it, for a child agent spawned across providers."),
		spawnDepth: F().optional().describe("How deep in the chain it sits, where one means the turn itself started it. A subagent can start subagents, and a flat list that could not say so would read as though the turn started all of them."),
		background: I().optional().describe("The parent carried on working instead of waiting for it. This is the whole reason the list exists: such a subagent used to be invisible until its result landed, sometimes minutes later."),
		status: n_.describe("How it is going. Blocked means it needs an answer, which a parent and an operator act on differently from it simply working."),
		startedAt: F().describe("When it started, in milliseconds."),
		endedAt: F().optional().describe("When it finished, in milliseconds. Absent while it works."),
		activityAt: F().describe("When it last did anything, in milliseconds."),
		tokens: F().optional().describe("What it has spent. Its own, so a parent's cost and the sum of its subagents' are two different true numbers."),
		toolUses: F().optional().describe("How many tools it has used."),
		lastTool: P().optional().describe("The last one it reached for."),
		summary: P().optional().describe("Its report: what it concluded, without opening its record. The question a finished subagent gets read for."),
		error: P().optional().describe("Why it failed, when it did."),
		verification: r_.optional().describe("Whether anything proved the work its report describes.")
	}), a_ = R({ sessions: L(i_).describe("Every subagent and child agent this sandbox's conversations have started.") }), o_ = R({ id: P() });
})), c_, l_, u_, d_, f_, p_, m_ = b((() => {
	K(), c_ = V(["messages", "everything"]), l_ = R({
		id: P().describe("The share's own id, minted fresh each time, so sharing one conversation twice gives two links. Deliberately not the conversation's id, which is memorable by design and would make a page's address guessable."),
		conversationId: P().describe("Which conversation it was taken from."),
		title: P().describe("The title on the page, which is the sharer's choice rather than the conversation's own."),
		detail: c_.describe("How much travels: the two speakers' words alone, or the whole record including the agent's work and thinking, which necessarily publishes the code and command output in it."),
		sharedAt: F().describe("When the snapshot was taken, in milliseconds. A share is frozen, so this dates what a recipient can see rather than when the conversation happened."),
		messages: F().describe("How many messages are behind the link."),
		url: P().optional().describe("The page's address. Absent on a sandbox with nowhere to publish to.")
	}), u_ = R({ shares: L(l_).describe("Every conversation currently published as a page.") }), d_ = R({
		conversationId: P().min(1).describe("Which conversation to publish."),
		title: P().min(1).max(80).describe("The title for the page. The conversation's own name is only what a dialog would open with."),
		detail: c_.describe("How much to publish. Two levels rather than a set of switches, because every extra toggle is another thing to get wrong about a link that cannot be recalled.")
	}), f_ = R({ id: P().min(1).describe("Which share to re-take. Its link stays the same, which matters because it has already been sent.") }), p_ = R({ id: P().min(1).describe("Which share to take down.") });
})), h_, g_, __, v_, y_, b_, x_, S_, C_, w_, T_, E_, D_, O_, k_, A_, j_, M_, N_, P_, F_, I_, L_, R_ = b((() => {
	K(), X(), m_(), s_(), Nh(), h_ = V([
		"pending",
		"approved",
		"rejected",
		"cancelled"
	]), g_ = V([
		"pending",
		"answered",
		"cancelled"
	]), __ = V([
		"pending",
		"allowed",
		"always",
		"denied",
		"cancelled"
	]), v_ = V([
		"pending",
		"helped",
		"declined",
		"cancelled"
	]), y_ = V([
		"pending",
		"approved",
		"skipped",
		"cancelled"
	]), b_ = V([
		"pending",
		"connecting",
		"skipped",
		"cancelled"
	]), x_ = R({
		...yh,
		status: h_.describe("Where the decision stands.")
	}), S_ = R({
		...bh,
		status: g_.describe("Where the answer stands."),
		answers: B(P(), L(P())).optional().describe("What was chosen, keyed by the question, with the chosen labels or the user's own words.")
	}), C_ = ih.extend({
		...xh,
		status: __.describe("Where the decision stands.")
	}), w_ = R({
		...Sh,
		status: v_.describe("How the hand-over ended.")
	}), T_ = R({
		...Ch,
		status: v_.describe("How the hand-over ended.")
	}), E_ = R({
		...wh,
		status: b_.describe("Where the decision stands."),
		outcome: Dh.optional().describe("How an accepted ask's setup ended (the capability_outcome frame).")
	}), D_ = R({
		...Th,
		status: y_.describe("Where the decision stands."),
		receipt: Oh.optional().describe("How the approved payment ended (the payment_receipt frame).")
	}), O_ = R({
		...Eh,
		status: y_.describe("Where the decision stands."),
		receipt: kh.optional().describe("Who released it, or that somebody refused (the credential_receipt frame).")
	}), k_ = Bu(() => R({
		id: P().describe("The call's id."),
		name: P().describe("Which tool."),
		category: ph.describe("What kind of thing it does: read, edit, delete, move, search, run, think, fetch. Named the same way whatever the backend called the tool."),
		status: mh.describe("How it went."),
		target: P().optional().describe("What it acted on, in one line: a file, a command, an address."),
		locations: L(hh).optional().describe("The files it touched."),
		content: L(gh).optional().describe("What it produced: text, a change to a file, or a picture."),
		children: L(k_).optional().describe("Calls a delegated subagent made, nested under the call that started it, so a reopened conversation redraws the delegation rather than collapsing it into one result."),
		thinking: P().optional().describe("What the agent was reasoning about around this call."),
		subagent: A_.optional().describe("The helper this call started, as the daemon's registry sees it: what it is, how it is going, what it has spent. What a card can say about a backgrounded child whose result is minutes away.")
	})), A_ = R({
		kind: t_,
		agentType: P().optional(),
		description: P().optional(),
		model: P().optional(),
		provider: P().optional(),
		background: I().optional(),
		status: n_,
		tokens: F().optional(),
		toolUses: F().optional(),
		lastTool: P().optional(),
		summary: P().optional(),
		error: P().optional(),
		verification: r_.optional()
	}), j_ = R({
		title: P().describe("The one line a reader sees, on a row that opens to the text below."),
		text: P().describe("The note itself, which is also exactly what the model was told.")
	}), M_ = R({
		costUsd: F().optional(),
		inputTokens: F().optional(),
		outputTokens: F().optional(),
		durationMs: F().optional(),
		numTurns: F().optional()
	}), N_ = R({
		role: V([
			"user",
			"assistant",
			"notice"
		]).describe("Who said it. A notice is neither side: it is something that happened to the turn, recorded so a reopened conversation can say it. Without those, a turn a provider refused ends on the user's message and reads as broken."),
		text: P().describe("The words."),
		sentAt: F().optional().describe("When it was sent, in milliseconds. On the user's rows only, because that is the only moment actually known: a turn's own frames arrive with no clock, so stamping the agent's rows could only ever mean the whole turn's start or end."),
		attachments: L(P()).optional().describe("Files attached to this message, as workspace paths."),
		checkpointId: P().optional().describe("The saved point this message can be rewound to. Looked up on each read rather than stored, so what is offered is exactly what is still there to go back to."),
		rewindIndex: F().int().nonnegative().optional().describe("This message's position in the conversation's record, which is how a rewind names it. Present only beside a checkpoint."),
		thinking: P().optional().describe("What the agent was reasoning about."),
		tools: L(k_).optional().describe("The tool calls this part of the turn made."),
		todos: L(dh).optional().describe("The agent's task checklist, as of this bubble."),
		usage: M_.optional().describe("What the turn cost, on the bubble its answer ended in."),
		notes: L(j_).optional().describe("What the sandbox added to this message before the model saw it. Carried on the message rather than as rows of their own, because they genuinely were part of what was sent."),
		placed: I().optional().describe("A person wrote this in the agent's voice, with no turn behind it. Marked for the human re-reading the conversation months later, so their own words do not pass as the agent's. The agent itself never sees the mark."),
		noticeAction: V([
			"landHold",
			"outageOptOut",
			"depsInstall",
			"tierHold"
		]).optional().describe("A one-press follow-up this notice offers, by name. The chat decides what it does and whether it still applies."),
		noticeWait: V(["credentialRenewal", "personaRoute"]).optional().describe("The wait this notice describes, by name, so a reader can say whether it is still on."),
		plan: x_.optional().describe("The plan this row asked approval for, and the answer."),
		question: S_.optional().describe("The questions this row asked, and the picks that answered them."),
		permission: C_.optional().describe("The tool this row asked permission for, and the decision."),
		browserHelp: w_.optional().describe("The browser hand-over this row asked for, and how it ended."),
		terminalHelp: T_.optional().describe("The terminal hand-over this row asked for, and how it ended."),
		capabilityOffer: E_.optional().describe("The capability setup this row asked for, the decision, and the outcome."),
		paymentOffer: D_.optional().describe("The payment this row asked for, the decision, and the receipt."),
		credentialOffer: O_.optional().describe("The gated credential this row asked to use, who may release it, and who did.")
	}), P_ = z("op", [
		R({
			op: H("append").describe("A new row at the end."),
			row: N_
		}),
		R({
			op: H("replace").describe("This row, whole, in place of the one at that index."),
			index: F().int().nonnegative(),
			row: N_
		}),
		R({
			op: H("drop").describe("The row at that index is gone: it was opened and never written into."),
			index: F().int().nonnegative()
		}),
		R({
			op: H("text").describe("More of the agent's prose, onto that row's text."),
			index: F().int().nonnegative(),
			text: P()
		}),
		R({
			op: H("thinking").describe("More of the agent's reasoning, onto that row's thinking."),
			index: F().int().nonnegative(),
			text: P()
		}),
		R({
			op: H("tool").describe("A tool card, whole: new, or the latest state of one already there, matched by id wherever it nests."),
			index: F().int().nonnegative(),
			tool: k_,
			parent: P().optional().describe("The card this one nests under, when it is a delegated subagent's own call.")
		})
	]), F_ = R({ messages: L(N_).describe("The conversation, in order. Each block of the agent's prose is its own message with the tools that block introduced, which is what reproduces the way it actually unfolded.") }), I_ = R({
		reason: V([
			"stopped",
			"limit",
			"outage"
		]).describe("Which ending left the work here: a Stop or a daemon killed under the turn, a spent usage allowance, or a provider that refused it."),
		resetsAt: F().optional().describe("When the spent allowance reopens, in epoch seconds. Absent for every ending that names no instant, and for a provider that publishes none."),
		held: R({
			ran: I().describe("Whether the held turn got anywhere before it was refused, which is a different sentence from one refused at the door."),
			contextTokens: F().optional().describe("How much context a press that keeps the session re-reads once, on this account at the reset or carried to another. Absent when no usage frame measured it."),
			handoffTokens: F().optional().describe("What a press that opens a fresh session pays instead: the capped record plus the sandbox's measured brief, counted at the failure."),
			moving: P().optional().describe("The account the owner's policy is already moving this turn to, when it is; the surface then reports the move rather than offering a press.")
		}).optional().describe("Present when the daemon still holds the refused turn whole, so a press re-runs it rather than appending a message after it."),
		scheduled: I().optional().describe("Whether something other than the user is already booked to send this turn again, so the surface reports the wait instead of offering a press.")
	}), L_ = F_.extend({
		sessionId: P().optional().describe("The provider session behind the last turn, when there is one."),
		provider: Ep.optional().describe("Which provider minted that session."),
		harness: Op.optional().describe("Which runtime minted it: a session resumes only on the loop that opened it."),
		account: P().optional().describe("Which stored account it belongs to, as the daemon resolved it. Absent when no stored account paid for the turn."),
		ending: I_.optional().describe("How the last turn ended, when it left work behind that one press finishes. Absent for a conversation whose last turn ended on its own, and for the failures that name something to repair first."),
		from: F().int().nonnegative().describe("Where the first message sits in the whole record, and the `before` that asks for the page above this one."),
		more: I().describe("Whether older messages precede this page.")
	}), R({
		title: P(),
		sharedAt: F(),
		detail: c_,
		messages: L(N_)
	});
})), z_, B_, V_, H_, U_, W_ = b((() => {
	K(), X(), Vg(), Ug(), Gg(), am(), s_(), Nh(), R_(), z_ = z("kind", [
		R({
			kind: H("session"),
			sessionId: P(),
			account: P().optional().describe("Which stored account this session belongs to, as the daemon resolved it for the turn.")
		}),
		R({
			kind: H("worktree"),
			branch: P(),
			base: P(),
			unenforced: I().optional(),
			sync: R({
				commits: F(),
				blocked: L(P())
			}).optional(),
			remote: P().optional()
		}),
		R({
			kind: H("landed"),
			landed: I(),
			conflicts: L(Ig).optional(),
			held: I().optional(),
			deps: R({
				missing: F(),
				started: L(P()),
				deferred: I()
			}).optional()
		}),
		R({
			kind: H("preamble"),
			notes: L(j_)
		}),
		R({
			kind: H("init"),
			model: P()
		}),
		R({
			kind: H("checkpoint"),
			id: P(),
			index: F().int().nonnegative().optional()
		}),
		R({
			kind: H("steer"),
			text: P(),
			sentAt: F(),
			attachments: L(P()).optional()
		}),
		R({
			kind: H("delta"),
			text: P(),
			parentToolUseId: P().optional()
		}),
		R({
			kind: H("text_end"),
			parentToolUseId: P().optional()
		}),
		R({
			kind: H("thinking"),
			text: P(),
			parentToolUseId: P().optional()
		}),
		R({
			kind: H("tool_call"),
			id: P(),
			name: P(),
			category: ph,
			status: mh,
			target: P().optional(),
			locations: L(hh).optional(),
			content: L(gh).optional(),
			parentToolUseId: P().optional()
		}),
		R({
			kind: H("tool_call_update"),
			id: P(),
			status: mh.optional(),
			content: L(gh).optional(),
			locations: L(hh).optional()
		}),
		R({
			kind: H("terminal"),
			session: P()
		}),
		R({
			kind: H("browser"),
			session: P()
		}),
		R({
			kind: H("subagent"),
			id: P(),
			subagentKind: t_,
			agentType: P().optional(),
			description: P().optional(),
			model: P().optional(),
			provider: P().optional(),
			background: I().optional()
		}),
		R({
			kind: H("subagent_update"),
			id: P(),
			status: n_.optional(),
			tokens: F().optional(),
			toolUses: F().optional(),
			lastTool: P().optional(),
			summary: P().optional(),
			error: P().optional(),
			verification: r_.optional()
		}),
		R({
			kind: H("todos"),
			items: L(dh)
		}),
		R({
			kind: H("commands"),
			items: L(ch)
		}),
		R({
			kind: H("usage"),
			account: P().optional(),
			costUsd: F().optional(),
			inputTokens: F().optional(),
			outputTokens: F().optional(),
			cacheReadTokens: F().optional(),
			cacheCreationTokens: F().optional(),
			durationMs: F().optional(),
			numTurns: F().optional()
		}),
		Hg.extend({
			kind: H("rate_limit_info"),
			account: P().optional()
		}),
		R({
			kind: H("fast_mode"),
			state: Wg,
			reason: P().optional()
		}),
		R({
			kind: H("tier"),
			tier: V(["fast", "standard"]),
			score: F(),
			rules: L(P()),
			model: P().optional(),
			routed: I(),
			held: I().optional()
		}),
		R({
			kind: H("provider_retry"),
			attempt: F(),
			maxAttempts: F().optional(),
			nextAttemptAt: F().optional(),
			status: F().optional()
		}),
		R({
			kind: H("account_usage"),
			account: P().optional(),
			windows: L(Kp)
		}),
		fh.extend({ kind: H("context_usage") }),
		R({
			kind: H("compact"),
			trigger: P(),
			preTokens: F().optional(),
			postTokens: F().optional()
		}),
		Ah,
		jh,
		Mh,
		R({
			kind: H("browser_help"),
			...Sh
		}),
		R({
			kind: H("terminal_help"),
			...Ch
		}),
		R({
			kind: H("capability_offer"),
			...wh
		}),
		Dh.extend({
			kind: H("capability_outcome"),
			requestId: P()
		}),
		R({
			kind: H("payment_offer"),
			...Th
		}),
		Oh.extend({
			kind: H("payment_receipt"),
			requestId: P()
		}),
		R({
			kind: H("credential_offer"),
			...Eh
		}),
		kh.extend({
			kind: H("credential_receipt"),
			requestId: P()
		}),
		R({
			kind: H("resolved"),
			requestId: P(),
			reply: em.optional()
		}),
		R({
			kind: H("mode"),
			mode: Lp
		}),
		R({
			kind: H("error"),
			message: P(),
			code: V([
				"session-not-found",
				"rate_limit",
				"codex-advisory",
				"codex-reauth",
				"claude-reauth",
				"claude-token-refused",
				"claude-not-entitled",
				"provider-outage",
				"trial-unavailable",
				"trial-model-unavailable",
				"trial-exhausted",
				"unknown-command",
				"grok-model-invalid",
				"codex-model-invalid",
				"model-unavailable",
				"context-window-too-small",
				"subscription-required",
				"agent-busy",
				"sandbox-memory-low",
				"turn-cap",
				"harness-incomplete",
				"engine-version-floor"
			]).optional(),
			engine: R({
				id: P().describe("Which engine (e.g. claude)."),
				running: P().optional().describe("The version that was refused, when the provider named it."),
				floor: P().describe("The lowest version the provider will accept.")
			}).optional(),
			resetsAt: F().optional(),
			autoResume: V(["scheduled", "available"]).optional(),
			held: R({
				ran: I(),
				contextTokens: F().optional(),
				handoffTokens: F().optional(),
				moving: P().optional()
			}).optional(),
			outage: R({
				retryAt: F(),
				attempt: F(),
				maxAttempts: F()
			}).optional()
		}),
		R({ kind: H("done") })
	]), B_ = [
		"session",
		"worktree",
		"init",
		"terminal",
		"browser",
		"commands",
		"usage",
		"rate_limit_info",
		"fast_mode",
		"tier",
		"provider_retry",
		"account_usage",
		"context_usage",
		"mode",
		"error"
	], V_ = z_.options.filter((e) => B_.includes(e.shape.kind.value)), H_ = z("kind", V_), U_ = z("kind", [
		R({
			kind: H("attached").describe("The first frame, identifying the run you have joined and handing you its transcript so far."),
			run: P().describe("The run's id."),
			startedAt: F().describe("When it started, in milliseconds, so a window joining late can show how long it has been going."),
			seq: F().describe("How many frames the run has produced so far. A fact at or below this number is being replayed; a patch is never."),
			rows: L(N_).describe("The turn's rows as they stand: what was asked, and everything the agent has said and done since. Draw these, then apply the patches that follow.")
		}),
		R({
			kind: H("patch").describe("One change to the run's rows."),
			seq: F().describe("Its position in the run, counting from one."),
			patch: P_
		}),
		R({
			kind: H("fact").describe("One thing about the turn that is not a row: its session, its branch, its cost, a failure."),
			seq: F().describe("Its position in the run, counting from one. At or below the head's number, it is being replayed."),
			fact: H_
		}),
		R({ kind: H("end").describe("The run is over and every frame has been delivered. A stream that closes without this was dropped mid-run, so re-attach rather than assuming the turn finished.") })
	]);
})), G_, K_, q_, J_, Y_, X_, Z_, Q_, $_, ev, tv, nv = b((() => {
	K(), G_ = V([
		"turn",
		"interval",
		"pre-restore",
		"restore",
		"user"
	]), K_ = R({
		id: P().describe("The saved point's id, which is what restoring and diffing take."),
		at: F().describe("When it was taken, in milliseconds."),
		trigger: G_.describe("What caused it. The automatic between-turn captures are a safety net and are not listed; they dissolve into the next visible point's differences."),
		label: P().optional().describe("What to call it. For one taken before a turn, that turn's prompt.")
	}), q_ = R({ snapshots: L(K_).describe("Every point you can go back to, newest first.") }), J_ = R({
		conversationId: P().min(1).describe("Which conversation to rewind."),
		index: F().int().nonnegative().describe("Which message to go back to, counting from the start. It is also how many messages survive: rewinding to the first keeps none of them and puts the files back to before it ran.")
	}), Y_ = R({
		snapshot: P().optional().describe("The saved point the files were put back to. Absent for a conversation working in its own copy, whose rewind moved a branch rather than the shared timeline."),
		dropped: F().int().nonnegative().describe("How many messages were removed.")
	}), X_ = R({ id: P().min(1).describe("Which saved point.") }), Z_ = R({
		scope: P().describe("Which part of the workspace the path belongs to: the workspace root, or one of the repositories inside it."),
		path: P().describe("The path, relative to that scope."),
		status: V([
			"added",
			"modified",
			"deleted",
			"type-changed"
		]).describe("What happened to it.")
	}), Q_ = R({ changes: L(Z_).describe("Everything that differs between this saved point and the one before it.") }), $_ = R({
		id: P().min(1).describe("Which saved point."),
		scope: P().min(1).describe("Which part of the workspace the path belongs to."),
		path: P().min(1).describe("The file, relative to that scope.")
	}), ev = R({
		beforeBytes: F().int().nonnegative().optional().describe("How big the before side is, in bytes. Absent when the file did not exist yet."),
		afterBytes: F().int().nonnegative().optional().describe("How big the after side is, in bytes. Absent when the file was deleted."),
		patch: P().optional().describe("The changed regions as unified-diff hunks (`@@` sections only). Absent when the change was too large to render even as a patch."),
		more: I().optional().describe("There were more changed regions than fit; the patch stops at a region boundary.")
	}), tv = R({
		before: P().optional().describe("The whole file as it was. Absent when it did not exist yet, or when `partial` is set."),
		after: P().optional().describe("The whole file as it is now. Absent when it was deleted, or when `partial` is set."),
		binary: I().optional().describe("The file is not text, so neither side is sent."),
		partial: ev.optional().describe("Set when the file was too large to send whole: what is sent instead of the two sides.")
	});
})), rv, iv = b((() => {
	J(), Nh(), W_(), X(), nv(), am(), $(), rv = {
		run: q.route({
			method: "POST",
			path: "/agent",
			summary: "Say something to an agent",
			description: "Starts a turn and answers immediately with its id; the work runs inside the sandbox whether or not anybody stays connected. Watch it by attaching. Naming a conversation that does not exist yet opens it."
		}).input(zp).output(Up),
		attach: q.route({
			method: "POST",
			path: "/agent/attach",
			summary: "Watch a turn happen",
			description: "Streams everything the agent does: its words, the tools it reaches for, and the answers it gets. Give it the point you have already seen and it replays from there before going live, so a reload loses nothing. The window that started the turn holds no special claim, and any number of watchers on any number of devices see the same thing."
		}).input(Wp).output(Jf(U_)),
		reply: q.route({
			method: "POST",
			path: "/agent/reply",
			summary: "Answer a question the agent asked",
			description: "Un-parks a turn that is waiting on you: approving a plan, choosing between options, or permitting a tool. The turn picks up where it stopped."
		}).input(em).output(Z),
		steer: q.route({
			method: "POST",
			path: "/agent/steer",
			summary: "Interrupt a running turn",
			description: "Slips a message into a turn already under way, without stopping it. This is how you redirect an agent mid-thought rather than waiting for it to finish being wrong."
		}).input(tm).output(Z),
		stop: q.route({
			method: "POST",
			path: "/agent/stop",
			summary: "Stop a turn now",
			description: "Cancels the running turn inside the sandbox. Whatever it had already written to disk stays written."
		}).input(nm).output(Z),
		resume: q.route({
			method: "POST",
			path: "/agent/resume",
			summary: "Run a refused turn again",
			description: "Sends the same turn again when the model provider's allowance refused it, with everything it originally carried except who serves it: the caller may name a different provider, harness or account, which is the usual answer to a spent allowance. It repeats the request rather than adding a new message to the conversation, so pressing it twice costs nothing and the agent is never told to continue work it has not started."
		}).input(im).output(Up),
		rewind: q.route({
			method: "POST",
			path: "/agent/rewind",
			summary: "Go back to an earlier message",
			description: "Puts the files back as they stood at that point, drops every message after it, and forgets what the model remembered, so the next thing you say starts from there cleanly. Refused while a turn is running, because a restore cannot overwrite files an agent is editing, and refused for a message with no saved state to return to."
		}).input(J_).output(Y_),
		commands: q.route({
			method: "GET",
			path: "/agent/commands",
			summary: "Shortcut commands the agent knows",
			description: "The commands a provider published the last time one of its turns ran, so a composer can offer them before this conversation has run anything. A running turn's own list wins over this one."
		}).input(lh).output(uh),
		refusals: q.route({
			method: "GET",
			path: "/agent/refusals",
			summary: "The last time each provider said no",
			description: "What each model provider most recently refused and why. Read this alongside an account's usage: the usage says how full it was when last checked, this says whether it has since started turning work away."
		}).output(Zp)
	};
})), av, ov, sv, cv, lv, uv, dv, fv, pv, mv, hv, gv, _v, vv, yv, bv, xv, Sv = b((() => {
	K(), Tp(), av = V([
		"crash",
		"report",
		"detection"
	]), ov = R({
		at: F().describe("When, in milliseconds."),
		kind: P().max(40).describe("What sort of thing it was: a console line, a request, a click, a route change."),
		message: P().max(300).describe("What it said, already truncated by the SDK.")
	}), sv = R({
		email: P().max(320).optional().describe("An address they typed, to reach them about it. Unverified."),
		name: P().max(200).optional().describe("A name they typed. Unverified, and never identity.")
	}), cv = 20, lv = B(P().max(60), P().max(300)).refine((e) => Object.keys(e).length <= cv, { message: `at most ${cv} context entries` }), uv = R({
		kind: av.describe("A crash the SDK caught, something a person wrote in, or a problem the SDK noticed on its own."),
		message: P().min(1).max(1e3).describe("The error's own message, or the headline of what a person reported."),
		stack: P().max(2e4).optional().describe("The stack, verbatim from the browser."),
		url: P().max(2e3).optional().describe("Where it happened: the page's address, or a screen name in an app."),
		release: P().max(200).optional().describe("Which build it came from: a commit sha or a tag. With it the agent reads your real source rather than minified frames."),
		userAgent: P().max(400).optional().describe("What the browser said it was."),
		description: P().max(5e3).optional().describe("What the person typed, when a person is the one reporting."),
		reporter: sv.optional().describe("Who says they are reporting it. Unverified by construction."),
		breadcrumbs: L(ov).max(40).optional().describe("What happened just before, oldest first."),
		context: lv.optional().describe("Whatever else the app attached: a route, a version, a locale."),
		fingerprint: P().max(200).optional().describe("Group by this instead of by the stack, when your app knows better than the stack does.")
	}), R({
		report: uv,
		clientId: P().min(1).max(200).describe("The SDK's own id for this browser. Not a secret: it is what the rate limit counts against."),
		powNonce: P().max(400).optional(),
		key: P().max(200).optional()
	}), dv = V([
		"open",
		"investigating",
		"resolved",
		"ignored"
	]), fv = R({
		conversationId: P().describe("The conversation this run became."),
		at: F().describe("When it started, in milliseconds."),
		atCount: F().describe("How many times it had happened when this run started.")
	}), pv = R({
		kind: av,
		title: P().min(1).max(300).describe("The one line this is listed under."),
		culprit: P().max(300).optional().describe("The frame it came from, when the stack named one."),
		automationId: Y.describe("Which intake received it."),
		origin: P().max(400).optional().describe("Which site it came from."),
		firstSeen: F().describe("When it first happened, in milliseconds."),
		lastSeen: F().describe("When it last happened, in milliseconds."),
		count: F().describe("How many times this exact thing has arrived."),
		status: dv.default("open").describe("Where it stands with you."),
		statusAt: F().optional().describe("When the status last changed, in milliseconds."),
		release: P().max(200).optional().describe("The build the latest one came from."),
		sample: uv.describe("The most recent one, in full."),
		firedAt: F().optional().describe("What the count stood at the last time this woke an agent."),
		runs: L(fv).max(20).optional().describe("The turns started for it.")
	}), mv = pv.extend({ id: Y.describe("The issue's id, which is its fingerprint.") }), hv = R({
		issues: L(mv).describe("The inbox, most recently seen first."),
		invalid: L(P()).describe("Files in the issues directory that could not be read at all.")
	}), gv = R({ id: Y.describe("Which issue.") }), _v = R({
		id: Y.describe("Which issue."),
		status: V([
			"open",
			"resolved",
			"ignored"
		]).describe("Where it now stands with you.")
	}), vv = R({
		keyFromBrowsers: I().optional().describe("Let a browser report with the key alone, rather than only from a site you listed. Off unless you need it."),
		dailyReportMax: F().int().positive().optional().describe("How many reports a day this intake accepts at all."),
		escalateAfter: F().int().positive().optional().describe("How many more times a known crash must happen before it wakes an agent again."),
		antiBot: V(["pow"]).optional().describe("Make a person's browser solve a small puzzle before it accepts a written report."),
		title: P().max(80).optional().describe("The dialog's heading."),
		prompt: P().max(300).optional().describe("The line above the box they type in."),
		thanks: P().max(300).optional().describe("What it says once they have sent it."),
		askEmail: I().optional().describe("Ask for an address to reply to. Optional for them either way."),
		accent: P().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "accent must be a hex colour, e.g. #e47100").optional(),
		captureCrashes: I().optional().describe("Catch uncaught errors automatically, as well as what people write in.")
	}), R({
		automationId: P(),
		title: P(),
		prompt: P(),
		thanks: P(),
		askEmail: I(),
		accent: P(),
		captureCrashes: I(),
		antiBot: V(["pow", "off"])
	}), R({
		ok: H(!0),
		id: P()
	}), yv = R({
		origin: P(),
		allowed: I(),
		lastSeenAt: F(),
		loads: F()
	}), bv = R({ origins: L(yv) }), xv = R({ automationId: Y.describe("Which intake.") });
})), Cv, wv, Tv, Ev, Dv, Ov, kv, Av, jv, Mv, Nv, Pv, Fv, Iv, Lv, Rv, zv, Bv, Vv, Hv, Uv, Wv, Gv, Kv = b((() => {
	K(), X(), Vg(), Tp(), Sv(), Cv = V([
		"turn.settled",
		"agent.landed",
		"deps.broken",
		"deps.fixed"
	]), R({
		event: Cv,
		agentId: P(),
		title: P().optional(),
		branch: P(),
		outcome: V([
			"landed",
			"conflict",
			"ready",
			"idle",
			"error"
		]),
		repos: L(R({
			repo: P(),
			from: P(),
			dir: P()
		})),
		deps: R({
			project: P(),
			command: P(),
			exitCode: F(),
			attempt: F(),
			logTail: P()
		}).optional()
	}), wv = z("kind", [
		R({
			kind: H("schedule").describe("On a clock."),
			cron: P().min(1).describe("When, in cron notation."),
			afterSessions: F().int().positive().optional().describe("Fire only once at least this many new sessions have been run since the last wake. A due run short of that is skipped, and says how far off it is.")
		}),
		R({
			kind: H("event").describe("When something calls its webhook."),
			dailyMax: F().int().positive().optional().describe("How many webhook calls a day may wake the agent, across every caller. Absent is a modest default rather than unlimited.")
		}),
		R({
			kind: H("listener").describe("When a message arrives from somewhere outside."),
			provider: P().min(1).describe("Which service to listen to."),
			channelId: P().min(1).optional().describe("Narrow it to one channel or thread."),
			eventType: P().min(1).optional().describe("Narrow it to one kind of event."),
			mentioned: I().optional().describe("Only when the agent is actually addressed, rather than on everything said in earshot."),
			branch: P().min(1).optional().describe("Narrow it to one branch, for the sources that have branches. Absent means every branch of the repositories it matches."),
			allowedOrigins: L(P()).optional().describe("Which websites may reach the public endpoint, the chat widget's or the bug reporter's. Absent or empty admits nobody.")
		}),
		R({
			kind: H("workspace").describe("When something happens to the files or the repositories."),
			event: Cv.describe("Which happening."),
			repo: P().min(1).optional().describe("Narrow it to one repository. Absent means any of them.")
		})
	]), Tv = R({
		access: V(["public", "google"]).optional().describe("Who may write to it. Absent means anyone, which is the anonymous support box it looks like."),
		requireName: I().optional().describe("Ask a visitor for a name first. Cosmetic: the name is typed, so it reaches the model as something a stranger said, never as identity."),
		antiBot: V(["turnstile", "pow"]).optional().describe("How to keep bots out: a third-party check that needs the site's own keys, or a puzzle the sandbox sets and the widget solves, so a site with no such account still has something. Absent leaves the site allowlist and the rate limit as the whole boundary."),
		turnstileSiteKey: P().optional().describe("The public half of those keys, which ships to the visitor's browser."),
		turnstileSecret: P().optional().describe("The private half, which the sandbox keeps and the widget never sees."),
		googleClientId: P().optional().describe("The site's own sign-in client id. It cannot be ours: a sign-in is only issued to an approved origin, and no single client can list every customer's domain."),
		title: P().max(80).optional(),
		greeting: P().max(500).optional(),
		accent: P().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "accent must be a hex colour, e.g. #e47100").optional(),
		position: V([
			"top-right",
			"top-left",
			"bottom-right",
			"bottom-left"
		]).optional(),
		dailyMessageMax: F().int().positive().optional(),
		conversationMessageMax: F().int().positive().optional(),
		sessionTtlMinutes: F().int().positive().optional()
	}), R({
		automationId: P(),
		title: P(),
		greeting: P(),
		accent: P(),
		position: V([
			"top-right",
			"top-left",
			"bottom-right",
			"bottom-left"
		]),
		access: V(["public", "google"]),
		requireName: I(),
		antiBot: V([
			"turnstile",
			"pow",
			"off"
		]),
		turnstileSiteKey: P().optional(),
		googleClientId: P().optional()
	}), R({
		salt: P(),
		difficulty: F().int().positive()
	}), R({
		conversationId: P().min(1).max(200),
		content: P().min(1),
		displayName: P().max(200).optional(),
		idToken: P().optional(),
		turnstileToken: P().optional(),
		powNonce: P().optional(),
		history: L(R({
			author: P().optional(),
			content: P()
		})).max(50).optional()
	}), R({
		replies: L(R({
			seq: F(),
			at: F(),
			text: P()
		})),
		cursor: F()
	}), Ev = R({
		label: P().max(60).optional().describe("What to call these people on screen."),
		ids: L(P().min(1).max(200)).max(200).optional().describe("Sender ids, as the service names them, never display names."),
		groups: L(P().min(1).max(200)).max(50).optional().describe("Group ids the service reports on a sender, a Discord role. Only for a source whose messages carry them."),
		actsAs: Y.optional().describe("Which persona their wakes speak as. Absent is no persona: the full toolbox, reaching no account."),
		requireApproval: I().optional().describe("Hold their wakes for a person, even when the automation itself does not.")
	}).refine((e) => (e.ids?.length ?? 0) + (e.groups?.length ?? 0) > 0, { message: "a sender rule must name at least one id or group" }), Dv = R({
		rules: L(Ev).max(50).describe("Walked in order; the first rule naming the sender decides."),
		others: V([
			"allow",
			"hold",
			"ignore"
		]).describe("What a sender no rule names gets: the automation as configured, a hold for a person, or nothing at all.")
	}), Ov = R({
		id: Y.describe("The automation's id."),
		trigger: wv.describe("What sets it off: a schedule, an event in the workspace, a message arriving from outside, or a webhook."),
		guard: P().min(1).optional().describe("A command run before the wake that decides whether there is anything to do. Skipped by the guard is often the most useful thing an automation can report."),
		prompt: P().min(1).describe("What the woken agent is told."),
		webchat: Tv.optional().describe("Settings for the public chat widget, for an automation that answers visitors."),
		issues: vv.optional().describe("Settings for the bug reporter, for an automation that takes crash reports from your own sites and apps."),
		allowedTools: L(P().min(1)).optional().describe("Narrow the woken turn to these tools. For one driven by an outside message this list is the real boundary, because prompt wording is only advice and an empty toolbox is not."),
		models: L(Hp).min(1).max(10).describe("Which models this automation may run on, best first. Required, and nothing is chosen for you: work that fires while nobody is watching spends a real allowance, so it names the models it spends rather than inheriting one. Tried in order, so a spent account does not silently stop the job."),
		account: P().optional().describe("Which account pays for it."),
		actsAs: Y.optional().describe("Which persona it speaks as. An unwatched turn naming none reaches no signed-in account at all."),
		senders: Dv.optional().describe("Who may talk to it, and as whom: rules by sender id or group, each naming the persona those people get, plus what everyone else gets. Absent admits everyone the trigger's filters do."),
		requireApproval: I().optional().describe("Hold every fire for a person instead of running it. Only a person can release one of those."),
		holdForSeconds: F().optional().describe("Hold each fire this long before running it anyway, which is a delay rather than a decision."),
		chore: I().optional().describe("This automation is a maintenance job, which is what files it under chores rather than among ordinary automations."),
		enabled: I().describe("Whether it fires at all.")
	}), kv = R({
		id: Y.describe("This waiting item's own id, which approving and rejecting take."),
		automationId: P().describe("Which automation it came from."),
		payload: P().optional().describe("What set it off, kept whole so an approved wake carries the same thing it would have had. Absent for one on a schedule, which carries nothing."),
		origin: Mp.optional().describe("Where the message came from, kept alongside the payload so an approved wake appears on the board exactly as an automatic one would have."),
		title: P().optional().describe("What the conversation would be called."),
		conversationId: P().optional().describe("The thread this belongs to, when it has one, so approving continues that conversation rather than opening a new one. Without it, one visitor's chat becomes a card per approved message and an agent that meets them again every turn."),
		sessionId: P().optional().describe("The provider session that thread last ran on."),
		thread: P().optional().describe("Which inbound thread this belongs to, so the approved run continues that thread's memory rather than a fresh one."),
		actsAs: Y.optional().describe("Which persona the approved run speaks as, decided when it was held."),
		createdAt: F().describe("When it started waiting, in milliseconds."),
		autoRunAt: F().optional().describe("When it goes ahead on its own, in milliseconds, for a hold that is only a delay. Absent for one that genuinely waits on a person.")
	}), Av = R({
		agents: L(hg).describe("The conversations."),
		rev: F().describe("Which version of the fleet this is. The fleet is published as whole snapshots, so without a version a list read before a change but delivered after it would silently undo that change. Drop any list older than the newest you have already applied."),
		held: L(kv).default([]).describe("Automations waiting at the door for a yes, put alongside the running conversations so needs-you sits beside working rather than on a page nobody opens.")
	}), jv = R({ approvals: L(kv).describe("Everything waiting for a yes.") }), Mv = R({ id: P().describe("Which waiting item.") }), Nv = R({
		at: F(),
		outcome: V([
			"completed",
			"skipped",
			"error",
			"interrupted"
		]),
		detail: P().optional(),
		conversationId: P().optional()
	}), Pv = Ov.extend({
		runs: L(Nv),
		nextRun: F().optional(),
		webhookToken: P().optional().describe("What a caller presents at /automations/{id}/fire, for an event automation. Shown to a maintainer or the owner only."),
		ingestKey: P().optional().describe("What a client with no website origin presents to a bug intake. Shown to a maintainer or the owner only.")
	}), Fv = R({ automations: L(Pv) }), Iv = R({
		id: P().describe("The sender id the service vouches for, what a rule stores."),
		name: P().describe("What they were called on their last message, for display only."),
		groups: L(P()).optional().describe("The group ids the service reported on their last message, a Discord role list."),
		firstSeenAt: F().describe("When they first reached an automation here, in milliseconds."),
		lastSeenAt: F().describe("When they last did, in milliseconds."),
		messages: F().describe("How many of their messages reached an automation's filters, admitted or not.")
	}), Lv = R({ senders: L(Iv).describe("Newest first.") }), Rv = R({ provider: P().min(1).describe("Which listener source.") }), zv = R({ id: P() }), Bv = R({
		id: P(),
		enabled: I()
	}), Vv = R({
		label: P().min(1),
		placeholder: P().min(1),
		hint: P().min(1).optional()
	}), Hv = R({
		provider: P().min(1),
		label: P().min(1),
		logo: P().min(1).optional(),
		icon: P().min(1).optional(),
		events: L(R({
			value: P().min(1),
			label: P().min(1)
		})),
		channel: Vv,
		branchField: Vv.optional(),
		sender: Vv.optional(),
		senderGroup: Vv.optional(),
		mentionLabel: P().min(1).optional(),
		starterPrompt: P().min(1).optional(),
		requires: L(P().min(1)).default([]),
		enabled: I()
	}), Uv = V(["create", "configure"]), Wv = R({
		id: P().min(1),
		title: P().min(1),
		logo: P().min(1).optional(),
		icon: P().min(1).optional(),
		requires: L(P().min(1)).default([]),
		trigger: wv,
		guard: P().min(1).optional(),
		holdForSeconds: F().int().positive().optional(),
		prompt: P().min(1),
		note: P().min(1).optional(),
		setup: P().min(1).optional(),
		description: P().min(1).optional(),
		offer: Uv.optional(),
		chore: I().optional()
	}), Gv = R({
		sources: L(Hv),
		templates: L(Wv)
	});
})), qv, Jv, Yv, Xv, Zv, Qv, $v, ey, ty, ny, ry, iy, ay = b((() => {
	K(), X(), qv = V(["github", "gitlab"]), Jv = V([
		"queued",
		"running",
		"success",
		"failed",
		"canceled",
		"skipped"
	]), Yv = R({
		repo: P().describe("Which workspace repository it belongs to."),
		host: qv.describe("Which forge is running it."),
		project: P().describe("The project there, as that forge names it."),
		runId: F().describe("The forge's own id for the run, which is what re-running and cancelling take."),
		title: P().optional().describe("The run's headline, usually the commit subject or the pull request's title. Absent means falling back to the branch and commit."),
		authorName: P().optional().describe("Who the forge credits for setting it off."),
		authorAvatarUrl: P().optional().describe("Their picture, hosted by the forge. Absent means drawing their initials instead."),
		trigger: P().optional().describe("What set it off, in the forge's own word rather than flattened into a shared vocabulary, because the forge's word is the precise one."),
		branch: P().describe("Which branch."),
		sha: P().describe("Which commit."),
		status: Jv.describe("How it is going. Queued means the forge has accepted it and nothing is executing it yet, which is a different thing to wait on than a run actually in progress."),
		url: P().describe("Its page on the forge."),
		createdAt: F().describe("When it started, in milliseconds."),
		durationSeconds: F().optional().describe("How long it took."),
		failedJobs: L(P()).optional().describe("What broke, by name. Fetched only for failed runs, so that a notification or a screen can say what went wrong rather than just that something did.")
	}), Xv = R({
		name: P().describe("The job's name."),
		status: Jv.describe("How it went."),
		stage: P().optional().describe("Which stage it belongs to, where the pipeline groups its jobs that way."),
		needs: L(P()).optional().describe("Which jobs in this run it declared it waits on: the real shape of the pipeline. Absent means nothing could be read, which is different from an empty list, which is the claim that it waits on nothing."),
		startedAt: F().optional().describe("When it began, in milliseconds. Absent while it is queued."),
		finishedAt: F().optional().describe("When it ended, in milliseconds."),
		durationSeconds: F().optional().describe("How long it took."),
		webUrl: P().optional().describe("Its page on the forge, which is the shortest path from this step failed to the log that says why.")
	}), Zv = R({ jobs: L(Xv).describe("The steps inside one run. Fetched separately from the run list, so that list stays cheap.") }), Qv = R({
		repo: P().describe("Which workspace repository."),
		host: qv.describe("Which forge it lives on."),
		project: P().describe("The project there."),
		url: P().describe("Its page on the forge."),
		hookWarning: P().optional().describe("Present when the sandbox could not register for instant notifications, with what happened. Without them the sandbox polls instead, so this costs a couple of minutes' delay rather than the feature."),
		hookRecipe: P().optional().describe("What to paste into the repository's webhook settings by hand, secret included. Shown to a maintainer or the owner only.")
	}), $v = R({
		repos: L(Qv).describe("Which workspace repositories are wired to a forge, and how each one's notifications are set up."),
		runs: L(Yv).describe("Runs across all of them, newest first.")
	}), ey = R({
		repo: P().describe("Which workspace repository. The project behind it is resolved fresh each call, so a stale screen cannot act on one the workspace no longer maps to."),
		runId: F().describe("Which run, by the forge's own id.")
	}), ty = ey.extend({
		pick: Bp.describe("Which model to open the conversation on, when somebody chose one. Leave it out for the sandbox's own choice, which is the ordinary path."),
		mode: V(["continue", "start-over"]).optional().describe("What to do about the attempt already made at this run, when there is one. `continue` carries on in that conversation; `start-over` stops it if running, files it away, and opens the next attempt on a clean worktree. Leave it out for the plain press: an attempt that ended is continued, a fresh failure gets attempt 1, and one still in play answers CONFLICT with why."),
		force: I().optional().describe("Open the conversation even when every failed job died in its runner's own setup, which is the fleet's fault and nothing an agent on the code can repair. Left out, such a run is refused with that sentence.")
	}), ny = R({ conversationId: P().describe("The conversation that was opened, already holding the failure. Open it to watch, or attach to its turn.") }), ry = V([
		"idle",
		"running",
		"passed",
		"failed",
		"error",
		"cancelled"
	]), iy = R({
		status: ry.describe("Where the run is. Failed and error are deliberately different: failed means the code is wrong, error means the command could not be run at all, and calling the second one a test failure would send an agent hunting a bug that is not there."),
		command: P().describe("What actually ran, echoed here rather than read back from the settings, so a result looked at after the setting changed still says what produced it."),
		startedAt: F().optional().describe("When it began, in milliseconds."),
		finishedAt: F().optional().describe("When it ended, in milliseconds."),
		exitCode: F().optional().describe("How the command exited."),
		timedOut: I().optional().describe("It was killed for taking too long rather than finishing."),
		session: P().optional().describe("The terminal it runs in, which is where to watch it. Absent where the sandbox has no terminals, in which case there is nothing to attach to."),
		output: P().describe("The end of what it printed, as plain text with the colour codes and redrawn progress lines resolved away. The end rather than the beginning, because a suite's verdict is at the end. Empty while it runs, and for one that was killed.")
	});
})), oy, sy, cy, ly, uy, dy, fy, py, my, hy, gy, _y, vy, yy, by, xy, Sy, Cy, wy, Ty, Ey, Dy, Oy, ky, Ay, jy, My, Ny, Py, Fy, Iy, Ly, Ry, zy, By, Vy, Hy, Uy, Wy, Gy, Ky, qy = b((() => {
	K(), X(), Vg(), ay(), Tp(), $(), oy = V([
		"staged",
		"unstaged",
		"conflicted"
	]), sy = R({
		side: oy.optional().describe("Narrow to one of the three lists a repository's changes split into. Leave it out for all of them, which is the whole repository."),
		origin: P().min(1).optional().describe("Narrow to the files one conversation landed. Leave it out for everyone's, including your own edits.")
	}), cy = 1e3, ly = L(P().min(1)).max(cy).describe("Exactly these repository-relative paths. For anything bigger than a hand-picked selection, describe a scope instead."), uy = R({
		paths: ly.optional(),
		scope: sy.optional().describe("What to act on, described rather than listed, so it covers every matching file in the repository and not just the ones a list could hold.")
	}), dy = { message: "name paths or a scope, not both" }, fy = (e) => e.paths === void 0 || e.scope === void 0, py = Q.extend({
		message: P().min(1).describe("The commit message."),
		stage: uy.refine(fy, dy).optional().describe("What to stage before committing. Leave it out to record the index exactly as it stands; give it an empty object to stage everything first.")
	}), my = Q.extend(uy.shape).describe("What to throw away. Neither paths nor a scope discards every uncommitted change in the repository.").refine(fy, dy), hy = Q.extend(uy.shape).describe("What to move across the index. Nothing on disk changes either way.").refine(fy, dy), gy = Q.extend({ branch: P().min(1).optional().describe("Which branch to push. Leave it out for the checked-out one. A branch with no upstream yet gets one set on this push.") }), _y = V([
		"hook",
		"remote",
		"transport"
	]), vy = iy.extend({
		repo: P().describe("The repository this run is about, the same id the routes take."),
		reason: P().optional().describe("Why not, in git's own words: the last verdict line, for a row that has room for one line. The whole tail is `output`."),
		refusedBy: _y.optional().describe("Who refused a failed push: this repository's pre-push hook (the code is wrong, a fix is worth proposing), the remote (pull first), or the transport (credentials, network: retry). Absent while it runs and for a push that went.")
	}), yy = Q.extend({ path: P().min(1).describe("The file to read, relative to the repository root.") }), by = Q.extend({
		path: P().min(1).describe("Where to write, relative to the repository root. Missing folders are created."),
		content: P().describe("The file's whole new contents.")
	}), xy = Q.extend({
		path: P().min(1).describe("The file, relative to the repository root."),
		side: oy.describe("Which comparison you want. A file that is staged and then edited again has genuinely different answers for each, which is why this is required rather than assumed.")
	}), Sy = R({
		branch: P().describe("The checked-out branch."),
		dirty: I().describe("Whether anything is uncommitted."),
		files: L(P()).describe("Every path with something pending, staged or not.")
	}), Cy = R({ files: L(P()).describe("Every path git tracks, relative to the repository root. Ignored and untracked files are not here.") }), wy = R({
		path: P().describe("The path, as asked for."),
		content: P().describe("The file's contents as they stand on disk.")
	}), R({ repo: P().min(1).describe("Which repository.") }).extend(uy.shape).refine(fy, dy), Ty = R({
		path: P().describe("The path, relative to the repository root. For a rename this is the new one."),
		status: V([
			"added",
			"modified",
			"deleted",
			"renamed",
			"type-changed",
			"conflicted"
		]).describe("What happened to it. Conflicted is not a kind of edit: nothing can be committed anywhere in the repository while one exists."),
		from: P().optional().describe("Where a renamed file came from."),
		additions: F().optional().describe("Lines added. Absent for a binary file, and for an untracked one, which has nothing to compare against."),
		deletions: F().optional().describe("Lines removed. Absent for the same reasons additions is."),
		code: R({
			additions: F(),
			deletions: F()
		}).optional().describe("The same +/− with every comment stripped from both sides, which is what a review shows beside a diff that opens on code alone. Absent when the file cannot be read that way (binary, too large, or a language this build ships no grammar for): git's own counts above are then the reading.")
	}), Ey = R({
		remote: P().optional().describe("The remote this branch pushes to. Absent means none is configured. In a fork with two remotes, pushing to the wrong one succeeds and leaves the count stuck, which is why this says which."),
		branch: P().optional().describe("The checked-out branch. Absent when the repository is on a bare commit, or has no commits yet."),
		upstream: P().optional().describe("The branch on the remote this one follows. Absent means the next push will publish it."),
		ahead: F().describe("Commits you have that the remote does not."),
		behind: F().describe("Commits the remote has that you do not, as of the last fetch. Fetch before trusting it.")
	}), Dy = R({
		name: P().describe("The branch name."),
		current: I().describe("Whether this is the one checked out."),
		upstream: P().optional().describe("The branch on the remote it follows, if any."),
		ahead: F().describe("Commits this branch has that its remote counterpart does not."),
		behind: F().describe("Commits its remote counterpart has that it does not."),
		gone: I().optional().describe("The branch it followed no longer exists on the remote, usually because a merged pull request deleted it. The signal that this one is safe to delete."),
		at: F().describe("When its tip was committed, in milliseconds. Lists are newest first.")
	}), Oy = R({
		name: P().describe("The full name, such as origin/main."),
		remote: P().describe("Just the remote part, so a picker can group by it without re-parsing."),
		branch: P().describe("Just the branch part."),
		at: F().describe("When its tip was committed, in milliseconds, as this repository last saw it.")
	}), ky = R({
		branches: L(Dy).describe("Branches in this repository."),
		remotes: L(Oy).describe("Branches on its remotes, as last seen. Sent together with the locals so a switcher never draws a half-filled list.")
	}), Ay = Q.extend({
		name: Cp.describe("The new branch's name."),
		start: P().min(1).optional().describe("Where to start it: a commit or another branch. Leave it out to start from where you are."),
		checkout: I().optional().describe("Switch to it as well as creating it.")
	}), jy = Q.extend({
		name: Cp.describe("The branch to delete."),
		force: I().optional().describe("Delete it even though it holds work that was never merged. The deliberate retry after the first attempt refuses.")
	}), My = V([
		"merge",
		"rebase",
		"cherry-pick",
		"revert"
	]), Ny = R({
		repo: P().describe("The repository asked about."),
		operation: My.optional().describe("Which operation the working tree is stuck inside. Absent means it is not stuck at all, which is almost always. While one is present git refuses nearly everything else, and abandoning it is the only way out.")
	}), Py = R({
		repo: P(),
		branch: P().optional().describe("The checked-out branch. Absent in a repository that has no commits yet."),
		conflicted: L(Ty).describe("Paths a merge or rebase could not finish. First, because nothing anywhere in this repository can be committed until they are resolved. Held apart from the two lists below, because staged or not is not a question one of these has an answer to."),
		operation: My.optional().describe("What halted, when something did. This is the sentence that explains the conflicts above and names the way out of them."),
		staged: L(Ty).describe("What a plain commit would record right now."),
		unstaged: L(Ty).describe("Edits on disk that are not staged, plus untracked files. A path can be in both lists at once with different line counts, which is why they are separate."),
		truncated: R({
			staged: F().describe("Staged changes not listed above."),
			unstaged: F().describe("Unstaged changes not listed above.")
		}).optional().describe("How many changes were cut from each of the two lists above. A freshly cloned monorepo or a mass delete runs to six figures, which no screen can draw, so past a budget the lists arrive short and this says by how much on each side. Absent means they are complete."),
		remote: Ey.optional().describe("Where this repository stands against its remote."),
		origins: B(P(), L(P())).optional().describe("Which conversation put each path here, newest first, keyed by path. Only work that went through a merge can appear: edits made in the shared tree, in a terminal, or by a person are simply absent rather than guessed at."),
		error: P().optional().describe("Why the repository could not be read at all, in git's own words. A repository left broken by a failed import arrives with empty lists and this set, rather than vanishing from the answer with nothing to act on.")
	}), Fy = R({
		title: P().optional().describe("The conversation's title. Absent for one that never got as far as having a title."),
		provider: Ep.describe("Which model provider it ran on."),
		landedMessage: dg.optional().describe("What the merged work did, drafted by the conversation itself. Carried here as well as on its card, because merged lines outlive the card: archiving a finished conversation does not uncommit its work.")
	}), Iy = R({
		repos: L(Py).describe("One entry per repository that has something pending, is out of step with its remote, or could not be read. A clean repository is simply absent."),
		originAgents: B(P(), Fy).optional().describe("Who each conversation named above is, keyed by id, so a caller need not look them up. Absent when nothing in the review can be attributed."),
		committing: L(P()).optional().describe("Repositories with a commit running right now. The sandbox's answer rather than any one tab's, so a reload, a second window and another device all know. Absent means nothing is committing.")
	}), Ly = R({
		committed: I().describe("Whether a commit was actually recorded."),
		changes: Py.optional().describe("What this repository looks like now, read in the same breath as the commit so a caller can redraw from here instead of asking for a fresh scan. Absent means there is nothing left to show."),
		originAgents: B(P(), Fy).optional().describe("Who the conversations named in those changes are. Merge it over what you already hold rather than replacing: other repositories still name their own.")
	}), Ry = R({
		dir: P().describe("Where the package lives, relative to its repository. Empty when the repository is itself one package."),
		name: P().describe("The name the package declares for itself.")
	}), zy = R({
		repo: P().describe("Which repository."),
		modules: L(Ry).describe("Its packages.")
	}), By = R({ repos: L(zy).describe("Every repository with the packages inside it.") }), Vy = Ty.extend({ landed: I().describe("Whether your workspace already holds this content. Read from the tree at request time, not from what a land recorded: discard a landed file in the Changes panel and this goes back to false, which is what puts it back under Land now.") }), Hy = R({
		repo: P().describe("Which repository."),
		branch: P().optional().describe("The branch this conversation's work sits on."),
		changes: L(Vy).describe("What it changed there."),
		modules: L(Ry).describe("The packages of the tree these changes came from, so a review can group by package. Carried with the changes rather than looked up separately, because a package the conversation has just created exists only in its own copy and the shared tree has never heard of it.")
	}), Uy = R({
		repos: L(Hy).describe("One entry per repository the conversation touched."),
		absorbed: F().describe("How many of this conversation's files your own history already carries, and which are therefore not listed as differences any more."),
		conflicts: L(Ig).optional().describe("Why the last merge refused, when one did. Carried here as well as in the merge's own answer, because a conflict is found the moment a turn ends and dealt with hours later on this surface, which would otherwise open with nothing to explain what it promised to resolve.")
	}), Wy = R({
		sha: P().describe("The commit."),
		short: P().describe("Its abbreviated hash, which is what a reader recognises it by."),
		subject: P().describe("Its first line."),
		author: P().describe("Who committed it."),
		at: F().describe("When it was authored, in milliseconds."),
		changes: L(Ty).describe("The conversation's files that this commit is the newest carrier of, as the conversation changed them. Every file appears under exactly one commit, so these counts add up to the work rather than over-counting a file that history touched twice.")
	}), Gy = R({
		repo: P().describe("Which repository."),
		commits: L(Wy).describe("The commits carrying this conversation's work there, newest first."),
		modules: L(Ry).describe("The packages of the tree these files came from, so a review can group them by package.")
	}), Ky = R({
		repos: L(Gy).describe("One entry per repository holding committed work of this conversation."),
		unaccounted: F().describe("How many of the conversation's absorbed files none of these commits carries. Above zero means its content reached your main line by some other road, so the commits listed are not the whole story.")
	});
})), Jy, Yy = b((() => {
	J(), R_(), Vg(), Kv(), qy(), nv(), $(), Jy = {
		list: q.route({
			method: "GET",
			path: "/agents",
			summary: "Every live conversation",
			description: "The fleet as the board draws it: each conversation with its title, what it is doing, when it last moved and whether anybody has read it since. Archived conversations are not in here."
		}).output(Av),
		archived: q.route({
			method: "GET",
			path: "/agents/archived",
			summary: "Conversations put away",
			description: "The same shape as the live fleet, for the conversations somebody has decided are finished. Their work is kept, and any one of them can be brought back."
		}).output(Av),
		search: q.route({
			method: "GET",
			path: "/agents/search",
			summary: "Find a conversation",
			description: "Searches the live fleet and the archive together. Both halves on purpose: the board hides finished work by design, and a filter that says it found nothing while the answer sits one click away is simply wrong."
		}).input(Cg).output(Dg),
		get: q.route({
			method: "GET",
			path: "/agents/{id}",
			summary: "One conversation's card",
			description: "Everything the board shows for a single conversation: its title, state, working branch, unread marker and timestamps."
		}).input(gg).output(hg),
		transcript: q.route({
			method: "GET",
			path: "/agents/{id}/transcript",
			summary: "One page of a conversation",
			description: "The most recent turns of one conversation, in order, including the tool calls and their results: what the chat replays and the next turn is seeded from. A page, not the whole record — pass the answer's `from` back as `before` to walk further back, until `more` reads false."
		}).input(_g).output(L_),
		place: q.route({
			method: "POST",
			path: "/agents/{id}/place",
			summary: "Put words in the agent's mouth",
			description: "Writes a line into the record as though the agent had said it, with no turn behind it and no reply. Human readers see it marked as placed. The next real turn starts fresh from the record, where the line reads as the agent's own. Refused while a turn is running."
		}).input(kg).output(Z),
		rename: q.route({
			method: "POST",
			path: "/agents/{id}/rename",
			summary: "Retitle a conversation",
			description: "Sets the title a person chose, replacing the one that was generated. Allowed while the conversation is working, and it does not count as activity."
		}).input(Og).output(hg),
		autoLand: q.route({
			method: "POST",
			path: "/agents/{id}/auto-land",
			summary: "Whether this conversation merges its work automatically",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to go back to following the default. Deliberately allowed mid-turn, because the setting is read when the turn finishes, so flipping it while the agent works means exactly hold this piece of work for review."
		}).input(Ag).output(hg),
		resumeAfterOutage: q.route({
			method: "POST",
			path: "/agents/{id}/resume-after-outage",
			summary: "Whether this conversation retries after a provider outage",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to follow the default again. This is what the offer shown when a turn dies writes, because the press happens inside one conversation and honestly means finish this piece of work."
		}).input(jg).output(hg),
		resumeAfterLimit: q.route({
			method: "POST",
			path: "/agents/{id}/resume-after-limit",
			summary: "Whether this conversation sends itself again when its allowance comes back",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to follow the default again. Off unless asked for, because the allowance is the user's own budget and a turn that spends it the moment it reopens is not a decision to make on their behalf."
		}).input(Mg).output(hg),
		moveAfterLimit: q.route({
			method: "POST",
			path: "/agents/{id}/move-after-limit",
			summary: "Whether this conversation moves to another account when its allowance is spent",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to follow the default again. A move spends a second account of the same provider on this conversation's behalf, so it is off unless asked for."
		}).input(Ng).output(hg),
		seen: q.route({
			method: "POST",
			path: "/agents/{id}/seen",
			summary: "Mark a conversation read",
			description: "Stamps the read marker behind the unread badge on one card. Allowed while the conversation is working, and reading never counts as activity."
		}).input(gg).output(hg),
		stopWatching: q.route({
			method: "POST",
			path: "/agents/{id}/stop-watching",
			summary: "Stop every condition watch a conversation is parked on",
			description: "Disarms all of this conversation's outside-condition watches, so none of them will wake it. All of them rather than one, because that is what the press means when it is made about a card. Nothing else about the conversation changes."
		}).input(gg).output(hg),
		seenAll: q.route({
			method: "POST",
			path: "/agents/seen",
			summary: "Mark every conversation read",
			description: "Clears the unread badge across the whole fleet at once, and hands the refreshed list back."
		}).output(Av),
		diff: q.route({
			method: "GET",
			path: "/agents/{id}/diff",
			summary: "Everything a conversation has changed",
			description: "One flat set of changed files per repo, measured against where each repo stood when the conversation started, with every file flagged as already merged or not. Not the staged-and-unstaged shape a working copy has, because nobody ever checks this branch out to stage into it."
		}).input(gg).output(Uy),
		history: q.route({
			method: "GET",
			path: "/agents/{id}/history",
			summary: "Where a conversation's committed work lives",
			description: "The commits in your own history that carry this conversation's work, with the files each one brought. Use it when the change list is empty or short because you already committed what it wrote: those files are not differences against the main line any more, so they are not in the review, and this is where they went."
		}).input(gg).output(Ky),
		fileDiff: q.route({
			method: "GET",
			path: "/agents/{id}/{repo}/file-diff",
			summary: "One file's before and after in a conversation's work",
			description: "Both sides of a single file: what it held when the conversation started and what it holds on its branch now."
		}).input(Pg).output(tv),
		land: q.route({
			method: "POST",
			path: "/agents/{id}/land",
			summary: "Merge a conversation's work into the workspace",
			description: "Brings the conversation's branches into the main tree, one repo at a time. A conflict is reported rather than raised and nothing is lost when it fails. Refused while a turn is running, and refused for a conversation that works directly in the shared tree, which has nothing to merge."
		}).input(Bg).output(Lg),
		requestLand: q.route({
			method: "POST",
			path: "/agents/{id}/request-land",
			summary: "Ask a maintainer to merge this work",
			description: "For a collaborator who is not allowed to merge: marks the conversation as waiting for review, with who asked. The request shows on every maintainer's board and clears when somebody merges or discards it."
		}).input(gg).output(hg),
		discard: q.route({
			method: "POST",
			path: "/agents/{id}/discard",
			summary: "Throw a conversation's work away",
			description: "Deletes the conversation's working copies, its branches and its entry. Nothing is kept. Refused while a turn is running, and refused for a conversation working in the shared tree."
		}).input(gg).output(Z),
		archive: q.route({
			method: "POST",
			path: "/agents/archive",
			summary: "Put conversations away",
			description: "The gentle counterpart to discarding. Commits whatever the conversation still has in progress onto its own branch, releases its working copy, and keeps the entry and the record. It leaves the live fleet and joins the archive. Refused for a conversation that is running."
		}).input(vg).output(xg),
		unarchive: q.route({
			method: "POST",
			path: "/agents/unarchive",
			summary: "Bring conversations back",
			description: "Returns archived conversations to the live fleet. The next turn picks up a fresh working copy from the branch that was kept."
		}).input(yg).output(bg),
		purge: q.route({
			method: "POST",
			path: "/agents/purge",
			summary: "Empty the archive for good",
			description: "Discards every conversation already in the archive: working copies, branches and entries. The whole archive rather than a chosen few, because the archive is the pile somebody has already decided is over. A teardown that fails on one conversation leaves that one behind instead of taking the rest down with it."
		}).output(Sg)
	};
})), Xy, Zy, Qy, $y, eb, tb, nb, rb, ib, ab, ob = b((() => {
	K(), Tp(), V(["post", "action"]), Xy = V([
		"proposed",
		"approved",
		"running",
		"done",
		"failed"
	]), Zy = {
		actsAs: Y.optional().describe("Whose name it acts under. Needed for anything that requires being logged in, because an unwatched turn naming nobody is allowed no account at all. Never guessed: one site can be connected five times over, and picking for you means picking wrong in public with no undo."),
		scheduledAt: F().optional().describe("When it should happen, in milliseconds. An agent may propose without one and you set it when approving; an approved item with no time goes after a short countdown you can still stop."),
		status: Xy.default("proposed").describe("Where it is: proposed by the agent, approved by you, being carried out, done, or failed. Rejecting is deleting it; retrying is approving a failed one again."),
		createdAt: F().optional().describe("When it was written, in milliseconds."),
		startedAt: F().optional().describe("When it started being carried out, in milliseconds. Needed to tell a run that is under way from one whose turn died mid-flight, which the scheduled time cannot."),
		finishedAt: F().optional().describe("When it was done, in milliseconds."),
		result: P().optional().describe("What came back, when something did: the post's own address, a confirmation number. The one thing a finished item can offer that reading it cannot."),
		error: P().optional().describe("Why it failed, written as a sentence for a person to read rather than as a code.")
	}, Qy = R({
		kind: H("post").describe("A post to publish somewhere."),
		platform: P().min(1).describe("Where it should go. A plain name, so a new site needs no change here; an unknown one simply fails when it tries to post."),
		content: P().min(1).describe("The post itself."),
		title: P().optional().describe("A title, where the site wants one."),
		target: P().optional().describe("Where on the site: a community, a channel. Or the address of the thing this replies to, in which case it is a reply, and on some sites the difference between a thread's address and one comment's is the difference between talking to the room and answering the person."),
		media: L(P()).optional().describe("Anything to attach, as workspace paths."),
		...Zy
	}), $y = R({
		kind: H("action").describe("Something the agent will do once you say so."),
		summary: P().min(1).max(200).describe("What will happen, in one line: the row's headline and the confirm dialog's item."),
		details: P().optional().describe("The specifics, as Markdown: everything you would want to see before saying yes."),
		instructions: P().min(1).describe("What to do once approved, written for the fresh turn that will do it: names, ids and steps, since it has none of this conversation."),
		...Zy
	}), z("kind", [Qy, $y]), eb = { id: Y.describe("The approval's id.") }, tb = Qy.extend(eb), nb = $y.extend(eb), rb = z("kind", [tb, nb]), ib = R({
		approvals: L(rb).describe("The queue."),
		invalid: L(P()).describe("Files that could not be read at all, or name a kind this daemon does not know. Listed rather than skipped, because an agent writes these files directly and a malformed one would otherwise never run and never say why.")
	}), ab = R({ id: Y.describe("Which approval.") });
})), sb, cb = b((() => {
	J(), ob(), $(), sb = {
		list: q.route({
			method: "GET",
			path: "/approvals",
			summary: "Things waiting for your yes",
			description: "Everything an agent has prepared and would like to do: posts to publish, actions to carry out. Nothing here has happened yet."
		}).output(ib),
		upsert: q.route({
			method: "POST",
			path: "/approvals",
			summary: "Approve, edit or retry one",
			description: "All three are the same act with a different field changed, so they share one call. Send the item back as you want it."
		}).input(rb).output(Z),
		remove: q.route({
			method: "DELETE",
			path: "/approvals/{id}",
			summary: "Reject one",
			description: "Throws it away undone."
		}).input(ab).output(Z)
	};
})), lb, ub = b((() => {
	J(), Kv(), $(), lb = {
		list: q.route({
			method: "GET",
			path: "/automations",
			summary: "Things that wake an agent on their own",
			description: "Every automation with its recent runs and when it fires next."
		}).output(Fv),
		catalog: q.route({
			method: "GET",
			path: "/automations/catalog",
			summary: "What can trigger an automation here",
			description: "Every trigger this sandbox understands and every template worth starting from, the daemon's own merged with each installed extension's. Writing an automation is checked against this same list, so a screen and the daemon can never disagree about what is allowed."
		}).output(Gv),
		upsert: q.route({
			method: "POST",
			path: "/automations",
			summary: "Create or edit an automation",
			description: "Writes an automation by id. Nothing needs provisioning: the scheduler picks it up on its next sweep."
		}).input(Ov).output(Z),
		setEnabled: q.route({
			method: "POST",
			path: "/automations/{id}/enabled",
			summary: "Turn an automation on or off",
			description: "Flips only the switch, so a row in a list can be toggled without rebuilding the whole record."
		}).input(Bv).output(Z),
		remove: q.route({
			method: "DELETE",
			path: "/automations/{id}",
			summary: "Delete an automation",
			description: "Removes it, so nothing fires from it again."
		}).input(zv).output(Z),
		rotateToken: q.route({
			method: "POST",
			path: "/automations/{id}/rotate-token",
			summary: "Rotate an automation's webhook token or intake key",
			description: "Mints a new credential for the door this automation opens and retires the old one at once. Every caller has to be handed the new URL; that is the point. Refused for an automation with no door."
		}).input(zv).output(Dm),
		run: q.route({
			method: "POST",
			path: "/automations/{id}/run",
			summary: "Fire an automation by hand",
			description: "The answer to writing something that runs at three in the morning and having no way to try it. It takes exactly the path the real trigger takes, including the check that decides whether there was anything to do, since skipped by the guard is the most useful thing this can tell you. A switched-off automation fires too, because trying it before switching it on is the main reason to press this. Not available for the trigger that listens for incoming messages, where a hand-fire would produce an agent asked to handle events and handed none; send the bot a message instead. Answers straight away and runs detached."
		}).input(zv).output(Z),
		senders: q.route({
			method: "GET",
			path: "/automations/senders/{provider}",
			summary: "Who has written to a listener source",
			description: "Everyone whose message reached one of this source's automations, newest first, admitted or not. What the sender rules picker offers by name while storing the id the service vouches for."
		}).input(Rv).output(Lv),
		pendingList: q.route({
			method: "GET",
			path: "/automations/pending",
			summary: "Automations waiting for a yes",
			description: "The queue an automation set to ask first lands in each time it would have fired."
		}).output(jv),
		approve: q.route({
			method: "POST",
			path: "/automations/pending/{id}/approve",
			summary: "Let a held automation run",
			description: "Releases one waiting automation and runs the wake it was holding. Answers straight away and runs detached."
		}).input(Mv).output(Z),
		reject: q.route({
			method: "POST",
			path: "/automations/pending/{id}/reject",
			summary: "Drop a held automation",
			description: "Throws one waiting fire away. The automation stays on, and the next trigger queues as usual."
		}).input(Mv).output(Z)
	};
})), db, fb, pb, mb, hb, gb, _b, vb, yb, bb, xb, Sb, Cb, wb, Tb, Eb, Db, Ob, kb, Ab, jb, Mb, Nb, Pb, Fb, Ib, Lb = b((() => {
	K(), X(), db = R({ agent: jp.optional().describe("Read a conversation's own private copy of the workspace rather than the shared tree. Leave it out for the shared tree. A conversation that is not working privately resolves back to the shared tree rather than failing, so a link need not know which mode it runs in.") }), fb = R({
		to: P().describe("What the link says, verbatim, rather than where it ends up. That is what the person who made it wrote, and what they would edit."),
		state: V(["broken", "outside"]).optional().describe("Absent for an ordinary link. Broken means there is nothing at the other end, and it is listed anyway because a dangling link is worth seeing. Outside means it leads out of the workspace, so it is shown and refused.")
	}), pb = R({
		name: P().describe("Just this entry's own name."),
		path: P().describe("Its full path from the workspace root, which feeds straight back into the file routes."),
		type: V(["file", "dir"]).describe("What it is. For a link, what it points at, so a link to a folder opens like a folder."),
		size: F().optional().describe("Size in bytes, for a file."),
		ignored: I().optional().describe("Tooling ignores it: installed packages, git internals, anything the ignore rules exclude. Usually drawn greyed out."),
		link: fb.optional().describe("Present when this entry is a link."),
		get children() {
			return L(pb).optional().describe("What is inside a folder. Absent means it was not opened, either because it is ignored or because the walk ran out of budget above it, so ask for it separately. An empty list means it really is empty.");
		}
	}), mb = R({
		root: P().describe("The path everything below is relative to."),
		tree: L(pb).describe("The workspace, one entry per file and folder."),
		hidden: F().describe("How many entries at the top level were cut for size. Zero means the listing is complete."),
		barren: L(P()).describe("Folders whose whole contents are empty folders, and nothing else. Complete for the workspace, however much of the tree above was listed, and ordered like the tree, so a parent comes before the branch below it.")
	}), hb = db.extend({
		path: P().min(1).describe("The folder to open, as a workspace path."),
		depth: G().int().min(1).max(5).optional().describe("How many levels to include. Omitted means direct children only; at most five levels can be read in one request.")
	}), gb = R({
		entries: L(pb).describe("What is inside it, as a flat list. With the default depth these are direct children; a deeper request also includes descendants, whose full paths say where they belong. Folders carry no nested contents of their own."),
		hidden: F().describe("How many entries were cut for size. Zero means the listing is complete.")
	}), _b = R({ path: P().min(1).describe("The file or folder, as a workspace path.") }), vb = db.extend({ path: P().min(1).describe("The media file the ticket should cover.") }), yb = R({
		ticket: P().describe("Hand this to the streaming route in the query string. It buys exactly the one file it was minted for."),
		expiresAt: F().describe("When it stops working, in milliseconds, so a player can tell a dead ticket from a dead file.")
	}), bb = db.extend({
		path: P().min(1).describe("The file to read, as a workspace path."),
		offset: G().int().optional().describe("Which byte to start at. A negative number reads that many bytes from the end, which is how you follow a growing log without knowing its size first."),
		limit: G().int().min(1).optional().describe("How many bytes to read. Capped by the sandbox, so leaving it out or asking for too much gives you the cap rather than the whole file.")
	}), xb = R({
		present: H(!0).describe("There is something at that path."),
		path: P().describe("The path, as asked for."),
		content: P().describe("The bytes of the window you asked for, as text."),
		size: F().describe("How large the whole file is. Compare it with the window below to know whether there is more."),
		offset: F().describe("Which byte the window starts at."),
		bytes: F().describe("How many bytes the window holds."),
		shared: I().describe("Which tree answered. True when no conversation was named, and also when one was but its own copy has no such file, which is the case a reader has to be told about rather than left to assume.")
	}), Sb = R({
		present: H(!1).describe("Nothing there. An answer, not a failure: reading a file that may not exist yet is the ordinary case for half the reads in this product."),
		path: P().describe("The path, as asked for.")
	}), Cb = z("present", [xb, Sb]), wb = R({ path: P().min(1).describe("The file you want the text of, as a workspace path. The real file, not its shadow: where the text is kept is this route's business.") }), Tb = R({
		enabled: I().describe("Whether the background pass is on (the `sidecars` setting). Off means a shadow exists only where someone asked for one."),
		queued: F().describe("Files waiting for a shadow, not counting the batch being rendered right now."),
		deriving: L(P()).describe("The files being rendered at this moment, as workspace paths. One batch at a time, because derivation shares the box with the agent it serves."),
		sweeping: I().describe("Whether a whole-tree pass is running, which is what a freshly enabled setting or an unlistably large batch triggers."),
		broken: I().describe("Whether the `fileq` binary is missing, in which case nothing renders in the background until this sandbox restarts."),
		shadows: F().optional().describe("How many shadows the last whole-tree pass counted. Absent until one has run in this daemon's lifetime."),
		sweptAt: P().optional().describe("When that pass finished, as an ISO timestamp.")
	}), Eb = V([
		"off",
		"queued",
		"deriving",
		"idle",
		"broken",
		"undeliverable"
	]), Db = {
		state: Eb.describe("Where this file stands with the background pass: switched off, waiting its turn, being read right now, settled, or unreachable because the renderer is missing. `undeliverable` is a format nothing here reads."),
		queue: Tb.describe("How the background pass as a whole is doing, so a wait can be reported as a queue rather than as nothing happening.")
	}, Ob = R({
		...Db,
		present: H(!0).describe("There is derived text for that file."),
		path: P().describe("The file it was derived from, as asked for."),
		content: P().describe("The text itself, as markdown."),
		deriver: P().describe("Which reader wrote it, and at which version, such as `pdf+ocr v1`. A file re-derives when this changes."),
		derivedAt: P().optional().describe("When it was written, as an ISO timestamp. Absent only for a shadow whose front matter was edited by hand."),
		title: P().optional().describe("The title the format carried, where it carried one."),
		notes: L(P()).describe("Every cap and degradation the derivation hit: a sheet cut to 200 rows, a book cut at 2 MB, a scan recognised rather than read. Show these with the text, since text that was cut reading as complete is the one failure this whole feature cannot afford."),
		tokens: F().describe("Roughly what an agent spends reading it, by the same four-chars-a-token estimate every budget here uses."),
		truncated: I().describe("Whether this is only the start of the shadow, cut to keep the response sendable. The file on disk holds the rest."),
		stale: I().describe("Whether the file has changed since this text was derived, compared by content rather than by clock. True means you are reading a rendering of an older version of the file, and deriving it again catches it up.")
	}), kb = R({
		...Db,
		present: H(!1).describe("There is no derived text for that file. Read `state` before saying so to anyone: absent and queued are different answers."),
		path: P().describe("The file, as asked for."),
		derivable: I().describe("Whether this format can be turned into text at all. True means asking for it to be derived is worth offering; false means nothing here reads this format."),
		reason: P().optional().describe("Why there is none, when deriving was just attempted and produced nothing: the file is too large, corrupt, or of a format no reader claims.")
	}), Ab = z("present", [Ob, kb]), jb = db.extend({ path: P().min(1).max(512).describe("The reference as somebody wrote it. Often only the tail of the real path, which is why this is matched against the tree rather than read as-is.") }), Mb = R({ path: P().optional().describe("The real path it means. Absent when nothing in the workspace ends that way.") }), Nb = R({ path: P().min(1).describe("The folder to create. Missing folders above it are created too.") }), Pb = R({
		from: P().min(1).describe("What to move or copy, as a workspace path."),
		to: P().min(1).describe("Where it should end up. Changing only the last part is how you rename something.")
	}), Fb = V([
		"repositories",
		"documents",
		"media",
		"archives",
		"other"
	]), Ib = R({ classifications: L(R({
		path: P().describe("What was looked at."),
		bucket: Fb.describe("Which bucket it was sorted into."),
		reason: P().describe("The signal that decided it, so the proposal can be argued with rather than trusted.")
	})).describe("One entry per repository folder and loose file at the top of the workspace. A read-only proposal: nothing moves until you apply it.") });
})), Rb, zb, Bb, Vb, Hb, Ub, Wb, Gb, Kb, qb, Jb, Yb, Xb, Zb, Qb, $b, ex, tx = b((() => {
	K(), Vg(), am(), $(), Lb(), Rb = Tu({ kind: P() }), zb = R({
		kind: H("heartbeat"),
		rev: F()
	}), Bb = R({
		key: P(),
		label: P(),
		state: V([
			"pending",
			"running",
			"done",
			"failed"
		]),
		ms: F().optional()
	}), Vb = R({
		ready: I(),
		startedAt: F(),
		steps: L(Bb)
	}), Hb = R({
		kind: H("boot"),
		...Vb.shape
	}), Ub = R({
		kind: H("hello"),
		workspaceId: P(),
		routes: L(P()).optional(),
		shapes: B(P(), P()).optional(),
		build: P().optional(),
		boot: Vb.optional()
	}), Wb = R({
		kind: H("reposChanged"),
		repos: L(P())
	}), Gb = R({
		kind: H("workspaceChanged"),
		paths: L(P())
	}), Kb = R({
		kind: H("derivedChanged"),
		paths: L(P()),
		queue: Tb
	}), qb = R({
		kind: H("refsChanged"),
		repos: L(P())
	}), Jb = R({
		kind: H("runtimeChanged"),
		domains: L(P())
	}), Yb = R({
		clientId: P(),
		email: P(),
		name: P().optional(),
		picture: P().optional(),
		role: Em,
		idle: I(),
		view: P().optional(),
		sessionId: P().optional(),
		path: P().optional()
	}), Xb = R({
		kind: H("presence"),
		users: L(Yb)
	}), Zb = R({
		kind: H("agents"),
		agents: L(hg),
		rev: F()
	}), Qb = R({
		kind: H("accountUsage"),
		provider: P(),
		account: P(),
		usage: qp.optional()
	}), $b = R({
		kind: H("providerRefusal"),
		provider: P(),
		refusal: Xp.optional()
	}), ex = z("kind", [
		Ub,
		zb,
		Hb,
		Gb,
		Kb,
		Wb,
		qb,
		Jb,
		Xb,
		Zb,
		Qb,
		$b
	]);
})), nx, rx, ix, ax, ox, sx, cx, lx, ux, dx, fx, px, mx, hx, gx = b((() => {
	K(), Tp(), nx = V([
		"tor",
		"vpngate",
		"wireguard"
	]), rx = P().regex(/^[A-Za-z]{2}$/, "A country is its two-letter code, like DE, US or JP.").transform((e) => e.toUpperCase()), ix = R({
		provider: H("tor"),
		country: rx.optional(),
		autoStart: wp
	}), ax = R({
		provider: H("vpngate"),
		country: rx.optional(),
		autoStart: wp
	}), ox = R({
		provider: H("wireguard"),
		config: P().min(1),
		country: rx.optional(),
		autoStart: wp
	}), sx = z("provider", [
		ix,
		ax,
		ox
	]), cx = V([
		"up",
		"starting",
		"down",
		"unavailable",
		"failed"
	]), lx = R({
		ip: P().describe("The address the world sees, looked up through the exit's own proxy rather than assumed."),
		country: P().optional().describe("Which country that address is in. Absent when the lookup gave an address and no country, in which case a switch is judged on the address having changed instead."),
		countryName: P().optional().describe("That country's name, spelled out.")
	}), ux = R({
		country: P().describe("The country's code."),
		countryName: P().describe("Its name, spelled out."),
		servers: F().describe("How many servers this provider has there."),
		share: F().optional().describe("How much of the provider's actual capacity is there, from zero to one. This is what a list should be sorted by: a third of the countries on offer are one overloaded machine behind a flag, and a count of servers would rank them first.")
	}), dx = R({
		countries: L(ux).describe("Where this exit can put you, best-supplied first."),
		live: I().describe("Whether the provider answered, or this came from a built-in list. Said out loud rather than presenting an old list as current.")
	}), fx = R({
		id: P().describe("Which exit."),
		provider: nx.describe("What it runs on."),
		state: cx.describe("Whether it is carrying traffic, coming up, resting, failed, or not installable yet because its client needs a rebuild to arrive."),
		proxy: P().describe("Where to point traffic that should go through it. Fixed per exit and unchanged by a country switch, which is what lets a long job move country halfway through without reconfiguring anything."),
		country: P().optional().describe("Where it was asked to come out. Absent means the provider chose."),
		observedCountry: P().optional().describe("Where it actually comes out, as last checked. Kept separate from what was asked for, because those two disagreeing is the most useful fault signal this whole feature has."),
		ip: P().optional().describe("The address behind that observation."),
		checkedAt: F().optional().describe("When that was checked, in milliseconds, so an old reading can be shown as old."),
		interface: P().optional().describe("The network interface, for the kinds that have one."),
		since: F().optional().describe("When it came up, in milliseconds."),
		autoStart: I().describe("Whether it starts itself when the sandbox does."),
		detail: P().optional().describe("Why it failed, or a note about a healthy one.")
	}), px = R({ links: L(fx).describe("Every configured exit, with where it was asked to come out and where it actually does.") }), mx = R({ id: P().describe("Which exit.") }), hx = R({
		id: P().describe("Which exit."),
		country: rx.optional().describe("Where to come out. Leaving it out means letting the provider choose, so clearing a country is something you can actually say rather than only setting one.")
	});
})), _x, vx, yx, bx, xx, Sx, Cx, wx, Tx, Ex, Dx, Ox, kx = b((() => {
	K(), _x = V([
		"host",
		"cloudflare",
		"github",
		"gitlab",
		"stripe"
	]), vx = V([
		"signoz",
		"outline",
		"paperless",
		"openproject",
		"invoiceninja",
		"infisical"
	]), yx = B(P(), Eu([P(), F()])), bx = /^[a-zA-Z_][a-zA-Z0-9_]*$/, xx = P().min(1).max(60).regex(bx), Sx = R({
		kind: H("backend").describe("Something you already have: a machine, an account with a hosting provider."),
		provider: _x.describe("Which provider it is with."),
		name: P().describe("What to call it, which is also how everything else refers to it."),
		values: yx.describe("Its settings. Anything secret is stored separately and referred to here, never written in.")
	}), Cx = R({
		kind: H("service").describe("Something you want provisioned."),
		service: vx.describe("Which service."),
		name: P().describe("What to call it."),
		values: yx.describe("Its settings."),
		on: P().describe("Which of your machines to put it on."),
		expose: P().describe("How it should be reachable.")
	}), wx = R({
		kind: H("app").describe("An app of your own, built from source and deployed."),
		name: P().describe("What to call it."),
		values: yx.describe("Its settings, including the address it should answer on."),
		on: P().describe("Which of your machines to put it on."),
		expose: P().describe("How it should be reachable.")
	}), Tx = z("kind", [
		Sx,
		Cx,
		wx
	]), Ex = z("kind", [
		Sx.extend({ name: xx }),
		Cx.extend({ name: xx }),
		wx.extend({ name: xx })
	]), Dx = R({ name: P().describe("Which entry, by name.") }), Ox = R({ entries: L(Tx).describe("Everything declared: what you have, and what you want provisioned.") }), R({
		name: xx,
		user: P().min(1),
		address: P().min(1),
		port: G().default(22),
		via: V(["direct", "cloudflared"]).default("cloudflared"),
		sshKey: P().min(1),
		cfToken: P().optional(),
		cfZone: P().optional()
	});
})), Ax, jx, Mx, Nx, Px, Fx, Ix, Lx, Rx, zx, Bx, Vx, Hx, Ux, Wx, Gx, Kx = b((() => {
	K(), Ax = V([
		"wireguard",
		"fortinet",
		"ipsec"
	]), jx = V(["on", "off"]).default("on"), Mx = (e) => /^Enc[X]?\s+[0-9A-Fa-f]{8,}$/.test(e.trim()), Nx = (e, t) => e.refine((e) => !Mx(e), { message: `That looks like a value copied straight out of a FortiClient config, FortiClient encrypts it with a key tied to the machine that exported it, so it can't be used here. Enter the actual ${t} (ask whoever administers the gateway).` }), Px = R({
		provider: H("wireguard"),
		config: P().min(1),
		autoConnect: jx
	}), Fx = R({
		provider: H("fortinet"),
		server: P().min(1),
		port: G().int().min(1).max(65535).default(443),
		username: P().min(1),
		password: Nx(P().min(1), "password"),
		trustedCert: P().min(1).optional(),
		realm: P().min(1).optional(),
		autoConnect: jx
	}), Ix = R({
		provider: H("ipsec"),
		server: P().min(1),
		presharedKey: Nx(P().min(1), "pre-shared key"),
		localId: P().min(1).optional(),
		remoteId: P().min(1).optional(),
		username: P().min(1).optional(),
		password: Nx(P().min(1), "XAuth password").optional(),
		ikeVersion: V(["1", "2"]).default("1"),
		pfs: V(["on", "off"]).default("on"),
		dhGroup: V([
			"2",
			"5",
			"14",
			"15",
			"16",
			"19",
			"20"
		]).default("14"),
		aggressive: V(["on", "off"]).default("on"),
		routedNetworks: P().default("0.0.0.0/0").refine((e) => e.split(",").map((e) => e.trim()).every((e) => yu().safeParse(e).success || bu().safeParse(e).success), { message: "Routed networks is a comma-separated list of CIDRs, like 10.0.0.0/8,192.168.0.0/16. A single host needs its prefix too (192.168.0.168/32). Leave it at 0.0.0.0/0 to send everything through the gateway." }),
		autoConnect: jx
	}), Lx = z("provider", [
		Px,
		Fx,
		Ix
	]), Rx = V([
		"connected",
		"connecting",
		"disconnected",
		"unavailable",
		"failed"
	]), zx = R({
		id: P().describe("Which tunnel."),
		provider: Ax.describe("What kind of tunnel it is."),
		state: Rx.describe("Whether it is up, dialling, resting, failed, or not installable yet because its client needs a rebuild to arrive."),
		gateway: P().optional().describe("What it dials. For display only, and never a credential."),
		interface: P().optional().describe("The network interface carrying it, once one exists."),
		address: P().optional().describe("The address the far end gave this sandbox, which is the single most useful answer to whether you are on the VPN."),
		routes: L(P()).default([]).describe("What goes through it. Everything, when the range covers the whole internet. Empty until it is up."),
		dns: L(P()).default([]).describe("Name servers it pushed, when it pushed any."),
		since: F().optional().describe("When it came up, in milliseconds. Absent unless it is."),
		autoConnect: I().describe("Whether it dials itself when the sandbox starts."),
		detail: P().optional().describe("Why it failed, or a note about a healthy one. Never a credential.")
	}), Bx = R({ links: L(zx).describe("Every configured tunnel with its live state, read back from the operating system each time rather than remembered.") }), Vx = R({
		id: P().describe("Which tunnel to dial."),
		otp: P().min(1).optional().describe("A one-time code, where the gateway wants one. Supplied per dial and never stored; without it such a gateway refuses and says so.")
	}), Hx = R({ id: P().describe("Which tunnel.") }), Ux = R({ xml: P().min(1).describe("The exported configuration file, whole. Nothing is stored: it is read and thrown away.") }), Wx = R({
		id: P().describe("The id it would be added under."),
		label: P().describe("Its name as the file has it, so somebody recognises the connection they are picking."),
		provider: Ax.describe("What kind of tunnel it is."),
		server: P().describe("Where it dials."),
		port: F().describe("On which port."),
		username: P().optional().describe("The username, but only when the file stored it in the clear. An encrypted one is dropped rather than guessed at."),
		description: P().optional().describe("Whatever the file said about it."),
		localId: P().optional().describe("An identity some tunnel types need, when the file stored it readably."),
		aggressive: I().optional().describe("Which negotiation mode it used."),
		pfs: I().optional().describe("Whether it asked for forward secrecy."),
		dhGroup: P().optional().describe("Which key-exchange group it used. Together with the setting above, this is what decides whether the connection can complete at all."),
		needs: L(P()).describe("What you still have to type in before it can dial. Always at least the password, because the export wraps credentials in encryption that cannot be undone here.")
	}), Gx = R({ connections: L(Wx).describe("The connections found in the file, ready to be added one at a time.") });
})), qx, Jx, Yx, Xx, Zx, Qx, $x, eS, tS, nS, rS, iS, aS, oS, sS, cS, lS, uS, dS, fS, pS, mS, hS, gS, _S, vS, yS, bS, xS, SS, CS, wS, TS, ES, DS, OS, kS, AS, jS, MS, NS, PS, FS = b((() => {
	K(), gx(), Tp(), kx(), Kx(), qx = V([
		"devops",
		"monorepo",
		"mcp",
		"service",
		"integration",
		"cli",
		"plugin",
		"extension",
		"ssh",
		"vpn",
		"exit",
		"docker",
		"browser",
		"identity",
		"host",
		"webext",
		"agent",
		"endpoint",
		"localmodel",
		"wallet"
	]), Jx = V([
		"active",
		"pending",
		"error",
		"inactive"
	]), Yx = R({
		url: vu().describe("Where the tool server answers."),
		token: P().optional().describe("The credential it needs, if any. Stored, never echoed back.")
	}), Xx = R({
		service: vx.describe("Which service to provision."),
		domain: P().min(1).describe("The address it should answer on."),
		on: P().min(1).describe("Which machine to put it on."),
		expose: P().min(1).describe("How it should be reachable.")
	}), Zx = R({ provider: H("stripe").describe("Which outside service's credential to make available to deployed apps.") }), Qx = R({ provider: P().min(1).describe("Which tool to give the agent. The rest of the fields are whatever that tool's own card declares it needs, and are checked against it when you connect.") }).catchall(P()), $x = R({
		url: vu().describe("The repository to take the plugin from."),
		ref: P().min(1).optional().describe("A branch, tag or commit to pin to. Leave it out to follow the default branch."),
		path: P().min(1).refine((e) => !e.split("/").includes(".."), { message: "path must stay inside the checkout" }).optional().describe("Where inside the repository the plugin lives, for one that sits in a larger checkout."),
		token: P().min(1).optional().describe("A credential for a private repository. Stored, never echoed back.")
	}), eS = R({
		url: vu().describe("The repository to take the extension from."),
		ref: P().regex(/^[0-9a-f]{40}$/, "ref must be a full 40-character commit sha").describe("The exact commit to install, in full. Required rather than optional because extension code runs with your browser's trust: the owner approves precisely the code that runs, and an update is a deliberate re-install at a new commit."),
		path: P().min(1).refine((e) => !e.split("/").includes(".."), { message: "path must stay inside the checkout" }).optional().describe("Where inside the repository the extension lives, for one that sits in a larger checkout."),
		token: P().min(1).optional().describe("A credential for a private repository. Stored, never echoed back."),
		registry: vu().optional().describe("Which registry this install came from, which is what update checks and security advisories are read against. Absent falls back to the official one.")
	}), tS = z("auth", [R({
		auth: H("key").describe("Sign in with a key."),
		host: P().min(1).describe("The machine's address."),
		port: G().default(22).describe("Which port it listens on."),
		user: P().min(1).describe("Which user to connect as."),
		privateKey: P().min(1).describe("The private key, whole. Stored with tight permissions and never echoed back.")
	}), R({
		auth: H("password").describe("Sign in with a password."),
		host: P().min(1).describe("The machine's address."),
		port: G().default(22).describe("Which port it listens on."),
		user: P().min(1).describe("Which user to connect as."),
		password: P().min(1).describe("The password. Stored, never echoed back.")
	})]), nS = R({
		gpu: V(["on", "off"]).default("off"),
		registryMirror: vu().optional(),
		insecureRegistries: P().optional(),
		addressPool: P().optional()
	}), rS = R({
		platform: P().min(1),
		username: P().optional(),
		password: P().optional(),
		identity: P().optional(),
		purpose: P().optional(),
		openedAt: P().optional(),
		exit: P().optional()
	}).catchall(P()), iS = R({
		email: P().min(3),
		password: P().optional(),
		mailbox: P().optional(),
		loginUrl: vu().optional(),
		openAccounts: V(["on", "off"]).default("off"),
		exit: P().optional()
	}), aS = V(["on", "off"]), oS = R({
		shell: aS.default("on"),
		write: aS.default("off"),
		screen: aS.default("on"),
		control: aS.default("off"),
		sandboxes: aS.default("off"),
		destructive: aS.default("off"),
		roots: P().optional()
	}), sS = oS.extend({ platform: P().min(1) }), cS = V(["on", "off"]), lS = R({
		read: cS.default("on"),
		act: cS.default("on"),
		screenshot: cS.default("off"),
		cookies: cS.default("off"),
		confirm: V([
			"sensitive",
			"always",
			"never"
		]).default("sensitive")
	}), uS = lS.extend({ platform: P().min(1) }), dS = R({
		command: P().min(1),
		name: P().min(1).optional(),
		env: P().optional(),
		loginCommand: P().min(1).optional()
	}), fS = V(["openai", "anthropic"]), pS = R({
		baseUrl: vu(),
		protocol: fS.default("openai"),
		apiKey: P().optional(),
		headers: P().optional()
	}), mS = [
		"16384",
		"32768",
		"65536",
		"131072"
	], hS = "65536", gS = 2048, _S = 1048576, vS = R({
		model: P().min(1),
		gpu: V(["on", "off"]).default("off"),
		url: vu().optional(),
		context: Eu([V(mS), H("custom")]).default(hS),
		contextTokens: G().int().min(gS).max(_S).optional()
	}), yS = P().regex(/^\d+(\.\d{1,6})?$/, "a USD amount like 0.50 (up to six decimals: USDC's own precision)"), bS = V(["eip155:8453", "eip155:84532"]), xS = R({
		network: bS.default("eip155:8453"),
		address: P().optional(),
		perPaymentMaxUsd: yS.default("1.00"),
		autoApproveUnderUsd: yS.default("0"),
		dailyCapUsd: yS.default("5.00"),
		allow: P().optional(),
		deny: P().optional()
	}), SS = z("kind", [
		R({
			id: Y,
			kind: H("devops"),
			config: R({})
		}),
		R({
			id: Y,
			kind: H("monorepo"),
			config: R({})
		}),
		R({
			id: Y,
			kind: H("mcp"),
			config: Yx
		}),
		R({
			id: Y,
			kind: H("service"),
			config: Xx
		}),
		R({
			id: Y,
			kind: H("integration"),
			config: Zx
		}),
		R({
			id: Y,
			kind: H("cli"),
			config: Qx
		}),
		R({
			id: Y,
			kind: H("plugin"),
			config: $x
		}),
		R({
			id: Y,
			kind: H("extension"),
			config: eS
		}),
		R({
			id: Y,
			kind: H("ssh"),
			config: tS
		}),
		R({
			id: Y,
			kind: H("vpn"),
			config: Lx
		}),
		R({
			id: Y,
			kind: H("exit"),
			config: sx
		}),
		R({
			id: Y,
			kind: H("docker"),
			config: nS
		}),
		R({
			id: Y,
			kind: H("browser"),
			config: rS
		}),
		R({
			id: Y,
			kind: H("identity"),
			config: iS
		}),
		R({
			id: Y,
			kind: H("host"),
			config: sS
		}),
		R({
			id: Y,
			kind: H("webext"),
			config: uS
		}),
		R({
			id: Y,
			kind: H("agent"),
			config: dS
		}),
		R({
			id: Y,
			kind: H("endpoint"),
			config: pS
		}),
		R({
			id: Y,
			kind: H("localmodel"),
			config: vS
		}),
		R({
			id: Y,
			kind: H("wallet"),
			config: xS
		})
	]), CS = R({
		state: Jx.describe("Whether it is live, still coming up, broken, or switched off."),
		detail: P().optional().describe("What is wrong, in words a person can act on."),
		code: P().optional().describe("A short marker for that reason, for anything deciding what to do about it.")
	}), wS = R({
		id: P().describe("The connection's id."),
		kind: qx.describe("What sort of thing it is."),
		status: CS.describe("Whether it is working."),
		config: B(P(), Eu([
			P(),
			F(),
			I()
		])).describe("Its settings, minus anything secret."),
		secrets: L(P()).default([]).describe("Which credentials it holds, by name. The values are on one route only, and it is not this one.")
	}), TS = R({
		card: P().describe("Which connection is being suggested."),
		evidence: P().describe("What was seen that prompted it: a file, a remote, printed verbatim so the claim can be checked rather than believed."),
		reason: P().describe("The same claim in words, without repeating the evidence into it."),
		prefill: B(P(), P()).describe("Settings the scan could read, to fill the form so you supply only the credential. Never a secret, even when one is sitting in a checked-in file: the suggestion points at such a file, it does not absorb what is in it.")
	}), ES = R({
		capabilities: L(wS).describe("What this sandbox is connected to."),
		recommendations: L(TS).default([]).describe("Things worth connecting, worked out from what is actually in the workspace rather than from anything you configured. Re-derived on every read, so one whose evidence has moved simply stops being suggested.")
	}), DS = R({ id: P().describe("Which connection.") }), OS = R({
		id: P().describe("The connection's id."),
		kind: P().describe("What sort of thing it is."),
		config: B(P(), P()).describe("Its settings exactly as stored, credentials included. The field names are its own kind's, which the caller already knows.")
	}), kS = R({ card: P().describe("Which suggestion to stop making.") }), AS = R({
		id: P().describe("Which connection."),
		value: P().min(1).describe("The new credential. Its other settings are left alone.")
	}), jS = R({
		id: P(),
		to: P().min(1).max(60).regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/)
	}), MS = R({ session: P().describe("The terminal the sign-in is happening in. Attach to it to type.") }), NS = R({
		code: P().describe("The code."),
		secondsRemaining: F().describe("How long it lasts. Its expiring is what makes handing one to an agent safe, since the seed behind it is never revealed.")
	}), PS = R({
		checked: I().describe("Whether this connection can be tested from here at all. False is not a failure: it is 'no test exists'."),
		ok: I().describe("Whether the service answered as itself."),
		message: P().describe("What happened, in the words a person standing in front of the form needs: the service's own answer, or its refusal.")
	});
})), IS, LS, RS, zS = b((() => {
	K(), IS = R({
		url: P(),
		ref: P().optional(),
		path: P().optional()
	}), LS = (e, t, n) => {
		if (typeof e == "string") {
			let r = e.replace(/^\.\//, ""), i = n?.replace(/^\.\//, "").replace(/\/$/, "");
			return {
				url: t,
				path: i !== void 0 && i !== "" ? `${i}/${r}` : r
			};
		}
		if (typeof e != "object" || !e) return;
		let r = e, i = r.sha ?? r.ref;
		if (r.source === "github" && typeof r.repo == "string") return {
			url: `https://github.com/${r.repo}.git`,
			...i === void 0 ? {} : { ref: i }
		};
		if (r.source === "url" && typeof r.url == "string") return {
			url: r.url,
			...i === void 0 ? {} : { ref: i }
		};
		if (r.source === "git-subdir" && typeof r.url == "string" && typeof r.path == "string") return {
			url: r.url,
			path: r.path,
			...i === void 0 ? {} : { ref: i }
		};
	}, RS = /^[0-9a-f]{40}$/;
})), BS, VS, HS, US, WS, GS, KS = b((() => {
	K(), zS(), BS = R({
		sha: P().regex(RS, "must be a full lowercase commit sha"),
		url: P().min(1),
		path: P().min(1).optional(),
		policy: P().min(1),
		reviewer: P().min(1),
		reviewedAt: Wd(),
		runId: P().min(1),
		deterministic: R({
			policy: P().min(1),
			scanner: P().min(1),
			version: P().min(1),
			runId: P().min(1)
		})
	}), VS = V([
		"verified",
		"listed",
		"blocked"
	]), HS = R({
		name: P(),
		description: P().optional(),
		version: P().optional(),
		kind: V(["plugin", "extension"]).optional(),
		trust: VS.optional(),
		trustReason: P().optional(),
		securityReview: BS.optional(),
		securityFix: I().optional(),
		category: P().optional(),
		art: P().max(4096).optional(),
		logo: P().optional(),
		icon: P().optional(),
		homepage: vu().optional(),
		source: Su()
	}).superRefine((e, t) => {
		let n = e.trust ?? "listed";
		if (n === "blocked" && (e.trustReason === void 0 || e.trustReason.trim() === "") && t.addIssue({
			code: "custom",
			path: ["trustReason"],
			message: "a blocked entry must say why"
		}), n === "verified" && e.securityReview === void 0 && t.addIssue({
			code: "custom",
			path: ["securityReview"],
			message: "a verified entry must carry its security review"
		}), e.securityReview === void 0) return;
		let r = LS(e.source, "", void 0);
		(r?.ref !== e.securityReview.sha || r?.url !== e.securityReview.url || r.path !== e.securityReview.path) && t.addIssue({
			code: "custom",
			path: ["securityReview"],
			message: "must equal the exact repository, commit and subdirectory named by source"
		});
	}), R({
		name: P(),
		metadata: R({ pluginRoot: P().optional() }).optional(),
		plugins: L(HS)
	}).superRefine((e, t) => {
		let n = /* @__PURE__ */ new Set();
		for (let r = 0; r < e.plugins.length; r += 1) {
			let i = e.plugins[r]?.name;
			i !== void 0 && n.has(i) && t.addIssue({
				code: "custom",
				path: [
					"plugins",
					r,
					"name"
				],
				message: "entry names must be unique"
			}), i !== void 0 && n.add(i);
		}
	}), US = R({
		sha: P(),
		manifest: P(),
		bundle: P(),
		engines: P().optional()
	}), WS = R({
		name: P(),
		stars: F().int().nonnegative().optional(),
		pushedAt: P().optional(),
		checks: US.optional()
	}), R({
		scannedAt: P(),
		entries: L(WS)
	}), GS = R({
		name: P(),
		description: P().optional(),
		version: P().optional(),
		kind: V(["plugin", "extension"]),
		trust: VS,
		trustReason: P().optional(),
		securityReview: BS.optional(),
		admitted: I(),
		securityFix: I().optional(),
		category: P().optional(),
		art: P().optional(),
		logo: P().optional(),
		icon: P().optional(),
		homepage: P().optional(),
		install: IS.optional(),
		stars: F().int().nonnegative().optional(),
		pushedAt: P().optional(),
		checks: US.optional()
	});
})), qS = b((() => {
	KS(), zS();
})), JS, YS, XS = b((() => {
	K(), qS(), JS = R({
		url: vu().describe("The registry to read."),
		token: P().min(1).optional().describe("A credential for a private one. Sent as a body rather than in the address, so it never lands in a log.")
	}), YS = R({
		name: P().describe("What the registry calls itself."),
		plugins: L(GS).describe("What it lists, each with the curated decision, the resolved pointer and what a scan found upstream.")
	});
})), ZS, QS, $S, eC = b((() => {
	K(), ZS = R({
		url: vu().describe("The repository to ask. http(s) only: an ssh remote would stop on a host-key prompt nobody can answer."),
		token: P().min(1).optional().describe("A credential for a private one. Sent as a body rather than in the address, so it never lands in a log. A form editing a live connection has never been shown its token: it sends the VAULTED marker here and names the connection in `keeping`, so a private repository still answers without anyone retyping a key."),
		keeping: P().min(1).optional().describe("Which connection a VAULTED token belongs to. Ignored when a real token is sent.")
	}), QS = R({
		name: P().describe("The branch or tag as a person names it: `main`, `v1.4.0`."),
		kind: V(["branch", "tag"]),
		sha: P().regex(/^[0-9a-f]{40}$/).describe("The commit it points at. An annotated tag is peeled here, so this is always a commit, never a tag object.")
	}), $S = R({
		defaultBranch: P().optional().describe("The branch the remote advertises as HEAD, the one to offer first. Absent when the remote advertises no symref."),
		refs: L(QS).describe("Every branch the remote advertises, then every tag. Which to offer first is the reader's question, not this one's.")
	});
})), tC, nC = b((() => {
	J(), tx(), FS(), XS(), eC(), $(), tC = {
		list: q.route({
			method: "GET",
			path: "/capabilities",
			summary: "Everything this sandbox is connected to",
			description: "Each connection with its live state, the settings that are safe to show, and the names of the credentials it holds. The values of those credentials are never in the answer, on any route but one."
		}).output(ES),
		add: q.route({
			method: "POST",
			path: "/capabilities",
			summary: "Connect something, or change a connection",
			description: "Writes a connection and streams the work of applying it, because some kinds provision real infrastructure and take a while. Sending an id that already exists edits that connection: this is the edit as well as the create. Since a caller is never shown stored credentials, it marks the ones it is leaving alone and the daemon fills them in, which is the only way to change one setting without retyping a key."
		}).input(SS).output(Jf(Rb)),
		probe: q.route({
			method: "POST",
			path: "/capabilities/probe",
			summary: "Test a connection's settings without saving them",
			description: "Dials the service the way this connection would and hands back what it said, before anything is written. The answer is the service's own confirmation or its exact refusal, so a wrong token or an unreachable host is found on the form rather than on a card afterwards."
		}).input(SS).output(PS),
		remove: q.route({
			method: "DELETE",
			path: "/capabilities/{id}",
			summary: "Disconnect something",
			description: "Tears a connection down. The kinds that own real infrastructure refuse, because deleting those would be losing data rather than losing a connection."
		}).input(DS).output(Z),
		rename: q.route({
			method: "POST",
			path: "/capabilities/{id}/rename",
			summary: "Rename a connection",
			description: "Carries everything the old name keyed across with it: a browser profile and its logins, an enrolled machine, an extension's copy of its source. Removing and re-adding would lose exactly the state that made the connection worth keeping. Kinds whose name is part of what they are refuse."
		}).input(jS).output(Z),
		setSecret: q.route({
			method: "POST",
			path: "/capabilities/{id}/secret",
			summary: "Replace a stored credential",
			description: "Swaps one connection's key or token for a new one and re-applies it, without touching any of its other settings."
		}).input(AS).output(Z),
		status: q.route({
			method: "GET",
			path: "/capabilities/{id}/status",
			summary: "Re-check one connection",
			description: "Probes a single connection right now, for a screen that wants to refresh one row rather than the whole list."
		}).input(DS).output(CS),
		connection: q.route({
			method: "GET",
			path: "/capabilities/{id}/connection",
			summary: "A connection's settings, credentials included",
			description: "The one call that hands back stored secrets, so an extension's own backend can dial the service behind a connection. Never answered for a signed-in person: only a machine credential reaches it, and an extension's only if its manifest asked for this route out loud at install time."
		}).input(DS).output(OS),
		marketplace: q.route({
			method: "POST",
			path: "/capabilities/marketplace",
			summary: "Read a plugin marketplace",
			description: "Resolves a plugin marketplace source into the list of connections you could install from it."
		}).input(JS).output(YS),
		refs: q.route({
			method: "POST",
			path: "/capabilities/refs",
			summary: "The versions a repository offers",
			description: "Asks a git remote what it advertises and hands back every branch and tag with the commit it points at, plus which branch is its default. Nothing is cloned and nothing is written, so this is cheap enough to answer a form as someone types a repository into it."
		}).input(ZS).output($S),
		dismiss: q.route({
			method: "DELETE",
			path: "/capabilities/recommendations/{card}",
			summary: "Stop suggesting this connection",
			description: "Not needed, for now. Nothing is torn down. The suggestion comes back if what prompted it in the workspace changes, because what is remembered is the evidence, not the refusal."
		}).input(kS).output(Z),
		login: q.route({
			method: "POST",
			path: "/capabilities/{id}/login",
			summary: "Sign in to a connection by hand",
			description: "Opens the connection's own sign-in in a terminal a person can type into, for the flows that need a code pasted or a device confirmed. The answer names the terminal to attach to."
		}).input(DS).output(MS),
		otp: q.route({
			method: "GET",
			path: "/capabilities/{id}/otp",
			summary: "Mint a one-time code",
			description: "Generates a single two-factor code from a stored seed. The one credential-adjacent read an agent is allowed, and it is safe because a code expires in seconds and never reveals the seed, so an agent can answer a prompt without ever holding the factor."
		}).input(DS).output(NS)
	};
})), rC, iC, aC, oC, sC, cC, lC, uC = b((() => {
	K(), rC = R({
		query: P().min(2).max(512).describe("What to look for. Plain words, a pattern, a symbol name, or a question."),
		mode: V([
			"q",
			"find",
			"files",
			"def",
			"refs",
			"sym",
			"ast"
		]).optional().describe("Narrow the search to one kind: plain text, filenames, definitions, references, symbols, or code structure. Leave it out to blend them, which also answers a question asked in words."),
		includeIgnored: Vd().optional().describe("Search inside installed packages and other ignored folders too."),
		literal: Vd().optional().describe("Treat the query as fixed text rather than a pattern."),
		word: Vd().optional().describe("Match whole words only."),
		caseSensitive: Vd().optional().describe("Whether capitals matter. Off means they do not, rather than being guessed at from the query."),
		include: P().max(512).optional().describe("Which files to ask, in the same grammar an editor's files-to-include box takes: comma-separated patterns, matched at any depth unless anchored, a leading exclamation mark excluding instead."),
		limit: G().int().positive().optional().describe("How many results to return."),
		after: P().optional().describe("Resume from the cursor a previous answer handed back.")
	}), iC = R({
		kind: V([
			"def",
			"text",
			"sem",
			"bm25",
			"rerank",
			"path",
			"import",
			"call",
			"type",
			"write",
			"fuzzy",
			"heuristic"
		]).describe("Why this line matched: the literal text, its meaning, the path, a definition, a call, and so on. Several kinds can agree on one line."),
		score: F().optional().describe("How strongly that reason applied.")
	}), aC = R({
		start: F().describe("First character of the match within the line."),
		end: F().describe("One past the last.")
	}), oC = R({
		line: F().describe("Which line, counting from one."),
		text: P().describe("The line itself."),
		spans: L(aC).describe("Where in the line the matches are, so you can highlight without searching again. Empty when the whole line is the match rather than part of it."),
		tags: L(iC).describe("Why it matched."),
		context: P().optional().describe("What it sits inside: the function, the class, the heading. Often enough that you need not open the file.")
	}), sC = R({
		path: P().describe("The file."),
		score: F().describe("How well it matched. Groups arrive best first, never in path order."),
		hits: L(oC).describe("The matching lines in it."),
		capped: I().optional().describe("This file had more matches than are kept per file, so the count is a floor. Say fifty-plus rather than fifty.")
	}), cC = R({
		state: V([
			"fresh",
			"building",
			"stale"
		]).describe("Whether the index matches what is on disk, is still filling, or has fallen behind."),
		ageMs: F().optional().describe("How long since it last matched the disk, in milliseconds."),
		progress: F().optional().describe("How far through building it is, from zero to one."),
		behind: F().optional().describe("How many files it has not caught up with. Worth showing, because the word stale on its own reads as a warning about the answer, which it almost never is.")
	}), lC = R({
		mode: P().describe("Which kind of search actually ran, which matters when you let it choose."),
		total: F().describe("Matching lines across the whole workspace, not just this page."),
		files: F().describe("Files the query matched in total."),
		shown: F().describe("How many of those lines are on this page."),
		groups: L(sC).describe("The results, grouped by file, best first."),
		freshness: cC.describe("Whether the index behind the answer is up to date."),
		truncated: I().describe("This page is not all of it. Use the cursor."),
		partial: I().optional().describe("At least one file had more matches than are kept per file, so the total is a floor. Different from the page being truncated: a complete page can still count partially."),
		cursor: P().optional().describe("Pass this back as `after` to get the next page."),
		hint: P().optional().describe("A suggestion for getting a better answer out of this query."),
		note: P().optional().describe("What the engine did that you did not ask for: a pattern rerun as plain text because it was not valid, escapes rewritten, a language filter that matched nothing."),
		related: L(P()).optional().describe("Places next door to the best results: where each is defined, and whatever calls it most."),
		candidates: L(P()).optional().describe("Ranked places that scored but did not make the page, best first. The answer often sits at rank five to thirteen, so this saves paging through to find out."),
		features: L(P()).optional().describe("Which stages of the search were switched off for this run. Absent means all of them ran.")
	});
})), dC, fC, pC, mC, hC = b((() => {
	K(), uC(), dC = R({
		repo: P().min(1).describe("Which repository, using the same ids the git routes take."),
		since: P().max(16).optional().describe("How far back to count changes, written as a span such as 2d, 12h, 1w or 3m. Leave it out for all of history."),
		limit: G().int().positive().max(200).optional().describe("How many files and modules to rank. A leaderboard rather than an inventory: past a screenful the ranking stops being the point.")
	}), fC = R({
		path: P(),
		commits: F(),
		adds: F(),
		dels: F(),
		complexity: F(),
		score: F(),
		latestMs: F()
	}), pC = R({
		path: P(),
		exports: F()
	}), mC = R({
		repo: P().describe("Which repository this describes."),
		totals: R({
			files: F().describe("Files counted."),
			symbols: F().describe("Named things they export."),
			complexity: F().describe("Branch points across all of them added up."),
			hotspots: F().describe("How many files qualify as hotspots at all. The list below is capped; this is not.")
		}).describe("Counts anybody could recount in the files themselves. Deliberately no single maintainability grade: those cannot be checked and are not comparable between projects."),
		hotspots: L(fC).describe("Files that change often and are complicated at the same time, worst first."),
		modules: L(pC).describe("The parts of the codebase the rest of it leans on most."),
		freshness: cC.describe("Whether the index these numbers were read from is up to date.")
	});
})), gC, _C, vC, yC, bC, xC, SC, CC, wC, TC, EC, DC, OC, kC, AC, jC, MC, NC, PC, FC, IC, LC, RC, zC = b((() => {
	K(), hC(), gC = [
		"outdated",
		"audit",
		"knip",
		"jscpd",
		"ui",
		"bundle",
		"mutation"
	], _C = V(gC), vC = R({
		name: P().describe("The dependency."),
		current: P().describe("What you are on."),
		latest: P().describe("What is published."),
		kind: V([
			"major",
			"minor",
			"patch"
		]).describe("How far apart those are. This is not one number because forty patch releases behind is a morning's work and one major version is a project."),
		section: P().describe("Which part of the manifest declares it. A major version behind on a build-time tool is a different risk from one that ships.")
	}), yC = R({
		name: P().describe("The dependency it concerns."),
		severity: V([
			"critical",
			"high",
			"moderate",
			"low",
			"info"
		]).describe("How bad it is said to be."),
		title: P().describe("What it is, in one line. No scoring vector and no reference list: those are for reading on the advisory's own page, and carrying them would put a kilobyte of prose per finding on every poll."),
		patched: P().optional().describe("Which versions fix it. Absent means no fix has been published, which is exactly when nothing should offer to upgrade and something should say so instead."),
		dev: I().describe("Whether it only reaches build-time tooling, which is a different problem from one that reaches what you ship.")
	}), bC = R({
		files: F().int().nonnegative().describe("Files nothing reaches."),
		exports: F().int().nonnegative().describe("Exported things nothing uses."),
		types: F().int().nonnegative().describe("Types nothing uses."),
		dependencies: F().int().nonnegative().describe("Declared dependencies nothing imports."),
		devDependencies: F().int().nonnegative().describe("The same, for build-time ones."),
		sample: L(P()).describe("A handful of the files, so a reader need not take the count on faith. Counts and a sample rather than the whole list, because an agent re-measures against the live tree anyway.")
	}), xC = R({
		percentage: F().describe("How much of the scanned code is duplicated. A share rather than a count, because a count grows with the repository and would mean something different every quarter."),
		clones: F().int().nonnegative().describe("How many duplicated stretches were found."),
		top: L(R({
			lines: F().int().nonnegative().describe("How long the duplicated stretch is."),
			first: P().describe("One of the two places."),
			second: P().describe("The other.")
		})).describe("The largest of them.")
	}), SC = R({
		components: L(P()).describe("The interface's own source files, with tests, stories and generated output left out."),
		bypasses: L(R({
			path: P().describe("The file."),
			count: F().int().positive().describe("How many times, in that file.")
		})).describe("Where the design system was routed around and a value hard-coded instead. Counted per file, because a reader deciding what to open is served by a file and a number, not by eleven snippets."),
		idioms: L(R({
			id: P().describe("Which outdated idiom. Looked up rather than listed here, so a sandbox one version behind can still report one this list has never heard of."),
			files: L(P()).describe("The files still on it.")
		})).describe("Files still written the way their framework has since replaced.")
	}), CC = R({
		dir: P().describe("Which folder was measured. Read from build output already on disk rather than by building, so this is sometimes a commit behind and never leaves anything in your working tree."),
		totalBytes: F().int().nonnegative().describe("The whole thing, raw."),
		totalGzip: F().int().nonnegative().describe("The whole thing, compressed. The ratio between the two is the difference between big and big-and-incompressible, which are different problems."),
		assets: L(R({
			path: P().describe("The file."),
			bytes: F().int().nonnegative().describe("Its raw size."),
			gzip: F().int().nonnegative().describe("Its compressed size.")
		})).describe("What is in it, piece by piece.")
	}), wC = R({
		score: F().describe("The share of injected faults the suite caught. Not a coverage figure: coverage says a line ran, this says an assertion depended on it."),
		killed: F().int().nonnegative().describe("Faults the suite caught."),
		survived: F().int().nonnegative().describe("Faults it did not: code that can be broken with every test still green."),
		inconclusive: F().int().nonnegative().describe("Faults it never got a verdict on, because they would not compile or were configured out. Left out of the score entirely, since neither answer is known."),
		survivors: L(R({
			file: P().describe("Where it is."),
			line: F().int().nonnegative().describe("Which line."),
			mutator: P().describe("What was changed, in the mutation tool's own vocabulary."),
			replacement: P().describe("What it became, so a reader can judge whether it matters without opening the file.")
		})).describe("The surviving faults themselves. A percentage is a mood; a named line with the change that went unnoticed is a morning's work.")
	}), TC = V([
		"ok",
		"unavailable",
		"failed"
	]), EC = z("id", [
		R({
			id: H("outdated"),
			packages: L(vC)
		}),
		R({
			id: H("audit"),
			advisories: L(yC)
		}),
		R({
			id: H("knip"),
			deadCode: bC
		}),
		R({
			id: H("jscpd"),
			duplication: xC
		}),
		R({
			id: H("ui"),
			scan: SC
		}),
		R({
			id: H("bundle"),
			bundle: CC
		}),
		R({
			id: H("mutation"),
			mutation: wC
		})
	]), DC = R({
		id: _C.describe("Which measurement this is."),
		state: TC.describe("Whether the tool ran and reported, is not part of this repository at all, or broke. The middle one is not evidence of health: the check simply cannot be made here."),
		ranAt: F().describe("When it last finished, in milliseconds, which is what its age is measured from."),
		tookMs: F().int().nonnegative().describe("How long it took. Worth knowing before asking for it again: some of these run for minutes."),
		facts: EC.optional().describe("What it found, including finding nothing, which is a real answer and the one that keeps a chore quiet."),
		reason: P().optional().describe("Why it broke, quoted from the tool rather than summarised, or, when it never ran, what is missing. Never a sentence built from the check's own name, which would have an unmeasured check claiming there is nothing to measure.")
	}), OC = R({
		dir: P().describe("Where the package lives."),
		name: P().describe("What it declares itself as."),
		engines: B(P(), P()).optional().describe("Which runtime versions it says it needs, verbatim."),
		dependencies: L(P()).describe("What it depends on."),
		devDependencies: L(P()).describe("What it needs only to build."),
		documented: I().describe("Whether it has a README, which in this workspace is what a package's own documentation is.")
	}), kC = R({
		docs: L(P()).describe("The repository's own architecture documents, when it has any. Their existence is the question: a repository with none has never been through the documentation flow at all."),
		dockerfiles: L(P()).describe("Container definitions in it."),
		ci: L(P()).describe("Pipeline definitions in it."),
		lockfile: I().describe("Whether dependencies are pinned to exact versions, which is what makes a security audit mean anything."),
		packageManifest: I().describe("Whether it is a JavaScript project at all. A Rust or Go repository has no majors to be behind on, and offering it those checks would be this surface guessing at what it is looking at."),
		deps: L(P()).describe("Every dependency name declared anywhere in the repository. Names rather than a verdict about which framework this is, because that judgement belongs to whatever reads this, not to a sandbox baked months ago.")
	}), AC = R({
		packages: L(OC).describe("Each package in the repository, as its own manifest declares it."),
		shape: kC.describe("What the repository is made of, which decides whether a given chore is even a sensible question to ask of it."),
		hotspots: L(fC).describe("Files that change often and are complicated at once, capped tight: a chore only asks whether something has entered the top of the ranking."),
		keyModules: L(pC).describe("The parts the rest of the code leans on most, capped the same way."),
		totals: R({
			files: F().describe("Files counted."),
			symbols: F().describe("Named things they export."),
			complexity: F().describe("Branch points added up."),
			hotspots: F().describe("How many files qualify as hotspots at all.")
		}).describe("The repository in numbers."),
		indexed: I().describe("Whether the index these rankings came from is finished. Nothing should act on a half-built one.")
	}), jC = V([
		"acted",
		"reported",
		"clean"
	]), MC = R({
		repo: P().describe("Which repository."),
		chore: P().describe("Which chore."),
		ranAt: F().describe("When it ran, in milliseconds."),
		runId: P().describe("The conversation that ran it, so its whole record can be opened."),
		outcome: jC.describe("What it concluded: it did something, it wrote something down, or it looked and found the finding to be false. That last one matters most, or the same turn starts again for ever."),
		digest: P().describe("A fingerprint of the evidence standing at the time. A chore whose evidence has since changed is due again on its own merits; one whose evidence has not stays quiet."),
		snoozedUntil: F().optional().describe("Not until then, in milliseconds. The chore stays visible and stays out of the badge. Different from switching it off, which is a setting.")
	}), NC = R({
		repo: P().describe("Which repository."),
		id: _C.describe("Which measurement."),
		askedAt: F().describe("When it was asked for, in milliseconds, so one still waiting can say how long it has waited."),
		startedAt: F().optional().describe("When it actually began. Absent while it is queued behind another, which is a real and common state: there is one lane for the whole sandbox.")
	}), PC = R({
		repos: L(R({
			repo: P().describe("Which repository."),
			probes: L(DC).describe("The expensive measurements, served from a cache with an age on each rather than run on demand."),
			signals: AC.describe("The cheap facts, worked out fresh every time.")
		})).describe("Every repository's standing evidence. One answer for all of them, because a badge polls this on a timer and one request per repository is the kind of poll that shows up in a battery graph."),
		ledger: L(MC).describe("What has already been done about all of it."),
		running: L(NC).describe("What is being measured right now and what is waiting behind it. Part of this read rather than a route of its own, because a screen that had to ask twice would show the two halves disagreeing."),
		node: P().describe("The runtime version this sandbox is actually running, read off the process rather than off a manifest, because what is installed is the fact that matters and a declared range is a wish.")
	}), FC = R({
		repo: P().min(1).describe("Which repository."),
		id: _C.describe("Which measurement to retake, ahead of its usual schedule.")
	}), IC = MC, LC = R({
		id: P().describe("Which check."),
		label: P().describe("What it is called."),
		status: V([
			"pass",
			"warn",
			"fail"
		]).describe("How it went. A warning is a real third answer rather than a soft failure."),
		detail: P().describe("What it found.")
	}), RC = R({ checks: L(LC).describe("Everything that can be checked from the extension's own files, for an author about to publish.") });
})), BC, VC = b((() => {
	J(), zC(), $(), BC = {
		list: q.route({
			method: "GET",
			path: "/chores",
			summary: "What maintenance the repos are asking for",
			description: "Every repo's standing evidence in one read: what the last measurement found and how old it is, the cheap signals that are always current, and what has already been decided about each."
		}).output(PC),
		probe: q.route({
			method: "POST",
			path: "/chores/probe",
			summary: "Measure one repo again now",
			description: "Re-runs a single check without waiting for it to go stale. Answers immediately: the work happens in the background and the result turns up in the next read, because some of these sweeps outlive any sane request."
		}).input(FC).output(Z),
		record: q.route({
			method: "POST",
			path: "/chores/ledger",
			summary: "Record a verdict, or snooze one",
			description: "Writes what somebody concluded about one repo's chore, replacing the previous verdict. A chore has one current answer, not a growing pile of times it was fine."
		}).input(IC).output(Z)
	};
})), HC, UC = b((() => {
	J(), ay(), $(), HC = {
		runs: q.route({
			method: "GET",
			path: "/ci/runs",
			summary: "Pipeline runs across the repos",
			description: "What the forges are reporting for every workspace repo that has a remote, served from a cache and filled in on demand. Repos whose notifications are not wired up say so."
		}).output($v),
		rerun: q.route({
			method: "POST",
			path: "/ci/runs/rerun",
			summary: "Run a pipeline again",
			description: "Asks the forge to re-run one pipeline. The daemon only passes the request along."
		}).input(ey).output(Z),
		cancel: q.route({
			method: "POST",
			path: "/ci/runs/cancel",
			summary: "Cancel a pipeline run",
			description: "Asks the forge to stop a run in progress."
		}).input(ey).output(Z),
		jobs: q.route({
			method: "POST",
			path: "/ci/runs/jobs",
			summary: "The steps inside one pipeline run",
			description: "Each job in a run with its outcome, which is where you look to find out what actually broke."
		}).input(ey).output(Zv),
		fix: q.route({
			method: "POST",
			path: "/ci/fix",
			summary: "Put an agent on a broken pipeline",
			description: "Opens a fresh isolated conversation already holding the failure: which job, which repo, what it said. The answer names the conversation so you can open it."
		}).input(ty).output(ny)
	};
})), WC, GC, KC, qC = b((() => {
	J(), K(), FS(), Tm(), WC = V([
		"unknown",
		"healthy",
		"degraded",
		"unavailable"
	]), GC = R({
		available: I(),
		allowance: F().int().nonnegative(),
		used: F().int().nonnegative(),
		remaining: F().int().nonnegative(),
		health: WC,
		resetsAt: P().optional(),
		retryAt: P().optional(),
		servedModel: P().optional()
	}), KC = {
		models: q.route({
			method: "GET",
			path: "/endpoints/{id}/models",
			summary: "Models a connected server offers",
			description: "Asks one configured model server what it serves. There is no built-in list and no fallback: what a server offers is knowable only by asking it, so an empty answer is the honest report that we could not."
		}).input(DS).output(wm),
		trial: q.route({
			method: "GET",
			path: "/endpoints/trial/status",
			summary: "What is left of the free trial",
			description: "The allowance, what has been used, when it resets, and which model actually answered the last message. Not being available is the ordinary answer rather than a failure: most sandboxes run against a platform that offers no trial at all."
		}).output(GC)
	};
})), JC, YC = b((() => {
	J(), tx(), gx(), $(), JC = {
		list: q.route({
			method: "GET",
			path: "/exit",
			summary: "Ways to come out somewhere else",
			description: "Every configured exit with its live state, the country it was asked to appear in, and the country it actually appears in. Those last two disagreeing is the whole reason this reports both."
		}).output(px),
		countries: q.route({
			method: "GET",
			path: "/exit/{id}/countries",
			summary: "Countries one exit can reach",
			description: "Where this exit can put you, ranked by how much capacity is really there. Asked of the provider when it answers and taken from a built-in list when it does not, and the answer says which of those you got."
		}).input(mx).output(dx),
		start: q.route({
			method: "POST",
			path: "/exit/{id}/start",
			summary: "Bring an exit up",
			description: "Starts the exit in the country it was configured for. Streamed, because a first start fetches a catalogue, raises a tunnel and then checks the address, which takes tens of seconds on the free providers and can fail at each step with something worth reading. Starting one that is already up simply says so."
		}).input(mx).output(Jf(Rb)),
		use: q.route({
			method: "POST",
			path: "/exit/{id}/use",
			summary: "Move to another country",
			description: "Switches the exit's country, starting it first if it was down. It ends by checking where the world actually sees you and fails if that does not match what you asked for. A switch that quietly left your traffic where it was is the exact failure this whole feature exists to rule out."
		}).input(hx).output(Jf(Rb)),
		rotate: q.route({
			method: "POST",
			path: "/exit/{id}/rotate",
			summary: "Take a different address, same country",
			description: "Swaps to another address in the country you are already in. Fails if the address does not actually change, which on a small pool it sometimes cannot."
		}).input(mx).output(Jf(Rb)),
		check: q.route({
			method: "POST",
			path: "/exit/{id}/check",
			summary: "Where the world sees you right now",
			description: "Looks up the address and country as seen through this exit. Cheap, and the honest answer to whether you are really where you meant to be, which is what every other call here is judged against."
		}).input(mx).output(lx),
		stop: q.route({
			method: "POST",
			path: "/exit/{id}/stop",
			summary: "Take an exit down",
			description: "Shuts the exit off. One that was already down is fine: the promise is that it is not up afterwards, not that it was up before."
		}).input(mx).output(Z)
	};
})), XC, ZC, QC, $C, ew, tw, nw, rw, iw, aw, ow, sw, cw, lw, uw, dw, fw, pw, mw, hw, gw, _w, vw, yw, bw, xw = b((() => {
	K(), XC = P().min(1).max(121).regex(/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/), ZC = R({
		updates: V([
			"notify",
			"agent",
			"auto"
		]),
		advisories: V(["auto-disable", "notify"])
	}), QC = R({
		ref: P().describe("The commit being offered."),
		version: P().optional().describe("What it calls itself."),
		url: P().describe("Where it comes from."),
		path: P().optional().describe("Where inside that repository it lives."),
		trust: V(["verified", "listed"]).describe("Whether anybody vouched for it, or it is merely listed."),
		securityFix: I().optional().describe("This release fixes a security problem in earlier ones, so here the old version is the dangerous one."),
		registry: P().describe("Which registry said so."),
		at: P().describe("When it was published."),
		needsReview: P().optional().describe("Why this one was not taken automatically and is asking for a person instead: it wants more than it used to, or nobody has vouched for it."),
		review: R({
			conversationId: P().describe("Where to read what it found."),
			at: P().describe("When it looked.")
		}).optional().describe("An agent has already read the difference between what is installed and this, so the card can link to what it found rather than offer to start looking.")
	}), $C = R({
		reason: P().describe("Why the registry pulled the listing, in its own words. Delisting protects people browsing; this record is for the person already running it."),
		registry: P().describe("Which registry said so."),
		at: P().describe("When."),
		autoDisabled: I().describe("Whether the sandbox has already switched it off.")
	}), ew = R({
		state: V([
			"watching",
			"healthy",
			"unhealthy"
		]).describe("How it has behaved since the last update. Checks catch broken, not wrong, so for a while after a swap it is simply watched."),
		detail: P().optional().describe("What is going wrong, when something is."),
		fromRef: P().optional().describe("Which version it was updated from, which is what going back would return to."),
		at: P().describe("When the watching started."),
		autoReverted: I().optional().describe("The update was already rolled back without anybody asking. The record stays rather than pretending the attempt never happened.")
	}), tw = R({
		added: L(P()).describe("What the new version asks for that the running one does not. The whole point of the comparison."),
		removed: L(P()).describe("What it no longer asks for."),
		unchanged: L(P()).describe("What stays the same.")
	}), nw = R({
		id: XC.describe("Which extension."),
		ref: P().regex(/^[0-9a-f]{40}$/).optional().describe("Which commit, in full. Leave it out for whatever the last check found, which is what most callers mean.")
	}), rw = R({
		ref: P().describe("The commit this would install."),
		version: P().describe("What that version calls itself."),
		installedVersion: P().describe("What is running now."),
		engines: P().describe("Which sandbox versions the new one says it needs."),
		compatible: I().describe("Whether this sandbox is one of them."),
		powers: tw.describe("Exactly what the new code asks for that the running one does not. This is what approving an update is approving.")
	}), iw = R({
		ok: H(!0).describe("It went through."),
		ref: P().describe("Which commit is now running."),
		rebuildNeeded: I().optional().describe("The new version changes what the sandbox image contains, so a one-time rebuild is still pending and the update is not wholly landed yet.")
	}), aw = R({
		id: XC.describe("Which extension."),
		updates: V([
			"notify",
			"agent",
			"auto"
		]).optional().describe("What to do about a newer version: tell you, have an agent read the difference first, or just take it."),
		advisories: V(["auto-disable", "notify"]).optional().describe("What to do about a security warning: switch it off at once, or tell you.")
	}), ow = R({
		ok: H(!0).describe("The check ran."),
		checkedAt: P().describe("When, so a screen can date the answer.")
	}), sw = R({
		id: XC.describe("The extension's id."),
		manifest: r.describe("What it declares about itself: what it contributes, what it needs, and what it may reach."),
		commit: P().describe("Exactly which commit is installed."),
		source: V([
			"builtin",
			"installed",
			"workspace"
		]).describe("Where the code comes from: baked into the sandbox image and not removable, installed from a repository at a pinned commit, or written in this workspace and edited in place."),
		enabled: I().describe("The owner's switch. A switched-off extension is still listed, which is what makes it switchable back on, but nothing it contributes is wired up."),
		essential: I().optional().describe("Its switch is fixed on, because it is the only way to see or stop an engine the sandbox runs regardless. Hiding that page would not stop the spending, only your ability to notice it. Declared by the core about its own surfaces, never by an extension about itself, which would be a pack making itself un-removable."),
		usage: B(P(), R({
			calls: F().int().nonnegative().describe("How many times."),
			last: P().describe("When, most recently.")
		})).optional().describe("How much of the reach it asked for it has actually used, keyed by what it declared. Absent means never observed doing anything, which is a different claim from uses none of them, and the two have to stay tellable apart: reading either as these permissions are unnecessary turns evidence into a guess with a number on it."),
		backend: R({
			state: V([
				"running",
				"error",
				"absent",
				"incompatible",
				"starting",
				"stopped"
			]).describe("How its server half is doing. Absent means the code is not in this image at all; incompatible means it needs a different sandbox version."),
			detail: P().optional().describe("What went wrong, so a backend that failed to start is a sentence rather than an address that answers nothing.")
		}).optional().describe("Present only for an extension that ships a server half."),
		update: QC.optional().describe("A newer version waiting. All five of these exist only for one installed from a repository: a built-in updates with the image and one written here is edited live."),
		advisory: $C.optional().describe("A security warning about the installed version."),
		health: ew.optional().describe("How it has behaved since the last update, which is what decides whether that update sticks."),
		previous: R({
			ref: P().describe("The commit that was running before."),
			version: P().optional().describe("What it called itself.")
		}).optional().describe("The version kept one step back, which is what going back means."),
		updatePolicy: ZC.optional().describe("The owner's standing answer for this one: tell me, have an agent look, or just do it.")
	}), cw = R({
		dir: P().describe("Which folder."),
		error: P().describe("Why it could not be read.")
	}), lw = R({
		extensions: L(sw).describe("What is installed."),
		invalid: L(cw).describe("Extensions written here that could not be read at all. Listed rather than dropped, because there is no install moment at which to reject a broken one, so this is its only way of saying anything."),
		updatesCheckedAt: P().optional().describe("When updates were last looked for. Absent until the first check has run. Sent so a screen can say checked an hour ago rather than presenting staleness as certainty.")
	}), uw = R({
		settings: B(P(), Eu([
			P(),
			F(),
			I()
		])).describe("The values, minus anything marked secret."),
		secretsSet: L(P()).describe("Which of its secret settings actually hold a value. Names only: the values themselves never come back.")
	}), dw = R({
		id: P().describe("Which extension."),
		settings: B(P(), Eu([
			P(),
			F(),
			I()
		])).describe("The values to write. A key the extension never declared is refused rather than quietly stored.")
	}), fw = R({
		id: P().describe("Which extension."),
		enabled: I().describe("On or off.")
	}), pw = R({
		publisher: P().regex(/^[a-z0-9][a-z0-9-]*$/).describe("Who it is by, which together with the name makes its id."),
		name: P().regex(/^[a-z0-9][a-z0-9-]*$/).describe("What it is called.")
	}), mw = R({
		id: P().describe("The id it was given."),
		dir: P().describe("Where its files are, so you can open them.")
	}), hw = R({
		id: P().describe("The name the owner gave it, which is also the agent's handle for it."),
		kind: P().describe("Which core kind it is underneath: cli, browser, host or webext."),
		card: P().describe("The card it was added from, named as the grid names it."),
		secrets: L(P()).describe("Credential fields stored for it, by name. The values are deleted with the entry and cannot be recovered from here."),
		effect: P().describe("What tearing it down actually takes away, in one sentence.")
	}), gw = R({
		id: XC.describe("The extension's id, as the list addresses it."),
		name: P().describe("Its publisher.name identity, which is the key its settings and switch are stored under."),
		version: P().describe("The version being removed."),
		source: V([
			"builtin",
			"installed",
			"workspace"
		]).describe("Where its code comes from, which decides what removal means."),
		blocked: P().optional().describe("Why this one cannot be removed, when it cannot. Present means every other field is what would go if it could."),
		files: L(R({
			path: P().describe("Workspace-relative."),
			detail: P().describe("What is in there.")
		})).describe("Directories deleted outright. For an extension written here this is the owner's own source, which nothing else keeps a copy of."),
		connections: L(hw).describe("Connections configured from its cards, which are removed with it."),
		settings: L(R({
			key: P().describe("Which setting."),
			secret: I().describe("Whether its value is a stored credential.")
		})).describe("Values the owner entered for this extension that are forgotten. Only keys actually holding a value are listed."),
		processes: L(P()).describe("Background processes it declared, stopped before its files go."),
		automations: L(P()).describe("Automations of the owner's own that wake on a listener this extension provides. They are NOT removed, and are listed because they stop firing, which is the sort of thing a removal is otherwise discovered by."),
		rebuildNeeded: I().describe("It bakes a layer into the sandbox image, so what it added to the image is only gone after the next environment rebuild."),
		keeps: L(P()).describe("What removal deliberately leaves alone, so the list of what goes can be read as complete.")
	}), _w = R({
		ok: H(!0).describe("It is gone."),
		connections: L(P()).describe("Which configured connections went with it, by name."),
		rebuildNeeded: I().optional().describe("Its image layer is still in the running sandbox until the next environment rebuild; nothing else is pending.")
	}), vw = R({ reports: B(P(), B(P(), F().int().positive())).describe("Each extension that called something, and the counts against the declared powers it exercised.") }), yw = R({
		id: P().describe("Which extension."),
		name: P().describe("Which of its declared processes.")
	}), bw = R({
		name: P().describe("Which process."),
		running: I().describe("Whether it is up. False with a port means it crashed and the supervisor is waiting to retry it."),
		port: F().optional().describe("The port it was given."),
		restarts: F().optional().describe("How many times it died and was brought back since it was started. A growing number is a service in trouble."),
		lastExitCode: F().optional().describe("How it last exited, when it has crashed at least once."),
		previewUrl: P().optional().describe("Where to open it, when it has an address.")
	});
})), Sw, Cw = b((() => {
	J(), FS(), xw(), zC(), $(), Sw = {
		list: q.route({
			method: "GET",
			path: "/extensions",
			summary: "Installed extensions",
			description: "Every extension installed here, resolved to the manifest the owner approved, which is what the app boots its extension host from. The code itself is served separately, because raw script bytes are not a JSON answer."
		}).output(lw),
		create: q.route({
			method: "POST",
			path: "/extensions/workspace",
			summary: "Write a new extension in place",
			description: "Scaffolds a working extension into this workspace and installs it. The only call here that creates one, and it exists because that folder is otherwise reachable only through an agent's file tools, which is a fine way to change an extension and a poor way to meet the idea of one."
		}).input(pw).output(mw),
		removalPlan: q.route({
			method: "GET",
			path: "/extensions/{id}/removal",
			summary: "What removing an extension would take away",
			description: "Everything one removal destroys, before it happens: the files deleted, the connections configured from its cards, the settings and credentials forgotten, the background processes stopped, and the owner's own automations that quietly stop firing. Also answerable for an extension that cannot be removed, in which case it says why."
		}).input(DS).output(gw),
		remove: q.route({
			method: "POST",
			path: "/extensions/{id}/remove",
			summary: "Remove an extension",
			description: "Uninstalls it and everything that only existed because it was here: the connections added from its cards, with their stored credentials, its settings, its switch and its update record. What the owner made with it — automations, files in the workspace — is left alone. Owner only, for the same reason installing is. Built-in extensions cannot be removed; switch them off instead."
		}).input(DS).output(_w),
		settings: q.route({
			method: "GET",
			path: "/extensions/{id}/settings",
			summary: "An extension's settings",
			description: "The current values for the settings this extension declared it has."
		}).input(DS).output(uw),
		setSettings: q.route({
			method: "POST",
			path: "/extensions/{id}/settings",
			summary: "Change an extension's settings",
			description: "Writes new values. A key the extension never declared is refused rather than quietly stored, the same honesty rule that governs everything else an extension claims."
		}).input(dw).output(Z),
		setEnabled: q.route({
			method: "POST",
			path: "/extensions/{id}/enabled",
			summary: "Turn an extension on or off",
			description: "The owner's switch. Turning one off stops its background processes at once. What it contributes to an agent's tools is rebuilt at the start of the next turn, and anything it adds to the sandbox image only at the next rebuild."
		}).input(fw).output(Z),
		recordUsage: q.route({
			method: "POST",
			path: "/extensions/usage",
			summary: "Record what extensions just used",
			description: "One batch written by the app rather than measured by the daemon, because the permission gate runs in the browser: from the sandbox's side extension traffic is indistinguishable from anyone else's. This is how the record of which powers each extension actually exercises gets kept without one reporting request per extension."
		}).input(vw).output(Z),
		readiness: q.route({
			method: "GET",
			path: "/extensions/{id}/readiness",
			summary: "Whether an extension is fit to share",
			description: "The checks that can be answered from an extension's own files, for an author about to publish. Read on demand rather than carried on the list, because it reads the code off disk each time."
		}).input(DS).output(RC),
		checkUpdates: q.route({
			method: "POST",
			path: "/extensions/updates/check",
			summary: "Look for extension updates now",
			description: "Compares every installed extension against its source and reports what is newer, what carries an advisory and what looks unhealthy. This also happens on a schedule; call it to check on demand."
		}).output(ow),
		updatePreview: q.route({
			method: "POST",
			path: "/extensions/{id}/update/preview",
			summary: "What an update would change",
			description: "The read before the click: which versions are involved and exactly which powers the new code asks for that the running one does not. Costs one throwaway copy of the source, the same as browsing a registry entry."
		}).input(nw).output(rw),
		applyUpdate: q.route({
			method: "POST",
			path: "/extensions/{id}/update",
			summary: "Update an extension",
			description: "The whole swap as one transaction: fetch, check, quiet the running one, replace it while keeping the outgoing copy one step back, restart and watch it come up. The existing configuration is kept, so a token for a private source survives what removing and re-adding would lose. Owner only, because it changes what code runs."
		}).input(nw).output(iw),
		revert: q.route({
			method: "POST",
			path: "/extensions/{id}/revert",
			summary: "Go back to the previous version",
			description: "Swaps the copy kept from before the last update back into place. Owner only, for the same reason updating is."
		}).input(DS).output(iw),
		setUpdatePolicy: q.route({
			method: "POST",
			path: "/extensions/{id}/update-policy",
			summary: "How an extension should handle its own updates",
			description: "The owner's standing answer for one extension: tell me, have an agent look at it, or just do it. Security advisories can be opted out of separately."
		}).input(aw).output(Z),
		processStatus: q.route({
			method: "GET",
			path: "/extensions/{id}/processes/{name}",
			summary: "Whether an extension's background process is up",
			description: "The state of one process an extension declared, with the port it was given and its preview address if it has one."
		}).input(yw).output(bw),
		processStart: q.route({
			method: "POST",
			path: "/extensions/{id}/processes/{name}/start",
			summary: "Start an extension's background process",
			description: "Brings one of an extension's declared processes up in an attachable terminal."
		}).input(yw).output(Z),
		processStop: q.route({
			method: "POST",
			path: "/extensions/{id}/processes/{name}/stop",
			summary: "Stop an extension's background process",
			description: "Shuts one of an extension's declared processes down and frees its port."
		}).input(yw).output(Z)
	};
})), ww = b((() => {
	lp(), pp(), up.map((e) => ({
		label: e.label,
		value: e.id
	})), Object.fromEntries(up.map((e) => [e.id, e.access])), up.filter((e) => e.access.kind === "free").map((e) => e.id), Object.fromEntries(up.map((e) => [e.id, e.vendor])), up.filter((e) => e.planLimits).map((e) => e.id);
})), Tw = b((() => {
	ww();
})), Ew, Dw, Ow, kw, Aw, jw, Mw, Nw, Pw, Fw, Iw, Lw, Rw = b((() => {
	Rh(), X(), Ew = (e) => e.map((e) => new RegExp(e.source, `${e.flags}g`)), Dw = [
		/\bgit\s+push\b[^|;&]*\s(?:-f\b|--force\b|--force-with-lease\b|--delete\b)/,
		/\bgit\s+reset\b[^|;&]*\s--hard\b/,
		/\bgit\s+clean\b[^|;&]*\s-{1,2}[a-zA-Z]*f/,
		/\bgit\s+branch\b[^|;&]*\s(?:-D\b|--delete\s+--force\b|--force\s+--delete\b)/,
		/\bgit\s+filter-branch\b/
	], Ow = [/\{\{secret:[A-Za-z0-9_./-]+\}\}/], kw = String.raw`[\w~$.{}/\\-]*`, Aw = [
		/(?<![\w.])\.env(?!\.(?:example|sample|template))(?:\.[\w-]+)?\b/,
		/\.ssh(?!\w)(?!\/(?:known_hosts|config|authorized_keys|environment)(?!\w))(?!\/[\w.-]*\.pub(?!\w))(?:\/[\w.\-/]*)?/,
		/\bid_(?:rsa|dsa|ecdsa|ed25519)\b(?!\.pub\b)/,
		new RegExp(String.raw`${kw}\.aws/credentials\b`),
		new RegExp(String.raw`${kw}\.npmrc(?!\.(?:example|sample|template))\b`),
		new RegExp(String.raw`${kw}\.git-credentials\b`),
		new RegExp(String.raw`${kw}\.credentials\.json\b`)
	], jw = [
		/\b(?:npm|pnpm|yarn|bun)\s+publish\b/,
		/\bcargo\s+publish\b/,
		/\bgh\s+release\s+create\b/,
		/\bdocker\s+push\b/,
		/\btwine\s+upload\b/
	], Mw = String.raw`(?:localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(?::\d+)?(?=[/?#\s'"\x60]|$)`, Nw = [new RegExp(String.raw`\b(?:curl|wget)\b[^|;&]*\bhttps?://(?!${Mw})`), new RegExp(String.raw`\bfetch\(\s*['"\x60]https?://(?!${Mw})`)], Pw = [
		/\bmkfs(?:\.\w+)?\b/,
		/\bwipefs\b/,
		/\bblkdiscard\b/,
		/\bsgdisk\b[^|;&]*\s(?:--zap-all|-Z)\b/,
		/\bdd\b[^|;&]*\bof=(?:\/dev\/|['"`]\/dev\/)/,
		/\bshred\b[^|;&]*\s\/dev\//,
		/>\s*\/dev\/(?:[shv]d[a-z]|nvme\d|disk\d|mmcblk\d)/
	], Fw = [
		/\b(?:docker|podman)\s+volume\s+(?:rm|remove|prune)\b/,
		/\b(?:docker|podman)\s+system\s+prune\b/,
		/\b(?:docker(?:\s+compose|-compose)?|podman-compose)\s+down\b[^|;&]*\s(?:-v\b|--volumes\b)/
	], Ew(Dw), Ew(Ow), Ew(Aw), Ew(jw), Ew(Nw), Ew(Pw), Ew(Fw), Iw = {
		"git.destructive": "rewrite or discard git history",
		"files.destructive": "delete files recursively",
		"system.destructive": "wipe a disk, or delete a whole root directory",
		"container.state": "delete a container volume or the data in it",
		"secrets.access": "read credential material",
		"package.publish": "publish or release a package",
		"network.outbound": "send a request out to the internet"
	}, Lw = {
		"git.destructive": [
			{
				code: "git push --force",
				qualifier: "also -f and --force-with-lease"
			},
			{ code: "git push --delete" },
			{ code: "git reset --hard" },
			{ code: "git clean -f" },
			{ code: "git branch -D" },
			{ code: "git filter-branch" }
		],
		"files.destructive": [
			{ code: "rm -rf <path>" },
			{
				code: "fs.rm(<path>, { recursive: true })",
				qualifier: "also rmSync, rmdir, rmdirSync"
			},
			{ code: "rimraf(<path>)" }
		],
		"system.destructive": [
			{ code: "mkfs" },
			{ code: "wipefs" },
			{ code: "blkdiscard" },
			{ code: "sgdisk --zap-all" },
			{ code: "dd of=/dev/…" },
			{ code: "shred /dev/…" },
			{ code: "> /dev/sda" },
			{
				code: "rm -rf /",
				qualifier: "only when the target is a root, listed below"
			}
		],
		"container.state": [
			{
				code: "docker volume rm",
				qualifier: "also remove, prune, and podman for any of these"
			},
			{ code: "docker system prune" },
			{ code: "docker compose down -v" }
		],
		"secrets.access": [
			{
				code: "{{secret:NAME}}",
				qualifier: "a stored secret, used in the command itself"
			},
			{ code: ".env" },
			{ code: ".ssh/*" },
			{ code: "id_rsa" },
			{ code: ".aws/credentials" },
			{ code: ".npmrc" },
			{ code: ".git-credentials" }
		],
		"package.publish": [
			{
				code: "npm publish",
				qualifier: "also pnpm, yarn, bun"
			},
			{ code: "cargo publish" },
			{ code: "gh release create" },
			{ code: "docker push" },
			{ code: "twine upload" }
		],
		"network.outbound": [{
			code: "curl https://…",
			qualifier: "also wget; loopback does not count"
		}, {
			code: "fetch(\"https://…\")",
			qualifier: "in a script"
		}]
	};
})), zw, Bw, Vw, Hw, Uw, Ww, Gw, Kw, qw, Jw, Yw = b((() => {
	K(), Rw(), X(), zw = /* @__PURE__ */ new Set(["system.destructive"]), Bw = /* @__PURE__ */ new Set([
		"system.destructive",
		"container.state",
		"files.destructive"
	]), Vw = (e) => e === "sandbox" ? zw : Bw, Hw = {
		sandbox: "/ and /history. Not /work, /usr or /etc: the worktree's changes are uncommitted work, and the container comes back from its image.",
		device: "/, a home directory, a Windows drive, and the top-level directories an OS keeps."
	}, Uw = (e) => Object.fromEntries(Pp.options.map((t) => [t, Vw(t).has(e) ? "hard" : "judged"])), Ww = (e) => Pp.options.filter((t) => e.tiers[t] === "hard").length, Fp.options.map((e) => ({
		commandClass: e,
		label: Iw[e],
		patterns: Lw[e],
		tiers: Uw(e),
		...e === "system.destructive" ? { notes: Hw } : {}
	})).sort((e, t) => Ww(t) - Ww(e)), Gw = V([
		"off",
		"watch",
		"on"
	]), Kw = V([
		"allow",
		"ask",
		"refuse"
	]), R({
		decision: Kw.describe("Run it, ask the owner, or refuse it."),
		sentence: P().describe("What this command does and why it was allowed, held or refused, in one plain sentence."),
		policyLine: P().optional().describe("A line the owner could add to their policy so this stops being asked. Shown on the card before it is accepted.")
	}), qw = R({
		at: F().int().describe("When it was judged, epoch milliseconds."),
		program: P().describe("The command or script, excerpted."),
		classes: L(P()).describe("The kinds of consequence triage matched, which is why a judge looked."),
		decision: Kw.describe("What the judge decided."),
		sentence: P().describe("The judge's sentence."),
		outcome: V([
			"allowed",
			"asked",
			"refused"
		]).describe("What the gate did in the end."),
		answer: V([
			"allowed",
			"declined",
			"unanswered"
		]).optional().describe("How the owner answered, when they were asked."),
		machine: P().optional().describe("Which connected device it was headed for, when it was not this sandbox.")
	}), Jw = R({
		text: P().describe("The policy, as the owner wrote it."),
		custom: I().describe("False when nobody has edited it and this is the text this product ships.")
	});
})), Xw, Zw, Qw, $w, eT, tT, nT, rT, iT, aT, oT, sT, cT, lT, uT, dT, fT, pT, mT, hT, gT, _T, vT, yT, bT, xT, ST, CT, wT, TT, ET, DT, OT, kT, AT, jT, MT, NT, PT = b((() => {
	Rh(), K(), Yw(), rp(), X(), Xw = V([
		"intentic",
		"claude",
		"custom"
	]), Zw = R({ base: V(["intentic", "claude"]) }), Qw = V([
		"off",
		"versions",
		"full"
	]), $w = V([
		"file.edited",
		"turn.ending",
		"push.starting",
		"agent.finished",
		"agent.landed"
	]), eT = V([
		"verify-edits",
		"verify-removals",
		"verify-ui-edits",
		"verify-tests",
		"version-landed"
	]), tT = z("kind", [
		R({
			kind: H("command"),
			command: P().max(500),
			timeoutMs: F().min(6e4).max(36e5).default(9e5)
		}),
		R({
			kind: H("instruct"),
			text: P().min(1).max(4e3)
		}),
		R({
			kind: H("verdict"),
			verdict: V(["allow", "hold"])
		}),
		R({
			kind: H("builtin"),
			name: eT
		})
	]), nT = V([
		"clean",
		"error",
		"conflict",
		"checks-failed"
	]), rT = R({
		repo: P().min(1).optional(),
		paths: L(P().min(1)).max(20).optional(),
		outcome: L(nT).optional(),
		sample: F().gt(0).lt(1).optional()
	}), iT = {
		"file.edited": ["command"],
		"turn.ending": [
			"builtin",
			"instruct",
			"command"
		],
		"push.starting": ["command"],
		"agent.finished": ["verdict"],
		"agent.landed": ["builtin"]
	}, aT = {
		"turn.ending": [
			"verify-edits",
			"verify-removals",
			"verify-ui-edits",
			"verify-tests"
		],
		"agent.landed": ["version-landed"]
	}, oT = R({
		id: P().regex(/^[a-z0-9][a-z0-9-]*$/),
		label: P().min(1).max(80),
		moment: $w,
		when: rT.optional(),
		action: tT,
		enabled: I().default(!0)
	}).refine((e) => iT[e.moment].includes(e.action.kind), {
		message: "that action cannot stand at that moment",
		path: ["action"]
	}).refine((e) => e.action.kind !== "builtin" || (aT[e.moment] ?? []).includes(e.action.name), {
		message: "that built-in cannot stand at that moment",
		path: ["action"]
	}), sT = B(P(), F()), cT = V([
		"builtin",
		"own",
		"capability",
		"extension",
		"plugin",
		"persona",
		"dropped"
	]), lT = P().regex(/^[a-z0-9][a-z0-9-]*$/, "a skill name is lowercase letters, digits and dashes"), uT = R({
		id: P().describe("Its handle, which reading and deleting take. A skill of your own is simply its name; one belonging to something else is qualified, because two packages may each ship a review."),
		name: P().describe("Its name."),
		description: P().describe("What it is for, which is the line the agent reads to decide whether to reach for it. Empty when the skill declares none, which is worth showing as the blank it is: a skill with no description is rarely picked."),
		origin: cT.describe("Where it came from."),
		owner: P().optional().describe("Who ships it, as the row would name them."),
		enabled: I().describe("Whether the agent can reach it."),
		switchable: I().describe("Whether this surface can switch it. Everything else is on because its extension or its plugin is, and a switch here that silently did nothing would be worse than none, so the row names its owner instead."),
		editable: I().describe("Whether it can be rewritten here. Your own only: editing somebody else's in place would be undone the next time the thing that ships it catches up."),
		removable: I()
	}), dT = L(uT), fT = R({
		id: P().describe("The skill's id, which can carry the owner it came from."),
		name: P().describe("Its name."),
		body: P().describe("The instructions themselves, as written.")
	}), pT = R({ id: P().min(1).describe("Which skill. It travels in the query rather than the address, because an id can name the owner it came from and that will not fit in a path.") }), mT = R({
		name: lT.describe("What to call it. Saving over an existing name rewrites it, which is also how one is renamed."),
		description: P().min(1).max(1024).describe("What it is for, which is what the agent reads to decide whether to reach for it."),
		body: P().min(1).describe("The skill itself.")
	}), hT = R({ name: lT.describe("Which skill to delete. The stored text and the agent's copy go together, so nothing is left half done.") }), gT = R({
		name: lT.describe("Which skill of your own to switch."),
		on: I().describe("On writes the agent's copy from the stored text; off removes that copy and keeps the text.")
	}), _T = R({
		stableSystemPrompt: I().default(!1).describe("Keep the instructions identical between turns so the provider can cache them, moving anything that varies into the message instead. Cheaper, at the cost of some flexibility."),
		skills: L(P()).default(["lsp", "fileq"]).describe("Which built-in tools are switched on. A skill of your own is not listed here: it is on while the agent's copy of it exists."),
		personaRouting: I().default(!0).describe("Whether a new chat is matched to one of your personas from its first message. The message is read once it is sent, by the model on the persona-routing list, and the chat says in its own transcript what was asked and which persona it landed on. Never applies to unwatched runs, which name their persona themselves."),
		hashlineEdits: I().default(!1).describe("Have the agent edit files by line number rather than by quoting the text it wants replaced. Cheaper on large files, and less forgiving of a stale read."),
		systemPromptMode: Xw.default("intentic").describe("Which instructions the agent starts from: intentic's own, the ones the installed Claude Code carries, or your own. The first two both get this product's own guidance added on top; your own gets nothing added, which is the point of it."),
		systemPrompt: P().max(2e4).default("").describe("Your own instructions, used only when the mode above says custom. Then it is the whole of them: both built-in bases go, and so does everything this product would otherwise add, including the guidance the chat's own cards are driven by. That is the price of total control."),
		iqSearch: I().default(!1).describe("Teach the agent how to use this workspace's own search tool, rather than leaving it to grep around."),
		iqSearchHoldout: F().min(0).max(1).default(0).describe("What share of conversations to run without that teaching, so the two can be compared. Whole conversations rather than individual turns, because once the teaching is in a session, withholding it from the next request does not make the model forget it."),
		workspaceMap: I().default(!1).describe("Open every conversation with a map of the project it starts in: what is in it, what each part is for, and where the agent is standing. Worked out fresh each time rather than written down anywhere, because a written layout is wrong within a fortnight. Off by default, since it spends tokens on the first message of every conversation."),
		workspaceMapHoldout: F().min(0).max(1).default(0).describe("What share of conversations to open without the map, so the two can be compared. Whole conversations rather than individual turns, because the map is sent once and stays in the conversation's history afterwards."),
		sidecars: I().default(!1).describe("Keep an up-to-date markdown rendering of every document, image and audio file in the workspace, made in the background as files land, so the agent reads a pre-derived text instead of paying to parse the file mid-task. Costs background CPU on a document-heavy workspace, so it is a switch rather than a default."),
		dependencyFreshness: Qw.default("off").describe("Whether a version the agent is about to pin is checked against the package's own registry first. Facts only, or facts plus the name of a maintained replacement where the registry agrees the current choice has been abandoned. It tells the agent and lets it decide rather than refusing, because matching a version your project already uses is usually the right answer and a gate would fight it."),
		outputCleaners: P().default("").describe("Which command outputs to trim before the agent reads them, cutting the noise a build tool prints without cutting what it said."),
		outputHoldout: F().min(0).max(1).default(0).describe("What share of commands to leave untrimmed, so the saving can be measured against a real comparison rather than estimated."),
		modelRoles: ku(tp, L(Hp).max(10)).default({}).describe("Which models do which job, one ordered list per job: commit messages, session titles, the safety judge, pipeline fixes, and every other place this sandbox picks a model for you. Tried in order, so one spent account does not take a job down. Nothing is chosen for you: a one-shot job with no list does not run, and a whole session with no list opens on whatever your own chat is set to."),
		changelogRepos: L(P()).max(50).default([]).describe("Which repositories keep a changelog, and so get a user-facing note written alongside each merge. A list rather than a switch, and empty by default, because the commit writer's standing rule is to copy the house style rather than impose one, and a repository that has never written such a note gives it nothing to copy."),
		autoTier: V([
			"off",
			"shadow",
			"on"
		]).default("shadow").describe("Whether an easy-looking turn may run on a cheaper model from the same provider. Three states rather than a switch, because the middle one is the only honest road to the third: it scores every turn and routes nothing, so the guess can become a measurement before it changes anything. It can only ever route down, so the worst case is one turn's quality rather than a bill nobody asked for."),
		autoTierEagerness: V([
			"cautious",
			"balanced",
			"eager"
		]).default("balanced").describe("How readily a turn counts as simple enough for the cheaper model. It moves only the cutoff: at every setting a turn still has to say something positively easy, so nothing here can downgrade a short vague request."),
		autoFastModels: L(P()).max(10).default([]).describe("Which cheaper model a downgraded turn lands on. A list so a sandbox spanning providers can name a rung on each, but not a fallback ladder: an entry naming a different provider than the turn is on is skipped rather than tried, because switching provider retires the conversation and starting over to save a fraction of a penny is not a saving. Empty picks the cheapest the turn's own provider publishes."),
		agentRetentionDays: F().min(0).max(365).default(3).describe("How many days a finished conversation stays on the board before being put away. Zero means never. The one setting here that defaults on, because each card left behind is a real working copy on disk, not just a row."),
		resumeAfterOutage: I().default(!1).describe("Whether a turn killed by the model provider failing is re-run automatically, backing off between attempts. The sandbox-wide default; any one conversation can say otherwise. Off to begin with, because a retry spends your allowance on a turn you sent once and only you can say whether it was worth paying for twice. Worth turning on for a sandbox whose work mostly happens with nobody in the room."),
		resumeAfterLimit: I().default(!1).describe("Whether a turn a spent usage limit refused is sent again by itself once the allowance reopens. The sandbox-wide default; any one conversation can say otherwise. Off to begin with, because the allowance is your budget and a turn that spends it the second it comes back is not a decision to make for you. Worth turning on for a sandbox whose work mostly happens with nobody in the room."),
		moveAfterLimit: I().default(!1).describe("Whether a turn a spent usage limit refused is moved to another connected account of the same provider that still has room, as soon as the refusal lands. The sandbox-wide default; any one conversation can say otherwise. Off to begin with, because it spends a second account on your behalf. With no account that has room the turn waits as the setting above says."),
		limitMoveCarryUnder: F().int().min(0).default(1e5).describe("When a spent usage limit moves a turn to another account, carry the provider session (the model keeps everything, and re-reads all of it once on the other account) while the conversation's context is under this many tokens; at or above it, start a fresh session with the sandbox's measured brief instead. Zero always starts fresh."),
		autoResumeOnRestart: I().default(!1).describe("Whether a turn killed by the sandbox restarting is re-run once it comes back. Off to begin with, for the same reason: it would spend your allowance on work you are not watching and edit files while you are still waiting for the sandbox to return. Either way the interruption is recorded rather than silently lost."),
		adoptedChecks: B(P(), P()).default({}).describe("Which repositories may run the checks they declare for themselves, and exactly which version of those checks you agreed to. A repository's declaration does nothing until it appears here, the same rule git keeps for hooks, which are never cloned; and a declaration that changes afterwards is held until you look at it again."),
		rules: L(oT).max(50).default([]).describe("Standing instructions you give the sandbox about its own work: ask for proof before a turn ends, run something before a push, hold or release finished work. Empty is the default and is exactly the behaviour of a fresh sandbox, because each of those defaults is what no rule matched means at its own moment."),
		automationFailureLimit: F().min(0).max(20).default(0).describe("How many failures in a row before an automation switches itself off. Zero means never, which is the default, because the failure is not always the automation's fault and a job disabled at three in the morning is one nobody re-enables. Only real errors count: a guard deciding there was nothing to do, or the sandbox dying mid-run, say nothing about the automation."),
		admission: Ip.prefault({}).describe("Whether work started from outside may run, per kind of trigger: let it, hold it for approval, or refuse it. Composes with each automation's own setting, and the stricter of the two wins, so holding every visitor's message needs no edit to each automation."),
		actionRules: B(P(), Np).default({}).describe("What an agent may do out in the world, per kind of action: go ahead, ask first, or never."),
		commandJudge: Gw.default("on").describe("Whether a model reads your safety policy before a flagged command runs. Off judges nothing and asks about nothing; Watch judges everything and records it without ever interrupting you, which is how you find out what your policy actually does before you let it stop anything; On lets the verdict decide. Wiping a disk or deleting under /history asks at every setting — that rule is typed rather than judged, and cannot be turned off."),
		subagentsAtOnce: F().min(1).max(200).default(20).describe("How many subagents may work at the same time."),
		subagentsPerTurn: F().min(1).max(2e3).default(200).describe("How many a single turn may start in total."),
		subagentDepth: F().min(1).max(10).default(3).describe("How many levels deep the delegation may go, since a subagent can start subagents of its own.")
	}), vT = R({
		text: P(),
		version: P()
	}), yT = R({
		id: P(),
		commands: F(),
		savedTokens: F()
	}), bT = R({
		updatedAt: F().optional(),
		commands: F(),
		rawTokens: F(),
		emittedTokens: F(),
		savedPct: F(),
		perCleaner: L(yT),
		holdout: R({
			cleaned: F(),
			heldOut: F(),
			measuredSavedPct: F().optional()
		}),
		gaps: L(R({
			command: P(),
			commands: F(),
			tokens: F()
		}))
	}), xT = R({
		turns: F(),
		mean: F()
	}), ST = R({
		metric: V([
			"searchCalls",
			"openingSearches",
			"openingListings",
			"callsBeforeTarget"
		]),
		on: xT,
		off: xT,
		controlTurnsNeeded: F().optional(),
		marginPct: F().optional(),
		deltaPct: F().optional(),
		saved: F().optional()
	}), CT = R({
		metrics: Ou([ST], ST),
		minTurns: F(),
		sampleUnit: V([
			"turns",
			"conversations",
			"opening turns"
		]).optional(),
		cohort: P().optional()
	}), wT = R({
		judged: F(),
		fast: F(),
		atStakeUsd: F(),
		routed: F(),
		routedUsd: F(),
		escalated: F(),
		denied: F()
	}), TT = R({
		prevented: P(),
		chosen: P(),
		reason: P(),
		at: F().optional()
	}), ET = R({
		checked: F(),
		improved: F(),
		recent: L(TT),
		updatedAt: F().optional()
	}), DT = R({
		input: bT,
		search: CT.optional(),
		map: CT.optional(),
		tier: wT.optional(),
		dependencies: ET.optional()
	}), OT = `${Ih}/checks.json`, kT = V(["turn", "push"]), AT = R({
		when: kT.describe("When to run it: `turn` before the assistant finishes, `push` before code leaves the machine."),
		run: P().min(1).max(500).describe("The command, run in this repository's own directory, so it reads as it would in a terminal there."),
		label: P().min(1).max(80).optional().describe("What to call it on screen. Absent names it after the command."),
		timeoutMs: F().min(6e4).max(36e5).optional().describe("How long it may take before it is killed and counted as failed."),
		paths: L(P().min(1)).max(20).optional().describe("Only run it when the change touches these paths, written relative to this repository. Absent runs it on every change here.")
	}), R({ checks: L(AT).max(10).default([]) }), jT = R({
		repo: P().describe("Which repository, by its workspace id (\"root\" is the workspace itself)."),
		path: P().describe("Where the declaration lives, relative to the workspace, whether or not the file exists yet."),
		checks: L(AT).describe("What it declares, in the order the file lists them."),
		adopted: I().describe("Whether these are running. False means declared and inert: nothing a repository writes runs until the owner switches it on."),
		changed: I().describe("Whether the declaration changed since it was adopted, which holds it until the owner looks again. True only for a repository that was adopted before."),
		error: P().optional().describe("Why the file could not be read, when it exists but does not parse. The checks list is empty in that case.")
	}), MT = R({ repos: L(jT).describe("Every repository that declares checks, plus any the owner has adopted before, sorted by id.") }), NT = R({
		repo: P().min(1).describe("Which repository's declaration to switch."),
		on: I().describe("On adopts what it declares as it stands now; off stops running it. Adopting again is how a changed declaration is accepted.")
	});
})), FT, IT, LT, RT, zT, BT, VT, HT, UT, WT, GT, KT, qT, JT, YT, XT = b((() => {
	K(), Tw(), X(), Tp(), PT(), FT = R({
		files: V([
			"none",
			"read",
			"write"
		]).default("write").describe("What it may do with files: nothing, look and search, or also create and change."),
		shell: I().default(!0).describe("Whether it may run commands, and with them the terminals, the test runs and every tool on the image. The switch the strength of the others depends on."),
		code: I().default(!0).describe("Whether it may write and run a script rather than a command line. Its fence is real where the shell's is not: reads and writes follow the files answer, and it can start no other program unless commands are allowed too. The one stated gap is that the fence cannot cut the network."),
		web: I().default(!0).describe("Whether it may fetch a page or run a search."),
		browser: I().default(!0),
		delegate: I().default(!0),
		sandbox: I().default(!0),
		connectors: L(Y).max(100).optional(),
		devices: L(Y).max(50).optional(),
		mcp: L(Y).max(50).optional()
	}), IT = R({
		startIn: P().max(200).optional().describe("Which folder a conversation opens in."),
		folders: L(P().min(1)).max(50).optional().describe("Which folders it may touch at all. Absent means the whole workspace.")
	}), LT = R({ repos: L(P().min(1).max(200)).max(50).describe("Which nested repositories a conversation wearing this card carries, by workspace-relative path. The workspace itself is always carried; empty means the workspace alone.") }), RT = V([
		"map",
		"context",
		"skills",
		"search",
		"delegation",
		"checks",
		"dependencies",
		"repoSync",
		"handoff"
	]), zT = R({ omit: L(RT).max(20).describe("Which of the notes the sandbox prepends to each message a conversation wearing this card does NOT get. Everything not named here is sent as usual; the notes that keep a turn inside its own branch or explain a missing account cannot be named at all.") }), BT = R({
		id: Y.describe("The persona's id."),
		label: P().max(60).optional().describe("What to call it on screen. Absent falls back to the id, which somebody chose anyway."),
		capabilities: L(Y).max(50).describe("Which connected accounts are its hands. Named individually rather than by site, because two accounts on one site is the whole problem this solves. Naming one that is not connected yet is not an error: it is a card describing an account this sandbox has still to sign into."),
		brief: P().max(200).optional().describe("What this persona is for, in one line. A new chat is routed onto a persona by this sentence, and the Personas page shows it under the name."),
		powers: FT.optional().describe("What a conversation wearing it may do. Absent means the full toolbox, so a card written before this existed behaves exactly as it did."),
		workspace: IT.optional().describe("Where it works. Absent means the whole workspace."),
		context: LT.optional().describe("Which part of the workspace a conversation wearing it carries: the repositories its checkout holds. Absent means every repository."),
		briefing: zT.optional().describe("Which of the notes the sandbox prepends to every message this card's conversations do without. Absent means all of them, which is what a card written before this existed keeps."),
		models: L(Hp).max(10).optional().describe("Which models a conversation wearing it runs on, tried in order. Absent means whatever the chat or the job would have run on anyway; a model chosen for the turn itself always wins."),
		systemPromptMode: Xw.optional()
	}), VT = R({
		prompt: P().min(1).max(2e4).describe("The message a new chat is about to open with."),
		folder: P().max(200).optional().describe("The workspace folder the chat was opened in, when it was opened in one."),
		paths: L(P().min(1).max(500)).max(50).default([]).describe("Workspace paths the message names: uploads, @-mentions, the editor's own file.")
	}), HT = R({
		persona: Y.optional().describe("The card this message belongs to, or absent when none does and the chat should stay open to everything."),
		reason: P().describe("Why, in the one line a chat can show. Present whether or not a card was named."),
		model: P().optional().describe("Which model answered, as `provider:model`, so the chat can name what the reading cost. Absent when no model was asked at all, which a folder match and an empty persona list both are.")
	}), UT = R({ id: Y.describe("Which persona.") }), WT = R({
		personas: L(BT).describe("The characters an agent can wear."),
		connected: L(P()).describe("Which accounts are actually connected right now, so a persona naming one that has since been disconnected can be shown as broken rather than as working.")
	}), GT = R({
		prompt: P().describe("What this persona is told, on top of everything else. Empty means it simply follows the sandbox's own instructions."),
		skills: L(R({
			name: P().describe("The skill's name."),
			description: P().describe("What it is for.")
		})).describe("Skills only this persona's conversations can reach. A different question from what the agent knows generally, with a different answer.")
	}), KT = UT.extend({ prompt: P().max(2e4).describe("What to tell this persona. Sending an empty one removes it entirely rather than storing a blank, so the persona falls back to the sandbox's own instructions.") }), qT = UT.extend(mT.shape), JT = UT.extend({ name: lT.describe("Which skill.") }), YT = R({
		name: P().describe("The skill's name."),
		description: P().describe("What it is for."),
		body: P().describe("The skill itself, in full.")
	});
})), ZT, QT = b((() => {
	J(), XT(), $(), ZT = {
		list: q.route({
			method: "GET",
			path: "/personas",
			summary: "The characters an agent can wear",
			description: "Each persona with the connected accounts it speaks for, what a conversation wearing it is allowed to do, and where it works."
		}).output(WT),
		save: q.route({
			method: "POST",
			path: "/personas",
			summary: "Create or edit a persona",
			description: "Writes the whole card; sending an id that exists edits it. Nothing is connected, installed or spent by saving one, because a persona only records a decision about accounts that already exist. It is stored as a file you can equally well edit by hand, which is why this writes the card whole rather than patching a field: a round trip through a screen should leave a change a reviewer recognises."
		}).input(BT).output(Z),
		remove: q.route({
			method: "DELETE",
			path: "/personas/{id}",
			summary: "Delete a persona",
			description: "Takes away the character, never the accounts: every login it named stays connected. Its own prompt and skills go with it, since a folder nothing can reach is worse than deleting what somebody just asked to delete. Anything still pointed at it goes quiet rather than falling back to speaking as everyone."
		}).input(UT).output(Z),
		route: q.route({
			method: "POST",
			path: "/personas/route",
			summary: "Which persona a new chat belongs to",
			description: "Reads the message a chat has just been sent, and one line per persona, and names the card it belongs to, or none, along with the model that answered. Costs one small model call on the persona-routing list, and says so. Nothing is applied here: the chat that asked puts the card on, and only when the persona routing setting is on."
		}).input(VT).output(HT),
		kit: q.route({
			method: "GET",
			path: "/personas/{id}/kit",
			summary: "What one persona carries",
			description: "The instructions this persona is given and the skills only its conversations can reach. A different question from what the agent knows generally, with a different answer."
		}).input(UT).output(GT),
		savePrompt: q.route({
			method: "POST",
			path: "/personas/{id}/prompt",
			summary: "Write a persona's instructions",
			description: "Sets what this persona is told. Saving an empty one removes it entirely rather than storing a blank, so the persona simply falls back to the sandbox's own instructions."
		}).input(KT).output(Z),
		readSkill: q.route({
			method: "GET",
			path: "/personas/{id}/skills/read",
			summary: "Read one of a persona's skills",
			description: "The full text of a single skill belonging to this persona."
		}).input(JT).output(YT),
		saveSkill: q.route({
			method: "POST",
			path: "/personas/{id}/skills",
			summary: "Write one of a persona's skills",
			description: "Creates or replaces a skill by name. There is nothing to switch on: a persona's skill is available exactly when that persona is worn, which is what belonging to it has to mean."
		}).input(qT).output(Z),
		removeSkill: q.route({
			method: "POST",
			path: "/personas/{id}/skills/remove",
			summary: "Delete one of a persona's skills",
			description: "Removes a single skill from this persona and leaves the rest of its kit alone."
		}).input(JT).output(Z)
	};
})), $T, eE, tE, nE, rE, iE, aE, oE, sE, cE, lE, uE, dE, fE, pE, mE, hE, gE, _E, vE, yE, bE, xE, SE, CE, wE, TE, EE, DE, OE, kE, AE = b((() => {
	K(), Tp(), $(), qy(), $T = P().regex(/^[0-9a-f]{4,64}$/), eE = R({
		sha: P().describe("The commit, in full."),
		short: P().describe("The abbreviated form, for showing."),
		parents: L(P()).describe("What it came from. None means the first commit, one is ordinary, two or more is a merge, which is what a graph draws its lanes from."),
		subject: P().describe("Its first line."),
		body: P().describe("Everything after that."),
		author: P().describe("Who wrote it."),
		email: P().describe("Their address."),
		at: F().describe("When they wrote it, in milliseconds."),
		refs: L(P()).describe("Branches and tags sitting on it."),
		head: I().describe("Whether this is where the repository currently stands.")
	}), tE = R({
		repo: P().describe("Which repository."),
		branch: P().optional().describe("Which branch these are from."),
		commits: L(eE).describe("The commits, newest first."),
		hasMore: I().describe("There are older ones behind this page. It is also what stops the last row being drawn as the beginning of history, which is how a truncated log used to claim it started where the page happened to stop.")
	}), nE = Q.extend({
		limit: G().int().positive().max(2e3).optional().describe("How many commits to return."),
		skip: G().int().nonnegative().max(1e6).optional().describe("How many newer commits to step over, which is how you page further back. Paged rather than read whole, because a large repository's history is tens of thousands of rows.")
	}), rE = R({ repos: L(P()).describe("Every repository's id. The workspace itself is always present as \"root\".") }), iE = R({
		repo: P().describe("The workspace repository."),
		host: P().describe("Which forge its remote points at."),
		project: P().describe("Which project there, as owner and name.")
	}), aE = R({ repos: L(iE).describe("Each repository matched to the project its remote points at.") }), oE = Q.extend({
		path: P().min(1).describe("Which file, relative to the repository."),
		content: P().describe("Its whole new contents."),
		message: P().min(1).describe("The commit message.")
	}), sE = R({
		ok: I().describe("Whether the whole thing went through."),
		wrote: I().describe("The file was written."),
		committed: I().describe("The commit was recorded."),
		pushed: I().describe("It reached the remote."),
		branch: P().optional().describe("Which branch it happened on."),
		defaultBranch: P().optional().describe("Which branch the repository considers its main one, so a caller can see it was on a side branch."),
		reason: P().optional().describe("Why it stopped where it did. Being on a side branch, having no remote and having no credentials are all reported here rather than raised.")
	}), cE = Q.extend({ sha: $T.describe("Which commit.") }), lE = R({ files: L(Ty).describe("Which files it touched, with counts but not contents. Fetch any one file's contents separately, so a commit with a thousand files stays one cheap answer.") }), uE = Q.extend({
		sha: $T.describe("Which commit."),
		path: P().min(1).describe("Which file in it.")
	}), dE = Q.extend({
		sha: $T.describe("Which commit to start it at."),
		name: Cp.describe("The new branch's name.")
	}), fE = Q.extend({
		sha: $T.describe("Which commit to tag."),
		name: Cp.describe("The tag's name.")
	}), pE = Q.extend({ ref: Cp.describe("Where to switch to: a branch, a tag, or a commit.") }), mE = Q.extend({
		name: Cp.describe("Which tag."),
		remote: Cp.optional().describe("Also delete it there. Leave it out to remove it locally only.")
	}), hE = Q.extend({
		name: Cp.describe("Which tag."),
		remote: Cp.describe("Which remote to send it to.")
	}), gE = Q.extend({
		sha: $T.describe("Which commit to move the branch to."),
		mode: V([
			"soft",
			"mixed",
			"hard"
		]).describe("How much to take with it: move the branch alone, also unstage, or also throw away what is on disk. The last one takes a checkpoint first.")
	}), _E = Q.extend({ sha: $T.describe("Which commit to act on.") }), vE = R({
		ok: I().describe("Whether it worked."),
		reason: P().optional().describe("Why not, in git's own words. A conflict, a missing remote and missing credentials are all reported here rather than raised, because they are things a screen has to render rather than breakages.")
	}), yE = R({
		ref: P().describe("How to address it, which applying and dropping take."),
		sha: P().describe("The commit behind it, because a stash entry is a commit."),
		short: P().describe("The abbreviated form, for showing."),
		subject: P().describe("What it was set aside as, with git's own scaffolding stripped off."),
		branch: P().optional().describe("Which branch it was set aside from."),
		at: F().describe("When, in milliseconds."),
		parents: L(P()).describe("What it sits on, so a graph can draw it like any other commit.")
	}), bE = R({
		repo: P().describe("Which repository."),
		stashes: L(yE).describe("What is set aside, newest first.")
	}), xE = P().regex(/^stash@\{\d{1,4}\}$/), SE = Q.extend({
		message: P().max(500).optional().describe("What to call it, so you know what it was later."),
		includeUntracked: I().optional().describe("Also set aside files git is not yet tracking, which are otherwise left where they are.")
	}), CE = Q.extend({
		ref: xE.describe("Which entry."),
		pop: I().optional().describe("Remove it from the stash once it has been applied cleanly.")
	}), wE = Q.extend({ ref: xE.describe("Which entry.") }), TE = Q.extend({ ref: xE.describe("Which entry.") }), EE = V([
		"commit",
		"amend",
		"merge",
		"rebase",
		"cherry-pick",
		"revert",
		"reset",
		"pull",
		"other"
	]), DE = R({
		kind: EE.describe("What the last action was."),
		description: P().describe("What undoing it would do, in words."),
		branch: P().describe("Which branch would move."),
		sha: P().describe("Where it stands now."),
		previousSha: P().describe("Where it would go back to. Send this with the undo as proof you looked, so one prepared against a view that has since moved is refused rather than landing somewhere unexamined."),
		changesWorkingTree: I().describe("Undoing would rewrite files as well as moving the branch, so anything offering it should warn about losing work.")
	}), OE = R({
		repo: P().describe("Which repository."),
		action: DE.optional().describe("What undoing would reverse. Absent means there is nothing to go back from.")
	}), kE = Q.extend({
		previousSha: $T.describe("Where to go back to, from the matching read. It is also proof you looked: one prepared against a stale view is refused."),
		discardChanges: I().optional().describe("Also rewrite the files, rather than only moving the branch.")
	});
})), jE, ME = b((() => {
	J(), qy(), AE(), nv(), $(), jE = {
		changes: q.route({
			method: "GET",
			path: "/git/changes",
			summary: "Uncommitted work across every repo",
			description: "The workspace's whole review set in one answer: every repo that has something uncommitted, and within it every changed file with its status and line counts. This is what the Changes panel draws, and it is the call to make when you want to know whether a workspace is clean without walking the repos yourself."
		}).output(Iy),
		repos: q.route({
			method: "GET",
			path: "/git/repos",
			summary: "Every git repo in the workspace",
			description: "The repos the daemon found under the workspace root, each with the id every other call in this group expects as its `{repo}` segment. The workspace root itself is always present as `root`."
		}).output(rE),
		remoteRepos: q.route({
			method: "GET",
			path: "/git/remote-repos",
			summary: "Repos matched to their remotes",
			description: "The same repo list, but with the forge host and `owner/name` each one's remote points at. Use it to recognise a workspace repo in a list of names that came from somewhere else, such as a set of pull requests. Costs a remote lookup per repo, which is why it is separate from the plain repo list."
		}).output(aE),
		log: q.route({
			method: "GET",
			path: "/git/{repo}/log",
			summary: "Commit history for one repo",
			description: "A page of commits on the current branch, newest first, each with its author, subject, timestamp and the refs pointing at it. Paginate with the cursor the answer hands back rather than by offset, so a commit landing mid-scroll does not shift the page under you."
		}).input(nE).output(tE),
		commitDiff: q.route({
			method: "GET",
			path: "/git/{repo}/commit-diff",
			summary: "What one commit changed",
			description: "The list of files a single commit touched, with per-file status and line counts but not the content. Fetch the content of any one of them with the commit file diff call, so a commit with a thousand files stays one cheap answer."
		}).input(cE).output(lE),
		commitFileDiff: q.route({
			method: "GET",
			path: "/git/{repo}/commit-file-diff",
			summary: "One file's before and after at a commit",
			description: "Both sides of a single file as of one commit: the content its parent had and the content that commit left. The daemon returns whole sides rather than a patch, so a caller can render the comparison however it likes."
		}).input(uE).output(tv),
		operation: q.route({
			method: "GET",
			path: "/git/{repo}/operation",
			summary: "Whether a merge or rebase is halted mid-flight",
			description: "Names the git operation the worktree is stuck inside, if any: a conflicted merge, an interrupted rebase, a half-applied cherry-pick. Check this first when another call refuses, because a halted worktree is the usual reason and the abort call is the way out."
		}).input(Q).output(Ny),
		abort: q.route({
			method: "POST",
			path: "/git/{repo}/abort",
			summary: "Abandon a halted merge or rebase",
			description: "Runs git's own abort for whichever operation has the worktree halted, putting the repo back where it stood before the operation started. Nothing else clears that state."
		}).input(Q).output(vE),
		undoable: q.route({
			method: "GET",
			path: "/git/{repo}/undo",
			summary: "What undoing the last action would do",
			description: "Reads the branch's reflog to describe the move that undo would reverse, and hands back the commit it would land on. Pass that commit to the undo call as proof you looked, and an undo prepared against a view that has since moved is refused rather than landing somewhere unexamined."
		}).input(Q).output(OE),
		undo: q.route({
			method: "POST",
			path: "/git/{repo}/undo",
			summary: "Move the branch back one step",
			description: "Walks the current branch back to where it pointed before its last action. This moves the branch ref and leaves the working tree alone, which is the opposite of restoring a checkpoint. Requires the commit the matching read handed you."
		}).input(kE).output(vE),
		stashes: q.route({
			method: "GET",
			path: "/git/{repo}/stashes",
			summary: "Everything set aside in the stash",
			description: "The repo's stash entries, newest first, each with the message and the commit behind it. A stash entry is a commit, so it reads the same way a log entry does and its contents come back from the stash diff call."
		}).input(Q).output(bE),
		stashDiff: q.route({
			method: "GET",
			path: "/git/{repo}/stash-diff",
			summary: "What one stash entry holds",
			description: "The files a single stash entry would bring back, with per-file status and line counts. The same shape a commit diff has, because a stash entry is a commit."
		}).input(TE).output(lE),
		stashPush: q.route({
			method: "POST",
			path: "/git/{repo}/stash",
			summary: "Set the current changes aside",
			description: "Moves the working tree's changes onto the stash and leaves a clean tree behind. Nothing is lost: the entry is a commit you can inspect, apply or drop afterwards."
		}).input(SE).output(vE),
		stashApply: q.route({
			method: "POST",
			path: "/git/{repo}/stash/apply",
			summary: "Bring a stash entry back",
			description: "Replays one stash entry onto the working tree. A conflict is reported in the answer rather than raised as a failure, because a conflicting apply is an ordinary outcome a screen has to render."
		}).input(CE).output(vE),
		stashDrop: q.route({
			method: "POST",
			path: "/git/{repo}/stash/drop",
			summary: "Discard a stash entry",
			description: "Deletes one stash entry. This is the only unrecoverable call in the stash set, so the daemon takes a checkpoint of the workspace first."
		}).input(wE).output(Z),
		createBranch: q.route({
			method: "POST",
			path: "/git/{repo}/branch",
			summary: "Start a branch at a commit",
			description: "Points a new branch name at any commit, without moving HEAD. Use the checkout call if you also want to switch to it."
		}).input(dE).output(Z),
		createTag: q.route({
			method: "POST",
			path: "/git/{repo}/tag",
			summary: "Tag a commit",
			description: "Puts a tag on any commit. Local only: pushing it to the remote is a separate call."
		}).input(fE).output(Z),
		deleteTag: q.route({
			method: "POST",
			path: "/git/{repo}/tag/delete",
			summary: "Remove a tag",
			description: "Deletes a tag locally. A tag already pushed stays on the remote until it is deleted there too."
		}).input(mE).output(Z),
		pushTag: q.route({
			method: "POST",
			path: "/git/{repo}/tag/push",
			summary: "Send a tag to the remote",
			description: "Pushes one tag to the repo's remote. Reports the outcome rather than failing, since a missing remote or missing credentials are ordinary answers here."
		}).input(hE).output(vE),
		checkout: q.route({
			method: "POST",
			path: "/git/{repo}/checkout",
			summary: "Switch to a branch or commit",
			description: "Moves HEAD to a branch, tag or commit and reshapes the working tree to match. The daemon takes a checkpoint first, so an unexpected result is recoverable. Uncommitted work that would be overwritten is reported instead of being trampled."
		}).input(pE).output(vE),
		cherryPick: q.route({
			method: "POST",
			path: "/git/{repo}/cherry-pick",
			summary: "Replay one commit onto this branch",
			description: "Applies a single commit's changes on top of the current branch as a new commit. A conflict comes back in the answer, with the halted state readable from the operation call."
		}).input(_E).output(vE),
		revert: q.route({
			method: "POST",
			path: "/git/{repo}/revert",
			summary: "Undo a commit with a new commit",
			description: "Adds a commit that reverses an earlier one, leaving the history intact. This is the safe way to take something back on a branch other people have pulled."
		}).input(_E).output(vE),
		drop: q.route({
			method: "POST",
			path: "/git/{repo}/drop",
			summary: "Remove a commit from history",
			description: "Rewrites the branch so one commit is no longer in it. History changes, so this is for branches nobody else has pulled. A checkpoint is taken first."
		}).input(_E).output(vE),
		merge: q.route({
			method: "POST",
			path: "/git/{repo}/merge",
			summary: "Merge another branch in",
			description: "Merges a branch or commit into the current one. Conflicts are reported in the answer and leave the worktree halted, which the operation call explains and the abort call clears."
		}).input(_E).output(vE),
		rebase: q.route({
			method: "POST",
			path: "/git/{repo}/rebase",
			summary: "Replay this branch onto another",
			description: "Moves the current branch's commits on top of a different base. History changes. Conflicts halt the rebase and are reported rather than raised, so the operation and abort calls are the way through."
		}).input(_E).output(vE),
		reset: q.route({
			method: "POST",
			path: "/git/{repo}/reset",
			summary: "Move the branch to a commit",
			description: "Repoints the current branch at another commit, optionally reshaping the working tree to match. The destructive modes take a checkpoint first."
		}).input(gE).output(vE),
		fileDiff: q.route({
			method: "GET",
			path: "/git/{repo}/file-diff",
			summary: "One file's committed and working copies",
			description: "Both sides of a file as it stands right now: what the last commit holds and what is on disk. This is what a review pane shows for an uncommitted change."
		}).input(xy).output(tv),
		status: q.route({
			method: "GET",
			path: "/git/{repo}/status",
			summary: "One repo's branch and pending changes",
			description: "The current branch, its sync position against the remote, and every staged, unstaged and untracked path. The single-repo counterpart to the workspace-wide changes call."
		}).input(Q).output(Sy),
		commit: q.route({
			method: "POST",
			path: "/git/{repo}/commit",
			summary: "Commit the pending changes",
			description: "Records a commit with your message. It commits whatever is staged; add `stage` to stage something first — an empty object for everything pending, or a scope such as one side or one conversation's landed files. The answer carries the commit it created."
		}).input(py).output(Ly),
		discard: q.route({
			method: "POST",
			path: "/git/{repo}/discard",
			summary: "Throw away pending changes",
			description: "Restores files to their committed state and deletes untracked ones. Name paths or a scope to narrow it; with neither it throws away every uncommitted change in the repository. The daemon checkpoints the workspace first, so this is recoverable from the timeline."
		}).input(my).output(Z),
		stage: q.route({
			method: "POST",
			path: "/git/{repo}/stage",
			summary: "Mark changes for the next commit",
			description: "Adds changes to the index: exactly the paths you name, everything a scope describes, or the whole repository when you name neither. Nothing on disk changes, so this is always safe and always reversible with the unstage call."
		}).input(hy).output(Z),
		unstage: q.route({
			method: "POST",
			path: "/git/{repo}/unstage",
			summary: "Take changes back out of the next commit",
			description: "Removes changes from the index and leaves the files themselves untouched, on the same terms as staging. The exact reverse of it."
		}).input(hy).output(Z),
		branches: q.route({
			method: "GET",
			path: "/git/{repo}/branches",
			summary: "Local branches and how far each has drifted",
			description: "Every local branch with how many commits it sits ahead of and behind its remote counterpart, so a branch switcher can show sync state without a call per branch."
		}).input(Q).output(ky),
		createBranchAt: q.route({
			method: "POST",
			path: "/git/{repo}/branches",
			summary: "Create a branch from a starting point",
			description: "Makes a branch at a named start point and optionally switches to it. The branch-switcher counterpart to creating a branch at a specific commit."
		}).input(Ay).output(Z),
		deleteBranch: q.route({
			method: "POST",
			path: "/git/{repo}/branches/delete",
			summary: "Delete a local branch",
			description: "Removes a branch from the repo. Unmerged work is refused unless you ask for it to be forced, and the remote branch is untouched either way."
		}).input(jy).output(Z),
		remote: q.route({
			method: "GET",
			path: "/git/{repo}/remote",
			summary: "Sync position against the remote",
			description: "How far the current branch sits ahead of and behind its remote, as of the last fetch, plus whether a remote and working credentials exist at all. This is a read of what the daemon already knows, not a network call, which is why fetching is a separate button."
		}).input(Q).output(Ey),
		fetch: q.route({
			method: "POST",
			path: "/git/{repo}/fetch",
			summary: "Refresh what the remote holds",
			description: "Contacts the remote and updates the daemon's picture of it without touching your branch. Run this before trusting the sync position."
		}).input(Q).output(vE),
		pull: q.route({
			method: "POST",
			path: "/git/{repo}/pull",
			summary: "Bring remote commits down",
			description: "Fetches and integrates the remote's commits into the current branch. A pull that cannot fast-forward is reported in the answer rather than raised, because that is an ordinary thing to be told."
		}).input(Q).output(vE),
		push: q.route({
			method: "POST",
			path: "/git/{repo}/push",
			summary: "Start sending commits to the remote",
			description: "Starts pushing the current branch, setting its upstream on first push, and answers at once: the push runs in a real terminal (it runs this repository's pre-push hook, which can be a whole suite), so watch it there and poll pushState for the verdict. A second start while one is going joins it rather than pushing twice."
		}).input(gy).output(Z),
		pushState: q.route({
			method: "GET",
			path: "/git/{repo}/push",
			summary: "How the push is going",
			description: "The verdict, or the progress so far: where it is, the terminal it runs in, and for a push that did not go, git's last words and who refused it, the repository's own pre-push hook, the remote, or the transport. Idle when nothing has been started for this repository."
		}).input(Q).output(vy),
		pushCancel: q.route({
			method: "POST",
			path: "/git/{repo}/push/cancel",
			summary: "Stop the push",
			description: "Kills the run. It settles as cancelled; nothing that git had not already sent reaches the remote."
		}).input(Q).output(Z),
		files: q.route({
			method: "GET",
			path: "/git/{repo}/files",
			summary: "Every tracked path in the repo",
			description: "The flat list of files git tracks, which is what a file picker or a search box wants. Ignored and untracked files are not in it."
		}).input(Q).output(Cy),
		readFile: q.route({
			method: "GET",
			path: "/git/{repo}/file",
			summary: "Read a file from the repo",
			description: "The contents of one file as it stands on disk. A path that climbs out of the repo is refused."
		}).input(yy).output(wy),
		writeFile: q.route({
			method: "PUT",
			path: "/git/{repo}/file",
			summary: "Write a file into the repo",
			description: "Replaces one file's contents, creating it and its parent folders if they are missing. Nothing is committed: the change shows up as pending work."
		}).input(by).output(Z),
		publishFile: q.route({
			method: "POST",
			path: "/git/{repo}/publish-file",
			summary: "Write, commit and push one file",
			description: "The three steps as a single call with a single answer, committing only the path you named and leaving any other pending work alone. Being on a side branch, having no remote and having no credentials are all reported rather than raised."
		}).input(oE).output(sE)
	};
})), NE, PE = b((() => {
	J(), nv(), $(), NE = {
		list: q.route({
			method: "GET",
			path: "/history/snapshots",
			summary: "Points you can go back to",
			description: "The saved states of the whole workspace, taken automatically as work happens. This is the timeline behind undoing a change that was never committed."
		}).output(q_),
		diff: q.route({
			method: "GET",
			path: "/history/diff",
			summary: "What changed since a saved point",
			description: "The files that differ between one saved point and the one before it, taking in everything that happened in between."
		}).input(X_).output(Q_),
		fileDiff: q.route({
			method: "GET",
			path: "/history/file-diff",
			summary: "One file's before and after across a saved point",
			description: "Both sides of a single file at one point in the timeline."
		}).input($_).output(tv),
		restore: q.route({
			method: "POST",
			path: "/history/restore",
			summary: "Put the workspace back",
			description: "Returns every file to how it stood at a saved point. This restores the files; moving a branch is a different thing and lives with the git calls."
		}).input(X_).output(Z)
	};
})), FE, IE = b((() => {
	K(), FE = R({ args: L(P()) });
})), LE, RE = b((() => {
	J(), tx(), IE(), $(), LE = {
		run: q.route({
			method: "POST",
			path: "/intentic",
			summary: "Run an infrastructure command",
			description: "Runs the sandbox's own command-line tool and streams its output as it arrives, so progress is visible rather than arriving all at once at the end. A failure surfaces once the stream closes."
		}).input(FE).output(Jf(Rb)),
		apply: q.route({
			method: "POST",
			path: "/intentic/apply",
			summary: "Bring the infrastructure into line",
			description: "Starts the long reconcile that makes the running world match what was declared, and answers immediately. It takes minutes, so it runs in a terminal you attach to rather than on a held-open request."
		}).output(Z),
		applyEvents: q.route({
			method: "GET",
			path: "/intentic/apply/events",
			summary: "Follow the reconcile",
			description: "The same progress the terminal shows, as structured events, kept on disk so a page refresh does not lose it. It replays from the start of the run and then follows live, closing when the run ends."
		}).output(Jf(Rb))
	};
})), zE, BE = b((() => {
	J(), kx(), zE = {
		list: q.route({
			method: "GET",
			path: "/inventory",
			summary: "Machines and services you have declared",
			description: "What the deployment configuration says this setup owns and what it wants provisioned."
		}).output(Ox),
		add: q.route({
			method: "POST",
			path: "/inventory",
			summary: "Declare a machine or service",
			description: "Writes the entry into the configuration file and commits it, exactly as an agent editing that file by hand would. Answers with the whole updated list, so a screen redraws from one response."
		}).input(Ex).output(Ox),
		remove: q.route({
			method: "DELETE",
			path: "/inventory/{name}",
			summary: "Undeclare a machine or service",
			description: "Takes the entry back out of the configuration and commits that too. Answers with the whole updated list."
		}).input(Dx).output(Ox)
	};
})), VE, HE = b((() => {
	J(), Sv(), $(), VE = {
		list: q.route({
			method: "GET",
			path: "/issues",
			summary: "Bugs your users have reported",
			description: "Everything that has crashed or been written in, grouped so a crash that hit a thousand people is one row with a count."
		}).output(hv),
		status: q.route({
			method: "POST",
			path: "/issues/{id}/status",
			summary: "File one away, or reopen it",
			description: "Moves one issue between open, resolved and ignored. Resolving does not close anything upstream: it is your own inbox."
		}).input(_v).output(Z),
		investigate: q.route({
			method: "POST",
			path: "/issues/{id}/investigate",
			summary: "Put an agent on it now",
			description: "Starts a turn on this issue with the crash, its stack and what led up to it as the brief. Answers straight away and runs detached; the issue goes to 'being looked at'."
		}).input(gv).output(Z),
		remove: q.route({
			method: "DELETE",
			path: "/issues/{id}",
			summary: "Throw one away",
			description: "Forgets an issue entirely. It will come back as new if it happens again, which is usually what you want."
		}).input(gv).output(Z),
		installs: q.route({
			method: "GET",
			path: "/issues/installs/{automationId}",
			summary: "Which sites have loaded the reporter",
			description: "The sites whose pages actually loaded this intake's script, and the ones that were turned away. The answer to 'did the snippet land?', which an empty inbox cannot give you."
		}).input(xv).output(bv)
	};
})), UE, WE, GE, KE, qE, JE, YE, XE, ZE = b((() => {
	K(), UE = R({
		name: P().describe("Its name, which is what the read route takes."),
		sizeBytes: F().describe("Size in bytes."),
		modifiedAt: F().describe("When it last changed, in milliseconds.")
	}), WE = R({ files: L(UE).describe("Every log the sandbox keeps: captured terminal output, command runs, and its own log.") }), GE = R({
		name: P().min(1).describe("Which log. It travels in the query rather than the address, because log names contain slashes."),
		bytes: G().min(1).max(1048576).default(65536).describe("How much of the end to read. The newest bytes win when the file is larger.")
	}), KE = R({
		name: P().describe("Which log this is from."),
		sizeBytes: F().describe("How large the whole file is."),
		text: P().describe("The end of it, as text."),
		truncated: I().describe("There is more before what you got.")
	}), qE = R({
		seenAt: F().describe("When the browser saw it, in milliseconds."),
		level: V(["warn", "error"]).describe("How bad it was."),
		event: P().min(1).max(100).describe("What kind of thing it was, as a stable name."),
		message: P().max(2e3).describe("What it said."),
		route: P().max(300).optional().describe("Which page they were on."),
		requestId: P().max(100).optional().describe("Which daemon call it belonged to, when it belonged to one."),
		build: P().max(100).optional().describe("Which build of the app was running."),
		fields: B(P().max(60), Eu([
			P().max(4e3),
			F(),
			I()
		])).optional().describe("Whatever else was worth keeping.")
	}), JE = R({ events: L(qE).min(1).max(50).describe("What the browser has to report, oldest first.") }), YE = R({ recorded: F().describe("How many were written down.") }), XE = R({
		clientId: P().describe("This connection's own id, the same one it gave the event stream."),
		idle: I().describe("Whether the person has stopped doing anything."),
		view: P().optional().describe("Which view they are on."),
		sessionId: P().optional().describe("Which conversation they have open."),
		path: P().optional().describe("Which file they are looking at. Sent whole rather than merged: leaving a field out clears it, so a tab that closes a file drops the path in the same report.")
	});
})), QE, $E = b((() => {
	J(), ZE(), QE = {
		list: q.route({
			method: "GET",
			path: "/logs",
			summary: "Logs the sandbox keeps",
			description: "Every log file the daemon owns: captured terminal output, command runs, and the daemon's own log. Read-only, because only the sandbox writes them."
		}).output(WE),
		read: q.route({
			method: "GET",
			path: "/logs/file",
			summary: "Read part of a log",
			description: "A window of one log file's text. A window rather than the whole thing, because a busy log outgrows any single answer."
		}).input(GE).output(KE),
		report: q.route({
			method: "POST",
			path: "/logs/client",
			summary: "Report what the browser saw",
			description: "Errors the app caught, stalls it measured, and recoveries it performed, written to a log of their own. The browser is the only witness to these, so without it a bug someone hit in their own browser leaves no record at all."
		}).input(JE).output(YE)
	};
})), eD, tD = b((() => {
	J(), ag(), $(), eD = {
		list: q.route({
			method: "GET",
			path: "/loops",
			summary: "Every loop that has run",
			description: "The loops this workspace has run, newest first, kept after they end. Why it stopped on the fourth round is the question a loop gets read for, and the round-by-round history is the answer."
		}).output($h),
		start: q.route({
			method: "POST",
			path: "/loops",
			summary: "Run a conversation until it is done",
			description: "Starts repeating a conversation towards a goal and answers straight away with the loop as recorded; the work carries on without you. The conversation need not exist yet, so run this until it passes can be the first thing you ever say to a new agent. A conversation already looping is refused."
		}).input(Yh).output(Qh),
		stop: q.route({
			method: "POST",
			path: "/loops/{conversationId}/stop",
			summary: "Make this round the last",
			description: "Means do not start another round, not stop what is running. Somebody watching the sixth round do good work can say this is the last one without throwing that work away. To cut the current round off as well, stop the conversation too."
		}).input(eg).output(Z),
		designs: q.route({
			method: "GET",
			path: "/loops/designs",
			summary: "Saved loop designs",
			description: "Loops somebody authored once and can point at a different job each time. A saved loop is the same loop with its goal left blank until you type one, not a different feature."
		}).output(ng),
		saveDesign: q.route({
			method: "POST",
			path: "/loops/designs",
			summary: "Create or replace a saved loop",
			description: "Say which of the two you mean, so a name that happens to collide cannot silently overwrite somebody's work. A design that could never finish, with nothing to produce and nothing to check, is refused in the same words an ad-hoc loop would be: catching that at save time is the whole advantage of saving."
		}).input(rg).output(tg),
		removeDesign: q.route({
			method: "DELETE",
			path: "/loops/designs/{id}",
			summary: "Delete a saved loop",
			description: "Removes the design. A loop already running from it keeps going on its own terms, because it took a copy of what it needed when it started."
		}).input(ig).output(Z)
	};
})), nD, rD, iD, aD, oD = b((() => {
	K(), nD = V([
		"launching",
		"installing",
		"starting",
		"exited"
	]), rD = R({
		repo: P().describe("Which repository."),
		hasPanel: I().describe("Whether it has anything runnable at all."),
		running: I().describe("Whether the sandbox has it running."),
		installed: I().describe("Whether its dependencies are installed, which is what decides whether a start takes seconds or an install first."),
		launch: nD.optional().describe("Where a start the sandbox is running has got to: its shell coming up, installing, its dev command running with nothing listening yet, or exited back to a prompt. Absent when nothing is starting and once it serves."),
		healthy: I().describe("Whether anything it owns is actually answering. A different question: a server still installing is running and not yet healthy, and one somebody started by hand is healthy without the sandbox running it."),
		port: F().optional().describe("The port the sandbox told it to use. What it actually bound is below, and for a repository that pins its own ports those are different numbers."),
		servers: L(R({
			port: F().describe("The port it is listening on, which is what forwarding it takes."),
			url: P().describe("Where it answers, with the right scheme: a server on its own certificate is served over https."),
			dir: P().optional().describe("Which part of the repository it belongs to, which for a repository whose dev command fans out is the only thing telling them apart."),
			session: P().optional().describe("The terminal it runs in: the sandbox's when it started it, yours when you did, and absent when nothing here owns it, which is the case worth designing for.")
		})).describe("Every server this repository is really serving, found by looking at what is listening. Empty when nothing answers."),
		previewUrl: P().optional().describe("Where to open it from outside, present only while that address really serves it. Absent on a sandbox with no outside address."),
		role: V([
			"intent",
			"desired-state",
			"app"
		]).optional().describe("Which of the workspace's three fixed roles this repository fills. Absent for one that was simply cloned in."),
		deployConfig: I().describe("It declares infrastructure."),
		desiredState: I().describe("That declaration has been resolved at least once."),
		directoryUi: I().describe("It carries a small interface of its own."),
		monorepo: I().describe("It holds several packages."),
		vitest: I().describe("It has tests that can be run."),
		userStories: I().describe("It carries stories an agent could test the running app against. The one fact here that says nothing about the language."),
		docs: I().describe("It carries generated architecture documentation.")
	}), iD = R({ panels: L(rD).describe("One entry per repository, worked out in a single pass so nothing has to walk the workspace file by file.") }), aD = R({ repo: P().describe("Which repository.") });
})), sD, cD = b((() => {
	J(), oD(), $(), sD = {
		list: q.route({
			method: "GET",
			path: "/panels",
			summary: "Repos you can run and preview",
			description: "Every repo with whether its dev server is up and what the sandbox worked out about its contents."
		}).output(iD),
		start: q.route({
			method: "POST",
			path: "/panels/{repo}/start",
			summary: "Start a repo's dev server",
			description: "Brings the repo's own runnable app up in a terminal you can attach to, so its preview address starts answering."
		}).input(aD).output(Z),
		stop: q.route({
			method: "POST",
			path: "/panels/{repo}/stop",
			summary: "Stop a repo's dev server",
			description: "Shuts it down and frees the port."
		}).input(aD).output(Z)
	};
})), lD, uD, dD, fD, pD = b((() => {
	K(), lD = R({
		port: F().describe("The port number."),
		host: V(["127.0.0.1", "::1"]).describe("Which loopback address it actually answers on. Some tools bind only one of the two, and anything dialling it has to know which."),
		forwardable: I().describe("Whether it can be exposed at all. Some listeners answer only at their own address and nowhere else; those are listed for honesty and refused for forwarding."),
		kind: V(["workspace", "system"]).describe("Whether somebody's own work put it there, or the sandbox's own machinery did. Only the first kind is worth previewing."),
		title: P().describe("What a person would call it. Always present: a listener nothing can explain is still named, because the button beside it publishes the port to the internet."),
		purpose: P().describe("One sentence about what it is for, including when the honest answer is that nothing could work it out."),
		origin: V([
			"terminal",
			"agent",
			"panel",
			"extension",
			"container",
			"sandbox",
			"unknown"
		]).describe("Who put it there, which is the question somebody is really asking: mine, my agent's, or the box's own."),
		pid: F().optional().describe("The process holding it. Absent when nothing could be matched to the socket."),
		command: P().optional().describe("The command behind it, as it was run. Absent only when nothing could be attributed at all."),
		cwd: P().optional().describe("Where it is running from, which is how a port gets attributed to a repository."),
		session: P().optional().describe("The terminal it came from, to watch it in or stop it from. Absent when nothing in its ancestry is one, which is the honest \"you cannot reach this from here\"."),
		forwarded: I().describe("Whether it is currently reachable from outside."),
		previewUrl: P().optional().describe("Where to open it. Present only while forwarded, and only on a sandbox that has an outside address.")
	}), uD = R({ ports: L(lD).describe("Everything listening inside the sandbox right now, read fresh each time rather than from a register the sandbox keeps.") }), dD = R({ port: F().int().min(1).max(65535).describe("Which port.") }), fD = R({ previewUrl: P().optional().describe("Where it can now be reached. Absent on a sandbox with no outside address, where the mapping exists but has no public name.") });
})), mD, hD = b((() => {
	J(), pD(), $(), mD = {
		list: q.route({
			method: "GET",
			path: "/ports",
			summary: "What is listening inside the sandbox",
			description: "Every port something is answering on, and whether each one is reachable from outside."
		}).output(uD),
		forward: q.route({
			method: "POST",
			path: "/ports/forward",
			summary: "Make a port reachable",
			description: "Gives one port an address on the outside. Asking twice is harmless: the second call hands back the address the first one made."
		}).input(dD).output(fD),
		unforward: q.route({
			method: "POST",
			path: "/ports/unforward",
			summary: "Stop exposing a port",
			description: "Frees the slot at once. The address keeps resolving; it simply stops leading anywhere."
		}).input(dD).output(Z)
	};
})), gD, _D, vD, yD, bD, xD = b((() => {
	K(), gD = R({
		path: P().describe("Where it sits inside the outbox."),
		size: F().describe("Size in bytes."),
		modifiedAt: F().describe("When it last changed, in milliseconds."),
		url: P().optional().describe("Its public address. Absent when this sandbox has no outside address, or when the file is being refused."),
		blocked: P().optional().describe("Why a file sitting in the outbox is not being served: a hidden name, a credential-shaped name, contents that look like a token, or sheer size. Only the publisher sees this; a stranger asking for the same file gets the same nothing every other miss gets.")
	}), _D = R({
		url: P().optional().describe("Your public address, which every file's own hangs off. Absent on a sandbox with nowhere to publish to."),
		files: L(gD).describe("What the outbox holds.")
	}), vD = R({ path: P().min(1).describe("What to publish, as a workspace path. It is copied rather than moved, so a repository does not lose its build output because somebody shared it.") }), yD = R({ path: P().min(1).describe("What to withdraw, as a path inside the outbox rather than a workspace path.") }), bD = R({
		path: P().describe("Where it landed inside the outbox."),
		url: P().optional().describe("Its public address. Absent on a sandbox with nowhere to publish to.")
	});
})), SD, CD = b((() => {
	J(), xD(), $(), SD = {
		list: q.route({
			method: "GET",
			path: "/public",
			summary: "What is published to the internet",
			description: "Everything currently in the outbox and the address it answers on. There is no call to read a published file back: it is served openly to anyone with the link, which is the entire point of having put it there."
		}).output(_D),
		publish: q.route({
			method: "POST",
			path: "/public/publish",
			summary: "Put a file on the internet",
			description: "Copies a workspace file or folder into the outbox, where it is served to anyone with the link and no sign-in. Answers with the address."
		}).input(vD).output(bD),
		unpublish: q.route({
			method: "POST",
			path: "/public/unpublish",
			summary: "Take something off the internet",
			description: "Withdraws one published entry. When the last one goes, the outbox goes with it, so its existing at all always means something is published."
		}).input(yD).output(Z)
	};
})), wD, TD, ED = b((() => {
	J(), K(), ay(), $(), wD = R({ repos: L(P().min(1)).max(100).default([]).describe("The repositories going out, by workspace id. Empty runs only what stands for every push, whichever repository it is.") }).prefault({}), TD = {
		state: q.route({
			method: "GET",
			path: "/prepush/state",
			summary: "How the pre-push check is going",
			description: "The verdict, or the progress so far. Nothing is addressed by id here, because there is one working tree and so exactly one check."
		}).output(iy),
		run: q.route({
			method: "POST",
			path: "/prepush/run",
			summary: "Run the checks before pushing",
			description: "Starts the suite the workspace runs before anything leaves the machine, and answers immediately. A suite takes minutes, and a request held open that long dies at the first proxy. It runs in a real terminal, so watch it there and poll for the verdict. Name the repositories going out, and each one's own checks run in its own directory."
		}).input(wD).output(Z),
		cancel: q.route({
			method: "POST",
			path: "/prepush/cancel",
			summary: "Stop the pre-push check",
			description: "Kills the run. It settles as cancelled and the push it was gating does not go."
		}).output(Z)
	};
})), DD, OD, kD = b((() => {
	J(), K(), X(), Tm(), DD = R({
		agents: L(R({
			id: P(),
			label: P()
		})).describe("ACP agents installed here. The id is the provider id itself, the label its display name."),
		endpoints: L(R({
			id: P(),
			label: P(),
			kind: V(["endpoint", "localmodel"])
		})).describe("Model endpoints, already prefixed `endpoint/`, including the daemon-provisioned free trial.")
	}), OD = {
		list: q.route({
			method: "GET",
			path: "/providers",
			summary: "Providers a chat can run on here",
			description: "The installed ACP agents and model endpoints, which are the providers this sandbox adds to the fixed native list. A read for anyone who may watch or drive a turn: it names what a message can be addressed to, not what credential stands behind it."
		}).output(DD),
		models: q.route({
			method: "GET",
			path: "/providers/{provider}/models",
			summary: "Models one provider offers",
			description: "Every model this provider serves and which one it defaults to. Never empty: it is discovered live with a stored list behind it. The order is the provider's own preference and is not rearranged here."
		}).input(Dp).output(wm)
	};
})), AD, jD, MD, ND, PD, FD, ID, LD = b((() => {
	K(), AD = R({
		kind: H("webpush").describe("A browser, which the sandbox can reach directly and encrypt end to end."),
		endpoint: vu().describe("Where that browser's push service accepts sends. It also identifies the device everywhere else in this group."),
		keys: R({
			p256dh: P().min(1).describe("The browser's public key, for encrypting what is sent."),
			auth: P().min(1).describe("The browser's secret, for the same.")
		}).describe("What the browser handed you when it subscribed. Post it back exactly as it came; nothing reshapes it.")
	}), jD = R({
		kind: H("relay").describe("A native app, whose operating system only accepts sends from the app's publisher, so the sandbox posts through a relay instead. The message passes through that relay readable, which is the price of the publisher having to be in the loop."),
		url: vu().describe("Where to post a send. Recorded rather than assumed, so the sandbox need not know any platform by name."),
		deviceId: P().min(1).describe("The device's id, which also identifies this registration everywhere else in this group."),
		secret: P().min(1).describe("Proof that this sandbox may notify this device. The relay never learns which sandbox is calling.")
	}), MD = z("kind", [AD, jD]), R({
		title: P().min(1).describe("The headline."),
		body: P().describe("The line under it. Push services cap the whole payload at a few kilobytes, which is why nothing here carries a transcript or a diff: a notification is a pointer back, not a delivery."),
		url: P().optional().describe("Where tapping it goes. An existing tab is focused rather than a new one opened."),
		tag: P().optional().describe("Collapses repeats: a second notification with the same tag replaces the first instead of stacking beside it."),
		requireInteraction: I().optional().describe("Keep it on screen until it is dismissed. Used when the agent is waiting for you, where one that fades away is a question that went unanswered in silence.")
	}), ND = R({
		publicKey: P().describe("The key a browser needs in order to subscribe. Native apps ignore it."),
		subscribed: I().describe("Whether the asking device is already registered, so a toggle can show its real state instead of trusting the device's own permission, which can be granted with nothing behind it.")
	}), PD = R({ id: P().min(1).describe("Which device: a browser's push address, or a native install's device id.") }), FD = R({ id: P().min(1).optional().describe("Which device is asking. Without it the answer can only speak for the sandbox as a whole, which is rarely the question.") }), ID = R({ delivered: F().int().nonnegative().describe("How many devices actually accepted it. A count rather than a yes, because this button exists to prove a chain nobody can inspect, and the sandbox having accepted the request is not the question being asked.") });
})), RD, zD = b((() => {
	J(), LD(), $(), RD = {
		config: q.route({
			method: "GET",
			path: "/push/config",
			summary: "What a device needs to subscribe",
			description: "The public key and settings a browser or app needs before it can register for notifications from this sandbox."
		}).input(FD).output(ND),
		subscribe: q.route({
			method: "POST",
			path: "/push/subscribe",
			summary: "Send notifications to this device",
			description: "Registers one device. The sandbox only interrupts you on the three moments where attention is genuinely wanted: a turn has finished, the agent is stuck on a question, and something is waiting for approval."
		}).input(MD).output(Z),
		unsubscribe: q.route({
			method: "POST",
			path: "/push/unsubscribe",
			summary: "Stop notifying a device",
			description: "Removes one registered device. Others keep receiving."
		}).input(PD).output(Z),
		test: q.route({
			method: "POST",
			path: "/push/test",
			summary: "Send a test notification",
			description: "Proves the whole chain end to end. Worth having, because there are four separate places a notification can be lost that nobody can inspect from the outside: the device's permission, its registration, the sandbox's key, and the delivery service."
		}).output(ID)
	};
})), BD, VD = b((() => {
	J(), Yw(), $(), K(), BD = {
		policy: q.route({
			method: "GET",
			path: "/safety/policy",
			summary: "The safety policy this sandbox is judged against",
			description: "The document that decides when an agent stops to ask you before running something. Prose, not settings: it is read by the model that judges each command. When nobody has written one, this is the text the product ships with, and it describes the behaviour a fresh sandbox already has."
		}).output(Jw),
		setPolicy: q.route({
			method: "POST",
			path: "/safety/policy",
			summary: "Rewrite the safety policy",
			description: "Replaces the document whole. Nothing in it can widen what the sandbox is structurally allowed to do: it decides which of the things an agent may already do are worth interrupting you about."
		}).input(R({ text: P().describe("The policy, as you want it written.") })).output(Z),
		log: q.route({
			method: "GET",
			path: "/safety/log",
			summary: "Recent safety verdicts",
			description: "What was judged lately, what the judge decided, and whether you were interrupted. Newest first. This is where you find out why you were not asked about something, which is the question a policy page otherwise cannot answer."
		}).output(L(qw))
	};
})), HD, UD = b((() => {
	J(), eh(), $(), HD = {
		set: q.route({
			method: "POST",
			path: "/secrets",
			summary: "Store a secret",
			description: "Writes one name and value into the sandbox's own store, where running processes pick it up without a restart. Refused until the sandbox has somewhere to keep them."
		}).input(Bm).output(Z),
		list: q.route({
			method: "GET",
			path: "/secrets",
			summary: "Names of the stored secrets",
			description: "Which secrets exist here. Names only, never values."
		}).output(Vm),
		remove: q.route({
			method: "DELETE",
			path: "/secrets/{key}",
			summary: "Delete a secret",
			description: "Removes one by name."
		}).input(Hm).output(Z),
		inventory: q.route({
			method: "GET",
			path: "/secrets/inventory",
			summary: "Every secret this sandbox holds, from everywhere",
			description: "One view across all the places secrets live here: what exists, where it came from and whether it is working. Never any values. This one always answers, even before there is a store to write to."
		}).output($m),
		reveal: q.route({
			method: "POST",
			path: "/secrets/reveal",
			summary: "Show one secret's value",
			description: "The only call that hands a value back, and it is for the owner alone. Sent as a body rather than in the address, so the name never ends up in a log or a browser's history."
		}).input(Hm).output(Um),
		gates: q.route({
			method: "GET",
			path: "/secrets/gates",
			summary: "Which credentials need somebody's approval",
			description: "What is gated and who may release it. Names and addresses only, never values, and the agent may read it too: knowing a credential needs Bob is what stops it concluding the account is simply not connected."
		}).output(Jm),
		setGate: q.route({
			method: "PUT",
			path: "/secrets/gates/{subject}",
			summary: "Put a credential behind named approvers",
			description: "Names exactly who may release one secret or one connected account, and how far a single release goes. The owner's call alone. A signed-in browser or a mounted server cannot be released for one use, so those are always for the rest of the conversation."
		}).input(qm).output(Z),
		removeGate: q.route({
			method: "DELETE",
			path: "/secrets/gates/{subject}",
			summary: "Stop requiring approval for a credential",
			description: "Removes one gate, so the agent can use that credential the way it uses any other. The owner's call alone."
		}).input(Ym).output(Z),
		request: q.route({
			method: "POST",
			path: "/secrets/request",
			summary: "Ask a named person to release a credential",
			description: "Raises the release card in the live conversation and waits for one of the people named on it. Refused, rather than held, when there is nobody to ask: an unattended turn, no live conversation, or a click with no verified identity behind it."
		}).input(Xm).output(Zm)
	};
})), WD, GD, KD, qD = b((() => {
	K(), Vg(), WD = R({ id: P().describe("Which past conversation.") }), GD = R({
		id: P().describe("Its id."),
		title: P().describe("What it is called."),
		updatedAt: F().describe("When it last moved, in milliseconds."),
		snippet: Tg.optional().describe("Why a search matched: the line it hit, with a little around it, and who said it. Absent on an unfiltered list, and on a match the title already shows, where repeating it would be noise rather than evidence.")
	}), KD = R({ sessions: L(GD).describe("Past conversations, newest first.") });
})), JD, YD = b((() => {
	J(), K(), R_(), qD(), JD = {
		list: q.route({
			method: "GET",
			path: "/sessions",
			summary: "Past conversations in this workspace",
			description: "Summaries for a history menu, filtered when you pass a search. Covers conversations that worked in their own private copies too, so nothing is hidden just because it happened on a branch."
		}).input(R({
			query: P().optional(),
			caseSensitive: Vd().optional()
		})).output(KD),
		get: q.route({
			method: "GET",
			path: "/sessions/{id}",
			summary: "Read one past conversation",
			description: "The full record of a single conversation, restored for display."
		}).input(WD).output(F_)
	};
})), XD, ZD, QD, $D, eO, tO = b((() => {
	K(), R({
		at: F().describe("When the turn ended, in milliseconds."),
		day: P().describe("The day it fell in, as YYYY-MM-DD in UTC, worked out once so nothing downstream has to do timezone arithmetic."),
		provider: P().describe("Which model provider served it."),
		account: P().optional().describe("Which account paid. Absent for a turn run on a plain key, which belongs to no account."),
		model: P().optional().describe("The model that actually ran, past whatever was asked for and every default. Absent only when the provider's own default served it without being named."),
		modelRequested: P().optional().describe("The model that was asked for, when one was named. Differs from `model` when something resolved it."),
		harness: P().describe("Which agentic loop it ran on."),
		outcome: V([
			"ok",
			"error",
			"cancelled"
		]).optional().describe("How it ended: finished, failed, or was stopped by the user."),
		errorCode: P().optional().describe("The failure's code, when it had one."),
		errorMessage: P().optional().describe("What the failure said, trimmed."),
		conversationId: P().optional().describe("Which conversation it belonged to, so spending can be traced to a card. Absent only for an internal one-off with no conversation at all."),
		turns: F().describe("The provider's own count for the request, since one exchange can be several under the hood. One when it reported none."),
		inputTokens: F().describe("Tokens sent."),
		outputTokens: F().describe("Tokens received."),
		cacheReadTokens: F().describe("Tokens served from cache, which cost less."),
		cacheCreationTokens: F().describe("Tokens written to cache, which cost more up front and less afterwards."),
		costUsd: F().describe("What it cost, in dollars."),
		durationMs: F().describe("How long it took, in milliseconds."),
		iqSearchArm: I().optional(),
		iqSearchCohort: P().optional(),
		searchCalls: F().optional(),
		openingSearches: F().optional(),
		openingListings: F().optional(),
		callsBeforeTarget: F().optional(),
		mapArm: I().optional(),
		mapChars: F().optional(),
		turnIndex: F().optional(),
		verification: V([
			"verified",
			"unproven",
			"failing",
			"no-code"
		]).optional(),
		check: P().optional(),
		filesEdited: F().optional(),
		toolCalls: F().optional(),
		checklistTotal: F().optional(),
		checklistOpen: F().optional(),
		compactions: F().optional(),
		contextTokens: F().optional(),
		contextWindow: F().optional(),
		tierScore: F().optional(),
		tierRules: L(P()).optional(),
		tierRouted: I().optional(),
		tierFast: I().optional(),
		tierCeiling: F().optional(),
		tierDenied: I().optional()
	}), XD = R({
		day: P().describe("The day, as YYYY-MM-DD in UTC."),
		provider: P().describe("Which model provider."),
		account: P().optional().describe("Which account. Absent for work run on a plain key."),
		model: P().optional().describe("Which model."),
		harness: P().describe("Which agentic loop."),
		conversationId: P().optional().describe("Which conversation."),
		turns: F().describe("Turns in this group."),
		inputTokens: F().describe("Tokens sent."),
		outputTokens: F().describe("Tokens received."),
		cacheReadTokens: F().describe("Tokens served from cache."),
		cacheCreationTokens: F().describe("Tokens written to cache."),
		costUsd: F().describe("What the group cost, in dollars."),
		durationMs: F().describe("Time spent, in milliseconds.")
	}), ZD = R({
		from: P().optional().describe("First day to include, as YYYY-MM-DD in UTC. Leave it out for everything up to the end day."),
		to: P().optional().describe("Last day to include, as YYYY-MM-DD in UTC, and it is included rather than excluded. Leave it out for everything from the start day onwards.")
	}), QD = R({ rows: L(XD).describe("Spending grouped by day, provider, account, model and conversation. Everything a cost screen shows is a rearrangement of these rows, which is why there is no second call for any of it.") }), $D = R({
		provider: P(),
		account: P(),
		turns: F(),
		inputTokens: F(),
		outputTokens: F(),
		cacheReadTokens: F(),
		cacheCreationTokens: F(),
		costUsd: F()
	}), eO = R({ accounts: L($D) });
})), nO, rO = b((() => {
	J(), PT(), $(), tO(), nO = {
		get: q.route({
			method: "GET",
			path: "/settings",
			summary: "How this sandbox is configured",
			description: "Every setting that governs how agents behave here, with the defaults filled in for anything nobody has chosen."
		}).output(_T),
		set: q.route({
			method: "POST",
			path: "/settings",
			summary: "Change the sandbox settings",
			description: "Writes the settings whole, so send the complete object rather than the fields you changed."
		}).input(_T).output(Z),
		savings: q.route({
			method: "GET",
			path: "/settings/savings",
			summary: "What the token-saving measures were worth",
			description: "Measured rather than estimated: what each mechanism actually saved over a range of days. The same day range the spending ledger takes, so one calendar filters both."
		}).input(ZD).output(DT),
		builtinPrompt: q.route({
			method: "GET",
			path: "/settings/system-prompt/{base}",
			summary: "Read a built-in system prompt",
			description: "The actual text behind one of the built-in modes, so a settings screen can show the prompt instead of asking anyone to trust a description of it, and so either can be forked into a custom one."
		}).input(Zw).output(vT),
		firings: q.route({
			method: "GET",
			path: "/settings/rule-firings",
			summary: "When each rule last did something",
			description: "A separate read rather than a field on the settings, because a rule firing is not somebody editing anything: folding it in would turn every firing into a settings write and put a self-changing value inside the object a screen edits."
		}).output(sT),
		repoChecks: q.route({
			method: "GET",
			path: "/settings/repo-checks",
			summary: "What each repository asks to run on its own code",
			description: `Every repository that declares its own checks at \`${OT}\`, what it declares, and whether you have switched it on. A repository declares what to run because the command belongs beside the scripts it names; nothing it declares runs until you say so.`
		}).output(MT),
		adoptRepoChecks: q.route({
			method: "POST",
			path: "/settings/repo-checks/adopt",
			summary: "Switch a repository's own checks on or off",
			description: "Adopts exactly what that repository declares as it stands now. If the declaration changes afterwards it stops running until you adopt it again, so a command nobody has read cannot inherit the answer given to a different one."
		}).input(NT).output(Z)
	};
})), iO, aO = b((() => {
	J(), m_(), $(), iO = {
		list: q.route({
			method: "GET",
			path: "/share",
			summary: "Conversations published as pages",
			description: "Every conversation that has been turned into a read-only page, with its link. There is no call to read one back: the page itself is the read, and it answers to anyone who has the link."
		}).output(u_),
		create: q.route({
			method: "POST",
			path: "/share",
			summary: "Publish a conversation",
			description: "Renders a conversation into a page anybody with the link can read, without signing in. Answers with the link, so nothing has to be listed again to find it."
		}).input(d_).output(l_),
		update: q.route({
			method: "POST",
			path: "/share/update",
			summary: "Refresh a published page",
			description: "Re-renders an existing page from the conversation as it stands now. Same link, newer contents."
		}).input(f_).output(l_),
		remove: q.route({
			method: "POST",
			path: "/share/remove",
			summary: "Unpublish a conversation",
			description: "Takes the page down, so the link stops answering."
		}).input(p_).output(Z)
	};
})), oO, sO = b((() => {
	J(), PT(), $(), oO = {
		list: q.route({
			method: "GET",
			path: "/skills",
			summary: "What the agent knows how to do",
			description: "Every skill available here and whether it is switched on, joined from all the places they come from: the owner's own, the settings, plugins a connection installed, folders inside extensions, and persona kits."
		}).output(dT),
		read: q.route({
			method: "GET",
			path: "/skills/read",
			summary: "Read one skill",
			description: "The full text of a single skill. The name travels in the query rather than the address, because a name can carry the owner it came from and that will not fit in a path."
		}).input(pT).output(fT),
		save: q.route({
			method: "POST",
			path: "/skills",
			summary: "Write a skill",
			description: "Creates or rewrites a skill by name. A new one starts switched on, because you wrote it in order to use it; rewriting one you switched off leaves it off. Renaming is saving under the new name and deleting the old."
		}).input(mT).output(Z),
		switch: q.route({
			method: "POST",
			path: "/skills/switch",
			summary: "Switch one of your own skills on or off",
			description: "Off takes the agent's copy away and keeps your text; on writes the copy back from it. Built-in tools are switched in the agent settings instead, and nothing else has a switch."
		}).input(gT).output(Z),
		remove: q.route({
			method: "POST",
			path: "/skills/remove",
			summary: "Delete a skill",
			description: "Removes the text and the agent's copy in one step, so a screen never has to sequence two calls and never leaves one half done."
		}).input(hT).output(Z)
	};
})), cO, lO, uO, dO, fO = b((() => {
	K(), cO = R({ distro: P() }), lO = R({
		os: P(),
		arch: P(),
		shell: P(),
		home: P(),
		roots: L(P()),
		engine: R({
			memoryBytes: F(),
			cpus: F()
		}).optional(),
		hostname: P().optional(),
		wsl: cO.optional(),
		wslDistros: L(P()).optional()
	}), uO = R({
		key: P().min(1),
		online: I(),
		version: P().optional(),
		lastSeen: F().optional(),
		facts: lO.optional()
	}), dO = R({
		id: P(),
		platform: P().min(1),
		environments: L(uO).min(1),
		online: I(),
		version: P().optional(),
		lastSeen: F().optional(),
		facts: lO.optional()
	}), R({ hosts: L(dO) });
})), pO = b((() => {})), mO, hO, gO, _O, vO, yO, bO, xO, SO, CO, wO, TO, EO, DO, OO, kO, AO, jO, MO, NO, PO, FO, IO, LO, RO, zO, BO, VO = b((() => {
	K(), fO(), mO = R({
		memoryBytes: F().optional(),
		cpus: F().optional(),
		privileged: I(),
		gpu: I(),
		hostRuntime: L(P()),
		overlayRuntime: L(P())
	}), hO = R({
		memoryGib: xu().positive().nullable().optional(),
		cpus: xu().positive().nullable().optional(),
		privileged: I().optional(),
		gpu: I().optional()
	}), gO = hO.refine((e) => Object.values(e).some((e) => e !== void 0), { message: "a reshape must change at least one thing" }), _O = R({
		slug: P(),
		container: P(),
		name: P().optional(),
		running: I(),
		image: P(),
		tunnelRunning: I().optional(),
		resources: mO.optional()
	}), vO = V([
		"start",
		"stop",
		"restart",
		"prepare",
		"update",
		"rebuild",
		"rollback",
		"reshape",
		"remove",
		"logs",
		"reconnect",
		"runner-up",
		"runner-remove"
	]), yO = R({
		op: vO,
		slug: P().min(1),
		hash: P().optional(),
		resources: gO.optional(),
		parentUrl: P().optional(),
		pair: P().optional().meta({ secret: !0 }),
		setupCode: P().optional().meta({ secret: !0 }),
		definition: P().optional(),
		overlay: P().optional(),
		overlayHash: P().optional()
	}), bO = yO.extend({ id: P().min(1) }), xO = z("kind", [
		R({
			kind: H("line"),
			text: P()
		}),
		R({
			kind: H("result"),
			message: P()
		}),
		R({
			kind: H("error"),
			message: P()
		})
	]), SO = V(["upgrade", "restart"]), CO = R({ op: SO }), wO = CO.extend({ id: P().min(1) }), TO = V([
		"mirror-off",
		"mirror-on",
		"sync-pause",
		"sync-resume",
		"sync-unpair",
		"dev-reload",
		"dev-rebuild",
		"dev-rebuild-log",
		"sync-install"
	]), TO.exclude([
		"dev-reload",
		"dev-rebuild",
		"dev-rebuild-log",
		"sync-install"
	]), EO = P().max(200).regex(/^[A-Za-z0-9][A-Za-z0-9._-]*$/), DO = P().min(1).max(4096).regex(/^(?:~|\/|[A-Za-z]:[\\/])[^"'`$;|&\n\r]*$/), OO = R({
		id: P().min(1),
		command: TO,
		sandboxId: EO.optional(),
		mode: V(["sync", "mirror"]).optional(),
		localDir: DO.optional()
	}), kO = R({
		ok: I(),
		message: P(),
		output: P().optional(),
		refused: I()
	}), AO = V([
		"created",
		"modified",
		"deleted"
	]), jO = R({
		path: P(),
		local: AO.optional(),
		sandbox: AO.optional()
	}), MO = R({
		sandboxId: P(),
		mode: V(["sync", "mirror"]),
		localDir: P().optional(),
		mirroring: V(["on", "off"]).optional(),
		mutagenStatus: P().optional(),
		conflicts: F().int().nonnegative().optional(),
		conflictedPaths: L(jO).optional(),
		paused: I().optional(),
		backupStatus: P().optional()
	}), NO = V([
		"mirrored",
		"held-by-sandbox",
		"busy"
	]), PO = R({
		port: F().int().min(1).max(65535),
		host: V(["127.0.0.1", "::1"]),
		sandboxId: P(),
		state: NO,
		heldBy: P().optional(),
		command: P().optional()
	}), FO = R({
		running: I(),
		pid: F().int().optional(),
		installed: P().optional(),
		build: P().optional(),
		lastTickAt: F().optional()
	}), IO = R({
		hostname: P(),
		os: P(),
		wsl: cO.optional(),
		pairings: L(MO),
		ports: L(PO),
		agent: FO,
		capturedAt: F()
	}), LO = V([
		"offline",
		"scope-off",
		"no-agent",
		"unreported"
	]), RO = R({
		machine: P(),
		mode: V(["sync", "mirror"]),
		seenAt: F().optional()
	}), zO = R({
		key: P(),
		label: P(),
		sync: RO.optional(),
		hostId: P().optional(),
		online: I().optional(),
		platform: P().optional(),
		facts: lO.optional(),
		agentVersion: P().optional(),
		lastSeen: F().optional(),
		report: IO.optional(),
		sandboxes: L(_O).optional(),
		gap: LO.optional()
	}), BO = R({ devices: L(zO) }), R({
		enrolled: I(),
		available: I().optional(),
		machines: L(IO).optional()
	});
})), HO, UO, WO, GO, KO, qO, JO, YO, XO, ZO, QO, $O, ek = b((() => {
	K(), HO = R({
		state: V([
			"ready",
			"unavailable",
			"unknown"
		]).describe("Whether this runtime can serve a turn. Unknown is a real answer rather than a soft no: a check that could not run must not grey out a provider you can in fact use."),
		detail: P().optional().describe("Why it cannot, and what to do about it. Absent when it can."),
		checkedAt: F().describe("When it was last checked, in milliseconds.")
	}), UO = R({
		version: P().optional().describe("What the downloaded build says it is. Absent means ready but unnamed, never that nothing is ready."),
		channel: P().describe("Which channel it was taken from. Not necessarily the one this sandbox follows: downloading a beta build is not the same as moving onto beta."),
		at: F().describe("When the download finished, in milliseconds, which answers whether this is still the update being offered.")
	}), WO = R({
		name: P().optional().describe("What this sandbox is called."),
		image: P().optional().describe("The image it is running."),
		version: P().optional().describe("The version of that image."),
		latest: P().optional().describe("The newest published version on its channel."),
		updateAvailable: I().optional().describe("Whether those two differ."),
		runtimes: B(P(), HO).optional().describe("Which agent runtimes can serve a turn right now, keyed by runtime. Absent until the first check has run, which reads the same as every entry being unknown."),
		channel: P().optional().describe("Which release channel this sandbox follows."),
		previousImage: P().optional().describe("The image the last update replaced, which is what a rollback would return to. Absent means there is nothing to go back to."),
		updateNotes: L(P()).optional().describe("What is in the update, in the words of the people it is for, newest first. Absent or empty whenever there is nothing worth saying, which reads on screen exactly as it did before there were notes at all."),
		moreUpdateNotes: F().optional().describe("How many further notes there are beyond the ones sent, for a sandbox left alone a long time. Absent or zero means you have all of them."),
		breakingNotes: L(P()).optional().describe("What the update takes away, uncapped, because a warning that fell off a shortened list is a breaking update taken unwarned. Absent for the overwhelming majority, which break nothing."),
		staged: UO.optional().describe("An update already downloaded and built on the machine running this container, waiting only for the restart that applies it. That restart is seconds, where an unprepared update is minutes, which is a different decision entirely. Absent when nothing is waiting.")
	}), GO = R({
		kind: V([
			"unreadable",
			"unknownKey",
			"invalidEntry"
		]).describe("What to do about it. Unreadable means the whole file is being ignored and everything in it is at its default. An unknown key means only that key is ignored. An invalid entry means one item of a list was skipped and the rest is fine."),
		detail: P().describe("What exactly was wrong, as one sentence and nothing else. Never the remedy: that is `fix`."),
		suggestion: P().optional().describe("The name it was probably meant to be, when one is close enough to guess honestly."),
		fix: P().optional().describe("What to do about it, when that is something other than 'correct the file'. Absent whenever the file itself is the thing to edit.")
	}), KO = R({
		path: P().describe("The file, as a workspace path. The file is the unit somebody fixes, which is why problems are grouped by it."),
		problems: L(GO).describe("Everything currently wrong with it. A file with nothing wrong is absent rather than present and empty.")
	}), qO = L(KO), JO = R({
		path: P().describe("The file to repair, as the workspace path the problem was reported under. Only the handful of manifests a person hand-edits can be named; anything else is refused."),
		key: P().describe("The stray top-level key, exactly as it was reported. Absent from the file already means there is nothing to do."),
		to: P().optional().describe("Rename the key to this instead of removing it, carrying its value across. Absent means remove it. Naming a key that is already in the file is refused rather than silently overwriting what is there.")
	}), YO = R({
		token: P().describe("The credential every other call carries. Present it as a bearer token."),
		expiresAt: F().describe("When it stops working, in milliseconds, so a caller can renew ahead of it without reading the token."),
		email: P().describe("Who the sandbox verified you as.")
	}), V([
		"google",
		"ticket",
		"passkey",
		"recovery"
	]), XO = R({
		id: P().describe("The credential id the authenticator chose, base64url."),
		email: P().describe("Whose passkey this is; the owner's list carries every member's, a member's only their own."),
		label: P().describe("The name given at registration, or the daemon's default."),
		rpId: P().describe("The editor host this passkey is bound to; a passkey answers only from that origin."),
		createdAt: F().describe("Epoch ms of registration."),
		lastUsedAt: F().optional().describe("Epoch ms of the last sign-in it answered; absent means never."),
		backedUp: I().describe("Whether the authenticator syncs this passkey (a phone's keychain) or holds the only copy (a hardware key).")
	}), R({
		passkeys: L(XO),
		required: I().describe("Whether a passkey is the only proof that opens this sandbox; owner-set."),
		recovery: R({ remaining: F() }).optional().describe("Owner only, while required: how many one-time recovery codes are still unspent.")
	}), R({ required: I() }), R({ codes: L(P()) }), R({ code: P().min(1) }), R({
		error: P(),
		requires: H("passkey"),
		enrolled: I()
	}), ZO = P().regex(/^[A-Za-z0-9_-]+$/, "base64url"), QO = R({
		id: ZO,
		rawId: ZO,
		type: H("public-key"),
		response: R({
			clientDataJSON: ZO,
			attestationObject: ZO,
			transports: L(P()).optional()
		}),
		authenticatorAttachment: P().optional(),
		clientExtensionResults: B(P(), Su()).optional()
	}), $O = R({
		id: ZO,
		rawId: ZO,
		type: H("public-key"),
		response: R({
			clientDataJSON: ZO,
			authenticatorData: ZO,
			signature: ZO,
			userHandle: ZO.optional()
		}),
		authenticatorAttachment: P().optional(),
		clientExtensionResults: B(P(), Su()).optional()
	}), R({
		response: QO,
		label: P().optional()
	}), R({ response: $O });
})), tk, nk = b((() => {
	J(), K(), R_(), tx(), VO(), ZE(), $(), ek(), s_(), tO(), tk = {
		info: q.route({
			method: "GET",
			path: "/info",
			summary: "What this sandbox is",
			description: "The sandbox's own identity and state: which workspace it holds, which image it runs, what it is called, and the list of calls it actually implements. Start here, because a browser is routinely newer than the sandbox it is talking to and this is how it finds out what is there."
		}).output(WO),
		manifestProblems: q.route({
			method: "GET",
			path: "/system/manifest-problems",
			summary: "Settings files the sandbox could not read",
			description: "Anything the daemon tripped over in its own configuration on disk: a file it had to fall back from, a key it did not recognise, an entry it skipped. Separate from the identity call because it goes stale for a different reason, namely a file changing."
		}).output(qO),
		repairManifest: q.route({
			method: "POST",
			path: "/system/manifest-problems/repair",
			summary: "Take a stray setting out of a file",
			description: "Removes a key the sandbox does not recognise from one of its settings files, or renames it to the one it was probably meant to be, keeping the value. Only the files a person hand-edits can be named, and only a key — never a value — so this can only ever remove something already being ignored. Renaming onto a key the file already has is refused instead of overwriting it."
		}).input(JO).output(Z),
		session: q.route({
			method: "POST",
			path: "/system/session",
			summary: "Trade a sign-in for a session",
			description: "Exchanges a verified sign-in, or a session that has not expired yet, for a fresh session the daemon minted. That session is the credential every other call carries, and calling this again with a live one renews it."
		}).output(YO),
		events: q.route({
			method: "GET",
			path: "/events",
			summary: "The live event stream",
			description: "A stream held open for as long as you want it, carrying heartbeats so a caller notices the sandbox dying at once, batches of file changes so a tree or an editor can refresh itself, and the roster of who else is looking. Give it an id for this connection to appear in that roster; leave it out and you watch without being seen."
		}).input(R({ clientId: P().optional() })).output(Jf(ex)),
		presence: q.route({
			method: "POST",
			path: "/system/presence",
			summary: "Say what you are looking at",
			description: "Reports which view, conversation or file this connection is on, or that it has gone idle. The daemon fans it back out on the event stream so everyone else's roster updates."
		}).input(XE).output(Z),
		usage: q.route({
			method: "GET",
			path: "/system/usage",
			summary: "What has been spent",
			description: "Token and cost totals per account, added up from the record of every finished turn."
		}).output(eO),
		terminals: q.route({
			method: "GET",
			path: "/system/terminals",
			summary: "Open terminals",
			description: "The terminal sessions this sandbox is holding, which is what a terminal panel rebuilds its tabs from after a reload. The live typing and output run over a separate socket; this is the list."
		}).output(qg),
		killTerminal: q.route({
			method: "DELETE",
			path: "/system/terminals/{name}",
			summary: "Close a terminal",
			description: "Destroys one terminal session and whatever was running inside it."
		}).input(Jg).output(Z),
		terminalScrollback: q.route({
			method: "GET",
			path: "/system/terminals/{name}/scrollback",
			summary: "A terminal's history as plain text",
			description: "What has scrolled past in one terminal, as text you can select and copy. The live view is a picture of a screen on the far side of a socket, with nothing in the page to select, so scrolling back and copying is this call rather than a gesture."
		}).input(Yg).output(Xg),
		browsers: q.route({
			method: "GET",
			path: "/system/browsers",
			summary: "Browsers the agent has open",
			description: "Every browser a conversation currently has running and the pages inside each one. The picture of what they are showing comes over a separate socket; this is the roster."
		}).output($g),
		closeBrowser: q.route({
			method: "DELETE",
			path: "/system/browsers/{name}",
			summary: "Shut a browser down",
			description: "Closes one of the agent's browsers. Its next attempt to use that browser then fails as though it had crashed, which is the honest account of somebody pulling the plug."
		}).input(e_).output(Z),
		subagents: q.route({
			method: "GET",
			path: "/system/subagents",
			summary: "Subagents the agents have started",
			description: "Every subagent and child agent this sandbox's conversations have delegated work to, whichever tool started it, with what each one is doing."
		}).output(a_),
		subagentTranscript: q.route({
			method: "GET",
			path: "/system/subagents/{id}/transcript",
			summary: "A subagent's record",
			description: "The full record of one delegated subagent, in the same shape as any other conversation. It comes live from the parent turn while it works, and from stored history once it has finished."
		}).input(o_).output(F_),
		devices: q.route({
			method: "GET",
			path: "/system/devices",
			summary: "The machines you have connected",
			description: "Every computer this sandbox can see, whether it reached it through desktop sync or through a connected device, in one row per machine: what it says about itself, which sandboxes it holds, and what stopped it answering when nothing came back."
		}).output(BO),
		manageDeviceSandbox: q.route({
			method: "POST",
			path: "/system/devices/{id}/sandboxes/{slug}",
			summary: "Drive a sandbox on one of your own devices",
			description: "Start, stop, restart, update, rebuild, roll back, reshape (its memory and CPU caps, privileged, GPU) or remove a sandbox running on a machine you own, relayed over the connection that machine holds open. The answer is a stream because the slowest of these takes minutes, and it is the same stream whichever you ask for. The daemon adds no opinion: the machine enforces its own permissions and a refusal arrives as the last line, in the machine's words, naming the switch to flip."
		}).input(bO).output(Jf(xO)),
		runDeviceCommand: q.route({
			method: "POST",
			path: "/system/devices/{id}/commands/{command}",
			summary: "Run one of your device's own CLI actions",
			description: "Performs a named action on a machine you own by running its own intentic-machine command there — turning that device's port mirroring off, say — over the connection it holds open. The set of actions is fixed and the command line is built here from the name, never sent by the caller. The machine enforces its own permissions and a refusal comes back as its own sentence, naming the switch to flip."
		}).input(OO).output(kO),
		runDeviceAgentFlow: q.route({
			method: "POST",
			path: "/system/devices/{id}/agent/{op}",
			summary: "Update or restart the agent on one of your own devices",
			description: "Updates a machine you own to the current intentic-machine agent, or restarts the loop it is running, over the connection that machine holds open. The answer is a stream of the run's own output — and it normally stops mid-run, because the agent's loop is what carries this connection: the work is detached from it first, so it finishes regardless, and the device's reported version is what confirms it. Takes the machine's \"Run commands\" permission, the same one a command typed there would."
		}).input(wO).output(Jf(xO))
	};
})), rk, ik = b((() => {
	J(), K(), am(), Tm(), sm(), $(), rk = {
		accounts: q.route({
			method: "GET",
			path: "/translator/accounts",
			summary: "Subscriptions connected through the translator",
			description: "What is signed in per provider. Each provider can hold several accounts at once, and the translator spreads work across them."
		}).output($p),
		connect: q.route({
			method: "POST",
			path: "/translator/{provider}/connect",
			summary: "Start connecting a subscription",
			description: "Begins the sign-in for one provider and says which of the two shapes it is: a code you type into a device page, which finishes by itself in the background, or a redirect whose landing address you hand back afterwards."
		}).input(R({ provider: om })).output(ym),
		status: q.route({
			method: "GET",
			path: "/translator/{provider}/connect",
			summary: "Read a subscription connection attempt",
			description: "Reports whether this exact sign-in attempt is waiting, completed, or failed. Completion is tied to the attempt rather than a change in account count, because signing in to an existing account replaces its credential in place."
		}).input(R({
			provider: om,
			state: P().min(1)
		})).output(bm),
		complete: q.route({
			method: "POST",
			path: "/translator/{provider}/complete",
			summary: "Finish a redirect sign-in",
			description: "For the providers that redirect somewhere this sandbox cannot receive: hand back the address you landed on and the connection completes."
		}).input(xm).output(Z),
		disconnect: q.route({
			method: "POST",
			path: "/translator/{provider}/disconnect",
			summary: "Disconnect one subscription",
			description: "Clears a single account by name. Any others under the same provider stay connected."
		}).input(R({
			provider: om,
			name: P().min(1)
		})).output(Z)
	};
})), ak, ok, sk = b((() => {
	J(), K(), am(), tO(), ak = R({ force: I().default(!1).describe("Measure again even if a reading was taken a moment ago.") }), ok = {
		rollup: q.route({
			method: "GET",
			path: "/usage/rollup",
			summary: "What was spent, grouped",
			description: "The spending record over a range of days, grouped by day, provider, account and model. Everything a cost screen shows is a rearrangement of this one answer, so nothing needs a second call. Read-only: rows are written by the sandbox as turns end, which is what makes it worth trusting."
		}).input(ZD).output(QD),
		refreshPlanLimits: q.route({
			method: "POST",
			path: "/usage/plan-limits/refresh",
			summary: "Measure every account's plan limits again",
			description: "Reads how full each connected account's plan limits are, for every provider, and records it. Forced, it measures even accounts read a moment ago, which is the right thing when a plan was just changed and the question is whether the number on screen is still true."
		}).input(ak).output(R({ ok: H(!0) })),
		limitReset: q.route({
			method: "GET",
			path: "/usage/limit-reset/{account}",
			summary: "Whether this account's session window can be reopened now",
			description: "Asks the provider whether it will reopen this account's spent session window immediately, which some plans grant once a week. Only worth asking about an account that has actually been refused: the answer is the provider's judgement at this moment, it is not cached, and an account with no such grant answers plainly that it has none."
		}).input(R({ account: P().min(1).describe("Which account.") })).output(Jp),
		claimLimitReset: q.route({
			method: "POST",
			path: "/usage/limit-reset/{account}/claim",
			summary: "Reopen this account's session window now",
			description: "Spends one of the account's weekly resets to reopen its session window immediately. The weekly allowance is untouched and still binds. Answers with what the provider actually did: only `reset` changed anything, and it is the cue to send the refused turn again."
		}).input(R({ account: P().min(1).describe("Which account.") })).output(Yp)
	};
})), ck, lk = b((() => {
	J(), tx(), $(), Kx(), ck = {
		list: q.route({
			method: "GET",
			path: "/vpn",
			summary: "Configured tunnels and which are up",
			description: "Every stored VPN with its live link state, read back from the operating system rather than from memory, so a tunnel dropped from a shell and one dropped from a screen look the same here."
		}).output(Bx),
		connect: q.route({
			method: "POST",
			path: "/vpn/{id}/connect",
			summary: "Dial a VPN",
			description: "Brings a stored tunnel up, streaming the client's progress as it authenticates and then sets up routing. Streamed because a dial takes seconds and can fail with something you have to read: a wrong password, a gateway certificate nobody trusts, a code it wants. Connecting one that is already up simply says so."
		}).input(Vx).output(Jf(Rb)),
		disconnect: q.route({
			method: "POST",
			path: "/vpn/{id}/disconnect",
			summary: "Drop a tunnel",
			description: "Takes the tunnel down. One that was already down is fine: the promise is that it is not up afterwards."
		}).input(Hx).output(Z),
		importForticlient: q.route({
			method: "POST",
			path: "/vpn/import-forticlient",
			summary: "Read connections out of an exported config",
			description: "Turns an exported FortiClient configuration into a list of connections you can add, so somebody holding that file picks from a list instead of retyping a host and port for every tunnel."
		}).input(Ux).output(Gx)
	};
})), uk, dk, fk, pk, mk, hk, gk, _k, vk, yk, bk, xk, Sk, Ck, wk, Tk, Ek, Dk, Ok, kk, Ak = b((() => {
	K(), X(), Tp(), ag(), uk = P().min(1).max(24).regex(/^[a-z0-9][a-z0-9-]*$/), dk = V(["fresh", "continue"]), fk = 24, pk = R({
		id: uk.describe("This step's own name, which other steps use to say they wait on it."),
		title: P().min(1).max(60).describe("What to call it on screen. Short: the instruction below is where the detail goes."),
		goal: P().min(1).optional().describe("What done means for this step, in your words. It is what the step is judged against, and a different sentence from what it is told to do."),
		prompt: P().min(1).optional().describe("What the step is told to do. The goal is the suite is green; this is run the tests, take the top failure, fix it. Leaving it out hands over the run's own request untouched, which is right for a step whose whole job is do what was asked."),
		needs: L(uk).describe("Which steps must finish first. Empty means it starts when the run does. Naming a step that does not exist, or a loop between steps, is refused when the workflow is saved."),
		handoff: dk.describe("How it meets what came before: a fresh conversation handed the previous step's result, or the same conversation carried on."),
		output: Gh.describe("What it has to produce for the step to count."),
		checks: L(Kh).describe("What has to pass before it counts as done."),
		context: Wh.describe("How the step's own repeats meet each other. A long-running step wants to start clean each round; a short polish-this step wants to carry on."),
		maxSpendUsd: F().positive().optional().describe("A ceiling on what this step may spend. The one resource that cannot be recovered after an unattended fan-out, which is why it is here and iteration limits are not. Absent is uncapped."),
		agent: Ep.optional().describe("Which provider runs it."),
		harness: Op.optional().describe("Which agentic loop runs it."),
		account: P().optional().describe("Which account pays for it."),
		model: P().optional().describe("Which model runs it."),
		actsAs: Y.optional().describe("Which persona it acts as. Unpinned, a step gets the strict unwatched default: every tool, and no signed-in accounts at all. Pinning one is how a release check gets a voice, a folder to work in, or the single account it may post from.")
	}), mk = R({
		step: uk.describe("Which step's answer carries the decision. Usually a last step that weighs up the ones before it, though nothing requires that."),
		field: P().min(1).describe("Which of that step's declared answers to read. A declared field is the one part of a step's answer that was checked rather than fished out of prose, which is the whole rule here. Checked when the workflow is saved."),
		pass: L(P().min(1)).min(1).describe("Which values mean ship it. Everything else fails. A list of what passes rather than what fails, because a step answering mostly-pass or pass-with-notes must not ship, and this gets that right without anybody having had to enumerate the ways a model can hedge."),
		dailyMax: F().int().positive().optional().describe("How many runs a day, across every caller. A gate is a paid door with nobody in the loop: one wired into a push-triggered pipeline is a fan-out of conversations per commit. Absent is a small default rather than unlimited.")
	}), hk = V([
		"pass",
		"fail",
		"blocked"
	]), R({
		outcome: hk.describe("Ship it, do not, or we could not tell. That third answer exists because could not reach a judgement is not the product is broken: a gate that reported its own outages as failures is one a team switches off, so it should be the honest answer far more often than the convenient one, and it means a neutral build rather than a red one."),
		reason: P().describe("Why, in one line. Realistically the only part of this a build log will ever show."),
		runId: P().describe("The run behind the verdict, so somebody can go and read it."),
		value: P().optional().describe("What the step actually answered. Absent when there was nothing to read, which is most of the could-not-tell cases.")
	}), gk = R({
		id: Y.describe("The workflow's id."),
		name: P().min(1).max(80).describe("What to call it."),
		description: P().max(400).optional().describe("What it is for."),
		steps: L(pk).min(1).max(fk).describe("The steps, each with what it waits on. Every one runs in its own private copy of the repos, always, because parallel steps sharing a tree collide."),
		gate: mk.optional().describe("Present means a machine can run this design and get a ship-it answer back. Absent means an ordinary workflow, started by a person, with no outside door onto it at all."),
		maxParallel: F().int().min(1).max(8).describe("How many steps may run at once. Bounded, because a fan-out of twelve is twelve model sessions, twelve working copies and twelve times the burn rate, on one machine.")
	}), _k = V([
		"pending",
		"running",
		"done",
		"failed",
		"skipped",
		"stopped"
	]), vk = R({
		stepId: uk.describe("Which step this is."),
		state: _k.describe("How it went. Skipped carries what the others cannot: it never ran, because something it was waiting on did not finish. That is why a failed run shows one red step and a trail of grey ones."),
		conversationId: P().describe("The conversation it ran on, and the way from a node on the graph to a real record. Shared with the step before it when they were chained, which is what makes those two one card."),
		startedAt: F().optional().describe("When it began, in milliseconds."),
		endedAt: F().optional().describe("When it ended, in milliseconds."),
		iterations: F().int().min(0).describe("How many rounds it took."),
		costUsd: F().optional().describe("What it cost, in dollars."),
		loopState: Zh.optional().describe("How its repeating ended. Out of rounds and stuck both come out as a failed step, and the difference between them is the difference between give it more room and more room will not help."),
		detail: P().optional().describe("What went wrong, when something did."),
		document: qh.optional().describe("What it produced, once it has produced something that passes its own declared shape. This is what the steps after it are handed."),
		report: P().optional().describe("The start of its closing words. Bounded, so a long answer is not silently cut down to its last few thousand characters and the record stays a sensible size."),
		reportPath: P().optional().describe("Where the whole answer is, as a workspace path. Every step can read it, so a long handoff need not be copied into anybody's prompt.")
	}), yk = V([
		"running",
		"done",
		"failed",
		"stopped",
		"overspent",
		"error"
	]), bk = R({
		runId: P().min(1).describe("This run's id."),
		workflow: gk.describe("The design as it stood when the run started, copied rather than looked up. The run has to keep showing the graph it actually ran, not the one edited twice since, and a run of a deleted workflow has to stay readable."),
		repos: L(kp).min(1).max(50).describe("The workspace as this run began, one exact commit per repository. Every step branches from these, even if the shared tree moves while a wide fan-out is still opening its copies, so the steps can be compared with each other afterwards."),
		request: P().optional().describe("What this run was asked to do, handed to every step on top of its own instructions. It is what makes one saved design worth keeping: two models, one task is a shape, and the task is different every time. Absent for a run started with nowhere to type one."),
		state: yk.describe("How the run is going. Finished means every step that ran got there; a run with skipped steps counts as failed, because a graph that never reached its end did not do what it was asked whatever the survivors managed."),
		startedAt: F().describe("When it began, in milliseconds."),
		endedAt: F().optional().describe("When it ended, in milliseconds."),
		resumed: F().int().min(0).describe("How many times the sandbox restarted under it and picked it back up."),
		detail: P().optional().describe("What went wrong, when something did."),
		steps: L(vk).describe("One entry per step, in the design's own order. Every one is written down as waiting when the run starts, so the picture is complete from the first frame and a missing step never has to mean two things."),
		archivedAt: F().optional().describe("When it was put away, in milliseconds. The record stays readable and every step's branch, transcript and counters are untouched. Its conversations are put away with it, and brought back with it. Absent means live on the board.")
	}), xk = P().optional().describe("What a pipeline presents at /workflows/{id}/gate, when the design declares a gate. Shown to a maintainer or the owner only."), Sk = gk.extend({ gateToken: xk }), Ck = gk.extend({
		runs: L(bk).describe("Its runs, newest first."),
		gateToken: xk
	}), wk = R({ workflows: L(Ck).describe("Every saved design with its own run history.") }), Tk = R({ runs: L(bk).describe("Every run across every workflow, newest first, including runs of workflows since deleted.") }), Ek = R({ id: P().describe("Which workflow.") }), Dk = R({ runId: P().describe("Which run.") }), Ok = Ek.extend({ request: P().min(1).max(2e4).optional().describe("What to point it at. Optional, because a design whose steps already say what they want is complete on its own; only one written as a shape needs today's sentence.") }), kk = R({
		workflow: gk.describe("The design to write."),
		create: I().describe("Whether you mean to make a new one or replace an existing one. Said outright rather than inferred, so an id that happens to collide is a refusal instead of one saved design quietly overwriting another.")
	});
})), jk, Mk = b((() => {
	J(), $(), Ak(), jk = {
		list: q.route({
			method: "GET",
			path: "/workflows",
			summary: "Saved workflows and their runs",
			description: "Every workflow somebody has designed, each with its own run history, newest first. One answer rather than two, because a workflow that has never been run is the interesting case rather than a mistake."
		}).output(wk),
		save: q.route({
			method: "POST",
			path: "/workflows",
			summary: "Create or replace a workflow",
			description: "Writes a workflow design. Say which of the two you mean, so an id that happens to collide cannot silently overwrite somebody's work. A design that could never run is refused, in the same words the editor shows while you type: a loop in the steps, a step waiting on one that is not there, a step with no way of knowing it is finished."
		}).input(kk).output(Sk),
		rotateGateToken: q.route({
			method: "POST",
			path: "/workflows/{id}/gate/rotate",
			summary: "Rotate a release gate's token",
			description: "Mints a new credential for the workflow's release gate and retires the old one at once. Every pipeline wired to the gate has to be handed the new URL. Refused for a workflow that declares no gate."
		}).input(Ek).output(Dm),
		remove: q.route({
			method: "DELETE",
			path: "/workflows/{id}",
			summary: "Delete a workflow",
			description: "Removes the design. A run of it that is already going keeps going and stays readable and stoppable, because a run takes its own copy of the design when it starts."
		}).input(Ek).output(Z),
		run: q.route({
			method: "POST",
			path: "/workflows/{id}/run",
			summary: "Start a workflow",
			description: "Kicks a workflow off and answers immediately with the run as recorded; the work carries on without you. Point it at a question and every step gets that on top of its own instructions. Every step is written down as waiting up front, so the picture is complete from the first frame. Several runs of one design can be in flight at once without colliding."
		}).input(Ok).output(bk),
		runs: q.route({
			method: "GET",
			path: "/workflows/runs",
			summary: "Every workflow run",
			description: "All runs across all workflows, newest first. This is also the only place the runs of a deleted workflow are still reachable."
		}).output(Tk),
		stopRun: q.route({
			method: "POST",
			path: "/workflows/runs/{runId}/stop",
			summary: "Stop a run now",
			description: "Nothing further starts, and the steps already going are cut off where they stand. Whatever they had written stays on their branches. Deliberately abrupt rather than letting the current step finish: a step is a whole agent turn, and a stop that kept spending for minutes afterwards is indistinguishable from a button that does nothing. It always ends the run, including one left stranded by a daemon that was replaced mid-flight."
		}).input(Dk).output(Z),
		archiveRun: q.route({
			method: "POST",
			path: "/workflows/runs/{runId}/archive",
			summary: "Take a finished run off the board",
			description: "Nothing is lost and the working copies are reclaimed. Every conversation the run started is put away with it, which is what makes this an archive rather than a dismissal: a step has no card of its own, so merely dropping the run would spill its conversations onto the board at the moment somebody said they were done. Refused while the run is still going."
		}).input(Dk).output(Z),
		unarchiveRun: q.route({
			method: "POST",
			path: "/workflows/runs/{runId}/unarchive",
			summary: "Bring an archived run back",
			description: "Puts a run and every conversation it started back on the board."
		}).input(Dk).output(Z)
	};
})), Nk, Pk, Fk, Ik, Lk, Rk, zk, Bk, Vk, Hk, Uk, Wk, Gk, Kk, qk, Jk, Yk, Xk, Zk, Qk = b((() => {
	K(), oD(), Nk = R({ repos: L(P()).describe("Every repository's id, sorted. An id is its folder relative to the workspace root, and \"root\" is the workspace itself.") }), Pk = R({
		name: P().min(1).describe("What to call it in the workspace."),
		cloneUrl: P().min(1).describe("Where to clone it from."),
		branch: P().optional().describe("Which branch to check out. Leave it out for the repository's default.")
	}), Fk = R({
		name: P().describe("What it ended up called."),
		path: P().describe("Where it landed.")
	}), Ik = R({ name: P().min(1).describe("What to call it, which is also its folder under the workspace root.") }), Lk = R({
		repo: P().describe("Which repository."),
		status: V([
			"updated",
			"current",
			"dirty",
			"diverged",
			"no-remote",
			"skipped",
			"error"
		]).describe("What happened to it. Dirty and diverged are why a repository was left alone: it had uncommitted work, or it had moved in a way that cannot be fast-forwarded."),
		behind: F().optional().describe("How many commits it was behind."),
		ahead: F().optional().describe("How many commits it was ahead."),
		head: P().optional().describe("The commit it ended up on."),
		message: P().optional().describe("What went wrong, when something did.")
	}), Rk = R({ repos: L(Lk).describe("One entry per repository, saying what happened to it.") }), zk = R({
		template: P().min(1).describe("Which kind of app to scaffold, by its key in the template list."),
		name: P().min(1).regex(/^[a-z][a-z0-9-]*$/).describe("What to call this one.")
	}), Bk = R({
		repo: P().describe("Which repository to scaffold into."),
		apps: L(zk).min(1).describe("The apps to add.")
	}), Vk = R({
		repo: P().describe("Which repository."),
		session: P().describe("What to call the terminal this runs in, so you can find it again."),
		dirs: L(P()).min(1).describe("Which projects to test, as folders relative to the repository. Empty targets the repository root.")
	}), Hk = R({
		key: P().describe("The id to name when scaffolding one."),
		label: P().describe("What to call it on screen."),
		description: P().describe("What you get.")
	}), Uk = R({ templates: L(Hk).describe("The kinds of app the configured source repository knows how to scaffold.") }), Wk = R({
		app: P().describe("The app's name, which is also its folder."),
		kind: P().optional().describe("What sort of app it is: the template it came from, or the framework worked out from its dependencies. Absent when it was found purely by having a dev script."),
		previewUrl: P().optional().describe("Where to open it. Absent when this sandbox has no outside address."),
		running: I().describe("Whether its dev server is up."),
		healthy: I().describe("Whether it is actually answering."),
		installed: I().describe("Whether its dependencies are installed, which is what decides whether a start takes seconds or an install first."),
		launch: nD.optional().describe("Where a start the sandbox is running has got to: its shell coming up, installing, its dev command running with nothing listening yet, or exited back to a prompt. Absent when nothing is starting and once it serves.")
	}), Gk = R({ apps: L(Wk).describe("The apps in this repository.") }), Kk = R({
		name: P().describe("The name the package declares."),
		dir: P().describe("Where it lives, relative to the repository."),
		group: P().describe("The top-level folder it sits under, which is what a diagram colours by.")
	}), qk = V([
		"prod",
		"dev",
		"peer"
	]), Jk = R({
		from: P().describe("The package that depends."),
		to: P().describe("The package it depends on."),
		type: qk.describe("Which kind of dependency declared it.")
	}), Yk = R({
		packages: L(Kk).describe("Every package in the repository."),
		edges: L(Jk).describe("Which of them use which. Pure data: how to lay it out is yours to decide.")
	}), Xk = R({ repo: P().describe("Which repository.") }), Zk = R({
		repo: P().describe("Which repository."),
		app: P().min(1).regex(/^[a-z][a-z0-9-]*$/).describe("Which app inside it.")
	});
})), $k, eA, tA, nA, rA = b((() => {
	K(), $k = R({
		dir: P().describe("Where the project is, relative to the workspace root. Empty means the root itself."),
		ecosystem: V(["node", "python"]).describe("Which language's tooling it uses."),
		manager: P().describe("The tool that would do the installing."),
		command: P().describe("The exact command that would run."),
		evidence: P().describe("The file that decided all of the above, so the answer can be checked rather than trusted."),
		state: V([
			"ready",
			"installing",
			"needs-setup",
			"unsupported",
			"stale"
		]).describe("Ready means its dependencies are really there. Stale means it was installed once and has since outgrown that, which is what an agent leaves behind when it adds a dependency without installing it. Unsupported means this sandbox has no such tool."),
		missing: F().optional().describe("How many declared dependencies cannot be found on disk. What separates never-installed from outgrown.")
	}), eA = R({ projects: L($k).describe("Every project the sandbox found, and whether each is usable.") }), tA = R({ dirs: L(P().max(500)).min(1).max(50).describe("Which projects to install, by folder. Ones already ready, already installing, or with no tool to install them are skipped rather than refused.") }), nA = R({ queued: L(P()).describe("Which of them actually started, which is not necessarily what you asked for.") });
})), iA, aA = b((() => {
	J(), hC(), qy(), $(), Qk(), uC(), rA(), Lb(), iA = {
		tree: q.route({
			method: "GET",
			path: "/workspace/tree",
			summary: "The workspace file tree",
			description: "Every folder and file under the workspace root, as one walk. Name a conversation to read its own private copy of the tree instead of the shared one. Folders the daemon skips, such as installed packages, come back without their contents; ask for those separately."
		}).input(db).output(mb),
		children: q.route({
			method: "GET",
			path: "/workspace/children",
			summary: "A bounded folder listing",
			description: "The entries inside a folder as one flat list. Direct children are the default, which is how the explorer opens a folder the full tree walk left closed; callers that need a small subtree can ask for up to five levels without a request per directory."
		}).input(hb).output(gb),
		file: q.route({
			method: "GET",
			path: "/workspace/file",
			summary: "Read part of a text file",
			description: "A window of one file's text, plus how large the whole file is. Never the entire file: an unbounded read is how a single enormous log stalls the daemon for everyone, so ask for the slice you mean to show and page through if you need more."
		}).input(bb).output(Cb),
		derived: q.route({
			method: "GET",
			path: "/workspace/derived",
			summary: "Read a file's derived text",
			description: "What a document, picture, recording or archive says, as text, from the shadow the sandbox keeps beside it. This is the same rendering an agent reads instead of the bytes, so it is also the way to check what one is working from. Nothing is derived here: a file with no shadow yet answers that it has none, and whether it could have one."
		}).input(wb).output(Ab),
		derive: q.route({
			method: "POST",
			path: "/workspace/derive",
			summary: "Derive a file's text now",
			description: "Renders one file to text and answers with the result, for when its shadow is missing or you want it rebuilt. The same work the background pass does when that setting is on, so this is how a reader gets the text without turning it on for the whole workspace. Costs a parse of exactly one file; a format nothing can read says so rather than failing."
		}).input(wb).output(Ab),
		derivedStatus: q.route({
			method: "GET",
			path: "/workspace/derived-status",
			summary: "How the background rendering is doing",
			description: "Whether documents, pictures, recordings and archives are being rendered to text in the background, how many are waiting, which are being read right now, and how many shadows the last whole-tree pass counted. Ask this to tell a file nothing can read from a file whose turn has not come."
		}).output(Tb),
		mediaTicket: q.route({
			method: "POST",
			path: "/workspace/media-ticket",
			summary: "Get a pass for streaming a media file",
			description: "Mints the short-lived ticket a video or audio element hands to the streaming route, which serves byte ranges and so cannot carry an ordinary header. Minting it here means a caller can tell whether this sandbox streams media at all, rather than discovering it mid-playback."
		}).input(vb).output(yb),
		resolve: q.route({
			method: "GET",
			path: "/workspace/resolve",
			summary: "Turn a written path into a real file",
			description: "Matches a path somebody wrote in prose against the real tree and says which file it means. A path mentioned in a message is often only the tail of the real one, so this is the lookup behind every clickable file reference rather than a plain existence check."
		}).input(jb).output(Mb),
		search: q.route({
			method: "GET",
			path: "/workspace/search",
			summary: "Search the code",
			description: "Ranked results across the whole workspace, grouped, each carrying why it matched and how fresh it is. Left alone it blends plain text, structure, meaning and history in one pass; narrow it to a single kind of search when you already know which you want. Long result sets resume from the cursor it hands back."
		}).input(rC).output(lC),
		health: q.route({
			method: "GET",
			path: "/workspace/health",
			summary: "A repo's shape in numbers",
			description: "Where one repo's risk sits: the files that change often and are complicated at once, what the index holds, and which modules the rest of the code leans on most. Scoped to a repo, because a codebase is a repo rather than the whole drop."
		}).input(dC).output(mC),
		classify: q.route({
			method: "GET",
			path: "/workspace/classify",
			summary: "Sort a messy drop into buckets",
			description: "Proposes which of the loose things in the workspace are code, documents, media or archives. A read-only suggestion by fixed rules, with no model involved: nothing moves until a caller applies the moves it likes through the move call."
		}).output(Ib),
		mkdir: q.route({
			method: "POST",
			path: "/workspace/dir",
			summary: "Create a folder",
			description: "Makes a folder, and any missing folders above it."
		}).input(Nb).output(Z),
		delete: q.route({
			method: "DELETE",
			path: "/workspace/entry",
			summary: "Delete a file or folder",
			description: "Removes one entry and everything under it. The path travels in the body rather than the address, the same as every other write in this group."
		}).input(_b).output(Z),
		move: q.route({
			method: "POST",
			path: "/workspace/move",
			summary: "Move or rename something",
			description: "Moves one entry to a new path, which is also how you rename it."
		}).input(Pb).output(Z),
		copy: q.route({
			method: "POST",
			path: "/workspace/copy",
			summary: "Copy a file or folder",
			description: "Duplicates one entry at a new path, recursively for a folder."
		}).input(Pb).output(Z),
		setup: q.route({
			method: "GET",
			path: "/workspace/setup",
			summary: "Which projects have their dependencies installed",
			description: "Per project, whether its dependencies are actually present. A project that arrives by import comes without them, so files landing is not the same as the project working: until this says a project is ready, its type checks and tests can only mislead you."
		}).output(eA),
		install: q.route({
			method: "POST",
			path: "/workspace/setup/install",
			summary: "Install a project's dependencies",
			description: "Starts the install for one or more projects in a terminal you can attach to, and answers immediately. The run survives a page reload and its output stays in the terminal history."
		}).input(tA).output(nA),
		repos: q.route({
			method: "GET",
			path: "/workspace/repos",
			summary: "Repos in the workspace",
			description: "Every git repo the daemon found in the workspace, with where each one sits and what it is called."
		}).output(Nk),
		addRepo: q.route({
			method: "POST",
			path: "/workspace/repos",
			summary: "Clone a repo in",
			description: "Clones a repository into the workspace beside the others, using whatever forge credentials the sandbox already holds."
		}).input(Pk).output(Fk),
		createRepo: q.route({
			method: "POST",
			path: "/workspace/repos/new",
			summary: "Start a new repo",
			description: "Makes an empty repository in the workspace: a folder named after it, initialised, with a README that names it and one commit, so an agent can start on it at once. Nothing is cloned and nothing leaves the machine."
		}).input(Ik).output(Fk),
		sync: q.route({
			method: "POST",
			path: "/workspace/sync",
			summary: "Pull every repo up to date",
			description: "Fetches every repo that has a remote and fast-forwards the ones that can move safely, reporting what happened to each. This runs by itself at the start of a turn; call it directly to refresh on demand, or to re-sync a repo that had drifted."
		}).output(Rk),
		templates: q.route({
			method: "GET",
			path: "/workspace/templates",
			summary: "App templates you can add",
			description: "The kinds of app the configured source repo knows how to scaffold, which is what an add-app picker lists."
		}).output(Uk),
		addApps: q.route({
			method: "POST",
			path: "/workspace/repos/{repo}/apps",
			summary: "Scaffold new apps into a repo",
			description: "Starts scaffolding one or more apps inside an existing multi-package repo and answers straight away. Watch the terminal it opens for progress and for anything that goes wrong."
		}).input(Bk).output(Z),
		appsList: q.route({
			method: "GET",
			path: "/workspace/repos/{repo}/apps",
			summary: "Apps inside a repo",
			description: "The apps in one multi-package repo, each with its preview address and whether its dev server is up."
		}).input(Xk).output(Gk),
		packageGraph: q.route({
			method: "GET",
			path: "/workspace/repos/{repo}/graph",
			summary: "How a repo's packages depend on each other",
			description: "Every package in one multi-package repo and which of its siblings each one uses, which is what a dependency view draws."
		}).input(Xk).output(Yk),
		modules: q.route({
			method: "GET",
			path: "/workspace/modules",
			summary: "Every package across every repo",
			description: "The named packages in the whole workspace, which is what a review list groups changed files under when a reader wants packages rather than paths. Whole-workspace in one answer, because a review spans repos and asking per repo would be a fan-out on every open."
		}).output(By),
		startApp: q.route({
			method: "POST",
			path: "/workspace/repos/{repo}/apps/{app}/start",
			summary: "Start an app's dev server",
			description: "Brings up one app's preview server in an attachable terminal, so its address starts answering."
		}).input(Zk).output(Z),
		stopApp: q.route({
			method: "POST",
			path: "/workspace/repos/{repo}/apps/{app}/stop",
			summary: "Stop an app's dev server",
			description: "Shuts one app's preview server down and frees its port."
		}).input(Zk).output(Z),
		runTests: q.route({
			method: "POST",
			path: "/workspace/repos/{repo}/tests",
			summary: "Run a project's tests",
			description: "Starts the test run for the projects you name in an attachable terminal and answers straight away. The terminal is where the results appear."
		}).input(Vk).output(Z)
	};
})), oA = b((() => {
	J(), K(), VO(), FS(), fO(), $(), q.output(lO), q.input(oS).output(Z), q.output(Z), q.input(Su()).output(Su()), q.input(yO).output(Jf(xO)), q.input(CO).output(Jf(xO));
})), sA, cA, lA, uA, dA = b((() => {
	K(), sA = R({
		origin: P(),
		mode: V(["read", "act"])
	}), cA = R({
		browser: P(),
		tabs: F(),
		grants: L(sA),
		paused: I()
	}), lA = R({
		id: P(),
		platform: P().min(1),
		online: I(),
		version: P().optional(),
		lastSeen: F().optional(),
		facts: cA.optional()
	}), R({ browsers: L(lA) }), uA = R({
		name: P(),
		value: P(),
		domain: P(),
		path: P(),
		expires: F().optional(),
		httpOnly: I(),
		secure: I(),
		sameSite: V([
			"Strict",
			"Lax",
			"None"
		])
	}), R({
		account: P().min(1),
		origin: P().min(1),
		cookies: L(uA).min(1).max(300)
	}), R({
		account: P().min(1),
		domain: P().min(1)
	}), R({
		ok: I(),
		message: P(),
		cookies: L(uA).optional()
	});
})), fA = b((() => {
	J(), K(), FS(), $(), dA(), q.output(cA), q.input(lS).output(Z), q.output(Z), q.input(Su()).output(Su());
})), pA = b((() => {
	J(), K(), W_(), Sp(), X(), am(), $(), q.output(gp), q.input(vp).output(Jf(yp)), q.input(bp).output(Jf(z_)), q.input(em).output(R({ applied: I() })), q.input(R({
		conversationId: P().min(1),
		text: P(),
		attachments: L(P()).optional(),
		editorContext: Ap.optional()
	})).output(R({
		applied: I(),
		invalid: P().optional()
	})), q.input(R({ toml: P() })).output(R({ settings: L(P()) })), q.input(bp.pick({ conversationId: !0 })).output(Z), q.output(Z);
})), mA = b((() => {})), hA, gA, _A = b((() => {
	hA = "The interrupted request is repeated below, where part of it was already completed in this session, continue from that point instead of starting over.", gA = {
		auth: `The Claude credential that interrupted this conversation has been renewed, and this turn resumed automatically. ${hA}`,
		outage: `The model provider was briefly unavailable and interrupted this conversation; this turn resumed automatically. ${hA}`,
		restart: `The sandbox restarted while this turn was running, which stopped it, and this turn resumed automatically once it came back. ${hA}`,
		stopped: `The previous attempt at this request stopped before it finished, and it has been sent again. ${hA}`,
		limit: `The model provider's usage allowance ran out while this turn was running, which stopped it, and it has been sent again. ${hA}`,
		switched: "The model provider's usage allowance ran out while this turn was running, which stopped it, and it has been sent again on a different account, which starts a fresh session. The conversation so far has been carried across above, including the part of the request that was already completed, and the sandbox has measured where the work actually stands (the files changed on this branch, what was verified, what the checklist still holds) in the note headed 'Where the work stands': trust that note over anything recalled, then continue from that point instead of starting over.",
		carried: `The model provider's usage allowance ran out while this turn was running, which stopped it, and it has been sent again on a different account of the same provider, in this same session: everything you knew is still here. ${hA}`,
		refused: "The model provider refused the previous attempt at this request outright, because its usage allowance was spent: no part of the request below was read or acted on, and nothing has been done towards it. It has been sent again, and starts from the beginning. Where the sandbox has measured earlier work on this branch, it is in the note headed 'Where the work stands'.",
		answered: "The sandbox restarted while this conversation was waiting for the user to respond; it is back, and their response follows below: continue from where the session left off."
	}, gA.answered;
})), vA = b((() => {})), yA = b((() => {})), bA = b((() => {})), xA, SA = b((() => {
	K(), xA = [
		"editor",
		"read",
		"drive",
		"land"
	], V(xA);
})), CA, wA, TA, EA, DA, OA, kA = b((() => {
	Rh(), CA = [
		{
			path: ".intentic/config/capabilities.json",
			invalidates: [
				"capabilities",
				"environment",
				"panels",
				"manifests"
			],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/capability-dismissals.json",
			invalidates: ["capabilities"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/records/secret-uses.json",
			invalidates: ["secrets"],
			portability: "carry"
		},
		{
			path: ".intentic/records/wallet-ledger.json",
			invalidates: [],
			why: "Rendered through the wallet CLI and the capability card's live status probe, not from a browser query key.",
			portability: "carry"
		},
		{
			path: ".intentic/config/personas.json",
			invalidates: [
				"personas",
				"capabilities",
				"manifests"
			],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/environment.custom.Dockerfile",
			invalidates: ["environment"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/environment.Dockerfile",
			invalidates: ["environment"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/environment.d/",
			invalidates: ["environment"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/local/environment.approved.Dockerfile",
			invalidates: ["environment"],
			portability: "derived",
			note: "The target composes its own overlay on first boot; rebuild it there to install the tools it names."
		},
		{
			path: ".intentic/config/settings.json",
			invalidates: ["settings", "manifests"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/safety.md",
			invalidates: ["safety-policy"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/local/safety-log.json",
			invalidates: ["safety-log"],
			portability: "derived",
			note: "The target starts its own record of what it decided."
		},
		{
			path: ".intentic/config/autostart.json",
			invalidates: [],
			why: "The browser reads what is running off /panels; this file only tells the daemon what to start at boot.",
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/heavy-commands.json",
			invalidates: ["settings"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/hooks/",
			invalidates: [],
			why: "The settings screen renders the rules that name these scripts, out of settings.json; nothing in the browser reads the scripts themselves.",
			portability: "carry",
			versioned: !0,
			outsideWriter: "the owner or an agent, authoring them; the daemon only ever RUNS one, by the path a rule's command names"
		},
		{
			path: ".intentic/local/rule-firings.json",
			invalidates: ["rule-firings"],
			portability: "derived",
			note: "Stamps of when each rule last did something; the new sandbox starts its own record."
		},
		{
			path: ".intentic/records/runtime-installs.json",
			invalidates: ["environment"],
			portability: "carry"
		},
		{
			path: ".intentic/config/engines.json",
			invalidates: ["engines"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/approvals/",
			invalidates: ["approvals"],
			portability: "carry",
			versioned: !0,
			authored: !0
		},
		{
			path: ".intentic/config/automations.json",
			invalidates: [],
			why: "Declared by the intentic.automations extension's contributes.files, `automations` is its query key, not core's.",
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/records/automation-runs.json",
			invalidates: [],
			why: "Declared by the intentic.automations extension's contributes.files, `automations` is its query key, not core's.",
			portability: "carry"
		},
		{
			path: ".intentic/records/approvals/",
			invalidates: [],
			why: "Declared by the intentic.approvals extension's contributes.files (the page that lists held wakes), `automation-approvals` is its query key, not core's.",
			portability: "carry"
		},
		{
			path: ".intentic/records/issues/",
			invalidates: [],
			why: "Declared by the intentic.issues extension's contributes.files, `issues` is its query key, not core's.",
			portability: "carry"
		},
		{
			path: ".intentic/records/chores/",
			invalidates: [],
			why: "Declared by the intentic.maintenance extension's contributes.files, `maintenance-report`/`maintenance-runs` are its query keys, not core's.",
			portability: "carry"
		},
		{
			path: ".intentic/config/docs/",
			invalidates: [],
			why: "Declared by the intentic.documentation extension's contributes.files, `documentation`/`documentation-runs` are its query keys, not core's.",
			portability: "carry",
			authored: !0,
			outsideWriter: "the intentic.documentation extension's staging writes (its paths.ts)"
		},
		{
			path: ".intentic/config/workflows.json",
			invalidates: ["workflows"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/records/workflow-runs.json",
			invalidates: ["workflows", "workflow-runs"],
			portability: "carry"
		},
		{
			path: ".intentic/config/loop-designs.json",
			invalidates: ["loop-designs"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/records/loops.json",
			invalidates: [],
			why: "Ralph loops and their iteration history. Nothing observes it: where a RUNNING loop stands rides on the fleet roster (AgentSummary.loop), which the /events stream already pushes about once a second, and a second source invalidating on this file could only ever disagree with the card beside it. The iteration list of an ENDED loop is an on-demand read, nothing renders it until someone opens it (web's useLoops, which holds no query for exactly this reason).",
			portability: "carry"
		},
		{
			path: ".intentic/records/webchat-installs.json",
			invalidates: [],
			why: "Which origins have loaded a Front Desk's widget, written on a 30s flush timer while a customer's site serves page views. The install panel that renders it fetches on open and polls itself while it is on screen, which is the whole window in which the answer changes for anyone. Pushing instead would bill every connected browser a refetch per flush, for a panel almost nobody has open.",
			portability: "carry"
		},
		{
			path: ".intentic/records/issue-installs.json",
			invalidates: [],
			why: "The same probe for the bug reporter's script, on the same flush timer and read by the same kind of panel, so it is outside the push path for the same reason the Front Desk's is.",
			portability: "carry"
		},
		{
			path: ".intentic/records/webchat-outbox.json",
			invalidates: [],
			why: "Front Desk replies a visitor has not collected yet, written when an approved wake answers or a human writes as the agent. The only reader is a stranger's browser polling the public /webchat door, which no query key in this app addresses; the owner's own view of the same words is the conversation's transcript, which the agent registry already pushes.",
			portability: "carry"
		},
		{
			path: ".intentic/records/thread-sessions.json",
			invalidates: [],
			why: "Thread bookkeeping (an inbound thread, a Front Desk visitor, a Discord or Slack channel, → sandbox conversation + provider session), written on EVERY inbound message. Nothing in the browser reads it: what a thread produces is a conversation, and the fleet board already learns about that from the agent registry's own push. Naming a key here would bill every connected browser a refetch per inbound message, the request storm this table's own note warns about, to refresh nothing it can see.",
			portability: "carry"
		},
		{
			path: ".intentic/records/senders.json",
			invalidates: [],
			why: "Who has written to each listener source, written on every inbound message that reached an automation. Read only while the automation editor's sender picker is open, which fetches it on open; a live key here would refetch every connected browser per Discord message to refresh a list nobody has on screen.",
			portability: "carry"
		},
		{
			path: ".intentic/config/extension-settings.json",
			invalidates: [],
			why: "Held in a module-level shallowRef store per extension (web's extensionSettingsStore) with no query observer, and deliberately so: api.settings.get must answer SYNCHRONOUSLY from an extension's first activate() line, and the store outlives every component scope. A module-level QueryObserver is the one shape that would make invalidation refetch, and this app already ruled it out, it detaches on the queryClient.clear() at logout (see useSandbox's sandbox-list mirror). So a remote member's setting edit reaches this browser on its next load, not live.",
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/extension-enablement.json",
			invalidates: ["extensions"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/workspace-extensions/",
			invalidates: ["extensions"],
			portability: "carry",
			versioned: !0,
			authored: !0
		},
		{
			path: ".intentic/records/extension-updates.json",
			invalidates: ["extensions"],
			portability: "carry"
		},
		{
			path: ".intentic/config/extension-update-policy.json",
			invalidates: ["extensions"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/records/extension-usage.json",
			invalidates: [],
			why: "Which of the routes each extension DECLARED it has actually called, the evidence behind the permissions list on its row. The one entry here whose empty set is a RATE decision rather than an architectural one: every browser with the app open reports its batch on a timer, so wiring this to the `extensions` query would refetch the whole list every few seconds for a figure nobody is watching change. The tab reads it when it loads, which is when anyone is reading it.",
			portability: "carry"
		},
		{
			path: ".intentic/identity/members.json",
			invalidates: [],
			why: "Not this view's source at all: SandboxAccess renders the PLATFORM's invite records (apiClient.invite.list), and this file is the daemon's ENFORCED copy, written first so a grant the enforcer never got is never recorded, then never read back. A change here means the two disagreed, which the write order makes fail-closed rather than stale.",
			portability: "identity",
			note: "Re-invite collaborators from the Access tab, a grant is the platform's record, and the target enforces its own copy."
		},
		{
			path: ".intentic/secrets/auth/",
			invalidates: [],
			why: "AI-provider credentials and runtime homes, plus the capability and extension-settings secret vaults; each account is rendered through owner-gated provider routes.",
			portability: "secret",
			note: "Sign the agent's AI accounts in again on the Agent tab, then re-enter each connection's credential on Capabilities and each extension's secret settings on Extensions, both arrived listed but unauthenticated."
		},
		{
			path: ".intentic/records/sessions/claude/",
			invalidates: [],
			why: "Agent session transcripts; nothing derives from watching them, and descending into them would cost a fifth of the watcher.",
			portability: "carry"
		},
		{
			path: ".intentic/records/artifacts/",
			invalidates: [],
			why: "Durable outputs owned by conversations and extension runs: attachments, browser captures, generated images, acceptance reports, workflow step reports, voice transcripts, and loop ledgers.",
			portability: "carry"
		},
		{
			path: ".intentic/local/cache/",
			invalidates: [],
			why: "Rebuildable indexes and caches, the iq index and its vector sidecar, the whisper model, fileq's derived/ markdown shadows of binary files; ignored by the watcher and recreated from carried workspace content.",
			portability: "derived"
		},
		{
			path: ".intentic/local/runtime/",
			invalidates: [],
			why: "Extension runtime scratch (watermarks, cached short-lived tokens); nothing renders it and gateways re-derive it.",
			portability: "derived",
			outsideWriter: "extensions, through extensionRuntimeDir below"
		},
		{
			path: ".intentic/local/tmp/",
			invalidates: [],
			why: "Scratch that agents and tools leave behind (build logs, demo checkouts); nothing reads it after the turn that wrote it. The state janitor empties it at boot.",
			portability: "derived"
		},
		{
			path: ".intentic/local/.pnpm-store/",
			invalidates: [],
			why: "pnpm's content-addressable store, auto-created by installs run from under .intentic; the next install rebuilds it.",
			portability: "derived",
			outsideWriter: "pnpm itself, when an install runs from under .intentic"
		},
		{
			path: ".intentic/local/newest-run.json",
			invalidates: [],
			why: "The newest daemon version that ever ran this workspace (store/newest-run.ts), a downgrade tripwire, about THIS sandbox the way rule-firings is.",
			portability: "derived",
			note: "The target stamps its own daemon version on first boot."
		},
		{
			path: ".intentic/records/verify.json",
			invalidates: [],
			why: "The dependency verifier's verdict memory; nothing renders it directly, outcomes reach the owner as activity entries and workspace events.",
			portability: "carry"
		},
		{
			path: ".intentic/local/verify/",
			invalidates: [],
			why: "A running check's wrapper artifacts (log + exit status), read once by the daemon when the panel finishes.",
			portability: "derived"
		},
		{
			path: ".intentic/secrets/ci.json",
			invalidates: [],
			why: "Webhook secret + conclusion memory; the Pipelines view reads it through /ci/runs, not off disk.",
			portability: "secret",
			note: "Re-add the CI webhook on the Pipelines view, its secret is per-sandbox."
		},
		{
			path: ".intentic/secrets/doors.json",
			invalidates: [],
			why: "The credentials behind the event webhooks, release gates and bug intakes; each surface reads its own through /automations and /workflows, never off disk.",
			portability: "secret",
			note: "Webhook, gate and intake URLs are minted fresh on the first read here: re-copy each into its caller's secret store."
		},
		{
			path: ".intentic/identity/control-tokens.json",
			invalidates: [],
			why: "Hashed control tokens (the ACP editor bridge, and anything else driving this sandbox from outside), listed on demand by the owner.",
			portability: "identity",
			backup: !1,
			note: "Mint fresh control tokens, the old ones authenticate against the source sandbox."
		},
		{
			path: ".intentic/identity/owner.json",
			invalidates: [],
			why: "Bound once on first use; a change here means the sandbox was re-owned, which re-authenticates anyway.",
			portability: "identity"
		},
		{
			path: ".intentic/identity/workspace.json",
			invalidates: [],
			why: "The workspace identity, read from the /events hello frame rather than as a file.",
			portability: "identity"
		},
		{
			path: ".intentic/identity/passkeys.json",
			invalidates: [],
			why: "The passkeys registered with this sandbox, whether one is required to open it, and the hashes of the owner's recovery codes; the Access tab reads them through /system/passkeys, never off disk.",
			portability: "identity",
			note: "Passkeys are bound to the sandbox they were registered with: add them again on the new one from its Access tab."
		},
		{
			path: ".intentic/config/templates.json",
			invalidates: [],
			why: "Scaffold templates, read when the scaffold dialog opens.",
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/local/browser/",
			invalidates: [],
			why: "Browser-login profiles: Chromium rewrites these constantly. Descent-ignored by the watcher outright.",
			portability: "derived",
			note: "Log the agent's browser back into any site it needs, profiles do not travel."
		},
		{
			path: ".intentic/local/extensions/",
			invalidates: [],
			why: "Extension checkouts, whole git clones. The `extensions` query is driven by the capability manifest above, not by their contents.",
			portability: "derived",
			note: "Extensions re-clone from the capability manifest on the target's next reconcile."
		},
		{
			path: ".intentic/records/plugins/",
			invalidates: [],
			why: "Agent plugin dirs, read by the SDK's loader each turn.",
			portability: "carry"
		},
		{
			path: ".intentic/config/skills/",
			invalidates: ["skills"],
			portability: "carry",
			versioned: !0
		},
		{
			path: ".intentic/config/personas/",
			invalidates: ["personas"],
			portability: "carry",
			versioned: !0
		}
	], wA = CA, wA.filter((e) => e.versioned).map((e) => e.path), wA.filter((e) => e.versioned || e.authored).map((e) => e.path), TA = {
		config: `${Ih}/config`,
		records: `${Ih}/records`,
		local: `${Ih}/local`,
		identity: `${Ih}/identity`,
		secrets: `${Ih}/secrets`
	}, EA = Object.keys(TA), DA = (e) => {
		switch (e.portability) {
			case "secret": return "secrets";
			case "identity": return "identity";
			case "derived": return "local";
			case "carry": return e.versioned === !0 || e.authored === !0 ? "config" : "records";
		}
	}, EA.flatMap((e) => {
		let t = wA.filter((t) => DA(t) === e);
		return t.some((e) => e.versioned === !0) ? t.filter((e) => e.versioned !== !0).map((e) => e.path) : [`${TA[e]}/`];
	}), OA = wA.filter((e) => e.backup !== !1 && (e.portability === "carry" || e.portability === "identity")).map((e) => e.path), wA.filter((e) => !OA.includes(e.path)).map((e) => e.path), wA.filter((e) => e.invalidates.includes("manifests")).map((e) => e.path), `${Ih}`, `${Ih}`;
})), AA = b((() => {})), jA = b((() => {})), MA = b((() => {})), NA = b((() => {})), PA = b((() => {})), FA = b((() => {})), IA, LA = b((() => {
	IA = (e) => e instanceof Error ? e.message : String(e);
})), RA = b((() => {})), zA, BA, VA, HA, UA = b((() => {
	zA = /(?:auth[_-]?token|access[_-]?token|refresh[_-]?token|api[_-]?key|access[_-]?key|secret[_-]?key|client[_-]?secret|private[_-]?key|passwo?rd|passphrase|credentials?|secret|token|bearer)["']?[ \t]*[:=][ \t]*(?:"([^"\n]*)"|'([^'\n]*)'|([^\s"',;}\n]*))/gi, BA = [
		/-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----/,
		/PuTTY-User-Key-File-\d/,
		/\b[a-z][a-z0-9+.-]*:\/\/[^\s/:@]+:(?!\*+@)[^\s/@]{3,}@/i
	], VA = [
		/\bnpm_[A-Za-z0-9]{30,}/,
		/\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{30,}/,
		/\bgithub_pat_[A-Za-z0-9_]{50,}/,
		/\bglpat-[A-Za-z0-9_-]{16,}/,
		/\bxox[baprs]-[A-Za-z0-9-]{10,}/,
		/\bsk-[A-Za-z0-9_-]{20,}/,
		/\b(?:sk|rk)_live_[A-Za-z0-9]{16,}/,
		/\bAKIA[0-9A-Z]{16}\b/,
		/\bASIA[0-9A-Z]{16}\b/,
		/\bAIza[0-9A-Za-z_-]{35}\b/,
		/\bhf_[A-Za-z0-9]{30,}/,
		/\bdop_v1_[a-f0-9]{60,}/,
		/\bey[A-Za-z0-9_-]{10,}\.ey[A-Za-z0-9_-]{10,}\./
	], [...BA, ...VA], HA = (e) => e.map((e) => new RegExp(e.source, `${e.flags}g`)), HA(VA), new RegExp(zA.source, zA.flags);
})), WA = b((() => {})), GA, KA = b((() => {
	GA = 80, GA * .6;
})), qA = b((() => {
	KA(), kA();
})), JA = b((() => {})), YA = b((() => {
	Tw();
})), XA = b((() => {
	K(), R({
		type: H("hello"),
		token: P(),
		version: P()
	});
})), ZA = b((() => {
	K(), R({
		type: H("hello"),
		token: P(),
		version: P()
	});
})), QA = b((() => {})), $A, ej = b((() => {
	K(), Fm(), R({
		provider: P().min(1),
		type: P().min(1),
		id: P(),
		channelId: P(),
		author: R({
			id: P(),
			name: P(),
			groups: L(P()).optional()
		}),
		content: P(),
		mentioned: I().optional(),
		branch: P().optional(),
		history: L(R({
			author: R({
				id: P(),
				name: P()
			}),
			content: P(),
			timestamp: P(),
			self: I().optional()
		})).optional(),
		timestamp: P(),
		extra: B(P(), Su()).optional()
	}), $A = R({
		state: V([
			"waiting",
			"code",
			"failed"
		]),
		code: P().optional(),
		detail: P().optional(),
		since: F().optional()
	}), Pm.extend({
		whisperReady: I().optional(),
		pairing: B(P(), $A).optional()
	});
})), tj = b((() => {})), nj = b((() => {})), rj = b((() => {})), ij = b((() => {})), aj = b((() => {})), oj, sj = b((() => {
	oj = {
		cautious: 0,
		balanced: .25,
		eager: .4
	}, oj.balanced;
})), cj = b((() => {})), lj, uj, dj, fj, pj, mj = b((() => {
	K(), lj = [
		"claude",
		"codex",
		"cursor",
		"opencode",
		"translator"
	], uj = V(lj), dj = R({
		kind: V([
			"blessed",
			"latest",
			"pinned",
			"image"
		]).describe("Where this engine's version comes from."),
		version: P().optional().describe("Which version, when it is pinned to one.")
	}), fj = R({
		version: P().describe("Which version was refused."),
		reason: P().describe("What was wrong with it: it would not launch, or it did not export what the daemon calls."),
		at: P().describe("When it was refused.")
	}), pj = R({
		id: uj.describe("Which engine."),
		label: P().describe("What it is called on screen."),
		running: R({
			version: P().optional().describe("The version a turn would use right now. Absent means there is no copy of this engine here yet."),
			source: V(["image", "store"]).describe("Whether that version is the one baked into the sandbox image or one the store installed over it.")
		}).describe("What a turn started now would actually run."),
		baked: P().optional().describe("The version the image bakes, which is the floor everything else falls back to. Absent on an image that carries no copy of it."),
		channel: dj.describe("The owner's standing answer for this engine."),
		offered: R({
			version: P().describe("The version this engine would move to."),
			blessed: I().describe("Whether the blessed list names this version, which on the latest channel is routinely no.")
		}).optional().describe("A newer version waiting, absent when the running one is already what the channel asks for."),
		blessed: P().optional().describe("What the blessed list names for this engine, when the list has been read."),
		previous: P().optional().describe("The version kept one step back, which is what going back means."),
		quarantined: L(fj).describe("Versions the store installed and then refused, with the reason."),
		diskBytes: F().int().nonnegative().describe("What this engine's kept versions cost on the daemon's volume."),
		installing: I().optional().describe("Whether this engine is currently being installed in the background.")
	}), R({
		engines: L(pj).describe("Every engine this sandbox can run, whether or not the store holds anything for it."),
		checkedAt: P().optional().describe("When upstream was last asked what it publishes. Absent until the first check has run."),
		listSource: P().describe("Where the blessed list is read from, so a self-hosted sandbox can show its own."),
		listReadAt: P().optional().describe("When that list was last read. Absent means it has never been reachable from here.")
	}), R({
		id: uj.describe("Which engine."),
		kind: V([
			"blessed",
			"latest",
			"pinned",
			"image"
		]).describe("Where its version should come from."),
		version: P().optional().describe("Which version, required when pinning and ignored otherwise.")
	}), R({
		id: uj.describe("Which engine."),
		version: P().optional().describe("Which version. Leave it out for whatever the channel offers; naming one takes a version nobody has blessed, deliberately."),
		floor: P().optional().describe("Install the lowest published version at or above this one. What a turn refused for being too old sends back.")
	}), R({ id: uj.describe("Which engine.") }), R({
		ok: H(!0).describe("It went through."),
		version: P().describe("Which version is now active."),
		source: V(["image", "store"]).describe("Whether that is the image's copy or the store's."),
		fromNextTurn: I().describe("Whether the change reaches turns already in flight, or only the next one.")
	});
})), hj, gj, _j, vj, yj, bj, xj, Sj, Cj, wj = b((() => {
	K(), hj = R({
		content: P(),
		hash: P()
	}), gj = R({
		bornAt: F(),
		at: F(),
		apt: L(P()),
		paths: L(P())
	}), _j = V([
		"apt",
		"pip",
		"cargo",
		"npm",
		"rustup-target",
		"playwright",
		"gem",
		"pipx",
		"go",
		"other"
	]), vj = R({
		tool: P(),
		kind: _j,
		sessions: L(P()),
		commands: L(P()),
		firstAt: F(),
		lastAt: F(),
		count: F(),
		declinedAt: F().optional()
	}), R({
		installs: L(vj),
		drift: gj.optional()
	}), yj = R({
		tool: P(),
		kind: _j,
		sessions: F(),
		lastAt: F(),
		live: I(),
		drafted: I().optional(),
		declined: I().optional(),
		step: P().optional()
	}), R({
		tool: P().min(1),
		decision: V([
			"adopt",
			"dismiss",
			"restore"
		])
	}), bj = R({
		base: P(),
		root: P().optional()
	}), R({
		proposal: hj.optional(),
		custom: hj.optional(),
		approved: hj.optional(),
		appliedHash: P().optional(),
		container: P().optional(),
		drift: gj.optional(),
		recurring: L(yj).optional(),
		localImage: bj.optional()
	}), R({ hash: P().min(1) }), xj = R({
		name: P(),
		version: P().optional()
	}), Sj = R({
		id: P(),
		name: P(),
		origin: V([
			"custom",
			"capability",
			"base"
		]),
		originLabel: P().optional(),
		state: V([
			"active",
			"after-rebuild",
			"awaiting-approval"
		]),
		tools: L(xj),
		extras: F().optional(),
		purpose: P().optional(),
		detail: P().optional(),
		commands: P().optional()
	}), R({ items: L(Sj) }), Cj = R({
		name: P(),
		status: V([
			"packing",
			"ready",
			"failed"
		]),
		bytes: F(),
		createdAt: F(),
		secrets: I(),
		error: P().optional()
	}), R({ exports: L(Cj) });
})), Tj, Ej, Dj, Oj, kj, Aj = b((() => {
	K(), hp(), Tj = V([
		"definition",
		"bundle",
		"hermes",
		"openclaw"
	]), Ej = V(["hermes", "openclaw"]), Dj = V([
		"workspace",
		"repo",
		"files",
		"history",
		"environment",
		"capability",
		"settings",
		"memory",
		"skill",
		"automation",
		"secret"
	]), Oj = R({
		id: P(),
		group: Dj,
		label: P(),
		detail: P().optional(),
		applicable: I(),
		reason: P().optional(),
		recommended: I(),
		secrets: L(P())
	}), R({
		source: Tj,
		token: P(),
		name: P().optional(),
		items: L(Oj),
		carriesSecrets: I(),
		refused: L(P()),
		needsAction: L(mp)
	}), R({
		token: P(),
		items: L(P()),
		includeSecrets: I()
	}), R({
		applied: L(R({
			id: P(),
			group: Dj,
			label: P()
		})),
		failed: L(R({
			id: P(),
			label: P(),
			error: P()
		})),
		refused: L(P()),
		needsAction: L(mp),
		presentation: R({
			name: P().optional(),
			image: P().optional()
		}).optional()
	}), kj = R({
		id: P(),
		online: I(),
		found: Ej.optional(),
		detail: P().optional()
	}), R({ hosts: L(kj) }), R({ host: P().min(1) });
})), jj, Mj, Nj, Pj, Fj, Ij, Lj = b((() => {
	K(), hp(), FS(), PT(), jj = wu({
		id: P().min(1),
		remote: P().min(1),
		ref: P().optional()
	}), Mj = wu({
		remote: P().min(1),
		ref: P().optional()
	}), Nj = wu({
		baseImage: P().optional(),
		dockerfile: P().optional()
	}), Pj = (e) => {
		let t = e;
		for (; t instanceof Md || t instanceof Nd;) t = t.unwrap();
		return t;
	}, Fj = () => wu(Object.fromEntries(Object.entries(_T.shape).map(([e, t]) => [e, Pj(t).optional()]))).prefault({}), Ij = wu({
		schemaVersion: H(1),
		name: P().optional(),
		environment: Nj.prefault({}),
		workspace: Mj.optional(),
		repositories: L(jj).prefault([]),
		capabilities: L(SS).prefault([]),
		secrets: L(P()).prefault([]),
		settings: Fj()
	}), R({
		toml: P(),
		omitted: L(mp)
	}), R({ differences: L(mp) }), R({
		remote: P().min(1).optional(),
		name: P().min(1).optional(),
		owner: P().min(1).optional()
	}), R({
		remote: P(),
		branch: P(),
		created: I()
	}), R({
		remote: P().optional(),
		branch: P().optional(),
		hosts: L(P())
	}), R({
		version: H(3),
		sandbox: R({ name: P() }).optional(),
		presentation: R({
			name: P().optional(),
			image: P().optional()
		}).optional(),
		createdAt: F(),
		secrets: I(),
		repos: L(P()),
		definition: Ij,
		excluded: L(R({
			path: P(),
			portability: P(),
			note: P().optional()
		}))
	});
})), Rj = b((() => {})), zj = b((() => {})), Bj = b((() => {})), Vj = b((() => {})), Hj = b((() => {})), Uj = b((() => {
	Uh();
})), Wj, Gj, Kj = b((() => {
	tf(), km(), Lm(), iv(), Yy(), cb(), ub(), nC(), VC(), UC(), qC(), YC(), Cw(), QT(), ME(), PE(), RE(), BE(), HE(), $E(), tD(), cD(), hD(), CD(), ED(), kD(), zD(), VD(), UD(), YD(), rO(), aO(), sO(), nk(), ik(), sk(), lk(), Mk(), aA(), oA(), fA(), pA(), mA(), W_(), Nh(), _A(), tx(), R_(), vA(), yA(), bA(), tf(), SA(), Rh(), kA(), AA(), jA(), MA(), NA(), PA(), lp(), pp(), ww(), FA(), Rw(), RA(), Yw(), UA(), WA(), Qf(), qA(), YA(), XA(), ZA(), QA(), Sp(), ej(), tj(), nj(), rj(), JA(), Tw(), rp(), ij(), aj(), sj(), Uh(), cj(), Fm(), X(), Vg(), ob(), Kv(), FS(), ay(), Ug(), hC(), VO(), mj(), wj(), gx(), xw(), Gg(), qy(), AE(), nv(), fO(), IE(), kx(), Sv(), ZE(), ag(), zC(), XS(), oD(), XT(), am(), pD(), Tm(), sm(), xD(), LD(), eC(), eh(), qD(), PT(), m_(), $(), ek(), s_(), tO(), Kx(), dA(), Ak(), Qk(), uC(), rA(), Lb(), Aj(), Lj(), Rj(), zj(), Bj(), KA(), pO(), Vj(), Hj(), Uj(), Wj = {
		accounts: Om,
		activity: Im,
		agent: rv,
		agents: Jy,
		approvals: sb,
		automations: lb,
		capabilities: tC,
		chores: BC,
		ci: HC,
		endpoints: KC,
		extensions: Sw,
		personas: ZT,
		safety: BD,
		sessions: JD,
		settings: nO,
		share: iO,
		skills: oO,
		intentic: LE,
		git: jE,
		history: NE,
		workspace: iA,
		inventory: zE,
		issues: VE,
		logs: QE,
		loops: eD,
		panels: sD,
		ports: mD,
		public: SD,
		prepush: TD,
		providers: OD,
		push: RD,
		secrets: HD,
		system: tk,
		translator: rk,
		usage: ok,
		vpn: ck,
		exit: JC,
		workflows: jk
	}, Gj = Yd(Wj), Gj.map((e) => e.name), ef(Wj);
})), qj, Jj, Yj = b((() => {
	({bindHost: qj, host: Jj} = e("ext-maintenance"));
})), Xj, Zj, Qj, $j, eM, tM, nM, rM, iM, aM, oM, sM, cM, lM = b((() => {
	Rh(), Xj = 64, Zj = 8, Qj = 0, $j = (e) => `r${e.toString(36).padStart(Zj, "0")}${(Qj++).toString(36)}`, eM = (e, t, n) => `${e.prefix}-${t}${n === void 0 ? "" : `-${n}`}`.slice(0, Xj).replace(/[-_]+$/u, ""), tM = (e) => `${e.prefix}-`, nM = (e) => `${Ih}/${e.runsDir}`, rM = (e, t) => `${nM(e)}/${t}`, iM = (e, t) => `${rM(e, t)}/run.json`, aM = (e, t, n) => n === void 0 ? rM(e, t) : `${rM(e, t)}/${n}`, oM = (e, t, n) => `${aM(e, t, n)}/result.json`, sM = (e, t) => {
		try {
			let n = JSON.parse(e);
			return typeof n != "object" || !n ? void 0 : t(n);
		} catch {
			return;
		}
	}, cM = (e) => [
		`When you are finished, write your conclusion to ${e.path} as JSON:`,
		e.fields,
		...e.outcomes === void 0 ? [] : [e.outcomes],
		"Write that file even if you conclude there was nothing to do."
	].join("\n\n");
})), uM, dM, fM, pM, mM, hM, gM, _M, vM, yM, bM, xM, SM, CM = b((() => {
	lM(), uM = {
		runsDir: "records/chores/runs",
		prefix: "mt",
		scanRuns: 30
	}, dM = nM(uM), fM = uM.scanRuns, pM = tM(uM), mM = (e) => $j(e), hM = (e) => eM(uM, e), gM = (e) => iM(uM, e), _M = (e) => oM(uM, e), vM = /* @__PURE__ */ new Set([
		"acted",
		"reported",
		"clean"
	]), yM = (e) => sM(e, (e) => {
		let t = e, { runId: n, repo: r, chore: i } = t;
		if (typeof n == "string" && typeof r == "string" && typeof i == "string") return {
			createdAt: 0,
			digest: "",
			headline: "",
			conversationId: hM(n),
			...t,
			runId: n,
			repo: r,
			chore: i
		};
	}), bM = (e) => sM(e, ({ outcome: e, summary: t }) => typeof e != "string" || !vM.has(e) ? void 0 : {
		outcome: e,
		summary: typeof t == "string" ? t : ""
	}), xM = (e) => {
		let t = e.split("`");
		return t.length % 2 == 0 ? [{
			text: e,
			code: !1
		}] : t.map((e, t) => ({
			text: e,
			code: t % 2 == 1
		}));
	}, SM = (e) => cM({
		path: _M(e),
		fields: "{\"outcome\": \"acted\" | \"reported\" | \"clean\", \"summary\": \"<one or two sentences>\"}",
		outcomes: "Use \"acted\" if you changed something, \"reported\" if you are handing back findings without changing anything, and \"clean\" if you checked and the findings did not hold up: a tool was wrong, or the situation is deliberate. \"clean\" is a good outcome and the most useful one you can give when it is true: it is what stops this chore being raised again over the same evidence."
	});
})), wM, TM, EM, DM, OM = b((() => {
	Kj(), Yj(), CM(), wM = async () => PC.parse(await Jj().sandbox.json("/chores")), TM = () => ({
		queryKey: Jj().sandbox.key("maintenance-report"),
		queryFn: wM
	}), EM = async () => {
		let e = Jj(), t = await e.sandbox.json(`/workspace/children?path=${encodeURIComponent(dM)}`).catch(() => void 0);
		if (t === void 0) return [];
		let n = gb.parse(t).entries.filter((e) => e.type === "dir").toSorted((e, t) => t.path.localeCompare(e.path)).slice(0, fM);
		return (await Promise.all(n.map(async (t) => {
			let n = await e.workspace.file(`${t.path}/run.json`), r = n === void 0 ? void 0 : yM(n);
			if (r === void 0) return;
			let i = await e.workspace.file(_M(r.runId));
			return {
				manifest: r,
				result: i === void 0 ? void 0 : bM(i)
			};
		}))).flatMap((e) => e === void 0 ? [] : [e]).toSorted((e, t) => t.manifest.createdAt - e.manifest.createdAt);
	}, DM = () => ({
		queryKey: Jj().sandbox.key("maintenance-runs"),
		queryFn: EM
	});
})), kM, AM, jM, MM, NM, PM = b((() => {
	qn(), Kj(), OM(), Yj(), kM = t(Jj, `${Ih}/records/chores/seen.json`), {state: AM, start: jM} = n({
		host: Jj,
		everyMs: 6e5,
		initial: () => [],
		read: async (e) => Gn(Wn(await e.sandbox.fetch(TM()), Date.now()), await kM.read())
	}), MM = () => {
		let e = AM.value.length;
		if (e === 0) return;
		let t = AM.value.filter((e) => e.severity === "warning"), n = t.length > 0 ? t : AM.value;
		return {
			count: e,
			tone: t.length > 0 ? "warning" : "info",
			tooltip: `${n.length === 1 ? "" : `${n.length} chores, newest: `}${n[0]?.chore.title}, ${n[0]?.headline}`
		};
	}, NM = async (e) => {
		let t = e.filter((e) => e.state === "due");
		t.length !== 0 && await kM.mark(Object.fromEntries(t.map((e) => [Un(e.repo, e.chore.id), e.digest]))) && (AM.value = AM.value.filter((e) => !t.includes(e)));
	};
})), FM, IM, LM, RM, zM, BM, VM, HM, UM, WM, GM, KM, qM, JM, YM, XM, ZM, QM, $M, eN, tN, nN, rN, iN, aN, oN, sN, cN, lN, uN, dN, fN, pN, mN, hN, gN, _N = b((() => {
	qn(), Yj(), CM(), FM = { class: "flex min-w-0 flex-1 flex-col gap-0.5 font-normal @lg:flex-row @lg:items-center @lg:gap-3" }, IM = { class: "@lg:shrink-0 flex min-w-0 items-center gap-2" }, LM = { class: "min-w-0 truncate text-content" }, RM = {
		key: 0,
		class: "shrink-0 rounded bg-content/5 px-1.5 py-0.5 text-2xs text-subtle"
	}, zM = { class: "flex min-w-0 flex-1 items-baseline gap-2" }, BM = { class: "min-w-0 truncate text-xs text-subtle" }, VM = {
		key: 0,
		class: "shrink-0 text-2xs text-subtle/70"
	}, HM = ["title"], UM = { class: "lowercase" }, WM = { class: "@lg:inline hidden text-subtle/70" }, GM = { class: "@lg:px-2" }, KM = {
		key: 0,
		class: "mb-3 flex items-start gap-2 rounded-lg bg-info/10 px-3 py-2"
	}, qM = { class: "flex min-w-0 flex-col gap-0.5" }, JM = { class: "flex flex-wrap items-baseline gap-x-2" }, YM = { class: "text-xs text-content" }, XM = { class: "text-2xs text-subtle" }, ZM = {
		key: 1,
		class: "mb-3 flex items-start gap-2 rounded-lg bg-success/10 px-3 py-2"
	}, QM = { class: "flex min-w-0 flex-col gap-0.5" }, $M = { class: "text-xs text-content" }, eN = {
		key: 0,
		class: "text-2xs text-subtle"
	}, tN = {
		key: 1,
		class: "flex flex-wrap items-baseline gap-x-1.5 text-2xs"
	}, nN = { class: "text-subtle line-through" }, rN = { class: "whitespace-nowrap text-content" }, iN = {
		key: 2,
		class: "grid max-w-read grid-cols-facts items-baseline gap-x-3 gap-y-1"
	}, aN = { class: "font-mono text-2xs text-subtle" }, oN = { class: "min-w-0 break-words font-mono text-2xs text-content" }, sN = { class: "mt-3 max-w-read text-2xs leading-relaxed text-subtle" }, cN = { class: "text-content" }, lN = {
		key: 4,
		class: "mt-3 flex max-w-read flex-col gap-1.5 rounded-lg bg-content/5 px-3 py-2"
	}, uN = { class: "flex flex-wrap items-center gap-x-2 gap-y-1 text-2xs text-subtle" }, dN = {
		key: 0,
		class: "rounded bg-content/10 px-1 font-mono text-2xs"
	}, fN = {
		key: 5,
		class: "mt-3 max-w-read text-2xs leading-relaxed text-subtle"
	}, pN = { class: "mt-4 flex flex-wrap items-center gap-2 border-t border-line/60 pt-3" }, mN = 8, hN = 220, gN = /*@__PURE__*/ p({
		__name: "ChoreRow",
		props: {
			verdict: {},
			run: {},
			measuring: {},
			expanded: { type: Boolean },
			showRepo: { type: Boolean },
			busy: { type: Boolean }
		},
		emits: [
			"toggle",
			"start",
			"remeasure",
			"snooze",
			"unsnooze",
			"open"
		],
		setup(e, { emit: t }) {
			let n = t, r = ye(() => Jj().models, "maintenance-chore"), u = () => {
				n("start", r.overridden.value ? r.model.value : void 0), r.clear();
			}, p = a(() => e.measuring.filter((t) => t.repo === e.verdict.repo && e.verdict.chore.needs.includes(t.id))), se = a(() => p.value.length > 0), ce = be(se), le = a(() => {
				let e = p.value.map((e) => e.startedAt).filter((e) => e !== void 0);
				if (e.length === 0) return "waiting for the machine";
				let t = Math.max(0, Math.round((ce.value - Math.min(...e)) / 1e3));
				return t < 60 ? `${t}s` : `${Math.floor(t / 60)}m ${t % 60}s`;
			}), ue = a(() => p.value.map((e) => Fn(e.id).measures).join(" and ")), de = a(() => e.verdict.chore.needs.map((e) => Fn(e).measures).join(" and ")), fe = a(() => e.verdict.chore.needs.some((e) => Fn(e).tier === 2)), pe = a(() => e.verdict.measuredAt === void 0 ? "Measure now" : "Re-measure"), ge = a(() => se.value ? `Measuring ${ue.value}${fe.value ? ": a deep check can take a few minutes" : ""}` : `Measure ${de.value} again now${fe.value ? ", a deep check can take a few minutes" : ""}`), xe = ee(), y = ee();
			ne(se, (t, n) => {
				if (t) {
					xe.value = e.verdict.headline, y.value = void 0;
					return;
				}
				n === !0 && xe.value !== void 0 && (y.value = {
					from: xe.value,
					to: e.verdict.headline
				}, xe.value = void 0);
			});
			let Se = a(() => e.run?.running === !0 ? e.run.manifest.conversationId : void 0), b = a(() => Se.value === void 0 && e.verdict.state !== "clear" ? Vn(e.verdict) : void 0), Ce = a(() => Hn(e.verdict)), x = {
				acted: "changed something",
				reported: "changed nothing and handed back what it found",
				clean: "looked, and the findings did not hold up"
			}, we = a(() => {
				let e = b.value;
				if (e === void 0) return "";
				let t = `A turn ran against exactly this evidence ${_e(e.ranAt, { days: !0 })} and ${x[e.outcome] ?? e.outcome}.`;
				return Ce.value ? `${t} Open the row to read it.` : `${t} It is being asked again on this chore's own cadence.`;
			}), Te = a(() => se.value ? {
				variant: "info",
				label: "measuring"
			} : e.verdict.state === "due" ? Ce.value ? {
				variant: "neutral",
				label: e.verdict.severity === "warning" ? "carrying" : "due"
			} : e.verdict.severity === "warning" ? {
				variant: "warning",
				label: "carrying"
			} : {
				variant: "info",
				label: "due"
			} : e.verdict.state === "stale" ? {
				variant: "neutral",
				label: "re-measure"
			} : e.verdict.state === "snoozed" ? {
				variant: "neutral",
				label: "snoozed"
			} : e.verdict.state === "unavailable" ? {
				variant: "neutral",
				label: "unmeasured"
			} : {
				variant: "success",
				label: "clear"
			}), Ee = a(() => e.verdict.measuredAt === void 0 ? void 0 : `measured ${_e(e.verdict.measuredAt)}`), S = a(() => e.verdict.state === "stale" ? e.run === void 0 ? "This measurement was taken before the last turn against this chore, and nothing has measured since." : `This measurement was taken before the turn that ran ${_e(e.run.manifest.createdAt)}, and nothing has measured since.` : e.verdict.settled && e.run !== void 0 ? `Re-measured since the turn that ran ${_e(e.run.manifest.createdAt)}, and the evidence has not moved.` : void 0), De = a(() => e.verdict.detail.map((e) => {
				let t = e.indexOf(" · ");
				return t === -1 ? {
					key: e,
					tag: void 0,
					claim: e
				} : {
					key: e,
					tag: e.slice(0, t),
					claim: e.slice(t + 3)
				};
			})), Oe = ee(!1), ke = a(() => Oe.value ? De.value : De.value.slice(0, mN)), Ae = a(() => xM(e.run?.result?.summary ?? "")), je = ee(!1), Me = a(() => (e.run?.result?.summary ?? "").length > hN), Ne = a(() => {
				if (e.run?.running === !0) return {
					variant: "info",
					label: "running"
				};
				let t = e.run?.result?.outcome;
				return t === void 0 ? {
					variant: "neutral",
					label: "no result written"
				} : {
					variant: t === "reported" ? "info" : "success",
					label: t
				};
			});
			return ne(() => e.expanded, (e) => {
				e || (Oe.value = !1, je.value = !1);
			}), (t, a) => (h(), o(_(ae), {
				class: "@container border-t border-line/60 first:border-t-0",
				density: "compact",
				body: "drawer",
				open: e.expanded,
				"onUpdate:open": a[7] ||= (e) => n("toggle")
			}, {
				lead: v(({ iconClass: t }) => [f(_(oe), {
					name: e.verdict.chore.icon,
					class: m(["shrink-0 text-muted", t])
				}, null, 8, ["name", "class"])]),
				title: v(() => [l("span", FM, [l("span", IM, [l("span", LM, g(e.verdict.chore.title), 1), e.showRepo ? (h(), c("span", RM, g(_(at)(e.verdict.repo)), 1)) : s("", !0)]), l("span", zM, [l("span", BM, g(e.verdict.headline), 1), Ee.value ? (h(), c("span", VM, g(Ee.value), 1)) : s("", !0)])])]),
				meta: v(() => [
					Se.value || se.value ? (h(), o(_(oe), {
						key: 0,
						name: "spinner",
						spin: "",
						class: "shrink-0 text-subtle"
					})) : s("", !0),
					b.value ? (h(), c("span", {
						key: 1,
						title: we.value,
						class: "ui-status-pill flex shrink-0 items-center gap-1 border border-line/60 text-2xs text-subtle"
					}, [
						f(_(oe), {
							name: "check-circle",
							class: "text-2xs"
						}),
						l("span", UM, g(b.value.outcome), 1),
						l("span", WM, g(_(he)(b.value.ranAt)), 1)
					], 8, HM)) : s("", !0),
					Te.value ? (h(), o(_(me), {
						key: 2,
						variant: Te.value.variant,
						label: Te.value.label,
						size: "xs",
						class: "shrink-0"
					}, null, 8, ["variant", "label"])) : s("", !0)
				]),
				below: v(() => [l("div", GM, [
					se.value ? (h(), c("div", KM, [f(_(oe), {
						name: "spinner",
						spin: "",
						class: "mt-0.5 shrink-0 text-xs text-info"
					}), l("span", qM, [l("span", JM, [l("span", YM, "Measuring " + g(ue.value) + "…", 1), l("span", XM, g(le.value), 1)]), a[8] ||= l("span", { class: "text-2xs text-subtle/70" }, "The figures below are the ones being replaced.", -1)])])) : y.value ? (h(), c("div", ZM, [f(_(oe), {
						name: "check-circle",
						class: "mt-0.5 shrink-0 text-xs text-success"
					}), l("span", QM, [l("span", $M, "Re-measured just now." + g(y.value.from === y.value.to ? " Nothing changed." : ""), 1), y.value.from === y.value.to ? (h(), c("span", eN, g(y.value.to), 1)) : (h(), c("span", tN, [l("span", nN, g(y.value.from), 1), l("span", rN, [f(_(oe), {
						name: "arrow-right",
						class: "text-2xs text-subtle"
					}), d(" " + g(y.value.to), 1)])]))])])) : s("", !0),
					ke.value.length > 0 ? (h(), c("ul", iN, [(h(!0), c(i, null, te(ke.value, (e) => (h(), c("li", {
						key: e.key,
						class: "contents"
					}, [l("span", aN, g(e.tag), 1), l("span", oN, g(e.claim), 1)]))), 128))])) : s("", !0),
					De.value.length > mN ? (h(), c("button", {
						key: 3,
						type: "button",
						class: m(_(ve).linkButton("mt-1.5 text-2xs text-subtle hover:text-content")),
						onClick: a[0] ||= (e) => Oe.value = !Oe.value
					}, g(Oe.value ? "Show fewer" : `Show all ${De.value.length}`), 3)) : s("", !0),
					l("p", sN, [
						d(g(e.verdict.chore.description) + " ", 1),
						l("span", cN, g(e.verdict.state === "due" ? "Shown because" : "Shows when") + ":", 1),
						d(" " + g(e.verdict.chore.criterion), 1)
					]),
					e.run ? (h(), c("div", lN, [
						l("div", uN, [
							f(_(me), {
								variant: Ne.value.variant,
								label: Ne.value.label,
								size: "xs"
							}, null, 8, ["variant", "label"]),
							l("span", null, g(_(_e)(e.run.manifest.createdAt)), 1),
							l("button", {
								type: "button",
								class: "cursor-pointer underline hover:text-content",
								onClick: a[1] ||= (t) => n("open", e.run.manifest.conversationId)
							}, " open the transcript ")
						]),
						e.run.result?.summary ? (h(), c("p", {
							key: 0,
							class: m(["text-xs leading-relaxed text-content", je.value ? void 0 : "line-clamp-3"])
						}, [(h(!0), c(i, null, te(Ae.value, (e, t) => (h(), c(i, { key: t }, [e.code ? (h(), c("code", dN, g(e.text), 1)) : (h(), c(i, { key: 1 }, [d(g(e.text), 1)], 64))], 64))), 128))], 2)) : s("", !0),
						Me.value ? (h(), c("button", {
							key: 1,
							type: "button",
							class: m(_(ve).linkButton("w-fit text-2xs text-subtle hover:text-content")),
							onClick: a[2] ||= (e) => je.value = !je.value
						}, g(je.value ? "Show less" : "Show more"), 3)) : s("", !0)
					])) : s("", !0),
					S.value ? (h(), c("p", fN, g(S.value), 1)) : s("", !0),
					l("div", pN, [
						e.verdict.prompt !== void 0 && e.verdict.state !== "clear" ? (h(), o(_(re), {
							key: 0,
							label: Ce.value ? "Run it again" : e.verdict.chore.stance === "act" ? "Fix it" : "Look into it",
							icon: "play",
							picker: _(r),
							disabled: e.busy || se.value || Se.value !== void 0,
							onRun: u
						}, null, 8, [
							"label",
							"picker",
							"disabled"
						])) : s("", !0),
						e.verdict.chore.needs.length > 0 ? (h(), o(_(ie), {
							key: 1,
							size: "small",
							severity: "secondary",
							label: se.value ? "Measuring…" : pe.value,
							title: ge.value,
							disabled: e.busy || se.value,
							onClick: a[3] ||= (e) => n("remeasure")
						}, {
							icon: v(() => [f(_(oe), {
								name: se.value ? "spinner" : "refresh",
								spin: se.value
							}, null, 8, ["name", "spin"])]),
							_: 1
						}, 8, [
							"label",
							"title",
							"disabled"
						])) : s("", !0),
						Se.value ? (h(), o(_(ie), {
							key: 2,
							size: "small",
							severity: "secondary",
							text: "",
							label: "Watch it",
							onClick: a[4] ||= (e) => n("open", Se.value)
						})) : s("", !0),
						e.verdict.state === "due" ? (h(), o(_(ie), {
							key: 3,
							size: "small",
							severity: "secondary",
							text: "",
							label: "Not now",
							title: "Keep it listed, keep it out of the rail, for a month",
							onClick: a[5] ||= (e) => n("snooze")
						})) : s("", !0),
						e.verdict.state === "snoozed" ? (h(), o(_(ie), {
							key: 4,
							size: "small",
							severity: "secondary",
							text: "",
							label: "Un-snooze",
							onClick: a[6] ||= (e) => n("unsnooze")
						})) : s("", !0)
					])
				])]),
				_: 1
			}, 8, ["open"]));
		}
	});
})), vN, yN = b((() => {
	_N(), _N(), vN = gN;
})), bN, xN, SN, CN, wN, TN = b((() => {
	bN = {
		class: "flex flex-col gap-6",
		role: "status",
		"aria-busy": "true",
		"aria-label": "Reading the evidence"
	}, xN = { class: "flex h-4 items-center gap-x-2" }, SN = { class: "flex h-5 items-center gap-3" }, CN = { class: "min-w-0 flex-1" }, wN = /*@__PURE__*/ p({
		__name: "MaintenanceSkeleton",
		setup(e) {
			let t = [{
				caption: "w-96",
				rows: [{
					title: "w-40",
					headline: "w-64",
					badge: "w-14"
				}, {
					title: "w-32",
					headline: "w-44",
					badge: "w-9"
				}]
			}, {
				caption: "w-72",
				rows: [{
					title: "w-36",
					headline: "w-80",
					badge: "w-14"
				}, {
					title: "w-52",
					headline: "w-52",
					badge: "w-16"
				}]
			}];
			return (e, n) => (h(), c("div", bN, [(h(), c(i, null, te(t, (e, t) => f(_(de), { key: t }, {
				label: v(() => [l("span", xN, [
					n[0] ||= l("span", { class: "skeleton h-3 w-20" }, null, -1),
					n[1] ||= l("span", { class: "skeleton h-3 w-2" }, null, -1),
					l("span", { class: m(["skeleton h-3 max-w-2/5", e.caption]) }, null, 2)
				])]),
				default: v(() => [(h(!0), c(i, null, te(e.rows, (e, t) => (h(), c("div", {
					key: t,
					class: "border-t border-line/60 px-4 py-2.5 first:border-t-0"
				}, [l("div", SN, [
					n[2] ||= l("span", { class: "skeleton h-3 w-3 shrink-0" }, null, -1),
					n[3] ||= l("span", { class: "skeleton h-4 w-4 shrink-0" }, null, -1),
					l("span", { class: m(["skeleton h-3.5 shrink-0", e.title]) }, null, 2),
					l("div", CN, [l("span", { class: m(["skeleton block h-3 max-w-full", e.headline]) }, null, 2)]),
					l("span", { class: m(["skeleton h-5 shrink-0 rounded-full", e.badge]) }, null, 2)
				])]))), 128))]),
				_: 2
			}, 1024)), 64))]));
		}
	});
})), EN, DN = b((() => {
	TN(), TN(), EN = wN;
})), ON, kN, AN, jN, MN, NN, PN, FN, IN = b((() => {
	qn(), ON = {
		key: 0,
		class: "border-t border-line/60 pt-3"
	}, kN = ["aria-expanded"], AN = {
		key: 0,
		class: "@container flex flex-col gap-2 pt-1.5 pl-4"
	}, jN = { class: "text-2xs text-content" }, MN = { class: "mt-1 grid grid-cols-1 gap-x-4 gap-y-0.5 @md:grid-cols-facts" }, NN = { class: "text-2xs text-subtle" }, PN = { class: "text-2xs text-subtle/70" }, FN = /*@__PURE__*/ p({
		__name: "ScopeNote",
		props: {
			probes: {},
			inapplicable: {}
		},
		setup(e) {
			let t = ee(!1), n = (e) => {
				let t = /* @__PURE__ */ new Map();
				for (let { cause: n, name: r } of e) t.set(n, [...t.get(n) ?? [], r]);
				return [...t].map(([e, t]) => ({
					cause: e,
					names: t
				}));
			}, r = (t) => n(e.probes.flatMap((e) => e.state === t ? [{
				cause: e.reason ?? "not available in this repository",
				name: Fn(e.id).title.toLowerCase()
			}] : [])), o = a(() => r("unavailable")), u = a(() => r("failed")), d = a(() => n(e.inapplicable.map((e) => ({
				cause: e.headline,
				name: e.chore.title.toLowerCase()
			})))), p = (e) => e.reduce((e, t) => e + t.names.length, 0), ne = (e, t, n) => `${e} ${e === 1 ? t : n}`, v = a(() => [
				e.inapplicable.length === 0 ? void 0 : `${ne(e.inapplicable.length, "chore does", "chores do")} not apply here`,
				p(o.value) === 0 ? void 0 : `${ne(p(o.value), "measurement", "measurements")} unavailable`,
				p(u.value) === 0 ? void 0 : `${ne(p(u.value), "measurement", "measurements")} failed`
			].filter((e) => e !== void 0).join(" · ")), re = a(() => [
				{
					label: "Not applicable",
					groups: d.value
				},
				{
					label: "Not measured",
					groups: o.value
				},
				{
					label: "Measurement failed",
					groups: u.value
				}
			].filter((e) => e.groups.length > 0));
			return (e, n) => v.value === "" ? s("", !0) : (h(), c("div", ON, [l("button", {
				type: "button",
				class: m(_(ve).textAction("text-2xs text-subtle")),
				"aria-expanded": t.value,
				onClick: n[0] ||= (e) => t.value = !t.value
			}, [f(_(oe), {
				name: t.value ? "chevron-down" : "chevron-right",
				class: "text-2xs"
			}, null, 8, ["name"]), l("span", null, g(v.value), 1)], 10, kN), t.value ? (h(), c("div", AN, [(h(!0), c(i, null, te(re.value, (e) => (h(), c("div", { key: e.label }, [l("p", jN, g(e.label), 1), l("dl", MN, [(h(!0), c(i, null, te(e.groups, (e) => (h(), c(i, { key: e.cause }, [l("dt", NN, g(e.cause), 1), l("dd", PN, g(e.names.join(" · ")), 1)], 64))), 128))])]))), 128))])) : s("", !0)]));
		}
	});
})), LN, RN = b((() => {
	IN(), IN(), LN = FN;
}));
//#endregion
//#region src/useChores.ts
function zN() {
	let e = Jj(), t = y(), n = a(() => e.sandbox.key("maintenance-report")), r = ee(/* @__PURE__ */ new Map()), i = xe({
		queryKey: n,
		enabled: a(() => e.sandbox.reachable()),
		refetchInterval: (e) => r.value.size > 0 || (e.state.data?.running ?? []).length > 0 ? VN : BN,
		queryFn: () => TM().queryFn()
	}), o = a(() => {
		let e = i.data.value?.running ?? [], t = new Set(e.map((e) => UN(e.repo, e.id))), n = [...r.value].flatMap(([e, n]) => {
			let [r, i] = e.split("|");
			return t.has(e) || r === void 0 || i === void 0 ? [] : [{
				repo: r,
				id: i,
				askedAt: n
			}];
		});
		return [...e, ...n];
	}), s = () => {
		let e = i.data.value, t = new Set((e?.running ?? []).map((e) => UN(e.repo, e.id))), n = Date.now(), a = [...r.value].filter(([r, i]) => {
			if (t.has(r)) return !1;
			let [a, o] = r.split("|");
			return (e?.repos.find((e) => e.repo === a)?.probes.find((e) => e.id === o)?.ranAt ?? 0) < i && n - i < HN;
		});
		a.length !== r.value.size && (r.value = new Map(a));
	}, c = a(() => i.data.value === void 0 ? [] : Wn(i.data.value, Date.now())), l = a(() => (i.data.value?.repos ?? []).map(({ repo: e }) => ({
		repo: e,
		verdicts: qt.flatMap((t) => c.value.filter((n) => n.repo === e && n.chore.id === t.id)),
		probes: i.data.value?.repos.find((t) => t.repo === e)?.probes ?? []
	})));
	return ne(() => i.dataUpdatedAt.value, s, { immediate: !0 }), {
		report: a(() => i.data.value),
		verdicts: c,
		byRepo: l,
		measuring: o,
		error: a(() => i.error.value?.message),
		isPending: i.isPending,
		refresh: async () => {
			await t.invalidateQueries({ queryKey: n.value });
		},
		refreshProbe: async (i, a) => {
			let o = UN(i, a);
			r.value = new Map([...r.value, [o, Date.now()]]);
			try {
				await e.sandbox.json("/chores/probe", {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						repo: i,
						id: a
					})
				});
			} catch (e) {
				throw r.value = new Map([...r.value].filter(([e]) => e !== o)), e;
			}
			await t.invalidateQueries({ queryKey: n.value });
		},
		snooze: async (r, i) => {
			await e.sandbox.json("/chores/ledger", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					repo: r.repo,
					chore: r.chore.id,
					ranAt: r.lastRun?.ranAt ?? 0,
					runId: r.lastRun?.runId ?? "",
					outcome: r.lastRun?.outcome ?? "reported",
					digest: r.digest,
					snoozedUntil: i
				})
			}), await t.invalidateQueries({ queryKey: n.value });
		}
	};
}
var BN, VN, HN, UN, WN = b((() => {
	qn(), OM(), Yj(), BN = 3e5, VN = 2e3, HN = 15e3, UN = (e, t) => `${e}|${t}`;
}));
//#endregion
//#region src/useRuns.ts
function GN() {
	let e = Jj(), t = y(), n = a(() => e.sandbox.key("maintenance-runs")), r = a(() => e.sandbox.key("maintenance-runs", "agents")), i = xe({
		queryKey: n,
		enabled: a(() => e.sandbox.reachable()),
		queryFn: () => DM().queryFn()
	}), o = xe({
		queryKey: r,
		enabled: a(() => e.sandbox.reachable() && (i.data.value ?? []).length > 0),
		queryFn: async () => Av.parse(await e.sandbox.json("/agents")).agents.filter((e) => e.id.startsWith(pM)),
		refetchInterval: (e) => (e.state.data ?? []).some((e) => e.status === "running" || e.status === "awaiting") ? KN : !1
	}), s = a(() => new Map((o.data.value ?? []).map((e) => [e.id, e]))), c = a(() => (i.data.value ?? []).map(({ manifest: e, result: t }) => {
		let n = s.value.get(e.conversationId);
		return {
			manifest: e,
			agent: n,
			result: t,
			running: n?.status === "running" || n?.status === "awaiting"
		};
	}));
	return {
		runs: c,
		latestByChore: a(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of c.value) {
				let n = `${t.manifest.repo}|${t.manifest.chore}`;
				e.has(n) || e.set(n, t);
			}
			return e;
		}),
		error: a(() => i.error.value?.message),
		isLoading: i.isLoading,
		start: async (r, i) => {
			if (r.prompt === void 0) throw Error(`ext-maintenance: ${r.chore.id} has nothing to do`);
			let a = Date.now(), o = mM(a), s = {
				runId: o,
				createdAt: a,
				repo: r.repo,
				chore: r.chore.id,
				digest: r.digest,
				conversationId: hM(o),
				headline: r.headline
			};
			return await e.workspace.write(gM(o), JSON.stringify(s, null, 2)), Up.parse(await e.sandbox.json("/agent", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					prompt: `${r.prompt}\n\n${SM(o)}`,
					title: `${r.chore.title}, ${r.repo}`.slice(0, 80),
					conversationId: s.conversationId,
					isolated: !0,
					unattended: !0,
					runRole: "maintenance-chore",
					...i === void 0 ? {} : Vp(i)
				})
			})), await t.invalidateQueries({ queryKey: n.value }), o;
		},
		stop: async (n) => {
			await e.sandbox.json("/agent/stop", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ conversationId: n })
			}), await t.invalidateQueries({ queryKey: r.value });
		},
		promote: async (n) => {
			let r = c.value.filter((e) => e.result !== void 0 && !e.running && !n.has(e.manifest.runId));
			r.length !== 0 && (await Promise.all(r.map(async (t) => e.sandbox.json("/chores/ledger", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					repo: t.manifest.repo,
					chore: t.manifest.chore,
					ranAt: t.manifest.createdAt,
					runId: t.manifest.runId,
					outcome: t.result?.outcome,
					digest: t.manifest.digest
				})
			}))), await t.invalidateQueries({ queryKey: e.sandbox.key("maintenance-report") }));
		}
	};
}
var KN, qN = b((() => {
	Kj(), OM(), Yj(), CM(), KN = 4e3;
})), JN, YN, XN, ZN, QN = b((() => {
	LA(), qn(), PM(), yN(), Yj(), DN(), CM(), RN(), WN(), qN(), JN = { class: "flex flex-col gap-6" }, YN = {
		key: 1,
		class: "flex flex-col items-start gap-2 py-10"
	}, XN = 2592e6, ZN = /*@__PURE__*/ p({
		__name: "MaintenanceView",
		props: { repo: {} },
		setup(e) {
			let t = Jj(), { byRepo: n, error: r, isPending: p, measuring: m, refresh: re, refreshProbe: ae, snooze: oe } = zN(), me = a(() => n.value.filter((e) => t.workspace.inProject(e.repo))), he = a(() => n.value.length - me.value.length), { latestByChore: _e, start: ve, promote: ye } = GN(), be = ee("attention"), xe = ee(), y = ee(!1), Se = ee(), b = a(() => t.route.query()), Ce = a({
				get: () => e.repo ?? b.value.repo,
				set: (e) => t.route.setQuery({ repo: e })
			}), x = (e) => `${e.repo}|${e.chore.id}`, we = (e) => e > 0 ? "text-warning" : "", Te = (e, t) => t === 0 ? `${e} due` : `${e} due · ${t} a risk being carried right now`, Ee = (e) => e.state === "due" && !Hn(e), S = a(() => me.value.map(({ repo: e, verdicts: t }) => ({
				repo: e,
				due: t.filter((e) => Ee(e)).length,
				carrying: t.filter((e) => Ee(e) && e.severity === "warning").length
			}))), De = a(() => [{
				key: "repos",
				rows: S.value.map((e) => ({
					value: e.repo,
					label: at(e.repo),
					icon: "folder",
					meta: String(e.due),
					tone: we(e.carrying),
					tooltip: Te(e.due, e.carrying)
				}))
			}]), Oe = a(() => {
				let e = S.value.reduce((e, t) => e + t.due, 0), t = S.value.reduce((e, t) => e + t.carrying, 0);
				return {
					icon: "wrench",
					meta: String(e),
					tone: we(t),
					tooltip: Te(e, t)
				};
			}), ke = a(() => e.repo === void 0), Ae = a(() => Ce.value === void 0 ? me.value : me.value.filter((e) => e.repo === Ce.value)), je = (e) => e.state !== "not-applicable" && (be.value === "all" || e.state === "due" || e.state === "snoozed" || e.state === "stale"), Me = a(() => qt.flatMap((e) => Ae.value.flatMap((t) => t.verdicts.filter((t) => t.chore.id === e.id && je(t))))), Ne = a(() => Wt.flatMap((e) => {
				let t = Me.value.filter((t) => t.chore.kind === e.kind);
				return t.length === 0 ? [] : [{
					kind: e.kind,
					label: e.label,
					caption: e.caption,
					rows: [...t].sort((e, t) => Number(Hn(e)) - Number(Hn(t))),
					due: t.filter((e) => Ee(e)).length
				}];
			})), Pe = a(() => Ae.value.length === 1 ? Ae.value[0] : void 0), Fe = a(() => Ae.value.length > 1), Ie = a(() => Ae.value.flatMap((e) => e.verdicts).filter((e) => Ee(e)).length);
			ne(Me, (e) => {
				NM(e);
			}, { immediate: !0 });
			let Le = a(() => new Set(me.value.flatMap((e) => e.verdicts).flatMap((e) => e.lastRun === void 0 ? [] : [e.lastRun.runId])));
			ne([_e, Le], () => {
				ye(Le.value);
			}, { immediate: !0 });
			let Re = async (e, t) => {
				y.value = !0, Se.value = void 0;
				try {
					await t();
				} catch (t) {
					Se.value = `Could not ${e}: ${IA(t)}`;
				} finally {
					y.value = !1;
				}
			}, ze = (e) => {
				Re("ask for that measurement", async () => {
					await Promise.all(e.chore.needs.map((t) => ae(e.repo, t)));
				});
			}, Be = (e, n) => {
				Re("start that turn", async () => {
					t.chat.openSession(hM(await ve(e, n)));
				});
			};
			return (e, n) => (h(), o(_(pe), {
				title: "Maintenance",
				scroll: "page",
				"scroll-key": `${Ce.value ?? ""}/${be.value}`
			}, u({
				actions: v(() => [
					f(_(le), {
						project: _(t).workspace.project(),
						hidden: he.value,
						noun: "repositories",
						onClear: n[0] ||= (e) => _(t).workspace.setProject(void 0)
					}, null, 8, ["project", "hidden"]),
					f(_(fe), {
						modelValue: be.value,
						"onUpdate:modelValue": n[1] ||= (e) => be.value = e,
						size: "xs",
						options: [{
							label: "Needs attention",
							value: "attention",
							badge: Ie.value,
							title: "Chores that are due or snoozed"
						}, {
							label: "Everything",
							value: "all",
							title: "Every chore in the book, including the clear and the unmeasured"
						}]
					}, null, 8, ["modelValue", "options"]),
					f(_(ce), {
						quiet: "",
						icon: "refresh",
						label: "Reload",
						hint: "Re-read the latest results: to measure again, open a chore",
						disabled: y.value,
						onClick: _(re)
					}, null, 8, ["disabled", "onClick"])
				]),
				detail: v(() => [l("div", JN, [_(p) ? (h(), o(EN, { key: 0 })) : Ne.value.length === 0 ? (h(), c("div", YN, [
					n[5] ||= l("p", { class: "text-sm text-content" }, "Nothing needs attention.", -1),
					n[6] ||= l("p", { class: "max-w-read-sm text-xs text-subtle" }, " Every chore in the book is either clear or waiting on a measurement. Switch to Everything to see what was checked, when, and what could not be measured at all. ", -1),
					f(_(ie), {
						size: "small",
						severity: "secondary",
						text: "",
						label: "Show everything",
						onClick: n[3] ||= (e) => be.value = "all"
					})
				])) : (h(!0), c(i, { key: 2 }, te(Ne.value, (e) => (h(), o(_(de), {
					key: e.kind,
					label: e.label,
					count: e.due === 0 ? void 0 : e.due,
					caption: e.caption
				}, {
					default: v(() => [(h(!0), c(i, null, te(e.rows, (e) => (h(), o(vN, {
						key: x(e),
						verdict: e,
						run: _(_e).get(x(e)),
						measuring: _(m),
						expanded: xe.value === x(e),
						"show-repo": Fe.value,
						busy: y.value,
						onToggle: (t) => xe.value = xe.value === x(e) ? void 0 : x(e),
						onStart: (t) => Be(e, t),
						onRemeasure: (t) => ze(e),
						onSnooze: (t) => void Re("snooze that chore", () => _(oe)(e, Date.now() + XN)),
						onUnsnooze: (t) => void Re("un-snooze that chore", () => _(oe)(e, 0)),
						onOpen: n[4] ||= (e) => _(t).chat.openSession(e)
					}, null, 8, [
						"verdict",
						"run",
						"measuring",
						"expanded",
						"show-repo",
						"busy",
						"onToggle",
						"onStart",
						"onRemeasure",
						"onSnooze",
						"onUnsnooze"
					]))), 128))]),
					_: 2
				}, 1032, [
					"label",
					"count",
					"caption"
				]))), 128)), Pe.value ? (h(), o(LN, {
					key: 3,
					probes: Pe.value.probes,
					inapplicable: Pe.value.verdicts.filter((e) => e.state === "not-applicable")
				}, null, 8, ["probes", "inapplicable"])) : s("", !0)])]),
				_: 2
			}, [Se.value || _(r) ? {
				name: "strips",
				fn: v(() => [Se.value ? (h(), o(_(se), {
					key: 0,
					tone: "warning"
				}, {
					default: v(() => [d(g(Se.value), 1)]),
					_: 1
				})) : s("", !0), _(r) ? (h(), o(_(se), {
					key: 1,
					of: _(ge)(_(r))
				}, null, 8, ["of"])) : s("", !0)]),
				key: "0"
			} : void 0, ke.value ? {
				name: "rail",
				fn: v(() => [f(_(ue), {
					modelValue: Ce.value,
					"onUpdate:modelValue": n[2] ||= (e) => Ce.value = e,
					groups: De.value,
					all: Oe.value,
					memory: "maintenance.repo"
				}, null, 8, [
					"modelValue",
					"groups",
					"all"
				])]),
				key: "1"
			} : void 0]), 1032, ["scroll-key"]));
		}
	});
})), $N = /* @__PURE__ */ Ce({ default: () => eP }), eP, tP = b((() => {
	QN(), QN(), eP = ZN;
}));
PM(), OM(), Yj();
var nP = (e, t) => {
	qj(e), t.subscriptions.push(jM()), t.subscriptions.push(e.views.register({
		id: "maintenance",
		label: "Maintenance",
		surface: "rail",
		detect: (e) => e.length === 0 ? [] : [{
			key: "maintenance",
			title: "Maintenance",
			icon: "wrench"
		}],
		badge: MM,
		warm: () => [TM(), DM()],
		view: async () => (await Promise.resolve().then(() => (tP(), $N))).default
	})), t.subscriptions.push(e.views.register({
		id: "maintenance-repo",
		label: "Maintenance",
		surface: "directory",
		auxiliary: !0,
		detect: (e) => e.map((e) => ({
			key: e.repo,
			title: "Maintenance",
			icon: "wrench",
			repo: e.repo
		})),
		view: async () => (await Promise.resolve().then(() => (tP(), $N))).default
	}));
}, rP = r.parse({
	$schema: "https://intentic.dev/intentic-extension.schema.json",
	publisher: "intentic",
	name: "maintenance",
	version: "1.0.0",
	category: "work",
	icon: "wrench",
	engines: { intentic: "^2.0.0" },
	entry: "dist/extension.js",
	permissions: { sandbox: [
		"GET /chores",
		"POST /chores/probe",
		"POST /chores/ledger",
		"GET /workspace/children",
		"GET /workspace/file",
		"POST /workspace/upload",
		"GET /panels",
		"POST /agent",
		"POST /agent/stop",
		"GET /agents"
	] },
	contributes: {
		views: [{
			id: "maintenance",
			label: "Maintenance",
			surface: "rail",
			badge: !0
		}, {
			id: "maintenance-repo",
			label: "Maintenance",
			surface: "directory"
		}],
		files: [{
			path: ".intentic/records/chores/",
			invalidates: ["maintenance-report", "maintenance-runs"]
		}]
	}
});
//#endregion
export { nP as activate, rP as manifest };
