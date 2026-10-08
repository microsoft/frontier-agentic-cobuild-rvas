#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const manifest = require('./agentic-skills.json');
const STATE_NAME = '.agentic-cobuild-setup.json';

function command(source, skills) {
  return ['--yes', manifest.installer, 'add', source.repository,
    '--skill', ...skills, '--agent', manifest.agent, '--copy', '--yes'];
}

function shellQuote(value) {
  return /^[a-zA-Z0-9@._/-]+$/.test(value) ? value : "'" + value.replaceAll("'", "'\\''") + "'";
}

function digest(directory) {
  const hash = crypto.createHash('sha256');
  function walk(current, relative) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const file = path.join(current, entry.name);
      const name = path.posix.join(relative, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Refusing linked skill resource: ${file}`);
      if (entry.isDirectory()) walk(file, name);
      else if (entry.isFile()) {
        hash.update(name + '\0');
        hash.update(fs.readFileSync(file));
        hash.update('\0');
      } else throw new Error(`Unsupported skill resource: ${file}`);
    }
  }
  walk(directory, '');
  return hash.digest('hex');
}

function exists(file) {
  try { fs.lstatSync(file); return true; }
  catch (error) { if (error.code === 'ENOENT') return false; throw error; }
}

function checkLocation(target, relative) {
  let current = target;
  for (const part of relative.split('/')) {
    current = path.join(current, part);
    if (exists(current) && fs.lstatSync(current).isSymbolicLink()) {
      throw new Error(`Refusing a linked setup destination: ${current}`);
    }
  }
}

function readState(file) {
  if (!exists(file)) return { version: 1, installer: manifest.installer, skills: {} };
  const state = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (state.version !== 1 || state.installer !== manifest.installer ||
      !state.skills || typeof state.skills !== 'object' || Array.isArray(state.skills)) {
    throw new Error(`Unrecognized setup state: ${file}. Review it before changing this installation.`);
  }
  return state;
}

function main(args) {
  if (args.includes('--help')) {
    console.log('Usage: bash scripts/setup-agentic-repo.sh [--dry-run] EXISTING_DIRECTORY\n' +
      '       bash scripts/setup-agentic-repo.sh --print-commands\n' +
      'Installs project-local supporting skills only. Install the plugin separately.');
    return;
  }
  if (args.length === 1 && args[0] === '--print-commands') {
    for (const source of manifest.sources) console.log(['npx', ...command(source, source.skills)].map(shellQuote).join(' '));
    return;
  }
  const dryRun = args.includes('--dry-run');
  const targets = args.filter((arg) => arg !== '--dry-run');
  if (targets.length !== 1 || targets[0].startsWith('--')) {
    throw new Error('Select one existing target directory. Use --help for usage.');
  }
  const actual = process.versions.node.split('.').map(Number);
  const required = manifest.minimumNode.split('.').map(Number);
  const comparison = actual.reduce((result, value, index) => result || Math.sign(value - required[index]), 0);
  if (comparison < 0) throw new Error(`Node.js ${manifest.minimumNode} or newer is required; found ${process.versions.node}.`);
  const target = fs.realpathSync(path.resolve(targets[0]));
  if (!fs.statSync(target).isDirectory()) throw new Error(`Target is not a directory: ${target}`);
  for (const tool of ['git', 'npx']) {
    const result = spawnSync(tool, ['--version'], { cwd: target, encoding: 'utf8' });
    if (result.error || result.status !== 0) throw new Error(`${tool} is required and must run successfully.`);
  }
  for (const relative of ['.agents/skills', '.github/skills', 'skills-lock.json', STATE_NAME]) checkLocation(target, relative);
  const stateFile = path.join(target, STATE_NAME);
  const state = readState(stateFile);
  const pending = [];
  for (const source of manifest.sources) {
    const skills = [];
    for (const name of source.skills) {
      const directory = path.join(target, '.agents', 'skills', name);
      const alternative = path.join(target, '.github', 'skills', name);
      if (exists(alternative)) throw new Error(`Conflicting existing skill: ${alternative}. Preserve or relocate it before setup.`);
      const record = state.skills[name];
      if (exists(directory)) {
        checkLocation(target, `.agents/skills/${name}`);
        if (!record || record.source !== source.repository || !fs.existsSync(path.join(directory, 'SKILL.md')) ||
            record.sha256 !== digest(directory)) {
          throw new Error(`Conflicting or modified skill: ${directory}. Setup will not overwrite it.`);
        }
        console.log(`Already installed, unchanged: ${name}`);
      } else {
        if (record) throw new Error(`Managed skill is missing: ${directory}. Review setup state before reinstalling.`);
        skills.push(name);
      }
    }
    if (skills.length) pending.push({ source, skills });
  }
  console.log(`Target: ${target}`);
  console.log('Writes: .agents/skills/, skills-lock.json, .agentic-cobuild-setup.json');
  console.log('Application files, instructions, MCP settings, Git and global plugins remain unchanged.');
  if (dryRun) {
    for (const { source, skills } of pending) console.log(['npx', ...command(source, skills)].map(shellQuote).join(' '));
    console.log(`Dry run: ${pending.reduce((sum, group) => sum + group.skills.length, 0)} skills pending; no files changed.`);
    return;
  }
  const completed = [];
  for (const { source, skills } of pending) {
    console.log(`Installing ${skills.join(', ')} from ${source.repository}`);
    const result = spawnSync('npx', command(source, skills), { cwd: target, stdio: 'inherit' });
    if (result.error || result.status !== 0) {
      throw new Error(`Install failed for ${source.repository}. Completed this run: ${completed.join(', ') || 'none'}. ` +
        'Inspect .agents/skills and skills-lock.json for partial writes before retrying. No rollback was attempted.');
    }
    for (const name of skills) {
      const directory = path.join(target, '.agents', 'skills', name);
      checkLocation(target, `.agents/skills/${name}`);
      if (!fs.existsSync(path.join(directory, 'SKILL.md'))) {
        throw new Error(`Installer did not produce ${name}/SKILL.md. ` +
          `Completed this run: ${completed.join(', ') || 'none'}. Inspect partial writes before retrying.`);
      }
      state.skills[name] = { source: source.repository, sha256: digest(directory) };
    }
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2) + '\n');
    completed.push(...skills);
  }
  console.log('Supporting skills are ready. Install/enable the Agentic Co-build plugin in your chosen host.');
  console.log('Open this target as your workspace and confirm the three plugin skills and Microsoft Learn MCP are available.');
}

try { main(process.argv.slice(2)); }
catch (error) {
  console.error(`Setup failed: ${error.message}`);
  process.exitCode = 1;
}
