---
title: "Logging"
blurb: "Application-level configuration, structured fields, and library logging boundaries."
reviewed: 2026-09-06
part: "Practices"
---

The stdlib [`logging`](https://docs.python.org/3/library/logging.html) module is configured once, at the application entry point, usually with [`dictConfig`](https://docs.python.org/3/library/logging.config.html#logging.config.dictConfig). Libraries obtain a module-level logger and add a `NullHandler`, leaving configuration to the application.

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
| [`logging`](https://docs.python.org/3/library/logging.html) | Stdlib. Handlers, filters, hierarchical loggers, `dictConfig`. |
| [structlog](https://www.structlog.org/) | Structured logging with processor chains; integrates with stdlib logging. |
| [Loguru](https://loguru.readthedocs.io/) | Single-object API, simple setup. Configures global state, so it is generally avoided in libraries. |
| [OpenTelemetry](https://opentelemetry.io/docs/languages/python/) | Traces, metrics and logs with context propagation across services; vendor-neutral exporters. |
| [Logfire](https://logfire.pydantic.dev/docs/) | Observability platform from the Pydantic team, built on OpenTelemetry. |

For services, traces are usually more informative than logs; log records carry the trace and span IDs so the two can be correlated.
