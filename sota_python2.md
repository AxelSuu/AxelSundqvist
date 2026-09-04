# The State of Python, 2026 — Part 2: Libraries and use cases

A reference of what Python is used for and which libraries are current in each area, with example system designs. Snapshot as of September 2026.

---

## Backends, databases and APIs

### Web frameworks

| Framework | Description |
|---|---|
| Django 5.x | Full-stack framework. Includes ORM, migrations, admin interface, auth, forms, templating. Supports async views. |
| FastAPI | ASGI framework built on Starlette and Pydantic. Generates OpenAPI schemas from type hints. |
| Litestar | ASGI framework. Similar scope to FastAPI, different dependency-injection and layering model. |
| Flask 3 | WSGI microframework. Async support is limited. |
| Starlette | ASGI toolkit; the layer FastAPI is built on. Usable directly. |
| Django REST Framework | Serializers, viewsets and auth for Django APIs. |
| Django Ninja | FastAPI-style typed API layer for Django. |

### Servers

| Server | Description |
|---|---|
| Uvicorn | ASGI server, uvloop-based. |
| Granian | Rust-based ASGI/WSGI/RSGI server. |
| Hypercorn | ASGI server with HTTP/2 and HTTP/3 support. |
| Gunicorn | WSGI process manager; commonly used to supervise Uvicorn workers. |

### Databases

| Library | Description |
|---|---|
| SQLAlchemy 2.0 | ORM and Core query builder. The 2.0 API is fully typed and supports async sessions. |
| Alembic | Migration tool for SQLAlchemy. |
| asyncpg | Async PostgreSQL driver, no DB-API layer, high throughput. |
| psycopg 3 | PostgreSQL driver with sync and async support, server-side binding, `COPY` support. |
| SQLModel | Layer combining SQLAlchemy models and Pydantic models in one class. |
| Tortoise ORM, Piccolo, Peewee | Alternative ORMs; async-first (Tortoise, Piccolo) or lightweight (Peewee). |
| aiosqlite | Async wrapper around `sqlite3`. |
| redis-py | Redis client, sync and async. |
| pymongo | MongoDB driver; includes async support since 4.13. |
| ConnectorX | Fast bulk loading from SQL databases into Arrow/Polars/pandas. |

### Supporting

| Library | Description |
|---|---|
| Pydantic v2 | Validation and serialization; core implemented in Rust. |
| pydantic-settings | Environment and config file loading into typed settings objects. |
| Authlib | OAuth 1/2 and OpenID Connect client and server implementations. |
| Celery | Distributed task queue, broker-backed, mature. |
| Dramatiq, RQ, arq, taskiq | Lighter task queues; arq and taskiq are asyncio-native. |
| Temporal Python SDK | Durable workflow execution with retries and state persistence. |
| Testcontainers | Runs real service containers (Postgres, Redis, Kafka) inside tests. |

### Example designs

**Multi-tenant SaaS API.**
`Client → Uvicorn/FastAPI → SQLAlchemy async session → asyncpg → PostgreSQL`, with Redis for caching and rate limiting and arq for background jobs.

Request bodies and responses are Pydantic models, so the OpenAPI schema is generated rather than maintained. Tenant scoping is applied in a request-scoped dependency that attaches `tenant_id` to the session, rather than in each query. Configuration comes from `pydantic-settings`, so a missing environment variable fails at startup. Alembic migrations run as a separate step in the deploy, not on application boot. Integration tests use Testcontainers to run a real PostgreSQL instance.

**Internal operations tool.**
`Django + Django Ninja → PostgreSQL`, with Celery and Redis for scheduled work.

The Django admin covers most CRUD screens, so the custom UI is limited to the few workflows that need it. Django's permission and group model handles access control. Scheduled exports and long imports run as Celery tasks with results written back to a job table that the admin displays. Django Ninja provides a typed JSON API for the parts consumed by other services.

