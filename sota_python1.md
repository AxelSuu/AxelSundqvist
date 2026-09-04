# The State of Python, 2026 — Part 1: Tooling and practices

A reference for how to set up and write a Python project, current as of September 2026. Part 2 covers libraries and use cases per domain.

## TL;DR

* `uv` for dependencies, interpreters, tools, scripts and builds
* `ruff` for lint and format, with a wider rule set than the default
* Everything configured in `pyproject.toml`; dev dependencies in `[dependency-groups]`
* `src/` layout, lockfile committed, `uv lock --check` in CI
* One recent Python. 3.14 for applications; follow SPEC 0 for libraries
* A type checker in CI, strict on new code: pyright, or pyrefly on large codebases
* Pydantic at I/O boundaries, dataclasses or attrs internally
* `pydantic-settings` for configuration, validated at startup
* Structured logging, configured once at the entry point, never inside libraries
* `TaskGroup` and `asyncio.timeout` for concurrency; async for I/O, processes for CPU
* pytest with fixtures and parametrization; Hypothesis for invariants; Testcontainers instead of database mocks
* Typer or Click for CLIs; `# /// script` inline metadata for single-file tools
* mkdocs-material and mkdocstrings for documentation
* Profile before optimizing; py-spy, scalene, memray
* Pin GitHub Actions to commit SHAs; publish with trusted publishing

---

## Environments and dependencies

`uv` covers the roles previously split across pip, pip-tools, virtualenv, pyenv, pipx and Poetry. It resolves and installs substantially faster than pip, manages interpreter installations, and produces a cross-platform lockfile (`uv.lock`).

| Command | Purpose |
|---|---|
| `uv init` | Create a project with `pyproject.toml` and a `src/` layout. |
| `uv add` / `uv remove` | Modify dependencies and update the lockfile. |
| `uv sync --locked` | Install exactly what the lockfile specifies; fails if it is stale. |
| `uv run` | Run a command in the project environment, syncing first. |
| `uv python install 3.14` | Install a specific interpreter version, independent of the system Python. |
| `uv tool install` | Install a CLI package into an isolated environment on `PATH`. |
| `uv build` / `uv publish` | Build wheels and source distributions, and upload them. |

Because `uv` manages interpreters, the Python version is a project-level declaration (`requires-python`, `.python-version`) rather than a machine-level prerequisite.

Alternatives still in use: Poetry (mature, own resolver and lockfile format), PDM (standards-focused), Hatch (environment matrix management), and pip with `pip-tools` for projects that require pip alone.

Astral, which develops `uv`, `ruff` and `ty`, agreed to be acquired by OpenAI in March 2026, subject to regulatory approval. The tools remain open source under permissive licences.

---

## Linting and formatting

`ruff` provides both a linter and a formatter in a single binary, implementing rules from flake8 and its plugins, isort, pydocstyle, pyupgrade, bandit and others. The formatter is compatible with Black's style with minor documented deviations.

```toml
[tool.ruff]
line-length = 100
target-version = "py314"

[tool.ruff.lint]
select = ["E", "F", "I", "N", "UP", "B", "SIM", "C4", "PTH", "RUF"]
ignore = []

[tool.ruff.lint.per-file-ignores]
"tests/*" = ["S101"]
```

Common rule sets: `E`/`F` (pycodestyle, Pyflakes), `I` (import sorting), `UP` (pyupgrade), `B` (bugbear), `SIM` (simplification), `PTH` (pathlib over `os.path`), `S` (security), `D` (docstrings), `ANN` (annotation coverage).

Two commands cover both roles:

```bash
uv run ruff check --fix
uv run ruff format
```

---

## Python versions

Python 3.9 reached end of life in October 2025. Supported versions as of September 2026 are 3.10 through 3.14, with 3.15 scheduled for 1 October 2026.

Version support policy differs by artifact type:

| Artifact | Policy |
|---|---|
| Application or service | Pin a single version; the runtime is controlled by the deployment. |
| Library | Support the versions your consumers use. SPEC 0 recommends dropping a Python version three years after its release. |
| Single-file script | Declare `requires-python` inline; the runner provisions the interpreter. |

Relevant changes in recent versions:

