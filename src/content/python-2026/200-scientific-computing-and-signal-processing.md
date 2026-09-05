---
title: "Scientific computing and signal processing"
blurb: "Instruments, SDR and RF, with an automated measurement rig and a receive chain."
part: "Domains"
---

| Library | Description |
|---|---|
| NumPy, SciPy | Arrays and numerical algorithms. `scipy.signal` covers filter design, resampling, spectral estimation; `scipy.fft` covers transforms. |
| Numba | JIT compilation of NumPy-heavy Python functions via LLVM. |
| Cython | Compiles annotated Python to C extensions; used for C interop. |
| PyO3 + maturin | Rust extension modules with Python bindings and wheel building. |
| SymPy | Symbolic mathematics. |
| xarray | Labelled N-dimensional arrays with coordinates; common in geoscience and simulation. |
| h5py, netCDF4, Zarr | Array storage formats; Zarr targets chunked cloud storage. |
| scikit-rf | RF and microwave engineering: S-parameters, networks, calibration, Touchstone files. |
| python-control | Control systems: transfer functions, state space, frequency response. |
| GNU Radio | SDR framework with Python bindings and flowgraph generation. |
| SoapySDR, UHD, pyadi-iio | SDR hardware abstraction; USRP and Analog Devices device APIs. |
| pyFFTW | FFTW bindings, faster than `numpy.fft` for repeated transforms. |
| PyVISA | Instrument control over GPIB, USB, Ethernet and serial. |
| pySerial | Serial port access. |
| nidaqmx, pyusb | National Instruments DAQ hardware; raw USB device access. |
| scikit-image | Image processing algorithms for scientific data. |

**Automated RF measurement rig.**
`pytest → PyVISA (signal generator, spectrum analyser) + pySerial (DUT control) → NumPy/SciPy metrics → Parquet + Matplotlib report`

Instrument drivers are wrapped behind a small interface per instrument type so the same test runs against different lab equipment. Test cases are pytest functions with parametrized frequency and power points, and limits are asserted rather than eyeballed. Every run writes raw captures alongside computed metrics (EVM, ACLR, spectral mask margin) so a failure can be re-analysed without repeating the measurement — bench time is the scarce resource, not disk. scikit-rf handles de-embedding of cable and fixture losses from measured S-parameters.

**SDR receive chain.**
`SoapySDR or pyadi-iio capture → SciPy filter and decimate → NumPy demodulation → Numba timing recovery loop → Dear PyGui display (immediate-mode, GPU-rendered)`

Capture runs in its own thread writing IQ samples into a ring buffer; processing reads from it, so display stalls do not drop samples. Per-sample feedback loops (timing recovery, carrier tracking) cannot be vectorized and are compiled with Numba. A file-backed source implementing the same interface as the radio allows the whole chain to run against recorded IQ in tests, which is what makes the DSP testable at all.

**Monte Carlo parameter study.**
`Parameter grid → Ray or joblib workers → NumPy simulation → xarray results → Zarr → Seaborn summary`

Each worker returns an array plus its parameter coordinates; xarray assembles them into a labelled cube indexed by the swept variables. Results are written incrementally so a long sweep can be interrupted and resumed. Seeds are derived deterministically from the parameter index so any single run can be reproduced in isolation.
