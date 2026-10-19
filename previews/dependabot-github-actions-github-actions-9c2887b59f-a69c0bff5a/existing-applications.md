## Extend the system you already own

Bring the current application and the intended change. The creator inspects the
workspace, designs the addition, and leaves code and infrastructure unchanged.
Implementation starts in a separate session.

## Give the creator usable context

Open the application repository and point to approved architecture or operating
records stored elsewhere. Name stable interfaces and external controls. Use
synthetic inputs until customer-data access is agreed.

| Context | What matters for the design |
| --- | --- |
| Current journey | What the user does today and where the proposed capability changes it. |
| Interfaces and data | Existing API contracts, systems of record, and source owners. |
| Access and approvals | Who may read evidence or authorize a business operation. |
| Delivery and operations | Current environments, release checks, telemetry, and rollback ownership. |
| Constraints | Required stack, compatibility promises, and limits on migration. |

The creator inspects repository facts and asks about enterprise facts it cannot
verify. Missing documentation does not prove that a control or service is absent.

## Start with one useful addition

Choose one journey with a result you can evaluate. State what stays unchanged,
including contracts, authorization, and access boundaries. Define behavior when
AI is unavailable or evidence is insufficient. Add investigation, actions, or a
new interface only when the journey requires them.

<!-- diagram: existing-app-delta -->

## Make reuse and migration explicit

Evaluate existing capabilities before proposing replacements. Name the requirement
and migration cost. If migration is justified, define coexistence, compatibility,
data movement, cutover, rollback, and system ownership.

## Review the addition as a complete package

The architecture package covers the agreed change and separates new acceptance
criteria from behavior to preserve. Review data and action boundaries, regression
tests, release controls, and rollback.

Discovery confirmation and package approval remain separate. After approval,
use [the implementation handoff](start.html#start-implementation-in-a-new-session)
in a new session. Reapprove changed scope or architecture.

## Begin with the intended change

```text
/ai-agent-creator Add evidence-backed case summarization and follow-up investigation to this
existing application. Inspect the current stack and architecture records.
Preserve the case APIs and authorization model. Reuse our enterprise services,
compare agentic and simpler execution, and plan a bounded first release with
regression checks and rollback.
```

[Install the plugin and supporting skills](start.html) without replacing existing
project configuration.
