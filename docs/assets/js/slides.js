(function () {
  'use strict';

  const state = {
    slides: [],
    scenario: null,
    activeIndex: 0,
  };

  async function init() {
    const id = FP.qp('id');
    const deck = document.getElementById('slideDeck');
    if (!id) return showError('No scenario was selected.');

    try {
      const data = await FP.loadData();
      const scenario = (data.scenarios || []).find((item) => item.id === id);
      if (!scenario) return showError(`Scenario "${id}" was not found.`);

      document.title = `${scenario.name}. Customer slides`;
      document.getElementById('deckTitle').textContent = scenario.name;
      document.getElementById('scenarioLink').href = `scenario.html?id=${encodeURIComponent(scenario.id)}`;
      document.getElementById('downloadPptx').href = scenario.slides_pptx_path;
      document.getElementById('downloadPdf').href = scenario.slides_pdf_path;
      const response = await fetch(scenario.slides_path, { cache: 'no-cache' });
      if (!response.ok) throw new Error(`Could not load slides (${response.status})`);
      state.scenario = scenario;
      renderDeck(await response.text(), deck, scenario);
      bindControls();
    } catch (error) {
      showError(error.message);
    }
  }

  function renderDeck(source, deck, scenario) {
    const content = source.replace(/^---\s*\n[\s\S]*?\n---\s*\n/mu, '').trim();
    state.slides = content.split(/\n---\s*\n/gu).filter(Boolean).map(parseSlide);
    deck.innerHTML = state.slides.map((slide, index) => {
      const density = slide.markdown.length > 700 ? ' slide-dense'
        : slide.markdown.length > 350 ? ' slide-compact'
          : '';
      const table = /^\s*\|.*\|\s*$/mu.test(slide.markdown) ? ' slide-table' : '';
      return `
      <article class="customer-slide${density}${table}" id="${FP.esc(slide.id)}" tabindex="-1"
        data-index="${index}" data-kind="${FP.esc(slide.kind)}" aria-hidden="true">
        <div class="slide-chrome">
          <span>${FP.esc(scenario.name)}</span>
          <span>${String(index + 1).padStart(2, '0')} / ${String(state.slides.length).padStart(2, '0')}</span>
        </div>
        <div class="slide-content">${window.marked.parse(slide.markdown, { breaks: false, gfm: true })}</div>
      </article>`;
    }).join('');
    renderIndex();
    FP.initDiagramZoom(deck);
    showSlide(findRequestedSlide());
  }

  function parseSlide(slide, index) {
    const match = slide.match(/^\s*<!--\s*slide:id=([a-z0-9-]+)\s*-->\s*/i);
    const id = match ? match[1].toLowerCase() : `slide-${index + 1}`;
    const markdown = match ? slide.slice(match[0].length).trimStart() : slide.trimStart();
    return {
      id,
      markdown,
      title: extractTitle(markdown),
      kind: slideKind(id),
      lessonId: lessonId(id),
    };
  }

  function extractTitle(markdown) {
    const headings = markdown.match(/^#{1,2}\s+(.+)$/gmu) || [];
    return headings.map((heading) => heading.replace(/^#{1,2}\s+/u, '').trim()).at(-1) || 'Discussion slide';
  }

  function slideKind(id) {
    if (id.endsWith('-choices')) return 'choices';
    if (id.endsWith('-evidence')) return 'evidence';
    if (id.endsWith('-context')) return 'context';
    if (id.includes('next-session') || id.includes('close')) return 'close';
    return 'orient';
  }

  function lessonId(id) {
    const match = id.match(/^lesson-(.+)-(?:context|choices|evidence)$/u);
    return match ? match[1] : '';
  }

  function renderIndex() {
    const index = document.getElementById('slideIndex');
    index.innerHTML = state.slides.map((slide, position) => `
      <button type="button" class="slide-index-item" data-slide-index="${position}">
        <span>${String(position + 1).padStart(2, '0')}</span>
        <strong>${FP.esc(slide.title)}</strong>
      </button>`).join('');
    index.querySelectorAll('[data-slide-index]').forEach((button) => {
      button.addEventListener('click', () => showSlide(Number(button.dataset.slideIndex)));
    });
  }

  function findRequestedSlide() {
    const requested = decodeURIComponent((window.location.hash || '').replace(/^#/, '')).toLowerCase();
    if (!requested) return 0;
    const exact = state.slides.findIndex((slide) => slide.id === requested);
    if (exact >= 0) return exact;
    const prefix = state.slides.findIndex((slide) => slide.id.startsWith(`${requested}-`));
    return prefix >= 0 ? prefix : 0;
  }

  function showSlide(index, options = {}) {
    const nextIndex = Math.max(0, Math.min(index, state.slides.length - 1));
    state.activeIndex = nextIndex;
    document.querySelectorAll('.customer-slide').forEach((slide, position) => {
      const active = position === nextIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    document.querySelectorAll('.slide-index-item').forEach((item, position) => {
      const active = position === nextIndex;
      item.classList.toggle('is-active', active);
      if (active) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
    });
    const slide = state.slides[nextIndex];
    document.getElementById('slidePosition').textContent = `Slide ${nextIndex + 1} of ${state.slides.length}`;
    document.getElementById('deckProgress').textContent = `${nextIndex + 1} / ${state.slides.length}`;
    document.getElementById('previousSlide').disabled = nextIndex === 0;
    document.getElementById('nextSlide').disabled = nextIndex === state.slides.length - 1;
    updateGuide(slide);
    if (!options.skipHash) history.replaceState(null, '', `#${slide.id}`);
    if (options.focus) document.getElementById(slide.id)?.focus({ preventScroll: true });
    document.querySelector('.slide-index-item.is-active')?.scrollIntoView({ block: 'nearest' });
  }

  function updateGuide(slide) {
    const guides = {
      orient: ['Orient', 'Frame the outcome', 'Make sure the group agrees on the customer outcome and the boundary of this conversation.'],
      context: ['Discuss', 'Understand the constraint', 'Stay with the problem before proposing architecture. Name the owner, the risk, and the condition that changes the decision.'],
      choices: ['Decide', 'Compare the viable paths', 'Choose a path and record why it fits. Keep rejected options visible when their trade-offs may matter later.'],
      evidence: ['Prove', 'Set the exit check', 'Agree what the team must show before it moves on. Evidence should come from the customer environment or the intended user channel.'],
      close: ['Commit', 'Turn discussion into action', 'Read back the decisions, unresolved questions, owners, and evidence needed for the next working session.'],
    };
    const guide = guides[slide.kind] || guides.orient;
    document.getElementById('guideMode').textContent = guide[0];
    document.getElementById('guideTitle').textContent = guide[1];
    document.getElementById('guideCopy').textContent = guide[2];
    const moduleLink = document.getElementById('moduleLink');
    const lesson = (state.scenario.lessons || []).find((item) => item.id === slide.lessonId);
    moduleLink.hidden = !lesson;
    if (lesson) {
      moduleLink.href = lesson.lesson_path;
      moduleLink.textContent = `Open module ${lesson.sequence}`;
    }
  }

  function bindControls() {
    document.getElementById('previousSlide').addEventListener('click', () => showSlide(state.activeIndex - 1, { focus: true }));
    document.getElementById('nextSlide').addEventListener('click', () => showSlide(state.activeIndex + 1, { focus: true }));
    document.addEventListener('keydown', (event) => {
      if (event.target.closest('a, button') && !event.target.classList.contains('customer-slide')) return;
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault();
        showSlide(state.activeIndex + 1, { focus: true });
      } else if (['ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault();
        showSlide(state.activeIndex - 1, { focus: true });
      } else if (event.key === 'Home') {
        event.preventDefault();
        showSlide(0, { focus: true });
      } else if (event.key === 'End') {
        event.preventDefault();
        showSlide(state.slides.length - 1, { focus: true });
      }
    });
  }

  function showError(message) {
    document.getElementById('slideDeck').innerHTML = `<p role="alert">${FP.esc(message)}</p>`;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
