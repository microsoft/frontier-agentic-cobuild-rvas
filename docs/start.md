Already installed the plugin and supporting skills? [Start discovery](#describe-what-you-want-to-build).

## Before you start

Work in your application's repository, not this one. Check the
[participant requirements](participant-requirements.html), use an approved
workspace, and know who can approve access and architecture.

### Working with an existing application?

Open its repository, and tell the creator where any architecture or operating
records live if they're stored elsewhere. Bring:

- The current user journey and the one thing you want to add.
- Existing API contracts and data sources, with their owners and access limits.
- What must not change, including authorization.
- Deployment constraints, regression checks, and who owns rollback.

Use synthetic inputs until you've agreed access to customer data. Say how the
application should behave when AI is unavailable or the evidence isn't enough.
Missing documentation doesn't mean a control or service doesn't exist.

Reuse what already works. Replace something only for a clear reason, with a
migration plan that keeps it compatible.

## Set up your workspace

Run commands from your application directory unless a step says otherwise.
If a command fails, read the error and check for partial files before retrying.

### Create a new repository

Skip this for an existing application and follow its branching rules.

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

Install all of the supporting skills below before starting discovery, including
`diagram-design` from `cathrynlavery/diagram-design` and `wireframer` from
`agilek/wireframer-skill`. The final prototype is optional, but its skill still
needs to be installed.

<!-- supporting-runtime -->

Each command installs project-local copies pinned to a full upstream commit SHA,
not a moving branch, and can overwrite existing copies. The installer version is
pinned too. To keep these versions, rerun the commands. Don't use
`npx skills update`.

<!-- upstream-commands -->

If an install fails, look at the error, the skill directories, and
`skills-lock.json` before retrying. Don't delete existing skills to get around a
conflict.

### Check the workspace

In CLI, use `/skills` and `/mcp`. In VS Code, use **Chat: Configure Skills** and
the MCP server list.

You should see **AI Agent Creator**, **Idea Forge**, **Cloud Architecture
Diagram**, the supporting skills you installed, and the **Microsoft Learn** MCP
server. If something is missing, check the install error and reload your host.

**Use Claude Opus 5.5** for the whole AI Agent Creator session, including the
optional wireframe, and for implementation. In VS Code, pick it in the model
picker. In Copilot CLI, run:

```text
/model claude-opus-5.5
```

## Describe what you want to build

If the business context is spread across several people, run the
[discovery session guide](discovery-session.html) first, and get approval before
recording or processing the discussion.

Select **AI Agent Creator** from your host's skill picker or slash completion,
then adapt one of these prompts.

### AI Agent Creator prompts

For a new application:

```text
/agentic-cobuild:ai-agent-creator Design an AI maintenance assistant for property managers that triages
resident requests and prepares work orders for approval. Account for our
existing enterprise identity and operating environment.
```

For an existing application:

```text
/agentic-cobuild:ai-agent-creator Add evidence-backed report summarization to this existing application.
Inspect its current stack, preserve established interfaces, and account
for our enterprise data-access and deployment constraints.
```

**Your first milestone is confirmed discovery.** Answer the creator's questions.
When you agree on the outcome, the first user journey, and the architecture
decisions, confirm discovery. The creator then prepares the architecture package.

### Review what the creator understood

Before you confirm discovery, the creator shows what it understood, as diagrams
and text:

- a swimlane of the first journey, showing which steps belong to the user, the
  AI, fixed system logic, approvers, and external systems;
- a map of the agreed domain terms, if there are enough to relate;
- the lifecycle of a business object that waits, needs approval, or retries;
- scenarios for success, ambiguous input, a rejected action, and a failed
  dependency.

It saves the Mermaid source in `docs/architecture/visuals/shared-understanding.md`
and renders each view as HTML beside it with `diagram-design`. Open the HTML files
in a browser from either host. In VS Code 1.109 or later, enable the **Render
Mermaid Diagram** chat tool to see the diagrams inline as well.
Correct anything that looks wrong. Changing a diagram changes the record. The confirmed scenarios become acceptance criteria in the specification
and clickable paths in the optional prototype.

<!-- diagram: approval-handoff -->

The creator writes the editable diagrams, architecture, specification,
implementation plan, and cost estimate under `docs/architecture/`. Review the
diagrams, and have someone else review the whole package before you approve it.
If you can't do either, say so and record the exception.

### Optional final wireframe

After all five architecture files are complete and reconciled, the creator
explicitly asks whether you want a clickable, low-fidelity prototype. Answer in
the same session. If you say yes, it uses the installed `wireframer` skill to
illustrate the confirmed journey under `docs/architecture/prototype/`, with
synthetic data and simulated actions. If you say no, the architecture package
remains complete.

The prototype isn't a production implementation and doesn't connect to live
systems. Review it with the architecture package.

**Approval ends this workflow.** The optional prototype does not authorize
delivery. Start implementation separately. Approval doesn't change your code,
generate infrastructure, or provision resources.

## Start implementation in a new session

Pick one workflow and don't mix them. Each treats the approved files under
`docs/architecture/` as the source of truth.

| Workflow | Choose it when | Entry point |
| --- | --- | --- |
| Direct from the documents | You want the shortest path from an approved package to working code | Direct prompt |
| Matt Pocock spec and tickets | You want a local spec, dependency-linked tickets, and bounded parallel delivery | `/to-spec`, `/to-tickets`, then `/implement-spec` |
| Spec Kit | You want a constitution, feature spec, plan, and task artifacts before coding | Spec Kit's specify, plan, tasks, and implement commands |

### Direct from the documents

Open a new session and attach the approved architecture files. Use this path
unless you need the extra coordination of the other two.

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

Use this for independent work items that need dependency tracking. If `/to-spec`,
`/to-tickets`, and `/implement-spec` aren't available, install the Matt Pocock
engineering workflow. Tickets live in local Markdown, not remote issues.

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

Set up Spec Kit, then run its constitution, specify, clarify (if needed), plan,
and tasks commands against the approved `docs/architecture/` package. Don't let
them overturn decisions that are already settled.

Open a new session after the feature plan and tasks are reviewed:

```text
/speckit-implement Implement only the reviewed feature tasks. Treat the
docs/architecture/ package and its acceptance criteria as authoritative.
Preserve the approved architecture, interfaces, authorization, and cost
constraints. Run the documented tests and record actual results. Do not commit,
provision, deploy, or change production data.
```

Run `/speckit-converge` after each implementation pass, and repeat until the
feature converges or you've recorded what's blocking it.

Whichever workflow you use, get approval before changing an architecture decision.

Once targeted checks pass, run the [implementation and security reviews](#review-prompts),
fix what they find, and rerun the affected tests. If the review tools aren't
available, ask a person to review and note that.

The operating team still owns production acceptance and rollback.

## Command and prompt reference

Use these after implementation, or to maintain an existing setup.

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

Each teammate updates the plugin in their own host. Review updates before you
use them. Supporting skills update separately.

```bash
copilot plugin update agentic-cobuild
```

VS Code users can run the plugin update action instead.

## Need an idea first?

Use **Idea Forge** to research an opportunity, then take the brief you pick
through AI Agent Creator discovery and architecture approval.

### Idea Forge prompt

```text
/idea-forge Find a bounded AI opportunity for [customer] in [industry].
Research the business and publicly stated priorities on the web.
```

See the [plugin source](https://github.com/microsoft/frontier-agentic-cobuild-rvas/tree/main/plugins/agentic-cobuild)
and the [diagram asset terms](https://github.com/microsoft/frontier-agentic-cobuild-rvas/blob/main/plugins/agentic-cobuild/skills/cloud-architecture-diagram/references/REFERENCE.md).
