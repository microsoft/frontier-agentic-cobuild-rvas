# Functional and technical specification contract

Synthesize `docs/architecture/specification.md` directly under this contract as
part of the architecture package.
This path is the selected architecture artifact, not an issue-tracker publication.
Preserve existing content and use one authoritative specification at this path.

## Lifecycle and boundary

Start from the explicitly confirmed discovery record, then complete the document
with architecture decisions and acceptance traceability before package approval.
Keep status **Draft - awaiting architecture approval** until the user approves
the package. Record the approved baseline and date with scope **architecture
handoff only; implementation not started**.

Approval of a previous revision does not approve new requirements or decisions.
Mark materially changed content pending review and use the existing discovery
or architecture approval gate as appropriate. Do not add a separate spec gate.
Decisions beyond a user's delegation scope return to the discovery frontier.

Keep the accelerator's approval boundary: this document authorizes architecture
handoff only.

## Required structure

```markdown
# Functional and technical specification

## Status and approval scope
## Problem Statement
## Solution
## User Stories and functional requirements
## Technical requirements and constraints
## Implementation Decisions
## Testing Decisions and acceptance criteria
## Traceability
## Out of Scope
## Assumptions and deferred decisions
## Further Notes
```

Populate sections from confirmed decisions and verified evidence, not a generic
checklist of invented requirements. Mark genuinely inapplicable concerns with a
reason; defer unresolved details with an owner, decision point, and impact.

## Functional coverage

- State the outcome, actors/roles, scope, first journey, and relevant follow-ups.
- Number user stories and give requirements stable IDs such as `FR-001`.
  Cover each agreed in-scope behavior, not an arbitrary story count.
- Describe inputs, outputs, business state transitions, validation, permissions,
  approval and publication rules, failure/uncertainty behavior, and prohibited
  actions where relevant.
- Separate AI interpretation/planning from deterministic business behavior.
- Identify approved data sources and systems of record, access boundaries, data
  lifecycle, and observable success criteria.

## Technical coverage

- Use IDs such as `TR-001` for technical requirements and `NFR-001` for quality
  requirements. Distinguish requirements/constraints from selected solutions.
- Record platform, channel or headless entry point, responsibility ownership,
  runtime/framework where needed, model/inference boundary, grounding and tools.
- Describe integration and data contracts, identity/authorization, security and
  network boundaries, persistence, audit, observability, and operational lifecycle.
- Cover scale, latency, availability, recovery, retention, cost and deployment
  constraints only to the level confirmed or explicitly deferred.
- Preserve confirmed brownfield constraints and managed-platform choices; mark
  custom code and resources non-applicable when configuration meets requirements.
- In Implementation Decisions, summarize confirmed/delegated choices and link
  authoritative decisions in `solution.md`, existing ADRs or `CONTEXT.md`.
  Avoid duplicate decision narratives, fragile source-file paths, and code.
- Separate verified product evidence, workload assumptions and owned compatibility
  checks. Keep missing package versions, schemas, numeric targets, capabilities
  and enterprise standards unresolved rather than filling them by inference.

## Acceptance and traceability

Give acceptance criteria stable IDs such as `AC-001`; express observable
input/action/result or rejection behavior. Test external contracts at the highest
practical seam and reference existing test prior art when available. Describe
later tests here while leaving application test files and execution unchanged.

Include a traceability table:

| Requirement IDs | Acceptance IDs | Architecture responsibility | Delivery phase | Evidence or deferral |
| --- | --- | --- | --- | --- |
| FR/TR/NFR IDs | AC IDs | Component or boundary in the diagram/record | Phase in implementation-plan.md | Confirmed source or owned unresolved check |

Every in-scope requirement needs acceptance coverage and a design/delivery mapping,
or an explicit owned deferral with impact. Every planned phase traces to the
specification. Cross-link `solution.md` and `implementation-plan.md`; link existing
`CONTEXT.md`/ADRs rather than copying their definitions.

## Completion criterion

The specification is complete when functional and technical coverage reflects
confirmed scope; IDs and acceptance/design/phase links are consistent; missing
facts are owned deferrals rather than silent assumptions; all four package
artifacts agree; and approval status belongs to the current baseline without
authorizing implementation.
