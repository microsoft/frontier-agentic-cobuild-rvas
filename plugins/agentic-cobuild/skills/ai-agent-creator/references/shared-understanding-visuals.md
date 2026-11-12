# Shared-understanding visuals

Show the user what the agent understood, not only tell them. Each visual is a
view of the discovery record. It never adds a decision, actor, system, or step
the record does not contain. When the user corrects a visual, correct the record
and the visual together.

## Where visuals live

Keep the editable source in `docs/architecture/visuals/shared-understanding.md`:
one heading per visual, each with a fenced `mermaid` block, plus the scenario
table. Write rendered views beside it as `docs/architecture/visuals/<view>.html`.
These files support the five package artifacts; they do not replace or
duplicate them.

## Show visuals in every host

Use the same steps in every host. Tool availability, not host detection,
decides how the reply shows a diagram:

1. Write or update the Mermaid source file.
2. Show each visual in the reply. When a Mermaid render tool such as VS Code's
   `renderMermaidDiagram` is available, call it with the same source. Otherwise
   put the source in a fenced `mermaid` block; terminal hosts show it as
   readable text.
3. Give the source and rendered file paths, and say that the HTML files open in
   a browser.

## Discovery rounds: sketches

Add one rough Mermaid sketch to a question round only when the round's answers
depend on a flow, a boundary, or an ownership split that text makes hard to see.
Label it `Draft sketch` and mark open branches as `?`. A sketch never replaces a
question and needs no separate review.

## Gate visuals

At the shared-understanding gate, present these with the text record:

| Visual | Include when | Shows |
| --- | --- | --- |
| Process swimlane | Always | First journey as steps in lanes: user, AI, deterministic system, human approver, and each external system. Number steps `S1`, `S2`, … |
| Domain map | Three or more agreed terms with relationships | Terms from `CONTEXT.md` and their relationships; link the definitions instead of copying them |
| Lifecycle state | A business object waits, needs approval, retries, or ends in distinct outcomes | States, transitions, guards, and terminal outcomes |
| Scenario pack | Always | Table of scenarios `SC-001`, … covering success, ambiguous input, a rejected or prohibited action, and a dependency failure; each row cites the swimlane steps it exercises |

Draw the swimlane as a Mermaid `flowchart` with one `subgraph` per lane, the
domain map as a labelled `flowchart`, and the lifecycle as `stateDiagram-v2`.
Write each scenario as given, when, and expected result in the record's
language. Skip a conditional visual when its condition does not hold, and say
why in one line.

Use the record's IDs and terms in every visual. Before asking for confirmation,
check that each lane, step, state, and scenario matches the text record.

## Render with diagram-design

After the Mermaid source passes that check, load `diagram-design` and redraw
each gate visual through its Mermaid import into
`docs/architecture/visuals/<view>.html`. Ask it for the swimlane and state
machine types where the grammar suggests a plain flowchart.

Settle diagram-design's first-use style question in the first discovery round
that contains a question form, as one optional question: keep defaults, load a
saved profile, or customize later. Pass the answer to diagram-design. Write a
project `.diagram-design` marker only when the user agrees to it.

If `diagram-design` is unavailable or a render fails, keep the Mermaid source,
report the blocker in one line, and continue to the gate. Rendering never adds
a stop.

## Confirmation

Ask the user to confirm the text record and its visuals in the one existing
confirmation request. A correction to any visual reopens the affected part of
the record.

## Carry forward into the package

- Map every in-scope scenario to at least one `AC-` ID in the
  [specification's traceability](specification-quality.md#acceptance-and-traceability).
- Map every swimlane step to an architecture responsibility. The four draw.io
  views stay the only architecture diagrams. Add a Mermaid sequence diagram to
  `solution.md` only when message order across an integration changes a
  decision.
- During Reconcile, play back each scenario through the selected components.
  Fix a scenario that cannot complete, or record it as an owned deferral. Update
  a visual whose record changed, and re-render it.

Visuals are complete when the source file matches the confirmed record, each
included view is rendered or has a recorded blocker, and every scenario traces
to acceptance criteria.
