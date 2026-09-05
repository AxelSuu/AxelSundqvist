---
title: "Continuous integration"
blurb: "A working pipeline, and the six things usually left out of one."
part: "Practices"
---

```yaml
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<sha>
      - uses: astral-sh/setup-uv@<sha>
        with: { enable-cache: true }
      - run: uv sync --locked
      - run: uv run ruff check --output-format=github
      - run: uv run ruff format --check
      - run: uv run pyright
      - run: uv run pytest --cov --cov-report=xml
```

Points that are frequently omitted:

* `uv sync --locked` fails when the lockfile does not match `pyproject.toml`, catching manual edits.
* The version matrix should list exactly the versions declared in `requires-python`.
* `pre-commit` is used locally for formatting and quick checks; enforcement belongs in CI, since hooks can be bypassed.
* Actions pinned to commit SHAs rather than tags, since tags are mutable.
* PyPI trusted publishing (OIDC) removes long-lived API tokens from CI secrets.
* Dependabot or Renovate for dependency and action updates.
