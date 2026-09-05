---
title: "Logging"
blurb: "Configured once at the entry point, structured as fields, and never from inside a library."
part: "Practices"
---

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
