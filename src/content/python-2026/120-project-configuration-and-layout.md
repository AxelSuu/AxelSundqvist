---
title: "Project configuration and layout"
blurb: "Project metadata, dependency groups, src layout, and lockfiles."
reviewed: 2026-09-06
part: "Practices"
---

All tooling configuration belongs in [`pyproject.toml`](https://packaging.python.org/en/latest/specifications/pyproject-toml/). Development dependencies belong in `[dependency-groups]` ([PEP 735](https://peps.python.org/pep-0735/)) rather than `[project.optional-dependencies]`, which is published in wheel metadata and intended for user-facing extras.

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

[PEP 751](https://peps.python.org/pep-0751/) defines `pylock.toml`, a standard lockfile format that tools can read and write for interoperability. [`uv`](https://docs.astral.sh/uv/) retains `uv.lock` as its native format and can [export to `pylock.toml`](https://docs.astral.sh/uv/concepts/projects/sync/#exporting-the-lockfile); [pip's support](https://pip.pypa.io/en/stable/cli/pip_lock/) is experimental on both sides.

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

With a [`src/` layout](https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/), the package directory is not on `sys.path` during test runs, so tests import the installed distribution. Packaging errors such as a missing subpackage or an unincluded data file surface in the test suite rather than after release.

For multi-package repositories, [`uv` workspaces](https://docs.astral.sh/uv/concepts/projects/workspaces/) allow several `pyproject.toml` files to share one lockfile and one resolution, with path dependencies between members.

The lockfile is committed for applications and libraries alike; it pins the development environment and does not constrain consumers of a published library.

## References

* [PEP 735 – Dependency Groups in pyproject.toml](https://peps.python.org/pep-0735/) — Final.
* [PEP 751 – A file format to record Python dependencies for installation reproducibility](https://peps.python.org/pep-0751/) — Final.
* [The `pyproject.toml` specification](https://packaging.python.org/en/latest/specifications/pyproject-toml/) — the canonical field reference.
