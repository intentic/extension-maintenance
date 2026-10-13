import { hostSlot as e, sandboxLedger as t, sandboxPoll as n } from "@intentic/extension-api";
import { Fragment as r, computed as i, createBlock as a, createCommentVNode as o, createElementBlock as s, createElementVNode as c, createSlots as l, createTextVNode as u, createVNode as d, defineComponent as f, normalizeClass as p, openBlock as m, ref as ee, renderList as te, toDisplayString as h, unref as g, watch as ne, withCtx as _, withDirectives as re } from "vue";
import { AgentRunButton as ie, Button as ae, DisclosureRow as oe, Icon as se, Notice as ce, PageAction as le, ProjectChip as ue, RepoPicker as de, RowGroup as fe, SegmentedControl as pe, SkeletonSnapshot as me, SplitView as he, StatusBadge as ge, freshness as _e, noticeOf as ve, timeAgo as ye, ui as be, useAgentRunPick as xe, useNow as Se, vSkeletonSource as Ce } from "@intentic/extension-ui";
import { useQuery as we, useQueryClient as Te } from "@tanstack/vue-query";
//#region \0rolldown/runtime.js
var Ee = Object.defineProperty, v = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, De = (e, t) => {
	let n = {};
	for (var r in e) Ee(n, r, {
		get: e[r],
		enumerable: !0
	});
	return t || Ee(n, Symbol.toStringTag, { value: "Module" }), n;
}, y, Oe = v((() => {
	y = (e, t, n) => `${e} ${e === 1 ? t : n ?? (/(s|x|z|ch|sh)$/.test(t) ? `${t}es` : `${t}s`)}`;
})), ke, Ae, b, je, Me = v((() => {
	ke = 2166136261, Ae = 16777619, b = (...e) => {
		let t = e.join("\0"), n = ke;
		for (let e = 0; e < t.length; e++) n = ((n ^ t.charCodeAt(e)) >>> 0) * Ae, n >>>= 0;
		return n.toString(36).padStart(7, "0");
	}, je = (e) => e <= 0 ? -1 : Math.floor(Math.log2(e));
})), Ne, Pe, Fe, Ie, Le = v((() => {
	Ne = ({ subject: e, why: t, diagnosis: n, goal: r, invariants: i, done: a }) => [
		e,
		`Why: ${t} ${n}`,
		r,
		`${i} ${a}`
	].join("\n\n"), Pe = "The measurement woke you; it did not decide anything. Read the repository before you touch it, and treat every finding as a claim to verify rather than a task to execute. If a finding is wrong, say why in one line and leave it. A run that verifies ten and fixes two is a good run.", Fe = "Keep it mechanical and separately explainable: nothing lands that you could not justify on its own line of the summary. Do not reformat, rename or \"while I was in here\" anything the finding did not name. Run the repository's own type-check and tests before you finish, and if you cannot make them pass, leave the change out and say so.", Ie = "Change nothing. This is a survey: the output is your findings, cited file:line, and a recommendation the owner can act on or dismiss. Where you would propose an edit, describe it and where it would go instead of making it.";
})), Re, ze, Be, Ve, He, Ue, We, Ge, Ke, qe, Je, Ye, Xe, Ze, Qe, $e, et = v((() => {
	Re = [
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
	], ze = ["tailwindcss"], Be = (e) => Re.filter((t) => t.packages.some((t) => e.includes(t))), Ve = (e) => ze.some((t) => e.includes(t)), He = [
		"!**/node_modules/**",
		"!**/dist/**",
		"!**/build/**",
		"!**/.next/**",
		"!**/out/**",
		"!**/coverage/**",
		"!**/vendor/**",
		"!**/generated/**",
		"!**/*.{test,spec,stories}.*"
	], Ue = [
		"*.vue",
		"*.tsx",
		"*.jsx",
		"*.component.ts"
	], We = [
		"*.vue",
		"*.tsx",
		"*.jsx",
		"*.html",
		"*.svelte",
		"*.astro"
	], Ge = "-\\[(#[0-9a-fA-F]{3,8}|(rgb|hsl)a?\\(|[0-9]+(\\.[0-9]+)?px)", Ke = [
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
	], qe = (e) => Ke.find((t) => t.id === e), Je = (e) => e.replace(/^\.\//, ""), Ye = 3, Xe = /^(base|the)/, Ze = /(v[0-9]+|new|old|legacy|copy|component|[0-9]+)$/, Qe = /* @__PURE__ */ new Set([
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
	]), $e = (e) => {
		let t = ((Je(e).split("/").pop() ?? "").split(".")[0] ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
		if (t === "" || Qe.has(t)) return;
		let n = t.replace(Ze, ""), r = (n.length >= Ye ? n : t).replace(Xe, "");
		return r.length >= Ye ? r : t;
	};
})), tt, nt, rt, it = v((() => {
	tt = "INTENTIC_WORKSPACE_ROOT_EXCLUDE", nt = `\${${tt}:+--glob=!/\${${tt}}/**}`, rt = `\${${tt}:+--ignore=\${${tt}}/**}`;
})), x, at, ot, st, ct, S, lt, ut, dt, ft, pt, mt, ht, gt, _t, vt, yt, bt, xt, St, Ct, wt, Tt, Et, Dt, Ot, kt, At, jt, Mt, Nt, Pt, Ft, It, Lt, Rt, zt, Bt, Vt, Ht, Ut, Wt, Gt, Kt, qt, Jt, Yt, Xt, Zt, Qt, $t = v((() => {
	Oe(), Me(), Le(), et(), it(), x = 864e5, at = "/tmp/intentic-chore-audit.json", ot = "/tmp/intentic-chore-knip.json", st = "/tmp/intentic-chore-jscpd", ct = `${st}/jscpd-report.json`, S = (e) => e === "root" || e === "" ? "the workspace root repository" : e, lt = (e) => e === "root" || e === "" ? "workspace root" : e, ut = (e) => `${e.kind} · ${e.name} ${e.current} → ${e.latest}`, dt = (e, t) => {
		let n = e.probes.get(t);
		if (n?.state === "ok" && n.facts !== void 0 && n.facts.id === t) return n.facts;
	}, ft = /* @__PURE__ */ new Set(["critical", "high"]), pt = {
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
			guard: `pnpm audit --json > ${at} 2>/dev/null; [ "$(jq '(.metadata.vulnerabilities.high // 0) + (.metadata.vulnerabilities.critical // 0)' ${at} 2>/dev/null || echo 0)" -gt 0 ]`,
			note: "nightly · high + critical only",
			report: at,
			woke: `pnpm audit's report for this workspace is in ${at} (JSON), and it woke you because it carries a high or critical advisory.`
		},
		assess: (e) => {
			let t = dt(e, "audit");
			if (t === void 0) return;
			let n = t.advisories.filter((e) => ft.has(e.severity));
			if (n.length === 0) return;
			let r = n.filter((e) => !e.dev), i = n.filter((e) => e.patched !== void 0);
			return {
				headline: `${y(n.length, "advisory", "advisories")}, ${i.length} with a published fix`,
				detail: n.toSorted((e, t) => e.name.localeCompare(t.name)).map((e) => `${e.severity} · ${e.name}, ${e.title}${e.patched === void 0 ? " (no patch yet)" : ""}`),
				digest: b(...n.map((e) => `${e.name}@${e.severity}`).toSorted()),
				severity: r.length > 0 ? "warning" : "info",
				why: `pnpm audit reports ${y(n.length, "high or critical advisory", "high or critical advisories")} against ${S(e.repo)}, ${r.length} reaching a production dependency path, ${i.length} with a published patched range: ${n.map((e) => `${e.name} (${e.severity}${e.dev ? ", dev-only" : ""}${e.patched === void 0 ? ", no patch" : `, fixed in ${e.patched}`})`).join("; ")}.`
			};
		},
		diagnosis: "An advisory with a published fix is a version bump someone has to actually make; one without is a risk to decide about.",
		goal: "For each advisory, establish whether this workspace reaches the vulnerable code path at all: a transitive dependency of a build-time tool is a different problem from one in a running service. Where the fix is a version bump the lockfile can absorb, make it. Where it needs a real upgrade or has no patch published, leave it and say what it would take. Never rewrite application code to route around a CVE.",
		done: "Done when `pnpm audit` reports fewer high/critical advisories than it did, and the repository's type-check and tests pass."
	}, mt = 20, ht = {
		id: "dependencies-outdated",
		title: "Update dependencies",
		icon: "arrow-circle-up",
		description: "How far behind the registry this tree has drifted, and which majors are waiting.",
		kind: "accruing",
		criterion: "A dependency is a major version behind, or more than 20 are behind by any amount.",
		applies: (e) => e.shape.packageManifest ? void 0 : "no package.json",
		stance: "act",
		needs: ["outdated"],
		cadenceMs: 30 * x,
		assess: (e) => {
			let t = dt(e, "outdated");
			if (t === void 0) return;
			let n = t.packages.filter((e) => e.kind === "major");
			if (!(n.length === 0 && t.packages.length < mt)) return {
				headline: n.length === 0 ? `${y(t.packages.length, "package")} behind` : `${y(n.length, "major")} waiting, ${t.packages.length} behind in total`,
				detail: n.toSorted((e, t) => e.name.localeCompare(t.name)).map(ut),
				digest: b(...n.map((e) => `${e.name}@${e.latest}`).toSorted(), `total:${je(t.packages.length)}`),
				severity: "info",
				why: `pnpm outdated reports ${y(t.packages.length, "dependency", "dependencies")} behind the registry in ${S(e.repo)}, ${n.length} of them by a major version${n.length === 0 ? "" : `: ${n.map((e) => `${e.name} ${e.current} → ${e.latest}`).join("; ")}`}.`
			};
		},
		diagnosis: "Version drift is cheap to fix continuously and expensive to fix in one go, because the majors start depending on each other.",
		goal: "Take the patch and minor upgrades in one pass: those are what the lockfile can absorb without argument. Then take the majors ONE AT A TIME, reading each one's changelog for breaking changes before you touch anything, and stop at the first one that needs more than a mechanical fix: leave it, and say what it would take. Do not batch majors; a failing test after eight of them is a bisect nobody wanted.",
		done: "Done when the repository's type-check and tests pass, and your summary names every major you took and every one you left, with the reason."
	}, gt = {
		id: "dead-code",
		title: "Clear out dead code",
		icon: "trash",
		description: "Files, exports and dependencies nothing in this repository references any more.",
		kind: "accruing",
		criterion: "knip reports at least one unreferenced file, export or dependency.",
		applies: (e) => e.shape.packageManifest ? void 0 : "no package.json",
		stance: "act",
		needs: ["knip"],
		cadenceMs: 14 * x,
		automation: {
			cron: "0 3 * * *",
			guard: `pnpm exec knip --version >/dev/null 2>&1 || { echo "knip is not a devDependency of this repo"; exit 1; }; pnpm exec knip --reporter json > ${ot} && { echo "no dead code"; exit 1; }`,
			note: "nightly · wakes only on findings",
			report: ot,
			woke: `knip's findings for this workspace are in ${ot} (JSON), and it woke you because there are some.`
		},
		assess: (e) => {
			let t = dt(e, "knip");
			if (t === void 0) return;
			let { files: n, exports: r, types: i, dependencies: a, devDependencies: o, sample: s } = t.deadCode;
			if (n + r + i + a + o !== 0) return {
				headline: `${y(n, "unreferenced file")}, ${y(r + i, "unused export")}, ${y(a + o, "unused dependency", "unused dependencies")}`,
				detail: s.map((e) => `unreferenced · ${e}`),
				digest: b(...s.toSorted(), `exports:${je(r + i)}`, `deps:${je(a + o)}`),
				severity: "info",
				why: `knip reports ${y(n, "unreferenced file")}, ${r + i} unused exports and ${a + o} unused dependencies in ${S(e.repo)}${s.length === 0 ? "" : `, among them ${s.join(", ")}`}.`
			};
		},
		diagnosis: "Code nothing reaches still has to be read, type-checked and kept compiling by everyone who works nearby.",
		goal: "Re-run knip yourself first: this measurement is hours old and the tree has moved. Then check each finding against how the file is actually used: knip is confidently wrong about anything reachable from OUTSIDE the repository, which means a package's public entry points, files a bundler or framework loads by convention, and types consumed only by a downstream package. Delete what is genuinely unreachable. Leave the false positives and list them in one line each, so the next run's reader knows they were considered rather than missed.",
		done: "Done when knip reports fewer findings, the repository's type-check and tests pass, and nothing you deleted is reachable from another package."
	}, _t = 5, vt = {
		id: "duplication",
		title: "Find duplication worth collapsing",
		icon: "clone",
		description: "Copy-paste that has grown past a fifth of a percent of the tree. Reports only, extracting is a design call.",
		kind: "drifting",
		criterion: "jscpd reports more than 5% of the scanned tree duplicated.",
		stance: "report",
		needs: ["jscpd"],
		cadenceMs: 30 * x,
		automation: {
			cron: "0 3 * * 1",
			guard: `pnpm dlx jscpd ${rt} --reporters json --output ${st} --min-lines 12 --threshold 100 . >/dev/null 2>&1; [ "$(jq '.statistics.total.percentage // 0 | floor' ${ct} 2>/dev/null || echo 0)" -ge ${_t} ]`,
			note: `weekly · wakes above ${_t}% duplication`,
			report: ct,
			woke: `jscpd's clone report for this workspace is in ${ct}, and it woke you because duplication is above ${_t}%.`
		},
		assess: (e) => {
			let t = dt(e, "jscpd");
			if (t === void 0 || t.duplication.percentage < _t) return;
			let { percentage: n, clones: r, top: i } = t.duplication;
			return {
				headline: `${n.toFixed(1)}% of the tree is duplicated, across ${y(r, "clone")}`,
				detail: i.map((e) => `${e.lines} lines · ${e.first} ↔ ${e.second}`),
				digest: b(`pct:${Math.round(n)}`, ...i.map((e) => `${e.first}|${e.second}`).toSorted()),
				severity: "info",
				why: `jscpd reports ${n.toFixed(1)}% duplication across ${y(r, "clone")} in ${S(e.repo)}; the largest are ${i.map((e) => `${e.first} ↔ ${e.second} (${e.lines} lines)`).join("; ")}.`
			};
		},
		diagnosis: "Duplication only costs anything when the copies have to change together, and only some of it does.",
		goal: "Report the clones where the copies genuinely have to change together. For each: cite both file:line ranges, say what the shared concept actually is, and name where the extraction would live. Then say explicitly which of the reported clones you are NOT recommending against: generated files, deliberately repetitive tests, and lookalikes owned by different subsystems, so the next reader knows the list was triaged rather than truncated.",
		done: "Done when every clone in the report has either a named extraction or a one-line reason it should stay."
	}, yt = 60, bt = {
		id: "test-strength",
		title: "Strengthen tests that would not notice a bug",
		icon: "list-check",
		description: "Whether the suite would actually fail if the code broke, which is a different question from whether it passes.",
		kind: "accruing",
		criterion: `Stryker's mutation score for the repo is under ${yt}%.`,
		stance: "act",
		needs: ["mutation"],
		cadenceMs: 7 * x,
		assess: (e) => {
			let t = dt(e, "mutation");
			if (t === void 0 || t.mutation.score >= yt) return;
			let { score: n, killed: r, survived: i, survivors: a } = t.mutation;
			return {
				headline: `${i} injected faults went unnoticed, ${n}% of them caught`,
				detail: a.map((e) => `${e.file}:${e.line} · ${e.mutator} → ${e.replacement} · survived`),
				digest: b(`bucket:${je(100 - n)}`, ...a.map((e) => `${e.file}:${e.line}`).toSorted()),
				severity: "info",
				why: `Stryker caught ${r} of ${r + i} injected faults in ${S(e.repo)} (${n}%), under the ${yt}% floor. Code that can be changed with every test still green: ${a.map((e) => `${e.file}:${e.line} (${e.mutator} → ${e.replacement})`).join("; ")}.`
			};
		},
		diagnosis: "Tests that run the code without checking what it produced pass whether or not the code is right, and no other check in this repository can tell the difference.",
		goal: "Take the survivors one at a time and, for each, decide which of two things it is. Either the mutation changes behaviour somebody depends on, in which case add the assertion that would have failed — usually at a BOUNDARY, and usually exact where the existing test was relational: pinning `bucketOf(0)` to its value catches what `not.toBe(bucketOf(1))` cannot. Or it is an equivalent mutant, code whose change genuinely cannot be observed, in which case say so and leave it. Do not chase the percentage: adding an assertion nobody needs to satisfy a number is exactly the ceremony this is meant to detect.",
		done: "Done when every named survivor has either a new assertion that fails without the change, or a one-line note saying why it cannot be observed."
	}, xt = {
		id: "documentation-refresh",
		title: "Document what nothing explains",
		icon: "file-edit",
		description: "Packages in this repository with no README, new ones first.",
		kind: "drifting",
		criterion: "A workspace package has no README.",
		applies: (e) => e.packages.length > 0 ? void 0 : "not a workspace",
		stance: "act",
		needs: [],
		cadenceMs: 90 * x,
		assess: (e) => {
			let t = e.signals.packages.filter((e) => !e.documented);
			if (t.length !== 0) return {
				headline: `${y(t.length, "package")} of ${e.signals.packages.length} have no document`,
				detail: t.map((e) => `${e.name} · ${e.dir}`),
				digest: b(...t.map((e) => e.dir).toSorted()),
				severity: "info",
				why: `${y(t.length, "package")} of ${e.signals.packages.length} in ${S(e.repo)} have no README: ${t.map((e) => e.dir).join(", ")}.`
			};
		},
		diagnosis: "A package nobody can read the shape of gets worked in by guesswork, and the guesses accumulate.",
		goal: "Follow this workspace's own documentation conventions: read them first, they are not optional and they are not generic. For each undocumented package, read the package before you write a word about it, and produce the document its conventions call for: what the package is FOR, how it fits the system, and which files matter. Explain at the module level. Never describe code line by line, and never document a package you did not read.",
		done: "Done when every package you named has a document that a newcomer could use to find the file they need, and no other file changed."
	}, St = 3, Ct = (e) => {
		if (e.length === 0) return 0;
		let t = e.toSorted((e, t) => e - t), n = Math.floor(t.length / 2);
		return t.length % 2 == 0 ? ((t[n - 1] ?? 0) + (t[n] ?? 0)) / 2 : t[n] ?? 0;
	}, wt = {
		id: "complexity",
		title: "Simplify what everything waits on",
		icon: "wave-pulse",
		description: "Files that both churn and carry the repository, where edits are slow and ripple outward.",
		kind: "accruing",
		criterion: "A file in the hotspot ranking is also a key module, or its branching is three times the median of that ranking.",
		stance: "act",
		needs: [],
		cadenceMs: 30 * x,
		assess: (e) => {
			if (!e.signals.indexed || e.signals.hotspots.length === 0) return;
			let t = new Set(e.signals.keyModules.map((e) => e.path)), n = Ct(e.signals.hotspots.map((e) => e.complexity)), r = e.signals.hotspots.filter((e) => t.has(e.path) || e.complexity >= n * St);
			if (r.length === 0) return;
			let i = (e, r) => t.has(e) ? "churns and the rest of the repository imports it" : `${r} branch points against a median of ${n}`;
			return {
				headline: `${y(r.length, "file")} where every edit is slow and ripples outward`,
				detail: r.map((e) => `${e.path}, ${e.commits} commits, ${i(e.path, e.complexity)}`),
				digest: b(...r.map((e) => e.path).toSorted()),
				severity: "info",
				why: `${y(r.length, "file")} in ${S(e.repo)} are both change magnets and structurally tangled: ${r.map((e) => `${e.path} (${e.commits} commits, ${e.complexity} branch points)`).join("; ")}.`
			};
		},
		diagnosis: "A file that changes constantly and branches heavily makes every edit near it slow and easy to get wrong.",
		goal: "Take ONE file: the worst of them, and no more. Read it first. If the rest of the repository imports it, separate the stable contract from the churn: a narrow surface for importers, the volatile implementation private behind it. If it is simply tangled, flatten it where it stands: edge cases as early returns, compound conditions behind named predicates, long chains as lookups, and extract a unit only if a cohesive one falls out. Behaviour stays identical, and no re-export shims are left behind.",
		done: "Done when `iq hotspots` reports materially fewer branch points for that file, the repository's checks pass, and no importer changed meaning."
	}, Tt = {
		16: "2023-09-11",
		18: "2025-04-30",
		20: "2026-04-30",
		22: "2027-04-30",
		24: "2028-04-30"
	}, Et = 90 * x, Dt = {
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
			let t = Number.parseInt(e.node.replace(/^v/, ""), 10), n = Tt[t];
			if (Number.isNaN(t) || n === void 0) return;
			let r = Date.parse(`${n}T00:00:00Z`);
			if (e.nowMs < r - Et) return;
			let i = e.nowMs >= r, a = Math.round(Math.abs(r - e.nowMs) / x), o = e.signals.packages.filter((e) => e.engines?.node !== void 0);
			return {
				headline: i ? `Node ${t} stopped receiving security patches ${a} days ago` : `Node ${t} reaches end of life in ${a} days`,
				detail: [
					`running · ${e.node}`,
					`end of life · ${n}`,
					...o.map((e) => `pinned · ${e.name} requires node ${e.engines?.node ?? ""}`)
				],
				digest: b(`node:${t}`, i ? "eol" : "approaching"),
				severity: i ? "warning" : "info",
				why: `This sandbox runs ${e.node}, and Node ${t} ${i ? `reached end of life on ${n}` : `reaches end of life on ${n}`}, ${y(o.length, "package")} in ${S(e.repo)} pin a node engine range.`
			};
		},
		diagnosis: "An unsupported runtime stops receiving security patches, so every advisory against it stays open permanently.",
		goal: "Establish what actually pins this runtime: the image's own base, the workspace's nodeVersion, and each package's engines range. Propose the smallest move to a supported LTS, which of those pins have to change, in what order, and what is likely to break at that boundary. Make the pin changes that are mechanical; do NOT attempt the image rebuild itself.",
		done: "Done when the pins name a supported release, the repository's type-check and tests pass on it, and anything needing a rebuild is named as such."
	}, Ot = [
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
	], kt = {
		id: "library-overlap",
		title: "Settle on one library per job",
		icon: "box",
		description: "Two dependencies solving the same problem, both shipped, both maintained, one picked at random.",
		kind: "drifting",
		criterion: "Two or more installed dependencies do the same job.",
		applies: (e) => e.packages.length > 0 ? void 0 : "not a workspace",
		stance: "report",
		needs: [],
		cadenceMs: 90 * x,
		assess: (e) => {
			let t = new Set(e.signals.packages.flatMap((e) => [...e.dependencies, ...e.devDependencies])), n = Ot.map(({ category: e, members: n }) => ({
				category: e,
				found: n.filter((e) => t.has(e))
			})).filter(({ found: e }) => e.length > 1);
			if (n.length !== 0) return {
				headline: `${y(n.length, "job")} done by more than one library`,
				detail: n.map(({ category: e, found: t }) => `${e} · ${t.join(", ")}`),
				digest: b(...n.map(({ category: e, found: t }) => `${e}:${t.toSorted().join("+")}`).toSorted()),
				severity: "info",
				why: `${S(e.repo)} depends on more than one library for the same job: ${n.map(({ category: e, found: t }) => `${e} (${t.join(", ")})`).join("; ")}.`
			};
		},
		diagnosis: "Two libraries for one job means both ship, both need upgrading, and new code picks whichever the neighbouring file used.",
		goal: "For each overlapping pair, find out which one is actually used. How many call sites each has, whether one is a transitive dependency nobody chose, and whether either is unmaintained. Recommend the one to keep and estimate the migration honestly, including the call sites where the two libraries genuinely differ in behaviour. Where the overlap is deliberate or the second is only transitive, say so and close the question.",
		done: "Done when every overlapping pair has a recommendation with a call-site count behind it, or a reason the overlap is fine."
	}, At = 8, jt = Re.map((e) => e.label).join(", "), Mt = (e) => Be(e.shape.deps).length > 0 ? void 0 : `no ${jt}`, Nt = (e) => e >= 1048576 ? `${(e / 1048576).toFixed(1)} MB` : `${Math.round(e / 1024)} kB`, Pt = 50, Ft = 3, It = (e) => e.replace(/[.-](?=[A-Za-z0-9_-]*[0-9])[A-Za-z0-9_-]{8,}(\.[a-z0-9]+)$/, "$1"), Lt = {
		id: "bundle-weight",
		title: "Split what the browser downloads first",
		icon: "download",
		description: "What the last build put on disk, and whether it arrives as one download or several.",
		kind: "accruing",
		criterion: "A single asset is more than half of the build's total transfer size.",
		applies: Mt,
		stance: "report",
		needs: ["bundle"],
		cadenceMs: 30 * x,
		assess: (e) => {
			let t = dt(e, "bundle");
			if (t === void 0) return;
			let { assets: n, totalGzip: r, dir: i } = t.bundle;
			if (n.length < Ft || r === 0) return;
			let a = n.toSorted((e, t) => t.gzip - e.gzip), o = a[0];
			if (o === void 0) return;
			let s = o.gzip / r * 100;
			if (!(s < Pt)) return {
				headline: `${o.path} is ${Math.round(s)}% of the ${Nt(r)} this build ships`,
				detail: a.slice(0, At).map((e) => `${Nt(e.gzip)} gzipped · ${e.path} (${Nt(e.bytes)} on disk)`),
				digest: b(`total:${je(r)}`, ...a.slice(0, 5).map((e) => It(e.path)).toSorted()),
				severity: "info",
				why: `The build output in ${i}/ of ${S(e.repo)} is ${Nt(r)} gzipped across ${y(n.length, "asset")}, and ${o.path} alone is ${Nt(o.gzip)} of it: ${Math.round(s)}%. The next largest are ${a.slice(1, 4).map((e) => `${e.path} (${Nt(e.gzip)})`).join(", ")}. This is the last build someone ran, read off disk; nothing rebuilt it to measure.`
			};
		},
		diagnosis: "Everything in the first chunk is downloaded and parsed before anything renders, whether or not the visitor needed it.",
		goal: "Find out what is actually IN the dominant chunk before proposing anything: the repository's own bundler can report this, and a recommendation made without it is guesswork. Then report the split worth making: which routes or features could load on demand, which dependencies are pulled in wholesale for one function, and which are only used behind an interaction nobody has yet had. Name the boundary for each and estimate what it saves. Where the chunk is genuinely all first-paint code, say so and close it.",
		done: "Done when every recommendation names a specific import boundary and the bytes it would move out of the first download."
	}, Rt = {
		id: "framework-idiom",
		title: "Finish the framework migrations",
		icon: "history",
		description: "Code still written the way the framework used to recommend, long after it stopped.",
		kind: "accruing",
		criterion: "A file uses a framework idiom that framework's own maintainers have replaced.",
		applies: Mt,
		stance: "act",
		needs: ["ui"],
		cadenceMs: 60 * x,
		assess: (e) => {
			let t = dt(e, "ui");
			if (t === void 0) return;
			let n = new Set(Be(e.signals.shape.deps).map((e) => e.id)), r = t.scan.idioms.flatMap(({ id: e, files: t }) => {
				let r = qe(e);
				return r === void 0 || !n.has(r.framework) || t.length === 0 ? [] : [{
					rule: r,
					files: t
				}];
			});
			if (r.length === 0) return;
			let i = r.reduce((e, t) => e + t.files.length, 0), a = r.toSorted((e, t) => t.files.length - e.files.length);
			return {
				headline: `${y(r.length, "retired idiom")} still in use, across ${y(i, "file")}`,
				detail: a.map((e) => `${y(e.files.length, "file")} · ${e.rule.label} → ${e.rule.replacement}`),
				digest: b(...a.map((e) => `${e.rule.id}:${je(e.files.length)}`).toSorted()),
				severity: "info",
				why: `${S(e.repo)} still uses ${y(r.length, "idiom")} its framework has replaced: ${a.map((e) => `${e.rule.label} in ${y(e.files.length, "file")} (replaced by ${e.rule.replacement})`).join("; ")}. A sample of the files: ${a.flatMap((e) => e.files.slice(0, 3)).slice(0, At).join(", ")}.`
			};
		},
		diagnosis: "A retired idiom keeps working until the major release that drops it, and then it is an emergency inside somebody else's upgrade.",
		goal: "Take ONE idiom, the one with the most files, and no more. Convert the files where the conversion is mechanical and the behaviour is provably identical. Stop at the first file that needs a design decision: a class component with genuine error-boundary semantics, an NgModule that something outside the repository imports: leave it, and say what it would take. Do not convert an idiom the repository has deliberately kept: if the newest code uses it too, that is a choice, and reporting it as one is the useful answer.",
		done: "Done when a re-scan reports fewer files on that idiom, the repository's type-check and tests pass, and every file you skipped has a one-line reason."
	}, zt = {
		id: "component-overlap",
		title: "Settle on one component per job",
		icon: "copy",
		description: "Components built twice, the same name in two places, or the same logic under two names.",
		kind: "drifting",
		criterion: "Two component files reduce to the same name, or a duplicated block spans two components.",
		applies: Mt,
		stance: "report",
		needs: ["ui", "jscpd"],
		cadenceMs: 90 * x,
		assess: (e) => {
			let t = dt(e, "ui"), n = dt(e, "jscpd");
			if (t === void 0 || n === void 0) return;
			let r = /* @__PURE__ */ new Map();
			for (let e of t.scan.components) {
				let t = $e(e);
				t !== void 0 && r.set(t, [...r.get(t) ?? [], Je(e)]);
			}
			let i = [...r].filter(([, e]) => e.length > 1).map(([e, t]) => ({
				stem: e,
				paths: t.toSorted()
			})).toSorted((e, t) => t.paths.length - e.paths.length), a = new Set(t.scan.components.map(Je)), o = n.duplication.top.filter((e) => a.has(Je(e.first)) && a.has(Je(e.second)));
			if (i.length === 0 && o.length === 0) return;
			let s = [...i.length === 0 ? [] : [`${y(i.length, "name")} used by more than one component`], ...o.length === 0 ? [] : [`${y(o.length, "clone")} spanning two of them`]];
			return {
				headline: s.join(", "),
				detail: [...i.slice(0, At).map((e) => `${e.stem} · ${e.paths.join(", ")}`), ...o.map((e) => `${e.lines} shared lines · ${Je(e.first)} ↔ ${Je(e.second)}`)],
				digest: b(...i.map((e) => `${e.stem}:${e.paths.join("+")}`).toSorted(), ...o.map((e) => `${Je(e.first)}|${Je(e.second)}`).toSorted()),
				severity: "info",
				why: `${S(e.repo)} has ${s.join(" and ")}, out of ${y(t.scan.components.length, "component file")} scanned. ${i.length === 0 ? "" : `The names: ${i.slice(0, At).map((e) => `${e.stem} (${e.paths.join(", ")})`).join("; ")}. `}${o.length === 0 ? "" : `The clones: ${o.map((e) => `${Je(e.first)} ↔ ${Je(e.second)}, ${e.lines} lines`).join("; ")}.`}`
			};
		},
		diagnosis: "A component built twice is maintained once, whichever copy the next person happens to open is the one that gets the fix.",
		goal: "Read every file in each group before saying anything about it; a shared name is a reason to look, not a finding on its own. For each group, say whether these genuinely do the same job, and if they do, name the one to keep and count the call sites that would have to move. Where the answer is that the same LOGIC is duplicated rather than the whole component: the same fetch and loading state, the same form validation, the same list virtualization written twice: say so, and name the hook or composable it should become and where it would live. Where two components share a name and nothing else, say that too and close it: a false family is worth one line, and the next reader needs to know it was considered.",
		done: "Done when every group has either a component to keep with a call-site count, a shared unit to extract with a home, or a reason it is fine."
	}, Bt = {
		id: "tailwind-arbitrary-values",
		title: "Put hard-coded styles back on the scale",
		icon: "palette",
		description: "Colours and sizes written inline in the markup, around the theme that already defines them.",
		kind: "drifting",
		criterion: "A Tailwind class hard-codes a colour or a pixel size instead of using the theme's scale.",
		applies: (e) => Ve(e.shape.deps) ? void 0 : "no Tailwind",
		stance: "act",
		needs: ["ui"],
		cadenceMs: 30 * x,
		assess: (e) => {
			let t = dt(e, "ui");
			if (t === void 0) return;
			let { bypasses: n } = t.scan;
			if (n.length === 0) return;
			let r = n.reduce((e, t) => e + t.count, 0), i = n.toSorted((e, t) => t.count - e.count).slice(0, At);
			return {
				headline: `${y(r, "hard-coded value")} across ${y(n.length, "file")}`,
				detail: i.map((e) => `${e.path} · ${y(e.count, "value")}`),
				digest: b(...i.map((e) => e.path).toSorted(), `files:${je(n.length)}`, `total:${je(r)}`),
				severity: "info",
				why: `${S(e.repo)} has ${y(r, "Tailwind class", "Tailwind classes")} hard-coding a colour or a pixel size across ${y(n.length, "file")}; the heaviest are ${i.slice(0, 5).map((e) => `${e.path} (${e.count})`).join(", ")}.`
			};
		},
		diagnosis: "Every inline colour is a place the theme cannot reach, a palette change lands everywhere except the files that opted out of it.",
		goal: "Read the theme first: the Tailwind config, or the CSS that defines the tokens, so you know what the scale actually offers. Then replace the values that have a token: an exact palette match, a spacing step, a type size. Where a value is CLOSE to a token but not equal, do not round it silently; that is a visual change wearing a refactor's clothes. List those separately with both values and let the owner decide. Where a value has no token and should: a brand colour used in nine places, say that the theme is missing an entry rather than editing nine files.",
		done: "Done when a re-scan reports fewer hard-coded values, nothing renders differently, and every value you left has a one-line reason."
	}, Vt = ({ id: e, title: t, icon: n, description: r, diagnosis: i, goal: a, done: o, cadenceDays: s, applies: c }) => ({
		id: e,
		title: t,
		icon: n,
		description: r,
		kind: "surveying",
		criterion: `${s} days have passed since this review was last run.`,
		applies: c,
		stance: "report",
		needs: [],
		cadenceMs: s * x,
		survey: !0,
		assess: (t) => ({
			headline: `Not surveyed in ${s} days`,
			detail: [`Cadence · every ${s} days`],
			digest: b(e, `period:${Math.floor(t.nowMs / (s * x))}`),
			severity: "info",
			why: `This is a periodic review of ${S(t.repo)}, run every ${s} days; nothing measured it, it is due because it has been that long.`
		}),
		diagnosis: i,
		goal: a,
		done: o
	}), Ht = 25, Ut = Vt({
		id: "standardize-patterns",
		title: "Standardize the cross-cutting patterns",
		icon: "sitemap",
		description: "Error handling, validation, logging, configuration, retries, pagination, the things every file does slightly differently.",
		diagnosis: "Cross-cutting concerns drift one file at a time, and the cost only shows up when someone has to work across several of them.",
		goal: "Pick the cross-cutting concerns this repository actually has: error handling, input validation, logging, configuration, retries, pagination, serialization, and for each, survey how it is done. Name the dominant pattern, the outliers, and which of the outliers are deliberate. Recommend ONE convention per concern with a file to point at as the reference implementation, and estimate the size of the conversion. Do not convert anything.",
		done: "Done when each concern has a named convention, a reference file, and a count of the sites that diverge from it.",
		cadenceDays: 90,
		applies: (e) => e.totals.files >= Ht ? void 0 : `only ${e.totals.files} indexed files`
	}), Wt = Vt({
		id: "deprecated-apis",
		title: "Audit deprecated APIs",
		icon: "exclamation-triangle",
		description: "Language, runtime and framework APIs this code still uses that their own maintainers have moved on from.",
		diagnosis: "A deprecated API works right up until the upgrade that removes it, and then it is an emergency during someone else's migration.",
		goal: "Survey what this repository uses that its own dependencies have deprecated: read the framework and runtime versions in use, check their deprecation notices, and search for the call sites. Include the repository's OWN deprecations: anything its code marks as deprecated and still calls. Rank by when each one actually breaks, not by how many call sites it has, and name the replacement for each. Change nothing.",
		done: "Done when every deprecation has call sites cited, a replacement named, and the release it is expected to break in.",
		cadenceDays: 90,
		applies: (e) => e.shape.packageManifest ? void 0 : "no package.json"
	}), Gt = Vt({
		id: "documentation-drift",
		title: "Re-read the documentation against the code",
		icon: "file",
		description: "Whether what the documents claim is still what the code does, the drift no tool can measure.",
		diagnosis: "Documentation is trusted in proportion to how recently it was true, and a document that is quietly wrong is worse than a missing one.",
		goal: "Read this repository's architecture documents against the code they describe. Report every claim that is no longer true, citing the document line and the file that contradicts it. Prioritise the claims someone would ACT on, where a subsystem lives, what owns what, which file to change: over prose that has merely aged. Do not rewrite the documents; produce the list of what is wrong.",
		done: "Done when every architecture document has been read and every false claim is listed with both sides cited.",
		cadenceDays: 90,
		applies: (e) => e.shape.docs.length > 0 ? void 0 : "no architecture documents"
	}), Kt = Vt({
		id: "ci-hygiene",
		title: "Tighten the CI pipeline",
		icon: "bolt",
		description: "What the pipeline re-does every run: uncached installs, rebuilt layers, jobs that could run in parallel.",
		diagnosis: "A slow pipeline is paid on every push by everyone, and it degrades one uncached step at a time without anyone deciding to.",
		goal: "Read this repository's pipeline definitions and report what it pays for repeatedly: dependency installs with no cache key, build outputs recomputed between jobs, steps that are serial for no reason, and matrix legs that duplicate each other's work. For each, name the file and step, say roughly what it costs per run, and give the change that would fix it. Where a step is slow because it genuinely has to be, say so: a pipeline that is honestly expensive is not a finding.",
		done: "Done when every finding names a file, a step, and a concrete change, and anything deliberately slow is called out as such.",
		cadenceDays: 90,
		applies: (e) => e.shape.ci.length > 0 ? void 0 : "no CI pipeline"
	}), qt = Vt({
		id: "docker-image",
		title: "Slim the container image",
		icon: "box",
		description: "Layer order, build context and final size, what ships in the image that did not need to.",
		diagnosis: "Image size is paid on every pull and every cold start, and layer order decides how much of a build is cache hits.",
		goal: "Read this repository's Dockerfiles and report what makes the image larger or the build slower than it needs to be: layers ordered so that a source edit invalidates the dependency install, build-time toolchains left in the final stage, a build context that ships the whole repository, and package caches never cleaned. For each, cite the file and line, and name the change. Do not rewrite the Dockerfiles: an image that fails to build is a much worse problem than one that is larger than ideal.",
		done: "Done when every finding cites a Dockerfile line and names the change, with the ones that would need a base-image swap called out separately.",
		cadenceDays: 90,
		applies: (e) => e.shape.dockerfiles.length > 0 ? void 0 : "no Dockerfile"
	}), Jt = [
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
	], Yt = [
		pt,
		Dt,
		ht,
		gt,
		wt,
		bt,
		Lt,
		Rt,
		xt,
		vt,
		kt,
		zt,
		Bt,
		Ut,
		Wt,
		Gt,
		Kt,
		qt
	], Xt = Jt.map(({ kind: e }) => e), Zt = Yt.toSorted((e, t) => Xt.indexOf(e.kind) - Xt.indexOf(t.kind)), Qt = (e, t, n) => Ne({
		subject: `${e.title} in ${S(n)}.`,
		why: `${t.why} You were woken because: ${e.criterion} ${Pe}`,
		diagnosis: e.diagnosis,
		goal: e.goal,
		invariants: e.stance === "act" ? Fe : Ie,
		done: e.done
	});
})), en, tn, nn, rn, an, on, sn, cn, ln, un, dn, fn, pn, mn, hn, gn, _n, vn, yn, bn, xn, Sn, Cn, wn, Tn, En, Dn, On, kn, An, jn, Mn, Nn, Pn, Fn, In, Ln, Rn, zn, Bn = v((() => {
	et(), it(), en = 864e5, tn = (e) => {
		let t = e.indexOf("{");
		if (t !== -1) try {
			let n = JSON.parse(e.slice(t));
			return typeof n == "object" && n && !Array.isArray(n) ? n : void 0;
		} catch {
			return;
		}
	}, nn = (e) => typeof e == "string" && e !== "" ? e : void 0, rn = (e) => Array.isArray(e) ? e.length : 0, an = (e) => e.replace(/^[^\d]*/, "").split(".").map((e) => Number.parseInt(e, 10) || 0), on = (e, t) => {
		let [n = 0, r = 0] = an(e), [i = 0, a = 0] = an(t);
		return i === n ? a === r ? "patch" : "minor" : "major";
	}, sn = (e) => {
		let t = tn(e);
		if (t === void 0) return;
		let n = [];
		for (let [e, r] of Object.entries(t)) {
			if (typeof r != "object" || !r) continue;
			let t = r, i = nn(t.current), a = nn(t.latest);
			i !== void 0 && a !== void 0 && i !== a && n.push({
				name: e,
				current: i,
				latest: a,
				kind: on(i, a),
				section: nn(t.dependencyType) ?? "dependencies"
			});
		}
		return {
			id: "outdated",
			packages: n
		};
	}, cn = /* @__PURE__ */ new Set([
		"critical",
		"high",
		"moderate",
		"low",
		"info"
	]), ln = (e) => {
		let t = tn(e);
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
			let t = e, n = nn(t.module_name), i = nn(t.severity);
			if (n === void 0 || i === void 0 || !cn.has(i)) continue;
			let a = nn(t.patched_versions), o = Array.isArray(t.findings) ? t.findings : [];
			r.push({
				name: n,
				severity: i,
				title: nn(t.title) ?? n,
				...a === void 0 || a === "<0.0.0" ? {} : { patched: a },
				dev: o.length > 0 && o.every((e) => e.dev === !0)
			});
		}
		return {
			id: "audit",
			advisories: r
		};
	}, un = 8, dn = (e) => {
		let t = tn(e)?.issues;
		if (!Array.isArray(t)) return;
		let n = t.filter((e) => typeof e == "object" && !!e), r = (e) => n.reduce((t, n) => t + rn(n[e]), 0);
		return {
			id: "knip",
			deadCode: {
				files: r("files"),
				exports: r("exports"),
				types: r("types"),
				dependencies: r("dependencies"),
				devDependencies: r("devDependencies"),
				sample: n.flatMap((e) => rn(e.files) === 0 ? [] : nn(e.file) ?? []).slice(0, un)
			}
		};
	}, fn = 5, pn = (e) => {
		let t = tn(e), n = t?.statistics;
		if (typeof n != "object" || !n) return;
		let r = n.total, i = typeof r == "object" && r ? r.percentage : void 0, a = Array.isArray(t?.duplicates) ? t.duplicates : [], o = (e) => typeof e == "object" && e ? nn(e.name) ?? "?" : "?";
		return {
			id: "jscpd",
			duplication: {
				percentage: typeof i == "number" ? i : 0,
				clones: a.length,
				top: a.map((e) => ({
					lines: typeof e.lines == "number" ? e.lines : 0,
					first: o(e.firstFile),
					second: o(e.secondFile)
				})).toSorted((e, t) => t.lines - e.lines).slice(0, fn)
			}
		};
	}, mn = 8, hn = /* @__PURE__ */ new Set(["Killed", "Timeout"]), gn = /* @__PURE__ */ new Set(["Survived", "NoCoverage"]), _n = (e) => {
		if (typeof e != "object" || !e) return [];
		let t = e.mutants;
		return Array.isArray(t) ? t.filter((e) => typeof e == "object" && !!e) : [];
	}, vn = (e) => {
		let t = e.location, n = typeof t == "object" && t ? t.start : void 0, r = typeof n == "object" && n ? n.line : void 0;
		return typeof r == "number" ? r : 0;
	}, yn = (e, t) => ({
		file: e,
		line: vn(t),
		mutator: nn(t.mutatorName) ?? "?",
		replacement: nn(t.replacement) ?? "(removed)"
	}), bn = (e) => {
		let t = {
			killed: 0,
			survived: 0,
			inconclusive: 0,
			survivors: []
		};
		for (let [n, r] of Object.entries(e)) for (let e of _n(r)) {
			let r = nn(e.status) ?? "";
			if (hn.has(r)) {
				t.killed++;
				continue;
			}
			if (!gn.has(r)) {
				t.inconclusive++;
				continue;
			}
			t.survived++, t.survivors.push(yn(n, e));
		}
		return t;
	}, xn = (e) => {
		let t = tn(e)?.files;
		if (typeof t != "object" || !t || Array.isArray(t)) return;
		let n = bn(t), r = n.killed + n.survived;
		return {
			id: "mutation",
			mutation: {
				score: r === 0 ? 100 : Math.round(n.killed / r * 100),
				killed: n.killed,
				survived: n.survived,
				inconclusive: n.inconclusive,
				survivors: n.survivors.slice(0, mn)
			}
		};
	}, Sn = "UI", Cn = 2e3, wn = 500, Tn = ".", En = (e) => [...[...e, ...He].map((e) => `-g '${e}'`), nt].join(" "), Dn = (e) => {
		let t = e.lastIndexOf(":");
		if (t <= 0) return;
		let n = Number.parseInt(e.slice(t + 1), 10);
		return Number.isNaN(n) || n <= 0 ? void 0 : {
			path: Je(e.slice(0, t)),
			count: n
		};
	}, On = (e) => `rg --no-messages ${e.absent === void 0 ? "-l" : "--files-without-match"} -e '${e.pattern}' ${En(e.globs)} ${Tn} 2>/dev/null | sort | head -n ${wn} | awk '{print "IDIOM\\t${e.id}\\t" $0}'`, kn = () => [
		`echo ${Sn}`,
		`rg --files ${En(Ue)} ${Tn} 2>/dev/null | sort | head -n ${Cn} | awk '{print "COMPONENT\\t" $0}'`,
		`rg --no-messages --count-matches -e '${Ge}' ${En(We)} ${Tn} 2>/dev/null | sort | head -n ${wn} | awk '{print "BYPASS\\t" $0}'`,
		...Ke.map(On),
		"true"
	].join("; "), An = (e) => {
		let t = e.split("\n").map((e) => e.trim());
		if (t.find((e) => e !== "") !== Sn) return;
		let n = [], r = [], i = /* @__PURE__ */ new Map();
		for (let e of t) {
			let [t, ...a] = e.split("	");
			if (t === "COMPONENT" && a[0] !== void 0) n.push(Je(a[0]));
			else if (t === "BYPASS") {
				let e = Dn(a.join("	"));
				e !== void 0 && r.push(e);
			} else if (t === "IDIOM" && a[0] !== void 0) {
				let e = Je(a.slice(1).join("	"));
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
	}, jn = [
		"dist",
		"build",
		"out",
		"public/build"
	], Mn = "DIR", Nn = 40, Pn = () => [
		"dir=\"\"",
		`for d in ${jn.join(" ")}; do if [ -d "$d" ]; then dir="$d"; break; fi; done`,
		"[ -n \"$dir\" ] || exit 0",
		`printf '${Mn}\\t%s\\n' "$dir"`,
		`find "\$dir" -type f \\( -name '*.js' -o -name '*.mjs' -o -name '*.cjs' -o -name '*.css' \\) -exec sh -c 'for f; do printf "ASSET\\t%s\\t%s\\t%s\\n" "\$(wc -c <"\$f")" "\$(gzip -c "\$f" | wc -c)" "\$f"; done' _ {} + 2>/dev/null | sort -k2 -rn | head -n ${Nn}`
	].join("; "), Fn = (e) => {
		let t = e.split("\n").map((e) => e.trim()), n = t.find((e) => e.startsWith(`${Mn}\t`));
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
				dir: n.slice(Mn.length + 1),
				totalBytes: r.reduce((e, t) => e + t.bytes, 0),
				totalGzip: r.reduce((e, t) => e + t.gzip, 0),
				assets: r
			}
		};
	}, In = "/tmp/intentic-chore-jscpd", Ln = "reports/mutation/mutation.json", Rn = [
		{
			id: "outdated",
			title: "Dependency versions",
			measures: "how far behind the registry each dependency is",
			tier: 1,
			ttlMs: en,
			timeoutMs: 3e5,
			available: "test -f package.json",
			unavailable: "no package.json",
			command: "pnpm outdated -r --json 2>/dev/null || true",
			parse: sn
		},
		{
			id: "audit",
			title: "Security advisories",
			measures: "published advisories against this dependency tree",
			tier: 1,
			ttlMs: en,
			timeoutMs: 3e5,
			available: "test -f pnpm-lock.yaml || test -f package-lock.json",
			unavailable: "no lockfile",
			command: "pnpm audit --json 2>/dev/null || true",
			parse: ln
		},
		{
			id: "knip",
			title: "Unreachable code",
			measures: "files, exports and dependencies nothing references",
			tier: 2,
			ttlMs: 7 * en,
			timeoutMs: 9e5,
			available: "pnpm exec knip --version >/dev/null 2>&1",
			unavailable: "knip is not a devDependency",
			command: "pnpm exec knip --reporter json --no-exit-code 2>/dev/null || true",
			parse: dn
		},
		{
			id: "jscpd",
			title: "Copy-paste",
			measures: "how much of the tree is duplicated elsewhere in it",
			tier: 2,
			ttlMs: 7 * en,
			timeoutMs: 12e5,
			available: "test -f package.json",
			unavailable: "no package.json",
			command: `pnpm dlx jscpd ${rt} --reporters json --output ${In} --min-lines 12 --threshold 100 . >/dev/null 2>&1; cat ${In}/jscpd-report.json 2>/dev/null`,
			parse: pn
		},
		{
			id: "mutation",
			title: "Test strength",
			measures: "how much of the code could break with every test still green",
			tier: 2,
			ttlMs: 30 * en,
			timeoutMs: 54e5,
			available: "{ test -f stryker.conf.mjs || test -f stryker.conf.json; } && pnpm exec stryker --version >/dev/null 2>&1",
			unavailable: "no stryker config in this repo",
			command: `pnpm exec stryker run --reporters json --incremental >/dev/null 2>&1 || true; cat ${Ln} 2>/dev/null`,
			parse: xn
		},
		{
			id: "ui",
			title: "Front-end source",
			measures: "components, hard-coded styles and idioms the framework has replaced",
			tier: 1,
			ttlMs: en,
			timeoutMs: 3e5,
			available: `rg -l --no-messages -g '**/package.json' -g '!**/node_modules/**' ${nt} -e '[\\x22](${[...Re.flatMap((e) => e.packages), ...ze].join("|")})[\\x22]\\s*:' . >/dev/null`,
			unavailable: "no package here declares a UI framework or Tailwind",
			command: kn(),
			parse: An
		},
		{
			id: "bundle",
			title: "Build output",
			measures: "what the last build put on disk for a browser to download",
			tier: 1,
			ttlMs: en,
			timeoutMs: 3e5,
			available: `find ${jn.join(" ")} -maxdepth 4 -type f \\( -name '*.js' -o -name '*.mjs' -o -name '*.css' \\) 2>/dev/null | head -n 1 | grep -q .`,
			unavailable: "no build output on disk, this reads the last build, it never runs one",
			command: Pn(),
			parse: Fn
		}
	], zn = (e) => {
		let t = Rn.find((t) => t.id === e);
		if (t === void 0) throw Error(`chores: no probe named "${e}"`);
		return t;
	};
})), Vn, Hn, Un, Wn, Gn, Kn, qn, Jn, Yn, Xn = v((() => {
	$t(), Bn(), Vn = (e, t) => {
		let n = e.flatMap((e) => {
			let n = t.get(e);
			return n?.state === "ok" ? [n.ranAt] : [];
		});
		return n.length === 0 ? void 0 : Math.min(...n);
	}, Hn = (e, t, n) => e.survey === !0 && t !== void 0 ? `Surveyed ${Math.round((n - t.ranAt) / 864e5)} days ago` : "Nothing to do", Un = (e, t) => e.flatMap((e) => {
		let n = t.get(e), r = zn(e);
		return n === void 0 ? [`${r.title} · not measured yet`] : n.state === "ok" ? [] : n.state === "unavailable" ? [`${r.title} · ${n.reason ?? "not available in this repository"}`] : [`${r.title} · failed${n.reason === void 0 ? "" : `, ${n.reason}`}`];
	}), Wn = (e, t, n) => {
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
		let a = Un(e.needs, t.probes);
		if (a.length > 0) return {
			...r,
			state: "unavailable",
			severity: "info",
			headline: "Not measured",
			detail: a,
			digest: "",
			measuredAt: void 0
		};
		let o = Vn(e.needs, t.probes), s = e.assess(t);
		if (s === void 0) return {
			...r,
			state: "clear",
			severity: "info",
			headline: Hn(e, n, t.nowMs),
			detail: [],
			digest: "",
			measuredAt: o
		};
		let c = n !== void 0 && e.cadenceMs > 0 && t.nowMs - n.ranAt >= e.cadenceMs, l = n?.digest === s.digest && !c;
		if (e.survey === !0 && n !== void 0 && t.nowMs - n.ranAt < e.cadenceMs) return {
			...r,
			state: "clear",
			severity: "info",
			headline: Hn(e, n, t.nowMs),
			detail: s.detail,
			digest: s.digest,
			measuredAt: o
		};
		let u = Qt(e, s, t.repo);
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
	}, Gn = (e) => {
		let { lastRun: t, digest: n } = e;
		if (t !== void 0 && n !== "" && t.digest === n) return {
			outcome: t.outcome,
			ranAt: t.ranAt
		};
	}, Kn = (e) => e.settled || e.state === "stale", qn = (e, t) => `${e}|${t}`, Jn = (e, t) => {
		let n = new Map(e.ledger.map((e) => [qn(e.repo, e.chore), e]));
		return e.repos.flatMap(({ repo: r, probes: i, signals: a }) => {
			let o = {
				repo: r,
				probes: new Map(i.map((e) => [e.id, e])),
				signals: a,
				node: e.node,
				nowMs: t
			};
			return Zt.map((e) => Wn(e, o, n.get(qn(r, e.id))));
		});
	}, Yn = (e, t) => e.filter((e) => e.state === "due" && !e.settled && t[qn(e.repo, e.chore.id)] !== e.digest);
})), Zn = v((() => {
	$t(), Me(), Le(), Bn(), it(), et(), Xn();
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/util.js
function Qn(e) {
	let t = Object.values(e).filter((e) => typeof e == "number");
	return Object.entries(e).filter(([e, n]) => t.indexOf(+e) === -1).map(([e, t]) => t);
}
function $n(e, t = "|") {
	return e.map((e) => mr(e)).join(t);
}
function er(e, t) {
	return typeof t == "bigint" ? t.toString() : t;
}
function tr(e) {
	return { get value() {
		{
			let t = e();
			return Object.defineProperty(this, "value", { value: t }), t;
		}
	} };
}
function nr(e) {
	return e == null;
}
function rr(e) {
	let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
	return e.slice(t, n);
}
function ir(e, t) {
	let n = e / t, r = Math.round(n), i = 4 * 2 ** -52 * Math.max(Math.abs(n), 1);
	return Math.abs(n - r) < i ? 0 : n - r;
}
function ar(e, t, n) {
	let r;
	Object.defineProperty(e, t, {
		get() {
			if (r !== Br) return r === void 0 && (r = Br, r = n()), r;
		},
		set(n) {
			Object.defineProperty(e, t, { value: n });
		},
		configurable: !0
	});
}
function C(e, t, n) {
	Object.defineProperty(e, t, {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
}
function or(...e) {
	let t = {};
	for (let n of e) {
		let e = Object.getOwnPropertyDescriptors(n);
		Object.assign(t, e);
	}
	return Object.defineProperties({}, t);
}
function sr(e) {
	return JSON.stringify(e);
}
function cr(e) {
	return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function lr(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function ur(e) {
	if (lr(e) === !1) return !1;
	let t = e.constructor;
	if (t === void 0 || typeof t != "function") return !0;
	let n = t.prototype;
	return lr(n) !== !1 && Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") !== !1;
}
function dr(e) {
	return ur(e) ? { ...e } : Array.isArray(e) ? [...e] : e instanceof Map ? new Map(e) : e instanceof Set ? new Set(e) : e;
}
function fr(e) {
	return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function pr(e, t, n) {
	let r = new e._zod.constr(t ?? e._zod.def);
	return (!t || n?.parent) && (r._zod.parent = e), r;
}
function w(e) {
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
function mr(e) {
	return typeof e == "bigint" ? e.toString() + "n" : typeof e == "string" ? `"${e}"` : `${e}`;
}
function hr(e) {
	return Object.keys(e).filter((t) => e[t]._zod.optin !== void 0 && e[t]._zod.optout === "optional");
}
function gr(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".pick() cannot be used on object schemas containing refinements");
	return pr(e, or(e._zod.def, {
		get shape() {
			let e = {};
			for (let r of Reflect.ownKeys(t)) {
				if (!Object.prototype.hasOwnProperty.call(n.shape, r)) throw Error(`Unrecognized key: "${String(r)}"`);
				t[r] && C(e, r, n.shape[r]);
			}
			return C(this, "shape", e), e;
		},
		checks: []
	}));
}
function _r(e, t) {
	let n = e._zod.def, r = n.checks;
	if (r && r.length > 0) throw Error(".omit() cannot be used on object schemas containing refinements");
	return pr(e, or(e._zod.def, {
		get shape() {
			let r = { ...e._zod.def.shape };
			for (let e of Reflect.ownKeys(t)) {
				if (!Object.prototype.hasOwnProperty.call(n.shape, e)) throw Error(`Unrecognized key: "${String(e)}"`);
				t[e] && delete r[e];
			}
			return C(this, "shape", r), r;
		},
		checks: []
	}));
}
function vr(e, t) {
	if (!ur(t)) throw Error("Invalid input to extend: expected a plain object");
	let n = e._zod.def.checks;
	if (n && n.length > 0) {
		let n = e._zod.def.shape;
		for (let e of Reflect.ownKeys(t)) if (Object.getOwnPropertyDescriptor(n, e) !== void 0) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
	}
	return pr(e, or(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return C(this, "shape", n), n;
	} }));
}
function yr(e, t) {
	if (!ur(t)) throw Error("Invalid input to safeExtend: expected a plain object");
	return pr(e, or(e._zod.def, { get shape() {
		let n = {
			...e._zod.def.shape,
			...t
		};
		return C(this, "shape", n), n;
	} }));
}
function br(e, t) {
	if (!t?._zod?.def) throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
	if (e._zod.def.checks?.length) throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
	return pr(e, or(e._zod.def, {
		get shape() {
			let n = {
				...e._zod.def.shape,
				...t._zod.def.shape
			};
			return C(this, "shape", n), n;
		},
		get catchall() {
			return t._zod.def.catchall;
		},
		checks: t._zod.def.checks ?? []
	}));
}
function xr(e, t, n, r = "partial") {
	let i = t._zod.def.checks;
	if (i && i.length > 0) throw Error(`.${r}() cannot be used on object schemas containing refinements`);
	return pr(t, or(t._zod.def, {
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
			return C(this, "shape", i), i;
		},
		checks: []
	}));
}
function Sr(e, t, n) {
	return pr(t, or(t._zod.def, { get shape() {
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
		return C(this, "shape", i), i;
	} }));
}
function Cr(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue !== !0) return !0;
	return !1;
}
function wr(e, t = 0) {
	if (e.aborted === !0) return !0;
	for (let n = t; n < e.issues.length; n++) if (e.issues[n]?.continue === !1) return !0;
	return !1;
}
function Tr(e, t) {
	return t.map((t) => {
		var n;
		return (n = t).path ?? (n.path = []), t.path.unshift(e), t;
	});
}
function Er(e) {
	return typeof e == "string" ? e : e?.message;
}
function Dr(e, t, n) {
	var r;
	for (let i = t; i < e.length; i++) (r = e[i]).schema ?? (r.schema = n);
}
function Or(e, t, n) {
	var r;
	let i = e.inst?._zod?.traits;
	i?.has("$ZodType") && (i.has("$ZodCheck") ? (r = e).schema ?? (r.schema = e.inst) : e.schema = e.inst);
	let a = e.schema === e.inst ? void 0 : e.schema?._zod.def?.error, o = e.message ? e.message : Er(e.inst?._zod.def?.error?.(e)) ?? Er(a?.(e)) ?? Er(t?.error?.(e)) ?? Er(n.customError?.(e)) ?? Er(n.localeError?.(e)) ?? "Invalid input", { inst: s, schema: c, continue: l, input: u, ...d } = e;
	return d.path ??= [], d.message = o, t?.reportInput && (d.input = u), d;
}
function kr(e) {
	let t = e.length;
	if (!Gr.test(e)) return t;
	let n = t;
	for (let r = 0; r < t - 1; r++) (e.charCodeAt(r) & 64512) == 55296 && (e.charCodeAt(r + 1) & 64512) == 56320 && (n--, r++);
	return n;
}
function Ar(e) {
	return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function jr(e) {
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
function Mr(...e) {
	let [t, n, r] = e;
	return typeof t == "string" ? {
		message: t,
		code: "custom",
		input: n,
		inst: r
	} : { ...t };
}
function Nr(e, t) {
	for (let n in t) {
		let r = Object.getOwnPropertyDescriptor(t, n);
		r.get ? Object.defineProperty(e, n, {
			...r,
			enumerable: !1
		}) : Ir(e, n, r.value);
	}
}
function Pr(e, t, n, r = !0) {
	return Object.defineProperty(e, t, {
		configurable: !0,
		writable: !0,
		enumerable: r,
		value: n
	}), n;
}
function Fr(e, t, n) {
	return Pr(e, t, n, !1);
}
function Ir(e, t, n) {
	Object.defineProperty(e, t, {
		configurable: !0,
		get() {
			return this == null ? n : Pr(this, t, n.bind(this));
		},
		set(e) {
			Pr(this, t, e);
		}
	});
}
function Lr(e, t) {
	let n = Object.getPrototypeOf(e);
	return t in n ? void 0 : n;
}
function T(e, t, n) {
	let r = Object.getPrototypeOf(e._zod);
	if (t in r && Kr !== e._zod) {
		Kr = void 0;
		return;
	}
	Kr = e._zod, Object.defineProperty(r, t, {
		configurable: !0,
		get() {
			Object.defineProperty(this, t, Jr);
			let e = qr;
			qr = !1;
			try {
				let r = n(this);
				return qr ? delete this[t] : Object.defineProperty(this, t, {
					configurable: !0,
					writable: !0,
					value: r
				}), qr ||= e, r;
			} catch (n) {
				throw delete this[t], qr ||= e, n;
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
function Rr(e, t, n, r) {
	let i = Lr(e, t);
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
function zr(e) {
	let t = () => e;
	return t[Yr] = !0, t;
}
var Br, Vr, Hr, Ur, Wr, Gr, Kr, qr, Jr, Yr, Xr = v((() => {
	ai(), Br = /* @__PURE__*/ Symbol("evaluating"), Vr = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {}, Hr = /* @__PURE__*/ tr(() => {
		if (ii.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare")) return !1;
		try {
			return Function(""), !0;
		} catch {
			return !1;
		}
	}), Ur = /* @__PURE__*/ new Set([
		"string",
		"number",
		"symbol"
	]), Wr = {
		safeint: [-(2 ** 53 - 1), 2 ** 53 - 1],
		int32: [-2147483648, 2147483647],
		uint32: [0, 4294967295],
		float32: [-34028234663852886e22, 34028234663852886e22],
		float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
	}, Gr = /[\uD800-\uDBFF]/, qr = !1, Jr = {
		configurable: !0,
		get() {
			qr = !0;
		}
	}, Yr = "~constantCatch";
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/core.js
function Zr(e) {
	let t = ti;
	if (t) {
		let n = t.stackTraceLimit;
		if (typeof n == "number") {
			try {
				t.stackTraceLimit = 0;
			} catch {
				return ti = null, new e();
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
function E(e, t, n, r) {
	let i = {};
	function a(e) {
		this.def = e, this.constr = d, this.traits = /* @__PURE__ */ new Set();
	}
	a.prototype = i;
	let o = n, s = o && /* @__PURE__ */ new WeakSet();
	function c(n, r) {
		if (!n._zod) {
			ei.value = new a(r);
			try {
				Object.defineProperty(n, "_zod", ei);
			} finally {
				ei.value = void 0;
			}
		}
		if (n._zod.traits.has(e)) return;
		if (n._zod.traits.add(e), t(n, r), s) {
			let e = Object.getPrototypeOf(n), t = n._zod.constr.prototype, r = e;
			for (; r && r !== t;) r = Object.getPrototypeOf(r);
			let i = r ?? e;
			s.has(i) || (s.add(i), Nr(i, o));
		}
		let i = d.prototype;
		for (let e in i) Object.prototype.hasOwnProperty.call(i, e) && (e in n || (n[e] = i[e].bind(n)));
	}
	let l = r?.Parent ?? Object;
	class u extends l {}
	Object.defineProperty(u, "name", { value: e });
	function d(e) {
		let t = r?.Parent ? Zr(u) : this;
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
function Qr(e) {
	return e && Object.assign(ii, e), ii;
}
var $r, ei, ti, ni, ri, ii, ai = v((() => {
	Xr(), ei = {
		value: void 0,
		enumerable: !1
	}, ti = "captureStackTrace" in Error ? Error : null, ni = class extends Error {
		constructor() {
			super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
		}
	}, ri = class extends Error {
		constructor(e) {
			super(`Encountered unidirectional transform during encode: ${e}`), this.name = "ZodEncodeError";
		}
	}, ($r = globalThis).__zod_globalConfig ?? ($r.__zod_globalConfig = {}), ii = globalThis.__zod_globalConfig;
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/errors.js
function oi() {
	let e = this._zod;
	return e.message ??= JSON.stringify(e.def, er, 2), e.message;
}
function si(e) {
	this._zod.message = e;
}
function ci(e, t, n) {
	return Object.prototype.hasOwnProperty.call(e, t) || (t === "__proto__" ? Object.defineProperty(e, t, {
		value: n(),
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : e[t] = n()), e[t];
}
function li(e, t = (e) => e.message) {
	let n = {}, r = [];
	for (let i of e.issues) i.path.length > 0 ? ci(n, i.path[0], () => []).push(t(i)) : r.push(t(i));
	return {
		formErrors: r,
		fieldErrors: n
	};
}
function ui(e, t = (e) => e.message) {
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
var di, fi, pi, mi, hi, gi, _i, vi = v((() => {
	ai(), Xr(), di = {
		get: oi,
		set: si,
		enumerable: !0,
		configurable: !0
	}, fi = {
		value: void 0,
		enumerable: !1
	}, pi = {
		value: void 0,
		enumerable: !1
	}, mi = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), hi = (e, t) => {
		e.name = "$ZodError", fi.value = e._zod, Object.defineProperty(e, "_zod", fi), pi.value = t, Object.defineProperty(e, "issues", pi), fi.value = void 0, pi.value = void 0, Object.defineProperty(e, "message", di);
		let n = Object.getPrototypeOf(e);
		mi.has(n) || (mi.add(n), Object.defineProperty(n, "toString", {
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
	}, gi = E("$ZodError", hi), _i = E("$ZodError", hi, void 0, { Parent: Error });
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/parse.js
function yi(e, t) {
	return {
		callee: t?.callee ?? e,
		Err: t?.Err
	};
}
var bi, xi, Si, Ci, wi, Ti, Ei, Di, Oi, ki, Ai, ji, Mi, Ni, Pi = v((() => {
	ai(), vi(), Xr(), bi = (e) => {
		let t = (n, r, i, a) => {
			let o = i ? {
				...i,
				async: !1
			} : { async: !1 }, s = n._zod.run({
				value: r,
				issues: []
			}, o);
			if (s instanceof Promise) throw new ni();
			if (s.issues.length) {
				let n = new ((a?.Err) ?? e)(s.issues.map((e) => Or(e, o, Qr())));
				throw Vr(n, a?.callee ?? t), n;
			}
			return s.value;
		};
		return t;
	}, xi = (e) => {
		let t = async (n, r, i, a) => {
			let o = i ? {
				...i,
				async: !0
			} : { async: !0 }, s = n._zod.run({
				value: r,
				issues: []
			}, o);
			if (s instanceof Promise && (s = await s), s.issues.length) {
				let n = new ((a?.Err) ?? e)(s.issues.map((e) => Or(e, o, Qr())));
				throw Vr(n, a?.callee ?? t), n;
			}
			return s.value;
		};
		return t;
	}, Si = (e) => (t, n, r) => {
		let i = r ? {
			...r,
			async: !1
		} : { async: !1 }, a = t._zod.run({
			value: n,
			issues: []
		}, i);
		if (a instanceof Promise) throw new ni();
		return a.issues.length ? {
			success: !1,
			error: new (e ?? gi)(a.issues.map((e) => Or(e, i, Qr())))
		} : {
			success: !0,
			data: a.value
		};
	}, Ci = /* @__PURE__*/ Si(_i), wi = (e) => async (t, n, r) => {
		let i = r ? {
			...r,
			async: !0
		} : { async: !0 }, a = t._zod.run({
			value: n,
			issues: []
		}, i);
		return a instanceof Promise && (a = await a), a.issues.length ? {
			success: !1,
			error: new e(a.issues.map((e) => Or(e, i, Qr())))
		} : {
			success: !0,
			data: a.value
		};
	}, Ti = /* @__PURE__*/ wi(_i), Ei = (e) => {
		let t = bi(e), n = (e, r, i, a) => {
			let o = i ? {
				...i,
				direction: "backward"
			} : { direction: "backward" };
			return t(e, r, o, yi(n, a));
		};
		return n;
	}, Di = (e) => {
		let t = bi(e), n = (e, r, i, a) => t(e, r, i, yi(n, a));
		return n;
	}, Oi = (e) => {
		let t = xi(e), n = async (e, r, i, a) => {
			let o = i ? {
				...i,
				direction: "backward"
			} : { direction: "backward" };
			return await t(e, r, o, yi(n, a));
		};
		return n;
	}, ki = (e) => {
		let t = xi(e), n = async (e, r, i, a) => await t(e, r, i, yi(n, a));
		return n;
	}, Ai = (e) => (t, n, r) => {
		let i = r ? {
			...r,
			direction: "backward"
		} : { direction: "backward" };
		return Si(e)(t, n, i);
	}, ji = (e) => (t, n, r) => Si(e)(t, n, r), Mi = (e) => async (t, n, r) => {
		let i = r ? {
			...r,
			direction: "backward"
		} : { direction: "backward" };
		return wi(e)(t, n, i);
	}, Ni = (e) => async (t, n, r) => wi(e)(t, n, r);
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/regexes.js
function Fi(e) {
	return RegExp(`^[a-zA-Z0-9_-]{${e}}$`);
}
function Ii() {
	return new RegExp(Zi, "u");
}
function Li(e) {
	return RegExp(`^${e}$`);
}
function Ri(e) {
	let t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
	return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : e.seconds ? `${t}:[0-5]\\d(?:\\.\\d+)?` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function zi(e) {
	return RegExp(`^${Ri(e)}$`);
}
function Bi(e) {
	let t = ["Z"];
	e.offset && t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
	let n = `${Ri({
		precision: e.precision,
		seconds: !0
	})}(?:${t.join("|")})`, r = e.local ? `${n}|${Ri({ precision: e.precision })}` : n;
	return RegExp(`^${oa}T(?:${r})$`);
}
var Vi, Hi, Ui, Wi, Gi, Ki, qi, Ji, Yi, Xi, Zi, Qi, $i, ea, ta, na, ra, ia, aa, oa, sa, ca, la, ua, da, fa, pa, ma = v((() => {
	Vi = /^[cC][0-9a-z]{6,}$/, Hi = /^[0-9a-z]+$/, Ui = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, Wi = /^[0-9a-vA-V]{20}$/, Gi = /^[A-Za-z0-9]{27}$/, Ki = /^[a-zA-Z0-9_-]{21}$/, qi = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Ji = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Yi = (e) => e ? RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Xi = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Zi = "^[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$", Qi = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, $i = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, ea = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, ta = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, na = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, ra = /^[A-Za-z0-9_-]*$/, ia = /^https?$/, aa = /^\+[1-9]\d{6,14}$/, oa = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))", sa = /*@__PURE__*/ Li(oa), ca = (e) => {
		let t = e ? `[\\s\\S]{${e?.minimum ?? 0},${e?.maximum ?? ""}}` : "[\\s\\S]*";
		return RegExp(`^${t}$`);
	}, la = /^-?\d+$/, ua = /^-?\d+(?:\.\d+)?$/, da = /^(?:true|false)$/i, fa = /^[^A-Z]*$/, pa = /^[^a-z]*$/;
})), D, ha, ga, _a, va, ya, ba, xa, Sa, Ca, wa, Ta, Ea, Da, Oa, ka, Aa, ja, Ma = v((() => {
	ai(), ma(), Xr(), D = /*@__PURE__*/ E("$ZodCheck", (e, t) => {
		var n;
		e._zod ??= {}, e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
	}), ha = (e) => {
		let t = e.value;
		return !nr(t) && t.length !== void 0;
	}, ga = {
		number: "number",
		bigint: "bigint",
		object: "date"
	}, _a = /*@__PURE__*/ E("$ZodCheckLessThan", (e, t) => {
		D.init(e, t);
		let n = ga[typeof t.value];
		e._zod.onattach.push((e) => {
			let n = e._zod.bag, r = (t.inclusive ? n.maximum : n.exclusiveMaximum) ?? Infinity;
			t.value < r && (t.inclusive ? n.maximum = t.value : n.exclusiveMaximum = t.value);
		}), e._zod.check = (r) => {
			(t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
				origin: ga[typeof r.value] ?? n,
				code: "too_big",
				maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
				input: r.value,
				inclusive: t.inclusive,
				inst: e,
				continue: !t.abort
			});
		};
	}), va = /*@__PURE__*/ E("$ZodCheckGreaterThan", (e, t) => {
		D.init(e, t);
		let n = ga[typeof t.value];
		e._zod.onattach.push((e) => {
			let n = e._zod.bag, r = (t.inclusive ? n.minimum : n.exclusiveMinimum) ?? -Infinity;
			t.value > r && (t.inclusive ? n.minimum = t.value : n.exclusiveMinimum = t.value);
		}), e._zod.check = (r) => {
			(t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
				origin: ga[typeof r.value] ?? n,
				code: "too_small",
				minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
				input: r.value,
				inclusive: t.inclusive,
				inst: e,
				continue: !t.abort
			});
		};
	}), ya = /*@__PURE__*/ E("$ZodCheckMultipleOf", (e, t) => {
		D.init(e, t), e._zod.onattach.push((e) => {
			var n;
			(n = e._zod.bag).multipleOf ?? (n.multipleOf = t.value);
		}), e._zod.check = (n) => {
			if (typeof n.value != typeof t.value) throw Error("Cannot mix number and bigint in multiple_of check.");
			(typeof n.value == "bigint" ? t.value !== BigInt(0) && n.value % t.value === BigInt(0) : ir(n.value, t.value) === 0) || n.issues.push({
				origin: typeof n.value,
				code: "not_multiple_of",
				divisor: t.value,
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), ba = /*@__PURE__*/ E("$ZodCheckNumberFormat", (e, t) => {
		D.init(e, t), t.format = t.format || "float64";
		let n = t.format?.includes("int"), r = n ? "int" : "number", [i, a] = Wr[t.format];
		e._zod.onattach.push((e) => {
			let r = e._zod.bag;
			r.format = t.format, r.minimum = i, r.maximum = a, n && (r.pattern = la);
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
	}), xa = /*@__PURE__*/ E("$ZodCheckMaxLength", (e, t) => {
		var n;
		D.init(e, t), (n = e._zod.def).when ?? (n.when = ha), e._zod.onattach.push((e) => {
			let n = e._zod.bag.maximum ?? Infinity;
			t.maximum < n && (e._zod.bag.maximum = t.maximum);
		}), e._zod.check = (n) => {
			let r = n.value, i = r.length;
			if ((typeof r == "string" && i > t.maximum ? kr(r) : i) <= t.maximum) return;
			let a = Ar(r);
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
	}), Sa = /*@__PURE__*/ E("$ZodCheckMinLength", (e, t) => {
		var n;
		D.init(e, t), (n = e._zod.def).when ?? (n.when = ha), e._zod.onattach.push((e) => {
			let n = e._zod.bag.minimum ?? -Infinity;
			t.minimum > n && (e._zod.bag.minimum = t.minimum);
		}), e._zod.check = (n) => {
			let r = n.value, i = r.length;
			if ((typeof r == "string" && i >= t.minimum && i < t.minimum * 2 ? kr(r) : i) >= t.minimum) return;
			let a = Ar(r);
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
	}), Ca = /*@__PURE__*/ E("$ZodCheckLengthEquals", (e, t) => {
		var n;
		D.init(e, t), (n = e._zod.def).when ?? (n.when = ha), e._zod.onattach.push((e) => {
			let n = e._zod.bag;
			n.minimum = t.length, n.maximum = t.length, n.length = t.length;
		}), e._zod.check = (n) => {
			let r = n.value, i = r.length, a = typeof r == "string" && i >= t.length && i <= t.length * 2 ? kr(r) : i;
			if (a === t.length) return;
			let o = Ar(r), s = a > t.length;
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
	}), wa = /*@__PURE__*/ E("$ZodCheckStringFormat", (e, t) => {
		var n, r;
		D.init(e, t), e._zod.onattach.push((e) => {
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
	}), Ta = /*@__PURE__*/ E("$ZodCheckRegex", (e, t) => {
		wa.init(e, t), e._zod.check = (n) => {
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
	}), Ea = /*@__PURE__*/ E("$ZodCheckLowerCase", (e, t) => {
		t.pattern ??= fa, wa.init(e, t);
	}), Da = /*@__PURE__*/ E("$ZodCheckUpperCase", (e, t) => {
		t.pattern ??= pa, wa.init(e, t);
	}), Oa = /*@__PURE__*/ E("$ZodCheckIncludes", (e, t) => {
		D.init(e, t);
		let n = fr(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position},}${n}` : n);
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
	}), ka = /*@__PURE__*/ E("$ZodCheckStartsWith", (e, t) => {
		D.init(e, t);
		let n = RegExp(`^${fr(t.prefix)}.*`);
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
	}), Aa = /*@__PURE__*/ E("$ZodCheckEndsWith", (e, t) => {
		D.init(e, t);
		let n = RegExp(`.*${fr(t.suffix)}$`);
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
	}), ja = /*@__PURE__*/ E("$ZodCheckOverwrite", (e, t) => {
		D.init(e, t), e._zod.check = (e) => {
			e.value = t.tx(e.value);
		};
	});
})), Na, Pa = v((() => {
	Na = class {
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
})), Fa, Ia = v((() => {
	Fa = {
		major: 4,
		minor: 5,
		patch: 4
	};
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/schemas.js
function La(e) {
	return {
		validate: (t) => {
			try {
				return po(Ci(e, t));
			} catch {
				return Ti(e, t).then(po);
			}
		},
		vendor: "zod",
		version: 1
	};
}
function Ra(e, t) {
	if (!t.normalize && t.protocol?.source === ia.source && !/^https?:\/\//i.test(e)) return 1;
	try {
		return new URL(e);
	} catch {
		return 2;
	}
}
function za(e) {
	return e.replace(vo, "");
}
function Ba(e, t) {
	return t.lastIndex = 0, t.test(e.hostname);
}
function Va(e, t) {
	return t.lastIndex = 0, t.test(e.protocol.endsWith(":") ? e.protocol.slice(0, -1) : e.protocol);
}
function Ha(e) {
	if (!Mo.test(e)) return !1;
	try {
		return new URL(`http://[${e}]`), !0;
	} catch {
		return !1;
	}
}
function Ua(e) {
	let t = e.split("/");
	if (t.length !== 2) return !1;
	let [n, r] = t;
	if (!r) return !1;
	let i = Number(r);
	return `${i}` !== r || i < 0 || i > 128 ? !1 : Ha(n);
}
function Wa(e) {
	if (e === "") return !0;
	if (/\s/.test(e) || e.length % 4 != 0) return !1;
	try {
		return atob(e), !0;
	} catch {
		return !1;
	}
}
function Ga(e) {
	if (!ra.test(e)) return !1;
	let t = e.replace(/[-_]/g, (e) => e === "-" ? "+" : "/");
	return Wa(t.padEnd(Math.ceil(t.length / 4) * 4, "="));
}
function Ka(e, t = null) {
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
function qa(e, t, n) {
	e.issues.length && t.issues.push(...Tr(n, e.issues)), t.value[n] = e.value;
}
function Ja(e, t, n, r, i, a) {
	let o = n in r, s = a === "optional";
	if (o || !s || i !== "optional") {
		if (e.issues.length) {
			if (i !== void 0 && s && !o) return;
			t.issues.push(...Tr(n, e.issues));
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
function Ya(e) {
	let t = Object.keys(e.shape), n = Object.getOwnPropertySymbols(e.shape), r = n.length ? n : Ko, i = r.length ? [...t, ...r] : t;
	for (let t of i) if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${String(t)}": expected a Zod schema`);
	let a = hr(e.shape);
	return {
		...e,
		allKeys: i,
		symbolKeys: r,
		keySet: new Set(t),
		numKeys: t.length,
		optionalKeys: new Set(a)
	};
}
function Xa(e, t, n, r, i, a) {
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
		a instanceof Promise ? e.push(a.then((e) => Ja(e, n, i, t, u, d))) : Ja(a, n, i, t, u, d);
	}
	return o.length && n.issues.push({
		code: "unrecognized_keys",
		keys: o,
		input: t,
		inst: a,
		continue: !0
	}), e.length ? Promise.all(e).then(() => n) : n;
}
function Za(e, t, n, r) {
	for (let n of e) if (n.issues.length === 0) return t.value = n.value, t;
	let i = e.filter((e) => !Cr(e));
	return i.length === 1 ? (t.value = i[0].value, i[0]) : (t.issues.push({
		code: "invalid_union",
		input: t.value,
		inst: n,
		errors: e.map((e) => e.issues.map((e) => Or(e, r, Qr())))
	}), t);
}
function Qa(e, t) {
	if (e === t || e instanceof Date && t instanceof Date && +e == +t) return {
		valid: !0,
		data: e
	};
	if (ur(e) && ur(t)) {
		let n = Object.keys(t), r = Object.keys(e).filter((e) => n.indexOf(e) !== -1), i = {
			...e,
			...t
		};
		Object.prototype.hasOwnProperty.call(i, "__proto__") && delete i.__proto__;
		for (let n of r) {
			if (n === "__proto__") continue;
			let r = Qa(e[n], t[n]);
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
			let i = e[r], a = t[r], o = Qa(i, a);
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
function $a(e, t, n) {
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
	let c = Qa(t.value, n.value);
	if (!c.valid) {
		if (Cr(e)) return e;
		throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`);
	}
	return e.value = c.data, e;
}
function eo(e, t) {
	for (let n = e.length - 1; n >= 0; n--) if (!(t === "optin" ? e[n]._zod.optin !== void 0 : e[n]._zod.optout === "optional")) return n + 1;
	return 0;
}
function to(e, t, n) {
	e.issues.length && t.issues.push(...Tr(n, e.issues)), t.value[n] = e.value;
}
function no(e, t, n, r, i) {
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
			t.issues.push(...Tr(a, o.issues));
		}
		t.value[a] = o.value;
	}
	for (let e = t.value.length - 1; e >= r.length && n[e]._zod.optout === "optional" && t.value[e] === void 0; e--) t.value.length = e;
	return t;
}
function ro(e, t) {
	return e.value = t.issues.length ? void 0 : t.value, e;
}
function io(e, t) {
	return e.value === void 0 && (e.value = t.defaultValue), e;
}
function ao(e, t) {
	return !e.issues.length && e.value === void 0 && e.issues.push({
		code: "invalid_type",
		expected: "nonoptional",
		input: e.value,
		inst: t
	}), e;
}
function oo(e, t, n, r) {
	return t.issues.length ? (e.value = n.catchValue({
		...t,
		value: e.value,
		error: { issues: t.issues.map((e) => Or(e, r, Qr())) },
		input: e.value
	}), e) : (e.value = t.value, t.memo && (e.memo = !0), e);
}
function so(e, t, n) {
	return e.issues.some((e) => e.code !== "unrecognized_keys") ? (e.aborted = !0, e) : t._zod.run({
		value: e.value,
		issues: e.issues
	}, n);
}
function co(e, t, n) {
	if (e.issues.length) return e.aborted = !0, e;
	if ((n.direction || "forward") === "forward") {
		let r = t.transform(e.value, e);
		return r instanceof Promise ? r.then((r) => lo(e, r, t.out, n)) : lo(e, r, t.out, n);
	}
	{
		let r = t.reverseTransform(e.value, e);
		return r instanceof Promise ? r.then((r) => lo(e, r, t.in, n)) : lo(e, r, t.in, n);
	}
}
function lo(e, t, n, r) {
	return e.issues.length ? (e.aborted = !0, e) : n._zod.run({
		value: t,
		issues: e.issues
	}, r);
}
function uo(e) {
	return e.memo || (e.value = Object.freeze(e.value)), e;
}
function fo(e, t, n, r) {
	if (!e) {
		let e = {
			code: "custom",
			input: n,
			inst: r,
			path: [...r._zod.def.path ?? []],
			continue: !r._zod.def.abort
		};
		r._zod.def.params && (e.params = r._zod.def.params), t.issues.push(Mr(e));
	}
}
var O, po, mo, k, ho, go, _o, vo, yo, bo, xo, So, Co, wo, To, Eo, Do, Oo, ko, Ao, jo, Mo, No, Po, Fo, Io, Lo, Ro, zo, Bo, Vo, Ho, Uo, Wo, Go, Ko, qo, Jo, Yo, Xo, Zo, Qo, $o, es, ts, ns, rs, is, as, os, ss, cs, ls, us, ds, fs, ps, ms, hs, gs = v((() => {
	Ma(), ai(), Pa(), Pi(), ma(), Xr(), Ia(), O = /*@__PURE__*/ E("$ZodType", (e, t) => {
		var n;
		e ??= {}, e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Fa;
		let r = e._zod.def.checks, i = e._zod.traits.has("$ZodCheck") ? [e, ...r ?? []] : r?.length ? [...r] : [];
		for (let t of i) for (let n of t._zod.onattach) n(e);
		if (i.length === 0) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(() => {
			e._zod.run = e._zod.parse;
		});
		else {
			let t = (t, n, r) => {
				if (t.memo) return t;
				let i = Cr(t), a;
				for (let o of n) {
					if (o._zod.def.when) {
						if (wr(t) || !o._zod.def.when(t)) continue;
					} else if (i) continue;
					let n = t.issues.length, s = o._zod.check(t);
					if (s instanceof Promise && r?.async === !1) throw new ni();
					if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async () => {
						await s, t.issues.length !== n && (Dr(t.issues, n, e), i ||= Cr(t, n));
					});
					else {
						if (t.issues.length === n) continue;
						Dr(t.issues, n, e), i ||= Cr(t, n);
					}
				}
				return a ? a.then(() => t) : t;
			}, n = (n, r, a) => {
				if (Cr(n)) return n.aborted = !0, n;
				let o = t(r, i, a);
				if (o instanceof Promise) {
					if (a.async === !1) throw new ni();
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
					if (a.async === !1) throw new ni();
					return o.then((e) => t(e, i, a));
				}
				return t(o, i, a);
			};
		}
	}, {
		get "~standard"() {
			return Fr(this, "~standard", La(this));
		},
		set "~standard"(e) {
			Pr(this, "~standard", e);
		}
	}), po = (e) => e.success ? { value: e.data } : { issues: e.error?.issues }, mo = /*@__PURE__*/ E("$ZodString", (e, t) => {
		O.init(e, t), e._zod.pattern = [...e?._zod.bag?.patterns ?? []].pop() ?? ca(e._zod.bag), e._zod.parse = (n, r) => {
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
	}), k = /*@__PURE__*/ E("$ZodStringFormat", (e, t) => {
		wa.init(e, t), mo.init(e, t);
	}), ho = /*@__PURE__*/ E("$ZodGUID", (e, t) => {
		t.pattern ??= Ji, k.init(e, t);
	}), go = /*@__PURE__*/ E("$ZodUUID", (e, t) => {
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
			t.pattern ??= Yi(e);
		} else t.pattern ??= Yi();
		k.init(e, t);
	}), _o = /*@__PURE__*/ E("$ZodEmail", (e, t) => {
		t.pattern ??= Xi, k.init(e, t);
	}), vo = /[\t\n\r]/g, yo = /*@__PURE__*/ E("$ZodURL", (e, t) => {
		k.init(e, t), e._zod.check = (n) => {
			try {
				let r = n.value.trim(), i = Ra(r, t);
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
				t.hostname && !Ba(i, t.hostname) && n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid hostname",
					pattern: t.hostname.source,
					input: n.value,
					inst: e,
					continue: !t.abort
				}), t.protocol && !Va(i, t.protocol) && n.issues.push({
					code: "invalid_format",
					format: "url",
					note: "Invalid protocol",
					pattern: t.protocol.source,
					input: n.value,
					inst: e,
					continue: !t.abort
				}), n.value = t.normalize ? i.href : za(r);
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
	}), bo = /*@__PURE__*/ E("$ZodEmoji", (e, t) => {
		t.pattern ??= Ii(), k.init(e, t);
	}), xo = /*@__PURE__*/ E("$ZodNanoID", (e, t) => {
		if (t.length !== void 0 && (!Number.isInteger(t.length) || t.length < 1)) throw Error(`Invalid nanoid length: ${t.length}`);
		t.pattern ??= t.length === void 0 ? Ki : Fi(t.length), k.init(e, t);
	}), So = /*@__PURE__*/ E("$ZodCUID", (e, t) => {
		t.pattern ??= Vi, k.init(e, t);
	}), Co = /*@__PURE__*/ E("$ZodCUID2", (e, t) => {
		t.pattern ??= Hi, k.init(e, t);
	}), wo = /*@__PURE__*/ E("$ZodULID", (e, t) => {
		t.pattern ??= Ui, k.init(e, t);
	}), To = /*@__PURE__*/ E("$ZodXID", (e, t) => {
		t.pattern ??= Wi, k.init(e, t);
	}), Eo = /*@__PURE__*/ E("$ZodKSUID", (e, t) => {
		t.pattern ??= Gi, k.init(e, t);
	}), Do = /*@__PURE__*/ E("$ZodISODateTime", (e, t) => {
		t.pattern ??= Bi(t), k.init(e, t), (t.local || t.precision === -1) && (e._zod.bag.laxFormat = !0, e._zod.onattach.push((e) => {
			e._zod.bag.laxFormat = !0;
		}));
	}), Oo = /*@__PURE__*/ E("$ZodISODate", (e, t) => {
		t.pattern ??= sa, k.init(e, t);
	}), ko = /*@__PURE__*/ E("$ZodISOTime", (e, t) => {
		t.pattern ??= zi(t), k.init(e, t);
	}), Ao = /*@__PURE__*/ E("$ZodISODuration", (e, t) => {
		t.pattern ??= qi, k.init(e, t);
	}), jo = /*@__PURE__*/ E("$ZodIPv4", (e, t) => {
		t.pattern ??= Qi, k.init(e, t), e._zod.bag.format = "ipv4";
	}), Mo = /^[0-9a-fA-F:.]+$/, No = /*@__PURE__*/ E("$ZodIPv6", (e, t) => {
		t.pattern ??= $i, k.init(e, t), e._zod.bag.format = "ipv6", e._zod.check = (n) => {
			Ha(n.value) || n.issues.push({
				code: "invalid_format",
				format: "ipv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Po = /*@__PURE__*/ E("$ZodCIDRv4", (e, t) => {
		t.pattern ??= ea, k.init(e, t);
	}), Fo = /*@__PURE__*/ E("$ZodCIDRv6", (e, t) => {
		t.pattern ??= ta, k.init(e, t), e._zod.check = (n) => {
			Ua(n.value) || n.issues.push({
				code: "invalid_format",
				format: "cidrv6",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Io = /*@__PURE__*/ E("$ZodBase64", (e, t) => {
		t.pattern ??= na, k.init(e, t), e._zod.bag.contentEncoding = "base64", e._zod.check = (n) => {
			Wa(n.value) || n.issues.push({
				code: "invalid_format",
				format: "base64",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Lo = /*@__PURE__*/ E("$ZodBase64URL", (e, t) => {
		t.pattern ??= ra, k.init(e, t), e._zod.bag.contentEncoding = "base64url", e._zod.check = (n) => {
			Ga(n.value) || n.issues.push({
				code: "invalid_format",
				format: "base64url",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Ro = /*@__PURE__*/ E("$ZodE164", (e, t) => {
		t.pattern ??= aa, k.init(e, t);
	}), zo = /*@__PURE__*/ E("$ZodJWT", (e, t) => {
		k.init(e, t), e._zod.check = (n) => {
			Ka(n.value, t.alg) || n.issues.push({
				code: "invalid_format",
				format: "jwt",
				input: n.value,
				inst: e,
				continue: !t.abort
			});
		};
	}), Bo = /*@__PURE__*/ E("$ZodNumber", (e, t) => {
		O.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? ua, e._zod.parse = (n, r) => {
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
	}), Vo = /*@__PURE__*/ E("$ZodNumberFormat", (e, t) => {
		ba.init(e, t), Bo.init(e, t);
	}), Ho = /*@__PURE__*/ E("$ZodBoolean", (e, t) => {
		O.init(e, t), e._zod.pattern = da, e._zod.parse = (n, r) => {
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
	}), Uo = /*@__PURE__*/ E("$ZodUnknown", (e, t) => {
		O.init(e, t), e._zod.parse = (e) => e;
	}), Wo = /*@__PURE__*/ E("$ZodNever", (e, t) => {
		O.init(e, t), e._zod.parse = (t, n) => (t.issues.push({
			expected: "never",
			code: "invalid_type",
			input: t.value,
			inst: e
		}), t);
	}), Go = /*@__PURE__*/ E("$ZodArray", (e, t) => {
		O.init(e, t);
		let n = ii.memoizer;
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
				s instanceof Promise ? o.push(s.then((t) => qa(t, r, e))) : qa(s, r, e);
			}
			return o.length ? Promise.all(o).then(() => r) : r;
		};
	}), Ko = [], qo = /* @__PURE__ */ new WeakMap(), Jo = /*@__PURE__*/ E("$ZodObject", (e, t) => {
		if (O.init(e, t), !Object.getOwnPropertyDescriptor(t, "shape")?.get) {
			let e = t.shape;
			qo.set(t, e), Object.defineProperty(t, "shape", { get: () => {
				let n = { ...e };
				return Object.defineProperty(t, "shape", { value: n }), qo.set(t, n), n;
			} });
		}
		let n = tr(() => Ya(t));
		T(e, "propValues", (e) => {
			let t = e.def.shape, n = {};
			for (let e in t) {
				let r = t[e]._zod;
				if (r.values) {
					Object.prototype.hasOwnProperty.call(n, e) || C(n, e, /* @__PURE__ */ new Set());
					for (let t of r.values) n[e].add(t);
					r.optin !== void 0 && n[e].add(void 0);
				}
			}
			return n;
		});
		let r = lr, i = t.catchall, a, o = ii.memoizer;
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
				a instanceof Promise ? l.push(a.then((n) => Ja(n, t, e, c, r, i))) : Ja(a, t, e, c, r, i);
			}
			return i ? Xa(l, c, t, s, n.value, e) : l.length ? Promise.all(l).then(() => t) : t;
		};
	}), Yo = /*@__PURE__*/ E("$ZodObjectJIT", (e, t) => {
		Jo.init(e, t);
		let n = e._zod.parse, r = tr(() => Ya(t)), i = ii.memoizer, a = (t) => {
			let n = r.value, a = n.symbolKeys, o = new Na(["payload", "ctx"], {
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
				let n = l[e], r = typeof e == "symbol" ? `syms[${a.indexOf(e)}]` : sr(e), i = `${r} in input`, u = t[e], d = u?._zod?.optin, f = d !== void 0, p = u?._zod?.optout === "optional";
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
		}, o, s = lr, c = !ii.jitless, l = c && Hr.value, u = t.catchall, d;
		e._zod.parse = (i, f) => {
			d ??= r.value;
			let p = i.value;
			return s(p) ? c && l && f?.async === !1 && f.jitless !== !0 ? (o ||= a(t.shape), i = o(i, f), u ? Xa([], p, i, f, d, e) : i) : n(i, f) : (i.issues.push({
				expected: "object",
				code: "invalid_type",
				input: p,
				inst: e
			}), i);
		};
	}), Xo = /*@__PURE__*/ E("$ZodUnion", (e, t) => {
		O.init(e, t), T(e, "optin", (e) => e.def.options.some((e) => e._zod.optin === "defaulted") ? "defaulted" : e.def.options.some((e) => e._zod.optin !== void 0) ? "optional" : void 0), T(e, "optout", (e) => e.def.options.some((e) => e._zod.optout === "optional") ? "optional" : void 0), T(e, "values", (e) => {
			if (e.def.options.every((e) => e._zod.values)) return new Set(e.def.options.flatMap((e) => Array.from(e._zod.values)));
		}), T(e, "pattern", (e) => {
			if (e.def.options.every((e) => e._zod.pattern)) {
				let t = e.def.options.map((e) => e._zod.pattern);
				return RegExp(`^(${t.map((e) => rr(e.source)).join("|")})$`);
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
			return a ? Promise.all(o).then((t) => Za(t, r, e, i)) : Za(o, r, e, i);
		};
	}), Zo = /*@__PURE__*/ E("$ZodDiscriminatedUnion", (e, t) => {
		t.inclusive = !1, Xo.init(e, t);
		let n = e._zod.parse;
		T(e, "propValues", (e) => {
			let t = {};
			for (let n of e.def.options) {
				let r = n._zod.propValues;
				if (!r || Object.keys(r).length === 0) throw Error(`Invalid discriminated union option at index "${e.def.options.indexOf(n)}"`);
				for (let [e, n] of Object.entries(r)) {
					Object.prototype.hasOwnProperty.call(t, e) || C(t, e, /* @__PURE__ */ new Set());
					for (let r of n) t[e].add(r);
				}
			}
			return t;
		}), t.options.forEach((e, n) => {
			let r = qo.get(e._zod.def);
			if (r && !Object.prototype.hasOwnProperty.call(r, t.discriminator)) throw Error(`Invalid discriminated union option at index "${n}"`);
		});
		let r = tr(() => {
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
			if (!lr(o)) return i.issues.push({
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
	}), Qo = /*@__PURE__*/ E("$ZodIntersection", (e, t) => {
		O.init(e, t), e._zod.parse = (e, n) => {
			let r = e.value, i = t.left._zod.run({
				value: r,
				issues: []
			}, n), a = t.right._zod.run({
				value: r,
				issues: []
			}, n);
			return i instanceof Promise || a instanceof Promise ? Promise.all([i, a]).then(([t, n]) => $a(e, t, n)) : $a(e, i, a);
		};
	}), $o = /*@__PURE__*/ E("$ZodTuple", (e, t) => {
		O.init(e, t);
		let n = t.items, r = ii.memoizer;
		r?.attach(e), e._zod.parse = (i, a) => {
			let o = i.value;
			if (!Array.isArray(o)) return i.issues.push({
				input: o,
				inst: e,
				expected: "tuple",
				code: "invalid_type"
			}), i;
			i.value = r ? r.alloc(e, i, [], a) : [];
			let s = [], c = eo(n, "optin"), l = eo(n, "optout");
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
					r instanceof Promise ? s.push(r.then((t) => to(t, i, e))) : to(r, i, e);
				}
			}
			return s.length ? Promise.all(s).then(() => no(u, i, n, o, l)) : no(u, i, n, o, l);
		};
	}), es = /*@__PURE__*/ E("$ZodRecord", (e, t) => {
		O.init(e, t);
		let n = ii.memoizer;
		n?.attach(e), e._zod.parse = (r, i) => {
			let a = r.value;
			if (!ur(a)) return r.issues.push({
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
							issues: s.issues.map((e) => Or(e, i, Qr())),
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
						e.issues.length && r.issues.push(...Tr(n, e.issues)), r.value[l] = e.value;
					})) : (u.issues.length && r.issues.push(...Tr(n, u.issues)), r.value[l] = u.value);
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
					if (typeof n == "string" && ua.test(n) && l.issues.length) {
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
							issues: l.issues.map((e) => Or(e, i, Qr())),
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
						e.issues.length && r.issues.push(...Tr(n, e.issues)), r.value[u] = e.value;
					})) : (d.issues.length && r.issues.push(...Tr(n, d.issues)), r.value[u] = d.value);
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
	}), ts = /*@__PURE__*/ E("$ZodEnum", (e, t) => {
		O.init(e, t);
		let n = Qn(t.entries), r = new Set(n);
		e._zod.values = r;
		let i = n.filter((e) => Ur.has(typeof e));
		e._zod.pattern = RegExp(i.length ? `^(${i.map((e) => fr(e.toString())).join("|")})$` : "^[^\\s\\S]$"), e._zod.parse = (t, i) => {
			let a = t.value;
			return r.has(a) || t.issues.push({
				code: "invalid_value",
				values: n,
				input: a,
				inst: e
			}), t;
		};
	}), ns = /*@__PURE__*/ E("$ZodLiteral", (e, t) => {
		O.init(e, t);
		let n = new Set(t.values);
		e._zod.values = n, e._zod.pattern = RegExp(t.values.length ? `^(${t.values.map((e) => typeof e == "string" ? fr(e) : e ? fr(e.toString()) : String(e)).join("|")})$` : "^[^\\s\\S]$"), e._zod.parse = (r, i) => {
			let a = r.value;
			return n.has(a) || r.issues.push({
				code: "invalid_value",
				values: t.values,
				input: a,
				inst: e
			}), r;
		};
	}), rs = /*@__PURE__*/ E("$ZodTransform", (e, t) => {
		O.init(e, t), e._zod.optin = "optional", ii.memoizer?.guard(e), e._zod.parse = (n, r) => {
			if (r.direction === "backward") throw new ri(e.constructor.name);
			let i = t.transform(n.value, n);
			if (r.async) return (i instanceof Promise ? i : Promise.resolve(i)).then((e) => (n.value = e, n));
			if (i instanceof Promise) throw new ni();
			return n.value = i, n;
		};
	}), is = /*@__PURE__*/ E("$ZodOptional", (e, t) => {
		O.init(e, t), T(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), e._zod.optout = "optional", T(e, "values", (e) => {
			let t = e.def.innerType._zod.values;
			return t ? /* @__PURE__ */ new Set([...t, void 0]) : void 0;
		}), T(e, "pattern", (e) => {
			let t = e.def.innerType._zod.pattern;
			return t ? RegExp(`^(${rr(t.source)})?$`) : void 0;
		}), e._zod.parse = (e, n) => {
			if (e.value === void 0) {
				if (t.innerType._zod.optin !== "defaulted") return e;
				let r = t.innerType._zod.run({
					value: e.value,
					issues: []
				}, n);
				return r instanceof Promise ? r.then((t) => ro(e, t)) : ro(e, r);
			}
			return t.innerType._zod.run(e, n);
		};
	}), as = /*@__PURE__*/ E("$ZodExactOptional", (e, t) => {
		is.init(e, t), T(e, "values", (e) => e.def.innerType._zod.values), T(e, "pattern", (e) => e.def.innerType._zod.pattern), e._zod.parse = (e, n) => t.innerType._zod.run(e, n);
	}), os = /*@__PURE__*/ E("$ZodNullable", (e, t) => {
		O.init(e, t), T(e, "optin", (e) => e.def.innerType._zod.optin), T(e, "optout", (e) => e.def.innerType._zod.optout), T(e, "pattern", (e) => {
			let t = e.def.innerType._zod.pattern;
			return t ? RegExp(`^(${rr(t.source)}|null)$`) : void 0;
		}), T(e, "values", (e) => e.def.innerType._zod.values ? /* @__PURE__ */ new Set([...e.def.innerType._zod.values, null]) : void 0), e._zod.parse = (e, n) => e.value === null ? e : t.innerType._zod.run(e, n);
	}), ss = /*@__PURE__*/ E("$ZodDefault", (e, t) => {
		O.init(e, t), e._zod.optin = "defaulted", T(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			if (e.value === void 0) return e.value = t.defaultValue, e;
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => io(e, t)) : io(r, t);
		};
	}), cs = /*@__PURE__*/ E("$ZodPrefault", (e, t) => {
		O.init(e, t), e._zod.optin = "defaulted", T(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => (n.direction === "backward" || e.value === void 0 && (e.value = t.defaultValue), t.innerType._zod.run(e, n));
	}), ls = /*@__PURE__*/ E("$ZodNonOptional", (e, t) => {
		O.init(e, t), T(e, "values", (e) => {
			let t = e.def.innerType._zod.values;
			return t ? new Set([...t].filter((e) => e !== void 0)) : void 0;
		}), e._zod.parse = (n, r) => {
			let i = t.innerType._zod.run(n, r);
			return i instanceof Promise ? i.then((t) => ao(t, e)) : ao(i, e);
		};
	}), us = /*@__PURE__*/ E("$ZodCatch", (e, t) => {
		O.init(e, t), T(e, "optin", (e) => e.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), T(e, "optout", (e) => e.def.innerType._zod.optout), T(e, "values", (e) => e.def.innerType._zod.values), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			let r = t.innerType._zod.run({
				value: e.value,
				issues: []
			}, n);
			return r instanceof Promise ? r.then((r) => oo(e, r, t, n)) : oo(e, r, t, n);
		};
	}), ds = /*@__PURE__*/ E("$ZodPipe", (e, t) => {
		O.init(e, t), T(e, "values", (e) => e.def.in._zod.values), T(e, "optin", (e) => e.def.in._zod.optin), T(e, "optout", (e) => e.def.out._zod.optout), T(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
			if (n.direction === "backward") {
				let r = t.out._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => so(e, t.in, n)) : so(r, t.in, n);
			}
			let r = t.in._zod.run(e, n);
			return r instanceof Promise ? r.then((e) => so(e, t.out, n)) : so(r, t.out, n);
		};
	}), fs = /*@__PURE__*/ E("$ZodCodec", (e, t) => {
		O.init(e, t), T(e, "values", (e) => e.def.in._zod.values), T(e, "optin", (e) => e.def.in._zod.optin), T(e, "optout", (e) => e.def.out._zod.optout), T(e, "propValues", (e) => e.def.in._zod.propValues), e._zod.parse = (e, n) => {
			if ((n.direction || "forward") === "forward") {
				let r = t.in._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => co(e, t, n)) : co(r, t, n);
			}
			{
				let r = t.out._zod.run(e, n);
				return r instanceof Promise ? r.then((e) => co(e, t, n)) : co(r, t, n);
			}
		};
	}), ps = /*@__PURE__*/ E("$ZodReadonly", (e, t) => {
		O.init(e, t), T(e, "propValues", (e) => e.def.innerType._zod.propValues), T(e, "values", (e) => e.def.innerType._zod.values), T(e, "optin", (e) => e.def.innerType?._zod?.optin), T(e, "optout", (e) => e.def.innerType?._zod?.optout), e._zod.parse = (e, n) => {
			if (n.direction === "backward") return t.innerType._zod.run(e, n);
			let r = t.innerType._zod.run(e, n);
			return r instanceof Promise ? r.then(uo) : uo(r);
		};
	}), ms = /*@__PURE__*/ E("$ZodLazy", (e, t) => {
		O.init(e, t), ar(e._zod, "innerType", () => {
			let e = t;
			return e._cachedInner ||= t.getter(), e._cachedInner;
		}), T(e, "pattern", (e) => e.innerType?._zod?.pattern), T(e, "propValues", (e) => e.innerType?._zod?.propValues), T(e, "optin", (e) => e.innerType?._zod?.optin ?? void 0), T(e, "optout", (e) => e.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n) => e._zod.innerType._zod.run(t, n);
	}), hs = /*@__PURE__*/ E("$ZodCustom", (e, t) => {
		D.init(e, t), O.init(e, t), e._zod.parse = (e, t) => e, e._zod.check = (n) => {
			let r = n.value, i = t.fn(r);
			if (i instanceof Promise) return i.then((t) => fo(t, n, r, e));
			fo(i, n, r, e);
		};
	});
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/memoizer.js
function _s(e) {
	return e.map((e) => e.path ? {
		...e,
		path: e.path.slice()
	} : { ...e });
}
function vs(e, t) {
	let n = Ts.get(e);
	if (n !== void 0) return n;
	if (t.has(e)) return !0;
	t.add(e);
	let r = !1, i = (e) => {
		!r && e?._zod && vs(e, t) && (r = !0);
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
	return t.delete(e), Ts.set(e, r), r;
}
function ys(e, t) {
	let n = e.buckets.get(t);
	return n || (n = /* @__PURE__ */ new Map(), e.buckets.set(t, n)), n;
}
function bs() {
	return Os;
}
function xs(e, t) {
	let n = e[Cs]?.backEdges;
	return n !== void 0 && typeof t == "object" && !!t && n.has(t);
}
var Ss, Cs, ws, Ts, Es, Ds, Os, ks = v((() => {
	Ss = class extends Error {
		constructor() {
			super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
		}
	}, Cs = "~memo", ws = [], Ts = /*@__PURE__*/ new WeakMap(), Ds = [], Os = {
		alloc(e, t, n) {
			let r = Es;
			if (!r) return n;
			Es = void 0;
			let i = {
				value: n,
				issues: null
			};
			return r.set(t.value, i), Ds.push(i), n;
		},
		guard(e) {
			var t;
			(t = e._zod).deferred ?? (t.deferred = []), e._zod.deferred.push(() => {
				let t = e._zod.parse, n = (e, n) => {
					if (n.direction !== "backward" && xs(n, e.value)) throw new Ss();
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
					if (n === void 0 && (n = vs(e, /* @__PURE__ */ new Set()), !n)) return e._zod.parse = t, e._zod.run === a && (e._zod.run = t), t(o, s);
					let c = o.value;
					if (typeof c != "object" || !c) return t(o, s);
					let l = s[Cs];
					l || (l = {
						buckets: /* @__PURE__ */ new Map(),
						backEdges: void 0
					}, s[Cs] = l);
					let u;
					r === s ? u = i : (u = ys(l, e), r = s, i = u);
					let d = u.get(c);
					if (d) return o.value = d.value, d.issues ? d.issues.length && o.issues.push(..._s(d.issues)) : (o.memo = !0, l.backEdges ?? (l.backEdges = /* @__PURE__ */ new Set()), l.backEdges.add(d.value)), o;
					Es = u;
					let f = Ds.length, p = t(o, s);
					Es = void 0;
					let m = Ds.length > f ? Ds.pop() : void 0;
					return p instanceof Promise ? p.then((e) => (m && (m.issues = e.issues.length ? _s(e.issues) : ws), e)) : (m && (m.issues = p.issues.length ? _s(p.issues) : ws), p);
				};
				e._zod.parse = a, e._zod.run === t && (e._zod.run = a);
			});
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/locales/en.js
function As() {
	return { localeError: js() };
}
var js, Ms = v((() => {
	Xr(), js = () => {
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
				case "invalid_type": return `Invalid input: expected ${i(e.expected)}, received ${i(jr(e.input), e.input)}`;
				case "invalid_value": return e.values.length === 1 ? `Invalid input: expected ${mr(e.values[0])}` : `Invalid option: expected one of ${$n(e.values, "|")}`;
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
				case "unrecognized_keys": return `Unrecognized key${e.keys.length > 1 ? "s" : ""}: ${$n(e.keys, ", ")}`;
				case "invalid_key": return `Invalid key in ${e.origin}`;
				case "invalid_union": return e.options && Array.isArray(e.options) && e.options.length > 0 ? `Invalid discriminator value. Expected ${e.options.map((e) => `'${e}'`).join(" | ")}` : e.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
				case "invalid_element": return `Invalid value in ${e.origin}`;
				default: return "Invalid input";
			}
		};
	};
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/registries.js
function Ns() {
	return new Fs();
}
var Ps, Fs, Is, Ls = v((() => {
	Fs = class {
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
	}, (Ps = globalThis).__zod_globalRegistry ?? (Ps.__zod_globalRegistry = Ns()), Is = globalThis.__zod_globalRegistry;
})), Rs = v((() => {}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/api.js
// @__NO_SIDE_EFFECTS__
function zs(e, t) {
	return new e({
		type: "string",
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Bs(e, t) {
	return new e({
		type: "string",
		format: "email",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Vs(e, t) {
	return new e({
		type: "string",
		format: "guid",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Hs(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Us(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v4",
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ws(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v6",
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Gs(e, t) {
	return new e({
		type: "string",
		format: "uuid",
		check: "string_format",
		abort: !1,
		version: "v7",
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ks(e, t) {
	return new e({
		type: "string",
		format: "url",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function qs(e, t) {
	return new e({
		type: "string",
		format: "emoji",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Js(e, t) {
	return new e({
		type: "string",
		format: "nanoid",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Ys(e, t) {
	return new e({
		type: "string",
		format: "cuid",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Xs(e, t) {
	return new e({
		type: "string",
		format: "cuid2",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Zs(e, t) {
	return new e({
		type: "string",
		format: "ulid",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function Qs(e, t) {
	return new e({
		type: "string",
		format: "xid",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function $s(e, t) {
	return new e({
		type: "string",
		format: "ksuid",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ec(e, t) {
	return new e({
		type: "string",
		format: "ipv4",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function tc(e, t) {
	return new e({
		type: "string",
		format: "ipv6",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function nc(e, t) {
	return new e({
		type: "string",
		format: "cidrv4",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function rc(e, t) {
	return new e({
		type: "string",
		format: "cidrv6",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ic(e, t) {
	return new e({
		type: "string",
		format: "base64",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function ac(e, t) {
	return new e({
		type: "string",
		format: "base64url",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function oc(e, t) {
	return new e({
		type: "string",
		format: "e164",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function sc(e, t) {
	return new e({
		type: "string",
		format: "jwt",
		check: "string_format",
		abort: !1,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function cc(e, t) {
	return new e({
		type: "string",
		format: "datetime",
		check: "string_format",
		offset: !1,
		local: !1,
		precision: null,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function lc(e, t) {
	return new e({
		type: "string",
		format: "date",
		check: "string_format",
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function uc(e, t) {
	return new e({
		type: "string",
		format: "time",
		check: "string_format",
		precision: null,
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function dc(e, t) {
	return new e({
		type: "string",
		format: "duration",
		check: "string_format",
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function fc(e, t) {
	return new e({
		type: "number",
		checks: [],
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function pc(e, t) {
	return new e({
		type: "number",
		coerce: !0,
		checks: [],
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function mc(e, t) {
	return new e({
		type: "number",
		check: "number_format",
		abort: !1,
		format: "safeint",
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function hc(e, t) {
	return new e({
		type: "boolean",
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function gc(e) {
	return new e({ type: "unknown" });
}
// @__NO_SIDE_EFFECTS__
function _c(e, t) {
	return new e({
		type: "never",
		...w(t)
	});
}
// @__NO_SIDE_EFFECTS__
function vc(e, t) {
	return new _a({
		check: "less_than",
		...w(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function yc(e, t) {
	return new _a({
		check: "less_than",
		...w(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function bc(e, t) {
	return new va({
		check: "greater_than",
		...w(t),
		value: e,
		inclusive: !1
	});
}
// @__NO_SIDE_EFFECTS__
function xc(e, t) {
	return new va({
		check: "greater_than",
		...w(t),
		value: e,
		inclusive: !0
	});
}
// @__NO_SIDE_EFFECTS__
function Sc(e, t) {
	return new ya({
		check: "multiple_of",
		...w(t),
		value: e
	});
}
// @__NO_SIDE_EFFECTS__
function Cc(e, t) {
	return new xa({
		check: "max_length",
		...w(t),
		maximum: e
	});
}
// @__NO_SIDE_EFFECTS__
function wc(e, t) {
	return new Sa({
		check: "min_length",
		...w(t),
		minimum: e
	});
}
// @__NO_SIDE_EFFECTS__
function Tc(e, t) {
	return new Ca({
		check: "length_equals",
		...w(t),
		length: e
	});
}
// @__NO_SIDE_EFFECTS__
function Ec(e, t) {
	return new Ta({
		check: "string_format",
		format: "regex",
		...w(t),
		pattern: e
	});
}
// @__NO_SIDE_EFFECTS__
function Dc(e) {
	return new Ea({
		check: "string_format",
		format: "lowercase",
		...w(e)
	});
}
// @__NO_SIDE_EFFECTS__
function Oc(e) {
	return new Da({
		check: "string_format",
		format: "uppercase",
		...w(e)
	});
}
// @__NO_SIDE_EFFECTS__
function kc(e, t) {
	return new Oa({
		check: "string_format",
		format: "includes",
		...w(t),
		includes: e
	});
}
// @__NO_SIDE_EFFECTS__
function Ac(e, t) {
	return new ka({
		check: "string_format",
		format: "starts_with",
		...w(t),
		prefix: e
	});
}
// @__NO_SIDE_EFFECTS__
function jc(e, t) {
	return new Aa({
		check: "string_format",
		format: "ends_with",
		...w(t),
		suffix: e
	});
}
// @__NO_SIDE_EFFECTS__
function Mc(e) {
	return new ja({
		check: "overwrite",
		tx: e
	});
}
// @__NO_SIDE_EFFECTS__
function Nc(e) {
	return /* @__PURE__ */ Mc((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function Pc() {
	return /* @__PURE__ */ Mc((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function Fc() {
	return /* @__PURE__ */ Mc((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function Ic() {
	return /* @__PURE__ */ Mc((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function Lc() {
	return /* @__PURE__ */ Mc((e) => cr(e));
}
// @__NO_SIDE_EFFECTS__
function Rc(e, t, n) {
	return new e({
		type: "array",
		element: t,
		...w(n)
	});
}
// @__NO_SIDE_EFFECTS__
function zc(e, t, n) {
	return new e({
		type: "custom",
		check: "custom",
		fn: t,
		...w(n)
	});
}
// @__NO_SIDE_EFFECTS__
function Bc(e, t) {
	let n = /* @__PURE__ */ Vc((t) => (t.addIssue = (e) => {
		if (typeof e == "string") t.issues.push(Mr(e, t.value, n._zod.def));
		else {
			let r = e;
			r.fatal && (r.continue = !1), r.code ??= "custom", "input" in r || (r.input = t.value), r.inst ??= n, r.continue ??= !n._zod.def.abort, t.issues.push(Mr(r));
		}
	}, e(t.value, t)), t);
	return n;
}
// @__NO_SIDE_EFFECTS__
function Vc(e, t) {
	let n = new D({
		check: "custom",
		...w(t)
	});
	return n._zod.check = e, n;
}
// @__NO_SIDE_EFFECTS__
function Hc(e, t) {
	let n = w(t), r = n.truthy ?? [
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
	let a = new Set(r), o = new Set(i), s = e.Codec ?? fs, c = e.Boolean ?? Ho, l = new s({
		type: "pipe",
		in: new (e.String ?? mo)({
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
var Uc = v((() => {
	Ma(), gs(), Xr();
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/to-json-schema.js
function Wc(e, ...t) {
	for (let n of t) for (let t of Reflect.ownKeys(n)) Object.prototype.propertyIsEnumerable.call(n, t) && C(e, t, n[t]);
	return e;
}
function Gc(e) {
	let t = e?.target ?? "draft-2020-12";
	return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
		processors: e.processors ?? {},
		metadataRegistry: e?.metadata ?? Is,
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
function A(e, t, n, r, i) {
	let a = typeof t.unrepresentable == "function" ? t.unrepresentable({
		zodSchema: e,
		path: r.path,
		message: i
	}) : t.unrepresentable;
	if (a === "any") return !1;
	if (a === void 0 || a === "throw") throw Error(i);
	return Object.assign(n, a), !0;
}
function j(e, t, n = {
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
		a && (o.ref ||= a, j(a, t, r), t.seen.get(a).isParent = !0);
	}
	let c = t.metadataRegistry.get(e);
	return c && Wc(o.schema, c), t.io === "input" && $c(e) && (delete o.schema.examples, delete o.schema.default), t.io === "input" && "_prefault" in o.schema && ((r = o.schema).default ?? (r.default = o.schema._prefault)), delete o.schema._prefault, t.seen.get(e).schema;
}
function Kc(e) {
	return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
function qc(e, t) {
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
				ref: `${i("__shared")}#/${r}/${Kc(a)}`
			};
		}
		let i = `#/${r}/`;
		if (t[1] === n && !t[1].schema.id) return { ref: "#" };
		let a = t[1].schema.id ?? `__schema${e.counter++}`;
		return {
			defId: a,
			ref: i + Kc(a)
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
function Jc(e) {
	let t = e.anyOf;
	if (!Array.isArray(t) || t.length === 0 || e.type !== void 0) return;
	let n = [];
	for (let e of t) {
		if (!e || typeof e != "object") return;
		Jc(e);
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
function Yc(e) {
	let t = e.additionalProperties;
	return t === void 0 || t === !1 || typeof t != "object" || !t ? null : Object.keys(t).length ? t : null;
}
function Xc(e) {
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || n.type !== "object") return null;
		for (let e in n) if (!el.has(e)) return null;
		t.push(n);
	}
	let n = {}, r = /* @__PURE__ */ new Set();
	for (let e of t) {
		for (let r in e.properties) {
			if (Object.prototype.hasOwnProperty.call(n, r)) continue;
			let e = [];
			for (let n of t) {
				let t = n.properties?.[r] ?? Yc(n);
				t != null && (e.some((e) => JSON.stringify(e) === JSON.stringify(t)) || e.push(t));
			}
			C(n, r, e.length === 1 ? e[0] : Xc(e) ?? { allOf: e });
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
			let t = Yc(n);
			t && !e.some((e) => JSON.stringify(e) === JSON.stringify(t)) && e.push(t);
		}
		e.length === 1 ? i.additionalProperties = e[0] : e.length > 1 && (i.additionalProperties = { allOf: e });
	}
	return i;
}
function Zc(e) {
	let t = e.allOf;
	if (!Array.isArray(t) || t.length < 2) return;
	for (let t of el) if (t in e) return;
	let n = t.filter((e) => tl.some((t) => Array.isArray(e[t]))), r = null;
	if (!n.length) r = Xc(t);
	else {
		let e = n[0], i = tl.find((t) => Array.isArray(e[t]));
		if (Object.keys(e).length !== 1) return;
		let a = t.filter((t) => t !== e), o = e[i].map((e) => Xc([...a, e]));
		if (o.some((e) => !e)) return;
		r = { [i]: o };
	}
	r && (delete e.allOf, Wc(e, r));
}
function Qc(e, t) {
	let n = e.seen.get(t);
	if (!n) throw Error("Unprocessed schema. This is a bug in Zod.");
	let r = (t) => {
		let n = e.seen.get(t);
		if (n.ref === null) return;
		let i = n.def ?? n.schema, a = { ...i }, o = n.ref;
		if (n.ref = null, o) {
			r(o);
			let n = e.seen.get(o), s = n.schema;
			if (s.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (i.allOf = i.allOf ?? [], i.allOf.push(s)) : Wc(i, s), Wc(i, a), t._zod.parent === o) for (let e in i) e !== "$ref" && e !== "allOf" && (e in a || delete i[e]);
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
		if (e.target !== "openapi-3.0") for (let t of e.seen.entries()) Jc(t[1].def ?? t[1].schema);
		for (let t of e.deferred) t();
		if (e.intersections.length) {
			let t = /* @__PURE__ */ new Map();
			for (let n of e.seen.values()) for (let e of [n.schema, n.def]) {
				let n = e?.allOf;
				if (!Array.isArray(n)) continue;
				let r = t.get(n);
				r ? r.push(e) : t.set(n, [e]);
			}
			for (let n of e.intersections) for (let e of t.get(n) ?? []) Zc(e);
		}
	}
	let i = {};
	if (e.target === "draft-2020-12" ? i.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? i.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? i.$schema = "http://json-schema.org/draft-04/schema#" : e.target, e.external?.uri) {
		let n = e.external.registry.get(t)?.id;
		if (!n) throw Error("Schema is missing an `id` property");
		i.$id = e.external.uri(n);
	}
	Wc(i, n.defId ? n.schema : n.def ?? n.schema);
	let a = e.metadataRegistry.get(t)?.id;
	a !== void 0 && i.id === a && delete i.id;
	let o = e.external?.defs ?? {};
	if (!e.external || e.sharedEmitDoneFor !== e.external) for (let t of e.seen.entries()) {
		let e = t[1];
		e.def && e.defId && (e.def.id === e.defId && delete e.def.id, C(o, e.defId, e.def));
	}
	e.external && (e.sharedEmitDoneFor = e.external), e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? i.$defs = o : i.definitions = o);
	try {
		let n = JSON.parse(JSON.stringify(i));
		return Object.defineProperty(n, "~standard", {
			value: {
				...t["~standard"],
				jsonSchema: {
					input: rl(t, "input", e.processors),
					output: rl(t, "output", e.processors)
				}
			},
			enumerable: !1,
			writable: !1
		}), n;
	} catch {
		throw Error("Error converting schema to JSON.");
	}
}
function $c(e, t) {
	let n = t ?? { seen: /* @__PURE__ */ new Set() };
	if (n.seen.has(e)) return !1;
	n.seen.add(e);
	let r = e._zod.def;
	if (r.type === "transform") return !0;
	if (r.type === "array") return $c(r.element, n);
	if (r.type === "set") return $c(r.valueType, n);
	if (r.type === "lazy") return $c(r.getter(), n);
	if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault" || r.type === "catch") return $c(r.innerType, n);
	if (r.type === "intersection") return $c(r.left, n) || $c(r.right, n);
	if (r.type === "record" || r.type === "map") return $c(r.keyType, n) || $c(r.valueType, n);
	if (r.type === "pipe") return e._zod.traits.has("$ZodCodec") ? !0 : $c(r.in, n) || $c(r.out, n);
	if (r.type === "object") {
		for (let e in r.shape) if ($c(r.shape[e], n)) return !0;
		return !1;
	}
	if (r.type === "union") {
		for (let e of r.options) if ($c(e, n)) return !0;
		return !1;
	}
	if (r.type === "tuple") {
		for (let e of r.items) if ($c(e, n)) return !0;
		return !!(r.rest && $c(r.rest, n));
	}
	return !1;
}
var el, tl, nl, rl, il = v((() => {
	Ls(), Xr(), el = /* @__PURE__ */ new Set([
		"type",
		"properties",
		"required",
		"additionalProperties"
	]), tl = ["oneOf", "anyOf"], nl = (e, t = {}) => (n) => {
		let r = Gc({
			...n,
			processors: t
		});
		return j(e, r), qc(r, e), Qc(r, e);
	}, rl = (e, t, n = {}) => (r) => {
		let { libraryOptions: i, target: a } = r ?? {}, o = Gc({
			...i ?? {},
			target: a,
			io: t,
			processors: n
		});
		return j(e, o), qc(o, e), Qc(o, e);
	};
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/core/json-schema-processors.js
function al(e) {
	let t = e._zod.def;
	return t.type === "pipe" && t.in._zod.traits.has("$ZodTransform") ? al(t.out) : t.type === "catch" ? al(t.innerType) : e._zod.optin;
}
function ol(e, t, n) {
	if (t.$ref) {
		if (n.has(t)) return t;
		n.add(t);
		let r = e.get(t)?.def;
		if (!r) return t;
		let i = ol(e, r, n);
		return i === r ? t : i;
	}
	for (let r of ["anyOf", "oneOf"]) {
		let i = t[r];
		if (!Array.isArray(i)) continue;
		let a = i.map((t) => ol(e, t, n));
		a.some((e, t) => e !== i[t]) && (t = {
			...t,
			[r]: a
		});
	}
	let r = Array.isArray(t.type) ? t.type : [t.type], i = !r.includes("string") && r.some((e) => e === "number" || e === "integer"), a = t.enum ?? (t.const === void 0 ? void 0 : [t.const]);
	if (!i && !a?.some((e) => typeof e == "number")) return t;
	let { minimum: o, maximum: s, exclusiveMinimum: c, exclusiveMaximum: l, multipleOf: u, format: d, id: f, ...p } = t;
	return p.enum ? p.enum = p.enum.map((e) => typeof e == "number" ? String(e) : e) : typeof p.const == "number" && (p.const = String(p.const)), i ? (p.type = "string", a || (p.pattern = (r.includes("number") ? ua : la).source), p) : p;
}
function sl(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.seen.values()) n.def && !t.has(n.schema) && t.set(n.schema, n);
	let n = /* @__PURE__ */ new Map();
	for (let r of zl.get(e) ?? []) {
		let i = e.seen.get(r), a = (i?.def ?? i?.schema)?.propertyNames;
		if (!a || a === !0 || n.has(a)) continue;
		let o = ol(t, a, /* @__PURE__ */ new Set());
		o !== a && n.set(a, o);
	}
	if (n.size) for (let t of e.seen.values()) for (let e of [t.schema, t.def]) {
		let t = e && n.get(e.propertyNames);
		t && (e.propertyNames = t);
	}
}
function cl(e, t, n, r, i) {
	let a = !1, o = JSON.stringify(e, (e, t) => typeof t == "bigint" ? (a = !0, null) : t);
	return a ? (A(t, n, r, i, "BigInt defaults cannot be represented in JSON Schema"), Ul) : JSON.parse(o);
}
function ll(e, t) {
	if ("_idmap" in e) {
		let n = e, r = Gc({
			...t,
			processors: Ql
		}), i = {};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			j(n, r);
		}
		let a = {};
		r.external = {
			registry: n,
			uri: t?.uri,
			defs: i
		};
		for (let e of n._idmap.entries()) {
			let [t, n] = e;
			qc(r, n), C(a, t, Qc(r, n));
		}
		return Object.keys(i).length > 0 && (a.__shared = { [r.target === "draft-2020-12" ? "$defs" : "definitions"]: i }), { schemas: a };
	}
	let n = Gc({
		...t,
		processors: Ql
	});
	return j(e, n), qc(n, e), Qc(n, e);
}
var ul, dl, fl, pl, ml, hl, gl, _l, vl, yl, bl, xl, Sl, Cl, wl, Tl, El, Dl, Ol, kl, Al, jl, Ml, Nl, Pl, Fl, Il, Ll, Rl, zl, Bl, Vl, Hl, Ul, Wl, Gl, Kl, ql, Jl, Yl, Xl, Zl, Ql, $l = v((() => {
	ma(), il(), Xr(), ul = {
		guid: "uuid",
		url: "uri",
		datetime: "date-time",
		json_string: "json-string",
		regex: ""
	}, dl = (e, t, n, r) => {
		let i = n;
		i.type = "string";
		let { minimum: a, maximum: o, format: s, patterns: c, contentEncoding: l, laxFormat: u } = e._zod.bag;
		if (typeof a == "number" && (i.minLength = a), typeof o == "number" && (i.maxLength = o), s && (i.format = ul[s] ?? s, i.format === "" && delete i.format, (s === "time" || u) && delete i.format), l && (i.contentEncoding = l), c && c.size > 0) {
			let e = [...c];
			e.length === 1 ? i.pattern = e[0].source : e.length > 1 && (i.allOf = [...e.map((e) => ({
				...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
				pattern: e.source
			}))]);
		}
	}, fl = (e, t, n, r) => {
		let i = n, { minimum: a, maximum: o, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: u } = e._zod.bag;
		i.type = typeof s == "string" && s.includes("int") ? "integer" : "number";
		let d = typeof u == "number" && u >= (a ?? -Infinity), f = typeof l == "number" && l <= (o ?? Infinity), p = t.target === "draft-04" || t.target === "openapi-3.0";
		d ? p ? (i.minimum = u, i.exclusiveMinimum = !0) : i.exclusiveMinimum = u : typeof a == "number" && (i.minimum = a), f ? p ? (i.maximum = l, i.exclusiveMaximum = !0) : i.exclusiveMaximum = l : typeof o == "number" && (i.maximum = o), typeof c == "number" && (Number.isFinite(c) && c !== 0 ? i.multipleOf = Math.abs(c) : A(e, t, i, r, `A multipleOf divisor of ${c} cannot be represented in JSON Schema`));
	}, pl = (e, t, n, r) => {
		n.type = "boolean";
	}, ml = (e, t, n, r) => {
		A(e, t, n, r, "BigInt cannot be represented in JSON Schema");
	}, hl = (e, t, n, r) => {
		A(e, t, n, r, "Symbols cannot be represented in JSON Schema");
	}, gl = (e, t, n, r) => {
		t.target === "openapi-3.0" ? (n.type = "string", n.nullable = !0, n.enum = [null]) : n.type = "null";
	}, _l = (e, t, n, r) => {
		A(e, t, n, r, "Undefined cannot be represented in JSON Schema");
	}, vl = (e, t, n, r) => {
		A(e, t, n, r, "Void cannot be represented in JSON Schema");
	}, yl = (e, t, n, r) => {
		n.not = {};
	}, bl = (e, t, n, r) => {}, xl = (e, t, n, r) => {}, Sl = (e, t, n, r) => {
		A(e, t, n, r, "Date cannot be represented in JSON Schema");
	}, Cl = (e, t, n, r) => {
		let i = e._zod.def, a = Qn(i.entries);
		if (a.length === 0) {
			n.not = {};
			return;
		}
		a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), n.enum = a;
	}, wl = (e, t, n, r) => {
		let i = e._zod.def;
		if (i.values.length === 0) {
			n.not = {};
			return;
		}
		let a = [];
		for (let o of i.values) if (o === void 0) {
			if (A(e, t, n, r, "Literal `undefined` cannot be represented in JSON Schema")) return;
		} else if (typeof o == "bigint") {
			if (A(e, t, n, r, "BigInt literals cannot be represented in JSON Schema")) return;
			a.push(Number(o));
		} else a.push(o);
		if (a.length !== 0) {
			if (a.length === 1) {
				let e = a[0];
				n.type = e === null ? "null" : typeof e, t.target === "draft-04" || t.target === "openapi-3.0" ? n.enum = [e] : n.const = e;
			} else a.every((e) => typeof e == "number") && (n.type = "number"), a.every((e) => typeof e == "string") && (n.type = "string"), a.every((e) => typeof e == "boolean") && (n.type = "boolean"), a.every((e) => e === null) && (n.type = "null"), n.enum = a;
		}
	}, Tl = (e, t, n, r) => {
		A(e, t, n, r, "NaN cannot be represented in JSON Schema");
	}, El = (e, t, n, r) => {
		let i = n, a = e._zod.pattern;
		if (!a) throw Error("Pattern not found in template literal");
		i.type = "string", i.pattern = a.source;
	}, Dl = (e, t, n, r) => {
		let i = n, a = {
			type: "string",
			format: "binary",
			contentEncoding: "binary"
		}, { minimum: o, maximum: s, mime: c } = e._zod.bag;
		o !== void 0 && (a.minLength = o), s !== void 0 && (a.maxLength = s), c ? c.length === 1 ? (a.contentMediaType = c[0], Object.assign(i, a)) : (Object.assign(i, a), i.anyOf = c.map((e) => ({ contentMediaType: e }))) : Object.assign(i, a);
	}, Ol = (e, t, n, r) => {
		n.type = "boolean";
	}, kl = (e, t, n, r) => {
		A(e, t, n, r, "Custom types cannot be represented in JSON Schema");
	}, Al = (e, t, n, r) => {
		A(e, t, n, r, "Function types cannot be represented in JSON Schema");
	}, jl = (e, t, n, r) => {
		A(e, t, n, r, "Transforms cannot be represented in JSON Schema");
	}, Ml = (e, t, n, r) => {
		A(e, t, n, r, "Map cannot be represented in JSON Schema");
	}, Nl = (e, t, n, r) => {
		A(e, t, n, r, "Set cannot be represented in JSON Schema");
	}, Pl = (e, t, n, r) => {
		let i = n, a = e._zod.def, { minimum: o, maximum: s } = e._zod.bag;
		typeof o == "number" && (i.minItems = o), typeof s == "number" && (i.maxItems = s), i.type = "array", i.items = j(a.element, t, {
			...r,
			path: [...r.path, "items"]
		});
	}, Fl = (e, t, n, r) => {
		let i = n, a = e._zod.def, o = a.shape;
		if (Object.getOwnPropertySymbols(o).length && A(e, t, i, r, "Symbol keys cannot be represented in JSON Schema")) return;
		i.type = "object", i.properties = {};
		for (let e in o) C(i.properties, e, j(o[e], t, {
			...r,
			path: [
				...r.path,
				"properties",
				e
			]
		}));
		let s = new Set(Object.keys(o)), c = new Set([...s].filter((e) => {
			let n = a.shape[e];
			return t.io === "input" ? al(n) === void 0 : n._zod.optout === void 0;
		}));
		c.size > 0 && (i.required = Array.from(c)), a.catchall?._zod.def.type === "never" ? i.additionalProperties = !1 : a.catchall ? a.catchall && (i.additionalProperties = j(a.catchall, t, {
			...r,
			path: [...r.path, "additionalProperties"]
		})) : t.io === "output" && (i.additionalProperties = !1);
	}, Il = (e, t, n, r) => {
		let i = e._zod.def, a = i.inclusive === !1, o = i.options.map((e, n) => j(e, t, {
			...r,
			path: [
				...r.path,
				a ? "oneOf" : "anyOf",
				n
			]
		}));
		a ? n.oneOf = o : n.anyOf = o;
	}, Ll = (e, t, n, r) => {
		let i = e._zod.def, a = j(i.left, t, {
			...r,
			path: [
				...r.path,
				"allOf",
				0
			]
		}), o = j(i.right, t, {
			...r,
			path: [
				...r.path,
				"allOf",
				1
			]
		}), s = (e) => "allOf" in e && Object.keys(e).length === 1, c = [...s(a) ? a.allOf : [a], ...s(o) ? o.allOf : [o]];
		n.allOf = c, t.intersections.push(c);
	}, Rl = (e, t, n, r) => {
		let i = n, a = e._zod.def;
		i.type = "array";
		let o = t.target === "draft-2020-12" ? "prefixItems" : "items", s = t.target === "draft-2020-12" || t.target === "openapi-3.0" ? "items" : "additionalItems", c = a.items.map((e, n) => j(e, t, {
			...r,
			path: [
				...r.path,
				o,
				n
			]
		})), l = a.rest ? j(a.rest, t, {
			...r,
			path: [
				...r.path,
				s,
				...t.target === "openapi-3.0" ? [a.items.length] : []
			]
		}) : null, u = a.items.length;
		for (; u > 0;) {
			let e = a.items[u - 1];
			if (!(t.io === "input" ? al(e) !== void 0 : e._zod.optout === "optional")) break;
			u--;
		}
		let d = a.items.length, f = !a.rest;
		t.target === "draft-2020-12" ? (i.prefixItems = c, f ? i.items = !1 : l && (i.items = l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : t.target === "openapi-3.0" ? (i.items = { anyOf: c }, l && i.items.anyOf.push(l), u > 0 && (i.minItems = u), f && (i.maxItems = d)) : (i.items = c, f ? i.additionalItems = !1 : l && (i.additionalItems = l), u > 0 && (i.minItems = u), f && (i.maxItems = d));
		let { minimum: p, maximum: m } = e._zod.bag;
		typeof p == "number" && (i.minItems = p), typeof m == "number" && (i.maxItems = m);
	}, zl = /* @__PURE__ */ new WeakMap(), Bl = (e, t, n, r) => {
		let i = n, a = e._zod.def;
		i.type = "object";
		let o = a.keyType, s = o._zod.bag?.patterns;
		if (a.mode === "loose" && s && s.size > 0) {
			let e = j(a.valueType, t, {
				...r,
				path: [
					...r.path,
					"patternProperties",
					"*"
				]
			});
			i.patternProperties = {};
			for (let t of s) C(i.patternProperties, t.source, e);
		} else {
			if (t.target === "draft-07" || t.target === "draft-2020-12") {
				i.propertyNames = j(a.keyType, t, {
					...r,
					path: [...r.path, "propertyNames"]
				});
				let n = zl.get(t);
				n || (n = [], zl.set(t, n), t.deferred.push(() => sl(t))), n.push(e);
			}
			i.additionalProperties = j(a.valueType, t, {
				...r,
				path: [...r.path, "additionalProperties"]
			});
		}
		let c = o._zod.values, l = t.io === "input" && al(a.valueType) !== void 0;
		if (c && !a.partial && !l) {
			let e = [...c].filter((e) => typeof e == "string" || typeof e == "number");
			e.length > 0 && (i.required = e.map(String));
		}
	}, Vl = (e, t, n, r) => {
		let i = e._zod.def, a = j(i.innerType, t, r), o = t.seen.get(e);
		t.target === "openapi-3.0" ? (o.ref = i.innerType, n.nullable = !0) : n.anyOf = [a, { type: "null" }];
	}, Hl = (e, t, n, r) => {
		let i = e._zod.def;
		j(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, Ul = Symbol(), Wl = (e, t, n, r) => {
		let i = e._zod.def;
		j(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
		let o = cl(i.defaultValue, e, t, n, r);
		o !== Ul && (n.default = o);
	}, Gl = (e, t, n, r) => {
		let i = e._zod.def;
		j(i.innerType, t, r);
		let a = t.seen.get(e);
		if (a.ref = i.innerType, t.io !== "input") return;
		let o = cl(i.defaultValue, e, t, n, r);
		o !== Ul && (n._prefault = o);
	}, Kl = (e, t, n, r) => {
		let i = e._zod.def;
		j(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
		let o;
		try {
			o = i.catchValue(void 0);
		} catch {
			A(e, t, n, r, "Dynamic catch values are not supported in JSON Schema");
			return;
		}
		n.default = o;
	}, ql = (e, t, n, r) => {
		let i = e._zod.def, a = i.in._zod.traits.has("$ZodTransform"), o = t.io === "input" ? a ? i.out : i.in : i.out;
		j(o, t, r);
		let s = t.seen.get(e);
		s.ref = o;
	}, Jl = (e, t, n, r) => {
		let i = e._zod.def;
		j(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType, n.readOnly = !0;
	}, Yl = (e, t, n, r) => {
		let i = e._zod.def;
		j(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, Xl = (e, t, n, r) => {
		let i = e._zod.def;
		j(i.innerType, t, r);
		let a = t.seen.get(e);
		a.ref = i.innerType;
	}, Zl = (e, t, n, r) => {
		let i = e._zod.innerType;
		j(i, t, r);
		let a = t.seen.get(e);
		a.ref = i;
	}, Ql = {
		string: dl,
		number: fl,
		boolean: pl,
		bigint: ml,
		symbol: hl,
		null: gl,
		undefined: _l,
		void: vl,
		never: yl,
		any: bl,
		unknown: xl,
		date: Sl,
		enum: Cl,
		literal: wl,
		nan: Tl,
		template_literal: El,
		file: Dl,
		success: Ol,
		custom: kl,
		function: Al,
		transform: jl,
		map: Ml,
		set: Nl,
		array: Pl,
		object: Fl,
		union: Il,
		intersection: Ll,
		tuple: Rl,
		record: Bl,
		nullable: Vl,
		nonoptional: Hl,
		default: Wl,
		prefault: Gl,
		catch: Kl,
		pipe: ql,
		readonly: Jl,
		promise: Yl,
		optional: Xl,
		lazy: Zl
	};
})), eu = v((() => {
	ai(), Pi(), vi(), gs(), ks(), Ma(), Ia(), Xr(), ma(), Ms(), Ls(), Pa(), Rs(), Uc(), il(), $l(), il();
})), tu = v((() => {
	eu();
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/errors.js
function nu(e, t, n) {
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
var ru, iu, au, ou = v((() => {
	eu(), Xr(), ru = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), iu = (e, t) => {
		gi.init(e, t), e.name = "ZodError";
		let n = Object.getPrototypeOf(e);
		ru.has(n) || (ru.add(n), nu(n, "format", (e) => (t) => ui(e, t)), nu(n, "flatten", (e) => (t) => li(e, t)), nu(n, "addIssue", (e) => (t) => {
			e.issues.push(t), e.message = JSON.stringify(e.issues, er, 2);
		}), nu(n, "addIssues", (e) => (t) => {
			e.issues.push(...t), e.message = JSON.stringify(e.issues, er, 2);
		}), Object.defineProperty(n, "isEmpty", {
			configurable: !0,
			enumerable: !1,
			get() {
				return this.issues.length === 0;
			}
		}));
	}, au = /*@__PURE__*/ E("ZodError", iu, void 0, { Parent: Error });
})), su, cu, lu, uu, du, fu, pu, mu, hu, gu, _u, vu, yu = v((() => {
	eu(), ou(), su = /* @__PURE__ */ bi(au), cu = /* @__PURE__ */ xi(au), lu = /* @__PURE__ */ Si(au), uu = /* @__PURE__ */ wi(au), du = /* @__PURE__ */ Ei(au), fu = /* @__PURE__ */ Di(au), pu = /* @__PURE__ */ Oi(au), mu = /* @__PURE__ */ ki(au), hu = /* @__PURE__ */ Ai(au), gu = /* @__PURE__ */ ji(au), _u = /* @__PURE__ */ Mi(au), vu = /* @__PURE__ */ Ni(au);
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/schemas.js
function bu() {
	ii.localeError || Qr(As());
}
function xu() {
	ii.memoizer || Qr({ memoizer: bs() });
}
function M(e) {
	return /* @__PURE__ */ zs(qu, e);
}
function N(e) {
	return /* @__PURE__ */ Ks(td, e);
}
function Su(e) {
	return /* @__PURE__ */ nc(dd, e);
}
function Cu(e) {
	return /* @__PURE__ */ rc(fd, e);
}
function P(e) {
	return /* @__PURE__ */ fc(_d, e);
}
function wu(e) {
	return /* @__PURE__ */ mc(vd, e);
}
function F(e) {
	return /* @__PURE__ */ hc(yd, e);
}
function Tu() {
	return /* @__PURE__ */ gc(bd);
}
function Eu(e) {
	return /* @__PURE__ */ _c(xd, e);
}
function I(e, t) {
	return /* @__PURE__ */ Rc(Sd, e, t);
}
function L(e, t) {
	let n = {
		type: "object",
		shape: e ?? {},
		...w(t)
	};
	return new Cd(n);
}
function Du(e, t) {
	return new Cd({
		type: "object",
		shape: e,
		catchall: Eu(),
		...w(t)
	});
}
function Ou(e, t) {
	return new Cd({
		type: "object",
		shape: e,
		catchall: Tu(),
		...w(t)
	});
}
function ku(e, t) {
	return new wd({
		type: "union",
		options: e,
		...w(t)
	});
}
function R(e, t, n) {
	return new Td({
		type: "union",
		options: t,
		discriminator: e,
		...w(n)
	});
}
function Au(e, t) {
	return new Ed({
		type: "intersection",
		left: e,
		right: t
	});
}
function ju(e, t, n) {
	let r = t instanceof O;
	return new Dd({
		type: "tuple",
		items: e,
		rest: r ? t : null,
		...w(r ? n : t)
	});
}
function z(e, t, n) {
	return !t || !t._zod ? new Od({
		type: "record",
		keyType: M(),
		valueType: e,
		...w(t)
	}) : new Od({
		type: "record",
		keyType: e,
		valueType: t,
		...w(n)
	});
}
function Mu(e, t, n) {
	return new Od({
		type: "record",
		keyType: e,
		valueType: t,
		...w(n),
		partial: !0
	});
}
function B(e, t) {
	let n = Array.isArray(e) ? Object.fromEntries(e.map((e) => [e, e])) : e;
	return new kd({
		type: "enum",
		entries: n,
		...w(t)
	});
}
function V(e, t) {
	return new Ad({
		type: "literal",
		values: Array.isArray(e) ? e : [e],
		...w(t)
	});
}
function Nu(e) {
	return new jd({
		type: "transform",
		transform: e
	});
}
function Pu(e) {
	return new Md({
		type: "optional",
		innerType: e
	});
}
function Fu(e) {
	return new Nd({
		type: "optional",
		innerType: e
	});
}
function Iu(e) {
	return new Pd({
		type: "nullable",
		innerType: e
	});
}
function Lu(e, t) {
	return new Fd({
		type: "default",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : dr(t);
		}
	});
}
function Ru(e, t) {
	return new Id({
		type: "prefault",
		innerType: e,
		get defaultValue() {
			return typeof t == "function" ? t() : dr(t);
		}
	});
}
function zu(e, t) {
	return new Ld({
		type: "nonoptional",
		innerType: e,
		...w(t)
	});
}
function Bu(e, t) {
	return new Rd({
		type: "catch",
		innerType: e,
		catchValue: typeof t == "function" ? t : zr(t)
	});
}
function Vu(e, t) {
	return new zd({
		type: "pipe",
		in: e,
		out: t
	});
}
function Hu(e) {
	return new Vd({
		type: "readonly",
		innerType: e
	});
}
function Uu(e) {
	return new Hd({
		type: "lazy",
		getter: e
	});
}
function Wu(e, t = {}) {
	return /* @__PURE__ */ zc(Ud, e, t);
}
function Gu(e, t) {
	return /* @__PURE__ */ Bc(e, t);
}
var H, Ku, qu, U, Ju, Yu, Xu, Zu, Qu, $u, ed, td, nd, rd, id, ad, od, sd, cd, ld, ud, dd, fd, pd, md, hd, gd, _d, vd, yd, bd, xd, Sd, Cd, wd, Td, Ed, Dd, Od, kd, Ad, jd, Md, Nd, Pd, Fd, Id, Ld, Rd, zd, Bd, Vd, Hd, Ud, Wd, Gd = v((() => {
	eu(), $l(), il(), Ms(), tu(), yu(), H = /*@__PURE__*/ E("ZodType", (e, t) => (bu(), O.init(e, t), e.def = t, e.type = t.type, e), {
		check(...e) {
			let t = this.def;
			return this.clone(or(t, { checks: [...t.checks ?? [], ...e.map((e) => typeof e == "function" ? { _zod: {
				check: e,
				def: { check: "custom" },
				onattach: []
			} } : e)] }), { parent: !0 });
		},
		with(...e) {
			return this.check(...e);
		},
		clone(e, t) {
			return pr(this, e, t);
		},
		brand() {
			return this;
		},
		register(e, t) {
			return e.add(this, t), this;
		},
		refine(e, t) {
			return this.check(Wu(e, t));
		},
		superRefine(e, t) {
			return this.check(Gu(e, t));
		},
		overwrite(e) {
			return this.check(/* @__PURE__ */ Mc(e));
		},
		optional() {
			return Pu(this);
		},
		exactOptional() {
			return Fu(this);
		},
		nullable() {
			return Iu(this);
		},
		nullish() {
			return Pu(Iu(this));
		},
		nonoptional(e) {
			return zu(this, e);
		},
		array() {
			return I(this);
		},
		or(e) {
			return ku([this, e]);
		},
		and(e) {
			return Au(this, e);
		},
		transform(e) {
			return Vu(this, Nu(e));
		},
		default(e) {
			return Lu(this, e);
		},
		prefault(e) {
			return Ru(this, e);
		},
		catch(e) {
			return Bu(this, e);
		},
		pipe(e) {
			return Vu(this, e);
		},
		readonly() {
			return Hu(this);
		},
		describe(e) {
			let t = this.clone();
			return Is.add(t, { description: e }), t;
		},
		meta(...e) {
			if (e.length === 0) return Is.get(this);
			let t = this.clone();
			return Is.add(t, e[0]), t;
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
			return Fr(this, "~standard", {
				...La(this),
				jsonSchema: {
					input: rl(this, "input"),
					output: rl(this, "output")
				}
			});
		},
		set "~standard"(e) {
			Pr(this, "~standard", e);
		},
		parse: function e(t, n) {
			return su(this, t, n, { callee: e });
		},
		parseAsync: async function e(t, n) {
			return await cu(this, t, n, { callee: e });
		},
		safeParse(e, t) {
			return lu(this, e, t);
		},
		async safeParseAsync(e, t) {
			return uu(this, e, t);
		},
		get spa() {
			return this?.safeParseAsync;
		},
		set spa(e) {
			Pr(this, "spa", e);
		},
		encode: function e(t, n) {
			return du(this, t, n, { callee: e });
		},
		decode: function e(t, n) {
			return fu(this, t, n, { callee: e });
		},
		encodeAsync: async function e(t, n) {
			return await pu(this, t, n, { callee: e });
		},
		decodeAsync: async function e(t, n) {
			return await mu(this, t, n, { callee: e });
		},
		safeEncode(e, t) {
			return hu(this, e, t);
		},
		safeDecode(e, t) {
			return gu(this, e, t);
		},
		async safeEncodeAsync(e, t) {
			return _u(this, e, t);
		},
		async safeDecodeAsync(e, t) {
			return vu(this, e, t);
		},
		toJSONSchema(e) {
			return nl(this, {})(e);
		},
		get description() {
			return Is.get(this)?.description;
		},
		get _def() {
			return this._zod.def;
		}
	}), Ku = /*@__PURE__*/ E("_ZodString", (e, t) => {
		mo.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => dl(e, t, n, r);
		let n = e._zod.bag;
		e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null;
	}, {
		regex(...e) {
			return this.check(/* @__PURE__ */ Ec(...e));
		},
		includes(...e) {
			return this.check(/* @__PURE__ */ kc(...e));
		},
		startsWith(...e) {
			return this.check(/* @__PURE__ */ Ac(...e));
		},
		endsWith(...e) {
			return this.check(/* @__PURE__ */ jc(...e));
		},
		min(...e) {
			return this.check(/* @__PURE__ */ wc(...e));
		},
		max(...e) {
			return this.check(/* @__PURE__ */ Cc(...e));
		},
		length(...e) {
			return this.check(/* @__PURE__ */ Tc(...e));
		},
		nonempty(...e) {
			return this.check(/* @__PURE__ */ wc(1, ...e));
		},
		lowercase(e) {
			return this.check(/* @__PURE__ */ Dc(e));
		},
		uppercase(e) {
			return this.check(/* @__PURE__ */ Oc(e));
		},
		trim() {
			return this.check(/* @__PURE__ */ Pc());
		},
		normalize(...e) {
			return this.check(/* @__PURE__ */ Nc(...e));
		},
		toLowerCase() {
			return this.check(/* @__PURE__ */ Fc());
		},
		toUpperCase() {
			return this.check(/* @__PURE__ */ Ic());
		},
		slugify() {
			return this.check(/* @__PURE__ */ Lc());
		}
	}), qu = /*@__PURE__*/ E("ZodString", (e, t) => {
		mo.init(e, t), Ku.init(e, t);
	}, {
		email(e) {
			return this.check(/* @__PURE__ */ Bs(Qu, e));
		},
		url(e) {
			return this.check(/* @__PURE__ */ Ks(td, e));
		},
		jwt(e) {
			return this.check(/* @__PURE__ */ sc(gd, e));
		},
		emoji(e) {
			return this.check(/* @__PURE__ */ qs(nd, e));
		},
		guid(e) {
			return this.check(/* @__PURE__ */ Vs($u, e));
		},
		uuid(e) {
			return this.check(/* @__PURE__ */ Hs(ed, e));
		},
		uuidv4(e) {
			return this.check(/* @__PURE__ */ Us(ed, e));
		},
		uuidv6(e) {
			return this.check(/* @__PURE__ */ Ws(ed, e));
		},
		uuidv7(e) {
			return this.check(/* @__PURE__ */ Gs(ed, e));
		},
		nanoid(e) {
			return this.check(/* @__PURE__ */ Js(rd, e));
		},
		cuid(e) {
			return this.check(/* @__PURE__ */ Ys(id, e));
		},
		cuid2(e) {
			return this.check(/* @__PURE__ */ Xs(ad, e));
		},
		ulid(e) {
			return this.check(/* @__PURE__ */ Zs(od, e));
		},
		base64(e) {
			return this.check(/* @__PURE__ */ ic(pd, e));
		},
		base64url(e) {
			return this.check(/* @__PURE__ */ ac(md, e));
		},
		xid(e) {
			return this.check(/* @__PURE__ */ Qs(sd, e));
		},
		ksuid(e) {
			return this.check(/* @__PURE__ */ $s(cd, e));
		},
		ipv4(e) {
			return this.check(/* @__PURE__ */ ec(ld, e));
		},
		ipv6(e) {
			return this.check(/* @__PURE__ */ tc(ud, e));
		},
		cidrv4(e) {
			return this.check(/* @__PURE__ */ nc(dd, e));
		},
		cidrv6(e) {
			return this.check(/* @__PURE__ */ rc(fd, e));
		},
		e164(e) {
			return this.check(/* @__PURE__ */ oc(hd, e));
		},
		datetime(e) {
			return this.check(/* @__PURE__ */ cc(Ju, e));
		},
		date(e) {
			return this.check(/* @__PURE__ */ lc(Yu, e));
		},
		time(e) {
			return this.check(/* @__PURE__ */ uc(Xu, e));
		},
		duration(e) {
			return this.check(/* @__PURE__ */ dc(Zu, e));
		}
	}), U = /*@__PURE__*/ E("ZodStringFormat", (e, t) => {
		k.init(e, t), Ku.init(e, t);
	}), Ju = /*@__PURE__*/ E("ZodISODateTime", (e, t) => {
		Do.init(e, t), U.init(e, t);
	}), Yu = /*@__PURE__*/ E("ZodISODate", (e, t) => {
		Oo.init(e, t), U.init(e, t);
	}), Xu = /*@__PURE__*/ E("ZodISOTime", (e, t) => {
		ko.init(e, t), U.init(e, t);
	}), Zu = /*@__PURE__*/ E("ZodISODuration", (e, t) => {
		Ao.init(e, t), U.init(e, t);
	}), Qu = /*@__PURE__*/ E("ZodEmail", (e, t) => {
		_o.init(e, t), U.init(e, t);
	}), $u = /*@__PURE__*/ E("ZodGUID", (e, t) => {
		ho.init(e, t), U.init(e, t);
	}), ed = /*@__PURE__*/ E("ZodUUID", (e, t) => {
		go.init(e, t), U.init(e, t);
	}), td = /*@__PURE__*/ E("ZodURL", (e, t) => {
		yo.init(e, t), U.init(e, t);
	}), nd = /*@__PURE__*/ E("ZodEmoji", (e, t) => {
		bo.init(e, t), U.init(e, t);
	}), rd = /*@__PURE__*/ E("ZodNanoID", (e, t) => {
		xo.init(e, t), U.init(e, t);
	}), id = /*@__PURE__*/ E("ZodCUID", (e, t) => {
		So.init(e, t), U.init(e, t);
	}), ad = /*@__PURE__*/ E("ZodCUID2", (e, t) => {
		Co.init(e, t), U.init(e, t);
	}), od = /*@__PURE__*/ E("ZodULID", (e, t) => {
		wo.init(e, t), U.init(e, t);
	}), sd = /*@__PURE__*/ E("ZodXID", (e, t) => {
		To.init(e, t), U.init(e, t);
	}), cd = /*@__PURE__*/ E("ZodKSUID", (e, t) => {
		Eo.init(e, t), U.init(e, t);
	}), ld = /*@__PURE__*/ E("ZodIPv4", (e, t) => {
		jo.init(e, t), U.init(e, t);
	}), ud = /*@__PURE__*/ E("ZodIPv6", (e, t) => {
		No.init(e, t), U.init(e, t);
	}), dd = /*@__PURE__*/ E("ZodCIDRv4", (e, t) => {
		Po.init(e, t), U.init(e, t);
	}), fd = /*@__PURE__*/ E("ZodCIDRv6", (e, t) => {
		Fo.init(e, t), U.init(e, t);
	}), pd = /*@__PURE__*/ E("ZodBase64", (e, t) => {
		Io.init(e, t), U.init(e, t);
	}), md = /*@__PURE__*/ E("ZodBase64URL", (e, t) => {
		Lo.init(e, t), U.init(e, t);
	}), hd = /*@__PURE__*/ E("ZodE164", (e, t) => {
		Ro.init(e, t), U.init(e, t);
	}), gd = /*@__PURE__*/ E("ZodJWT", (e, t) => {
		zo.init(e, t), U.init(e, t);
	}), _d = /*@__PURE__*/ E("ZodNumber", (e, t) => {
		Bo.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => fl(e, t, n, r);
		let n = e._zod.bag;
		e.minValue = Math.max(n.minimum ?? -Infinity, n.exclusiveMinimum ?? -Infinity) ?? null, e.maxValue = Math.min(n.maximum ?? Infinity, n.exclusiveMaximum ?? Infinity) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? .5), e.isFinite = !0, e.format = n.format ?? null;
	}, {
		gt(e, t) {
			return this.check(/* @__PURE__ */ bc(e, t));
		},
		gte(e, t) {
			return this.check(/* @__PURE__ */ xc(e, t));
		},
		min(e, t) {
			return this.check(/* @__PURE__ */ xc(e, t));
		},
		lt(e, t) {
			return this.check(/* @__PURE__ */ vc(e, t));
		},
		lte(e, t) {
			return this.check(/* @__PURE__ */ yc(e, t));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ yc(e, t));
		},
		int(e) {
			return this.check(wu(e));
		},
		safe(e) {
			return this.check(wu(e));
		},
		positive(e) {
			return this.check(/* @__PURE__ */ bc(0, e));
		},
		nonnegative(e) {
			return this.check(/* @__PURE__ */ xc(0, e));
		},
		negative(e) {
			return this.check(/* @__PURE__ */ vc(0, e));
		},
		nonpositive(e) {
			return this.check(/* @__PURE__ */ yc(0, e));
		},
		multipleOf(e, t) {
			return this.check(/* @__PURE__ */ Sc(e, t));
		},
		step(e, t) {
			return this.check(/* @__PURE__ */ Sc(e, t));
		},
		finite() {
			return this;
		}
	}), vd = /*@__PURE__*/ E("ZodNumberFormat", (e, t) => {
		Vo.init(e, t), _d.init(e, t);
	}), yd = /*@__PURE__*/ E("ZodBoolean", (e, t) => {
		Ho.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => pl(e, t, n, r);
	}), bd = /*@__PURE__*/ E("ZodUnknown", (e, t) => {
		Uo.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => xl(e, t, n, r);
	}), xd = /*@__PURE__*/ E("ZodNever", (e, t) => {
		Wo.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => yl(e, t, n, r);
	}), Sd = /*@__PURE__*/ E("ZodArray", (e, t) => {
		xu(), Go.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Pl(e, t, n, r), e.element = t.element;
	}, {
		min(e, t) {
			return this.check(/* @__PURE__ */ wc(e, t));
		},
		nonempty(e) {
			return this.check(/* @__PURE__ */ wc(1, e));
		},
		max(e, t) {
			return this.check(/* @__PURE__ */ Cc(e, t));
		},
		length(e, t) {
			return this.check(/* @__PURE__ */ Tc(e, t));
		},
		unwrap() {
			return this.element;
		}
	}), Cd = /*@__PURE__*/ E("ZodObject", (e, t) => {
		xu(), Yo.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Fl(e, t, n, r), Rr(e, "shape", (e) => e._zod.def.shape, !1);
	}, {
		keyof() {
			return B(Object.keys(this._zod.def.shape));
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
				catchall: Tu()
			});
		},
		loose() {
			return this.clone({
				...this._zod.def,
				catchall: Tu()
			});
		},
		strict() {
			return this.clone({
				...this._zod.def,
				catchall: Eu()
			});
		},
		strip() {
			return this.clone({
				...this._zod.def,
				catchall: void 0
			});
		},
		extend(e) {
			return vr(this, e);
		},
		safeExtend(e) {
			return yr(this, e);
		},
		merge(e) {
			return br(this, e);
		},
		pick(e) {
			return gr(this, e);
		},
		omit(e) {
			return _r(this, e);
		},
		partial(...e) {
			return xr(Md, this, e[0]);
		},
		exactPartial(...e) {
			return xr(Nd, this, e[0], "exactPartial");
		},
		required(...e) {
			return Sr(Ld, this, e[0]);
		}
	}), wd = /*@__PURE__*/ E("ZodUnion", (e, t) => {
		Xo.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Il(e, t, n, r), e.options = t.options;
	}), Td = /*@__PURE__*/ E("ZodDiscriminatedUnion", (e, t) => {
		wd.init(e, t), Zo.init(e, t);
	}), Ed = /*@__PURE__*/ E("ZodIntersection", (e, t) => {
		Qo.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Ll(e, t, n, r);
	}), Dd = /*@__PURE__*/ E("ZodTuple", (e, t) => {
		xu(), $o.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Rl(e, t, n, r);
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
				items: e.items.map((e) => new Md({
					type: "optional",
					innerType: e
				}))
			});
		}
	}), Od = /*@__PURE__*/ E("ZodRecord", (e, t) => {
		xu(), es.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Bl(e, t, n, r), e.keyType = t.keyType, e.valueType = t.valueType;
	}), kd = /*@__PURE__*/ E("ZodEnum", (e, t) => {
		ts.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Cl(e, t, n, r), e.enum = t.entries, e.options = Object.values(t.entries);
		let n = new Set(Object.keys(t.entries));
		e.extract = (e, r) => {
			let i = {};
			for (let r of e) if (n.has(r)) i[r] = t.entries[r];
			else throw Error(`Key ${r} not found in enum`);
			return new kd({
				...t,
				checks: [],
				...w(r),
				entries: i
			});
		}, e.exclude = (e, r) => {
			let i = { ...t.entries };
			for (let t of e) if (n.has(t)) delete i[t];
			else throw Error(`Key ${t} not found in enum`);
			return new kd({
				...t,
				checks: [],
				...w(r),
				entries: i
			});
		};
	}), Ad = /*@__PURE__*/ E("ZodLiteral", (e, t) => {
		ns.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => wl(e, t, n, r), e.values = new Set(t.values), Object.defineProperty(e, "value", { get() {
			if (t.values.length > 1) throw Error("This schema contains multiple valid literal values. Use `.values` instead.");
			return t.values[0];
		} });
	}), jd = /*@__PURE__*/ E("ZodTransform", (e, t) => {
		xu(), rs.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => jl(e, t, n, r), e._zod.parse = (n, r) => {
			if (r.direction === "backward") throw new ri(e.constructor.name);
			n.addIssue = (r) => {
				if (typeof r == "string") n.issues.push(Mr(r, n.value, t));
				else {
					let t = r;
					t.fatal && (t.continue = !1), t.code ??= "custom", "input" in t || (t.input = n.value), t.inst ??= e, n.issues.push(Mr(t));
				}
			};
			let i = t.transform(n.value, n);
			return i instanceof Promise ? i.then((e) => (n.value = e, n)) : (n.value = i, n);
		};
	}), Md = /*@__PURE__*/ E("ZodOptional", (e, t) => {
		is.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Xl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Nd = /*@__PURE__*/ E("ZodExactOptional", (e, t) => {
		as.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Xl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Pd = /*@__PURE__*/ E("ZodNullable", (e, t) => {
		os.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Vl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Fd = /*@__PURE__*/ E("ZodDefault", (e, t) => {
		ss.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Wl(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
	}), Id = /*@__PURE__*/ E("ZodPrefault", (e, t) => {
		cs.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Gl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Ld = /*@__PURE__*/ E("ZodNonOptional", (e, t) => {
		ls.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Hl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Rd = /*@__PURE__*/ E("ZodCatch", (e, t) => {
		us.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Kl(e, t, n, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
	}), zd = /*@__PURE__*/ E("ZodPipe", (e, t) => {
		ds.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => ql(e, t, n, r), e.in = t.in, e.out = t.out;
	}), Bd = /*@__PURE__*/ E("ZodCodec", (e, t) => {
		zd.init(e, t), fs.init(e, t);
	}), Vd = /*@__PURE__*/ E("ZodReadonly", (e, t) => {
		ps.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Jl(e, t, n, r), e.unwrap = () => e._zod.def.innerType;
	}), Hd = /*@__PURE__*/ E("ZodLazy", (e, t) => {
		ms.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => Zl(e, t, n, r), e.unwrap = () => e._zod.def.getter();
	}), Ud = /*@__PURE__*/ E("ZodCustom", (e, t) => {
		hs.init(e, t), H.init(e, t), e._zod.processJSONSchema = (t, n, r) => kl(e, t, n, r);
	}), Wd = (...e) => /* @__PURE__ */ Hc({
		Codec: Bd,
		Boolean: yd,
		String: qu
	}, ...e);
})), Kd = v((() => {
	eu();
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/iso.js
function qd(e) {
	return /* @__PURE__ */ cc(Ju, e);
}
var Jd = v((() => {
	eu(), Gd();
}));
//#endregion
//#region node_modules/.pnpm/zod@4.5.4/node_modules/zod/v4/classic/coerce.js
function W(e) {
	return /* @__PURE__ */ pc(_d, e);
}
var Yd = v((() => {
	eu(), Gd();
})), Xd = v((() => {
	eu(), Gd(), tu(), ou(), yu(), Kd(), $l(), Ls(), Xr(), tu(), Jd(), Gd(), gs(), Ms(), Yd();
})), G = v((() => {
	Xd(), Xd();
})), Zd, Qd, $d, ef, tf, nf, rf, af = v((() => {
	G(), Zd = (e) => {
		if (typeof e != "object" || !e || !("~orpc" in e)) return;
		let { route: t } = e["~orpc"];
		if (t?.method !== void 0 && t.path !== void 0) return {
			method: t.method,
			path: t.path
		};
	}, Qd = (e) => {
		let t = [];
		for (let [n, r] of Object.entries(e)) if (typeof r == "object" && r) for (let [e, i] of Object.entries(r)) {
			let r = Zd(i);
			r !== void 0 && t.push({
				name: `${n}.${e}`,
				method: r.method,
				path: r.path
			});
		}
		return t.toSorted((e, t) => e.name.localeCompare(t.name));
	}, $d = /* @__PURE__ */ new Set([
		"required",
		"enum",
		"anyOf",
		"oneOf",
		"allOf"
	]), ef = (e, t) => {
		if (Array.isArray(e)) {
			let n = e.map((e) => ef(e));
			return t !== void 0 && $d.has(t) ? n.toSorted((e, t) => JSON.stringify(e).localeCompare(JSON.stringify(t))) : n;
		}
		return typeof e != "object" || !e ? e : Object.entries(e).toSorted(([e], [t]) => e.localeCompare(t)).map(([e, t]) => [e, ef(t, e)]);
	}, tf = (e) => {
		let t = JSON.stringify(ef(e)), n = 2166136261;
		for (let e = 0; e < t.length; e++) n ^= t.charCodeAt(e), n = Math.imul(n, 16777619) >>> 0;
		return n.toString(36);
	}, nf = (e) => {
		if (typeof e != "object" || !e || !("~orpc" in e)) return;
		let { inputSchema: t, outputSchema: n } = e["~orpc"];
		try {
			return tf({
				in: t === void 0 ? void 0 : ll(t, { io: "input" }),
				out: n === void 0 ? void 0 : ll(n, { io: "output" })
			});
		} catch {
			return;
		}
	}, rf = (e) => {
		let t = {};
		for (let [n, r] of Object.entries(e)) if (typeof r == "object" && r) for (let [e, i] of Object.entries(r)) {
			if (Zd(i) === void 0) continue;
			let r = nf(i);
			r !== void 0 && (t[`${n}.${e}`] = r);
		}
		return t;
	};
}));
//#endregion
//#region node_modules/.pnpm/@orpc+shared@1.14.13/node_modules/@orpc/shared/dist/index.mjs
function of(e) {
	return e[0] ?? {};
}
function sf(e) {
	let t = Promise.resolve();
	return (...n) => t = t.catch(() => {}).then(() => e(...n));
}
function cf(e) {
	return !e || typeof e != "object" ? !1 : "next" in e && typeof e.next == "function" && Symbol.asyncIterator in e && typeof e[Symbol.asyncIterator] == "function";
}
function lf(e) {
	return uf(e) ? Object.getPrototypeOf(e)?.constructor : null;
}
function uf(e) {
	return !!e && (typeof e == "object" || typeof e == "function");
}
var df, ff, pf, mf, hf = v((() => {
	df = "@orpc/shared", ff = "1.14.13", `${df}${ff}`, pf = Symbol.asyncDispose ?? Symbol.for("asyncDispose"), mf = class {
		#e = !1;
		#t = !1;
		#n;
		#r;
		constructor(e, t) {
			this.#n = t, this.#r = sf(async () => {
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
		async [pf]() {
			this.#e = !0, this.#t || (this.#t = !0, await this.#n("dispose"));
		}
		[Symbol.asyncIterator]() {
			return this;
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/@orpc+client@1.14.13/node_modules/@orpc/client/dist/shared/client.DexhfmWd.mjs
function gf(e, t) {
	return t ?? xf[e]?.status ?? 500;
}
function _f(e, t) {
	return t || xf[e]?.message || e;
}
function vf(e) {
	return e < 200 || e >= 400;
}
var yf, bf, xf, Sf, Cf, wf = v((() => {
	hf(), yf = "@orpc/client", bf = "1.14.13", xf = {
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
	}, Cf = class e extends Error {
		defined;
		code;
		status;
		data;
		static {
			let t = Symbol.for(`__${yf}@${bf}/error/ORPC_ERROR_CONSTRUCTORS__`);
			globalThis[t] ??= /* @__PURE__ */ new WeakSet(), Sf = globalThis[t], Sf.add(e);
		}
		constructor(e, ...t) {
			let n = of(t);
			if (n.status !== void 0 && !vf(n.status)) throw Error("[ORPCError] Invalid error status code.");
			let r = _f(e, n.message);
			super(r, n), this.code = e, this.status = gf(e, n.status), this.defined = n.defined ?? !1, this.data = n.data;
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
			if (Sf.has(this)) {
				let t = lf(e);
				if (t && Sf.has(t)) return !0;
			}
			return super[Symbol.hasInstance](e);
		}
	};
}));
function Tf(e) {
	return Mf.test(e);
}
function Ef(e) {
	if (Tf(e)) throw new jf("Event's id must not contain a carriage return or newline character");
}
function Df(e) {
	if (!Number.isInteger(e) || e < 0) throw new jf("Event's retry must be a integer and >= 0");
}
function Of(e) {
	if (Tf(e)) throw new jf("Event's comment must not contain a carriage return or newline character");
}
function kf(e, t) {
	if (t.id === void 0 && t.retry === void 0 && !t.comments?.length) return e;
	if (t.id !== void 0 && Ef(t.id), t.retry !== void 0 && Df(t.retry), t.comments !== void 0) for (let e of t.comments) Of(e);
	return new Proxy(e, { get(e, n, r) {
		return n === Nf ? t : Reflect.get(e, n, r);
	} });
}
function Af(e) {
	return uf(e) ? Reflect.get(e, Nf) : void 0;
}
var jf, Mf, Nf, Pf = v((() => {
	hf(), jf = class extends TypeError {}, TransformStream, Mf = /\r\n|[\n\r]/, Nf = Symbol("ORPC_EVENT_SOURCE_META");
}));
//#endregion
//#region node_modules/.pnpm/@orpc+client@1.14.13/node_modules/@orpc/client/dist/shared/client.BLtwTQUg.mjs
function Ff(e, t) {
	let n = async (e) => {
		let n = await t.error(e);
		if (n !== e) {
			let t = Af(e);
			t && uf(n) && (n = kf(n, t));
		}
		return n;
	};
	return new mf(async () => {
		let { done: r, value: i } = await (async () => {
			try {
				return await e.next();
			} catch (e) {
				throw await n(e);
			}
		})(), a = await t.value(i, r);
		if (a !== i) {
			let e = Af(i);
			e && uf(a) && (a = kf(a, e));
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
var If = v((() => {
	hf(), Pf();
})), Lf = v((() => {
	hf(), wf(), If(), Pf();
}));
//#endregion
//#region node_modules/.pnpm/@orpc+contract@1.14.13/node_modules/@orpc/contract/dist/shared/contract.D_dZrO__.mjs
function Rf(e, t) {
	return {
		...e,
		...t
	};
}
function zf(e) {
	return e instanceof Vf || (typeof e == "object" || typeof e == "function") && e !== null && "~orpc" in e && typeof e["~orpc"] == "object" && e["~orpc"] !== null && "errorMap" in e["~orpc"] && "route" in e["~orpc"] && "meta" in e["~orpc"];
}
var Bf, Vf, Hf = v((() => {
	Lf(), Bf = class extends Error {
		issues;
		data;
		constructor(e) {
			super(e.message, e), this.issues = e.issues, this.data = e.data;
		}
	}, Vf = class {
		"~orpc";
		constructor(e) {
			if (e.route?.successStatus && vf(e.route.successStatus)) throw Error("[ContractProcedure] Invalid successStatus.");
			if (Object.values(e.errorMap).some((e) => e && e.status && !vf(e.status))) throw Error("[ContractProcedure] Invalid error status code.");
			this["~orpc"] = e;
		}
	};
}));
//#endregion
//#region node_modules/.pnpm/@orpc+contract@1.14.13/node_modules/@orpc/contract/dist/index.mjs
function Uf(e, t) {
	return {
		...e,
		...t
	};
}
function Wf(e, t) {
	return {
		...e,
		...t
	};
}
function Gf(e, t) {
	return e.path ? {
		...e,
		path: `${t}${e.path}`
	} : e;
}
function Kf(e, t) {
	return {
		...e,
		tags: [...t, ...e.tags ?? []]
	};
}
function qf(e, t) {
	return e ? `${e}${t}` : t;
}
function Jf(e, t) {
	return e ? [...e, ...t] : t;
}
function Yf(e, t) {
	let n = e;
	return t.prefix && (n = Gf(n, t.prefix)), t.tags?.length && (n = Kf(n, t.tags)), n;
}
function Xf(e, t) {
	if (zf(e)) return new Vf({
		...e["~orpc"],
		errorMap: Rf(t.errorMap, e["~orpc"].errorMap),
		route: Yf(e["~orpc"].route, t)
	});
	if (typeof e != "object" || !e) return e;
	let n = {};
	for (let r in e) n[r] = Xf(e[r], t);
	return n;
}
function K(e, t) {
	return { "~standard": {
		[Qf]: {
			yields: e,
			returns: t
		},
		vendor: "orpc",
		version: 1,
		validate(n) {
			return cf(n) ? { value: Ff(n, {
				async value(n, r) {
					let i = r ? t : e;
					if (!i) return n;
					let a = await i["~standard"].validate(n);
					if (a.issues) throw new Cf("EVENT_ITERATOR_VALIDATION_FAILED", {
						message: "Event iterator validation failed",
						cause: new Bf({
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
var Zf, q, Qf, J = v((() => {
	Hf(), hf(), Lf(), Zf = class e extends Vf {
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
				errorMap: Rf(this["~orpc"].errorMap, t)
			});
		}
		meta(t) {
			return new e({
				...this["~orpc"],
				meta: Uf(this["~orpc"].meta, t)
			});
		}
		route(t) {
			return new e({
				...this["~orpc"],
				route: Wf(this["~orpc"].route, t)
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
				prefix: qf(this["~orpc"].prefix, t)
			});
		}
		tag(...t) {
			return new e({
				...this["~orpc"],
				tags: Jf(this["~orpc"].tags, t)
			});
		}
		router(e) {
			return Xf(e, this["~orpc"]);
		}
	}, q = new Zf({
		errorMap: {},
		route: {},
		meta: {}
	}), Qf = Symbol("ORPC_EVENT_ITERATOR_DETAILS");
})), $f, ep = v((() => {
	$f = /^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/;
})), tp, np, rp, ip, ap = v((() => {
	G(), B(["helper", "run"]), tp = [
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
	], np = tp.map((e) => e.id), rp = B(np), ip = (e) => tp.filter((t) => e(t)), ip((e) => e.kind === "helper"), ip((e) => e.kind === "run" && e.trigger === "pressed"), ip((e) => e.kind === "run" && e.trigger === "unprompted");
})), op, sp, cp, lp, up, dp = v((() => {
	op = {
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
	}, sp = {
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
	}, cp = {
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
	}, lp = {
		...cp,
		runtime: "opencode-gemini"
	}, up = {
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
})), fp, pp, mp, hp = v((() => {
	dp(), fp = [
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
				native: op,
				claudeCode: op
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
				native: sp,
				claudeCode: op
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
				native: cp,
				claudeCode: op
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
				native: op,
				claudeCode: op
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
				native: lp,
				claudeCode: lp
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
				native: up,
				claudeCode: up
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
				native: op,
				claudeCode: op
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
				native: op,
				claudeCode: op
			}
		}
	], pp = fp.map((e) => e.id), new Map(fp.map((e) => [e.id, e])), mp = fp.filter((e) => e.auth.kind === "translator").map((e) => e.id), fp.filter((e) => e.auth.kind === "minted").map((e) => e.id);
})), gp, _p = v((() => {
	G(), gp = L({
		subject: M(),
		detail: M()
	});
})), vp, yp, bp, xp, Sp, Cp, wp = v((() => {
	G(), _p(), L({
		type: V("runner-hello"),
		token: M(),
		version: M(),
		image: M(),
		channel: M().optional(),
		overlayHash: M().optional(),
		definitionToml: M().optional()
	}), L({
		agent: M().optional(),
		account: M().optional(),
		model: M().optional()
	}), ku([
		L({
			ok: V(!0),
			kind: V("oauth"),
			accessToken: M(),
			account: M().optional()
		}),
		L({
			ok: V(!0),
			kind: V("parent-translator"),
			model: M(),
			trial: F().optional()
		}),
		L({
			ok: V(!0),
			kind: V("endpoint"),
			baseUrl: M(),
			authToken: M(),
			model: M(),
			trial: F().optional()
		}),
		L({
			ok: V(!1),
			code: B([
				"subscription-required",
				"claude-reauth",
				"trial-unavailable"
			]).optional(),
			message: M()
		})
	]), L({
		account: M().min(1),
		rejected: M().min(1)
	}), L({ accessToken: M().optional() }), vp = L({
		cpus: P().int().positive(),
		memoryMb: P().int().positive(),
		freeDiskMb: P().int().nonnegative(),
		load: P().nonnegative()
	}), yp = B([
		"current",
		"outdated",
		"unknown"
	]), L({
		id: M(),
		host: M().optional(),
		online: F(),
		version: M().optional(),
		image: M().optional(),
		channel: M().optional(),
		overlayHash: M().optional(),
		facts: vp.optional(),
		lastSeen: P().optional(),
		parity: yp,
		drift: I(gp).optional()
	}), bp = L({
		op: B(["pull", "push"]),
		conversationId: M().min(1),
		branch: M().min(1),
		repos: I(L({
			repo: M().min(1),
			dir: M(),
			mainBranch: M().min(1)
		}))
	}), xp = ku([L({
		kind: V("line"),
		text: M()
	}), L({
		kind: V("done"),
		ok: F(),
		detail: M().optional()
	})]), Sp = L({
		conversationId: M().min(1),
		branch: M().min(1),
		prompt: M(),
		provider: M(),
		harness: M(),
		model: M().optional(),
		effort: M().optional(),
		thinking: F().optional(),
		fast: F().optional(),
		account: M().optional(),
		sessionId: M().optional(),
		attachments: I(L({
			path: M().min(1),
			bytesBase64: M()
		})).optional()
	}), Cp = ku([L({ kind: V("local") }), L({
		kind: V("runner"),
		id: M().min(1)
	})]);
})), Y, Tp, Ep, Dp = v((() => {
	G(), Y = M().min(1).max(60).regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/), Tp = M().regex(/^[A-Za-z0-9][A-Za-z0-9._/-]*$/).max(200), Ep = B(["on", "off"]).default("off");
})), Op, kp, Ap, jp, Mp, Np, Pp, Fp, Ip, Lp, Rp, zp, Bp, Vp, Hp, Up, Wp, Gp, Kp, X = v((() => {
	G(), ep(), ap(), hp(), wp(), Dp(), Op = M().min(1), kp = L({ provider: B(pp) }), Ap = B(["native", "claude-code"]), jp = L({
		repo: M(),
		base: M().min(1)
	}), Mp = L({
		file: M().min(1).describe("The file open in the editor, as a workspace path."),
		startLine: P().int().min(1).optional().describe("First line of the selection, counting from one. Leave both out when the whole file is the context."),
		endLine: P().int().min(1).optional().describe("Last line of the selection, counting from one."),
		selection: M().max(2e4).optional().describe("The selected text itself. Cut it down before sending if it is long: this is context, not an upload.")
	}), Np = M().regex($f), Pp = L({
		automationId: M(),
		provider: M(),
		channelId: M().optional(),
		author: M().optional()
	}), B([
		"schedule",
		"event",
		"listener",
		"webchat",
		"issues",
		"workspace",
		"workflow"
	]), Fp = B([
		"allow",
		"hold",
		"deny"
	]), Ip = B(["sandbox", "device"]), Lp = B([
		"git.destructive",
		"files.destructive",
		"system.destructive",
		"container.state",
		"secrets.access",
		"package.publish",
		"network.outbound"
	]), Rp = L({
		schedule: Fp.default("allow"),
		event: Fp.default("allow"),
		listener: Fp.default("allow"),
		webchat: Fp.default("allow"),
		issues: Fp.default("hold"),
		workspace: Fp.default("allow"),
		workflow: B(["allow", "deny"]).default("allow")
	}), zp = B([
		"default",
		"plan",
		"bypassPermissions"
	]), Bp = L({
		conversationId: Np,
		index: P().int().nonnegative(),
		files: B(["then", "now"])
	}), Vp = L({
		prompt: M().describe("What to say to the agent. May be empty if you are only attaching files."),
		title: M().max(80).optional().describe("A title for a conversation this turn is opening. Ignored for a conversation that already has one."),
		attachments: I(M().min(1)).max(20).optional().describe("Files to hand the agent along with the prompt, as workspace paths. Upload them first."),
		agent: Op.optional().describe("Which model provider serves this turn. Leave it out for Claude."),
		harness: Ap.optional().describe("Which agentic loop runs the turn. Leave it out to use each provider's own."),
		account: M().optional().describe("Which of that provider's connected accounts pays for the turn. Leave it out for the first one."),
		actsAs: Y.optional().describe("Which persona the turn speaks as out in the world. Not the same as which account pays for it."),
		sessionId: M().optional().describe("Resume this provider session instead of starting a fresh one."),
		conversationId: Np.optional().describe("The conversation this turn belongs to. You choose it, it survives model switches, and it is how you address the conversation later. Naming one that does not exist opens it."),
		isolated: F().optional().describe("Work in this conversation's own private copy of the repos rather than the shared tree, so several agents can work at once. Needs a conversation id."),
		startIn: M().max(200).optional().describe("Which folder the conversation opens in, relative to the workspace root; the project it belongs to. Decided on the first turn. A persona that names its own start folder wins."),
		placement: Cp.optional().describe("Where this conversation runs: this sandbox (leave it out), or a paired runner by id. Decided on the first turn; later turns follow the conversation."),
		worktreeBase: I(jp).min(1).max(50).optional().describe("Pin a new private copy to these exact commits instead of today's workspace. Used when several agents must start from identical files."),
		autoLand: F().optional().describe("Whether this turn's work merges into the workspace when it finishes. Overrides the conversation's own setting for this turn only."),
		runRole: rp.optional().describe("What started this turn, when it was not a person typing: which of the sandbox's per-job model lists answers for it. Only used when the turn names no model of its own."),
		origin: Pp.optional().describe("Set by the sandbox alone: this turn opened a conversation on behalf of a message from outside rather than a person."),
		forkOf: L({
			conversationId: Np.describe("The conversation this one was cut from."),
			keep: P().int().nonnegative().describe("How many of that conversation's messages to copy in before this turn runs."),
			files: B(["then", "now"]).describe("Which files the fork opens on: \"now\" is the workspace as it stands, \"then\" is the files as they were at the cut, which needs a private copy.")
		}).optional().describe("Where this conversation was cut from, on its first turn only. Only the client knows this, so only the client can say it."),
		model: M().optional().describe("Which model to use. Leave it out for the provider's default."),
		unattended: F().optional().describe("Nobody chose a model for this turn because a screen started it rather than a person. The sandbox then fills in the model its owner picked for unwatched work."),
		outsideWake: M().min(1).optional().describe("Content from outside caused this turn, and what to call the source. It is what makes the sandbox treat the turn as carrying somebody else's words."),
		permissionMode: zp.optional().describe("How tool calls are gated: ask before each tool, propose a plan first, or run everything. The agent can move itself between these mid-turn."),
		allowedTools: I(M().min(1)).optional().describe("Narrow the turn to these tools. Leave it out for everything the runtime has. For a turn driven by an outside message this list is the real boundary, because prompt wording is only advice."),
		effort: M().optional().describe("How hard the model should think, where the provider offers a choice."),
		thinking: F().optional().describe("Whether to show the model's reasoning as it works."),
		fast: F().optional().describe("Ask for the same work at a higher rate for a higher price. A request rather than a promise: the answer says what actually happened."),
		tierHold: F().optional().describe("Run exactly the model that was picked, even when the turn looks simple enough for a cheaper one. The judgement is still recorded; nothing is substituted."),
		editorContext: Mp.optional().describe("What the user has open in their editor, folded into the prompt so that pointing words like \"this\" resolve.")
	}).refine((e) => e.prompt.trim().length > 0 || (e.attachments?.length ?? 0) > 0, { message: "prompt or attachments required" }).refine((e) => e.isolated !== !0 || e.conversationId !== void 0, { message: "isolated requires conversationId" }).refine((e) => e.worktreeBase === void 0 || e.isolated === !0 && e.conversationId !== void 0, { message: "worktreeBase requires an isolated conversationId" }).refine((e) => e.origin === void 0 || e.conversationId !== void 0, { message: "origin requires conversationId" }).refine((e) => e.forkOf === void 0 || e.conversationId !== void 0, { message: "forkOf requires conversationId" }).refine((e) => e.forkOf?.files !== "then" || e.isolated === !0, { message: "forkOf.files \"then\" requires isolated" }), Hp = L({
		agent: M().min(1).describe("Which provider."),
		model: M().min(1).describe("Which of its models. Both or neither, because a model name only means anything to the provider that serves it."),
		account: M().optional().describe("Which connected account of that provider pays, by its daemon-minted id. Leave it out for whichever has headroom."),
		harness: Ap.optional().describe("Which agentic loop runs it. Leave it out to use the provider's own."),
		effort: M().optional().describe("How hard that model should think, where it offers a choice. Leave it out to take the model's own default."),
		thinking: F().optional().describe("Whether this model reasons before it answers, where that is a choice it offers."),
		fast: F().optional().describe("Ask for this model's work at a higher rate for a higher price. A request rather than a promise.")
	}).optional(), Up = (e) => ({
		agent: e.provider,
		model: e.model,
		...e.account === void 0 ? {} : { account: e.account },
		...e.harness === void 0 ? {} : { harness: e.harness },
		...e.effort === void 0 ? {} : { effort: e.effort },
		...e.thinking === void 0 ? {} : { thinking: e.thinking },
		...e.fast === void 0 ? {} : { fast: e.fast }
	}), Wp = L({
		provider: Op.describe("Which provider serves this work."),
		model: M().min(1).describe("Which of its models. Both halves, because a model name only means anything to the provider that serves it."),
		effort: M().optional().describe("How hard this model should think, where it offers a choice. Leave it out to take the model's own default."),
		thinking: F().optional().describe("Whether this model reasons before it answers, where that is a choice it offers."),
		fast: F().optional().describe("Ask for this model's work at a higher rate for a higher price. A request rather than a promise."),
		harness: Ap.optional().describe("Which agentic loop runs it. Leave it out to use the provider's own.")
	}), Gp = L({ run: M().describe("The id of the run that just started. Hand it back when you attach, so the stream resumes rather than replaying.") }), Kp = L({
		conversationId: Np.describe("Which conversation to watch."),
		run: M().optional().describe("The run you were watching. If a newer turn has started since, the head names that one instead, and its rows are that turn's.")
	});
})), qp, Jp, Yp, Xp, Zp, Qp, $p, em, tm, nm, rm, im, am, om, sm = v((() => {
	G(), hp(), X(), qp = ku([
		V("all"),
		V("none"),
		L({ models: I(M().min(1)).min(1) })
	]), Jp = L({
		kind: M(),
		label: M().optional(),
		utilization: P(),
		resetsAt: P().optional(),
		gates: qp
	}), Yp = L({
		windows: I(Jp),
		measuredAt: P()
	}), Xp = L({
		available: F().describe("Whether the provider will reopen this account's session window right now. The only thing a button may be drawn from."),
		reason: M().optional().describe("Why not, in the provider's own word, when it gave one. Absent when it is available, or when the provider said nothing."),
		nextAvailableAt: P().optional().describe("When the next reset may be claimed, in epoch seconds, where the provider publishes it. Absent means unknown, never 'now'."),
		weeklyResetsAt: P().optional().describe("When the weekly allowance itself reopens, in epoch seconds, where the provider publishes it.")
	}), Zp = L({
		result: B([
			"reset",
			"already_used",
			"not_limited",
			"ineligible",
			"unavailable",
			"error"
		]).describe("What the provider did. Only `reset` reopened the window; every other value means nothing changed."),
		nextAvailableAt: P().optional().describe("When another reset may be claimed, in epoch seconds, where the provider published it."),
		detail: M().optional().describe("What went wrong, in words, for the two outcomes that are this sandbox's fault rather than the plan's.")
	}), Qp = L({
		at: P().describe("When it refused, in milliseconds."),
		kind: B([
			"limit",
			"auth",
			"entitlement"
		]).describe("Three different noes, kept apart because what fixes each is different. A spent allowance is answered by waiting; a refused credential by signing in again; and an entitlement refusal, where somebody has switched this off for your seat, by neither of those. That last one authenticates fine and reports healthy limits the whole time it refuses everything."),
		message: M().describe("The provider's own words, verbatim. The only part that says which limit or which credential."),
		account: M().optional().describe("Which account was serving, where that is known."),
		model: M().optional().describe("Which model the refused turn was on, where that is known.")
	}), $p = L({ refusals: z(M(), Qp).describe("The most recent refusal per provider. Read alongside an account's usage: that says how full it was when last checked, this says whether it has since started saying no.") }), em = L({
		name: M(),
		label: M(),
		usage: Yp.optional(),
		cooling: L({
			until: P().optional(),
			reason: M().optional()
		}).optional()
	}), tm = L(Object.fromEntries(mp.map((e) => [e, I(em)]))), nm = R("kind", [
		L({
			kind: V("plan").describe("Answering a plan the agent proposed."),
			requestId: M().min(1).describe("Which card you are answering, from the frame that raised it."),
			approve: F().describe("Whether to go ahead. Approving means the plan then runs without a prompt per tool, because being asked whether a plan you just approved may run its first command is not a question worth having."),
			feedback: M().optional().describe("Why not, which goes back to the model as the reason.")
		}),
		L({
			kind: V("question").describe("Answering a question the agent asked."),
			requestId: M().min(1).describe("Which card you are answering."),
			answers: z(M(), I(M())).optional().describe("What you chose, keyed by the question, with the chosen labels or your own words."),
			cancelled: F().optional().describe("Dismissing it instead, which tells the agent to carry on using sensible defaults rather than leaving it waiting.")
		}),
		L({
			kind: V("permission").describe("Answering a request to use a tool."),
			requestId: M().min(1).describe("Which card you are answering."),
			decision: B([
				"once",
				"always",
				"deny"
			]).describe("Once allows this call alone; always allows that whole tool for the rest of the conversation; no blocks it."),
			feedback: M().optional().describe("Why not, which goes back to the model as the reason.")
		}),
		L({
			kind: V("browser_help").describe("Answering a request for help in the agent's browser: a captcha, a password it does not hold, a check on your phone."),
			requestId: M().min(1).describe("Which card you are answering."),
			helped: F().describe("Whether you cleared it. Yes means the turn carries on from the page as you left it; no tells the agent so, and it moves on rather than waiting for ever."),
			note: M().optional().describe("Anything the agent should know, which goes back to it either way.")
		}),
		L({
			kind: V("terminal_help").describe("Answering a request for help at a terminal: a code to type, a confirmation only a person can give."),
			requestId: M().min(1).describe("Which card you are answering."),
			helped: F().describe("Whether you did it. Yes also hands the agent what the terminal now says, because a person answering a prompt is exactly the moment the agent cannot see."),
			note: M().optional().describe("Anything the agent should know, which goes back to it either way.")
		}),
		L({
			kind: V("capability_offer").describe("Answering a request to connect something the agent needs."),
			requestId: M().min(1).describe("Which card you are answering."),
			connect: F().describe("Yes keeps the agent waiting while you set it up, and it carries on the moment the connection comes alive. No tells it to continue without. The reply itself connects nothing: setting it up is still your own doing.")
		}),
		L({
			kind: V("payment_offer").describe("Answering a request to pay for something."),
			requestId: M().min(1).describe("Which card you are answering."),
			approve: F().describe("Yes releases exactly one payment. Anything else spends nothing. This click is the only way the money can move.")
		}),
		L({
			kind: V("credential_offer").describe("Releasing a credential the agent may only use once a named person says so."),
			requestId: M().min(1).describe("Which card you are answering."),
			approve: F().describe("Yes releases it, as far as the card says (this one use, or the rest of the conversation). Only the people the card names can answer at all, yes or no.")
		})
	]), rm = L({
		conversationId: M().min(1).describe("Which running conversation to interrupt."),
		text: M().max(2e4).describe("What to say to it. It arrives mid-turn without stopping the turn."),
		attachments: I(M().min(1)).max(20).optional().describe("Files to send with it, as workspace paths. A screenshot dropped in mid-turn with no words is a legitimate thing to send."),
		editorContext: Mp.optional().describe("What you have open, folded in so that pointing words resolve.")
	}).refine((e) => e.text.trim().length > 0 || (e.attachments?.length ?? 0) > 0, { message: "text or attachments required" }), im = L({ conversationId: M().min(1).describe("Which conversation's running turn to cancel.") }), am = L({
		agent: Op.describe("Which provider serves the re-run."),
		harness: Ap.describe("Which agentic loop runs it."),
		account: M().optional().describe("Which of that provider's accounts pays for it. Leave it out for the first one."),
		model: M().optional().describe("Which model. Leave it out to keep the one the refused turn named."),
		carry: F().optional().describe("When the account changes, keep the provider session (the model keeps everything, and re-reads all of it once on the other account) rather than opening a fresh one seeded from the record. Ignored when the provider changes, or when nothing changes.")
	}), om = L({
		conversationId: M().min(1).describe("Which conversation's held turn to run again."),
		routing: am.optional().describe("Who serves the re-run, when the conversation has been re-pointed since it was refused. Leave it out to run it on whatever the turn carried.")
	});
})), cm, lm = v((() => {
	G(), hp(), cm = B(mp);
})), um, dm, fm, pm, mm, hm, gm, _m, vm, ym, bm, xm, Sm, Cm, wm, Tm, Em, Dm = v((() => {
	G(), sm(), lm(), um = L({
		id: M().describe("The account's id, which is what a turn names to spend on it and what disconnecting takes."),
		label: M().describe("What it is called here, which somebody can change."),
		email: M().optional().describe("Who it signs in as, in the provider's own words. Kept beside the label rather than folded into it, so a renamed account can still say whose it is. Absent when the provider says nothing, which is exactly when renaming is the only answer."),
		organization: M().optional().describe("Which organisation it belongs to, where the provider says."),
		scope: M().optional().describe("What the credential is permitted to do, in the provider's terms."),
		connectedAt: P().describe("When it was connected, in milliseconds."),
		needsReauth: F().optional().describe("Its stored credential can no longer be renewed and somebody has to sign in again. Absent means healthy, or not checked yet."),
		detail: M().optional().describe("Why, in words a person can act on."),
		usage: Yp.optional().describe("How full its plan limits were when last measured, so a picker can show what is left before committing work to it. Absent until a reading exists, which reads as unknown rather than as nothing left.")
	}), dm = L({ accounts: I(um).describe("The connected accounts. Tokens never travel in this shape: being in this list is what connected means.") }), fm = L({ force: Wd().default(!1).describe("Measure the plan limits again before answering, rather than serving a recent reading. Slower, and the right thing when somebody has just changed a plan and is asking whether what they can see is still true.") }), pm = L({ id: M().min(1).describe("Which account.") }), mm = L({
		id: M().min(1).describe("Which account."),
		label: M().max(80).describe("The new name. Blank restores the one derived from the sign-in, rather than leaving a nameless row.")
	}), hm = B([
		"device",
		"redirect",
		"paste"
	]), gm = L({
		url: M().describe("The page to open and sign in on."),
		code: M().describe("The one-time code the page will ask for, where the vendor issues one. Blank when the page is already addressed to this attempt."),
		state: M().describe("For a redirect sign-in, the marker in the address the browser lands on, so a pasted URL can be recognised as this attempt's. Blank otherwise."),
		flow: hm.describe("How this attempt ends. A device sign-in finishes by itself and you watch the account list; a redirect needs the address it landed on handed back; a paste needs the code the page showed."),
		variant: M().describe("Which of the provider's estates this attempt signs in to. Blank for a provider with one."),
		handshake: M().describe("This attempt's id, for finishing or abandoning it. Not a credential and not redeemable: the proof that completes the sign-in never leaves the sandbox."),
		expiresAt: P().describe("When this attempt stops being answerable, in milliseconds, so a card can stop waiting instead of spinning.")
	}), _m = L({ variant: M().min(1).optional().describe("Which estate to sign in to. Absent takes the provider's default.") }), vm = L({
		handshake: M().min(1).describe("Which attempt this belongs to."),
		code: M().optional().describe("The code the sign-in page showed, for a paste sign-in."),
		redirectUrl: M().optional().describe("The address the browser was sent to, whole, for a redirect sign-in. The grant is inside it."),
		label: M().optional().describe("What to call the account. Blank derives one from the sign-in.")
	}), ym = L({ account: um.optional().describe("The account it connected, where the sign-in ends here. Absent means keep watching the account list.") }), bm = L({ handshake: M().min(1).describe("Which attempt to stop waiting on.") }), xm = L({
		url: M().describe("The page to open."),
		code: M().describe("The one-time code, where the provider uses one."),
		state: M().min(1).describe("The handshake's id, which status reads and the finishing call sends back."),
		flow: B(["device", "redirect"]).describe("Which shape this is. A device sign-in finishes by itself and you poll the attempt; a redirect needs the address it landed on handed back. Said outright rather than guessed at from whether a code happens to exist.")
	}), Sm = R("status", [
		L({ status: V("wait") }),
		L({ status: V("ok") }),
		L({
			status: V("error"),
			error: M().min(1)
		})
	]), Cm = L({
		provider: cm.describe("Which provider."),
		redirectUrl: M().min(1).describe("The address the browser was sent to, whole. The grant is inside it."),
		state: M().min(1).describe("The handshake this belongs to. A mismatch is refused.")
	}), wm = B(["reasoning", "fast"]), Tm = L({
		id: M().describe("What to name when asking for this model."),
		label: M().describe("What to call it on screen."),
		efforts: I(M()).optional().describe("The thinking levels it accepts, where the provider says. Empty means use your own defaults."),
		description: M().optional().describe("What it is good for, in the provider's own words. Absent where the provider publishes only ids, which is the honest answer rather than something to paper over with a hand-written table."),
		badges: I(wm).optional().describe("What it is known for, where the provider says so."),
		contextWindow: P().optional().describe("How many tokens this model will accept in one request, where the server publishes it.")
	}), Em = L({
		models: I(Tm).describe("What this provider serves, in its own preference order, which is not rearranged here. Never empty."),
		default: M().describe("Which one a fresh conversation starts on. Always present.")
	});
})), Z, Om, km, Q, $ = v((() => {
	G(), Z = L({ ok: V(!0).describe("Always true. A route that answers this either did the thing or refused with a status; there is no third outcome to report.") }), Om = B([
		"viewer",
		"collaborator",
		"maintainer",
		"owner"
	]), B([
		"viewer",
		"collaborator",
		"maintainer"
	]), km = L({ token: M().min(1).describe("The freshly minted credential. The previous one stopped working the moment this answered.") }), Q = L({ repo: M().describe("Which repository. \"root\" is the workspace itself; anything else is a repository's folder relative to the workspace root, URL-encoded.") });
})), Am, jm = v((() => {
	J(), X(), Dm(), $(), Am = {
		start: q.route({
			method: "POST",
			path: "/accounts/{provider}/login/start",
			summary: "Begin connecting an account",
			description: "Hands back the page to sign in on, and the code it will ask for where there is one. The sandbox holds the proof and finishes what it can itself: a device sign-in lands in the account list on its own, a paste or a redirect needs one thing brought back to the finishing call."
		}).input(kp.extend(_m.shape)).output(gm),
		complete: q.route({
			method: "POST",
			path: "/accounts/{provider}/login/complete",
			summary: "Finish a sign-in with what the page handed back",
			description: "Takes the code the page showed, or the address a redirect landed on, and finishes the attempt. Answers with the account where the exchange ends here; otherwise the sandbox still has a mint to do and the row appears in the account list."
		}).input(kp.extend(vm.shape)).output(ym),
		cancel: q.route({
			method: "POST",
			path: "/accounts/{provider}/login/cancel",
			summary: "Abandon a sign-in",
			description: "Stops waiting on a sign-in nobody completed. An abandoned attempt also expires on its own."
		}).input(kp.extend(bm.shape)).output(Z),
		accounts: q.route({
			method: "GET",
			path: "/accounts/{provider}",
			summary: "Connected accounts of a provider",
			description: "Each connected account with how full its plan limits were when last measured, where the provider publishes any. Ask for a fresh measurement and it takes one before answering, which is slower. The credentials themselves never travel: being in this list is what connected means."
		}).input(kp.extend(fm.shape)).output(dm),
		rename: q.route({
			method: "POST",
			path: "/accounts/{provider}/rename",
			summary: "Rename an account",
			description: "Changes the label one account shows under, so several are tellable apart. Blank restores the one derived from the sign-in."
		}).input(kp.extend(mm.shape)).output(um),
		disconnect: q.route({
			method: "POST",
			path: "/accounts/{provider}/disconnect",
			summary: "Disconnect an account",
			description: "Clears one stored credential, and stops any sign-in still in flight for this provider. The others stay connected."
		}).input(kp.extend(pm.shape)).output(Z)
	};
})), Mm, Nm, Pm, Fm, Im, Lm = v((() => {
	G(), X(), Mm = L({
		id: M().describe("The entry's own id."),
		at: P().describe("When it happened, in milliseconds. Also what you page by."),
		provider: M().optional().describe("Which outside service, when one was involved. Absent for the sandbox's own events."),
		account: M().optional().describe("Which account handled it. Absent for the sandbox's own events and for work run on a provider's default."),
		direction: B([
			"in",
			"out",
			"system"
		]).describe("Whether something arrived, something went out, or the sandbox did it to itself."),
		type: M().describe("Exactly what happened: a message received or sent, a reaction, a turn starting or ending, a rule doing something. A rule that ran and passed says nothing here, because a feed of green ticks is one the eye learns to skip."),
		channelId: M().optional().describe("Which channel or thread it happened in."),
		author: M().optional().describe("Who sent it, for something that arrived."),
		actor: M().optional().describe("Who asked for the turn, as the sandbox verified it: a member's email, or token:<label> for a program's control token. Absent for a wake nothing asked for."),
		content: M().optional().describe("The message, in full, whichever direction it went."),
		method: M().optional().describe("The verb of an outgoing call."),
		endpoint: M().optional().describe("The address of an outgoing call. Credentials travel in headers, so they are never here."),
		sessionId: M().optional().describe("The provider session behind it."),
		turnId: M().optional().describe("Ties one turn's entries together. A turn writes several, and read as separate rows they say one thing several times, so a feed groups on this."),
		conversationId: M().optional().describe("Which conversation. This, rather than the provider session, is what the same agent means across a feed, because a session is retired whenever the model changes."),
		title: M().optional().describe("What that conversation was called at the time. Copied in rather than looked up, because an audit entry must still read as words years later, after the conversation has been renamed or pruned."),
		origin: Pp.optional().describe("What woke the conversation from outside, when something did. It is how a turn gets filed under the chat service that caused it rather than under the model that served it."),
		automationIds: I(M()).optional().describe("Which automations were involved."),
		outcome: B(["ok", "error"]).optional().describe("How it ended."),
		error: M().optional().describe("What went wrong, when something did."),
		extra: z(M(), Tu()).optional().describe("Whatever else the source had to say: attachments, participants, a recording's path. Shape varies by source.")
	}), Nm = L({
		provider: M().optional().describe("Narrow it to one outside service."),
		limit: W().min(1).max(500).default(100).describe("How many entries to return."),
		before: W().optional().describe("Only entries older than this timestamp, so paging walks backwards through the feed.")
	}), Pm = L({ events: I(Mm).describe("The audit entries, newest first.") }), Fm = L({
		capabilityId: M().describe("Which connection."),
		provider: M().describe("Which service it is."),
		gateway: B([
			"ready",
			"connecting",
			"pairing",
			"disconnected",
			"idle"
		]).describe("Idle means it is up but has nothing to listen for, which is different from a connection that should be up and is not. Pairing means somebody started a sign-in and never finished it, which no amount of waiting will fix."),
		lastError: M().optional().describe("The most recent thing that went wrong on it.")
	}), Im = L({
		connections: I(Fm).describe("Each source feeding the record, and whether it is working. Probed now rather than remembered."),
		voice: L({
			channelId: M().describe("Which channel."),
			channelName: M().describe("What it is called."),
			startedAt: P().describe("When it joined, in milliseconds."),
			participants: I(M()).describe("Who else is in it.")
		}).optional().describe("A voice call the sandbox is currently in, when it is in one.")
	});
})), Rm, zm = v((() => {
	J(), Lm(), Rm = {
		list: q.route({
			method: "GET",
			path: "/activity",
			summary: "What the agent has done out in the world",
			description: "The audit trail of actions taken on outside services. Read-only on purpose: entries are written by the sandbox alone, which is what makes it a record worth trusting."
		}).input(Nm).output(Pm),
		status: q.route({
			method: "GET",
			path: "/activity/status",
			summary: "Whether the audit trail is being kept",
			description: "Which sources are feeding the record and whether each is working."
		}).output(Im)
	};
})), Bm, Vm, Hm, Um, Wm, Gm, Km, qm, Jm, Ym, Xm, Zm, Qm, $m, eh, th, nh = v((() => {
	G(), Bm = /^[A-Za-z_][A-Za-z0-9_]*$/, Vm = M().regex(Bm).max(128), Hm = L({
		key: Vm.describe("The name to store it under, which is the name a process will find it by."),
		value: M().min(1).describe("The value. It goes straight to your sandbox and never through the platform.")
	}), Um = L({ keys: I(M()).describe("The names that exist here. Only the names: the values never leave the sandbox.") }), Wm = L({ key: Vm.describe("Which secret, by name.") }), Gm = L({ value: M().describe("The value itself. The only place in this API one is ever returned.") }), Km = B(["use", "conversation"]).describe("How far one release goes: `use` asks again every single time (one click releases exactly one use), `conversation` covers the rest of this conversation and is forgotten when the daemon restarts."), qm = B(["secret", "capability"]).describe("Whether this gate covers one stored secret, by the name a reference carries, or one whole connected capability, by its id."), Jm = B([
		"shell",
		"code",
		"browser",
		"session",
		"otp"
	]).describe("What the credential was about to be used for: a shell command, a script, typing into a page, mounting a connected account, or one one-time code."), Ym = L({
		subject: M().min(1).describe("What is gated: a secret's name, or a connected capability's id."),
		kind: qm,
		approvers: I(M().min(3)).min(1).describe("Exactly who may release it, by email, from the people on the Access roster. Not a seniority floor: nobody outside this list can release it, the owner included, unless the owner is on it."),
		scope: Km
	}), Xm = L({ gates: I(Ym).describe("Every gate in force. Names, subjects and approver addresses only: this answer never carries a credential.") }), Zm = L({ subject: M().min(1).describe("Which gate, by the secret name or capability id it covers.") }), Qm = L({
		subject: M().min(1).describe("What to ask for: the secret's name, or the connected capability's id."),
		why: M().max(280).optional().describe("One line on what it is for. The only words on the card that are the agent's."),
		conversationId: M().optional().describe("Which conversation to raise the card in. The CLI fills this from the running turn.")
	}), $m = L({
		granted: V(!0).describe("Always true: a refusal is an error with a sentence, never a `false` here."),
		approvedBy: M().describe("Who released it."),
		message: M().describe("What the grant means in practice, and what to do next.")
	}), eh = L({
		key: M().describe("What identifies it. Unique across the whole inventory, so several accounts of one provider each get their own entry."),
		kind: B([
			"env",
			"generated",
			"capability",
			"provider"
		]).describe("Where it came from: you set it, the sandbox generated it, a connection needs it, or it is a model account's credential."),
		label: M().optional().describe("A friendlier name, for entries that have one."),
		status: B([
			"missing",
			"set",
			"connected"
		]).describe("Whether it exists and, for a connection, whether it is working."),
		requiredBy: I(L({
			resourceId: M().describe("Which resource."),
			type: M().describe("What kind of resource it is.")
		})).describe("What is waiting on it. Empty for a connection's or an account's own credential."),
		storedAt: M().describe("Where it actually lives, in words."),
		revealable: F().describe("Whether its value can be shown at all. Everything except a model account's credential can be."),
		ci: L({
			synced: F().describe("Whether the pipeline has it."),
			pushedAt: M().optional().describe("When it was last sent there.")
		}).optional().describe("Whether a copy has been given to the build pipeline."),
		lastUse: L({
			at: P().describe("When, in milliseconds."),
			lane: B([
				"shell",
				"code",
				"browser"
			]).describe("How it was used: a command, a script, or typed into a page."),
			detail: M().optional().describe("Where it went: the start of the command or script, or the site. Names and destinations only, never values."),
			approvedBy: M().optional().describe("Who released it for that use, when it is gated. Absent when nothing had to be approved.")
		}).optional().describe("The last time an agent actually spent this secret. Absent while it never has been, which most never are."),
		gate: L({
			approvers: I(M()).describe("Who may release it, by email. Nobody else can, whatever their role."),
			scope: Km
		}).optional().describe("Who has to release this before the agent can use it, and for how long one release lasts. Absent when it is not gated.")
	}), th = L({ entries: I(eh).describe("One entry per secret this sandbox knows about, from every place they live. No values, ever.") });
})), rh, ih, ah, oh, sh, ch, lh, uh, dh, fh, ph, mh, hh, gh, _h, vh, yh, bh, xh, Sh, Ch, wh, Th, Eh, Dh, Oh, kh, Ah, jh, Mh, Nh, Ph, Fh = v((() => {
	G(), X(), nh(), rh = L({
		label: M().describe("The choice, in a few words."),
		description: M().describe("What picking it means."),
		preview: M().optional().describe("Something to look at while deciding: a mock-up, a snippet, a layout.")
	}), ih = L({
		question: M().describe("What the agent is asking."),
		header: M().describe("A short label for the question."),
		multiSelect: F().describe("Whether more than one answer can be picked."),
		options: I(rh).describe("The choices offered. A free-text answer is always possible as well.")
	}), ah = L({
		text: M().describe("What would run."),
		language: B(["bash", "javascript"]).describe("Which of the two backends it is written for, named as the grammar that colours it."),
		truncated: F().describe("Whether this is an excerpt of a longer program, so the card can say so instead of ending mid-word. An excerpt always carries the flagged fragment: the beginning, then a window around the fragment, with any skipped middle written into the text as a bracketed count."),
		spans: I(L({
			start: P().int().nonnegative(),
			end: P().int().nonnegative()
		})).describe("Which fragments of the text the pattern match fired on: every matched class's, or, under the hard rule, only the class the title names. Offsets into text, in order, never overlapping.")
	}), oh = L({
		toolName: M().describe("Which tool it wants to use."),
		title: M().optional().describe("The whole question, as a sentence, exactly as the runtime words it."),
		displayName: M().optional().describe("A short phrase for the button, such as read file."),
		description: M().optional().describe("More about what it is asking for."),
		reason: M().optional().describe("Why it is asking at all: a rule, the current mode, something that looked risky."),
		path: M().optional().describe("Which file it concerns, when it concerns one."),
		alwaysLabel: M().optional().describe("The wording for an always-allow answer. Present only when there is something an always could actually remember; without it the only answers are once and no."),
		program: ah.optional().describe("The program this card is holding, when the card is about one. Present on a command gate's card and absent on every other permission ask."),
		explain: M().optional().describe("One plain sentence saying what the program does and why it is being asked about, where the title says something else. Written by the judge that read your safety policy, never by the agent being gated.")
	}), sh = L({
		card: M().describe("Which connection is being asked for."),
		name: M().describe("What it is called, as the catalogue titles it rather than as the agent named it."),
		why: M().optional().describe("The agent's case for connecting it, and the only words on this card that are the agent's.")
	}), ch = L({
		url: M().describe("What is being paid for."),
		description: M().optional().describe("What the endpoint says it is."),
		payTo: M().describe("Where the money goes, taken verbatim from the endpoint's own demand."),
		network: M().describe("On which network."),
		asset: M().describe("In which token."),
		assetName: M().describe("That token's name. It is pegged to the dollar, which is what lets every amount here read as dollars."),
		amountUsd: M().describe("The exact price. Not a ceiling: this scheme has no ranges, so this is the whole spend."),
		spentTodayUsd: M().describe("What has already gone out today."),
		dailyCapUsd: M().describe("What may go out in a day."),
		why: M().optional().describe("The agent's case for paying, and the only words on this card that are the agent's.")
	}), lh = L({
		subject: M().describe("Which credential is being asked for."),
		kind: qm,
		lane: Jm,
		detail: M().optional().describe("Where it would go: the start of the command, the site, or what is being mounted. Never a value: the command still reads as a reference at this point."),
		why: M().optional().describe("The agent's case for using it, and the only words on this card that are the agent's."),
		approvers: I(M()).describe("Who may release it. A click from anyone else is refused and leaves the card standing."),
		scope: Km
	}), uh = L({
		name: M().describe("What to type, without the leading slash."),
		description: M().describe("What it does."),
		hint: M().optional().describe("What its argument should look like, shown after the name.")
	}), dh = L({ agent: Op.optional().describe("Whose commands to read. Leave it out for Claude.") }), fh = L({ commands: I(uh).describe("The shortcut commands, as the provider last published them.") }), ph = L({
		content: M().describe("The item, as the agent wrote it."),
		status: B([
			"pending",
			"in_progress",
			"completed"
		]).describe("Where it is."),
		activeForm: M().optional().describe("How to phrase it while it is happening, so a screen can say what the agent is doing rather than what it plans to do.")
	}), mh = L({
		tokens: P().describe("How much the latest request sent, all told."),
		contextWindow: P().describe("How much the model can hold. The gap between these two is how close the conversation is to being compacted."),
		cachedAt: P().optional().describe("When that request last touched the provider's prompt cache, in milliseconds. The cache's clock runs from here, since a read refreshes it as a write does."),
		cacheTtlMs: P().optional().describe("How long that cache entry lives from `cachedAt`, in milliseconds.")
	}), hh = B([
		"read",
		"edit",
		"delete",
		"move",
		"search",
		"execute",
		"think",
		"fetch",
		"other"
	]), gh = B([
		"pending",
		"in_progress",
		"completed",
		"failed"
	]), _h = L({
		path: M().describe("The file, as a workspace path, whatever directory the tool was run from."),
		line: P().optional().describe("Which line, counting from one.")
	}), vh = R("type", [
		L({
			type: V("text").describe("Plain output."),
			text: M().describe("What the tool said.")
		}),
		L({
			type: V("diff").describe("A change to a file."),
			path: M().describe("Which file, as a workspace path."),
			oldText: M().optional().describe("What was there. Absent for a new file, or where the previous contents are not known."),
			newText: M().describe("What is there now."),
			truncated: F().optional().describe("One of the two sides was too large to send whole.")
		}),
		L({
			type: V("image").describe("A picture the tool produced."),
			path: M().describe("Where it is, as a workspace path. A path rather than the bytes, because the workspace already serves it, sending it inline would bloat every stored record, and this way the picture stays openable afterwards.")
		})
	]), yh = L({
		path: M().describe("Where it lives, as a workspace path."),
		title: M().describe("What it is called: its opening heading, or its file name."),
		markdown: M().describe("The document itself."),
		truncated: F().optional().describe("It was clipped at the wire cap; the file on disk has more."),
		plan: F().optional().describe("It is one of the CLI's plan files, written to be approved rather than merely read.")
	}), bh = M().describe("What to send back when you answer."), xh = {
		requestId: bh,
		text: M().describe("The plan itself."),
		document: yh.optional().describe("The write-up this plan refers to, when the plan itself is a pointer to one.")
	}, Sh = {
		requestId: bh,
		questions: I(ih).describe("What it wants to know."),
		document: yh.optional().describe("The document this turn wrote and is asking about, so the choice can be read beside it.")
	}, Ch = { requestId: bh }, wh = {
		requestId: M(),
		session: M(),
		account: M(),
		message: M()
	}, Th = {
		requestId: M(),
		session: M(),
		message: M()
	}, Eh = {
		requestId: M(),
		offer: sh
	}, Dh = {
		requestId: M(),
		offer: ch
	}, Oh = {
		requestId: M(),
		offer: lh
	}, kh = L({
		outcome: B(["connected", "unfinished"]),
		id: M().optional()
	}), Ah = L({
		outcome: B(["paid", "failed"]),
		amountUsd: M(),
		transaction: M().optional(),
		network: M().optional()
	}), jh = L({
		outcome: B(["released", "refused"]),
		approvedBy: M().optional()
	}), Mh = L({
		kind: V("plan").describe("The agent has written a plan and is waiting for a yes."),
		...xh
	}), Nh = L({
		kind: V("question").describe("The agent has asked you something and is waiting."),
		...Sh
	}), Ph = oh.extend({
		kind: V("permission").describe("The agent wants to use a tool it needs permission for."),
		...Ch
	}), R("kind", [
		Mh,
		Nh,
		Ph
	]);
})), Ih = v((() => {})), Lh = v((() => {})), Rh, zh, Bh = v((() => {
	Ih(), Lh(), Rh = ".intentic", zh = "481795963975-cq9msl6higcd91joidrfp8mjlkuq5fk3.apps.googleusercontent.com", `${zh}`;
})), Vh, Hh, Uh, Wh, Gh = v((() => {
	G(), Vh = /^[a-zA-Z_][a-zA-Z0-9_]{0,39}$/, Hh = L({
		name: M().regex(Vh),
		type: B([
			"string",
			"number",
			"boolean",
			"string[]"
		]),
		description: M().min(1),
		required: F()
	}), Uh = (e) => {
		let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
		for (let r of e) t.has(r.name) && n.add(r.name), t.add(r.name);
		return [...n];
	}, Wh = I(Hh).min(1).max(16).superRefine((e, t) => {
		for (let n of Uh(e)) t.addIssue({
			code: "custom",
			message: `Output field names must be unique; "${n}" is repeated.`
		});
	});
})), Kh, qh, Jh, Yh, Xh, Zh, Qh, $h, eg, tg, ng, rg, ig, ag, og, sg = v((() => {
	G(), Bh(), Gh(), X(), Dp(), Kh = B(["fresh", "continue"]), qh = R("kind", [
		L({ kind: V("none").describe("It produces nothing but its work. The classic make the suite pass: what it leaves behind is a passing suite, and asking it to also file a report is asking it to spend a round on paperwork.") }),
		L({ kind: V("claim").describe("Each round says whether it is done and why. Structured prose: done is a value read rather than a sentence interpreted. Self-assessment, so advisory by construction; it exists because plenty of goals have no command that could check them.") }),
		L({
			kind: V("json").describe("Each round writes a real answer in a shape you declared. This is the one that makes a step's output usable as the next step's input: a paragraph mentioning three files cannot be fed to anything, a list of three files can."),
			fields: Wh.describe("The shape that answer has to match.")
		})
	]), Jh = R("kind", [L({
		kind: V("command").describe("Run something and see if it passes. Deterministic, free, and the only signal here whose answer does not come from a model. A passing test suite beats any amount of self-report."),
		command: M().min(1).describe("The command to run in the conversation's own tree. Exiting cleanly means satisfied.")
	}), L({
		kind: V("judge").describe("Put the question to a separate model with no tools, which reads the round's own report and rules on it, having done none of the work and nothing invested in its being finished."),
		rubric: M().min(1).describe("What that judge is asked."),
		model: M().optional().describe("Which model judges. Leave it out for the cheap one the other small jobs use.")
	})]), Yh = L({
		done: F().describe("Whether the goal is met. Reading this is the whole point of the file."),
		reason: M().describe("Why, in one line. The most-read sentence in the feature: the next round reads it first and the history shows it."),
		evidence: M().optional().describe("What was checked to know that. Optional, so a round with nothing to point at says so by leaving it out rather than by inventing a sentence."),
		data: z(M(), Tu()).optional().describe("The declared answer, for a loop that asked for one, checked against the shape it declared.")
	}), Xh = 50, Zh = L({
		conversationId: Np.describe("The conversation to loop. It need not exist yet: naming a fresh one opens it, which is what lets run this until it passes be the first thing you ever say."),
		goal: M().min(1).describe("What done means, in your words. It goes into every round's instructions and into the judge's question, so the model is told the bar rather than left to infer it."),
		prompt: M().min(1).describe("What each round is asked to do. The suite passes is the goal; run the tests, take the top failure, fix it is the instruction."),
		context: Kh.describe("How each round meets the last. Starting fresh makes the files the memory rather than the conversation, so the twentieth round reads the tree as clearly as the first, and costs a re-read each time. Carrying on is cheaper and keeps the reasoning, which suits a short polish-this loop and degrades on long ones: a session that has spent eleven rounds arguing for its own approach is the worst available judge of whether that approach is finished."),
		output: qh,
		checks: I(Jh).describe("What else has to be true, all of them together. A list because the suite passes and the report is written is a real bar, and running it as two loops would do the work twice."),
		maxIterations: P().int().min(1).max(Xh).describe("How many rounds before it gives up. A loop that has not got there in fifty is not one round short of it."),
		maxSpendUsd: P().positive().optional().describe("A ceiling on what the whole loop may spend, in dollars. Optional for a short loop somebody is watching, and strongly wanted otherwise: this is the first thing here that can keep spending with nobody pressing anything between rounds."),
		stallLimit: P().int().min(1).describe("Stop after this many rounds in a row that changed nothing on disk. The guard that matters most: a loop's failure is not runaway success, it is an agent re-reading the same three files, restating the same plan and declaring more work remains, eleven times. Every one of those rounds succeeds, so only the tree not moving catches it."),
		isolated: F().describe("Whether it works in the conversation's own private copy or in the shared tree. It also decides where a check runs: testing the shared tree would be testing code this loop has not merged yet."),
		agent: Op.optional().describe("Which provider the rounds run on. Absent falls back to the conversation's own last choice."),
		harness: Ap.optional().describe("Which agentic loop they run on."),
		account: M().optional().describe("Which account pays."),
		model: M().optional().describe("Which model."),
		actsAs: Y.optional().describe("Which persona the rounds act as. It matters here: every round is unwatched, and an unwatched turn naming no persona reaches no signed-in account at all, so pinning one is how a loop gets hands."),
		worktreeBase: I(jp).min(1).max(50).optional().describe("Pin the private copy to these exact commits, so a restart cannot quietly change what the loop is working on."),
		autoLand: F().optional().describe("Whether the work merges as it goes.")
	}), `${Rh}`, Qh = L({
		n: P().int().min(1).describe("Which round this was."),
		at: P().describe("When it ran, in milliseconds."),
		outcome: B([
			"continue",
			"done",
			"error"
		]).describe("How the round ended, which is not the same question as how the loop did. A round that errored does not end the loop by itself: a failing turn is often exactly what the next round is meant to fix."),
		detail: M().optional().describe("What the check said, in its own words. What a run history is actually read for: why it kept going, and why it stopped."),
		costUsd: P().optional().describe("What the round cost, in dollars."),
		changed: F().describe("Whether anything on disk moved. Three unchanged rounds in a row is the shape of a loop that is not working."),
		sessionId: M().optional().describe("The session it ran on, and the way from a history row to a readable record.")
	}), $h = B([
		"running",
		"done",
		"exhausted",
		"stalled",
		"overspent",
		"stopped",
		"error"
	]), eg = Zh.extend({
		state: $h.describe("How it ended, and each of these is a different thing to be told. Out of rounds says give it more room; stalled says it is not making progress and more room will not help. Overspent, stopped by a person, and the loop itself failing are all their own answers."),
		startedAt: P().describe("When it began, in milliseconds."),
		endedAt: P().optional().describe("When it ended, in milliseconds."),
		resumed: P().int().min(0).describe("How many times the sandbox restarted under it and picked it back up. Counted rather than flagged, so a loop whose round reliably kills the sandbox is not resurrected on every boot for ever."),
		detail: M().optional().describe("Why it ended, for the endings whose reason is not in their name."),
		iterations: I(Qh).describe("Every round, in order. Why it stopped at the fourth is the question a loop gets read for, and this is the answer.")
	}), tg = L({ loops: I(eg).describe("Every loop this workspace has run, newest first, kept after they end.") }), ng = L({ conversationId: Np.describe("Which conversation's loop.") }), rg = L({
		id: Y.describe("The design's id."),
		name: M().min(1).max(60).describe("What to call it. Short, because it has to be readable on a small badge."),
		description: M().max(280).optional().describe("What it is for, in one line. Optional, because a well-named loop has already said it."),
		prompt: M().optional().describe("What each round is asked to do, when that is worth saying separately from the goal. Absent means each round works towards the goal however it sees fit."),
		context: Kh.describe("How each round meets the last: starting clean, or carrying on."),
		output: qh.describe("What it has to produce."),
		checks: I(Jh).describe("What else has to be true."),
		maxIterations: P().int().min(1).max(Xh).describe("How many rounds before it gives up."),
		maxSpendUsd: P().positive().optional().describe("A ceiling on what it may spend, in dollars."),
		stallLimit: P().int().min(1).describe("Stop after this many rounds in a row that changed nothing.")
	}), ig = L({ designs: I(rg).describe("Saved loops: the machinery with the goal left out, so one design can be pointed at a different job every time.") }), ag = L({
		design: rg.describe("The design to write."),
		create: F().describe("Whether you mean to make a new one or replace an existing one, so an id that happens to collide cannot silently overwrite the one you had.")
	}), og = L({ id: Y.describe("Which saved loop.") });
})), cg, lg, ug, dg, fg, pg, mg, hg, gg, _g, vg, yg, bg, xg, Sg, Cg, wg, Tg, Eg, Dg, Og, kg, Ag, jg, Mg, Ng, Pg, Fg, Ig, Lg, Rg, zg, Bg, Vg, Hg, Ug = v((() => {
	G(), X(), sg(), cg = B([
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
	]), lg = L({
		tool: M().optional().describe("The last tool it reached for."),
		target: M().optional().describe("What it reached for that tool with: a file, a command, a URL."),
		todo: M().optional().describe("The item on its own list that it is working through.")
	}), ug = L({
		done: P().describe("Items it has completed."),
		total: P().describe("Items on the list. Never zero: a conversation that kept no list carries no clause at all.")
	}), dg = L({
		plan: F().describe("It has proposed a plan and is waiting for a yes."),
		question: F().describe("It has asked you something."),
		permission: F().describe("It wants to use a tool it needs permission for."),
		capability: F().describe("It needs something connected that is not connected yet."),
		credential: F().describe("It is waiting for a named person to release a credential. The one pause that may not be yours to clear, whatever your role."),
		conflict: F().describe("Its work cannot be merged without somebody resolving a clash.")
	}), fg = L({
		at: P().describe("When the turn that left this ended, in milliseconds."),
		steps: L({
			open: P().describe("Items on it that were never completed."),
			total: P().describe("Items on the whole list."),
			next: M().optional().describe("The one it would have done next: what it was working through, or the first still waiting.")
		}).optional().describe("The agent's own checklist where that turn left it. Absent for a conversation that kept no list."),
		check: M().optional().describe("The end-of-turn check that was still failing when the turn ended, by name.")
	}), pg = L({
		subject: M().describe("One line saying what the merged work did, read off the code rather than off the opening request. A conversation that asks for an audit and then spends four turns fixing what it found needs a subject about the fixes."),
		note: M().optional().describe("The same change said to somebody who uses the product, for a repository that keeps a changelog. Usually absent, because most changes are not ones a user would notice."),
		breaking: M().optional().describe("What this change takes away, for anything already relying on it. Nearly always absent: it is for removals, not for additions.")
	}), mg = L({
		provider: M().min(1).describe("Which provider was asked."),
		model: M().min(1).describe("Which of its models."),
		status: B([
			"asking",
			"answered",
			"refused",
			"skipped"
		]).describe("How this one went. Skipped means it was not asked at all, because it refused a few minutes ago and the walk stepped over it."),
		at: P().optional().describe("When it started being asked, in milliseconds. Absent for one that was skipped, which cost no time."),
		ms: P().optional().describe("How long it took. Absent while it is still being asked."),
		reason: M().optional().describe("Why it refused, in its own words.")
	}), hg = L({
		startedAt: P().describe("When the drafting began, in milliseconds."),
		steps: I(mg).describe("Each model that was asked, in the order they were spent, so the list is the timeline. Empty with no outcome means the diff is still being read."),
		outcome: B(["written", "failed"]).optional().describe("How it ended. Absent means it is still going."),
		reason: M().optional().describe("The one-line account of a failure, for a screen with one line to spend. The steps carry each model's own words."),
		finishedAt: P().optional().describe("When it ended, in milliseconds.")
	}), gg = B([
		"workspace",
		"diverged",
		"binary"
	]), _g = L({
		id: M().describe("The conversation id, which is how every other call addresses it."),
		sessionId: M().optional().describe("The provider session behind the last turn. It is retired whenever the model or account changes."),
		title: M().optional().describe("What to call it: the first prompt cut to one line, unless somebody renamed it."),
		status: cg.describe("What it is doing. Stopping and stopped are the two halves of somebody pressing stop, because a cancel is not instant; dismissing is the same window for a question waved away, which ends the turn too but owes the user nothing; resuming means the sandbox is already putting right whatever killed the turn; landing means its work is being carried into the workspace right now, and nothing may act on its branch until that settles."),
		failure: M().optional().describe("Why the last turn failed, in the words it died on. Absent unless it did, and cleared the moment it runs again. Carried here because the word error on its own is not an answer, least of all for a run nobody was watching."),
		failureCode: M().optional().describe("Which kind of failure it was, as the turn's own error frame coded it. Absent for a failure nothing could classify, which reads as the plain red line it is."),
		limitResetsAt: P().optional().describe("When the spent allowance reopens, in epoch seconds. Absent when the provider publishes no instant."),
		limitHeld: F().optional().describe("Whether the refused turn is held whole, so sending again re-runs it instead of appending to it."),
		limitScheduled: F().optional().describe("Whether the held turn is already booked to go again at the reset, so nobody has to press anything."),
		limitMoving: M().optional().describe("The account the held turn is being moved to by the owner's policy, while that move is booked."),
		provider: Op.describe("Which model provider it runs on."),
		harness: Ap.describe("Which agentic loop it runs on."),
		runner: M().optional().describe("The runner this conversation runs on. Absent means this sandbox."),
		startIn: M().optional().describe("Which folder it opened in, relative to the workspace root. Absent means the root."),
		actsAs: M().optional().describe("Which persona its first turn acted as. Absent for an ordinary chat."),
		model: M().optional().describe("What its last turn ran with. Kept per conversation so opening it restores the choices made in it, rather than whatever some other tab last picked."),
		effort: M().optional().describe("How hard that turn was told to think."),
		thinking: F().optional().describe("Whether that turn showed its reasoning."),
		fast: F().optional().describe("Whether that turn asked for higher speed. What was asked for, not what was served."),
		tier: B(["fast", "standard"]).optional().describe("How hard its last turn looked to the complexity judge. What the next turn's preview needs, not what actually ran."),
		tierHold: F().optional().describe("Whether this conversation is pinned to the picked model, so a turn that looks simple is never moved to a cheaper one."),
		account: M().optional().describe("Which connected account paid for it."),
		branch: M().optional().describe("The branch its private copy works on. Absent for a conversation that works directly in the shared tree."),
		autoLand: F().optional().describe("This conversation's own answer to whether its work merges automatically. Absent means it follows the sandbox-wide setting, which is the common case."),
		resumeAfterOutage: F().optional(),
		resumeAfterLimit: F().optional(),
		moveAfterLimit: F().optional(),
		landRequested: L({
			email: M().describe("Who asked."),
			name: M().optional().describe("Their display name."),
			at: P().describe("When they asked, in milliseconds.")
		}).optional().describe("A collaborator has asked a maintainer to merge this work. Cleared by whichever merge or discard answers it. Absent means nobody is waiting."),
		origin: Pp.optional().describe("Where the conversation came from when nobody typed it: a chat mention, a visitor's message, a webhook. Absent means a person started it."),
		startedBy: M().optional().describe("Who asked for the first turn, as the sandbox verified it: a member's email, or token:<label> for a program's control token. Absent when nothing was verified (a wake, a loopback caller)."),
		forkedFrom: Bp.optional().describe("The conversation this one was cut from. Recorded once and never cleared: it is the relationship, not a pending state."),
		base: M().optional().describe("The commit its private copy started from, shortened."),
		costUsd: P().optional().describe("What it has cost so far, in dollars. A subagent's spend is its own and is not folded in here."),
		inputTokens: P().optional().describe("Tokens sent."),
		outputTokens: P().optional().describe("Tokens received."),
		contextTokens: P().optional().describe("How much of the window the conversation currently fills."),
		contextWindow: P().optional().describe("How large that window is."),
		promptCache: L({
			at: P().describe("When its last request touched the provider's prompt cache, in milliseconds."),
			ttlMs: P().describe("How long that entry lives from `at`, in milliseconds.")
		}).optional().describe("When this conversation's prompt cache was last kept alive and how long it lasts, which together say when picking the conversation up stops being cheap. Absent when the provider publishes nothing to ground it on."),
		activity: lg.optional().describe("What it is doing at this moment."),
		checklist: ug.optional().describe("How far it is through its own checklist. Absent for a conversation that kept no list, which is most short ones."),
		landedMessageDraft: hg.optional().describe("The whole story of this merge's commit message being written: which models were asked, how long each took, what refused and in what words. Forgotten on restart, which is right, because a restart also killed the drafting it describes."),
		landedMessage: pg.optional().describe("What this conversation's merged work is called, once the drafting above has finished. It arrives on the same push that ends the draft, so the promise and the answer travel together."),
		startedAt: P().optional().describe("When the running turn started, in milliseconds. Absent when none is running."),
		updatedAt: P().describe("When it last did something, in milliseconds. Reading it does not count."),
		seenAt: P().optional().describe("When somebody last opened it, in milliseconds. Newer activity than this is what makes it unread. Kept by the sandbox rather than by a browser, so clearing site data or picking up a phone does not resurrect every badge."),
		attention: dg.describe("Which kinds of waiting-for-you it is doing."),
		conflictCauses: I(gg).optional().describe("Why its work will not merge, and so who can clear it: your own uncommitted edits, which only you can commit or stash, against a moved main line or an unmergeable binary, which the conversation can redo on its own copy. Absent unless it is refusing to merge."),
		unfinished: fg.optional().describe("What its last turn left open: steps it never completed, a check still failing. Absent for a turn that finished what it started."),
		turns: P().optional().describe("Turns it has finished."),
		toolUses: P().optional().describe("Tools it has used, over its whole life."),
		subagents: L({
			running: P().describe("Subagents working right now."),
			total: P().describe("Subagents it has started over its whole life.")
		}).optional().describe("Subagents and child agents this one delegated to. Absent means it never has, which is most conversations. Their spend is their own and is not folded into this conversation's cost."),
		diff: L({
			files: P().describe("Files touched."),
			insertions: P().describe("Lines added."),
			deletions: P().describe("Lines removed.")
		}).optional().describe("Everything it has written, measured from where it started. Independent of how much has been merged."),
		landedPresence: L({
			landed: P().describe("Paths this conversation merged in."),
			present: P().describe("How many of them are still there, either pending or committed.")
		}).optional().describe("Present only when some of what it merged has since been thrown away. Absent is the steady state: its presence is the signal, so an ordinary card spends no line on it."),
		loop: L({
			state: $h.describe("How the loop is going."),
			iteration: P().int().min(0).describe("Which round it is on."),
			maxIterations: P().int().min(1).describe("How many rounds it will attempt before giving up."),
			goal: M().describe("What it is looping towards.")
		}).optional().describe("The loop driving this conversation, if one is. Absent for an ordinary conversation, which is nearly all of them."),
		workflow: L({
			runId: M().describe("The run this belongs to, which is how a board groups its steps together."),
			name: M().describe("The workflow's name."),
			step: M().describe("Which step this conversation is on now. It moves when steps are chained."),
			index: P().int().min(1).describe("This step's place in the workflow, counting from one."),
			total: P().int().min(1).describe("How many steps the workflow has.")
		}).optional().describe("The workflow run this conversation is a step of. Without it, a four-step run reads as four unrelated conversations that happen to have started together."),
		watches: I(L({
			id: M().describe("The daemon's handle for this watch, the same one the agent was given when it armed it."),
			note: M().describe("The agent's own line on what it is waiting for."),
			intervalSeconds: P().int().min(1).describe("How often the check runs."),
			deadlineAt: P().describe("When it gives up and wakes the conversation anyway, in milliseconds. Every watch has one.")
		})).optional().describe("Outside conditions this conversation is parked on, each of which will wake it. Absent means none, which is nearly every conversation: an armed watch is why a finished-looking agent starts working by itself, and why a hosted machine will not go idle."),
		archivedAt: P().optional().describe("When it was put away, in milliseconds. Nothing was lost: its branch, its record and every counter stayed, and bringing it back gives it a fresh working copy. Absent means it is live on the board.")
	}), vg = L({ id: M().min(1).describe("Which conversation.") }), yg = vg.extend({
		before: W().int().optional().describe("Return the messages before this position in the record: the `from` of the page below. Absent asks for the most recent turns."),
		turns: W().int().min(1).max(200).optional().describe("How many of the user's turns to return, newest first. Absent takes the daemon's default.")
	}), bg = L({ ids: I(M().min(1)).max(500).optional().describe("Which conversations to put away. Leave it out for every finished one that can be archived right now.") }), xg = L({ ids: I(M().min(1)).min(1).max(500).describe("Which conversations.") }), Sg = L({
		moved: I(_g).describe("What actually moved, whole, rather than the fleet afterwards. Two archives finishing at once would each carry a snapshot from a different instant, and swapping one in wholesale would let the slower answer resurrect what the faster one just filed away."),
		rev: P().describe("The version of the fleet that includes this move, so a caller can hold its own optimistic change until it sees a list at least that new.")
	}), Cg = Sg.extend({ failed: I(L({
		id: M().describe("Which conversation stayed on the board."),
		reason: M().describe("Why its working copy could not be released, in the words the failure came with.")
	})).describe("The conversations this press could not put away, each with the reason, so the board can say it instead of reporting silence.") }), wg = L({ removed: I(M()).describe("Which conversations were deleted, as ids. Ids rather than whole cards, because these no longer exist anywhere: there is nothing left to show and nothing to put back.") }), Tg = L({
		query: M().trim().min(2).describe("What to look for. Searched against what was said, both sides of the conversation, and nothing else: not the thinking, not the tool output, which between them name nearly every identifier in the workspace and would return most of the board."),
		caseSensitive: Wd().optional().describe("Whether capitals matter.")
	}), Eg = B(["user", "agent"]), Dg = L({
		text: M().describe("The matching line, with a little either side of it."),
		speaker: Eg.describe("Who said it. Carried with the words rather than beside them, because a line of the agent's prose under a card reads as something you typed until the row says otherwise.")
	}), Og = L({
		id: M().describe("Which conversation matched."),
		snippet: Dg.optional().describe("Why, in its own words. Absent when the title was the match, which the card already shows: repeating it underneath is noise where evidence was wanted.")
	}), kg = L({
		matches: I(Og).describe("What matched, from the live fleet and the archive together."),
		scanned: P().describe("How many conversations were actually read, so a screen can say when a search saw less than everything rather than implying it saw all of it."),
		indexing: F().describe("Whether what was said is still being read in the background. True means this answer can still grow, so a screen must say it is incomplete rather than presenting it as the whole list.")
	}), Ag = L({
		id: M().min(1).describe("Which conversation."),
		title: M().trim().min(1).max(80).describe("What to call it from now on.")
	}), jg = L({
		id: M().min(1).describe("Which conversation."),
		text: M().trim().min(1).max(8e3).describe("The words to put in the agent's mouth. Bounded just above what the next turn can carry whole, because a line too long to be handed over intact would reach the agent truncated and quietly break the very thing this is for.")
	}), Mg = L({
		id: M().min(1).describe("Which conversation."),
		autoLand: F().nullable().describe("Whether its work merges automatically when a turn finishes. Null clears the override and goes back to following the sandbox-wide setting, so a conversation does not sit holding a frozen copy of a default it has quietly stopped following.")
	}), Ng = L({
		id: M().min(1).describe("Which conversation."),
		resumeAfterOutage: F().nullable().describe("Whether it retries by itself when the model provider was what failed. Null clears the override back to the sandbox-wide setting.")
	}), Pg = L({
		id: M().min(1).describe("Which conversation."),
		resumeAfterLimit: F().nullable().describe("Whether the turn a spent allowance refused is sent again by itself once the window reopens. Null clears the override back to the sandbox-wide setting.")
	}), Fg = L({
		id: M().min(1).describe("Which conversation."),
		moveAfterLimit: F().nullable().describe("Whether the turn a spent allowance refused is moved to another connected account of the same provider that has room, as soon as the refusal lands. Null clears the override back to the sandbox-wide setting.")
	}), Ig = L({
		id: M().min(1).describe("Which conversation."),
		repo: M().min(1).describe("Which repository."),
		path: M().min(1).describe("Which file, relative to that repository.")
	}), Lg = L({
		path: M().describe("Which file."),
		reason: gg.describe("Why it would not merge, and the three have nothing in common but the symptom. Your own uncommitted edits on that path, where yours is the copy at risk. The shared tree having moved under the conversation since it started, where nothing of yours is at risk. Or a file git cannot merge at all, where no automatic answer exists.")
	}), Rg = L({
		repo: M().describe("Which repository."),
		paths: I(Lg).describe("The files that genuinely would not apply. Not the whole change: reporting everything whenever the cause could not be pinned down turned four real conflicts into a wall of fourteen."),
		clean: P().describe("How many files in this repository passed but remain held with the refused composition. Zero alongside an empty list means the repository could not be reached at all."),
		mainBranch: M().optional().describe("The branch your own checkout is on, which is what the conversation has to rebase onto. Carried because only the sandbox can see it. Absent where there is no name to give.")
	}), zg = L({
		landed: F().describe("Whether the entire composed change was applied."),
		conflicts: I(Rg).optional().describe("What stopped the whole composed change, grouped per repository."),
		resolving: I(L({
			repo: M().describe("Which repository."),
			paths: I(M()).describe("Which files now hold conflict markers to sort out by hand.")
		})).optional().describe("Files left half-merged when you asked to carry the whole composition with its conflicts marked for resolution."),
		held: F().optional().describe("Nothing was applied and nothing failed: there is work waiting on the branch for a deliberate merge. Not merged on its own cannot say that, because on its own it means refused.")
	}), Bg = B([
		"check",
		"merge",
		"measure"
	]), Vg = B(["cumulative", "outstanding"]), Hg = L({
		id: M().min(1).describe("Which conversation's work to merge."),
		mode: Bg.optional().describe("How to apply it. The default applies every repository or none, so a refusal leaves the workspace exactly as it was. The other carries the whole composition and leaves conflicted paths with markers to resolve by hand."),
		span: Vg.optional().describe("How much of the work to take. Leave it out for everything not yet merged."),
		force: F().optional().describe("Go ahead despite a check that would otherwise refuse.")
	});
})), Wg, Gg = v((() => {
	G(), Wg = L({
		status: B([
			"allowed",
			"allowed_warning",
			"rejected"
		]),
		resetsAt: P().optional(),
		rateLimitType: M().optional(),
		utilization: P().optional()
	});
})), Kg, qg = v((() => {
	G(), Kg = B([
		"off",
		"cooldown",
		"on"
	]);
})), Jg, Yg, Xg, Zg, Qg, $g, e_, t_, n_, r_, i_, a_, o_, s_, c_, l_ = v((() => {
	G(), Jg = L({
		name: M().describe("Its id, and what the close route takes."),
		label: M().optional().describe("What to call it on screen."),
		kind: B([
			"shell",
			"panel",
			"agent",
			"job",
			"process"
		]).describe("What sort of thing it is: a terminal somebody opened, a repository's dev server, where an agent's commands run, a job the sandbox started, or a background process that is watched rather than typed into."),
		running: F().describe("Whether it is alive. A finished one-shot job leaves a dead shell behind, which reads as false and is how it gets swept up."),
		activityAt: P().describe("When it last produced output, in milliseconds. Zero means it did not say, which is unknown rather than 1970."),
		exitCode: P().optional().describe("How the last thing in it ended. Absent while that pane is still alive."),
		command: M().optional().describe("What is running in it right now. Absent when it is sitting at a prompt. Not a second spelling of whether it is alive: this says whether anything is happening, which is what a close button should ask about before it ends something."),
		extensionId: M().optional().describe("Which extension declared this process, when one did."),
		processName: M().optional().describe("Which of that extension's processes it is, which together with the id above addresses its start and stop routes."),
		help: L({
			requestId: M().describe("What to send back when you answer, through the agent reply route."),
			message: M().describe("What the agent needs, in its own words."),
			requestedAt: P().describe("When it asked, in milliseconds.")
		}).optional().describe("The agent has stopped at something only a person can clear, and is waiting at this terminal. Present only while it is waiting.")
	}), Yg = L({ sessions: I(Jg).describe("Every live surface the sandbox is holding, in one list, because the question they all answer is the same one.") }), Xg = L({ name: M().describe("Which terminal.") }), Zg = L({
		name: M().describe("Which terminal."),
		lines: W().min(1).max(1e5).default(2e4).describe("How far back to ask for. Clamped to the history that actually exists.")
	}), Qg = L({
		name: M().describe("Which terminal this is from."),
		text: M().describe("The history, oldest line first, with wrapped lines rejoined so a copied address or path comes back whole."),
		lines: P().describe("How many lines you got."),
		truncated: F().describe("It stopped because you asked for that many, not because the history ran out.")
	}), $g = L({
		id: M().describe("Stable for the life of the page, which is what lets a tab survive a refresh of this list. Its address changes as the agent navigates and its position changes when a sibling closes."),
		title: M().optional().describe("The page's title. Absent mid-navigation, which is exactly when a tab still has to be drawn."),
		url: M().describe("Where it is."),
		active: F().describe("The one the agent last touched, or for a finished session, the one it ended on. Exactly one page has this.")
	}), e_ = L({
		name: M().describe("Its id, and what the close route takes."),
		label: M().describe("What to call it on screen: the open page's title, or its site, or which browser this is."),
		server: M().describe("Which browser drives it: the credential-free one, or a signed-in account's. The difference between a throwaway page and one logged in as you, which is worth saying out loud."),
		running: F().describe("Whether it is still open. A closed one is listed for a while with the pages it had, as the record of where the agent went."),
		activityAt: P().describe("When it last did anything, in milliseconds."),
		finishedAt: P().optional().describe("When it closed, in milliseconds. Absent while it is open."),
		help: L({
			requestId: M().describe("What to send back when you answer, through the agent reply route."),
			message: M().describe("What the agent needs, in its own words."),
			requestedAt: P().describe("When it asked, in milliseconds.")
		}).optional().describe("The agent has hit something only a person can clear: a captcha, a password it does not hold, a check on your phone. Present only while it is waiting."),
		pages: I($g).describe("Every page it has open. A browser holds several at once, which is the reason it is listed apart from the terminals.")
	}), t_ = L({ sessions: I(e_).describe("Every browser the agents have running, open or recently closed.") }), n_ = L({ name: M().describe("Which browser.") }), r_ = B(["subagent", "spawned"]), i_ = B([
		"pending",
		"running",
		"blocked",
		"completed",
		"failed",
		"killed",
		"paused"
	]), a_ = L({
		state: B([
			"verified",
			"unproven",
			"failing",
			"no-code"
		]).describe("Whether anything proved its work: a check passed after its last edit, it changed code and nothing checked it, a check ran and failed, or it changed no code at all."),
		paths: I(M()).optional().describe("The code files it changed, most recent last. The first few; the record holds the rest."),
		check: M().optional().describe("The command that spoke: the one that cleared it, or the one that failed. Named rather than summarised, so a targeted test is not read as the whole suite.")
	}), o_ = L({
		id: M().describe("The id of the tool call that started it (an SDK child) or the child's own conversation id (a spawned one); either way both sides already hold it, so a card links to its subagent with the id it has and the subagent points back the same way."),
		kind: r_.describe("What sort of subagent: one the runtime's own Task tool spawned in-process, or a full child agent the daemon started for the turn. It changes only how you watch it."),
		conversationId: M().describe("The conversation whose turn started it, and the way back to the chat it belongs to."),
		agentType: M().optional().describe("What kind of subagent it is."),
		description: M().optional().describe("What it was asked to do, in one line."),
		model: M().optional().describe("Which model it runs on."),
		provider: M().optional().describe("Which provider serves it, for a child agent spawned across providers."),
		spawnDepth: P().optional().describe("How deep in the chain it sits, where one means the turn itself started it. A subagent can start subagents, and a flat list that could not say so would read as though the turn started all of them."),
		background: F().optional().describe("The parent carried on working instead of waiting for it. This is the whole reason the list exists: such a subagent used to be invisible until its result landed, sometimes minutes later."),
		status: i_.describe("How it is going. Blocked means it needs an answer, which a parent and an operator act on differently from it simply working."),
		startedAt: P().describe("When it started, in milliseconds."),
		endedAt: P().optional().describe("When it finished, in milliseconds. Absent while it works."),
		activityAt: P().describe("When it last did anything, in milliseconds."),
		tokens: P().optional().describe("What it has spent. Its own, so a parent's cost and the sum of its subagents' are two different true numbers."),
		toolUses: P().optional().describe("How many tools it has used."),
		lastTool: M().optional().describe("The last one it reached for."),
		summary: M().optional().describe("Its report: what it concluded, without opening its record. The question a finished subagent gets read for."),
		error: M().optional().describe("Why it failed, when it did."),
		verification: a_.optional().describe("Whether anything proved the work its report describes.")
	}), s_ = L({ sessions: I(o_).describe("Every subagent and child agent this sandbox's conversations have started.") }), c_ = L({ id: M() });
})), u_, d_, f_, p_, m_, h_, g_ = v((() => {
	G(), u_ = B(["messages", "everything"]), d_ = L({
		id: M().describe("The share's own id, minted fresh each time, so sharing one conversation twice gives two links. Deliberately not the conversation's id, which is memorable by design and would make a page's address guessable."),
		conversationId: M().describe("Which conversation it was taken from."),
		title: M().describe("The title on the page, which is the sharer's choice rather than the conversation's own."),
		detail: u_.describe("How much travels: the two speakers' words alone, or the whole record including the agent's work and thinking, which necessarily publishes the code and command output in it."),
		sharedAt: P().describe("When the snapshot was taken, in milliseconds. A share is frozen, so this dates what a recipient can see rather than when the conversation happened."),
		messages: P().describe("How many messages are behind the link."),
		url: M().optional().describe("The page's address. Absent on a sandbox with nowhere to publish to.")
	}), f_ = L({ shares: I(d_).describe("Every conversation currently published as a page.") }), p_ = L({
		conversationId: M().min(1).describe("Which conversation to publish."),
		title: M().min(1).max(80).describe("The title for the page. The conversation's own name is only what a dialog would open with."),
		detail: u_.describe("How much to publish. Two levels rather than a set of switches, because every extra toggle is another thing to get wrong about a link that cannot be recalled.")
	}), m_ = L({ id: M().min(1).describe("Which share to re-take. Its link stays the same, which matters because it has already been sent.") }), h_ = L({ id: M().min(1).describe("Which share to take down.") });
})), __, v_, y_, b_, x_, S_, C_, w_, T_, E_, D_, O_, k_, A_, j_, M_, N_, P_, F_, I_, L_, R_, z_, B_ = v((() => {
	G(), X(), g_(), l_(), Fh(), __ = B([
		"pending",
		"approved",
		"rejected",
		"cancelled"
	]), v_ = B([
		"pending",
		"answered",
		"cancelled"
	]), y_ = B([
		"pending",
		"allowed",
		"always",
		"denied",
		"cancelled"
	]), b_ = B([
		"pending",
		"helped",
		"declined",
		"cancelled"
	]), x_ = B([
		"pending",
		"approved",
		"skipped",
		"cancelled"
	]), S_ = B([
		"pending",
		"connecting",
		"skipped",
		"cancelled"
	]), C_ = L({
		...xh,
		status: __.describe("Where the decision stands.")
	}), w_ = L({
		...Sh,
		status: v_.describe("Where the answer stands."),
		answers: z(M(), I(M())).optional().describe("What was chosen, keyed by the question, with the chosen labels or the user's own words.")
	}), T_ = oh.extend({
		...Ch,
		status: y_.describe("Where the decision stands.")
	}), E_ = L({
		...wh,
		status: b_.describe("How the hand-over ended.")
	}), D_ = L({
		...Th,
		status: b_.describe("How the hand-over ended.")
	}), O_ = L({
		...Eh,
		status: S_.describe("Where the decision stands."),
		outcome: kh.optional().describe("How an accepted ask's setup ended (the capability_outcome frame).")
	}), k_ = L({
		...Dh,
		status: x_.describe("Where the decision stands."),
		receipt: Ah.optional().describe("How the approved payment ended (the payment_receipt frame).")
	}), A_ = L({
		...Oh,
		status: x_.describe("Where the decision stands."),
		receipt: jh.optional().describe("Who released it, or that somebody refused (the credential_receipt frame).")
	}), j_ = Uu(() => L({
		id: M().describe("The call's id."),
		name: M().describe("Which tool."),
		category: hh.describe("What kind of thing it does: read, edit, delete, move, search, run, think, fetch. Named the same way whatever the backend called the tool."),
		status: gh.describe("How it went."),
		target: M().optional().describe("What it acted on, in one line: a file, a command, an address."),
		locations: I(_h).optional().describe("The files it touched."),
		content: I(vh).optional().describe("What it produced: text, a change to a file, or a picture."),
		children: I(j_).optional().describe("Calls a delegated subagent made, nested under the call that started it, so a reopened conversation redraws the delegation rather than collapsing it into one result."),
		thinking: M().optional().describe("What the agent was reasoning about around this call."),
		subagent: M_.optional().describe("The helper this call started, as the daemon's registry sees it: what it is, how it is going, what it has spent. What a card can say about a backgrounded child whose result is minutes away.")
	})), M_ = L({
		kind: r_,
		agentType: M().optional(),
		description: M().optional(),
		model: M().optional(),
		provider: M().optional(),
		background: F().optional(),
		status: i_,
		tokens: P().optional(),
		toolUses: P().optional(),
		lastTool: M().optional(),
		summary: M().optional(),
		error: M().optional(),
		verification: a_.optional()
	}), N_ = L({
		title: M().describe("The one line a reader sees, on a row that opens to the text below."),
		text: M().describe("The note itself, which is also exactly what the model was told.")
	}), P_ = L({
		costUsd: P().optional(),
		inputTokens: P().optional(),
		outputTokens: P().optional(),
		durationMs: P().optional(),
		numTurns: P().optional()
	}), F_ = L({
		role: B([
			"user",
			"assistant",
			"notice"
		]).describe("Who said it. A notice is neither side: it is something that happened to the turn, recorded so a reopened conversation can say it. Without those, a turn a provider refused ends on the user's message and reads as broken."),
		text: M().describe("The words."),
		sentAt: P().optional().describe("When it was sent, in milliseconds. On the user's rows only, because that is the only moment actually known: a turn's own frames arrive with no clock, so stamping the agent's rows could only ever mean the whole turn's start or end."),
		attachments: I(M()).optional().describe("Files attached to this message, as workspace paths."),
		checkpointId: M().optional().describe("The saved point this message can be rewound to. Looked up on each read rather than stored, so what is offered is exactly what is still there to go back to."),
		rewindIndex: P().int().nonnegative().optional().describe("This message's position in the conversation's record, which is how a rewind names it. Present only beside a checkpoint."),
		thinking: M().optional().describe("What the agent was reasoning about."),
		tools: I(j_).optional().describe("The tool calls this part of the turn made."),
		todos: I(ph).optional().describe("The agent's task checklist, as of this bubble."),
		usage: P_.optional().describe("What the turn cost, on the bubble its answer ended in."),
		notes: I(N_).optional().describe("What the sandbox added to this message before the model saw it. Carried on the message rather than as rows of their own, because they genuinely were part of what was sent."),
		placed: F().optional().describe("A person wrote this in the agent's voice, with no turn behind it. Marked for the human re-reading the conversation months later, so their own words do not pass as the agent's. The agent itself never sees the mark."),
		noticeAction: B([
			"landHold",
			"outageOptOut",
			"depsInstall",
			"tierHold"
		]).optional().describe("A one-press follow-up this notice offers, by name. The chat decides what it does and whether it still applies."),
		noticeWait: B(["credentialRenewal", "personaRoute"]).optional().describe("The wait this notice describes, by name, so a reader can say whether it is still on."),
		plan: C_.optional().describe("The plan this row asked approval for, and the answer."),
		question: w_.optional().describe("The questions this row asked, and the picks that answered them."),
		permission: T_.optional().describe("The tool this row asked permission for, and the decision."),
		browserHelp: E_.optional().describe("The browser hand-over this row asked for, and how it ended."),
		terminalHelp: D_.optional().describe("The terminal hand-over this row asked for, and how it ended."),
		capabilityOffer: O_.optional().describe("The capability setup this row asked for, the decision, and the outcome."),
		paymentOffer: k_.optional().describe("The payment this row asked for, the decision, and the receipt."),
		credentialOffer: A_.optional().describe("The gated credential this row asked to use, who may release it, and who did.")
	}), I_ = R("op", [
		L({
			op: V("append").describe("A new row at the end."),
			row: F_
		}),
		L({
			op: V("replace").describe("This row, whole, in place of the one at that index."),
			index: P().int().nonnegative(),
			row: F_
		}),
		L({
			op: V("drop").describe("The row at that index is gone: it was opened and never written into."),
			index: P().int().nonnegative()
		}),
		L({
			op: V("text").describe("More of the agent's prose, onto that row's text."),
			index: P().int().nonnegative(),
			text: M()
		}),
		L({
			op: V("thinking").describe("More of the agent's reasoning, onto that row's thinking."),
			index: P().int().nonnegative(),
			text: M()
		}),
		L({
			op: V("tool").describe("A tool card, whole: new, or the latest state of one already there, matched by id wherever it nests."),
			index: P().int().nonnegative(),
			tool: j_,
			parent: M().optional().describe("The card this one nests under, when it is a delegated subagent's own call.")
		})
	]), L_ = L({ messages: I(F_).describe("The conversation, in order. Each block of the agent's prose is its own message with the tools that block introduced, which is what reproduces the way it actually unfolded.") }), R_ = L({
		reason: B([
			"stopped",
			"limit",
			"outage"
		]).describe("Which ending left the work here: a Stop or a daemon killed under the turn, a spent usage allowance, or a provider that refused it."),
		resetsAt: P().optional().describe("When the spent allowance reopens, in epoch seconds. Absent for every ending that names no instant, and for a provider that publishes none."),
		held: L({
			ran: F().describe("Whether the held turn got anywhere before it was refused, which is a different sentence from one refused at the door."),
			contextTokens: P().optional().describe("How much context a press that keeps the session re-reads once, on this account at the reset or carried to another. Absent when no usage frame measured it."),
			handoffTokens: P().optional().describe("What a press that opens a fresh session pays instead: the capped record plus the sandbox's measured brief, counted at the failure."),
			moving: M().optional().describe("The account the owner's policy is already moving this turn to, when it is; the surface then reports the move rather than offering a press.")
		}).optional().describe("Present when the daemon still holds the refused turn whole, so a press re-runs it rather than appending a message after it."),
		scheduled: F().optional().describe("Whether something other than the user is already booked to send this turn again, so the surface reports the wait instead of offering a press.")
	}), z_ = L_.extend({
		sessionId: M().optional().describe("The provider session behind the last turn, when there is one."),
		provider: Op.optional().describe("Which provider minted that session."),
		harness: Ap.optional().describe("Which runtime minted it: a session resumes only on the loop that opened it."),
		account: M().optional().describe("Which stored account it belongs to, as the daemon resolved it. Absent when no stored account paid for the turn."),
		ending: R_.optional().describe("How the last turn ended, when it left work behind that one press finishes. Absent for a conversation whose last turn ended on its own, and for the failures that name something to repair first."),
		from: P().int().nonnegative().describe("Where the first message sits in the whole record, and the `before` that asks for the page above this one."),
		more: F().describe("Whether older messages precede this page.")
	}), L({
		title: M(),
		sharedAt: P(),
		detail: u_,
		messages: I(F_)
	});
})), V_, H_, U_, W_, G_, K_ = v((() => {
	G(), X(), Ug(), Gg(), qg(), sm(), l_(), Fh(), B_(), V_ = R("kind", [
		L({
			kind: V("session"),
			sessionId: M(),
			account: M().optional().describe("Which stored account this session belongs to, as the daemon resolved it for the turn.")
		}),
		L({
			kind: V("worktree"),
			branch: M(),
			base: M(),
			unenforced: F().optional(),
			sync: L({
				commits: P(),
				blocked: I(M())
			}).optional(),
			remote: M().optional()
		}),
		L({
			kind: V("landed"),
			landed: F(),
			conflicts: I(Rg).optional(),
			held: F().optional(),
			deps: L({
				missing: P(),
				started: I(M()),
				deferred: F()
			}).optional()
		}),
		L({
			kind: V("preamble"),
			notes: I(N_)
		}),
		L({
			kind: V("init"),
			model: M()
		}),
		L({
			kind: V("checkpoint"),
			id: M(),
			index: P().int().nonnegative().optional()
		}),
		L({
			kind: V("steer"),
			text: M(),
			sentAt: P(),
			attachments: I(M()).optional()
		}),
		L({
			kind: V("delta"),
			text: M(),
			parentToolUseId: M().optional()
		}),
		L({
			kind: V("text_end"),
			parentToolUseId: M().optional()
		}),
		L({
			kind: V("thinking"),
			text: M(),
			parentToolUseId: M().optional()
		}),
		L({
			kind: V("tool_call"),
			id: M(),
			name: M(),
			category: hh,
			status: gh,
			target: M().optional(),
			locations: I(_h).optional(),
			content: I(vh).optional(),
			parentToolUseId: M().optional()
		}),
		L({
			kind: V("tool_call_update"),
			id: M(),
			status: gh.optional(),
			content: I(vh).optional(),
			locations: I(_h).optional()
		}),
		L({
			kind: V("terminal"),
			session: M()
		}),
		L({
			kind: V("browser"),
			session: M()
		}),
		L({
			kind: V("subagent"),
			id: M(),
			subagentKind: r_,
			agentType: M().optional(),
			description: M().optional(),
			model: M().optional(),
			provider: M().optional(),
			background: F().optional()
		}),
		L({
			kind: V("subagent_update"),
			id: M(),
			status: i_.optional(),
			tokens: P().optional(),
			toolUses: P().optional(),
			lastTool: M().optional(),
			summary: M().optional(),
			error: M().optional(),
			verification: a_.optional()
		}),
		L({
			kind: V("todos"),
			items: I(ph)
		}),
		L({
			kind: V("commands"),
			items: I(uh)
		}),
		L({
			kind: V("usage"),
			account: M().optional(),
			costUsd: P().optional(),
			inputTokens: P().optional(),
			outputTokens: P().optional(),
			cacheReadTokens: P().optional(),
			cacheCreationTokens: P().optional(),
			durationMs: P().optional(),
			numTurns: P().optional()
		}),
		Wg.extend({
			kind: V("rate_limit_info"),
			account: M().optional()
		}),
		L({
			kind: V("fast_mode"),
			state: Kg,
			reason: M().optional()
		}),
		L({
			kind: V("tier"),
			tier: B(["fast", "standard"]),
			score: P(),
			rules: I(M()),
			model: M().optional(),
			routed: F(),
			held: F().optional()
		}),
		L({
			kind: V("provider_retry"),
			attempt: P(),
			maxAttempts: P().optional(),
			nextAttemptAt: P().optional(),
			status: P().optional()
		}),
		L({
			kind: V("account_usage"),
			account: M().optional(),
			windows: I(Jp)
		}),
		mh.extend({ kind: V("context_usage") }),
		L({
			kind: V("compact"),
			trigger: M(),
			preTokens: P().optional(),
			postTokens: P().optional()
		}),
		Mh,
		Nh,
		Ph,
		L({
			kind: V("browser_help"),
			...wh
		}),
		L({
			kind: V("terminal_help"),
			...Th
		}),
		L({
			kind: V("capability_offer"),
			...Eh
		}),
		kh.extend({
			kind: V("capability_outcome"),
			requestId: M()
		}),
		L({
			kind: V("payment_offer"),
			...Dh
		}),
		Ah.extend({
			kind: V("payment_receipt"),
			requestId: M()
		}),
		L({
			kind: V("credential_offer"),
			...Oh
		}),
		jh.extend({
			kind: V("credential_receipt"),
			requestId: M()
		}),
		L({
			kind: V("resolved"),
			requestId: M(),
			reply: nm.optional()
		}),
		L({
			kind: V("mode"),
			mode: zp
		}),
		L({
			kind: V("error"),
			message: M(),
			code: B([
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
			engine: L({
				id: M().describe("Which engine (e.g. claude)."),
				running: M().optional().describe("The version that was refused, when the provider named it."),
				floor: M().describe("The lowest version the provider will accept.")
			}).optional(),
			resetsAt: P().optional(),
			autoResume: B(["scheduled", "available"]).optional(),
			held: L({
				ran: F(),
				contextTokens: P().optional(),
				handoffTokens: P().optional(),
				moving: M().optional()
			}).optional(),
			outage: L({
				retryAt: P(),
				attempt: P(),
				maxAttempts: P()
			}).optional()
		}),
		L({ kind: V("done") })
	]), H_ = [
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
	], U_ = V_.options.filter((e) => H_.includes(e.shape.kind.value)), W_ = R("kind", U_), G_ = R("kind", [
		L({
			kind: V("attached").describe("The first frame, identifying the run you have joined and handing you its transcript so far."),
			run: M().describe("The run's id."),
			startedAt: P().describe("When it started, in milliseconds, so a window joining late can show how long it has been going."),
			seq: P().describe("How many frames the run has produced so far. A fact at or below this number is being replayed; a patch is never."),
			rows: I(F_).describe("The turn's rows as they stand: what was asked, and everything the agent has said and done since. Draw these, then apply the patches that follow.")
		}),
		L({
			kind: V("patch").describe("One change to the run's rows."),
			seq: P().describe("Its position in the run, counting from one."),
			patch: I_
		}),
		L({
			kind: V("fact").describe("One thing about the turn that is not a row: its session, its branch, its cost, a failure."),
			seq: P().describe("Its position in the run, counting from one. At or below the head's number, it is being replayed."),
			fact: W_
		}),
		L({ kind: V("end").describe("The run is over and every frame has been delivered. A stream that closes without this was dropped mid-run, so re-attach rather than assuming the turn finished.") })
	]);
})), q_, J_, Y_, X_, Z_, Q_, $_, ev, tv, nv, rv, iv = v((() => {
	G(), q_ = B([
		"turn",
		"interval",
		"pre-restore",
		"restore",
		"user"
	]), J_ = L({
		id: M().describe("The saved point's id, which is what restoring and diffing take."),
		at: P().describe("When it was taken, in milliseconds."),
		trigger: q_.describe("What caused it. The automatic between-turn captures are a safety net and are not listed; they dissolve into the next visible point's differences."),
		label: M().optional().describe("What to call it. For one taken before a turn, that turn's prompt.")
	}), Y_ = L({ snapshots: I(J_).describe("Every point you can go back to, newest first.") }), X_ = L({
		conversationId: M().min(1).describe("Which conversation to rewind."),
		index: P().int().nonnegative().describe("Which message to go back to, counting from the start. It is also how many messages survive: rewinding to the first keeps none of them and puts the files back to before it ran.")
	}), Z_ = L({
		snapshot: M().optional().describe("The saved point the files were put back to. Absent for a conversation working in its own copy, whose rewind moved a branch rather than the shared timeline."),
		dropped: P().int().nonnegative().describe("How many messages were removed.")
	}), Q_ = L({ id: M().min(1).describe("Which saved point.") }), $_ = L({
		scope: M().describe("Which part of the workspace the path belongs to: the workspace root, or one of the repositories inside it."),
		path: M().describe("The path, relative to that scope."),
		status: B([
			"added",
			"modified",
			"deleted",
			"type-changed"
		]).describe("What happened to it.")
	}), ev = L({ changes: I($_).describe("Everything that differs between this saved point and the one before it.") }), tv = L({
		id: M().min(1).describe("Which saved point."),
		scope: M().min(1).describe("Which part of the workspace the path belongs to."),
		path: M().min(1).describe("The file, relative to that scope.")
	}), nv = L({
		beforeBytes: P().int().nonnegative().optional().describe("How big the before side is, in bytes. Absent when the file did not exist yet."),
		afterBytes: P().int().nonnegative().optional().describe("How big the after side is, in bytes. Absent when the file was deleted."),
		patch: M().optional().describe("The changed regions as unified-diff hunks (`@@` sections only). Absent when the change was too large to render even as a patch."),
		more: F().optional().describe("There were more changed regions than fit; the patch stops at a region boundary.")
	}), rv = L({
		before: M().optional().describe("The whole file as it was. Absent when it did not exist yet, or when `partial` is set."),
		after: M().optional().describe("The whole file as it is now. Absent when it was deleted, or when `partial` is set."),
		binary: F().optional().describe("The file is not text, so neither side is sent."),
		partial: nv.optional().describe("Set when the file was too large to send whole: what is sent instead of the two sides.")
	});
})), av, ov = v((() => {
	J(), Fh(), K_(), X(), iv(), sm(), $(), av = {
		run: q.route({
			method: "POST",
			path: "/agent",
			summary: "Say something to an agent",
			description: "Starts a turn and answers immediately with its id; the work runs inside the sandbox whether or not anybody stays connected. Watch it by attaching. Naming a conversation that does not exist yet opens it."
		}).input(Vp).output(Gp),
		attach: q.route({
			method: "POST",
			path: "/agent/attach",
			summary: "Watch a turn happen",
			description: "Streams everything the agent does: its words, the tools it reaches for, and the answers it gets. Give it the point you have already seen and it replays from there before going live, so a reload loses nothing. The window that started the turn holds no special claim, and any number of watchers on any number of devices see the same thing."
		}).input(Kp).output(K(G_)),
		reply: q.route({
			method: "POST",
			path: "/agent/reply",
			summary: "Answer a question the agent asked",
			description: "Un-parks a turn that is waiting on you: approving a plan, choosing between options, or permitting a tool. The turn picks up where it stopped."
		}).input(nm).output(Z),
		steer: q.route({
			method: "POST",
			path: "/agent/steer",
			summary: "Interrupt a running turn",
			description: "Slips a message into a turn already under way, without stopping it. This is how you redirect an agent mid-thought rather than waiting for it to finish being wrong."
		}).input(rm).output(Z),
		stop: q.route({
			method: "POST",
			path: "/agent/stop",
			summary: "Stop a turn now",
			description: "Cancels the running turn inside the sandbox. Whatever it had already written to disk stays written."
		}).input(im).output(Z),
		resume: q.route({
			method: "POST",
			path: "/agent/resume",
			summary: "Run a refused turn again",
			description: "Sends the same turn again when the model provider's allowance refused it, with everything it originally carried except who serves it: the caller may name a different provider, harness or account, which is the usual answer to a spent allowance. It repeats the request rather than adding a new message to the conversation, so pressing it twice costs nothing and the agent is never told to continue work it has not started."
		}).input(om).output(Gp),
		rewind: q.route({
			method: "POST",
			path: "/agent/rewind",
			summary: "Go back to an earlier message",
			description: "Puts the files back as they stood at that point, drops every message after it, and forgets what the model remembered, so the next thing you say starts from there cleanly. Refused while a turn is running, because a restore cannot overwrite files an agent is editing, and refused for a message with no saved state to return to."
		}).input(X_).output(Z_),
		commands: q.route({
			method: "GET",
			path: "/agent/commands",
			summary: "Shortcut commands the agent knows",
			description: "The commands a provider published the last time one of its turns ran, so a composer can offer them before this conversation has run anything. A running turn's own list wins over this one."
		}).input(dh).output(fh),
		refusals: q.route({
			method: "GET",
			path: "/agent/refusals",
			summary: "The last time each provider said no",
			description: "What each model provider most recently refused and why. Read this alongside an account's usage: the usage says how full it was when last checked, this says whether it has since started turning work away."
		}).output($p)
	};
})), sv, cv, lv, uv, dv, fv, pv, mv, hv, gv, _v, vv, yv, bv, xv, Sv, Cv, wv = v((() => {
	G(), Dp(), sv = B([
		"crash",
		"report",
		"detection"
	]), cv = L({
		at: P().describe("When, in milliseconds."),
		kind: M().max(40).describe("What sort of thing it was: a console line, a request, a click, a route change."),
		message: M().max(300).describe("What it said, already truncated by the SDK.")
	}), lv = L({
		email: M().max(320).optional().describe("An address they typed, to reach them about it. Unverified."),
		name: M().max(200).optional().describe("A name they typed. Unverified, and never identity.")
	}), uv = 20, dv = z(M().max(60), M().max(300)).refine((e) => Object.keys(e).length <= uv, { message: `at most ${uv} context entries` }), fv = L({
		kind: sv.describe("A crash the SDK caught, something a person wrote in, or a problem the SDK noticed on its own."),
		message: M().min(1).max(1e3).describe("The error's own message, or the headline of what a person reported."),
		stack: M().max(2e4).optional().describe("The stack, verbatim from the browser."),
		url: M().max(2e3).optional().describe("Where it happened: the page's address, or a screen name in an app."),
		release: M().max(200).optional().describe("Which build it came from: a commit sha or a tag. With it the agent reads your real source rather than minified frames."),
		userAgent: M().max(400).optional().describe("What the browser said it was."),
		description: M().max(5e3).optional().describe("What the person typed, when a person is the one reporting."),
		reporter: lv.optional().describe("Who says they are reporting it. Unverified by construction."),
		breadcrumbs: I(cv).max(40).optional().describe("What happened just before, oldest first."),
		context: dv.optional().describe("Whatever else the app attached: a route, a version, a locale."),
		fingerprint: M().max(200).optional().describe("Group by this instead of by the stack, when your app knows better than the stack does.")
	}), L({
		report: fv,
		clientId: M().min(1).max(200).describe("The SDK's own id for this browser. Not a secret: it is what the rate limit counts against."),
		powNonce: M().max(400).optional(),
		key: M().max(200).optional()
	}), pv = B([
		"open",
		"investigating",
		"resolved",
		"ignored"
	]), mv = L({
		conversationId: M().describe("The conversation this run became."),
		at: P().describe("When it started, in milliseconds."),
		atCount: P().describe("How many times it had happened when this run started.")
	}), hv = L({
		kind: sv,
		title: M().min(1).max(300).describe("The one line this is listed under."),
		culprit: M().max(300).optional().describe("The frame it came from, when the stack named one."),
		automationId: Y.describe("Which intake received it."),
		origin: M().max(400).optional().describe("Which site it came from."),
		firstSeen: P().describe("When it first happened, in milliseconds."),
		lastSeen: P().describe("When it last happened, in milliseconds."),
		count: P().describe("How many times this exact thing has arrived."),
		status: pv.default("open").describe("Where it stands with you."),
		statusAt: P().optional().describe("When the status last changed, in milliseconds."),
		release: M().max(200).optional().describe("The build the latest one came from."),
		sample: fv.describe("The most recent one, in full."),
		firedAt: P().optional().describe("What the count stood at the last time this woke an agent."),
		runs: I(mv).max(20).optional().describe("The turns started for it.")
	}), gv = hv.extend({ id: Y.describe("The issue's id, which is its fingerprint.") }), _v = L({
		issues: I(gv).describe("The inbox, most recently seen first."),
		invalid: I(M()).describe("Files in the issues directory that could not be read at all.")
	}), vv = L({ id: Y.describe("Which issue.") }), yv = L({
		id: Y.describe("Which issue."),
		status: B([
			"open",
			"resolved",
			"ignored"
		]).describe("Where it now stands with you.")
	}), bv = L({
		keyFromBrowsers: F().optional().describe("Let a browser report with the key alone, rather than only from a site you listed. Off unless you need it."),
		dailyReportMax: P().int().positive().optional().describe("How many reports a day this intake accepts at all."),
		escalateAfter: P().int().positive().optional().describe("How many more times a known crash must happen before it wakes an agent again."),
		antiBot: B(["pow"]).optional().describe("Make a person's browser solve a small puzzle before it accepts a written report."),
		title: M().max(80).optional().describe("The dialog's heading."),
		prompt: M().max(300).optional().describe("The line above the box they type in."),
		thanks: M().max(300).optional().describe("What it says once they have sent it."),
		askEmail: F().optional().describe("Ask for an address to reply to. Optional for them either way."),
		accent: M().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "accent must be a hex colour, e.g. #e47100").optional(),
		captureCrashes: F().optional().describe("Catch uncaught errors automatically, as well as what people write in.")
	}), L({
		automationId: M(),
		title: M(),
		prompt: M(),
		thanks: M(),
		askEmail: F(),
		accent: M(),
		captureCrashes: F(),
		antiBot: B(["pow", "off"])
	}), L({
		ok: V(!0),
		id: M()
	}), xv = L({
		origin: M(),
		allowed: F(),
		lastSeenAt: P(),
		loads: P()
	}), Sv = L({ origins: I(xv) }), Cv = L({ automationId: Y.describe("Which intake.") });
})), Tv, Ev, Dv, Ov, kv, Av, jv, Mv, Nv, Pv, Fv, Iv, Lv, Rv, zv, Bv, Vv, Hv, Uv, Wv, Gv, Kv, qv, Jv = v((() => {
	G(), X(), Ug(), Dp(), wv(), Tv = B([
		"turn.settled",
		"agent.landed",
		"deps.broken",
		"deps.fixed"
	]), L({
		event: Tv,
		agentId: M(),
		title: M().optional(),
		branch: M(),
		outcome: B([
			"landed",
			"conflict",
			"ready",
			"idle",
			"error"
		]),
		repos: I(L({
			repo: M(),
			from: M(),
			dir: M()
		})),
		deps: L({
			project: M(),
			command: M(),
			exitCode: P(),
			attempt: P(),
			logTail: M()
		}).optional()
	}), Ev = R("kind", [
		L({
			kind: V("schedule").describe("On a clock."),
			cron: M().min(1).describe("When, in cron notation."),
			afterSessions: P().int().positive().optional().describe("Fire only once at least this many new sessions have been run since the last wake. A due run short of that is skipped, and says how far off it is.")
		}),
		L({
			kind: V("event").describe("When something calls its webhook."),
			dailyMax: P().int().positive().optional().describe("How many webhook calls a day may wake the agent, across every caller. Absent is a modest default rather than unlimited.")
		}),
		L({
			kind: V("listener").describe("When a message arrives from somewhere outside."),
			provider: M().min(1).describe("Which service to listen to."),
			channelId: M().min(1).optional().describe("Narrow it to one channel or thread."),
			eventType: M().min(1).optional().describe("Narrow it to one kind of event."),
			mentioned: F().optional().describe("Only when the agent is actually addressed, rather than on everything said in earshot."),
			branch: M().min(1).optional().describe("Narrow it to one branch, for the sources that have branches. Absent means every branch of the repositories it matches."),
			allowedOrigins: I(M()).optional().describe("Which websites may reach the public endpoint, the chat widget's or the bug reporter's. Absent or empty admits nobody.")
		}),
		L({
			kind: V("workspace").describe("When something happens to the files or the repositories."),
			event: Tv.describe("Which happening."),
			repo: M().min(1).optional().describe("Narrow it to one repository. Absent means any of them.")
		})
	]), Dv = L({
		access: B(["public", "google"]).optional().describe("Who may write to it. Absent means anyone, which is the anonymous support box it looks like."),
		requireName: F().optional().describe("Ask a visitor for a name first. Cosmetic: the name is typed, so it reaches the model as something a stranger said, never as identity."),
		antiBot: B(["turnstile", "pow"]).optional().describe("How to keep bots out: a third-party check that needs the site's own keys, or a puzzle the sandbox sets and the widget solves, so a site with no such account still has something. Absent leaves the site allowlist and the rate limit as the whole boundary."),
		turnstileSiteKey: M().optional().describe("The public half of those keys, which ships to the visitor's browser."),
		turnstileSecret: M().optional().describe("The private half, which the sandbox keeps and the widget never sees."),
		googleClientId: M().optional().describe("The site's own sign-in client id. It cannot be ours: a sign-in is only issued to an approved origin, and no single client can list every customer's domain."),
		title: M().max(80).optional(),
		greeting: M().max(500).optional(),
		accent: M().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "accent must be a hex colour, e.g. #e47100").optional(),
		position: B([
			"top-right",
			"top-left",
			"bottom-right",
			"bottom-left"
		]).optional(),
		dailyMessageMax: P().int().positive().optional(),
		conversationMessageMax: P().int().positive().optional(),
		sessionTtlMinutes: P().int().positive().optional()
	}), L({
		automationId: M(),
		title: M(),
		greeting: M(),
		accent: M(),
		position: B([
			"top-right",
			"top-left",
			"bottom-right",
			"bottom-left"
		]),
		access: B(["public", "google"]),
		requireName: F(),
		antiBot: B([
			"turnstile",
			"pow",
			"off"
		]),
		turnstileSiteKey: M().optional(),
		googleClientId: M().optional()
	}), L({
		salt: M(),
		difficulty: P().int().positive()
	}), L({
		conversationId: M().min(1).max(200),
		content: M().min(1),
		displayName: M().max(200).optional(),
		idToken: M().optional(),
		turnstileToken: M().optional(),
		powNonce: M().optional(),
		history: I(L({
			author: M().optional(),
			content: M()
		})).max(50).optional()
	}), L({
		replies: I(L({
			seq: P(),
			at: P(),
			text: M()
		})),
		cursor: P()
	}), Ov = L({
		label: M().max(60).optional().describe("What to call these people on screen."),
		ids: I(M().min(1).max(200)).max(200).optional().describe("Sender ids, as the service names them, never display names."),
		groups: I(M().min(1).max(200)).max(50).optional().describe("Group ids the service reports on a sender, a Discord role. Only for a source whose messages carry them."),
		actsAs: Y.optional().describe("Which persona their wakes speak as. Absent is no persona: the full toolbox, reaching no account."),
		requireApproval: F().optional().describe("Hold their wakes for a person, even when the automation itself does not.")
	}).refine((e) => (e.ids?.length ?? 0) + (e.groups?.length ?? 0) > 0, { message: "a sender rule must name at least one id or group" }), kv = L({
		rules: I(Ov).max(50).describe("Walked in order; the first rule naming the sender decides."),
		others: B([
			"allow",
			"hold",
			"ignore"
		]).describe("What a sender no rule names gets: the automation as configured, a hold for a person, or nothing at all.")
	}), Av = L({
		id: Y.describe("The automation's id."),
		trigger: Ev.describe("What sets it off: a schedule, an event in the workspace, a message arriving from outside, or a webhook."),
		guard: M().min(1).optional().describe("A command run before the wake that decides whether there is anything to do. Skipped by the guard is often the most useful thing an automation can report."),
		prompt: M().min(1).describe("What the woken agent is told."),
		webchat: Dv.optional().describe("Settings for the public chat widget, for an automation that answers visitors."),
		issues: bv.optional().describe("Settings for the bug reporter, for an automation that takes crash reports from your own sites and apps."),
		allowedTools: I(M().min(1)).optional().describe("Narrow the woken turn to these tools. For one driven by an outside message this list is the real boundary, because prompt wording is only advice and an empty toolbox is not."),
		models: I(Wp).min(1).max(10).describe("Which models this automation may run on, best first. Required, and nothing is chosen for you: work that fires while nobody is watching spends a real allowance, so it names the models it spends rather than inheriting one. Tried in order, so a spent account does not silently stop the job."),
		account: M().optional().describe("Which account pays for it."),
		actsAs: Y.optional().describe("Which persona it speaks as. An unwatched turn naming none reaches no signed-in account at all."),
		senders: kv.optional().describe("Who may talk to it, and as whom: rules by sender id or group, each naming the persona those people get, plus what everyone else gets. Absent admits everyone the trigger's filters do."),
		requireApproval: F().optional().describe("Hold every fire for a person instead of running it. Only a person can release one of those."),
		holdForSeconds: P().optional().describe("Hold each fire this long before running it anyway, which is a delay rather than a decision."),
		chore: F().optional().describe("This automation is a maintenance job, which is what files it under chores rather than among ordinary automations."),
		enabled: F().describe("Whether it fires at all.")
	}), jv = L({
		id: Y.describe("This waiting item's own id, which approving and rejecting take."),
		automationId: M().describe("Which automation it came from."),
		payload: M().optional().describe("What set it off, kept whole so an approved wake carries the same thing it would have had. Absent for one on a schedule, which carries nothing."),
		origin: Pp.optional().describe("Where the message came from, kept alongside the payload so an approved wake appears on the board exactly as an automatic one would have."),
		title: M().optional().describe("What the conversation would be called."),
		conversationId: M().optional().describe("The thread this belongs to, when it has one, so approving continues that conversation rather than opening a new one. Without it, one visitor's chat becomes a card per approved message and an agent that meets them again every turn."),
		sessionId: M().optional().describe("The provider session that thread last ran on."),
		thread: M().optional().describe("Which inbound thread this belongs to, so the approved run continues that thread's memory rather than a fresh one."),
		actsAs: Y.optional().describe("Which persona the approved run speaks as, decided when it was held."),
		createdAt: P().describe("When it started waiting, in milliseconds."),
		autoRunAt: P().optional().describe("When it goes ahead on its own, in milliseconds, for a hold that is only a delay. Absent for one that genuinely waits on a person.")
	}), Mv = L({
		agents: I(_g).describe("The conversations."),
		rev: P().describe("Which version of the fleet this is. The fleet is published as whole snapshots, so without a version a list read before a change but delivered after it would silently undo that change. Drop any list older than the newest you have already applied."),
		held: I(jv).default([]).describe("Automations waiting at the door for a yes, put alongside the running conversations so needs-you sits beside working rather than on a page nobody opens.")
	}), Nv = L({ approvals: I(jv).describe("Everything waiting for a yes.") }), Pv = L({ id: M().describe("Which waiting item.") }), Fv = L({
		at: P(),
		outcome: B([
			"completed",
			"skipped",
			"error",
			"interrupted"
		]),
		detail: M().optional(),
		conversationId: M().optional()
	}), Iv = Av.extend({
		runs: I(Fv),
		nextRun: P().optional(),
		webhookToken: M().optional().describe("What a caller presents at /automations/{id}/fire, for an event automation. Shown to a maintainer or the owner only."),
		ingestKey: M().optional().describe("What a client with no website origin presents to a bug intake. Shown to a maintainer or the owner only.")
	}), Lv = L({ automations: I(Iv) }), Rv = L({
		id: M().describe("The sender id the service vouches for, what a rule stores."),
		name: M().describe("What they were called on their last message, for display only."),
		groups: I(M()).optional().describe("The group ids the service reported on their last message, a Discord role list."),
		firstSeenAt: P().describe("When they first reached an automation here, in milliseconds."),
		lastSeenAt: P().describe("When they last did, in milliseconds."),
		messages: P().describe("How many of their messages reached an automation's filters, admitted or not.")
	}), zv = L({ senders: I(Rv).describe("Newest first.") }), Bv = L({ provider: M().min(1).describe("Which listener source.") }), Vv = L({ id: M() }), Hv = L({
		id: M(),
		enabled: F()
	}), Uv = L({
		label: M().min(1),
		placeholder: M().min(1),
		hint: M().min(1).optional()
	}), Wv = L({
		provider: M().min(1),
		label: M().min(1),
		logo: M().min(1).optional(),
		icon: M().min(1).optional(),
		events: I(L({
			value: M().min(1),
			label: M().min(1)
		})),
		channel: Uv,
		branchField: Uv.optional(),
		sender: Uv.optional(),
		senderGroup: Uv.optional(),
		mentionLabel: M().min(1).optional(),
		starterPrompt: M().min(1).optional(),
		requires: I(M().min(1)).default([]),
		enabled: F()
	}), Gv = B(["create", "configure"]), Kv = L({
		id: M().min(1),
		title: M().min(1),
		logo: M().min(1).optional(),
		icon: M().min(1).optional(),
		requires: I(M().min(1)).default([]),
		trigger: Ev,
		guard: M().min(1).optional(),
		holdForSeconds: P().int().positive().optional(),
		prompt: M().min(1),
		note: M().min(1).optional(),
		setup: M().min(1).optional(),
		description: M().min(1).optional(),
		offer: Gv.optional(),
		chore: F().optional()
	}), qv = L({
		sources: I(Wv),
		templates: I(Kv)
	});
})), Yv, Xv, Zv, Qv, $v, ey, ty, ny, ry, iy, ay, oy, sy = v((() => {
	G(), X(), Yv = B(["github", "gitlab"]), Xv = B([
		"queued",
		"running",
		"success",
		"failed",
		"canceled",
		"skipped"
	]), Zv = L({
		repo: M().describe("Which workspace repository it belongs to."),
		host: Yv.describe("Which forge is running it."),
		project: M().describe("The project there, as that forge names it."),
		runId: P().describe("The forge's own id for the run, which is what re-running and cancelling take."),
		title: M().optional().describe("The run's headline, usually the commit subject or the pull request's title. Absent means falling back to the branch and commit."),
		authorName: M().optional().describe("Who the forge credits for setting it off."),
		authorAvatarUrl: M().optional().describe("Their picture, hosted by the forge. Absent means drawing their initials instead."),
		trigger: M().optional().describe("What set it off, in the forge's own word rather than flattened into a shared vocabulary, because the forge's word is the precise one."),
		branch: M().describe("Which branch."),
		sha: M().describe("Which commit."),
		status: Xv.describe("How it is going. Queued means the forge has accepted it and nothing is executing it yet, which is a different thing to wait on than a run actually in progress."),
		url: M().describe("Its page on the forge."),
		createdAt: P().describe("When it started, in milliseconds."),
		durationSeconds: P().optional().describe("How long it took."),
		failedJobs: I(M()).optional().describe("What broke, by name. Fetched only for failed runs, so that a notification or a screen can say what went wrong rather than just that something did.")
	}), Qv = L({
		name: M().describe("The job's name."),
		status: Xv.describe("How it went."),
		stage: M().optional().describe("Which stage it belongs to, where the pipeline groups its jobs that way."),
		needs: I(M()).optional().describe("Which jobs in this run it declared it waits on: the real shape of the pipeline. Absent means nothing could be read, which is different from an empty list, which is the claim that it waits on nothing."),
		startedAt: P().optional().describe("When it began, in milliseconds. Absent while it is queued."),
		finishedAt: P().optional().describe("When it ended, in milliseconds."),
		durationSeconds: P().optional().describe("How long it took."),
		webUrl: M().optional().describe("Its page on the forge, which is the shortest path from this step failed to the log that says why.")
	}), $v = L({ jobs: I(Qv).describe("The steps inside one run. Fetched separately from the run list, so that list stays cheap.") }), ey = L({
		repo: M().describe("Which workspace repository."),
		host: Yv.describe("Which forge it lives on."),
		project: M().describe("The project there."),
		url: M().describe("Its page on the forge."),
		hookWarning: M().optional().describe("Present when the sandbox could not register for instant notifications, with what happened. Without them the sandbox polls instead, so this costs a couple of minutes' delay rather than the feature."),
		hookRecipe: M().optional().describe("What to paste into the repository's webhook settings by hand, secret included. Shown to a maintainer or the owner only.")
	}), ty = L({
		repos: I(ey).describe("Which workspace repositories are wired to a forge, and how each one's notifications are set up."),
		runs: I(Zv).describe("Runs across all of them, newest first.")
	}), ny = L({
		repo: M().describe("Which workspace repository. The project behind it is resolved fresh each call, so a stale screen cannot act on one the workspace no longer maps to."),
		runId: P().describe("Which run, by the forge's own id.")
	}), ry = ny.extend({
		pick: Hp.describe("Which model to open the conversation on, when somebody chose one. Leave it out for the sandbox's own choice, which is the ordinary path."),
		mode: B(["continue", "start-over"]).optional().describe("What to do about the attempt already made at this run, when there is one. `continue` carries on in that conversation; `start-over` stops it if running, files it away, and opens the next attempt on a clean worktree. Leave it out for the plain press: an attempt that ended is continued, a fresh failure gets attempt 1, and one still in play answers CONFLICT with why."),
		force: F().optional().describe("Open the conversation even when every failed job died in its runner's own setup, which is the fleet's fault and nothing an agent on the code can repair. Left out, such a run is refused with that sentence.")
	}), iy = L({ conversationId: M().describe("The conversation that was opened, already holding the failure. Open it to watch, or attach to its turn.") }), ay = B([
		"idle",
		"running",
		"passed",
		"failed",
		"error",
		"cancelled"
	]), oy = L({
		status: ay.describe("Where the run is. Failed and error are deliberately different: failed means the code is wrong, error means the command could not be run at all, and calling the second one a test failure would send an agent hunting a bug that is not there."),
		command: M().describe("What actually ran, echoed here rather than read back from the settings, so a result looked at after the setting changed still says what produced it."),
		startedAt: P().optional().describe("When it began, in milliseconds."),
		finishedAt: P().optional().describe("When it ended, in milliseconds."),
		exitCode: P().optional().describe("How the command exited."),
		timedOut: F().optional().describe("It was killed for taking too long rather than finishing."),
		session: M().optional().describe("The terminal it runs in, which is where to watch it. Absent where the sandbox has no terminals, in which case there is nothing to attach to."),
		output: M().describe("The end of what it printed, as plain text with the colour codes and redrawn progress lines resolved away. The end rather than the beginning, because a suite's verdict is at the end. Empty while it runs, and for one that was killed.")
	});
})), cy, ly, uy, dy, fy, py, my, hy, gy, _y, vy, yy, by, xy, Sy, Cy, wy, Ty, Ey, Dy, Oy, ky, Ay, jy, My, Ny, Py, Fy, Iy, Ly, Ry, zy, By, Vy, Hy, Uy, Wy, Gy, Ky, qy, Jy, Yy = v((() => {
	G(), X(), Ug(), sy(), Dp(), $(), cy = B([
		"staged",
		"unstaged",
		"conflicted"
	]), ly = L({
		side: cy.optional().describe("Narrow to one of the three lists a repository's changes split into. Leave it out for all of them, which is the whole repository."),
		origin: M().min(1).optional().describe("Narrow to the files one conversation landed. Leave it out for everyone's, including your own edits.")
	}), uy = 1e3, dy = I(M().min(1)).max(uy).describe("Exactly these repository-relative paths. For anything bigger than a hand-picked selection, describe a scope instead."), fy = L({
		paths: dy.optional(),
		scope: ly.optional().describe("What to act on, described rather than listed, so it covers every matching file in the repository and not just the ones a list could hold.")
	}), py = { message: "name paths or a scope, not both" }, my = (e) => e.paths === void 0 || e.scope === void 0, hy = Q.extend({
		message: M().min(1).describe("The commit message."),
		stage: fy.refine(my, py).optional().describe("What to stage before committing. Leave it out to record the index exactly as it stands; give it an empty object to stage everything first.")
	}), gy = Q.extend(fy.shape).describe("What to throw away. Neither paths nor a scope discards every uncommitted change in the repository.").refine(my, py), _y = Q.extend(fy.shape).describe("What to move across the index. Nothing on disk changes either way.").refine(my, py), vy = Q.extend({ branch: M().min(1).optional().describe("Which branch to push. Leave it out for the checked-out one. A branch with no upstream yet gets one set on this push.") }), yy = B([
		"hook",
		"remote",
		"transport"
	]), by = oy.extend({
		repo: M().describe("The repository this run is about, the same id the routes take."),
		reason: M().optional().describe("Why not, in git's own words: the last verdict line, for a row that has room for one line. The whole tail is `output`."),
		refusedBy: yy.optional().describe("Who refused a failed push: this repository's pre-push hook (the code is wrong, a fix is worth proposing), the remote (pull first), or the transport (credentials, network: retry). Absent while it runs and for a push that went.")
	}), xy = Q.extend({ path: M().min(1).describe("The file to read, relative to the repository root.") }), Sy = Q.extend({
		path: M().min(1).describe("Where to write, relative to the repository root. Missing folders are created."),
		content: M().describe("The file's whole new contents.")
	}), Cy = Q.extend({
		path: M().min(1).describe("The file, relative to the repository root."),
		side: cy.describe("Which comparison you want. A file that is staged and then edited again has genuinely different answers for each, which is why this is required rather than assumed.")
	}), wy = L({
		branch: M().describe("The checked-out branch."),
		dirty: F().describe("Whether anything is uncommitted."),
		files: I(M()).describe("Every path with something pending, staged or not.")
	}), Ty = L({ files: I(M()).describe("Every path git tracks, relative to the repository root. Ignored and untracked files are not here.") }), Ey = L({
		path: M().describe("The path, as asked for."),
		content: M().describe("The file's contents as they stand on disk.")
	}), L({ repo: M().min(1).describe("Which repository.") }).extend(fy.shape).refine(my, py), Dy = L({
		path: M().describe("The path, relative to the repository root. For a rename this is the new one."),
		status: B([
			"added",
			"modified",
			"deleted",
			"renamed",
			"type-changed",
			"conflicted"
		]).describe("What happened to it. Conflicted is not a kind of edit: nothing can be committed anywhere in the repository while one exists."),
		from: M().optional().describe("Where a renamed file came from."),
		additions: P().optional().describe("Lines added. Absent for a binary file, and for an untracked one, which has nothing to compare against."),
		deletions: P().optional().describe("Lines removed. Absent for the same reasons additions is."),
		code: L({
			additions: P(),
			deletions: P()
		}).optional().describe("The same +/− with every comment stripped from both sides, which is what a review shows beside a diff that opens on code alone. Absent when the file cannot be read that way (binary, too large, or a language this build ships no grammar for): git's own counts above are then the reading.")
	}), Oy = L({
		remote: M().optional().describe("The remote this branch pushes to. Absent means none is configured. In a fork with two remotes, pushing to the wrong one succeeds and leaves the count stuck, which is why this says which."),
		branch: M().optional().describe("The checked-out branch. Absent when the repository is on a bare commit, or has no commits yet."),
		upstream: M().optional().describe("The branch on the remote this one follows. Absent means the next push will publish it."),
		ahead: P().describe("Commits you have that the remote does not."),
		behind: P().describe("Commits the remote has that you do not, as of the last fetch. Fetch before trusting it.")
	}), ky = L({
		name: M().describe("The branch name."),
		current: F().describe("Whether this is the one checked out."),
		upstream: M().optional().describe("The branch on the remote it follows, if any."),
		ahead: P().describe("Commits this branch has that its remote counterpart does not."),
		behind: P().describe("Commits its remote counterpart has that it does not."),
		gone: F().optional().describe("The branch it followed no longer exists on the remote, usually because a merged pull request deleted it. The signal that this one is safe to delete."),
		at: P().describe("When its tip was committed, in milliseconds. Lists are newest first.")
	}), Ay = L({
		name: M().describe("The full name, such as origin/main."),
		remote: M().describe("Just the remote part, so a picker can group by it without re-parsing."),
		branch: M().describe("Just the branch part."),
		at: P().describe("When its tip was committed, in milliseconds, as this repository last saw it.")
	}), jy = L({
		branches: I(ky).describe("Branches in this repository."),
		remotes: I(Ay).describe("Branches on its remotes, as last seen. Sent together with the locals so a switcher never draws a half-filled list.")
	}), My = Q.extend({
		name: Tp.describe("The new branch's name."),
		start: M().min(1).optional().describe("Where to start it: a commit or another branch. Leave it out to start from where you are."),
		checkout: F().optional().describe("Switch to it as well as creating it.")
	}), Ny = Q.extend({
		name: Tp.describe("The branch to delete."),
		force: F().optional().describe("Delete it even though it holds work that was never merged. The deliberate retry after the first attempt refuses.")
	}), Py = B([
		"merge",
		"rebase",
		"cherry-pick",
		"revert"
	]), Fy = L({
		repo: M().describe("The repository asked about."),
		operation: Py.optional().describe("Which operation the working tree is stuck inside. Absent means it is not stuck at all, which is almost always. While one is present git refuses nearly everything else, and abandoning it is the only way out.")
	}), Iy = L({
		repo: M(),
		branch: M().optional().describe("The checked-out branch. Absent in a repository that has no commits yet."),
		conflicted: I(Dy).describe("Paths a merge or rebase could not finish. First, because nothing anywhere in this repository can be committed until they are resolved. Held apart from the two lists below, because staged or not is not a question one of these has an answer to."),
		operation: Py.optional().describe("What halted, when something did. This is the sentence that explains the conflicts above and names the way out of them."),
		staged: I(Dy).describe("What a plain commit would record right now."),
		unstaged: I(Dy).describe("Edits on disk that are not staged, plus untracked files. A path can be in both lists at once with different line counts, which is why they are separate."),
		truncated: L({
			staged: P().describe("Staged changes not listed above."),
			unstaged: P().describe("Unstaged changes not listed above.")
		}).optional().describe("How many changes were cut from each of the two lists above. A freshly cloned monorepo or a mass delete runs to six figures, which no screen can draw, so past a budget the lists arrive short and this says by how much on each side. Absent means they are complete."),
		remote: Oy.optional().describe("Where this repository stands against its remote."),
		origins: z(M(), I(M())).optional().describe("Which conversation put each path here, newest first, keyed by path. Only work that went through a merge can appear: edits made in the shared tree, in a terminal, or by a person are simply absent rather than guessed at."),
		error: M().optional().describe("Why the repository could not be read at all, in git's own words. A repository left broken by a failed import arrives with empty lists and this set, rather than vanishing from the answer with nothing to act on.")
	}), Ly = L({
		title: M().optional().describe("The conversation's title. Absent for one that never got as far as having a title."),
		provider: Op.describe("Which model provider it ran on."),
		landedMessage: pg.optional().describe("What the merged work did, drafted by the conversation itself. Carried here as well as on its card, because merged lines outlive the card: archiving a finished conversation does not uncommit its work.")
	}), Ry = L({
		repos: I(Iy).describe("One entry per repository that has something pending, is out of step with its remote, or could not be read. A clean repository is simply absent."),
		originAgents: z(M(), Ly).optional().describe("Who each conversation named above is, keyed by id, so a caller need not look them up. Absent when nothing in the review can be attributed."),
		committing: I(M()).optional().describe("Repositories with a commit running right now. The sandbox's answer rather than any one tab's, so a reload, a second window and another device all know. Absent means nothing is committing.")
	}), zy = L({
		committed: F().describe("Whether a commit was actually recorded."),
		changes: Iy.optional().describe("What this repository looks like now, read in the same breath as the commit so a caller can redraw from here instead of asking for a fresh scan. Absent means there is nothing left to show."),
		originAgents: z(M(), Ly).optional().describe("Who the conversations named in those changes are. Merge it over what you already hold rather than replacing: other repositories still name their own.")
	}), By = L({
		dir: M().describe("Where the package lives, relative to its repository. Empty when the repository is itself one package."),
		name: M().describe("The name the package declares for itself.")
	}), Vy = L({
		repo: M().describe("Which repository."),
		modules: I(By).describe("Its packages.")
	}), Hy = L({ repos: I(Vy).describe("Every repository with the packages inside it.") }), Uy = Dy.extend({ landed: F().describe("Whether your workspace already holds this content. Read from the tree at request time, not from what a land recorded: discard a landed file in the Changes panel and this goes back to false, which is what puts it back under Land now.") }), Wy = L({
		repo: M().describe("Which repository."),
		branch: M().optional().describe("The branch this conversation's work sits on."),
		changes: I(Uy).describe("What it changed there."),
		modules: I(By).describe("The packages of the tree these changes came from, so a review can group by package. Carried with the changes rather than looked up separately, because a package the conversation has just created exists only in its own copy and the shared tree has never heard of it.")
	}), Gy = L({
		repos: I(Wy).describe("One entry per repository the conversation touched."),
		absorbed: P().describe("How many of this conversation's files your own history already carries, and which are therefore not listed as differences any more."),
		conflicts: I(Rg).optional().describe("Why the last merge refused, when one did. Carried here as well as in the merge's own answer, because a conflict is found the moment a turn ends and dealt with hours later on this surface, which would otherwise open with nothing to explain what it promised to resolve.")
	}), Ky = L({
		sha: M().describe("The commit."),
		short: M().describe("Its abbreviated hash, which is what a reader recognises it by."),
		subject: M().describe("Its first line."),
		author: M().describe("Who committed it."),
		at: P().describe("When it was authored, in milliseconds."),
		changes: I(Dy).describe("The conversation's files that this commit is the newest carrier of, as the conversation changed them. Every file appears under exactly one commit, so these counts add up to the work rather than over-counting a file that history touched twice.")
	}), qy = L({
		repo: M().describe("Which repository."),
		commits: I(Ky).describe("The commits carrying this conversation's work there, newest first."),
		modules: I(By).describe("The packages of the tree these files came from, so a review can group them by package.")
	}), Jy = L({
		repos: I(qy).describe("One entry per repository holding committed work of this conversation."),
		unaccounted: P().describe("How many of the conversation's absorbed files none of these commits carries. Above zero means its content reached your main line by some other road, so the commits listed are not the whole story.")
	});
})), Xy, Zy = v((() => {
	J(), B_(), Ug(), Jv(), Yy(), iv(), $(), Xy = {
		list: q.route({
			method: "GET",
			path: "/agents",
			summary: "Every live conversation",
			description: "The fleet as the board draws it: each conversation with its title, what it is doing, when it last moved and whether anybody has read it since. Archived conversations are not in here."
		}).output(Mv),
		archived: q.route({
			method: "GET",
			path: "/agents/archived",
			summary: "Conversations put away",
			description: "The same shape as the live fleet, for the conversations somebody has decided are finished. Their work is kept, and any one of them can be brought back."
		}).output(Mv),
		search: q.route({
			method: "GET",
			path: "/agents/search",
			summary: "Find a conversation",
			description: "Searches the live fleet and the archive together. Both halves on purpose: the board hides finished work by design, and a filter that says it found nothing while the answer sits one click away is simply wrong."
		}).input(Tg).output(kg),
		get: q.route({
			method: "GET",
			path: "/agents/{id}",
			summary: "One conversation's card",
			description: "Everything the board shows for a single conversation: its title, state, working branch, unread marker and timestamps."
		}).input(vg).output(_g),
		transcript: q.route({
			method: "GET",
			path: "/agents/{id}/transcript",
			summary: "One page of a conversation",
			description: "The most recent turns of one conversation, in order, including the tool calls and their results: what the chat replays and the next turn is seeded from. A page, not the whole record — pass the answer's `from` back as `before` to walk further back, until `more` reads false."
		}).input(yg).output(z_),
		place: q.route({
			method: "POST",
			path: "/agents/{id}/place",
			summary: "Put words in the agent's mouth",
			description: "Writes a line into the record as though the agent had said it, with no turn behind it and no reply. Human readers see it marked as placed. The next real turn starts fresh from the record, where the line reads as the agent's own. Refused while a turn is running."
		}).input(jg).output(Z),
		rename: q.route({
			method: "POST",
			path: "/agents/{id}/rename",
			summary: "Retitle a conversation",
			description: "Sets the title a person chose, replacing the one that was generated. Allowed while the conversation is working, and it does not count as activity."
		}).input(Ag).output(_g),
		autoLand: q.route({
			method: "POST",
			path: "/agents/{id}/auto-land",
			summary: "Whether this conversation merges its work automatically",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to go back to following the default. Deliberately allowed mid-turn, because the setting is read when the turn finishes, so flipping it while the agent works means exactly hold this piece of work for review."
		}).input(Mg).output(_g),
		resumeAfterOutage: q.route({
			method: "POST",
			path: "/agents/{id}/resume-after-outage",
			summary: "Whether this conversation retries after a provider outage",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to follow the default again. This is what the offer shown when a turn dies writes, because the press happens inside one conversation and honestly means finish this piece of work."
		}).input(Ng).output(_g),
		resumeAfterLimit: q.route({
			method: "POST",
			path: "/agents/{id}/resume-after-limit",
			summary: "Whether this conversation sends itself again when its allowance comes back",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to follow the default again. Off unless asked for, because the allowance is the user's own budget and a turn that spends it the moment it reopens is not a decision to make on their behalf."
		}).input(Pg).output(_g),
		moveAfterLimit: q.route({
			method: "POST",
			path: "/agents/{id}/move-after-limit",
			summary: "Whether this conversation moves to another account when its allowance is spent",
			description: "Overrides the sandbox-wide setting for one conversation; clear it to follow the default again. A move spends a second account of the same provider on this conversation's behalf, so it is off unless asked for."
		}).input(Fg).output(_g),
		seen: q.route({
			method: "POST",
			path: "/agents/{id}/seen",
			summary: "Mark a conversation read",
			description: "Stamps the read marker behind the unread badge on one card. Allowed while the conversation is working, and reading never counts as activity."
		}).input(vg).output(_g),
		stopWatching: q.route({
			method: "POST",
			path: "/agents/{id}/stop-watching",
			summary: "Stop every condition watch a conversation is parked on",
			description: "Disarms all of this conversation's outside-condition watches, so none of them will wake it. All of them rather than one, because that is what the press means when it is made about a card. Nothing else about the conversation changes."
		}).input(vg).output(_g),
		seenAll: q.route({
			method: "POST",
			path: "/agents/seen",
			summary: "Mark every conversation read",
			description: "Clears the unread badge across the whole fleet at once, and hands the refreshed list back."
		}).output(Mv),
		diff: q.route({
			method: "GET",
			path: "/agents/{id}/diff",
			summary: "Everything a conversation has changed",
			description: "One flat set of changed files per repo, measured against where each repo stood when the conversation started, with every file flagged as already merged or not. Not the staged-and-unstaged shape a working copy has, because nobody ever checks this branch out to stage into it."
		}).input(vg).output(Gy),
		history: q.route({
			method: "GET",
			path: "/agents/{id}/history",
			summary: "Where a conversation's committed work lives",
			description: "The commits in your own history that carry this conversation's work, with the files each one brought. Use it when the change list is empty or short because you already committed what it wrote: those files are not differences against the main line any more, so they are not in the review, and this is where they went."
		}).input(vg).output(Jy),
		fileDiff: q.route({
			method: "GET",
			path: "/agents/{id}/{repo}/file-diff",
			summary: "One file's before and after in a conversation's work",
			description: "Both sides of a single file: what it held when the conversation started and what it holds on its branch now."
		}).input(Ig).output(rv),
		land: q.route({
			method: "POST",
			path: "/agents/{id}/land",
			summary: "Merge a conversation's work into the workspace",
			description: "Brings the conversation's branches into the main tree, one repo at a time. A conflict is reported rather than raised and nothing is lost when it fails. Refused while a turn is running, and refused for a conversation that works directly in the shared tree, which has nothing to merge."
		}).input(Hg).output(zg),
		requestLand: q.route({
			method: "POST",
			path: "/agents/{id}/request-land",
			summary: "Ask a maintainer to merge this work",
			description: "For a collaborator who is not allowed to merge: marks the conversation as waiting for review, with who asked. The request shows on every maintainer's board and clears when somebody merges or discards it."
		}).input(vg).output(_g),
		discard: q.route({
			method: "POST",
			path: "/agents/{id}/discard",
			summary: "Throw a conversation's work away",
			description: "Deletes the conversation's working copies, its branches and its entry. Nothing is kept. Refused while a turn is running, and refused for a conversation working in the shared tree."
		}).input(vg).output(Z),
		archive: q.route({
			method: "POST",
			path: "/agents/archive",
			summary: "Put conversations away",
			description: "The gentle counterpart to discarding. Commits whatever the conversation still has in progress onto its own branch, releases its working copy, and keeps the entry and the record. It leaves the live fleet and joins the archive. Refused for a conversation that is running."
		}).input(bg).output(Cg),
		unarchive: q.route({
			method: "POST",
			path: "/agents/unarchive",
			summary: "Bring conversations back",
			description: "Returns archived conversations to the live fleet. The next turn picks up a fresh working copy from the branch that was kept."
		}).input(xg).output(Sg),
		purge: q.route({
			method: "POST",
			path: "/agents/purge",
			summary: "Empty the archive for good",
			description: "Discards every conversation already in the archive: working copies, branches and entries. The whole archive rather than a chosen few, because the archive is the pile somebody has already decided is over. A teardown that fails on one conversation leaves that one behind instead of taking the rest down with it."
		}).output(wg)
	};
})), Qy, $y, eb, tb, nb, rb, ib, ab, ob, sb, cb = v((() => {
	G(), Dp(), B(["post", "action"]), Qy = B([
		"proposed",
		"approved",
		"running",
		"done",
		"failed"
	]), $y = {
		actsAs: Y.optional().describe("Whose name it acts under. Needed for anything that requires being logged in, because an unwatched turn naming nobody is allowed no account at all. Never guessed: one site can be connected five times over, and picking for you means picking wrong in public with no undo."),
		scheduledAt: P().optional().describe("When it should happen, in milliseconds. An agent may propose without one and you set it when approving; an approved item with no time goes after a short countdown you can still stop."),
		status: Qy.default("proposed").describe("Where it is: proposed by the agent, approved by you, being carried out, done, or failed. Rejecting is deleting it; retrying is approving a failed one again."),
		createdAt: P().optional().describe("When it was written, in milliseconds."),
		startedAt: P().optional().describe("When it started being carried out, in milliseconds. Needed to tell a run that is under way from one whose turn died mid-flight, which the scheduled time cannot."),
		finishedAt: P().optional().describe("When it was done, in milliseconds."),
		result: M().optional().describe("What came back, when something did: the post's own address, a confirmation number. The one thing a finished item can offer that reading it cannot."),
		error: M().optional().describe("Why it failed, written as a sentence for a person to read rather than as a code.")
	}, eb = L({
		kind: V("post").describe("A post to publish somewhere."),
		platform: M().min(1).describe("Where it should go. A plain name, so a new site needs no change here; an unknown one simply fails when it tries to post."),
		content: M().min(1).describe("The post itself."),
		title: M().optional().describe("A title, where the site wants one."),
		target: M().optional().describe("Where on the site: a community, a channel. Or the address of the thing this replies to, in which case it is a reply, and on some sites the difference between a thread's address and one comment's is the difference between talking to the room and answering the person."),
		media: I(M()).optional().describe("Anything to attach, as workspace paths."),
		...$y
	}), tb = L({
		kind: V("action").describe("Something the agent will do once you say so."),
		summary: M().min(1).max(200).describe("What will happen, in one line: the row's headline and the confirm dialog's item."),
		details: M().optional().describe("The specifics, as Markdown: everything you would want to see before saying yes."),
		instructions: M().min(1).describe("What to do once approved, written for the fresh turn that will do it: names, ids and steps, since it has none of this conversation."),
		...$y
	}), R("kind", [eb, tb]), nb = { id: Y.describe("The approval's id.") }, rb = eb.extend(nb), ib = tb.extend(nb), ab = R("kind", [rb, ib]), ob = L({
		approvals: I(ab).describe("The queue."),
		invalid: I(M()).describe("Files that could not be read at all, or name a kind this daemon does not know. Listed rather than skipped, because an agent writes these files directly and a malformed one would otherwise never run and never say why.")
	}), sb = L({ id: Y.describe("Which approval.") });
})), lb, ub = v((() => {
	J(), cb(), $(), lb = {
		list: q.route({
			method: "GET",
			path: "/approvals",
			summary: "Things waiting for your yes",
			description: "Everything an agent has prepared and would like to do: posts to publish, actions to carry out. Nothing here has happened yet."
		}).output(ob),
		upsert: q.route({
			method: "POST",
			path: "/approvals",
			summary: "Approve, edit or retry one",
			description: "All three are the same act with a different field changed, so they share one call. Send the item back as you want it."
		}).input(ab).output(Z),
		remove: q.route({
			method: "DELETE",
			path: "/approvals/{id}",
			summary: "Reject one",
			description: "Throws it away undone."
		}).input(sb).output(Z)
	};
})), db, fb = v((() => {
	J(), Jv(), $(), db = {
		list: q.route({
			method: "GET",
			path: "/automations",
			summary: "Things that wake an agent on their own",
			description: "Every automation with its recent runs and when it fires next."
		}).output(Lv),
		catalog: q.route({
			method: "GET",
			path: "/automations/catalog",
			summary: "What can trigger an automation here",
			description: "Every trigger this sandbox understands and every template worth starting from, the daemon's own merged with each installed extension's. Writing an automation is checked against this same list, so a screen and the daemon can never disagree about what is allowed."
		}).output(qv),
		upsert: q.route({
			method: "POST",
			path: "/automations",
			summary: "Create or edit an automation",
			description: "Writes an automation by id. Nothing needs provisioning: the scheduler picks it up on its next sweep."
		}).input(Av).output(Z),
		setEnabled: q.route({
			method: "POST",
			path: "/automations/{id}/enabled",
			summary: "Turn an automation on or off",
			description: "Flips only the switch, so a row in a list can be toggled without rebuilding the whole record."
		}).input(Hv).output(Z),
		remove: q.route({
			method: "DELETE",
			path: "/automations/{id}",
			summary: "Delete an automation",
			description: "Removes it, so nothing fires from it again."
		}).input(Vv).output(Z),
		rotateToken: q.route({
			method: "POST",
			path: "/automations/{id}/rotate-token",
			summary: "Rotate an automation's webhook token or intake key",
			description: "Mints a new credential for the door this automation opens and retires the old one at once. Every caller has to be handed the new URL; that is the point. Refused for an automation with no door."
		}).input(Vv).output(km),
		run: q.route({
			method: "POST",
			path: "/automations/{id}/run",
			summary: "Fire an automation by hand",
			description: "The answer to writing something that runs at three in the morning and having no way to try it. It takes exactly the path the real trigger takes, including the check that decides whether there was anything to do, since skipped by the guard is the most useful thing this can tell you. A switched-off automation fires too, because trying it before switching it on is the main reason to press this. Not available for the trigger that listens for incoming messages, where a hand-fire would produce an agent asked to handle events and handed none; send the bot a message instead. Answers straight away and runs detached."
		}).input(Vv).output(Z),
		senders: q.route({
			method: "GET",
			path: "/automations/senders/{provider}",
			summary: "Who has written to a listener source",
			description: "Everyone whose message reached one of this source's automations, newest first, admitted or not. What the sender rules picker offers by name while storing the id the service vouches for."
		}).input(Bv).output(zv),
		pendingList: q.route({
			method: "GET",
			path: "/automations/pending",
			summary: "Automations waiting for a yes",
			description: "The queue an automation set to ask first lands in each time it would have fired."
		}).output(Nv),
		approve: q.route({
			method: "POST",
			path: "/automations/pending/{id}/approve",
			summary: "Let a held automation run",
			description: "Releases one waiting automation and runs the wake it was holding. Answers straight away and runs detached."
		}).input(Pv).output(Z),
		reject: q.route({
			method: "POST",
			path: "/automations/pending/{id}/reject",
			summary: "Drop a held automation",
			description: "Throws one waiting fire away. The automation stays on, and the next trigger queues as usual."
		}).input(Pv).output(Z)
	};
})), pb, mb, hb, gb, _b, vb, yb, bb, xb, Sb, Cb, wb, Tb, Eb, Db, Ob, kb, Ab, jb, Mb, Nb, Pb, Fb, Ib, Lb, Rb, zb = v((() => {
	G(), X(), pb = L({ agent: Np.optional().describe("Read a conversation's own private copy of the workspace rather than the shared tree. Leave it out for the shared tree. A conversation that is not working privately resolves back to the shared tree rather than failing, so a link need not know which mode it runs in.") }), mb = L({
		to: M().describe("What the link says, verbatim, rather than where it ends up. That is what the person who made it wrote, and what they would edit."),
		state: B(["broken", "outside"]).optional().describe("Absent for an ordinary link. Broken means there is nothing at the other end, and it is listed anyway because a dangling link is worth seeing. Outside means it leads out of the workspace, so it is shown and refused.")
	}), hb = L({
		name: M().describe("Just this entry's own name."),
		path: M().describe("Its full path from the workspace root, which feeds straight back into the file routes."),
		type: B(["file", "dir"]).describe("What it is. For a link, what it points at, so a link to a folder opens like a folder."),
		size: P().optional().describe("Size in bytes, for a file."),
		ignored: F().optional().describe("Tooling ignores it: installed packages, git internals, anything the ignore rules exclude. Usually drawn greyed out."),
		link: mb.optional().describe("Present when this entry is a link."),
		get children() {
			return I(hb).optional().describe("What is inside a folder. Absent means it was not opened, either because it is ignored or because the walk ran out of budget above it, so ask for it separately. An empty list means it really is empty.");
		}
	}), gb = L({
		root: M().describe("The path everything below is relative to."),
		tree: I(hb).describe("The workspace, one entry per file and folder."),
		hidden: P().describe("How many entries at the top level were cut for size. Zero means the listing is complete."),
		barren: I(M()).describe("Folders whose whole contents are empty folders, and nothing else. Complete for the workspace, however much of the tree above was listed, and ordered like the tree, so a parent comes before the branch below it.")
	}), _b = pb.extend({
		path: M().min(1).describe("The folder to open, as a workspace path."),
		depth: W().int().min(1).max(5).optional().describe("How many levels to include. Omitted means direct children only; at most five levels can be read in one request.")
	}), vb = L({
		entries: I(hb).describe("What is inside it, as a flat list. With the default depth these are direct children; a deeper request also includes descendants, whose full paths say where they belong. Folders carry no nested contents of their own."),
		hidden: P().describe("How many entries were cut for size. Zero means the listing is complete.")
	}), yb = L({ path: M().min(1).describe("The file or folder, as a workspace path.") }), bb = pb.extend({ path: M().min(1).describe("The media file the ticket should cover.") }), xb = L({
		ticket: M().describe("Hand this to the streaming route in the query string. It buys exactly the one file it was minted for."),
		expiresAt: P().describe("When it stops working, in milliseconds, so a player can tell a dead ticket from a dead file.")
	}), Sb = pb.extend({
		path: M().min(1).describe("The file to read, as a workspace path."),
		offset: W().int().optional().describe("Which byte to start at. A negative number reads that many bytes from the end, which is how you follow a growing log without knowing its size first."),
		limit: W().int().min(1).optional().describe("How many bytes to read. Capped by the sandbox, so leaving it out or asking for too much gives you the cap rather than the whole file.")
	}), Cb = L({
		present: V(!0).describe("There is something at that path."),
		path: M().describe("The path, as asked for."),
		content: M().describe("The bytes of the window you asked for, as text."),
		size: P().describe("How large the whole file is. Compare it with the window below to know whether there is more."),
		offset: P().describe("Which byte the window starts at."),
		bytes: P().describe("How many bytes the window holds."),
		shared: F().describe("Which tree answered. True when no conversation was named, and also when one was but its own copy has no such file, which is the case a reader has to be told about rather than left to assume.")
	}), wb = L({
		present: V(!1).describe("Nothing there. An answer, not a failure: reading a file that may not exist yet is the ordinary case for half the reads in this product."),
		path: M().describe("The path, as asked for.")
	}), Tb = R("present", [Cb, wb]), Eb = L({ path: M().min(1).describe("The file you want the text of, as a workspace path. The real file, not its shadow: where the text is kept is this route's business.") }), Db = L({
		enabled: F().describe("Whether the background pass is on (the `sidecars` setting). Off means a shadow exists only where someone asked for one."),
		queued: P().describe("Files waiting for a shadow, not counting the batch being rendered right now."),
		deriving: I(M()).describe("The files being rendered at this moment, as workspace paths. One batch at a time, because derivation shares the box with the agent it serves."),
		sweeping: F().describe("Whether a whole-tree pass is running, which is what a freshly enabled setting or an unlistably large batch triggers."),
		broken: F().describe("Whether the `fileq` binary is missing, in which case nothing renders in the background until this sandbox restarts."),
		shadows: P().optional().describe("How many shadows the last whole-tree pass counted. Absent until one has run in this daemon's lifetime."),
		sweptAt: M().optional().describe("When that pass finished, as an ISO timestamp.")
	}), Ob = B([
		"off",
		"queued",
		"deriving",
		"idle",
		"broken",
		"undeliverable"
	]), kb = {
		state: Ob.describe("Where this file stands with the background pass: switched off, waiting its turn, being read right now, settled, or unreachable because the renderer is missing. `undeliverable` is a format nothing here reads."),
		queue: Db.describe("How the background pass as a whole is doing, so a wait can be reported as a queue rather than as nothing happening.")
	}, Ab = L({
		...kb,
		present: V(!0).describe("There is derived text for that file."),
		path: M().describe("The file it was derived from, as asked for."),
		content: M().describe("The text itself, as markdown."),
		deriver: M().describe("Which reader wrote it, and at which version, such as `pdf+ocr v1`. A file re-derives when this changes."),
		derivedAt: M().optional().describe("When it was written, as an ISO timestamp. Absent only for a shadow whose front matter was edited by hand."),
		title: M().optional().describe("The title the format carried, where it carried one."),
		notes: I(M()).describe("Every cap and degradation the derivation hit: a sheet cut to 200 rows, a book cut at 2 MB, a scan recognised rather than read. Show these with the text, since text that was cut reading as complete is the one failure this whole feature cannot afford."),
		tokens: P().describe("Roughly what an agent spends reading it, by the same four-chars-a-token estimate every budget here uses."),
		truncated: F().describe("Whether this is only the start of the shadow, cut to keep the response sendable. The file on disk holds the rest."),
		stale: F().describe("Whether the file has changed since this text was derived, compared by content rather than by clock. True means you are reading a rendering of an older version of the file, and deriving it again catches it up.")
	}), jb = L({
		...kb,
		present: V(!1).describe("There is no derived text for that file. Read `state` before saying so to anyone: absent and queued are different answers."),
		path: M().describe("The file, as asked for."),
		derivable: F().describe("Whether this format can be turned into text at all. True means asking for it to be derived is worth offering; false means nothing here reads this format."),
		reason: M().optional().describe("Why there is none, when deriving was just attempted and produced nothing: the file is too large, corrupt, or of a format no reader claims.")
	}), Mb = R("present", [Ab, jb]), Nb = pb.extend({ path: M().min(1).max(512).describe("The reference as somebody wrote it. Often only the tail of the real path, which is why this is matched against the tree rather than read as-is.") }), Pb = L({ path: M().optional().describe("The real path it means. Absent when nothing in the workspace ends that way.") }), Fb = L({ path: M().min(1).describe("The folder to create. Missing folders above it are created too.") }), Ib = L({
		from: M().min(1).describe("What to move or copy, as a workspace path."),
		to: M().min(1).describe("Where it should end up. Changing only the last part is how you rename something.")
	}), Lb = B([
		"repositories",
		"documents",
		"media",
		"archives",
		"other"
	]), Rb = L({ classifications: I(L({
		path: M().describe("What was looked at."),
		bucket: Lb.describe("Which bucket it was sorted into."),
		reason: M().describe("The signal that decided it, so the proposal can be argued with rather than trusted.")
	})).describe("One entry per repository folder and loose file at the top of the workspace. A read-only proposal: nothing moves until you apply it.") });
})), Bb, Vb, Hb, Ub, Wb, Gb, Kb, qb, Jb, Yb, Xb, Zb, Qb, $b, ex, tx, nx, rx = v((() => {
	G(), Ug(), sm(), $(), zb(), Bb = Ou({ kind: M() }), Vb = L({
		kind: V("heartbeat"),
		rev: P()
	}), Hb = L({
		key: M(),
		label: M(),
		state: B([
			"pending",
			"running",
			"done",
			"failed"
		]),
		ms: P().optional()
	}), Ub = L({
		ready: F(),
		startedAt: P(),
		steps: I(Hb)
	}), Wb = L({
		kind: V("boot"),
		...Ub.shape
	}), Gb = L({
		kind: V("hello"),
		workspaceId: M(),
		routes: I(M()).optional(),
		shapes: z(M(), M()).optional(),
		build: M().optional(),
		boot: Ub.optional()
	}), Kb = L({
		kind: V("reposChanged"),
		repos: I(M())
	}), qb = L({
		kind: V("workspaceChanged"),
		paths: I(M())
	}), Jb = L({
		kind: V("derivedChanged"),
		paths: I(M()),
		queue: Db
	}), Yb = L({
		kind: V("refsChanged"),
		repos: I(M())
	}), Xb = L({
		kind: V("runtimeChanged"),
		domains: I(M())
	}), Zb = L({
		clientId: M(),
		email: M(),
		name: M().optional(),
		picture: M().optional(),
		role: Om,
		idle: F(),
		view: M().optional(),
		sessionId: M().optional(),
		path: M().optional()
	}), Qb = L({
		kind: V("presence"),
		users: I(Zb)
	}), $b = L({
		kind: V("agents"),
		agents: I(_g),
		rev: P()
	}), ex = L({
		kind: V("accountUsage"),
		provider: M(),
		account: M(),
		usage: Yp.optional()
	}), tx = L({
		kind: V("providerRefusal"),
		provider: M(),
		refusal: Qp.optional()
	}), nx = R("kind", [
		Gb,
		Vb,
		Wb,
		qb,
		Jb,
		Kb,
		Yb,
		Xb,
		Qb,
		$b,
		ex,
		tx
	]);
})), ix, ax, ox, sx, cx, lx, ux, dx, fx, px, mx, hx, gx, _x, vx = v((() => {
	G(), Dp(), ix = B([
		"tor",
		"vpngate",
		"wireguard"
	]), ax = M().regex(/^[A-Za-z]{2}$/, "A country is its two-letter code, like DE, US or JP.").transform((e) => e.toUpperCase()), ox = L({
		provider: V("tor"),
		country: ax.optional(),
		autoStart: Ep
	}), sx = L({
		provider: V("vpngate"),
		country: ax.optional(),
		autoStart: Ep
	}), cx = L({
		provider: V("wireguard"),
		config: M().min(1),
		country: ax.optional(),
		autoStart: Ep
	}), lx = R("provider", [
		ox,
		sx,
		cx
	]), ux = B([
		"up",
		"starting",
		"down",
		"unavailable",
		"failed"
	]), dx = L({
		ip: M().describe("The address the world sees, looked up through the exit's own proxy rather than assumed."),
		country: M().optional().describe("Which country that address is in. Absent when the lookup gave an address and no country, in which case a switch is judged on the address having changed instead."),
		countryName: M().optional().describe("That country's name, spelled out.")
	}), fx = L({
		country: M().describe("The country's code."),
		countryName: M().describe("Its name, spelled out."),
		servers: P().describe("How many servers this provider has there."),
		share: P().optional().describe("How much of the provider's actual capacity is there, from zero to one. This is what a list should be sorted by: a third of the countries on offer are one overloaded machine behind a flag, and a count of servers would rank them first.")
	}), px = L({
		countries: I(fx).describe("Where this exit can put you, best-supplied first."),
		live: F().describe("Whether the provider answered, or this came from a built-in list. Said out loud rather than presenting an old list as current.")
	}), mx = L({
		id: M().describe("Which exit."),
		provider: ix.describe("What it runs on."),
		state: ux.describe("Whether it is carrying traffic, coming up, resting, failed, or not installable yet because its client needs a rebuild to arrive."),
		proxy: M().describe("Where to point traffic that should go through it. Fixed per exit and unchanged by a country switch, which is what lets a long job move country halfway through without reconfiguring anything."),
		country: M().optional().describe("Where it was asked to come out. Absent means the provider chose."),
		observedCountry: M().optional().describe("Where it actually comes out, as last checked. Kept separate from what was asked for, because those two disagreeing is the most useful fault signal this whole feature has."),
		ip: M().optional().describe("The address behind that observation."),
		checkedAt: P().optional().describe("When that was checked, in milliseconds, so an old reading can be shown as old."),
		interface: M().optional().describe("The network interface, for the kinds that have one."),
		since: P().optional().describe("When it came up, in milliseconds."),
		autoStart: F().describe("Whether it starts itself when the sandbox does."),
		detail: M().optional().describe("Why it failed, or a note about a healthy one.")
	}), hx = L({ links: I(mx).describe("Every configured exit, with where it was asked to come out and where it actually does.") }), gx = L({ id: M().describe("Which exit.") }), _x = L({
		id: M().describe("Which exit."),
		country: ax.optional().describe("Where to come out. Leaving it out means letting the provider choose, so clearing a country is something you can actually say rather than only setting one.")
	});
})), yx, bx, xx, Sx, Cx, wx, Tx, Ex, Dx, Ox, kx, Ax, jx = v((() => {
	G(), yx = B([
		"host",
		"cloudflare",
		"github",
		"gitlab",
		"stripe"
	]), bx = B([
		"signoz",
		"outline",
		"paperless",
		"openproject",
		"invoiceninja",
		"infisical"
	]), xx = z(M(), ku([M(), P()])), Sx = /^[a-zA-Z_][a-zA-Z0-9_]*$/, Cx = M().min(1).max(60).regex(Sx), wx = L({
		kind: V("backend").describe("Something you already have: a machine, an account with a hosting provider."),
		provider: yx.describe("Which provider it is with."),
		name: M().describe("What to call it, which is also how everything else refers to it."),
		values: xx.describe("Its settings. Anything secret is stored separately and referred to here, never written in.")
	}), Tx = L({
		kind: V("service").describe("Something you want provisioned."),
		service: bx.describe("Which service."),
		name: M().describe("What to call it."),
		values: xx.describe("Its settings."),
		on: M().describe("Which of your machines to put it on."),
		expose: M().describe("How it should be reachable.")
	}), Ex = L({
		kind: V("app").describe("An app of your own, built from source and deployed."),
		name: M().describe("What to call it."),
		values: xx.describe("Its settings, including the address it should answer on."),
		on: M().describe("Which of your machines to put it on."),
		expose: M().describe("How it should be reachable.")
	}), Dx = R("kind", [
		wx,
		Tx,
		Ex
	]), Ox = R("kind", [
		wx.extend({ name: Cx }),
		Tx.extend({ name: Cx }),
		Ex.extend({ name: Cx })
	]), kx = L({ name: M().describe("Which entry, by name.") }), Ax = L({ entries: I(Dx).describe("Everything declared: what you have, and what you want provisioned.") }), L({
		name: Cx,
		user: M().min(1),
		address: M().min(1),
		port: W().default(22),
		via: B(["direct", "cloudflared"]).default("cloudflared"),
		sshKey: M().min(1),
		cfToken: M().optional(),
		cfZone: M().optional()
	});
})), Mx, Nx, Px, Fx, Ix, Lx, Rx, zx, Bx, Vx, Hx, Ux, Wx, Gx, Kx, qx, Jx = v((() => {
	G(), Mx = B([
		"wireguard",
		"fortinet",
		"ipsec"
	]), Nx = B(["on", "off"]).default("on"), Px = (e) => /^Enc[X]?\s+[0-9A-Fa-f]{8,}$/.test(e.trim()), Fx = (e, t) => e.refine((e) => !Px(e), { message: `That looks like a value copied straight out of a FortiClient config, FortiClient encrypts it with a key tied to the machine that exported it, so it can't be used here. Enter the actual ${t} (ask whoever administers the gateway).` }), Ix = L({
		provider: V("wireguard"),
		config: M().min(1),
		autoConnect: Nx
	}), Lx = L({
		provider: V("fortinet"),
		server: M().min(1),
		port: W().int().min(1).max(65535).default(443),
		username: M().min(1),
		password: Fx(M().min(1), "password"),
		trustedCert: M().min(1).optional(),
		realm: M().min(1).optional(),
		autoConnect: Nx
	}), Rx = L({
		provider: V("ipsec"),
		server: M().min(1),
		presharedKey: Fx(M().min(1), "pre-shared key"),
		localId: M().min(1).optional(),
		remoteId: M().min(1).optional(),
		username: M().min(1).optional(),
		password: Fx(M().min(1), "XAuth password").optional(),
		ikeVersion: B(["1", "2"]).default("1"),
		pfs: B(["on", "off"]).default("on"),
		dhGroup: B([
			"2",
			"5",
			"14",
			"15",
			"16",
			"19",
			"20"
		]).default("14"),
		aggressive: B(["on", "off"]).default("on"),
		routedNetworks: M().default("0.0.0.0/0").refine((e) => e.split(",").map((e) => e.trim()).every((e) => Su().safeParse(e).success || Cu().safeParse(e).success), { message: "Routed networks is a comma-separated list of CIDRs, like 10.0.0.0/8,192.168.0.0/16. A single host needs its prefix too (192.168.0.168/32). Leave it at 0.0.0.0/0 to send everything through the gateway." }),
		autoConnect: Nx
	}), zx = R("provider", [
		Ix,
		Lx,
		Rx
	]), Bx = B([
		"connected",
		"connecting",
		"disconnected",
		"unavailable",
		"failed"
	]), Vx = L({
		id: M().describe("Which tunnel."),
		provider: Mx.describe("What kind of tunnel it is."),
		state: Bx.describe("Whether it is up, dialling, resting, failed, or not installable yet because its client needs a rebuild to arrive."),
		gateway: M().optional().describe("What it dials. For display only, and never a credential."),
		interface: M().optional().describe("The network interface carrying it, once one exists."),
		address: M().optional().describe("The address the far end gave this sandbox, which is the single most useful answer to whether you are on the VPN."),
		routes: I(M()).default([]).describe("What goes through it. Everything, when the range covers the whole internet. Empty until it is up."),
		dns: I(M()).default([]).describe("Name servers it pushed, when it pushed any."),
		since: P().optional().describe("When it came up, in milliseconds. Absent unless it is."),
		autoConnect: F().describe("Whether it dials itself when the sandbox starts."),
		detail: M().optional().describe("Why it failed, or a note about a healthy one. Never a credential.")
	}), Hx = L({ links: I(Vx).describe("Every configured tunnel with its live state, read back from the operating system each time rather than remembered.") }), Ux = L({
		id: M().describe("Which tunnel to dial."),
		otp: M().min(1).optional().describe("A one-time code, where the gateway wants one. Supplied per dial and never stored; without it such a gateway refuses and says so.")
	}), Wx = L({ id: M().describe("Which tunnel.") }), Gx = L({ xml: M().min(1).describe("The exported configuration file, whole. Nothing is stored: it is read and thrown away.") }), Kx = L({
		id: M().describe("The id it would be added under."),
		label: M().describe("Its name as the file has it, so somebody recognises the connection they are picking."),
		provider: Mx.describe("What kind of tunnel it is."),
		server: M().describe("Where it dials."),
		port: P().describe("On which port."),
		username: M().optional().describe("The username, but only when the file stored it in the clear. An encrypted one is dropped rather than guessed at."),
		description: M().optional().describe("Whatever the file said about it."),
		localId: M().optional().describe("An identity some tunnel types need, when the file stored it readably."),
		aggressive: F().optional().describe("Which negotiation mode it used."),
		pfs: F().optional().describe("Whether it asked for forward secrecy."),
		dhGroup: M().optional().describe("Which key-exchange group it used. Together with the setting above, this is what decides whether the connection can complete at all."),
		needs: I(M()).describe("What you still have to type in before it can dial. Always at least the password, because the export wraps credentials in encryption that cannot be undone here.")
	}), qx = L({ connections: I(Kx).describe("The connections found in the file, ready to be added one at a time.") });
})), Yx, Xx, Zx, Qx, $x, eS, tS, nS, rS, iS, aS, oS, sS, cS, lS, uS, dS, fS, pS, mS, hS, gS, _S, vS, yS, bS, xS, SS, CS, wS, TS, ES, DS, OS, kS, AS, jS, MS, NS, PS, FS, IS, LS = v((() => {
	G(), vx(), Dp(), jx(), Jx(), Yx = B([
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
	]), Xx = B([
		"active",
		"pending",
		"error",
		"inactive"
	]), Zx = L({
		url: N().describe("Where the tool server answers."),
		token: M().optional().describe("The credential it needs, if any. Stored, never echoed back.")
	}), Qx = L({
		service: bx.describe("Which service to provision."),
		domain: M().min(1).describe("The address it should answer on."),
		on: M().min(1).describe("Which machine to put it on."),
		expose: M().min(1).describe("How it should be reachable.")
	}), $x = L({ provider: V("stripe").describe("Which outside service's credential to make available to deployed apps.") }), eS = L({ provider: M().min(1).describe("Which tool to give the agent. The rest of the fields are whatever that tool's own card declares it needs, and are checked against it when you connect.") }).catchall(M()), tS = L({
		url: N().describe("The repository to take the plugin from."),
		ref: M().min(1).optional().describe("A branch, tag or commit to pin to. Leave it out to follow the default branch."),
		path: M().min(1).refine((e) => !e.split("/").includes(".."), { message: "path must stay inside the checkout" }).optional().describe("Where inside the repository the plugin lives, for one that sits in a larger checkout."),
		token: M().min(1).optional().describe("A credential for a private repository. Stored, never echoed back.")
	}), nS = L({
		url: N().describe("The repository to take the extension from."),
		ref: M().regex(/^[0-9a-f]{40}$/, "ref must be a full 40-character commit sha").describe("The exact commit to install, in full. Required rather than optional because extension code runs with your browser's trust: the owner approves precisely the code that runs, and an update is a deliberate re-install at a new commit."),
		path: M().min(1).refine((e) => !e.split("/").includes(".."), { message: "path must stay inside the checkout" }).optional().describe("Where inside the repository the extension lives, for one that sits in a larger checkout."),
		token: M().min(1).optional().describe("A credential for a private repository. Stored, never echoed back."),
		registry: N().optional().describe("Which registry this install came from, which is what update checks and security advisories are read against. Absent falls back to the official one.")
	}), rS = R("auth", [L({
		auth: V("key").describe("Sign in with a key."),
		host: M().min(1).describe("The machine's address."),
		port: W().default(22).describe("Which port it listens on."),
		user: M().min(1).describe("Which user to connect as."),
		privateKey: M().min(1).describe("The private key, whole. Stored with tight permissions and never echoed back.")
	}), L({
		auth: V("password").describe("Sign in with a password."),
		host: M().min(1).describe("The machine's address."),
		port: W().default(22).describe("Which port it listens on."),
		user: M().min(1).describe("Which user to connect as."),
		password: M().min(1).describe("The password. Stored, never echoed back.")
	})]), iS = L({
		gpu: B(["on", "off"]).default("off"),
		registryMirror: N().optional(),
		insecureRegistries: M().optional(),
		addressPool: M().optional()
	}), aS = L({
		platform: M().min(1),
		username: M().optional(),
		password: M().optional(),
		identity: M().optional(),
		purpose: M().optional(),
		openedAt: M().optional(),
		exit: M().optional()
	}).catchall(M()), oS = L({
		email: M().min(3),
		password: M().optional(),
		mailbox: M().optional(),
		loginUrl: N().optional(),
		openAccounts: B(["on", "off"]).default("off"),
		exit: M().optional()
	}), sS = B(["on", "off"]), cS = L({
		shell: sS.default("on"),
		write: sS.default("off"),
		screen: sS.default("on"),
		control: sS.default("off"),
		sandboxes: sS.default("off"),
		destructive: sS.default("off"),
		roots: M().optional()
	}), lS = cS.extend({ platform: M().min(1) }), uS = B(["on", "off"]), dS = L({
		read: uS.default("on"),
		act: uS.default("on"),
		screenshot: uS.default("off"),
		cookies: uS.default("off"),
		confirm: B([
			"sensitive",
			"always",
			"never"
		]).default("sensitive")
	}), fS = dS.extend({ platform: M().min(1) }), pS = L({
		command: M().min(1),
		name: M().min(1).optional(),
		env: M().optional(),
		loginCommand: M().min(1).optional()
	}), mS = B(["openai", "anthropic"]), hS = L({
		baseUrl: N(),
		protocol: mS.default("openai"),
		apiKey: M().optional(),
		headers: M().optional()
	}), gS = [
		"16384",
		"32768",
		"65536",
		"131072"
	], _S = "65536", vS = 2048, yS = 1048576, bS = L({
		model: M().min(1),
		gpu: B(["on", "off"]).default("off"),
		url: N().optional(),
		context: ku([B(gS), V("custom")]).default(_S),
		contextTokens: W().int().min(vS).max(yS).optional()
	}), xS = M().regex(/^\d+(\.\d{1,6})?$/, "a USD amount like 0.50 (up to six decimals: USDC's own precision)"), SS = B(["eip155:8453", "eip155:84532"]), CS = L({
		network: SS.default("eip155:8453"),
		address: M().optional(),
		perPaymentMaxUsd: xS.default("1.00"),
		autoApproveUnderUsd: xS.default("0"),
		dailyCapUsd: xS.default("5.00"),
		allow: M().optional(),
		deny: M().optional()
	}), wS = R("kind", [
		L({
			id: Y,
			kind: V("devops"),
			config: L({})
		}),
		L({
			id: Y,
			kind: V("monorepo"),
			config: L({})
		}),
		L({
			id: Y,
			kind: V("mcp"),
			config: Zx
		}),
		L({
			id: Y,
			kind: V("service"),
			config: Qx
		}),
		L({
			id: Y,
			kind: V("integration"),
			config: $x
		}),
		L({
			id: Y,
			kind: V("cli"),
			config: eS
		}),
		L({
			id: Y,
			kind: V("plugin"),
			config: tS
		}),
		L({
			id: Y,
			kind: V("extension"),
			config: nS
		}),
		L({
			id: Y,
			kind: V("ssh"),
			config: rS
		}),
		L({
			id: Y,
			kind: V("vpn"),
			config: zx
		}),
		L({
			id: Y,
			kind: V("exit"),
			config: lx
		}),
		L({
			id: Y,
			kind: V("docker"),
			config: iS
		}),
		L({
			id: Y,
			kind: V("browser"),
			config: aS
		}),
		L({
			id: Y,
			kind: V("identity"),
			config: oS
		}),
		L({
			id: Y,
			kind: V("host"),
			config: lS
		}),
		L({
			id: Y,
			kind: V("webext"),
			config: fS
		}),
		L({
			id: Y,
			kind: V("agent"),
			config: pS
		}),
		L({
			id: Y,
			kind: V("endpoint"),
			config: hS
		}),
		L({
			id: Y,
			kind: V("localmodel"),
			config: bS
		}),
		L({
			id: Y,
			kind: V("wallet"),
			config: CS
		})
	]), TS = L({
		state: Xx.describe("Whether it is live, still coming up, broken, or switched off."),
		detail: M().optional().describe("What is wrong, in words a person can act on."),
		code: M().optional().describe("A short marker for that reason, for anything deciding what to do about it.")
	}), ES = L({
		id: M().describe("The connection's id."),
		kind: Yx.describe("What sort of thing it is."),
		status: TS.describe("Whether it is working."),
		config: z(M(), ku([
			M(),
			P(),
			F()
		])).describe("Its settings, minus anything secret."),
		secrets: I(M()).default([]).describe("Which credentials it holds, by name. The values are on one route only, and it is not this one.")
	}), DS = L({
		card: M().describe("Which connection is being suggested."),
		evidence: M().describe("What was seen that prompted it: a file, a remote, printed verbatim so the claim can be checked rather than believed."),
		reason: M().describe("The same claim in words, without repeating the evidence into it."),
		prefill: z(M(), M()).describe("Settings the scan could read, to fill the form so you supply only the credential. Never a secret, even when one is sitting in a checked-in file: the suggestion points at such a file, it does not absorb what is in it.")
	}), OS = L({
		capabilities: I(ES).describe("What this sandbox is connected to."),
		recommendations: I(DS).default([]).describe("Things worth connecting, worked out from what is actually in the workspace rather than from anything you configured. Re-derived on every read, so one whose evidence has moved simply stops being suggested.")
	}), kS = L({ id: M().describe("Which connection.") }), AS = L({
		id: M().describe("The connection's id."),
		kind: M().describe("What sort of thing it is."),
		config: z(M(), M()).describe("Its settings exactly as stored, credentials included. The field names are its own kind's, which the caller already knows.")
	}), jS = L({ card: M().describe("Which suggestion to stop making.") }), MS = L({
		id: M().describe("Which connection."),
		value: M().min(1).describe("The new credential. Its other settings are left alone.")
	}), NS = L({
		id: M(),
		to: M().min(1).max(60).regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/)
	}), PS = L({ session: M().describe("The terminal the sign-in is happening in. Attach to it to type.") }), FS = L({
		code: M().describe("The code."),
		secondsRemaining: P().describe("How long it lasts. Its expiring is what makes handing one to an agent safe, since the seed behind it is never revealed.")
	}), IS = L({
		checked: F().describe("Whether this connection can be tested from here at all. False is not a failure: it is 'no test exists'."),
		ok: F().describe("Whether the service answered as itself."),
		message: M().describe("What happened, in the words a person standing in front of the form needs: the service's own answer, or its refusal.")
	});
})), RS, zS, BS, VS = v((() => {
	G(), RS = L({
		url: M(),
		ref: M().optional(),
		path: M().optional()
	}), zS = (e, t, n) => {
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
	}, BS = /^[0-9a-f]{40}$/;
})), HS, US, WS, GS, KS, qS, JS = v((() => {
	G(), VS(), HS = L({
		sha: M().regex(BS, "must be a full lowercase commit sha"),
		url: M().min(1),
		path: M().min(1).optional(),
		policy: M().min(1),
		reviewer: M().min(1),
		reviewedAt: qd(),
		runId: M().min(1),
		deterministic: L({
			policy: M().min(1),
			scanner: M().min(1),
			version: M().min(1),
			runId: M().min(1)
		})
	}), US = B([
		"verified",
		"listed",
		"blocked"
	]), WS = L({
		name: M(),
		description: M().optional(),
		version: M().optional(),
		kind: B(["plugin", "extension"]).optional(),
		trust: US.optional(),
		trustReason: M().optional(),
		securityReview: HS.optional(),
		securityFix: F().optional(),
		category: M().optional(),
		art: M().max(4096).optional(),
		logo: M().optional(),
		icon: M().optional(),
		homepage: N().optional(),
		source: Tu()
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
		let r = zS(e.source, "", void 0);
		(r?.ref !== e.securityReview.sha || r?.url !== e.securityReview.url || r.path !== e.securityReview.path) && t.addIssue({
			code: "custom",
			path: ["securityReview"],
			message: "must equal the exact repository, commit and subdirectory named by source"
		});
	}), L({
		name: M(),
		metadata: L({ pluginRoot: M().optional() }).optional(),
		plugins: I(WS)
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
	}), GS = L({
		sha: M(),
		manifest: M(),
		bundle: M(),
		engines: M().optional()
	}), KS = L({
		name: M(),
		stars: P().int().nonnegative().optional(),
		pushedAt: M().optional(),
		checks: GS.optional()
	}), L({
		scannedAt: M(),
		entries: I(KS)
	}), qS = L({
		name: M(),
		description: M().optional(),
		version: M().optional(),
		kind: B(["plugin", "extension"]),
		trust: US,
		trustReason: M().optional(),
		securityReview: HS.optional(),
		admitted: F(),
		securityFix: F().optional(),
		category: M().optional(),
		art: M().optional(),
		logo: M().optional(),
		icon: M().optional(),
		homepage: M().optional(),
		install: RS.optional(),
		stars: P().int().nonnegative().optional(),
		pushedAt: M().optional(),
		checks: GS.optional()
	});
})), YS = v((() => {
	JS(), VS();
})), XS, ZS, QS = v((() => {
	G(), YS(), XS = L({
		url: N().describe("The registry to read."),
		token: M().min(1).optional().describe("A credential for a private one. Sent as a body rather than in the address, so it never lands in a log.")
	}), ZS = L({
		name: M().describe("What the registry calls itself."),
		plugins: I(qS).describe("What it lists, each with the curated decision, the resolved pointer and what a scan found upstream.")
	});
})), $S, eC, tC, nC = v((() => {
	G(), $S = L({
		url: N().describe("The repository to ask. http(s) only: an ssh remote would stop on a host-key prompt nobody can answer."),
		token: M().min(1).optional().describe("A credential for a private one. Sent as a body rather than in the address, so it never lands in a log. A form editing a live connection has never been shown its token: it sends the VAULTED marker here and names the connection in `keeping`, so a private repository still answers without anyone retyping a key."),
		keeping: M().min(1).optional().describe("Which connection a VAULTED token belongs to. Ignored when a real token is sent.")
	}), eC = L({
		name: M().describe("The branch or tag as a person names it: `main`, `v1.4.0`."),
		kind: B(["branch", "tag"]),
		sha: M().regex(/^[0-9a-f]{40}$/).describe("The commit it points at. An annotated tag is peeled here, so this is always a commit, never a tag object.")
	}), tC = L({
		defaultBranch: M().optional().describe("The branch the remote advertises as HEAD, the one to offer first. Absent when the remote advertises no symref."),
		refs: I(eC).describe("Every branch the remote advertises, then every tag. Which to offer first is the reader's question, not this one's.")
	});
})), rC, iC = v((() => {
	J(), rx(), LS(), QS(), nC(), $(), rC = {
		list: q.route({
			method: "GET",
			path: "/capabilities",
			summary: "Everything this sandbox is connected to",
			description: "Each connection with its live state, the settings that are safe to show, and the names of the credentials it holds. The values of those credentials are never in the answer, on any route but one."
		}).output(OS),
		add: q.route({
			method: "POST",
			path: "/capabilities",
			summary: "Connect something, or change a connection",
			description: "Writes a connection and streams the work of applying it, because some kinds provision real infrastructure and take a while. Sending an id that already exists edits that connection: this is the edit as well as the create. Since a caller is never shown stored credentials, it marks the ones it is leaving alone and the daemon fills them in, which is the only way to change one setting without retyping a key."
		}).input(wS).output(K(Bb)),
		probe: q.route({
			method: "POST",
			path: "/capabilities/probe",
			summary: "Test a connection's settings without saving them",
			description: "Dials the service the way this connection would and hands back what it said, before anything is written. The answer is the service's own confirmation or its exact refusal, so a wrong token or an unreachable host is found on the form rather than on a card afterwards."
		}).input(wS).output(IS),
		remove: q.route({
			method: "DELETE",
			path: "/capabilities/{id}",
			summary: "Disconnect something",
			description: "Tears a connection down. The kinds that own real infrastructure refuse, because deleting those would be losing data rather than losing a connection."
		}).input(kS).output(Z),
		rename: q.route({
			method: "POST",
			path: "/capabilities/{id}/rename",
			summary: "Rename a connection",
			description: "Carries everything the old name keyed across with it: a browser profile and its logins, an enrolled machine, an extension's copy of its source. Removing and re-adding would lose exactly the state that made the connection worth keeping. Kinds whose name is part of what they are refuse."
		}).input(NS).output(Z),
		setSecret: q.route({
			method: "POST",
			path: "/capabilities/{id}/secret",
			summary: "Replace a stored credential",
			description: "Swaps one connection's key or token for a new one and re-applies it, without touching any of its other settings."
		}).input(MS).output(Z),
		status: q.route({
			method: "GET",
			path: "/capabilities/{id}/status",
			summary: "Re-check one connection",
			description: "Probes a single connection right now, for a screen that wants to refresh one row rather than the whole list."
		}).input(kS).output(TS),
		connection: q.route({
			method: "GET",
			path: "/capabilities/{id}/connection",
			summary: "A connection's settings, credentials included",
			description: "The one call that hands back stored secrets, so an extension's own backend can dial the service behind a connection. Never answered for a signed-in person: only a machine credential reaches it, and an extension's only if its manifest asked for this route out loud at install time."
		}).input(kS).output(AS),
		marketplace: q.route({
			method: "POST",
			path: "/capabilities/marketplace",
			summary: "Read a plugin marketplace",
			description: "Resolves a plugin marketplace source into the list of connections you could install from it."
		}).input(XS).output(ZS),
		refs: q.route({
			method: "POST",
			path: "/capabilities/refs",
			summary: "The versions a repository offers",
			description: "Asks a git remote what it advertises and hands back every branch and tag with the commit it points at, plus which branch is its default. Nothing is cloned and nothing is written, so this is cheap enough to answer a form as someone types a repository into it."
		}).input($S).output(tC),
		dismiss: q.route({
			method: "DELETE",
			path: "/capabilities/recommendations/{card}",
			summary: "Stop suggesting this connection",
			description: "Not needed, for now. Nothing is torn down. The suggestion comes back if what prompted it in the workspace changes, because what is remembered is the evidence, not the refusal."
		}).input(jS).output(Z),
		login: q.route({
			method: "POST",
			path: "/capabilities/{id}/login",
			summary: "Sign in to a connection by hand",
			description: "Opens the connection's own sign-in in a terminal a person can type into, for the flows that need a code pasted or a device confirmed. The answer names the terminal to attach to."
		}).input(kS).output(PS),
		otp: q.route({
			method: "GET",
			path: "/capabilities/{id}/otp",
			summary: "Mint a one-time code",
			description: "Generates a single two-factor code from a stored seed. The one credential-adjacent read an agent is allowed, and it is safe because a code expires in seconds and never reveals the seed, so an agent can answer a prompt without ever holding the factor."
		}).input(kS).output(FS)
	};
})), aC, oC, sC, cC, lC, uC, dC, fC = v((() => {
	G(), aC = L({
		query: M().min(2).max(512).describe("What to look for. Plain words, a pattern, a symbol name, or a question."),
		mode: B([
			"q",
			"find",
			"files",
			"def",
			"refs",
			"sym",
			"ast"
		]).optional().describe("Narrow the search to one kind: plain text, filenames, definitions, references, symbols, or code structure. Leave it out to blend them, which also answers a question asked in words."),
		includeIgnored: Wd().optional().describe("Search inside installed packages and other ignored folders too."),
		literal: Wd().optional().describe("Treat the query as fixed text rather than a pattern."),
		word: Wd().optional().describe("Match whole words only."),
		caseSensitive: Wd().optional().describe("Whether capitals matter. Off means they do not, rather than being guessed at from the query."),
		include: M().max(512).optional().describe("Which files to ask, in the same grammar an editor's files-to-include box takes: comma-separated patterns, matched at any depth unless anchored, a leading exclamation mark excluding instead."),
		limit: W().int().positive().optional().describe("How many results to return."),
		after: M().optional().describe("Resume from the cursor a previous answer handed back.")
	}), oC = L({
		kind: B([
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
		score: P().optional().describe("How strongly that reason applied.")
	}), sC = L({
		start: P().describe("First character of the match within the line."),
		end: P().describe("One past the last.")
	}), cC = L({
		line: P().describe("Which line, counting from one."),
		text: M().describe("The line itself."),
		spans: I(sC).describe("Where in the line the matches are, so you can highlight without searching again. Empty when the whole line is the match rather than part of it."),
		tags: I(oC).describe("Why it matched."),
		context: M().optional().describe("What it sits inside: the function, the class, the heading. Often enough that you need not open the file.")
	}), lC = L({
		path: M().describe("The file."),
		score: P().describe("How well it matched. Groups arrive best first, never in path order."),
		hits: I(cC).describe("The matching lines in it."),
		capped: F().optional().describe("This file had more matches than are kept per file, so the count is a floor. Say fifty-plus rather than fifty.")
	}), uC = L({
		state: B([
			"fresh",
			"building",
			"stale"
		]).describe("Whether the index matches what is on disk, is still filling, or has fallen behind."),
		ageMs: P().optional().describe("How long since it last matched the disk, in milliseconds."),
		progress: P().optional().describe("How far through building it is, from zero to one."),
		behind: P().optional().describe("How many files it has not caught up with. Worth showing, because the word stale on its own reads as a warning about the answer, which it almost never is.")
	}), dC = L({
		mode: M().describe("Which kind of search actually ran, which matters when you let it choose."),
		total: P().describe("Matching lines across the whole workspace, not just this page."),
		files: P().describe("Files the query matched in total."),
		shown: P().describe("How many of those lines are on this page."),
		groups: I(lC).describe("The results, grouped by file, best first."),
		freshness: uC.describe("Whether the index behind the answer is up to date."),
		truncated: F().describe("This page is not all of it. Use the cursor."),
		partial: F().optional().describe("At least one file had more matches than are kept per file, so the total is a floor. Different from the page being truncated: a complete page can still count partially."),
		cursor: M().optional().describe("Pass this back as `after` to get the next page."),
		hint: M().optional().describe("A suggestion for getting a better answer out of this query."),
		note: M().optional().describe("What the engine did that you did not ask for: a pattern rerun as plain text because it was not valid, escapes rewritten, a language filter that matched nothing."),
		related: I(M()).optional().describe("Places next door to the best results: where each is defined, and whatever calls it most."),
		candidates: I(M()).optional().describe("Ranked places that scored but did not make the page, best first. The answer often sits at rank five to thirteen, so this saves paging through to find out."),
		features: I(M()).optional().describe("Which stages of the search were switched off for this run. Absent means all of them ran.")
	});
})), pC, mC, hC, gC, _C = v((() => {
	G(), fC(), pC = L({
		repo: M().min(1).describe("Which repository, using the same ids the git routes take."),
		since: M().max(16).optional().describe("How far back to count changes, written as a span such as 2d, 12h, 1w or 3m. Leave it out for all of history."),
		limit: W().int().positive().max(200).optional().describe("How many files and modules to rank. A leaderboard rather than an inventory: past a screenful the ranking stops being the point.")
	}), mC = L({
		path: M(),
		commits: P(),
		adds: P(),
		dels: P(),
		complexity: P(),
		score: P(),
		latestMs: P()
	}), hC = L({
		path: M(),
		exports: P()
	}), gC = L({
		repo: M().describe("Which repository this describes."),
		totals: L({
			files: P().describe("Files counted."),
			symbols: P().describe("Named things they export."),
			complexity: P().describe("Branch points across all of them added up."),
			hotspots: P().describe("How many files qualify as hotspots at all. The list below is capped; this is not.")
		}).describe("Counts anybody could recount in the files themselves. Deliberately no single maintainability grade: those cannot be checked and are not comparable between projects."),
		hotspots: I(mC).describe("Files that change often and are complicated at the same time, worst first."),
		modules: I(hC).describe("The parts of the codebase the rest of it leans on most."),
		freshness: uC.describe("Whether the index these numbers were read from is up to date.")
	});
})), vC, yC, bC, xC, SC, CC, wC, TC, EC, DC, OC, kC, AC, jC, MC, NC, PC, FC, IC, LC, RC, zC, BC, VC = v((() => {
	G(), _C(), vC = [
		"outdated",
		"audit",
		"knip",
		"jscpd",
		"ui",
		"bundle",
		"mutation"
	], yC = B(vC), bC = L({
		name: M().describe("The dependency."),
		current: M().describe("What you are on."),
		latest: M().describe("What is published."),
		kind: B([
			"major",
			"minor",
			"patch"
		]).describe("How far apart those are. This is not one number because forty patch releases behind is a morning's work and one major version is a project."),
		section: M().describe("Which part of the manifest declares it. A major version behind on a build-time tool is a different risk from one that ships.")
	}), xC = L({
		name: M().describe("The dependency it concerns."),
		severity: B([
			"critical",
			"high",
			"moderate",
			"low",
			"info"
		]).describe("How bad it is said to be."),
		title: M().describe("What it is, in one line. No scoring vector and no reference list: those are for reading on the advisory's own page, and carrying them would put a kilobyte of prose per finding on every poll."),
		patched: M().optional().describe("Which versions fix it. Absent means no fix has been published, which is exactly when nothing should offer to upgrade and something should say so instead."),
		dev: F().describe("Whether it only reaches build-time tooling, which is a different problem from one that reaches what you ship.")
	}), SC = L({
		files: P().int().nonnegative().describe("Files nothing reaches."),
		exports: P().int().nonnegative().describe("Exported things nothing uses."),
		types: P().int().nonnegative().describe("Types nothing uses."),
		dependencies: P().int().nonnegative().describe("Declared dependencies nothing imports."),
		devDependencies: P().int().nonnegative().describe("The same, for build-time ones."),
		sample: I(M()).describe("A handful of the files, so a reader need not take the count on faith. Counts and a sample rather than the whole list, because an agent re-measures against the live tree anyway.")
	}), CC = L({
		percentage: P().describe("How much of the scanned code is duplicated. A share rather than a count, because a count grows with the repository and would mean something different every quarter."),
		clones: P().int().nonnegative().describe("How many duplicated stretches were found."),
		top: I(L({
			lines: P().int().nonnegative().describe("How long the duplicated stretch is."),
			first: M().describe("One of the two places."),
			second: M().describe("The other.")
		})).describe("The largest of them.")
	}), wC = L({
		components: I(M()).describe("The interface's own source files, with tests, stories and generated output left out."),
		bypasses: I(L({
			path: M().describe("The file."),
			count: P().int().positive().describe("How many times, in that file.")
		})).describe("Where the design system was routed around and a value hard-coded instead. Counted per file, because a reader deciding what to open is served by a file and a number, not by eleven snippets."),
		idioms: I(L({
			id: M().describe("Which outdated idiom. Looked up rather than listed here, so a sandbox one version behind can still report one this list has never heard of."),
			files: I(M()).describe("The files still on it.")
		})).describe("Files still written the way their framework has since replaced.")
	}), TC = L({
		dir: M().describe("Which folder was measured. Read from build output already on disk rather than by building, so this is sometimes a commit behind and never leaves anything in your working tree."),
		totalBytes: P().int().nonnegative().describe("The whole thing, raw."),
		totalGzip: P().int().nonnegative().describe("The whole thing, compressed. The ratio between the two is the difference between big and big-and-incompressible, which are different problems."),
		assets: I(L({
			path: M().describe("The file."),
			bytes: P().int().nonnegative().describe("Its raw size."),
			gzip: P().int().nonnegative().describe("Its compressed size.")
		})).describe("What is in it, piece by piece.")
	}), EC = L({
		score: P().describe("The share of injected faults the suite caught. Not a coverage figure: coverage says a line ran, this says an assertion depended on it."),
		killed: P().int().nonnegative().describe("Faults the suite caught."),
		survived: P().int().nonnegative().describe("Faults it did not: code that can be broken with every test still green."),
		inconclusive: P().int().nonnegative().describe("Faults it never got a verdict on, because they would not compile or were configured out. Left out of the score entirely, since neither answer is known."),
		survivors: I(L({
			file: M().describe("Where it is."),
			line: P().int().nonnegative().describe("Which line."),
			mutator: M().describe("What was changed, in the mutation tool's own vocabulary."),
			replacement: M().describe("What it became, so a reader can judge whether it matters without opening the file.")
		})).describe("The surviving faults themselves. A percentage is a mood; a named line with the change that went unnoticed is a morning's work.")
	}), DC = B([
		"ok",
		"unavailable",
		"failed"
	]), OC = R("id", [
		L({
			id: V("outdated"),
			packages: I(bC)
		}),
		L({
			id: V("audit"),
			advisories: I(xC)
		}),
		L({
			id: V("knip"),
			deadCode: SC
		}),
		L({
			id: V("jscpd"),
			duplication: CC
		}),
		L({
			id: V("ui"),
			scan: wC
		}),
		L({
			id: V("bundle"),
			bundle: TC
		}),
		L({
			id: V("mutation"),
			mutation: EC
		})
	]), kC = L({
		id: yC.describe("Which measurement this is."),
		state: DC.describe("Whether the tool ran and reported, is not part of this repository at all, or broke. The middle one is not evidence of health: the check simply cannot be made here."),
		ranAt: P().describe("When it last finished, in milliseconds, which is what its age is measured from."),
		tookMs: P().int().nonnegative().describe("How long it took. Worth knowing before asking for it again: some of these run for minutes."),
		facts: OC.optional().describe("What it found, including finding nothing, which is a real answer and the one that keeps a chore quiet."),
		reason: M().optional().describe("Why it broke, quoted from the tool rather than summarised, or, when it never ran, what is missing. Never a sentence built from the check's own name, which would have an unmeasured check claiming there is nothing to measure.")
	}), AC = L({
		dir: M().describe("Where the package lives."),
		name: M().describe("What it declares itself as."),
		engines: z(M(), M()).optional().describe("Which runtime versions it says it needs, verbatim."),
		dependencies: I(M()).describe("What it depends on."),
		devDependencies: I(M()).describe("What it needs only to build."),
		documented: F().describe("Whether it has a README, which in this workspace is what a package's own documentation is.")
	}), jC = L({
		docs: I(M()).describe("The repository's own architecture documents, when it has any. Their existence is the question: a repository with none has never been through the documentation flow at all."),
		dockerfiles: I(M()).describe("Container definitions in it."),
		ci: I(M()).describe("Pipeline definitions in it."),
		lockfile: F().describe("Whether dependencies are pinned to exact versions, which is what makes a security audit mean anything."),
		packageManifest: F().describe("Whether it is a JavaScript project at all. A Rust or Go repository has no majors to be behind on, and offering it those checks would be this surface guessing at what it is looking at."),
		deps: I(M()).describe("Every dependency name declared anywhere in the repository. Names rather than a verdict about which framework this is, because that judgement belongs to whatever reads this, not to a sandbox baked months ago.")
	}), MC = L({
		packages: I(AC).describe("Each package in the repository, as its own manifest declares it."),
		shape: jC.describe("What the repository is made of, which decides whether a given chore is even a sensible question to ask of it."),
		hotspots: I(mC).describe("Files that change often and are complicated at once, capped tight: a chore only asks whether something has entered the top of the ranking."),
		keyModules: I(hC).describe("The parts the rest of the code leans on most, capped the same way."),
		totals: L({
			files: P().describe("Files counted."),
			symbols: P().describe("Named things they export."),
			complexity: P().describe("Branch points added up."),
			hotspots: P().describe("How many files qualify as hotspots at all.")
		}).describe("The repository in numbers."),
		indexed: F().describe("Whether the index these rankings came from is finished. Nothing should act on a half-built one.")
	}), NC = B([
		"acted",
		"reported",
		"clean"
	]), PC = L({
		repo: M().describe("Which repository."),
		chore: M().describe("Which chore."),
		ranAt: P().describe("When it ran, in milliseconds."),
		runId: M().describe("The conversation that ran it, so its whole record can be opened."),
		outcome: NC.describe("What it concluded: it did something, it wrote something down, or it looked and found the finding to be false. That last one matters most, or the same turn starts again for ever."),
		digest: M().describe("A fingerprint of the evidence standing at the time. A chore whose evidence has since changed is due again on its own merits; one whose evidence has not stays quiet."),
		snoozedUntil: P().optional().describe("Not until then, in milliseconds. The chore stays visible and stays out of the badge. Different from switching it off, which is a setting.")
	}), FC = L({
		repo: M().describe("Which repository."),
		id: yC.describe("Which measurement."),
		askedAt: P().describe("When it was asked for, in milliseconds, so one still waiting can say how long it has waited."),
		startedAt: P().optional().describe("When it actually began. Absent while it is queued behind another, which is a real and common state: there is one lane for the whole sandbox.")
	}), IC = L({
		repos: I(L({
			repo: M().describe("Which repository."),
			probes: I(kC).describe("The expensive measurements, served from a cache with an age on each rather than run on demand."),
			signals: MC.describe("The cheap facts, worked out fresh every time.")
		})).describe("Every repository's standing evidence. One answer for all of them, because a badge polls this on a timer and one request per repository is the kind of poll that shows up in a battery graph."),
		ledger: I(PC).describe("What has already been done about all of it."),
		running: I(FC).describe("What is being measured right now and what is waiting behind it. Part of this read rather than a route of its own, because a screen that had to ask twice would show the two halves disagreeing."),
		node: M().describe("The runtime version this sandbox is actually running, read off the process rather than off a manifest, because what is installed is the fact that matters and a declared range is a wish.")
	}), LC = L({
		repo: M().min(1).describe("Which repository."),
		id: yC.describe("Which measurement to retake, ahead of its usual schedule.")
	}), RC = PC, zC = L({
		id: M().describe("Which check."),
		label: M().describe("What it is called."),
		status: B([
			"pass",
			"warn",
			"fail"
		]).describe("How it went. A warning is a real third answer rather than a soft failure."),
		detail: M().describe("What it found.")
	}), BC = L({ checks: I(zC).describe("Everything that can be checked from the extension's own files, for an author about to publish.") });
})), HC, UC = v((() => {
	J(), VC(), $(), HC = {
		list: q.route({
			method: "GET",
			path: "/chores",
			summary: "What maintenance the repos are asking for",
			description: "Every repo's standing evidence in one read: what the last measurement found and how old it is, the cheap signals that are always current, and what has already been decided about each."
		}).output(IC),
		probe: q.route({
			method: "POST",
			path: "/chores/probe",
			summary: "Measure one repo again now",
			description: "Re-runs a single check without waiting for it to go stale. Answers immediately: the work happens in the background and the result turns up in the next read, because some of these sweeps outlive any sane request."
		}).input(LC).output(Z),
		record: q.route({
			method: "POST",
			path: "/chores/ledger",
			summary: "Record a verdict, or snooze one",
			description: "Writes what somebody concluded about one repo's chore, replacing the previous verdict. A chore has one current answer, not a growing pile of times it was fine."
		}).input(RC).output(Z)
	};
})), WC, GC = v((() => {
	J(), sy(), $(), WC = {
		runs: q.route({
			method: "GET",
			path: "/ci/runs",
			summary: "Pipeline runs across the repos",
			description: "What the forges are reporting for every workspace repo that has a remote, served from a cache and filled in on demand. Repos whose notifications are not wired up say so."
		}).output(ty),
		rerun: q.route({
			method: "POST",
			path: "/ci/runs/rerun",
			summary: "Run a pipeline again",
			description: "Asks the forge to re-run one pipeline. The daemon only passes the request along."
		}).input(ny).output(Z),
		cancel: q.route({
			method: "POST",
			path: "/ci/runs/cancel",
			summary: "Cancel a pipeline run",
			description: "Asks the forge to stop a run in progress."
		}).input(ny).output(Z),
		jobs: q.route({
			method: "POST",
			path: "/ci/runs/jobs",
			summary: "The steps inside one pipeline run",
			description: "Each job in a run with its outcome, which is where you look to find out what actually broke."
		}).input(ny).output($v),
		fix: q.route({
			method: "POST",
			path: "/ci/fix",
			summary: "Put an agent on a broken pipeline",
			description: "Opens a fresh isolated conversation already holding the failure: which job, which repo, what it said. The answer names the conversation so you can open it."
		}).input(ry).output(iy)
	};
})), KC, qC, JC, YC = v((() => {
	J(), G(), LS(), Dm(), KC = B([
		"unknown",
		"healthy",
		"degraded",
		"unavailable"
	]), qC = L({
		available: F(),
		allowance: P().int().nonnegative(),
		used: P().int().nonnegative(),
		remaining: P().int().nonnegative(),
		health: KC,
		resetsAt: M().optional(),
		retryAt: M().optional(),
		servedModel: M().optional()
	}), JC = {
		models: q.route({
			method: "GET",
			path: "/endpoints/{id}/models",
			summary: "Models a connected server offers",
			description: "Asks one configured model server what it serves. There is no built-in list and no fallback: what a server offers is knowable only by asking it, so an empty answer is the honest report that we could not."
		}).input(kS).output(Em),
		trial: q.route({
			method: "GET",
			path: "/endpoints/trial/status",
			summary: "What is left of the free trial",
			description: "The allowance, what has been used, when it resets, and which model actually answered the last message. Not being available is the ordinary answer rather than a failure: most sandboxes run against a platform that offers no trial at all."
		}).output(qC)
	};
})), XC, ZC = v((() => {
	J(), rx(), vx(), $(), XC = {
		list: q.route({
			method: "GET",
			path: "/exit",
			summary: "Ways to come out somewhere else",
			description: "Every configured exit with its live state, the country it was asked to appear in, and the country it actually appears in. Those last two disagreeing is the whole reason this reports both."
		}).output(hx),
		countries: q.route({
			method: "GET",
			path: "/exit/{id}/countries",
			summary: "Countries one exit can reach",
			description: "Where this exit can put you, ranked by how much capacity is really there. Asked of the provider when it answers and taken from a built-in list when it does not, and the answer says which of those you got."
		}).input(gx).output(px),
		start: q.route({
			method: "POST",
			path: "/exit/{id}/start",
			summary: "Bring an exit up",
			description: "Starts the exit in the country it was configured for. Streamed, because a first start fetches a catalogue, raises a tunnel and then checks the address, which takes tens of seconds on the free providers and can fail at each step with something worth reading. Starting one that is already up simply says so."
		}).input(gx).output(K(Bb)),
		use: q.route({
			method: "POST",
			path: "/exit/{id}/use",
			summary: "Move to another country",
			description: "Switches the exit's country, starting it first if it was down. It ends by checking where the world actually sees you and fails if that does not match what you asked for. A switch that quietly left your traffic where it was is the exact failure this whole feature exists to rule out."
		}).input(_x).output(K(Bb)),
		rotate: q.route({
			method: "POST",
			path: "/exit/{id}/rotate",
			summary: "Take a different address, same country",
			description: "Swaps to another address in the country you are already in. Fails if the address does not actually change, which on a small pool it sometimes cannot."
		}).input(gx).output(K(Bb)),
		check: q.route({
			method: "POST",
			path: "/exit/{id}/check",
			summary: "Where the world sees you right now",
			description: "Looks up the address and country as seen through this exit. Cheap, and the honest answer to whether you are really where you meant to be, which is what every other call here is judged against."
		}).input(gx).output(dx),
		stop: q.route({
			method: "POST",
			path: "/exit/{id}/stop",
			summary: "Take an exit down",
			description: "Shuts the exit off. One that was already down is fine: the promise is that it is not up afterwards, not that it was up before."
		}).input(gx).output(Z)
	};
})), QC = v((() => {})), $C = v((() => {})), ew, tw, nw = v((() => {
	G(), ew = 4096, tw = {
		art: M().max(ew).optional().describe("This extension's own mark, as a complete SVG document inline: the tier an author controls fully. Give it a viewBox and let it fill its own square edge to edge; it is drawn as the tile, not as a glyph on a plate. Kept as readable SVG text (not base64) so a registry reviewer can see what they are publishing, drawn inert so it cannot script the page, and capped at 4 KB. Anything that does not parse as SVG falls back to `logo`, then `icon`, then initials."),
		logo: M().optional().describe("A simple-icons slug, fetched from a CDN: right for standing in for somebody else's product. Add a \"/<hex>\" suffix to force a colour for a mark that vanishes against the surface it lands on. Unreachable in an offline sandbox, so it falls back to `icon`, then to initials."),
		icon: M().optional().describe("A name from the host's own icon set, drawn when no simple-icons slug fits. It ships in the image, follows the theme and costs no request: what actually carries a first-party extension. An unknown name falls back to initials rather than to a hole.")
	};
})), rw, iw, aw = v((() => {
	G(), rw = L({ path: M().optional().describe("Relative to the extension checkout. Absent ⇒ the checkout root.") }), iw = {
		name: "agent",
		description: "Declare that this checkout is also a Claude Code plugin, so the agent picks up its skills, agents, hooks, commands and MCP servers each turn. The daemon hands the directory to the plugin loader and never parses what is in it.",
		schema: rw
	};
})), ow, sw, cw = v((() => {
	G(), ow = L({
		id: M().regex(/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/).describe("Prefills the automation name, and is what \"does one of these exist already\" is asked by, so spell it as an id, not as prose."),
		title: M().min(1),
		logo: M().min(1).optional().describe("A simple-icons slug for the card."),
		icon: M().min(1).optional().describe("A name from the host's icon set, drawn when no simple-icons slug fits."),
		requires: I(M().min(1)).optional().describe("Capability providers that make this template work: any one connected is enough (fixing CI rides github or gitlab). Omitted ⇒ nothing to connect, so it is always offered."),
		trigger: L({
			kind: B([
				"schedule",
				"event",
				"listener",
				"workspace"
			]),
			cron: M().min(1).optional(),
			provider: M().min(1).optional(),
			eventType: M().min(1).optional(),
			event: M().min(1).optional()
		}).describe("What wakes it. Checked against the real trigger schema when the daemon builds the catalogue, so a template can never offer one that would be refused."),
		guard: M().min(1).optional().describe("A condition that must hold before the turn runs: what makes a template safe to leave switched on."),
		holdForSeconds: P().int().positive().optional().describe("Wait this long and coalesce repeats, rather than firing on every event."),
		prompt: M().min(1).describe("The turn this starts. You own the trigger's payload vocabulary, so you own the prompt that reads it."),
		note: M().min(1).optional(),
		setup: M().min(1).optional().describe("What the user must do themselves before this can work."),
		description: M().min(1).optional(),
		offer: B(["create", "configure"]).optional().describe("Absent ⇒ it waits in the gallery, where you go once you know what you want. `create` puts a card on the page that makes it, switched off, in one click. `configure` puts one there that opens the dialog prefilled, for a template that cannot work unconfigured. Both are for what a user would never think to go looking for: mark everything as offered and you have rebuilt the gallery with extra steps."),
		chore: F().optional().describe("Whether what this makes watches THIS codebase rather than the outside world. Declared rather than read off the trigger: a nightly dependency sweep and a nightly Stripe poll are both schedules.")
	}), sw = {
		name: "automationTemplates",
		description: "Starting points this pack offers in the automation composer, a trigger, a prompt written for that trigger's payload, and whatever guard makes it safe to leave on. Declared by whoever knows the service rather than by the composer, so they appear when your pack is installed and disappear with it. Pure prefill: creating one makes an ordinary automation.",
		schema: I(ow)
	};
})), lw, uw = v((() => {
	G(), lw = {
		name: "bin",
		description: "A checkout-relative directory of executables the daemon puts on the agent's PATH every turn, how you ship the agent a command-line tool. The files are the approved code themselves: they ride the pinned checkout, and the daemon only adds the directory to PATH.",
		schema: M().min(1).refine((e) => !e.split("/").includes(".."), { message: "bin must stay inside the checkout" })
	};
})), dw, fw, pw, mw, hw, gw, _w, vw, yw = v((() => {
	dw = class extends Error {
		source;
		offset;
		constructor(e, t, n) {
			super(`${e} (in \`${t}\` at ${n})`), this.source = t, this.offset = n, this.name = "WhenSyntaxError";
		}
	}, fw = [
		"&&",
		"||",
		"==",
		"!=",
		">=",
		"<=",
		">",
		"<",
		"(",
		")",
		"[",
		"]",
		",",
		"!"
	], pw = /[A-Za-z_]/, mw = /[A-Za-z0-9_.-]/, hw = (e) => {
		let t = [], n = 0;
		for (; n < e.length;) {
			let r = e[n] ?? "";
			if (r.trim() === "") {
				n += 1;
				continue;
			}
			if (r === "'" || r === "\"") {
				let i = e.indexOf(r, n + 1);
				if (i === -1) throw new dw("unterminated string", e, n);
				t.push({
					kind: "literal",
					value: e.slice(n + 1, i),
					at: n
				}), n = i + 1;
				continue;
			}
			let i = fw.find((t) => e.startsWith(t, n));
			if (i !== void 0) {
				t.push({
					kind: "punct",
					text: i,
					at: n
				}), n += i.length;
				continue;
			}
			if (/[0-9]/.test(r)) {
				let r = /^[0-9]+(\.[0-9]+)?/.exec(e.slice(n))?.[0] ?? "";
				t.push({
					kind: "literal",
					value: Number(r),
					at: n
				}), n += r.length;
				continue;
			}
			if (pw.test(r)) {
				let r = n + 1;
				for (; r < e.length && mw.test(e[r] ?? "");) r += 1;
				let i = e.slice(n, r);
				i === "true" || i === "false" ? t.push({
					kind: "literal",
					value: i === "true",
					at: n
				}) : i === "in" || i === "not" ? t.push({
					kind: "punct",
					text: i,
					at: n
				}) : t.push({
					kind: "key",
					text: i,
					at: n
				}), n = r;
				continue;
			}
			throw new dw(`unexpected character ${JSON.stringify(r)}`, e, n);
		}
		return t;
	}, gw = class {
		tokens;
		source;
		index = 0;
		constructor(e, t) {
			this.tokens = e, this.source = t;
		}
		parse() {
			let e = this.or(), t = this.tokens[this.index];
			if (t !== void 0) throw new dw("unexpected trailing input", this.source, t.at);
			return e;
		}
		or() {
			let e = this.and();
			if (!this.at("||")) return e;
			let t = [e];
			for (; this.eat("||");) t.push(this.and());
			return {
				kind: "or",
				operands: t
			};
		}
		and() {
			let e = this.unary();
			if (!this.at("&&")) return e;
			let t = [e];
			for (; this.eat("&&");) t.push(this.unary());
			return {
				kind: "and",
				operands: t
			};
		}
		unary() {
			if (this.eat("!")) return {
				kind: "not",
				operand: this.unary()
			};
			if (this.eat("(")) {
				let e = this.or();
				return this.expect(")"), e;
			}
			let e = this.tokens[this.index];
			if (e?.kind !== "key") throw new dw("expected a context key", this.source, e?.at ?? this.source.length);
			return this.index += 1, this.tail(e.text);
		}
		tail(e) {
			for (let t of [
				"==",
				"!=",
				">=",
				"<=",
				">",
				"<"
			]) if (this.eat(t)) return {
				kind: "compare",
				key: e,
				op: t,
				value: this.literal()
			};
			return this.eat("in") ? {
				kind: "member",
				key: e,
				values: this.list(),
				negated: !1
			} : this.at("not") ? (this.index += 1, this.expect("in"), {
				kind: "member",
				key: e,
				values: this.list(),
				negated: !0
			}) : {
				kind: "has",
				key: e
			};
		}
		list() {
			this.expect("[");
			let e = [this.literal()];
			for (; this.eat(",");) e.push(this.literal());
			return this.expect("]"), e;
		}
		literal() {
			let e = this.tokens[this.index];
			if (e?.kind !== "literal") throw new dw("expected a literal value", this.source, e?.at ?? this.source.length);
			return this.index += 1, e.value;
		}
		at(e) {
			let t = this.tokens[this.index];
			return t?.kind === "punct" && t.text === e;
		}
		eat(e) {
			return this.at(e) ? (this.index += 1, !0) : !1;
		}
		expect(e) {
			if (!this.eat(e)) throw new dw(`expected \`${e}\``, this.source, this.tokens[this.index]?.at ?? this.source.length);
		}
	}, _w = (e) => new gw(hw(e), e).parse(), vw = (e) => {
		try {
			return _w(e), !0;
		} catch {
			return !1;
		}
	};
})), bw, xw, Sw, Cw, ww, Tw, Ew = v((() => {
	yw(), G(), nw(), bw = L({
		key: M().regex(/^[a-zA-Z][a-zA-Z0-9]*$/),
		label: M().min(1),
		placeholder: M().optional(),
		secret: F().optional().describe("Mask it, and never echo it back."),
		optional: F().optional(),
		multiline: F().optional(),
		advanced: F().optional().describe("Fold this field behind the form's Advanced disclosure: for answers whose default is right for nearly everyone. The disclosure opens by itself while any advanced field holds a non-default value, so an edit never hides live settings."),
		boolean: F().optional().describe("Render it as a switch, carrying \"on\"/\"off\". For an opt-in EXTRA rather than a decision: a two-option picker says the same thing but presents a choice the user must make to proceed, sized like the required fields around it. A switch always holds a value, so a field like this never blocks a submit."),
		hint: M().optional().describe("A line under this control, for what the label alone cannot say: a host requirement, when a value takes effect. The card's own `hint` speaks for the whole card; this one is bound to the field it qualifies."),
		rebuild: F().optional().describe("This value only takes effect after the sandbox is rebuilt, because it rides the image overlay. Shown as a chip beside the label: two switches side by side, identical in every visible way, can otherwise cost five seconds or five minutes with no way to tell which."),
		default: M().optional(),
		options: I(L({
			value: M(),
			label: M()
		})).optional().describe("Turns the field into a select."),
		when: M().refine(vw, { message: "not a valid `when` condition" }).optional().describe("Only show this field while a condition over the answers already given holds: `auth == 'key'`, `provider in ['ipsec', 'fortinet']`, `!advanced`. Supports `&&`, `||`, `!`, comparisons and `in`."),
		value: M().optional().describe("A fixed value baked into the config rather than asked for: how a card pins its discriminator (platform=\"reddit\", provider=\"stripe\"). Renders as nothing."),
		totp: F().optional().describe("This field holds a TOTP seed, the base32 key or otpauth:// URI a service shows when enrolling an authenticator app. Declare it with `secret: true`. Unlike an ordinary secret it never enters the agent's environment: the daemon mints the six-digit codes on demand and only those cross.")
	}), xw = L({
		url: M().min(1).describe("The URL to call, as a template over the fields: `${field}` substitutes, `${field:uri}` percent-encodes. Same spelling as `env`."),
		method: B([
			"GET",
			"POST",
			"HEAD"
		]).optional().describe("Defaults to GET."),
		headers: z(M(), M()).optional().describe("The request headers, templated the same way: `{\"Authorization\": \"Bearer ${token}\"}`."),
		identity: M().optional().describe("A dotted path into the JSON answer naming who the caller is (\"login\", \"user.name\"), so success can say which account answered."),
		insecure: F().optional().describe("Accept a self-signed certificate, for a service whose local install ships one (Obsidian's Local REST API).")
	}), Sw = L({
		name: M().min(1),
		...tw,
		description: M().min(1).describe("ONE LINE: aim for 60 characters or fewer. The grid clamps it at two lines in a narrow pane, so a paragraph here is a paragraph the reader gets truncated. Everything longer belongs in `hint`."),
		category: M().min(1),
		hint: M().optional().describe("The paragraph, shown under the add form and searched from the catalog, so the words that identify this card to someone hunting for it (\"webauthn\", \"socket mode\") belong here even when the tile cannot show them."),
		guide: L({
			url: M().optional(),
			urlFromField: M().optional(),
			path: M().optional(),
			linkLabel: M().optional(),
			scopes: M().optional(),
			steps: I(M()).optional()
		}).optional().describe("The walkthrough the install dialog renders for getting the credential this card asks for.")
	}), Cw = {
		id: M().regex(/^[a-z0-9][a-z0-9-]*$/),
		catalog: Sw,
		fields: I(bw)
	}, ww = R("kind", [
		L({
			...Cw,
			kind: V("cli"),
			fields: I(bw).min(1),
			env: z(M().regex(/^[A-Z][A-Z0-9_]*$/), M()).describe("The environment the agent's shell gets, as value templates over the fields: `${field}` substitutes, `${field:uri}` percent-encodes. Each name is suffixed per instance."),
			skill: M().min(1).describe("Checkout-relative SKILL.md teaching the agent this tool. `${id}` in it is replaced with the instance name at apply time."),
			fragment: M().min(1).optional().describe("A Dockerfile fragment holding the client binary this tool needs (psql, mysql, whisper)."),
			pack: M().min(1).optional().describe("A sandbox feature pack name (whisper, llamacpp, browser, …) supplying this tool. Preferred over `fragment`: an image that already bakes the pack needs no rebuild, and there is no copy to drift."),
			probe: xw.optional().describe("One authenticated request that tests this card's settings before they are saved, so a wrong token or an unreachable host is answered on the form rather than by a card that says 'not connected' afterwards.")
		}),
		L({
			...Cw,
			kind: V("browser"),
			loginUrl: N().optional().describe("What the sign-in window opens; the profile it persists IS the credential. Optional so one card can be the generic one that asks for the URL on its form instead, but a card must either pin this or declare a field that supplies it, or the window opens on nothing."),
			homeUrl: N().optional().describe("Where that same profile opens once it HAS a session: the owner's own hands on the connected browser. Separate from loginUrl because for some platforms the login lives on another site entirely (YouTube signs in at accounts.google.com)."),
			skill: M().min(1).describe("Checkout-relative SKILL.md teaching the agent this site's actions: rendered once per site, all its connected accounts on one roster (`${accounts}`), the core tool note at `${tools}`.")
		}),
		L({
			...Cw,
			kind: V("host"),
			skill: M().min(1).describe("Checkout-relative SKILL.md teaching the agent that machine's shell.")
		}),
		L({
			...Cw,
			kind: V("webext"),
			install: N().describe("Where this browser's extension is installed from: its store listing, or a page offering the build."),
			skill: M().min(1).describe("Checkout-relative SKILL.md teaching the agent to drive this browser.")
		}),
		L({
			...Cw,
			kind: V("agent")
		})
	]).superRefine((e, t) => {
		if (e.kind === "cli") for (let n of e.fields.filter((e) => e.totp === !0)) Object.values(e.env).some((e) => e.includes(`\${${n.key}}`) || e.includes(`\${${n.key}:uri}`)) && t.addIssue({
			code: "custom",
			message: `env must not reference the totp field "${n.key}", the daemon mints codes from it instead`
		});
	}), Tw = {
		name: "capabilities",
		description: "Capability cards this pack adds to the \"+\" grid: a connected CLI tool, a site the agent acts on as the owner through the shared browser, an operating system pack, a browser family the owner connects their own copy of, or a preset over a core kind. The card and its form are data here; the machinery that acts on them is core, which is why a card may only name one of these five kinds.",
		schema: I(ww)
	};
})), Dw, Ow, kw = v((() => {
	yw(), G(), Dw = L({
		command: M().regex(/^[a-z0-9][a-z0-9-]*(\.[a-z0-9][a-z0-9-]*)+$/),
		title: M().min(1).describe("What the command palette shows. The manifest's value wins over the one passed at registration."),
		category: M().min(1).optional().describe("What the command acts on (\"Deployments\", \"Knowledge\"), drawn ahead of the title as \"Category: Title\" and searched with it. Use the extension's own name so its commands group together; omit it and the command stands alone."),
		icon: M().optional().describe("A name from the host's icon set, drawn beside the title."),
		keybinding: M().regex(/^\S+$/).optional().describe("A global keyboard shortcut, e.g. \"Mod+Shift+K\" — `Mod` is ⌘ on Apple and Ctrl elsewhere. Declared here because a global shortcut is consequential: the owner approves it at install, and the host binds only what was approved."),
		when: M().refine(vw, { message: "not a valid `when` condition" }).optional().describe("When the shortcut applies, as a condition over the shell's context keys, `tabSurface == 'chat'`, `!editableTarget`. Without one the chord is claimed everywhere, including inside a terminal where a bare key belongs to the program running in it. The command palette ignores this: a command is always runnable by name.")
	}), Ow = {
		name: "commands",
		description: "Commands this extension may register handlers for, surfaced in the command palette. Title, icon and shortcut all come from here rather than from the registration call, because this is what the owner approved at install.",
		schema: I(Dw)
	};
})), Aw, jw, Mw = v((() => {
	G(), Aw = L({
		id: M().regex(/^[a-z0-9][a-z0-9-]*$/),
		label: M().min(1).describe("The family's name, shown in the install dialog beside your other contributions. Per-row wording stays with the provider, which is the only thing that knows what it found.")
	}), jw = {
		name: "documents",
		description: "Per-directory documents this extension can offer. Your provider marks the rows in the Workspace tree it has something to say about, and the host opens your component as a tab.",
		schema: I(Aw)
	};
})), Nw, Pw, Fw = v((() => {
	G(), Nw = L({ fragment: M().min(1).refine((e) => !e.split("/").includes(".."), { message: "fragment must stay inside the checkout" }).describe("Checkout-relative path to a file holding ONLY RUN and ENV instructions. FROM and privileged directives are rejected: those stay daemon-owned.") }), Pw = {
		name: "environment",
		description: "A Dockerfile fragment baked into the sandbox image so your tools are actually installed at runtime: a whisper binary, a psql client. The owner approves the composed overlay and rebuilds out of band, so this does not take effect immediately.",
		schema: Nw
	};
})), Iw, Lw, Rw = v((() => {
	G(), Iw = L({
		path: M().min(1).refine((e) => !e.startsWith("/") && !e.split("/").includes(".."), { message: "path must be workspace-root-relative and stay inside the workspace" }).describe("Workspace-root-relative, forward-slash, matched by prefix, so one entry covers an exact file (`.intentic/config/automations.json`), a directory (`.intentic/config/approvals/`, with the trailing slash so it cannot match a sibling file) or a name family (`.intentic/environment.`). Not a glob."),
		invalidates: I(M().min(1)).min(1).describe("The query keys this path makes stale, the first element of your own api.sandbox.key(...) keys. Keep both this and the path as narrow as the view actually needs: a broad prefix costs every connected browser a refetch on every matching write.")
	}), Lw = {
		name: "files",
		description: "Which workspace files back your views, so the daemon's file watcher can tell the browser they went stale instead of you polling for it. The agent edits the workspace out of band from every HTTP route, and this push is the only thing that can notice.",
		schema: I(Iw)
	};
})), zw, Bw, Vw, Hw = v((() => {
	G(), zw = L({
		label: M().min(1),
		placeholder: M().min(1),
		hint: M().min(1).optional().describe("The sentence under the input, for a filter whose empty case is easy to get wrong.")
	}), Bw = L({
		provider: M().regex(/^[a-z0-9][a-z0-9-]*$/).describe("The slug this source's automation triggers fire on."),
		events: I(L({
			type: M().regex(/^[a-z0-9][a-z0-9_]*$/),
			label: M().min(1)
		})).min(1).refine((e) => new Set(e.map((e) => e.type)).size === e.length, { message: "listener event types must be unique" }).describe("The event types this source can fire, with the wording the automation editor offers them under. The daemon accepts no others."),
		automation: L({
			label: M().min(1),
			mentionLabel: M().min(1).optional().describe("Only for a source whose message events distinguish being addressed. Absent ⇒ the editor offers no mention-only filter, rather than inventing semantics you did not promise."),
			channel: zw.describe("The primary narrowing filter, a channel, a room, a repo."),
			branchField: zw.optional().describe("A second narrowing axis, for a source whose events carry one: a pipeline's git ref, so a trigger can say \"the branch that ships\" rather than \"every agent's every failure\"."),
			sender: zw.optional().describe("How this source names a sender, and where a person finds that id. Declaring it promises that `author.id` is an identity the service vouches for, not a name the sender typed; absent ⇒ the editor offers no sender rules on this source."),
			senderGroup: zw.optional().describe("How this source names a sender's group, for a source whose messages carry `author.groups` (a Discord role). Absent ⇒ rules match ids only."),
			starterPrompt: M().min(1).describe("The first prompt a new automation on this source is prefilled with. You own the payload vocabulary, so you own the prompt that explains it.")
		}).describe("How the generic automation editor presents this source: its name, its filters, and the prompt it starts people on.")
	}), Vw = {
		name: "listener",
		description: "A realtime event source this extension supplies, so automations can trigger on it. One declaration feeds both halves: the daemon accepts these event types and serves this provider's control surface, and the automation editor derives its source picker, filters and starter prompt from it, so a newly installed listener is configurable without a matching app release.",
		schema: Bw
	};
})), Uw, Ww, Gw = v((() => {
	G(), Uw = L({
		name: M().regex(/^[a-z0-9][a-z0-9-]*$/),
		command: M().min(1),
		cwd: M().optional().describe("Relative to the extension checkout. Absent ⇒ the checkout root."),
		port: V("auto").optional().describe("Assign a free port and inject it as PORT."),
		preview: F().optional().describe("Expose the port on a tunnelled preview hostname."),
		autoStart: F().optional().describe("Launch it on install and on daemon boot, rather than waiting to be started.")
	}), Ww = {
		name: "processes",
		description: "Long-lived background processes the daemon runs for this extension: a gateway holding a connection the daemon must not, a dev server. Managed the same way panel dev servers are, and startable and stoppable from the Extensions tab.",
		schema: I(Uw)
	};
})), Kw, qw, Jw = v((() => {
	G(), Kw = L({
		key: M().regex(/^[a-z0-9][a-zA-Z0-9-]*$/),
		type: B([
			"boolean",
			"string",
			"number",
			"enum"
		]).describe("Which control the Settings page draws. `enum` reads its choices from `enum`."),
		title: M().min(1),
		description: M().optional().describe("The line under the control."),
		default: ku([
			M(),
			P(),
			F()
		]).optional(),
		enum: I(M()).optional().describe("The choices, for type \"enum\". Meaningless otherwise."),
		secret: F().optional().describe("Mask the value in the UI and strip it from reads: a set secret round-trips as 'still set', never as its value."),
		env: M().regex(/^[A-Z][A-Z0-9_]*$/).optional().describe("Inject the stored value into the agent's shell environment under this name, every turn. How a credential you hold reaches the agent's command-line tools.")
	}), qw = {
		name: "settings",
		description: "Typed settings the host renders into the Settings page for you and persists daemon-side. You never draw the form or store the value; you read it back with api.settings.get.",
		schema: I(Kw)
	};
})), Yw, Xw, Zw = v((() => {
	G(), Yw = L({
		id: M().regex(/^[a-z0-9][a-z0-9-]*$/),
		extensions: I(M().regex(/^[a-z0-9]+$/)).min(1).describe("Bare file extensions, no dot: e.g. [\"docx\", \"xlsx\"]."),
		fetch: B([
			"text",
			"blob",
			"url"
		]).describe("How much of the file the host hands you. `text` for a format that is text (svg, a subtitle track). `blob` for one that must be parsed end to end before any of it shows (a .docx, a spreadsheet), bounded by the daemon's raw-read cap. `url` for anything range-read rather than parsed (audio, video): your component gets a streaming URL to point an element at, never the bytes.")
	}), Xw = {
		name: "viewers",
		description: "File formats this extension can render. The host resolves an opened file to your viewer by its extension, fetches the content, and renders your component with it: you keep none of the fetch lifecycle and none of the daemon credentials.",
		schema: I(Yw)
	};
})), Qw, $w, eT = v((() => {
	G(), Qw = L({
		id: M().regex(/^[a-z0-9][a-z0-9-]*$/),
		label: M().min(1).describe("The name shown on the tile or tab. The manifest's value wins over the one passed at registration."),
		surface: B([
			"rail",
			"directory",
			"sandbox"
		]).describe("Where it appears. `rail` is a tile in the global left rail; `directory` is a panel opened from a repo in the Workspace tree; `sandbox` is a tab on the Sandbox hub, for a view whose subject is the box rather than the work."),
		badge: F().optional().describe("Allow this view to say something on its tile: a count, a glyph, or that work is running there. Declared because a badge interrupts from every other screen in the app; leave it out and any badge the extension registers is dropped.")
	}), $w = {
		name: "views",
		description: "Sidebar elements this extension may register at runtime. Each entry reserves an id and a surface; the extension supplies the component with api.views.register, and the host refuses any registration this list does not cover.",
		schema: I(Qw)
	};
})), tT, nT, rT = v((() => {
	G(), aw(), cw(), uw(), Ew(), kw(), Mw(), Fw(), Rw(), Hw(), Gw(), Jw(), Zw(), eT(), aw(), cw(), uw(), Ew(), kw(), Mw(), Fw(), Rw(), Hw(), Gw(), Jw(), Zw(), eT(), tT = [
		$w,
		Lw,
		Xw,
		jw,
		Ow,
		qw,
		Ww,
		iw,
		Pw,
		Tw,
		Vw,
		sw,
		lw
	], nT = L(Object.fromEntries(tT.map((e) => [e.name, e.schema.describe(e.description).optional()])));
})), iT, aT = v((() => {
	G(), nw(), rT(), iT = L({
		$schema: M().optional().describe("The authoring schema, for editor completion and validation. Nothing at runtime reads it."),
		publisher: M().regex(/^[a-z0-9][a-z0-9-]*$/),
		name: M().regex(/^[a-z0-9][a-z0-9-]*$/),
		version: M().min(1).describe("Your own semver, display and identity only. The installed code's identity is the pinned commit sha."),
		category: M().min(1).optional().describe("Which section of the Extensions tab this sits under: a grouping by what it is FOR, which cannot be derived from what it contributes. A section this app has never heard of lands in 'Other' rather than failing to install."),
		...tw,
		engines: L({ intentic: M().min(1) }).describe("A semver range over the host's extension API version, checked before your code is activated."),
		entry: M().min(1).refine((e) => !e.split("/").includes(".."), { message: "entry must stay inside the checkout" }).optional().describe("Repo-relative path of your prebuilt single-file ESM bundle, built with `vue` and `@intentic/extension-api` as externals. Absent ⇒ an extension with no UI."),
		server: M().min(1).refine((e) => !e.split("/").includes(".."), { message: "server must stay inside the checkout" }).optional().describe("Repo-relative path of your prebuilt single-file node ESM server bundle, exporting `activateServer`. Served under your own route namespace, which the daemon proxies. Nothing is provided at runtime but node builtins, so bundle everything else in. Absent ⇒ no backend."),
		permissions: L({
			sandbox: I(M()).optional().describe("Daemon routes your UI half may call. Your own backend namespace needs no entry: its backend is your own code."),
			daemon: I(M()).optional().describe("Daemon routes your SERVER half may call. Separate from `sandbox` because the two halves run as different principals: the UI as the owner's session, the backend as a minted per-extension token, so a grant to one must never quietly widen the other.")
		}).optional().describe("How far this extension may reach into the daemon, as \"<METHOD> <path-glob>\" entries where `*` matches one path segment: e.g. \"GET /panels\", \"POST /panels/*/start\". The install dialog shows these, the host refuses anything undeclared, and the usage ledger records which were actually earned."),
		contributes: nT.optional()
	});
})), oT = v((() => {
	aT();
})), sT = v((() => {})), cT = v((() => {})), lT = v((() => {
	QC(), $C(), oT(), aT(), sT(), rT(), cT();
})), uT, dT, fT, pT, mT, hT, gT, _T, vT, yT, bT, xT, ST, CT, wT, TT, ET, DT, OT, kT, AT, jT, MT, NT, PT, FT = v((() => {
	G(), lT(), uT = M().min(1).max(121).regex(/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/), dT = L({
		updates: B([
			"notify",
			"agent",
			"auto"
		]),
		advisories: B(["auto-disable", "notify"])
	}), fT = L({
		ref: M().describe("The commit being offered."),
		version: M().optional().describe("What it calls itself."),
		url: M().describe("Where it comes from."),
		path: M().optional().describe("Where inside that repository it lives."),
		trust: B(["verified", "listed"]).describe("Whether anybody vouched for it, or it is merely listed."),
		securityFix: F().optional().describe("This release fixes a security problem in earlier ones, so here the old version is the dangerous one."),
		registry: M().describe("Which registry said so."),
		at: M().describe("When it was published."),
		needsReview: M().optional().describe("Why this one was not taken automatically and is asking for a person instead: it wants more than it used to, or nobody has vouched for it."),
		review: L({
			conversationId: M().describe("Where to read what it found."),
			at: M().describe("When it looked.")
		}).optional().describe("An agent has already read the difference between what is installed and this, so the card can link to what it found rather than offer to start looking.")
	}), pT = L({
		reason: M().describe("Why the registry pulled the listing, in its own words. Delisting protects people browsing; this record is for the person already running it."),
		registry: M().describe("Which registry said so."),
		at: M().describe("When."),
		autoDisabled: F().describe("Whether the sandbox has already switched it off.")
	}), mT = L({
		state: B([
			"watching",
			"healthy",
			"unhealthy"
		]).describe("How it has behaved since the last update. Checks catch broken, not wrong, so for a while after a swap it is simply watched."),
		detail: M().optional().describe("What is going wrong, when something is."),
		fromRef: M().optional().describe("Which version it was updated from, which is what going back would return to."),
		at: M().describe("When the watching started."),
		autoReverted: F().optional().describe("The update was already rolled back without anybody asking. The record stays rather than pretending the attempt never happened.")
	}), hT = L({
		added: I(M()).describe("What the new version asks for that the running one does not. The whole point of the comparison."),
		removed: I(M()).describe("What it no longer asks for."),
		unchanged: I(M()).describe("What stays the same.")
	}), gT = L({
		id: uT.describe("Which extension."),
		ref: M().regex(/^[0-9a-f]{40}$/).optional().describe("Which commit, in full. Leave it out for whatever the last check found, which is what most callers mean.")
	}), _T = L({
		ref: M().describe("The commit this would install."),
		version: M().describe("What that version calls itself."),
		installedVersion: M().describe("What is running now."),
		engines: M().describe("Which sandbox versions the new one says it needs."),
		compatible: F().describe("Whether this sandbox is one of them."),
		powers: hT.describe("Exactly what the new code asks for that the running one does not. This is what approving an update is approving.")
	}), vT = L({
		ok: V(!0).describe("It went through."),
		ref: M().describe("Which commit is now running."),
		rebuildNeeded: F().optional().describe("The new version changes what the sandbox image contains, so a one-time rebuild is still pending and the update is not wholly landed yet.")
	}), yT = L({
		id: uT.describe("Which extension."),
		updates: B([
			"notify",
			"agent",
			"auto"
		]).optional().describe("What to do about a newer version: tell you, have an agent read the difference first, or just take it."),
		advisories: B(["auto-disable", "notify"]).optional().describe("What to do about a security warning: switch it off at once, or tell you.")
	}), bT = L({
		ok: V(!0).describe("The check ran."),
		checkedAt: M().describe("When, so a screen can date the answer.")
	}), xT = L({
		id: uT.describe("The extension's id."),
		manifest: iT.describe("What it declares about itself: what it contributes, what it needs, and what it may reach."),
		commit: M().describe("Exactly which commit is installed."),
		source: B([
			"builtin",
			"installed",
			"workspace"
		]).describe("Where the code comes from: baked into the sandbox image and not removable, installed from a repository at a pinned commit, or written in this workspace and edited in place."),
		enabled: F().describe("The owner's switch. A switched-off extension is still listed, which is what makes it switchable back on, but nothing it contributes is wired up."),
		essential: F().optional().describe("Its switch is fixed on, because it is the only way to see or stop an engine the sandbox runs regardless. Hiding that page would not stop the spending, only your ability to notice it. Declared by the core about its own surfaces, never by an extension about itself, which would be a pack making itself un-removable."),
		usage: z(M(), L({
			calls: P().int().nonnegative().describe("How many times."),
			last: M().describe("When, most recently.")
		})).optional().describe("How much of the reach it asked for it has actually used, keyed by what it declared. Absent means never observed doing anything, which is a different claim from uses none of them, and the two have to stay tellable apart: reading either as these permissions are unnecessary turns evidence into a guess with a number on it."),
		backend: L({
			state: B([
				"running",
				"error",
				"absent",
				"incompatible",
				"starting",
				"stopped"
			]).describe("How its server half is doing. Absent means the code is not in this image at all; incompatible means it needs a different sandbox version."),
			detail: M().optional().describe("What went wrong, so a backend that failed to start is a sentence rather than an address that answers nothing.")
		}).optional().describe("Present only for an extension that ships a server half."),
		update: fT.optional().describe("A newer version waiting. All five of these exist only for one installed from a repository: a built-in updates with the image and one written here is edited live."),
		advisory: pT.optional().describe("A security warning about the installed version."),
		health: mT.optional().describe("How it has behaved since the last update, which is what decides whether that update sticks."),
		previous: L({
			ref: M().describe("The commit that was running before."),
			version: M().optional().describe("What it called itself.")
		}).optional().describe("The version kept one step back, which is what going back means."),
		updatePolicy: dT.optional().describe("The owner's standing answer for this one: tell me, have an agent look, or just do it.")
	}), ST = L({
		dir: M().describe("Which folder."),
		error: M().describe("Why it could not be read.")
	}), CT = L({
		extensions: I(xT).describe("What is installed."),
		invalid: I(ST).describe("Extensions written here that could not be read at all. Listed rather than dropped, because there is no install moment at which to reject a broken one, so this is its only way of saying anything."),
		updatesCheckedAt: M().optional().describe("When updates were last looked for. Absent until the first check has run. Sent so a screen can say checked an hour ago rather than presenting staleness as certainty.")
	}), wT = L({
		settings: z(M(), ku([
			M(),
			P(),
			F()
		])).describe("The values, minus anything marked secret."),
		secretsSet: I(M()).describe("Which of its secret settings actually hold a value. Names only: the values themselves never come back.")
	}), TT = L({
		id: M().describe("Which extension."),
		settings: z(M(), ku([
			M(),
			P(),
			F()
		])).describe("The values to write. A key the extension never declared is refused rather than quietly stored.")
	}), ET = L({
		id: M().describe("Which extension."),
		enabled: F().describe("On or off.")
	}), DT = L({
		publisher: M().regex(/^[a-z0-9][a-z0-9-]*$/).describe("Who it is by, which together with the name makes its id."),
		name: M().regex(/^[a-z0-9][a-z0-9-]*$/).describe("What it is called.")
	}), OT = L({
		id: M().describe("The id it was given."),
		dir: M().describe("Where its files are, so you can open them.")
	}), kT = L({
		id: M().describe("The name the owner gave it, which is also the agent's handle for it."),
		kind: M().describe("Which core kind it is underneath: cli, browser, host or webext."),
		card: M().describe("The card it was added from, named as the grid names it."),
		secrets: I(M()).describe("Credential fields stored for it, by name. The values are deleted with the entry and cannot be recovered from here."),
		effect: M().describe("What tearing it down actually takes away, in one sentence.")
	}), AT = L({
		id: uT.describe("The extension's id, as the list addresses it."),
		name: M().describe("Its publisher.name identity, which is the key its settings and switch are stored under."),
		version: M().describe("The version being removed."),
		source: B([
			"builtin",
			"installed",
			"workspace"
		]).describe("Where its code comes from, which decides what removal means."),
		blocked: M().optional().describe("Why this one cannot be removed, when it cannot. Present means every other field is what would go if it could."),
		files: I(L({
			path: M().describe("Workspace-relative."),
			detail: M().describe("What is in there.")
		})).describe("Directories deleted outright. For an extension written here this is the owner's own source, which nothing else keeps a copy of."),
		connections: I(kT).describe("Connections configured from its cards, which are removed with it."),
		settings: I(L({
			key: M().describe("Which setting."),
			secret: F().describe("Whether its value is a stored credential.")
		})).describe("Values the owner entered for this extension that are forgotten. Only keys actually holding a value are listed."),
		processes: I(M()).describe("Background processes it declared, stopped before its files go."),
		automations: I(M()).describe("Automations of the owner's own that wake on a listener this extension provides. They are NOT removed, and are listed because they stop firing, which is the sort of thing a removal is otherwise discovered by."),
		rebuildNeeded: F().describe("It bakes a layer into the sandbox image, so what it added to the image is only gone after the next environment rebuild."),
		keeps: I(M()).describe("What removal deliberately leaves alone, so the list of what goes can be read as complete.")
	}), jT = L({
		ok: V(!0).describe("It is gone."),
		connections: I(M()).describe("Which configured connections went with it, by name."),
		rebuildNeeded: F().optional().describe("Its image layer is still in the running sandbox until the next environment rebuild; nothing else is pending.")
	}), MT = L({ reports: z(M(), z(M(), P().int().positive())).describe("Each extension that called something, and the counts against the declared powers it exercised.") }), NT = L({
		id: M().describe("Which extension."),
		name: M().describe("Which of its declared processes.")
	}), PT = L({
		name: M().describe("Which process."),
		running: F().describe("Whether it is up. False with a port means it crashed and the supervisor is waiting to retry it."),
		port: P().optional().describe("The port it was given."),
		restarts: P().optional().describe("How many times it died and was brought back since it was started. A growing number is a service in trouble."),
		lastExitCode: P().optional().describe("How it last exited, when it has crashed at least once."),
		previewUrl: M().optional().describe("Where to open it, when it has an address.")
	});
})), IT, LT = v((() => {
	J(), LS(), FT(), VC(), $(), IT = {
		list: q.route({
			method: "GET",
			path: "/extensions",
			summary: "Installed extensions",
			description: "Every extension installed here, resolved to the manifest the owner approved, which is what the app boots its extension host from. The code itself is served separately, because raw script bytes are not a JSON answer."
		}).output(CT),
		create: q.route({
			method: "POST",
			path: "/extensions/workspace",
			summary: "Write a new extension in place",
			description: "Scaffolds a working extension into this workspace and installs it. The only call here that creates one, and it exists because that folder is otherwise reachable only through an agent's file tools, which is a fine way to change an extension and a poor way to meet the idea of one."
		}).input(DT).output(OT),
		removalPlan: q.route({
			method: "GET",
			path: "/extensions/{id}/removal",
			summary: "What removing an extension would take away",
			description: "Everything one removal destroys, before it happens: the files deleted, the connections configured from its cards, the settings and credentials forgotten, the background processes stopped, and the owner's own automations that quietly stop firing. Also answerable for an extension that cannot be removed, in which case it says why."
		}).input(kS).output(AT),
		remove: q.route({
			method: "POST",
			path: "/extensions/{id}/remove",
			summary: "Remove an extension",
			description: "Uninstalls it and everything that only existed because it was here: the connections added from its cards, with their stored credentials, its settings, its switch and its update record. What the owner made with it — automations, files in the workspace — is left alone. Owner only, for the same reason installing is. Built-in extensions cannot be removed; switch them off instead."
		}).input(kS).output(jT),
		settings: q.route({
			method: "GET",
			path: "/extensions/{id}/settings",
			summary: "An extension's settings",
			description: "The current values for the settings this extension declared it has."
		}).input(kS).output(wT),
		setSettings: q.route({
			method: "POST",
			path: "/extensions/{id}/settings",
			summary: "Change an extension's settings",
			description: "Writes new values. A key the extension never declared is refused rather than quietly stored, the same honesty rule that governs everything else an extension claims."
		}).input(TT).output(Z),
		setEnabled: q.route({
			method: "POST",
			path: "/extensions/{id}/enabled",
			summary: "Turn an extension on or off",
			description: "The owner's switch. Turning one off stops its background processes at once. What it contributes to an agent's tools is rebuilt at the start of the next turn, and anything it adds to the sandbox image only at the next rebuild."
		}).input(ET).output(Z),
		recordUsage: q.route({
			method: "POST",
			path: "/extensions/usage",
			summary: "Record what extensions just used",
			description: "One batch written by the app rather than measured by the daemon, because the permission gate runs in the browser: from the sandbox's side extension traffic is indistinguishable from anyone else's. This is how the record of which powers each extension actually exercises gets kept without one reporting request per extension."
		}).input(MT).output(Z),
		readiness: q.route({
			method: "GET",
			path: "/extensions/{id}/readiness",
			summary: "Whether an extension is fit to share",
			description: "The checks that can be answered from an extension's own files, for an author about to publish. Read on demand rather than carried on the list, because it reads the code off disk each time."
		}).input(kS).output(BC),
		checkUpdates: q.route({
			method: "POST",
			path: "/extensions/updates/check",
			summary: "Look for extension updates now",
			description: "Compares every installed extension against its source and reports what is newer, what carries an advisory and what looks unhealthy. This also happens on a schedule; call it to check on demand."
		}).output(bT),
		updatePreview: q.route({
			method: "POST",
			path: "/extensions/{id}/update/preview",
			summary: "What an update would change",
			description: "The read before the click: which versions are involved and exactly which powers the new code asks for that the running one does not. Costs one throwaway copy of the source, the same as browsing a registry entry."
		}).input(gT).output(_T),
		applyUpdate: q.route({
			method: "POST",
			path: "/extensions/{id}/update",
			summary: "Update an extension",
			description: "The whole swap as one transaction: fetch, check, quiet the running one, replace it while keeping the outgoing copy one step back, restart and watch it come up. The existing configuration is kept, so a token for a private source survives what removing and re-adding would lose. Owner only, because it changes what code runs."
		}).input(gT).output(vT),
		revert: q.route({
			method: "POST",
			path: "/extensions/{id}/revert",
			summary: "Go back to the previous version",
			description: "Swaps the copy kept from before the last update back into place. Owner only, for the same reason updating is."
		}).input(kS).output(vT),
		setUpdatePolicy: q.route({
			method: "POST",
			path: "/extensions/{id}/update-policy",
			summary: "How an extension should handle its own updates",
			description: "The owner's standing answer for one extension: tell me, have an agent look at it, or just do it. Security advisories can be opted out of separately."
		}).input(yT).output(Z),
		processStatus: q.route({
			method: "GET",
			path: "/extensions/{id}/processes/{name}",
			summary: "Whether an extension's background process is up",
			description: "The state of one process an extension declared, with the port it was given and its preview address if it has one."
		}).input(NT).output(PT),
		processStart: q.route({
			method: "POST",
			path: "/extensions/{id}/processes/{name}/start",
			summary: "Start an extension's background process",
			description: "Brings one of an extension's declared processes up in an attachable terminal."
		}).input(NT).output(Z),
		processStop: q.route({
			method: "POST",
			path: "/extensions/{id}/processes/{name}/stop",
			summary: "Stop an extension's background process",
			description: "Shuts one of an extension's declared processes down and frees its port."
		}).input(NT).output(Z)
	};
})), RT = v((() => {
	dp(), hp(), fp.map((e) => ({
		label: e.label,
		value: e.id
	})), Object.fromEntries(fp.map((e) => [e.id, e.access])), fp.filter((e) => e.access.kind === "free").map((e) => e.id), Object.fromEntries(fp.map((e) => [e.id, e.vendor])), fp.filter((e) => e.planLimits).map((e) => e.id);
})), zT = v((() => {
	RT();
})), BT, VT, HT, UT, WT, GT, KT, qT, JT, YT, XT, ZT, QT = v((() => {
	Bh(), X(), BT = (e) => e.map((e) => new RegExp(e.source, `${e.flags}g`)), VT = [
		/\bgit\s+push\b[^|;&]*\s(?:-f\b|--force\b|--force-with-lease\b|--delete\b)/,
		/\bgit\s+reset\b[^|;&]*\s--hard\b/,
		/\bgit\s+clean\b[^|;&]*\s-{1,2}[a-zA-Z]*f/,
		/\bgit\s+branch\b[^|;&]*\s(?:-D\b|--delete\s+--force\b|--force\s+--delete\b)/,
		/\bgit\s+filter-branch\b/
	], HT = [/\{\{secret:[A-Za-z0-9_./-]+\}\}/], UT = String.raw`[\w~$.{}/\\-]*`, WT = [
		/(?<![\w.])\.env(?!\.(?:example|sample|template))(?:\.[\w-]+)?\b/,
		/\.ssh(?!\w)(?!\/(?:known_hosts|config|authorized_keys|environment)(?!\w))(?!\/[\w.-]*\.pub(?!\w))(?:\/[\w.\-/]*)?/,
		/\bid_(?:rsa|dsa|ecdsa|ed25519)\b(?!\.pub\b)/,
		new RegExp(String.raw`${UT}\.aws/credentials\b`),
		new RegExp(String.raw`${UT}\.npmrc(?!\.(?:example|sample|template))\b`),
		new RegExp(String.raw`${UT}\.git-credentials\b`),
		new RegExp(String.raw`${UT}\.credentials\.json\b`)
	], GT = [
		/\b(?:npm|pnpm|yarn|bun)\s+publish\b/,
		/\bcargo\s+publish\b/,
		/\bgh\s+release\s+create\b/,
		/\bdocker\s+push\b/,
		/\btwine\s+upload\b/
	], KT = String.raw`(?:localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(?::\d+)?(?=[/?#\s'"\x60]|$)`, qT = [new RegExp(String.raw`\b(?:curl|wget)\b[^|;&]*\bhttps?://(?!${KT})`), new RegExp(String.raw`\bfetch\(\s*['"\x60]https?://(?!${KT})`)], JT = [
		/\bmkfs(?:\.\w+)?\b/,
		/\bwipefs\b/,
		/\bblkdiscard\b/,
		/\bsgdisk\b[^|;&]*\s(?:--zap-all|-Z)\b/,
		/\bdd\b[^|;&]*\bof=(?:\/dev\/|['"`]\/dev\/)/,
		/\bshred\b[^|;&]*\s\/dev\//,
		/>\s*\/dev\/(?:[shv]d[a-z]|nvme\d|disk\d|mmcblk\d)/
	], YT = [
		/\b(?:docker|podman)\s+volume\s+(?:rm|remove|prune)\b/,
		/\b(?:docker|podman)\s+system\s+prune\b/,
		/\b(?:docker(?:\s+compose|-compose)?|podman-compose)\s+down\b[^|;&]*\s(?:-v\b|--volumes\b)/
	], BT(VT), BT(HT), BT(WT), BT(GT), BT(qT), BT(JT), BT(YT), XT = {
		"git.destructive": "rewrite or discard git history",
		"files.destructive": "delete files recursively",
		"system.destructive": "wipe a disk, or delete a whole root directory",
		"container.state": "delete a container volume or the data in it",
		"secrets.access": "read credential material",
		"package.publish": "publish or release a package",
		"network.outbound": "send a request out to the internet"
	}, ZT = {
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
})), $T, eE, tE, nE, rE, iE, aE, oE, sE, cE, lE = v((() => {
	G(), QT(), X(), $T = /* @__PURE__ */ new Set(["system.destructive"]), eE = /* @__PURE__ */ new Set([
		"system.destructive",
		"container.state",
		"files.destructive"
	]), tE = (e) => e === "sandbox" ? $T : eE, nE = {
		sandbox: "/ and /history. Not /work, /usr or /etc: the worktree's changes are uncommitted work, and the container comes back from its image.",
		device: "/, a home directory, a Windows drive, and the top-level directories an OS keeps."
	}, rE = (e) => Object.fromEntries(Ip.options.map((t) => [t, tE(t).has(e) ? "hard" : "judged"])), iE = (e) => Ip.options.filter((t) => e.tiers[t] === "hard").length, Lp.options.map((e) => ({
		commandClass: e,
		label: XT[e],
		patterns: ZT[e],
		tiers: rE(e),
		...e === "system.destructive" ? { notes: nE } : {}
	})).sort((e, t) => iE(t) - iE(e)), aE = B([
		"off",
		"watch",
		"on"
	]), oE = B([
		"allow",
		"ask",
		"refuse"
	]), L({
		decision: oE.describe("Run it, ask the owner, or refuse it."),
		sentence: M().describe("What this command does and why it was allowed, held or refused, in one plain sentence."),
		policyLine: M().optional().describe("A line the owner could add to their policy so this stops being asked. Shown on the card before it is accepted.")
	}), sE = L({
		at: P().int().describe("When it was judged, epoch milliseconds."),
		program: M().describe("The command or script, excerpted."),
		classes: I(M()).describe("The kinds of consequence triage matched, which is why a judge looked."),
		decision: oE.describe("What the judge decided."),
		sentence: M().describe("The judge's sentence."),
		outcome: B([
			"allowed",
			"asked",
			"refused"
		]).describe("What the gate did in the end."),
		answer: B([
			"allowed",
			"declined",
			"unanswered"
		]).optional().describe("How the owner answered, when they were asked."),
		machine: M().optional().describe("Which connected device it was headed for, when it was not this sandbox.")
	}), cE = L({
		text: M().describe("The policy, as the owner wrote it."),
		custom: F().describe("False when nobody has edited it and this is the text this product ships.")
	});
})), uE, dE, fE, pE, mE, hE, gE, _E, vE, yE, bE, xE, SE, CE, wE, TE, EE, DE, OE, kE, AE, jE, ME, NE, PE, FE, IE, LE, RE, zE, BE, VE, HE, UE, WE, GE, KE, qE, JE = v((() => {
	Bh(), G(), lE(), ap(), X(), uE = B([
		"intentic",
		"claude",
		"custom"
	]), dE = L({ base: B(["intentic", "claude"]) }), fE = B([
		"off",
		"versions",
		"full"
	]), pE = B([
		"file.edited",
		"turn.ending",
		"push.starting",
		"agent.finished",
		"agent.landed"
	]), mE = B([
		"verify-edits",
		"verify-removals",
		"verify-ui-edits",
		"verify-tests",
		"version-landed"
	]), hE = R("kind", [
		L({
			kind: V("command"),
			command: M().max(500),
			timeoutMs: P().min(6e4).max(36e5).default(9e5)
		}),
		L({
			kind: V("instruct"),
			text: M().min(1).max(4e3)
		}),
		L({
			kind: V("verdict"),
			verdict: B(["allow", "hold"])
		}),
		L({
			kind: V("builtin"),
			name: mE
		})
	]), gE = B([
		"clean",
		"error",
		"conflict",
		"checks-failed"
	]), _E = L({
		repo: M().min(1).optional(),
		paths: I(M().min(1)).max(20).optional(),
		outcome: I(gE).optional(),
		sample: P().gt(0).lt(1).optional()
	}), vE = {
		"file.edited": ["command"],
		"turn.ending": [
			"builtin",
			"instruct",
			"command"
		],
		"push.starting": ["command"],
		"agent.finished": ["verdict"],
		"agent.landed": ["builtin"]
	}, yE = {
		"turn.ending": [
			"verify-edits",
			"verify-removals",
			"verify-ui-edits",
			"verify-tests"
		],
		"agent.landed": ["version-landed"]
	}, bE = L({
		id: M().regex(/^[a-z0-9][a-z0-9-]*$/),
		label: M().min(1).max(80),
		moment: pE,
		when: _E.optional(),
		action: hE,
		enabled: F().default(!0)
	}).refine((e) => vE[e.moment].includes(e.action.kind), {
		message: "that action cannot stand at that moment",
		path: ["action"]
	}).refine((e) => e.action.kind !== "builtin" || (yE[e.moment] ?? []).includes(e.action.name), {
		message: "that built-in cannot stand at that moment",
		path: ["action"]
	}), xE = z(M(), P()), SE = B([
		"builtin",
		"own",
		"capability",
		"extension",
		"plugin",
		"persona",
		"dropped"
	]), CE = M().regex(/^[a-z0-9][a-z0-9-]*$/, "a skill name is lowercase letters, digits and dashes"), wE = L({
		id: M().describe("Its handle, which reading and deleting take. A skill of your own is simply its name; one belonging to something else is qualified, because two packages may each ship a review."),
		name: M().describe("Its name."),
		description: M().describe("What it is for, which is the line the agent reads to decide whether to reach for it. Empty when the skill declares none, which is worth showing as the blank it is: a skill with no description is rarely picked."),
		origin: SE.describe("Where it came from."),
		owner: M().optional().describe("Who ships it, as the row would name them."),
		enabled: F().describe("Whether the agent can reach it."),
		switchable: F().describe("Whether this surface can switch it. Everything else is on because its extension or its plugin is, and a switch here that silently did nothing would be worse than none, so the row names its owner instead."),
		editable: F().describe("Whether it can be rewritten here. Your own only: editing somebody else's in place would be undone the next time the thing that ships it catches up."),
		removable: F()
	}), TE = I(wE), EE = L({
		id: M().describe("The skill's id, which can carry the owner it came from."),
		name: M().describe("Its name."),
		body: M().describe("The instructions themselves, as written.")
	}), DE = L({ id: M().min(1).describe("Which skill. It travels in the query rather than the address, because an id can name the owner it came from and that will not fit in a path.") }), OE = L({
		name: CE.describe("What to call it. Saving over an existing name rewrites it, which is also how one is renamed."),
		description: M().min(1).max(1024).describe("What it is for, which is what the agent reads to decide whether to reach for it."),
		body: M().min(1).describe("The skill itself.")
	}), kE = L({ name: CE.describe("Which skill to delete. The stored text and the agent's copy go together, so nothing is left half done.") }), AE = L({
		name: CE.describe("Which skill of your own to switch."),
		on: F().describe("On writes the agent's copy from the stored text; off removes that copy and keeps the text.")
	}), jE = L({
		stableSystemPrompt: F().default(!1).describe("Keep the instructions identical between turns so the provider can cache them, moving anything that varies into the message instead. Cheaper, at the cost of some flexibility."),
		skills: I(M()).default(["lsp", "fileq"]).describe("Which built-in tools are switched on. A skill of your own is not listed here: it is on while the agent's copy of it exists."),
		personaRouting: F().default(!0).describe("Whether a new chat is matched to one of your personas from its first message. The message is read once it is sent, by the model on the persona-routing list, and the chat says in its own transcript what was asked and which persona it landed on. Never applies to unwatched runs, which name their persona themselves."),
		hashlineEdits: F().default(!1).describe("Have the agent edit files by line number rather than by quoting the text it wants replaced. Cheaper on large files, and less forgiving of a stale read."),
		systemPromptMode: uE.default("intentic").describe("Which instructions the agent starts from: intentic's own, the ones the installed Claude Code carries, or your own. The first two both get this product's own guidance added on top; your own gets nothing added, which is the point of it."),
		systemPrompt: M().max(2e4).default("").describe("Your own instructions, used only when the mode above says custom. Then it is the whole of them: both built-in bases go, and so does everything this product would otherwise add, including the guidance the chat's own cards are driven by. That is the price of total control."),
		iqSearch: F().default(!1).describe("Teach the agent how to use this workspace's own search tool, rather than leaving it to grep around."),
		iqSearchHoldout: P().min(0).max(1).default(0).describe("What share of conversations to run without that teaching, so the two can be compared. Whole conversations rather than individual turns, because once the teaching is in a session, withholding it from the next request does not make the model forget it."),
		workspaceMap: F().default(!1).describe("Open every conversation with a map of the project it starts in: what is in it, what each part is for, and where the agent is standing. Worked out fresh each time rather than written down anywhere, because a written layout is wrong within a fortnight. Off by default, since it spends tokens on the first message of every conversation."),
		workspaceMapHoldout: P().min(0).max(1).default(0).describe("What share of conversations to open without the map, so the two can be compared. Whole conversations rather than individual turns, because the map is sent once and stays in the conversation's history afterwards."),
		sidecars: F().default(!1).describe("Keep an up-to-date markdown rendering of every document, image and audio file in the workspace, made in the background as files land, so the agent reads a pre-derived text instead of paying to parse the file mid-task. Costs background CPU on a document-heavy workspace, so it is a switch rather than a default."),
		dependencyFreshness: fE.default("off").describe("Whether a version the agent is about to pin is checked against the package's own registry first. Facts only, or facts plus the name of a maintained replacement where the registry agrees the current choice has been abandoned. It tells the agent and lets it decide rather than refusing, because matching a version your project already uses is usually the right answer and a gate would fight it."),
		outputCleaners: M().default("").describe("Which command outputs to trim before the agent reads them, cutting the noise a build tool prints without cutting what it said."),
		outputHoldout: P().min(0).max(1).default(0).describe("What share of commands to leave untrimmed, so the saving can be measured against a real comparison rather than estimated."),
		modelRoles: Mu(rp, I(Wp).max(10)).default({}).describe("Which models do which job, one ordered list per job: commit messages, session titles, the safety judge, pipeline fixes, and every other place this sandbox picks a model for you. Tried in order, so one spent account does not take a job down. Nothing is chosen for you: a one-shot job with no list does not run, and a whole session with no list opens on whatever your own chat is set to."),
		changelogRepos: I(M()).max(50).default([]).describe("Which repositories keep a changelog, and so get a user-facing note written alongside each merge. A list rather than a switch, and empty by default, because the commit writer's standing rule is to copy the house style rather than impose one, and a repository that has never written such a note gives it nothing to copy."),
		autoTier: B([
			"off",
			"shadow",
			"on"
		]).default("shadow").describe("Whether an easy-looking turn may run on a cheaper model from the same provider. Three states rather than a switch, because the middle one is the only honest road to the third: it scores every turn and routes nothing, so the guess can become a measurement before it changes anything. It can only ever route down, so the worst case is one turn's quality rather than a bill nobody asked for."),
		autoTierEagerness: B([
			"cautious",
			"balanced",
			"eager"
		]).default("balanced").describe("How readily a turn counts as simple enough for the cheaper model. It moves only the cutoff: at every setting a turn still has to say something positively easy, so nothing here can downgrade a short vague request."),
		autoFastModels: I(M()).max(10).default([]).describe("Which cheaper model a downgraded turn lands on. A list so a sandbox spanning providers can name a rung on each, but not a fallback ladder: an entry naming a different provider than the turn is on is skipped rather than tried, because switching provider retires the conversation and starting over to save a fraction of a penny is not a saving. Empty picks the cheapest the turn's own provider publishes."),
		agentRetentionDays: P().min(0).max(365).default(3).describe("How many days a finished conversation stays on the board before being put away. Zero means never. The one setting here that defaults on, because each card left behind is a real working copy on disk, not just a row."),
		resumeAfterOutage: F().default(!1).describe("Whether a turn killed by the model provider failing is re-run automatically, backing off between attempts. The sandbox-wide default; any one conversation can say otherwise. Off to begin with, because a retry spends your allowance on a turn you sent once and only you can say whether it was worth paying for twice. Worth turning on for a sandbox whose work mostly happens with nobody in the room."),
		resumeAfterLimit: F().default(!1).describe("Whether a turn a spent usage limit refused is sent again by itself once the allowance reopens. The sandbox-wide default; any one conversation can say otherwise. Off to begin with, because the allowance is your budget and a turn that spends it the second it comes back is not a decision to make for you. Worth turning on for a sandbox whose work mostly happens with nobody in the room."),
		moveAfterLimit: F().default(!1).describe("Whether a turn a spent usage limit refused is moved to another connected account of the same provider that still has room, as soon as the refusal lands. The sandbox-wide default; any one conversation can say otherwise. Off to begin with, because it spends a second account on your behalf. With no account that has room the turn waits as the setting above says."),
		limitMoveCarryUnder: P().int().min(0).default(1e5).describe("When a spent usage limit moves a turn to another account, carry the provider session (the model keeps everything, and re-reads all of it once on the other account) while the conversation's context is under this many tokens; at or above it, start a fresh session with the sandbox's measured brief instead. Zero always starts fresh."),
		autoResumeOnRestart: F().default(!1).describe("Whether a turn killed by the sandbox restarting is re-run once it comes back. Off to begin with, for the same reason: it would spend your allowance on work you are not watching and edit files while you are still waiting for the sandbox to return. Either way the interruption is recorded rather than silently lost."),
		adoptedChecks: z(M(), M()).default({}).describe("Which repositories may run the checks they declare for themselves, and exactly which version of those checks you agreed to. A repository's declaration does nothing until it appears here, the same rule git keeps for hooks, which are never cloned; and a declaration that changes afterwards is held until you look at it again."),
		rules: I(bE).max(50).default([]).describe("Standing instructions you give the sandbox about its own work: ask for proof before a turn ends, run something before a push, hold or release finished work. Empty is the default and is exactly the behaviour of a fresh sandbox, because each of those defaults is what no rule matched means at its own moment."),
		automationFailureLimit: P().min(0).max(20).default(0).describe("How many failures in a row before an automation switches itself off. Zero means never, which is the default, because the failure is not always the automation's fault and a job disabled at three in the morning is one nobody re-enables. Only real errors count: a guard deciding there was nothing to do, or the sandbox dying mid-run, say nothing about the automation."),
		admission: Rp.prefault({}).describe("Whether work started from outside may run, per kind of trigger: let it, hold it for approval, or refuse it. Composes with each automation's own setting, and the stricter of the two wins, so holding every visitor's message needs no edit to each automation."),
		actionRules: z(M(), Fp).default({}).describe("What an agent may do out in the world, per kind of action: go ahead, ask first, or never."),
		commandJudge: aE.default("on").describe("Whether a model reads your safety policy before a flagged command runs. Off judges nothing and asks about nothing; Watch judges everything and records it without ever interrupting you, which is how you find out what your policy actually does before you let it stop anything; On lets the verdict decide. Wiping a disk or deleting under /history asks at every setting — that rule is typed rather than judged, and cannot be turned off."),
		subagentsAtOnce: P().min(1).max(200).default(20).describe("How many subagents may work at the same time."),
		subagentsPerTurn: P().min(1).max(2e3).default(200).describe("How many a single turn may start in total."),
		subagentDepth: P().min(1).max(10).default(3).describe("How many levels deep the delegation may go, since a subagent can start subagents of its own.")
	}), ME = L({
		text: M(),
		version: M()
	}), NE = L({
		id: M(),
		commands: P(),
		savedTokens: P()
	}), PE = L({
		updatedAt: P().optional(),
		commands: P(),
		rawTokens: P(),
		emittedTokens: P(),
		savedPct: P(),
		perCleaner: I(NE),
		holdout: L({
			cleaned: P(),
			heldOut: P(),
			measuredSavedPct: P().optional()
		}),
		gaps: I(L({
			command: M(),
			commands: P(),
			tokens: P()
		}))
	}), FE = L({
		turns: P(),
		mean: P()
	}), IE = L({
		metric: B([
			"searchCalls",
			"openingSearches",
			"openingListings",
			"callsBeforeTarget"
		]),
		on: FE,
		off: FE,
		controlTurnsNeeded: P().optional(),
		marginPct: P().optional(),
		deltaPct: P().optional(),
		saved: P().optional()
	}), LE = L({
		metrics: ju([IE], IE),
		minTurns: P(),
		sampleUnit: B([
			"turns",
			"conversations",
			"opening turns"
		]).optional(),
		cohort: M().optional()
	}), RE = L({
		judged: P(),
		fast: P(),
		atStakeUsd: P(),
		routed: P(),
		routedUsd: P(),
		escalated: P(),
		denied: P()
	}), zE = L({
		prevented: M(),
		chosen: M(),
		reason: M(),
		at: P().optional()
	}), BE = L({
		checked: P(),
		improved: P(),
		recent: I(zE),
		updatedAt: P().optional()
	}), VE = L({
		input: PE,
		search: LE.optional(),
		map: LE.optional(),
		tier: RE.optional(),
		dependencies: BE.optional()
	}), HE = `${Rh}/checks.json`, UE = B(["turn", "push"]), WE = L({
		when: UE.describe("When to run it: `turn` before the assistant finishes, `push` before code leaves the machine."),
		run: M().min(1).max(500).describe("The command, run in this repository's own directory, so it reads as it would in a terminal there."),
		label: M().min(1).max(80).optional().describe("What to call it on screen. Absent names it after the command."),
		timeoutMs: P().min(6e4).max(36e5).optional().describe("How long it may take before it is killed and counted as failed."),
		paths: I(M().min(1)).max(20).optional().describe("Only run it when the change touches these paths, written relative to this repository. Absent runs it on every change here.")
	}), L({ checks: I(WE).max(10).default([]) }), GE = L({
		repo: M().describe("Which repository, by its workspace id (\"root\" is the workspace itself)."),
		path: M().describe("Where the declaration lives, relative to the workspace, whether or not the file exists yet."),
		checks: I(WE).describe("What it declares, in the order the file lists them."),
		adopted: F().describe("Whether these are running. False means declared and inert: nothing a repository writes runs until the owner switches it on."),
		changed: F().describe("Whether the declaration changed since it was adopted, which holds it until the owner looks again. True only for a repository that was adopted before."),
		error: M().optional().describe("Why the file could not be read, when it exists but does not parse. The checks list is empty in that case.")
	}), KE = L({ repos: I(GE).describe("Every repository that declares checks, plus any the owner has adopted before, sorted by id.") }), qE = L({
		repo: M().min(1).describe("Which repository's declaration to switch."),
		on: F().describe("On adopts what it declares as it stands now; off stops running it. Adopting again is how a changed declaration is accepted.")
	});
})), YE, XE, ZE, QE, $E, eD, tD, nD, rD, iD, aD, oD, sD, cD, lD, uD = v((() => {
	G(), zT(), X(), Dp(), JE(), YE = L({
		files: B([
			"none",
			"read",
			"write"
		]).default("write").describe("What it may do with files: nothing, look and search, or also create and change."),
		shell: F().default(!0).describe("Whether it may run commands, and with them the terminals, the test runs and every tool on the image. The switch the strength of the others depends on."),
		code: F().default(!0).describe("Whether it may write and run a script rather than a command line. Its fence is real where the shell's is not: reads and writes follow the files answer, and it can start no other program unless commands are allowed too. The one stated gap is that the fence cannot cut the network."),
		web: F().default(!0).describe("Whether it may fetch a page or run a search."),
		browser: F().default(!0),
		delegate: F().default(!0),
		sandbox: F().default(!0),
		connectors: I(Y).max(100).optional(),
		devices: I(Y).max(50).optional(),
		mcp: I(Y).max(50).optional()
	}), XE = L({
		startIn: M().max(200).optional().describe("Which folder a conversation opens in."),
		folders: I(M().min(1)).max(50).optional().describe("Which folders it may touch at all. Absent means the whole workspace.")
	}), ZE = L({ repos: I(M().min(1).max(200)).max(50).describe("Which nested repositories a conversation wearing this card carries, by workspace-relative path. The workspace itself is always carried; empty means the workspace alone.") }), QE = B([
		"map",
		"context",
		"skills",
		"search",
		"delegation",
		"checks",
		"dependencies",
		"repoSync",
		"handoff"
	]), $E = L({ omit: I(QE).max(20).describe("Which of the notes the sandbox prepends to each message a conversation wearing this card does NOT get. Everything not named here is sent as usual; the notes that keep a turn inside its own branch or explain a missing account cannot be named at all.") }), eD = L({
		id: Y.describe("The persona's id."),
		label: M().max(60).optional().describe("What to call it on screen. Absent falls back to the id, which somebody chose anyway."),
		capabilities: I(Y).max(50).describe("Which connected accounts are its hands. Named individually rather than by site, because two accounts on one site is the whole problem this solves. Naming one that is not connected yet is not an error: it is a card describing an account this sandbox has still to sign into."),
		brief: M().max(200).optional().describe("What this persona is for, in one line. A new chat is routed onto a persona by this sentence, and the Personas page shows it under the name."),
		powers: YE.optional().describe("What a conversation wearing it may do. Absent means the full toolbox, so a card written before this existed behaves exactly as it did."),
		workspace: XE.optional().describe("Where it works. Absent means the whole workspace."),
		context: ZE.optional().describe("Which part of the workspace a conversation wearing it carries: the repositories its checkout holds. Absent means every repository."),
		briefing: $E.optional().describe("Which of the notes the sandbox prepends to every message this card's conversations do without. Absent means all of them, which is what a card written before this existed keeps."),
		models: I(Wp).max(10).optional().describe("Which models a conversation wearing it runs on, tried in order. Absent means whatever the chat or the job would have run on anyway; a model chosen for the turn itself always wins."),
		systemPromptMode: uE.optional()
	}), tD = L({
		prompt: M().min(1).max(2e4).describe("The message a new chat is about to open with."),
		folder: M().max(200).optional().describe("The workspace folder the chat was opened in, when it was opened in one."),
		paths: I(M().min(1).max(500)).max(50).default([]).describe("Workspace paths the message names: uploads, @-mentions, the editor's own file.")
	}), nD = L({
		persona: Y.optional().describe("The card this message belongs to, or absent when none does and the chat should stay open to everything."),
		reason: M().describe("Why, in the one line a chat can show. Present whether or not a card was named."),
		model: M().optional().describe("Which model answered, as `provider:model`, so the chat can name what the reading cost. Absent when no model was asked at all, which a folder match and an empty persona list both are.")
	}), rD = L({ id: Y.describe("Which persona.") }), iD = L({
		personas: I(eD).describe("The characters an agent can wear."),
		connected: I(M()).describe("Which accounts are actually connected right now, so a persona naming one that has since been disconnected can be shown as broken rather than as working.")
	}), aD = L({
		prompt: M().describe("What this persona is told, on top of everything else. Empty means it simply follows the sandbox's own instructions."),
		skills: I(L({
			name: M().describe("The skill's name."),
			description: M().describe("What it is for.")
		})).describe("Skills only this persona's conversations can reach. A different question from what the agent knows generally, with a different answer.")
	}), oD = rD.extend({ prompt: M().max(2e4).describe("What to tell this persona. Sending an empty one removes it entirely rather than storing a blank, so the persona falls back to the sandbox's own instructions.") }), sD = rD.extend(OE.shape), cD = rD.extend({ name: CE.describe("Which skill.") }), lD = L({
		name: M().describe("The skill's name."),
		description: M().describe("What it is for."),
		body: M().describe("The skill itself, in full.")
	});
})), dD, fD = v((() => {
	J(), uD(), $(), dD = {
		list: q.route({
			method: "GET",
			path: "/personas",
			summary: "The characters an agent can wear",
			description: "Each persona with the connected accounts it speaks for, what a conversation wearing it is allowed to do, and where it works."
		}).output(iD),
		save: q.route({
			method: "POST",
			path: "/personas",
			summary: "Create or edit a persona",
			description: "Writes the whole card; sending an id that exists edits it. Nothing is connected, installed or spent by saving one, because a persona only records a decision about accounts that already exist. It is stored as a file you can equally well edit by hand, which is why this writes the card whole rather than patching a field: a round trip through a screen should leave a change a reviewer recognises."
		}).input(eD).output(Z),
		remove: q.route({
			method: "DELETE",
			path: "/personas/{id}",
			summary: "Delete a persona",
			description: "Takes away the character, never the accounts: every login it named stays connected. Its own prompt and skills go with it, since a folder nothing can reach is worse than deleting what somebody just asked to delete. Anything still pointed at it goes quiet rather than falling back to speaking as everyone."
		}).input(rD).output(Z),
		route: q.route({
			method: "POST",
			path: "/personas/route",
			summary: "Which persona a new chat belongs to",
			description: "Reads the message a chat has just been sent, and one line per persona, and names the card it belongs to, or none, along with the model that answered. Costs one small model call on the persona-routing list, and says so. Nothing is applied here: the chat that asked puts the card on, and only when the persona routing setting is on."
		}).input(tD).output(nD),
		kit: q.route({
			method: "GET",
			path: "/personas/{id}/kit",
			summary: "What one persona carries",
			description: "The instructions this persona is given and the skills only its conversations can reach. A different question from what the agent knows generally, with a different answer."
		}).input(rD).output(aD),
		savePrompt: q.route({
			method: "POST",
			path: "/personas/{id}/prompt",
			summary: "Write a persona's instructions",
			description: "Sets what this persona is told. Saving an empty one removes it entirely rather than storing a blank, so the persona simply falls back to the sandbox's own instructions."
		}).input(oD).output(Z),
		readSkill: q.route({
			method: "GET",
			path: "/personas/{id}/skills/read",
			summary: "Read one of a persona's skills",
			description: "The full text of a single skill belonging to this persona."
		}).input(cD).output(lD),
		saveSkill: q.route({
			method: "POST",
			path: "/personas/{id}/skills",
			summary: "Write one of a persona's skills",
			description: "Creates or replaces a skill by name. There is nothing to switch on: a persona's skill is available exactly when that persona is worn, which is what belonging to it has to mean."
		}).input(sD).output(Z),
		removeSkill: q.route({
			method: "POST",
			path: "/personas/{id}/skills/remove",
			summary: "Delete one of a persona's skills",
			description: "Removes a single skill from this persona and leaves the rest of its kit alone."
		}).input(cD).output(Z)
	};
})), pD, mD, hD, gD, _D, vD, yD, bD, xD, SD, CD, wD, TD, ED, DD, OD, kD, AD, jD, MD, ND, PD, FD, ID, LD, RD, zD, BD, VD, HD, UD, WD = v((() => {
	G(), Dp(), $(), Yy(), pD = M().regex(/^[0-9a-f]{4,64}$/), mD = L({
		sha: M().describe("The commit, in full."),
		short: M().describe("The abbreviated form, for showing."),
		parents: I(M()).describe("What it came from. None means the first commit, one is ordinary, two or more is a merge, which is what a graph draws its lanes from."),
		subject: M().describe("Its first line."),
		body: M().describe("Everything after that."),
		author: M().describe("Who wrote it."),
		email: M().describe("Their address."),
		at: P().describe("When they wrote it, in milliseconds."),
		refs: I(M()).describe("Branches and tags sitting on it."),
		head: F().describe("Whether this is where the repository currently stands.")
	}), hD = L({
		repo: M().describe("Which repository."),
		branch: M().optional().describe("Which branch these are from."),
		commits: I(mD).describe("The commits, newest first."),
		hasMore: F().describe("There are older ones behind this page. It is also what stops the last row being drawn as the beginning of history, which is how a truncated log used to claim it started where the page happened to stop.")
	}), gD = Q.extend({
		limit: W().int().positive().max(2e3).optional().describe("How many commits to return."),
		skip: W().int().nonnegative().max(1e6).optional().describe("How many newer commits to step over, which is how you page further back. Paged rather than read whole, because a large repository's history is tens of thousands of rows.")
	}), _D = L({ repos: I(M()).describe("Every repository's id. The workspace itself is always present as \"root\".") }), vD = L({
		repo: M().describe("The workspace repository."),
		host: M().describe("Which forge its remote points at."),
		project: M().describe("Which project there, as owner and name.")
	}), yD = L({ repos: I(vD).describe("Each repository matched to the project its remote points at.") }), bD = Q.extend({
		path: M().min(1).describe("Which file, relative to the repository."),
		content: M().describe("Its whole new contents."),
		message: M().min(1).describe("The commit message.")
	}), xD = L({
		ok: F().describe("Whether the whole thing went through."),
		wrote: F().describe("The file was written."),
		committed: F().describe("The commit was recorded."),
		pushed: F().describe("It reached the remote."),
		branch: M().optional().describe("Which branch it happened on."),
		defaultBranch: M().optional().describe("Which branch the repository considers its main one, so a caller can see it was on a side branch."),
		reason: M().optional().describe("Why it stopped where it did. Being on a side branch, having no remote and having no credentials are all reported here rather than raised.")
	}), SD = Q.extend({ sha: pD.describe("Which commit.") }), CD = L({ files: I(Dy).describe("Which files it touched, with counts but not contents. Fetch any one file's contents separately, so a commit with a thousand files stays one cheap answer.") }), wD = Q.extend({
		sha: pD.describe("Which commit."),
		path: M().min(1).describe("Which file in it.")
	}), TD = Q.extend({
		sha: pD.describe("Which commit to start it at."),
		name: Tp.describe("The new branch's name.")
	}), ED = Q.extend({
		sha: pD.describe("Which commit to tag."),
		name: Tp.describe("The tag's name.")
	}), DD = Q.extend({ ref: Tp.describe("Where to switch to: a branch, a tag, or a commit.") }), OD = Q.extend({
		name: Tp.describe("Which tag."),
		remote: Tp.optional().describe("Also delete it there. Leave it out to remove it locally only.")
	}), kD = Q.extend({
		name: Tp.describe("Which tag."),
		remote: Tp.describe("Which remote to send it to.")
	}), AD = Q.extend({
		sha: pD.describe("Which commit to move the branch to."),
		mode: B([
			"soft",
			"mixed",
			"hard"
		]).describe("How much to take with it: move the branch alone, also unstage, or also throw away what is on disk. The last one takes a checkpoint first.")
	}), jD = Q.extend({ sha: pD.describe("Which commit to act on.") }), MD = L({
		ok: F().describe("Whether it worked."),
		reason: M().optional().describe("Why not, in git's own words. A conflict, a missing remote and missing credentials are all reported here rather than raised, because they are things a screen has to render rather than breakages.")
	}), ND = L({
		ref: M().describe("How to address it, which applying and dropping take."),
		sha: M().describe("The commit behind it, because a stash entry is a commit."),
		short: M().describe("The abbreviated form, for showing."),
		subject: M().describe("What it was set aside as, with git's own scaffolding stripped off."),
		branch: M().optional().describe("Which branch it was set aside from."),
		at: P().describe("When, in milliseconds."),
		parents: I(M()).describe("What it sits on, so a graph can draw it like any other commit.")
	}), PD = L({
		repo: M().describe("Which repository."),
		stashes: I(ND).describe("What is set aside, newest first.")
	}), FD = M().regex(/^stash@\{\d{1,4}\}$/), ID = Q.extend({
		message: M().max(500).optional().describe("What to call it, so you know what it was later."),
		includeUntracked: F().optional().describe("Also set aside files git is not yet tracking, which are otherwise left where they are.")
	}), LD = Q.extend({
		ref: FD.describe("Which entry."),
		pop: F().optional().describe("Remove it from the stash once it has been applied cleanly.")
	}), RD = Q.extend({ ref: FD.describe("Which entry.") }), zD = Q.extend({ ref: FD.describe("Which entry.") }), BD = B([
		"commit",
		"amend",
		"merge",
		"rebase",
		"cherry-pick",
		"revert",
		"reset",
		"pull",
		"other"
	]), VD = L({
		kind: BD.describe("What the last action was."),
		description: M().describe("What undoing it would do, in words."),
		branch: M().describe("Which branch would move."),
		sha: M().describe("Where it stands now."),
		previousSha: M().describe("Where it would go back to. Send this with the undo as proof you looked, so one prepared against a view that has since moved is refused rather than landing somewhere unexamined."),
		changesWorkingTree: F().describe("Undoing would rewrite files as well as moving the branch, so anything offering it should warn about losing work.")
	}), HD = L({
		repo: M().describe("Which repository."),
		action: VD.optional().describe("What undoing would reverse. Absent means there is nothing to go back from.")
	}), UD = Q.extend({
		previousSha: pD.describe("Where to go back to, from the matching read. It is also proof you looked: one prepared against a stale view is refused."),
		discardChanges: F().optional().describe("Also rewrite the files, rather than only moving the branch.")
	});
})), GD, KD = v((() => {
	J(), Yy(), WD(), iv(), $(), GD = {
		changes: q.route({
			method: "GET",
			path: "/git/changes",
			summary: "Uncommitted work across every repo",
			description: "The workspace's whole review set in one answer: every repo that has something uncommitted, and within it every changed file with its status and line counts. This is what the Changes panel draws, and it is the call to make when you want to know whether a workspace is clean without walking the repos yourself."
		}).output(Ry),
		repos: q.route({
			method: "GET",
			path: "/git/repos",
			summary: "Every git repo in the workspace",
			description: "The repos the daemon found under the workspace root, each with the id every other call in this group expects as its `{repo}` segment. The workspace root itself is always present as `root`."
		}).output(_D),
		remoteRepos: q.route({
			method: "GET",
			path: "/git/remote-repos",
			summary: "Repos matched to their remotes",
			description: "The same repo list, but with the forge host and `owner/name` each one's remote points at. Use it to recognise a workspace repo in a list of names that came from somewhere else, such as a set of pull requests. Costs a remote lookup per repo, which is why it is separate from the plain repo list."
		}).output(yD),
		log: q.route({
			method: "GET",
			path: "/git/{repo}/log",
			summary: "Commit history for one repo",
			description: "A page of commits on the current branch, newest first, each with its author, subject, timestamp and the refs pointing at it. Paginate with the cursor the answer hands back rather than by offset, so a commit landing mid-scroll does not shift the page under you."
		}).input(gD).output(hD),
		commitDiff: q.route({
			method: "GET",
			path: "/git/{repo}/commit-diff",
			summary: "What one commit changed",
			description: "The list of files a single commit touched, with per-file status and line counts but not the content. Fetch the content of any one of them with the commit file diff call, so a commit with a thousand files stays one cheap answer."
		}).input(SD).output(CD),
		commitFileDiff: q.route({
			method: "GET",
			path: "/git/{repo}/commit-file-diff",
			summary: "One file's before and after at a commit",
			description: "Both sides of a single file as of one commit: the content its parent had and the content that commit left. The daemon returns whole sides rather than a patch, so a caller can render the comparison however it likes."
		}).input(wD).output(rv),
		operation: q.route({
			method: "GET",
			path: "/git/{repo}/operation",
			summary: "Whether a merge or rebase is halted mid-flight",
			description: "Names the git operation the worktree is stuck inside, if any: a conflicted merge, an interrupted rebase, a half-applied cherry-pick. Check this first when another call refuses, because a halted worktree is the usual reason and the abort call is the way out."
		}).input(Q).output(Fy),
		abort: q.route({
			method: "POST",
			path: "/git/{repo}/abort",
			summary: "Abandon a halted merge or rebase",
			description: "Runs git's own abort for whichever operation has the worktree halted, putting the repo back where it stood before the operation started. Nothing else clears that state."
		}).input(Q).output(MD),
		undoable: q.route({
			method: "GET",
			path: "/git/{repo}/undo",
			summary: "What undoing the last action would do",
			description: "Reads the branch's reflog to describe the move that undo would reverse, and hands back the commit it would land on. Pass that commit to the undo call as proof you looked, and an undo prepared against a view that has since moved is refused rather than landing somewhere unexamined."
		}).input(Q).output(HD),
		undo: q.route({
			method: "POST",
			path: "/git/{repo}/undo",
			summary: "Move the branch back one step",
			description: "Walks the current branch back to where it pointed before its last action. This moves the branch ref and leaves the working tree alone, which is the opposite of restoring a checkpoint. Requires the commit the matching read handed you."
		}).input(UD).output(MD),
		stashes: q.route({
			method: "GET",
			path: "/git/{repo}/stashes",
			summary: "Everything set aside in the stash",
			description: "The repo's stash entries, newest first, each with the message and the commit behind it. A stash entry is a commit, so it reads the same way a log entry does and its contents come back from the stash diff call."
		}).input(Q).output(PD),
		stashDiff: q.route({
			method: "GET",
			path: "/git/{repo}/stash-diff",
			summary: "What one stash entry holds",
			description: "The files a single stash entry would bring back, with per-file status and line counts. The same shape a commit diff has, because a stash entry is a commit."
		}).input(zD).output(CD),
		stashPush: q.route({
			method: "POST",
			path: "/git/{repo}/stash",
			summary: "Set the current changes aside",
			description: "Moves the working tree's changes onto the stash and leaves a clean tree behind. Nothing is lost: the entry is a commit you can inspect, apply or drop afterwards."
		}).input(ID).output(MD),
		stashApply: q.route({
			method: "POST",
			path: "/git/{repo}/stash/apply",
			summary: "Bring a stash entry back",
			description: "Replays one stash entry onto the working tree. A conflict is reported in the answer rather than raised as a failure, because a conflicting apply is an ordinary outcome a screen has to render."
		}).input(LD).output(MD),
		stashDrop: q.route({
			method: "POST",
			path: "/git/{repo}/stash/drop",
			summary: "Discard a stash entry",
			description: "Deletes one stash entry. This is the only unrecoverable call in the stash set, so the daemon takes a checkpoint of the workspace first."
		}).input(RD).output(Z),
		createBranch: q.route({
			method: "POST",
			path: "/git/{repo}/branch",
			summary: "Start a branch at a commit",
			description: "Points a new branch name at any commit, without moving HEAD. Use the checkout call if you also want to switch to it."
		}).input(TD).output(Z),
		createTag: q.route({
			method: "POST",
			path: "/git/{repo}/tag",
			summary: "Tag a commit",
			description: "Puts a tag on any commit. Local only: pushing it to the remote is a separate call."
		}).input(ED).output(Z),
		deleteTag: q.route({
			method: "POST",
			path: "/git/{repo}/tag/delete",
			summary: "Remove a tag",
			description: "Deletes a tag locally. A tag already pushed stays on the remote until it is deleted there too."
		}).input(OD).output(Z),
		pushTag: q.route({
			method: "POST",
			path: "/git/{repo}/tag/push",
			summary: "Send a tag to the remote",
			description: "Pushes one tag to the repo's remote. Reports the outcome rather than failing, since a missing remote or missing credentials are ordinary answers here."
		}).input(kD).output(MD),
		checkout: q.route({
			method: "POST",
			path: "/git/{repo}/checkout",
			summary: "Switch to a branch or commit",
			description: "Moves HEAD to a branch, tag or commit and reshapes the working tree to match. The daemon takes a checkpoint first, so an unexpected result is recoverable. Uncommitted work that would be overwritten is reported instead of being trampled."
		}).input(DD).output(MD),
		cherryPick: q.route({
			method: "POST",
			path: "/git/{repo}/cherry-pick",
			summary: "Replay one commit onto this branch",
			description: "Applies a single commit's changes on top of the current branch as a new commit. A conflict comes back in the answer, with the halted state readable from the operation call."
		}).input(jD).output(MD),
		revert: q.route({
			method: "POST",
			path: "/git/{repo}/revert",
			summary: "Undo a commit with a new commit",
			description: "Adds a commit that reverses an earlier one, leaving the history intact. This is the safe way to take something back on a branch other people have pulled."
		}).input(jD).output(MD),
		drop: q.route({
			method: "POST",
			path: "/git/{repo}/drop",
			summary: "Remove a commit from history",
			description: "Rewrites the branch so one commit is no longer in it. History changes, so this is for branches nobody else has pulled. A checkpoint is taken first."
		}).input(jD).output(MD),
		merge: q.route({
			method: "POST",
			path: "/git/{repo}/merge",
			summary: "Merge another branch in",
			description: "Merges a branch or commit into the current one. Conflicts are reported in the answer and leave the worktree halted, which the operation call explains and the abort call clears."
		}).input(jD).output(MD),
		rebase: q.route({
			method: "POST",
			path: "/git/{repo}/rebase",
			summary: "Replay this branch onto another",
			description: "Moves the current branch's commits on top of a different base. History changes. Conflicts halt the rebase and are reported rather than raised, so the operation and abort calls are the way through."
		}).input(jD).output(MD),
		reset: q.route({
			method: "POST",
			path: "/git/{repo}/reset",
			summary: "Move the branch to a commit",
			description: "Repoints the current branch at another commit, optionally reshaping the working tree to match. The destructive modes take a checkpoint first."
		}).input(AD).output(MD),
		fileDiff: q.route({
			method: "GET",
			path: "/git/{repo}/file-diff",
			summary: "One file's committed and working copies",
			description: "Both sides of a file as it stands right now: what the last commit holds and what is on disk. This is what a review pane shows for an uncommitted change."
		}).input(Cy).output(rv),
		status: q.route({
			method: "GET",
			path: "/git/{repo}/status",
			summary: "One repo's branch and pending changes",
			description: "The current branch, its sync position against the remote, and every staged, unstaged and untracked path. The single-repo counterpart to the workspace-wide changes call."
		}).input(Q).output(wy),
		commit: q.route({
			method: "POST",
			path: "/git/{repo}/commit",
			summary: "Commit the pending changes",
			description: "Records a commit with your message. It commits whatever is staged; add `stage` to stage something first — an empty object for everything pending, or a scope such as one side or one conversation's landed files. The answer carries the commit it created."
		}).input(hy).output(zy),
		discard: q.route({
			method: "POST",
			path: "/git/{repo}/discard",
			summary: "Throw away pending changes",
			description: "Restores files to their committed state and deletes untracked ones. Name paths or a scope to narrow it; with neither it throws away every uncommitted change in the repository. The daemon checkpoints the workspace first, so this is recoverable from the timeline."
		}).input(gy).output(Z),
		stage: q.route({
			method: "POST",
			path: "/git/{repo}/stage",
			summary: "Mark changes for the next commit",
			description: "Adds changes to the index: exactly the paths you name, everything a scope describes, or the whole repository when you name neither. Nothing on disk changes, so this is always safe and always reversible with the unstage call."
		}).input(_y).output(Z),
		unstage: q.route({
			method: "POST",
			path: "/git/{repo}/unstage",
			summary: "Take changes back out of the next commit",
			description: "Removes changes from the index and leaves the files themselves untouched, on the same terms as staging. The exact reverse of it."
		}).input(_y).output(Z),
		branches: q.route({
			method: "GET",
			path: "/git/{repo}/branches",
			summary: "Local branches and how far each has drifted",
			description: "Every local branch with how many commits it sits ahead of and behind its remote counterpart, so a branch switcher can show sync state without a call per branch."
		}).input(Q).output(jy),
		createBranchAt: q.route({
			method: "POST",
			path: "/git/{repo}/branches",
			summary: "Create a branch from a starting point",
			description: "Makes a branch at a named start point and optionally switches to it. The branch-switcher counterpart to creating a branch at a specific commit."
		}).input(My).output(Z),
		deleteBranch: q.route({
			method: "POST",
			path: "/git/{repo}/branches/delete",
			summary: "Delete a local branch",
			description: "Removes a branch from the repo. Unmerged work is refused unless you ask for it to be forced, and the remote branch is untouched either way."
		}).input(Ny).output(Z),
		remote: q.route({
			method: "GET",
			path: "/git/{repo}/remote",
			summary: "Sync position against the remote",
			description: "How far the current branch sits ahead of and behind its remote, as of the last fetch, plus whether a remote and working credentials exist at all. This is a read of what the daemon already knows, not a network call, which is why fetching is a separate button."
		}).input(Q).output(Oy),
		fetch: q.route({
			method: "POST",
			path: "/git/{repo}/fetch",
			summary: "Refresh what the remote holds",
			description: "Contacts the remote and updates the daemon's picture of it without touching your branch. Run this before trusting the sync position."
		}).input(Q).output(MD),
		pull: q.route({
			method: "POST",
			path: "/git/{repo}/pull",
			summary: "Bring remote commits down",
			description: "Fetches and integrates the remote's commits into the current branch. A pull that cannot fast-forward is reported in the answer rather than raised, because that is an ordinary thing to be told."
		}).input(Q).output(MD),
		push: q.route({
			method: "POST",
			path: "/git/{repo}/push",
			summary: "Start sending commits to the remote",
			description: "Starts pushing the current branch, setting its upstream on first push, and answers at once: the push runs in a real terminal (it runs this repository's pre-push hook, which can be a whole suite), so watch it there and poll pushState for the verdict. A second start while one is going joins it rather than pushing twice."
		}).input(vy).output(Z),
		pushState: q.route({
			method: "GET",
			path: "/git/{repo}/push",
			summary: "How the push is going",
			description: "The verdict, or the progress so far: where it is, the terminal it runs in, and for a push that did not go, git's last words and who refused it, the repository's own pre-push hook, the remote, or the transport. Idle when nothing has been started for this repository."
		}).input(Q).output(by),
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
		}).input(Q).output(Ty),
		readFile: q.route({
			method: "GET",
			path: "/git/{repo}/file",
			summary: "Read a file from the repo",
			description: "The contents of one file as it stands on disk. A path that climbs out of the repo is refused."
		}).input(xy).output(Ey),
		writeFile: q.route({
			method: "PUT",
			path: "/git/{repo}/file",
			summary: "Write a file into the repo",
			description: "Replaces one file's contents, creating it and its parent folders if they are missing. Nothing is committed: the change shows up as pending work."
		}).input(Sy).output(Z),
		publishFile: q.route({
			method: "POST",
			path: "/git/{repo}/publish-file",
			summary: "Write, commit and push one file",
			description: "The three steps as a single call with a single answer, committing only the path you named and leaving any other pending work alone. Being on a side branch, having no remote and having no credentials are all reported rather than raised."
		}).input(bD).output(xD)
	};
})), qD, JD = v((() => {
	J(), iv(), $(), qD = {
		list: q.route({
			method: "GET",
			path: "/history/snapshots",
			summary: "Points you can go back to",
			description: "The saved states of the whole workspace, taken automatically as work happens. This is the timeline behind undoing a change that was never committed."
		}).output(Y_),
		diff: q.route({
			method: "GET",
			path: "/history/diff",
			summary: "What changed since a saved point",
			description: "The files that differ between one saved point and the one before it, taking in everything that happened in between."
		}).input(Q_).output(ev),
		fileDiff: q.route({
			method: "GET",
			path: "/history/file-diff",
			summary: "One file's before and after across a saved point",
			description: "Both sides of a single file at one point in the timeline."
		}).input(tv).output(rv),
		restore: q.route({
			method: "POST",
			path: "/history/restore",
			summary: "Put the workspace back",
			description: "Returns every file to how it stood at a saved point. This restores the files; moving a branch is a different thing and lives with the git calls."
		}).input(Q_).output(Z)
	};
})), YD, XD = v((() => {
	G(), YD = L({ args: I(M()) });
})), ZD, QD = v((() => {
	J(), rx(), XD(), $(), ZD = {
		run: q.route({
			method: "POST",
			path: "/intentic",
			summary: "Run an infrastructure command",
			description: "Runs the sandbox's own command-line tool and streams its output as it arrives, so progress is visible rather than arriving all at once at the end. A failure surfaces once the stream closes."
		}).input(YD).output(K(Bb)),
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
		}).output(K(Bb))
	};
})), $D, eO = v((() => {
	J(), jx(), $D = {
		list: q.route({
			method: "GET",
			path: "/inventory",
			summary: "Machines and services you have declared",
			description: "What the deployment configuration says this setup owns and what it wants provisioned."
		}).output(Ax),
		add: q.route({
			method: "POST",
			path: "/inventory",
			summary: "Declare a machine or service",
			description: "Writes the entry into the configuration file and commits it, exactly as an agent editing that file by hand would. Answers with the whole updated list, so a screen redraws from one response."
		}).input(Ox).output(Ax),
		remove: q.route({
			method: "DELETE",
			path: "/inventory/{name}",
			summary: "Undeclare a machine or service",
			description: "Takes the entry back out of the configuration and commits that too. Answers with the whole updated list."
		}).input(kx).output(Ax)
	};
})), tO, nO = v((() => {
	J(), wv(), $(), tO = {
		list: q.route({
			method: "GET",
			path: "/issues",
			summary: "Bugs your users have reported",
			description: "Everything that has crashed or been written in, grouped so a crash that hit a thousand people is one row with a count."
		}).output(_v),
		status: q.route({
			method: "POST",
			path: "/issues/{id}/status",
			summary: "File one away, or reopen it",
			description: "Moves one issue between open, resolved and ignored. Resolving does not close anything upstream: it is your own inbox."
		}).input(yv).output(Z),
		investigate: q.route({
			method: "POST",
			path: "/issues/{id}/investigate",
			summary: "Put an agent on it now",
			description: "Starts a turn on this issue with the crash, its stack and what led up to it as the brief. Answers straight away and runs detached; the issue goes to 'being looked at'."
		}).input(vv).output(Z),
		remove: q.route({
			method: "DELETE",
			path: "/issues/{id}",
			summary: "Throw one away",
			description: "Forgets an issue entirely. It will come back as new if it happens again, which is usually what you want."
		}).input(vv).output(Z),
		installs: q.route({
			method: "GET",
			path: "/issues/installs/{automationId}",
			summary: "Which sites have loaded the reporter",
			description: "The sites whose pages actually loaded this intake's script, and the ones that were turned away. The answer to 'did the snippet land?', which an empty inbox cannot give you."
		}).input(Cv).output(Sv)
	};
})), rO, iO, aO, oO, sO, cO, lO, uO, dO = v((() => {
	G(), rO = L({
		name: M().describe("Its name, which is what the read route takes."),
		sizeBytes: P().describe("Size in bytes."),
		modifiedAt: P().describe("When it last changed, in milliseconds.")
	}), iO = L({ files: I(rO).describe("Every log the sandbox keeps: captured terminal output, command runs, and its own log.") }), aO = L({
		name: M().min(1).describe("Which log. It travels in the query rather than the address, because log names contain slashes."),
		bytes: W().min(1).max(1048576).default(65536).describe("How much of the end to read. The newest bytes win when the file is larger.")
	}), oO = L({
		name: M().describe("Which log this is from."),
		sizeBytes: P().describe("How large the whole file is."),
		text: M().describe("The end of it, as text."),
		truncated: F().describe("There is more before what you got.")
	}), sO = L({
		seenAt: P().describe("When the browser saw it, in milliseconds."),
		level: B(["warn", "error"]).describe("How bad it was."),
		event: M().min(1).max(100).describe("What kind of thing it was, as a stable name."),
		message: M().max(2e3).describe("What it said."),
		route: M().max(300).optional().describe("Which page they were on."),
		requestId: M().max(100).optional().describe("Which daemon call it belonged to, when it belonged to one."),
		build: M().max(100).optional().describe("Which build of the app was running."),
		fields: z(M().max(60), ku([
			M().max(4e3),
			P(),
			F()
		])).optional().describe("Whatever else was worth keeping.")
	}), cO = L({ events: I(sO).min(1).max(50).describe("What the browser has to report, oldest first.") }), lO = L({ recorded: P().describe("How many were written down.") }), uO = L({
		clientId: M().describe("This connection's own id, the same one it gave the event stream."),
		idle: F().describe("Whether the person has stopped doing anything."),
		view: M().optional().describe("Which view they are on."),
		sessionId: M().optional().describe("Which conversation they have open."),
		path: M().optional().describe("Which file they are looking at. Sent whole rather than merged: leaving a field out clears it, so a tab that closes a file drops the path in the same report.")
	});
})), fO, pO = v((() => {
	J(), dO(), fO = {
		list: q.route({
			method: "GET",
			path: "/logs",
			summary: "Logs the sandbox keeps",
			description: "Every log file the daemon owns: captured terminal output, command runs, and the daemon's own log. Read-only, because only the sandbox writes them."
		}).output(iO),
		read: q.route({
			method: "GET",
			path: "/logs/file",
			summary: "Read part of a log",
			description: "A window of one log file's text. A window rather than the whole thing, because a busy log outgrows any single answer."
		}).input(aO).output(oO),
		report: q.route({
			method: "POST",
			path: "/logs/client",
			summary: "Report what the browser saw",
			description: "Errors the app caught, stalls it measured, and recoveries it performed, written to a log of their own. The browser is the only witness to these, so without it a bug someone hit in their own browser leaves no record at all."
		}).input(cO).output(lO)
	};
})), mO, hO = v((() => {
	J(), sg(), $(), mO = {
		list: q.route({
			method: "GET",
			path: "/loops",
			summary: "Every loop that has run",
			description: "The loops this workspace has run, newest first, kept after they end. Why it stopped on the fourth round is the question a loop gets read for, and the round-by-round history is the answer."
		}).output(tg),
		start: q.route({
			method: "POST",
			path: "/loops",
			summary: "Run a conversation until it is done",
			description: "Starts repeating a conversation towards a goal and answers straight away with the loop as recorded; the work carries on without you. The conversation need not exist yet, so run this until it passes can be the first thing you ever say to a new agent. A conversation already looping is refused."
		}).input(Zh).output(eg),
		stop: q.route({
			method: "POST",
			path: "/loops/{conversationId}/stop",
			summary: "Make this round the last",
			description: "Means do not start another round, not stop what is running. Somebody watching the sixth round do good work can say this is the last one without throwing that work away. To cut the current round off as well, stop the conversation too."
		}).input(ng).output(Z),
		designs: q.route({
			method: "GET",
			path: "/loops/designs",
			summary: "Saved loop designs",
			description: "Loops somebody authored once and can point at a different job each time. A saved loop is the same loop with its goal left blank until you type one, not a different feature."
		}).output(ig),
		saveDesign: q.route({
			method: "POST",
			path: "/loops/designs",
			summary: "Create or replace a saved loop",
			description: "Say which of the two you mean, so a name that happens to collide cannot silently overwrite somebody's work. A design that could never finish, with nothing to produce and nothing to check, is refused in the same words an ad-hoc loop would be: catching that at save time is the whole advantage of saving."
		}).input(ag).output(rg),
		removeDesign: q.route({
			method: "DELETE",
			path: "/loops/designs/{id}",
			summary: "Delete a saved loop",
			description: "Removes the design. A loop already running from it keeps going on its own terms, because it took a copy of what it needed when it started."
		}).input(og).output(Z)
	};
})), gO, _O, vO, yO, bO = v((() => {
	G(), gO = B([
		"launching",
		"installing",
		"starting",
		"exited"
	]), _O = L({
		repo: M().describe("Which repository."),
		hasPanel: F().describe("Whether it has anything runnable at all."),
		running: F().describe("Whether the sandbox has it running."),
		installed: F().describe("Whether its dependencies are installed, which is what decides whether a start takes seconds or an install first."),
		launch: gO.optional().describe("Where a start the sandbox is running has got to: its shell coming up, installing, its dev command running with nothing listening yet, or exited back to a prompt. Absent when nothing is starting and once it serves."),
		healthy: F().describe("Whether anything it owns is actually answering. A different question: a server still installing is running and not yet healthy, and one somebody started by hand is healthy without the sandbox running it."),
		port: P().optional().describe("The port the sandbox told it to use. What it actually bound is below, and for a repository that pins its own ports those are different numbers."),
		servers: I(L({
			port: P().describe("The port it is listening on, which is what forwarding it takes."),
			url: M().describe("Where it answers, with the right scheme: a server on its own certificate is served over https."),
			dir: M().optional().describe("Which part of the repository it belongs to, which for a repository whose dev command fans out is the only thing telling them apart."),
			session: M().optional().describe("The terminal it runs in: the sandbox's when it started it, yours when you did, and absent when nothing here owns it, which is the case worth designing for.")
		})).describe("Every server this repository is really serving, found by looking at what is listening. Empty when nothing answers."),
		previewUrl: M().optional().describe("Where to open it from outside, present only while that address really serves it. Absent on a sandbox with no outside address."),
		role: B([
			"intent",
			"desired-state",
			"app"
		]).optional().describe("Which of the workspace's three fixed roles this repository fills. Absent for one that was simply cloned in."),
		deployConfig: F().describe("It declares infrastructure."),
		desiredState: F().describe("That declaration has been resolved at least once."),
		directoryUi: F().describe("It carries a small interface of its own."),
		monorepo: F().describe("It holds several packages."),
		vitest: F().describe("It has tests that can be run."),
		userStories: F().describe("It carries stories an agent could test the running app against. The one fact here that says nothing about the language."),
		docs: F().describe("It carries generated architecture documentation.")
	}), vO = L({ panels: I(_O).describe("One entry per repository, worked out in a single pass so nothing has to walk the workspace file by file.") }), yO = L({ repo: M().describe("Which repository.") });
})), xO, SO = v((() => {
	J(), bO(), $(), xO = {
		list: q.route({
			method: "GET",
			path: "/panels",
			summary: "Repos you can run and preview",
			description: "Every repo with whether its dev server is up and what the sandbox worked out about its contents."
		}).output(vO),
		start: q.route({
			method: "POST",
			path: "/panels/{repo}/start",
			summary: "Start a repo's dev server",
			description: "Brings the repo's own runnable app up in a terminal you can attach to, so its preview address starts answering."
		}).input(yO).output(Z),
		stop: q.route({
			method: "POST",
			path: "/panels/{repo}/stop",
			summary: "Stop a repo's dev server",
			description: "Shuts it down and frees the port."
		}).input(yO).output(Z)
	};
})), CO, wO, TO, EO, DO = v((() => {
	G(), CO = L({
		port: P().describe("The port number."),
		host: B(["127.0.0.1", "::1"]).describe("Which loopback address it actually answers on. Some tools bind only one of the two, and anything dialling it has to know which."),
		forwardable: F().describe("Whether it can be exposed at all. Some listeners answer only at their own address and nowhere else; those are listed for honesty and refused for forwarding."),
		kind: B(["workspace", "system"]).describe("Whether somebody's own work put it there, or the sandbox's own machinery did. Only the first kind is worth previewing."),
		title: M().describe("What a person would call it. Always present: a listener nothing can explain is still named, because the button beside it publishes the port to the internet."),
		purpose: M().describe("One sentence about what it is for, including when the honest answer is that nothing could work it out."),
		origin: B([
			"terminal",
			"agent",
			"panel",
			"extension",
			"container",
			"sandbox",
			"unknown"
		]).describe("Who put it there, which is the question somebody is really asking: mine, my agent's, or the box's own."),
		pid: P().optional().describe("The process holding it. Absent when nothing could be matched to the socket."),
		command: M().optional().describe("The command behind it, as it was run. Absent only when nothing could be attributed at all."),
		cwd: M().optional().describe("Where it is running from, which is how a port gets attributed to a repository."),
		session: M().optional().describe("The terminal it came from, to watch it in or stop it from. Absent when nothing in its ancestry is one, which is the honest \"you cannot reach this from here\"."),
		forwarded: F().describe("Whether it is currently reachable from outside."),
		previewUrl: M().optional().describe("Where to open it. Present only while forwarded, and only on a sandbox that has an outside address.")
	}), wO = L({ ports: I(CO).describe("Everything listening inside the sandbox right now, read fresh each time rather than from a register the sandbox keeps.") }), TO = L({ port: P().int().min(1).max(65535).describe("Which port.") }), EO = L({ previewUrl: M().optional().describe("Where it can now be reached. Absent on a sandbox with no outside address, where the mapping exists but has no public name.") });
})), OO, kO = v((() => {
	J(), DO(), $(), OO = {
		list: q.route({
			method: "GET",
			path: "/ports",
			summary: "What is listening inside the sandbox",
			description: "Every port something is answering on, and whether each one is reachable from outside."
		}).output(wO),
		forward: q.route({
			method: "POST",
			path: "/ports/forward",
			summary: "Make a port reachable",
			description: "Gives one port an address on the outside. Asking twice is harmless: the second call hands back the address the first one made."
		}).input(TO).output(EO),
		unforward: q.route({
			method: "POST",
			path: "/ports/unforward",
			summary: "Stop exposing a port",
			description: "Frees the slot at once. The address keeps resolving; it simply stops leading anywhere."
		}).input(TO).output(Z)
	};
})), AO, jO, MO, NO, PO, FO = v((() => {
	G(), AO = L({
		path: M().describe("Where it sits inside the outbox."),
		size: P().describe("Size in bytes."),
		modifiedAt: P().describe("When it last changed, in milliseconds."),
		url: M().optional().describe("Its public address. Absent when this sandbox has no outside address, or when the file is being refused."),
		blocked: M().optional().describe("Why a file sitting in the outbox is not being served: a hidden name, a credential-shaped name, contents that look like a token, or sheer size. Only the publisher sees this; a stranger asking for the same file gets the same nothing every other miss gets.")
	}), jO = L({
		url: M().optional().describe("Your public address, which every file's own hangs off. Absent on a sandbox with nowhere to publish to."),
		files: I(AO).describe("What the outbox holds.")
	}), MO = L({ path: M().min(1).describe("What to publish, as a workspace path. It is copied rather than moved, so a repository does not lose its build output because somebody shared it.") }), NO = L({ path: M().min(1).describe("What to withdraw, as a path inside the outbox rather than a workspace path.") }), PO = L({
		path: M().describe("Where it landed inside the outbox."),
		url: M().optional().describe("Its public address. Absent on a sandbox with nowhere to publish to.")
	});
})), IO, LO = v((() => {
	J(), FO(), $(), IO = {
		list: q.route({
			method: "GET",
			path: "/public",
			summary: "What is published to the internet",
			description: "Everything currently in the outbox and the address it answers on. There is no call to read a published file back: it is served openly to anyone with the link, which is the entire point of having put it there."
		}).output(jO),
		publish: q.route({
			method: "POST",
			path: "/public/publish",
			summary: "Put a file on the internet",
			description: "Copies a workspace file or folder into the outbox, where it is served to anyone with the link and no sign-in. Answers with the address."
		}).input(MO).output(PO),
		unpublish: q.route({
			method: "POST",
			path: "/public/unpublish",
			summary: "Take something off the internet",
			description: "Withdraws one published entry. When the last one goes, the outbox goes with it, so its existing at all always means something is published."
		}).input(NO).output(Z)
	};
})), RO, zO, BO = v((() => {
	J(), G(), sy(), $(), RO = L({ repos: I(M().min(1)).max(100).default([]).describe("The repositories going out, by workspace id. Empty runs only what stands for every push, whichever repository it is.") }).prefault({}), zO = {
		state: q.route({
			method: "GET",
			path: "/prepush/state",
			summary: "How the pre-push check is going",
			description: "The verdict, or the progress so far. Nothing is addressed by id here, because there is one working tree and so exactly one check."
		}).output(oy),
		run: q.route({
			method: "POST",
			path: "/prepush/run",
			summary: "Run the checks before pushing",
			description: "Starts the suite the workspace runs before anything leaves the machine, and answers immediately. A suite takes minutes, and a request held open that long dies at the first proxy. It runs in a real terminal, so watch it there and poll for the verdict. Name the repositories going out, and each one's own checks run in its own directory."
		}).input(RO).output(Z),
		cancel: q.route({
			method: "POST",
			path: "/prepush/cancel",
			summary: "Stop the pre-push check",
			description: "Kills the run. It settles as cancelled and the push it was gating does not go."
		}).output(Z)
	};
})), VO, HO, UO = v((() => {
	J(), G(), X(), Dm(), VO = L({
		agents: I(L({
			id: M(),
			label: M()
		})).describe("ACP agents installed here. The id is the provider id itself, the label its display name."),
		endpoints: I(L({
			id: M(),
			label: M(),
			kind: B(["endpoint", "localmodel"])
		})).describe("Model endpoints, already prefixed `endpoint/`, including the daemon-provisioned free trial.")
	}), HO = {
		list: q.route({
			method: "GET",
			path: "/providers",
			summary: "Providers a chat can run on here",
			description: "The installed ACP agents and model endpoints, which are the providers this sandbox adds to the fixed native list. A read for anyone who may watch or drive a turn: it names what a message can be addressed to, not what credential stands behind it."
		}).output(VO),
		models: q.route({
			method: "GET",
			path: "/providers/{provider}/models",
			summary: "Models one provider offers",
			description: "Every model this provider serves and which one it defaults to. Never empty: it is discovered live with a stored list behind it. The order is the provider's own preference and is not rearranged here."
		}).input(kp).output(Em)
	};
})), WO, GO, KO, qO, JO, YO, XO, ZO = v((() => {
	G(), WO = L({
		kind: V("webpush").describe("A browser, which the sandbox can reach directly and encrypt end to end."),
		endpoint: N().describe("Where that browser's push service accepts sends. It also identifies the device everywhere else in this group."),
		keys: L({
			p256dh: M().min(1).describe("The browser's public key, for encrypting what is sent."),
			auth: M().min(1).describe("The browser's secret, for the same.")
		}).describe("What the browser handed you when it subscribed. Post it back exactly as it came; nothing reshapes it.")
	}), GO = L({
		kind: V("relay").describe("A native app, whose operating system only accepts sends from the app's publisher, so the sandbox posts through a relay instead. The message passes through that relay readable, which is the price of the publisher having to be in the loop."),
		url: N().describe("Where to post a send. Recorded rather than assumed, so the sandbox need not know any platform by name."),
		deviceId: M().min(1).describe("The device's id, which also identifies this registration everywhere else in this group."),
		secret: M().min(1).describe("Proof that this sandbox may notify this device. The relay never learns which sandbox is calling.")
	}), KO = R("kind", [WO, GO]), L({
		title: M().min(1).describe("The headline."),
		body: M().describe("The line under it. Push services cap the whole payload at a few kilobytes, which is why nothing here carries a transcript or a diff: a notification is a pointer back, not a delivery."),
		url: M().optional().describe("Where tapping it goes. An existing tab is focused rather than a new one opened."),
		tag: M().optional().describe("Collapses repeats: a second notification with the same tag replaces the first instead of stacking beside it."),
		requireInteraction: F().optional().describe("Keep it on screen until it is dismissed. Used when the agent is waiting for you, where one that fades away is a question that went unanswered in silence.")
	}), qO = L({
		publicKey: M().describe("The key a browser needs in order to subscribe. Native apps ignore it."),
		subscribed: F().describe("Whether the asking device is already registered, so a toggle can show its real state instead of trusting the device's own permission, which can be granted with nothing behind it.")
	}), JO = L({ id: M().min(1).describe("Which device: a browser's push address, or a native install's device id.") }), YO = L({ id: M().min(1).optional().describe("Which device is asking. Without it the answer can only speak for the sandbox as a whole, which is rarely the question.") }), XO = L({ delivered: P().int().nonnegative().describe("How many devices actually accepted it. A count rather than a yes, because this button exists to prove a chain nobody can inspect, and the sandbox having accepted the request is not the question being asked.") });
})), QO, $O = v((() => {
	J(), ZO(), $(), QO = {
		config: q.route({
			method: "GET",
			path: "/push/config",
			summary: "What a device needs to subscribe",
			description: "The public key and settings a browser or app needs before it can register for notifications from this sandbox."
		}).input(YO).output(qO),
		subscribe: q.route({
			method: "POST",
			path: "/push/subscribe",
			summary: "Send notifications to this device",
			description: "Registers one device. The sandbox only interrupts you on the three moments where attention is genuinely wanted: a turn has finished, the agent is stuck on a question, and something is waiting for approval."
		}).input(KO).output(Z),
		unsubscribe: q.route({
			method: "POST",
			path: "/push/unsubscribe",
			summary: "Stop notifying a device",
			description: "Removes one registered device. Others keep receiving."
		}).input(JO).output(Z),
		test: q.route({
			method: "POST",
			path: "/push/test",
			summary: "Send a test notification",
			description: "Proves the whole chain end to end. Worth having, because there are four separate places a notification can be lost that nobody can inspect from the outside: the device's permission, its registration, the sandbox's key, and the delivery service."
		}).output(XO)
	};
})), ek, tk = v((() => {
	J(), lE(), $(), G(), ek = {
		policy: q.route({
			method: "GET",
			path: "/safety/policy",
			summary: "The safety policy this sandbox is judged against",
			description: "The document that decides when an agent stops to ask you before running something. Prose, not settings: it is read by the model that judges each command. When nobody has written one, this is the text the product ships with, and it describes the behaviour a fresh sandbox already has."
		}).output(cE),
		setPolicy: q.route({
			method: "POST",
			path: "/safety/policy",
			summary: "Rewrite the safety policy",
			description: "Replaces the document whole. Nothing in it can widen what the sandbox is structurally allowed to do: it decides which of the things an agent may already do are worth interrupting you about."
		}).input(L({ text: M().describe("The policy, as you want it written.") })).output(Z),
		log: q.route({
			method: "GET",
			path: "/safety/log",
			summary: "Recent safety verdicts",
			description: "What was judged lately, what the judge decided, and whether you were interrupted. Newest first. This is where you find out why you were not asked about something, which is the question a policy page otherwise cannot answer."
		}).output(I(sE))
	};
})), nk, rk = v((() => {
	J(), nh(), $(), nk = {
		set: q.route({
			method: "POST",
			path: "/secrets",
			summary: "Store a secret",
			description: "Writes one name and value into the sandbox's own store, where running processes pick it up without a restart. Refused until the sandbox has somewhere to keep them."
		}).input(Hm).output(Z),
		list: q.route({
			method: "GET",
			path: "/secrets",
			summary: "Names of the stored secrets",
			description: "Which secrets exist here. Names only, never values."
		}).output(Um),
		remove: q.route({
			method: "DELETE",
			path: "/secrets/{key}",
			summary: "Delete a secret",
			description: "Removes one by name."
		}).input(Wm).output(Z),
		inventory: q.route({
			method: "GET",
			path: "/secrets/inventory",
			summary: "Every secret this sandbox holds, from everywhere",
			description: "One view across all the places secrets live here: what exists, where it came from and whether it is working. Never any values. This one always answers, even before there is a store to write to."
		}).output(th),
		reveal: q.route({
			method: "POST",
			path: "/secrets/reveal",
			summary: "Show one secret's value",
			description: "The only call that hands a value back, and it is for the owner alone. Sent as a body rather than in the address, so the name never ends up in a log or a browser's history."
		}).input(Wm).output(Gm),
		gates: q.route({
			method: "GET",
			path: "/secrets/gates",
			summary: "Which credentials need somebody's approval",
			description: "What is gated and who may release it. Names and addresses only, never values, and the agent may read it too: knowing a credential needs Bob is what stops it concluding the account is simply not connected."
		}).output(Xm),
		setGate: q.route({
			method: "PUT",
			path: "/secrets/gates/{subject}",
			summary: "Put a credential behind named approvers",
			description: "Names exactly who may release one secret or one connected account, and how far a single release goes. The owner's call alone. A signed-in browser or a mounted server cannot be released for one use, so those are always for the rest of the conversation."
		}).input(Ym).output(Z),
		removeGate: q.route({
			method: "DELETE",
			path: "/secrets/gates/{subject}",
			summary: "Stop requiring approval for a credential",
			description: "Removes one gate, so the agent can use that credential the way it uses any other. The owner's call alone."
		}).input(Zm).output(Z),
		request: q.route({
			method: "POST",
			path: "/secrets/request",
			summary: "Ask a named person to release a credential",
			description: "Raises the release card in the live conversation and waits for one of the people named on it. Refused, rather than held, when there is nobody to ask: an unattended turn, no live conversation, or a click with no verified identity behind it."
		}).input(Qm).output($m)
	};
})), ik, ak, ok, sk = v((() => {
	G(), Ug(), ik = L({ id: M().describe("Which past conversation.") }), ak = L({
		id: M().describe("Its id."),
		title: M().describe("What it is called."),
		updatedAt: P().describe("When it last moved, in milliseconds."),
		snippet: Dg.optional().describe("Why a search matched: the line it hit, with a little around it, and who said it. Absent on an unfiltered list, and on a match the title already shows, where repeating it would be noise rather than evidence.")
	}), ok = L({ sessions: I(ak).describe("Past conversations, newest first.") });
})), ck, lk = v((() => {
	J(), G(), B_(), sk(), ck = {
		list: q.route({
			method: "GET",
			path: "/sessions",
			summary: "Past conversations in this workspace",
			description: "Summaries for a history menu, filtered when you pass a search. Covers conversations that worked in their own private copies too, so nothing is hidden just because it happened on a branch."
		}).input(L({
			query: M().optional(),
			caseSensitive: Wd().optional()
		})).output(ok),
		get: q.route({
			method: "GET",
			path: "/sessions/{id}",
			summary: "Read one past conversation",
			description: "The full record of a single conversation, restored for display."
		}).input(ik).output(L_)
	};
})), uk, dk, fk, pk, mk, hk = v((() => {
	G(), L({
		at: P().describe("When the turn ended, in milliseconds."),
		day: M().describe("The day it fell in, as YYYY-MM-DD in UTC, worked out once so nothing downstream has to do timezone arithmetic."),
		provider: M().describe("Which model provider served it."),
		account: M().optional().describe("Which account paid. Absent for a turn run on a plain key, which belongs to no account."),
		model: M().optional().describe("The model that actually ran, past whatever was asked for and every default. Absent only when the provider's own default served it without being named."),
		modelRequested: M().optional().describe("The model that was asked for, when one was named. Differs from `model` when something resolved it."),
		harness: M().describe("Which agentic loop it ran on."),
		outcome: B([
			"ok",
			"error",
			"cancelled"
		]).optional().describe("How it ended: finished, failed, or was stopped by the user."),
		errorCode: M().optional().describe("The failure's code, when it had one."),
		errorMessage: M().optional().describe("What the failure said, trimmed."),
		conversationId: M().optional().describe("Which conversation it belonged to, so spending can be traced to a card. Absent only for an internal one-off with no conversation at all."),
		turns: P().describe("The provider's own count for the request, since one exchange can be several under the hood. One when it reported none."),
		inputTokens: P().describe("Tokens sent."),
		outputTokens: P().describe("Tokens received."),
		cacheReadTokens: P().describe("Tokens served from cache, which cost less."),
		cacheCreationTokens: P().describe("Tokens written to cache, which cost more up front and less afterwards."),
		costUsd: P().describe("What it cost, in dollars."),
		durationMs: P().describe("How long it took, in milliseconds."),
		iqSearchArm: F().optional(),
		iqSearchCohort: M().optional(),
		searchCalls: P().optional(),
		openingSearches: P().optional(),
		openingListings: P().optional(),
		callsBeforeTarget: P().optional(),
		mapArm: F().optional(),
		mapChars: P().optional(),
		turnIndex: P().optional(),
		verification: B([
			"verified",
			"unproven",
			"failing",
			"no-code"
		]).optional(),
		check: M().optional(),
		filesEdited: P().optional(),
		toolCalls: P().optional(),
		checklistTotal: P().optional(),
		checklistOpen: P().optional(),
		compactions: P().optional(),
		contextTokens: P().optional(),
		contextWindow: P().optional(),
		tierScore: P().optional(),
		tierRules: I(M()).optional(),
		tierRouted: F().optional(),
		tierFast: F().optional(),
		tierCeiling: P().optional(),
		tierDenied: F().optional()
	}), uk = L({
		day: M().describe("The day, as YYYY-MM-DD in UTC."),
		provider: M().describe("Which model provider."),
		account: M().optional().describe("Which account. Absent for work run on a plain key."),
		model: M().optional().describe("Which model."),
		harness: M().describe("Which agentic loop."),
		conversationId: M().optional().describe("Which conversation."),
		turns: P().describe("Turns in this group."),
		inputTokens: P().describe("Tokens sent."),
		outputTokens: P().describe("Tokens received."),
		cacheReadTokens: P().describe("Tokens served from cache."),
		cacheCreationTokens: P().describe("Tokens written to cache."),
		costUsd: P().describe("What the group cost, in dollars."),
		durationMs: P().describe("Time spent, in milliseconds.")
	}), dk = L({
		from: M().optional().describe("First day to include, as YYYY-MM-DD in UTC. Leave it out for everything up to the end day."),
		to: M().optional().describe("Last day to include, as YYYY-MM-DD in UTC, and it is included rather than excluded. Leave it out for everything from the start day onwards.")
	}), fk = L({ rows: I(uk).describe("Spending grouped by day, provider, account, model and conversation. Everything a cost screen shows is a rearrangement of these rows, which is why there is no second call for any of it.") }), pk = L({
		provider: M(),
		account: M(),
		turns: P(),
		inputTokens: P(),
		outputTokens: P(),
		cacheReadTokens: P(),
		cacheCreationTokens: P(),
		costUsd: P()
	}), mk = L({ accounts: I(pk) });
})), gk, _k = v((() => {
	J(), JE(), $(), hk(), gk = {
		get: q.route({
			method: "GET",
			path: "/settings",
			summary: "How this sandbox is configured",
			description: "Every setting that governs how agents behave here, with the defaults filled in for anything nobody has chosen."
		}).output(jE),
		set: q.route({
			method: "POST",
			path: "/settings",
			summary: "Change the sandbox settings",
			description: "Writes the settings whole, so send the complete object rather than the fields you changed."
		}).input(jE).output(Z),
		savings: q.route({
			method: "GET",
			path: "/settings/savings",
			summary: "What the token-saving measures were worth",
			description: "Measured rather than estimated: what each mechanism actually saved over a range of days. The same day range the spending ledger takes, so one calendar filters both."
		}).input(dk).output(VE),
		builtinPrompt: q.route({
			method: "GET",
			path: "/settings/system-prompt/{base}",
			summary: "Read a built-in system prompt",
			description: "The actual text behind one of the built-in modes, so a settings screen can show the prompt instead of asking anyone to trust a description of it, and so either can be forked into a custom one."
		}).input(dE).output(ME),
		firings: q.route({
			method: "GET",
			path: "/settings/rule-firings",
			summary: "When each rule last did something",
			description: "A separate read rather than a field on the settings, because a rule firing is not somebody editing anything: folding it in would turn every firing into a settings write and put a self-changing value inside the object a screen edits."
		}).output(xE),
		repoChecks: q.route({
			method: "GET",
			path: "/settings/repo-checks",
			summary: "What each repository asks to run on its own code",
			description: `Every repository that declares its own checks at \`${HE}\`, what it declares, and whether you have switched it on. A repository declares what to run because the command belongs beside the scripts it names; nothing it declares runs until you say so.`
		}).output(KE),
		adoptRepoChecks: q.route({
			method: "POST",
			path: "/settings/repo-checks/adopt",
			summary: "Switch a repository's own checks on or off",
			description: "Adopts exactly what that repository declares as it stands now. If the declaration changes afterwards it stops running until you adopt it again, so a command nobody has read cannot inherit the answer given to a different one."
		}).input(qE).output(Z)
	};
})), vk, yk = v((() => {
	J(), g_(), $(), vk = {
		list: q.route({
			method: "GET",
			path: "/share",
			summary: "Conversations published as pages",
			description: "Every conversation that has been turned into a read-only page, with its link. There is no call to read one back: the page itself is the read, and it answers to anyone who has the link."
		}).output(f_),
		create: q.route({
			method: "POST",
			path: "/share",
			summary: "Publish a conversation",
			description: "Renders a conversation into a page anybody with the link can read, without signing in. Answers with the link, so nothing has to be listed again to find it."
		}).input(p_).output(d_),
		update: q.route({
			method: "POST",
			path: "/share/update",
			summary: "Refresh a published page",
			description: "Re-renders an existing page from the conversation as it stands now. Same link, newer contents."
		}).input(m_).output(d_),
		remove: q.route({
			method: "POST",
			path: "/share/remove",
			summary: "Unpublish a conversation",
			description: "Takes the page down, so the link stops answering."
		}).input(h_).output(Z)
	};
})), bk, xk = v((() => {
	J(), JE(), $(), bk = {
		list: q.route({
			method: "GET",
			path: "/skills",
			summary: "What the agent knows how to do",
			description: "Every skill available here and whether it is switched on, joined from all the places they come from: the owner's own, the settings, plugins a connection installed, folders inside extensions, and persona kits."
		}).output(TE),
		read: q.route({
			method: "GET",
			path: "/skills/read",
			summary: "Read one skill",
			description: "The full text of a single skill. The name travels in the query rather than the address, because a name can carry the owner it came from and that will not fit in a path."
		}).input(DE).output(EE),
		save: q.route({
			method: "POST",
			path: "/skills",
			summary: "Write a skill",
			description: "Creates or rewrites a skill by name. A new one starts switched on, because you wrote it in order to use it; rewriting one you switched off leaves it off. Renaming is saving under the new name and deleting the old."
		}).input(OE).output(Z),
		switch: q.route({
			method: "POST",
			path: "/skills/switch",
			summary: "Switch one of your own skills on or off",
			description: "Off takes the agent's copy away and keeps your text; on writes the copy back from it. Built-in tools are switched in the agent settings instead, and nothing else has a switch."
		}).input(AE).output(Z),
		remove: q.route({
			method: "POST",
			path: "/skills/remove",
			summary: "Delete a skill",
			description: "Removes the text and the agent's copy in one step, so a screen never has to sequence two calls and never leaves one half done."
		}).input(kE).output(Z)
	};
})), Sk, Ck, wk, Tk, Ek = v((() => {
	G(), Sk = L({ distro: M() }), Ck = L({
		os: M(),
		arch: M(),
		shell: M(),
		home: M(),
		roots: I(M()),
		engine: L({
			memoryBytes: P(),
			cpus: P()
		}).optional(),
		hostname: M().optional(),
		wsl: Sk.optional(),
		wslDistros: I(M()).optional()
	}), wk = L({
		key: M().min(1),
		online: F(),
		version: M().optional(),
		lastSeen: P().optional(),
		facts: Ck.optional()
	}), Tk = L({
		id: M(),
		platform: M().min(1),
		environments: I(wk).min(1),
		online: F(),
		version: M().optional(),
		lastSeen: P().optional(),
		facts: Ck.optional()
	}), L({ hosts: I(Tk) });
})), Dk = v((() => {})), Ok, kk, Ak, jk, Mk, Nk, Pk, Fk, Ik, Lk, Rk, zk, Bk, Vk, Hk, Uk, Wk, Gk, Kk, qk, Jk, Yk, Xk, Zk, Qk, $k, eA, tA = v((() => {
	G(), Ek(), Ok = L({
		memoryBytes: P().optional(),
		cpus: P().optional(),
		privileged: F(),
		gpu: F(),
		hostRuntime: I(M()),
		overlayRuntime: I(M())
	}), kk = L({
		memoryGib: wu().positive().nullable().optional(),
		cpus: wu().positive().nullable().optional(),
		privileged: F().optional(),
		gpu: F().optional()
	}), Ak = kk.refine((e) => Object.values(e).some((e) => e !== void 0), { message: "a reshape must change at least one thing" }), jk = L({
		slug: M(),
		container: M(),
		name: M().optional(),
		running: F(),
		image: M(),
		tunnelRunning: F().optional(),
		resources: Ok.optional()
	}), Mk = B([
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
	]), Nk = L({
		op: Mk,
		slug: M().min(1),
		hash: M().optional(),
		resources: Ak.optional(),
		parentUrl: M().optional(),
		pair: M().optional().meta({ secret: !0 }),
		setupCode: M().optional().meta({ secret: !0 }),
		definition: M().optional(),
		overlay: M().optional(),
		overlayHash: M().optional()
	}), Pk = Nk.extend({ id: M().min(1) }), Fk = R("kind", [
		L({
			kind: V("line"),
			text: M()
		}),
		L({
			kind: V("result"),
			message: M()
		}),
		L({
			kind: V("error"),
			message: M()
		})
	]), Ik = B(["upgrade", "restart"]), Lk = L({ op: Ik }), Rk = Lk.extend({ id: M().min(1) }), zk = B([
		"mirror-off",
		"mirror-on",
		"sync-pause",
		"sync-resume",
		"sync-unpair",
		"dev-reload",
		"dev-rebuild",
		"dev-rebuild-log",
		"sync-install"
	]), zk.exclude([
		"dev-reload",
		"dev-rebuild",
		"dev-rebuild-log",
		"sync-install"
	]), Bk = M().max(200).regex(/^[A-Za-z0-9][A-Za-z0-9._-]*$/), Vk = M().min(1).max(4096).regex(/^(?:~|\/|[A-Za-z]:[\\/])[^"'`$;|&\n\r]*$/), Hk = L({
		id: M().min(1),
		command: zk,
		sandboxId: Bk.optional(),
		mode: B(["sync", "mirror"]).optional(),
		localDir: Vk.optional()
	}), Uk = L({
		ok: F(),
		message: M(),
		output: M().optional(),
		refused: F()
	}), Wk = B([
		"created",
		"modified",
		"deleted"
	]), Gk = L({
		path: M(),
		local: Wk.optional(),
		sandbox: Wk.optional()
	}), Kk = L({
		sandboxId: M(),
		mode: B(["sync", "mirror"]),
		localDir: M().optional(),
		mirroring: B(["on", "off"]).optional(),
		mutagenStatus: M().optional(),
		conflicts: P().int().nonnegative().optional(),
		conflictedPaths: I(Gk).optional(),
		paused: F().optional(),
		backupStatus: M().optional()
	}), qk = B([
		"mirrored",
		"held-by-sandbox",
		"busy"
	]), Jk = L({
		port: P().int().min(1).max(65535),
		host: B(["127.0.0.1", "::1"]),
		sandboxId: M(),
		state: qk,
		heldBy: M().optional(),
		command: M().optional()
	}), Yk = L({
		running: F(),
		pid: P().int().optional(),
		installed: M().optional(),
		build: M().optional(),
		lastTickAt: P().optional()
	}), Xk = L({
		hostname: M(),
		os: M(),
		wsl: Sk.optional(),
		pairings: I(Kk),
		ports: I(Jk),
		agent: Yk,
		capturedAt: P()
	}), Zk = B([
		"offline",
		"scope-off",
		"no-agent",
		"unreported"
	]), Qk = L({
		machine: M(),
		mode: B(["sync", "mirror"]),
		seenAt: P().optional()
	}), $k = L({
		key: M(),
		label: M(),
		sync: Qk.optional(),
		hostId: M().optional(),
		online: F().optional(),
		platform: M().optional(),
		facts: Ck.optional(),
		agentVersion: M().optional(),
		lastSeen: P().optional(),
		report: Xk.optional(),
		sandboxes: I(jk).optional(),
		gap: Zk.optional()
	}), eA = L({ devices: I($k) }), L({
		enrolled: F(),
		available: F().optional(),
		machines: I(Xk).optional()
	});
})), nA, rA, iA, aA, oA, sA, cA, lA, uA, dA, fA, pA, mA = v((() => {
	G(), nA = L({
		state: B([
			"ready",
			"unavailable",
			"unknown"
		]).describe("Whether this runtime can serve a turn. Unknown is a real answer rather than a soft no: a check that could not run must not grey out a provider you can in fact use."),
		detail: M().optional().describe("Why it cannot, and what to do about it. Absent when it can."),
		checkedAt: P().describe("When it was last checked, in milliseconds.")
	}), rA = L({
		version: M().optional().describe("What the downloaded build says it is. Absent means ready but unnamed, never that nothing is ready."),
		channel: M().describe("Which channel it was taken from. Not necessarily the one this sandbox follows: downloading a beta build is not the same as moving onto beta."),
		at: P().describe("When the download finished, in milliseconds, which answers whether this is still the update being offered.")
	}), iA = L({
		name: M().optional().describe("What this sandbox is called."),
		image: M().optional().describe("The image it is running."),
		version: M().optional().describe("The version of that image."),
		latest: M().optional().describe("The newest published version on its channel."),
		updateAvailable: F().optional().describe("Whether those two differ."),
		runtimes: z(M(), nA).optional().describe("Which agent runtimes can serve a turn right now, keyed by runtime. Absent until the first check has run, which reads the same as every entry being unknown."),
		channel: M().optional().describe("Which release channel this sandbox follows."),
		previousImage: M().optional().describe("The image the last update replaced, which is what a rollback would return to. Absent means there is nothing to go back to."),
		updateNotes: I(M()).optional().describe("What is in the update, in the words of the people it is for, newest first. Absent or empty whenever there is nothing worth saying, which reads on screen exactly as it did before there were notes at all."),
		moreUpdateNotes: P().optional().describe("How many further notes there are beyond the ones sent, for a sandbox left alone a long time. Absent or zero means you have all of them."),
		breakingNotes: I(M()).optional().describe("What the update takes away, uncapped, because a warning that fell off a shortened list is a breaking update taken unwarned. Absent for the overwhelming majority, which break nothing."),
		staged: rA.optional().describe("An update already downloaded and built on the machine running this container, waiting only for the restart that applies it. That restart is seconds, where an unprepared update is minutes, which is a different decision entirely. Absent when nothing is waiting.")
	}), aA = L({
		kind: B([
			"unreadable",
			"unknownKey",
			"invalidEntry"
		]).describe("What to do about it. Unreadable means the whole file is being ignored and everything in it is at its default. An unknown key means only that key is ignored. An invalid entry means one item of a list was skipped and the rest is fine."),
		detail: M().describe("What exactly was wrong, as one sentence and nothing else. Never the remedy: that is `fix`."),
		suggestion: M().optional().describe("The name it was probably meant to be, when one is close enough to guess honestly."),
		fix: M().optional().describe("What to do about it, when that is something other than 'correct the file'. Absent whenever the file itself is the thing to edit.")
	}), oA = L({
		path: M().describe("The file, as a workspace path. The file is the unit somebody fixes, which is why problems are grouped by it."),
		problems: I(aA).describe("Everything currently wrong with it. A file with nothing wrong is absent rather than present and empty.")
	}), sA = I(oA), cA = L({
		path: M().describe("The file to repair, as the workspace path the problem was reported under. Only the handful of manifests a person hand-edits can be named; anything else is refused."),
		key: M().describe("The stray top-level key, exactly as it was reported. Absent from the file already means there is nothing to do."),
		to: M().optional().describe("Rename the key to this instead of removing it, carrying its value across. Absent means remove it. Naming a key that is already in the file is refused rather than silently overwriting what is there.")
	}), lA = L({
		token: M().describe("The credential every other call carries. Present it as a bearer token."),
		expiresAt: P().describe("When it stops working, in milliseconds, so a caller can renew ahead of it without reading the token."),
		email: M().describe("Who the sandbox verified you as.")
	}), B([
		"google",
		"ticket",
		"passkey",
		"recovery"
	]), uA = L({
		id: M().describe("The credential id the authenticator chose, base64url."),
		email: M().describe("Whose passkey this is; the owner's list carries every member's, a member's only their own."),
		label: M().describe("The name given at registration, or the daemon's default."),
		rpId: M().describe("The editor host this passkey is bound to; a passkey answers only from that origin."),
		createdAt: P().describe("Epoch ms of registration."),
		lastUsedAt: P().optional().describe("Epoch ms of the last sign-in it answered; absent means never."),
		backedUp: F().describe("Whether the authenticator syncs this passkey (a phone's keychain) or holds the only copy (a hardware key).")
	}), L({
		passkeys: I(uA),
		required: F().describe("Whether a passkey is the only proof that opens this sandbox; owner-set."),
		recovery: L({ remaining: P() }).optional().describe("Owner only, while required: how many one-time recovery codes are still unspent.")
	}), L({ required: F() }), L({ codes: I(M()) }), L({ code: M().min(1) }), L({
		error: M(),
		requires: V("passkey"),
		enrolled: F()
	}), dA = M().regex(/^[A-Za-z0-9_-]+$/, "base64url"), fA = L({
		id: dA,
		rawId: dA,
		type: V("public-key"),
		response: L({
			clientDataJSON: dA,
			attestationObject: dA,
			transports: I(M()).optional()
		}),
		authenticatorAttachment: M().optional(),
		clientExtensionResults: z(M(), Tu()).optional()
	}), pA = L({
		id: dA,
		rawId: dA,
		type: V("public-key"),
		response: L({
			clientDataJSON: dA,
			authenticatorData: dA,
			signature: dA,
			userHandle: dA.optional()
		}),
		authenticatorAttachment: M().optional(),
		clientExtensionResults: z(M(), Tu()).optional()
	}), L({
		response: fA,
		label: M().optional()
	}), L({ response: pA });
})), hA, gA = v((() => {
	J(), G(), B_(), rx(), tA(), dO(), $(), mA(), l_(), hk(), hA = {
		info: q.route({
			method: "GET",
			path: "/info",
			summary: "What this sandbox is",
			description: "The sandbox's own identity and state: which workspace it holds, which image it runs, what it is called, and the list of calls it actually implements. Start here, because a browser is routinely newer than the sandbox it is talking to and this is how it finds out what is there."
		}).output(iA),
		manifestProblems: q.route({
			method: "GET",
			path: "/system/manifest-problems",
			summary: "Settings files the sandbox could not read",
			description: "Anything the daemon tripped over in its own configuration on disk: a file it had to fall back from, a key it did not recognise, an entry it skipped. Separate from the identity call because it goes stale for a different reason, namely a file changing."
		}).output(sA),
		repairManifest: q.route({
			method: "POST",
			path: "/system/manifest-problems/repair",
			summary: "Take a stray setting out of a file",
			description: "Removes a key the sandbox does not recognise from one of its settings files, or renames it to the one it was probably meant to be, keeping the value. Only the files a person hand-edits can be named, and only a key — never a value — so this can only ever remove something already being ignored. Renaming onto a key the file already has is refused instead of overwriting it."
		}).input(cA).output(Z),
		session: q.route({
			method: "POST",
			path: "/system/session",
			summary: "Trade a sign-in for a session",
			description: "Exchanges a verified sign-in, or a session that has not expired yet, for a fresh session the daemon minted. That session is the credential every other call carries, and calling this again with a live one renews it."
		}).output(lA),
		events: q.route({
			method: "GET",
			path: "/events",
			summary: "The live event stream",
			description: "A stream held open for as long as you want it, carrying heartbeats so a caller notices the sandbox dying at once, batches of file changes so a tree or an editor can refresh itself, and the roster of who else is looking. Give it an id for this connection to appear in that roster; leave it out and you watch without being seen."
		}).input(L({ clientId: M().optional() })).output(K(nx)),
		presence: q.route({
			method: "POST",
			path: "/system/presence",
			summary: "Say what you are looking at",
			description: "Reports which view, conversation or file this connection is on, or that it has gone idle. The daemon fans it back out on the event stream so everyone else's roster updates."
		}).input(uO).output(Z),
		usage: q.route({
			method: "GET",
			path: "/system/usage",
			summary: "What has been spent",
			description: "Token and cost totals per account, added up from the record of every finished turn."
		}).output(mk),
		terminals: q.route({
			method: "GET",
			path: "/system/terminals",
			summary: "Open terminals",
			description: "The terminal sessions this sandbox is holding, which is what a terminal panel rebuilds its tabs from after a reload. The live typing and output run over a separate socket; this is the list."
		}).output(Yg),
		killTerminal: q.route({
			method: "DELETE",
			path: "/system/terminals/{name}",
			summary: "Close a terminal",
			description: "Destroys one terminal session and whatever was running inside it."
		}).input(Xg).output(Z),
		terminalScrollback: q.route({
			method: "GET",
			path: "/system/terminals/{name}/scrollback",
			summary: "A terminal's history as plain text",
			description: "What has scrolled past in one terminal, as text you can select and copy. The live view is a picture of a screen on the far side of a socket, with nothing in the page to select, so scrolling back and copying is this call rather than a gesture."
		}).input(Zg).output(Qg),
		browsers: q.route({
			method: "GET",
			path: "/system/browsers",
			summary: "Browsers the agent has open",
			description: "Every browser a conversation currently has running and the pages inside each one. The picture of what they are showing comes over a separate socket; this is the roster."
		}).output(t_),
		closeBrowser: q.route({
			method: "DELETE",
			path: "/system/browsers/{name}",
			summary: "Shut a browser down",
			description: "Closes one of the agent's browsers. Its next attempt to use that browser then fails as though it had crashed, which is the honest account of somebody pulling the plug."
		}).input(n_).output(Z),
		subagents: q.route({
			method: "GET",
			path: "/system/subagents",
			summary: "Subagents the agents have started",
			description: "Every subagent and child agent this sandbox's conversations have delegated work to, whichever tool started it, with what each one is doing."
		}).output(s_),
		subagentTranscript: q.route({
			method: "GET",
			path: "/system/subagents/{id}/transcript",
			summary: "A subagent's record",
			description: "The full record of one delegated subagent, in the same shape as any other conversation. It comes live from the parent turn while it works, and from stored history once it has finished."
		}).input(c_).output(L_),
		devices: q.route({
			method: "GET",
			path: "/system/devices",
			summary: "The machines you have connected",
			description: "Every computer this sandbox can see, whether it reached it through desktop sync or through a connected device, in one row per machine: what it says about itself, which sandboxes it holds, and what stopped it answering when nothing came back."
		}).output(eA),
		manageDeviceSandbox: q.route({
			method: "POST",
			path: "/system/devices/{id}/sandboxes/{slug}",
			summary: "Drive a sandbox on one of your own devices",
			description: "Start, stop, restart, update, rebuild, roll back, reshape (its memory and CPU caps, privileged, GPU) or remove a sandbox running on a machine you own, relayed over the connection that machine holds open. The answer is a stream because the slowest of these takes minutes, and it is the same stream whichever you ask for. The daemon adds no opinion: the machine enforces its own permissions and a refusal arrives as the last line, in the machine's words, naming the switch to flip."
		}).input(Pk).output(K(Fk)),
		runDeviceCommand: q.route({
			method: "POST",
			path: "/system/devices/{id}/commands/{command}",
			summary: "Run one of your device's own CLI actions",
			description: "Performs a named action on a machine you own by running its own intentic-machine command there — turning that device's port mirroring off, say — over the connection it holds open. The set of actions is fixed and the command line is built here from the name, never sent by the caller. The machine enforces its own permissions and a refusal comes back as its own sentence, naming the switch to flip."
		}).input(Hk).output(Uk),
		runDeviceAgentFlow: q.route({
			method: "POST",
			path: "/system/devices/{id}/agent/{op}",
			summary: "Update or restart the agent on one of your own devices",
			description: "Updates a machine you own to the current intentic-machine agent, or restarts the loop it is running, over the connection that machine holds open. The answer is a stream of the run's own output — and it normally stops mid-run, because the agent's loop is what carries this connection: the work is detached from it first, so it finishes regardless, and the device's reported version is what confirms it. Takes the machine's \"Run commands\" permission, the same one a command typed there would."
		}).input(Rk).output(K(Fk))
	};
})), _A, vA = v((() => {
	J(), G(), sm(), Dm(), lm(), $(), _A = {
		accounts: q.route({
			method: "GET",
			path: "/translator/accounts",
			summary: "Subscriptions connected through the translator",
			description: "What is signed in per provider. Each provider can hold several accounts at once, and the translator spreads work across them."
		}).output(tm),
		connect: q.route({
			method: "POST",
			path: "/translator/{provider}/connect",
			summary: "Start connecting a subscription",
			description: "Begins the sign-in for one provider and says which of the two shapes it is: a code you type into a device page, which finishes by itself in the background, or a redirect whose landing address you hand back afterwards."
		}).input(L({ provider: cm })).output(xm),
		status: q.route({
			method: "GET",
			path: "/translator/{provider}/connect",
			summary: "Read a subscription connection attempt",
			description: "Reports whether this exact sign-in attempt is waiting, completed, or failed. Completion is tied to the attempt rather than a change in account count, because signing in to an existing account replaces its credential in place."
		}).input(L({
			provider: cm,
			state: M().min(1)
		})).output(Sm),
		complete: q.route({
			method: "POST",
			path: "/translator/{provider}/complete",
			summary: "Finish a redirect sign-in",
			description: "For the providers that redirect somewhere this sandbox cannot receive: hand back the address you landed on and the connection completes."
		}).input(Cm).output(Z),
		disconnect: q.route({
			method: "POST",
			path: "/translator/{provider}/disconnect",
			summary: "Disconnect one subscription",
			description: "Clears a single account by name. Any others under the same provider stay connected."
		}).input(L({
			provider: cm,
			name: M().min(1)
		})).output(Z)
	};
})), yA, bA, xA = v((() => {
	J(), G(), sm(), hk(), yA = L({ force: F().default(!1).describe("Measure again even if a reading was taken a moment ago.") }), bA = {
		rollup: q.route({
			method: "GET",
			path: "/usage/rollup",
			summary: "What was spent, grouped",
			description: "The spending record over a range of days, grouped by day, provider, account and model. Everything a cost screen shows is a rearrangement of this one answer, so nothing needs a second call. Read-only: rows are written by the sandbox as turns end, which is what makes it worth trusting."
		}).input(dk).output(fk),
		refreshPlanLimits: q.route({
			method: "POST",
			path: "/usage/plan-limits/refresh",
			summary: "Measure every account's plan limits again",
			description: "Reads how full each connected account's plan limits are, for every provider, and records it. Forced, it measures even accounts read a moment ago, which is the right thing when a plan was just changed and the question is whether the number on screen is still true."
		}).input(yA).output(L({ ok: V(!0) })),
		limitReset: q.route({
			method: "GET",
			path: "/usage/limit-reset/{account}",
			summary: "Whether this account's session window can be reopened now",
			description: "Asks the provider whether it will reopen this account's spent session window immediately, which some plans grant once a week. Only worth asking about an account that has actually been refused: the answer is the provider's judgement at this moment, it is not cached, and an account with no such grant answers plainly that it has none."
		}).input(L({ account: M().min(1).describe("Which account.") })).output(Xp),
		claimLimitReset: q.route({
			method: "POST",
			path: "/usage/limit-reset/{account}/claim",
			summary: "Reopen this account's session window now",
			description: "Spends one of the account's weekly resets to reopen its session window immediately. The weekly allowance is untouched and still binds. Answers with what the provider actually did: only `reset` changed anything, and it is the cue to send the refused turn again."
		}).input(L({ account: M().min(1).describe("Which account.") })).output(Zp)
	};
})), SA, CA = v((() => {
	J(), rx(), $(), Jx(), SA = {
		list: q.route({
			method: "GET",
			path: "/vpn",
			summary: "Configured tunnels and which are up",
			description: "Every stored VPN with its live link state, read back from the operating system rather than from memory, so a tunnel dropped from a shell and one dropped from a screen look the same here."
		}).output(Hx),
		connect: q.route({
			method: "POST",
			path: "/vpn/{id}/connect",
			summary: "Dial a VPN",
			description: "Brings a stored tunnel up, streaming the client's progress as it authenticates and then sets up routing. Streamed because a dial takes seconds and can fail with something you have to read: a wrong password, a gateway certificate nobody trusts, a code it wants. Connecting one that is already up simply says so."
		}).input(Ux).output(K(Bb)),
		disconnect: q.route({
			method: "POST",
			path: "/vpn/{id}/disconnect",
			summary: "Drop a tunnel",
			description: "Takes the tunnel down. One that was already down is fine: the promise is that it is not up afterwards."
		}).input(Wx).output(Z),
		importForticlient: q.route({
			method: "POST",
			path: "/vpn/import-forticlient",
			summary: "Read connections out of an exported config",
			description: "Turns an exported FortiClient configuration into a list of connections you can add, so somebody holding that file picks from a list instead of retyping a host and port for every tunnel."
		}).input(Gx).output(qx)
	};
})), wA, TA, EA, DA, OA, kA, AA, jA, MA, NA, PA, FA, IA, LA, RA, zA, BA, VA, HA, UA, WA = v((() => {
	G(), X(), Dp(), sg(), wA = M().min(1).max(24).regex(/^[a-z0-9][a-z0-9-]*$/), TA = B(["fresh", "continue"]), EA = 24, DA = L({
		id: wA.describe("This step's own name, which other steps use to say they wait on it."),
		title: M().min(1).max(60).describe("What to call it on screen. Short: the instruction below is where the detail goes."),
		goal: M().min(1).optional().describe("What done means for this step, in your words. It is what the step is judged against, and a different sentence from what it is told to do."),
		prompt: M().min(1).optional().describe("What the step is told to do. The goal is the suite is green; this is run the tests, take the top failure, fix it. Leaving it out hands over the run's own request untouched, which is right for a step whose whole job is do what was asked."),
		needs: I(wA).describe("Which steps must finish first. Empty means it starts when the run does. Naming a step that does not exist, or a loop between steps, is refused when the workflow is saved."),
		handoff: TA.describe("How it meets what came before: a fresh conversation handed the previous step's result, or the same conversation carried on."),
		output: qh.describe("What it has to produce for the step to count."),
		checks: I(Jh).describe("What has to pass before it counts as done."),
		context: Kh.describe("How the step's own repeats meet each other. A long-running step wants to start clean each round; a short polish-this step wants to carry on."),
		maxSpendUsd: P().positive().optional().describe("A ceiling on what this step may spend. The one resource that cannot be recovered after an unattended fan-out, which is why it is here and iteration limits are not. Absent is uncapped."),
		agent: Op.optional().describe("Which provider runs it."),
		harness: Ap.optional().describe("Which agentic loop runs it."),
		account: M().optional().describe("Which account pays for it."),
		model: M().optional().describe("Which model runs it."),
		actsAs: Y.optional().describe("Which persona it acts as. Unpinned, a step gets the strict unwatched default: every tool, and no signed-in accounts at all. Pinning one is how a release check gets a voice, a folder to work in, or the single account it may post from.")
	}), OA = L({
		step: wA.describe("Which step's answer carries the decision. Usually a last step that weighs up the ones before it, though nothing requires that."),
		field: M().min(1).describe("Which of that step's declared answers to read. A declared field is the one part of a step's answer that was checked rather than fished out of prose, which is the whole rule here. Checked when the workflow is saved."),
		pass: I(M().min(1)).min(1).describe("Which values mean ship it. Everything else fails. A list of what passes rather than what fails, because a step answering mostly-pass or pass-with-notes must not ship, and this gets that right without anybody having had to enumerate the ways a model can hedge."),
		dailyMax: P().int().positive().optional().describe("How many runs a day, across every caller. A gate is a paid door with nobody in the loop: one wired into a push-triggered pipeline is a fan-out of conversations per commit. Absent is a small default rather than unlimited.")
	}), kA = B([
		"pass",
		"fail",
		"blocked"
	]), L({
		outcome: kA.describe("Ship it, do not, or we could not tell. That third answer exists because could not reach a judgement is not the product is broken: a gate that reported its own outages as failures is one a team switches off, so it should be the honest answer far more often than the convenient one, and it means a neutral build rather than a red one."),
		reason: M().describe("Why, in one line. Realistically the only part of this a build log will ever show."),
		runId: M().describe("The run behind the verdict, so somebody can go and read it."),
		value: M().optional().describe("What the step actually answered. Absent when there was nothing to read, which is most of the could-not-tell cases.")
	}), AA = L({
		id: Y.describe("The workflow's id."),
		name: M().min(1).max(80).describe("What to call it."),
		description: M().max(400).optional().describe("What it is for."),
		steps: I(DA).min(1).max(EA).describe("The steps, each with what it waits on. Every one runs in its own private copy of the repos, always, because parallel steps sharing a tree collide."),
		gate: OA.optional().describe("Present means a machine can run this design and get a ship-it answer back. Absent means an ordinary workflow, started by a person, with no outside door onto it at all."),
		maxParallel: P().int().min(1).max(8).describe("How many steps may run at once. Bounded, because a fan-out of twelve is twelve model sessions, twelve working copies and twelve times the burn rate, on one machine.")
	}), jA = B([
		"pending",
		"running",
		"done",
		"failed",
		"skipped",
		"stopped"
	]), MA = L({
		stepId: wA.describe("Which step this is."),
		state: jA.describe("How it went. Skipped carries what the others cannot: it never ran, because something it was waiting on did not finish. That is why a failed run shows one red step and a trail of grey ones."),
		conversationId: M().describe("The conversation it ran on, and the way from a node on the graph to a real record. Shared with the step before it when they were chained, which is what makes those two one card."),
		startedAt: P().optional().describe("When it began, in milliseconds."),
		endedAt: P().optional().describe("When it ended, in milliseconds."),
		iterations: P().int().min(0).describe("How many rounds it took."),
		costUsd: P().optional().describe("What it cost, in dollars."),
		loopState: $h.optional().describe("How its repeating ended. Out of rounds and stuck both come out as a failed step, and the difference between them is the difference between give it more room and more room will not help."),
		detail: M().optional().describe("What went wrong, when something did."),
		document: Yh.optional().describe("What it produced, once it has produced something that passes its own declared shape. This is what the steps after it are handed."),
		report: M().optional().describe("The start of its closing words. Bounded, so a long answer is not silently cut down to its last few thousand characters and the record stays a sensible size."),
		reportPath: M().optional().describe("Where the whole answer is, as a workspace path. Every step can read it, so a long handoff need not be copied into anybody's prompt.")
	}), NA = B([
		"running",
		"done",
		"failed",
		"stopped",
		"overspent",
		"error"
	]), PA = L({
		runId: M().min(1).describe("This run's id."),
		workflow: AA.describe("The design as it stood when the run started, copied rather than looked up. The run has to keep showing the graph it actually ran, not the one edited twice since, and a run of a deleted workflow has to stay readable."),
		repos: I(jp).min(1).max(50).describe("The workspace as this run began, one exact commit per repository. Every step branches from these, even if the shared tree moves while a wide fan-out is still opening its copies, so the steps can be compared with each other afterwards."),
		request: M().optional().describe("What this run was asked to do, handed to every step on top of its own instructions. It is what makes one saved design worth keeping: two models, one task is a shape, and the task is different every time. Absent for a run started with nowhere to type one."),
		state: NA.describe("How the run is going. Finished means every step that ran got there; a run with skipped steps counts as failed, because a graph that never reached its end did not do what it was asked whatever the survivors managed."),
		startedAt: P().describe("When it began, in milliseconds."),
		endedAt: P().optional().describe("When it ended, in milliseconds."),
		resumed: P().int().min(0).describe("How many times the sandbox restarted under it and picked it back up."),
		detail: M().optional().describe("What went wrong, when something did."),
		steps: I(MA).describe("One entry per step, in the design's own order. Every one is written down as waiting when the run starts, so the picture is complete from the first frame and a missing step never has to mean two things."),
		archivedAt: P().optional().describe("When it was put away, in milliseconds. The record stays readable and every step's branch, transcript and counters are untouched. Its conversations are put away with it, and brought back with it. Absent means live on the board.")
	}), FA = M().optional().describe("What a pipeline presents at /workflows/{id}/gate, when the design declares a gate. Shown to a maintainer or the owner only."), IA = AA.extend({ gateToken: FA }), LA = AA.extend({
		runs: I(PA).describe("Its runs, newest first."),
		gateToken: FA
	}), RA = L({ workflows: I(LA).describe("Every saved design with its own run history.") }), zA = L({ runs: I(PA).describe("Every run across every workflow, newest first, including runs of workflows since deleted.") }), BA = L({ id: M().describe("Which workflow.") }), VA = L({ runId: M().describe("Which run.") }), HA = BA.extend({ request: M().min(1).max(2e4).optional().describe("What to point it at. Optional, because a design whose steps already say what they want is complete on its own; only one written as a shape needs today's sentence.") }), UA = L({
		workflow: AA.describe("The design to write."),
		create: F().describe("Whether you mean to make a new one or replace an existing one. Said outright rather than inferred, so an id that happens to collide is a refusal instead of one saved design quietly overwriting another.")
	});
})), GA, KA = v((() => {
	J(), $(), WA(), GA = {
		list: q.route({
			method: "GET",
			path: "/workflows",
			summary: "Saved workflows and their runs",
			description: "Every workflow somebody has designed, each with its own run history, newest first. One answer rather than two, because a workflow that has never been run is the interesting case rather than a mistake."
		}).output(RA),
		save: q.route({
			method: "POST",
			path: "/workflows",
			summary: "Create or replace a workflow",
			description: "Writes a workflow design. Say which of the two you mean, so an id that happens to collide cannot silently overwrite somebody's work. A design that could never run is refused, in the same words the editor shows while you type: a loop in the steps, a step waiting on one that is not there, a step with no way of knowing it is finished."
		}).input(UA).output(IA),
		rotateGateToken: q.route({
			method: "POST",
			path: "/workflows/{id}/gate/rotate",
			summary: "Rotate a release gate's token",
			description: "Mints a new credential for the workflow's release gate and retires the old one at once. Every pipeline wired to the gate has to be handed the new URL. Refused for a workflow that declares no gate."
		}).input(BA).output(km),
		remove: q.route({
			method: "DELETE",
			path: "/workflows/{id}",
			summary: "Delete a workflow",
			description: "Removes the design. A run of it that is already going keeps going and stays readable and stoppable, because a run takes its own copy of the design when it starts."
		}).input(BA).output(Z),
		run: q.route({
			method: "POST",
			path: "/workflows/{id}/run",
			summary: "Start a workflow",
			description: "Kicks a workflow off and answers immediately with the run as recorded; the work carries on without you. Point it at a question and every step gets that on top of its own instructions. Every step is written down as waiting up front, so the picture is complete from the first frame. Several runs of one design can be in flight at once without colliding."
		}).input(HA).output(PA),
		runs: q.route({
			method: "GET",
			path: "/workflows/runs",
			summary: "Every workflow run",
			description: "All runs across all workflows, newest first. This is also the only place the runs of a deleted workflow are still reachable."
		}).output(zA),
		stopRun: q.route({
			method: "POST",
			path: "/workflows/runs/{runId}/stop",
			summary: "Stop a run now",
			description: "Nothing further starts, and the steps already going are cut off where they stand. Whatever they had written stays on their branches. Deliberately abrupt rather than letting the current step finish: a step is a whole agent turn, and a stop that kept spending for minutes afterwards is indistinguishable from a button that does nothing. It always ends the run, including one left stranded by a daemon that was replaced mid-flight."
		}).input(VA).output(Z),
		archiveRun: q.route({
			method: "POST",
			path: "/workflows/runs/{runId}/archive",
			summary: "Take a finished run off the board",
			description: "Nothing is lost and the working copies are reclaimed. Every conversation the run started is put away with it, which is what makes this an archive rather than a dismissal: a step has no card of its own, so merely dropping the run would spill its conversations onto the board at the moment somebody said they were done. Refused while the run is still going."
		}).input(VA).output(Z),
		unarchiveRun: q.route({
			method: "POST",
			path: "/workflows/runs/{runId}/unarchive",
			summary: "Bring an archived run back",
			description: "Puts a run and every conversation it started back on the board."
		}).input(VA).output(Z)
	};
})), qA, JA, YA, XA, ZA, QA, $A, ej, tj, nj, rj, ij, aj, oj, sj, cj, lj, uj, dj, fj = v((() => {
	G(), bO(), qA = L({ repos: I(M()).describe("Every repository's id, sorted. An id is its folder relative to the workspace root, and \"root\" is the workspace itself.") }), JA = L({
		name: M().min(1).describe("What to call it in the workspace."),
		cloneUrl: M().min(1).describe("Where to clone it from."),
		branch: M().optional().describe("Which branch to check out. Leave it out for the repository's default.")
	}), YA = L({
		name: M().describe("What it ended up called."),
		path: M().describe("Where it landed.")
	}), XA = L({ name: M().min(1).describe("What to call it, which is also its folder under the workspace root.") }), ZA = L({
		repo: M().describe("Which repository."),
		status: B([
			"updated",
			"current",
			"dirty",
			"diverged",
			"no-remote",
			"skipped",
			"error"
		]).describe("What happened to it. Dirty and diverged are why a repository was left alone: it had uncommitted work, or it had moved in a way that cannot be fast-forwarded."),
		behind: P().optional().describe("How many commits it was behind."),
		ahead: P().optional().describe("How many commits it was ahead."),
		head: M().optional().describe("The commit it ended up on."),
		message: M().optional().describe("What went wrong, when something did.")
	}), QA = L({ repos: I(ZA).describe("One entry per repository, saying what happened to it.") }), $A = L({
		template: M().min(1).describe("Which kind of app to scaffold, by its key in the template list."),
		name: M().min(1).regex(/^[a-z][a-z0-9-]*$/).describe("What to call this one.")
	}), ej = L({
		repo: M().describe("Which repository to scaffold into."),
		apps: I($A).min(1).describe("The apps to add.")
	}), tj = L({
		repo: M().describe("Which repository."),
		session: M().describe("What to call the terminal this runs in, so you can find it again."),
		dirs: I(M()).min(1).describe("Which projects to test, as folders relative to the repository. Empty targets the repository root.")
	}), nj = L({
		key: M().describe("The id to name when scaffolding one."),
		label: M().describe("What to call it on screen."),
		description: M().describe("What you get.")
	}), rj = L({ templates: I(nj).describe("The kinds of app the configured source repository knows how to scaffold.") }), ij = L({
		app: M().describe("The app's name, which is also its folder."),
		kind: M().optional().describe("What sort of app it is: the template it came from, or the framework worked out from its dependencies. Absent when it was found purely by having a dev script."),
		previewUrl: M().optional().describe("Where to open it. Absent when this sandbox has no outside address."),
		running: F().describe("Whether its dev server is up."),
		healthy: F().describe("Whether it is actually answering."),
		installed: F().describe("Whether its dependencies are installed, which is what decides whether a start takes seconds or an install first."),
		launch: gO.optional().describe("Where a start the sandbox is running has got to: its shell coming up, installing, its dev command running with nothing listening yet, or exited back to a prompt. Absent when nothing is starting and once it serves.")
	}), aj = L({ apps: I(ij).describe("The apps in this repository.") }), oj = L({
		name: M().describe("The name the package declares."),
		dir: M().describe("Where it lives, relative to the repository."),
		group: M().describe("The top-level folder it sits under, which is what a diagram colours by.")
	}), sj = B([
		"prod",
		"dev",
		"peer"
	]), cj = L({
		from: M().describe("The package that depends."),
		to: M().describe("The package it depends on."),
		type: sj.describe("Which kind of dependency declared it.")
	}), lj = L({
		packages: I(oj).describe("Every package in the repository."),
		edges: I(cj).describe("Which of them use which. Pure data: how to lay it out is yours to decide.")
	}), uj = L({ repo: M().describe("Which repository.") }), dj = L({
		repo: M().describe("Which repository."),
		app: M().min(1).regex(/^[a-z][a-z0-9-]*$/).describe("Which app inside it.")
	});
})), pj, mj, hj, gj, _j = v((() => {
	G(), pj = L({
		dir: M().describe("Where the project is, relative to the workspace root. Empty means the root itself."),
		ecosystem: B(["node", "python"]).describe("Which language's tooling it uses."),
		manager: M().describe("The tool that would do the installing."),
		command: M().describe("The exact command that would run."),
		evidence: M().describe("The file that decided all of the above, so the answer can be checked rather than trusted."),
		state: B([
			"ready",
			"installing",
			"needs-setup",
			"unsupported",
			"stale"
		]).describe("Ready means its dependencies are really there. Stale means it was installed once and has since outgrown that, which is what an agent leaves behind when it adds a dependency without installing it. Unsupported means this sandbox has no such tool."),
		missing: P().optional().describe("How many declared dependencies cannot be found on disk. What separates never-installed from outgrown.")
	}), mj = L({ projects: I(pj).describe("Every project the sandbox found, and whether each is usable.") }), hj = L({ dirs: I(M().max(500)).min(1).max(50).describe("Which projects to install, by folder. Ones already ready, already installing, or with no tool to install them are skipped rather than refused.") }), gj = L({ queued: I(M()).describe("Which of them actually started, which is not necessarily what you asked for.") });
})), vj, yj = v((() => {
	J(), _C(), Yy(), $(), fj(), fC(), _j(), zb(), vj = {
		tree: q.route({
			method: "GET",
			path: "/workspace/tree",
			summary: "The workspace file tree",
			description: "Every folder and file under the workspace root, as one walk. Name a conversation to read its own private copy of the tree instead of the shared one. Folders the daemon skips, such as installed packages, come back without their contents; ask for those separately."
		}).input(pb).output(gb),
		children: q.route({
			method: "GET",
			path: "/workspace/children",
			summary: "A bounded folder listing",
			description: "The entries inside a folder as one flat list. Direct children are the default, which is how the explorer opens a folder the full tree walk left closed; callers that need a small subtree can ask for up to five levels without a request per directory."
		}).input(_b).output(vb),
		file: q.route({
			method: "GET",
			path: "/workspace/file",
			summary: "Read part of a text file",
			description: "A window of one file's text, plus how large the whole file is. Never the entire file: an unbounded read is how a single enormous log stalls the daemon for everyone, so ask for the slice you mean to show and page through if you need more."
		}).input(Sb).output(Tb),
		derived: q.route({
			method: "GET",
			path: "/workspace/derived",
			summary: "Read a file's derived text",
			description: "What a document, picture, recording or archive says, as text, from the shadow the sandbox keeps beside it. This is the same rendering an agent reads instead of the bytes, so it is also the way to check what one is working from. Nothing is derived here: a file with no shadow yet answers that it has none, and whether it could have one."
		}).input(Eb).output(Mb),
		derive: q.route({
			method: "POST",
			path: "/workspace/derive",
			summary: "Derive a file's text now",
			description: "Renders one file to text and answers with the result, for when its shadow is missing or you want it rebuilt. The same work the background pass does when that setting is on, so this is how a reader gets the text without turning it on for the whole workspace. Costs a parse of exactly one file; a format nothing can read says so rather than failing."
		}).input(Eb).output(Mb),
		derivedStatus: q.route({
			method: "GET",
			path: "/workspace/derived-status",
			summary: "How the background rendering is doing",
			description: "Whether documents, pictures, recordings and archives are being rendered to text in the background, how many are waiting, which are being read right now, and how many shadows the last whole-tree pass counted. Ask this to tell a file nothing can read from a file whose turn has not come."
		}).output(Db),
		mediaTicket: q.route({
			method: "POST",
			path: "/workspace/media-ticket",
			summary: "Get a pass for streaming a media file",
			description: "Mints the short-lived ticket a video or audio element hands to the streaming route, which serves byte ranges and so cannot carry an ordinary header. Minting it here means a caller can tell whether this sandbox streams media at all, rather than discovering it mid-playback."
		}).input(bb).output(xb),
		resolve: q.route({
			method: "GET",
			path: "/workspace/resolve",
			summary: "Turn a written path into a real file",
			description: "Matches a path somebody wrote in prose against the real tree and says which file it means. A path mentioned in a message is often only the tail of the real one, so this is the lookup behind every clickable file reference rather than a plain existence check."
		}).input(Nb).output(Pb),
		search: q.route({
			method: "GET",
			path: "/workspace/search",
			summary: "Search the code",
			description: "Ranked results across the whole workspace, grouped, each carrying why it matched and how fresh it is. Left alone it blends plain text, structure, meaning and history in one pass; narrow it to a single kind of search when you already know which you want. Long result sets resume from the cursor it hands back."
		}).input(aC).output(dC),
		health: q.route({
			method: "GET",
			path: "/workspace/health",
			summary: "A repo's shape in numbers",
			description: "Where one repo's risk sits: the files that change often and are complicated at once, what the index holds, and which modules the rest of the code leans on most. Scoped to a repo, because a codebase is a repo rather than the whole drop."
		}).input(pC).output(gC),
		classify: q.route({
			method: "GET",
			path: "/workspace/classify",
			summary: "Sort a messy drop into buckets",
			description: "Proposes which of the loose things in the workspace are code, documents, media or archives. A read-only suggestion by fixed rules, with no model involved: nothing moves until a caller applies the moves it likes through the move call."
		}).output(Rb),
		mkdir: q.route({
			method: "POST",
			path: "/workspace/dir",
			summary: "Create a folder",
			description: "Makes a folder, and any missing folders above it."
		}).input(Fb).output(Z),
		delete: q.route({
			method: "DELETE",
			path: "/workspace/entry",
			summary: "Delete a file or folder",
			description: "Removes one entry and everything under it. The path travels in the body rather than the address, the same as every other write in this group."
		}).input(yb).output(Z),
		move: q.route({
			method: "POST",
			path: "/workspace/move",
			summary: "Move or rename something",
			description: "Moves one entry to a new path, which is also how you rename it."
		}).input(Ib).output(Z),
		copy: q.route({
			method: "POST",
			path: "/workspace/copy",
			summary: "Copy a file or folder",
			description: "Duplicates one entry at a new path, recursively for a folder."
		}).input(Ib).output(Z),
		setup: q.route({
			method: "GET",
			path: "/workspace/setup",
			summary: "Which projects have their dependencies installed",
			description: "Per project, whether its dependencies are actually present. A project that arrives by import comes without them, so files landing is not the same as the project working: until this says a project is ready, its type checks and tests can only mislead you."
		}).output(mj),
		install: q.route({
			method: "POST",
			path: "/workspace/setup/install",
			summary: "Install a project's dependencies",
			description: "Starts the install for one or more projects in a terminal you can attach to, and answers immediately. The run survives a page reload and its output stays in the terminal history."
		}).input(hj).output(gj),
		repos: q.route({
			method: "GET",
			path: "/workspace/repos",
			summary: "Repos in the workspace",
			description: "Every git repo the daemon found in the workspace, with where each one sits and what it is called."
		}).output(qA),
		addRepo: q.route({
			method: "POST",
			path: "/workspace/repos",
			summary: "Clone a repo in",
			description: "Clones a repository into the workspace beside the others, using whatever forge credentials the sandbox already holds."
		}).input(JA).output(YA),
		createRepo: q.route({
			method: "POST",
			path: "/workspace/repos/new",
			summary: "Start a new repo",
			description: "Makes an empty repository in the workspace: a folder named after it, initialised, with a README that names it and one commit, so an agent can start on it at once. Nothing is cloned and nothing leaves the machine."
		}).input(XA).output(YA),
		sync: q.route({
			method: "POST",
			path: "/workspace/sync",
			summary: "Pull every repo up to date",
			description: "Fetches every repo that has a remote and fast-forwards the ones that can move safely, reporting what happened to each. This runs by itself at the start of a turn; call it directly to refresh on demand, or to re-sync a repo that had drifted."
		}).output(QA),
		templates: q.route({
			method: "GET",
			path: "/workspace/templates",
			summary: "App templates you can add",
			description: "The kinds of app the configured source repo knows how to scaffold, which is what an add-app picker lists."
		}).output(rj),
		addApps: q.route({
			method: "POST",
			path: "/workspace/repos/{repo}/apps",
			summary: "Scaffold new apps into a repo",
			description: "Starts scaffolding one or more apps inside an existing multi-package repo and answers straight away. Watch the terminal it opens for progress and for anything that goes wrong."
		}).input(ej).output(Z),
		appsList: q.route({
			method: "GET",
			path: "/workspace/repos/{repo}/apps",
			summary: "Apps inside a repo",
			description: "The apps in one multi-package repo, each with its preview address and whether its dev server is up."
		}).input(uj).output(aj),
		packageGraph: q.route({
			method: "GET",
			path: "/workspace/repos/{repo}/graph",
			summary: "How a repo's packages depend on each other",
			description: "Every package in one multi-package repo and which of its siblings each one uses, which is what a dependency view draws."
		}).input(uj).output(lj),
		modules: q.route({
			method: "GET",
			path: "/workspace/modules",
			summary: "Every package across every repo",
			description: "The named packages in the whole workspace, which is what a review list groups changed files under when a reader wants packages rather than paths. Whole-workspace in one answer, because a review spans repos and asking per repo would be a fan-out on every open."
		}).output(Hy),
		startApp: q.route({
			method: "POST",
			path: "/workspace/repos/{repo}/apps/{app}/start",
			summary: "Start an app's dev server",
			description: "Brings up one app's preview server in an attachable terminal, so its address starts answering."
		}).input(dj).output(Z),
		stopApp: q.route({
			method: "POST",
			path: "/workspace/repos/{repo}/apps/{app}/stop",
			summary: "Stop an app's dev server",
			description: "Shuts one app's preview server down and frees its port."
		}).input(dj).output(Z),
		runTests: q.route({
			method: "POST",
			path: "/workspace/repos/{repo}/tests",
			summary: "Run a project's tests",
			description: "Starts the test run for the projects you name in an attachable terminal and answers straight away. The terminal is where the results appear."
		}).input(tj).output(Z)
	};
})), bj = v((() => {
	J(), G(), tA(), LS(), Ek(), $(), q.output(Ck), q.input(cS).output(Z), q.output(Z), q.input(Tu()).output(Tu()), q.input(Nk).output(K(Fk)), q.input(Lk).output(K(Fk));
})), xj, Sj, Cj, wj, Tj = v((() => {
	G(), xj = L({
		origin: M(),
		mode: B(["read", "act"])
	}), Sj = L({
		browser: M(),
		tabs: P(),
		grants: I(xj),
		paused: F()
	}), Cj = L({
		id: M(),
		platform: M().min(1),
		online: F(),
		version: M().optional(),
		lastSeen: P().optional(),
		facts: Sj.optional()
	}), L({ browsers: I(Cj) }), wj = L({
		name: M(),
		value: M(),
		domain: M(),
		path: M(),
		expires: P().optional(),
		httpOnly: F(),
		secure: F(),
		sameSite: B([
			"Strict",
			"Lax",
			"None"
		])
	}), L({
		account: M().min(1),
		origin: M().min(1),
		cookies: I(wj).min(1).max(300)
	}), L({
		account: M().min(1),
		domain: M().min(1)
	}), L({
		ok: F(),
		message: M(),
		cookies: I(wj).optional()
	});
})), Ej = v((() => {
	J(), G(), LS(), $(), Tj(), q.output(Sj), q.input(dS).output(Z), q.output(Z), q.input(Tu()).output(Tu());
})), Dj = v((() => {
	J(), G(), K_(), wp(), X(), sm(), $(), q.output(vp), q.input(bp).output(K(xp)), q.input(Sp).output(K(V_)), q.input(nm).output(L({ applied: F() })), q.input(L({
		conversationId: M().min(1),
		text: M(),
		attachments: I(M()).optional(),
		editorContext: Mp.optional()
	})).output(L({
		applied: F(),
		invalid: M().optional()
	})), q.input(L({ toml: M() })).output(L({ settings: I(M()) })), q.input(Sp.pick({ conversationId: !0 })).output(Z), q.output(Z);
})), Oj = v((() => {})), kj, Aj, jj = v((() => {
	kj = "The interrupted request is repeated below, where part of it was already completed in this session, continue from that point instead of starting over.", Aj = {
		auth: `The Claude credential that interrupted this conversation has been renewed, and this turn resumed automatically. ${kj}`,
		outage: `The model provider was briefly unavailable and interrupted this conversation; this turn resumed automatically. ${kj}`,
		restart: `The sandbox restarted while this turn was running, which stopped it, and this turn resumed automatically once it came back. ${kj}`,
		stopped: `The previous attempt at this request stopped before it finished, and it has been sent again. ${kj}`,
		limit: `The model provider's usage allowance ran out while this turn was running, which stopped it, and it has been sent again. ${kj}`,
		switched: "The model provider's usage allowance ran out while this turn was running, which stopped it, and it has been sent again on a different account, which starts a fresh session. The conversation so far has been carried across above, including the part of the request that was already completed, and the sandbox has measured where the work actually stands (the files changed on this branch, what was verified, what the checklist still holds) in the note headed 'Where the work stands': trust that note over anything recalled, then continue from that point instead of starting over.",
		carried: `The model provider's usage allowance ran out while this turn was running, which stopped it, and it has been sent again on a different account of the same provider, in this same session: everything you knew is still here. ${kj}`,
		refused: "The model provider refused the previous attempt at this request outright, because its usage allowance was spent: no part of the request below was read or acted on, and nothing has been done towards it. It has been sent again, and starts from the beginning. Where the sandbox has measured earlier work on this branch, it is in the note headed 'Where the work stands'.",
		answered: "The sandbox restarted while this conversation was waiting for the user to respond; it is back, and their response follows below: continue from where the session left off."
	}, Aj.answered;
})), Mj = v((() => {})), Nj = v((() => {})), Pj = v((() => {})), Fj, Ij = v((() => {
	G(), Fj = [
		"editor",
		"read",
		"drive",
		"land"
	], B(Fj);
})), Lj, Rj, zj, Bj, Vj, Hj, Uj = v((() => {
	Bh(), Lj = [
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
	], Rj = Lj, Rj.filter((e) => e.versioned).map((e) => e.path), Rj.filter((e) => e.versioned || e.authored).map((e) => e.path), zj = {
		config: `${Rh}/config`,
		records: `${Rh}/records`,
		local: `${Rh}/local`,
		identity: `${Rh}/identity`,
		secrets: `${Rh}/secrets`
	}, Bj = Object.keys(zj), Vj = (e) => {
		switch (e.portability) {
			case "secret": return "secrets";
			case "identity": return "identity";
			case "derived": return "local";
			case "carry": return e.versioned === !0 || e.authored === !0 ? "config" : "records";
		}
	}, Bj.flatMap((e) => {
		let t = Rj.filter((t) => Vj(t) === e);
		return t.some((e) => e.versioned === !0) ? t.filter((e) => e.versioned !== !0).map((e) => e.path) : [`${zj[e]}/`];
	}), Hj = Rj.filter((e) => e.backup !== !1 && (e.portability === "carry" || e.portability === "identity")).map((e) => e.path), Rj.filter((e) => !Hj.includes(e.path)).map((e) => e.path), Rj.filter((e) => e.invalidates.includes("manifests")).map((e) => e.path), `${Rh}`, `${Rh}`;
})), Wj = v((() => {})), Gj = v((() => {})), Kj = v((() => {})), qj = v((() => {})), Jj = v((() => {})), Yj = v((() => {})), Xj, Zj = v((() => {
	Xj = (e) => e instanceof Error ? e.message : String(e);
})), Qj = v((() => {})), $j, eM, tM, nM, rM = v((() => {
	$j = /(?:auth[_-]?token|access[_-]?token|refresh[_-]?token|api[_-]?key|access[_-]?key|secret[_-]?key|client[_-]?secret|private[_-]?key|passwo?rd|passphrase|credentials?|secret|token|bearer)["']?[ \t]*[:=][ \t]*(?:"([^"\n]*)"|'([^'\n]*)'|([^\s"',;}\n]*))/gi, eM = [
		/-----BEGIN (?:[A-Z0-9]+ )*PRIVATE KEY-----/,
		/PuTTY-User-Key-File-\d/,
		/\b[a-z][a-z0-9+.-]*:\/\/[^\s/:@]+:(?!\*+@)[^\s/@]{3,}@/i
	], tM = [
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
	], [...eM, ...tM], nM = (e) => e.map((e) => new RegExp(e.source, `${e.flags}g`)), nM(tM), new RegExp($j.source, $j.flags);
})), iM = v((() => {})), aM, oM = v((() => {
	aM = 80, aM * .6;
})), sM = v((() => {
	oM(), Uj();
})), cM = v((() => {})), lM = v((() => {
	zT();
})), uM = v((() => {
	G(), L({
		type: V("hello"),
		token: M(),
		version: M()
	});
})), dM = v((() => {
	G(), L({
		type: V("hello"),
		token: M(),
		version: M()
	});
})), fM = v((() => {})), pM, mM = v((() => {
	G(), Lm(), L({
		provider: M().min(1),
		type: M().min(1),
		id: M(),
		channelId: M(),
		author: L({
			id: M(),
			name: M(),
			groups: I(M()).optional()
		}),
		content: M(),
		mentioned: F().optional(),
		branch: M().optional(),
		history: I(L({
			author: L({
				id: M(),
				name: M()
			}),
			content: M(),
			timestamp: M(),
			self: F().optional()
		})).optional(),
		timestamp: M(),
		extra: z(M(), Tu()).optional()
	}), pM = L({
		state: B([
			"waiting",
			"code",
			"failed"
		]),
		code: M().optional(),
		detail: M().optional(),
		since: P().optional()
	}), Im.extend({
		whisperReady: F().optional(),
		pairing: z(M(), pM).optional()
	});
})), hM = v((() => {})), gM = v((() => {})), _M = v((() => {})), vM = v((() => {})), yM = v((() => {})), bM, xM = v((() => {
	bM = {
		cautious: 0,
		balanced: .25,
		eager: .4
	}, bM.balanced;
})), SM = v((() => {})), CM, wM, TM, EM, DM, OM = v((() => {
	G(), CM = [
		"claude",
		"codex",
		"cursor",
		"opencode",
		"translator"
	], wM = B(CM), TM = L({
		kind: B([
			"blessed",
			"latest",
			"pinned",
			"image"
		]).describe("Where this engine's version comes from."),
		version: M().optional().describe("Which version, when it is pinned to one.")
	}), EM = L({
		version: M().describe("Which version was refused."),
		reason: M().describe("What was wrong with it: it would not launch, or it did not export what the daemon calls."),
		at: M().describe("When it was refused.")
	}), DM = L({
		id: wM.describe("Which engine."),
		label: M().describe("What it is called on screen."),
		running: L({
			version: M().optional().describe("The version a turn would use right now. Absent means there is no copy of this engine here yet."),
			source: B(["image", "store"]).describe("Whether that version is the one baked into the sandbox image or one the store installed over it.")
		}).describe("What a turn started now would actually run."),
		baked: M().optional().describe("The version the image bakes, which is the floor everything else falls back to. Absent on an image that carries no copy of it."),
		channel: TM.describe("The owner's standing answer for this engine."),
		offered: L({
			version: M().describe("The version this engine would move to."),
			blessed: F().describe("Whether the blessed list names this version, which on the latest channel is routinely no.")
		}).optional().describe("A newer version waiting, absent when the running one is already what the channel asks for."),
		blessed: M().optional().describe("What the blessed list names for this engine, when the list has been read."),
		previous: M().optional().describe("The version kept one step back, which is what going back means."),
		quarantined: I(EM).describe("Versions the store installed and then refused, with the reason."),
		diskBytes: P().int().nonnegative().describe("What this engine's kept versions cost on the daemon's volume."),
		installing: F().optional().describe("Whether this engine is currently being installed in the background.")
	}), L({
		engines: I(DM).describe("Every engine this sandbox can run, whether or not the store holds anything for it."),
		checkedAt: M().optional().describe("When upstream was last asked what it publishes. Absent until the first check has run."),
		listSource: M().describe("Where the blessed list is read from, so a self-hosted sandbox can show its own."),
		listReadAt: M().optional().describe("When that list was last read. Absent means it has never been reachable from here.")
	}), L({
		id: wM.describe("Which engine."),
		kind: B([
			"blessed",
			"latest",
			"pinned",
			"image"
		]).describe("Where its version should come from."),
		version: M().optional().describe("Which version, required when pinning and ignored otherwise.")
	}), L({
		id: wM.describe("Which engine."),
		version: M().optional().describe("Which version. Leave it out for whatever the channel offers; naming one takes a version nobody has blessed, deliberately."),
		floor: M().optional().describe("Install the lowest published version at or above this one. What a turn refused for being too old sends back.")
	}), L({ id: wM.describe("Which engine.") }), L({
		ok: V(!0).describe("It went through."),
		version: M().describe("Which version is now active."),
		source: B(["image", "store"]).describe("Whether that is the image's copy or the store's."),
		fromNextTurn: F().describe("Whether the change reaches turns already in flight, or only the next one.")
	});
})), kM, AM, jM, MM, NM, PM, FM, IM, LM, RM = v((() => {
	G(), kM = L({
		content: M(),
		hash: M()
	}), AM = L({
		bornAt: P(),
		at: P(),
		apt: I(M()),
		paths: I(M())
	}), jM = B([
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
	]), MM = L({
		tool: M(),
		kind: jM,
		sessions: I(M()),
		commands: I(M()),
		firstAt: P(),
		lastAt: P(),
		count: P(),
		declinedAt: P().optional()
	}), L({
		installs: I(MM),
		drift: AM.optional()
	}), NM = L({
		tool: M(),
		kind: jM,
		sessions: P(),
		lastAt: P(),
		live: F(),
		drafted: F().optional(),
		declined: F().optional(),
		step: M().optional()
	}), L({
		tool: M().min(1),
		decision: B([
			"adopt",
			"dismiss",
			"restore"
		])
	}), PM = L({
		base: M(),
		root: M().optional()
	}), L({
		proposal: kM.optional(),
		custom: kM.optional(),
		approved: kM.optional(),
		appliedHash: M().optional(),
		container: M().optional(),
		drift: AM.optional(),
		recurring: I(NM).optional(),
		localImage: PM.optional()
	}), L({ hash: M().min(1) }), FM = L({
		name: M(),
		version: M().optional()
	}), IM = L({
		id: M(),
		name: M(),
		origin: B([
			"custom",
			"capability",
			"base"
		]),
		originLabel: M().optional(),
		state: B([
			"active",
			"after-rebuild",
			"awaiting-approval"
		]),
		tools: I(FM),
		extras: P().optional(),
		purpose: M().optional(),
		detail: M().optional(),
		commands: M().optional()
	}), L({ items: I(IM) }), LM = L({
		name: M(),
		status: B([
			"packing",
			"ready",
			"failed"
		]),
		bytes: P(),
		createdAt: P(),
		secrets: F(),
		error: M().optional()
	}), L({ exports: I(LM) });
})), zM, BM, VM, HM, UM, WM = v((() => {
	G(), _p(), zM = B([
		"definition",
		"bundle",
		"hermes",
		"openclaw"
	]), BM = B(["hermes", "openclaw"]), VM = B([
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
	]), HM = L({
		id: M(),
		group: VM,
		label: M(),
		detail: M().optional(),
		applicable: F(),
		reason: M().optional(),
		recommended: F(),
		secrets: I(M())
	}), L({
		source: zM,
		token: M(),
		name: M().optional(),
		items: I(HM),
		carriesSecrets: F(),
		refused: I(M()),
		needsAction: I(gp)
	}), L({
		token: M(),
		items: I(M()),
		includeSecrets: F()
	}), L({
		applied: I(L({
			id: M(),
			group: VM,
			label: M()
		})),
		failed: I(L({
			id: M(),
			label: M(),
			error: M()
		})),
		refused: I(M()),
		needsAction: I(gp),
		presentation: L({
			name: M().optional(),
			image: M().optional()
		}).optional()
	}), UM = L({
		id: M(),
		online: F(),
		found: BM.optional(),
		detail: M().optional()
	}), L({ hosts: I(UM) }), L({ host: M().min(1) });
})), GM, KM, qM, JM, YM, XM, ZM = v((() => {
	G(), _p(), LS(), JE(), GM = Du({
		id: M().min(1),
		remote: M().min(1),
		ref: M().optional()
	}), KM = Du({
		remote: M().min(1),
		ref: M().optional()
	}), qM = Du({
		baseImage: M().optional(),
		dockerfile: M().optional()
	}), JM = (e) => {
		let t = e;
		for (; t instanceof Fd || t instanceof Id;) t = t.unwrap();
		return t;
	}, YM = () => Du(Object.fromEntries(Object.entries(jE.shape).map(([e, t]) => [e, JM(t).optional()]))).prefault({}), XM = Du({
		schemaVersion: V(1),
		name: M().optional(),
		environment: qM.prefault({}),
		workspace: KM.optional(),
		repositories: I(GM).prefault([]),
		capabilities: I(wS).prefault([]),
		secrets: I(M()).prefault([]),
		settings: YM()
	}), L({
		toml: M(),
		omitted: I(gp)
	}), L({ differences: I(gp) }), L({
		remote: M().min(1).optional(),
		name: M().min(1).optional(),
		owner: M().min(1).optional()
	}), L({
		remote: M(),
		branch: M(),
		created: F()
	}), L({
		remote: M().optional(),
		branch: M().optional(),
		hosts: I(M())
	}), L({
		version: V(3),
		sandbox: L({ name: M() }).optional(),
		presentation: L({
			name: M().optional(),
			image: M().optional()
		}).optional(),
		createdAt: P(),
		secrets: F(),
		repos: I(M()),
		definition: XM,
		excluded: I(L({
			path: M(),
			portability: M(),
			note: M().optional()
		}))
	});
})), QM = v((() => {})), $M = v((() => {})), eN = v((() => {})), tN = v((() => {})), nN = v((() => {})), rN = v((() => {
	Gh();
})), iN, aN, oN = v((() => {
	af(), jm(), zm(), ov(), Zy(), ub(), fb(), iC(), UC(), GC(), YC(), ZC(), LT(), fD(), KD(), JD(), QD(), eO(), nO(), pO(), hO(), SO(), kO(), LO(), BO(), UO(), $O(), tk(), rk(), lk(), _k(), yk(), xk(), gA(), vA(), xA(), CA(), KA(), yj(), bj(), Ej(), Dj(), Oj(), K_(), Fh(), jj(), rx(), B_(), Mj(), Nj(), Pj(), af(), Ij(), Bh(), Uj(), Wj(), Gj(), Kj(), qj(), Jj(), dp(), hp(), RT(), Yj(), QT(), Qj(), lE(), rM(), iM(), ep(), sM(), lM(), uM(), dM(), fM(), wp(), mM(), hM(), gM(), _M(), cM(), zT(), ap(), vM(), yM(), xM(), Gh(), SM(), Lm(), X(), Ug(), cb(), Jv(), LS(), sy(), Gg(), _C(), tA(), OM(), RM(), vx(), FT(), qg(), Yy(), WD(), iv(), Ek(), XD(), jx(), wv(), dO(), sg(), VC(), QS(), bO(), uD(), sm(), DO(), Dm(), lm(), FO(), ZO(), nC(), nh(), sk(), JE(), g_(), $(), mA(), l_(), hk(), Jx(), Tj(), WA(), fj(), fC(), _j(), zb(), WM(), ZM(), QM(), $M(), eN(), oM(), Dk(), tN(), nN(), rN(), iN = {
		accounts: Am,
		activity: Rm,
		agent: av,
		agents: Xy,
		approvals: lb,
		automations: db,
		capabilities: rC,
		chores: HC,
		ci: WC,
		endpoints: JC,
		extensions: IT,
		personas: dD,
		safety: ek,
		sessions: ck,
		settings: gk,
		share: vk,
		skills: bk,
		intentic: ZD,
		git: GD,
		history: qD,
		workspace: vj,
		inventory: $D,
		issues: tO,
		logs: fO,
		loops: mO,
		panels: xO,
		ports: OO,
		public: IO,
		prepush: zO,
		providers: HO,
		push: QO,
		secrets: nk,
		system: hA,
		translator: _A,
		usage: bA,
		vpn: SA,
		exit: XC,
		workflows: GA
	}, aN = Qd(iN), aN.map((e) => e.name), rf(iN);
})), sN, cN, lN = v((() => {
	({bindHost: sN, host: cN} = e("ext-maintenance"));
})), uN, dN, fN, pN, mN, hN, gN, _N, vN, yN, bN, xN, SN, CN = v((() => {
	Bh(), uN = 64, dN = 8, fN = 0, pN = (e) => `r${e.toString(36).padStart(dN, "0")}${(fN++).toString(36)}`, mN = (e, t, n) => `${e.prefix}-${t}${n === void 0 ? "" : `-${n}`}`.slice(0, uN).replace(/[-_]+$/u, ""), hN = (e) => `${e.prefix}-`, gN = (e) => `${Rh}/${e.runsDir}`, _N = (e, t) => `${gN(e)}/${t}`, vN = (e, t) => `${_N(e, t)}/run.json`, yN = (e, t, n) => n === void 0 ? _N(e, t) : `${_N(e, t)}/${n}`, bN = (e, t, n) => `${yN(e, t, n)}/result.json`, xN = (e, t) => {
		try {
			let n = JSON.parse(e);
			return typeof n != "object" || !n ? void 0 : t(n);
		} catch {
			return;
		}
	}, SN = (e) => [
		`When you are finished, write your conclusion to ${e.path} as JSON:`,
		e.fields,
		...e.outcomes === void 0 ? [] : [e.outcomes],
		"Write that file even if you conclude there was nothing to do."
	].join("\n\n");
})), wN, TN, EN, DN, ON, kN, AN, jN, MN, NN, PN, FN, IN, LN = v((() => {
	CN(), wN = {
		runsDir: "records/chores/runs",
		prefix: "mt",
		scanRuns: 30
	}, TN = gN(wN), EN = wN.scanRuns, DN = hN(wN), ON = (e) => pN(e), kN = (e) => mN(wN, e), AN = (e) => vN(wN, e), jN = (e) => bN(wN, e), MN = /* @__PURE__ */ new Set([
		"acted",
		"reported",
		"clean"
	]), NN = (e) => xN(e, (e) => {
		let t = e, { runId: n, repo: r, chore: i } = t;
		if (typeof n == "string" && typeof r == "string" && typeof i == "string") return {
			createdAt: 0,
			digest: "",
			headline: "",
			conversationId: kN(n),
			...t,
			runId: n,
			repo: r,
			chore: i
		};
	}), PN = (e) => xN(e, ({ outcome: e, summary: t }) => typeof e != "string" || !MN.has(e) ? void 0 : {
		outcome: e,
		summary: typeof t == "string" ? t : ""
	}), FN = (e) => {
		let t = e.split("`");
		return t.length % 2 == 0 ? [{
			text: e,
			code: !1
		}] : t.map((e, t) => ({
			text: e,
			code: t % 2 == 1
		}));
	}, IN = (e) => SN({
		path: jN(e),
		fields: "{\"outcome\": \"acted\" | \"reported\" | \"clean\", \"summary\": \"<one or two sentences>\"}",
		outcomes: "Use \"acted\" if you changed something, \"reported\" if you are handing back findings without changing anything, and \"clean\" if you checked and the findings did not hold up: a tool was wrong, or the situation is deliberate. \"clean\" is a good outcome and the most useful one you can give when it is true: it is what stops this chore being raised again over the same evidence."
	});
})), RN, zN, BN, VN, HN = v((() => {
	oN(), lN(), LN(), RN = async () => IC.parse(await cN().sandbox.json("/chores")), zN = () => ({
		queryKey: cN().sandbox.key("maintenance-report"),
		queryFn: RN
	}), BN = async () => {
		let e = cN(), t = await e.sandbox.json(`/workspace/children?path=${encodeURIComponent(TN)}`).catch(() => void 0);
		if (t === void 0) return [];
		let n = vb.parse(t).entries.filter((e) => e.type === "dir").toSorted((e, t) => t.path.localeCompare(e.path)).slice(0, EN);
		return (await Promise.all(n.map(async (t) => {
			let n = await e.workspace.file(`${t.path}/run.json`), r = n === void 0 ? void 0 : NN(n);
			if (r === void 0) return;
			let i = await e.workspace.file(jN(r.runId));
			return {
				manifest: r,
				result: i === void 0 ? void 0 : PN(i)
			};
		}))).flatMap((e) => e === void 0 ? [] : [e]).toSorted((e, t) => t.manifest.createdAt - e.manifest.createdAt);
	}, VN = () => ({
		queryKey: cN().sandbox.key("maintenance-runs"),
		queryFn: BN
	});
})), UN, WN, GN, KN, qN, JN = v((() => {
	Zn(), oN(), HN(), lN(), UN = t(cN, `${Rh}/records/chores/seen.json`), {state: WN, start: GN} = n({
		host: cN,
		everyMs: 6e5,
		initial: () => [],
		read: async (e) => Yn(Jn(await e.sandbox.fetch(zN()), Date.now()), await UN.read())
	}), KN = () => {
		let e = WN.value.length;
		if (e === 0) return;
		let t = WN.value.filter((e) => e.severity === "warning"), n = t.length > 0 ? t : WN.value;
		return {
			count: e,
			tone: t.length > 0 ? "warning" : "info",
			tooltip: `${n.length === 1 ? "" : `${n.length} chores, newest: `}${n[0]?.chore.title}, ${n[0]?.headline}`
		};
	}, qN = async (e) => {
		let t = e.filter((e) => e.state === "due");
		t.length !== 0 && await UN.mark(Object.fromEntries(t.map((e) => [qn(e.repo, e.chore.id), e.digest]))) && (WN.value = WN.value.filter((e) => !t.includes(e)));
	};
})), YN, XN, ZN, QN, $N, eP, tP, nP, rP, iP, aP, oP, sP, cP, lP, uP, dP, fP, pP, mP, hP, gP, _P, vP, yP, bP, xP, SP, CP, wP, TP, EP, DP, OP, kP, AP, jP = v((() => {
	Zn(), lN(), LN(), YN = { class: "flex min-w-0 flex-1 flex-col gap-0.5 font-normal @lg:flex-row @lg:items-center @lg:gap-3" }, XN = { class: "@lg:shrink-0 flex min-w-0 items-center gap-2" }, ZN = { class: "min-w-0 truncate text-content" }, QN = {
		key: 0,
		class: "shrink-0 rounded bg-content/5 px-1.5 py-0.5 text-2xs text-subtle"
	}, $N = { class: "flex min-w-0 flex-1 items-baseline gap-2" }, eP = { class: "min-w-0 truncate text-xs text-subtle" }, tP = {
		key: 0,
		class: "shrink-0 text-2xs text-subtle/70"
	}, nP = ["title"], rP = { class: "lowercase" }, iP = { class: "@lg:inline hidden text-subtle/70" }, aP = { class: "@lg:px-2" }, oP = {
		key: 0,
		class: "mb-3 flex items-start gap-2 rounded-lg bg-info/10 px-3 py-2"
	}, sP = { class: "flex min-w-0 flex-col gap-0.5" }, cP = { class: "flex flex-wrap items-baseline gap-x-2" }, lP = { class: "text-xs text-content" }, uP = { class: "text-2xs text-subtle" }, dP = {
		key: 1,
		class: "mb-3 flex items-start gap-2 rounded-lg bg-success/10 px-3 py-2"
	}, fP = { class: "flex min-w-0 flex-col gap-0.5" }, pP = { class: "text-xs text-content" }, mP = {
		key: 0,
		class: "text-2xs text-subtle"
	}, hP = {
		key: 1,
		class: "flex flex-wrap items-baseline gap-x-1.5 text-2xs"
	}, gP = { class: "text-subtle line-through" }, _P = { class: "whitespace-nowrap text-content" }, vP = {
		key: 2,
		class: "grid max-w-read grid-cols-facts items-baseline gap-x-3 gap-y-1"
	}, yP = { class: "font-mono text-2xs text-subtle" }, bP = { class: "min-w-0 break-words font-mono text-2xs text-content" }, xP = { class: "mt-3 max-w-read text-2xs leading-relaxed text-subtle" }, SP = { class: "text-content" }, CP = {
		key: 4,
		class: "mt-3 flex max-w-read flex-col gap-1.5 rounded-lg bg-content/5 px-3 py-2"
	}, wP = { class: "flex flex-wrap items-center gap-x-2 gap-y-1 text-2xs text-subtle" }, TP = {
		key: 0,
		class: "rounded bg-content/10 px-1 font-mono text-2xs"
	}, EP = {
		key: 5,
		class: "mt-3 max-w-read text-2xs leading-relaxed text-subtle"
	}, DP = { class: "mt-4 flex flex-wrap items-center gap-2 border-t border-line/60 pt-3" }, OP = 8, kP = 220, AP = /*@__PURE__*/ f({
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
			let n = t, l = xe(() => cN().models, "maintenance-chore"), f = () => {
				n("start", l.overridden.value ? l.model.value : void 0), l.clear();
			}, re = i(() => e.measuring.filter((t) => t.repo === e.verdict.repo && e.verdict.chore.needs.includes(t.id))), ce = i(() => re.value.length > 0), le = Se(ce), ue = i(() => {
				let e = re.value.map((e) => e.startedAt).filter((e) => e !== void 0);
				if (e.length === 0) return "waiting for the machine";
				let t = Math.max(0, Math.round((le.value - Math.min(...e)) / 1e3));
				return t < 60 ? `${t}s` : `${Math.floor(t / 60)}m ${t % 60}s`;
			}), de = i(() => re.value.map((e) => zn(e.id).measures).join(" and ")), fe = i(() => e.verdict.chore.needs.map((e) => zn(e).measures).join(" and ")), pe = i(() => e.verdict.chore.needs.some((e) => zn(e).tier === 2)), me = i(() => e.verdict.measuredAt === void 0 ? "Measure now" : "Re-measure"), he = i(() => ce.value ? `Measuring ${de.value}${pe.value ? ": a deep check can take a few minutes" : ""}` : `Measure ${fe.value} again now${pe.value ? ", a deep check can take a few minutes" : ""}`), ve = ee(), Ce = ee();
			ne(ce, (t, n) => {
				if (t) {
					ve.value = e.verdict.headline, Ce.value = void 0;
					return;
				}
				n === !0 && ve.value !== void 0 && (Ce.value = {
					from: ve.value,
					to: e.verdict.headline
				}, ve.value = void 0);
			});
			let we = i(() => e.run?.running === !0 ? e.run.manifest.conversationId : void 0), Te = i(() => we.value === void 0 && e.verdict.state !== "clear" ? Gn(e.verdict) : void 0), Ee = i(() => Kn(e.verdict)), v = {
				acted: "changed something",
				reported: "changed nothing and handed back what it found",
				clean: "looked, and the findings did not hold up"
			}, De = i(() => {
				let e = Te.value;
				if (e === void 0) return "";
				let t = `A turn ran against exactly this evidence ${ye(e.ranAt, { days: !0 })} and ${v[e.outcome] ?? e.outcome}.`;
				return Ee.value ? `${t} Open the row to read it.` : `${t} It is being asked again on this chore's own cadence.`;
			}), y = i(() => ce.value ? {
				variant: "info",
				label: "measuring"
			} : e.verdict.state === "due" ? Ee.value ? {
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
			}), Oe = i(() => e.verdict.measuredAt === void 0 ? void 0 : `measured ${ye(e.verdict.measuredAt)}`), ke = i(() => e.verdict.state === "stale" ? e.run === void 0 ? "This measurement was taken before the last turn against this chore, and nothing has measured since." : `This measurement was taken before the turn that ran ${ye(e.run.manifest.createdAt)}, and nothing has measured since.` : e.verdict.settled && e.run !== void 0 ? `Re-measured since the turn that ran ${ye(e.run.manifest.createdAt)}, and the evidence has not moved.` : void 0), Ae = i(() => e.verdict.detail.map((e) => {
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
			})), b = ee(!1), je = i(() => b.value ? Ae.value : Ae.value.slice(0, OP)), Me = i(() => FN(e.run?.result?.summary ?? "")), Ne = ee(!1), Pe = i(() => (e.run?.result?.summary ?? "").length > kP), Fe = i(() => {
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
				e || (b.value = !1, Ne.value = !1);
			}), (t, i) => (m(), a(g(oe), {
				class: "@container border-t border-line/60 first:border-t-0",
				density: "compact",
				body: "drawer",
				open: e.expanded,
				"onUpdate:open": i[7] ||= (e) => n("toggle")
			}, {
				lead: _(({ iconClass: t }) => [d(g(se), {
					name: e.verdict.chore.icon,
					class: p(["shrink-0 text-muted", t])
				}, null, 8, ["name", "class"])]),
				title: _(() => [c("span", YN, [c("span", XN, [c("span", ZN, h(e.verdict.chore.title), 1), e.showRepo ? (m(), s("span", QN, h(g(lt)(e.verdict.repo)), 1)) : o("", !0)]), c("span", $N, [c("span", eP, h(e.verdict.headline), 1), Oe.value ? (m(), s("span", tP, h(Oe.value), 1)) : o("", !0)])])]),
				meta: _(() => [
					we.value || ce.value ? (m(), a(g(se), {
						key: 0,
						name: "spinner",
						spin: "",
						class: "shrink-0 text-subtle"
					})) : o("", !0),
					Te.value ? (m(), s("span", {
						key: 1,
						title: De.value,
						class: "ui-status-pill flex shrink-0 items-center gap-1 border border-line/60 text-2xs text-subtle"
					}, [
						d(g(se), {
							name: "check-circle",
							class: "text-2xs"
						}),
						c("span", rP, h(Te.value.outcome), 1),
						c("span", iP, h(g(_e)(Te.value.ranAt)), 1)
					], 8, nP)) : o("", !0),
					y.value ? (m(), a(g(ge), {
						key: 2,
						variant: y.value.variant,
						label: y.value.label,
						size: "xs",
						class: "shrink-0"
					}, null, 8, ["variant", "label"])) : o("", !0)
				]),
				below: _(() => [c("div", aP, [
					ce.value ? (m(), s("div", oP, [d(g(se), {
						name: "spinner",
						spin: "",
						class: "mt-0.5 shrink-0 text-xs text-info"
					}), c("span", sP, [c("span", cP, [c("span", lP, "Measuring " + h(de.value) + "…", 1), c("span", uP, h(ue.value), 1)]), i[8] ||= c("span", { class: "text-2xs text-subtle/70" }, "The figures below are the ones being replaced.", -1)])])) : Ce.value ? (m(), s("div", dP, [d(g(se), {
						name: "check-circle",
						class: "mt-0.5 shrink-0 text-xs text-success"
					}), c("span", fP, [c("span", pP, "Re-measured just now." + h(Ce.value.from === Ce.value.to ? " Nothing changed." : ""), 1), Ce.value.from === Ce.value.to ? (m(), s("span", mP, h(Ce.value.to), 1)) : (m(), s("span", hP, [c("span", gP, h(Ce.value.from), 1), c("span", _P, [d(g(se), {
						name: "arrow-right",
						class: "text-2xs text-subtle"
					}), u(" " + h(Ce.value.to), 1)])]))])])) : o("", !0),
					je.value.length > 0 ? (m(), s("ul", vP, [(m(!0), s(r, null, te(je.value, (e) => (m(), s("li", {
						key: e.key,
						class: "contents"
					}, [c("span", yP, h(e.tag), 1), c("span", bP, h(e.claim), 1)]))), 128))])) : o("", !0),
					Ae.value.length > OP ? (m(), s("button", {
						key: 3,
						type: "button",
						class: p(g(be).linkButton("mt-1.5 text-2xs text-subtle hover:text-content")),
						onClick: i[0] ||= (e) => b.value = !b.value
					}, h(b.value ? "Show fewer" : `Show all ${Ae.value.length}`), 3)) : o("", !0),
					c("p", xP, [
						u(h(e.verdict.chore.description) + " ", 1),
						c("span", SP, h(e.verdict.state === "due" ? "Shown because" : "Shows when") + ":", 1),
						u(" " + h(e.verdict.chore.criterion), 1)
					]),
					e.run ? (m(), s("div", CP, [
						c("div", wP, [
							d(g(ge), {
								variant: Fe.value.variant,
								label: Fe.value.label,
								size: "xs"
							}, null, 8, ["variant", "label"]),
							c("span", null, h(g(ye)(e.run.manifest.createdAt)), 1),
							c("button", {
								type: "button",
								class: "cursor-pointer underline hover:text-content",
								onClick: i[1] ||= (t) => n("open", e.run.manifest.conversationId)
							}, " open the transcript ")
						]),
						e.run.result?.summary ? (m(), s("p", {
							key: 0,
							class: p(["text-xs leading-relaxed text-content", Ne.value ? void 0 : "line-clamp-3"])
						}, [(m(!0), s(r, null, te(Me.value, (e, t) => (m(), s(r, { key: t }, [e.code ? (m(), s("code", TP, h(e.text), 1)) : (m(), s(r, { key: 1 }, [u(h(e.text), 1)], 64))], 64))), 128))], 2)) : o("", !0),
						Pe.value ? (m(), s("button", {
							key: 1,
							type: "button",
							class: p(g(be).linkButton("w-fit text-2xs text-subtle hover:text-content")),
							onClick: i[2] ||= (e) => Ne.value = !Ne.value
						}, h(Ne.value ? "Show less" : "Show more"), 3)) : o("", !0)
					])) : o("", !0),
					ke.value ? (m(), s("p", EP, h(ke.value), 1)) : o("", !0),
					c("div", DP, [
						e.verdict.prompt !== void 0 && e.verdict.state !== "clear" ? (m(), a(g(ie), {
							key: 0,
							label: Ee.value ? "Run it again" : e.verdict.chore.stance === "act" ? "Fix it" : "Look into it",
							icon: "play",
							picker: g(l),
							disabled: e.busy || ce.value || we.value !== void 0,
							onRun: f
						}, null, 8, [
							"label",
							"picker",
							"disabled"
						])) : o("", !0),
						e.verdict.chore.needs.length > 0 ? (m(), a(g(ae), {
							key: 1,
							size: "small",
							severity: "secondary",
							label: ce.value ? "Measuring…" : me.value,
							title: he.value,
							disabled: e.busy || ce.value,
							onClick: i[3] ||= (e) => n("remeasure")
						}, {
							icon: _(() => [d(g(se), {
								name: ce.value ? "spinner" : "refresh",
								spin: ce.value
							}, null, 8, ["name", "spin"])]),
							_: 1
						}, 8, [
							"label",
							"title",
							"disabled"
						])) : o("", !0),
						we.value ? (m(), a(g(ae), {
							key: 2,
							size: "small",
							severity: "secondary",
							text: "",
							label: "Watch it",
							onClick: i[4] ||= (e) => n("open", we.value)
						})) : o("", !0),
						e.verdict.state === "due" ? (m(), a(g(ae), {
							key: 3,
							size: "small",
							severity: "secondary",
							text: "",
							label: "Not now",
							title: "Keep it listed, keep it out of the rail, for a month",
							onClick: i[5] ||= (e) => n("snooze")
						})) : o("", !0),
						e.verdict.state === "snoozed" ? (m(), a(g(ae), {
							key: 4,
							size: "small",
							severity: "secondary",
							text: "",
							label: "Un-snooze",
							onClick: i[6] ||= (e) => n("unsnooze")
						})) : o("", !0)
					])
				])]),
				_: 1
			}, 8, ["open"]));
		}
	});
})), MP, NP = v((() => {
	jP(), jP(), MP = AP;
})), PP, FP, IP, LP, RP = v((() => {
	PP = {
		class: "flex flex-col gap-6",
		role: "status",
		"aria-busy": "true",
		"aria-label": "Reading the evidence"
	}, FP = { class: "flex h-5 items-center gap-3" }, IP = { class: "min-w-0 flex-1" }, LP = /*@__PURE__*/ f({
		__name: "MaintenanceSkeleton",
		props: { imprint: {} },
		setup(e) {
			let t = [{ rows: [{
				title: "w-40",
				headline: "w-64",
				badge: "w-14"
			}, {
				title: "w-32",
				headline: "w-44",
				badge: "w-9"
			}] }, { rows: [{
				title: "w-36",
				headline: "w-80",
				badge: "w-14"
			}, {
				title: "w-52",
				headline: "w-52",
				badge: "w-16"
			}] }];
			return (n, i) => (m(), a(g(me), {
				of: e.imprint,
				label: "Reading the evidence"
			}, {
				default: _(() => [c("div", PP, [(m(), s(r, null, te(t, (e, t) => d(g(fe), { key: t }, {
					default: _(() => [(m(!0), s(r, null, te(e.rows, (e, t) => (m(), s("div", {
						key: t,
						class: "border-t border-line/60 px-4 py-2.5 first:border-t-0"
					}, [c("div", FP, [
						i[0] ||= c("span", { class: "skeleton h-3 w-3 shrink-0" }, null, -1),
						i[1] ||= c("span", { class: "skeleton h-4 w-4 shrink-0" }, null, -1),
						c("span", { class: p(["skeleton h-3.5 shrink-0", e.title]) }, null, 2),
						c("div", IP, [c("span", { class: p(["skeleton block h-3 max-w-full", e.headline]) }, null, 2)]),
						c("span", { class: p(["skeleton h-5 shrink-0 rounded-full", e.badge]) }, null, 2)
					])]))), 128))]),
					_: 2
				}, 1024)), 64))])]),
				_: 1
			}, 8, ["of"]));
		}
	});
})), zP, BP = v((() => {
	RP(), RP(), zP = LP;
})), VP, HP, UP, WP, GP, KP, qP, JP, YP = v((() => {
	Zn(), VP = {
		key: 0,
		class: "border-t border-line/60 pt-3"
	}, HP = ["aria-expanded"], UP = {
		key: 0,
		class: "@container flex flex-col gap-2 pt-1.5 pl-4"
	}, WP = { class: "text-2xs text-content" }, GP = { class: "mt-1 grid grid-cols-1 gap-x-4 gap-y-0.5 @md:grid-cols-facts" }, KP = { class: "text-2xs text-subtle" }, qP = { class: "text-2xs text-subtle/70" }, JP = /*@__PURE__*/ f({
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
			}, a = (t) => n(e.probes.flatMap((e) => e.state === t ? [{
				cause: e.reason ?? "not available in this repository",
				name: zn(e.id).title.toLowerCase()
			}] : [])), l = i(() => a("unavailable")), u = i(() => a("failed")), f = i(() => n(e.inapplicable.map((e) => ({
				cause: e.headline,
				name: e.chore.title.toLowerCase()
			})))), ne = (e) => e.reduce((e, t) => e + t.names.length, 0), _ = (e, t, n) => `${e} ${e === 1 ? t : n}`, re = i(() => [
				e.inapplicable.length === 0 ? void 0 : `${_(e.inapplicable.length, "chore does", "chores do")} not apply here`,
				ne(l.value) === 0 ? void 0 : `${_(ne(l.value), "measurement", "measurements")} unavailable`,
				ne(u.value) === 0 ? void 0 : `${_(ne(u.value), "measurement", "measurements")} failed`
			].filter((e) => e !== void 0).join(" · ")), ie = i(() => [
				{
					label: "Not applicable",
					groups: f.value
				},
				{
					label: "Not measured",
					groups: l.value
				},
				{
					label: "Measurement failed",
					groups: u.value
				}
			].filter((e) => e.groups.length > 0));
			return (e, n) => re.value === "" ? o("", !0) : (m(), s("div", VP, [c("button", {
				type: "button",
				class: p(g(be).textAction("text-2xs text-subtle")),
				"aria-expanded": t.value,
				onClick: n[0] ||= (e) => t.value = !t.value
			}, [d(g(se), {
				name: t.value ? "chevron-down" : "chevron-right",
				class: "text-2xs"
			}, null, 8, ["name"]), c("span", null, h(re.value), 1)], 10, HP), t.value ? (m(), s("div", UP, [(m(!0), s(r, null, te(ie.value, (e) => (m(), s("div", { key: e.label }, [c("p", WP, h(e.label), 1), c("dl", GP, [(m(!0), s(r, null, te(e.groups, (e) => (m(), s(r, { key: e.cause }, [c("dt", KP, h(e.cause), 1), c("dd", qP, h(e.names.join(" · ")), 1)], 64))), 128))])]))), 128))])) : o("", !0)]));
		}
	});
})), XP, ZP = v((() => {
	YP(), YP(), XP = JP;
}));
//#endregion
//#region src/useChores.ts
function QP() {
	let e = cN(), t = Te(), n = i(() => e.sandbox.key("maintenance-report")), r = ee(/* @__PURE__ */ new Map()), a = we({
		queryKey: n,
		enabled: i(() => e.sandbox.reachable()),
		refetchInterval: (e) => r.value.size > 0 || (e.state.data?.running ?? []).length > 0 ? eF : $P,
		queryFn: () => zN().queryFn()
	}), o = i(() => {
		let e = a.data.value?.running ?? [], t = new Set(e.map((e) => nF(e.repo, e.id))), n = [...r.value].flatMap(([e, n]) => {
			let [r, i] = e.split("|");
			return t.has(e) || r === void 0 || i === void 0 ? [] : [{
				repo: r,
				id: i,
				askedAt: n
			}];
		});
		return [...e, ...n];
	}), s = () => {
		let e = a.data.value, t = new Set((e?.running ?? []).map((e) => nF(e.repo, e.id))), n = Date.now(), i = [...r.value].filter(([r, i]) => {
			if (t.has(r)) return !1;
			let [a, o] = r.split("|");
			return (e?.repos.find((e) => e.repo === a)?.probes.find((e) => e.id === o)?.ranAt ?? 0) < i && n - i < tF;
		});
		i.length !== r.value.size && (r.value = new Map(i));
	}, c = i(() => a.data.value === void 0 ? [] : Jn(a.data.value, Date.now())), l = i(() => (a.data.value?.repos ?? []).map(({ repo: e }) => ({
		repo: e,
		verdicts: Zt.flatMap((t) => c.value.filter((n) => n.repo === e && n.chore.id === t.id)),
		probes: a.data.value?.repos.find((t) => t.repo === e)?.probes ?? []
	})));
	return ne(() => a.dataUpdatedAt.value, s, { immediate: !0 }), {
		report: i(() => a.data.value),
		verdicts: c,
		byRepo: l,
		measuring: o,
		error: i(() => a.error.value?.message),
		isPending: a.isPending,
		refresh: async () => {
			await t.invalidateQueries({ queryKey: n.value });
		},
		refreshProbe: async (i, a) => {
			let o = nF(i, a);
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
var $P, eF, tF, nF, rF = v((() => {
	Zn(), HN(), lN(), $P = 3e5, eF = 2e3, tF = 15e3, nF = (e, t) => `${e}|${t}`;
}));
//#endregion
//#region src/useRuns.ts
function iF() {
	let e = cN(), t = Te(), n = i(() => e.sandbox.key("maintenance-runs")), r = i(() => e.sandbox.key("maintenance-runs", "agents")), a = we({
		queryKey: n,
		enabled: i(() => e.sandbox.reachable()),
		queryFn: () => VN().queryFn()
	}), o = we({
		queryKey: r,
		enabled: i(() => e.sandbox.reachable() && (a.data.value ?? []).length > 0),
		queryFn: async () => Mv.parse(await e.sandbox.json("/agents")).agents.filter((e) => e.id.startsWith(DN)),
		refetchInterval: (e) => (e.state.data ?? []).some((e) => e.status === "running" || e.status === "awaiting") ? aF : !1
	}), s = i(() => new Map((o.data.value ?? []).map((e) => [e.id, e]))), c = i(() => (a.data.value ?? []).map(({ manifest: e, result: t }) => {
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
		latestByChore: i(() => {
			let e = /* @__PURE__ */ new Map();
			for (let t of c.value) {
				let n = `${t.manifest.repo}|${t.manifest.chore}`;
				e.has(n) || e.set(n, t);
			}
			return e;
		}),
		error: i(() => a.error.value?.message),
		isLoading: a.isLoading,
		start: async (r, i) => {
			if (r.prompt === void 0) throw Error(`ext-maintenance: ${r.chore.id} has nothing to do`);
			let a = Date.now(), o = ON(a), s = {
				runId: o,
				createdAt: a,
				repo: r.repo,
				chore: r.chore.id,
				digest: r.digest,
				conversationId: kN(o),
				headline: r.headline
			};
			return await e.workspace.write(AN(o), JSON.stringify(s, null, 2)), Gp.parse(await e.sandbox.json("/agent", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					prompt: `${r.prompt}\n\n${IN(o)}`,
					title: `${r.chore.title}, ${r.repo}`.slice(0, 80),
					conversationId: s.conversationId,
					isolated: !0,
					unattended: !0,
					runRole: "maintenance-chore",
					...i === void 0 ? {} : Up(i)
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
var aF, oF = v((() => {
	oN(), HN(), lN(), LN(), aF = 4e3;
})), sF, cF, lF, uF, dF, fF = v((() => {
	Zj(), Zn(), JN(), NP(), lN(), BP(), LN(), ZP(), rF(), oF(), sF = { class: "flex flex-col gap-6" }, cF = {
		key: 1,
		class: "flex flex-col gap-6"
	}, lF = {
		key: 0,
		class: "flex flex-col items-start gap-2 py-10"
	}, uF = 2592e6, dF = /*@__PURE__*/ f({
		__name: "MaintenanceView",
		props: { repo: {} },
		setup(e) {
			let t = cN(), { byRepo: n, error: f, isPending: p, measuring: ie, refresh: oe, refreshProbe: se, snooze: me } = QP(), ge = i(() => n.value.filter((e) => t.workspace.inProject(e.repo))), _e = i(() => n.value.length - ge.value.length), { latestByChore: ye, start: be, promote: xe } = iF(), Se = ee("attention"), we = ee(), Te = ee(!1), Ee = ee(), v = i(() => t.route.query()), De = i({
				get: () => e.repo ?? v.value.repo,
				set: (e) => t.route.setQuery({ repo: e })
			}), y = (e) => `${e.repo}|${e.chore.id}`, Oe = (e, t) => {
				if (e !== 0) return t === 0 ? `${e} due` : `${e} due · ${t} at risk`;
			}, ke = (e) => e.state === "due" && !Kn(e), Ae = i(() => ge.value.map(({ repo: e, verdicts: t }) => ({
				repo: e,
				due: t.filter((e) => ke(e)).length,
				carrying: t.filter((e) => ke(e) && e.severity === "warning").length
			}))), b = i(() => Ae.value.map((e) => ({
				value: e.repo,
				label: lt(e.repo),
				icon: "folder",
				description: Oe(e.due, e.carrying),
				mono: lt(e.repo) === e.repo
			}))), je = i(() => {
				let e = Ae.value.reduce((e, t) => e + t.due, 0), t = Ae.value.reduce((e, t) => e + t.carrying, 0);
				return {
					icon: "wrench",
					description: Oe(e, t) ?? "nothing due"
				};
			}), Me = i(() => De.value === void 0 ? ge.value : ge.value.filter((e) => e.repo === De.value)), Ne = (e) => e.state !== "not-applicable" && (Se.value === "all" || e.state === "due" || e.state === "snoozed" || e.state === "stale"), Pe = i(() => Zt.flatMap((e) => Me.value.flatMap((t) => t.verdicts.filter((t) => t.chore.id === e.id && Ne(t))))), Fe = i(() => Jt.flatMap((e) => {
				let t = Pe.value.filter((t) => t.chore.kind === e.kind);
				return t.length === 0 ? [] : [{
					kind: e.kind,
					rows: [...t].sort((e, t) => Number(Kn(e)) - Number(Kn(t)))
				}];
			})), Ie = i(() => De.value === void 0 ? "maintenance.chores" : `maintenance.chores:${De.value}`), Le = i(() => Me.value.length === 1 ? Me.value[0] : void 0), Re = i(() => Me.value.length > 1), ze = i(() => Me.value.flatMap((e) => e.verdicts).filter((e) => ke(e)).length);
			ne(Pe, (e) => {
				qN(e);
			}, { immediate: !0 });
			let Be = i(() => new Set(ge.value.flatMap((e) => e.verdicts).flatMap((e) => e.lastRun === void 0 ? [] : [e.lastRun.runId])));
			ne([ye, Be], () => {
				xe(Be.value);
			}, { immediate: !0 });
			let Ve = async (e, t) => {
				Te.value = !0, Ee.value = void 0;
				try {
					await t();
				} catch (t) {
					Ee.value = `Could not ${e}: ${Xj(t)}`;
				} finally {
					Te.value = !1;
				}
			}, He = (e) => {
				Ve("ask for that measurement", async () => {
					await Promise.all(e.chore.needs.map((t) => se(e.repo, t)));
				});
			}, Ue = (e, n) => {
				Ve("start that turn", async () => {
					t.chat.openSession(kN(await be(e, n)));
				});
			};
			return (n, i) => (m(), a(g(he), {
				title: "Maintenance",
				scroll: "page",
				"scroll-key": `${De.value ?? ""}/${Se.value}`
			}, l({
				actions: _(() => [
					d(g(ue), {
						project: g(t).workspace.project(),
						hidden: _e.value,
						noun: "repositories",
						onClear: i[0] ||= (e) => g(t).workspace.setProject(void 0)
					}, null, 8, ["project", "hidden"]),
					e.repo === void 0 ? (m(), a(g(de), {
						key: 0,
						modelValue: De.value,
						"onUpdate:modelValue": i[1] ||= (e) => De.value = e,
						repos: b.value,
						all: je.value,
						memory: "maintenance.repo"
					}, null, 8, [
						"modelValue",
						"repos",
						"all"
					])) : o("", !0),
					d(g(pe), {
						modelValue: Se.value,
						"onUpdate:modelValue": i[2] ||= (e) => Se.value = e,
						size: "xs",
						options: [{
							label: "Needs attention",
							value: "attention",
							badge: ze.value,
							title: "Chores that are due or snoozed"
						}, {
							label: "Everything",
							value: "all",
							title: "Every chore in the book, including the clear and the unmeasured"
						}]
					}, null, 8, ["modelValue", "options"]),
					d(g(le), {
						quiet: "",
						icon: "refresh",
						label: "Reload",
						hint: "Re-read the latest results: to measure again, open a chore",
						disabled: Te.value,
						onClick: g(oe)
					}, null, 8, ["disabled", "onClick"])
				]),
				detail: _(() => [c("div", sF, [g(p) ? (m(), a(zP, {
					key: 0,
					imprint: Ie.value
				}, null, 8, ["imprint"])) : re((m(), s("div", cF, [Fe.value.length === 0 ? (m(), s("div", lF, [
					i[5] ||= c("p", { class: "text-sm text-content" }, "Nothing needs attention.", -1),
					i[6] ||= c("p", { class: "max-w-read-sm text-xs text-subtle" }, " Every chore in the book is either clear or waiting on a measurement. Switch to Everything to see what was checked, when, and what could not be measured at all. ", -1),
					d(g(ae), {
						size: "small",
						severity: "secondary",
						text: "",
						label: "Show everything",
						onClick: i[3] ||= (e) => Se.value = "all"
					})
				])) : (m(!0), s(r, { key: 1 }, te(Fe.value, (e) => (m(), a(g(fe), { key: e.kind }, {
					default: _(() => [(m(!0), s(r, null, te(e.rows, (e) => (m(), a(MP, {
						key: y(e),
						verdict: e,
						run: g(ye).get(y(e)),
						measuring: g(ie),
						expanded: we.value === y(e),
						"show-repo": Re.value,
						busy: Te.value,
						onToggle: (t) => we.value = we.value === y(e) ? void 0 : y(e),
						onStart: (t) => Ue(e, t),
						onRemeasure: (t) => He(e),
						onSnooze: (t) => void Ve("snooze that chore", () => g(me)(e, Date.now() + uF)),
						onUnsnooze: (t) => void Ve("un-snooze that chore", () => g(me)(e, 0)),
						onOpen: i[4] ||= (e) => g(t).chat.openSession(e)
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
				}, 1024))), 128)), Le.value ? (m(), a(XP, {
					key: 2,
					probes: Le.value.probes,
					inapplicable: Le.value.verdicts.filter((e) => e.state === "not-applicable")
				}, null, 8, ["probes", "inapplicable"])) : o("", !0)])), [[g(Ce), Se.value === "attention" ? Ie.value : void 0]])])]),
				_: 2
			}, [Ee.value || g(f) ? {
				name: "strips",
				fn: _(() => [Ee.value ? (m(), a(g(ce), {
					key: 0,
					tone: "warning"
				}, {
					default: _(() => [u(h(Ee.value), 1)]),
					_: 1
				})) : o("", !0), g(f) ? (m(), a(g(ce), {
					key: 1,
					of: g(ve)(g(f))
				}, null, 8, ["of"])) : o("", !0)]),
				key: "0"
			} : void 0]), 1032, ["scroll-key"]));
		}
	});
})), pF = /* @__PURE__ */ De({ default: () => mF }), mF, hF = v((() => {
	fF(), fF(), mF = dF;
}));
JN(), HN(), lN();
var gF = (e, t) => {
	sN(e), t.subscriptions.push(GN()), t.subscriptions.push(e.views.register({
		id: "maintenance",
		label: "Maintenance",
		surface: "rail",
		detect: (e) => e.length === 0 ? [] : [{
			key: "maintenance",
			title: "Maintenance",
			icon: "wrench"
		}],
		badge: KN,
		warm: () => [zN(), VN()],
		view: async () => (await Promise.resolve().then(() => (hF(), pF))).default
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
		view: async () => (await Promise.resolve().then(() => (hF(), pF))).default
	}));
}, _F = {
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
};
//#endregion
//#region src/manifest.ts
lT();
var vF = iT.parse(_F);
//#endregion
export { gF as activate, vF as manifest };
