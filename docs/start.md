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

Open a new session. Attach the approved architecture files and use the
prompt below. Reapprove any change to an architecture decision.

### Implementation prompt

```text
Implement the attached plan. Treat the attached specification as the
requirements source of truth and follow the attached architecture.
```

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
