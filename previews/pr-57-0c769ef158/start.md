Already installed the plugin? [Start discovery](#describe-what-you-want-to-build).

This page takes you through setup, discovery, architecture, and the optional
wireframe: steps 00 to 03 of [the path](path.html). Bring your own use case. If
you don't have one, [find an idea](#need-an-idea-first) or use the
[worked example](example.html).

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
mkdir my-app
cd my-app
git init
```

### Install the plugin

For GitHub Copilot CLI:

```bash
copilot plugin marketplace add microsoft/frontier-agentic-cobuild-rvas
copilot plugin install agentic-cobuild@agentic-cobuild
copilot plugin list
```

Update it later with `copilot plugin update agentic-cobuild`. In VS Code, run the
plugin update action.

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

### Or install the skills by hand

Use this if your host or organisation doesn't allow plugins, or you want only
some of the skills. You get the same skills and MCP server, but not the
Co-build board canvas, and you update them yourself.

Add the skills to your repository with the [`skills` CLI](https://github.com/vercel-labs/skills)
(Node.js 22 or later). It works the same in PowerShell and Bash:

```bash
npx skills add https://github.com/microsoft/frontier-agentic-cobuild-rvas/tree/main/plugins/agentic-cobuild/skills -a github-copilot
```

It asks which skills to install and copies them to `.agents/skills/`, which
Copilot CLI and VS Code both read. Add `--list` to see the nine skills first, or
`-s azure-solution-architect` to pick one. Run `npx skills update` to update them.

Then add the Microsoft Learn MCP server. For Copilot CLI:

```bash
copilot mcp add --transport http microsoft-learn https://learn.microsoft.com/api/mcp
```

For VS Code, add it to `.vscode/mcp.json` in your repository:

```json
{
  "servers": {
    "microsoft-learn": {
      "type": "http",
      "url": "https://learn.microsoft.com/api/mcp"
    }
  }
}
```

Later steps need more tools. Each [step of the path](path.html) lists what to
install when you reach it: Spec Kit for the task plan, Impeccable for design,
and the Azure CLI and Azure Developer CLI for deployment.

### Check the workspace

In CLI, use `/skills` and `/mcp`. In VS Code, use **Chat: Configure Skills** and
the MCP server list.

You should see **Azure Solution Architect**, **Idea Forge**, **Cloud Architecture
Diagram**, **Diagram Design**, **Wireframer**, **Cost Estimation**, **Grilling**,
**Domain Modeling**, **Wait What**, and the **Microsoft Learn** MCP server.
If something is missing, reload your host, then reinstall the plugin or rerun
`npx skills add`.

**Use Claude Opus 5.5** for the whole Azure Solution Architect session, including the
optional wireframe, and for implementation. In VS Code, pick it in the model
picker. In Copilot CLI, run:

```text
/model claude-opus-5.5
```

## Describe what you want to build

If the business context is spread across several people, run the
[discovery session guide](discovery-session.html) first, and get approval before
recording or processing the discussion.

Select **Azure Solution Architect** from your host's skill picker or slash completion,
then adapt one of these prompts.

### Azure Solution Architect prompts

For a new application:

```text
/agentic-cobuild:azure-solution-architect Build an app for [who] that helps them
[decision or task]. Today they [how it works now and what goes wrong]. The data
comes from [sources], and [who] owns it. It must not [boundary, for example
contact customers or change records without approval].
```

For an existing application:

```text
/agentic-cobuild:azure-solution-architect Add [capability] to [application] so
that [who] can [decision or task]. Inspect the current stack, preserve
established interfaces, and account for existing data-access and deployment
constraints.
```

**Your first milestone is confirmed discovery.** Answer the creator's questions.
When you agree on the outcome, the first user journey, and the architecture
decisions, confirm discovery. The creator then prepares the architecture package.

### Work in the shared canvas

In the GitHub Copilot app, ask `Open the Co-build board canvas.` to follow the
architecture package on a shared screen as the creator writes it. The canvas is
read-only and experimental: you still confirm and approve in the chat, and the
plugin works the same without it.

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
the same session. If you say yes, it uses the bundled `wireframer` skill to
illustrate the confirmed journey under `docs/architecture/prototype/`, with
synthetic data and simulated actions. If you say no, the architecture package
remains complete.

The prototype isn't a production implementation and doesn't connect to live
systems. Review it with the architecture package.

**Approval ends this workflow.** The approval and the prototype do not authorize
delivery. Nothing is built or provisioned until you start the next step.

## Next: the task plan

Open a new session and continue with [step 04 of the path](path.html#04-task-plan).
GitHub Spec Kit turns the approved package into tasks an agent can build from.

## Need an idea first?

Use **Idea Forge** to research an opportunity, then take the brief you pick
through Azure Solution Architect discovery and architecture approval. To learn the flow
on a prepared scenario with synthetic data, use the [worked example](example.html).

### Idea Forge prompt

```text
/idea-forge Find a bounded AI opportunity for [customer] in [industry].
Research the business and publicly stated priorities on the web.
```
