---
title: "Concurrency"
blurb: "Five models and what each is actually for, plus where free-threading stands."
part: "Practices"
---

| Model | Applies to |
|---|---|
| [`asyncio`](https://docs.python.org/3/library/asyncio.html) | I/O-bound work with many concurrent operations: HTTP clients, database drivers, message consumers. |
| [Threads](https://docs.python.org/3/library/threading.html) (GIL builds) | Blocking I/O and calls into C extensions that release the GIL. |
| Processes ([`multiprocessing`](https://docs.python.org/3/library/multiprocessing.html), [`ProcessPoolExecutor`](https://docs.python.org/3/library/concurrent.futures.html#processpoolexecutor)) | CPU-bound work; separate memory spaces, data passed by pickling. |
| Subinterpreters ([`concurrent.interpreters`](https://docs.python.org/3/library/concurrent.interpreters.html), [PEP 734](https://peps.python.org/pep-0734/), 3.14) | CPU-bound work with isolated state per interpreter and lower overhead than processes. |
| [Free-threaded build](https://docs.python.org/3/howto/free-threading-python.html) ([PEP 779](https://peps.python.org/pep-0779/), 3.14) | CPU-bound work in threads with shared memory. Requires extensions built for it; an incompatible extension re-enables the GIL. |

Structured concurrency in asyncio:

```python
async with asyncio.timeout(30):
    async with asyncio.TaskGroup() as tg:
        a = tg.create_task(fetch(url_a))
        b = tg.create_task(fetch(url_b))
```

[`TaskGroup`](https://docs.python.org/3/library/asyncio-task.html#task-groups) cancels remaining tasks when one fails and does not exit until all have finished, which [`asyncio.gather`](https://docs.python.org/3/library/asyncio-task.html#asyncio.gather) does not guarantee. [`asyncio.to_thread`](https://docs.python.org/3/library/asyncio-task.html#asyncio.to_thread) offloads blocking calls. [`anyio`](https://anyio.readthedocs.io/) provides an alternative API that runs on both asyncio and [Trio](https://trio.readthedocs.io/), and is used by libraries that must not assume a runtime.

Free-threading status: the build is officially supported from 3.14 and single-threaded overhead has fallen substantially compared with 3.13, but wheel availability across the ecosystem is still incomplete. [PEP 803](https://peps.python.org/pep-0803/) in 3.15 introduces `abi3t`, a stable ABI allowing one extension wheel to serve multiple free-threaded versions.
