---
title: "Markets and financial data"
blurb: "Vendors and backtesting, and the timestamps without which no result can be trusted."
part: "Domains"
---

| Library | Description |
|---|---|
| [yfinance](https://ranaroussi.github.io/yfinance/) | Unofficial client for Yahoo Finance endpoints. No stability guarantee. |
| [Alpha Vantage](https://www.alphavantage.co/documentation/), [Finnhub](https://finnhub.io/docs/api), [EODHD](https://eodhd.com/financial-apis/), [Tiingo](https://www.tiingo.com/documentation/general/overview) | Commercial market data APIs; equities, FX, fundamentals. |
| [Polygon.io](https://polygon.io/docs), [Databento](https://databento.com/docs) | Tick and trade-level market data, including historical order book. |
| [ccxt](https://docs.ccxt.com/) | Unified API across cryptocurrency exchanges, sync and async. |
| [ib_async](https://ib-api-reloaded.github.io/ib_async/) | Interactive Brokers TWS/Gateway API (successor to ib_insync). |
| [OpenBB](https://docs.openbb.co/) | Open-source aggregation layer over many data providers. |
| [TA-Lib](https://ta-lib.github.io/ta-lib-python/), [pandas-ta](https://pypi.org/project/pandas-ta/) | Technical indicators; C bindings and pure-Python respectively. |
| [VectorBT](https://vectorbt.dev/) | Vectorized backtesting and portfolio simulation on NumPy arrays. |
| [NautilusTrader](https://nautilustrader.io/docs/) | Event-driven backtesting and live trading platform; Rust core. |
| [backtesting.py](https://kernc.github.io/backtesting.py/) | Event-driven backtester with a small API. |
| [QuantLib-Python](https://quantlib-python-docs.readthedocs.io/) | Derivatives pricing, curve construction, term structures. |
| [PyPortfolioOpt](https://pyportfolioopt.readthedocs.io/), [Riskfolio-Lib](https://riskfolio-lib.readthedocs.io/) | Portfolio optimization, risk models, efficient frontiers. |
| [arch](https://bashtage.github.io/arch/) | GARCH and volatility models, bootstrap methods. |
| [exchange_calendars](https://github.com/gerrymanoim/exchange_calendars) | Trading sessions, holidays and market hours. |

**Research data store.**
`Vendor APIs → raw JSON archive → normalization → Parquet partitioned by date and symbol → DuckDB`

Raw payloads are archived before normalization so the historical record survives changes to the parsing code and vendor re-statements can be detected. Corporate actions and delistings are stored as separate tables and applied at query time, which keeps a point-in-time view available and avoids a universe consisting only of current index members. `exchange_calendars` aligns bars to real sessions, including half days. Each record carries both the event timestamp and the timestamp at which the data became available; without the second one, no backtest built on the store can be trusted.

**Backtesting stack.**
`Parquet feature store → VectorBT parameter sweep → NautilusTrader event-driven validation → arch / PyPortfolioOpt for sizing`

The vectorized pass covers wide parameter grids cheaply; the shortlist is then re-run in an event-driven engine that models order types, fills, fees and latency, since vectorized results tend to be optimistic. Signals are computed only from data whose availability timestamp precedes the decision time. Volatility estimates from `arch` feed position sizing, and results are reported with transaction costs applied.
