---
title: "Errors"
blurb: "Exception groups, and the conventions that keep a package’s errors its own."
part: "Practices"
---

[Exception groups](https://docs.python.org/3/library/exceptions.html#ExceptionGroup) ([PEP 654](https://peps.python.org/pep-0654/), 3.11) allow multiple exceptions to be raised together and handled selectively. [`TaskGroup`](https://docs.python.org/3/library/asyncio-task.html#task-groups) uses them when several concurrent tasks fail.

```python
try:
    async with asyncio.TaskGroup() as tg:
        tg.create_task(fetch(a))
        tg.create_task(fetch(b))
except* TimeoutError as eg:
    ...
except* ValueError as eg:
    ...
```

Conventions in common use:

* One base exception class per package, with specific subclasses beneath it, so callers catch package-level errors rather than the errors of transitive dependencies.
* Wrap third-party exceptions at the boundary where they are raised, preserving the original with [`raise ... from err`](https://docs.python.org/3/tutorial/errors.html#exception-chaining).
* [`contextlib.suppress(SpecificError)`](https://docs.python.org/3/library/contextlib.html#contextlib.suppress) for intentional ignores, rather than a bare `except: pass`, which also swallows `KeyboardInterrupt` and `SystemExit`.
* [`add_note()`](https://docs.python.org/3/library/exceptions.html#BaseException.add_note) (3.11) to attach context to an exception without wrapping it.
