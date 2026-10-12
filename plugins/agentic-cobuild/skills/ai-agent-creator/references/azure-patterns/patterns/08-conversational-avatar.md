# Conversational avatar

## Use when / avoid when

Use when interactive audiovisual presentation benefits the user. For generated
video artifacts use [batch avatar](09-batch-avatar.md); for bidirectional speech
orchestration compare [Voice Live](10-voice-live-agent.md).

## Evidence classification

**Locally composed experience extension** from Speech capability guidance.
The avatar renders speech/video; select conversation, retrieval, model, tools and
[runtime](../runtimes/README.md) independently.

## Responsibilities and components

Core: browser/client player, control/auth boundary, conversational execution,
Speech avatar, and media connectivity. Reuse suitable platform/existing components;
add speech recognition, knowledge, or business tools only for the journey.

## Flows

Control: user -> authorized conversation -> response text.
Media: client <-> avatar through WebRTC/ICE/TURN. Model/tool traffic is a third
path. Reconnect, cancellation, idle cleanup and non-avatar fallback are explicit.

## Trust boundaries and ownership

Keep durable service secrets out of browser code. Verify the selected
credential/relay flow; a generic token broker does not demonstrate SDK support.
Reviewer/tool authorization belongs in the backend. A headless agent backend
can coexist with browser media; it is not itself the media renderer.

## Support gates

- **Constraint:** media/relay egress is distinct from a private application API.
- **Maturity:** verify avatar type, browser, voice, region and SDK support.
- **Recommendation:** the checked Speech SDK path disconnects after five idle
  minutes or thirty total minutes; plan documented reconnect and cleanup.
- **Unverified:** verify private-only media and browser authentication claims
  independently; do not infer them from another Speech capability.

## Tradeoffs

Avatars add latency, bandwidth, media/network dependencies, and accessibility
requirements. Compare text/audio-only fallback before choosing the visual layer.

## Diagram mapping

Context: user and browser player. Components: conversation/control versus avatar.
AI and data flow: control, tool/model, and media connections separately.
Deployment: service auth, relay/egress, backend runtime, identities and telemetry.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Avatar uses WebRTC/ICE with session/browser constraints | [Real-time avatar synthesis](https://learn.microsoft.com/azure/ai-services/speech-service/text-to-speech-avatar/real-time-synthesis-avatar) | 2026-10-01 | Verify the media path rather than route all traffic through an API box |

The source's server/client samples are starting points; inspect their credential
handling before using them in a production-facing design.
