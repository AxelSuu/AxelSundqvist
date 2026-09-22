---
title: "TLDR"
blurb: "Quick reference for state-of-the-art defaults in Python projects."
reviewed: 2026-09-06
---

These are my defaults for a new project. Each one links to the page that explains it.


* **Toolchain:** [`uv`](/python-2026/environments-and-dependencies) for dependencies, interpreters, tools, scripts and builds.
* **Project:** all configuration in [`pyproject.toml`](/python-2026/project-configuration-and-layout), development tools in `[dependency-groups]`, a `src/` layout, and the lockfile committed.
* **Linting and formatting:** [`ruff`](/python-2026/linting-and-formatting) for both.
* **Type checking:** [`ty`](/python-2026/type-checking) for type checker and language server.
* **Data models:** [Pydantic, `dataclasses` or `attrs`, and `pydantic-settings`](/python-2026/validation-and-data-models) for configuration.
* **Errors:** [one base exception per package](/python-2026/errors), with third-party exceptions wrapped where they enter, using `raise ... from`.
* **Logging:** [Loguru or structlog](/python-2026/logging), configured once at the application entry point and never inside a library.
* **Testing:** [`Hypothesis or pytest`](/python-2026/testing) with fixtures and parametrization.
* **CLIs:** [Typer or Cyclopts](/python-2026/command-line-interfaces-and-single-file-scripts).
* **Documentation:** [Sphinx or MkDocs with Material and mkdocstrings](/python-2026/documentation).
* **CI:** [`uv sync --locked` first](/python-2026/continuous-integration), actions pinned to commit SHAs, and a read-only token.
* **Publishing:** [trusted publishing](/python-2026/packaging-and-distribution) to PyPI.
