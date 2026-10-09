#!/usr/bin/env bash
set -Eeuo pipefail
npm ci --ignore-scripts
printf '\nAgentic Co-build tooling workspace is ready.\n'
printf 'Read README.md to install the plugin in your own application repository.\n'
printf 'For maintenance: npm run build && npm test && npm run test:diagrams\n'
