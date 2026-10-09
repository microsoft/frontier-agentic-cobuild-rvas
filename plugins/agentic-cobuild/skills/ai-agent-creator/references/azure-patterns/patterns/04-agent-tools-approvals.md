# Agent tools and approvals

## Use when / avoid when

Use when planning or selecting tools benefits the journey. For fixed taxonomy
classification or a deterministic pipeline, prefer ordinary code and a bounded
model call. For document answers alone, compare [grounded chat](02-secure-grounded-chat.md).

## Evidence classification

**Locally composed recipe** from agent-service, framework, and approval guidance.
This combination is not a named production reference architecture.

## Responsibilities and components

Core: agent/orchestrator, model, scoped tool interfaces, business operations, authorization,
audit, and an approval path for consequential actions. Choose a
[runtime](../runtimes/README.md); knowledge is optional. Keep business validation
and system-of-record writes in deterministic services or governed workflows.
Reuse approved business systems and approval mechanisms; custom APIs or adapters
need a confirmed requirement or documented integration gap, not merely the
existence of a tool call. For Logic Apps as a scoped workflow tool executor,
read the [role selection and integration gates](../runtimes/logic-apps-native-agent.md#role-selection)
while retaining the actual agent host's runtime recipe.

## Flows

Request -> planning -> proposed tool call -> authorization/validation -> approval
when required -> execution -> observed result. Preserve idempotency, timeouts,
refusal, retry limits, and failed/expired approval outcomes.

## Trust boundaries and ownership

Authorize each tool operation under the intended user/service scope. Bind approval
to the caller, pending action, arguments, and session; audit execution separately.
Retrieved instructions and tool responses are untrusted inputs.

## Support gates

- **Constraint:** a tool allowlist or sandbox does not authorize business actions.
- **Maturity:** framework tool approval, managed MCP approval, and resumable
  long-running hosted-agent approval are different mechanisms.
- **Unverified:** verify the chosen tool/protocol/private-network combination.
- **Recommendation:** limit steps, spend, writable resources, and egress.

## Tradeoffs

Autonomy adds nondeterminism, cost, and recovery complexity. Compare a fixed
workflow with a single agent before introducing multi-agent coordination. When
multiple roles are justified, select and compose their interaction using
[agent coordination](13-agent-coordination.md).

## Diagram mapping

Context: requester, reviewer, business systems. Components: agent and constrained
tool adapters. AI and data flow: approval before execution. Deployment: tool
identities, endpoint access, state, audit and operator ownership.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Declarative and code-based agent options | [Foundry agent types](https://learn.microsoft.com/azure/foundry/agents/overview) | 2026-10-01 | Choose code ownership before tool implementation |
| Approval belongs to an authenticated pending action | [Agent Framework tool approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval) | 2026-10-01 | Preserve approval/session binding and explicit resume behavior |
