# Copilot Studio agent

## Use when / avoid when

Use when low-code orchestration, governed connectors, and a supported channel fit
the confirmed journey and delivery ownership. Compare a
[Foundry prompt agent](foundry-prompt-agent.md) for declarative model/tool execution
or [hosted code](foundry-hosted-agent.md) for custom runtime behavior. Preserve an
existing application when its requirements justify that boundary.

Select a direct topology (the channel calls governed tools without a further hop)
before a delegated topology (a connected agent or A2A hop); add a delegation hop
only for a confirmed responsibility split, not as a default composition.

## Evidence classification

Official **capability guidance; platform recipe**, not a reference architecture
or production certification of every connector/channel combination.

## Responsibilities and components

Core: agent configuration, a selected channel/client or trigger, governed
knowledge/tools, connection identities, and lifecycle ownership. Add a custom
client or adapter for a confirmed requirement or documented gap.
Business services and workflows own
exact calculations, authorization, durable business state, and approvals.
Platform-managed inference does not imply an extra Foundry deployment.

Plan configuration versioning, connection/environment settings, promotion,
publication, evaluation, monitoring, and rollback using verified platform
mechanisms. Use Power Platform solutions for transportable artifacts, with
environment variables and connection references for environment-specific settings.
Authentication, channel security/publication, sharing and telemetry settings can
require post-deployment steps outside solution promotion; verify them explicitly.
Mark application libraries or workload IaC non-applicable when no custom code or
infrastructure is required.

## Flows

**Direct:** caller/channel or trigger -> Copilot Studio orchestration -> authorized
knowledge/tool -> result.

**Delegated:** caller/channel or trigger -> Copilot Studio orchestration ->
connected agent (Foundry or A2A) -> its own authorized knowledge/tool -> result
returned through the orchestrator. A connected reasoning agent is an optional
delegation boundary, not a required second orchestrator; add one only when a
confirmed responsibility needs a separate owner.

## Trust boundaries and ownership

Separate end-user identity from connector identity and permissions. Verify the
selected channel's support for the intended workforce or external customers;
authentication alone does not authorize a business operation. Define tenant/user
isolation, retention, audit, and the owner enforcing approval before execution.
Carry or deliberately translate identity at every hop: channel to orchestrator,
orchestrator to knowledge/tool, and orchestrator to a delegated connected agent
each have their own identity and consent; a verified hop does not authorize the
next one.

## Support gates

- **Constraint:** channels differ in client, authentication, and message support;
  native channels may supply a client while web/custom channels need one.
- **Maturity:** the named Microsoft Foundry connected-agent route was preview
  when checked. It requires an enabled Activity endpoint and an agent created
  in the new Foundry portal; reverify these prerequisites before selection.
- **Unverified:** an A2A connection is a separate delegation route. Verify its
  exact endpoint, authentication, feature support, and maturity; no preview banner
  is not proof of GA for the complete composition.
- **Constraint:** HTTP/custom connectors call APIs, MCP exposes tools/resources,
  and Activity/A2A connect agents; these are not interchangeable contracts.
- **Constraint:** Power Platform solution ALM promotes configuration, connection
  references, and environment variables across environments; authentication,
  channel publication, sharing, and some data-policy settings are manual/admin
  gates outside solution import. Record each as an owned promotion step, not an
  automated one.
- **Unverified:** a connected knowledge/data source may route to Foundry IQ,
  Fabric IQ, or Work IQ; verify the exact connector and its own maturity and
  licensing rather than treating the three IQ layers as interchangeable
  knowledge backends. Apply the IQ tools variant below; compare the
  [unified IQ composition](../patterns/11-unified-iq-agent.md) pattern when the
  journey needs more than one of these planes from the same agent.
- **Unverified:** verify licensing, capacity, data policies, private connectivity,
  regional support, and environment delivery mechanisms for the selected setup.

## IQ tools variant

For Copilot Studio's Fabric IQ, Foundry IQ, or Work IQ tool surfaces, verify the
GitHub Copilot harness prerequisite. This gate belongs to these surfaces, not
to IQ composition on other runtimes.

Fabric IQ's integration article is prerelease; Work IQ is preview and uses
Copilot Credits rather than the legacy workload-specific tools' standard-harness
billing. The direct Foundry IQ tool supports one connection per agent; verify its
authentication mode and connector maturity separately from the knowledge base.
The connected Foundry agent route remains a separate preview delegation path.
Apply the solution-promotion and manual/admin gates above to every connection.

## Tradeoffs

Less custom runtime work trades against platform, connector, UX, and governance
constraints. Compare Copilot Studio alone and Foundry alone before combining
them; a second agent needs a distinct responsibility and justified handoff.
Keep unsupported production paths as explicit gates, not guaranteed adapters.

## Diagram mapping

Context: audience, channel, business systems and reviewers. Components: managed
orchestration, tools and actual owners. AI and data flow: permission checks,
optional agent delegation and approval boundaries. Deployment: platform
environments, publication, connections, identities, operations, and only the
custom resources actually required.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Low-code is a primary build option | [CAF technology plan](https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/technology-solutions-plan-strategy) | 2026-10-01 | Compare platform fit before selecting custom code |
| Channel support does not imply a built-in client everywhere | [Channels and clients](https://learn.microsoft.com/microsoft-copilot-studio/guidance/channels) | 2026-10-01 | Identify the exact client and access boundary |
| Named Foundry connection is preview with Activity prerequisites | [Connect a Foundry agent](https://learn.microsoft.com/microsoft-copilot-studio/add-agent-foundry-agent) | 2026-10-01 | Gate production use and verify endpoint/portal compatibility |
| A2A delegates tasks; APIs and MCP are different integration paths | [Connect an A2A agent](https://learn.microsoft.com/microsoft-copilot-studio/add-agent-agent-to-agent) | 2026-10-01 | Select and validate the actual protocol rather than a generic wrapper |
| Solutions and environment settings support promotion; some settings need post-deployment steps | [Copilot Studio ALM](https://learn.microsoft.com/microsoft-copilot-studio/guidance/alm) | 2026-10-01 | Plan configuration delivery and verify authentication/channels after promotion |
| Connection references and environment variables are the promoted artifacts; some deployment settings are populated or fixed up outside import | [Connection references and environment variables for automated deployments](https://learn.microsoft.com/power-platform/alm/conn-ref-env-variables-build-tools) | 2026-10-01 | Track each manual/admin fix-up as an owned promotion step per environment |
| Fabric IQ is a prerelease, GitHub-Copilot-harness tool that queries a Fabric workspace/semantic model the agent's caller can access | [Connect to Fabric IQ from an agent](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/fabric-iq-connect) | 2026-10-01 | Gate on harness and prerelease status before selecting Fabric IQ as a tool |
| The direct Foundry IQ tool requires the GitHub Copilot harness and supports one connection per agent | [Connect to Foundry IQ from an agent](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/foundry-iq-connect) | 2026-10-06 | Verify direct-tool authentication and maturity independently of the connected Foundry agent route |
| Work IQ (preview) is the unified Microsoft 365 context/action surface on the GitHub Copilot harness, distinct from legacy workload-specific tools on the standard harness | [Work IQ in Copilot Studio](https://learn.microsoft.com/microsoft-copilot-studio/agents-experience/add-work-iq) | 2026-10-01 | Select Work IQ (Preview), not legacy Mail/Teams/SharePoint tools, for the unified surface |
