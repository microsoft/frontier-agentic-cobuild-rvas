## What the creator can design

Tell AI Agent Creator what you want a new or existing application to do.
It helps define the first user journey and architecture. It may recommend a
platform agent, custom application, explicit workflow, or bounded model call.

The plugin designs the solution; it does not implement or certify it. The
examples below are possibilities, not customer results or deployment templates.

## Application families

The products shown are examples. Discovery must verify product fit, connections,
availability, and release status.

<!-- application-family -->

### Knowledge assistants

Help users find permitted information and cite its source. Define source
ownership, permissions, freshness, and what happens when evidence conflicts or
is missing. A fixed lookup may not need an agent loop.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/search/search-what-is-azure-search"><img src="assets/icons/microsoft/ai-search.svg" alt="" width="32" height="32" />Azure AI Search</a><small>Search and retrieval for an application-owned assistant.</small></div>
<div><a href="https://learn.microsoft.com/microsoft-copilot-studio/knowledge-copilot-studio"><img src="assets/icons/microsoft/copilot-studio.svg" alt="" width="32" height="32" />Microsoft Copilot Studio</a><small>A platform-managed agent grounded in configured knowledge sources.</small></div>
</div>

<!-- diagram: family-knowledge -->

<!-- application-family -->

### Agents that use business tools

Investigate a task and prepare or perform approved operations. Define read-only
access, approval boundaries, authorization, and retry behavior that prevents
duplicate business actions.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/logic-apps/logic-apps-overview"><img src="assets/icons/microsoft/logic-apps.svg" alt="" width="32" height="32" />Azure Logic Apps</a><small>Connector-based business workflows.</small></div>
<div><a href="https://learn.microsoft.com/azure/foundry/agents/overview"><img src="assets/icons/microsoft/foundry-agent-service.svg" alt="" width="32" height="32" />Foundry Agent Service</a><small>An agent that selects configured tools. Enforce business authorization separately.</small></div>
</div>

<!-- diagram: family-tools -->

<!-- application-family -->

### Document and media processing

Turn incoming material into structured results. Define the output schema,
review threshold, correction path, and downstream handoff. This may be a fixed
pipeline with no conversational interface.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/ai-services/document-intelligence/overview"><img src="assets/icons/microsoft/document-intelligence.svg" alt="" width="32" height="32" />Azure Document Intelligence</a><small>Prebuilt or custom extraction models for known document types.</small></div>
<div><a href="https://learn.microsoft.com/azure/ai-services/content-understanding/choosing-right-ai-tool"><img src="assets/icons/document-analysis.svg" alt="" width="32" height="32" />Azure Content Understanding</a><small>Analyzers for unstructured documents or mixed-media inputs.</small></div>
</div>

<!-- diagram: family-documents -->

<!-- application-family -->

### Voice and audiovisual experiences

Use speech or audiovisual presentation when the task requires it. Define
interruptions, corrections, exit paths, privacy, and accessibility. An avatar
or generated video alone does not require an agent.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/ai-services/speech-service/overview"><img src="assets/icons/microsoft/speech.svg" alt="" width="32" height="32" />Azure Speech</a><small>Compose speech recognition and synthesis with your application logic.</small></div>
<div><a href="https://learn.microsoft.com/azure/ai-services/speech-service/voice-live"><img src="assets/icons/microsoft/speech.svg" alt="" width="32" height="32" />Voice Live API</a><small>A speech-to-speech API within Azure Speech, rather than a separate product.</small></div>
</div>

<!-- diagram: family-voice -->

<!-- application-family -->

### Background workflows

Respond to events or process jobs without a chat interface. Define who owns job
state, how work resumes, which branches stay fixed, and when investigation stops.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/logic-apps/logic-apps-overview"><img src="assets/icons/microsoft/logic-apps.svg" alt="" width="32" height="32" />Azure Logic Apps</a><small>Connector-based workflows with explicit steps.</small></div>
<div><a href="https://learn.microsoft.com/azure/azure-functions/durable/durable-functions-overview"><img src="assets/icons/microsoft/functions.svg" alt="" width="32" height="32" />Azure Functions with Durable Functions</a><small>Code-defined workflows with persisted state and recovery.</small></div>
</div>

<!-- diagram: family-background -->

<!-- application-family -->

### Coordinated specialist agents

Split responsibilities only when one agent cannot meet the requirement reliably.
Define handoffs, access boundaries, shared state, conflict handling, and failure
behavior. Coordination adds overhead.
Microsoft's [orchestration guidance](https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns)
recommends the lowest complexity that meets the requirement.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/foundry/agents/overview"><img src="assets/icons/microsoft/foundry-agent-service.svg" alt="" width="32" height="32" />Foundry Agent Service</a><small>A managed agent runtime. Verify support for the selected coordination pattern.</small></div>
<div><a href="https://learn.microsoft.com/agent-framework/workflows/orchestrations/"><img src="assets/icons/code.svg" alt="" width="32" height="32" />Microsoft Agent Framework</a><small>Code-defined orchestration. Choose hosting separately, including Foundry when appropriate.</small></div>
</div>

<!-- diagram: family-specialists -->

## Capabilities you can combine

Families can overlap. Add persistent memory, multiple agents, or personalization
only when the journey needs them. Define ownership, permissions, provenance,
expiry, and deletion.

## Where this workflow stops

The creator produces an approved architecture package for a separate
implementation session. Architecture approval does not authorize implementation
or deployment.

## Describe your first journey

Tell the creator who will use the application and what their first task is:

```text
/ai-agent-creator Design a maintenance assistant for property managers. Help them investigate
resident requests and prepare a work order for approval. Reuse our existing
identity and service system. Compare an agent with a simpler workflow before
recommending the architecture.
```

[Set up your application workspace](start.html), then bring your own idea.
If you are extending a system, read [Add AI to an existing application](existing-applications.html).
