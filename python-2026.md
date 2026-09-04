# The State of Python, 2026

*Practices, libraries, and system designs. Reviewed September 2026.*

Most of my work sits next to Python rather than inside it: radio hardware drivers written in C at Ericsson, an ESP-IDF firmware project, a forecasting model whose interesting parts are in PyTorch. Python is the layer that tests those systems, builds them, and turns what they emit into something you can read. This is a reference written from that position — someone who mostly uses Python to drive something else, and who therefore cares more about a project still building in two years than about any individual library.

Part I is the baseline: how to set a project up. Part II is what the ecosystem looks like per domain, with a representative system design for each. Part III is the case I know best — Python as the test and tooling layer around a codebase written in another language.

Version numbers and release dates are current as of September 2026 and will age.

## The baseline

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
* Profile before optimizing; py-spy, scalene, memray
* Pin GitHub Actions to commit SHAs; publish with trusted publishing

---

# Part I — Practices

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

Because `uv` manages interpreters, the Python version is a project-level declaration (`requires-python`, `.python-version`) rather than a machine-level prerequisite. This matters more than it sounds: it is the difference between a repository that a colleague can build and one that requires a paragraph of setup instructions.

Alternatives still in use: Poetry (mature, own resolver and lockfile format), PDM (standards-focused), Hatch (environment matrix management), and pip with `pip-tools` for projects that require pip alone.

Astral, which develops `uv`, `ruff` and `ty`, agreed to be acquired by OpenAI in March 2026, subject to regulatory approval. The tools remain open source under permissive licences.

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

```toml
[tool.pyright]
include = ["src", "tests"]
typeCheckingMode = "strict"
pythonVersion = "3.14"
```

Existing untyped codebases are usually migrated module by module, with strict settings applied to new code and relaxed overrides for legacy modules.

## Validation and data models

| Library | Use |
|---|---|
| Pydantic v2 | Validation, coercion and serialization at I/O boundaries: HTTP payloads, config files, external API responses, model output. |
| `dataclasses` | Stdlib internal value objects. `slots=True` and `frozen=True` reduce memory use and prevent mutation. |
| attrs | Similar scope to dataclasses with more features: validators, converters, `__init__` customization. |
| pydantic-settings | Loads and validates configuration from environment variables, `.env` files and secrets directories. |
| `msgspec` | Alternative serialization and validation library with lower overhead, no coercion by default. |

Validate at the process boundary and use plain objects internally:

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

## Documentation

| Tool | Notes |
|---|---|
| MkDocs + Material | Markdown-based site generator with search, navigation and versioning. |
| mkdocstrings | Generates API reference pages from docstrings and annotations. |
| Sphinx | reStructuredText and MyST; cross-references, multiple output formats, extensive scientific ecosystem. |
| mike | Versioned documentation deployments. |
| pdoc | Minimal API documentation generator with no configuration. |

Docstring conventions (Google, NumPy or reST) are enforced by `ruff`'s `D` rules. Where annotations already state parameter and return types, docstrings cover what annotations cannot express: units, valid ranges, exceptions raised, side effects, and caller responsibilities.

`doctest` keeps short examples verified; `pytest --doctest-modules` runs them as part of the suite.

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

## Packaging and distribution

| Backend | Notes |
|---|---|
| Hatchling | Default in `uv init`; plugin system, version from file or VCS. |
| setuptools | Widest compatibility, required for complex C extension builds. |
| maturin | Builds wheels for projects containing compiled extensions. |
| scikit-build-core | CMake-based builds for C/C++ extensions. |
| flit-core | Minimal backend for pure-Python packages. |

Distribution formats: wheels for installation, source distributions for build-from-source. `cibuildwheel` builds and tests binary wheels across platforms and Python versions in CI. Applications are more often distributed as container images or as PEX/shiv archives than as wheels.

A published library assembles these into one shape: `uv init --lib`, a `src/` layout, the Hatchling backend, and a CI matrix listing each version in `requires-python` explicitly. `requires-python` follows SPEC 0. The public API is fully annotated and ships a `py.typed` marker so consumers get type information. Documentation is built with MkDocs and mkdocstrings from the same docstrings, and versioned with mike. The lockfile pins the development environment only — dependency ranges in `[project.dependencies]` stay wide, because a library that pins its dependencies is unusable alongside anything else. Hypothesis covers the invariants of the core data structures, and `--doctest-modules` keeps README and docstring examples correct.

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

