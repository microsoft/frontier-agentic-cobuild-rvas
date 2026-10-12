# GitHub Copilot SDK runtime

## Use when / avoid when

Use when the embedded agent engine and permitted tools benefit the journey.
For simple inference or fixed RAG, prefer a direct SDK/pipeline. Add an Agent
Framework wrapper only when its orchestration abstractions justify another layer.

## Evidence classification

Official **capability guidance plus sample; runtime recipe**. Base SDK lifecycle,
framework-wrapper maturity, and hosted sample coverage are separate facts.

## Responsibilities and components

Core: application -> Copilot SDK -> JSON-RPC -> Copilot CLI runtime -> chosen
provider/tools. Choose spawned versus separate runtime, app-owned versus
[Foundry hosting](foundry-hosted-agent.md), and GitHub-backed versus Azure/Foundry
BYOK explicitly. Own pinned binaries/images, state, isolation and telemetry.

## Flows

Authorized request -> session-scoped runtime -> model/planning -> permitted tools ->
stream/result. Azure BYOK can use the documented managed-identity token callback.
The avatar/browser media path remains a separate workload component.

## Trust boundaries and ownership

Use the documented `mode: "empty"` baseline for shared servers and explicit
session tools/credentials. Authenticate the runtime's access path; partition state.
Business tool authorization and consequential-action approval belong to governed
services or workflows. A sandbox or sample `approve_all` handler is not that policy.

## Runtime topology and lifecycle

Choose the CLI topology explicitly:

- **Isolated runtime:** dedicate a CLI process/container and credentials to a
  user or trust boundary when strong filesystem, process, or credential isolation
  is required.
- **Shared runtime, isolated sessions:** permit only trusted isolation domains;
  use `mode: "empty"` and supply per-session tools, credentials, storage,
  identity, and authorization. Session IDs alone are not a tenant boundary.
- **Shared collaborative session:** serialize writes, define membership and
  ownership, and audit every participant because the SDK does not supply a
  business authorization or locking model.

Define runtime pool size, admission control, bounded concurrency, queue limits,
backpressure, idle expiry, cancellation, and failure recovery. State whether a
session survives process or node loss: use supported shared state when any
runtime must resume it, or use sticky placement with an explicit node-loss
outcome. Drain active work before upgrades; pin and test the SDK plus CLI
binary/image together, with rollback and session compatibility criteria.

Emit application, session, model, tool, approval, and runtime lifecycle telemetry
under stable correlation IDs. Record who owns GitHub entitlement or BYOK
credentials, consumption, quotas, and cost. Verify cloud or remote-session
behavior separately from local CLI sessions rather than assuming parity.

## Support gates

- **Maturity:** the SDK has a GA release; the .NET Agent Framework wrapper is
  documented with prerelease installation. Verify other wrapper packages separately.
- **Operational:** test overload, process restart, node loss, session resume,
  shared-session serialization, upgrade, and rollback.
- **Constraint:** runtime/provider auth and endpoint/protocol support are specific
  configurations; Azure model Private Link does not isolate unrelated runtime egress.
- **Sample scope:** the pinned hosted example is Python + invocations. It uses
  automatic tool approval and a simple token path; replace those shortcuts with
  scoped policy, verified refresh, and lifecycle handling before production reuse.
- **Unverified:** a native IQ connector or other hosted language/protocol is not
  established by this sample.

## Tradeoffs

The agent engine reduces custom loop work but adds a CLI process and image supply
chain. Direct SDK use is simpler than wrapping it when workflows add no value.

## Diagram mapping

Context: users/operators. Components: SDK and actual runtime/provider boundary.
AI and data flow: controlled tools, session state and approval. Deployment: host,
CLI binary, ingress/egress, identities, stores and media as a separate connection.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Shared runtime requires restricted session setup | [Multi-tenancy](https://docs.github.com/en/copilot/how-tos/copilot-sdk/setup/multi-tenancy) | 2026-10-01 | Start with empty mode and authorized tools |
| Azure identity supports BYOK token-provider composition | [Managed identity](https://docs.github.com/en/copilot/how-tos/copilot-sdk/setup/azure-managed-identity) | 2026-10-01 | Verify audience, RBAC and refresh for the selected provider |
| Framework wrapper lifecycle differs | [Agent Framework integration](https://docs.github.com/en/copilot/how-tos/copilot-sdk/integrations/microsoft-agent-framework) | 2026-10-01 | Do not infer wrapper GA from SDK GA |
| Base SDK reached GA | [SDK GA announcement](https://github.blog/changelog/2026-06-02-copilot-sdk-is-now-generally-available/) | 2026-10-01 | Recheck pinned language/package versions |
| Production deployments choose among isolated CLI, shared CLI with isolated sessions, and collaborative sessions | [Scaling and multi-tenancy](https://docs.github.com/en/copilot/how-tos/copilot-sdk/setup/scaling) | 2026-10-07 | Make isolation, locking, state placement, and horizontal scaling explicit |

Inspected sample: [Foundry Python invocations example at
7fa192447da62af6792f501ff3b571ba39f6b807](https://github.com/microsoft-foundry/foundry-samples/tree/7fa192447da62af6792f501ff3b571ba39f6b807/samples/python/hosted-agents/bring-your-own/invocations/github-copilot).
Its `main.py` auto-approves tool permissions; it is a getting-started example,
not a hardened shared-process design.
