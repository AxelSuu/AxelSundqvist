---
title: "LLMs, agents and retrieval"
blurb: "Provider SDKs, agent frameworks and vector stores, with document QA and typed extraction."
part: "Domains"
---

| Library | Description |
|---|---|
| openai, anthropic, google-genai | First-party API clients. |
| LiteLLM | Unified interface and proxy across many providers. |
| Instructor, Outlines | Structured output: schema-constrained generation and validation. |
| PydanticAI | Type-safe agent framework from the Pydantic team. V2, released June 2026, is a breaking change from V1: it moves configuration onto a composable "capability" primitive and splits fast-moving pieces into a separate Harness package beside a slimmer core. |
| LangGraph | Graph-based orchestration with explicit state, checkpointing and human-in-the-loop steps. |
| OpenAI Agents SDK | Agents, handoffs, guardrails and tracing. Provider-agnostic in practice, still on 0.x. |
| Claude Agent SDK | Anthropic's agent framework, including subagent spawning. |
| LlamaIndex | Indexing, retrieval and query pipelines; Workflows 1.0 released June 2026. |
| `mcp`, FastMCP | Model Context Protocol SDK and a higher-level server framework for building MCP tools. |
| pgvector | Vector column type and index for PostgreSQL. |
| Qdrant, Chroma, LanceDB | Vector stores; Rust-backed with payload filtering, embedded/client-server, and Lance-columnar respectively. |
| sentence-transformers | Embedding and reranking model inference. |
| rank_bm25 | Lexical BM25 scoring, used for hybrid retrieval. |
| Langfuse, Logfire | Tracing and evaluation for LLM applications. |
| Ragas, DeepEval | Evaluation metrics for retrieval and generation quality. |

**Document question answering.**
`Ingestion → structural chunking → sentence-transformers embeddings → pgvector in existing PostgreSQL → hybrid retrieval (vector + rank_bm25) → reranker → generation with citations`

Storing vectors in the operational database removes a second system and keeps chunks transactionally consistent with their source documents. Chunking follows the document's own headings and table boundaries rather than a fixed character count, which keeps tables intact. Hybrid retrieval covers cases where the query contains exact identifiers that embeddings handle poorly — part numbers and error codes are the usual example. A held-out set of question and expected-source pairs is run as pytest cases with Ragas metrics, so retrieval changes are measured rather than assessed by inspection.

**Typed extraction service.**
`FastAPI endpoint → PydanticAI agent with an output model → LiteLLM provider routing → validated object`

The output schema is a Pydantic model, and validation failures trigger a bounded retry with the error fed back to the model. Requests carry a schema version so downstream consumers can handle changes. Prompt and model identifiers are logged with each response, because a silent provider-side model update is otherwise indistinguishable from a regression in your own code.
