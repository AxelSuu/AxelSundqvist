---
title: "Python versions"
blurb: "Which versions are supported, which to start on, and what changed from 3.11 to 3.15."
reviewed: 2026-09-22
part: "Practices"
---

Support status on 22 September 2026, from the [release status page](https://devguide.python.org/versions/):

| Version | Status | End of life |
|---|---|---|
| 3.10 | Security fixes only | October 2026 |
| 3.11 | Security fixes only | October 2027 |
| 3.12 | Security fixes only | October 2028 |
| 3.13 | Bug fixes | October 2029 |
| 3.14 | Bug fixes | October 2030 |
| 3.15 | Release candidate; final scheduled for 1 October 2026 ([PEP 790](https://peps.python.org/pep-0790/)) | October 2031 |

A new application starts on the newest release that receives bug fixes, 3.14 today, and moves to 3.15 once its compiled dependencies publish wheels for it. A library supports the window [SPEC 0](https://scientific-python.org/specs/spec-0000/) sets, and its `requires-python` floor follows from that.

Changes that matter when choosing or upgrading:

| Version | Change |
|---|---|
| [3.11](https://docs.python.org/3/whatsnew/3.11.html) | `TaskGroup`, `asyncio.timeout`, exception groups and `except*`, `tomllib`; 25% faster than 3.10 on the pyperformance suite by the release's own measurement, and 10-60% depending on the workload. |
| [3.12](https://docs.python.org/3/whatsnew/3.12.html) | New type parameter syntax (`def f[T]()`), `@override`, f-strings that can reuse their own quotes and span lines ([PEP 701](https://peps.python.org/pep-0701/)), per-interpreter GIL groundwork; `distutils` removed ([PEP 632](https://peps.python.org/pep-0632/)). |
| [3.13](https://docs.python.org/3/whatsnew/3.13.html) | Experimental free-threaded build, new REPL, JIT groundwork; the "dead batteries" deprecated in 3.11 (`cgi`, `crypt`, `telnetlib` and others) removed ([PEP 594](https://peps.python.org/pep-0594/)). |
| [3.14](https://docs.python.org/3/whatsnew/3.14.html) | Free-threaded build officially supported ([PEP 779](https://peps.python.org/pep-0779/)); deferred evaluation of annotations ([PEP 649](https://peps.python.org/pep-0649/)); template strings, `t"..."` ([PEP 750](https://peps.python.org/pep-0750/)); `compression.zstd` ([PEP 784](https://peps.python.org/pep-0784/)); `concurrent.interpreters` for subinterpreters ([PEP 734](https://peps.python.org/pep-0734/)); colour output in `argparse` and tracebacks. |
| [3.15](https://docs.python.org/3.15/whatsnew/3.15.html) | Explicit lazy imports, `lazy import json` ([PEP 810](https://peps.python.org/pep-0810/)); `frozendict` ([PEP 814](https://peps.python.org/pep-0814/)) and `sentinel` ([PEP 661](https://peps.python.org/pep-0661/)) built-ins; UTF-8 mode on by default ([PEP 686](https://peps.python.org/pep-0686/)); a `profiling` package whose sampling profiler attaches to a running process ([PEP 799](https://peps.python.org/pep-0799/)); `abi3t`, a stable ABI for free-threaded builds ([PEP 803](https://peps.python.org/pep-0803/)), allowing one C extension wheel across free-threaded releases. |

## References

* [PEP 594: Removing dead batteries from the standard library](https://peps.python.org/pep-0594/). Final; the removals landed in 3.13.
* [PEP 632: Deprecate distutils module](https://peps.python.org/pep-0632/). Final; removed in 3.12.
* [PEP 649: Deferred Evaluation Of Annotations Using Descriptors](https://peps.python.org/pep-0649/). Final, 3.14.
* [PEP 661: Sentinel Values](https://peps.python.org/pep-0661/). Final, 3.15.
* [PEP 686: Make UTF-8 mode default](https://peps.python.org/pep-0686/). Final, 3.15.
* [PEP 701: Syntactic formalization of f-strings](https://peps.python.org/pep-0701/). Final, 3.12.
* [PEP 734: Multiple Interpreters in the Stdlib](https://peps.python.org/pep-0734/). Final, 3.14.
* [PEP 750: Template Strings](https://peps.python.org/pep-0750/). Final, 3.14.
* [PEP 779: Criteria for supported status for free-threaded Python](https://peps.python.org/pep-0779/). Final, 3.14.
* [PEP 784: Adding Zstandard to the standard library](https://peps.python.org/pep-0784/). Final, 3.14.
* [PEP 790: Python 3.15 Release Schedule](https://peps.python.org/pep-0790/). The date in the status table.
* [PEP 799: A dedicated profiling package for organizing Python profiling tools](https://peps.python.org/pep-0799/). Final, 3.15.
* [PEP 803: "abi3t": Stable ABI for Free-Threaded Builds](https://peps.python.org/pep-0803/). Final, 3.15.
* [PEP 810: Explicit lazy imports](https://peps.python.org/pep-0810/). Final, 3.15.
* [PEP 814: Add frozendict built-in type](https://peps.python.org/pep-0814/). Final, 3.15.
* [Status of Python versions](https://devguide.python.org/versions/). The support and end-of-life dates.
