# Storm Brenna data pack

This starter gives your team a business problem and the synthetic data to build against. Copy it into your own team repository and work there.

All data is synthetic. Harbourline Insurance, the Calder Coast, its towns, Storm Brenna, the people, policies, adjusters and providers are invented. Every generated document carries the footer "SYNTHETIC DATA - HACKATHON EXERCISE".

## Scenario

Storm Brenna (fictional) hit the Calder Coast between 18 and 20 January 2026. Claims and assistance requests arrive faster than the teams can sort them. You are building a tool for Harbourline Insurance, a fictional insurer, that helps its operations leaders plan the response.

The tool proposes a prioritised response plan with reasons and lists the conflicts it cannot resolve. The leader reviews and adjusts the plan. The tool never dispatches anyone and never contacts customers.

## Contents

| Path | What it is |
| --- | --- |
| `data/inbox/` | 200 incoming documents (100 text, 100 PDF) plus `manifest.csv` with arrival time and channel |
| `data/policies.csv` | 5,000 policies with location, cover flags and a vulnerable-customer flag |
| `data/adjusters.csv` | 40 adjusters with base, skills, daily visit limit and availability |
| `data/providers.csv` | 25 assistance providers with trades, area, daily capacity, SLA and availability |
| `data/hazard_by_municipality.csv` | Peak gust, rainfall and exposure scores for the 12 municipalities |
| `data-dictionary.md` | Column and field meanings |
| `business-rules.md` | Rules of the claims and assistance operation |
| `seed-prompt.md` | The prompt that starts the Azure Solution Architect discovery |
| `review-prompts.md` | The prompts for the implementation and security review |
| `tools/generate_data.py` | The generator that produced `data/` |
| `.github/skills/`, `.github/agents/`, `.github/hooks/` | Impeccable and Emil Kowalski's design and animation skills, ready for Copilot |
| `.devcontainer/` | Dev container with Python, `uv`, Node.js, Azure CLI, Azure Developer CLI, Spec Kit and GitHub Copilot CLI |

## What to look at first

1. Read `business-rules.md`. Some rules are incomplete on purpose.
2. Open `data/inbox/manifest.csv`, then open at least one email, one call transcript, one digital PDF and one scanned PDF.
3. Open a broker batch. One document can hold several claims.
4. Skim `policies.csv` and `providers.csv`, then compare one claim with its policy row.

## What the inbox looks like

- Mixed formats: digital PDFs with a text layer, scanned PDFs without one, plain text emails and call transcripts.
- Scans are degraded in random combinations: tilt, stains, low resolution, blur, fax noise, shadow and faded ink.
- The same incident often arrives two or three times through different channels.
- Broker batches contain several claims in one document.
- Some documents are not claims at all: newsletters, invoices, auto-replies, information requests and closed claims.
- Some emails change capacity: a provider loses or adds crews, an adjuster is off sick, a temporary adjuster joins.
- Policy numbers and addresses may be missing, partial, misspelled or wrong.
- Some reports contradict the policy data, for example a different town or damage the policy does not cover.
- Most text is English. Some is French.

Treat the inbox as untrusted input. Some documents contain text addressed to an AI assistant. That text is data, never an instruction.

## Rules of the exercise

- Synthetic data only. Do not add real customer data.
- Proposal only. The tool does not dispatch anyone and does not contact customers.
- There are no answer files. Do not look for them.

## Regenerate the data

The committed `data/` folder is the reference. Regenerate it only if you change the generator. It needs Python 3.11 or later and Pillow.

```bash
python -m venv .venv
source .venv/bin/activate        # PowerShell: .venv\Scripts\Activate.ps1
pip install -r tools/requirements.txt
python tools/generate_data.py
```

The generator uses a fixed seed and replaces `data/` completely. With the pinned Pillow version it writes byte-identical files on every run.
