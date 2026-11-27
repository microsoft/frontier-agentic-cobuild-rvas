# Batch and data processing

## Use when / avoid when

Use for scheduled or bulk processing: nightly imports and exports, data
pipelines into analytics, reporting, or parallel computation such as
simulation and rendering. Avoid for per-request work users wait on.

## Evidence classification

Official **big data** and **big compute** architecture styles; the composition
is a **locally composed recipe**.

## Responsibilities and components

Data path: ingestion (Data Factory or Fabric pipelines), lake storage (Data
Lake Storage or OneLake), processing (Fabric Spark, Databricks, or Stream
Analytics for streams), serving (Fabric warehouse, SQL, or semantic model).
Compute path: Batch or Container Apps jobs for parallel tasks, with inputs and
outputs in Blob Storage. Use the Fabric or Databricks specialist skills for
platform detail.

## Flows

Schedule or event -> ingest raw data -> validate and transform in layers
(raw, cleaned, curated) -> serve to reports or applications -> record lineage
and quality results. Parallel compute: split job -> tasks -> aggregate ->
publish results.

## Trust boundaries and ownership

Data owners classify sources and approve each consumer. Pipelines run under
managed identities with access per layer. Personal or regulated data is masked
or excluded before curated layers when consumers do not need it.

## Support gates

- **Constraint:** define the system of record per dataset; analytics copies do
  not become write targets.
- **Recommendation:** make jobs rerunnable and idempotent per partition or date.
- **Unverified:** data volume, growth, and refresh frequency; they drive
  capacity and cost.

## Tradeoffs

Fabric unifies storage, engineering, and BI under one capacity; Databricks
offers deeper Spark control and multi-cloud reach. Batch suits embarrassingly
parallel compute; tightly coupled HPC needs specialized VM families.

## Diagram mapping

Context: data sources and consumers. Components: ingestion, layers, processing,
serving. Runtime and data flow: schedule, transform, quality gates, lineage.
Deployment: capacity or workspace, storage accounts, compute pools, identities.

## Evidence and implementation pointers

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Big data style | [Big data architecture](https://learn.microsoft.com/azure/architecture/guide/architecture-styles/big-data) | 2026-11-24 | Coordinate ingestion, processing, and analytical storage |
| Big compute style | [Big compute architecture](https://learn.microsoft.com/azure/architecture/guide/architecture-styles/big-compute) | 2026-11-24 | Choose platform by task coupling |
