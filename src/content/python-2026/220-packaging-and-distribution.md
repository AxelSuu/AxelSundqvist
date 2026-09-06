---
title: "Packaging and distribution"
blurb: "Build backends, distributions, and a published library layout."
reviewed: 2026-09-06
part: "Practices"
---

| Backend | Notes |
|---|---|
| [Hatchling](https://hatch.pypa.io/latest/config/build/) | Default in `uv init`; plugin system, version from file or VCS. |
| [setuptools](https://setuptools.pypa.io/) | The backend most existing projects already declare; required where the build has to run arbitrary Python, as complex C extension builds do. |
| [maturin](https://www.maturin.rs/) | Builds wheels for projects containing compiled extensions. |
| [scikit-build-core](https://scikit-build-core.readthedocs.io/) | CMake-based builds for C/C++ extensions. |
| [flit-core](https://flit.pypa.io/) | Minimal backend for pure-Python packages. |

Distribution formats: [wheels](https://packaging.python.org/en/latest/specifications/binary-distribution-format/) for installation, [source distributions](https://packaging.python.org/en/latest/specifications/source-distribution-format/) for build-from-source. [`cibuildwheel`](https://cibuildwheel.pypa.io/) builds and tests binary wheels across platforms and Python versions in CI. Applications are more often distributed as container images or as [PEX](https://docs.pex-tool.org/)/[shiv](https://shiv.readthedocs.io/) archives than as wheels.

A published library assembles these into one shape: `uv init --lib`, a `src/` layout, the Hatchling backend, and a CI matrix listing each version in `requires-python` explicitly. `requires-python` follows [SPEC 0](https://scientific-python.org/specs/spec-0000/). The public API is fully annotated and ships a [`py.typed`](https://typing.python.org/en/latest/spec/distributing.html#packaging-typed-libraries) marker so consumers get type information. Documentation is built with MkDocs and mkdocstrings from the same docstrings, and versioned with mike. The lockfile pins the development environment only — dependency ranges in `[project.dependencies]` stay wide, because a library that pins its dependencies is unusable alongside anything else. Hypothesis covers the invariants of the core data structures, and `--doctest-modules` keeps README and docstring examples correct.

## References

* [PEP 561 – Distributing and Packaging Type Information](https://peps.python.org/pep-0561/) — Final, 3.7. What `py.typed` means to a consumer.
* [The binary distribution format](https://packaging.python.org/en/latest/specifications/binary-distribution-format/) — the wheel.
* [The source distribution format](https://packaging.python.org/en/latest/specifications/source-distribution-format/) — the sdist.
* [SPEC 0](https://scientific-python.org/specs/spec-0000/) — the support window `requires-python` follows.
