---
title: "Concurrency"
blurb: "Concurrency models, their use cases, and free-threading status."
reviewed: 2026-09-06
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

Free-threading status: the build is officially supported from 3.14, and PEP 779 puts its single-threaded overhead at around 10% against the GIL build on the pyperformance suite, or about 3% on macOS. Wheel availability across the ecosystem is still incomplete. [PEP 803](https://peps.python.org/pep-0803/) in 3.15 introduces `abi3t`, a stable ABI allowing one extension wheel to serve multiple free-threaded versions.

An extension that was not built for free-threading re-enables the GIL when it is imported. [`PYTHON_GIL=0`](https://docs.python.org/3/using/cmdline.html#envvar-PYTHON_GIL), or `-X gil=0`, overrides that and keeps the GIL off, which runs the extension under exactly the conditions it declared it could not handle. The failures are data races inside C code, so they arrive as wrong results or a crash rather than an exception.

Subinterpreters carry the constraint from the other side. An extension must use multi-phase initialisation ([PEP 489](https://peps.python.org/pep-0489/)) and keep its state out of C globals to be imported into a second interpreter. NumPy implements the first and not the second, and [raises `ImportError`](https://github.com/numpy/numpy/issues/24755) in a subinterpreter, which rules out most of the compiled scientific stack. Ecosystem support is the fact that decides whether the model is usable at all, and it is currently minimal.

## References

* [PEP 489 – Multi-phase extension module initialization](https://peps.python.org/pep-0489/) — Final, 3.5. The requirement an extension has to meet before a second interpreter can import it.
* [PEP 734 – Multiple Interpreters in the Stdlib](https://peps.python.org/pep-0734/) — Final, 3.14.
* [PEP 779 – Criteria for supported status for free-threaded Python](https://peps.python.org/pep-0779/) — Final, 3.14.
* [PEP 803 – "abi3t": Stable ABI for Free-Threaded Builds](https://peps.python.org/pep-0803/) — Final, 3.15.
