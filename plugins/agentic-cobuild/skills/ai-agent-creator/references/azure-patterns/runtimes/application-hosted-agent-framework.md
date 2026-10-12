# Application-hosted Microsoft Agent Framework

## Use when / avoid when

Use when custom orchestration should run with the application's infrastructure
and policies. For managed execution read [Foundry hosting](foundry-hosted-agent.md).
For a fixed function or model call, compare ordinary application code first.

## Evidence classification

Official **capability guidance; framework/runtime recipe**. Microsoft Agent
Framework is an SDK, not an Azure resource or an HTTP server.

## Responsibilities and components

Core: application web/worker host, framework agent/workflow, model/provider,
authorized tools, session/history/checkpoint stores as needed and telemetry.
App Service, Container Apps or another approved host is a separate choice.
For multiple agents, select the platform-neutral interaction shape in
[agent coordination](../patterns/13-agent-coordination.md) before choosing a
framework orchestration.

## Flows

Caller -> authenticated application route -> selected agent/workflow -> model/tools ->
response/stream -> persist state. Separate workflow checkpoint state from
conversation history and approved business records.

## Trust boundaries and ownership

Application owns routes, auth, isolation keys, state access, deployment/scaling and
monitoring. Treat a continuation ID as untrusted: authenticate/authorize it and
partition storage by the intended user/tenant boundary.

## Support gates

- **Constraint:** the framework supplies no general-purpose durable session store;
  configure an appropriate backing implementation for production.
- **Maturity:** hosting/protocol/integration packages can be prerelease; verify
  selected language and package, not just the framework's overall lifecycle.
- **Recommendation:** compare explicit workflow steps with autonomous planning.
- **Unverified:** check provider auth, private access and integration support.

## Tradeoffs

Application hosting maximizes integration control but owns all operational duties.
Use [durable execution](durable-workflow-variant.md) only when recovery/waits need it.
Wrap Copilot SDK with the framework only when workflow interchangeability adds value.

## Diagram mapping

Context: callers/reviewers. Components: framework as application code, not a service.
AI and data flow: workflow, tools, state and approval. Deployment: selected host,
backing stores, policies, identity, telemetry and scaling ownership.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Hosting is an independent operational decision | [Framework hosting](https://learn.microsoft.com/agent-framework/hosting/) | 2026-10-01 | Choose operator and protocol separately |
| Durable state and caller isolation are application-owned | [Framework self-hosting](https://learn.microsoft.com/agent-framework/hosting/self-hosting/) | 2026-10-01 | Name stores, retention, authorization and recovery |
