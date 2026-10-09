# Implementation plan quality contract

Read before writing the delivery plan. It owns later work, dependencies and
acceptance traceability; requirements remain in the specification and design
decisions in the architecture record.

## Required structure

Write `docs/architecture/implementation-plan.md` with:

```markdown
# Implementation plan

## Delivery outcome and scope
## Specification and acceptance traceability
## Enterprise starting point
## Target architecture and Microsoft cloud mapping
## Microsoft Learn evidence and compatibility notes
## Application stack and software libraries
## Workstreams and repository changes
## Data, knowledge, and integration implementation
## AI implementation and evaluation
## Identity, security, networking, and compliance
## Environments, infrastructure as code, and delivery pipeline
## Observability, reliability, and operations
## Testing and quality gates
## Migration and rollout
## Delivery phases and dependencies
## Risks, decisions, and open items
## Definition of done
```

## Technology choices

- Link `specification.md` and preserve its stable requirement and acceptance IDs.
  The specification owns requirements; this plan owns later delivery work.
- Describe delivery for the choices and ownership recorded under the
  [selection contract](azure-patterns/runtimes/README.md), including its
  model-inference and reuse boundaries. Link decisions instead of selecting a
  second platform, channel or model deployment in the plan.
- Map every major diagram component to a Microsoft cloud service, an existing
  enterprise capability, application code, or an explicit external dependency.
- Name the configuration, connectors, protocols, data formats, test mechanisms,
  and any required frameworks, SDKs, or libraries implementing each boundary.
  Explain their responsibility and fit. In `Application stack and software
  libraries`, mark custom code non-applicable when platform configuration suffices
  instead of selecting a web framework to fill the section.
- Record any required runtime/framework or its non-applicability.
  Assign unresolved package, protocol, knowledge-integration, and network
  support checks to an owner before the dependent workstream starts.
- Apply the [evidence contract](microsoft-learn-evidence.md) to compatibility
  notes and unresolved support checks.
- Preserve repository choices in brownfield work. Introduce a new framework or
  runtime only when the architecture requires it, and record the migration cost.
- Use versions pinned by the repository or an approved compatibility constraint.
  Otherwise assign an implementation-time compatibility check.
- Define production integration boundaries and identify environment-specific
  configuration, identity, and failure behavior for each adapter. Document
  implementation-time test seams without creating runtime stand-ins.
- For managed platforms, define configuration versioning, environment promotion,
  connection permissions, publication, evaluation, rollback, and operations using
  verified lifecycle mechanisms. Repository changes and IaC may be non-applicable;
  durable configuration and release ownership are still required.

## Enterprise branches

Classify the starting point from evidence gathered during discovery.
Apply foundation and migration items to the resources and responsibilities the
workload actually owns. A SaaS-managed agent may need platform environments and
connection governance rather than a new Azure landing zone, web host, or IaC.
Record non-applicable concerns with reasons instead of inventing resources.

### Greenfield

Define the foundation required before workload deployment:

- tenant, management-group, subscription, and resource-group placement;
- landing-zone, region, environment, naming, tagging, policy, and budget model;
- identity, managed identities, RBAC, secrets, network topology, DNS, private
  access, ingress, and egress;
- observability workspace, security monitoring, backup, recovery, and support
  ownership;
- IaC repository structure, CI/CD promotion path, and platform bootstrap order.

### Brownfield

Document the existing estate and change path:

- current application stack, repositories, Azure resources, identities, networks,
  data stores, deployment pipelines, monitoring, and systems of record;
- capabilities to reuse, constraints to preserve, integration seams, and
  unsupported or end-of-life dependencies;
- coexistence model, schema or data migration, backfill, synchronization,
  compatibility testing, cutover, rollback, and decommissioning;
- ownership boundaries and changes required from platform, security, operations,
  data, and application teams.

Keep unknown estate facts as assumptions or discovery actions rather than
copying greenfield infrastructure into a brownfield plan.

## Delivery mechanics

- Organize work into dependency-ordered phases that produce demonstrable outcomes,
  not horizontal layers or generic epics.
- For each phase, state prerequisites, platform configuration, repository or
  infrastructure changes, validation, acceptance criteria, rollout control,
  and rollback or recovery.
- Map each phase to specification requirements and acceptance criteria. Owned
  unresolved checks must precede the dependent work rather than appearing as
  already confirmed requirements.
- Include functional, contract, integration, security, performance, resilience,
  AI-quality, and operational-readiness tests where they apply.
- Convert architecture success measures into evaluation or acceptance gates.
- Identify long-lead approvals, quotas, model capacity, networking, data access,
  compliance, and procurement dependencies.
- Include cost and scale drivers without inventing prices or unsupported volume
  assumptions.

## Consistency gate

The plan is complete when:

- every architecture component has an implementation owner and technology path;
- every selected library or service has a stated responsibility;
- platform configuration, connectors, publication and lifecycle work replace
  application/IaC work where appropriate, with non-applicability explained;
- greenfield foundation work or brownfield migration work is explicit;
- security, operations, testing, rollout, and rollback are implementable;
- deferred decisions have an owner, decision point, and impact;
- plan phases trace to the approved first journey and architecture;
- `specification.md`, `solution.drawio`, `solution.md`, and
  `implementation-plan.md` agree;
- the plan remains documentation for the accelerator's separately initiated
  delivery workflow.
