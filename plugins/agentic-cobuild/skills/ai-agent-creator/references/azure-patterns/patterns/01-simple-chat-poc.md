# Simple chat POC

## Use when / avoid when

Use for learning the chat/agent path or a disposable experiment. For production,
private-only access, or enterprise controls, start with
[secure grounded chat](02-secure-grounded-chat.md) instead.

## Evidence classification

Official reference architecture; **POC baseline**, explicitly not production.
The linked implementation is a sample, not production assurance.

## Responsibilities and components

Core: an interaction channel/client, managed agent or justified direct model
call, and an inference path. The official reference's custom-application topology
uses an application API, App Service and Foundry; those are reference choices,
not requirements for every POC. Use the [selection matrix](../runtimes/README.md)
to compare a platform-provided or existing experience before adding custom code.
Grounding is optional if the journey needs documents; queues and tool execution
are not required merely to demonstrate chat.

## Flows

User -> selected channel/caller -> agent/model -> answer. If grounding is needed, add its
ingestion and authorized retrieval paths explicitly.

## Trust boundaries and ownership

Assign user authentication, authorization, and session access to the selected
platform/caller and business owners.
Use service credentials server-side. Make public endpoints and omitted controls
visible rather than implying a private production perimeter.

## Support gates

- **Constraint:** the source is POC-only; moving to production requires explicit
  security, reliability, state, and operational design.
- **Maturity:** verify the selected agent/model/API independently.
- **Recommendation:** budget and retention-limit even a short-lived experiment.

## Tradeoffs

Low setup complexity helps learning but does not supply production resilience or
network isolation. Compare a direct model call before adding managed agent state.

## Diagram mapping

Context: learner and channel. Components: caller and AI responsibility. AI and data flow:
request/answer plus optional retrieval. Deployment: public access, identity,
region, and deliberately deferred production controls.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Basic chat omits production controls | [Basic Foundry chat](https://learn.microsoft.com/azure/architecture/ai-ml/architecture/basic-microsoft-foundry-chat) | 2026-10-01 | Preserve POC scope and document the production transition |

The source links its sample implementation. Inspect and pin any sample revision
before reuse rather than assuming current code exactly matches the article.
