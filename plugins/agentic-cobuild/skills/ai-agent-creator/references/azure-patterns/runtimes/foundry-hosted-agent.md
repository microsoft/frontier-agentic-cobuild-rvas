# Foundry hosted agent

## Use when / avoid when

Use for custom agent code with Foundry-managed execution. Choose a
[prompt agent](foundry-prompt-agent.md) if configuration suffices, or
[application hosting](application-hosted-agent-framework.md) for a confirmed need
for application-owned ingress, authentication, transactional state, connectivity
or runtime operations. Agent Framework code does not by itself require
application hosting.

## Evidence classification

Official **capability guidance; runtime recipe**. Framework-agnostic hosting is
distinct from framework-specific integration packages.

## Responsibilities and components

Core: agent code/image, registry/build path, Foundry project/hosted agent, selected
protocol/model and identities. Agent Framework, Copilot SDK, other frameworks, or
custom code are authoring choices. Foundry owns the managed endpoint, per-session
execution, scaling, agent identity, supported session persistence, observability
and version lifecycle. Define conversation, session files, framework checkpoints
and authoritative business records separately.
For custom multi-agent code, select the interaction shape in
[agent coordination](../patterns/13-agent-coordination.md) before mapping it to
framework features.

## Flows

Build/versioned image -> managed execution; client -> verified endpoint/protocol ->
agent code -> model/tools -> response. Use Responses for managed conversation
threading, streaming and background work; use Invocations when the caller needs a
custom payload or protocol. Teams and Microsoft 365 publication can bridge
Responses to Activity. State and resume behavior still depend on the selected
protocol.

## Trust boundaries and ownership

Platform session isolation and managed identity do not replace caller/tool
authorization. Assign workload owners for state semantics, approval binding,
package security and network requirements. Show managed tools separately from
direct egress. For interactive user-invoked requests, verify OBO and delegated
permissions end to end. For autonomous or background requests without a user
token, authorize the dedicated agent identity. Treat token forwarding into custom
code as a trust-boundary decision, not as an automatic consequence of hosting.

## Support gates

- **Maturity:** managed hosting GA does not make every hosting package, long-running
  feature or state-store API GA.
- **Constraint:** check supported language, protocol, image, region and quota.
- **Channel and identity:** verify the exact Teams or Microsoft 365 publication
  route, Activity bridge, user-token availability, OBO path and downstream
  authorization. Do not inherit a prompt-agent limitation without checking the
  Hosted Agent route.
- **State:** Responses can manage conversation history and sessions; Invocations
  leaves more session semantics to the workload. Platform sessions are deleted
  after 30 days of inactivity, so retain durable business and audit records in a
  workload-owned store with the required lifecycle.
- **Background work:** verify whether Responses background mode or resilient
  tasks meet interruption, polling, cancellation and recovery requirements.
- **Tools:** verify Foundry Toolbox authentication and use the framework-specific
  integration when Agent Framework code consumes a toolbox.
- **Recommendation:** size delegated networking for expected project/session load;
  technical minimum and production headroom are different decisions.
- **Unverified:** framework checkpoints require a verified persistence path, not
  just the presence of platform conversation history.

## Tradeoffs

Managed execution reduces endpoint, identity, scaling, session and observability
work but introduces protocol/package/platform constraints and per-session
consumption. Compare application-owned state and compute when integration control
matters. The same Agent Framework logic can remain application-hosted or be
packaged for Foundry hosting; record hosting as an operational decision rather
than an authoring-framework decision.

## Diagram mapping

Context: consumer and operators. Components: code/framework versus hosting service.
AI and data flow: models/tools, approval and state. Deployment: build/registry,
managed endpoint, sandbox/session, network, identities and operations.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Hosted code supports multiple authoring choices and Foundry-managed runtime responsibilities | [Hosted-agent concepts](https://learn.microsoft.com/azure/foundry/agents/concepts/hosted-agents) | 2026-10-02 | Select framework independently of hosting |
| Agent Framework code can expose Responses or Invocations while Foundry manages runtime, sessions, scale, identity and endpoints | [Host Agent Framework agents](https://learn.microsoft.com/azure/foundry/how-to/develop/framework-hosted-agents) | 2026-10-02 | Compare hosted and application execution for the same custom code |
| Responses supports background work and Activity bridging for Teams and Microsoft 365 | [Hosted-agent concepts](https://learn.microsoft.com/azure/foundry/agents/concepts/hosted-agents) | 2026-10-02 | Verify the exact protocol and channel route before adding a custom host |
| Interactive hosted-agent access can use application-managed OBO or Toolbox authentication | [Hosted-agent OBO](https://learn.microsoft.com/azure/foundry/agents/how-to/use-on-behalf-of-flow) | 2026-10-02 | Design user delegation and token trust boundaries explicitly |
| Session persistence and retention depend on protocol and lifecycle | [Hosted-agent concepts](https://learn.microsoft.com/azure/foundry/agents/concepts/hosted-agents) | 2026-10-02 | Keep authoritative long-lived business records outside platform sessions |

For Copilot SDK, use the [runtime recipe](copilot-sdk-runtime.md) and its narrowly
scoped sample evidence, not an assumption of every language/protocol combination.
