# Batch avatar video

## Use when / avoid when

Use to render approved scripts into non-interactive video artifacts. For live
conversation use [real-time avatar](08-conversational-avatar.md).
Private-only destination storage may conflict with the documented service path.

## Evidence classification

**Locally composed asynchronous recipe** from official batch-avatar guidance.
This is an independent job or extension, not a real-time agent protocol.

## Responsibilities and components

Core: approved script/SSML, job submission, status tracking, artifact delivery,
access/retention and audit. Choose a governed job/workflow owner; custom workers
or agents are needed only for demonstrated gaps, not merely to poll a rendering job.

## Flows

Approved input -> submit synthesis job -> poll status -> retrieve video ->
authorized delivery. Handle failed jobs, duplicate submission, cancellation where
supported, expiration, cleanup and reconciliation.

## Trust boundaries and ownership

Backend owns synthesis credentials and authorized output delivery. Separate storage
network exposure from object access: allowing a service network path is not
permission to expose videos anonymously.

## Support gates

- **Constraint, checked 2026-10-01:** the documented destination storage account
  must allow all networks; network-restricted destination storage is unsupported.
  A requested private-only destination is a requirement conflict, not a supported
  edge to draw.
- **Unverified:** evaluate a separately approved output-transfer design or a
  different capability; do not promise either as a workaround without evidence.
- **Maturity:** verify avatar, region, API, size, duration and concurrency limits.

## Tradeoffs

Batch rendering decouples user latency but adds jobs, artifact retention and delivery
controls. A storage exposure exception needs an explicit policy decision.

## Diagram mapping

Context: content author and video consumer. Components: job host and artifact
delivery. AI and data flow: submission/polling/output. Deployment: backend auth,
actual destination exposure, artifact access and operations.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Destination network restriction is not supported | [Batch avatar synthesis](https://learn.microsoft.com/azure/ai-services/speech-service/text-to-speech-avatar/batch-synthesis-avatar) | 2026-10-01 | Flag private-only output conflict before choosing this path |
