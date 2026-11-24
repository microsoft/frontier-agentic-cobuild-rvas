A co-build day takes a team from an idea to a reviewed application in its own
Azure sandbox. The morning is spent agreeing on what to build; the afternoon is
spent delegating the build and checking the result. Each team works on one use
case in its own repository, following [the path](path.html).

## Before the day

Ask each team for its own use case at least a week ahead. A team's own problem
keeps people engaged, and what they build is still useful after the day. Use the
[worked example](example.html) only for a team that has no use case, can't use
its data yet, or wants to learn the flow first.

For each team, agree:

- **The use case.** One user, one journey, one decision or task the app helps
  with. Small enough to build in an afternoon.
- **The people.** Someone who knows the business process and can answer
  questions, someone who will use the app, and an owner who can approve the
  architecture.
- **The data.** Synthetic data, or real data with written approval from its
  owner. Default to synthetic.
- **The sandbox.** One Azure resource group per team, with permission to create
  Azure Container Apps and Microsoft Foundry resources, and a named person who
  approves what gets deployed.
- **The tools.** GitHub Copilot with access to Claude Opus 5.5, and either the
  plugin or the skills installed. See [participant requirements](participant-requirements.html).

If the business context is spread across several people, run a
[discovery session](discovery-session.html) before the day.

## Agenda

| Time | Step | Band | What the team has at the end |
| --- | --- | --- | --- |
| 09:00 | [Agree before you delegate](why.html) | | The practice and the five questions |
| 09:30 | [00 Setup](path.html#00-setup) | | Tools installed, repository open |
| 09:50 | [01 Discover](path.html#01-discover) | Agree | Confirmed discovery |
| 10:50 | Break | | |
| 11:00 | [02 Architect](path.html#02-architect) | Agree | Approved architecture package |
| 11:50 | [03 Wireframe](path.html#03-wireframe) | Agree | A prototype a user has walked |
| 12:10 | Lunch | | |
| 13:00 | [04 Task plan](path.html#04-task-plan) | Agree | Reviewed tasks, five questions answered |
| 13:35 | [05 Build](path.html#05-build) | Delegate | The first journey running locally |
| 14:50 | Break | | |
| 15:00 | [06 Design](path.html#06-design) | Delegate | A usable, accessible interface |
| 15:40 | [07 Deploy](path.html#07-deploy) | Delegate | The app running in the team's sandbox |
| 16:15 | [08 Review](path.html#08-review) | Verify | Findings fixed or accepted |
| 16:40 | Show and tell | | Each team demos its journey and one thing the pictures caught |
| 17:00 | Close | | |

The morning matters most. If time runs short, cut design or deployment, not
discovery or architecture.

## Rules for the room

- **Synthetic data** unless the data owner approved real data in writing.
- **The AI suggests; a named person decides.** If the app uses AI, its output
  is a proposal that a person accepts or rejects.
- **Agree before you build.** No implementation before the architecture is
  approved and the five questions are all yes.
- **Deploy only to the team's sandbox**, after its owner approves the resource
  list.

## Facilitating

Open with the talk. Present it from the [Why page](why.html), or download the
PDF there.

During the morning, watch for teams that skim the creator's questions to get to
code. Ask them to show you the swimlane and explain who does each step. If they
can't, they aren't ready to confirm discovery.

At each gate, ask who approved it. The answer should be a person in the room,
not the agent.

In the afternoon, the common failure is the agent making a decision the package
didn't. When a team says "it decided to…", send them back to agree it and update
the specification.

At show and tell, ask each team what the diagrams or the prototype caught before
the build. That's the evidence that the practice worked.
