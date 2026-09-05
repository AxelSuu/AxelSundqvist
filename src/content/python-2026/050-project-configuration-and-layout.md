---
title: "Project configuration and layout"
blurb: "pyproject.toml, dependency groups, the src layout, and what the lockfile is for."
part: "Practices"
---

All tooling configuration belongs in `pyproject.toml`. Development dependencies belong in `[dependency-groups]` (PEP 735) rather than `[project.optional-dependencies]`, which is published in wheel metadata and intended for user-facing extras.

```toml
[project]
name = "example"
version = "0.1.0"
requires-python = ">=3.14"
dependencies = ["httpx>=0.28", "pydantic>=2.10"]

[dependency-groups]
dev = ["ruff", "pyright"]
test = ["pytest", "pytest-cov", "hypothesis"]
docs = ["mkdocs-material", "mkdocstrings[python]"]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

PEP 751 defines `pylock.toml`, a standard lockfile format that tools can read and write for interoperability. `uv` retains `uv.lock` as its native format and can export to `pylock.toml`; pip's support is experimental on both sides.

```
project/
├── src/package_name/
│   ├── __init__.py
│   └── module.py
├── tests/
├── docs/
├── pyproject.toml
├── uv.lock
└── .github/workflows/ci.yml
```

With a `src/` layout, the package directory is not on `sys.path` during test runs, so tests import the installed distribution. Packaging errors such as a missing subpackage or an unincluded data file surface in the test suite rather than after release.

For multi-package repositories, `uv` workspaces allow several `pyproject.toml` files to share one lockfile and one resolution, with path dependencies between members.

The lockfile is committed for applications and libraries alike; it pins the development environment and does not constrain consumers of a published library.