**Webhook ingestion service.**
`Provider webhook → Litestar → Pydantic validation → confluent-kafka producer → consumer → psycopg3 COPY → PostgreSQL`

The HTTP layer does validation, deduplication against a Redis idempotency key, and nothing else; it returns 202 as soon as the event is durable. Consumers batch rows and insert with `COPY` rather than per-row inserts. Multi-step processing that must survive restarts (provisioning, billing) runs as Temporal workflows instead of chained queue tasks.

---

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
| Daft | Distributed dataframe built on Arrow, aimed at multimodal data. |
| Narwhals | Compatibility layer allowing library code to accept pandas, Polars or PyArrow frames. |

### Orchestration and transformation

| Library | Description |
|---|---|
| Airflow 3 | DAG-based scheduler. Large operator ecosystem. |
| Dagster | Asset-oriented orchestrator with typed inputs/outputs and data lineage. |
| Prefect 3 | Python-native flow orchestration, lighter deployment model. |
| dbt | SQL transformation framework with tests and lineage; Python models supported on some warehouses. |
| SQLMesh | SQL transformation tool with column-level lineage and virtual environments. |

### Storage, ingestion and quality

| Library | Description |
|---|---|
| deltalake | Rust-backed Python bindings for Delta Lake tables. |
| PyIceberg | Python implementation of the Apache Iceberg table format. |
| fsspec, s3fs, gcsfs, adlfs | Uniform filesystem interface over local disk and object stores. |
| dlt | Declarative extract-and-load library producing typed, schema-evolving pipelines. |
| Meltano / Singer | Connector ecosystem for EL pipelines. |
| confluent-kafka, kafka-python | Kafka clients; confluent-kafka wraps librdkafka. |
| Bytewax, Quix Streams | Python stream processing frameworks. |
| Pandera | Schema and statistical validation for dataframes, including Polars. |
| Great Expectations | Data quality suite with expectation stores and reporting. |

### Example designs

**Single-node analytics stack.**
`dlt (API extract) → Parquet on S3 via s3fs → DuckDB → SQLMesh models → Dagster assets`

Raw responses are written unmodified before any transformation, partitioned by ingestion date, so transformations can be replayed without re-fetching. DuckDB queries the Parquet files in place; no warehouse is provisioned. Dagster models each table as an asset with declared upstream dependencies, so a schema change shows its blast radius. Pandera schemas run at the boundary between raw and modelled layers. This design handles datasets into the hundreds of gigabytes on one machine.

**Lakehouse with a table format.**
`Sources → PySpark or Polars writer → Delta Lake or Iceberg tables on object storage → query engines`

The table format supplies ACID commits, schema evolution and time travel, which plain Parquet does not. `deltalake` and `pyiceberg` allow writing and reading without a JVM for smaller jobs, with Spark used for the large ones. Airflow schedules the batch jobs. ConnectorX handles bulk extraction from operational databases into Arrow.

**Streaming aggregation.**
`Kafka topic → confluent-kafka consumer → Bytewax windowed aggregation → sink to ClickHouse/PostgreSQL`

State for the windows lives in the stream processor with periodic checkpoints. Messages that fail validation go to a dead-letter topic rather than blocking the partition. Batch and stream paths share the same transformation functions where possible so results are comparable.

---

## Data science

| Library | Description |
|---|---|
| NumPy 2.x | N-dimensional arrays and vectorized operations. Foundation for most of the stack. |
| SciPy | Optimization, integration, interpolation, linear algebra, statistics, signal processing. |
| pandas 3.0 | Labelled tabular data. See notes above on copy-on-write and string dtype. |
| Polars | Alternative dataframe library; expression API, faster on large frames. |
| statsmodels | Statistical models, hypothesis tests, time series (ARIMA, state space). |
| scikit-learn | Classical machine learning, preprocessing, model selection, pipelines. |
| Jupyter / JupyterLab | Notebook environment. |
| marimo | Reactive notebook stored as a plain `.py` file; runs as a script or an app. |
| Matplotlib | Base plotting library; full control, publication output. |
| Seaborn | Statistical plots over Matplotlib. |
| Plotly | Interactive charts, HTML output, Dash integration. |
| Altair | Declarative charts based on the Vega-Lite grammar. |
| Bokeh, HoloViews / hvPlot | Interactive plotting for larger datasets and dashboards. |
| Great Tables | Formatted display tables for reports. |
| Pint | Physical units attached to arrays and scalars. |

