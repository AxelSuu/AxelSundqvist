---
title: "Validation and data models"
blurb: "Boundary validation, internal data models, and startup configuration checks."
reviewed: 2026-09-06
part: "Practices"
---

| Library | Use |
|---|---|
| [Pydantic v2](https://docs.pydantic.dev/) | Validation, coercion and serialization at I/O boundaries: HTTP payloads, config files, external API responses, model output. |
| [`dataclasses`](https://docs.python.org/3/library/dataclasses.html) | Stdlib internal value objects. `slots=True` and `frozen=True` reduce memory use and prevent mutation. |
| [attrs](https://www.attrs.org/) | Similar scope to dataclasses with more features: validators, converters, `__init__` customization. |
| [pydantic-settings](https://docs.pydantic.dev/latest/concepts/pydantic_settings/) | Loads and validates configuration from environment variables, `.env` files and secrets directories. |
| [`msgspec`](https://msgspec.dev/) | Alternative serialization and validation library with lower overhead, no coercion by default. |

Validate at the process boundary and use plain objects internally:

```python
from dataclasses import dataclass

from pydantic import BaseModel, Field

class CreateJob(BaseModel):          # boundary
    symbol: str
    window: int = Field(gt=0, le=512)

@dataclass(frozen=True, slots=True)  # internal
class Job:
    symbol: str
    window: int

def accept(body: bytes) -> Job:
    req = CreateJob.model_validate_json(body)  # ValidationError here, at the edge
    return Job(req.symbol, req.window)
```

Past `accept`, nothing needs to re-check the window or pay for Pydantic's machinery.

Configuration validated at startup fails immediately on a missing or malformed value rather than at first use:

```python
from typing import Literal

from pydantic import PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    database_url: PostgresDsn
    log_level: Literal["DEBUG", "INFO", "WARNING"] = "INFO"
    model_config = SettingsConfigDict(env_file=".env")
```
