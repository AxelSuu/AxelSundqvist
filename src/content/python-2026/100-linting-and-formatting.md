---
title: "Linting and formatting"
blurb: "One binary for both roles, and a rule set wider than the default."
reviewed: 2026-09-06
part: "Practices"
---

[`ruff`](https://docs.astral.sh/ruff/) provides both a linter and a formatter in a single binary, implementing [rules](https://docs.astral.sh/ruff/rules/) from flake8 and its plugins, isort, pydocstyle, pyupgrade, bandit and others. The formatter is compatible with [Black](https://black.readthedocs.io/)'s style with [minor documented deviations](https://docs.astral.sh/ruff/formatter/#black-compatibility).

```toml
[tool.ruff]
line-length = 100
target-version = "py314"

[tool.ruff.lint]
select = ["E", "F", "I", "N", "UP", "B", "SIM", "C4", "PTH", "RUF"]
ignore = []

[tool.ruff.lint.per-file-ignores]
"tests/*" = ["S101"]
```

Common rule sets: `E`/`F` (pycodestyle, Pyflakes), `I` (import sorting), `UP` (pyupgrade), `B` (bugbear), `SIM` (simplification), `PTH` (pathlib over `os.path`), `S` (security), `D` (docstrings), `ANN` (annotation coverage).

Two commands cover both roles:

```bash
uv run ruff check --fix
uv run ruff format
```
