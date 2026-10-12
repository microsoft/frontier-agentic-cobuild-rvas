# Durable workflow variant

## Use when / avoid when

Use when jobs, checkpoints, or human waits must resume after failures/restarts.
For a short request, ordinary application/session handling may suffice.
Apply this variant to a chosen workload and runtime rather than adding a new agent.

## Evidence classification

Official **capability guidance; optional execution variant**. Framework checkpoints,
Durable Task execution, managed hosted sessions and business review records are
distinct mechanisms, with independent support/lifecycle requirements.

## Responsibilities and components

Core: durable job/run identity, execution host, verified checkpoint/session store,
external-action adapters, review/approval state when needed and reconciliation.
The documented Durable Extension supports Functions or application-owned workers;
the extension/backend selection is separate from Foundry managed hosting.

## Flows

Submit -> checkpoint -> execute/retry bounded step -> wait/resume -> validated
completion. Bind external responses to the pending run/action. Keep model/tool
effects at the documented replay-safe boundary.

## Trust boundaries and ownership

Authorize job/status/resume access. Partition history and checkpoints, bind
review/approval to the correct caller and run, and expire/cancel waits deliberately.
Conversation history alone does not supply durable business-workflow progress.

## Support gates

- **Maturity:** check language, extension, backend and hosting packages separately.
- **Constraint:** externally visible writes need idempotency/reconciliation;
  checkpointing is not proof of exactly-once business effects.
- **Unverified:** managed long-running hosted-agent state/approval features have
  their own gates; do not substitute them silently for this self-managed path.
- **Recommendation:** test resume, replay, duplicate messages, cancellation and
  lost/expired reviewer responses before trusting recovery.

## Tradeoffs

Durability adds stores and replay/lifecycle constraints. Keep a review queue plus
application state when that is simpler than a long-running agent.

## Diagram mapping

Context: submitter/reviewer/operator. Components: runtime, execution and durable
stores separately. AI and data flow: checkpoints, waits, external effects and
failure recovery. Deployment: verified backend/host, identities and operations.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Durable execution is an optional framework integration | [Durable Extension](https://learn.microsoft.com/agent-framework/integrations/durable-extension) | 2026-10-01 | Name host, store, replay and resume ownership |
| Hosting and protocol are independent choices | [Framework hosting](https://learn.microsoft.com/agent-framework/hosting/) | 2026-10-01 | Keep self-managed durability separate from managed agent hosting |
