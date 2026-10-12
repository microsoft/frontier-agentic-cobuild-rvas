# Voice Live conversational experience

## Use when / avoid when

Use for bidirectional low-latency speech interaction. Compare text-to-speech
[avatar](08-conversational-avatar.md) when presentation rather than conversational
audio is the need. Keep GA-only and private-only constraints explicit.

## Evidence classification

**Locally composed recipe** from Voice Live capability guidance.
Service, transport, model, avatar, and managed-agent integration maturity differ.

## Responsibilities and components

Core: audio client, authenticated session control, Voice Live, and
authorized backend tool execution when needed. Knowledge and avatar are optional.
Choose the [agent runtime](../runtimes/README.md) independently of audio transport.

## Flows

Audio/session events <-> Voice Live; governed policy -> session configuration;
tool proposal -> backend authorization/approval -> result. Include interruption,
turn handling, timeouts, cleanup and text/audio fallback.

## Trust boundaries and ownership

Verify token audience, role, transport and client support. Use documented
server-side identity instead of copying a browser API-key demo. Browser Entra
support and private access require evidence for the specific path.

## Support gates

- **Maturity, checked 2026-10-01:** core API `2026-07-15` has a GA release;
  WebRTC and smart turn detection remain preview. Check other selected subfeatures
  and the managed-agent connector separately.
- **Constraint:** transport/model/session combinations must match the current API.
- **Unverified:** do not claim private-only media or browser token support from a
  general identity recommendation.
- **Recommendation:** test end-to-end latency, interruptions, safety and accessibility.

## Tradeoffs

A managed audio API reduces custom orchestration but limits the available feature
combinations. A preview experience cannot satisfy a strict-GA requirement merely
because its core API is GA.

## Diagram mapping

Context: speaker and client. Components: audio/session versus business-agent logic.
AI and data flow: audio, model and tool events separately. Deployment: transport,
identities, egress, backend permissions, state and privacy-aware telemetry.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Current API preserves transport-specific preview gates | [Voice Live API reference](https://learn.microsoft.com/azure/ai-services/speech-service/voice-live-api-reference-2026-07-15) | 2026-10-01 | Recheck selected version and feature flags |
| Authentication is transport/provider-specific | [Voice Live usage and auth](https://learn.microsoft.com/azure/ai-services/speech-service/voice-live-how-to) | 2026-10-01 | Verify client auth rather than assume token interchangeability |
