<!--
Slide source for docs/why.html and docs/assets/slides/agree-before-you-delegate.pdf.
docs/deck.js renders this file; run `node docs/build.js` after editing, then
`npm run export:slides` to refresh the PDF and its source hash.

Format
- Slides are separated by a line containing only `---`.
- Each slide starts with `<!-- slide: id=<kebab-id> layout=<layout> [stage=<step>] -->`.
  Layouts: title, compare, quote, visual, gaps, principles, table, steps,
  pair, model, leaders, questions, prototype. `stage` (ask, sketch, draw,
  specify or click) adds the five-step strip with that step highlighted.
- The `## heading` is the slide title. A paragraph directly before it is the
  kicker shown above the title.
- `::: name` opens `<div class="name">` and a line with only `:::` closes it.
  Fenced blocks may nest.
- `<!-- visual: name -->` on its own line embeds docs/slides/visuals/name.svg
  (or name.html).
- Speaker notes follow a line containing only `Notes:`. They are Markdown and
  appear as reading prose under each slide on why.html.
-->

<!-- slide: id=title layout=title -->

## Agree before you <span>delegate</span>

Shared understanding in AI-assisted software delivery

<!-- visual: title-mark -->

Notes:

Thank you for having me. Over the next thirty minutes I want to talk about a pattern we see as teams adopt AI coding agents. Agents are getting very good at turning a specification into working software, often in hours. What they can't do is tell us whether we asked for the right thing. So the argument today is simple: before we delegate work to agents, we need visible, checkable agreement on what to build. The material draws on established work by Fred Brooks, Barry Boehm, Eric Evans and Simon Brown. We'll keep time for discussion at the end.

---

<!-- slide: id=problem layout=compare -->

The problem

## Two common ways to use agents

::: cols
::: col
### Assistant

Speeds up individual tasks

**Limited gains**
:::
::: col
### Autonomous builder

Builds a whole app from a brief

**Fast, but the wrong thing**
:::
:::

::: band
What both lack

Agreement on what to build, before the build starts.
:::

Notes:

Most organisations we work with use agents in one of two ways. The first is as an assistant: code completion, tests, documentation. It speeds up individual tasks, and the gains are real but limited. The second is as an autonomous builder: we describe an application and the agent produces the whole thing. That is fast, but it often produces something other than what the requester meant. The two approaches look very different, yet they lack the same layer: a reliable way for the people who want a system and the agents building it to agree on what the system is before the build starts. That missing layer is the subject of this talk.

Source: 'Agree before you delegate'.

---

<!-- slide: id=why-now layout=quote -->

Why now

## AI moves the bottleneck

> “The hardest single part of building a software system is deciding precisely what to build.”
>
> Fred Brooks, *No Silver Bullet* (1986)

::: stack
::: panel
### Accidental complexity

Expressing the solution in code

**Agents reduce it**
:::
::: panel panel-focus
### Essential complexity

Understanding the problem

**Now the bottleneck**
:::
:::

Notes:

Fred Brooks made this point in 1986, in his essay 'No Silver Bullet'. He wrote that the hardest single part of building a software system is deciding precisely what to build. He separated essential complexity, which is understanding the problem, from accidental complexity, which is the effort of expressing a solution in code. In our experience, agents reduce accidental complexity a great deal: they write, wire and test code quickly. They don't reduce essential complexity, because that depends on knowledge of the business, its rules and its people. So the bottleneck doesn't disappear. It moves, from writing code to deciding what the code should do.

Sources: Brooks, 'No Silver Bullet' (1986); 'Agree before you delegate'.

---

<!-- slide: id=boehm layout=visual -->

Why now · Boehm, Software Engineering Economics (1981)

## The later we find it, the more we redo

<!-- visual: boehm -->

Notes:

This changes where delivery risk sits. When implementation took weeks, misunderstandings surfaced along the way, in conversations, demos and code reviews. Now an agent can finish the build before anyone has looked at what it is building. Barry Boehm showed in 'Software Engineering Economics', published in 1981, that a requirements error costs substantially more to fix the later it is found, because each stage builds more work on top of it. The chart shows the shape of that argument. The timings are illustrative, not measured data, and the two highlighted bars refer to the fictional example coming up. Agents make the build faster. They do not make rework cheaper.

Sources: Boehm (1981); figure from 'Agree before you delegate'.

---

<!-- slide: id=prose-gaps layout=gaps -->

Why a specification is not enough

## Prose hides gaps

::: gaps-copy
Two readers can agree with every sentence and still picture different systems.

An agent rarely asks. It builds the most plausible reading.
:::

<!-- visual: prose-gaps -->

Notes:

A natural reaction is to write a better specification. Prose is good at nuance, but it is poor at exposing gaps. Two readers can agree with every sentence of a requirements document and still picture different systems, because each fills the ambiguity with their own assumptions without noticing. A colleague might stop and ask what a term means. An agent rarely does, unless our process requires it. It takes the most plausible reading and builds on it. And a longer specification doesn't solve this; it adds more text to misread. So the answer isn't more words. It's a different kind of artefact, one that people can look at and challenge.

