## Who needs to be involved

The co-build participant should understand the business problem and be able to
work in the customer's development environment. They do not need to answer every
technical question alone. Arrange access to the right specialists before the
session so discovery and architecture decisions do not stall.

Name a product owner or sponsor who can confirm the scope, approve the requirements,
and review the architecture package. Architecture approval remains a separate,
explicit step before implementation.

## Knowledge and people

The customer team needs:

- **Functional knowledge of the intended solution.** The participant can explain
  the users, current process, expected outcome, constraints, and first journey to
  design.
- **Knowledge of the systems around it.** The team knows which applications,
  databases, SharePoint sites, APIs, document stores, or other sources the solution
  may need to read or update. Include system owners and known access rules.
- **Technical specialists who can answer wider architecture questions.** They do
  not need to attend the full co-build, but they must be reachable for decisions
  about networking, identity and authentication, security controls, Azure landing
  zones, data residency, and existing platform standards.
- **An owner for each approval.** Identify who can approve data access, architecture
  decisions, repository changes, cloud resource creation, and deployment.

## Workstation and engineering tools

The participant needs an organization-approved workstation with:

- VS Code and GitHub Copilot available under the customer's policy, plus permission
  to install or enable the Agentic Co-build plugin and its supporting skills.
- Familiarity with Git, pull requests, code review, and the customer's usual
  development and deployment practices. A developer can pair with the participant
  if needed.
- The runtimes and tools listed in the [Start guide](start.html), including Git,
  Node.js, and Python when local diagram generation is required.
- Network access to the approved package sources, documentation endpoints, Git
  host, and customer development systems. Check proxy, firewall, and extension
  restrictions before the session.

Use synthetic or approved test data during discovery and early implementation.
Do not make production data or broad production access a co-build prerequisite.

## Repository and delivery access

Provide an approved Git repository in GitHub Enterprise Cloud, Azure DevOps, or
another customer-standard Git service. The participant needs enough access to:

- clone the repository and create a working branch;
- push changes and open a pull request;
- run or request the required CI/CD pipelines; and
- follow branch protection, review, secret-management, and release controls.

If the participant cannot create repositories or pipelines, assign someone who
can prepare them before implementation starts.

## Customer systems and test access

For each integration, identify the system owner, interface, test environment,
authentication method, and approval path. Provide schemas, API documentation,
sample payloads, or representative documents where possible.

Live credentials are not required during architecture discovery. Before implementation
or integration testing, the customer must provide approved non-production access
and a safe way to store secrets. Record blocked access instead of substituting
unapproved credentials or guessed interfaces.

## Azure access for deployment

For deployment, provide access to the approved Azure subscription or resource
group at the narrowest useful scope. **Contributor** is a common starting point
when the participant must create and manage resources, but the required role
depends on the agreed architecture and customer policy.

Contributor cannot create Azure role assignments. If the deployment grants access
to a managed identity or service principal, arrange a separate approver or deployment
identity with permission to assign roles at the required scope, such as Role Based
Access Control Administrator, User Access Administrator, or Owner. Microsoft Learn
documents the distinction in [Azure roles and permissions](https://learn.microsoft.com/azure/role-based-access-control/rbac-and-directory-admin-roles#azure-roles).

Check resource-provider registration, policy restrictions, quotas, allowed regions,
private networking, and naming or tagging rules before deployment. The co-build
must use the customer's landing zone and change process rather than working around
them.

## Readiness check

Before the first working session, confirm that:

- the business participant, product owner, and technical contacts are named;
- the workstation can reach the required tools and repositories;
- the source repository and delivery path are ready;
- integration information and representative test inputs are available; and
- the Azure deployment scope, approver, and access path are understood.

Open gaps can remain, but assign each one an owner and expected resolution date.
Treat unresolved access or governance decisions as blockers when they prevent a
safe architecture or a verifiable implementation.

When the people and access are ready, use the
[discovery session guide](discovery-session.html) to structure the initial
customer discussion and prepare the input for AI Agent Creator.
