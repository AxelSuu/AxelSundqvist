---
title: "Command-line interfaces and single-file scripts"
blurb: "Typer and Click, and the inline metadata that makes a single file runnable anywhere."
part: "Practices"
---

| Library | Notes |
|---|---|
| `argparse` | Stdlib. Sufficient for a handful of flags. Colour output added in 3.14. |
| Typer | Builds on Click; derives parameters, types and help from function signatures. |
| Click | Decorator-based, mature, extensive plugin and testing support. |
| Cyclopts | Type-hint-driven alternative to Typer with different conventions for parameter binding. |
| Rich | Terminal output formatting; integrates with Typer and Click. |

PEP 723 allows a single file to declare its interpreter requirement and dependencies inline:

```python
# /// script
# requires-python = ">=3.13"
# dependencies = ["httpx", "rich"]
# ///
```

`uv run script.py` provisions an ephemeral environment from that block. This removes the need for a separate requirements file or a pre-existing virtual environment for standalone scripts, which is the common case for repository tooling in projects whose main language is not Python.

CLI applications are published as packages with a `[project.scripts]` entry point and installed with `uv tool install` or `pipx`.
