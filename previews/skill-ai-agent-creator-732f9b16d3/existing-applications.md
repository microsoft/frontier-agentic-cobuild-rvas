## Extend the system you already own

**Bring the current application and the change you want.** You do not need to
start from an empty repository or adopt a new stack to use AI Agent Creator.
An existing platform-managed agent or workflow can also be the starting point.

The creator inspects the selected workspace before asking about missing facts.
It designs the addition while leaving application code and infrastructure
unchanged. Implementation starts only in a separate session.

## Give the creator usable context

Open the application's repository, including relevant platform configuration
when it is maintained there. Point to the current architecture or operating
records if they live elsewhere in an approved location.

Explain the intended change and the interfaces that must remain stable. Identify
enterprise controls outside the repository, such as shared identity or network
services. Use synthetic inputs until customer-data access is agreed.

| Context | What matters for the design |
| --- | --- |
| Current journey | What the user does today and where the proposed capability changes it. |
| Interfaces and data | Existing API contracts, systems of record, and source owners. |
| Access and approvals | Who may read evidence or authorize a business operation. |
| Delivery and operations | Current environments, release checks, telemetry, and rollback ownership. |
| Constraints | Required stack, compatibility promises, and limits on migration. |

Repository facts should be inspected rather than repeatedly asked of you.
Unknown enterprise facts remain questions; a missing local file does not prove
that a control or service is absent.

## Start with one useful addition

Choose a first journey whose result you can evaluate. For example, an existing
service application could gain an evidence-backed case summary while leaving
case editing and assignment unchanged.

If follow-up investigation is required, include it explicitly. Otherwise,
one bounded model response may be enough. If the system prepares an action,
keep the existing authorization and approval owner visible.

Agree what counts as success against today's behavior. Define what stays
unchanged, including response contracts and access boundaries. Specify how the
application behaves when AI is unavailable or evidence cannot support an answer.

This is an illustrative scope, not a requirement to add a chat panel or replace
the application's workflow.

<!-- diagram: existing-app-delta -->

## Make reuse and migration explicit

Evaluate the existing stack and model deployments before introducing alternatives.
Reuse suitable capabilities. A proposed replacement needs a stated requirement
or gap, together with the cost of changing the system.

When migration is justified, the architecture package should explain coexistence
and compatibility. The implementation plan should identify data movement, cutover,
rollback, and eventual decommissioning where applicable.

Avoid leaving the old and new responsibilities ambiguous. Name the system of
record and the owner of each operation during the transition.

## Review the addition as a complete package

The creator produces the same four architecture artifacts used for a new project,
but their scope is the agreed change. The specification should distinguish
new acceptance criteria from behavior that must be preserved.

Review the data and action boundaries alongside the component changes. Check
that the delivery plan includes regression tests and release controls appropriate
to the existing application.

Discovery confirmation and complete-package approval remain separate gates.
After approval, use [the implementation handoff](start.html#start-implementation-in-a-new-session)
in a new session. Changes in scope or architecture return to the affected gate.

## Begin with the intended change

```text
Add evidence-backed case summarization and follow-up investigation to this
existing application. Inspect the current stack and architecture records.
Preserve the case APIs and authorization model. Reuse our enterprise services,
compare agentic and simpler execution, and plan a bounded first release with
regression checks and rollback.
```

[Install the plugin and supporting skills](start.html) without replacing existing
project configuration. For the execution trade-off, read
[Does this need an agent?](agent-or-workflow.html).
