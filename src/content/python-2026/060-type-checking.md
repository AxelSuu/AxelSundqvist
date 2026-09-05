---
title: "Type checking"
blurb: "Four checkers compared, the annotations worth knowing, and how to migrate a codebase that has none."
part: "Practices"
---

Type annotations are checked by a separate tool; the interpreter does not enforce them at runtime except where a library reads them ([Pydantic](https://docs.pydantic.dev/), [FastAPI](https://fastapi.tiangolo.com/), [Typer](https://typer.tiangolo.com/)).

| Checker | Notes |
|---|---|
| [mypy](https://mypy.readthedocs.io/) | Reference implementation. Largest plugin ecosystem, including Django and SQLAlchemy plugins. Slowest on large codebases. |
| [pyright](https://microsoft.github.io/pyright/) | Written in TypeScript. Fast, high conformance with the [typing specification](https://typing.python.org/en/latest/spec/), powers Pylance in VS Code. |
| [pyrefly](https://pyrefly.org/) | Meta's checker, stable 1.0 since May 2026. Used on Instagram, PyTorch and JAX. Strict defaults, designed for large codebases. |
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

Existing untyped codebases are usually migrated module by module, with strict settings applied to new code and relaxed overrides for legacy modules.
