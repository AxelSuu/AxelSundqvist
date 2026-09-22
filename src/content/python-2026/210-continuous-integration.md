---
title: "Continuous integration"
blurb: "A CI pipeline, and the checks and hardening it most often lacks."
reviewed: 2026-09-06
part: "Practices"
---

```yaml
permissions:
  contents: read

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@<sha>
        with: { persist-credentials: false }
      - uses: astral-sh/setup-uv@<sha>
      - run: uv sync --locked
      - run: uv run ruff check --output-format=github
      - run: uv run ruff format --check
      - run: uv run pyright
      - run: uv run pytest --cov --cov-report=xml
```

Points that are frequently omitted:

* `uv sync --locked` fails when the lockfile does not match `pyproject.toml`, catching manual edits. `setup-uv` caches by default on GitHub-hosted runners.
* An application tests the one version its `.python-version` names. A library runs the job over a matrix of every minor version from its `requires-python` floor up, passing each to `setup-uv` as `python-version`.
* [`permissions`](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/controlling-permissions-for-github_token) set at the top limits the workflow's `GITHUB_TOKEN`; once any permission is listed, every unlisted one is `none`, and a job that needs to write asks for that by name. `persist-credentials: false` stops `checkout` leaving the token in `.git/config` for every later step.
* [`pre-commit`](https://pre-commit.com/) is used locally for formatting and quick checks; enforcement belongs in CI, since hooks can be bypassed.
* Actions pinned to commit SHAs rather than tags, since [tags are mutable](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions#using-third-party-actions).
* PyPI [trusted publishing](https://docs.pypi.org/trusted-publishers/) (OIDC) removes long-lived API tokens from CI secrets.
* [Dependabot](https://docs.github.com/en/code-security/dependabot) or [Renovate](https://docs.renovatebot.com/) for dependency and action updates.
* [zizmor](https://docs.zizmor.sh/) audits the workflow files themselves, for unpinned actions, template injection from untrusted input, over-broad permissions and persisted credentials.
