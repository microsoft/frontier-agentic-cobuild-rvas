# Agent coordination

## Use when / avoid when

Use when multiple agents or specialist roles must coordinate. Prefer one bounded
agent for one responsibility and an explicit deterministic workflow when the
dependency graph and completion rules are known.

## Evidence classification

**Locally composed selection recipe** from Agent Framework orchestration
guidance. The selection criteria are platform-neutral; exact orchestration
features and state behavior remain runtime-specific.

## Responsibilities and components

Name the coordinator, active responder, specialist roles, shared artifacts,
authoritative state owner, and the identity and tool permissions of every role.
Define completion, time and spend limits, partial-result policy, and human
escalation before selecting an orchestration.

## Coordination selection

| Shape | Use when | Required control |
| --- | --- | --- |
| Explicit workflow | Dependencies and gates are known | Deterministic transitions, retries, checkpoints, and compensation |
| Sequential | Each step depends on the prior result | Typed handoff artifact and per-step completion |
| Concurrent fan-out/fan-in | Tasks are independent until aggregation | Bounded parallelism, join/timeout policy, and incomplete-result handling |
| Handoff | Ownership of the active conversation or task changes | Explicit transfer, context minimization, new-owner authorization, and visible ownership |
| Group chat | Peers must critique or revise a shared result | Speaker selection, context synchronization, termination, and conflict resolution |
| Adaptive task ledger | The plan is unknown and must be revised during execution | Bounded replanning, task ownership, progress ledger, and stop/escalation criteria |

Select per seam, not once for the whole system. A journey can hand off the active
conversation, fan out independent checks, and then enter an explicit approval
gate. Do not use group chat merely because several specialists exist.

## Flows

Request -> coordination decision -> bounded specialist work -> explicit join or
ownership transfer -> deterministic validation/approval -> response or
escalation. Preserve provenance, failures, denied actions, and missing results;
an aggregator cannot turn an incomplete run into an apparently complete answer.

## Trust boundaries and ownership

Each agent acts under its own allowed tools and caller/service scope. Shared
conversation history is coordination context, not an authoritative business
record. Keep workflow checkpoints, agent memory, approvals, and system-of-record
writes separate, with one named owner for each.

## Support gates

- **Constraint:** more agents do not create authority, consensus, or correctness.
- **Maturity:** verify the selected framework, language, orchestration, and
  checkpoint support independently.
- **Operational:** define concurrency, queueing, retries, timeouts, duplicate
  suppression, cancellation, and recovery from an unavailable specialist.
- **Recommendation:** start with the least adaptive shape that satisfies the
  dependency graph; add dynamic coordination only when measured failures justify it.

## Tradeoffs

Sequential coordination is simple but slow. Concurrency reduces latency but adds
join and overload behavior. Handoffs preserve clear ownership but require careful
context transfer. Group chat can improve critique while increasing token use and
termination risk. Adaptive planning handles uncertain work at the highest cost
and variance.

## Diagram mapping

Context: requester, human reviewer, and business systems. Components: coordinator,
specialists, deterministic gates, and state stores. AI and data flow: label
fan-out, joins, handoffs, limits, and escalation. Deployment: show runtime
boundaries, queues, checkpoint stores, identities, and operator ownership.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Workflow orchestrations include sequential, concurrent, handoff, group chat, and Magentic patterns | [Agent Framework workflow orchestrations](https://learn.microsoft.com/agent-framework/workflows/orchestrations/) | 2026-10-07 | Select from the dependency and ownership shape rather than the product name |
| Group chat requires explicit context and speaker/termination behavior | [Agent Framework group chat](https://learn.microsoft.com/agent-framework/workflows/orchestrations/group-chat) | 2026-10-07 | Use it only for genuine peer deliberation |
| Magentic coordination adaptively plans and delegates tasks | [Agent Framework Magentic orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic) | 2026-10-07 | Bound replanning, spend, and termination |
