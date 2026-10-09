# Architecture record and quality contract

Read before writing `solution.md` or defining the diagram views. This contract
owns their structure and acceptance checks. Account for every item as a decision,
assumption, owned deferral, or non-applicable concern before package approval.

## Solution record

Write `docs/architecture/solution.md` with:

```markdown
# Solution architecture

## Outcome and first journey
## Specification reference
## Assumptions
## Decisions
## Microsoft Learn evidence
## Component responsibilities
## AI, data, and evaluation flow
## Security and operational boundaries
## Rejected alternatives
## Implementation boundary
## Deferred decisions
```

Link `specification.md` and its requirement IDs. In `## Decisions`, record:

- selected workload cards, inherited elements, deviations, or no suitable card;
- platform/channel, ownership, runtime recipe or **no agent runtime**, and model
  inference choices under the [selection contract](azure-patterns/runtimes/README.md);
- the selected topology, direct or delegated, and the owner of any connected-agent
  or second-agent hop;
- the selected knowledge/context layer (Foundry IQ, Fabric IQ, Fabric data agent,
  or Work IQ) when one is used, and why the others were not selected; compare the
  [unified IQ composition](azure-patterns/patterns/11-unified-iq-agent.md) pattern
  when more than one plane is used by the same agent;
- confirmed journey evidence and the closest rejected execution model, using
  the [agent-intent test](discovery-quality.md#agent-intent-test) where applicable;
- the confirmed requirement or capability gap for each custom UI, API, adapter
  or host;
- a reason and meaningful rejected alternative for every major service, with
  links to authoritative ADRs rather than copied decision narratives.

Record decision-bearing sources under the
[evidence contract](microsoft-learn-evidence.md). Mark inferences as assumptions.
Use `## Implementation boundary` to record package approval, the current baseline,
review exceptions and architecture-only scope; preserve earlier approvals as
history when material changes require review.

## Product and boundaries

- The first user journey is visible from entry to outcome.
- `specification.md` captures the functional and technical requirements under the
  [specification contract](specification-quality.md). Its acceptance IDs trace to
  design responsibilities and delivery phases, or explicit owned deferrals.
- `solution.md` links the specification; the current requirement baseline and all
  four artifacts are included in approval. Approval remains architecture-only.
- Every component has one clear responsibility.
- External systems and sources of truth are identified.
- The enterprise starting point is classified as greenfield or brownfield from
  evidence, not convenience.

## AI design

- The model or agent has a specific responsibility that benefits from AI.
- Model deployment and brownfield reuse follow the selection contract's
  [inference boundaries](azure-patterns/runtimes/README.md#model-inference-and-reuse).
- The selected execution model traces to confirmed discovery evidence; an
  agent-intent decision accounts for the full discovery test rather than a
  journey narrowed by assumption.
- Deterministic validation and business rules remain outside the prompt.
- Grounding sources, tool permissions, and output contracts are shown.
- Unsafe or consequential actions have limits or human approval.
- Failure, timeout, refusal, and low-confidence behavior are defined.
- Execution, platform/channel, framework where needed, provider, retrieval and
  tool policy have independent reasons. Support claims follow the evidence
  contract's maturity and compatibility distinctions.

## Data and security

- Sensitive data classification and retention assumptions are recorded.
- Authentication, authorization, managed identities, and trust boundaries are shown.
- The exact channel and connection support the intended user audience, including
  external customers where applicable; connector identity is not end-user
  permission. Delegation and tool protocols have verified compatibility.
- Identity is carried or deliberately translated at every hop (channel to
  orchestrator, orchestrator to tool/knowledge, orchestrator to a delegated
  agent); a verified hop does not authorize the next one.
- Retrieval and action are distinguished: a knowledge/context query returns
  grounding, while a business operation runs through an authorized tool with its
  own approval gate, even against the same backend system.
- Secrets are not passed through clients, prompts, diagrams, or committed files.
- Tenant and user data boundaries are clear when applicable.
- Existing enterprise identity, network, policy, compliance, and data boundaries
  are reused or changed deliberately.

## Quality and operations

- Success measures can become evaluation cases.
- For external users, untrusted content, sensitive data, regulated decisions,
  consequential tools, or broad autonomy, apply
  [AI safety and release assurance](azure-patterns/assurance/ai-safety-release.md).
- Tracing, logs, metrics, and user feedback have owners and destinations.
- Cost and scaling drivers are identified.
- The implementation plan separates production identity from development and test
  identity; no plan depends on sharing production credentials.
- Hosting, availability, and background-processing responsibilities are explicit.
- Environment topology, delivery ownership, rollout, rollback, migration, and
  operational readiness are explicit in the implementation plan.
- Managed platform configuration, connections and publication have lifecycle
  owners; custom code, libraries and IaC are non-applicable when not required.
- Power Platform (or equivalent) solution promotion is distinguished from its
  manual/admin gates (authentication, publication, sharing, some data-policy
  settings); each manual gate has a named owner and step in the rollout plan.

## Diagram views

Create one editable `solution.drawio` with these pages in order:

| Page | Owns | Detail boundary |
| --- | --- | --- |
| **Context** | Actors, external systems, first journey, authoritative sources, and product boundary | Keep the solution as one product-level boundary or a few essential responsibilities. Leave APIs, token mechanics, stores, queues, and resource topology to later views. |
| **Components** | Logical responsibilities, ownership, interfaces, and selected service mappings | Lead with responsibilities. Service names annotate the mapping without turning this page into deployment topology or a runtime sequence. |
| **AI and data flow** | Ordered online and offline flows, prompts, grounding, proposed tool intent, trusted execution, stores, safety, approval, failure, and evaluation | Show who calls whom and what changes state. Keep resource placement and environment promotion on Deployment. |
| **Deployment** | Resources, identities, trust and network boundaries, ingress/egress, environments, platform/workload ownership, delivery path, and operations | Map logical responsibilities to physical services. Summarize application behavior instead of repeating the complete runtime sequence. |

Keep Context and AI/data-flow readable with neutral shapes; add service mappings
there only when helpful. Use official Azure icons for Azure service mappings in
Components and Deployment. Use accurate non-Azure labels/shapes rather than
misleading vendor icons. The diagram specialist owns icon lookup and tooling.
If an icon is unavailable, use its agreed labelled fallback and record the limitation.

Show topology choice, identity-per-hop, retrieval-versus-action boundaries, and
any IQ knowledge/context layer within these same four pages: a delegated hop and
its distinct identity belong on Components and AI/data flow; promotion and
manual/admin gates belong on Deployment. Do not add extra pages for these
concerns.

When editing, preserve unrelated pages and hand edits. Keep a PaaS service distinct
from its private endpoint; show control, data and media paths separately where
relevant.

### Cross-view invariants

- Repeated entities use one canonical name and responsibility.
- Repeated edges preserve their semantic direction, caller, authorization owner,
  and data or state meaning.
- An actor reaches stores, queues, models, and managed services through the
  confirmed channel or application boundary.
- The model or agent proposes tool intent; the selected trusted runtime owns
  validation, authorization, and execution.
- Human review shows its interaction surface, permission check, and state
  transition.
- Retrieval, deterministic calculation, business action, and approval remain
  distinct even when they use the same backend.
- Logical components map to deployment resources without silently changing
  ownership.
- Repetition earns its place by showing a different page concern. Repeated
  meaning is removed.

## Diagram verification

- Logical responsibilities are understandable without vendor icons.
- Context, Components, AI and data flow, and Deployment are four ordered pages in
  one editable `solution.drawio`, and all views agree.
- Each page follows its ownership and detail boundary, and the cross-view
  invariants pass independent critique.
- Every important edge has a direction and meaningful label.
- Inferred choices are marked as assumptions rather than facts.
- The diagram specialist's structural validation passes, including page order,
  page-local references, geometry, and embedded images.
- Every page is exported with an approved local renderer and inspected for overlap,
  clipping, disconnected or obscured paths, unreadable labels, and incorrect icons.
- Record structural, rendered visual, and independent-review status per page
  under the diagram specialist's workflow; distinguish performed and missing checks.
- Rendered connector and label geometry resolves findings that source XML cannot.
- Follow the diagram specialist's independent-review contract as the source of
  truth. Use a reviewer invocation that supports retained-context follow-up when
  the available agent tooling distinguishes multi-turn from one-shot execution.
- The same independent critic performs one targeted recheck after repair. A
  one-shot critic that found blocking or material defects cannot be replaced by
  local self-review to produce a passed independent gate.
- Review stops when no blocking or material defect remains, or after two repair
  passes. Record the original findings, repairs, recheck result, residual
  findings, and stop reason.
- If rendering, geometry inspection, the independent critic, or its required
  recheck is unavailable, `solution.md` records the exact limitation and the
  independent gate remains blocked. Architecture approval requires an explicit
  manual-review exception. Structural validation or local self-review does not
  clear missing independent evidence.

**Complete when:** every coverage item is accounted for in the four artifacts;
decision and requirement links agree; every diagram page has recorded review
status; and any review exception is explicitly approved.
