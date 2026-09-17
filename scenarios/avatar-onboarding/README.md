# Avatar Scenario: build an experience people can verify

Build an accessible avatar-led experience on Azure and Microsoft Foundry. The sample focuses on
employee onboarding. You can also use the pattern for approved learning or support content. Every
published statement must trace to an approved source and named reviewer. Tell users when media is
synthetic. When a source changes, owners must be able to withdraw the published version.

The course builds the default path. Each module compares Microsoft options and marks where you can
switch to another approved service. See [`solution.md`](accelerator/solution.md) for the reference
implementation. Start deployment in
[`accelerator/README.md`](accelerator/README.md).

> **Fictional data only.** The accelerator ships synthetic HR content. Never place real customer
> content, or a real person's voice or likeness, in this repository. **Keyless-first:**
> `DefaultAzureCredential` + managed identity + RBAC — never keys in code or Bicep.

## The 7 modules

| Module | You build | Default path |
| --- | --- | --- |
| [1. Select the experience capability](lessons/01-experience-selection.md) | An evidence-backed capability decision | Speech **batch avatar**, standard voice |
| [2. Provision the foundation](lessons/02-foundation.md) | Foundry and Speech resources with observability | Scenario Bicep, managed identity |
| [3. Governed content pipeline](lessons/03-content-pipeline.md) | Versioned, owned claims | Blob + typed claim set |
| [4. Grounded assistant](lessons/04-grounded-assistant.md) | Cited answers and unsupported-claim refusals | Model + approved claim set; agent optional |
| [5. Generate the accessible experience](lessons/05-experience-generation.md) | Approved avatar video with disclosure and text alternatives | Batch synthesis |
| [6. Gate publication behind human approval](lessons/06-approval-gating.md) | Exact-revision approval and withdrawal | Demo approval record checked in code |
| [7. Evaluate, red-team, trace, operate](lessons/07-prove-and-operate.md) | Release evidence and a scorecard | Scenario checks plus managed evaluation |

**Work through these modules in order.** The default path includes its required steps and
uses one claim set throughout. You do not need a separate grounding or voice curriculum.

## Decision gates to carry into the customer conversation

Answer these questions before building:

| Gate | Decide before building |
|---|---|
| Experience boundary | Why does avatar, voice, audio, or video improve the outcome compared with a typed experience? |
| Content boundary | Which claims are approved, versioned, owned, expirable, and traceable to source evidence? |
| Consent boundary | Which likeness, voice, disclosure, accessibility, and fallback rules apply before generation? |
| Approval boundary | Which roles approve factual accuracy, compliance, brand, and source ownership for each revision? |
| Operating boundary | What evaluation, red-team, trace, feedback, and withdrawal evidence is required before release? |

## Working contract

- **Approved content is the publishing boundary.** A grounded assistant can cite permitted sources
  for interactive help. It cannot silently add claims to a published script.
- **Human approval is a release gate.** Factual/SME, legal/compliance, brand, and content-owner
  decisions must approve an exact script revision before anything publishes.
- **Accessibility is a first-class output.** Every experience ships a transcript, captions (where the
  capability supports them), an equivalent non-avatar fallback, a human-help path, and a clear
  AI/avatar disclosure.
- **Consent and privacy are non-negotiable.** Never clone a real voice or likeness without recorded
  authorization. Custom avatar/voice is an Azure limited-access feature. Keep pilot telemetry
  aggregate and identifier-free.
- **Withdrawal is part of the build.** A source change, consent withdrawal, safety issue, or defect
  must identify and pause the affected revision.

## Quick start

Run commands from the repository root.

```bash
# Deploy the keyless foundation (writes accelerator/.env):
scenarios/avatar-onboarding/accelerator/scripts/deploy.sh rg-avatar-onboarding westus2
```

Then work through the modules in order. Each **Verify** section gives you a command and explains
its output. The reference snippets and remaining integration work are in
[`solution.md`](accelerator/solution.md).

## Responsible AI

Standard avatar + standard neural voice needs **no** registration, but synthetic-media **disclosure**
to users and a feedback channel are still required. **Custom** avatar / **custom** or **personal**
voice is **Limited Access** (registration only, Microsoft-managed customers), and custom video avatar
requires actor consent and advance disclosure to the talent. Module 1 records the exact gates for
your chosen capability; Module 7 proves them before any release.
