# Design

The site preserves the RVAP/RVAS identity: a white reading surface, Deep Navy
hero, RVAP Blue actions, and Outfit/Inter typography. Existing logos remain the
brand authority. Fonts are self-hosted.

The homepage uses the RVAP navy-to-blue gradient with a white architecture
preview. Reading-page headers and navigation use light blue surfaces; navy marks
the selected page and table headers. Links use a darker blue for readable
contrast. Keep body content and diagrams on white. Learn page navigation uses
four text tabs with an underline marking the current page.

The homepage leads to repository setup. Its architecture-file preview describes
the actual handoff rather than displaying a catalog. Idea Forge stays secondary
to the known-use-case journey.

Learn pages place page links above the article and section links inside an
"On this page" disclosure. Prose stays at reading width; diagrams use the full
content width. Start uses the same section disclosure and reading layout,
without the Learn page tabs. Headings and prose share one 47.5rem column;
subsections use spacing rather than full-width divider lines. Page tabs become
two columns on narrow screens. Command blocks wrap to their available width. The copy
button preserves the original text and reports failures. Maintain visible keyboard focus and
readable contrast.

Intro figures scale to fit on wide screens and switch to stacked compositions
when their container becomes narrow. Preserve approval gates and matching
before/after topology; never hide content to remove a scrollbar.

Use `docs/assets/css/styles.css` as the token and component source. The guide
content comes from `docs/start.md`; build output is `docs/start.html`. Preserve
this hierarchy when adding documentation.