Source: 'Agree before you delegate'.

---

<!-- slide: id=practice layout=principles -->

The practice

## Agree before you delegate

::: statement
Reach visible, checkable agreement on what to build before handing implementation to agents.
:::

1. Pictures before prose
2. Agree progressively, in order
3. Engineers act as the stakeholder
4. Agreement stays with people

Notes:

We use the phrase 'agree before you delegate' for a simple practice: reach visible, checkable agreement on what to build before handing implementation to agents. Visible means people can look at it. Checkable means someone can say 'that's wrong' before any code exists. The practice rests on four principles. First, pictures before prose. Second, agree progressively, in order. Third, engineers act as the stakeholder when they commission work from agents. Fourth, agreement stays with people, even as verification becomes more automated. These are techniques software engineering already has. What has changed is that agents make skipping them riskier, and producing them quicker.

Source: 'Agree before you delegate'.

---

<!-- slide: id=principle-1 layout=table -->

Principle 1

## Pictures before prose

A diagram forces decisions that prose can leave open.

| Technique | The question it answers |
| --- | --- |
| C4 model *· Simon Brown* | What is inside, and who is outside? |
| Sequence and swimlane diagrams | Who does each step, in what order? |
| Ubiquitous language *· Eric Evans* | Does one word have one meaning? |
| State machines | How does a business object change state? |
| Wireframes and prototypes | What will using it be like? |

Notes:

Software engineering has spent decades building techniques that help requesters and builders picture the same system, and each answers one question for one audience. Simon Brown's C4 model shows the system boundary, the containers inside it, and the people and systems around it. Sequence and swimlane diagrams show behaviour and who owns each step. Eric Evans's ubiquitous language, from 'Domain-Driven Design', keeps one word for one meaning across the business and the code. State machines show how a business object moves through approvals, waits and retries. Wireframes and prototypes show what using the system will be like. You can write 'the system handles requests' without saying whose; you can't draw the submitter without labelling the box.

Sources: Brown; Evans.

---

<!-- slide: id=principle-2 layout=steps -->

Principle 2

## Agree progressively, in order

<!-- visual: steps -->

::: pair-copy
Each step narrows the range of possible systems before the next adds detail.

Skip a step, and a wrong assumption reaches code unchallenged.
:::

Notes:

Shared understanding is built in steps, and each step narrows the range of possible systems before the next one adds detail. Ask: clarify the problem, who it's for and what's out of scope. Sketch: agree a high-level plan and the first user journey, including which steps belong to a person, the AI and fixed system logic. Draw: agree the context, containers, deployment, and data and AI flows. Specify: write testable behaviour and acceptance criteria that trace back to the diagrams. Click: let future users try a throwaway, low-fidelity prototype with synthetic data. The order matters. In our example, the architect went from planning documents straight to code, so a wrong assumption reached working software unchallenged.

Source: 'Agree before you delegate'.

---

<!-- slide: id=principles-3-4 layout=pair -->

Principles 3 and 4

## Sign-off stays with people

::: cols
::: col
<p class="numeral">03</p>

### Engineers act as the stakeholder

Review an agent’s proposal like a supplier’s: see it, try it, then sign off.
:::
::: col
<p class="numeral">04</p>

### Agreement stays with people

Agents help us brainstorm and verify. Deciding what to build stays human.
:::
:::

Notes:

Two shifts in our role. Traditionally, developers and architects received requirements, and someone from the business signed off a mock-up or demo. When agents do more of the implementation, we are the ones commissioning the work. So we review an agent's proposal the way a business stakeholder reviews a supplier's: by looking at it and trying it, and signing off only when we can see the system we want. Second, we brainstorm with agents, agree with them and verify their work. Verification is increasingly automated, through generated tests, automated code review and agents checking agents. Deciding what is right to build, for whom and within which constraints remains a human responsibility.

Source: 'Agree before you delegate'.

---

<!-- slide: id=model layout=model -->

The model

## Brainstorm, agree, delegate, verify

<!-- visual: loop -->

::: model-copy
Once the pictures are agreed, delegation becomes lower risk.

The quality of the agreed input matters more than the choice of framework.
:::

Notes:

Here is the model that ties it together. We brainstorm with agents, which drafts the shared understanding: glossary, diagrams, prototype and specification. People agree by signing off on pictures. Agents then implement from the agreed specification, and we verify their work through tests and review. When reality doesn't match the specification, we go round again. Once the pictures are agreed, delegation becomes lower risk: the specification is anchored to artefacts people have reviewed, and acceptance criteria map to scenarios they have walked through. A spec-driven development approach can then drive the agents, and the quality of the agreed input matters more than the choice of framework.

Source: 'Agree before you delegate'.

---

