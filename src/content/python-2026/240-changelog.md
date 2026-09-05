---
title: "Changelog"
blurb: "What changed at each review, and when."
reviewed: 2026-09-06
part: "Maintenance"
---

A page carries the date it was last checked against its sources. That date means nothing without a record of what the check found, so every correction is logged here rather than made silently.

**6 September 2026**

* Every tool and PEP in the series now links to its documentation, and a link checker runs over the set. Four canonical URLs had moved: Uvicorn to `uvicorn.dev`, Starlette to `starlette.dev`, msgspec to `msgspec.dev`, and pandas-ta, whose GitHub repository no longer exists, now points at PyPI.
* Domains became Part I and practices Part II. Every slug is unchanged, so no URL moved.
* Removed the comparatives that had no source behind them (uv against pip, mypy's speed, setuptools' compatibility, asyncpg's throughput, PyTorch's dominance) and replaced each with the mechanism that causes it, or with a figure carrying its measurement.
* Concurrency: added the free-threading overhead measurement from PEP 779, `PYTHON_GIL=0` and what overriding the GIL re-enablement risks, and the extension constraint that decides whether subinterpreters are usable.
* Type checking: the migration section is a procedure rather than a sentence. SQLAlchemy's mypy plugin has been deprecated since 2.0 and no longer appears as an example of the plugin API.
* Scientific computing: added the array API standard and `array-api-compat`; `scipy.signal.stft`, `istft` and `spectrogram` are marked legacy in SciPy's own reference, with `ShortTimeFFT` (1.12) the current interface; FFTW's GPL is now stated on the pyFFTW row.
* Python 3.11's speedup is quoted as the release measured it rather than called significant.
* Corrected: LlamaIndex Workflows 1.0 was released in June 2025, not June 2026, and the package has been on 2.x since August 2025.
* Checked and unchanged: pandas 3.0 on 21 January 2026, pyrefly 1.0 in May 2026, PydanticAI V2 on 23 June 2026, the Astral acquisition announced 19 March 2026. The pyrefly row now points at the configuration PyTorch and JAX carry in-tree rather than asserting adoption.
* Python 3.15's final is scheduled for 1 October 2026 by PEP 790, which the version table now says rather than "Oct 2026".