### Example designs

**Reproducible analysis repository.**
`uv project → marimo notebooks (.py) → Polars transforms → statsmodels → Altair charts → Parquet outputs`

Because marimo notebooks are plain Python files, they diff and merge in git and can be imported by tests or run headless in CI. Data loading is separated into an importable module so the same code runs in the notebook and in the scheduled job. Outputs are written to a versioned directory rather than being read off the screen. The lockfile pins the environment the numbers were produced in.

**Experiment analysis pipeline.**
`Event warehouse → DuckDB extract → pandas/statsmodels → bootstrap CIs with NumPy → Great Tables report`

Assignment and exposure data are joined once and cached to Parquet so repeated analyses are cheap. Metric definitions live in one module and are parametrized, rather than being re-implemented per experiment. Confidence intervals are computed by bootstrap where the metric is a ratio or has a heavy tail.

**Sensor time series exploration.**
`Zarr or Parquet store → xarray → SciPy filtering and resampling → hvPlot`

xarray keeps coordinates (time, channel, run ID) attached through the pipeline, so slicing by condition does not depend on positional indexing. Chunked reads through Zarr allow working with recordings larger than memory. Interactive plots with datashader-backed rendering handle multi-million-point traces.

---

## Web scraping

| Library | Description |
|---|---|
| httpx | HTTP client with sync and async APIs, HTTP/2, connection pooling. |
| requests | Synchronous HTTP client, widely used, maintenance mode. |
| aiohttp | Async HTTP client and server. |
| curl_cffi | HTTP client that mimics browser TLS/JA3 fingerprints. |
| selectolax | Fast HTML parser with CSS selectors (Modest/Lexbor bindings). |
| lxml | libxml2 bindings; XPath, CSS selectors, XML handling. |
| BeautifulSoup 4 | Tolerant HTML parsing API; usually paired with lxml as the backend. |
| parsel | Selector library extracted from Scrapy; XPath and CSS. |
| Scrapy | Crawling framework with scheduling, retries, throttling, pipelines and middleware. |
| Crawlee for Python | Crawling framework with unified HTTP and browser crawlers, proxy rotation. |
| Playwright | Browser automation over Chromium, Firefox and WebKit; sync and async APIs. |
| Selenium | Browser automation via WebDriver. |
| trafilatura | Main-content and metadata extraction from HTML pages. |
| feedparser | RSS and Atom parsing. |
| `urllib.robotparser` | Stdlib robots.txt parsing. |

### Example designs

**Broad crawl.**
`Scrapy spider → download middleware (proxies, throttling) → parsel selectors → item pipeline → Parquet`

AutoThrottle and per-domain concurrency limits control request rate. A Playwright-backed downloader handles only the URL patterns that require JavaScript, keeping the rest on plain HTTP. Deduplication uses a URL fingerprint store so restarts resume rather than re-crawl. Items are validated against a Pydantic model in the pipeline before being written.

**Targeted API harvesting.**
`httpx.AsyncClient + semaphore → raw JSON to disk → selectolax/json parsing → Polars`

Many pages that appear to require a browser are backed by JSON endpoints visible in the network tab; calling them directly removes the browser entirely. Concurrency is bounded by a semaphore and retries use exponential backoff with jitter. Raw responses are archived before parsing so parser changes can be replayed against historical captures. `curl_cffi` replaces httpx for hosts that reject non-browser TLS fingerprints.

