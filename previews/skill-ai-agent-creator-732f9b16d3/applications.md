## What the creator can design

Bring an outcome for a new application or a change to an existing one.
AI Agent Creator helps you define the user journey and agree on a
Microsoft-cloud architecture before implementation starts.

The workflow covers platform-managed agents and custom applications. It can
also conclude that a bounded model call or an explicit workflow fits better
than an agent.

Here, **supported means covered by the design workflow**. The plugin does not
supply ready-made implementations or certified architectures. It does not
guarantee compatibility between services. Discovery verifies the connections
your design needs.
The examples below are illustrative, not customer results or deployment templates.

## Application families

The Microsoft products shown below are examples, not required services or approved
architectures. Discovery must verify product fit and any connections your design needs.
Some examples cover different parts of a solution and can work together. They are
not interchangeable. Check the selected features' availability and release status.
Product icons use Microsoft artwork where available. Neutral document and code
symbols are illustrations, not product logos.

<!-- application-family -->

### Knowledge assistants

Help a user find and interpret authorized information. An illustrative operations
assistant could explain a procedure and cite the current source, then investigate
a follow-up question using other permitted evidence.

The design must establish source ownership and freshness. It must also explain
how user permissions constrain retrieval and what happens when evidence is absent
or contradictory. A fixed lookup may need retrieval without an agent loop.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/search/search-what-is-azure-search"><img src="assets/icons/microsoft/ai-search.svg" alt="" width="32" height="32" />Azure AI Search</a><small>Search and retrieval for an application-owned assistant.</small></div>
<div><a href="https://learn.microsoft.com/microsoft-copilot-studio/knowledge-copilot-studio"><img src="assets/icons/microsoft/copilot-studio.svg" alt="" width="32" height="32" />Microsoft Copilot Studio</a><small>A platform-managed agent grounded in configured knowledge sources.</small></div>
</div>

<!-- diagram: family-knowledge -->

<!-- application-family -->

### Agents that use business tools

Investigate a task and prepare or perform bounded operations. A maintenance
assistant could gather request details and propose a work order for a manager
to approve.

Tool access is a separate decision from knowledge access. Specify which actions
are read-only, which require approval, and how the system handles retries without
duplicating a business operation. Authorization belongs at the operation boundary.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/logic-apps/logic-apps-overview"><img src="assets/icons/microsoft/logic-apps.svg" alt="" width="32" height="32" />Azure Logic Apps</a><small>Connector-based business workflows.</small></div>
<div><a href="https://learn.microsoft.com/azure/foundry/agents/overview"><img src="assets/icons/microsoft/foundry-agent-service.svg" alt="" width="32" height="32" />Foundry Agent Service</a><small>An agent that selects configured tools. Enforce business authorization separately.</small></div>
</div>

<!-- diagram: family-tools -->

<!-- application-family -->

### Document and media processing

Turn incoming material into structured results. For example, classify a document
bundle, extract fields, and send uncertain results to a reviewer.

Agree the output schema and the review threshold. Define how a reviewer corrects
an error and how a corrected result reaches the downstream system. This may be
a fixed processing pipeline; a conversational interface is optional.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/ai-services/document-intelligence/overview"><img src="assets/icons/microsoft/document-intelligence.svg" alt="" width="32" height="32" />Azure Document Intelligence</a><small>Prebuilt or custom extraction models for known document types.</small></div>
<div><a href="https://learn.microsoft.com/azure/ai-services/content-understanding/choosing-right-ai-tool"><img src="assets/icons/document-analysis.svg" alt="" width="32" height="32" />Azure Content Understanding</a><small>Analyzers for unstructured documents or mixed-media inputs.</small></div>
</div>

<!-- diagram: family-documents -->

<!-- application-family -->

### Voice and audiovisual experiences

Use speech or an audiovisual presentation when the user's task requires it. An
illustrative voice assistant could guide a worker through a permitted procedure,
with confirmation before a consequential action.