Order of work in most cases: reduce the number of operations (caching, algorithmic change, fewer queries), express bulk work as array or SQL operations, then compile the remaining hot function. Compiling first is the common mistake; it makes an unnecessary operation faster instead of removing it.

---

# Part II — Domains

## Backends, databases and APIs

| Framework | Description |
|---|---|
| Django 5.x | Full-stack framework. Includes ORM, migrations, admin interface, auth, forms, templating. Supports async views. |
| FastAPI | ASGI framework built on Starlette and Pydantic. Generates OpenAPI schemas from type hints. |
| Litestar | ASGI framework. Similar scope to FastAPI, different dependency-injection and layering model. |
| Flask 3 | WSGI microframework. Async support is limited. |
| Django REST Framework | Serializers, viewsets and auth for Django APIs. |
| Django Ninja | FastAPI-style typed API layer for Django. |

Servers: Uvicorn (ASGI, uvloop-based), Granian (Rust-based, ASGI/WSGI/RSGI), Hypercorn (HTTP/2 and HTTP/3), and Gunicorn as a process manager supervising Uvicorn workers.

| Library | Description |
|---|---|
| SQLAlchemy 2.0 | ORM and Core query builder. The 2.0 API is fully typed and supports async sessions. |
| Alembic | Migration tool for SQLAlchemy. |
| asyncpg | Async PostgreSQL driver, no DB-API layer, high throughput. |
| psycopg 3 | PostgreSQL driver with sync and async support, server-side binding, `COPY` support. |
| SQLModel | Layer combining SQLAlchemy models and Pydantic models in one class. |
| aiosqlite | Async wrapper around `sqlite3`. |
| redis-py | Redis client, sync and async. |
| ConnectorX | Fast bulk loading from SQL databases into Arrow/Polars/pandas. |
| Celery | Distributed task queue, broker-backed, mature. |
| Dramatiq, RQ, arq, taskiq | Lighter task queues; arq and taskiq are asyncio-native. |
| Temporal Python SDK | Durable workflow execution with retries and state persistence. |
| Authlib | OAuth 1/2 and OpenID Connect client and server implementations. |

**Multi-tenant SaaS API.**
`Client → Uvicorn/FastAPI → SQLAlchemy async session → asyncpg → PostgreSQL`, with Redis for caching and rate limiting and arq for background jobs.

Request bodies and responses are Pydantic models, so the OpenAPI schema is generated rather than maintained. Tenant scoping is applied in a request-scoped dependency that attaches `tenant_id` to the session, rather than in each query — one place to audit instead of every endpoint. Configuration comes from `pydantic-settings`, so a missing environment variable fails at startup. Alembic migrations run as a separate step in the deploy, not on application boot, because two instances starting simultaneously will otherwise race on the same migration. Integration tests use Testcontainers to run a real PostgreSQL instance.

**Webhook ingestion service.**
`Provider webhook → Litestar → Pydantic validation → confluent-kafka producer → consumer → psycopg3 COPY → PostgreSQL`

The HTTP layer does validation, deduplication against a Redis idempotency key, and nothing else; it returns 202 as soon as the event is durable. Providers retry aggressively on slow responses, so any work done inline becomes work done several times. Consumers batch rows and insert with `COPY` rather than per-row inserts. Multi-step processing that must survive restarts (provisioning, billing) runs as Temporal workflows instead of chained queue tasks.

## Data engineering

Arrow is the common in-memory format across engines; Parquet is the common on-disk format. Most of the libraries below interoperate through both without copying.

| Library | Description |
|---|---|
| PyArrow | Arrow implementation for Python; Parquet, ORC, Flight, dataset APIs. |
| Polars | DataFrame library written in Rust. Lazy and eager APIs, query optimizer, multithreaded. |
| DuckDB | In-process analytical SQL engine. Reads Parquet, CSV and Arrow directly, supports larger-than-memory queries. |
| pandas 3.0 | Released 21 January 2026. Copy-on-write is now default; string columns use a dedicated dtype backed by PyArrow when installed. |
| Dask | Parallel and distributed execution of pandas/NumPy-shaped workloads. |
| Ray | Distributed compute framework; Ray Data for pipelines, Ray Tune/Train for ML. |
| PySpark | Python API for Apache Spark; used where a cluster already exists. |
| Narwhals | Compatibility layer allowing library code to accept pandas, Polars or PyArrow frames. |

