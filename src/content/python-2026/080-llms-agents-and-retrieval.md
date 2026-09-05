---
title: "LLMs, agents and retrieval"
blurb: "Provider SDKs, agent frameworks and vector stores, with document QA and typed extraction."
reviewed: 2026-09-06
part: "Domains"
---

| Library | Description |
|---|---|
| [openai](https://platform.openai.com/docs/libraries), [anthropic](https://docs.claude.com/en/api/client-sdks), [google-genai](https://ai.google.dev/gemini-api/docs) | First-party API clients. |
| [LiteLLM](https://docs.litellm.ai/) | Unified interface and proxy across many providers. |
| [Instructor](https://python.useinstructor.com/), [Outlines](https://dottxt-ai.github.io/outlines/) | Structured output: schema-constrained generation and validation. |
| [PydanticAI](https://ai.pydantic.dev/) | Type-safe agent framework from the Pydantic team. V2, released June 2026, is a breaking change from V1: it moves configuration onto a composable "capability" primitive and splits fast-moving pieces into a separate Harness package beside a slimmer core. |
| [LangGraph](https://langchain-ai.github.io/langgraph/) | Graph-based orchestration with explicit state, checkpointing and human-in-the-loop steps. |
| [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/) | Agents, handoffs, guardrails and tracing. Provider-agnostic in practice, still on 0.x. |
| [Claude Agent SDK](https://docs.claude.com/en/api/agent-sdk/overview) | Anthropic's agent framework, including subagent spawning. |
| [LlamaIndex](https://docs.llamaindex.ai/) | Indexing, retrieval and query pipelines. Workflows is a separate package, [`llama-index-workflows`](https://pypi.org/project/llama-index-workflows/), on 2.x since August 2025. |
| [`mcp`](https://modelcontextprotocol.io/), [FastMCP](https://gofastmcp.com/) | Model Context Protocol SDK and a higher-level server framework for building MCP tools. |
| [pgvector](https://github.com/pgvector/pgvector) | Vector column type and index for PostgreSQL. |
| [Qdrant](https://qdrant.tech/documentation/), [Chroma](https://docs.trychroma.com/), [LanceDB](https://lancedb.github.io/lancedb/) | Vector stores; Rust-backed with payload filtering, embedded/client-server, and Lance-columnar respectively. |
| [sentence-transformers](https://sbert.net/) | Embedding and reranking model inference. |
| [rank_bm25](https://github.com/dorianbrown/rank_bm25) | Lexical BM25 scoring, used for hybrid retrieval. |
| [Langfuse](https://langfuse.com/docs), [Logfire](https://logfire.pydantic.dev/docs/) | Tracing and evaluation for LLM applications. |
| [Ragas](https://docs.ragas.io/), [DeepEval](https://deepeval.com/docs/getting-started) | Evaluation metrics for retrieval and generation quality. |

**Document question answering.**
`Ingestion → structural chunking → sentence-transformers embeddings → pgvector in existing PostgreSQL → hybrid retrieval (vector + rank_bm25) → reranker → generation with citations`

Storing vectors in the operational database removes a second system and keeps chunks transactionally consistent with their source documents. Chunking follows the document's own headings and table boundaries rather than a fixed character count, which keeps tables intact. Hybrid retrieval covers cases where the query contains exact identifiers that embeddings handle poorly — part numbers and error codes are the usual example. A held-out set of question and expected-source pairs is run as pytest cases with Ragas metrics, so retrieval changes are measured rather than assessed by inspection.

**Typed extraction service.**
`FastAPI endpoint → PydanticAI agent with an output model → LiteLLM provider routing → validated object`

The output schema is a Pydantic model, and validation failures trigger a bounded retry with the error fed back to the model. Requests carry a schema version so downstream consumers can handle changes. Prompt and model identifiers are logged with each response, because a silent provider-side model update is otherwise indistinguishable from a regression in your own code.
