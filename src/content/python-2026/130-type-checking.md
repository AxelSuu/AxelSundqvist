---
title: "Type checking"
blurb: "Four checkers, the annotations worth knowing, and how an untyped codebase is migrated."
reviewed: 2026-09-06
part: "Practices"
---

Type annotations are checked by a separate tool; the interpreter does not enforce them at runtime except where a library reads them ([Pydantic](https://docs.pydantic.dev/), [FastAPI](https://fastapi.tiangolo.com/), [Typer](https://typer.tiangolo.com/)).

| Checker | Notes |
|---|---|
| [mypy](https://mypy.readthedocs.io/) | Reference implementation. Its [plugin API](https://mypy.readthedocs.io/en/stable/extending_mypy.html) is what django-stubs hooks into; pyright [rejects plugins by design](https://github.com/microsoft/pyright/blob/main/docs/mypy-comparison.md#plugins). |
| [pyright](https://microsoft.github.io/pyright/) | Written in TypeScript, distributed as an npm package with a PyPI wrapper. Implements the [typing specification](https://typing.python.org/en/latest/spec/) and powers Pylance in VS Code. |
| [pyrefly](https://pyrefly.org/) | Meta's checker, 1.0 since May 2026. [PyTorch](https://github.com/pytorch/pytorch/blob/main/pyrefly.toml) and JAX both carry its configuration in-tree; Meta runs it on Instagram. Strict defaults, designed for large codebases. |
| [ty](https://docs.astral.sh/ty/) | Astral's checker, in beta. Provides a gradual guarantee: adding annotations to working code does not introduce new errors. |

Useful constructs beyond basic parameter annotations:

| Construct | Use |
|---|---|
| [`Literal["a", "b"]`](https://docs.python.org/3/library/typing.html#typing.Literal) | Closed sets of string or integer values; enables exhaustiveness checking. |
| [`Protocol`](https://docs.python.org/3/library/typing.html#typing.Protocol) | Structural typing. A class satisfies the protocol by shape, with no inheritance or import from the defining module. |
| [`TypedDict`](https://docs.python.org/3/library/typing.html#typing.TypedDict) | Fixed-key dictionaries, for JSON structures where a model class is not wanted. |
| [`Self`](https://docs.python.org/3/library/typing.html#typing.Self), [`override`](https://docs.python.org/3/library/typing.html#typing.override) | Fluent APIs and explicit overrides (3.11 and 3.12). |
| [`assert_never`](https://docs.python.org/3/library/typing.html#typing.assert_never) | Compile-time exhaustiveness checks in match statements and if-chains. |
| [`TypeAlias` / `type X = ...`](https://docs.python.org/3/reference/simple_stmts.html#type) | Named aliases for complex annotations. |
| [Generics syntax `def f[T](...)`](https://peps.python.org/pep-0695/) | Type parameters without `TypeVar` declarations (3.12+). |

```toml
[tool.pyright]
include = ["src", "tests"]
typeCheckingMode = "strict"
pythonVersion = "3.14"
```

Existing untyped codebases are migrated module by module. The checker runs over the whole tree from the first commit, and the modules that do not pass are listed as overrides rather than excluded, so the exceptions stay visible and countable:

```toml
[tool.mypy]
strict = true

[[tool.mypy.overrides]]
module = ["legacy.*"]
disallow_untyped_defs = false

[[tool.mypy.overrides]]
module = ["vendorlib.*"]
ignore_missing_imports = true
```

pyright expresses the same shape as a directory list: `typeCheckingMode = "basic"` across the repository, `strict = ["src/newpackage"]` for the part that has been converted.

Third-party packages without annotations fall into three cases: a stub package on PyPI (the `types-` distributions), a package that ships `py.typed` in a later version than the one pinned, and everything else, which gets `ignore_missing_imports` for that module or a hand-written stub under a `stubs/` directory covering only the functions actually called. [`warn_unused_ignores`](https://mypy.readthedocs.io/en/stable/config_file.html#confval-warn_unused_ignores) and `reportUnnecessaryTypeIgnoreComment` report suppressions once they stop being needed, which is what keeps a migration from settling into a permanent list of ignores.

## References

* [The typing specification](https://typing.python.org/en/latest/spec/) — what the checkers implement, and the conformance suite they are measured against.
* [PEP 695 – Type Parameter Syntax](https://peps.python.org/pep-0695/) — Final, 3.12.
