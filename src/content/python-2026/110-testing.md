---
title: "Testing"
blurb: "Fixtures, parametrization, property-based tests, and why mocking a driver tests the mock."
part: "Practices"
---

| Library | Use |
|---|---|
| pytest | Test framework: fixtures, parametrization, plugins, assertion rewriting. |
| pytest-cov / coverage | Coverage measurement and reporting, including branch coverage. |
| Hypothesis | Property-based testing; generates inputs and shrinks failing cases to a minimal example. |
| pytest-asyncio / anyio pytest plugin | Async test support. |
| Testcontainers | Runs real service dependencies in containers for integration tests. |
| syrupy | Snapshot testing for structured or generated output. |
| time-machine, freezegun | Deterministic control of the current time. |
| pytest-benchmark | Timing and regression detection for performance-sensitive functions. |
| respx, responses, `httpx.MockTransport` | HTTP-level mocking without patching internals. |

Common practices:

* Parametrize instead of looping inside a test, so each case is reported individually.
* Use `tmp_path` and other builtin fixtures rather than writing to fixed paths.
* Property-based tests for round trips and invariants: encode/decode, serialize/parse, transform/inverse, sums that must be preserved.

```python
@given(st.lists(st.integers()))
def test_sort_is_a_permutation(xs):
    assert sorted(sorted(xs)) == sorted(xs)
    assert Counter(sorted(xs)) == Counter(xs)
```

* Test against real dependencies where feasible; mocking an ORM or driver tests the mock rather than the query.
* Coverage is a threshold, not an objective; branch coverage is more informative than line coverage.
