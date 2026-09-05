---
title: "Concurrency"
blurb: "Five models and what each is actually for, plus where free-threading stands."
part: "Practices"
---

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