| Orchestration | Description |
|---|---|
| Airflow 3 | DAG-based scheduler. Large operator ecosystem. |
| Dagster | Asset-oriented orchestrator with typed inputs/outputs and data lineage. |
| Prefect 3 | Python-native flow orchestration, lighter deployment model. |
| dbt | SQL transformation framework with tests and lineage. |
| SQLMesh | SQL transformation tool with column-level lineage and virtual environments. |

| Storage and quality | Description |
|---|---|
| deltalake | Rust-backed Python bindings for Delta Lake tables. |
| PyIceberg | Python implementation of the Apache Iceberg table format. |
| fsspec, s3fs, gcsfs, adlfs | Uniform filesystem interface over local disk and object stores. |
| dlt | Declarative extract-and-load library producing typed, schema-evolving pipelines. |
| confluent-kafka | Kafka client wrapping librdkafka. |
| Pandera | Schema and statistical validation for dataframes, including Polars. |
| Great Expectations | Data quality suite with expectation stores and reporting. |

**Single-node analytics stack.**
`dlt (API extract) → Parquet on S3 via s3fs → DuckDB → SQLMesh models → Dagster assets`

Raw responses are written unmodified before any transformation, partitioned by ingestion date, so transformations can be replayed without re-fetching — the fetch is the part you cannot repeat, because the source has already changed. DuckDB queries the Parquet files in place; no warehouse is provisioned. Dagster models each table as an asset with declared upstream dependencies, so a schema change shows its blast radius. Pandera schemas run at the boundary between raw and modelled layers. This design handles datasets into the hundreds of gigabytes on one machine, which is more than most projects that reach for a cluster actually have.

**Lakehouse with a table format.**
`Sources → PySpark or Polars writer → Delta Lake or Iceberg tables on object storage → query engines`

The table format supplies ACID commits, schema evolution and time travel, which plain Parquet does not. `deltalake` and `pyiceberg` allow writing and reading without a JVM for smaller jobs, with Spark used for the large ones. Airflow schedules the batch jobs. ConnectorX handles bulk extraction from operational databases into Arrow.

## Data science

| Library | Description |
|---|---|
| NumPy 2.x | N-dimensional arrays and vectorized operations. Foundation for most of the stack. |
| SciPy | Optimization, integration, interpolation, linear algebra, statistics, signal processing. |
| pandas 3.0 | Labelled tabular data. See notes above on copy-on-write and string dtype. |
| Polars | Alternative dataframe library; expression API, faster on large frames. |
| statsmodels | Statistical models, hypothesis tests, time series (ARIMA, state space). |
| scikit-learn | Classical machine learning, preprocessing, model selection, pipelines. |
| marimo | Reactive notebook stored as a plain `.py` file; runs as a script or an app. |
| Matplotlib / Seaborn | Base plotting and statistical plots over it; publication output. |
| Altair | Declarative charts based on the Vega-Lite grammar. |
| Bokeh, HoloViews / hvPlot | Interactive plotting for larger datasets and dashboards. |
| Pint | Physical units attached to arrays and scalars. |

**Reproducible analysis repository.**
`uv project → marimo notebooks (.py) → Polars transforms → statsmodels → Altair charts → Parquet outputs`

Because marimo notebooks are plain Python files, they diff and merge in git and can be imported by tests or run headless in CI. Data loading is separated into an importable module so the same code runs in the notebook and in the scheduled job. Outputs are written to a versioned directory rather than being read off the screen. The lockfile pins the environment the numbers were produced in — which is the only thing that makes a published figure reproducible a year later.

**Sensor time series exploration.**
`Zarr or Parquet store → xarray → SciPy filtering and resampling → hvPlot`

xarray keeps coordinates (time, channel, run ID) attached through the pipeline, so slicing by condition does not depend on positional indexing. Chunked reads through Zarr allow working with recordings larger than memory. Interactive plots with datashader-backed rendering handle multi-million-point traces.

## Scientific computing and signal processing

| Library | Description |
|---|---|
| NumPy, SciPy | Arrays and numerical algorithms. `scipy.signal` covers filter design, resampling, spectral estimation; `scipy.fft` covers transforms. |
| Numba | JIT compilation of NumPy-heavy Python functions via LLVM. |
| Cython | Compiles annotated Python to C extensions; used for C interop. |
| PyO3 + maturin | Rust extension modules with Python bindings and wheel building. |
| SymPy | Symbolic mathematics. |
| xarray | Labelled N-dimensional arrays with coordinates; common in geoscience and simulation. |
| h5py, netCDF4, Zarr | Array storage formats; Zarr targets chunked cloud storage. |
| scikit-rf | RF and microwave engineering: S-parameters, networks, calibration, Touchstone files. |
| python-control | Control systems: transfer functions, state space, frequency response. |
| GNU Radio | SDR framework with Python bindings and flowgraph generation. |
| SoapySDR, UHD, pyadi-iio | SDR hardware abstraction; USRP and Analog Devices device APIs. |
| pyFFTW | FFTW bindings, faster than `numpy.fft` for repeated transforms. |
| PyVISA | Instrument control over GPIB, USB, Ethernet and serial. |
| pySerial | Serial port access. |
| nidaqmx, pyusb | National Instruments DAQ hardware; raw USB device access. |
| scikit-image | Image processing algorithms for scientific data. |

