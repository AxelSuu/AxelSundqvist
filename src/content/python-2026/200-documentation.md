---
title: "Documentation"
blurb: "Generators, and the part of an interface that annotations cannot state."
reviewed: 2026-09-06
part: "Practices"
---

| Tool | Notes |
|---|---|
| [MkDocs](https://www.mkdocs.org/) + [Material](https://squidfunk.github.io/mkdocs-material/) | Markdown-based site generator with search, navigation and versioning. |
| [mkdocstrings](https://mkdocstrings.github.io/) | Generates API reference pages from docstrings and annotations. |
| [Sphinx](https://www.sphinx-doc.org/) | reStructuredText and [MyST](https://myst-parser.readthedocs.io/); cross-references, multiple output formats, extensive scientific ecosystem. |
| [mike](https://github.com/jimporter/mike) | Versioned documentation deployments. |
| [pdoc](https://pdoc.dev/) | Minimal API documentation generator with no configuration. |

Docstring conventions (Google, NumPy or reST) are enforced by [`ruff`'s `D` rules](https://docs.astral.sh/ruff/rules/#pydocstyle-d). Where annotations already state parameter and return types, docstrings cover what annotations cannot express: units, valid ranges, exceptions raised, side effects, and caller responsibilities.

[`doctest`](https://docs.python.org/3/library/doctest.html) keeps short examples verified; [`pytest --doctest-modules`](https://docs.pytest.org/en/stable/how-to/doctest.html) runs them as part of the suite.
