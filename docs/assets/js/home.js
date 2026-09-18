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
      'operational-agents',
    ];
    const orderedScenarios = scenarioOrder
      .map((id) => scenarios.find((scenario) => scenario.id === id))
      .filter(Boolean)
      .concat(scenarios.filter((scenario) => !scenarioOrder.includes(scenario.id)));

    if (!orderedScenarios.length) {
      grid.innerHTML = '<div class="empty">No scenario playbooks configured.</div>';
      return;
    }

    const scenarioCards = orderedScenarios.map((scenario) => {
      return `
        <a href="scenario.html?id=${encodeURIComponent(scenario.id)}" class="outcome-card reveal">
          <h3>${FP.esc(scenario.name)}</h3>
          <p>${FP.esc(scenario.tagline || '')}</p>
        </a>`;
    }).join('');

    grid.innerHTML = `${scenarioCards}
      <article class="outcome-card outcome-card-custom reveal">
        <span class="outcome-card-label">Custom route</span>
        <h3>Fully custom scenario</h3>
        <p>If your use case does not fit these playbooks, contact your Microsoft Cloud Solution Architect. They can help shape a co-build around your goals, constraints, and environment.</p>
        <p class="outcome-card-next"><strong>Next step:</strong> Contact your Cloud Solution Architect at Microsoft.</p>
      </article>`;
    FP.initReveal();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
