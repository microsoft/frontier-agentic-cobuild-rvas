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
branching and approval rules. Even a new project may need to use existing enterprise
systems and controls. Tell the creator which ones it must reuse.

Open **your application repository** in VS Code, or start Copilot CLI there.
Use an approved workspace and synthetic inputs until you have agreed on customer-data access.

## Install the plugin

Choose your host. Review the plugin contents and publisher before granting trust.
Install the supporting skills separately in your project.

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

Use **Node.js 22.20 or newer**, Git, and npx. Run the commands below
**from your application directory**. You do not need Bash or a clone of this
tooling repository.

Each command installs the listed skills directly from its upstream repository.
Review the skills and their source before running it. Check `.agents/skills/`
and `.github/skills/` for existing copies and preserve any local changes.

The commands select GitHub Copilot at project scope. `--copy` copies skill files
instead of creating symlinks. The first `--yes` lets npx download the pinned
installer; the final `--yes` accepts the skill installer's prompts.
These commands can overwrite existing copies of the selected skills.

The installer version is pinned, but upstream skill content is not pinned to
specific commits. Review upstream changes before installing or reinstalling.
Keep `skills-lock.json` and installed skill files according to your project's
source-control policy.

<!-- upstream-commands -->

If a command fails, stop and inspect its error, `.agents/skills/`, and
`skills-lock.json` before retrying. A failed install may leave partial files.
Preserve existing skills rather than deleting them to bypass a conflict.

Third-party skills remain upstream-owned. Installing a skill does not authorize
cloud changes. The upstream `implement` skill includes a commit step.
Follow the implementation handoff below and authorize commits separately.

## Check the workspace before starting

In CLI, start a fresh session in the application directory. Use `/skills` and
`/mcp` to inspect available skills and the Microsoft Learn connection.

In VS Code, use **Chat: Configure Skills** and the MCP server list. Confirm the
plugin is enabled, the supporting skills are discovered, and Microsoft Learn can
retrieve documentation. Your host may show a prefix on plugin skill names. Select the exact
entry in its picker or slash completion.

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

The creator inspects the repository and interviews you. Confirm discovery once you agree on the outcome and first user journey.
Settle the decisions that affect the architecture before confirming. The creator then prepares:

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
If scope or architecture changes an approved decision, update the
package and get that decision approved again before continuing.

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

Resolve the findings and rerun the affected checks. Then run a separate
security review:

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

Setup and architecture approval are not production-readiness checks.
The operating team must accept the deployed user journey and take responsibility for rollback.

## Need an idea first?

Select **Idea Forge** (`idea-forge`) in the same application workspace.
Provide a customer name and industry, with any known pain points:

```text
/idea-forge Find a bounded AI opportunity for [customer] in [industry].
Use public evidence and identify a safe first proof.
```

Idea Forge researches public sources and ranks distinct ideas. Choose one. Idea Forge
returns a brief with evidence and open questions; the brief is not yet approved.
Pass it to AI Agent Creator for detailed discovery and architecture approval.

## Updates and team setup

Each teammate installs the plugin in their own host and checks the project skills.
Use CLI's `copilot plugin update agentic-cobuild` or VS Code's plugin update action
for plugin updates. Review the updated contents before use.

Supporting skill updates are separate. Review source changes and your project's
lock file before reinstalling selected skills with the commands above.
Preserve local changes and inspect the resulting diff before committing.

See the [plugin source](https://github.com/microsoft/frontier-agentic-cobuild-rvas/tree/main/plugins/agentic-cobuild)
and the [diagram asset terms](https://github.com/microsoft/frontier-agentic-cobuild-rvas/blob/main/plugins/agentic-cobuild/skills/cloud-architecture-diagram/references/REFERENCE.md).