**Change monitoring.**
`APScheduler → feedparser + httpx → trafilatura extraction → content hash diff → PostgreSQL → notification`

Only the extracted main content is hashed, so navigation and advertising changes do not trigger false positives. Previous versions are retained to allow diffs to be shown. Conditional requests (`ETag`, `If-Modified-Since`) reduce load on the source.

---

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
| Astropy | Astronomy: units, coordinates, FITS, time scales. |

### Example designs

**Automated RF measurement rig.**
`pytest → PyVISA (signal generator, spectrum analyser) + pySerial (DUT control) → NumPy/SciPy metrics → Parquet + Matplotlib report`

Instrument drivers are wrapped behind a small interface per instrument type so the same test runs against different lab equipment. Test cases are pytest functions with parametrized frequency and power points, and limits are asserted rather than eyeballed. Every run writes raw captures alongside computed metrics (EVM, ACLR, spectral mask margin) so a failure can be re-analysed without repeating the measurement. scikit-rf handles de-embedding of cable and fixture losses from measured S-parameters.

**SDR receive chain.**
`SoapySDR or pyadi-iio capture → SciPy filter and decimate → NumPy demodulation → Numba timing recovery loop → Dear PyGui display`

Capture runs in its own thread writing IQ samples into a ring buffer; processing reads from it, so display stalls do not drop samples. Per-sample feedback loops (timing recovery, carrier tracking) cannot be vectorized and are compiled with Numba. A file-backed source implementing the same interface as the radio allows the whole chain to run against recorded IQ in tests.

**Monte Carlo parameter study.**
`Parameter grid → Ray or joblib workers → NumPy simulation → xarray results → Zarr → Seaborn summary`

Each worker returns an array plus its parameter coordinates; xarray assembles them into a labelled cube indexed by the swept variables. Results are written incrementally so a long sweep can be interrupted and resumed. Seeds are derived deterministically from the parameter index so any single run can be reproduced in isolation.

---

## Machine learning

| Library | Description |
|---|---|
| PyTorch 2.x | Dominant deep learning framework. `torch.compile` for graph capture and kernel fusion. |
| PyTorch Lightning | Training loop abstraction over PyTorch: checkpointing, distributed training, logging. |
| JAX | Composable transforms (`jit`, `grad`, `vmap`, `pmap`), XLA compilation, TPU support. |
| Flax, Optax | Neural network modules and optimizers for JAX. |
| Keras 3 | High-level API running on JAX, TensorFlow or PyTorch backends. |
| TensorFlow | Still used in existing deployments; less common for new work. |
| scikit-learn | Classical models, pipelines, cross-validation, metrics. |
| XGBoost, LightGBM, CatBoost | Gradient-boosted trees. Standard choice for tabular data. |
| Hugging Face `transformers` | Pretrained model implementations and training utilities. |
| `datasets`, `accelerate`, `peft`, `trl` | Dataset loading, distributed training, parameter-efficient fine-tuning, preference training. |
| timm | Image model architectures and pretrained weights. |
| OpenCV | Classical computer vision: filtering, features, calibration, tracking. |
| Ultralytics YOLO | Object detection and segmentation models with a training CLI. |
| Albumentations | Image augmentation pipelines. |
| ONNX, onnxruntime | Model interchange format and cross-platform inference runtime. |
| vLLM, SGLang | High-throughput LLM inference servers with paged attention and continuous batching. |
| Optuna, Ray Tune | Hyperparameter optimization. |
| MLflow, Weights & Biases | Experiment tracking, model registry, artifact storage. |
| SHAP | Feature attribution for model explanation. |
| BentoML | Model packaging and serving. |

### Example designs

**Tabular prediction service.**
`Feature table (DuckDB/Parquet) → scikit-learn pipeline + LightGBM → Optuna tuning → MLflow registry → ONNX export → FastAPI + onnxruntime`

