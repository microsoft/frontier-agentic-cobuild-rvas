"""Behavioral checks. Offline checks do not prove a live deployment."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ROOT = Path(__file__).resolve().parent


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--case", choices=["all", "approval", "recovery", "limits"], default="all")
    parser.add_argument("--live", action="store_true", help="Make a real read-only Foundry call")
    parser.add_argument("--agent-name")
    parser.add_argument("--agent-version")
    args = parser.parse_args()
    if args.live:
        if not args.agent_name or not args.agent_version:
            parser.error("--live requires --agent-name and --agent-version")
        with tempfile.TemporaryDirectory(prefix="operational-agents-live-") as state:
            result = subprocess.run([
                sys.executable, "-B", str(ROOT / "cli.py"), "--state-dir", state,
                "start", "--mode", "live", "--agent-name", args.agent_name,
                "--agent-version", args.agent_version,
            ], text=True, capture_output=True, timeout=150)
            if result.returncode:
                print(result.stdout + result.stderr, file=sys.stderr)
                return 1
            task = json.loads(result.stdout)
            passed = task["status"] == "completed" and any(
                row["call"]["name"] == "inspect_record" and row["result"]["record_id"] == "record-001"
                for row in task["evidence"]
            )
            print(json.dumps({"live_read_passed": passed, "task": task}, indent=2))
            return 0 if passed else 1
    suite = unittest.defaultTestLoader.discover(str(ROOT / "tests"), pattern="test_*.py")
    if args.case != "all":
        selected = unittest.TestSuite()
        for group in suite:
            for tests in group:
                for test in tests:
                    if f"test_{args.case}_" in test.id():
                        selected.addTest(test)
        suite = selected
    if not suite.countTestCases():
        parser.error("No behavioral checks selected")
    return 0 if unittest.TextTestRunner(verbosity=2).run(suite).wasSuccessful() else 1


if __name__ == "__main__":
    raise SystemExit(main())
