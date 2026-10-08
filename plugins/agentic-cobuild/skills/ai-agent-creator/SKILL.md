---
name: ai-agent-creator
description: "Architecture-first Microsoft-cloud AI design for new applications, platform-managed agents, or AI capabilities in existing systems. Use when discovery, a functional/technical specification, editable draw.io views, and an implementation plan must precede code. Ends at package approval; standalone SDK help, existing-agent operations, implementation, deployment, and troubleshooting use other workflows."
---

# AI Agent Creator

Produce an approved architecture package under `docs/architecture/`:

```text
docs/architecture/
  solution.drawio
  solution.md
  specification.md
  implementation-plan.md
```

The diagram shows boundaries; `solution.md` owns design decisions;
`specification.md` owns requirements and acceptance criteria; the plan owns later
delivery work. Link these records rather than duplicating their content.

**Approval boundary:** change only domain records and the architecture package.
Keep application source, dependency manifests/lockfiles, tests, application assets,
IaC, cloud resources, and deployments unchanged. Implementation belongs to a
separate workflow that the user starts manually.

## Voice

Use this voice for every user-facing moment: discovery questions,
recommendations, shared-understanding summaries, approval requests,
status/handoff reports, and conversational explanations.

Give brief context before asking or stating anything. Write in ASD-STE100
Simplified Technical English: active voice, short sentences, one idea per
sentence. Put dense examples and alternatives in short bullet lists. Use the
repository's ubiquitous language: read `CONTEXT.md` and `docs/adr/` per
[domain conventions](references/domain-conventions.md). If the repository instead defines `GLOSSARY.md` or
`GLOSSARY-MAP.md`, follow those.

Keep dense technical artifacts exact: schemas, identifiers, tables, evidence
citations, and code/API names. Simplify the surrounding sentences, not these
terms.

## Resume from evidence

Resolve bundled references from the absolute directory of this loaded `SKILL.md`.
Treat the plugin installation as read-only. Inspect and write domain records and
architecture artifacts only in the user's selected application repository.

Use the host's question-form and read-only subagent capabilities where available.
If a question form is unavailable, ask the user directly and wait for their answer.
If independent review is unavailable, record the blocked gate and request the
explicit manual-review exception; local self-review does not pass that gate.

Inspect the conversation and existing records before selecting the next step.
Approval applies to the current baseline, not to later material changes.

| Evidence | Next step |
| --- | --- |
| The discovery frontier is open or shared-understanding confirmation is missing | Discover |
| A later user turn explicitly confirmed the shared-understanding record | Architect |
| The four artifacts are ready but package approval is missing | Ask for package approval and wait |
| The current, complete package and any review exception are explicitly approved | Hand off and stop |
| Material scope or design changed after confirmation/approval | Preserve history; return to the affected discovery or package-review gate |

The initial request, silence, batch execution, and the agent's own summary are
not confirmation or approval.

## 1. Discover

Read [discovery quality](references/discovery-quality.md) before the first
question; it owns the frontier, decision statuses, boundary ladder, shared record,
and discovery completion criterion.

1. **Inspect:** classify the workspace as empty, existing application/platform
   configuration, or architecture-only. Reuse repository and enterprise facts;
   an empty repository does not establish an empty enterprise estate.
2. **Frame:** identify the outcome, actor, and candidate journey. Treat *agent*,
   *copilot*, and *assistant* as intent signals, not runtime decisions.
3. **Resolve:** load `grilling` for an open frontier. Ask the whole answerable
   frontier through the question form tool. When enough prerequisites are known,
   present concrete target-architecture options with a recommendation, meaningful
   alternatives, and a visible custom-answer path. End the turn after each round;
   recompute only after the user's answers.
4. **Model and compare:** load `domain-modeling` when resolved terminology changes;
   update `CONTEXT.md` and offer ADRs for consequential trade-offs. Apply the
   discovery contract's agent-intent test and use the
   [selection matrix](references/azure-patterns/runtimes/README.md) when platform,
   channel, or model choices become answerable. Research and propose the coherent
   target architecture during discovery; do not replace that proposal with an
   abstract request to delegate selection. Reopen any newly exposed frontier.
5. **Confirm:** once the frontier is empty, present the discovery contract's
   shared-understanding record, ask for confirmation, and end the turn.

When a recommendation needs current product facts, read the
[evidence contract](references/microsoft-learn-evidence.md) and verify those facts
before presenting the recommendation.

**Complete when:** the discovery contract's criteria hold and a later user turn
explicitly confirms its record. That record becomes the specification baseline.

## 2. Architect

Enter only from confirmed discovery. Design responsibilities before service
mappings; preserve the confirmed target architecture, custom choices, and any
explicitly delegated lower-level decisions.

1. **Select:** read the
   [selection matrix](references/azure-patterns/runtimes/README.md) for platform,
   channel, ownership, and model-inference boundaries, including no-agent designs.
   Read the [pattern index](references/azure-patterns/README.md) to select workload
   cards and runtime recipes; load only matching branches.
2. **Verify:** use the [evidence contract](references/microsoft-learn-evidence.md)
   for decision-bearing product claims and compatibility gates. Consult
   [specialist routing](references/specialist-routing.md) only for the selected
   branches; specialists remain inside the approval boundary.
3. **Specify:** read [specification quality](references/specification-quality.md).
   Start or update the one specification from confirmed discovery, then complete
   its technical coverage and traceability alongside the design and plan.
4. **Record:** read [architecture quality](references/architecture-quality.md).
   Write `solution.md` using its structure, decision coverage, and diagram views.
5. **Plan:** read [implementation plan quality](references/implementation-plan-quality.md).
   Map later phases to specification IDs and architecture responsibilities.
   Describe configuration or code work according to the selected platform.
6. **Diagram and review:** load `cloud-architecture-diagram` for creation/editing,
   icons, validation, privacy, rendering, and independent review. Use the four
   views and acceptance contract in architecture quality. Preserve existing
   unrelated pages and hand edits. Treat the diagram specialist's independent
   review gate as binding. Use a reviewer mode that preserves context for its
   targeted recheck when the available tooling supports multi-turn review. A
   one-shot review that found blocking or material defects does not become a
   passed independent review through local inspection after repair.
7. **Reconcile and ask:** check all four artifacts against their contracts and the
   current baseline. Resolve conflicts or owned deferrals. Record blocked or
   unavailable diagram evidence exactly. Present the package, ask for explicit
   approval and any required manual-review exception, then end the turn.

**Complete when:** all four artifacts exist and agree, every contract is accounted
for, review status is recorded, and the user explicitly approves the current
package and any review exception.

## 3. Hand off and stop

Record architecture-only approval in the lifecycle record and specification.
Report the four paths, current approval/review status, remaining work and owners,
and the separately initiated workflow needed for delivery. Name later specialists
without invoking them.

Stop after handoff. Approval, a specification, an original request to implement,
or "continue" does not start implementation/planning, generate execution-ready
tickets, or provision/deploy resources.

**Complete when:** the approved package is handed off, later owners are clear,
and the approval boundary remains intact.
