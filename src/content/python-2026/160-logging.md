---
title: "Logging"
blurb: "Application-level configuration, structured fields, and library logging boundaries."
reviewed: 2026-09-06
part: "Practices"
---

| Library | Notes |
|---|---|
| [Loguru](https://loguru.readthedocs.io/) | Single-object API, simple setup. Configures global state, so it is generally avoided in libraries. |
| [structlog](https://www.structlog.org/) | Structured logging with processor chains; integrates with stdlib logging. |
| [`logging`](https://docs.python.org/3/library/logging.html) | Stdlib. Handlers, filters, hierarchical loggers, `dictConfig`. |
| [OpenTelemetry](https://opentelemetry.io/docs/languages/python/) | Traces, metrics and logs with context propagation across services; vendor-neutral exporters. |
| [Logfire](https://logfire.pydantic.dev/docs/) | Observability platform from the Pydantic team, built on OpenTelemetry. |

The stdlib [`logging`](https://docs.python.org/3/library/logging.html) module is configured once, at the application entry point, usually with [`dictConfig`](https://docs.python.org/3/library/logging.config.html#logging.config.dictConfig). Every module takes a logger named after itself; a library adds a [`NullHandler`](https://docs.python.org/3/howto/logging.html#configuring-logging-for-a-library) once, to its top-level logger, and leaves the rest of the configuration to the application.

```python
logger = logging.getLogger(__name__)                           # every module

logging.getLogger(__name__).addHandler(logging.NullHandler())  # library __init__.py only
```

Structured records are emitted as fields rather than formatted strings, which makes them queryable in log aggregation systems. With structlog:

```python
log = structlog.get_logger()
log.info("rows_processed", symbol=symbol, rows=n, duration_s=elapsed)
```

The stdlib takes the same fields through `extra={...}`, and only a formatter that serialises them, such as a JSON one, puts them in the output.

For services, traces are usually more informative than logs; log records carry the trace and span IDs so the two can be correlated.
