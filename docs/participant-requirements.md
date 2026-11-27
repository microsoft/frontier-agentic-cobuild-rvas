Arrange these five things before the first session. Give each gap an owner and
a date. If a gap stops you from designing or testing safely, it's a blocker.

## People

Name:

- a product owner who approves the architecture before implementation starts;
- someone who can explain the users, the current process, the outcome, the
  constraints, and the first journey;
- an owner for each system, data source, and interface the solution uses;
- specialists for identity, networking, security, data, Azure, and platform
  standards; and
- the approvers for data access, architecture, repository changes, resources,
  and deployment.

## Workstation

Use an approved workstation with:

- GitHub Copilot CLI, or VS Code with GitHub Copilot, and permission to enable
  plugins and skills;
- access to the model the [Start guide](start.html#check-the-workspace)
  requires;
- Git, Node.js 22 or later (for installing skills by hand), Python 3.11 or later
  with uv (for GitHub Spec Kit), and the Azure CLI and Azure Developer CLI (for
  deployment); and
- network access to approved package sources, documentation, and Git.

Use synthetic or approved test data. You don't need production data or broad
production access.

## Repository

You need an approved Git repository where you can create a branch, push, and
open a pull request. Run the CI/CD pipelines yourself, or name someone who will.
The customer's branch protection, review, secret management, and release
controls still apply.

## Integrations

For each system the solution calls, collect the owner, interface, test
environment, authentication method, and access approver, plus schemas or sample
inputs.

Discovery doesn't need credentials. Implementation needs non-production access
and a place to store secrets. If access is blocked, record it. Don't guess at
interfaces or borrow credentials.

## Azure

Grant deployment access at the narrowest useful scope. **Contributor** is a
common starting point, but it can't create role assignments. If the deployment
grants access to another identity, arrange an approved identity that can. See
[Azure roles and permissions](https://learn.microsoft.com/azure/role-based-access-control/rbac-and-directory-admin-roles#azure-roles).

Before deploying, check resource providers, policy, quota, regions, networking,
naming, and tagging against the customer's landing zone and change process.

When people and access are ready, use the
[discovery session guide](discovery-session.html) to run the customer discussion
and prepare a brief for Azure Solution Architect.
