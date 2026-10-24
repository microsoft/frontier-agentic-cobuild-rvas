## Who needs to be involved

Bring someone who understands the business problem and can work in the customer
environment. Name a product owner and make technical specialists available.
Architecture approval remains a separate step before implementation.

## Knowledge and people

The customer team needs:

- A participant who can explain the users, current process, outcome, constraints,
  and first journey.
- Owners for the systems, data sources, and interfaces the solution may use.
- Reachable specialists for identity, networking, security, data, Azure, and
  platform standards.
- Named approvers for data access, architecture, repository changes, resources,
  and deployment.

## Workstation and engineering tools

Use an approved workstation with:

- GitHub Copilot CLI or VS Code with GitHub Copilot, with permission to enable
  the plugin and skills.
- Git access and support for the customer's review and delivery process.
- The runtimes listed in the [Start guide](start.html).
- Network access to approved package sources, documentation, Git, and development
  systems.

Use synthetic or approved test data during discovery and early implementation.
Do not make production data or broad production access a co-build prerequisite.

## Repository and delivery access

Provide an approved Git repository and enough access to:

- clone the repository and create a working branch;
- push changes and open a pull request;
- run or request the required CI/CD pipelines; and
- follow branch protection, review, secret-management, and release controls.

Assign someone else to prepare repositories or pipelines when needed.

## Customer systems and test access

For each integration, name the owner, interface, test environment,
authentication, and approval path. Provide schemas or representative inputs.

Discovery does not require live credentials. Implementation needs approved
non-production access and secret storage. Record blocked access instead of
guessing interfaces or using unapproved credentials.

## Azure access for deployment

Provide deployment access at the narrowest useful scope. **Contributor** is a
common starting point for resource management, but the required role depends on
the architecture and policy.

Contributor cannot create role assignments. Arrange an approved identity with
the required permission when deployment grants access to another identity. See
[Azure roles and permissions](https://learn.microsoft.com/azure/role-based-access-control/rbac-and-directory-admin-roles#azure-roles).

Check providers, policy, quota, regions, networking, naming, and tagging before
deployment. Use the customer's landing zone and change process.

## Readiness check

Before the first working session, confirm that:

- the business participant, product owner, and technical contacts are named;
- the workstation can reach the required tools and repositories;
- the source repository and delivery path are ready;
- integration information and representative test inputs are available; and
- the Azure deployment scope, approver, and access path are understood.

Assign each gap an owner and date. Treat unresolved access or governance as a
blocker when it prevents safe design or verification.

When the people and access are ready, use the
[discovery session guide](discovery-session.html) to structure the initial
customer discussion and prepare the input for AI Agent Creator.
