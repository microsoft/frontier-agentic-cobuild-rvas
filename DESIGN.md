# Design

The site preserves the RVAP/RVAS identity: a white reading surface, Deep Navy
hero, RVAP Blue actions, and Outfit/Inter typography. Existing logos remain the
brand authority. Fonts are self-hosted.
The shared navigation bar is 58px tall with a 32px-high logo on desktop and mobile.

The homepage uses the RVAP navy-to-blue gradient with a pale-blue card holding
the five ready-to-delegate questions. Its primary action is "Use it on my app";
"Run a co-build day" is a white-outlined secondary button. The worked example
is a text link, because teams should bring their own use case first.
Navigation and supporting surfaces use a pale-blue tint; reading-page headers
use a slightly stronger blue wash. Navy marks the selected page and table headers.
Links use a darker blue for readable contrast. Body content stays white except
for the alternating application-family bands described below. Diagrams stay
white. Reserve pale green for successful copying and warm peach for copy
failures, always paired with explicit feedback text.

Below the hero, the stepper shows the path, steps 00 to 08. Steps are white
circles with an RVAP Blue outline and Deep Navy numerals, joined by a pale
connector. Setup sits before the bands with a muted outline. Labelled Deep Navy
brackets group the Agree (01–04), Delegate (05–07), and Verify (08) bands. Do
not colour the bands with pillar teal or purple. A gate is a filled Deep Navy
label with a white check and the words "You approve", so it never relies on
colour alone. Each step links to its section on the path page. Up to 1240px the
stepper uses two rows (setup and Agree, then Delegate and Verify); below 960px
it turns vertical, with the connector running down the circles.

The entry section offers three ways in: your own idea or app, a customer without
an idea (Idea Forge), and the worked example. The closing section links to the
talk and its PDF.

Learn pages place one horizontal text-tab strip directly above the article,
with a pale-blue fill and navy underline marking the current page. There is no
section disclosure, keeping a single navigation layer before the content.
Learn has five pages: application types, the worked example, the co-build day,
participant requirements, and the discovery session guide. Architecture choices sit within application types;
existing-application preparation sits in Start, where the reader needs it.
Prose stays at reading width; diagrams use the full content width.
Start opens directly into the setup steps, without section navigation or the
Learn page tabs. Returning users can jump to discovery. Setup leads to the first
Azure Solution Architect conversation; implementation and review prompts follow the
architecture approval boundary. Headings and prose share one 47.5rem column;
subsections use spacing rather than full-width divider lines. Page tabs stay on
one row and scroll horizontally when the viewport cannot contain them. Command
blocks wrap to their available width. Maintain visible keyboard focus and
readable contrast.

Command blocks name their destination. The copy button preserves the original
text and reports success or failure with a short handoff cue. Reserve space for
feedback so copying does not move the code.
Section-link controls stay visible on touch and keyboard paths. A linked heading
is underlined on arrival. Homepage artifact rows link to their setup or handoff
section; they do not imply that an architecture file already exists.
Use short color transitions for interaction feedback, with no motion under
reduced-motion preferences. Mobile navigation restores focus on Escape.

Intro figures scale to fit on wide screens and switch to stacked compositions
when their container becomes narrow. Preserve approval gates and matching
before/after topology; never hide content to remove a scrollbar.

The application families pair explanatory text with compact conceptual diagrams
on the right. Each diagram shows the distinguishing flow or approval boundary,
without prescribing Microsoft products. Below 960px, the diagrams follow their
text in a single column. Keep labels readable without horizontal scrolling.
Alternate white and pale RVAP blue bands across the six families, with thin
dividers and consistent vertical padding. Bands extend into the page gutters
without reducing the content width. Keep the white diagram surfaces unbordered;
do not turn the families into rounded cards or add shadows.
Product examples sit below the family prose, separate from the conceptual flow.
Use unchanged Microsoft icons with nearby product names linked to Microsoft Learn.
Label each example and state that the products are optional, not approved architectures.
Each family has at most two options, with a short explanation of their roles.
Use clearly disclosed neutral illustrations when the bundled artwork has no
exact icon. Distinguish capabilities within one service and frameworks from
hosting choices.

Primary navigation is Overview, Why, The path, Start, Learn, and GitHub. The
path page is one reading page with a section per step: time and tool, a prompt
written for the reader's own use case, a "done when" line, and the gate.

The Why page renders the "Agree before you delegate" talk from
`docs/slides/agree-before-you-delegate.md`. It reads as stacked 16:9 slides with
the speaker notes as prose, and has a present mode and a PDF export. Slides
use the site tokens on light surfaces, carry the RVAP logo on the title and
closing slides, and redraw the deck's diagrams as SVG with real text.

Use `docs/assets/css/styles.css` as the token and component source. The guide
content comes from `docs/start.md`; build output is `docs/start.html`. Preserve
this hierarchy when adding documentation.
