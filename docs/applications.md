## What the creator can design

Bring the first task you want users to complete, in a new or existing
application. AI Agent Creator defines that journey and designs the architecture.
It might recommend a platform agent, a custom app, a fixed workflow, or a single
model call.

It designs the solution. It doesn't build it. The examples below are
illustrations, not customer results or deployment templates.

## Application families

The products shown are examples. Discovery checks whether they fit, connect to
your systems, and are available to you.

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

### Background workflows

Respond to events or process jobs with no chat interface. Decide who owns job
state, how work resumes after a failure, which steps stay fixed, and when the
system stops investigating.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/logic-apps/logic-apps-overview"><img src="assets/icons/microsoft/logic-apps.svg" alt="" width="32" height="32" />Azure Logic Apps</a><small>Connector-based workflows with explicit steps.</small></div>
<div><a href="https://learn.microsoft.com/azure/azure-functions/durable/durable-functions-overview"><img src="assets/icons/microsoft/functions.svg" alt="" width="32" height="32" />Azure Functions with Durable Functions</a><small>Code-defined workflows with persisted state and recovery.</small></div>
</div>

<!-- diagram: family-background -->

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

## Capabilities you can combine

Families overlap. Add memory, multiple agents, or personalization only when the
journey needs them, and decide who owns what's stored, who can see it, and when
it expires or gets deleted.

## Choose an architecture during discovery

Don't pick a platform before discovery. Bring the outcome and your constraints.
The creator weighs what you already have against custom code for your first
journey. Microsoft's [technology planning guidance](https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/technology-solutions-plan-strategy)
also starts by asking whether a ready-made solution meets the need.

Treat the user channel and the runtime as separate choices, and keep access to
knowledge separate from permission to act. The architecture review confirms the
products fit and the connections work, and names an owner for anything still
unchecked.

## Describe your first journey

Tell the creator who will use the application and what their first task is:

```text
/agentic-cobuild:ai-agent-creator Design a maintenance assistant for property managers. Help them investigate
resident requests and prepare a work order for approval. Reuse our existing
identity and service system. Compare an agent with a simpler workflow before
recommending the architecture.
```

[Set up your application workspace](start.html), then bring your own idea.
If you are extending a system, [prepare its context](start.html#working-with-an-existing-application).

Review and approve the architecture package, then start implementation in a
separate session. Approving the architecture doesn't authorize building or
deploying anything.