Decide how users interrupt, correct, or leave the interaction. Identify privacy
and accessibility requirements, and verify the selected channel's capabilities.
An avatar or generated video alone does not establish a need for an agent.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/ai-services/speech-service/overview"><img src="assets/icons/microsoft/speech.svg" alt="" width="32" height="32" />Azure Speech</a><small>Compose speech recognition and synthesis with your application logic.</small></div>
<div><a href="https://learn.microsoft.com/azure/ai-services/speech-service/voice-live"><img src="assets/icons/microsoft/speech.svg" alt="" width="32" height="32" />Voice Live API</a><small>A speech-to-speech API within Azure Speech, rather than a separate product.</small></div>
</div>

<!-- diagram: family-voice -->

<!-- application-family -->

### Background workflows

Respond to an event or process a job without a new chat interface. An incoming
service request could trigger evidence gathering and then wait for an owner to
approve the proposed next step.

Identify who owns job state and how work resumes after a failure or a long wait.
Fixed branches can stay explicit; runtime investigation should have a defined
scope and stopping condition.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/logic-apps/logic-apps-overview"><img src="assets/icons/microsoft/logic-apps.svg" alt="" width="32" height="32" />Azure Logic Apps</a><small>Connector-based workflows with explicit steps.</small></div>
<div><a href="https://learn.microsoft.com/azure/azure-functions/durable/durable-functions-overview"><img src="assets/icons/microsoft/functions.svg" alt="" width="32" height="32" />Azure Functions with Durable Functions</a><small>Code-defined workflows with persisted state and recovery.</small></div>
</div>

<!-- diagram: family-background -->

<!-- application-family -->

### Coordinated specialist agents

Split responsibilities when one agent cannot meet the requirement reliably.
For example, an investigator and a separately authorized action agent could have
different tools and access boundaries.

The design must justify the split and define handoff contracts, including how
agents handle conflicting results and shared state. Define what happens when
one agent fails. Coordination adds overhead.
Microsoft's [orchestration guidance](https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns)
recommends the lowest complexity that meets the requirement.

<div class="family-product-example">
<span>Example options</span>
<div><a href="https://learn.microsoft.com/azure/foundry/agents/overview"><img src="assets/icons/microsoft/foundry-agent-service.svg" alt="" width="32" height="32" />Foundry Agent Service</a><small>A managed agent runtime. Verify support for the selected coordination pattern.</small></div>
<div><a href="https://learn.microsoft.com/agent-framework/workflows/orchestrations/"><img src="assets/icons/code.svg" alt="" width="32" height="32" />Microsoft Agent Framework</a><small>Code-defined orchestration. Choose hosting separately, including Foundry when appropriate.</small></div>
</div>

<!-- diagram: family-specialists -->

## Capabilities you can combine

These families can overlap. A document workflow may feed a knowledge assistant;
an investigation may finish with an approval-controlled operation.

Persistent memory and personalization are additional choices. Define what the
system may remember and who owns that context. Set rules for expiry and deletion.
Multiple knowledge sources need their own permission and provenance boundaries.

Select these capabilities because the journey needs them. Neither multiple
agents nor persistent memory is an entry requirement.

## Where this workflow stops

The creator records the architecture and requirements, with an implementation
plan for a separate delivery session. You confirm discovery before it prepares
the complete package, then approve that package before handoff.

Standalone SDK questions, incident troubleshooting, and live agent operations
belong to specialist workflows. Architecture approval grants no permission to
implement or deploy.

## Describe your first journey

Tell the creator who will use the application and what their first task is.
You can leave the platform open or state a constraint:

```text
Design a maintenance assistant for property managers. Help them investigate
resident requests and prepare a work order for approval. Reuse our existing
identity and service system. Compare an agent with a simpler workflow before
recommending the architecture.
```

[Set up your application workspace](start.html), then bring your own idea.
If you are extending a system, read [Add AI to an existing application](existing-applications.html).
