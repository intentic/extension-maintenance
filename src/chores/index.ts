// The chore book: what a chore is, what each probe measures and how a verdict is reached from the evidence. This
// extension's own since 2026-11-26, read by its views and its backend alike, so the two cannot disagree. It came from
// @intentic/sandbox-contract's `chores` subpath, which keeps a frozen copy for extensions built against it until
// extension API 3.0.0; nothing here reads that copy.
export { CHORE_KINDS, CHORES, choreAutomationPrompt, choreById, chorePrompt, repoLabel, repoName } from "./chores.ts";
export type { Chore, ChoreContext, ChoreFinding, ChoreKind, ChoreKindSpec, ChoreStance } from "./chores.ts";
export { bucketOf, digestOf } from "./digest.ts";
export { PROBES, probeSpec } from "./probes.ts";
export type { ProbeSpec } from "./probes.ts";
export { assessChore, assessReport, choreAnswer, choreAnswered, ledgerKey, unseenVerdicts } from "./verdict.ts";
export type { ChoreAnswer, ChoreState, ChoreVerdict } from "./verdict.ts";
export type { ChoreLedgerEntry, ChoreOutcome, ChoresReport, ProbeId, ProbeResult, RunningProbe } from "./schema.ts";
export { ChoresReportSchema } from "./schema.ts";
