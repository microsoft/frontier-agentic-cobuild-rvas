"""Single-machine task storage. The local operator is trusted."""
from __future__ import annotations

from contextlib import closing, contextmanager
from dataclasses import asdict, dataclass, field
import fcntl
import json
import math
import os
from pathlib import Path
import re
import sqlite3


class TaskError(Exception):
    """An execution boundary or state error the operator must see."""


@dataclass
class Task:
    id: str
    mode: str
    scope: list[str]
    prompt: str
    allow_writes: bool = False
    status: str = "ready"
    frames: list[dict] = field(default_factory=list)
    cursor: int = 0
    turns: int = 0
    calls: int = 0
    max_turns: int = 8
    max_calls: int = 12
    seconds_left: float = 120.0
    queue: list[dict] = field(default_factory=list)
    pending: dict | None = None
    evidence: list[dict] = field(default_factory=list)
    outputs: list[dict] = field(default_factory=list)
    remote: dict = field(default_factory=dict)
    model_inflight: bool = False
    error: str | None = None
    answer: str = ""


class Store:
    def __init__(self, root: Path):
        self.root = root.expanduser().resolve()
        repo = Path(__file__).resolve().parents[3]
        for published in (repo / "scenarios", repo / "docs"):
            if self.root == published or published in self.root.parents:
                raise TaskError("State must be outside the scenario and published site trees.")
        self.root.mkdir(parents=True, exist_ok=True, mode=0o700)
        self.path = self.root / "tasks.sqlite3"
        with self.connect() as db:
            db.execute("CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, payload TEXT NOT NULL)")

    @contextmanager
    def connect(self):
        with closing(sqlite3.connect(self.path, timeout=2)) as db:
            with db:
                yield db

    @staticmethod
    def check_id(task_id: str):
        if not re.fullmatch(r"[0-9a-f]{32}", task_id):
            raise TaskError("Invalid task ID.")

    def save(self, task: Task):
        self.check_id(task.id)
        with self.connect() as db:
            db.execute(
                "INSERT INTO tasks VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET payload=excluded.payload",
                (task.id, json.dumps(asdict(task), allow_nan=False)),
            )

    def load(self, task_id: str) -> Task:
        self.check_id(task_id)
        with self.connect() as db:
            row = db.execute("SELECT payload FROM tasks WHERE id=?", (task_id,)).fetchone()
        if row is None:
            raise TaskError("Task not found.")
        try:
            task = Task(**json.loads(row[0]))
            if task.id != task_id or task.mode not in ("offline", "live"):
                raise ValueError("identity or mode mismatch")
            if not isinstance(task.scope, list) or not all(isinstance(item, str) and item for item in task.scope):
                raise ValueError("invalid scope")
            if any(type(value) is not int or value < 0 for value in (task.turns, task.calls, task.cursor)):
                raise ValueError("invalid counters")
            if not isinstance(task.seconds_left, (int, float)) or not math.isfinite(task.seconds_left) or task.seconds_left < 0:
                raise ValueError("invalid time budget")
            if task.status not in (
                "ready", "waiting_approval", "approved", "dispatching", "unresolved",
                "completed", "denied", "failed", "exhausted",
            ):
                raise ValueError("unknown task status")
            if not all(isinstance(value, list) for value in (task.frames, task.queue, task.evidence, task.outputs)):
                raise ValueError("invalid task collections")
            return task
        except (TypeError, ValueError) as exc:
            raise TaskError(f"Invalid task state: {exc}") from exc

    @contextmanager
    def claim(self, task_id: str):
        self.check_id(task_id)
        # Kernel locks are released on process exit, including a hard crash.
        with (self.root / f"{task_id}.lock").open("a") as handle:
            try:
                fcntl.flock(handle, fcntl.LOCK_EX | fcntl.LOCK_NB)
            except BlockingIOError as exc:
                raise TaskError("Another process is already operating this task.") from exc
            try:
                yield
            finally:
                fcntl.flock(handle, fcntl.LOCK_UN)


def default_root() -> Path:
    return Path(os.environ.get("XDG_STATE_HOME", str(Path.home() / ".local/state"))) / "operational-agents"
