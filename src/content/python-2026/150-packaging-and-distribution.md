---
title: "Packaging and distribution"
blurb: "Build backends, wheels, and the full shape of a published library."
part: "Practices"
---

| Backend | Notes |
|---|---|
| Hatchling | Default in `uv init`; plugin system, version from file or VCS. |
| setuptools | Widest compatibility, required for complex C extension builds. |
| maturin | Builds wheels for projects containing compiled extensions. |
| scikit-build-core | CMake-based builds for C/C++ extensions. |
| flit-core | Minimal backend for pure-Python packages. |

Distribution formats: wheels for installation, source distributions for build-from-source. `cibuildwheel` builds and tests binary wheels across platforms and Python versions in CI. Applications are more often distributed as container images or as PEX/shiv archives than as wheels.

A published library assembles these into one shape: `uv init --lib`, a `src/` layout, the Hatchling backend, and a CI matrix listing each version in `requires-python` explicitly. `requires-python` follows SPEC 0. The public API is fully annotated and ships a `py.typed` marker so consumers get type information. Documentation is built with MkDocs and mkdocstrings from the same docstrings, and versioned with mike. The lockfile pins the development environment only — dependency ranges in `[project.dependencies]` stay wide, because a library that pins its dependencies is unusable alongside anything else. Hypothesis covers the invariants of the core data structures, and `--doctest-modules` keeps README and docstring examples correct.
