# Event-driven integration

## Use when / avoid when

Use when systems react to business events or telemetry: order placed, file
arrived, device reading, status change fanned out to several consumers. Avoid
when the caller needs an immediate answer (use a synchronous API) or a
multi-step process needs central control (use
[durable business workflow](06-durable-business-workflow.md)).

## Evidence classification

Official architecture style and reference architecture (**Event Hubs with
Functions**).

## Responsibilities and components

Core: producers, a broker chosen by intent (Event Grid for notifications, Event
Hubs for streams, Service Bus for commands), consumers, and an event contract
registry or documented schemas. Typical consumers: Functions, Container Apps,
Stream Analytics, or Fabric Eventstream. Optional: Logic Apps for SaaS
connectors, Data Explorer or Eventhouse for time-series analysis.

## Flows

Producer -> broker -> one or more consumers, each idempotent -> consumer state
or downstream system. Failed events go to dead-letter or a retry topic;
streams can be replayed from an offset.

## Trust boundaries and ownership

Producers own event schemas and versioning; consumers own their reactions.
Publish and subscribe rights use managed identities scoped per topic or hub.

## Support gates

- **Constraint:** delivery is at least once; ordering holds only within a
  partition or session.
- **Recommendation:** version event schemas and keep payloads small (Claim
  Check for large bodies).
- **Unverified:** event volume and peak rate; they set throughput units or
  partitions and cost.

## Tradeoffs

Loose coupling and independent scaling cost eventual consistency and harder
end-to-end tracing. Choreography suits independent reactions; a business
process with ordering and compensation needs orchestration instead.

## Diagram mapping

Context: producers and consuming systems. Components: broker, consumers, event
contracts. Runtime and data flow: publish, route, consume, dead-letter, replay.
Deployment: broker namespaces, partitions, consumer hosts, identities.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Event-driven style and consistency concerns | [Event-driven architecture](https://learn.microsoft.com/azure/architecture/guide/architecture-styles/event-driven) | 2026-11-24 | Design delivery, ordering, and idempotency deliberately |
| Stream ingestion with serverless processing | [Event Hubs and Functions](https://learn.microsoft.com/azure/architecture/serverless/event-hubs-functions/event-hubs-functions) | 2026-11-24 | Scale consumers on partitions |
| Broker comparison | [Compare messaging services](https://learn.microsoft.com/azure/service-bus-messaging/compare-messaging-services) | 2026-11-24 | Pick by command, event, or stream intent |
