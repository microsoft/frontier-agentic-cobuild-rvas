(function () {
  'use strict';

  async function init() {
    const scenarioId = FP.qp('scenario');
    const lessonId = FP.qp('lesson');
    if (!scenarioId || !lessonId) return showError('Select a scenario and module to begin.');

    try {
      const data = await FP.loadData();
      const scenario = (data.scenarios || []).find((item) => item.id === scenarioId);
      const lesson = scenario && (scenario.lessons || []).find((item) => item.id === lessonId);
      if (!scenario || !lesson) return showError('This module was not found in the scenario playbook.');
      renderCourse(scenario, lesson);
      await renderLesson(scenario, lesson);
    } catch (error) {
      showError(error.message);
    }
  }

  function renderCourse(scenario, lesson) {
    const playbookUrl = `scenario.html?id=${encodeURIComponent(scenario.id)}`;
    const lessons = scenario.lessons || [];
    const index = lessons.findIndex((item) => item.id === lesson.id);
    const previous = lessons[index - 1];
    const next = lessons[index + 1];
    const currentModule = (scenario.build_modules || []).find((module) => module.id === lesson.id);

    document.title = `${lesson.title} — ${scenario.name} — Agentic Co-build`;
    document.getElementById('lessonTitle').textContent = lesson.title;
    document.getElementById('lessonEyebrow').textContent = `${scenario.name} · module ${lesson.sequence}`;
    document.getElementById('lessonSummary').textContent =
      'Build the agreed part of your use case in your tenant and verify it through the intended user channel.';
    document.getElementById('lessonOutcome').textContent = scenario.customer_outcome;
    ['playbookBack', 'playbookNav'].forEach((id) => { document.getElementById(id).href = playbookUrl; });
    document.getElementById('lessonBreadcrumbs').innerHTML = `
      <a href="index.html">Home</a>
      <span aria-hidden="true">/</span>
      <a href="index.html#outcomes">Scenarios</a>
      <span aria-hidden="true">/</span>
      <a href="${FP.esc(playbookUrl)}">${FP.esc(scenario.name)}</a>
      <span aria-hidden="true">/</span>
      <span>Module ${FP.esc(lesson.sequence)}</span>`;
    renderLessonHeaderActions(scenario, lesson, playbookUrl);
    document.getElementById('currentModuleSummary').textContent = currentModule
      ? currentModule.summary
      : 'Follow the implementation steps and review the evidence against the agreed scope.';
    document.getElementById('lessonProgress').innerHTML = lessons.map((item) => `
      <li class="${item.id === lesson.id ? 'is-current' : ''}">
        <a href="${FP.esc(item.lesson_path)}" ${item.id === lesson.id ? 'aria-current="step"' : ''}>
          <span>${item.sequence}</span>${FP.esc(item.title)}
        </a>
      </li>`).join('');

    renderLessonPager(previous, next, playbookUrl);
  }

  function renderLessonHeaderActions(scenario, lesson, playbookUrl) {
    const scenarioId = encodeURIComponent(scenario.id);
    const lessonHash = `lesson-${lesson.id}`;
    document.getElementById('lessonSlidesLink').href = `slides.html?id=${scenarioId}#${lessonHash}`;
    document.getElementById('lessonFullDeckLink').href = `slides.html?id=${scenarioId}`;
    document.getElementById('lessonPlaybookLink').href = playbookUrl;
  }

  function renderLessonPager(previous, next, playbookUrl) {
    const pager = document.getElementById('lessonBottomPager');
    if (!pager) return;

    pager.innerHTML = `
      ${previous ? `
        <a class="journey-pager-link" href="${FP.esc(previous.lesson_path)}">
          <span>Previous module</span>
          <strong>${FP.esc(previous.title)}</strong>
        </a>` : `
        <a class="journey-pager-link" href="${FP.esc(playbookUrl)}">
          <span>Back</span>
          <strong>Scenario playbook</strong>
        </a>`}
      ${next ? `
        <a class="journey-pager-link next" href="${FP.esc(next.lesson_path)}">
          <span>Next module</span>
          <strong>${FP.esc(next.title)}</strong>
        </a>` : `
        <a class="journey-pager-link next" href="${FP.esc(playbookUrl)}">
          <span>Complete</span>
          <strong>Return to scenario playbook</strong>
        </a>`}
    `;
  }

  async function renderLesson(scenario, lesson) {
    const target = document.getElementById('lessonBody');
    const response = await fetch(lesson.content_path, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Could not load module (${response.status})`);
    FP.renderMd(await response.text(), target);
    FP.applyGuideAccordions(target, { collapseOptionChapters: true });
    rewriteLessonLinks(target, scenario, lesson);
    rewriteLessonImages(target, scenario, lesson);
    FP.initDiagramZoom(target);
  }

  function resolveRelative(basePath, href) {
    const segments = basePath.split('/').slice(0, -1);
    href.split('/').forEach((part) => {
      if (!part || part === '.') return;
      if (part === '..') segments.pop();
      else segments.push(part);
    });
    return segments.join('/');
  }

  function rewriteLessonLinks(container, scenario, lesson) {
    const lessonRoutes = new Map((scenario.lessons || []).map((item) => [item.path, item.lesson_path]));

    container.querySelectorAll('a[href]').forEach((link) => {
      const raw = link.getAttribute('href') || '';
      if (!raw || raw.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(raw)) return;

      const [path, hash] = raw.split('#');
      const resolved = resolveRelative(lesson.path, path);

      if (lessonRoutes.has(resolved)) {
        link.href = lessonRoutes.get(resolved) + (hash ? `#${hash}` : '');
        return;
      }

      if (/\.md$/i.test(path)) {
        link.href = `${scenario.asset_base || ''}${resolved}${hash ? `#${hash}` : ''}`;
        return;
      }

      link.href = `${scenario.asset_base || ''}${resolved}${hash ? `#${hash}` : ''}`;
    });
  }

  function rewriteLessonImages(container, scenario, lesson) {
    container.querySelectorAll('img[src]').forEach((image) => {
      const raw = image.getAttribute('src') || '';
      if (!raw || raw.startsWith('#') || raw.startsWith('/') || /^[a-z][a-z0-9+.-]*:/i.test(raw)) return;

      const [path, hash] = raw.split('#');
      const resolved = resolveRelative(lesson.path, path);
      image.src = `${scenario.asset_base || ''}${resolved}${hash ? `#${hash}` : ''}`;
    });
  }

  function showError(message) {
    FP.renderError('mainContent', message);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
