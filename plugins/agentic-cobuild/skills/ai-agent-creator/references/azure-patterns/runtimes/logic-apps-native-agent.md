# Logic Apps native agent

## Use when / avoid when

Use when an integration-heavy, connector-centric journey needs a declarative
agent loop that plans or selects tools inside a governed Logic Apps workflow.
Select from the actual planning boundary and current support evidence.

### Role selection

| Logic Apps role | Runtime and pattern selection |
| --- | --- |
| Native Agent action plans and selects tools | Use this native-agent recipe |
| Workflow executes an operation chosen by an external agent | Keep that agent host's recipe and apply [tools and approvals](../patterns/04-agent-tools-approvals.md); verify the integration gates below |
| Workflow triggers or orchestrates work in an external agent | Keep the external host's recipe and represent Logic Apps as invoking orchestration |
| Fixed workflow includes bounded model calls without planning or tool selection | Select ordinary workflow actions and model calls; no agent runtime is required |

For waits, retries, and long-running work, assess the workflow's own durability
before introducing another runtime. Select the
[durable workflow variant](durable-workflow-variant.md) only when its separate
execution model fits a confirmed requirement. Apply the
[agent-intent test](../../discovery-quality.md#agent-intent-test) to planning
and tool selection, not to product name or duration.

## Evidence classification

Official **capability guidance; runtime recipe**. Autonomous and conversational
agentic workflows provide native Logic Apps agent hosting. The integration roles
above are separate architecture choices, not additional native-agent runtimes.

## Responsibilities and components

Core: the agentic workflow and trigger, the Agent action's instructions and model
connection, connector-backed tools scoped to authorized operations, and
workflow/connector identities. Assign business validation, system-of-record
writes, and consequential-action approvals through
[tools and approvals](../patterns/04-agent-tools-approvals.md); native hosting
does not itself supply a separate approval mechanism.

## Flows

Supported event trigger (autonomous) or chat-session trigger (conversational) ->
Agent action plans -> proposed connector-backed tool call ->
authorization/approval when required -> execution -> observed result ->
next planning step or completion.

Record the storage and retention requirements for conversation context, business
state, and approvals separately; conversation history is not an approval record.

## Trust boundaries and ownership

Identify caller authorization, model-connection identity, outbound connector
credentials, tool authorization, and approval ownership as separate boundaries.
The workload owns tool scope, instructions, and policy for consequential actions.
Treat tool inputs and outputs as untrusted; validate and authorize side effects
under the intended identity rather than relying on trigger authentication alone.

## Support gates

Check current official documentation for the selected plan, hosting option,
workflow type, model source, and tool surface. Record the evidence date and each
unresolved gate in the architecture package.

### Native hosting

- **Maturity:** the checked documentation explicitly marks Consumption agentic
  workflows preview. It did not affirmatively establish GA for the Standard
  Azure OpenAI path; verify that exact path rather than deriving maturity from
  a missing preview label. Other model sources have independent status gates.
- **Workflow type:** Standard agentic workflows require stateful execution.
- **Tool shape:** native agent tools contain actions rather than triggers;
  tool-level control-flow actions are unsupported in the checked guides.
  Agent actions can be sequenced, but cannot be nested inline as another
  agent's tool. Scope these restrictions to the Logic Apps native loop.

### External-host integration

- **Foundry connector registration:** the checked preview flow uses Standard,
  one connector per registration, and managed connectors without OAuth 2.0.
  Verify the chosen connector and registration path.
- **Workflow MCP exposure:** the checked Standard server capability is preview
  and requires Request-trigger/Response-action workflows. Its inbound endpoint
  supports OAuth/Easy Auth or API-key authentication; this is distinct from
  the outbound connector restriction in the Foundry registration flow.
- **Long-running calls:** Logic Apps supports asynchronous HTTP response
  patterns. Verify agent/client timeout and polling behavior separately;
  use explicit start/status operations when the client cannot wait or poll.
  Assign retry, idempotency, and approval-resume responsibilities.
- **Legacy integration:** the classic Foundry agent-action path is not the
  default for new builds. Check its migration and retirement guidance rather
  than treating classic examples as current-host support.

## Tradeoffs

Native hosting places planning and connector-backed tools in a declarative
workflow surface, trading application-owned runtime flexibility for platform
tool-shape, identity, and support constraints. An external agent calling a
governed workflow can preserve an existing host or accommodate requirements
outside the native loop. A fixed workflow can retain bounded AI steps without
incurring an agent runtime.

## Diagram mapping

Context: caller/trigger and reviewer. Components: actual agent host, workflow
executor, tools, model connection, and business stores. AI and data flow:
planning, proposed actions, authorization/approval, execution, and results.
Deployment: plan/hosting option, workflow type, connector identities, model
service, and approval ownership. Keep external-host calls outside the native
workflow planning boundary.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Native agent hosting and role distinction | [Agentic workflow concepts](https://learn.microsoft.com/en-us/azure/logic-apps/agent-workflows-concepts) | 2026-10-09 | Locate planning and select autonomous or conversational entry |
| Native workflow, model-source, and tool restrictions | [Autonomous workflows](https://learn.microsoft.com/en-us/azure/logic-apps/create-autonomous-agent-workflows); [Conversational workflows](https://learn.microsoft.com/en-us/azure/logic-apps/create-conversational-agent-workflows) | 2026-10-09 | Verify the exact combination and maturity |
| Foundry connector-tool registration | [Connector-backed agent tools](https://learn.microsoft.com/en-us/azure/logic-apps/add-agent-tools-connector-actions) | 2026-10-09 | Check connector/auth restrictions independently |
| Standard workflow MCP server | [Create an MCP server](https://learn.microsoft.com/en-us/azure/logic-apps/create-model-context-protocol-server-standard) | 2026-10-09 | Verify exposure, endpoint auth, and client compatibility |
| HTTP response timing and asynchronous behavior | [HTTP limits](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-limits-and-config#http-limits) | 2026-10-09 | Establish client and workflow completion contracts separately |
| Classic Foundry integration lifecycle | [Agent-triggered workflows](https://learn.microsoft.com/en-us/azure/logic-apps/add-agent-action-create-run-workflow) | 2026-10-09 | Use current-host guidance for new builds |
