# intentic-maintenance

Installs as **`intentic.maintenance`**, from the registry (Extensions → Browse) or by repository URL at a commit. A
first-party intentic extension that is LISTED rather than baked into the sandbox: a sandbox is itself without it,
so it arrives only where someone reaches for it. Moved out of the monorepo at `intentic/intentic@41f72ba4aae6`
(`_extensions/maintenance` there; this repository is where it lives now).

The chore book: what this workspace is owed, why, and the evidence behind each answer.

A chore is a standing question about a repository: are the dependencies pinned, is anything undocumented, has
the documentation drifted from the code: with a cadence, an applicability gate, and a verdict backed by facts
this extension's backend measured rather than by a model's impression.

## Responsibilities

- Measure each repository: the code-health probes (outdated packages, advisories, dead code, duplication, the UI scan,
  bundle size, mutation score) in the background, and the cheap signals on every read (src/server).
- Assess every chore against the current signals and say which are due.
- Show the evidence behind a verdict, including for the chores that are clear, and say how old that evidence is.
- Run a chore as an agent turn, and keep the history of what those runs found. A run is the **Maintenance chores** job
  the manifest declares (`contributes.modelRoles`, `maintenance-chore`, suggested Medium), which the owner puts on a
  model setup in Sandbox ▸ Agent ▸ Models; the sandbox's own table held it until 2026-11-26, under the same id.
- Carry a badge for what is due, and let a chore be snoozed without being forgotten.

## Key files

- [src/chores/](src/chores): the book: what each chore is (chores.ts), what each probe runs and how its output is read
  (probes.ts), and how a verdict is reached from the evidence (verdict.ts). Read by the views and the backend alike.
- [src/server/server.ts](src/server/server.ts): the backend, and what it asks of the daemon.
- [src/server/probe-runner.ts](src/server/probe-runner.ts): the sweep, one probe at a time, deferring to any live turn.
- [src/server/store.ts](src/server/store.ts): the probe cache and the ledger, and where they live.
- [src/server/routes.ts](src/server/routes.ts): the three routes the views call.
- [src/useChores.ts](src/useChores.ts): the book, assessed against the backend's report.
- [src/runs.ts](src/runs.ts): a chore run's shape and its history.
- [src/attention.ts](src/attention.ts): the badge, and what it stays quiet about.
- [src/ScopeNote.vue](src/ScopeNote.vue): what this repository was not asked, and why, under the list.
- [src/extension.ts](src/extension.ts): activation, and three decisions that could each have gone the other way.

## How it fits