The full preprocessing chain lives inside the scikit-learn pipeline object, so training and serving cannot diverge on feature handling. Cross-validation splits respect time ordering where the target is forward-looking. Exporting to ONNX removes the training dependencies from the serving image and gives predictable latency. Input distributions are logged at inference and compared against the training set to detect drift; SHAP values are computed for a sample of predictions for auditability.

**Vision training pipeline.**
`Object storage → PyTorch Dataset → Albumentations → timm backbone → Lightning + DDP across GPUs → W&B logging → TorchScript/ONNX export → BentoML service`

Lightning handles distributed setup, mixed precision, gradient accumulation and checkpointing, so the model code stays close to plain PyTorch. Augmentation is applied in dataloader workers; the input pipeline is profiled separately from the model to confirm the GPU is the bottleneck. Checkpoints and the exact dataset manifest are stored together so a run can be reproduced.

**Research codebase (JAX).**
`Config (Pydantic) → data on device → jit-compiled train step → Flax model + Optax optimizer → metrics to W&B`

The train step is a pure function of parameters and a batch, which makes it `jit`-compilable and testable. `vmap` replaces manual batching for per-example computations such as per-sample gradients. A small NumPy reference implementation of the core operation is kept in the test suite and checked against the JAX version to catch transform-related errors.

---

## Documents: PDF and Excel

### PDF reading and extraction

| Library | Description |
|---|---|
| pypdf | Pure-Python reading, merging, splitting, metadata, form fields. |
| pypdfium2 | PDFium bindings. Fast text extraction and page rendering to images. Apache/BSD licensed. |
| pdfplumber | Character-level positional data; used for tables without ruling lines. |
| Camelot | Table extraction, works best on tables with visible rules. |
| PyMuPDF | Fast extraction and rendering. Licensed AGPL, with a commercial licence available. |
| pymupdf4llm | Markdown output from PDFs for LLM ingestion. Inherits PyMuPDF's licence. |
| marker-pdf | Converts PDFs to markdown using layout models. |
| Docling | Document conversion to structured formats, with layout and table models. |
| unstructured | Multi-format document partitioning into typed elements. |
| pytesseract, RapidOCR, Surya | OCR for scanned documents. |

### Spreadsheets and Office formats

| Library | Description |
|---|---|
| openpyxl | Read and write `.xlsx`, including formulas, styles and charts. |
| XlsxWriter | Write-only, with full support for formatting, charts and conditional formats. |
| python-calamine | Rust-based fast reader for xlsx/xls/ods. Used as the `calamine` engine by pandas and Polars. |
| xlwings | Automates a running Excel instance; supports UDFs and macros on Windows and macOS. |
| python-docx, python-pptx | Read and write Word and PowerPoint files. |

### Example designs

**Structured extraction from supplier documents.**
`Ingest → pypdfium2 text-layer check → pdfplumber (digital) or RapidOCR (scanned) → field parsing → Pydantic validation → PostgreSQL`

The text-layer check routes each document down one of two paths, avoiding OCR on files that already contain text. Extraction returns a Pydantic model per document; validation failures are queued for manual review rather than written with null fields. A fixture corpus of real PDFs is committed with expected outputs, and the parser is tested against it, since layout changes from a single supplier are the usual cause of silent breakage. Page and bounding-box coordinates are stored with each field so extracted values can be traced back to their location.

**Document ingestion for retrieval.**
`Docling or pymupdf4llm → markdown with heading structure → structural chunking → embeddings → vector store`

Chunking follows the document's own headings and table boundaries rather than a fixed character count, which keeps tables and sections intact. Page numbers and section titles are carried as chunk metadata so answers can cite locations. Licensing is checked before selecting the converter, as PyMuPDF and pymupdf4llm are AGPL.

