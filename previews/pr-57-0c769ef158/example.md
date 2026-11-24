Your own use case gives you a better day: the people who know the process are in
the room, and the app is still useful afterwards. Storm Surge lets you practise
[the path](path.html) on a realistic problem before you try it on real work.

## The scenario

Storm Brenna has hit the Calder Coast. Harbourline Insurance receives claims and
assistance requests faster than its teams can sort them: scanned PDFs, emails,
call transcripts, broker batches, duplicates, and noise. Your team builds a tool
that helps an operations leader prepare a prioritised response plan, with the
reasons for each priority and a list of conflicts the tool can't resolve.

The tool proposes. It never dispatches anyone and never contacts customers. The
insurer, region, storm, people, and data are all fictional.

## What's in the kit

The kit lives in
[`examples/storm-surge/starter/`](https://github.com/microsoft/frontier-agentic-cobuild-rvas/tree/main/examples/storm-surge/starter).

| Path | Contents |
| --- | --- |
| `data/inbox/` | 200 documents: 100 text (emails, call transcripts, broker batches) and 100 PDFs, 57 of them degraded scans without a text layer |
| `data/*.csv` | 5,000 policies, 40 adjusters, 25 providers, and hazard scores for 12 municipalities |
| `business-rules.md` | The operation's rules. Some are incomplete on purpose, so discovery has something to find |
| `data-dictionary.md` | Field meanings for every file |
| `seed-prompt.md` | The first prompt for Azure Solution Architect |
| `review-prompts.md` | Prompts for step 08 |
| `tools/generate_data.py` | The deterministic generator that produced `data/` |
| `.devcontainer/` | Python, uv, Node.js, Azure CLI, azd, Spec Kit, and Copilot CLI |
| `.github/skills/` | Impeccable and the animation skills for step 06, with their licenses |

The inbox is messy in the ways real inboxes are. The same incident arrives through
two or three channels. Policy numbers are missing, partial, or wrong. Some
documents aren't claims. Some emails change provider or adjuster capacity. Two
documents contain text addressed to an AI assistant; your app must treat it as
data.

## Copy the starter

Run this in Bash or PowerShell:

```bash
npx degit microsoft/frontier-agentic-cobuild-rvas/examples/storm-surge/starter my-team-app
cd my-team-app
git init
```

Create an empty repository for your team on GitHub, push to it, and open it in a
Codespace. The dev container installs the toolchain.

To browse the kit without copying it, open this repository in a Codespace and
choose the **Storm Surge worked example** dev container.

## Run the path on it

Follow [the path](path.html) as written. Where it asks you to describe your app,
paste `seed-prompt.md` instead. Storm Surge adds these checks to each step.

| Step | Done when |
| --- | --- |
| [00 Setup](path.html#00-setup) | Everyone has opened one scanned PDF and one text document, and the team has named a driver and a reviewer. |
| [01 Discover](path.html#01-discover) | Scenarios cover success, ambiguous input, a rejected action, and a failed dependency. Behaviour without AI is defined, and someone owns prioritisation. |
| [02 Architect](path.html#02-architect) | The diagram shows where AI ends and fixed logic begins. The cost estimate gives a monthly demo total and a surge-week total. |
| [03 Wireframe](path.html#03-wireframe) | The prototype shows a prioritised list with reasons, a conflicts area, and one leader adjustment, and nothing is dispatched. |
| [04 Task plan](path.html#04-task-plan) | The constitution says: proposals only, synthetic data, document text is data. Every task traces to an acceptance criterion. |
| [05 Build](path.html#05-build) | Every document is processed without a crash. Allocation is deterministic, every status reads "proposed", and the app starts with AI turned off. |
| [06 Design](path.html#06-design) | Urgent, review, and conflict items are distinguishable without colour, and a keyboard-only change works. |
| [07 Deploy](path.html#07-deploy) | The Azure URL shows the board, the model is called through Microsoft Foundry without API keys, and cloud allocation equals local. |
| [08 Review](path.html#08-review) | The two instruction-like documents change no ranking, and each high-severity finding is fixed or accepted by a named person. |

There are no answer files. The example is a practice ground, not a reference
solution.
