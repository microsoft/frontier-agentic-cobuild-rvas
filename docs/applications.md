## What the creator can design

**Bring an outcome, whether it needs a new application or a change to an existing
one.** AI Agent Creator helps you define the user journey and agree a
Microsoft-cloud architecture before implementation starts.

The workflow covers platform-managed agents and custom applications. It can
also conclude that a bounded model call or an explicit workflow fits better
than an agent. [Does this need an agent?](agent-or-workflow.html) explains that
choice.

Here, **supported means covered by the design workflow**. It does not mean a
ready-made implementation, a certified architecture, or guaranteed compatibility
between every service. Discovery verifies the connections your design needs.
The examples below are illustrative, not customer results or deployment templates.

## Application families

### Knowledge assistants

Help a user find and interpret authorized information. An illustrative operations
assistant could explain a procedure and cite the current source, then investigate
a follow-up question using other permitted evidence.

The design must establish source ownership and freshness. It must also explain
how user permissions constrain retrieval and what happens when evidence is absent
or contradictory. A fixed lookup may need retrieval without an agent loop.

### Agents that use business tools

Investigate a task and prepare or perform bounded operations. A maintenance
assistant could gather request details and propose a work order for a manager
to approve.

Tool access is a separate decision from knowledge access. Specify which actions
are read-only, which require approval, and how the system handles retries without
duplicating a business operation. Authorization belongs at the operation boundary.

### Document and media processing

Turn incoming material into structured results. For example, classify a document
bundle, extract fields, and send uncertain results to a reviewer.

Agree the output schema and the review threshold. Define how a reviewer corrects
an error and how a corrected result reaches the downstream system. This may be
a fixed processing pipeline; a conversational interface is optional.

### Voice and audiovisual experiences

Use speech or an audiovisual presentation when it serves the user's task. An
illustrative voice assistant could guide a worker through a permitted procedure,
with confirmation before a consequential action.

Decide how users interrupt, correct, or leave the interaction. Identify privacy
and accessibility requirements, and verify the selected channel's capabilities.
An avatar or generated video alone does not establish a need for an agent.

### Background workflows

Respond to an event or process a job without a new chat interface. An incoming
service request could trigger evidence gathering and then wait for an owner to
approve the proposed next step.

Identify who owns job state and how work resumes after a failure or a long wait.
Fixed branches can stay explicit; runtime investigation should have a defined
scope and stopping condition.

### Coordinated specialist agents

Split responsibilities when one agent cannot meet the requirement reliably.
For example, an investigator and a separately authorized action agent could have
different tools and access boundaries.

The design must justify the split and define handoff contracts. It must account
for conflicting results, shared state, and partial failure. Coordination adds
overhead; Microsoft's [orchestration guidance](https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns)
recommends the lowest complexity that meets the requirement.

## Capabilities you can combine

These families can overlap. A document workflow may feed a knowledge assistant;
an investigation may finish with an approval-controlled operation.

Persistent memory and personalization are additional choices. Define what may be
remembered, whose context it is, and how it expires or is deleted. Multiple
knowledge sources need their own permission and provenance boundaries.

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

Give the creator a task, its user, and a bounded starting point. You can leave the
platform open or state a genuine constraint:

```text
Design a maintenance assistant for property managers. Help them investigate
resident requests and prepare a work order for approval. Reuse our existing
identity and service system. Compare an agent with a simpler workflow before
recommending the architecture.
```

[Set up your application workspace](start.html), then bring your own idea.
If you are extending a system, read [Add AI to an existing application](existing-applications.html).