| Version | Change |
|---|---|
| 3.11 | `TaskGroup`, `asyncio.timeout`, exception groups and `except*`, `tomllib`, significant interpreter speedups. |
| 3.12 | New type parameter syntax (`def f[T]()`), `@override`, per-interpreter GIL groundwork. |
| 3.13 | Experimental free-threaded build, new REPL, JIT groundwork. |
| 3.14 | Free-threaded build officially supported (PEP 779); deferred evaluation of annotations (PEP 649); `concurrent.interpreters` for subinterpreters (PEP 734); colour output in `argparse` and tracebacks. |
| 3.15 (Oct 2026) | `abi3t`, a stable ABI for free-threaded builds (PEP 803), allowing one C extension wheel across free-threaded releases. |

---

## Project configuration and layout

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

### Layout

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

---

## Type checking

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

Configuration example:

```toml
[tool.pyright]
include = ["src", "tests"]
typeCheckingMode = "strict"
pythonVersion = "3.14"
```

Existing untyped codebases are usually migrated module by module, with strict settings applied to new code and relaxed overrides for legacy modules.

---

## Validation and data models

| Library | Use |
|---|---|
| Pydantic v2 | Validation, coercion and serialization at I/O boundaries: HTTP payloads, config files, external API responses, model output. |
| `dataclasses` | Stdlib internal value objects. `slots=True` and `frozen=True` reduce memory use and prevent mutation. |
| attrs | Similar scope to dataclasses with more features: validators, converters, `__init__` customization. |
| pydantic-settings | Loads and validates configuration from environment variables, `.env` files and secrets directories. |
| `msgspec` | Alternative serialization and validation library with lower overhead, no coercion by default. |

A common structure is to validate at the process boundary and use plain objects internally:

```python
class CreateJob(BaseModel):          # boundary
    symbol: str
    window: int = Field(gt=0, le=512)

@dataclass(frozen=True, slots=True)  # internal
class Job:
    symbol: str
    window: int
```

Configuration validated at startup fails immediately on a missing or malformed value rather than at first use:

```python
class Settings(BaseSettings):
    database_url: PostgresDsn
    log_level: Literal["DEBUG", "INFO", "WARNING"] = "INFO"
    model_config = SettingsConfigDict(env_file=".env")
```

---

## Errors

Exception groups (3.11) allow multiple exceptions to be raised together and handled selectively. `TaskGroup` uses them when several concurrent tasks fail.

```python
try:
    async with asyncio.TaskGroup() as tg:
        tg.create_task(fetch(a))
        tg.create_task(fetch(b))
except* TimeoutError as eg:
    ...
except* ValueError as eg:
    ...
```

Conventions in common use:

* One base exception class per package, with specific subclasses beneath it, so callers catch package-level errors rather than the errors of transitive dependencies.
* Wrap third-party exceptions at the boundary where they are raised, preserving the original with `raise ... from err`.
* `contextlib.suppress(SpecificError)` for intentional ignores, rather than a bare `except: pass`, which also swallows `KeyboardInterrupt` and `SystemExit`.
* `add_note()` (3.11) to attach context to an exception without wrapping it.

---

## Logging

The stdlib `logging` module is configured once, at the application entry point, usually with `dictConfig`. Libraries obtain a module-level logger and add a `NullHandler`, leaving configuration to the application.

```python
logger = logging.getLogger(__name__)
logger.addHandler(logging.NullHandler())   # library only
```

Structured records are emitted as fields rather than formatted strings, which makes them queryable in log aggregation systems:

```python
log.info("rows_processed", symbol=symbol, rows=n, duration_s=elapsed)
```

| Library | Notes |
|---|---|
| `logging` | Stdlib. Handlers, filters, hierarchical loggers, `dictConfig`. |
| structlog | Structured logging with processor chains; integrates with stdlib logging. |
| Loguru | Single-object API, simple setup. Configures global state, so it is generally avoided in libraries. |
| OpenTelemetry | Traces, metrics and logs with context propagation across services; vendor-neutral exporters. |
| Logfire | Observability platform from the Pydantic team, built on OpenTelemetry. |

For services, traces are usually more informative than logs; log records carry the trace and span IDs so the two can be correlated.

---

## Concurrency

| Model | Applies to |
|---|---|
| `asyncio` | I/O-bound work with many concurrent operations: HTTP clients, database drivers, message consumers. |
| Threads (GIL builds) | Blocking I/O and calls into C extensions that release the GIL. |
| Processes (`multiprocessing`, `ProcessPoolExecutor`) | CPU-bound work; separate memory spaces, data passed by pickling. |
| Subinterpreters (`concurrent.interpreters`, PEP 734, 3.14) | CPU-bound work with isolated state per interpreter and lower overhead than processes. |
| Free-threaded build (PEP 779, 3.14) | CPU-bound work in threads with shared memory. Requires extensions built for it; an incompatible extension re-enables the GIL. |

