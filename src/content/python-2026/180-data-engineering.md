---
title: "Data engineering"
blurb: "Arrow and Parquet as the common formats, with a single-node stack and a lakehouse."
part: "Domains"
---

[Arrow](https://arrow.apache.org/docs/format/Columnar.html) is the common in-memory format across engines; [Parquet](https://parquet.apache.org/docs/) is the common on-disk format. Most of the libraries below interoperate through both without copying.

| Library | Description |
|---|---|
| [PyArrow](https://arrow.apache.org/docs/python/) | Arrow implementation for Python; Parquet, ORC, Flight, dataset APIs. |
| [Polars](https://docs.pola.rs/) | DataFrame library written in Rust. Lazy and eager APIs, query optimizer, multithreaded. |
| [DuckDB](https://duckdb.org/docs/) | In-process analytical SQL engine. Reads Parquet, CSV and Arrow directly, supports larger-than-memory queries. |
| [pandas 3.0](https://pandas.pydata.org/docs/) | Released 21 January 2026. Copy-on-write is now default; string columns use a dedicated dtype backed by PyArrow when installed. |
| [Dask](https://docs.dask.org/) | Parallel and distributed execution of pandas/NumPy-shaped workloads. |
| [Ray](https://docs.ray.io/) | Distributed compute framework; Ray Data for pipelines, Ray Tune/Train for ML. |
| [PySpark](https://spark.apache.org/docs/latest/api/python/) | Python API for Apache Spark; used where a cluster already exists. |
| [Narwhals](https://narwhals-dev.github.io/narwhals/) | Compatibility layer allowing library code to accept pandas, Polars or PyArrow frames. |

| Orchestration | Description |
|---|---|
| [Airflow 3](https://airflow.apache.org/docs/) | DAG-based scheduler. Large operator ecosystem. |
| [Dagster](https://docs.dagster.io/) | Asset-oriented orchestrator with typed inputs/outputs and data lineage. |
| [Prefect 3](https://docs.prefect.io/) | Python-native flow orchestration; flows and tasks are decorated functions, and a flow runs without a scheduler in front of it. |
| [dbt](https://docs.getdbt.com/) | SQL transformation framework with tests and lineage. |
| [SQLMesh](https://sqlmesh.readthedocs.io/) | SQL transformation tool with column-level lineage and virtual environments. |

| Storage and quality | Description |
|---|---|
| [deltalake](https://delta-io.github.io/delta-rs/) | Rust-backed Python bindings for Delta Lake tables. |
| [PyIceberg](https://py.iceberg.apache.org/) | Python implementation of the Apache Iceberg table format. |
| [fsspec](https://filesystem-spec.readthedocs.io/), [s3fs](https://s3fs.readthedocs.io/), [gcsfs](https://gcsfs.readthedocs.io/), [adlfs](https://github.com/fsspec/adlfs) | Uniform filesystem interface over local disk and object stores. |
| [dlt](https://dlthub.com/docs/) | Declarative extract-and-load library producing typed, schema-evolving pipelines. |
| [confluent-kafka](https://docs.confluent.io/kafka-clients/python/current/overview.html) | Kafka client wrapping librdkafka. |
| [Pandera](https://pandera.readthedocs.io/) | Schema and statistical validation for dataframes, including Polars. |
| [Great Expectations](https://docs.greatexpectations.io/) | Data quality suite with expectation stores and reporting. |

**Single-node analytics stack.**
`dlt (API extract) → Parquet on S3 via s3fs → DuckDB → SQLMesh models → Dagster assets`

Raw responses are written unmodified before any transformation, partitioned by ingestion date, so transformations can be replayed without re-fetching — the fetch is the part you cannot repeat, because the source has already changed. DuckDB queries the Parquet files in place; no warehouse is provisioned. Dagster models each table as an asset with declared upstream dependencies, so a schema change shows its blast radius. Pandera schemas run at the boundary between raw and modelled layers. This design handles datasets into the hundreds of gigabytes on one machine, which is more than most projects that reach for a cluster actually have.

**Lakehouse with a table format.**
`Sources → PySpark or Polars writer → Delta Lake or Iceberg tables on object storage → query engines`

The table format supplies ACID commits, schema evolution and time travel, which plain Parquet does not. `deltalake` and `pyiceberg` allow writing and reading without a JVM for smaller jobs, with Spark used for the large ones. Airflow schedules the batch jobs. ConnectorX handles bulk extraction from operational databases into Arrow.
