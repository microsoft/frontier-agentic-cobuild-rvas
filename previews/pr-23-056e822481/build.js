#!/usr/bin/env node
/** Publish scenario manifests and assets for the static documentation site. */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SCENARIOS_DIR = path.join(ROOT, 'scenarios');
const OUT_DATA_DIR = path.join(__dirname, 'assets', 'data');

function loadScenarioRegistry() {
  if (!fs.existsSync(SCENARIOS_DIR)) return [];
  return fs.readdirSync(SCENARIOS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const root = path.join(SCENARIOS_DIR, entry.name);
      const manifestPath = path.join(root, 'manifest.json');
      if (!fs.existsSync(manifestPath)) {
        throw new Error(`scenario ${entry.name} is missing manifest.json`);
      }
      try {
        return { root, ...JSON.parse(fs.readFileSync(manifestPath, 'utf8')) };
      } catch (error) {
        throw new Error(`scenario ${entry.name} has invalid manifest.json: ${error.message}`);
      }
    })
    .sort((left, right) => {
      const leftOrder = Number.isFinite(left.order) ? left.order : Number.MAX_SAFE_INTEGER;
      const rightOrder = Number.isFinite(right.order) ? right.order : Number.MAX_SAFE_INTEGER;
      return leftOrder - rightOrder || left.name.localeCompare(right.name);
    });
}

function scenarioPathExists(scenario, relativePath) {
  if (!relativePath || typeof relativePath !== 'string') return false;
  const target = path.resolve(scenario.root, relativePath);
  return target.startsWith(`${scenario.root}${path.sep}`) && fs.existsSync(target);
}

function detectScenarioProblems(scenarios) {
  const problems = [];
  const ids = new Set();
  for (const scenario of scenarios) {
    if (!scenario.id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(scenario.id)) {
      problems.push(`${path.basename(scenario.root)} scenario needs a kebab-case id`);
    }
    if (!scenario.name || !scenario.tagline || !scenario.customer_outcome || !scenario.owner || !scenario.maturity) {
      problems.push(`${scenario.id || path.basename(scenario.root)} scenario manifest needs name, tagline, customer_outcome, owner, and maturity`);
    }
    if (!Array.isArray(scenario.decision_prompts) || !scenario.decision_prompts.length) {
      problems.push(`${scenario.id} scenario needs at least one decision prompt`);
    }
    if (ids.has(scenario.id)) problems.push(`duplicate scenario id ${scenario.id}`);
    ids.add(scenario.id);
    if (!scenarioPathExists(scenario, 'README.md')) problems.push(`${scenario.id} scenario is missing README.md`);
    if (!scenarioPathExists(scenario, scenario.slides)) problems.push(`${scenario.id} scenario slides ${scenario.slides} missing`);
    if (!scenarioPathExists(scenario, scenario.accelerator)) problems.push(`${scenario.id} scenario accelerator ${scenario.accelerator} missing`);
    if (!Array.isArray(scenario.lessons) || !scenario.lessons.length) {
      problems.push(`${scenario.id} scenario needs at least one lesson`);
      continue;
    }
    if (!Array.isArray(scenario.build_modules) || !scenario.build_modules.length) {
      problems.push(`${scenario.id} scenario needs at least one build module`);
    }
    const moduleIds = new Set();
    for (const module of scenario.build_modules || []) {
      if (!module.id || !module.title || !module.summary || !module.outcome) {
        problems.push(`${scenario.id} build module needs id, title, summary, and outcome`);
      }
      if (moduleIds.has(module.id)) problems.push(`${scenario.id} duplicate build module id ${module.id}`);
      moduleIds.add(module.id);
      if (Object.hasOwn(module, 'activity_id')) {
        problems.push(`${scenario.id} build module ${module.id} references a retired activity`);
      }
      for (const implementationPath of module.implementation_paths || []) {
        if (!scenarioPathExists(scenario, implementationPath)) {
          problems.push(`${scenario.id} build module ${module.id} implementation path ${implementationPath} missing`);
        }
      }
    }
    const lessonIds = new Set();
    for (const lesson of scenario.lessons) {
      if (!lesson.id || !lesson.title || !scenarioPathExists(scenario, lesson.path)) {
        problems.push(`${scenario.id} lesson needs id, title, and an existing path`);
      }
      if (scenarioPathExists(scenario, lesson.path)) {
        const text = fs.readFileSync(path.join(scenario.root, lesson.path), 'utf8');
        if (/\]\([^)]*(?:activities\/|(?:activity|reference)\.html)/iu.test(text)) {
          problems.push(`${scenario.id} lesson ${lesson.id} links to a retired activity`);
        }
      }
      if (lessonIds.has(lesson.id)) problems.push(`${scenario.id} duplicate lesson id ${lesson.id}`);
      lessonIds.add(lesson.id);
    }
    if (scenario.lessons.length !== (scenario.build_modules || []).length ||
        scenario.lessons.some((lesson, index) => lesson.id !== scenario.build_modules[index]?.id)) {
      problems.push(`${scenario.id} needs one build module per lesson, with matching IDs and order`);
    }
  }
  return problems;
}

