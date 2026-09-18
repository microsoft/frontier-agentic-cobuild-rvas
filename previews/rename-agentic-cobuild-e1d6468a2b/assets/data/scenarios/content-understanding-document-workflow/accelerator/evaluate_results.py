#!/usr/bin/env python3
"""Compare a captured normalized result with a reviewed expected result."""
import argparse
import json
import math
from pathlib import Path


def evaluate(actual: dict, expected: dict, minimum: float = 1.0) -> dict:
    if not math.isfinite(minimum) or not 0 < minimum <= 1:
        raise ValueError("minimum must be greater than zero and at most one")
    if not expected.get("fields") or not isinstance(actual.get("fields"), dict):
        raise ValueError("expected and actual results must contain fields")
    threshold = actual.get("confidence_threshold")
    if type(threshold) not in (int, float) or not math.isfinite(threshold) or not 0 < threshold <= 1:
        raise ValueError("actual result needs a valid confidence_threshold")
    for key in ("document_id", "document_class", "source_sha256"):
        if not expected.get(key) or actual.get(key) != expected[key]:
            raise ValueError(f"{key} must match the reviewed expected result")
    matches, failures = 0, []
    for name, expected_value in expected["fields"].items():
        field = actual["fields"].get(name)
        if not isinstance(field, dict):
            failures.append(f"missing_field:{name}")
            continue
        if field.get("value") == expected_value:
            matches += 1
        else:
            failures.append(f"wrong_value:{name}")
        if field.get("value") is not None and not field.get("evidence", {}).get("spans"):
            failures.append(f"no_evidence:{name}")
        confidence = field.get("confidence")
        uncertain = (
            type(confidence) not in (int, float) or not math.isfinite(confidence)
            or not threshold <= confidence <= 1
        )
        if uncertain and actual.get("requires_human_review") is not True:
            failures.append(f"uncertainty_not_reviewed:{name}")
    reasons = actual.get("review_reasons")
    review = actual.get("requires_human_review")
    if not isinstance(reasons, list) or type(review) is not bool:
        raise ValueError("review_reasons and requires_human_review are required")
    routing = actual.get("routing_decision")
    if (review and routing != "route_human_review") or (
        not review and routing != "ready_for_approval"
    ) or (bool(reasons) != review):
        failures.append("inconsistent_review_routing")
    false_approval = expected.get("requires_human_review") is True and not review
    if false_approval:
        failures.append("false_approval")
    for reason in expected.get("review_reasons", []):
        if reason not in reasons:
            failures.append(f"missing_review_reason:{reason}")
    accuracy = matches / len(expected["fields"])
    blocking = [failure for failure in failures if not failure.startswith("wrong_value:")]
    return {
        "document_id": actual["document_id"],
        "field_accuracy": accuracy,
        "false_approval_rate": int(false_approval),
        "review_rate": int(review),
        "failures": failures,
        "passed": accuracy >= minimum and not blocking,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--actual", type=Path, required=True)
    parser.add_argument("--expected", type=Path, required=True)
    parser.add_argument("--minimum", type=float, default=1.0)
    parser.add_argument("--report", type=Path, required=True)
    args = parser.parse_args()
    try:
        report = evaluate(json.loads(args.actual.read_text()), json.loads(args.expected.read_text()), args.minimum)
        args.report.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    except (OSError, ValueError, TypeError, AttributeError) as error:
        parser.exit(2, f"Evaluation failed: {error}\n")
    print(json.dumps(report, indent=2))
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
