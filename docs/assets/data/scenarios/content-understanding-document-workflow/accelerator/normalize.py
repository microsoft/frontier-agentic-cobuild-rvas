#!/usr/bin/env python3
"""Normalize one Content Understanding invoice into a reviewable result."""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
from decimal import Decimal, InvalidOperation
from pathlib import Path

FIELD_PATHS = {
    "invoice_number": ("InvoiceId",),
    "purchase_order": ("PONumber",),
    "supplier": ("VendorName",),
    "subtotal_usd": ("SubtotalAmount", "Amount"),
    "tax_usd": ("TotalTaxAmount", "Amount"),
    "total_due_usd": ("AmountDue", "Amount"),
}


def normalize(payload: dict, document_id: str, source: bytes, threshold: float = 0.85) -> dict:
    if not document_id.strip() or not source:
        raise ValueError("document ID and original source bytes are required")
    if not math.isfinite(threshold) or not 0 < threshold <= 1:
        raise ValueError("threshold must be greater than zero and at most one")
    if payload.get("status") != "Succeeded":
        raise ValueError("analysis must have status Succeeded")
    contents = payload.get("result", {}).get("contents", [])
    if len(contents) != 1 or not isinstance(contents[0].get("fields"), dict):
        raise ValueError("expected exactly one analyzed document with fields")
    raw_fields = contents[0]["fields"]
    fields, reasons = {}, []
    for name, path in FIELD_PATHS.items():
        raw = raw_fields.get(path[0], {})
        if name.endswith("_usd"):
            currency = raw.get("valueObject", {}).get("CurrencyCode", {}).get("valueString")
            if currency != "USD":
                reasons.append(f"unverified_currency:{name}")
        for component in path[1:]:
            raw = raw.get("valueObject", {}).get(component, {})
        value = next((raw[key] for key in ("valueString", "valueNumber", "valueDate")
                      if key in raw), None)
        confidence = raw.get("confidence")
        region = raw.get("source")
        spans = raw.get("spans")
        page = re.match(r"^D\(([1-9]\d*),", region) if isinstance(region, str) else None
        valid_spans = isinstance(spans, list) and bool(spans) and all(
            isinstance(span, dict)
            and type(span.get("offset")) is int and span["offset"] >= 0
            and type(span.get("length")) is int and span["length"] > 0
            for span in spans
        )
        valid_confidence = (
            type(confidence) in (int, float) and math.isfinite(confidence)
            and 0 <= confidence <= 1
        )
        if value is None or value == "":
            reasons.append(f"missing_field:{name}")
        elif type(value) not in (str, int, float) or (
            isinstance(value, float) and not math.isfinite(value)
        ):
            raise ValueError(f"{name}: unsupported scalar value")
        if not page or not valid_spans:
            reasons.append(f"no_evidence:{name}")
            value = None
        if not valid_confidence:
            reasons.append(f"missing_confidence:{name}")
        elif confidence < threshold:
            reasons.append(f"low_confidence:{name}")
        if name.endswith("_usd") and currency != "USD":
            value = None
        if name.endswith("_usd") and value is not None:
            if type(value) not in (int, float):
                raise ValueError(f"{name}: expected a numeric amount")
            value = str(Decimal(str(value)).quantize(Decimal("0.01")))
        elif value is not None and not isinstance(value, str):
            raise ValueError(f"{name}: expected a string")
        fields[name] = {
            "value": value,
            "confidence": confidence if valid_confidence else None,
            "evidence": {"page": int(page[1]) if page else None,
                         "source": region, "spans": spans if valid_spans else []},
        }
    amounts = [fields[name]["value"] for name in ("subtotal_usd", "tax_usd", "total_due_usd")]
    if all(amount is not None for amount in amounts):
        subtotal, tax, total = map(Decimal, amounts)
        if subtotal + tax != total:
            reasons.append("conflicting_invoice_total")
    return {
        "document_id": document_id, "document_class": "invoice",
        "source_sha256": hashlib.sha256(source).hexdigest(),
        "confidence_threshold": threshold, "fields": fields,
        "review_reasons": reasons, "requires_human_review": bool(reasons),
        "routing_decision": "route_human_review" if reasons else "ready_for_approval",
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--analysis", type=Path, required=True)
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--document-id", required=True)
    parser.add_argument("--threshold", type=float, default=0.85)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    try:
        result = normalize(json.loads(args.analysis.read_text()), args.document_id,
                           args.source.read_bytes(), args.threshold)
        args.output.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    except (OSError, ValueError, TypeError, AttributeError, InvalidOperation) as error:
        parser.exit(2, f"Normalization failed: {error}\n")
    print(f"{result['document_id']}: {result['routing_decision']}")
    for reason in result["review_reasons"]:
        print(f"REVIEW {reason}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
