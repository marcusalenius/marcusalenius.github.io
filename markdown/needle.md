### Deep Learning Systems Course

I built this framework during my semester taking CMU's [10-714 Deep Learning Systems](https://dlsyscourse.org/) course. The course was created by [Zico Kolter](https://zicokolter.com/bio/), Head of the Machine Learning Department at CMU and a member of OpenAI's Board, and [Tianqi Chen](https://tqchen.com/), a titan in ML Systems research having created [TVM](https://tvm.apache.org/), [MXNet](https://mxnet.incubator.apache.org/), and [MLC-LLM](https://llm.mlc.ai/), and is perhaps most known for [XGBoost](https://xgboost.ai/). The semester I took the course, it was taught by Chen and [Tim Dettmers](https://timdettmers.com/about/), best known for [bitsandbytes](https://github.com/bitsandbytes-foundation/bitsandbytes) and [QLoRA](https://arxiv.org/abs/2305.14314).

The [course website](https://dlsyscourse.org/) describes the course as "[providing] students with a comprehensive understanding of the 'full stack' of deep learning systems, from high-level modeling design to automatic differentiation implementation to device-level efficient algorithms." We start by building out the autograd engine, and finish by implementing our own CPU and CUDA backends. 

It was a fantastic course, and I would highly recommend it to anyone at CMU interested in both machine learning and computer systems. My only critique is that I would have preferred less emphasis on high-level ML modeling, as I was already quite familiar with that from prior coursework.

### A Brief Overview

The framework uses a layered architecture with a dispatcher pattern, as seen in the figure at the top of this page. The `Tensor` class builds a computational graph and performs automatic differentiation. Operations on tensors are implemented via `Op` subclasses, which define forward and backward computations. These operations call methods on the `NDArray` class, which provides a backend-agnostic interface. `NDArrayBackend` then dispatches primitive operations (e.g., `ewise_add`, `matmul`, `reduce_sum`) to the selected device.

Performance-critical code is isolated behind a small, well-defined backend interface. Each backend is packaged as a Python module exposing a uniform set of functions. These modules implement primitives such as `EwiseSetitem`, `Compact`, `EwiseMul`, and `Matmul`, optimized for its target hardware. This design cleanly separates algorithmic logic from hardware-specific optimizations.

### Metal Extension

At the end of the semester, I extended the framework by adding a Metal backend to enable fast training and inference on my MacBook. In fact, I implemented two Metal backends: one written from scratch using Metal Shader Language (MSL), and another using Metal Performance Shaders (MPS), which provide Apple’s vendor-optimized kernels.

For matrix multiplication, the MSL backend was on average 22× faster than the CPU backend, while the MPS backend achieved, on average, 86% of PyTorch MPS performance. For MLP training, MSL was 9.4× faster than CPU, and MPS reached 31% of PyTorch MPS performance.
