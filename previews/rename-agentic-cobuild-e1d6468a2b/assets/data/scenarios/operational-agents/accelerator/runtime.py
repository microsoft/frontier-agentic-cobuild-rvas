"""The same bounded execution engine serves offline and live drivers."""
from __future__ import annotations

import json
import math
import time
import uuid
from datetime import datetime, timezone

from state import Store, Task, TaskError
from tools import Backend, proposal_digest, validate_call


class OfflineDriver:
    def next(self, task: Task, timeout: float) -> dict:
        if task.cursor >= len(task.frames):
            return {"calls": [], "text": "Scripted exercise finished; inspect the operation evidence."}
        frame = task.frames[task.cursor]
        task.cursor += 1
        return frame


class Engine:
    def __init__(self, store: Store, backend: Backend, driver=None, fault: str | None = None):
        self.store = store
        self.backend = backend
        self.driver = driver or OfflineDriver()
        self.fault = fault

    def create(self, mode: str, scope: list[str], prompt: str, frames=None,
               allow_writes=False, max_turns=8, max_calls=12, seconds=120.0) -> Task:
        if mode not in ("offline", "live") or not scope or not all(isinstance(x, str) and x for x in scope):
            raise TaskError("Choose offline/live mode and at least one record in scope.")
        if not prompt.strip():
            raise TaskError("Task prompt is required.")
        if max_turns < 1 or max_calls < 1 or not math.isfinite(seconds) or seconds <= 0:
            raise TaskError("Execution budgets must be finite and positive.")
        task = Task(
            id=uuid.uuid4().hex, mode=mode, scope=scope, prompt=prompt,
            frames=frames or [], allow_writes=allow_writes,
            max_turns=max_turns, max_calls=max_calls, seconds_left=seconds,
        )
        self.store.save(task)
        return task

    def _attempt(self, task: Task, operation, kind="tool"):
        if task.seconds_left <= 0 or (
            kind == "model" and task.turns >= task.max_turns
        ) or (kind == "tool" and task.calls >= task.max_calls):
            task.status = "exhausted"
            raise TaskError("Execution budget exhausted; do not reset counters to resume.")
        if kind == "model":
            task.turns += 1
        else:
            task.calls += 1
        # Reserve before external work so a crash cannot reset the time budget.
        reservation = min(30.0, task.seconds_left)
        task.seconds_left -= reservation
        self.store.save(task)
        started = time.monotonic()
        try:
            return operation(reservation)
        finally:
            elapsed = time.monotonic() - started
            task.seconds_left += max(0.0, reservation - elapsed)
            self.store.save(task)

    def _read(self, task: Task, operation):
        for attempt in range(3):
            try:
                return self._attempt(task, lambda _: operation())
            except TimeoutError:
                if attempt == 2:
                    raise
        raise AssertionError("Unreachable")

    def _record(self, task: Task, call: dict, result: dict, approval: dict | None = None):
        entry = {"call": call, "result": result}
        if approval is not None:
            entry["approval"] = approval
        task.evidence.append(entry)
        task.outputs.append({
            "type": "function_call_output", "call_id": call["call_id"],
            "output": json.dumps(result),
        })

    def decide(self, task_id: str, digest: str, approve: bool, actor: str) -> Task:
        with self.store.claim(task_id):
            task = self.store.load(task_id)
            if task.status != "waiting_approval" or not task.pending:
                raise TaskError("Task has no pending approval.")
            pending = task.pending
            if digest != pending["digest"] or digest != proposal_digest(task.id, pending["call"]):
                raise TaskError("Proposal changed; approval is invalid.")
            if not actor.strip():
                raise TaskError("Operator attribution is required.")
            pending["decision"] = {
                "approved": approve, "actor": actor,
                "decided_at": datetime.now(timezone.utc).isoformat(),
                "digest": digest,
            }
            task.status = "approved" if approve else "denied"
            if not approve:
                self._record(task, pending["call"], {"status": "denied", "actor": actor}, pending["decision"])
            self.store.save(task)
            return task

    def _verify_result(self, task: Task, result: dict):
        pending = task.pending
        if not pending:
            raise TaskError("Missing pending operation.")
        args = pending["call"]["arguments"]
        expected = {
            "operation_id": pending["operation_id"],
            "record_id": args["record_id"],
            "value": args["new_value"],
            "version": args["expected_version"] + 1,
        }
        if result != expected:
            raise TaskError("Operation evidence does not match the approved proposal.")

    def _reconcile(self, task: Task):
        if not task.pending:
            raise TaskError("Cannot reconcile without an operation identifier.")
        self._approved_call(task)
        task.status = "unresolved"
        self.store.save(task)
        try:
            result = self._read(task, lambda: self.backend.operation(task.pending["operation_id"]))
        except (TaskError, TimeoutError):
            task.status = "unresolved"
            raise
        if result is None:
            task.error = "No committed operation evidence. No write was replayed; operator review required."
            return
        self._verify_result(task, result)
        self._record(task, task.pending["call"], result, task.pending["decision"])
        task.pending = None
        task.status = "ready"
        task.error = None

    def reconcile(self, task_id: str) -> Task:
        with self.store.claim(task_id):
            task = self.store.load(task_id)
            if task.status not in ("dispatching", "unresolved"):
                raise TaskError("Task has no uncertain write to reconcile.")
            try:
                self._reconcile(task)
            except (TaskError, TimeoutError) as exc:
                task.error = str(exc)
            self.store.save(task)
            return task

    def _approved_call(self, task: Task) -> dict:
        pending = task.pending
        if not pending or pending.get("decision", {}).get("approved") is not True:
            raise TaskError("Explicit approval is missing.")
        call = pending["call"]
        validate_call(call, task.scope)
        if (
            not task.allow_writes or pending["digest"] != proposal_digest(task.id, call)
            or pending["decision"].get("digest") != pending["digest"]
        ):
            raise TaskError("Approved proposal or write boundary changed.")
        return call

    def _apply(self, task: Task):
        call = self._approved_call(task)
        pending = task.pending
        current = self._read(task, lambda: self.backend.inspect(call["arguments"]["record_id"]))
        if current["version"] != call["arguments"]["expected_version"]:
            raise TaskError("Stale proposal. Obtain new approval in a new task.")
        # Check capacity before marking the write as possibly dispatched.
        if task.calls >= task.max_calls or task.seconds_left <= 0:
            task.status = "exhausted"
            raise TaskError("Execution budget exhausted before write dispatch.")
        task.status = "dispatching"
        self.store.save(task)
        if self.fault == "before-dispatch":
            raise SystemExit("Injected interruption before dispatch. Inspect and reconcile this task.")
        self._attempt(task, lambda _: self.backend.apply(pending["operation_id"], call["arguments"]))
        if self.fault == "after-commit":
            raise SystemExit("Injected interruption after tool commit. Reconcile this task.")
        self._reconcile(task)

    def run(self, task_id: str) -> Task:
        with self.store.claim(task_id):
            task = self.store.load(task_id)
            if task.status in ("completed", "denied", "failed", "exhausted", "waiting_approval"):
                return task
            try:
                if task.mode == "live" and isinstance(self.driver, OfflineDriver):
                    raise TaskError("Live task requires the live adapter; offline fallback is forbidden.")
                if task.status in ("dispatching", "unresolved"):
                    self._reconcile(task)
                    if task.status != "ready":
                        return task
                if task.model_inflight:
                    raise TaskError("Interrupted model request. Remote state is uncertain; start a new task.")
                if task.status == "approved":
                    self._apply(task)
                    if task.status != "ready":
                        return task
                while task.status == "ready":
                    if not task.queue:
                        task.model_inflight = True
                        frame = self._attempt(
                            task, lambda timeout: self.driver.next(task, timeout), kind="model",
                        )
                        task.model_inflight = False
                        if not isinstance(frame, dict) or set(frame) != {"calls", "text"}:
                            raise TaskError("Invalid model response contract.")
                        if not isinstance(frame["calls"], list) or not isinstance(frame["text"], str):
                            raise TaskError("Invalid model response field types.")
                        task.outputs = []
                        task.queue = frame["calls"]
                        for call in task.queue:
                            validate_call(call, task.scope)
                        ids = [call.get("call_id") for call in task.queue if isinstance(call, dict)]
                        prior_ids = {item["call"]["call_id"] for item in task.evidence}
                        if len(ids) != len(task.queue) or len(set(ids)) != len(ids) or prior_ids.intersection(ids):
                            raise TaskError("Duplicate or invalid tool call IDs.")
                        self.store.save(task)
                        if not task.queue:
                            if not task.evidence:
                                raise TaskError("No verified tool evidence; model text alone cannot complete this task.")
                            task.answer = frame["text"]
                            task.status = "completed"
                            break
                    call = task.queue[0]
                    validate_call(call, task.scope)
                    if call["name"] == "propose_update":
                        if not task.allow_writes:
                            raise TaskError("Read-only task: mutation proposals are disabled.")
                        task.queue.pop(0)
                        task.pending = {
                            "call": call, "digest": proposal_digest(task.id, call),
                            "operation_id": uuid.uuid4().hex,
                        }
                        task.status = "waiting_approval"
                    else:
                        result = self._read(task, lambda: self.backend.inspect(call["arguments"]["record_id"]))
                        self._record(task, call, result)
                        task.queue.pop(0)
                    self.store.save(task)
            except (TaskError, TimeoutError) as exc:
                task.error = str(exc)
                if task.status in ("dispatching", "unresolved"):
                    task.status = "unresolved"
                elif task.status != "exhausted":
                    task.status = "failed"
            finally:
                self.store.save(task)
            return task
