---
title: "Data science"
blurb: "The array and dataframe stack, with a reproducible analysis repository and sensor time series."
part: "Domains"
---

| Library | Description |
|---|---|
| NumPy 2.x | N-dimensional arrays and vectorized operations. Foundation for most of the stack. |
| SciPy | Optimization, integration, interpolation, linear algebra, statistics, signal processing. |
| pandas 3.0 | Labelled tabular data. See notes above on copy-on-write and string dtype. |
| Polars | Alternative dataframe library; expression API, faster on large frames. |
| statsmodels | Statistical models, hypothesis tests, time series (ARIMA, state space). |
| scikit-learn | Classical machine learning, preprocessing, model selection, pipelines. |
| marimo | Reactive notebook stored as a plain `.py` file; runs as a script or an app. |
| Matplotlib / Seaborn | Base plotting and statistical plots over it; publication output. |
| Altair | Declarative charts based on the Vega-Lite grammar. |
| Bokeh, HoloViews / hvPlot | Interactive plotting for larger datasets and dashboards. |
| Pint | Physical units attached to arrays and scalars. |

**Reproducible analysis repository.**
`uv project → marimo notebooks (.py) → Polars transforms → statsmodels → Altair charts → Parquet outputs`

Because marimo notebooks are plain Python files, they diff and merge in git and can be imported by tests or run headless in CI. Data loading is separated into an importable module so the same code runs in the notebook and in the scheduled job. Outputs are written to a versioned directory rather than being read off the screen. The lockfile pins the environment the numbers were produced in — which is the only thing that makes a published figure reproducible a year later.

**Sensor time series exploration.**
`Zarr or Parquet store → xarray → SciPy filtering and resampling → hvPlot`

xarray keeps coordinates (time, channel, run ID) attached through the pipeline, so slicing by condition does not depend on positional indexing. Chunked reads through Zarr allow working with recordings larger than memory. Interactive plots with datashader-backed rendering handle multi-million-point traces.
