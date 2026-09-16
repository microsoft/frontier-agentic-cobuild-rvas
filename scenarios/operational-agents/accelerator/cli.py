"""Run from the repository root; --help lists every supported command."""
from __future__ import annotations

import argparse
from dataclasses import asdict
import getpass
import json
from pathlib import Path
import sqlite3
import sys

from runtime import Engine
from state import Store, TaskError, default_root
from tools import Backend


FIXTURES = Path(__file__).resolve().parent / "sample-data"


def parser():
    result = argparse.ArgumentParser(description=__doc__)
    result.add_argument("--state-dir", type=Path, default=default_root())
    commands = result.add_subparsers(dest="command", required=True)
    start = commands.add_parser("start", help="Create and run a bounded task")
    start.add_argument("--mode", choices=["offline", "live"], default="offline")
    start.add_argument("--fixture", type=Path, default=FIXTURES / "read.json")
    start.add_argument("--scope", nargs="+", default=["record-001"])
    start.add_argument("--prompt", default="Inspect record-001 and report its current value and version.")
    start.add_argument("--allow-writes", action="store_true")
    start.add_argument("--max-turns", type=int, default=8)
    start.add_argument("--max-calls", type=int, default=12)
    start.add_argument("--seconds", type=float, default=120.0)
    start.add_argument("--agent-name")
    start.add_argument("--agent-version")
    for name in ("show", "resume", "reconcile", "approve", "deny"):
        sub = commands.add_parser(name)
        sub.add_argument("task_id")
        if name in ("approve", "deny"):
            sub.add_argument("--digest", required=True, help="Exact pending proposal digest from show")
        if name == "resume":
            sub.add_argument("--fault", choices=["before-dispatch", "after-commit"],
                             help="Offline-only process interruption exercise")
    commands.add_parser("records", help="Inspect the shipped synthetic record")
    setup = commands.add_parser("setup-live", help="Create a versioned prompt agent in your configured project")
    setup.add_argument("--agent-name", required=True)
    return result


def main() -> int:
    args = parser().parse_args()
    try:
        if args.command == "setup-live":
            from foundry_client import setup_agent
            print(json.dumps(setup_agent(args.agent_name), indent=2))
            return 0
        store = Store(args.state_dir)
        backend = Backend(store.root)
        if args.command == "start":
            driver = None
            remote = {}
            if args.mode == "live":
                from foundry_client import FoundryDriver
                if not args.agent_name or not args.agent_version:
                    raise TaskError("Run setup-live, then supply --agent-name and --agent-version.")
                driver = FoundryDriver()
                remote = {**driver.config, "agent_name": args.agent_name, "agent_version": args.agent_version}
            frames = json.loads(args.fixture.read_text()) if args.mode == "offline" else []
            if not isinstance(frames, list):
                raise TaskError("Offline fixture must be a list of response frames.")
            backend.seed(json.loads((FIXTURES / "records.json").read_text()))
            engine = Engine(store, backend, driver)
            task = engine.create(
                args.mode, args.scope, args.prompt, frames, args.allow_writes,
                args.max_turns, args.max_calls, args.seconds,
            )
            task.remote = remote
            store.save(task)
            task = engine.run(task.id)
        elif args.command == "records":
            print(json.dumps(backend.inspect("record-001"), indent=2))
            return 0
        elif args.command == "show":
            task = store.load(args.task_id)
        elif args.command in ("approve", "deny"):
            task = Engine(store, backend).decide(
                args.task_id, args.digest, args.command == "approve", getpass.getuser(),
            )
        elif args.command == "reconcile":
            task = Engine(store, backend).reconcile(args.task_id)
        else:
            task = store.load(args.task_id)
            driver = None
            if task.mode == "live":
                from foundry_client import FoundryDriver
                if args.fault:
                    raise TaskError("Fault injection is available only for offline tasks.")
                driver = FoundryDriver()
            task = Engine(store, backend, driver, args.fault).run(task.id)
        print(json.dumps(asdict(task), indent=2))
        return 1 if task.status in ("failed", "exhausted", "unresolved", "dispatching") else 0
    except (TaskError, OSError, sqlite3.Error, ValueError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
