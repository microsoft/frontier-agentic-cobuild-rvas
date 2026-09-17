import copy
import math
import unittest

from normalize import normalize
from evaluate_results import evaluate


def analysis():
    fields = {}
    for name, value in {
        "InvoiceId": "test", "PONumber": "test", "VendorName": "test",
        "SubtotalAmount": 200, "TotalTaxAmount": 20, "AmountDue": 220,
    }.items():
        leaf = {
            "valueNumber" if isinstance(value, int) else "valueString": value,
            "confidence": 0.9, "source": "D(1,0,0,1,0,1,1,0,1)",
            "spans": [{"offset": 0, "length": 4}],
        }
        fields[name] = {
            "valueObject": {"Amount": leaf, "CurrencyCode": {"valueString": "USD"}},
        } if isinstance(value, int) else leaf
    return {"status": "Succeeded", "result": {"contents": [{"fields": fields}]}}


class NormalizerTests(unittest.TestCase):
    def test_complete_invoice_requires_approval_and_preserves_source(self):
        payload = analysis()
        before = copy.deepcopy(payload)
        result = normalize(payload, "invoice", b"test")
        self.assertEqual(payload, before)
        self.assertEqual(result["routing_decision"], "ready_for_approval")
        self.assertEqual(result["fields"]["total_due_usd"]["value"], "220.00")
        self.assertEqual(len(result["source_sha256"]), 64)

    def test_missing_fields_and_confidence_route_to_review(self):
        payload = analysis()
        fields = payload["result"]["contents"][0]["fields"]
        del fields["InvoiceId"]
        del fields["VendorName"]["confidence"]
        result = normalize(payload, "invoice", b"test")
        self.assertIn("missing_field:invoice_number", result["review_reasons"])
        self.assertIn("missing_confidence:supplier", result["review_reasons"])
        self.assertEqual(result["routing_decision"], "route_human_review")

    def test_zero_is_preserved_and_conflicting_total_is_held(self):
        payload = analysis()
        payload["result"]["contents"][0]["fields"]["TotalTaxAmount"]["valueObject"]["Amount"]["valueNumber"] = 0
        result = normalize(payload, "invoice", b"test")
        self.assertEqual(result["fields"]["tax_usd"]["value"], "0.00")
        self.assertIn("conflicting_invoice_total", result["review_reasons"])

    def test_no_evidence_rejects_the_value(self):
        for field, value in (("source", ""), ("spans", []), ("spans", [{"offset": -1, "length": 4}])):
            payload = analysis()
            payload["result"]["contents"][0]["fields"]["VendorName"][field] = value
            result = normalize(payload, "invoice", b"test")
            self.assertIsNone(result["fields"]["supplier"]["value"])
            self.assertIn("no_evidence:supplier", result["review_reasons"])

    def test_nonfinite_confidence_and_low_confidence_are_held(self):
        for confidence, reason in ((math.nan, "missing_confidence"), (True, "missing_confidence"),
                                   (0.2, "low_confidence")):
            payload = analysis()
            payload["result"]["contents"][0]["fields"]["VendorName"]["confidence"] = confidence
            result = normalize(payload, "invoice", b"test")
            self.assertIn(f"{reason}:supplier", result["review_reasons"])

    def test_unknown_currency_is_held_and_wrong_scalar_type_is_rejected(self):
        payload = analysis()
        for currency in ("EUR", None):
            payload["result"]["contents"][0]["fields"]["AmountDue"]["valueObject"]["CurrencyCode"]["valueString"] = currency
            result = normalize(payload, "invoice", b"test")
            self.assertIn("unverified_currency:total_due_usd", result["review_reasons"])
            self.assertIsNone(result["fields"]["total_due_usd"]["value"])
        payload["result"]["contents"][0]["fields"]["InvoiceId"] = {
            "valueNumber": 123, "confidence": 0.9, "source": "D(1,0,0,1,0,1,1,0,1)",
            "spans": [{"offset": 0, "length": 3}],
        }
        with self.assertRaisesRegex(ValueError, "expected a string"):
            normalize(payload, "invoice", b"test")

    def test_invalid_threshold_and_failed_analysis_are_errors(self):
        for threshold in (0, -1, math.nan, math.inf, 1.1):
            with self.assertRaises(ValueError):
                normalize(analysis(), "invoice", b"test", threshold)
        with self.assertRaises(ValueError):
            normalize({"status": "Failed"}, "invoice", b"test")

    def test_evaluation_checks_values_source_and_review(self):
        actual = normalize(analysis(), "invoice", b"test")
        expected = {
            **actual, "fields": {name: field["value"] for name, field in actual["fields"].items()},
        }
        self.assertTrue(evaluate(actual, expected)["passed"])
        actual["fields"]["invoice_number"]["value"] = "wrong"
        self.assertFalse(evaluate(actual, expected)["passed"])
        expected["requires_human_review"] = True
        self.assertFalse(evaluate(actual, expected, 0.5)["passed"])
        actual["source_sha256"] = "different"
        with self.assertRaises(ValueError):
            evaluate(actual, expected)

    def test_evaluation_blocks_uncertainty_hidden_by_review_flags(self):
        actual = normalize(analysis(), "invoice", b"test")
        expected = {
            **actual, "fields": {name: field["value"] for name, field in actual["fields"].items()},
        }
        actual["fields"]["supplier"]["confidence"] = 0.2
        report = evaluate(actual, expected)
        self.assertFalse(report["passed"])
        self.assertIn("uncertainty_not_reviewed:supplier", report["failures"])
        actual["confidence_threshold"] = math.nan
        with self.assertRaises(ValueError):
            evaluate(actual, expected)


if __name__ == "__main__":
    unittest.main()
