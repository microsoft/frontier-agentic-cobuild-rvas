Already installed the plugin and supporting skills? [Start discovery](#describe-what-you-want-to-build).

## Before you start

Work in the application repository, not this tooling repository. Check the
[participant requirements](participant-requirements.html), use an approved
workspace, and identify the people who can approve access and architecture.

### Working with an existing application?

Open its repository and point the creator to approved architecture or operating
records stored elsewhere. Bring:

- The current user journey and the one addition you want to make.
- Existing API contracts and data sources, with their owners and access boundaries.
- Behavior and interfaces that must stay unchanged, including authorization.
- Deployment constraints, regression checks, and rollback ownership.

Use synthetic inputs until customer-data access is agreed. Describe how the
application should behave when AI is unavailable or evidence is insufficient.
Missing documentation does not prove that a control or service is absent.

Reuse existing capabilities where they fit. Any proposed replacement needs a
clear requirement and a migration plan that preserves compatibility.

## Set up your workspace

Run setup commands from your application directory unless the step says
otherwise. Stop on errors and inspect partial files before retrying.

### Create a new repository

Skip this for an existing application. Follow its branching and approval rules
instead.

```bash
mkdir my-ai-app
cd my-ai-app
git init
```

### Install the plugin

For GitHub Copilot CLI:

```bash
copilot plugin marketplace add microsoft/frontier-agentic-cobuild-rvas
copilot plugin install agentic-cobuild@agentic-cobuild
copilot plugin list
```

For VS Code, add the marketplace without replacing existing entries:

```json
{
  "chat.plugins.enabled": true,
  "chat.plugins.marketplaces": [
    "microsoft/frontier-agentic-cobuild-rvas"
  ]
}
```

Open Extensions, search for `@agentPlugins`, install **Agentic Co-build**, and
enable it for the application workspace.

### Install the supporting skills

All supporting skills below are required. Run every installation command before
starting discovery.

<!-- supporting-runtime -->

Each command installs project-local copies from its upstream repository and can overwrite existing copies.

<!-- upstream-commands -->

If an install fails, inspect the error, skill directories, and `skills-lock.json`
before retrying. Preserve existing skills instead of deleting them to bypass a
conflict. Installing a skill does not authorize cloud changes or commits.

### Check the workspace

In CLI, use `/skills` and `/mcp`. In VS Code, use **Chat: Configure Skills** and
the MCP server list. Reload the host after installation if needed.

Check that **AI Agent Creator**, **Idea Forge**, and **Cloud Architecture Diagram**
are available, along with the supporting skills you installed and the
**Microsoft Learn** MCP server. If anything is missing, check the installation
error and reload the host before continuing.

**Recommended model: Claude Opus 5.5.** Select it in your host's model picker
before starting AI Agent Creator or implementation.

## Describe what you want to build

If several people hold the business context, use the
[discovery session guide](discovery-session.html) first. Get approval before
recording or processing the discussion.

Select **AI Agent Creator** from your host's skill picker or slash completion.
Use the matching prompt below and replace the example with your application.
If your host qualifies skill names, use the name it displays.

### AI Agent Creator prompts

For a new application:

```text
/ai-agent-creator Design an AI maintenance assistant for property managers that triages
resident requests and prepares work orders for approval. Account for our
existing enterprise identity and operating environment.
```

For an existing application:

```text
/ai-agent-creator Add evidence-backed report summarization to this existing application.
Inspect its current stack, preserve established interfaces, and account
for our enterprise data-access and deployment constraints.
```

**Your first milestone is confirmed discovery.** Answer the creator's questions
and agree on the outcome, first user journey, and architecture decisions before
confirming discovery. The creator then prepares the architecture package.

<!-- diagram: approval-handoff -->

The creator writes the editable diagrams, architecture, specification, and
implementation plan under `docs/architecture/`. Review the full package.
If visual or independent review is unavailable, explicitly accept and record the
exception.

**Approval ends this workflow.** Start implementation separately. Approval does
not change code, generate infrastructure, or provision resources.

## Start implementation in a new session

What you've done and approved is a plan, not an implementation. Choose one workflow
below to implement. All three use the files under `docs/architecture/` as their authority.
Do not stack the workflows.

| Workflow | Choose it when | Entry point |
| --- | --- | --- |
| Direct from the documents | You want the shortest path from an approved package to working code | Direct prompt |
| Matt Pocock spec and tickets | You want a local spec, dependency-linked tickets, and bounded parallel delivery | `/to-spec`, `/to-tickets`, then `/implement-spec` |
| Spec Kit | You want a constitution, feature spec, plan, and task artifacts before coding | Spec Kit's specify, plan, tasks, and implement commands |

### Direct from the documents

Open a new session and attach the approved architecture files. Use this path
unless the work needs the extra coordination provided by the other workflows.

```text
Read @docs/architecture/specification.md,
@docs/architecture/implementation-plan.md, @docs/architecture/solution.md,
@docs/architecture/solution.drawio, and @docs/architecture/cost-estimate.md.
Implement the approved plan in dependency order. Treat the specification and
its acceptance criteria as the requirements source of truth. Follow the
approved architecture, preserve existing interfaces and authorization, and
add focused tests for changed behavior. Run the relevant checks and report
actual results. Do not change an architecture decision without approval.
Do not commit, provision, deploy, or change production data.
```

### Matt Pocock spec and tickets

Choose this optional workflow when several independent work items need explicit
dependencies and local coordination. Install the Matt Pocock engineering
workflow first if `/to-spec`, `/to-tickets`, and `/implement-spec` are not
available. Use local Markdown tracking, not remote issues.

```text
/to-spec Convert the approved docs/architecture/ package into one bounded local
implementation spec. Preserve its requirement and acceptance IDs, architecture
decisions, interfaces, authorization, cost constraints, and out-of-scope work.
Do not implement yet.
```

```text
/to-tickets Break the local spec into dependency-linked, testable tickets.
Keep every ticket linked to the original acceptance criteria. Show the proposed
breakdown before writing it. Do not publish remote issues or implement yet.
```

Open a new session for delivery:

```text
/implement-spec Implement the approved local spec and tickets. Reconcile them
with the current source and the full docs/architecture/ package. Preserve the
approved architecture and existing contracts. Run focused and combined checks.
Do not push, open a pull request, provision, deploy, or change production data.
```

### Spec Kit

Choose this optional workflow when your repository uses Spec Kit or the team
wants its feature-specification and task lifecycle. Configure Spec Kit first,
then run its constitution, specify, clarify when needed, plan, and tasks commands
against the approved `docs/architecture/` package. Do not use those commands to
replace settled architecture decisions.

Open a new session after the feature plan and tasks are reviewed:

```text
/speckit-implement Implement only the reviewed feature tasks. Treat the
docs/architecture/ package and its acceptance criteria as authoritative.
Preserve the approved architecture, interfaces, authorization, and cost
constraints. Run the documented tests and record actual results. Do not commit,
provision, deploy, or change production data.
```

Use `/speckit-converge` after each implementation pass. Repeat implementation
and convergence until the feature is converged or the remaining blocker is
recorded.

Whichever path you choose, reapprove any proposed change to an architecture
decision.

After targeted checks pass, run the [implementation and security reviews](#review-prompts).
Resolve findings and rerun affected tests. If review tooling is unavailable,
assign a human reviewer and record the gap.

The operating team still owns production acceptance and rollback.

## Command and prompt reference

Use these commands after implementation or when maintaining an existing setup.

### Review prompts

Implementation review:

```text
/review Review the staged and unstaged implementation against
@docs/architecture/specification.md,
@docs/architecture/implementation-plan.md, and
@docs/architecture/solution.md. Identify unmet or partially met acceptance
criteria, skipped or out-of-order plan steps, architecture deviations,
regressions, and missing tests. Rank findings by severity and include file and
line references.
```

Security review:

```text
/security-review Analyze the staged and unstaged implementation for exploitable
security vulnerabilities, insecure defaults, authorization or data-isolation
failures, secret exposure, injection risks, unsafe external interactions, and
dependency or configuration weaknesses. Rank findings by severity and confidence,
include file and line references, and recommend the smallest safe fix for each
finding.
```

### Update the plugin

Each teammate manages the plugin in their own host. Review updates before use.
Supporting skill updates remain separate.

```bash
copilot plugin update agentic-cobuild
```

VS Code users can run the plugin update action instead.

## Need an idea first?

Use **Idea Forge** with the prompt below, then take the
selected brief through AI Agent Creator discovery and architecture approval.

### Idea Forge prompt

```text
/idea-forge Find a bounded AI opportunity for [customer] in [industry].
Research the business and publicly stated priorities on the web.
```

See the [plugin source](https://github.com/microsoft/frontier-agentic-cobuild-rvas/tree/main/plugins/agentic-cobuild)
and the [diagram asset terms](https://github.com/microsoft/frontier-agentic-cobuild-rvas/blob/main/plugins/agentic-cobuild/skills/cloud-architecture-diagram/references/REFERENCE.md).
