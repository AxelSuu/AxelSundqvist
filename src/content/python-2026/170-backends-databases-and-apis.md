---
title: "Backends, databases and APIs"
blurb: "Frameworks, drivers and queues, with a multi-tenant API and a webhook ingester."
part: "Domains"
---

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
