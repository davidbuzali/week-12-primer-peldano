"""Extract the user-visible Week 12 exchange into a Markdown build record."""

from __future__ import annotations

import json
import re
import sqlite3
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parents[1]
DB = Path("/Users/davidbuzali/.codex/thread_history_1.sqlite")
THREAD_ID = "01a188b4-0253-76e3-a3a5-a55f30f4c6b7"
OUT = ROOT / "docs" / "BUILDCHAT.md"
TZ = ZoneInfo("America/Mexico_City")


def body_from_item(item_type: str, raw: str) -> tuple[str, str]:
    item = json.loads(raw)
    if item_type == "userMessage":
        body = "\n".join(
            block.get("text", "")
            for block in item.get("content", [])
            if block.get("type") == "text"
        ).strip()
        return "DAVID", body
    return "CODEX", item.get("text", "").strip()


def main() -> None:
    with sqlite3.connect(f"file:{DB}?mode=ro", uri=True) as connection:
        rows = connection.execute(
            """select created_at_ms, item_type, item_json
               from thread_items
               where thread_id = ? and item_type in ('userMessage', 'agentMessage')
               order by rollout_ordinal""",
            (THREAD_ID,),
        ).fetchall()

    lines = [
        "# BUILDCHAT - Primer Peldaño Week 12",
        "",
        "**Participant:** David Buzali",
        "",
        "**Development date:** 29 October 2026",
        "",
        "**Repository:** https://github.com/davidbuzali/week-12-primer-peldano",
        "",
        "**Live URL:** https://primer-peldano-mx.vercel.app",
        "",
        "This record contains the complete user-visible David-Codex exchange captured during the Week 12 rebuild through final deployment preparation. Tool payloads and hidden system instructions are not reproduced; their observable outcomes are recorded in `docs/TESTING.md`, Git history, and deployment IDs.",
        "",
    ]
    index = 0
    for created_ms, item_type, raw in rows:
        role, body = body_from_item(item_type, raw)
        if not body or body.startswith("<environment_context>") or body.startswith("<external_codex_apps_open_page>"):
            continue
        index += 1
        timestamp = datetime.fromtimestamp(created_ms / 1000, TZ).strftime("%H:%M:%S")
        body = re.sub(r"^#{1,2} ", "#### ", body, flags=re.MULTILINE)
        lines.extend([f"## {index}. {role} - {timestamp}", "", body, ""])

    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"{OUT}: {index} visible messages")


if __name__ == "__main__":
    main()
