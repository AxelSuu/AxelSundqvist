---
title: "Python versions"
blurb: "What each release from 3.11 to 3.15 added, one line apiece."
part: "Practices"
---

Relevant changes in recent versions:

| Version | Change |
|---|---|
| [3.11](https://docs.python.org/3/whatsnew/3.11.html) | `TaskGroup`, `asyncio.timeout`, exception groups and `except*`, `tomllib`; 25% faster than 3.10 on the pyperformance suite by the release's own measurement, and 10-60% depending on the workload. |
| [3.12](https://docs.python.org/3/whatsnew/3.12.html) | New type parameter syntax (`def f[T]()`), `@override`, per-interpreter GIL groundwork. |
| [3.13](https://docs.python.org/3/whatsnew/3.13.html) | Experimental free-threaded build, new REPL, JIT groundwork. |
| [3.14](https://docs.python.org/3/whatsnew/3.14.html) | Free-threaded build officially supported ([PEP 779](https://peps.python.org/pep-0779/)); deferred evaluation of annotations ([PEP 649](https://peps.python.org/pep-0649/)); `concurrent.interpreters` for subinterpreters ([PEP 734](https://peps.python.org/pep-0734/)); colour output in `argparse` and tracebacks. |
| [3.15](https://docs.python.org/3.15/whatsnew/3.15.html) (Oct 2026) | `abi3t`, a stable ABI for free-threaded builds ([PEP 803](https://peps.python.org/pep-0803/)), allowing one C extension wheel across free-threaded releases. |
