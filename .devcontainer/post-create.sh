#!/usr/bin/env bash
set -Eeuo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RESET='\033[0m'

success() {
  printf "%b%s%b\n" "$GREEN" "$1" "$RESET"
}

warn() {
  printf "%b%s%b\n" "$YELLOW" "$1" "$RESET"
}

info() {
  printf "%b%s%b\n" "$CYAN" "$1" "$RESET"
}

info "Setting up the AI Foundry Session workspace..."

if [[ -f requirements.txt ]]; then
  info "Installing Python requirements from requirements.txt"
  pip install -r requirements.txt
  success "Python dependencies are installed."
else
  warn "requirements.txt was not found; skipping pip install."
fi

printf "\n%b==============================================%b\n" "$GREEN" "$RESET"
printf "%b  Welcome to the AI Foundry Session!  %b\n" "$GREEN" "$RESET"
printf "%b==============================================%b\n\n" "$GREEN" "$RESET"

printf "%bScenario quick links%b\n" "$CYAN" "$RESET"
printf "  • AI Grounding: scenarios/ai-grounding/\n"
printf "  • Content Understanding: scenarios/content-understanding/\n"
printf "  • Avatar: scenarios/avatar-onboarding/\n"
printf "  • Operational Agents: scenarios/operational-agents/\n"
printf "  • Docs site: docs/\n\n"

warn "Next steps:"
printf "  1. Choose a scenario and open its README.md.\n"
printf "  2. Follow its accelerator guide for environment setup and credentials.\n"
printf "  3. Use the scenario lessons for implementation and checks.\n"
