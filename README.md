# Agentic Co-build

[![Deploy GitHub Pages](https://github.com/microsoft/agentic-cobuild/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/microsoft/agentic-cobuild/actions/workflows/deploy-pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/microsoft/agentic-cobuild)

*Build with the customer, using reusable implementation patterns.*

---

## Start with the customer's scenario

Agentic Co-build helps customer teams and their technical advisers **co-build the customer's own
AI scenario**. Each playbook breaks down the architectural decisions and guides implementation with
reusable building blocks. Teams adapt the code and work through the relevant lessons in their
approved environment. Customer-facing slides support the design discussions.

**The initial tracks cover four reusable patterns:**

| Track | What you build |
|---|---|
| [AI Grounding / IQ](https://microsoft.github.io/agentic-cobuild/scenario.html?id=ai-grounding) | An assistant that answers from approved content and respects access boundaries. |
| [Content Understanding and Document Workflow](https://microsoft.github.io/agentic-cobuild/scenario.html?id=content-understanding-document-workflow) | A document workflow with evidence-backed extraction and human review. |
| [Avatar Scenario](https://microsoft.github.io/agentic-cobuild/scenario.html?id=avatar-scenario) | An avatar-led experience with approved content and publication controls. |
| [Operational Agents](https://microsoft.github.io/agentic-cobuild/scenario.html?id=operational-agents) | Bounded tool execution with exact approvals and evidence for recovering interrupted work. |

These are starting points, not a complete catalog of AI use cases. **A customer's scenario may
combine parts from several tracks.** New tracks can follow the same contribution contract.

Begin with the customer's outcome and data constraints. If the opportunity is unclear, use
[Customer Activity-Forge](.github/skills/customer-activity-forge/) to find a direction.

## Break the use case into parts

Before selecting sessions, decompose the customer's end-to-end use case into the parts it needs.
Map each part to the relevant scenario lessons. Record what the material covers,
what needs adapting, and what requires additional engineering. Keep uncovered work visible even
when it falls outside the engagement.

For example, a supplier-request process could draw on several parts of the kit:

| Part of the customer use case | Reusable guidance | Customer-specific work |
|---|---|---|
| Extract fields from a submitted document | Content Understanding extraction lessons | Define the fields and evaluate representative documents. |
| Answer a related policy question | AI Grounding lessons | Connect approved policy content and prove access boundaries. |
| Create a record in the customer's business system | Operational Agents lessons on tool contracts and exact approval | Build the system-specific integration; the local sample does not supply it. |

**Plan sessions around this mapping.** Combine the relevant lessons across tracks, keeping their
prerequisites. Agree which parts the engagement will build and assign owners to the remaining work.

The implementation reference focuses on Microsoft Foundry. The playbooks also discuss choices such
as Copilot Studio, SharePoint, and Fabric. Choose the platform with the customer; naming an option
does not mean the kit contains a complete implementation for it.

## Agree the delivery scope

The kit can support a scoped pilot or a longer co-build engagement. **Agree the customer-specific
work and acceptance criteria before committing to delivery.** Production readiness depends on
the customer's integrations, security requirements, and operational acceptance. Completing the
lessons or deploying an accelerator does not establish it.

Published durations estimate guided lesson time. They are not estimates for a full customer
implementation.

## What the accelerators provide

Accelerators supply sample assets and reusable code for the lessons. Some include optional Bicep
foundations for clean demo subscriptions; others include local exercises. Follow each guide's
requirements: the grounding scripts, for example, call real Azure resources.

For an existing customer environment, use the bring-your-own-environment path and approved
resources. The demo foundations do not provision an enterprise landing zone or replace
customer-specific engineering.

## Scenario contribution

Scenarios live in [`scenarios/`](scenarios/). `npm run build` regenerates their static-site assets;
run `npm run validate:scenarios` to validate scenario packs. Read the [scenario contribution
contract](scenarios/README.md) before proposing a scenario or lesson.

**Stay in your scenario's lessons.** Each default path includes its implementation steps and
checks. Its accelerator contains the code and sample data used along the way.

---

## Who is this for?

### Customer technical teams

Bring a scenario to build, or use Idea Forge to help choose one. The code-based lessons assume
basic Python and familiarity with REST APIs and JSON. Use synthetic data for initial exercises;
agree a separate, approved path before working with customer data.

### Delivery teams and facilitators

Use the playbooks to work through design choices with the customer and adapt the implementation
material. Review the relevant solution guides before delivery. Plan engineering capacity around
the agreed scope, including integration work and handoff to the customer's operating team.

---

## Prerequisites

Before you start, make sure you have:

- **Approved environment**: An Azure subscription and required permissions for live Azure lessons;
  local exercises list their own requirements
- **Development environment**: GitHub Codespaces or a local Dev Container for the code-based lessons
- **Basic Python**: Comfortable with variables, functions, pip, and virtual environments
- **Basic API knowledge**: Understand REST APIs, HTTP requests, and JSON
- **VS Code familiarity**: Helpful, but not required

---

## Getting Started

### 1. Choose a scenario and scope

Break the customer's use case into parts and map them to the relevant lessons. Agree what the
engagement will build and how to judge the result. Check prerequisites before provisioning resources.

### 2. Open in GitHub Codespaces or Dev Container

Click the badge below to open the development environment. Follow the selected lesson's setup
steps for credentials and any additional tools:

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/microsoft/agentic-cobuild)

**Alternative**: Open locally with [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers) in VS Code.

### 3. Follow the selected environment path

For live Azure lessons, authenticate to the approved subscription:

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

Push a site change to another branch to publish a preview under `/previews/`. The workflow summary contains the exact URL. Pull requests from branches in this repository also publish a preview and add or update one comment with its URL. Forked pull requests run the build checks only.

---

## Repository Structure

```
agentic-cobuild/
├── README.md                          # ← You are here
├── scenarios/                         # Self-contained scenario playbooks
│   └── <scenario>/                    # Lessons, slides, diagrams, and accelerator code
├── azure.yaml                         # Optional shared-infrastructure azd project
├── infra/                             # Shared Foundry infrastructure templates
├── scripts/                           # Site checks and shared-infrastructure deploy.sh
├── docs/                              # Static documentation site (Node.js build / GitHub Pages)
├── .devcontainer/                     # Dev environment config (Python, Azure CLI, azd)
├── .github/                           # Copilot enablement (skills, copilot-instructions) + workflows
├── .vscode/mcp.json                   # MCP servers: azure, foundry-mcp, microsoft-docs
└── .env.sample                        # The .env variable contract (never commit a real .env)
```

Each scenario keeps its implementation code and sample data under `accelerator/`.
Its manifest defines the lesson order and published assets.

---

## Solution Guides

Solution guides under `scenarios/*/accelerator/solution.md` support delivery preparation.
Use the guide for the scenario you are building to understand its implementation and adaptation needs.

### Quick-Start Facilitation Checklist

1. Agree the customer outcome, delivery scope, and acceptance criteria.
2. Map the use-case parts to sessions, identify uncovered work, and confirm lesson prerequisites.
3. Confirm the approved environment and source-access boundary.
4. Build with the customer, using the solution guides where helpful.
5. Review the evidence and record remaining work with a named owner.

---

## Resources

- **[Microsoft Foundry Documentation](https://learn.microsoft.com/azure/foundry/)**: Official docs and tutorials
- **[Microsoft Foundry Training](https://learn.microsoft.com/training/azure/ai-foundry)**: Structured training modules
- **[Microsoft AI skills resources](https://www.microsoft.com/en-us/corporate-responsibility/ai-skills-resources)**: Browse AI skilling and training resources

---

Choose a [scenario playbook](https://microsoft.github.io/agentic-cobuild/index.html#outcomes).
