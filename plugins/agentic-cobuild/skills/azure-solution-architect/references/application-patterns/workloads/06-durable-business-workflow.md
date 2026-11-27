# Durable business workflow

## Use when / avoid when

Use when a business process spans minutes to months with waits, human
approvals, timers, retries, fan-out/fan-in, or compensation: onboarding, claims,
procurement, order fulfillment. Avoid for one-shot background work
([web-queue-worker](02-web-queue-worker.md)) or pure event reactions
([event-driven integration](04-event-driven-integration.md)).

## Evidence classification

Official capability guidance for Logic Apps, Durable Functions, and Durable
Task Scheduler; the composition is a **locally composed recipe**.

## Responsibilities and components

Core: workflow engine, durable state, activity implementations, an approval
channel (email, Teams, or app UI), and the systems of record the activities
change. Choose **Logic Apps** for connector-heavy, designer-maintained
processes; **Durable Functions** or Durable Task SDKs with **Durable Task
Scheduler** for code-first orchestration on Functions, Container Apps, or AKS.

## Flows

Trigger -> orchestration starts with a business key -> activities call systems
of record idempotently -> wait for approval or timer -> continue, compensate on
rejection or failure -> completion event. Status is queryable by business key.

## Trust boundaries and ownership

The workflow identity has only the permissions its activities need. Approvers
are authenticated and authorized for the specific decision; the approval record
is auditable. Business owners own the process definition and SLAs.

## Support gates

- **Constraint:** orchestration code must be deterministic and replay safe;
  side effects live in activities.
- **Recommendation:** version workflows so in-flight instances finish on their
  original definition.
- **Maturity:** verify Durable Task Scheduler region and feature availability,
  and Logic Apps plan (Consumption or Standard) networking support.
- **Unverified:** instance volume and longest wait, which drive state storage
  and cost.

## Tradeoffs

Logic Apps speeds connector integration and gives business-readable designs;
code-first orchestration gives testability and source control. Both make
long-running state explicit instead of hiding it in queues and tables.

## Diagram mapping

Context: actors, approvers, systems of record. Components: orchestrator,
activities, state, approval channel. Runtime and data flow: steps, waits,
approval, compensation. Deployment: engine host, state provider, identities,
connectors.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Logic Apps versus Durable Functions | [Compare integration services](https://learn.microsoft.com/azure/azure-functions/functions-compare-logic-apps-ms-flow-webjobs) | 2026-11-24 | Choose by connector need and team practice |
| Managed durable state provider | [Durable Task Scheduler](https://learn.microsoft.com/azure/durable-task/scheduler/durable-task-scheduler) | 2026-11-24 | Prefer for new code-first orchestrations |
| Compensation across systems | [Saga](https://learn.microsoft.com/azure/architecture/patterns/saga) | 2026-11-24 | Define a compensating activity for each external effect |
