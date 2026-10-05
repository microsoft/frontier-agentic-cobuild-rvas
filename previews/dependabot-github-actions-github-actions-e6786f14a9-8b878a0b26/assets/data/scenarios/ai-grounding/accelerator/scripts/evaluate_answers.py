#!/usr/bin/env python3
"""Gate captured scenario answers on citation markers and exact refusals.

This checks response contracts, not semantic correctness or retrieval recall.
Each JSONL row must contain a golden case id and the actual response string.
"""
from __future__ import annotations

import argparse
import json
import math
from pathlib import Path

from _shared import GOLDEN_QUESTIONS
from compare_models import score_case


def evaluate(cases: list[dict], responses: list[dict], minimum: float = 1.0) -> dict:
    if not math.isfinite(minimum) or not 0 < minimum <= 1:
        raise ValueError("minimum must be greater than zero and at most one")
    if not cases:
        raise ValueError("the selected golden set is empty")
    expected = {}
    for case in cases:
        if not isinstance(case, dict) or not isinstance(case.get("id"), str) or not case["id"]:
            raise ValueError("each golden case needs a non-empty id")
        if case["id"] in expected:
            raise ValueError(f"duplicate golden case: {case['id']}")
        if case.get("expected_behavior") not in ("answer", "refuse"):
            raise ValueError(f"{case['id']}: expected_behavior must be answer or refuse")
        expected[case["id"]] = case
    actual = {}
    for row in responses:
        if not isinstance(row, dict) or not isinstance(row.get("id"), str):
            raise ValueError("each response needs a string id")
        if row["id"] not in expected or row["id"] in actual:
            raise ValueError(f"unknown or duplicate response id: {row['id']}")
        if not isinstance(row.get("response"), str) or not row["response"].strip():
            raise ValueError(f"{row['id']}: response must be a non-empty string")
        actual[row["id"]] = row["response"]
    missing = sorted(expected.keys() - actual.keys())
    if missing:
        raise ValueError(f"missing responses: {', '.join(missing)}")
    results = []
    for case_id, case in expected.items():
        scores = score_case(case, actual[case_id])
        passed = scores["grounded"] if case["expected_behavior"] == "answer" else scores["abstained"]
        results.append({"id": case_id, "passed": passed, "checks": scores})
    rate = sum(row["passed"] for row in results) / len(results)
    # Access-denied/refusal failures and stale citations always block release.
    boundary_failed = any(
        not row["checks"]["recency"]
        or (expected[row["id"]]["expected_behavior"] == "refuse" and not row["passed"])
        for row in results
    )
    return {
        "metric": "response_contract_pass_rate",
        "pass_rate": rate,
        "minimum": minimum,
        "passed": rate >= minimum and not boundary_failed,
        "cases": results,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--responses", type=Path, required=True)
    parser.add_argument("--dataset", type=Path, default=GOLDEN_QUESTIONS)
    parser.add_argument("--role", help="Select cases for one fixture role; this does not select an identity.")
    parser.add_argument("--minimum", type=float, default=1.0)
    parser.add_argument("--report", type=Path, required=True)
    args = parser.parse_args()
    try:
        dataset = json.loads(args.dataset.read_text(encoding="utf-8"))
        if not isinstance(dataset, dict) or not isinstance(dataset.get("cases"), list):
            raise ValueError("dataset must contain a cases array")
        cases = dataset["cases"]
        if args.role:
            cases = [case for case in cases if isinstance(case, dict) and args.role in case.get("role_groups", [])]
        responses = [
            json.loads(line) for line in args.responses.read_text(encoding="utf-8").splitlines()
            if line.strip()
        ]
        report = evaluate(cases, responses, args.minimum)
        args.report.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    except (OSError, ValueError) as error:
        parser.exit(2, f"Evaluation failed: {error}\n")
    for row in report["cases"]:
        print(f"{'PASS' if row['passed'] else 'FAIL'} {row['id']}")
    print(f"Response contract pass rate: {report['pass_rate']:.2f}; required: {args.minimum:.2f}")
    print("Review answer meaning against acceptance_criteria separately; this is not a groundedness score.")
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