**Report generation.**
`Polars aggregation → XlsxWriter workbook (formatted sheets, charts, conditional formats) → distribution`

Data preparation is done entirely in the dataframe layer; the Excel library is used only for presentation on the final frame. A separate raw-data sheet backs each summary sheet so recipients can check the numbers. Where a financial model must stay live in Excel, xlwings updates named ranges in the existing workbook instead of regenerating it.

---

## Markets and financial data

### Data access

| Library | Description |
|---|---|
| yfinance | Unofficial client for Yahoo Finance endpoints. No stability guarantee. |
| Alpha Vantage, Finnhub, EODHD, Tiingo | Commercial market data APIs with Python clients; equities, FX, fundamentals. |
| Nasdaq Data Link | Aggregated economic and alternative datasets. |
| Polygon.io, Databento | Tick and trade-level market data, including historical order book. |
| Marketaux | News and sentiment API. |
| ccxt | Unified API across cryptocurrency exchanges, sync and async. |
| ib_async | Interactive Brokers TWS/Gateway API (successor to ib_insync). |
| OpenBB | Open-source aggregation layer over many data providers. |
| pandas-datareader | Readers for public economic sources such as FRED. |

### Analysis and backtesting

| Library | Description |
|---|---|
| TA-Lib | C library with Python bindings for technical indicators. |
| pandas-ta | Pure-Python indicator library over pandas. |
| VectorBT | Vectorized backtesting and portfolio simulation on NumPy arrays. |
| backtesting.py | Event-driven backtester with a small API. |
| NautilusTrader | Event-driven backtesting and live trading platform; Rust core. |
| Zipline-reloaded | Maintained fork of the Zipline backtester. |
| QuantLib-Python | Derivatives pricing, curve construction, term structures. |
| PyPortfolioOpt, Riskfolio-Lib | Portfolio optimization, risk models, efficient frontiers. |
| arch | GARCH and volatility models, bootstrap methods. |
| exchange_calendars, pandas_market_calendars | Trading sessions, holidays and market hours. |

### Example designs

**Research data store.**
`Vendor APIs → raw JSON archive → normalization → Parquet partitioned by date and symbol → DuckDB`

Raw payloads are archived before normalization so the historical record survives changes to the parsing code and vendor re-statements can be detected. Corporate actions and delistings are stored as separate tables and applied at query time, which keeps a point-in-time view available and avoids a universe consisting only of current index members. `exchange_calendars` aligns bars to real sessions, including half days. Each record carries both the event timestamp and the timestamp at which the data became available.

**Backtesting stack.**
`Parquet feature store → VectorBT parameter sweep → NautilusTrader event-driven validation → arch / PyPortfolioOpt for sizing`

The vectorized pass covers wide parameter grids cheaply; the shortlist is then re-run in an event-driven engine that models order types, fills, fees and latency, since vectorized results tend to be optimistic. Signals are computed only from data whose availability timestamp precedes the decision time. Volatility estimates from `arch` feed position sizing, and results are reported with transaction costs applied.

**Live execution service.**
`ib_async or ccxt (asyncio) → strategy state in Redis → pre-trade risk checks → order router → structlog audit log`

The strategy process is stateless with respect to restarts; positions and open orders are reconciled from the broker on startup rather than trusted from local state. Risk limits (max position, max order size, daily loss) are enforced in a layer the strategy cannot bypass. Every decision, order and fill is logged as a structured event with the inputs that produced it. The same strategy class runs against a simulated broker interface in tests.

---

## Automation