**Automated RF measurement rig.**
`pytest → PyVISA (signal generator, spectrum analyser) + pySerial (DUT control) → NumPy/SciPy metrics → Parquet + Matplotlib report`

Instrument drivers are wrapped behind a small interface per instrument type so the same test runs against different lab equipment. Test cases are pytest functions with parametrized frequency and power points, and limits are asserted rather than eyeballed. Every run writes raw captures alongside computed metrics (EVM, ACLR, spectral mask margin) so a failure can be re-analysed without repeating the measurement — bench time is the scarce resource, not disk. scikit-rf handles de-embedding of cable and fixture losses from measured S-parameters.

**SDR receive chain.**
`SoapySDR or pyadi-iio capture → SciPy filter and decimate → NumPy demodulation → Numba timing recovery loop → Dear PyGui display (immediate-mode, GPU-rendered)`

Capture runs in its own thread writing IQ samples into a ring buffer; processing reads from it, so display stalls do not drop samples. Per-sample feedback loops (timing recovery, carrier tracking) cannot be vectorized and are compiled with Numba. A file-backed source implementing the same interface as the radio allows the whole chain to run against recorded IQ in tests, which is what makes the DSP testable at all.

**Monte Carlo parameter study.**
`Parameter grid → Ray or joblib workers → NumPy simulation → xarray results → Zarr → Seaborn summary`

Each worker returns an array plus its parameter coordinates; xarray assembles them into a labelled cube indexed by the swept variables. Results are written incrementally so a long sweep can be interrupted and resumed. Seeds are derived deterministically from the parameter index so any single run can be reproduced in isolation.

## Machine learning

| Library | Description |
|---|---|
| PyTorch 2.x | Dominant deep learning framework. `torch.compile` for graph capture and kernel fusion. |
| PyTorch Lightning | Training loop abstraction over PyTorch: checkpointing, distributed training, logging. |
| JAX | Composable transforms (`jit`, `grad`, `vmap`, `pmap`), XLA compilation, TPU support. |
| Flax, Optax | Neural network modules and optimizers for JAX. |
| scikit-learn | Classical models, pipelines, cross-validation, metrics. |
| XGBoost, LightGBM, CatBoost | Gradient-boosted trees. Standard choice for tabular data. |
| Hugging Face `transformers` | Pretrained model implementations and training utilities. |
| `datasets`, `accelerate`, `peft`, `trl` | Dataset loading, distributed training, parameter-efficient fine-tuning, preference training. |
| timm | Image model architectures and pretrained weights. |
| OpenCV | Classical computer vision: filtering, features, calibration, tracking. |
| Albumentations | Image augmentation pipelines. |
| ONNX, onnxruntime | Model interchange format and cross-platform inference runtime. |
| vLLM, SGLang | High-throughput LLM inference servers with paged attention and continuous batching. |
| Optuna, Ray Tune | Hyperparameter optimization. |
| MLflow, Weights & Biases | Experiment tracking, model registry, artifact storage. |
| BentoML | Model packaging and serving. |

**Tabular prediction service.**
`Feature table (DuckDB/Parquet) → scikit-learn pipeline + LightGBM → Optuna tuning → MLflow registry → ONNX export → FastAPI + onnxruntime`

The full preprocessing chain lives inside the scikit-learn pipeline object, so training and serving cannot diverge on feature handling — the most common source of a model that scores well offline and badly in production. Cross-validation splits respect time ordering where the target is forward-looking. Exporting to ONNX removes the training dependencies from the serving image and gives predictable latency. Input distributions are logged at inference and compared against the training set to detect drift.

**Vision training pipeline.**
`Object storage → PyTorch Dataset → Albumentations → timm backbone → Lightning + DDP across GPUs → W&B logging → ONNX export → BentoML service`