function publishScenarioAsset(source) {
  const name = path.basename(source);
  if (['__pycache__', '.venv', 'venv', 'node_modules', '.git', '.azure',
    '.foundry', '.runtime', '.pytest_cache', 'logs', 'journals'].includes(name)) return false;
  if (/^\.env(?:\.|$)/u.test(name) && name !== '.env.sample') return false;
  if (/^\.deployment/u.test(name)) return false;
  return !/\.(?:py[co]|db|sqlite3?)(?:-(?:wal|shm|journal))?$|\.log$|\.journal$/u.test(name);
}

function copyScenarioAssets(scenarios, outputRoot = path.join(OUT_DATA_DIR, 'scenarios')) {
  fs.rmSync(outputRoot, { recursive: true, force: true });
  for (const scenario of scenarios) {
    fs.cpSync(scenario.root, path.join(outputRoot, scenario.id), {
      recursive: true,
      filter: publishScenarioAsset,
    });
    const readmePath = path.join(outputRoot, scenario.id, 'README.md');
    if (fs.existsSync(readmePath)) {
      const lessonByPath = new Map((scenario.lessons || []).map((lesson) => [lesson.path, lesson]));
      const rewritten = fs.readFileSync(readmePath, 'utf8').replace(
        /\]\((lessons\/[^)#]+\.md)(#[^)]+)?\)/g,
        (match, lessonPath, hash = '') => {
          const lesson = lessonByPath.get(lessonPath);
          return lesson
            ? `](lesson.html?scenario=${encodeURIComponent(scenario.id)}&lesson=${encodeURIComponent(lesson.id)}${hash})`
            : match;
        },
      );
      fs.writeFileSync(readmePath, rewritten);
    }
  }
}

function scenarioOutput(scenario) {
  const assetBase = `assets/data/scenarios/${scenario.id}/`;
  return {
    id: scenario.id,
    name: scenario.name,
    tagline: scenario.tagline,
    order: Number.isFinite(scenario.order) ? scenario.order : null,
    customer_outcome: scenario.customer_outcome,
    maturity: scenario.maturity || 'initial',
    level: scenario.level || 'guided',
    duration_minutes: scenario.duration_minutes || 0,
    stage: scenario.stage || '',
    owner: scenario.owner || 'Unassigned',
    decision_prompts: scenario.decision_prompts || [],
    lessons: (scenario.lessons || []).map((lesson, index) => ({
      ...lesson,
      sequence: index + 1,
      content_path: `${assetBase}${lesson.path}`,
      lesson_path: `lesson.html?scenario=${encodeURIComponent(scenario.id)}&lesson=${encodeURIComponent(lesson.id)}`,
    })),
    build_modules: (scenario.build_modules || []).map((module, index) => ({
      ...module,
      sequence: index + 1,
    })),
    asset_base: assetBase,
    readme_path: `${assetBase}README.md`,
    slides_path: `${assetBase}${scenario.slides}`,
    accelerator_path: `${assetBase}${scenario.accelerator}`,
  };
}

function main() {
  const scenarios = loadScenarioRegistry();
  const problems = detectScenarioProblems(scenarios);
  if (problems.length) {
    console.error('Build failed: invalid scenarios');
    problems.forEach((problem) => console.error(`  - ${problem}`));
    process.exit(1);
  }
  fs.rmSync(OUT_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DATA_DIR, { recursive: true });
  copyScenarioAssets(scenarios);
  fs.writeFileSync(
    path.join(OUT_DATA_DIR, 'platform.json'),
    JSON.stringify({ scenarios: scenarios.map(scenarioOutput) }, null, 2),
  );
  console.log(`Built platform.json and assets for ${scenarios.length} scenarios.`);
}

if (require.main === module) main();

module.exports = { copyScenarioAssets, detectScenarioProblems, loadScenarioRegistry, scenarioOutput };
