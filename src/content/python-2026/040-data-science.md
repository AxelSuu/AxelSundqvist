---
title: "Data science"
blurb: "The array and dataframe stack, with a reproducible analysis repository and sensor time series."
part: "Domains"
---

| Library | Description |
|---|---|
| [NumPy 2.x](https://numpy.org/doc/stable/) | N-dimensional arrays and vectorized operations. Foundation for most of the stack. |
| [SciPy](https://docs.scipy.org/doc/scipy/) | Optimization, integration, interpolation, linear algebra, statistics, signal processing. |
| [pandas 3.0](https://pandas.pydata.org/docs/) | Labelled tabular data. Copy-on-write and the PyArrow-backed string dtype are covered under [data engineering](/python-2026/data-engineering). |
| [Polars](https://docs.pola.rs/) | Alternative dataframe library; an expression API over a multithreaded Rust engine, with a lazy mode that plans the whole query before executing it. |
| [statsmodels](https://www.statsmodels.org/) | Statistical models, hypothesis tests, time series (ARIMA, state space). |
| [scikit-learn](https://scikit-learn.org/stable/) | Classical machine learning, preprocessing, model selection, pipelines. |
| [marimo](https://docs.marimo.io/) | Reactive notebook stored as a plain `.py` file; runs as a script or an app. |
| [Matplotlib](https://matplotlib.org/stable/) / [Seaborn](https://seaborn.pydata.org/) | Base plotting and statistical plots over it; publication output. |
| [Altair](https://altair-viz.github.io/) | Declarative charts based on the [Vega-Lite](https://vega.github.io/vega-lite/) grammar. |
| [Bokeh](https://docs.bokeh.org/), [HoloViews](https://holoviews.org/) / [hvPlot](https://hvplot.holoviz.org/) | Interactive plotting for larger datasets and dashboards. |
| [Pint](https://pint.readthedocs.io/) | Physical units attached to arrays and scalars. |

**Reproducible analysis repository.**
`uv project → marimo notebooks (.py) → Polars transforms → statsmodels → Altair charts → Parquet outputs`

Because marimo notebooks are plain Python files, they diff and merge in git and can be imported by tests or run headless in CI. Data loading is separated into an importable module so the same code runs in the notebook and in the scheduled job. Outputs are written to a versioned directory rather than being read off the screen. The lockfile pins the environment the numbers were produced in — which is the only thing that makes a published figure reproducible a year later.

**Sensor time series exploration.**
`Zarr or Parquet store → xarray → SciPy filtering and resampling → hvPlot`

[xarray](https://docs.xarray.dev/) keeps coordinates (time, channel, run ID) attached through the pipeline, so slicing by condition does not depend on positional indexing. Chunked reads through [Zarr](https://zarr.readthedocs.io/) allow working with recordings larger than memory. Interactive plots with [datashader](https://datashader.org/)-backed rendering handle multi-million-point traces.
