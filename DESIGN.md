# Design

The site preserves the RVAP/RVAS identity: a white reading surface, Deep Navy
hero, RVAP Blue actions, and Outfit/Inter typography. Existing logos remain the
brand authority. Fonts are self-hosted.

The homepage leads to repository setup. Its architecture-file preview describes
the actual handoff rather than displaying a catalog. Idea Forge stays secondary
to the known-use-case journey.

The Start guide is a reading surface. A desktop section index becomes an inline
list on narrow screens. Command blocks scroll horizontally and offer a copy
button with explicit failure feedback. Maintain visible keyboard focus and
readable contrast.

Use `docs/assets/css/styles.css` as the token and component source. The guide
content comes from `docs/start.md`; build output is `docs/start.html`. Preserve
this hierarchy when adding documentation.
