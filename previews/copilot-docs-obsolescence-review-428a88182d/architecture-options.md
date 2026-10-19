## Separate behavior from platform

Define the system's responsibilities before choosing its platform, runtime, or
interface. Confirm the architecture before the creator prepares the package.

## Start with what you already have

Reuse existing applications and platform capabilities when they meet the first
journey's requirements.

Microsoft's [technology planning guidance](https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/technology-solutions-plan-strategy)
starts with ready-to-use options before custom build choices. The creator records
which confirmed requirements need custom behavior.

## Execution options the creator compares

The creator verifies that selected services work together before delivery.

| Path | When to evaluate it | What your team must still define |
| --- | --- | --- |
| Existing or prebuilt capability | It may already meet the user journey. | Fit, access boundaries, ownership, and any gaps. |
| Copilot Studio | A low-code agent or workflow could meet the integration and channel requirements. | Connections and permissions, business approvals, environment lifecycle, and evaluation. |
| Foundry prompt agent | Instructions, model configuration, and permitted tools could express the behavior. | User access, knowledge permissions, tool policy, and acceptance criteria. |
| Foundry hosted agent | Custom code is needed and managed execution could fit. | Code and protocol choices, business state, approval semantics, and operational requirements. |
| Application-owned execution | Existing application integration or runtime control is a confirmed requirement. | Hosting, authorization, durable state, deployment, and telemetry. |
| Explicit workflow or bounded inference | Steps are known or one model response meets the task. | Output validation, failure handling, and integration with the existing process. |

Use current [Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio/fundamentals-what-is-copilot-studio)
and [Foundry Agent Service](https://learn.microsoft.com/azure/foundry/agents/overview)
documentation to verify each feature and connection. A framework choice does
not determine where custom code runs.

## Choose the channel independently

Use the channel where the user or caller already works. Verify its audience,
authentication, and experience. Build a custom client only for a confirmed
requirement, and choose it separately from the agent runtime.

## Keep knowledge and actions distinct

Knowledge supplies evidence; tools perform operations. Define their permissions
separately. Record what each source contributes, and choose the model, knowledge
layer, and runtime independently.

## Verify the proposed connections

Check product facts against current Microsoft Learn and specialist guidance.
Verify channel, protocol, identity, networking, lifecycle, licensing, region
availability, release status, and required adapters.

Record unresolved checks and owners. Dependent delivery work waits until the
connection is verified.

## Give discovery your constraints

Give the creator the requirements and existing standards:

```text
/ai-agent-creator Design [capability] inside our existing service application. Reuse its
identity and business APIs. Compare Copilot Studio, managed Foundry execution,
and application-owned execution where they fit. For every new UI, API, or host,
name the requirement that makes it necessary.
```

[Set up the workspace](start.html) to begin discovery. If there is an application
already in place, use [the existing-application guide](existing-applications.html)
to prepare its context.