Structured concurrency in asyncio:

```python
async with asyncio.timeout(30):
    async with asyncio.TaskGroup() as tg:
        a = tg.create_task(fetch(url_a))
        b = tg.create_task(fetch(url_b))
```

`TaskGroup` cancels remaining tasks when one fails and does not exit until all have finished, which `asyncio.gather` does not guarantee. `asyncio.to_thread` offloads blocking calls. `anyio` provides an alternative API that runs on both asyncio and Trio, and is used by libraries that must not assume a runtime.

Free-threading status: the build is officially supported from 3.14 and single-threaded overhead has fallen substantially compared with 3.13, but wheel availability across the ecosystem is still incomplete. PEP 803 in 3.15 introduces `abi3t`, a stable ABI allowing one extension wheel to serve multiple free-threaded versions.

---

## Testing

| Library | Use |
|---|---|
| pytest | Test framework: fixtures, parametrization, plugins, assertion rewriting. |
| pytest-cov / coverage | Coverage measurement and reporting, including branch coverage. |
| Hypothesis | Property-based testing; generates inputs and shrinks failing cases to a minimal example. |
| pytest-asyncio / anyio pytest plugin | Async test support. |
| Testcontainers | Runs real service dependencies in containers for integration tests. |
| syrupy | Snapshot testing for structured or generated output. |
| time-machine, freezegun | Deterministic control of the current time. |
| pytest-benchmark | Timing and regression detection for performance-sensitive functions. |
| respx, responses, `httpx.MockTransport` | HTTP-level mocking without patching internals. |

Common practices:

* Parametrize instead of looping inside a test, so each case is reported individually.
* Use `tmp_path` and other builtin fixtures rather than writing to fixed paths.
* Property-based tests for round trips and invariants: encode/decode, serialize/parse, transform/inverse, sums that must be preserved.

```python
@given(st.lists(st.integers()))
def test_sort_is_a_permutation(xs):
    assert sorted(sorted(xs)) == sorted(xs)
    assert Counter(sorted(xs)) == Counter(xs)
```

* Test against real dependencies where feasible; mocking an ORM or driver tests the mock rather than the query.
* Coverage is a threshold, not an objective; branch coverage is more informative than line coverage.

---

## Command-line interfaces and single-file scripts

| Library | Notes |
|---|---|
| `argparse` | Stdlib. Sufficient for a handful of flags. Colour output added in 3.14. |
| Typer | Builds on Click; derives parameters, types and help from function signatures. |
| Click | Decorator-based, mature, extensive plugin and testing support. |
| Cyclopts | Type-hint-driven alternative to Typer with different conventions for parameter binding. |
| Rich | Terminal output formatting; integrates with Typer and Click. |

PEP 723 allows a single file to declare its interpreter requirement and dependencies inline:

```python
# /// script
# requires-python = ">=3.13"
# dependencies = ["httpx", "rich"]
# ///
```

`uv run script.py` provisions an ephemeral environment from that block. This removes the need for a separate requirements file or a pre-existing virtual environment for standalone scripts, which is the common case for repository tooling in projects whose main language is not Python.

CLI applications are published as packages with a `[project.scripts]` entry point and installed with `uv tool install` or `pipx`.

---

## Documentation

| Tool | Notes |
|---|---|
| MkDocs + Material | Markdown-based site generator with search, navigation and versioning. |
| mkdocstrings | Generates API reference pages from docstrings and annotations. |
| Sphinx | reStructuredText and MyST; cross-references, multiple output formats, extensive scientific ecosystem. |
| sphinx-autodoc / autoapi | API reference generation for Sphinx. |
| mike | Versioned documentation deployments. |
| pdoc | Minimal API documentation generator with no configuration. |

Docstring conventions (Google, NumPy or reST) are enforced by `ruff`'s `D` rules. Where annotations already state parameter and return types, docstrings cover what annotations cannot express: units, valid ranges, exceptions raised, side effects, and caller responsibilities.

`doctest` keeps short examples verified; `pytest --doctest-modules` runs them as part of the suite.

---

## Continuous integration

