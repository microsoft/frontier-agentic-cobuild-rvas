# Foundry prompt agent

## Use when / avoid when

Use when declarative instructions, model and tools express the agent's behavior.
Use [hosted code](foundry-hosted-agent.md) for custom runtime behavior, or
a governed service or explicit workflow when an agent is unnecessary. Compare
[Copilot Studio](copilot-studio-agent.md) when low-code orchestration and its
channels fit the journey.

## Evidence classification

Official **capability guidance; runtime recipe**. A managed agent definition is
not a framework selected by default.

## Responsibilities and components

Core: Foundry resource/project, prompt-agent definition, model and configured tools.
The caller can be an existing application, a verified platform channel, or another
agent. Assign user access, business authorization and approved configuration to
their actual owners; a new application API or UI is not inherent in this recipe.
Select knowledge separately; a framework client is optional.

## Flows

Authorized caller/channel -> managed agent -> model/approved tools -> response.
Keep authoring/admin actions separate from runtime calls.
For Copilot Studio delegation, use its [recipe](copilot-studio-agent.md) to verify
the chosen connection protocol and maturity rather than assuming generic wrapping.

## Trust boundaries and ownership

Specify service/tool identities, caller access, project/resource isolation, and
state retention. The platform's ability to call a tool does not grant the
requesting user permission to perform its business operation.

## Support gates

- **Maturity:** verify core versus voice/workflow/approval subfeatures and APIs.
- **Constraint:** private resources require the selected setup's documented
  connectivity, DNS, permissions and toolbox support.
- **Unverified:** IQ MCP connector maturity differs from its backend; consult the
  [knowledge card](../patterns/05-agentic-retrieval.md).

## Tradeoffs

Less runtime code/operations trades against custom orchestration control.
Compare a fixed RAG pipeline or direct model call for simple journeys.

## Diagram mapping

Context: user, caller/channel and admins. Components: managed agent/model/tools
and any justified caller components.
AI and data flow: managed loop and tool authorization. Deployment: resource/project,
actual endpoint/private access, identities, state and telemetry.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Declarative agent behavior is platform-operated | [Foundry agent types](https://learn.microsoft.com/azure/foundry/agents/overview) | 2026-10-01 | Separate caller and business responsibilities from managed orchestration |
