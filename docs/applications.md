## What the creator can design

Bring the first task you want users to complete, in a new or existing
application. Azure Solution Architect defines that journey and designs the architecture.
The app doesn't need AI. The creator compares plain code with no model, a fixed
workflow, a single model call, and an agent, and recommends the simplest one
that does the job.

Whatever you build, the [path](path.html) is the same: agree on it, delegate the
build, verify the result. The examples below are illustrations, not customer
results or deployment templates.

## Application shapes

Most applications take one of these shapes, and many combine several. None needs
AI. The products shown are examples. Discovery checks whether they fit, connect
to your systems, and are available to you.

<!-- application-family -->

### Web apps and APIs

Let users or other systems create, read, and update business records: portals,
line-of-business apps, back-office tools, public APIs. Decide who signs in, what
each role may change, and what happens when a request starts work that takes
longer than the call.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/app-service/overview"><img src="assets/icons/microsoft/app-service.svg" alt="" width="32" height="32" />Azure App Service</a><small>Managed hosting for web apps and APIs, from code or a container.</small></div>
<div><a href="https://learn.microsoft.com/azure/azure-sql/database/sql-database-paas-overview"><img src="assets/icons/microsoft/sql-database.svg" alt="" width="32" height="32" />Azure SQL Database</a><small>A managed relational store for transactions and reporting on operational data.</small></div>
</div>

<!-- diagram: family-web -->

<!-- application-family -->

### Microservices

Split a large domain into services that separate teams deploy and scale on
their own. Decide where each boundary sits, which service owns which data, and
how services stay consistent without sharing a database. If one team owns the
product, a modular monolith is cheaper to run.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/container-apps/overview"><img src="assets/icons/microsoft/container-apps.svg" alt="" width="32" height="32" />Azure Container Apps</a><small>Containerized services without managing Kubernetes.</small></div>
<div><a href="https://learn.microsoft.com/azure/aks/what-is-aks"><img src="assets/icons/microsoft/aks.svg" alt="" width="32" height="32" />Azure Kubernetes Service</a><small>A managed cluster, when you need Kubernetes APIs or cluster-level control.</small></div>
</div>

<!-- diagram: family-microservices -->

<!-- application-family -->

### Event-driven integration

React to business events such as an order placed, a file arrived, or a status
changed. Decide who owns each event schema, how consumers handle the same event
twice, and where failed events go. Use a synchronous API when the caller needs
an answer straight away.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/event-grid/overview"><img src="assets/icons/microsoft/event-grid.svg" alt="" width="32" height="32" />Azure Event Grid</a><small>Push notifications about state changes to many subscribers.</small></div>
<div><a href="https://learn.microsoft.com/azure/service-bus-messaging/service-bus-messaging-overview"><img src="assets/icons/microsoft/service-bus.svg" alt="" width="32" height="32" />Azure Service Bus</a><small>Business messages and work queues with ordering, retries, and dead-lettering.</small></div>
</div>

<!-- diagram: family-events -->

<!-- application-family -->

### Durable business workflows

Run a process that spans minutes to months, with waits, approvals, timers, and
retries: onboarding, claims, procurement. Decide who owns the process state,
how it resumes after a failure, and how completed steps get undone when a later
one is rejected.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/logic-apps/logic-apps-overview"><img src="assets/icons/microsoft/logic-apps.svg" alt="" width="32" height="32" />Azure Logic Apps</a><small>Connector-based workflows that people maintain in a visual designer.</small></div>
<div><a href="https://learn.microsoft.com/azure/azure-functions/durable/durable-functions-overview"><img src="assets/icons/microsoft/functions.svg" alt="" width="32" height="32" />Azure Functions with Durable Functions</a><small>Code-defined workflows with persisted state and recovery.</small></div>
</div>

<!-- diagram: family-durable -->

<!-- application-family -->

### Batch and data processing

Move and reshape data on a schedule: nightly imports and exports, pipelines
into analytics, reporting. Decide which system holds the record for each
dataset, who may use each layer, and how a failed run restarts without
duplicating data.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/data-factory/introduction"><img src="assets/icons/microsoft/data-factory.svg" alt="" width="32" height="32" />Azure Data Factory</a><small>Scheduled pipelines that copy and transform data across sources.</small></div>
<div><a href="https://learn.microsoft.com/fabric/fundamentals/microsoft-fabric-overview"><img src="assets/icons/microsoft/fabric.svg" alt="" width="32" height="32" />Microsoft Fabric</a><small>Pipelines, a lakehouse, and reporting on one analytics platform.</small></div>
</div>

<!-- diagram: family-data -->

<!-- application-family -->

### Modernize an existing application