```yaml
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<sha>
      - uses: astral-sh/setup-uv@<sha>
        with: { enable-cache: true }
      - run: uv sync --locked
      - run: uv run ruff check --output-format=github
      - run: uv run ruff format --check
      - run: uv run pyright
      - run: uv run pytest --cov --cov-report=xml
```

Points that are frequently omitted:

* `uv sync --locked` fails when the lockfile does not match `pyproject.toml`, catching manual edits.
* The version matrix should list exactly the versions declared in `requires-python`.
* `pre-commit` is used locally for formatting and quick checks; enforcement belongs in CI, since hooks can be bypassed.
* Actions pinned to commit SHAs rather than tags, since tags are mutable.
* PyPI trusted publishing (OIDC) removes long-lived API tokens from CI secrets.
* Dependabot or Renovate for dependency and action updates.

---

## Packaging and distribution

| Backend | Notes |
|---|---|
| Hatchling | Default in `uv init`; plugin system, version from file or VCS. |
| setuptools | Widest compatibility, required for complex C extension builds. |
| maturin | Builds wheels for projects containing compiled extensions. |
| scikit-build-core | CMake-based builds for C/C++ extensions. |
| flit-core | Minimal backend for pure-Python packages. |

Distribution formats: wheels for installation, source distributions for build-from-source. `cibuildwheel` builds and tests binary wheels across platforms and Python versions in CI. Applications are more often distributed as container images or as PEX/shiv archives than as wheels.

---

## Profiling and optimization

| Tool | Use |
|---|---|
| `cProfile` + snakeviz | Stdlib deterministic profiler with a flame graph viewer. |
| py-spy | Sampling profiler that attaches to a running process without restarting it. |
| Scalene | Separates CPU, GPU and memory, and Python time from native time. |
| memray | Allocation tracking, including native allocations, with flame graphs. |
| `timeit`, pytest-benchmark | Microbenchmarks and regression thresholds. |
| Numba | JIT compilation of numeric functions that cannot be vectorized. |
| Cython | Compiles annotated Python to C extensions. |
| PyO3 + maturin, `cffi`, `ctypes` | Native extension modules and bindings to existing libraries. |

Order of work in most cases: reduce the number of operations (caching, algorithmic change, fewer queries), express bulk work as array or SQL operations, then compile the remaining hot function.

---

## Example project setups

**Published library.**
`uv init --lib` → `src/` layout → Hatchling build backend → tested across the supported version matrix → published by tag with trusted publishing.

`requires-python` follows SPEC 0, and the CI matrix lists each supported version explicitly. The public API is fully annotated and a `py.typed` marker is included so consumers get type information. Documentation is built with MkDocs and mkdocstrings from the same docstrings, and versioned with mike. The lockfile pins the development environment only; dependency ranges in `[project.dependencies]` stay wide. Hypothesis covers the invariants of the core data structures, and `--doctest-modules` keeps README and docstring examples correct.

**Web service.**
`uv` project pinned to one interpreter → FastAPI or Django → `pydantic-settings` for configuration → Alembic migrations as a separate deploy step → container image built from the lockfile.

The Dockerfile copies `pyproject.toml` and `uv.lock` and runs `uv sync --locked --no-dev` before copying source, so dependency layers cache independently of code changes. Logging is configured once at startup with `dictConfig` and emits JSON in deployed environments; OpenTelemetry instrumentation is installed at the same point. Integration tests run against Testcontainers instances of PostgreSQL and Redis. Type checking runs in strict mode, since the request and response models are also the runtime validation layer.

**Research or analysis repository.**
`uv` project → notebooks as `.py` files (marimo or jupytext) → importable module for shared loading and transformation code → outputs written to a versioned directory.

The lockfile records the environment that produced published numbers. Analysis code that appears in more than one notebook is moved into the package and tested, keeping notebooks limited to sequence and presentation. Long-running steps write intermediate results to Parquet so they are not repeated. CI runs the test suite and executes notebooks headless to confirm they still run end to end.

**Internal tooling repository.**
Standalone scripts with PEP 723 metadata for one-off tasks, and a `uv` project exposing a Typer CLI through `[project.scripts]` for anything reused.

Scripts run with `uv run` on any machine with `uv` installed, without a shared environment. When a script acquires arguments, tests or a second caller, it moves into the package. The CLI is installed with `uv tool install` from the repository, and destructive subcommands default to a dry-run mode.