<!-- slide: id=leaders layout=leaders -->

For engineering leaders

## What changes for engineering leaders

1. Ask who has seen it, not who has read it
2. Plan time for agreement as well as build
3. Keep the agreed artefacts with the code
4. Track rework as well as throughput

Notes:

Four things change for engineering leaders. First, ask who has seen it, not who has read it: sign-off on a diagram or prototype holds up better than sign-off on a document someone skimmed. Second, plan time for agreement as well as build. As agents shorten implementation, agreement takes a larger share of the schedule, so budget for it explicitly. Third, keep the agreed artefacts with the code. Versioned diagrams, glossary, specification and prototype give agents a stable source of truth, and give auditors a record of what was approved and why, which matters in regulated and public-sector work. Fourth, track rework as well as throughput. A team that ships quickly and then throws work away is not fast.

Source: 'Agree before you delegate'.

---

<!-- slide: id=five-questions layout=questions -->

Getting started

## Five questions before you delegate

1. Can we draw the system boundary?
2. Can we walk the main and failure paths?
3. Do we use one word for one meaning?
4. Have future users tried a prototype?
5. Did we agree in order?

::: verdict
If any answer is no, the work isn’t ready for an agent.
:::

::: closing
Agents have made code cheaper to produce.

They have not made understanding cheaper.
:::

Notes:

To finish, five questions to ask before we delegate. Can we draw the system boundary and name who and what sits outside it? Can we walk through the main journey and its failure path on one page, including what happens when the AI is unavailable or unsure? Do the humans and the agent use one word for one meaning, backed by a short glossary? Have the people who will use the system tried a prototype, not just read a description of one? And did we agree in order, without skipping steps? If any answer is no, the work isn't ready for an agent. Agents have made code cheaper to produce. They have not made understanding cheaper.

Source: 'Agree before you delegate'.

---

<!-- slide: id=example layout=visual -->

A fictional example · Regional public works

## “Request” meant two different systems

<!-- visual: request-two-systems -->

Notes:

Here's a fictional but realistic example. An architect prepares a demo for a regional department responsible for public construction works. The goal is for AI to pre-assess contractor change requests, also called variation orders, against contract clauses, lot budgets and procurement thresholds, with a contract manager making the decision. The architect and an agent produce a full set of planning documents, which the architect reviews for a few hours and judges coherent. The agent then builds a citizen-facing portal for reporting roadworks issues. The documents use the word 'request' throughout. The architect read it as a contractor's change request; the implementation treated it as a citizen's request. The build had to be discarded.

Source: 'Agree before you delegate'.

---

<!-- slide: id=swimlane layout=visual stage=sketch -->

In practice · Fictional example, second attempt

## The swimlane shows who decides

<!-- visual: swimlane -->

Notes:

Back to the fictional change-request example, on the second attempt. This is the Sketch step: one change request, end to end, as a swimlane. It makes responsibility explicit. The AI checks the rules and drafts an assessment, citing clauses and flagging gaps. A site inspector verifies the work on site. The contract manager makes the financial decision and escalates to the board when the request exceeds their delegated authority. Notice what the picture forces. We can't draw it without saying who submits the request, and that it's a contractor, not a citizen. The misunderstanding from the first attempt becomes visible in minutes, before any code exists.

Source: 'Agree before you delegate'; the example is fictional.

---

<!-- slide: id=container-view layout=visual stage=draw -->

In practice · Fictional example, second attempt

## The AI suggests; a named person approves

<!-- visual: container-view -->

Notes:

This is the Draw step: a container view in the style of Simon Brown's C4 model. It shows where the AI sits inside the system boundary, which systems it reads, the document store and the contract and ERP system, and who works with it from outside: the contractor, the site inspector and the contract manager. The key line is the annotation on the AI component: it suggests, and a named person approves. In regulated and public-sector work, that line between suggestion and decision is what auditors and accountable managers will ask about. It is simple enough for a contract manager, an architect and a developer to say whether it's right.

Sources: Brown (C4); fictional example.

---

<!-- slide: id=prototype layout=prototype stage=click -->

In practice · Fictional example, second attempt

## The prototype surfaced three requirements

::: wireframe
<!-- visual: prototype-cr-0147 -->

Throwaway prototype · synthetic data · fictional example
:::

1. Approve stays disabled until the site report is attached.
2. The cumulative-changes warning is the most important line.
3. The AI panel says clearly that it only suggests.

Notes:

This is the Click step: a throwaway prototype of the contract manager's review screen, shown to the people who will use it. Reviewing it surfaced three requirements the documents didn't state. First, the Approve button must stay disabled until the inspector's site report is attached. Second, the cumulative-changes warning is the most important line on the screen, because it decides whether a re-tender review is needed. Third, the AI panel must say clearly that its output is a suggestion. None came from reading; they came from looking and trying. The amounts on screen are synthetic, and the example is fictional.

Source: 'Agree before you delegate'.