Extend, move, or gradually replace a system you already run. Decide what to
keep, which part moves first, and how data stays in sync while old and new run
side by side. Microsoft's [Strangler Fig pattern](https://learn.microsoft.com/azure/architecture/patterns/strangler-fig)
replaces a system one route at a time.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/migrate/migrate-services-overview"><img src="assets/icons/microsoft/azure-migrate.svg" alt="" width="32" height="32" />Azure Migrate</a><small>Discover and assess what runs today before you plan the move.</small></div>
<div><a href="https://learn.microsoft.com/azure/api-management/api-management-key-concepts"><img src="assets/icons/microsoft/api-management.svg" alt="" width="32" height="32" />Azure API Management</a><small>A front door that routes each API to the legacy or the new implementation.</small></div>
</div>

<!-- diagram: family-modernize -->

## AI capabilities you can add

Add AI to any shape above when the journey needs it. These are the forms it
usually takes. The creator still compares each one with plain code and a fixed
workflow first.

<!-- application-family -->

### Knowledge assistants

Help users find information they're allowed to see, and cite where it came from.
Decide who owns each source, how fresh it must be, and what happens when sources
conflict or have nothing to say. A fixed lookup may not need an agent.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/search/search-what-is-azure-search"><img src="assets/icons/microsoft/ai-search.svg" alt="" width="32" height="32" />Azure AI Search</a><small>Search and retrieval for an application-owned assistant.</small></div>
<div><a href="https://learn.microsoft.com/microsoft-copilot-studio/knowledge-copilot-studio"><img src="assets/icons/microsoft/copilot-studio.svg" alt="" width="32" height="32" />Microsoft Copilot Studio</a><small>A platform-managed agent grounded in configured knowledge sources.</small></div>
</div>

<!-- diagram: family-knowledge -->

<!-- application-family -->

### Agents that use business tools

Investigate a task, then prepare or perform approved operations. Decide what is
read-only, what needs approval, who is authorized, and how retries avoid doing
the same business action twice.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/logic-apps/logic-apps-overview"><img src="assets/icons/microsoft/logic-apps.svg" alt="" width="32" height="32" />Azure Logic Apps</a><small>Connector-based business workflows.</small></div>
<div><a href="https://learn.microsoft.com/azure/foundry/agents/overview"><img src="assets/icons/microsoft/foundry-agent-service.svg" alt="" width="32" height="32" />Foundry Agent Service</a><small>An agent that selects configured tools. Enforce business authorization separately.</small></div>
</div>

<!-- diagram: family-tools -->

<!-- application-family -->

### Document and media processing

Turn incoming files into structured results. Decide the output schema, when a
person reviews, how errors get corrected, and where results go next. This is
often a fixed pipeline with no chat interface.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/ai-services/document-intelligence/overview"><img src="assets/icons/microsoft/document-intelligence.svg" alt="" width="32" height="32" />Azure Document Intelligence</a><small>Prebuilt or custom extraction models for known document types.</small></div>
<div><a href="https://learn.microsoft.com/azure/ai-services/content-understanding/choosing-right-ai-tool"><img src="assets/icons/document-analysis.svg" alt="" width="32" height="32" />Azure Content Understanding</a><small>Analyzers for unstructured documents or mixed-media inputs.</small></div>
</div>

<!-- diagram: family-documents -->

<!-- application-family -->

### Voice and audiovisual experiences

Use speech or video when the task needs it. Decide how users interrupt, correct
or leave, and cover privacy and accessibility. An avatar or generated video
doesn't make something an agent.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/ai-services/speech-service/overview"><img src="assets/icons/microsoft/speech.svg" alt="" width="32" height="32" />Azure Speech</a><small>Compose speech recognition and synthesis with your application logic.</small></div>
<div><a href="https://learn.microsoft.com/azure/ai-services/speech-service/voice-live"><img src="assets/icons/microsoft/speech.svg" alt="" width="32" height="32" />Voice Live API</a><small>A speech-to-speech API within Azure Speech, rather than a separate product.</small></div>
</div>

<!-- diagram: family-voice -->

<!-- application-family -->

### Coordinated specialist agents

Split the work across agents only when one agent can't do it reliably.
Coordination costs something, so decide up front how agents hand off work, what
each can access, what state they share, and what happens when they disagree or
fail. Microsoft's [orchestration guidance](https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns)
recommends the simplest design that meets the requirement.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/foundry/agents/overview"><img src="assets/icons/microsoft/foundry-agent-service.svg" alt="" width="32" height="32" />Foundry Agent Service</a><small>A managed agent runtime. Verify support for the selected coordination pattern.</small></div>
<div><a href="https://learn.microsoft.com/agent-framework/workflows/orchestrations/"><img src="assets/icons/code.svg" alt="" width="32" height="32" />Microsoft Agent Framework</a><small>Code-defined orchestration. Choose hosting separately, including Foundry when appropriate.</small></div>
</div>

<!-- diagram: family-specialists -->

## Bring your own idea

[Start](start.html) sets up your workspace and takes your idea to an approved
architecture.
