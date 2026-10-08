# Multimodal content processing

## Use when / avoid when

Use to turn varied documents, images, audio, or video into schema-bound results
with provenance and review. Compare [structured extraction](07-structured-document-extraction.md)
for known forms. Compare
[document classification and segmentation](12-document-classification-segmentation.md)
when mixed bundles need governed taxonomy routing and boundary validation. This
is an independent workflow, not a mandatory chat extension.

## Evidence classification

Official **solution idea**, adapted to the workload; not a production-certified
baseline. The linked content-processing accelerator is an implementation sample.

## Responsibilities and components

Core: intake/source storage, asynchronous processing, extraction, deterministic
validation, results/provenance storage, review, and approved delivery. The source
uses Container Apps, Content Understanding, model-assisted mapping, Blob Storage,
Queue Storage and Cosmos DB. Choose model mapping only when extraction needs it;
analytics is optional. Choose [runtime](../runtimes/README.md) separately.

## Flows

Upload -> stored source -> queued work -> analyzer -> schema validation/mapping ->
results -> review where required -> approved output. Include polling/cancellation,
idempotency, poison/failed jobs, corrections and reprocessing.

## Trust boundaries and ownership

Authorize intake and reviewer access, preserve source references and revision
history, and restrict downstream writes to approved results. An extraction
confidence score is not guaranteed correctness or a business approval.

## Support gates

- **Maturity, checked 2026-10-01:** Content Understanding `2025-11-01` is GA;
  `2026-06-01-preview` has separate preview features.
- **Unverified:** recheck selected modalities, analyzer features, SDKs, models,
  regions, and preview-path network/identity parity.
- **Recommendation:** set quality-tested review thresholds and explicit durable
  job/state ownership. The source does not fully specify retry/dead-letter policy.

## Tradeoffs

Custom workflow code adds control and operational work. Compare Functions/Logic
Apps where appropriate. Keep application-level review distinct from a preview
long-running hosted-agent approval mechanism.

## Diagram mapping

Context: uploader/reviewer/downstream owner. Components: processing responsibilities
and stores. AI and data flow: extract/validate/review plus failure path. Deployment:
worker/runtime identity, queue, durable state, private endpoints and operations.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Processing with human validation is a solution idea | [Multimodal content processing](https://learn.microsoft.com/azure/architecture/ai-ml/idea/multi-modal-content-processing) | 2026-10-01 | Adapt the source; design recovery and review controls |
| Analyzer API tracks have different maturity | [Content Understanding release notes](https://learn.microsoft.com/azure/ai-services/content-understanding/whats-new) | 2026-10-01 | Verify features independently of service GA |

Inspect and pin the source's linked accelerator before using its implementation;
newer code can differ from the article.
