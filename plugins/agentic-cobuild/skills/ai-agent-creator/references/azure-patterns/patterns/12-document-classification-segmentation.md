# Document classification and segmentation

## Use when / avoid when

Use when a file or bundle must be divided into document units, classified against
a governed taxonomy, and optionally routed to type-specific analyzers. Compare
[structured extraction](07-structured-document-extraction.md) when the document
type is already known and fixed fields are the outcome. Compare
[multimodal processing](06-multimodal-content-processing.md) when varied media
becomes structured output without bundle segmentation or taxonomy routing.

## Evidence classification

**Locally composed recipe** from official Content Understanding classification,
limits, and quality guidance. It is not a claim that Content Understanding fits
every classifier or that preview segmentation is production-ready.

## Responsibilities and components

Core: intake/source storage, versioned canonical taxonomy, analyzer lifecycle,
asynchronous job ownership, deterministic result validation, review/quarantine,
document manifest, provenance, and approved downstream routing. Keep canonical
business labels separate from analyzer-safe identifiers and descriptions when
service limits require a mapping.

## Flows

Choose only the flow the journey needs:

- classify one file;
- classify and route it to an extraction analyzer;
- segment and classify a bundle;
- segment, classify, and route each segment for extraction;
- classify hierarchically when one analyzer cannot represent the taxonomy well.

Bundle -> pinned taxonomy/analyzer version -> asynchronous analysis -> segment
ranges, categories, confidence and source -> deterministic validation -> review
or approved routing -> manifest and separated/derived outputs.

For page-level segmentation, validate that page ranges are ordered and every
input page is represented exactly once, with no overlap or omission. Structural
validation proves accounting, not that the model chose the correct business
boundary. Preserve the original bundle and result evidence for review and replay.

## Trust boundaries and ownership

Treat categories, boundaries and confidence as untrusted model output. Application
code validates taxonomy membership, page accounting, schema, analyzer/taxonomy
version and idempotency before downstream writes. Include an explicit unmatched
category and business policy when content may be outside the taxonomy; omitting
it forces classification into a defined category.

Human review owns uncertain boundaries, ambiguous categories and release of
consequential results. Corrections become governed evaluation evidence; they do
not silently mutate the production taxonomy or analyzer.

## Support gates

- **Constraint:** document classifiers support at most 200 categories per analyzer,
  120 combined characters for each category name and description, and five
  hierarchical levels. Map or partition larger taxonomies without changing their
  canonical business meaning.
- **Constraint:** GA document classification segments at page boundaries. A
  requirement to split multiple documents within one page depends on
  `2026-06-01-preview` or an approved preprocessing/review alternative.
- **Maturity, checked 2026-10-07:** use `2025-11-01` for production design;
  keep `2026-06-01-preview` enhancements behind an explicit preview gate.
- **Recommendation:** use semantic document categories rather than layout
  templates, write distinguishing descriptions in the content language, and
  define an explicit unmatched category.
- **Recommendation:** evaluate representative labelled bundles for boundary
  accuracy, per-category confusion, unmatched detection, review rate and
  downstream impact. Set confidence thresholds experimentally by consequence.
- **Unverified:** recheck file, page, language, region, model, API/SDK, throughput,
  identity and private-network compatibility for the selected deployment.

## Tradeoffs

Linked analyzers reduce application calls but couple classification, extraction,
latency and lifecycle. Explicit orchestration adds control for document isolation,
shadow comparison and independent retries. Hierarchy scales a taxonomy but can
propagate an early routing error; compare it with partitioned or flatter designs
using the workload benchmark.

## Diagram mapping

Context: submitter, taxonomy owner, reviewer and downstream owner. Components:
taxonomy/analyzer lifecycle, classifier, validator, manifest and review. AI and
data flow: classify/segment, validate, review, route and replay, including the
unmatched path. Deployment: job owner, source/output storage, operational state,
identities, private endpoints and monitoring.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Classification supports whole-file, segmentation, analyzer routing and hierarchy | [Content Understanding classification and segmentation](https://learn.microsoft.com/azure/ai-services/content-understanding/concepts/classifier) | 2026-10-07 | Select the smallest flow that satisfies the journey |
| Category and hierarchy limits shape taxonomy mapping | [Content Understanding service limits](https://learn.microsoft.com/azure/ai-services/content-understanding/service-limits) | 2026-10-07 | Validate taxonomy fit before selecting analyzer topology |
| Semantic categories, descriptions and thresholds require workload evaluation | [Content Understanding best practices](https://learn.microsoft.com/azure/ai-services/content-understanding/concepts/best-practices) | 2026-10-07 | Preserve business labels and benchmark representative bundles |

