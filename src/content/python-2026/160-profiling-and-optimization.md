---
title: "Profiling and optimization"
blurb: "The tools, and the order of work that makes them unnecessary."
part: "Practices"
---

| Tool | Use |
|---|---|
| `cProfile` + snakeviz | Stdlib deterministic profiler with a flame graph viewer. |
| py-spy | Sampling profiler that attaches to a running process without restarting it. |
| Scalene | Separates CPU, GPU and memory, and Python time from native time. |
| memray | Allocation tracking, including native allocations, with flame graphs. |
| `timeit`, pytest-benchmark | Microbenchmarks and regression thresholds. |
| Numba | JIT compilation of numeric functions that cannot be vectorized. |
| Cython | Compiles annotated Python to C extensions. |
| PyO3 + maturin, `cffi`, `ctypes` | Native extension modules and bindings to existing libraries. |

Order of work in most cases: reduce the number of operations (caching, algorithmic change, fewer queries), express bulk work as array or SQL operations, then compile the remaining hot function. Compiling first is the common mistake; it makes an unnecessary operation faster instead of removing it.
