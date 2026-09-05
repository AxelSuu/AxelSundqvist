---
title: "Environments and dependencies"
blurb: "uv in place of pip, pyenv, pipx and Poetry, and why the interpreter belongs to the repository."
part: "Practices"
---

[`uv`](https://docs.astral.sh/uv/) covers the roles previously split across [pip](https://pip.pypa.io/), [pip-tools](https://pip-tools.readthedocs.io/), [virtualenv](https://virtualenv.pypa.io/), [pyenv](https://github.com/pyenv/pyenv), [pipx](https://pipx.pypa.io/) and [Poetry](https://python-poetry.org/docs/). It resolves and installs substantially faster than pip, manages interpreter installations, and produces a cross-platform lockfile ([`uv.lock`](https://docs.astral.sh/uv/concepts/projects/layout/#the-lockfile)).

| Command | Purpose |
|---|---|
| `uv init` | Create a project with `pyproject.toml` and a `src/` layout. |
| `uv add` / `uv remove` | Modify dependencies and update the lockfile. |
| `uv sync --locked` | Install exactly what the lockfile specifies; fails if it is stale. |
| `uv run` | Run a command in the project environment, syncing first. |
| `uv python install 3.14` | Install a specific interpreter version, independent of the system Python. |
| `uv tool install` | Install a CLI package into an isolated environment on `PATH`. |
| `uv build` / `uv publish` | Build wheels and source distributions, and upload them. |

Because `uv` manages interpreters, the Python version is a project-level declaration ([`requires-python`](https://packaging.python.org/en/latest/specifications/pyproject-toml/#requires-python), `.python-version`) rather than a machine-level prerequisite. This matters more than it sounds: it is the difference between a repository that a colleague can build and one that requires a paragraph of setup instructions.

Alternatives still in use: Poetry (mature, own resolver and lockfile format), [PDM](https://pdm-project.org/) (standards-focused), [Hatch](https://hatch.pypa.io/) (environment matrix management), and pip with `pip-tools` for projects that require pip alone.

Astral, which develops `uv`, `ruff` and [`ty`](https://docs.astral.sh/ty/), agreed to be acquired by OpenAI in March 2026, subject to regulatory approval. The tools remain open source under permissive licences.
