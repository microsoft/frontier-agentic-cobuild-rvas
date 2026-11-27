# Messaging and integration selection

Select per interaction in the integration ledger. Name the message's intent
first: a **command** asks one owner to do something; an **event** reports that
something happened; a **stream** is a high-volume sequence read by offset.

| Interaction | Start with | Choose when |
| --- | --- | --- |
| Commands, business messages, work queues | **Service Bus** | Ordering by session, transactions, dead-lettering, duplicate detection, or scheduled delivery matter |
| Discrete event notifications to many subscribers | **Event Grid** | Push delivery with filtering; reacting to Azure resource events |
| Telemetry or clickstream at high throughput, replay | **Event Hubs** | Partitioned streams, consumer-managed offsets, Kafka clients |
| Simple, low-cost work queue | **Queue Storage** | No ordering, sessions, or transactions needed |
| Synchronous API exposure, versioning, policies, developer portal | **API Management** | Several consumers or APIs need shared security, throttling, and mediation |
| Connector-heavy integration with SaaS and line-of-business systems | **Logic Apps** | Visual workflow and managed connectors fit the team and the interaction |
| Code-defined stateful orchestration | **Durable Functions** or Durable Task SDKs with **Durable Task Scheduler** | Waits, fan-out/fan-in, human approval, or compensation live in code |
| Real-time push to browsers or devices | **SignalR Service** or **Web PubSub** | Server-to-client updates at scale |

Delivery rules every consumer meets:

- **Idempotent handling**: brokers deliver at least once; consumers tolerate
  duplicates with a message or business key.
- **Poison handling**: failed messages go to a dead-letter path with an owner
  and a replay procedure.
- **Large payloads** use Claim Check: store the body in Blob Storage, send a
  reference.
- **Ordering** is guaranteed only where the broker and partitioning provide it;
  record where the design depends on it.

**Complete when:** every ledger interaction names its intent, mechanism,
direction, delivery guarantee, failure path, and owner, and the rejected
mechanism is recorded where two were plausible.

## Evidence

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Asynchronous messaging options | [Asynchronous messaging options](https://learn.microsoft.com/azure/architecture/guide/technology-choices/messaging) | 2026-11-24 | Choose by intent: command, event, or stream |
| Service Bus, Event Grid, Event Hubs comparison | [Compare messaging services](https://learn.microsoft.com/azure/service-bus-messaging/compare-messaging-services) | 2026-11-24 | Event Grid for notifications, Event Hubs for streams |
| API Management for API protection | [Protect APIs with API Management](https://learn.microsoft.com/azure/architecture/web-apps/api-management/architectures/protect-apis) | 2026-11-24 | Add a gateway when several consumers need shared policy |
| Logic Apps versus Durable Functions | [Compare integration services](https://learn.microsoft.com/azure/azure-functions/functions-compare-logic-apps-ms-flow-webjobs) | 2026-11-24 | Connectors and designer versus code-first orchestration |
| Durable Task Scheduler as managed state provider | [Durable Task Scheduler](https://learn.microsoft.com/azure/durable-task/scheduler/durable-task-scheduler) | 2026-11-24 | Prefer for new durable orchestrations; verify region and features |
