---
title: "Validation and data models"
blurb: "Pydantic at the boundary, plain objects inside, and configuration that fails at startup."
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
class CreateJob(BaseModel):          # boundary
    symbol: str
    window: int = Field(gt=0, le=512)

@dataclass(frozen=True, slots=True)  # internal
class Job:
    symbol: str
    window: int
```

Configuration validated at startup fails immediately on a missing or malformed value rather than at first use:

```python
class Settings(BaseSettings):
    database_url: PostgresDsn
    log_level: Literal["DEBUG", "INFO", "WARNING"] = "INFO"
    model_config = SettingsConfigDict(env_file=".env")
```
