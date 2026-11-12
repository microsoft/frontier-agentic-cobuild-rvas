## Who needs to be involved

You need a product owner, someone who understands the business problem, and
technical specialists you can reach. Work in the customer's approved
environment, and approve the architecture before starting implementation.

## Knowledge and people

- Someone who can explain the users, the current process, the outcome, the
  constraints, and the first journey.
- Owners for the systems, data sources, and interfaces the solution will use.
- Specialists you can reach for identity, networking, security, data, Azure, and
  platform standards.
- Approvers for data access, architecture, repository changes, resources, and
  deployment.

## Workstation and engineering tools

Use an approved workstation with:

- GitHub Copilot CLI, or VS Code with GitHub Copilot, and permission to enable
  plugins and skills.
- Claude Opus 5.5, the model the [Start guide](start.html) requires for the
  creator, the optional prototype, and implementation.
- Git, and the customer's review and delivery process.
- The runtimes listed in the [Start guide](start.html).
- Network access to approved package sources, documentation, Git, and
  development systems.

Use synthetic or approved test data during discovery and early implementation.
Production data and broad production access aren't prerequisites.

## Repository and delivery access

You need an approved Git repository and enough access to:

- clone it and create a branch;
- push changes and open a pull request; and
- run, or ask someone to run, the CI/CD pipelines.

Branch protection, review, secret management, and release controls still apply.
If you can't set up repositories or pipelines yourself, ask someone who can.

## Customer systems and test access

For each integration, name the owner, interface, test environment,
authentication method, and who approves access. Provide schemas or sample inputs.

Discovery doesn't need live credentials. Implementation needs non-production
access and a place to store secrets. If access is blocked, write that down. Don't
guess at interfaces or borrow credentials.

## Azure access for deployment

Grant deployment access at the narrowest useful scope. **Contributor** is a
common starting point for managing resources, but the role you need depends on
the architecture and policy.

Contributor can't create role assignments. If deployment grants access to
another identity, arrange an approved identity that can. See
[Azure roles and permissions](https://learn.microsoft.com/azure/role-based-access-control/rbac-and-directory-admin-roles#azure-roles).

Before deploying, check resource providers, policy, quota, regions, networking,
naming, and tagging. Use the customer's landing zone and change process.

## Readiness check

Before the first working session, confirm that:

- the business participant, product owner, and technical contacts are named;
- the workstation can reach the tools and repositories;
- the repository and delivery path are ready;
- integration details and sample test inputs are available; and
- you know the Azure deployment scope, who approves it, and how access works.

Give each gap an owner and a date. If missing access or approvals stop you from
designing or testing safely, treat that as a blocker.

When people and access are ready, use the
[discovery session guide](discovery-session.html) to run the customer discussion
and prepare a brief for AI Agent Creator.
