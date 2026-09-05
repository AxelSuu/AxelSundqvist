---
title: "Type checking"
blurb: "Four checkers compared, the annotations worth knowing, and how to migrate a codebase that has none."
part: "Practices"
---

Type annotations are checked by a separate tool; the interpreter does not enforce them at runtime except where a library reads them (Pydantic, FastAPI, Typer).

| Checker | Notes |
|---|---|
| mypy | Reference implementation. Largest plugin ecosystem, including Django and SQLAlchemy plugins. Slowest on large codebases. |
| pyright | Written in TypeScript. Fast, high conformance with the typing specification, powers Pylance in VS Code. |
| pyrefly | Meta's checker, stable 1.0 since May 2026. Used on Instagram, PyTorch and JAX. Strict defaults, designed for large codebases. |
| ty | Astral's checker, in beta. Provides a gradual guarantee: adding annotations to working code does not introduce new errors. |

Useful constructs beyond basic parameter annotations:

| Construct | Use |
|---|---|
| `Literal["a", "b"]` | Closed sets of string or integer values; enables exhaustiveness checking. |
| `Protocol` | Structural typing. A class satisfies the protocol by shape, with no inheritance or import from the defining module. |
| `TypedDict` | Fixed-key dictionaries, for JSON structures where a model class is not wanted. |
| `Self`, `override` | Fluent APIs and explicit overrides (3.11 and 3.12). |
| `assert_never` | Compile-time exhaustiveness checks in match statements and if-chains. |
| `TypeAlias` / `type X = ...` | Named aliases for complex annotations. |
| Generics syntax `def f[T](...)` | Type parameters without `TypeVar` declarations (3.12+). |

```toml
[tool.pyright]
include = ["src", "tests"]
typeCheckingMode = "strict"
pythonVersion = "3.14"
```

Existing untyped codebases are usually migrated module by module, with strict settings applied to new code and relaxed overrides for legacy modules.
