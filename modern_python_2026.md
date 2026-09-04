# Modern Python in 2026: Development Practices, Libraries, and Project Architectures

> A practical overview of contemporary Python development, the major Python ecosystems, and representative architectures for building projects with them.
>
> Last reviewed: 2026-09-03

## TL;DR

Modern Python projects can be built around a relatively small and consistent engineering baseline: a supported recent Python release, `uv` for environments and dependency management, Ruff for formatting and linting, Pyright for static typing, Pydantic for data validation, `pytest` for testing, and `pyproject.toml` for project configuration. CI should run formatting checks, linting, type checking, tests, coverage, and package/build checks automatically.

Python's practical scope is much broader than web scripting. It is widely used as:

- a general-purpose application language for APIs, services, CLIs, and internal tools;
- a scripting, automation, testing, and repository-tooling language around systems written in C, C++, Rust, Java, and other languages;
- a data language around NumPy, pandas, Polars, PyArrow, DuckDB, and scientific libraries;
- a machine-learning interface around PyTorch, JAX, scikit-learn, TensorFlow/Keras, and OpenCV;
- a financial-data and quantitative-research language;
- a document-processing and business-automation language;
- a GUI and rapid-application language;
- and a major application language for LLM, agent, and retrieval systems.

The ecosystem is heterogeneous. The useful question is normally not which library is "best" in isolation, but which layer of a system a library is intended to provide and which alternatives address the same layer.

---

# 1. Python in 2026

Python is a high-level general-purpose language surrounded by a large ecosystem of libraries, native extensions, external services, and domain-specific runtimes.

A modern Python application often looks less like an isolated Python program and more like an integration layer:

```text
                         Python application
                                 |
         +-----------------------+-----------------------+
         |                       |                       |
       APIs                   Databases               Files/data
         |                       |                       |
      HTTP/JSON             PostgreSQL/etc.        Parquet/Excel/PDF
         |
   External services
         |
  ML / LLM / cloud / SaaS
```

For performance-sensitive workloads, the Python process may call implementations written in C, C++, Rust, Fortran, CUDA, or other native systems. NumPy, PyTorch, DuckDB, Polars, and many other projects follow this general model: Python provides the user-facing API while lower-level implementations perform substantial amounts of the computation.

Python therefore occupies several different positions in a system:

```text
Application layer
    |
    +-- Web/API application
    +-- CLI
    +-- Data/ML application
    +-- Automation
    +-- Test harness
    +-- Orchestration
    |
Libraries and frameworks
    |
Native implementations / databases / external services
    |
Operating system / hardware / cloud
```

The rest of this article describes the current development baseline and the major application areas around it.

---

# 2. A modern Python project baseline

The following is a reasonable default for a new, maintained Python project in 2026. It is a baseline rather than a mandatory stack.

| Area | Typical choice |
|---|---|
| Python | Python 3.13 or 3.14 for production; evaluate 3.15 during its release-candidate period |
| Project/environment/dependencies | `uv` |
| Configuration | `pyproject.toml` |
| Formatting | Ruff formatter |
| Linting | Ruff |
| Type checking | Pyright |
| Validation/settings | Pydantic |
| Testing | pytest |
| Property-based testing | Hypothesis |
| CLI | Typer or Click; `argparse` remains suitable for small stdlib-only tools |
| Documentation | MkDocs/Material or Sphinx |
| Logging | stdlib `logging`; structured logging where useful |
| Observability | OpenTelemetry where distributed tracing/metrics are required |
| CI | GitHub Actions, GitLab CI, or equivalent |
| Package/build | standard Python packaging + `uv build` or an equivalent build frontend |

