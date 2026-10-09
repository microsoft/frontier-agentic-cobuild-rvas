## Work in your own repository

This repository supplies the tools. Keep your application and its architecture
in a separate repository. The plugin supports new applications and AI additions
to existing systems.

For scope and examples, read [What can you build?](applications.html). If you
already have an application, [prepare its context](existing-applications.html)
before discovery.

For a new project, create an empty directory and initialize Git yourself:

```bash
mkdir my-ai-app
cd my-ai-app
git init
```

For an existing application, clone or open its repository instead. Follow its
branching and approval rules. A new repository does not imply an empty enterprise
environment; tell the creator which existing systems and controls it must reuse.

Open **your application repository** in VS Code, or start Copilot CLI there.
Use an approved workspace and synthetic inputs until customer-data access is agreed.

## Install the plugin

Choose your host. Review the plugin contents and publisher before granting trust.
Plugin installation is separate from the project-local supporting skill setup.

### GitHub Copilot CLI

Run these commands in a terminal:

```bash
copilot plugin marketplace add microsoft/frontier-agentic-cobuild-rvas
copilot plugin install agentic-cobuild@agentic-cobuild
copilot plugin list
```

The native CLI installation is user-scoped. It makes the plugin available across
repositories; it does not copy application code into your workspace.

### VS Code Copilot

In your user settings, enable `chat.plugins.enabled` and add this repository to
the existing marketplace list without replacing other entries:

```json
{
  "chat.plugins.enabled": true,
  "chat.plugins.marketplaces": [
    "microsoft/frontier-agentic-cobuild-rvas"
  ]
}
```

Open the Extensions view, search for `@agentPlugins`, and install **Agentic Co-build**.
Review the marketplace trust prompt. You can also use **Chat: Open Customizations**
to manage plugins. Enable it for your application workspace.

VS Code can discover CLI-installed plugins when both hosts share the same user
environment. Remote, container, or WSL environments may use different locations.
Check availability in the environment where you will build; do not assume a
Windows installation is available inside a container.

The plugin adds AI Agent Creator, Idea Forge, and Cloud Architecture Diagram.
It also supplies the public Microsoft Learn MCP server. This server retrieves
documentation; it cannot read or change your cloud resources. No live Azure,
Foundry, or hosted diagram connection is installed by default.

## Install the supporting skills

Use **Node.js 22.20 or newer**, Git, and npx. The script needs Bash on Linux,
macOS, WSL, or Git Bash. It does not install system tools.

Clone this tooling repository into a separate directory and review its installer:

```bash
git clone https://github.com/microsoft/frontier-agentic-cobuild-rvas.git /path/to/agentic-cobuild-tools
```

Replace both example paths below with your actual directories. Your application
directory must already exist. Preview the selected sources and planned writes:

```bash
bash /path/to/agentic-cobuild-tools/scripts/setup-agentic-repo.sh --dry-run /path/to/my-ai-app
bash /path/to/agentic-cobuild-tools/scripts/setup-agentic-repo.sh /path/to/my-ai-app
```

The script installs the selected skills under `.agents/skills/` and maintains
`skills-lock.json` plus `.agentic-cobuild-setup.json`. Keep these with the project
according to your source-control policy. The script pins the installer version.
It downloads upstream skill content from its current source and records it.
Review upstream changes before a fresh installation. The setup does not pin
skill content to specific commits.

An unchanged installation can be rerun without downloading or upgrading skills.
The script stops if a selected skill already exists without its setup record, if
managed content changed, or if setup paths are linked elsewhere. It does not edit
application code, `AGENTS.md`, MCP settings, or Git configuration.

**A failed upstream install may leave partial files.** Read the error and inspect
`.agents/skills/` and `skills-lock.json` before retrying. Preserve anything you
already owned. Do not delete a directory just to bypass a conflict.

### Manual npx alternative

Run the following commands **from your application directory**. These use the same
dependency inventory as the script. They are suitable for terminals without Bash.
Unlike our wrapper, direct upstream commands do not perform our conflict checks
or create our setup record. Inspect existing skills first; use one setup method
consistently.

<!-- upstream-commands -->

Third-party skills remain upstream-owned. Installing a skill does not authorize
cloud changes. The upstream `implement` skill includes a commit step.
Use the explicit handoff below for the
recommended journey and authorize commits separately.

## Check the workspace before starting

In CLI, start a fresh session in the application directory. Use `/skills` and
`/mcp` to inspect available skills and the Microsoft Learn connection.

In VS Code, use **Chat: Configure Skills** and the MCP server list. Confirm the
plugin is enabled, the supporting skills are discovered, and Microsoft Learn can
retrieve documentation. Plugin skill names may be qualified; select the exact
entry your host displays in its picker or slash completion.

If skills are missing, check the current workspace, plugin enablement, host version,
and organization policy. Restart or reload after installation. If the documentation
server is unavailable, report the limitation; do not invent current product facts.

