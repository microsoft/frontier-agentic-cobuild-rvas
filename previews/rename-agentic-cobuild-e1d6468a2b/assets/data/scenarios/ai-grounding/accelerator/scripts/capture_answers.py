#!/usr/bin/env python3
"""Capture actual answers for one scenario role using the signed-in test identity."""
from __future__ import annotations

import argparse
import json
import os
from pathlib import Path

from _shared import load_env, load_golden_cases
from grounded_answer import answer


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--target", choices=("retrieval", "agent"), required=True)
    parser.add_argument("--role", choices=("returns-coordinators", "returns-supervisors"), required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--trace", action="store_true")
    args = parser.parse_args()
    keys = (
        "AZURE_SEARCH_ENDPOINT", "AZURE_KNOWLEDGE_BASE_NAME", "AZURE_AI_PROJECT_ENDPOINT",
        "AZURE_FOUNDRY_AGENT_NAME", "AZURE_FOUNDRY_AGENT_VERSION",
        "APPLICATIONINSIGHTS_CONNECTION_STRING",
    )
    env = load_env(keys)
    required = keys[:2] if args.target == "retrieval" else keys[2:5]
    for key in required:
        if not env.get(key):
            parser.error(f"set {key} in the scenario .env or process environment")
    if args.target == "retrieval" and not os.environ.get("PROBE_USER_TOKEN"):
        parser.error("set PROBE_USER_TOKEN for the actual identity represented by --role")
    if args.trace and not env.get("APPLICATIONINSIGHTS_CONNECTION_STRING"):
        parser.error("tracing requires APPLICATIONINSIGHTS_CONNECTION_STRING")
    cases = [case for case in load_golden_cases() if args.role in case.get("role_groups", [])]
    if not cases:
        parser.error("no golden questions match the selected role")
    if args.trace:
        os.environ["AZURE_EXPERIMENTAL_ENABLE_GENAI_TRACING"] = "true"
        # Do not export source text or answers by default.
        os.environ["OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT"] = "false"
        from azure.monitor.opentelemetry import configure_azure_monitor
        from opentelemetry import trace

        configure_azure_monitor(connection_string=env["APPLICATIONINSIGHTS_CONNECTION_STRING"])
        tracer = trace.get_tracer("ai-grounding")
    from azure.identity import DefaultAzureCredential

    with DefaultAzureCredential() as credential:
        if args.target == "retrieval":
            from azure.search.documents.knowledgebases import KnowledgeBaseRetrievalClient

            client = KnowledgeBaseRetrievalClient(
                endpoint=env["AZURE_SEARCH_ENDPOINT"],
                knowledge_base_name=env["AZURE_KNOWLEDGE_BASE_NAME"],
                credential=credential,
            )

            def invoke(question):
                return answer(client, question, os.environ["PROBE_USER_TOKEN"])
        else:
            from azure.ai.projects import AIProjectClient

            client = AIProjectClient(endpoint=env["AZURE_AI_PROJECT_ENDPOINT"], credential=credential)
            if args.trace:
                from azure.ai.projects.telemetry import AIProjectInstrumentor

                AIProjectInstrumentor().instrument()
            openai = client.get_openai_client()

            def invoke(question):
                return openai.responses.create(
                    input=question,
                    extra_body={"agent_reference": {
                        "name": env["AZURE_FOUNDRY_AGENT_NAME"],
                        "version": env["AZURE_FOUNDRY_AGENT_VERSION"],
                        "type": "agent_reference",
                    }},
                ).output_text
        rows = []
        try:
            for case in cases:
                if args.trace:
                    with tracer.start_as_current_span(f"{args.target}.answer") as span:
                        span.set_attribute("scenario.case_id", case["id"])
                        text = invoke(case["question"])
                else:
                    text = invoke(case["question"])
                rows.append({"id": case["id"], "response": text, "target": args.target, "role": args.role})
        finally:
            client.close()
            if args.target == "agent":
                openai.close()
    args.output.write_text(
        "".join(json.dumps(row) + "\n" for row in rows), encoding="utf-8",
    )
    print(f"Captured {len(rows)} actual {args.target} responses to {args.output}.")
    print("The role selects cases only. Verify the signed-in identity and downstream access separately.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
