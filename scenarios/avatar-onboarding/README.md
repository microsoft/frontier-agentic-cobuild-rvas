# Avatar Scenario: build an application people can verify

Build an accessible avatar-led experience on Azure and Microsoft Foundry. The sample focuses on
employee onboarding, and the pattern also fits approved learning or support content. Every
published statement must trace to an approved source and named reviewer. Tell users when media is
synthetic. Owners must be able to withdraw the published version when a source changes.

**Build an interactive assistant or a repeatable content-production application.** Choose the
application goal before deciding whether it needs an avatar. Neither goal is the default.
The batch path includes rendering instructions; the modules identify the workflow and channel
integrations you must build around generation.
The [reference guide](accelerator/README.md) explains the reusable code and its limits.

> **Fictional data only.** The accelerator ships synthetic HR content. Never place real customer
> content, or a real person's voice or likeness, in this repository. **Keyless-first:**
> `DefaultAzureCredential` + managed identity + RBAC — never keys in code or Bicep.

## The 7 modules

| Module | You build | Path guidance |
| --- | --- | --- |
| [1. Choose the application goal](lessons/01-experience-selection.md) | An agreed application scope and acceptance statement | Interactive assistant or content production; then choose the media format |
| [2. Connect the foundation](lessons/02-foundation.md) | Runtime access to the resources the experience needs | Existing approved environment first |
| [3. Governed content pipeline](lessons/03-content-pipeline.md) | Versioned, owned claims | Blob + typed claim set |
| [4. Grounded authoring or live answers](lessons/04-grounded-assistant.md) | Cited drafts or bounded answers, only if needed | Skip generation when wording is already approved |
| [5. Connect generation to the application](lessons/05-experience-generation.md) | A rendering adapter or live client with accessible alternatives | Batch jobs for content production; live rendering for interaction |
| [6. Gate publication behind human approval](lessons/06-approval-gating.md) | Authorized release and withdrawal in the actual channel | Customer's publishing or approval system |
| [7. Evaluate, red-team, trace, operate](lessons/07-prove-and-operate.md) | Release evidence and a scorecard | Scenario checks plus managed evaluation |

Module 1 maps the path for your application. For content production, **approve source wording
in module 3 before rendering a private preview in module 5.** Module 6 approves publication and
proves withdrawal. For an assistant, approve the source boundary and application behavior;
individual live answers do not receive per-video approval.

## Build in your environment

Use a customer-owned private repository for adapters and deployment settings. Keep approved
content in its existing system of record. The fictional onboarding pack illustrates the claim
contract; replace its wording and reviewer identities in your private application.

Before building, choose the portal, learning platform, or application that will serve the result.
Assign an engineer to connect generation to that channel and an owner to approve releases.
**A working application is required.** For an assistant, prove a supported task and a
refusal through the authenticated client. For content production, prove a source update through
generation and approved publication, including recovery from a failed job. In both cases, prove
withdrawal through the actual user channel. One generated video is only an integration check.

## Decision gates for the customer conversation

Answer these questions before building:

| Gate | Decide before building |
|---|---|
| Application goal | Are we building interactive assistance or repeatable content production, and what proves it works? |
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

## Start the build

Begin with [module 1](lessons/01-experience-selection.md). In module 2, connect the approved
environment before considering new resources. The optional reference template creates a broader
demo footprint; do not deploy it unchanged into an existing tenant.

## Responsible AI

Standard avatar + standard neural voice needs **no** registration, but synthetic-media **disclosure**
to users and a feedback channel are still required. **Custom** avatar / **custom** or **personal**
voice is **Limited Access** (registration only, Microsoft-managed customers), and custom video avatar
requires actor consent and advance disclosure to the talent. Module 1 records the exact gates for
your chosen capability; Module 7 proves them before any release.