Python 3.15 is currently at release candidate 2, with the final release scheduled for 2026-10-01. A release candidate is not normally the version to make the production default before final release, but it is appropriate to include in compatibility and CI testing for libraries and infrastructure that need early support. [Python 3.15 RC2](https://www.python.org/downloads/release/python-3150rc2/) · [Python release schedule](https://peps.python.org/pep-0790/)

For a new application, a minimum-version declaration such as the following is more appropriate than deliberately targeting an old Python release solely for compatibility:

```toml
[project]
requires-python = ">=3.13"
```

A library can reasonably support more versions when its users require that compatibility.

---

# 3. Project structure and `pyproject.toml`

A conventional application can use a `src` layout:

```text
my-project/
├── pyproject.toml
├── uv.lock
├── README.md
├── LICENSE
├── src/
│   └── my_project/
│       ├── __init__.py
│       ├── cli.py
│       ├── config.py
│       ├── domain/
│       ├── services/
│       ├── models/
│       ├── adapters/
│       └── infrastructure/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── docs/
```

For small programs, this can be reduced substantially. There is no requirement to create a large architecture for a small script.

`pyproject.toml` should generally be the central configuration file for the project and its Python tooling. Keeping project metadata, dependencies, build configuration, Ruff configuration, and other tool configuration in one standard file makes a repository easier to inspect and automate.

Example:

```toml
[project]
name = "my-project"
version = "0.1.0"
requires-python = ">=3.13"
dependencies = [
    "pydantic>=2",
]

[dependency-groups]
dev = [
    "pytest>=8",
    "pyright>=1",
    "ruff>=0",
]

[tool.ruff]
line-length = 100

[tool.pyright]
typeCheckingMode = "strict"

[tool.pytest.ini_options]
testpaths = ["tests"]
```

Exact version constraints should be based on the project rather than copied mechanically from examples.

---

# 4. `uv`: environments, dependencies, and project operations

`uv` is a modern Python package and project manager from Astral. It handles Python installations, environments, dependency resolution, lockfiles, project commands, tools, scripts, and builds.

A typical workflow is:

```bash
uv init
uv add fastapi sqlalchemy
uv add --dev pytest ruff pyright

uv run pytest
uv run ruff check
uv run ruff format --check
uv run pyright

uv lock
uv sync
uv build
```

The important change from older Python workflows is that environment creation, dependency resolution, command execution, and locking can be handled through one project-oriented tool.

### Recommended practice

Commit `uv.lock` for applications and other projects where reproducibility matters. Libraries should generally treat their declared dependency ranges as the public compatibility contract, while development environments can still use a lockfile for reproducible development and CI.

Reference: [uv documentation](https://docs.astral.sh/uv/)

---

# 5. Ruff: formatting and linting

Ruff combines a large Python linting ecosystem with a fast formatter and automatic fixes.

Typical commands:

```bash
ruff check .
ruff check --fix .
ruff format .
ruff format --check .
```

A useful distinction is:

```text
Ruff
├── formatting
├── linting
├── import sorting
└── selected automated fixes

Pyright
└── static type checking
```

The formatter is designed as a Black-compatible formatter and is intended to provide a unified toolchain around Ruff's linting and formatting capabilities. [Ruff formatter](https://docs.astral.sh/ruff/formatter/)

A project should normally format automatically and fail CI when the tree is not formatted, rather than relying on manual review of formatting differences.

---

# 6. Type hints and Pyright

Modern Python type hints cover function interfaces, data structures, protocols, generics, unions, callable interfaces, and increasingly precise static analysis.

```python
from collections.abc import Sequence


def mean(values: Sequence[float]) -> float:
    if not values:
        raise ValueError("values must not be empty")
    return sum(values) / len(values)
```

Type hints are useful for:

- editor and IDE assistance;
- refactoring;
- static bug detection;
- documenting interfaces;
- checking assumptions between modules;
- and making larger codebases easier to maintain.

Pyright is a mature type checker and language-server implementation for Python. A strict or near-strict configuration is appropriate for many new application and library projects, although the appropriate strictness depends on the codebase.

A practical progression is:

```text
New project
    ↓
Type public interfaces
    ↓
Type internal modules
    ↓
Enable stricter checking
    ↓
Make CI enforce it
```

Reference: [Pyright](https://microsoft.github.io/pyright/)

---

# 7. Pydantic and validation

Pydantic is primarily useful for representing and validating data at system boundaries.

Typical boundaries include:

```text
HTTP request → Pydantic model
Configuration → Pydantic settings/model
External API response → Pydantic model
LLM structured output → Pydantic model
```

Example:

```python
from pydantic import BaseModel


class UserCreate(BaseModel):
    name: str
    email: str
    age: int | None = None
```

Pydantic can also be used independently of web frameworks. It is particularly useful when data enters a system from an external or weakly typed source.

Reference: [Pydantic](https://docs.pydantic.dev/)

---

# 8. Testing with pytest and Hypothesis

`pytest` is a common default for modern Python testing. It provides discovery, fixtures, parametrization, plugins, assertions, and integration with coverage and other tooling.

A common repository structure is:

```text
tests/
├── unit/
├── integration/
└── e2e/
```

Example:

```python
def test_parse_price():
    assert parse_price("12.50") == 12.5
```

Parametrization is useful when a function should behave identically over a set of known cases:

```python
import pytest


@pytest.mark.parametrize(
    ("value", "expected"),
    [("1", 1), ("20", 20), ("300", 300)],
)
def test_parse_integer(value: str, expected: int) -> None:
    assert parse_integer(value) == expected
```

Hypothesis complements example-based tests with property-based testing. It is especially useful when an invariant can be expressed more naturally than an exhaustive collection of examples.

```python
from hypothesis import given, strategies as st


@given(st.lists(st.integers()))
def test_sort_preserves_length(values: list[int]) -> None:
    assert len(sorted(values)) == len(values)
```

The testing stack is therefore better thought of as:

```text
pytest
├── unit tests
├── integration tests
├── end-to-end tests
└── property-based tests via Hypothesis
```

References: [pytest](https://docs.pytest.org/) · [Hypothesis](https://hypothesis.readthedocs.io/)

---

# 9. CLI applications: argparse, Click, and Typer

There are three reasonable levels of abstraction.

### `argparse`

Part of the standard library. Suitable for small programs, dependency-free tools, and cases where a simple CLI is sufficient.

### Click

A mature framework for composable command-line interfaces. It provides commands, groups, options, arguments, prompting, shell completion, and a large plugin ecosystem.

### Typer

Typer builds CLI definitions around Python type hints and is useful for new typed applications.

Example:

```python
import typer

app = typer.Typer()


@app.command()
def greet(name: str, count: int = 1) -> None:
    for _ in range(count):
        print(f"Hello {name}")


if __name__ == "__main__":
    app()
```

A neutral default is:

```text
stdlib-only / tiny CLI → argparse
new typed CLI          → Typer
mature/custom CLI      → Click
```

Typer itself is built on Click, so the alternatives are not unrelated ecosystems.

References: [Click](https://click.palletsprojects.com/) · [Typer](https://typer.tiangolo.com/) · [argparse](https://docs.python.org/3/library/argparse.html)

---

# 10. Comments, docstrings, and documentation

Documentation should be distributed between several mechanisms rather than putting all information into comments.

| Mechanism | Purpose |
|---|---|
| Type hints | Structure and interfaces |
| Tests | Executable behavior and invariants |
| Docstrings | Public API and semantics |
| Comments | Local rationale and non-obvious constraints |
| README | Installation and first use |
| Guides | Workflows and examples |
| Architecture docs | System-level design |

Comments should normally explain a reason, constraint, or trade-off rather than restating the code.

```python
# Normalize to UTC because upstream market timestamps are not guaranteed
# to use the same timezone.
timestamp = timestamp.astimezone(timezone.utc)
```

Public classes and functions should have docstrings where their behavior is not already obvious from the signature and surrounding code.

For API/reference documentation, common choices are:

- MkDocs + Material + mkdocstrings for documentation-oriented sites and API references;
- Sphinx for large Python libraries and projects with established Sphinx tooling.

References: [MkDocs](https://www.mkdocs.org/) · [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) · [Sphinx](https://www.sphinx-doc.org/) · [mkdocstrings](https://mkdocstrings.github.io/)

---

# 11. Logging and observability

Application code should normally use Python's logging framework rather than `print()` for operational messages.

```python
import logging

logger = logging.getLogger(__name__)

logger.info("Fetched market data", extra={"symbol": symbol})
```

The logging configuration belongs at the application boundary rather than being repeatedly configured by internal libraries.

For distributed systems, logging can be combined with metrics and traces:

```text
Application
   ├── logs
   ├── metrics
   └── traces
          ↓
      observability
```

OpenTelemetry provides instrumentation and APIs for distributed traces and metrics, with the Python ecosystem also supporting logs through the OpenTelemetry model.

`structlog` is an optional library for structured logging when the standard logging API is not sufficient for the application's needs.

References: [Python logging](https://docs.python.org/3/library/logging.html) · [OpenTelemetry Python](https://opentelemetry.io/docs/languages/python/) · [structlog](https://www.structlog.org/)

---

# 12. Async Python

`asyncio` is primarily useful for I/O concurrency rather than for turning CPU-bound operations into faster Python.

A typical asynchronous service might use:

```text
FastAPI
   ↓
async application code
   ↓
httpx / database client
   ↓
external services / PostgreSQL
```

Common tools include:

- `asyncio` from the standard library;
- `httpx` for synchronous and asynchronous HTTP clients;
- `asyncpg` for asynchronous PostgreSQL access;
- SQLAlchemy's asyncio support for ORM/Core database work;
- async support in frameworks such as FastAPI.

Use asynchronous code where concurrent I/O is a real property of the workload. It is not necessary to make every function asynchronous merely because a framework supports it.

References: [asyncio](https://docs.python.org/3/library/asyncio.html) · [HTTPX](https://www.python-httpx.org/) · [asyncpg](https://magicstack.github.io/asyncpg/) · [SQLAlchemy asyncio](https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html)

---

# 13. CI and repository automation

A modern CI pipeline for a Python repository commonly contains:

```text
Pull request
    |
    +-- ruff format --check
    +-- ruff check
    +-- pyright
    +-- pytest
    +-- coverage
    +-- build/package checks
    |
    +-- optional Python-version matrix
    +-- optional OS matrix
```

For applications, locking dependencies and testing the exact lockfile environment is often appropriate.

For libraries, CI should normally test the supported Python-version range and dependency combinations that matter to consumers.

Useful additions include dependency update automation, secret scanning, package security scanning, artifact signing/provenance where required, and build/deploy jobs.

A useful CI principle is that formatting, linting, typing, tests, and builds should not depend on an individual developer remembering to run them manually.

---

# 14. Reference project: a modern CLI/tooling repository

A good representative project for the modern Python baseline is a repository-management CLI used around another codebase.

## Example: C/C++ build and test orchestration tool

```text
                   Python CLI
                       |
          +------------+-------------+
          |            |             |
        config       Git          subprocess
          |            |             |
      Pydantic       GitHub       CMake / Ninja
                       |
              +--------+--------+
              |                 |
           artifacts          tests
              |                 |
              +-------+---------+
                      |
                  reports
```

Suggested stack:

```text
uv
Ruff
Pyright
Typer
Pydantic
pytest
GitPython or subprocess
httpx
```

The important design separation is between the CLI layer and the implementation:

```text
cli.py
  ↓
application/services.py
  ↓
adapters/
  ├── git.py
  ├── github.py
  ├── process.py
  └── filesystem.py
```

This structure allows the same application logic to be tested without invoking the complete command-line interface for every test.

---

# 15. Python for testing and tooling around other languages

Python is frequently used in repositories where the production software is not Python.

Typical uses include:

- hardware tests;
- integration tests;
- compiler/build orchestration;
- protocol testing;
- test data generation;
- CI utilities;
- repository maintenance;
- release automation;
- log analysis;
- performance-result processing.

This is particularly useful when the production system is written in C, C++, Rust, Java, or another systems-oriented language but the test and automation environment benefits from Python's libraries and iteration speed.

## Project architecture A: hardware/integration test harness

```text
                     pytest
                        |
              +---------+---------+
              |                   |
          test cases         fixtures
              |                   |
              +---------+---------+
                        |
                device adapter
             +----------+----------+
             |          |          |
           serial      SSH       TCP/UDP
             |          |          |
             +----------+----------+
                        |
                   DUT / hardware
```

Possible libraries:

```text
pytest
Hypothesis
pyserial
paramiko
asyncio / anyio
httpx
pydantic
```

## Project architecture B: C/C++/Rust repository orchestrator

```text
Python CLI
   |
   +-- configure
   +-- build
   +-- run tests
   +-- collect artifacts
   +-- parse logs
   +-- generate report
   |
   +-- CMake / Cargo / Make / Ninja
```

Possible libraries:

```text
Typer
subprocess
pathlib
Pydantic
pytest
rich
```

## Project architecture C: protocol test and traffic generator

```text
pytest
   |
   +-- protocol model
   +-- test vectors
   +-- traffic generator
   +-- packet capture
   |
   +------ network / DUT ------+
                                |
                           result parser
                                |
                             report
```

Potential libraries include `scapy`, `pytest`, `Hypothesis`, `asyncio`, `pydantic`, and standard-library networking tools.

The common pattern is that Python is the control and test layer, while the system under test can be implemented in another language.

---

# 16. Backend and API development

Python has several major web frameworks with different scopes.

| Framework/library | Typical role |
|---|---|
| Django | Full web application framework |
| FastAPI | Typed API/service framework |
| Flask | Small or custom web services |
| SQLAlchemy 2 | Database toolkit and ORM |
| SQLModel | Pydantic/SQLAlchemy-oriented model layer |
| asyncpg | PostgreSQL async driver |
| Pydantic | Validation and serialization |
| httpx | HTTP client |

## FastAPI

FastAPI is a common choice for APIs where typed request/response models and generated OpenAPI documentation are useful.

A representative stack is:

```text
                    HTTP
                     |
                  FastAPI
                     |
             +-------+-------+
             |               |
          Pydantic        routing
             |
          services
             |
        SQLAlchemy 2
             |
        PostgreSQL
```

For asynchronous applications:

```text
FastAPI
   ↓
async service layer
   ├── httpx
   └── SQLAlchemy asyncio / asyncpg
```

## Django

Django provides a much more integrated application stack, including URL routing, middleware, ORM, authentication facilities, administrative interfaces, forms, and other application components.

A typical Django project can be represented as:

```text
Browser / API client
        |
      Django
   +----+----+
   |         |
  views    admin
   |
 services / models
   |
   ORM
   |
PostgreSQL
```

## Flask

Flask is intentionally smaller. It is useful where the application needs HTTP routing and a flexible extension model without a large integrated framework.

## SQLAlchemy 2

SQLAlchemy 2 provides both Core and ORM interfaces and is widely used as the database abstraction beneath Python services.

It can be used synchronously or asynchronously:

```text
Application
    ↓
SQLAlchemy 2
    ↓
PostgreSQL driver
    ├── psycopg
    └── asyncpg / async SQLAlchemy stack
```

## SQLModel

SQLModel combines Pydantic-oriented models with SQLAlchemy functionality. It can reduce duplication in applications where API schemas and database models are closely related, although larger applications may still prefer separate domain/API/database model layers.

References: [Django](https://www.djangoproject.com/) · [FastAPI](https://fastapi.tiangolo.com/) · [Flask](https://flask.palletsprojects.com/) · [SQLAlchemy](https://docs.sqlalchemy.org/en/20/) · [SQLModel](https://sqlmodel.tiangolo.com/) · [asyncpg](https://magicstack.github.io/asyncpg/)

---

# 17. Reference project: API-backed application

## Project architecture A: SaaS backend

```text
                     Client
                       |
                    REST/JSON
                       |
                    FastAPI
                       |
          +------------+-------------+
          |            |             |
        auth        services     background
          |            |           jobs
       Pydantic       |             |
                       |         task queue
                       |
                 SQLAlchemy 2
                       |
                   PostgreSQL
                       |
             +---------+---------+
             |                   |
          object store        cache
```

Possible stack:

```text
FastAPI
Pydantic
SQLAlchemy 2
PostgreSQL
asyncpg
httpx
pytest
Pyright
Ruff
uv
```

## Project architecture B: integrated web application

```text
Browser
   |
 Django
 +--------+--------+
 |        |        |
views    ORM     admin
 |        |        |
templates |   PostgreSQL
          |
      background jobs
```

Use Django's integrated components rather than rebuilding them from many separate packages.

## Project architecture C: small service

```text
HTTP
 |
Flask
 |
small service layer
 |
SQLAlchemy / direct DB client
 |
PostgreSQL
```

This can be preferable when a service does not need the larger application model of Django or the typing/OpenAPI-centric approach of FastAPI.

---

# 18. Machine learning

Python is the primary user-facing language for much of the current machine-learning ecosystem.

The major layers are:

```text
Data
 |
 +-- NumPy / pandas / Polars / PyArrow
 |
Modeling
 |
 +-- scikit-learn
 +-- PyTorch
 +-- JAX
 +-- TensorFlow / Keras
 |
Specialized domains
 |
 +-- OpenCV
 +-- scientific Python stack
 |
Deployment / serving
 |
 +-- framework-specific runtimes
 +-- native/GPU infrastructure
```

## scikit-learn

scikit-learn remains a major library for classical machine learning:

- preprocessing;
- feature engineering;
- regression and classification;
- clustering;
- dimensionality reduction;
- model selection;
- pipelines and evaluation.

## PyTorch

PyTorch is a major framework for deep learning and is commonly used for training and inference workloads involving neural networks, custom architectures, computer vision, NLP, and generative models.

## JAX

JAX provides NumPy-like array programming with transformations such as automatic differentiation, vectorization, JIT compilation, and parallelization. It is used heavily in research and numerical computing.

## TensorFlow and Keras

TensorFlow remains a major deep-learning ecosystem, while Keras provides a high-level modeling API that can be used with supported backends.

## OpenCV

OpenCV provides computer-vision algorithms and image/video processing primitives, including image transformations, feature extraction, geometry, camera processing, and computer-vision pipelines.

## Seaborn

Seaborn sits above Matplotlib for statistical visualization and exploratory analysis.

References: [PyTorch](https://pytorch.org/) · [JAX](https://docs.jax.dev/) · [scikit-learn](https://scikit-learn.org/) · [TensorFlow](https://www.tensorflow.org/) · [Keras](https://keras.io/) · [OpenCV](https://opencv.org/) · [Seaborn](https://seaborn.pydata.org/)

---

# 19. Reference project: machine-learning training system

## Project architecture A: tabular ML

```text
Raw data
   |
 pandas / Polars
   |
 validation
   |
 feature pipeline
   |
scikit-learn Pipeline
   |
 train / validation / test
   |
 model + metrics
   |
artifact registry / file store
```

Possible stack:

```text
Polars or pandas
PyArrow
scikit-learn
Hypothesis
pytest
MLflow or equivalent experiment tracker
```

## Project architecture B: deep-learning training pipeline

```text
              Dataset
                 |
       Parquet / object storage
                 |
            DataLoader
                 |
               PyTorch
                 |
        +--------+--------+
        |                 |
      model            optimizer
        |                 |
        +--------+--------+
                 |
            GPU / CUDA
                 |
           checkpoints
                 |
           evaluation
```

Add experiment tracking, configuration, reproducibility controls, and dataset versioning as project complexity grows.

## Project architecture C: JAX research project

```text
arrays / datasets
       |
     JAX
       |
  pure functions
       |
 grad / jit / vmap
       |
accelerator backend
       |
 metrics / checkpoints
```

JAX tends to reward functional and array-oriented designs, while PyTorch often offers a more imperative module/training-loop style.

---

# 20. Data science: NumPy, pandas, Polars, PyArrow, DuckDB

The modern Python data stack is increasingly composed of interoperable components rather than one dataframe library doing everything.

## NumPy

NumPy remains the base array abstraction for a large part of scientific Python.

## pandas

pandas is the established general-purpose DataFrame library with a very large ecosystem and extensive support in third-party packages.

## Polars

Polars is a high-performance DataFrame/query engine with eager and lazy APIs. It uses Apache Arrow-compatible columnar representations and has strong interoperability with Arrow and DuckDB.

## PyArrow

PyArrow provides Python bindings for Apache Arrow and formats/tools around columnar data. It is important for interoperability between dataframe libraries, storage formats, and analytical engines.

## DuckDB

DuckDB is an embedded analytical SQL database. Its Python integration allows direct querying of pandas DataFrames, Polars DataFrames, and Arrow tables, making it useful as a query layer in local and data-engineering workflows.

For example:

```text
                  Python
                     |
          +----------+----------+
          |          |          |
        pandas     Polars     PyArrow
          |          |          |
          +----------+----------+
                     |
                  DuckDB
                     |
               Parquet / files
```

DuckDB explicitly supports direct integration with pandas, Polars, and PyArrow. [DuckDB Python API](https://duckdb.org/docs/stable/clients/python/overview) · [DuckDB + Polars](https://duckdb.org/docs/current/guides/python/polars)

---

# 21. Reference project: local analytical data platform

## Project architecture A: research notebook to reproducible pipeline

```text
External APIs / files
        |
     ingestion
        |
      Parquet
        |
   PyArrow / Polars
        |
      DuckDB
        |
 transformation queries
        |
     pandas / Polars
        |
 visualization / model
```

This architecture works well for small-to-medium research systems where a full distributed data platform is unnecessary.

## Project architecture B: event/data pipeline

```text
API / message source
        |
      Python
        |
 validation / normalization
        |
      Arrow
        |
      Parquet
        |
 object storage / lake
        |
   DuckDB / Polars
        |
 analytics / ML
```

## Project architecture C: mixed SQL/DataFrame application

```text
PostgreSQL / lake files
        |
      DuckDB
        |
     analytical SQL
        |
     Arrow / Polars
        |
       Python
```

The important property is that SQL and DataFrame processing can coexist rather than requiring every operation to be expressed through the same API.

---

# 22. Financial markets and quantitative research

Python has a large ecosystem for market-data acquisition, research, analytics, and portfolio/model development.

The ecosystem can be divided into several categories.

### Market-data APIs and vendors

Examples include:

- `yfinance` for Yahoo Finance-accessible data;
- Alpha Vantage;
- EODHD;
- Massive;
- MarketData.app;
- Nasdaq Data Link;
- Finnhub;
- Marketaux for financial news and market-related data.

Availability, licensing, asset coverage, historical depth, rate limits, and real-time access differ substantially between providers. These services should therefore be treated as data sources with different contractual and technical characteristics rather than interchangeable libraries.

### Analysis and research

```text
NumPy
pandas
Polars
SciPy
scikit-learn
PyArrow
DuckDB
```

### Research-oriented project architecture

```text
                   Market data APIs
                 /        |        \
             prices     news     fundamentals
                 \        |        /
                  ingestion layer
                       |
                 normalized data
                       |
             Parquet / PostgreSQL
                       |
              +--------+--------+
              |                 |
           Polars            DuckDB
              |                 |
              +--------+--------+
                       |
                 feature engine
                       |
                research models
                       |
                backtest / eval
                       |
                reports / API
```

## Reference project A: market-data collector

```text
scheduler
   |
provider adapters
   +-- yfinance
   +-- Finnhub
   +-- Alpha Vantage
   +-- EODHD
   |
Pydantic schemas
   |
normalized records
   |
Parquet / PostgreSQL
```

Use provider-specific adapters so that the remainder of the application does not depend on one vendor's response schema.

## Reference project B: quantitative research platform

```text
market data
    |
 feature computation
    |
   DuckDB
    |
 Polars / NumPy
    |
 backtest engine
    |
 metrics + plots
    |
 experiment store
```

## Reference project C: market/news analytics service

```text
price feed       news feed       fundamentals
    |                |                 |
    +----------------+-----------------+
                     |
                normalization
                     |
                  storage
                     |
              feature generation
                     |
             API / dashboard / model
```

The natural division is to keep external APIs and their authentication/response formats at the edges of the application and expose normalized internal models to the rest of the system.

---

# 23. Data acquisition, scraping, and web automation

Python provides libraries for both direct HTTP acquisition and full browser automation.

Typical layers are:

```text
Direct HTTP
├── requests
├── httpx
└── aiohttp

HTML/XML parsing
├── BeautifulSoup
└── lxml

Web crawling
└── Scrapy

Browser automation
├── Playwright
└── Selenium
```

The appropriate layer depends on the source:

```text
stable HTTP API / static HTML
        ↓
    HTTP client
        ↓
     parser

client-rendered web application
        ↓
   browser automation
        ↓
  extracted state
```

## Reference project A: API-first data acquisition

```text
scheduler
   |
async worker pool
   |
httpx
   |
Pydantic validation
   |
normalized schema
   |
Parquet / database
```

## Reference project B: crawler

```text
seed URLs
    |
  Scrapy
    |
request scheduler
    |
parser
    |
item pipeline
    |
validation
    |
storage
```

## Reference project C: browser automation

```text
job queue
   |
Playwright
   |
login / navigation
   |
page extraction
   |
structured records
   |
validation
   |
storage
```

Browser automation should be reserved for sites where HTTP-level acquisition is insufficient. It has higher resource usage and additional failure modes.

---

# 24. Data engineering and ETL/ELT

Python is frequently used for orchestration and transformation even when the heavy data processing is delegated to SQL engines, warehouses, distributed systems, or columnar libraries.

A local or single-node pipeline can look like:

```text
source
  |
Python ingestion
  |
validation
  |
Parquet
  |
DuckDB / Polars
  |
transformation
  |
Parquet / database
  |
analytics / ML
```

A larger deployment can introduce an orchestration layer and external storage:

```text
scheduler / orchestrator
        |
  +-----+-----+
  |           |
ingest      transform
  |           |
object store / warehouse
        |
   downstream jobs
```

Python remains useful in both settings because it can interact with APIs, SQL engines, object storage, filesystems, and specialized processing libraries from one environment.

---

# 25. PDF processing and document extraction

PDF processing is not one problem. Different libraries address different parts of the pipeline.

| Task | Libraries |
|---|---|
| General PDF manipulation | PyMuPDF, pypdf, pypdfium2 |
| Text/layout extraction | PyMuPDF, pdfplumber |
| Table extraction | Camelot and related tooling |
| LLM-oriented extraction | PyMuPDF4LLM, Unstructured, Marker |
| Generic document extraction | Unstructured, textract |

Some tools focus on deterministic PDF parsing and rendering, while others provide higher-level document extraction or markdown/LLM-oriented representations.

## Reference project A: document ingestion

```text
PDF
 |
parser / renderer
 |
text + layout
 |
structure detection
 |
Pydantic document model
 |
JSON / database / search index
```

## Reference project B: RAG document pipeline

```text
PDF / DOCX / HTML
        |
  document parser
        |
  normalized document
        |
    chunking
        |
   embedding
        |
 vector database
        |
    retrieval
```

Possible parsing layer:

```text
PyMuPDF
PyMuPDF4LLM
Marker
Unstructured
```

## Reference project C: large document batch processor

```text
object storage
    |
worker queue
    |
PDF processor
    |
metadata + extracted text
    |
Parquet / database
    |
quality report
```

References: [PyMuPDF](https://pymupdf.readthedocs.io/) · [pypdf](https://pypdf.readthedocs.io/) · [Camelot](https://camelot-py.readthedocs.io/) · [Unstructured](https://docs.unstructured.io/) · [Marker](https://github.com/datalab-to/marker)

---

# 26. Excel and spreadsheet integration

Python is commonly used to automate spreadsheet workflows and to bridge spreadsheets with databases, APIs, and data-processing systems.

Important libraries include:

| Library | Typical role |
|---|---|
| openpyxl | Read/write `.xlsx` workbooks |
| XlsxWriter | Create formatted `.xlsx` output |
| pandas | Tabular extraction/transformation |
| Polars | High-performance tabular processing |
| PyArrow | Columnar/interchange formats |

A typical workflow is:

```text
Excel
 |
openpyxl
 |
normalized data
 |
Polars / pandas
 |
validation / transformation
 |
API / database / Parquet
 |
XlsxWriter
 |
Excel report
```

## Reference project: spreadsheet reporting service

```text
Database / APIs
      |
     ETL
      |
  Polars/pandas
      |
 business calculations
      |
  report model
      |
 XlsxWriter
      |
 .xlsx report
```

For read/write manipulation of an existing workbook, `openpyxl` is usually more appropriate; for generating a new formatted workbook, XlsxWriter is a common choice.

References: [openpyxl](https://openpyxl.readthedocs.io/) · [XlsxWriter](https://xlsxwriter.readthedocs.io/)

---

# 27. Automation and bots

Python is well suited to scheduled tasks that combine APIs, filesystem operations, web requests, database access, and notifications.

Examples include:

- scheduled data collection;
- report generation;
- email or messaging automation;
- repository maintenance;
- account/API workflows;
- web automation;
- local personal tools;
- monitoring and alerting.

A small automation often needs no framework:

```text
cron / Task Scheduler
        |
     Python CLI
        |
 +------+------+------+
 |      |      |      |
 HTTP  DB    files  notifications
```

For larger systems, a job queue or workflow orchestrator can be introduced.

## Reference project A: scheduled financial-data bot

```text
scheduler
   |
collector
   |
validation
   |
feature calculation
   |
alert rules
   |
Telegram/email/webhook
```

Possible libraries:

```text
httpx
Pydantic
Polars
DuckDB
APScheduler / external scheduler
```

## Reference project B: repository maintenance bot

```text
scheduled GitHub event
        |
Python worker
        |
GitHub API
        |
repository inspection
        |
PR / issue / report
```

Potential stack:

```text
Typer
httpx
Pydantic
GitHub API client
pytest
```

---

# 28. GUIs and rapid application development

Python offers several GUI approaches with different goals.

| Framework | Typical positioning |
|---|---|
| PySide6 | Full desktop applications with Qt |
| CustomTkinter | Small/simple desktop utilities |
| Dear PyGui | Developer tools and interactive utilities |
| Flet | Python-oriented application UI |
| NiceGUI | Python-oriented web UI and dashboards |

## PySide6

PySide6 provides Qt 6 bindings for Python and is the main choice in this group for traditional, feature-rich desktop applications.

Representative architecture:

```text
Qt UI
 |
controller / view-model
 |
application services
 |
+-------+---------+
|       |         |
files  DB       HTTP APIs
```

## CustomTkinter

A practical option for simple utilities where a full Qt application would be unnecessary.

## Dear PyGui

Useful for developer-oriented interfaces, visualization tools, technical dashboards, and tools where rapid interactive UI construction matters.

## Flet and NiceGUI

Both are useful when a Python-first approach to UI development is preferred and a web-backed or hybrid application model is acceptable.

## Reference project A: desktop engineering tool

```text
                 PySide6
                    |
        +-----------+-----------+
        |           |           |
      views      state       actions
        |           |           |
        +----- services -------+
                    |
          +---------+---------+
          |         |         |
       serial     files      REST
```

## Reference project B: internal dashboard

```text
browser
   |
NiceGUI
   |
application services
   |
SQLAlchemy / HTTP clients
   |
PostgreSQL / external APIs
```

## Reference project C: rapid data-analysis tool

```text
Dear PyGui / Flet
        |
     controls
        |
Python analysis layer
        |
Polars / NumPy
        |
charts / tables
```

References: [Qt for Python](https://doc.qt.io/qtforpython-6/) · [CustomTkinter](https://customtkinter.tomschimansky.com/) · [Dear PyGui](https://dearpygui.com/) · [Flet](https://flet.dev/) · [NiceGUI](https://nicegui.io/)

---

# 29. LLM applications

Python has become a major development environment for LLM applications because model APIs, data pipelines, retrieval, evaluation, web services, and agent frameworks can all be combined in the same language.

There are several layers.

```text
Application
    |
Agent / orchestration
    |
Structured outputs / tools
    |
Model provider SDK
    |
Model API / local model
```

Major frameworks include:

- PydanticAI;
- LangGraph;
- LangChain;
- LlamaIndex;
- OpenAI Agents SDK;
- smolagents.

These are not interchangeable implementations of exactly the same problem.

### PydanticAI

PydanticAI emphasizes typed, structured Python applications and integrates naturally with Pydantic models.

### LangGraph

LangGraph focuses on graph-based orchestration of agentic/stateful workflows.

### LangChain

LangChain provides a broad ecosystem of model, tool, retrieval, and application integrations.

### LlamaIndex

LlamaIndex focuses heavily on connecting data to LLM applications and retrieval/data-oriented workflows, although its scope extends further.

### OpenAI Agents SDK

A provider-specific agent framework for applications that use agents, tools, handoffs, guardrails, and tracing around OpenAI models and related integrations.

### smolagents

A lightweight agent-oriented framework from Hugging Face with an emphasis on relatively simple agent implementations and code-executing/tool-using agents.

References: [PydanticAI](https://ai.pydantic.dev/) · [LangGraph](https://langchain-ai.github.io/langgraph/) · [LangChain](https://python.langchain.com/) · [LlamaIndex](https://docs.llamaindex.ai/) · [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/) · [smolagents](https://huggingface.co/docs/smolagents/)

---

# 30. Reference project: structured LLM application

## Project architecture A: typed extraction service

```text
HTTP request
    |
FastAPI
    |
Pydantic input model
    |
LLM client
    |
structured output
    |
Pydantic validation
    |
PostgreSQL
```

This architecture does not require an agent framework. A direct provider SDK plus Pydantic can be sufficient.

## Project architecture B: tool-using agent

```text
User
 |
API
 |
Agent runtime
 |
+------+------+------+
|      |      |      |
search  DB   Python  external API
|             tool
+------+------+------+
       |
 structured result
       |
       API
```

Potential framework choices:

```text
PydanticAI
LangGraph
OpenAI Agents SDK
smolagents
```

## Project architecture C: stateful multi-step workflow

```text
input
  |
classification
  |
research
  |
retrieval
  |
tool execution
  |
verification
  |
final response
```

A graph-oriented framework such as LangGraph is useful when durable state and explicit workflow transitions are important.

---

# 31. RAG and retrieval

Retrieval-augmented generation is best understood as a pipeline rather than a single library.

```text
Documents
   |
parsing
   |
cleaning / normalization
   |
chunking
   |
embedding
   |
index
   |
retrieval
   |
context construction
   |
LLM
```

Libraries and products occupy different layers.

| Layer | Examples |
|---|---|
| Document/data ingestion | LlamaIndex, custom pipelines, Unstructured, PyMuPDF ecosystem |
| Retrieval/orchestration | LlamaIndex, LangChain, custom code |
| Vector search | Qdrant, pgvector, Chroma, LanceDB |
| General storage | PostgreSQL, object storage, Parquet |

### Qdrant

A vector/semantic search database designed for vector retrieval workloads.

### pgvector

A PostgreSQL extension for vector similarity search. It is convenient when vectors and application data should live in the same PostgreSQL system.

### Chroma

A developer-oriented vector database/library aimed at simplifying vector-search application development.

### LanceDB

A data-oriented database for vector and multimodal retrieval workloads, with integrations around Arrow/data tooling.

References: [Qdrant](https://qdrant.tech/) · [pgvector](https://github.com/pgvector/pgvector) · [Chroma](https://docs.trychroma.com/) · [LanceDB](https://lancedb.com/) · [LlamaIndex](https://docs.llamaindex.ai/)

---

# 32. Reference project: RAG system

## Project architecture A: PostgreSQL-centered RAG

```text
                     Documents
                         |
                    parser/OCR
                         |
                    text chunks
                         |
                    embeddings
                         |
                         v
                 PostgreSQL + pgvector
                  /        |         \
             metadata   vectors    full text
                  \        |         /
                   retrieval service
                         |
                  prompt/context
                         |
                       LLM
                         |
                     response
```

This design is useful when the application already uses PostgreSQL and prefers a single persistence system.

## Project architecture B: dedicated vector store

```text
Documents
   |
processing
   |
embedding
   |
Qdrant
   |
retrieval
   |
LLM application
   |
PostgreSQL
```

PostgreSQL can remain the system of record while Qdrant handles retrieval-specific indexing.

## Project architecture C: local data/RAG system

```text
PDF / HTML / DOCX
        |
PyMuPDF / Marker / Unstructured
        |
      chunks
        |
embedding model
        |
LanceDB / Chroma
        |
retrieval
        |
LLM
```

For a small local application, this can be enough without a separate production database.

---

# 33. The modern Python ecosystem as layers

A useful way to understand the ecosystem is to group tools by role rather than language package name.

```text
                           PYTHON
                              |
       +----------------------+----------------------+
       |                      |                      |
    Tooling               Application              Data/ML
       |                      |                      |
    uv / Ruff             FastAPI / Django       NumPy / pandas
    Pyright               Flask / Typer          Polars / Arrow
    pytest                SQLAlchemy             DuckDB
    Pydantic              httpx                  PyTorch / JAX
                           |                      scikit-learn
                           |
       +------------------+----------------------+------------------+
       |                  |                      |                  |
 Automation          Documents                LLMs              GUIs
       |                  |                      |                  |
 HTTP / browser       PyMuPDF                PydanticAI         PySide6
 Scrapy / Playwright  pypdf                  LangGraph          Dear PyGui
 schedulers            Camelot                LangChain          Flet
                       Marker                 LlamaIndex         NiceGUI
                       Unstructured            Agents SDK
```

This perspective is useful because several libraries that appear to compete are actually complementary.

For example:

```text
FastAPI + Pydantic + SQLAlchemy + PostgreSQL
```

are layers of one backend rather than four competing frameworks.

Similarly:

```text
PyMuPDF + PyArrow + Polars + DuckDB
```

can form one data pipeline.

And:

```text
PydanticAI + Qdrant + FastAPI + PostgreSQL
```

can form one LLM application.

---

# 34. Suggested technology selections by problem

| Problem | Common modern Python choices |
|---|---|
| General scripting | stdlib + `uv` |
| Typed CLI | Typer |
| Small CLI | argparse |
| Mature CLI framework | Click |
| API service | FastAPI |
| Full web application | Django |
| Minimal web service | Flask |
| Database toolkit | SQLAlchemy 2 |
| PostgreSQL async driver | asyncpg |
| Validation | Pydantic |
| HTTP client | HTTPX |
| Unit/integration tests | pytest |
| Property-based tests | Hypothesis |
| Lint + format | Ruff |
| Static type checking | Pyright |
| Data arrays | NumPy |
| General DataFrames | pandas |
| High-performance DataFrames | Polars |
| Columnar interchange | PyArrow |
| Local analytical SQL | DuckDB |
| Classical ML | scikit-learn |
| Deep learning | PyTorch |
| Numerical/functional ML | JAX |
| TensorFlow ecosystem | TensorFlow + Keras |
| Computer vision | OpenCV |
| Statistical plotting | Seaborn |
| PDF parsing | PyMuPDF / pypdf / pypdfium2 |
| PDF table extraction | Camelot |
| LLM-oriented documents | PyMuPDF4LLM / Marker / Unstructured |
| Excel read/write | openpyxl |
| Excel generation | XlsxWriter |
| Web scraping | Scrapy / BeautifulSoup / lxml |
| Browser automation | Playwright / Selenium |
| Desktop GUI | PySide6 |
| Simple GUI | CustomTkinter |
| Technical GUI | Dear PyGui |
| Python-first rapid UI | Flet / NiceGUI |
| Agent applications | PydanticAI / LangGraph / OpenAI Agents SDK / others |
| LLM application framework | LangChain / LlamaIndex |
| Vector search | Qdrant / pgvector / Chroma / LanceDB |
| Observability | OpenTelemetry |
| Documentation | MkDocs or Sphinx |

The table is deliberately not a ranking. The correct choice depends on the application's size, constraints, compatibility requirements, and the capabilities required from the library.

---

# 35. A practical modern Python repository

A reasonably complete application might therefore look like:

```text
project/
├── pyproject.toml
├── uv.lock
├── README.md
├── docs/
│   ├── index.md
│   ├── architecture.md
│   └── guides/
├── src/
│   └── project/
│       ├── __init__.py
│       ├── cli.py
│       ├── config.py
│       ├── api/
│       ├── domain/
│       ├── models/
│       ├── services/
│       ├── adapters/
│       └── infrastructure/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── .github/
    └── workflows/
        ├── ci.yml
        └── release.yml
```

The corresponding toolchain could be:

```text
uv
Ruff
Pyright
Pydantic
pytest
Hypothesis
MkDocs
OpenTelemetry
```

The domain-specific portion then depends on the application:

```text
Web/API
    → FastAPI + SQLAlchemy

Data/analytics
    → Polars + PyArrow + DuckDB

ML
    → PyTorch / JAX / scikit-learn

Documents
    → PyMuPDF + pypdf + Marker/Unstructured

LLM/RAG
    → PydanticAI/LangGraph/LlamaIndex + pgvector/Qdrant

Desktop
    → PySide6

Automation
    → HTTPX + Playwright + scheduler/worker
```

This makes the distinction between **project tooling** and **domain libraries** explicit.

---

# 36. Sources and further reading

### Python

- [Python](https://www.python.org/)
- [Python 3.15 RC2](https://www.python.org/downloads/release/python-3150rc2/)
- [Python release schedule](https://peps.python.org/pep-0790/)

### Project tooling

- [uv](https://docs.astral.sh/uv/)
- [Ruff](https://docs.astral.sh/ruff/)
- [Pyright](https://microsoft.github.io/pyright/)
- [Pydantic](https://docs.pydantic.dev/)
- [pytest](https://docs.pytest.org/)
- [Hypothesis](https://hypothesis.readthedocs.io/)
- [Click](https://click.palletsprojects.com/)
- [Typer](https://typer.tiangolo.com/)
- [MkDocs](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [Sphinx](https://www.sphinx-doc.org/)
- [OpenTelemetry Python](https://opentelemetry.io/docs/languages/python/)

### Backend

- [Django](https://www.djangoproject.com/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Flask](https://flask.palletsprojects.com/)
- [SQLAlchemy](https://docs.sqlalchemy.org/en/20/)
- [SQLModel](https://sqlmodel.tiangolo.com/)
- [asyncpg](https://magicstack.github.io/asyncpg/)
- [HTTPX](https://www.python-httpx.org/)

### Data and ML

- [NumPy](https://numpy.org/)
- [pandas](https://pandas.pydata.org/)
- [Polars](https://docs.pola.rs/)
- [PyArrow](https://arrow.apache.org/docs/python/)
- [DuckDB](https://duckdb.org/docs/stable/clients/python/overview)
- [scikit-learn](https://scikit-learn.org/)
- [PyTorch](https://pytorch.org/)
- [JAX](https://docs.jax.dev/)
- [TensorFlow](https://www.tensorflow.org/)
- [Keras](https://keras.io/)
- [OpenCV](https://opencv.org/)
- [Seaborn](https://seaborn.pydata.org/)

### Documents and spreadsheets

- [PyMuPDF](https://pymupdf.readthedocs.io/)
- [pypdf](https://pypdf.readthedocs.io/)
- [pypdfium2](https://github.com/pypdfium2-team/pypdfium2)
- [pdfplumber](https://github.com/jsvine/pdfplumber)
- [Camelot](https://camelot-py.readthedocs.io/)
- [PyMuPDF4LLM](https://pymupdf.readthedocs.io/en/latest/pymupdf4llm/)
- [Unstructured](https://docs.unstructured.io/)
- [Marker](https://github.com/datalab-to/marker)
- [Textract](https://textract.readthedocs.io/)
- [openpyxl](https://openpyxl.readthedocs.io/)
- [XlsxWriter](https://xlsxwriter.readthedocs.io/)

### GUI

- [Qt for Python / PySide6](https://doc.qt.io/qtforpython-6/)
- [CustomTkinter](https://customtkinter.tomschimansky.com/)
- [Dear PyGui](https://dearpygui.com/)
- [Flet](https://flet.dev/)
- [NiceGUI](https://nicegui.io/)

### LLMs and agents

- [PydanticAI](https://ai.pydantic.dev/)
- [LangGraph](https://langchain-ai.github.io/langgraph/)
- [LangChain](https://python.langchain.com/)
- [LlamaIndex](https://docs.llamaindex.ai/)
- [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/)
- [smolagents](https://huggingface.co/docs/smolagents/)
- [Qdrant](https://qdrant.tech/)
- [pgvector](https://github.com/pgvector/pgvector)
- [Chroma](https://docs.trychroma.com/)
- [LanceDB](https://lancedb.com/)
