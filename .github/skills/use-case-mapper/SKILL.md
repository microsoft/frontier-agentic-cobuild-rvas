---
name: use-case-mapper
description: "Break a customer's business use case into parts, map each part to scenario modules across tracks, and make adaptation and uncovered work explicit. Use when a team already has a use case and needs to know what the kit covers."
argument-hint: "A short description of the use case. Optional: users, systems, data sources, and known constraints."
---

## Context

Use this skill when the team knows what the customer wants to build. It answers one question:
**which parts of this use case does the kit help build, and what is left?**

If the team only knows the customer or industry, run `customer-activity-forge` first. Its top idea
becomes the input here.

The result is a draft for the customer conversation. It is not an architecture approval or a
delivery commitment.

## Input

**Required**
- `use_case`: what the customer wants to happen, in plain words.

**Optional**
- `users`: who uses the result and who approves or reviews it.
- `systems`: business systems the solution reads from or writes to.
- `data`: documents, knowledge sources, or data products involved, with owners if known.
- `constraints`: environment, access, compliance, or timing limits already agreed.

If the use case is too vague to split into steps, ask one or two questions before mapping. Ask
what starts the process and what the finished result is.

## Process

### 1. Load the current tracks

Read every `scenarios/*/manifest.json`. Use `id`, `name`, `tagline`, `customer_outcome`, and each
`build_modules` entry (`id`, `title`, `summary`, `outcome`). Open a module's lesson file when the
summary is not enough to judge fit.

**Do not work from memory or a fixed list.** Tracks get added. A folder without a manifest is not
a supported track yet.

### 2. Restate the use case

In three to five lines, write down:

- who it is for;
- what starts it;
- what it produces;
- who owns the result.

Mark anything you assumed with ⚠️ so the customer can confirm it.

### 3. Break it into parts

List the steps the solution has to do, in order. Describe each step by what happens, not by
product: "read the fields from a submitted invoice", "answer a policy question from approved
content", "create the supplier record after a person approves it".

Keep steps small enough that each one maps to one or two modules. Five to eight parts is usually
enough. Add a part for evaluation and one for how users reach the solution when the use case
needs them.

### 4. Map each part to modules

For each part, name the track and the module IDs that help build it, then give a fit:

| Fit | Meaning |
|---|---|
| **Covered** | The module's default path builds this part. The customer supplies their own data and settings. |
| **Adapt** | The module shows the pattern, but the team must change code, schema, or integration to fit. Say what changes. |
| **Not covered** | No module builds this. Write `New pattern needed` and describe the gap. |

Rules:

- **A partial match is not coverage.** If a module covers half a part, mark it **Adapt** and name the missing half.
- Several tracks each have their own foundation, evaluation, and deployment modules. Pick the one from the track that holds the core of the use case. Don't list the same kind of module three times.
- Integrations with the customer's business systems are almost always **Adapt** or **Not covered**. The accelerators use local samples.
- Don't name a product or platform for a part until the customer's ownership, access, and licensing are known. Say which choice is open.

### 5. Order the work

Put the selected modules in build order, keeping each module's prerequisites. Then suggest the
smallest first slice: the few parts that prove the main outcome with a safe sample and a result
the customer can check.

## Output

Return these sections in order.

#### Use case

The restatement from step 2.

#### Map

| # | Part of the use case | Track and module(s) | Fit | Customer-specific work |
|---|---|---|---|---|
| 1 | … | Content Understanding: `typed-extraction` | Adapt | Define the invoice fields and test on ten real samples. |

Link each track to `docs/scenario.html?id=<manifest id>` and each module to
`docs/lesson.html?scenario=<manifest id>&lesson=<module id>`.

#### Build order and first slice

The ordered module list, then the first slice in two or three sentences.

#### Gaps and open questions

- Every **Not covered** part, with what a new pattern would need.
- The questions the customer must answer before planning sessions, such as source owner, access
  boundary, target system, and approved environment.

If most parts come back **Not covered**, say so plainly. The use case probably needs a custom
co-build. Suggest contacting the Microsoft Cloud Solution Architect.

## Anti-patterns

- Mapping the whole use case to one track because its headline sounds similar.
- Hiding uncovered work, or moving it to a footnote.
- Citing modules that aren't in a manifest.
- Treating module durations as an estimate for the customer's full implementation.
- Recommending a landing zone or production deployment for the first slice.
