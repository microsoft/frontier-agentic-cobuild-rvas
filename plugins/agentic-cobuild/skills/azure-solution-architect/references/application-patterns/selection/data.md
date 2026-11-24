# Data and state selection

Start from access patterns and ownership, then compare consistency, latency,
scale, governance, and cost. Add a store only when its access pattern or
lifecycle differs from an existing one; each store is an operational burden.

For each business entity, record: system of record, owner, consistency need,
read/write ratio, query shape, retention, residency, and recovery targets.

| Access pattern | Start with | Notes |
| --- | --- | --- |
| Transactions, joins, SQL, reporting on operational data | **Azure SQL Database** or **PostgreSQL Flexible Server** | SQL Managed Instance for SQL Server compatibility during migration |
| Flexible JSON documents, global distribution, high-scale point reads | **Cosmos DB for NoSQL** | Model partition key and transaction scope from access patterns first |
| Cache, session, leaderboard, rate counters | **Azure Managed Redis** | Cache-Aside needs an explicit staleness tolerance |
| Simple key-value at scale | **Cosmos DB for Table** or Table Storage | |
| Relationships as the main query | SQL graph features, or Cosmos DB for Apache Gremlin | Confirm the query volume justifies a graph store |
| Telemetry, logs, time-window analytics | **Azure Data Explorer** or **Fabric Eventhouse** | |
| Objects, media, documents, backups | **Blob Storage** | Choose tier, redundancy, lifecycle, and retrieval latency |
| Lake data for analytics | **Data Lake Storage** with Fabric or Databricks | |
| SMB/NFS file shares for lift-and-shift apps | **Azure Files** | |
| Full-text and faceted search | **Azure AI Search** | SQL full-text can suffice for simple relational search |

Distributed state across services needs an explicit consistency plan: local
transactions per service, Saga for cross-service work, Outbox-style publishing
for reliable events, and idempotent consumers. See
[cross-cutting selection](cross-cutting.md#design-patterns).

## Retiring

| Service | Status | Direction |
| --- | --- | --- |
| Azure Cache for Redis Enterprise and Enterprise Flash | Retires 31 March 2027 | Azure Managed Redis |
| Azure Cache for Redis Basic, Standard, Premium | Retires 30 September 2028 | Azure Managed Redis; check region and feature compatibility |

**Complete when:** each entity has one system of record and owner; each store
has its access pattern, consistency, backup and recovery targets, residency,
and tier recorded; and cross-store consistency has a named mechanism.

## Evidence

| Decision or claim | Official source | Checked | Design implication |
| --- | --- | --- | --- |
| Data store models and selection criteria | [Understand data store models](https://learn.microsoft.com/azure/architecture/data-guide/technology-choices/understand-data-store-models) | 2026-11-24 | Select by access pattern before product |
| Storage options | [Storage options](https://learn.microsoft.com/azure/architecture/guide/technology-choices/storage-options) | 2026-11-24 | Choose tier, redundancy, and retrieval behavior per requirement |
| Search options | [Search data store](https://learn.microsoft.com/azure/architecture/data-guide/technology-choices/search-options) | 2026-11-24 | Use AI Search when relevance, facets, or vectors matter |
| Azure Cache for Redis retirement | [Retirement FAQ](https://learn.microsoft.com/azure/azure-cache-for-redis/retirement-faq) | 2026-11-24 | Use Azure Managed Redis for new caches |