Python 3.10 or newer is required for local diagram generation. Local draw.io
rendering is a separate, organization-approved prerequisite. The plugin does not
install a renderer or upload your architecture to a hosted service.
If visual or independent review is unavailable, record the gap.
You must explicitly accept a manual-review exception before architecture approval.

## Describe what you want to build

<!-- diagram: approval-handoff -->

Select **AI Agent Creator** (`ai-agent-creator`) and give it the intended outcome.
You do not need to choose the platform or runtime first.

For a new application:

```text
Design an AI maintenance assistant for property managers that triages
resident requests and prepares work orders for approval. Account for our
existing enterprise identity and operating environment.
```

For an existing application:

```text
Add evidence-backed report summarization to this existing application.
Inspect its current stack, preserve established interfaces, and account
for our enterprise data-access and deployment constraints.
```

The creator inspects the repository and interviews you. Confirm discovery after
you agree on the outcome and first user journey and settle the decisions that
affect the architecture. The creator then prepares:

| Artifact | Responsibility |
| --- | --- |
| `docs/architecture/solution.drawio` | Editable context, component, AI/data-flow, and deployment views |
| `docs/architecture/solution.md` | Architecture responsibilities, decisions, and boundaries |
| `docs/architecture/specification.md` | Functional and technical requirements with acceptance criteria |
| `docs/architecture/implementation-plan.md` | Dependency-ordered delivery work and handoff |

Review the complete package, including any recorded review exception.
**Approval ends this workflow.** It does not start implementation, change
application code, generate infrastructure, or provision resources.

## Start implementation in a new session

Choose a model suited to sustained engineering work. Attach the current
`implementation-plan.md`, `specification.md`, and `solution.md` from your
application repository. Start with this prompt:

```text
Implement the attached plan. Treat the attached specification as the
requirements source of truth and follow the attached architecture.
Work in dependency order and validate against the acceptance criteria.
Report each blocked criterion with its reason and owner.
Ask before commits, resource provisioning, or deployment.
Do not treat implementation as complete until every applicable acceptance
criterion is verified or explicitly reported as blocked.
```

Use the application's existing tests and delivery controls.
If a change to scope or architecture affects an approved decision, update the
package and obtain the affected approval before continuing.

### Review before deployment

After you finish implementation and run its targeted checks, run this in CLI:

```text
/review Review the staged and unstaged implementation against
@docs/architecture/specification.md,
@docs/architecture/implementation-plan.md, and
@docs/architecture/solution.md. Identify unmet or partially met acceptance
criteria, skipped or out-of-order plan steps, architecture deviations,
regressions, and missing tests. Rank findings by severity and include file and
line references.
```

Resolve the findings and rerun the relevant validation before moving to the
security pass. In a later, separate pass, run:

```text
/security-review Analyze the staged and unstaged implementation for exploitable
security vulnerabilities, insecure defaults, authorization or data-isolation
failures, secret exposure, injection risks, unsafe external interactions, and
dependency or configuration weaknesses. Rank findings by severity and confidence,
include file and line references, and recommend the smallest safe fix for each
finding.
```

Resolve the reported security findings and rerun the affected tests before
approving deployment.

In VS Code, request a separate implementation review against those same files.
Then request a separate security review using the review tools available in your
organization. Do not assume CLI slash commands exist in VS Code. If independent
review tooling is unavailable, assign a human reviewer and record the gap.

Successful setup or an approved architecture does not prove production readiness.
The operating team must accept the deployed user journey and own rollback.

## Need an idea first?

Select **Idea Forge** (`customer-activity-forge`) in the same application workspace.
Provide a customer name and industry, with any known pain points:

```text
Find a bounded AI opportunity for [customer] in [industry].
Use public evidence and identify a safe first proof.
```

Idea Forge researches public sources and ranks distinct ideas. Choose one. The skill
returns an unapproved brief with evidence and open questions. Pass that brief to
AI Agent Creator. Detailed discovery and architecture approval still happen there.

## Updates and team setup

Each teammate installs the plugin in their own host and checks the project skills.
Use CLI's `copilot plugin update agentic-cobuild` or VS Code's plugin update action
for plugin updates. Review the updated contents before use.

Supporting skill updates are separate. Review source changes and your project's
lock file. The setup script does not overwrite or upgrade managed skills.
If you update them manually, review and reinstall them to reconcile the setup
record. Do not edit recorded hashes to bypass a conflict.

See the [plugin source](https://github.com/microsoft/frontier-agentic-cobuild-rvas/tree/main/plugins/agentic-cobuild)
and the [diagram asset terms](https://github.com/microsoft/frontier-agentic-cobuild-rvas/blob/main/plugins/agentic-cobuild/skills/cloud-architecture-diagram/references/REFERENCE.md).
