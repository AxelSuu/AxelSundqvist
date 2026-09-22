---
title: "TLDR"
blurb: "Quick reference for state-of-the-art defaults in Python projects."
reviewed: 2026-09-06
---

These are my defaults for a new project. Each one links to the page that explains it.

* **Python:** [3.14](/python-2026/python-versions) for a new application, and 3.15 once its compiled dependencies ship wheels for it.
* **Toolchain:** [`uv`](/python-2026/environments-and-dependencies) for dependencies, interpreters, tools, scripts and builds.
* **Project:** all configuration in [`pyproject.toml`](/python-2026/project-configuration-and-layout), development tools in `[dependency-groups]`, a `src/` layout, and the lockfile committed.
* **Linting and formatting:** [`ruff`](/python-2026/linting-and-formatting) for both.
* **Type checking:** [`pyright`](/python-2026/type-checking) in CI, strict on new code, or `pyrefly` on a large codebase.
* **Data models:** [Pydantic](/python-2026/validation-and-data-models) at I/O boundaries, `dataclasses` or `attrs` inside them, and `pydantic-settings` for configuration, validated at startup.
* **Errors:** [one base exception per package](/python-2026/errors), with third-party exceptions wrapped where they enter, using `raise ... from`.
* **Logging:** [structured records](/python-2026/logging), configured once at the application entry point and never inside a library.
* **Concurrency:** [`TaskGroup` and `asyncio.timeout`](/python-2026/concurrency) for async I/O, and processes for CPU-bound work.
* **Testing:** [`pytest`](/python-2026/testing) with fixtures and parametrization, Hypothesis for invariants, and Testcontainers instead of database mocks.
* **CLIs:** [Typer or Cyclopts](/python-2026/command-line-interfaces-and-single-file-scripts) for a real CLI, and `# /// script` inline metadata for a single-file tool.
* **Documentation:** [MkDocs with Material and mkdocstrings](/python-2026/documentation), from the same docstrings the code carries.
* **CI:** [`uv sync --locked` first](/python-2026/continuous-integration), actions pinned to commit SHAs, and a read-only token.
* **Publishing:** [trusted publishing](/python-2026/packaging-and-distribution) to PyPI, so CI holds no API token.
* **Performance:** [profile before optimizing](/python-2026/profiling-and-optimization), with py-spy, Scalene or memray.
