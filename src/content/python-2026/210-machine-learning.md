---
title: "Machine learning"
blurb: "Training and serving, with a tabular prediction service and a vision pipeline."
part: "Domains"
---

| Library | Description |
|---|---|
| PyTorch 2.x | Dominant deep learning framework. `torch.compile` for graph capture and kernel fusion. |
| PyTorch Lightning | Training loop abstraction over PyTorch: checkpointing, distributed training, logging. |
| JAX | Composable transforms (`jit`, `grad`, `vmap`, `pmap`), XLA compilation, TPU support. |
| Flax, Optax | Neural network modules and optimizers for JAX. |
| scikit-learn | Classical models, pipelines, cross-validation, metrics. |
| XGBoost, LightGBM, CatBoost | Gradient-boosted trees. Standard choice for tabular data. |
| Hugging Face `transformers` | Pretrained model implementations and training utilities. |
| `datasets`, `accelerate`, `peft`, `trl` | Dataset loading, distributed training, parameter-efficient fine-tuning, preference training. |
| timm | Image model architectures and pretrained weights. |
| OpenCV | Classical computer vision: filtering, features, calibration, tracking. |
| Albumentations | Image augmentation pipelines. |
| ONNX, onnxruntime | Model interchange format and cross-platform inference runtime. |
| vLLM, SGLang | High-throughput LLM inference servers with paged attention and continuous batching. |
| Optuna, Ray Tune | Hyperparameter optimization. |
| MLflow, Weights & Biases | Experiment tracking, model registry, artifact storage. |
| BentoML | Model packaging and serving. |

**Tabular prediction service.**
`Feature table (DuckDB/Parquet) → scikit-learn pipeline + LightGBM → Optuna tuning → MLflow registry → ONNX export → FastAPI + onnxruntime`

The full preprocessing chain lives inside the scikit-learn pipeline object, so training and serving cannot diverge on feature handling — the most common source of a model that scores well offline and badly in production. Cross-validation splits respect time ordering where the target is forward-looking. Exporting to ONNX removes the training dependencies from the serving image and gives predictable latency. Input distributions are logged at inference and compared against the training set to detect drift.

**Vision training pipeline.**
`Object storage → PyTorch Dataset → Albumentations → timm backbone → Lightning + DDP across GPUs → W&B logging → ONNX export → BentoML service`

Lightning handles distributed setup, mixed precision, gradient accumulation and checkpointing, so the model code stays close to plain PyTorch. Augmentation is applied in dataloader workers; the input pipeline is profiled separately from the model to confirm the GPU is actually the bottleneck, since an underfed GPU looks identical to a slow model from the outside. Checkpoints and the exact dataset manifest are stored together so a run can be reproduced.
