---
title: "Linting and formatting"
blurb: "Ruff for linting and formatting, with an explicit rule set."
reviewed: 2026-09-06
part: "Practices"
---

[`ruff`](https://docs.astral.sh/ruff/) provides both a linter and a formatter in a single binary, implementing [rules](https://docs.astral.sh/ruff/rules/) from flake8 and its plugins, isort, pydocstyle, pyupgrade, bandit and others. The formatter is compatible with [Black](https://black.readthedocs.io/)'s style with [minor documented deviations](https://docs.astral.sh/ruff/formatter/#black-compatibility).

```toml
[tool.ruff]
line-length = 100

[tool.ruff.lint]
select = ["E", "F", "I", "N", "UP", "B", "SIM", "C4", "PTH", "S", "RUF"]

[tool.ruff.lint.per-file-ignores]
"tests/**/*.py" = ["S101"]   # assert is how pytest tests
```

`target-version` is left out: Ruff infers it from `requires-python`, so the minimum version is declared once.

Common rule sets: `E`/`F` (pycodestyle, Pyflakes), `I` (import sorting), `UP` (pyupgrade), `B` (bugbear), `SIM` (simplification), `PTH` (pathlib over `os.path`), `S` (security), `D` (docstrings), `ANN` (annotation coverage).

Two commands cover both roles:

```bash
uv run ruff check --fix
uv run ruff format
```
