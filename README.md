# Agentic Co-build

[![Deploy GitHub Pages](https://github.com/microsoft/frontier-agentic-cobuild-rvas/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/microsoft/frontier-agentic-cobuild-rvas/actions/workflows/deploy-pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/microsoft/frontier-agentic-cobuild-rvas)

*Build with the customer, using reusable building blocks.*

---

## Start with the customer's scenario

Agentic Co-build helps customer teams and their technical advisers **build the customer's own
AI scenario**. Each playbook breaks architectural choices into reusable modules. Teams adapt the
code in their approved environment, and customer-facing slides support the design discussions.

**The initial tracks cover four reusable patterns:**

| Track | What you build |
|---|---|
| [AI Grounding / IQ](https://microsoft.github.io/frontier-agentic-cobuild-rvas/scenario.html?id=ai-grounding) | An assistant that answers from approved content and respects access boundaries. |
| [Content Understanding and Document Workflow](https://microsoft.github.io/frontier-agentic-cobuild-rvas/scenario.html?id=content-understanding-document-workflow) | A document workflow with evidence-backed extraction and human review. |
| [Avatar Scenario](https://microsoft.github.io/frontier-agentic-cobuild-rvas/scenario.html?id=avatar-scenario) | An avatar-led experience with approved content and publication controls. |
| [Operational Agents](https://microsoft.github.io/frontier-agentic-cobuild-rvas/scenario.html?id=operational-agents) | Bounded tool execution with exact approvals and evidence for recovering interrupted work. |

These are starting points, not a complete catalog of AI use cases. **A customer's scenario may
combine parts from several tracks.** New tracks can follow the same contribution contract.

Start with the customer's outcome and data constraints. If the opportunity is unclear, use
[Customer Activity-Forge](.github/skills/customer-activity-forge/) to find a direction. If the use
case is clear, use [Use-Case Mapper](.github/skills/use-case-mapper/) to map it to modules. The
[Start page](https://microsoft.github.io/frontier-agentic-cobuild-rvas/start.html) explains both.

## Break the use case into parts

Before selecting modules, split the customer's end-to-end use case into the parts it needs.
Map each part to the relevant scenario modules. Record what the material covers,
what needs adaptation, and what needs additional engineering. Keep uncovered work visible even
when it falls outside the engagement. **The [Use-Case Mapper](.github/skills/use-case-mapper/)
skill does this for you:** it reads every scenario manifest and marks each part Covered, Adapt, or
Not covered.

For example, a supplier-request process could draw on several parts of the kit:

| Part of the customer use case | Reusable guidance | Customer-specific work |
|---|---|---|
| Extract fields from a submitted document | Content Understanding extraction modules | Define the fields and evaluate representative documents. |
| Answer a related policy question | AI Grounding modules | Connect approved policy content and prove access boundaries. |
| Create a record in the customer's business system | Operational Agents modules on tool contracts and exact approval | Build the system-specific integration; the local sample does not supply it. |

**Plan modules around this mapping.** Combine the relevant modules across tracks, keeping their
prerequisites. Agree which parts the engagement will build and assign owners to the remaining work.

The code reference focuses on Microsoft Foundry. The playbooks also discuss Copilot Studio,
SharePoint, and Fabric. Choose the platform with the customer; an option named here is not a
complete solution.

## Agree the engagement scope

The kit can support a focused pilot or a longer co-build engagement. **Agree the customer-specific
work and acceptance criteria before committing.** Production readiness still depends on the
customer's integrations, security requirements, and operational acceptance. Completing modules or
deploying an accelerator does not prove it.

Published durations estimate guided module time. They are not estimates for a full customer
implementation.

## Build in the customer's tenant

**The deliverable is the agreed use case running in the customer's environment.** Use an existing
approved tenant and subscription where possible. Create the application in a customer-owned
private repository, and keep data and acceptance evidence in their approved systems.

Before the first build module, agree on a user task and its acceptance check. Identify who owns
the source and where users will receive the result. Select the relevant modules and assign the
integration work. At the end, test through the channel those users will use, including a denied or
failed request. Hand over operation and rollback to a named owner.

## What the reference code provides

The `accelerator/` folders supply reusable code and synthetic inputs for isolated checks.
They help teams build and test individual controls. Passing those checks is preparation;
the modules require evidence from the customer's connected application.

For an existing customer environment, use the bring-your-own-environment path and approved
resources. The demo foundations do not provision an enterprise landing zone or replace
customer-specific engineering.

## Scenario contribution

Scenarios live in [`scenarios/`](scenarios/). `npm run build` regenerates their static-site assets;
run `npm run validate:scenarios` to validate scenario packs. Read the [scenario contribution
contract](scenarios/README.md) before proposing a scenario or module.

**Use the modules for the agreed build.** Each module names the decision and the work, then checks
the result. Its reference code is optional when the customer already has an application that meets
the same contract.

---

## Who is this for?

### Customer technical teams

Bring a scenario to build, or use Idea Forge to help choose one. Use-Case Mapper shows which
modules cover it. The code-based modules assume basic Python and familiarity with REST APIs and
JSON. Use synthetic data for initial exercises;
agree a separate, approved path before working with customer data.

### Delivery teams and facilitators

Use the playbooks to work through design choices with the customer and adapt the code and guidance.
Review the relevant facilitator references before the engagement. Plan engineering capacity around
the agreed scope, including integration work and handoff to the customer's operating team.

---

## Prerequisites

Before you start, make sure you have:

- **Approved environment**: An Azure subscription and required permissions for live Azure modules;
  local exercises list their own requirements
- **Development environment**: GitHub Codespaces or a local Dev Container for the code-based modules
- **Basic Python**: Comfortable with variables, functions, pip, and virtual environments
- **Basic API knowledge**: Understand REST APIs, HTTP requests, and JSON
- **VS Code familiarity**: Helpful, but not required

---

## Getting Started

### 1. Choose a scenario and scope

Break the customer's use case into parts and map them to the relevant modules. Agree what the
engagement will build and how to judge the result. Check prerequisites before provisioning resources.

### 2. Open in GitHub Codespaces or Dev Container

Click the badge below to open the development environment. Follow the selected module's setup
steps for credentials and any additional tools:

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/microsoft/frontier-agentic-cobuild-rvas)

**Alternative**: Open locally with [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers) in VS Code.

### 3. Follow the selected environment path

For live Azure modules, authenticate to the approved subscription:

```bash
az login
```

Follow the selected scenario's accelerator guide for a clean demo subscription or an existing
customer environment. Deploy demo resources only where approved.

## Publishing the documentation site

Before the first deployment, a repository administrator must:

1. Create a `gh-pages` branch if it does not exist. It can start from `main`; the workflow uses it to store branch previews.
2. Open **Settings > Pages** and select **GitHub Actions** as the source.

The workflow builds `docs/` and deploys that artifact when changes reach `main`.

Push a site change to another branch to publish a preview under `/previews/`. The workflow summary
contains the exact URL. Pull requests from branches in this repository also publish a preview and
add or update one comment with its URL. Forked pull requests run the build checks only.

---

## Repository Structure

```
agentic-cobuild/
├── README.md                          # ← You are here
├── scenarios/                         # Self-contained scenario playbooks
│   └── <scenario>/                    # Modules, slides, diagrams, and reference code
├── azure.yaml                         # Optional shared-infrastructure azd project
├── infra/                             # Shared Foundry infrastructure templates
├── scripts/                           # Site checks and shared-infrastructure deploy.sh
├── docs/                              # Static documentation site (Node.js build / GitHub Pages)
├── .devcontainer/                     # Dev environment config (Python, Azure CLI, azd)
├── .github/                           # Copilot enablement (skills, copilot-instructions) + workflows
├── .vscode/mcp.json                   # MCP servers: azure, foundry-mcp, microsoft-docs
└── .env.sample                        # The .env variable contract (never commit a real .env)
```

Each scenario keeps its reusable code and sample data under `accelerator/`.
Its manifest defines the module order and published assets.

---

## Facilitator References

Facilitator references under `scenarios/*/accelerator/facilitator-reference.md` support engagement
preparation. Use the reference for the scenario you are building to understand its code and the
work that remains customer-specific.

### Quick-Start Facilitation Checklist

1. Agree the customer outcome, engagement scope, and acceptance criteria.
2. Map the use-case parts to modules, identify uncovered work, and confirm module prerequisites.
3. Confirm the approved environment and source-access boundary.
4. Build with the customer, using the facilitator references where helpful.
5. Review the evidence and record remaining work with a named owner.

---

## Resources

- **[Microsoft Foundry Documentation](https://learn.microsoft.com/azure/foundry/)**: Official docs and tutorials
- **[Microsoft Foundry Training](https://learn.microsoft.com/training/azure/ai-foundry)**: Structured training modules
- **[Microsoft AI skills resources](https://www.microsoft.com/en-us/corporate-responsibility/ai-skills-resources)**: Browse AI skilling and training resources

---

Choose a [scenario playbook](https://microsoft.github.io/frontier-agentic-cobuild-rvas/index.html#outcomes).
