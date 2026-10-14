# Architecture record and quality contract

Read before writing `solution.md` or defining the diagram views. This contract
owns their structure and acceptance checks. Account for every item as a decision,
assumption, delivery-parameter deferral, or non-applicable concern before package
handoff. A deferral cannot leave the service family, topology, ownership, or
trust boundary unresolved.

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
## Cost and consumption handoff
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
- one selected production hosting/deployment service for every workload-owned
  deployable, with the meaningful alternatives recorded as rejected;
- a reason and meaningful rejected alternative for every major service, with
  links to authoritative ADRs rather than copied decision narratives.

Record decision-bearing sources under the
[evidence contract](microsoft-learn-evidence.md). Mark inferences as assumptions.
Use `## Implementation boundary` to record package status, the current baseline,
review exceptions and architecture-only scope; preserve earlier acceptances as
history when material changes require review.

## Product and boundaries

- The first user journey is visible from entry to outcome.
- `specification.md` captures the functional and technical requirements under the
  [specification contract](specification-quality.md). Its acceptance IDs trace to
  design responsibilities and delivery phases, or explicit owned deferrals.
- `solution.md` links the specification and `cost-estimate.md`; the current
  requirement baseline and all five artifacts are included in the same reconciled
  package. Any explicit acceptance remains architecture-only.
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
- Read [cost-estimation-quality.md](cost-estimation-quality.md). Link the mandatory
  `cost-estimate.md`, its status, stable architecture IDs, and the architecture
  limits that bound calls, tokens or other platform consumption.
- The implementation plan separates production identity from development and test
  identity; no plan depends on sharing production credentials.
- Hosting, availability, and background-processing responsibilities are explicit.
  Each workload deployable maps to one selected production service. SKU, capacity,
  exact version, and similar delivery parameters can remain owned gates only when
  they do not change that mapping.
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
| **Deployment** | Resources, identities, trust and network boundaries, ingress/egress, environments, platform/workload ownership, delivery path, and operations | Map each logical responsibility to one selected physical service or named existing enterprise capability. Keep alternatives in `solution.md`, not in deployment labels. Summarize application behavior instead of repeating the complete runtime sequence. |

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
- A production responsibility never maps to an unresolved product list such as
  "App Service or Container Apps". Alternatives belong in rejected decisions;
  the Deployment page shows the selected baseline.
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
- No Deployment label, service-mapping table, or implementation phase contains
  an unresolved service-family alternative. Treat `or`, slash-separated product
  names, "candidate", and "to be selected" as blocking findings when they describe
  the production baseline rather than a rejected option or contingency.
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
  independent gate remains blocked. Assign a manual-review owner and completion
  gate. Ask for explicit exception acceptance only when the user or governance
  process requires that decision; do not create a confirmation turn solely to
  acknowledge missing evidence. Structural validation or local self-review does
  not clear missing independent evidence.

**Complete when:** every coverage item is accounted for in the five artifacts;
each production responsibility has one selected deployment mapping; decision and
requirement links agree; every diagram page has recorded review status; and any
review exception has an owner and gate or explicit acceptance when required.
