# Discovery quality contract

Read before the first discovery question. This contract owns the frontier,
decision statuses, boundary ladder, and shared-understanding record. Ask
questions and present summaries using the [Voice](../SKILL.md#voice) section.

## Frontier

The **frontier** contains unresolved architecture-changing decisions whose
prerequisites are settled. Investigate available repository/environmental facts
first, then ask the whole answerable frontier in one recommended round and wait.
Questions depending on an unsettled answer belong to a later round; confirmed
choices and discovered facts need no repeat interview.

Start the design tree from:

- outcome and observable business result;
- primary actor or calling system, and the first end-to-end journey;
- workload shape: interactive request/response, asynchronous jobs, event
  streams, scheduled batch, long-running business process, or a mix;
- available platform capabilities, experience/channel, and their ownership;
- inputs, outputs, integrations, and systems of record;
- business rules, state transitions, consistency needs, and data ownership;
- audience and tenancy: internal, partner, or customer users; single or
  multitenant isolation;
- AI candidacy: whether any step benefits from interpretation, generation,
  retrieval, prediction, or runtime planning (see [AI branch](#ai-branch));
- action risk, approvals, and failure impact;
- success measures and evaluation evidence;
- scale, latency, availability, recovery, budget, schedule, and stack constraints;
- enterprise identity, network, security, operations, and delivery context.

The frontier is empty only when every architecture-changing branch is answered or
discovered. A deferral may retain a delivery parameter such as an exact version,
SKU, capacity, or approved region only when every allowed value preserves the
selected service family, topology, responsibility ownership, and trust boundary.
Apply the integration contract below to every named external system or channel;
confirming its destination alone does not close its integration branch.

## External integrations and channels

Maintain an **integration ledger** in the discovery record, with one row per named
external system or channel in the requirements, including the RFP and supplied
briefs. Give each row a stable ID such as `INT-001`. Preserve aliases and source
references so later reconciliation can account for every name.

| Integration | Purpose | Direction | Adapter | Identity | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- |
| INT-001: Microsoft Teams | Alerts | Outbound | Unresolved | Unresolved | Unresolved | Open |

Record the interaction in Purpose, caller-relative direction in Direction,
selected mechanism in Adapter, identity and required permissions in Identity,
and operational responsibility in Owner. Link unresolved compatibility gates and
decision records from the row. Use the technical decision statuses below; keep
gaps **Open** rather than treating a named destination as a selected adapter.
Record explicitly excluded systems with the reason and source of that scope
decision instead of silently dropping them.

For each in-scope named product, confirm the integration, obtain explicit
lower-level delegation, or prove that every remaining option meets the
delivery-parameter rule. A choice that changes deployed services,
authentication or permissions, trust boundaries, licensing or cost model, or
operational ownership stays in the frontier. Generic technical delegation covers
an adapter only when that integration is within its stated scope.

**Destination versus mechanism:** "Teams alerts" confirms where notifications
arrive, not how the platform sends them. Ask the answerable adapter question:
"How must the platform send Microsoft Teams notifications: through Microsoft
Graph, Logic Apps/Power Automate, a Teams workflow/webhook, or an existing
enterprise notification service?" Treat these as alternatives to investigate,
not interchangeable or verified capabilities. Apply the evidence contract before
recommending one.

Complete this branch when every row is confirmed, explicitly delegated within
scope, safely deferred with its invariants recorded, or explicitly excluded.
Resolve delegated adapter selections during architecture before package readiness.

## Technical decision ownership

Distinguish **technical constraints** from **technical choices**. "No imposed
stack" or "no preference" removes a constraint; it does not approve a proposed
stack or delegate its selection.

For architecture-changing choices not settled by repository evidence or earlier
answers, include them in the current frontier. Cover platform and channel before
dependent runtime/framework, hosting, persistence, identity, and integration
boundaries as their prerequisites resolve, not as a fixed questionnaire. Preserve
discovered enterprise standards and existing application choices; ask about
deviations rather than repeat facts.

### Target-architecture proposal

When the journey, enterprise starting point, channel needs, and material
constraints are sufficient, research and present a **target-architecture
question**. Offer two to four coherent compositions rather than isolated product
choices:

- put the recommended composition first and explain why it fits;
- include at least one meaningful alternative with its trade-off;
- include a visible **custom architecture** option so the user can state the
  platform, channel, runtime, services, or boundaries they already have in mind;
- when the question form supports a default, default to the recommended concrete
  composition, never to delegation or "no preference";
- describe each option at the level currently answerable: channel/caller,
  architecture style, compute/hosting, data and state, messaging and
  integration, identity, durable state/approvals, and responsibility ownership;
  when the AI branch is open, add execution model, platform/runtime,
  model-inference boundary, knowledge, and tools;
- verify current product facts before using them to recommend an option.

If evidence invalidates one composition, reopen only the affected choices and
recompute the viable sibling compositions. A limitation in one execution recipe
does not establish the same limitation in another recipe on the same platform.
For example, a prompt-agent channel or identity gap is not evidence that custom
code running as a Foundry Hosted Agent has the same gap.

Do not use a generic statement such as "delegate the architecture selection to
me" as the routine recommendation or default answer. It hides the decision the
user needs to make. If the user explicitly asks the architect to choose, treat
that as permission to research and return with a concrete recommended
composition. Then ask the user to confirm it or provide a custom composition.
Delegation alone does not close the target-architecture frontier.

Record each material choice as one of:

- **Confirmed:** the selected option and its reason.
- **Delegated subchoice:** the user's explicit scope for a lower-level choice;
  compare options and record the resulting selection and reason in the
  architecture package.
- **Deferred delivery parameter:** the owner, decision point, and implementation
  impact. The remaining values must preserve the confirmed architecture.

A delegation may cover only part of the design. Resolve choices outside its scope
through subsequent frontier rounds. Technical delegation permits architecture
selection within that scope, not implementation or provisioning. The top-level
target architecture must be confirmed through a proposal question or explicitly
deferred with an owner and impact; it cannot remain an abstract delegation.
Exact package versions, sizing, and other delivery parameters may remain
implementation-time compatibility checks when they do not change the selected
service family, topology, ownership, or trust boundaries. Choices such as
App Service versus Container Apps, SQL versus Cosmos DB, or direct versus
delegated agent hosting remain in the frontier until one option is selected.

## Application shape and platform selection

Use the [application selection guide](application-patterns/README.md) to compare
architecture style, compute, data, messaging, and cross-cutting boundaries.
Investigate reusable capabilities from available evidence; ask about material
gaps in the current frontier rather than treating repository contents as the
entire enterprise estate.

Resolve channel, architecture style, and ownership before dependent framework,
hosting, and persistence choices. Preserve explicit custom requirements. These
decisions use the existing shared-understanding gate.

## AI branch

Open the AI branch when the outcome or a journey step suggests interpretation,
generation, retrieval, prediction, or runtime planning, or when the user names
AI, a model, an *agent*, a *copilot*, or an *assistant*. Then read the
[AI branch entry](ai-patterns/README.md); it owns the boundary ladder, the
agent-intent test, the assumption trap, and the AI card index. Use its
[selection matrix](ai-patterns/runtimes/README.md) for agent platform, channel,
and model-inference choices, and its [model selection](ai-patterns/model-selection.md)
guide when a model family, deployment type, or decision model becomes answerable.

When no step benefits from AI, record `AI responsibility: none` with the
reason and keep the frontier on the application branches. A later requirement
can reopen the branch.

## Shared-understanding gate

When the frontier is empty, summarize:

```text
Problem:
Primary user or calling system:
First journey:
Workload shape and architecture style:
AI responsibility: none (reason), or AI boundary with execution-model comparison
Platform and channel:
Target architecture:
Custom choices and delegated subchoices:
External integrations and channels:
  Integration ledger (system/channel, interaction, direction, selected adapter,
  identity and permissions, ownership, status, unresolved compatibility gates):
Data, state, and knowledge:
Tenancy and audience:
Success measures:
Constraints:
Enterprise starting point:
Assumptions:
Explicit deferrals and impact:
Visuals: swimlane steps, domain map, lifecycle state, scenarios SC-### (paths)
```

Present the gate visuals under the
[shared-understanding visuals](shared-understanding-visuals.md) contract with
this record. Ask the user to confirm the record and end the turn. Architecture
becomes eligible only when a later user turn explicitly confirms it. The original request, silence,
batch execution, or the architect's own confidence cannot cross this gate.
After confirmation, use the record as the
[specification baseline](specification-quality.md). Keep unresolved decisions
in the frontier or accepted deferrals rather than synthesizing them as facts.

## Completion criterion

Discovery is complete when:

- every design-tree branch is resolved or explicitly deferred;
- the target architecture was proposed as concrete compositions and then
  confirmed, customized, or explicitly deferred;
- lower-level technical choices are confirmed, explicitly delegated, or deferred
  under the technical decision ownership contract;
- architecture style, channel, and platform are resolved from the journey and
  constraints, and custom components have a confirmed requirement or documented
  capability gap;
- every named external system or channel is accounted for in the integration
  ledger under the integration contract, including destination-versus-mechanism
  checks;
- repository facts were investigated rather than asked of the user;
- domain terms are recorded as they resolve;
- the AI branch is either closed with `AI responsibility: none` and a reason, or
  its boundary ladder is compared against the actual first journey, with the
  full agent-intent test when agent intent appears;
- the shared-understanding record contains no hidden architecture-style or
  execution-model assumption;
- the gate visuals match the record, and each is rendered or has a recorded
  blocker;
- a later user turn explicitly confirms the record.
