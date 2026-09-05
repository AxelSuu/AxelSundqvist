---
title: "TLDR"
blurb: "Short summary of practices."
---

* **Toolchain:** Use `uv` for dependencies, interpreters, tools, scripts, and builds.
* **Formatting & Linting:** Use `ruff` for both linting and formatting.
* **Data Modeling:** Use `Pydantic` at I/O boundaries; native `dataclasses` or `attrs` internally.
* **Configuration:** Use `pydantic-settings` for configuration, validated strictly at startup.
* **Project Metadata:** Everything configured in `pyproject.toml`; dev dependencies managed via standard `[dependency-groups]`.
* **Project Structure:** Use `src/` layout, commit your lockfile, and enforce `uv lock --check` in CI.
* **Type Checking:** Run a type checker in CI, strict on new code (`pyright`, or `pyrefly` on large codebases).
* **Logging:** Structured logging configured once at the application entry point—never inside reusable libraries.
* **Concurrency:** Use `TaskGroup` and `asyncio.timeout` for async I/O; processes for CPU-bound tasks.
* **Testing:** Use `pytest` with fixtures and parametrization; `Hypothesis` for property-based invariants; `Testcontainers` instead of database mocks.
* **CLIs & Tooling:** Use `Typer` or `Cyclopts` for production CLIs; `# /// script` inline metadata for single-file tools.
* **Performance:** Profile before optimizing using `py-spy`, `scalene`, or `memray`.
* **Security & CI/CD:** Pin GitHub Actions to commit SHAs; publish packages to PyPI via Trusted Publishers (OIDC).
