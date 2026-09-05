---
title: "Documentation"
blurb: "Generators, and the part of an interface that annotations cannot state."
part: "Practices"
---

| Tool | Notes |
|---|---|
| MkDocs + Material | Markdown-based site generator with search, navigation and versioning. |
| mkdocstrings | Generates API reference pages from docstrings and annotations. |
| Sphinx | reStructuredText and MyST; cross-references, multiple output formats, extensive scientific ecosystem. |
| mike | Versioned documentation deployments. |
| pdoc | Minimal API documentation generator with no configuration. |

Docstring conventions (Google, NumPy or reST) are enforced by `ruff`'s `D` rules. Where annotations already state parameter and return types, docstrings cover what annotations cannot express: units, valid ranges, exceptions raised, side effects, and caller responsibilities.

`doctest` keeps short examples verified; `pytest --doctest-modules` runs them as part of the suite.
