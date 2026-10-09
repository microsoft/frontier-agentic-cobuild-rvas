# Structured document extraction

## Use when / avoid when

Use when a supported prebuilt Document Intelligence model or trained extraction
model fits known document types. Compare [multimodal processing](06-multimodal-content-processing.md)
for unstructured or mixed-media requirements. Preserve working existing extraction
integrations unless a demonstrated gap justifies change.

## Evidence classification

**Locally composed recipe** from official document-tool selection guidance.
Document Intelligence is an alternative extraction component, not a claim that
Content Understanding or generative reasoning is required for every form.

## Responsibilities and components

Core: source intake, selected extractor/model, deterministic schema/business
validation, provenance/results, review and delivery. Add queue/worker orchestration
for asynchronous volume; add a model only for a justified reasoning gap.

## Flows

Document -> analyzer -> fields/confidence/source locations -> validation -> review
or accepted result -> system of record. Keep retries, model revision tracking,
and permissions/deletion propagation explicit.

## Trust boundaries and ownership

Treat extracted fields as untrusted business input. Assign review, retention,
access and system-of-record writes to governed services/workflows, not the extractor.

## Support gates

- **Constraint:** modality/model support must fit the actual inputs.
- **Maturity:** check selected prebuilt/custom model, API/SDK and region.
- **Unverified:** confirm any container/offline deployment's specific model,
  licensing, resource, and connectivity requirements; container support is not
  a blanket air-gap guarantee.
- **Recommendation:** evaluate on representative documents and field-level errors.

## Tradeoffs

Prebuilt models reduce custom work when their fields fit. Training, varied
templates, and poor-quality documents add evaluation/labeling cost. Prefer the
smaller extraction workflow over an agent if the process is fixed.

## Diagram mapping

Context: submitter and reviewer. Components: extraction and deterministic validation.
AI and data flow: fields, provenance, review and rejected output. Deployment:
chosen service/container, job host, identities, state and operational ownership.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Document tools fit different input/model requirements | [Choose the document-processing tool](https://learn.microsoft.com/azure/ai-services/content-understanding/choosing-right-ai-tool) | 2026-10-01 | Evaluate extraction fit rather than mandate migration or an LLM |
