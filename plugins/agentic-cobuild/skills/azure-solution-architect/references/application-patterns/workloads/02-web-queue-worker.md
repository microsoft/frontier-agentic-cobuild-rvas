# Web-queue-worker

## Use when / avoid when

Use when a request starts work that outlives the HTTP call or is resource
intensive: report generation, document conversion, imports, notifications,
third-party calls with variable latency. Avoid when the work needs waits,
approvals, or compensation across steps (use
[durable business workflow](06-durable-business-workflow.md)).

## Evidence classification

Official architecture style; the composition is a **locally composed recipe**.

## Responsibilities and components

Core: web/API front end, queue, worker, shared store, and a status channel back
to the user. Typical: App Service or Container Apps for the front end; Service
Bus or Queue Storage; a worker on Functions, a Container Apps job, or App
Service WebJobs; Blob Storage for large inputs and outputs (Claim Check).

## Flows

Client -> API validates and stores a job record -> enqueue -> return job id ->
worker dequeues, processes idempotently, writes result and status -> client
polls status or receives a push (SignalR or Web PubSub) -> failed messages go
to dead-letter with an owner.

## Trust boundaries and ownership

Front end and worker use separate managed identities with least privilege on
the queue and stores. The job record owns status; the worker never trusts the
message body as authorization.

## Support gates

- **Constraint:** brokers deliver at least once; the worker must be idempotent.
- **Recommendation:** define job timeouts, retry limits, and a poison-message
  procedure in the specification.
- **Unverified:** peak queue depth and processing time; they drive worker scale
  rules and cost.

## Tradeoffs

Decouples user latency from processing and absorbs bursts (Queue-Based Load
Leveling). Adds eventual consistency the user can see; the UI must show job
status honestly.

## Diagram mapping

Context: users and downstream systems. Components: API, queue, worker, stores.
Runtime and data flow: submit, enqueue, process, status, dead-letter.
Deployment: hosts, broker, scale rules, identities.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Style, benefits, and consistency risks | [Web-Queue-Worker](https://learn.microsoft.com/azure/architecture/guide/architecture-styles/web-queue-worker) | 2026-11-24 | Design for duplicates and status visibility |
| Load leveling and competing consumers | [Queue-Based Load Leveling](https://learn.microsoft.com/azure/architecture/patterns/queue-based-load-leveling); [Competing Consumers](https://learn.microsoft.com/azure/architecture/patterns/competing-consumers) | 2026-11-24 | Scale workers on queue depth |
