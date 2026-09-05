---
title: "Python versions"
blurb: "Info about different Python versions."
part: "Practices"
---

Relevant changes in recent versions:

| Version | Change |
|---|---|
| 3.11 | `TaskGroup`, `asyncio.timeout`, exception groups and `except*`, `tomllib`, significant interpreter speedups. |
| 3.12 | New type parameter syntax (`def f[T]()`), `@override`, per-interpreter GIL groundwork. |
| 3.13 | Experimental free-threaded build, new REPL, JIT groundwork. |
| 3.14 | Free-threaded build officially supported (PEP 779); deferred evaluation of annotations (PEP 649); `concurrent.interpreters` for subinterpreters (PEP 734); colour output in `argparse` and tracebacks. |
| 3.15 (Oct 2026) | `abi3t`, a stable ABI for free-threaded builds (PEP 803), allowing one C extension wheel across free-threaded releases. |
