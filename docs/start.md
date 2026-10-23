## Before you start

Work in the application repository, not this tooling repository. For an existing
application, [prepare its context](existing-applications.html). Check the
[participant requirements](participant-requirements.html), use an approved
workspace, and identify the people who can approve access and architecture.

## Command and prompt reference

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

Each command installs project-local copies from its upstream repository and can overwrite existing copies.

<!-- upstream-commands -->

If an install fails, inspect the error, skill directories, and `skills-lock.json`
before retrying. Preserve existing skills instead of deleting them to bypass a
conflict. Installing a skill does not authorize cloud changes or commits.

### Check the workspace

In CLI, use `/skills` and `/mcp`. In VS Code, use **Chat: Configure Skills** and
the MCP server list. Reload the host after installation if needed.

**Recommended model: Claude Opus 5.5.** Select it in your host's model picker
before starting AI Agent Creator or implementation.

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

### Implementation prompt

```text
Implement the attached plan. Treat the attached specification as the
requirements source of truth and follow the attached architecture.
```

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

### Idea Forge prompt

```text
/idea-forge Find a bounded AI opportunity for [customer] in [industry].
Research the business and publicly stated priorities on the web.
```

### Update the plugin

Each teammate manages the plugin in their own host. Review updates before use.
Supporting skill updates remain separate.

```bash
copilot plugin update agentic-cobuild
```

VS Code users can run the plugin update action instead.

## Describe what you want to build

If several people hold the business context, use the
[discovery session guide](discovery-session.html) first. Get approval before
recording or processing the discussion.

Select **AI Agent Creator** and use the matching
[prompt](#ai-agent-creator-prompts). Confirm discovery after you agree on the
outcome, first user journey, and architecture decisions.

<!-- diagram: approval-handoff -->

The creator writes the editable diagrams, architecture, specification, and
implementation plan under `docs/architecture/`. Review the full package.
If visual or independent review is unavailable, explicitly accept and record the
exception.

**Approval ends this workflow.** Start implementation separately. Approval does
not change code, generate infrastructure, or provision resources.

## Start implementation in a new session

Open a new session. Attach the approved architecture files and use the
[implementation prompt](#implementation-prompt). Reapprove any change to an
architecture decision.

After targeted checks pass, run the [implementation and security reviews](#review-prompts).
Resolve findings and rerun affected tests. If review tooling is unavailable,
assign a human reviewer and record the gap.

The operating team still owns production acceptance and rollback.

## Need an idea first?

Use **Idea Forge** with the [reference prompt](#idea-forge-prompt), then take the
selected brief through AI Agent Creator discovery and architecture approval.

See the [plugin source](https://github.com/microsoft/frontier-agentic-cobuild-rvas/tree/main/plugins/agentic-cobuild)
and the [diagram asset terms](https://github.com/microsoft/frontier-agentic-cobuild-rvas/blob/main/plugins/agentic-cobuild/skills/cloud-architecture-diagram/references/REFERENCE.md).
