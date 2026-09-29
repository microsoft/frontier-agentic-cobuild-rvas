# Repository instructions

Use the law of diminishing returns. Add material only when it changes the
reader's understanding, decision, or next action.

## Writing

Before drafting, editing, or returning repository prose, invoke
`/humanize-writing`. This applies to technical documentation, session kits,
runbooks, Markdown, and user-facing explanations.

Use the **clear-thinker** voice unless the user asks for another voice. Preserve
technical facts, Microsoft product names, dates, citations, and governance terms.

### Write for competent engineers

- Lead with the point.
- Use short, direct sentences and concrete verbs.
- Name the actor when it matters.
- Keep one main idea in each sentence.
- Prefer ordinary words to formal or bureaucratic language.
- Explain complexity only when the subject needs it.
- Use strategic **bold** text to guide scanning.

Write “validate,” not “perform validation of.” Write “configure,” not “provide
configuration of.” Say “If you already implemented these controls elsewhere,
check that they match the requirements below,” not “confirm the required state in
the table below.”

### Keep only live information

Remove introductions that only announce the next section, generic benefits,
repeated conclusions, and obvious explanations. Do not add steps or deliverables
unless they help the reader act.

Treat the repository as the source of truth for commands, scripts, configuration,
and directory layout. Document unwritten conventions, reasons, and non-obvious
gotchas instead of copying information agents can look up.

### Finish the prose

Read every sentence aloud as if explaining it to a colleague. Keep it only if it
has a clear subject, a simple verb, and information worth saying. Then apply the
`/humanize-writing` AI-pattern dictionary.
