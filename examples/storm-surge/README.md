# Storm Surge worked example

A ready-made use case for teams that arrive without one. Bring your own use case if you can. It gives you a product your organisation actually needs. Use this one if you can't.

Storm Brenna (fictional) has hit the Calder Coast. Harbourline Insurance, a fictional insurer, receives claims and assistance requests faster than its teams can sort them: scanned PDFs, emails, call transcripts, broker batches, duplicates and noise. Your team builds a tool that helps an operations leader prepare a proposed, prioritised response plan, with reasons and a list of conflicts the tool cannot resolve. The tool proposes. It never dispatches anyone and never contacts customers.

The `starter/` folder holds everything a team needs: the scenario, business rules, a data dictionary, the seed prompt for Azure Solution Architect, review prompts, 200 synthetic inbox documents with policy, capacity and hazard data, the generator that produced them, a dev container and the Impeccable design skills.

## Copy the starter into your team repository

Run this in a terminal (works in Bash and PowerShell):

```bash
npx degit microsoft/frontier-agentic-cobuild-rvas/examples/storm-surge/starter my-team-app
cd my-team-app
git init
```

Then create an empty repository on GitHub for your team, push to it and open it in a Codespace. The dev container in `.devcontainer/` installs the toolchain.

To look at the example without copying it, open this repository in a Codespace and choose the **Storm Surge worked example** dev container configuration.

## Follow the day

The [co-build path](https://microsoft.github.io/frontier-agentic-cobuild-rvas/path.html) walks through the day step by step, from setup and discovery to deployment and review. Start with `starter/README.md` for the data pack.