| Library | Description |
|---|---|
| APScheduler | In-process scheduling: cron, interval and date triggers, with job stores. |
| schedule | Minimal interval scheduling. |
| Temporal Python SDK | Durable, resumable workflow execution. |
| watchdog | Filesystem event monitoring. |
| Playwright, Selenium | Browser automation for form filling, downloads and testing. |
| PyAutoGUI | Screen-level mouse and keyboard control. |
| pywinauto | Windows desktop application automation via UI Automation. |
| Paramiko, Fabric | SSH connections and remote command execution. |
| Ansible | Agentless configuration management, written in Python. |
| boto3, google-cloud-*, azure-sdk | Cloud provider SDKs. |
| docker, kubernetes | Docker Engine API client and Kubernetes client. |
| Pulumi | Infrastructure as code using Python. |
| python-telegram-bot, discord.py, slack-sdk | Messaging platform clients and bot frameworks. |
| imap-tools, `smtplib` | Mailbox access and sending. |
| PyGithub, gitpython | GitHub API and local Git repository manipulation. |

### Example designs

**Scheduled reporting job.**
`APScheduler in a container → httpx data pull → Polars aggregation → XlsxWriter output → slack-sdk upload`

Each run writes a record with status, row counts and duration, and a missed run is itself an alert condition. Retries are bounded and idempotent, with output keyed by report date so a re-run overwrites rather than duplicates. Credentials come from the environment through `pydantic-settings`.

**Browser-based workflow automation.**
`Playwright persistent context → login → navigation and form submission → download capture → artifact storage`

Selectors are anchored on stable attributes (roles, labels, test IDs) rather than CSS paths, which reduces breakage on markup changes. Every step has an explicit wait condition instead of fixed sleeps. On failure, a screenshot and the page HTML are saved for diagnosis. Runs happen on a schedule in CI so the environment is reproducible.

**Infrastructure operations CLI.**
`Typer CLI → boto3 / kubernetes client / Paramiko → target systems`

Destructive commands default to a dry-run mode that prints the planned actions. Operations are grouped into subcommands per environment, and the environment is a required explicit argument rather than an implicit default. Longer procedures that must survive interruption are moved into Temporal workflows.

---

## Quick GUIs

| Library | Description |
|---|---|
| PySide6 | Official Qt 6 bindings. LGPL. Widgets, QML, charts, multimedia. |
| PyQt6 | Alternative Qt 6 bindings under GPL or a commercial licence. |
| tkinter | Stdlib GUI toolkit. |
| CustomTkinter | Themed widget set over tkinter. |
| Dear PyGui | Immediate-mode GPU-rendered GUI; built-in plotting, suited to live data. |
| Flet | Flutter-based UI, runs as desktop, web or mobile app. |
| NiceGUI | Browser-based UI defined in Python, built on Vue and FastAPI. |
| Streamlit | Script-driven data apps with automatic reruns. |
| Gradio | Interfaces for models and demos, with sharing support. |
| Textual | Terminal user interfaces with widgets, CSS-like styling and mouse support. |
| Kivy, Toga | Cross-platform toolkits including mobile targets. |
| PyInstaller, Nuitka, Briefcase | Packaging Python applications into executables or installers. |

### Example designs

**Live instrument dashboard.**
`Acquisition thread (PyVISA/pySerial) → NumPy ring buffer → Dear PyGui plots and controls`

Acquisition and rendering are decoupled by the buffer, so the UI frame rate does not affect sampling. The plot draws a decimated view of the buffer rather than every sample. Control changes are pushed to the acquisition thread through a queue rather than shared mutable state.

**Internal desktop application.**
`PySide6 widgets → QThread workers → local SQLite → PyInstaller build`

Long operations run in worker threads and communicate through signals, keeping the event loop responsive. Application state is persisted in SQLite so the tool survives restarts. Packaging with PyInstaller produces a single distributable for users without Python installed; Qt's LGPL licence applies to the bundled libraries.

**Shared internal tool.**
`NiceGUI or Streamlit → DuckDB/PostgreSQL queries → reverse proxy with authentication`

Serving over HTTP removes per-machine installation. Query results are cached with a TTL because these frameworks re-execute the script on interaction. Authentication is handled by the proxy rather than in application code.

---

## LLMs, agents and RAG