Lightning handles distributed setup, mixed precision, gradient accumulation and checkpointing, so the model code stays close to plain PyTorch. Augmentation is applied in dataloader workers; the input pipeline is profiled separately from the model to confirm the GPU is actually the bottleneck, since an underfed GPU looks identical to a slow model from the outside. Checkpoints and the exact dataset manifest are stored together so a run can be reproduced.

## Markets and financial data

| Library | Description |
|---|---|
| yfinance | Unofficial client for Yahoo Finance endpoints. No stability guarantee. |
| Alpha Vantage, Finnhub, EODHD, Tiingo | Commercial market data APIs; equities, FX, fundamentals. |
| Polygon.io, Databento | Tick and trade-level market data, including historical order book. |
| ccxt | Unified API across cryptocurrency exchanges, sync and async. |
| ib_async | Interactive Brokers TWS/Gateway API (successor to ib_insync). |
| OpenBB | Open-source aggregation layer over many data providers. |
| TA-Lib, pandas-ta | Technical indicators; C bindings and pure-Python respectively. |
| VectorBT | Vectorized backtesting and portfolio simulation on NumPy arrays. |
| NautilusTrader | Event-driven backtesting and live trading platform; Rust core. |
| backtesting.py | Event-driven backtester with a small API. |
| QuantLib-Python | Derivatives pricing, curve construction, term structures. |
| PyPortfolioOpt, Riskfolio-Lib | Portfolio optimization, risk models, efficient frontiers. |
| arch | GARCH and volatility models, bootstrap methods. |
| exchange_calendars | Trading sessions, holidays and market hours. |

**Research data store.**
`Vendor APIs → raw JSON archive → normalization → Parquet partitioned by date and symbol → DuckDB`

Raw payloads are archived before normalization so the historical record survives changes to the parsing code and vendor re-statements can be detected. Corporate actions and delistings are stored as separate tables and applied at query time, which keeps a point-in-time view available and avoids a universe consisting only of current index members. `exchange_calendars` aligns bars to real sessions, including half days. Each record carries both the event timestamp and the timestamp at which the data became available; without the second one, no backtest built on the store can be trusted.

**Backtesting stack.**
`Parquet feature store → VectorBT parameter sweep → NautilusTrader event-driven validation → arch / PyPortfolioOpt for sizing`

The vectorized pass covers wide parameter grids cheaply; the shortlist is then re-run in an event-driven engine that models order types, fills, fees and latency, since vectorized results tend to be optimistic. Signals are computed only from data whose availability timestamp precedes the decision time. Volatility estimates from `arch` feed position sizing, and results are reported with transaction costs applied.

## LLMs, agents and retrieval

| Library | Description |
|---|---|
| openai, anthropic, google-genai | First-party API clients. |
| LiteLLM | Unified interface and proxy across many providers. |
| Instructor, Outlines | Structured output: schema-constrained generation and validation. |
| PydanticAI | Type-safe agent framework from the Pydantic team. V2, released June 2026, is a breaking change from V1: it moves configuration onto a composable "capability" primitive and splits fast-moving pieces into a separate Harness package beside a slimmer core. |
| LangGraph | Graph-based orchestration with explicit state, checkpointing and human-in-the-loop steps. |
| OpenAI Agents SDK | Agents, handoffs, guardrails and tracing. Provider-agnostic in practice, still on 0.x. |
| Claude Agent SDK | Anthropic's agent framework, including subagent spawning. |
| LlamaIndex | Indexing, retrieval and query pipelines; Workflows 1.0 released June 2026. |
| `mcp`, FastMCP | Model Context Protocol SDK and a higher-level server framework for building MCP tools. |
| pgvector | Vector column type and index for PostgreSQL. |
| Qdrant, Chroma, LanceDB | Vector stores; Rust-backed with payload filtering, embedded/client-server, and Lance-columnar respectively. |
| sentence-transformers | Embedding and reranking model inference. |
| rank_bm25 | Lexical BM25 scoring, used for hybrid retrieval. |
| Langfuse, Logfire | Tracing and evaluation for LLM applications. |
| Ragas, DeepEval | Evaluation metrics for retrieval and generation quality. |

**Document question answering.**
`Ingestion → structural chunking → sentence-transformers embeddings → pgvector in existing PostgreSQL → hybrid retrieval (vector + rank_bm25) → reranker → generation with citations`

Storing vectors in the operational database removes a second system and keeps chunks transactionally consistent with their source documents. Chunking follows the document's own headings and table boundaries rather than a fixed character count, which keeps tables intact. Hybrid retrieval covers cases where the query contains exact identifiers that embeddings handle poorly — part numbers and error codes are the usual example. A held-out set of question and expected-source pairs is run as pytest cases with Ragas metrics, so retrieval changes are measured rather than assessed by inspection.

