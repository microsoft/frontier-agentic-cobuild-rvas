#!/usr/bin/env bash
set -euo pipefail
umask 077

if [[ $# -ne 3 ]]; then
  echo "usage: $0 <resource-group> <location> <parameters-json>" >&2
  exit 2
fi
RESOURCE_GROUP="$1"
LOCATION="$2"
PARAMETERS="$3"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

python3 - "${PARAMETERS}" <<'PY'
import json
import sys
with open(sys.argv[1], encoding="utf-8") as handle:
    parameters = json.load(handle)["parameters"]
for name in ("resourceToken", "modelName", "modelVersion", "modelDeploymentName", "modelSkuName"):
    value = parameters[name]["value"]
    if not isinstance(value, str) or not value.strip() or "REPLACE" in value:
        raise SystemExit(f"Set {name} in your parameter file before provisioning.")
PY

if [[ "$(az cloud show --query name -o tsv)" != "AzureCloud" ]]; then
  echo "This demo template targets public Azure only." >&2
  exit 1
fi
PRINCIPAL_ID="$(az ad signed-in-user show --query id -o tsv)"
if [[ -z "${PRINCIPAL_ID}" ]]; then
  echo "Cannot resolve operator identity; sign in with an approved user account." >&2
  exit 1
fi

OUTPUT_DIR="$(mktemp -d "${TMPDIR:-/tmp}/operational-agents-deployment.XXXXXXXX")"
echo "Creating optional demo resources in ${RESOURCE_GROUP}; outputs: ${OUTPUT_DIR}" >&2
az group create --name "${RESOURCE_GROUP}" --location "${LOCATION}" --output none
az deployment group validate --resource-group "${RESOURCE_GROUP}" \
  --template-file "${SCRIPT_DIR}/../main.bicep" \
  --parameters "@${PARAMETERS}" location="${LOCATION}" principalId="${PRINCIPAL_ID}" --output none
az deployment group create --name operational-agents --resource-group "${RESOURCE_GROUP}" \
  --template-file "${SCRIPT_DIR}/../main.bicep" \
  --parameters "@${PARAMETERS}" location="${LOCATION}" principalId="${PRINCIPAL_ID}" \
  --query properties.outputs --output json > "${OUTPUT_DIR}/outputs.json"

python3 - "${OUTPUT_DIR}" <<'PY'
import json
from pathlib import Path
import shlex
import sys
root = Path(sys.argv[1])
outputs = json.loads((root / "outputs.json").read_text())
names = ("AZURE_AI_PROJECT_ENDPOINT", "AZURE_AI_MODEL_DEPLOYMENT_NAME")
lines = [f"export {name}={shlex.quote(outputs[name]['value'])}" for name in names]
(root / "live.env").write_text("\n".join(lines) + "\n")
print(f"Load the generated environment: source {root / 'live.env'}")
PY
