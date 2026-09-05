---
title: "Testing"
blurb: "Fixtures, parametrization, property-based tests, and why mocking a driver tests the mock."
part: "Practices"
---

| Library | Use |
|---|---|
| [pytest](https://docs.pytest.org/) | Test framework: fixtures, parametrization, plugins, assertion rewriting. |
| [pytest-cov](https://pytest-cov.readthedocs.io/) / [coverage](https://coverage.readthedocs.io/) | Coverage measurement and reporting, including branch coverage. |
| [Hypothesis](https://hypothesis.readthedocs.io/) | Property-based testing; generates inputs and shrinks failing cases to a minimal example. |
| [pytest-asyncio](https://pytest-asyncio.readthedocs.io/) / [anyio pytest plugin](https://anyio.readthedocs.io/en/stable/testing.html) | Async test support. |
| [Testcontainers](https://testcontainers-python.readthedocs.io/) | Runs real service dependencies in containers for integration tests. |
| [syrupy](https://github.com/syrupy-project/syrupy) | Snapshot testing for structured or generated output. |
| [time-machine](https://github.com/adamchainz/time-machine), [freezegun](https://github.com/spulec/freezegun) | Deterministic control of the current time. |
| [pytest-benchmark](https://pytest-benchmark.readthedocs.io/) | Timing and regression detection for performance-sensitive functions. |
| [respx](https://lundberg.github.io/respx/), [responses](https://github.com/getsentry/responses), [`httpx.MockTransport`](https://www.python-httpx.org/advanced/transports/#mock-transports) | HTTP-level mocking without patching internals. |

Common practices:

* Parametrize instead of looping inside a test, so each case is reported individually.
* Use `tmp_path` and other [builtin fixtures](https://docs.pytest.org/en/stable/reference/fixtures.html) rather than writing to fixed paths.
* Property-based tests for round trips and invariants: encode/decode, serialize/parse, transform/inverse, sums that must be preserved.

```python
@given(st.lists(st.integers()))
def test_sort_is_a_permutation(xs):
    assert sorted(sorted(xs)) == sorted(xs)
    assert Counter(sorted(xs)) == Counter(xs)
```

* Test against real dependencies where feasible; mocking an ORM or driver tests the mock rather than the query.
* Coverage is a threshold, not an objective; branch coverage is more informative than line coverage.
