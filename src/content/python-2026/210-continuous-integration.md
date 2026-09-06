---
title: "Continuous integration"
blurb: "A CI pipeline and six checks to include."
reviewed: 2026-09-06
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
* [`pre-commit`](https://pre-commit.com/) is used locally for formatting and quick checks; enforcement belongs in CI, since hooks can be bypassed.
* Actions pinned to commit SHAs rather than tags, since [tags are mutable](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions#using-third-party-actions).
* PyPI [trusted publishing](https://docs.pypi.org/trusted-publishers/) (OIDC) removes long-lived API tokens from CI secrets.
* [Dependabot](https://docs.github.com/en/code-security/dependabot) or [Renovate](https://docs.renovatebot.com/) for dependency and action updates.
