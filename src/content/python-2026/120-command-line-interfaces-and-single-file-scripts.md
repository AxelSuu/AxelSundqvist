---
title: "Command-line interfaces and single-file scripts"
blurb: "Typer and Click, and the inline metadata that makes a single file runnable anywhere."
part: "Practices"
---

| Library | Notes |
|---|---|
| [`argparse`](https://docs.python.org/3/library/argparse.html) | Stdlib. Sufficient for a handful of flags. Colour output added in 3.14. |
| [Typer](https://typer.tiangolo.com/) | Builds on Click; derives parameters, types and help from function signatures. |
| [Click](https://click.palletsprojects.com/) | Decorator-based. Ships [`CliRunner`](https://click.palletsprojects.com/en/stable/testing/) for invoking commands in-process from tests. |
| [Cyclopts](https://cyclopts.readthedocs.io/) | Type-hint-driven alternative to Typer with different conventions for parameter binding. |
| [Rich](https://rich.readthedocs.io/) | Terminal output formatting; integrates with Typer and Click. |

[PEP 723](https://peps.python.org/pep-0723/) allows a single file to declare its interpreter requirement and dependencies inline:

```python
# /// script
# requires-python = ">=3.13"
# dependencies = ["httpx", "rich"]
# ///
```

[`uv run script.py`](https://docs.astral.sh/uv/guides/scripts/) provisions an ephemeral environment from that block. This removes the need for a separate requirements file or a pre-existing virtual environment for standalone scripts, which is the common case for repository tooling in projects whose main language is not Python.

CLI applications are published as packages with a [`[project.scripts]`](https://packaging.python.org/en/latest/specifications/entry-points/) entry point and installed with `uv tool install` or [`pipx`](https://pipx.pypa.io/).
