## Separate behavior from platform

Define the system's responsibilities before choosing where it runs. The creator
compares architecture options during discovery. You confirm the target
architecture before it prepares the complete package.

An agent does not imply a new web application. Custom agent code does not settle
who should host it. A required interface does not necessarily require a new
backend.

## Start with what you already have

Evaluate existing applications and platform capabilities against the first
journey. Reuse them when they meet the functional and operating requirements.
An empty repository says nothing about the enterprise's existing services.

Microsoft's [technology planning guidance](https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/technology-solutions-plan-strategy)
starts by checking whether a ready-to-use agent meets the requirements before
comparing build options. Our discovery process applies the same reuse-first
principle. It also checks confirmed requirements for custom behavior.

## Execution options the creator compares

The creator must verify that the selected services work together before delivery.

| Path | When to evaluate it | What your team must still define |
| --- | --- | --- |
| Existing or prebuilt capability | It may already meet the user journey. | Fit, access boundaries, ownership, and any gaps. |
| Copilot Studio | A low-code agent or workflow could meet the integration and channel requirements. | Connections and permissions, business approvals, environment lifecycle, and evaluation. |
| Foundry prompt agent | Instructions, model configuration, and permitted tools could express the behavior. | User access, knowledge permissions, tool policy, and acceptance criteria. |
| Foundry hosted agent | Custom code is needed and managed execution could fit. | Code and protocol choices, business state, approval semantics, and operational requirements. |
| Application-owned execution | Existing application integration or runtime control is a confirmed requirement. | Hosting, authorization, durable state, deployment, and telemetry. |
| Explicit workflow or bounded inference | Steps are known or one model response meets the task. | Output validation, failure handling, and integration with the existing process. |

[Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio/fundamentals-what-is-copilot-studio)
provides low-code agent and workflow authoring.
[Foundry Agent Service](https://learn.microsoft.com/azure/foundry/agents/overview)
offers configured prompt agents and managed hosting for custom agent code.
Use their current documentation to verify the exact feature and connection
being considered.

If custom code remains necessary, compare managed execution with application-owned
execution. The skill includes recipes for Agent Framework and the GitHub Copilot
SDK; choosing either framework does not determine where the code runs.

## Choose the channel independently

Identify where the user or caller already works. It may be an existing application,
a supported platform channel, or a background process. Build a custom client only
for a confirmed need.

Verify the chosen channel's audience and authentication model. Then decide
whether it provides the needed experience or requires a client you must own.
Choose the client separately from the agent runtime.

For example, a maintenance investigation might live inside the existing service
application. An event-driven document workflow might need no interactive client.
Both are illustrative choices to test against requirements.

## Keep knowledge and actions distinct

A knowledge source supplies evidence. A business tool performs an operation.
Even when both reach the same system, they need separately defined permissions
and responsibilities.

When several sources are needed, record what each contributes and how the system
enforces access. Select the model and inference boundary separately from the
knowledge layer and agent runtime. Reuse suitable existing deployments rather than assuming
the project needs a new one.

## Verify the proposed connections

Before you confirm an architecture, the creator checks product facts that affect
the design against current Microsoft Learn documentation and the relevant
specialist guidance. The package records unresolved checks and their owners.

Verify the selected channel, protocol, identity, networking, and lifecycle.
Account for licensing and region availability where they affect the design.
Distinguish preview capabilities from generally available ones.
Verify any adapter the integration needs.

An unresolved connection blocks its dependent delivery work. Architecture approval
does not turn an unverified integration into a supported one.

## Give discovery your constraints

Give the creator requirements and existing standards:

```text
Design this capability inside our existing service application. Reuse its
identity and business APIs. Compare Copilot Studio, managed Foundry execution,
and application-owned execution where they fit. For every new UI, API, or host,
name the requirement that makes it necessary.
```

[Set up the workspace](start.html) to begin discovery. If there is an application
already in place, use [the existing-application guide](existing-applications.html)
to prepare its context.