**Typed extraction service.**
`FastAPI endpoint → PydanticAI agent with an output model → LiteLLM provider routing → validated object`

The output schema is a Pydantic model, and validation failures trigger a bounded retry with the error fed back to the model. Requests carry a schema version so downstream consumers can handle changes. Prompt and model identifiers are logged with each response, because a silent provider-side model update is otherwise indistinguishable from a regression in your own code.

---

# Part III — Python around another language

Most of the sections above assume Python is the product. Often it is not. In a repository whose shipped artefact is C, C++ or Rust, Python is still usually present — as the test harness, the build orchestrator, the log parser, the release script. This is the position I have worked in most, and it has its own failure modes, none of which are covered by advice written for Python applications.

The constraint that shapes everything: the people maintaining this code are not Python developers. They will not create a virtual environment, they will not read a `CONTRIBUTING.md` section about `uv sync`, and if the tooling breaks they will delete it and write a shell script. Anything that requires ceremony to run will stop being run.

This is what makes PEP 723 inline metadata the single most useful feature here. A script that declares its own dependencies and runs under `uv run script.py` on a machine with nothing but `uv` installed has no setup step to skip. There is no shared environment to drift, no requirements file to forget, and no instruction more complicated than the command itself. Reserve the full project layout for tooling that has earned it — something with tests, several callers, and a maintainer.

| Use | Typical libraries |
|---|---|
| Hardware and integration tests | pytest, pySerial, paramiko, PyVISA |
| Build and repository orchestration | Typer, `subprocess`, `pathlib`, GitPython |
| Protocol and traffic testing | scapy, Hypothesis, asyncio |
| Log and artefact analysis | Polars, DuckDB, Matplotlib |
| Release and CI automation | httpx, PyGithub, Pydantic |

**Hardware and integration test harness.**
`pytest → fixtures owning the device → transport adapter (serial / SSH / TCP) → DUT → captured artefacts`

Fixtures own the device lifecycle, not the tests: a session-scoped connection, a function-scoped reset. Without the reset, one failing test leaves the board in a bad state and the next forty failures tell you nothing about the next forty tests.

Give the transport adapter a second implementation backed by recorded exchanges. It is the difference between a suite that runs in CI on every commit and one that only runs when someone is sitting at the bench, and a suite in the second category stops being maintained within a quarter.

Every read gets a timeout. A blocking `serial.read()` against a board that has hung will occupy a CI runner until the job limit kills it, which turns a two-second failure into a forty-minute one. Retries belong in the transport adapter rather than in test bodies — otherwise every test grows its own retry loop and they all differ.

Log the raw exchange, bytes sent and bytes received, alongside the parsed result. In a boolean assert, a firmware fault and a bug in your own response parser look exactly the same, and you will spend an afternoon on the wrong one. Parametrize over frequency, voltage or temperature points rather than looping inside one test, so a failure names the operating point instead of the loop.

Where hardware is genuinely intermittent, quarantine the test and record the rate. An automatic retry that hides a 5% failure also hides the day it becomes 40%.

**Build and repository orchestration.**
`Typer CLI → services → adapters (git, process, filesystem) → CMake / Cargo / Ninja`

Keep the CLI layer thin: parse arguments, call a service, format the result. The logic underneath should be callable and testable without spawning a command line. This is the one structural decision that decides whether the tool grows tests.

Call subprocesses with an explicit argument list and `check=True`, never `shell=True` with an interpolated string. Branch names contain slashes, paths contain spaces, and a version string from an untrusted source lands in a shell. Capture stdout and stderr and surface the relevant tail on failure — a compiler's actual error is three lines somewhere inside four thousand, and a tool that dumps all of them is one nobody reads.

Destructive subcommands default to a dry run that prints the planned actions. The environment is a required explicit argument, not a default, because the default is what gets run against production at 18:00 on a Friday.

Pin the tooling. The Python that builds the C is itself a dependency of the build, and a tool that resolves different versions on two machines produces builds that differ for reasons nobody will look for.

---

The through-line across all three parts is the same: put the boundary where the data is untrusted, make the environment a property of the repository rather than the machine, and keep the thing that produced a result recoverable — the raw response, the lockfile, the availability timestamp, the bytes on the wire. Most of the specific library choices above will have moved by 2028. Those four will not.

*Reviewed September 2026. Corrections welcome.*
