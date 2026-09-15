/* Microsoft Foundry — home page */
(function () {
  'use strict';

  async function init() {
    let data;
    try { data = await FP.loadData(); }
    catch (e) { FP.renderError('outcomeGrid', e.message); return; }

    const { scenarios } = data;

    renderScenarioCards(scenarios || []);
  }

  function renderScenarioCards(scenarios) {
    const grid = document.getElementById('outcomeGrid');
    if (!grid) return;

    const scenarioOrder = [
      'content-understanding-document-workflow',
      'ai-grounding',
      'avatar-scenario',
    ];
    const orderedScenarios = scenarioOrder
      .map((id) => scenarios.find((scenario) => scenario.id === id))
      .filter(Boolean)
      .concat(scenarios.filter((scenario) => !scenarioOrder.includes(scenario.id)));

    if (!orderedScenarios.length) {
      grid.innerHTML = '<div class="empty">No scenario playbooks configured.</div>';
      return;
    }

    grid.innerHTML = orderedScenarios.map((scenario) => {
      return `
        <a href="scenario.html?id=${encodeURIComponent(scenario.id)}" class="outcome-card reveal">
          <h3>${FP.esc(scenario.name)}</h3>
          <p>${FP.esc(scenario.tagline || '')}</p>
        </a>`;
    }).join('');
    FP.initReveal();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
