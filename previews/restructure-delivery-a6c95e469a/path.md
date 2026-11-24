Bring your own use case. Each step below works on your application; the
[worked example](example.html) is there if you don't have one yet.

| Band | Steps | What you do | You leave with |
| --- | --- | --- | --- |
| Agree | 01–04 | Decide what to build, with pictures before prose | A confirmed discovery, an approved architecture package, a walked prototype, a reviewed task plan |
| Delegate | 05–07 | Let agents build from the agreed artefacts | Working code, a designed interface, a deployment in your sandbox |
| Verify | 08 | Check the result against what you agreed | Review findings, each fixed or accepted by a named person |

A gate is a decision a person makes. The agent drafts and checks; it doesn't
approve. Times are what a team needs on a co-build day with a bounded use case.

## 00 Setup

**About 20 minutes.** Install the tools and open your repository.

Follow [Start](start.html#set-up-your-workspace): install the Agentic Co-build
plugin, or add the skills and the Microsoft Learn MCP server by hand. Select
Claude Opus 5.5.

**Done when** `/skills` lists Azure Solution Architect and `/mcp` lists Microsoft
Learn.

## Agree

Four steps narrow what you could build down to what you will build. Each one
removes a wrong reading before it reaches code.

### 01 Discover

**About 60 minutes · Azure Solution Architect.** Agree on the problem, the people, and
the first journey.

```text
/agentic-cobuild:azure-solution-architect [What you want to build or change, who uses
it, and the decision or task it helps with. Name what is out of scope and any
data the app must not touch.]
```

Answer the creator's questions. Before you confirm, it shows what it
understood: a swimlane of the first journey, the domain terms, the lifecycle of
any object that waits or needs approval, and success and failure scenarios.
Correct the pictures, not just the prose.

**Done when** the swimlane shows who does each step (person, AI, or fixed
system logic) and everyone in the room reads the terms the same way.

**Gate: discovery confirmed.** You tell the creator the outcome, journey, and
decisions are right.

### 02 Architect

**About 50 minutes · Azure Solution Architect, Cloud Architecture Diagram, Cost
Estimation.** Agree on the system boundary, its parts, and what it costs.

The creator continues in the same session. It writes the architecture package
under `docs/architecture/`: `solution.drawio`, `solution.md`,
`specification.md`, `implementation-plan.md`, and `cost-estimate.md`. Review the
diagrams first, then the specification's acceptance criteria.

**Done when** you can point to the system boundary, each external system has an
owner, and every acceptance criterion is testable.

**Gate: architecture approved.** Someone other than the author reviews the
package before you approve it. If nobody can, record the exception.

### 03 Wireframe

**About 20 minutes · Wireframer.** Try the journey before anyone builds it.

When the package is complete, the creator asks whether you want a clickable
prototype. Say yes. It writes a throwaway prototype under
`docs/architecture/prototype/` with synthetic data.

**Done when** someone who will use the app has clicked through the main path and
one failure path, and you've written down what surprised them.

**Gate: journey walked.** If the prototype surfaced a new requirement, update the
specification before you go on.

### 04 Task plan

**About 35 minutes · GitHub Spec Kit.** Turn the agreed package into tasks an
agent can follow.

Open a new session. Install Spec Kit if you haven't
(`uv tool install specify-cli`, Python 3.11 or later), then initialise it in your
repository on a new branch:

```bash
git switch -c feature/first-journey
specify init --here --integration copilot
```

In the chat, run `/speckit-constitution`, `/speckit-specify`, `/speckit-plan`,
and `/speckit-tasks` in that order, and review each result before the next.
Point each one at
`docs/architecture/` and tell it not to reopen settled decisions.

**Done when** every task links to an acceptance criterion, and the five
questions below are all yes.

**Gate: ready to delegate.** Answer these as a team:

1. Can we draw the system boundary?
2. Can we walk the main and failure paths?
3. Do we use one word for one meaning?
4. Have future users tried a prototype?
5. Did we agree in order?

If any answer is no, the work isn't ready for an agent. Go back to the step
that answers it.

## Delegate

Agents build from what you agreed. You watch for drift and keep the
artefacts current.

### 05 Build

**About 75 minutes · Spec Kit implement.** Let the agent build the first
journey.

```text
/speckit-implement Implement only the reviewed tasks. Treat docs/architecture/
and its acceptance criteria as authoritative. Preserve the approved
architecture and interfaces. Use synthetic data. Run the tests and report the
actual results. Do not commit, provision, or deploy.
```

Run `/speckit-converge` after each pass, and repeat implement and converge
until it reports `Converged`.

**Done when** the first journey runs locally end to end and its acceptance
tests pass.

If the build needs a decision the package doesn't make, stop and agree it.
Don't let the agent pick.

### 06 Design

**About 40 minutes · Impeccable.** Make the interface usable, accessible, and
on brand.

Install the [Impeccable](https://github.com/pbakaus/impeccable) skill if you
don't have it, then describe your product and its users so it designs for them:

```text
/impeccable critique the main journey, then polish it. Keep the behaviour and
the acceptance tests unchanged.
```

**Done when** the main journey passes a keyboard-only walk-through and the
acceptance tests still pass.

### 07 Deploy

**About 35 minutes · Azure, Microsoft Foundry.** Run the same app in your
sandbox subscription.

You need the [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli)
and the [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd).
Ask the agent to propose the deployment before it creates anything:

```text
Propose how to deploy this app to Azure Container Apps in resource group
[your sandbox resource group], following docs/architecture/solution.md. Use a
managed identity for every Azure service the app calls, including Microsoft
Foundry, with no keys in code or configuration. List the resources, roles, and
estimated monthly cost. Wait for my approval before provisioning.
```

The app should use the same credential code locally and in Azure. See
[keyless authentication with Microsoft Entra ID](https://learn.microsoft.com/azure/foundry/foundry-models/how-to/configure-entra-id)
for the Foundry role assignment.

**Done when** the deployed app passes the same acceptance tests as the local
one.

**Gate: owner approves resources.** The person who owns the subscription
approves the resource list and cost before the agent provisions.

## Verify

Check what was built against what you agreed, before anyone relies on it.

### 08 Review

**About 25 minutes · `/review`, `/security-review`.** Find what the build got
wrong.

Run the [review prompts](start.html#review-prompts) on the implementation, and
save the findings to `docs/review-findings.md`. If the app calls a model, also
try a prompt-injection input and record what happened.

**Done when** every finding is fixed or accepted, and the affected tests pass
again.

**Gate: findings resolved.** A named person fixes or accepts each finding.
Production acceptance and rollback stay with the team that operates the app.

When reality doesn't match the specification, go back to the step that
agreed it. That loop is the practice: brainstorm, agree, delegate, verify.
[Why it works](why.html).