### Provider SDKs

| Library | Description |
|---|---|
| openai, anthropic, google-genai | First-party API clients. |
| LiteLLM | Unified interface and proxy across many providers. |
| Instructor, Outlines | Structured output: schema-constrained generation and validation. |

### Agent frameworks

| Framework | Description |
|---|---|
| PydanticAI | Type-safe agent framework from the Pydantic team. V2 released June 2026; the V2 harness is a breaking change from V1. |
| LangGraph | Graph-based orchestration with explicit state, checkpointing and human-in-the-loop steps. |
| LangChain | Model and tool abstraction layer; commonly used with LangGraph. |
| OpenAI Agents SDK | Agents, handoffs, guardrails and tracing. Provider-agnostic in practice, still on 0.x. |
| Claude Agent SDK | Anthropic's agent framework, including subagent spawning. |
| Google ADK | Google's agent development kit, integrated with Vertex AI. |
| Microsoft Agent Framework | Released 1.0 in April 2026, merging Semantic Kernel and AutoGen. Python and .NET. |
| CrewAI | Role-based multi-agent teams. |
| smolagents | Minimal agent library from Hugging Face; code-writing agents. |
| LlamaIndex Workflows | Event-driven orchestration; 1.0 released June 2026. |
| Haystack, Strands, Agno | Additional production-oriented agent and pipeline frameworks. |

### MCP

| Library | Description |
|---|---|
| `mcp` (Model Context Protocol Python SDK) | Official client and server implementation. |
| FastMCP | Higher-level server framework for building MCP tools. |

### Retrieval and vector stores

| Library | Description |
|---|---|
| LlamaIndex | Indexing, retrieval and query pipelines over documents. |
| pgvector | Vector column type and index for PostgreSQL; `pgvector-python` for SQLAlchemy integration. |
| Qdrant | Vector database with payload filtering; Rust. |
| Chroma | Embedded and client-server vector store. |
| LanceDB | Embedded vector store built on the Lance columnar format. |
| Weaviate, Milvus | Vector databases with hybrid search and scaling features. |
| FAISS | Similarity search library; in-process, no persistence layer. |
| sentence-transformers | Embedding and reranking model inference. |
| rank_bm25 | Lexical BM25 scoring, used for hybrid retrieval. |
| Langfuse, LangSmith, Logfire | Tracing and evaluation for LLM applications. |
| Ragas, DeepEval | Evaluation metrics for retrieval and generation quality. |

### Example designs

**Document question answering.**
`Docling ingestion → structural chunking → sentence-transformers embeddings → pgvector in existing PostgreSQL → hybrid retrieval (vector + rank_bm25) → reranker → generation with citations`

Storing vectors in the operational database removes a second system and keeps chunks transactionally consistent with their source documents. Hybrid retrieval covers cases where the query contains exact identifiers that embeddings handle poorly. A held-out set of question and expected-source pairs is run as pytest cases with Ragas metrics, so retrieval changes are measured rather than assessed by inspection. Langfuse traces record the retrieved chunks alongside the generated answer.

**Typed extraction service.**
`FastAPI endpoint → PydanticAI agent with an output model → LiteLLM provider routing → validated object`

The output schema is a Pydantic model, and validation failures trigger a bounded retry with the error fed back to the model. Requests carry a schema version so downstream consumers can handle changes. LiteLLM provides failover to a second provider. Prompt and model identifiers are logged with each response for reproducibility.

**Multi-step workflow agent.**
`LangGraph graph → tool nodes over MCP (FastMCP servers) → checkpointer in PostgreSQL → human approval node`

Graph state is persisted at each node, so a crashed or paused run resumes from the last checkpoint rather than restarting. Tools are exposed as MCP servers, which allows the same tool implementations to be used by other clients. Actions with side effects are placed behind an approval node that suspends the run until a decision is recorded. Per-node timeouts and retry policies are configured explicitly.