**The measurements are this extension's own** (2026-11-26). Until then the daemon ran the probes in every sandbox
(its `chores/` module, gated on this extension's id) and served them as `GET /chores`, `POST /chores/probe` and
`POST /chores/ledger`. Now the backend (`server`, src/server) does: the views read `GET /report`, ask for one
measurement again with `POST /probe` and record a verdict or a snooze with `POST /ledger`, through `api.backend`, with
the bodies the daemon's routes had. The sweep runs every 30 minutes after a 5-minute warm-up, only while no agent turn
runs, and stops between probes the moment one starts. What it asks of the daemon is declared in the manifest:

- `permissions.events`: `activity`, whether any agent turn runs.
- `permissions.exec`: `command` for each probe's "is this tool here?" line, `toolchain` for the measurement itself,
  which takes its turn in the sandbox's heavy-command queue with every agent's builds and tests.
- `permissions.daemon`: `GET /workspace/repos`, the repositories the daemon discovers, and `GET /workspace/search`, its
  file search's count of a repository's code files. Everything else (manifests, the repo's shape) is read off the disk.

**The evidence stays where the daemon left it.** The probe cache and the ledger are `.intentic/records/chores/probes.json`
and `ledger.json` in the workspace, the files the daemon wrote, so a sandbox that ran the daemon's probes keeps its
measurements and its verdicts when this backend takes over, with nothing to convert. They are workspace evidence, not
this extension's private state: isolated turns read them and a bundle carries them, and `contributes.files` refreshes
the views when they change. Entries this version cannot read are skipped and left in place on write.

**The chore book is here too** (src/chores). It used to be `@intentic/sandbox-contract`'s `chores` subpath, read by both
the daemon and the browser; now the views and the backend read this copy, so the two cannot disagree. The contract
keeps a frozen copy only for the extension wire, until extension API 3.0.0.

**Against an older daemon.** The manifest asks for extension API ^2.52.0, the first with turn activity, the workload
classes and the model role this extension declares. A daemon older than that refuses the backend ("needs intentic
^2.52.0; this daemon provides …") and does not auto-update to this version (an update it cannot run is left for review),
so such a sandbox keeps the previous version, which reads the daemon's own `GET /chores`. A daemon from 2026-11-26 on no
longer serves that route, so the previous version shows an error there until it is updated to this one. A sandbox that
never had this extension installed has no chore evidence to carry: the daemon's sweep never ran without it.

**The chores' automation templates are this extension's** (2026-11-26). The sandbox computed them from the book in its
own catalogue and offered them only while this extension was on, by checking its id; now they are static in
`contributes.automationTemplates`, so the daemon reads them like any extension's and they go when this extension does.
One per chore the book says is worth running unattended, plus the two the book cannot measure: `review-agent-work`
(an agent's diff after its turn) and `dreaming-session` (the fleet's own session history, on a session count).
`scripts/chore-templates.mjs` rewrites the book's ones from src/chores (`--check` says whether they are behind it), so
run it after changing the book; the manifest test holds each scheduled chore to a template on the book's own schedule.

**One rail tile, workspace-wide.** Workspace-wide because the question is "what is this workspace owed", answered
across repos, rather than one tile per repository fragmenting one list into five. Under the shell's project
scope the list narrows to the open project's repositories (`api.workspace.inProject`, since the report comes
from the backend rather than `repos()`), and the shared `ProjectChip` says how many it hid; the rail
badge stays workspace-wide so a chore owed elsewhere is never missed. Narrowing further, to one repository, is the
shared `RepoPicker` in the page header (`?repo=` in the URL, remembered across visits), the same control every
repo-scoped view wears, each repository's due count beside its name; a directory tab is already bound to its
repository and shows no picker.

It activates on ANY repository and deliberately not on evidence of a problem: gating the AREA on something being
due would mean the first time an owner sees this surface is the first time it has bad news.

**Activating is not the same as holding a seat.** The rail seats this tile while the badge has something to
report and lists it in its More menu otherwise (`core-views/registry.ts` holds the rule). The old argument for a
permanent tile, that a surface which only exists while something is wrong cannot be visited to check that nothing
is, still stands: it is answered by More, by `view.maintenance` in the palette, and by pinning the tile, none of
which cost the column a silent seat on every workspace.

## Conventions & gotchas

- A cleared chore still shows its evidence. "Nothing is due" is a claim, and a claim you cannot inspect is one you
  cannot trust.
- Every row says how old its measurement is, and a chore whose evidence predates its last turn is `stale` rather
  than due: the probes refresh on a daily-to-weekly TTL, so an hour after a run the numbers on the row describe a
  tree that no longer exists. A stale row keeps its evidence, drops the claim, and offers a re-measure instead of a
  second turn.
- A row says whether anyone has already answered it, not just what the evidence found. A turn that concluded
  against a row's exact evidence (`choreAnswer`, digest-checked) puts a `reported` / `acted` mark on the collapsed
  row; while that answer stands the row loses its warning tint, sorts under the rows nobody has looked at, and is
  left out of every count on the page — the tab badge, the group headings, the repository picker, which is finally the
  same definition the tile badge has always used. Demoted, never hidden: it keeps its place, its evidence and its
  verbs, and the button that starts a second turn says "Run it again". A chore whose cadence has lapsed still
  shows what was concluded last time but goes back to full weight, because the lapse is the book asking again.
- The page's own Reload **re-reads**, it does not re-measure. Measuring again costs a subprocess and minutes, so
  it is a decision made on the row that needs it: every chore resting on a probe carries its own Re-measure, and
  that is the only place the page asks for one.
- What was left out is a footnote, not a banner. Chores with no subject here, probes this repository cannot run
  and tools that broke are counted in one line under the list and expand to the causes; how fresh a measurement
  is rides on the row it decides, beside the numbers it qualifies.

## Building and publishing

```sh
pnpm install     # pnpm, not npm: pnpm-workspace.yaml carries the build approvals the install needs
pnpm build       # dist/: the UI bundle the host blob-imports, and dist/server.js, the backend
pnpm typecheck
pnpm test        # the source (vitest: the book, the backend), then the manifest and the BUILT bundle against a host stub (node --test)
```

`dist/` **is committed**: there is no build step at install time, so the sha you publish is literally the code
that runs in the owner's browser. Build before the commit, or a stale `dist` publishes stale behaviour under a
sha whose source says otherwise; `test/activate.test.mjs` runs against `dist/`, never `src/`, for that reason.

Publishing is a commit on `main` and a pull request against
[`intentic/registry`](https://github.com/intentic/registry) moving this extension's listing to the new sha. The
listing pins a commit, so fixing the code and leaving the listing is the one failure that reaches nobody but the
installer: **bumping `engines` means opening the listing pull request in the same sitting.**

The bundle inlines `@intentic/sandbox-contract` and `@intentic/extension-manifest` (and zod with them), since the host
publishes only `vue`, `@tanstack/vue-query`, `@intentic/extension-api` and `@intentic/extension-ui` to an installed
bundle. The backend bundle inlines everything it imports (the book, zod, yaml, `@intentic/base`): the backend host
provides nothing but Node. The published `@intentic/extension-api` (1.431.0) carries extension API 2.48, so the two
2.50 members the backend calls (`api.events.onActivity`, `api.exec`) are typed in src/server/api.ts; drop that block for
the SDK's own types once a version with API 2.52 is published. Narrowing the routes this extension reads to a `wire.ts` of its own, the way `intentic/extension-logs`
did, is the follow-up that makes it a version boundary rather than a coincidence.
