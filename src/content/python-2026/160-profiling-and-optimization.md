---
title: "Profiling and optimization"
blurb: "The tools, and the order of work that makes them unnecessary."
part: "Practices"
---

| Tool | Use |
|---|---|
| [`cProfile`](https://docs.python.org/3/library/profile.html) + [snakeviz](https://jiffyclub.github.io/snakeviz/) | Stdlib deterministic profiler with a flame graph viewer. |
| [py-spy](https://github.com/benfred/py-spy) | Sampling profiler that attaches to a running process without restarting it. |
| [Scalene](https://github.com/plasma-umass/scalene) | Separates CPU, GPU and memory, and Python time from native time. |
| [memray](https://bloomberg.github.io/memray/) | Allocation tracking, including native allocations, with flame graphs. |
| [`timeit`](https://docs.python.org/3/library/timeit.html), [pytest-benchmark](https://pytest-benchmark.readthedocs.io/) | Microbenchmarks and regression thresholds. |
| [Numba](https://numba.pydata.org/) | JIT compilation of numeric functions that cannot be vectorized. |
| [Cython](https://cython.readthedocs.io/) | Compiles annotated Python to C extensions. |
| [PyO3](https://pyo3.rs/) + [maturin](https://www.maturin.rs/), [`cffi`](https://cffi.readthedocs.io/), [`ctypes`](https://docs.python.org/3/library/ctypes.html) | Native extension modules and bindings to existing libraries. |

Order of work in most cases: reduce the number of operations (caching, algorithmic change, fewer queries), express bulk work as array or SQL operations, then compile the remaining hot function. Compiling first is the common mistake; it makes an unnecessary operation faster instead of removing it.
