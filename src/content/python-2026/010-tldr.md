---
title: "TLDR"
blurb: "Short summary of practices."
---

* **Toolchain:** Use [`uv`](https://docs.astral.sh/uv/) for dependencies, interpreters, tools, scripts, and builds.
* **Formatting & Linting:** Use [`ruff`](https://docs.astral.sh/ruff/) for both linting and formatting.
* **Data Modeling:** Use [`Pydantic`](https://docs.pydantic.dev/) at I/O boundaries; native [`dataclasses`](https://docs.python.org/3/library/dataclasses.html) or [`attrs`](https://www.attrs.org/) internally.
* **Configuration:** Use [`pydantic-settings`](https://docs.pydantic.dev/latest/concepts/pydantic_settings/) for configuration, validated strictly at startup.
* **Project Metadata:** Everything configured in [`pyproject.toml`](https://packaging.python.org/en/latest/specifications/pyproject-toml/); dev dependencies managed via standard [`[dependency-groups]`](https://peps.python.org/pep-0735/).
* **Project Structure:** Use `src/` layout, commit your lockfile, and enforce `uv lock --check` in CI.
* **Type Checking:** Run a type checker in CI, strict on new code ([`pyright`](https://microsoft.github.io/pyright/), or [`pyrefly`](https://pyrefly.org/) on large codebases).
* **Logging:** Structured logging configured once at the application entry point—never inside reusable libraries.
* **Concurrency:** Use [`TaskGroup`](https://docs.python.org/3/library/asyncio-task.html#task-groups) and [`asyncio.timeout`](https://docs.python.org/3/library/asyncio-task.html#asyncio.timeout) for async I/O; processes for CPU-bound tasks.
* **Testing:** Use [`pytest`](https://docs.pytest.org/) with fixtures and parametrization; [`Hypothesis`](https://hypothesis.readthedocs.io/) for property-based invariants; [`Testcontainers`](https://testcontainers-python.readthedocs.io/) instead of database mocks.
* **CLIs & Tooling:** Use [`Typer`](https://typer.tiangolo.com/) or [`Cyclopts`](https://cyclopts.readthedocs.io/) for production CLIs; [`# /// script`](https://peps.python.org/pep-0723/) inline metadata for single-file tools.
* **Performance:** Profile before optimizing using [`py-spy`](https://github.com/benfred/py-spy), [`scalene`](https://github.com/plasma-umass/scalene), or [`memray`](https://bloomberg.github.io/memray/).
* **Security & CI/CD:** Pin GitHub Actions to commit SHAs; publish packages to PyPI via [Trusted Publishers](https://docs.pypi.org/trusted-publishers/) (OIDC).
