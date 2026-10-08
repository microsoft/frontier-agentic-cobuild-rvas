#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
if ! command -v node >/dev/null 2>&1; then
  printf 'Node.js is required. Install the version listed in scripts/agentic-skills.json.\n' >&2
  exit 1
fi
exec node "$SCRIPT_DIR/setup-agentic-repo.js" "$@"
