---
title: "Data engineering"
blurb: "Arrow and Parquet as the common formats, with a single-node stack and a lakehouse."
part: "Domains"
---

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
