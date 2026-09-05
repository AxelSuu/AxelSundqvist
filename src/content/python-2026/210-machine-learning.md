---
title: "Machine learning"
blurb: "Training and serving, with a tabular prediction service and a vision pipeline."
part: "Domains"
---

| Library | Description |
|---|---|
| [PyTorch 2.x](https://pytorch.org/docs/stable/) | The backend `transformers`, timm and vLLM are written against. [`torch.compile`](https://docs.pytorch.org/docs/stable/torch.compiler.html) for graph capture and kernel fusion. |
| [PyTorch Lightning](https://lightning.ai/docs/pytorch/stable/) | Training loop abstraction over PyTorch: checkpointing, distributed training, logging. |
| [JAX](https://docs.jax.dev/) | Composable transforms (`jit`, `grad`, `vmap`, `pmap`), XLA compilation, TPU support. |
| [Flax](https://flax.readthedocs.io/), [Optax](https://optax.readthedocs.io/) | Neural network modules and optimizers for JAX. |
| [scikit-learn](https://scikit-learn.org/stable/) | Classical models, pipelines, cross-validation, metrics. |
| [XGBoost](https://xgboost.readthedocs.io/), [LightGBM](https://lightgbm.readthedocs.io/), [CatBoost](https://catboost.ai/docs/) | Gradient-boosted trees. Standard choice for tabular data. |
| [Hugging Face `transformers`](https://huggingface.co/docs/transformers/) | Pretrained model implementations and training utilities. |
| [`datasets`](https://huggingface.co/docs/datasets/), [`accelerate`](https://huggingface.co/docs/accelerate/), [`peft`](https://huggingface.co/docs/peft/), [`trl`](https://huggingface.co/docs/trl/) | Dataset loading, distributed training, parameter-efficient fine-tuning, preference training. |
| [timm](https://huggingface.co/docs/timm/) | Image model architectures and pretrained weights. |
| [OpenCV](https://docs.opencv.org/4.x/) | Classical computer vision: filtering, features, calibration, tracking. |
| [Albumentations](https://albumentations.ai/docs/) | Image augmentation pipelines. |
| [ONNX](https://onnx.ai/onnx/), [onnxruntime](https://onnxruntime.ai/docs/) | Model interchange format and cross-platform inference runtime. |
| [vLLM](https://docs.vllm.ai/), [SGLang](https://docs.sglang.ai/) | LLM inference servers; paged attention and continuous batching keep a GPU busy across concurrent requests. |
| [Optuna](https://optuna.readthedocs.io/), [Ray Tune](https://docs.ray.io/en/latest/tune/index.html) | Hyperparameter optimization. |
| [MLflow](https://mlflow.org/docs/latest/), [Weights & Biases](https://docs.wandb.ai/) | Experiment tracking, model registry, artifact storage. |
| [BentoML](https://docs.bentoml.com/) | Model packaging and serving. |

**Tabular prediction service.**
`Feature table (DuckDB/Parquet) → scikit-learn pipeline + LightGBM → Optuna tuning → MLflow registry → ONNX export → FastAPI + onnxruntime`

The full preprocessing chain lives inside the scikit-learn pipeline object, so training and serving cannot diverge on feature handling — the most common source of a model that scores well offline and badly in production. Cross-validation splits respect time ordering where the target is forward-looking. Exporting to ONNX removes the training dependencies from the serving image and gives predictable latency. Input distributions are logged at inference and compared against the training set to detect drift.

**Vision training pipeline.**
`Object storage → PyTorch Dataset → Albumentations → timm backbone → Lightning + DDP across GPUs → W&B logging → ONNX export → BentoML service`

Lightning handles distributed setup, mixed precision, gradient accumulation and checkpointing, so the model code stays close to plain PyTorch. Augmentation is applied in dataloader workers; the input pipeline is profiled separately from the model to confirm the GPU is actually the bottleneck, since an underfed GPU looks identical to a slow model from the outside. Checkpoints and the exact dataset manifest are stored together so a run can be reproduced.
