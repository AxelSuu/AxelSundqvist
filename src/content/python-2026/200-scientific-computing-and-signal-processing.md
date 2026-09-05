---
title: "Scientific computing and signal processing"
blurb: "Instruments, SDR and RF, with an automated measurement rig and a receive chain."
part: "Domains"
---

| Library | Description |
|---|---|
| [NumPy](https://numpy.org/doc/stable/), [SciPy](https://docs.scipy.org/doc/scipy/) | Arrays and numerical algorithms. [`scipy.signal`](https://docs.scipy.org/doc/scipy/reference/signal.html) covers filter design, resampling, spectral estimation; [`scipy.fft`](https://docs.scipy.org/doc/scipy/reference/fft.html) covers transforms. |
| [Numba](https://numba.pydata.org/) | JIT compilation of NumPy-heavy Python functions via LLVM. |
| [Cython](https://cython.readthedocs.io/) | Compiles annotated Python to C extensions; used for C interop. |
| [PyO3](https://pyo3.rs/) + [maturin](https://www.maturin.rs/) | Rust extension modules with Python bindings and wheel building. |
| [SymPy](https://docs.sympy.org/) | Symbolic mathematics. |
| [xarray](https://docs.xarray.dev/) | Labelled N-dimensional arrays with coordinates; common in geoscience and simulation. |
| [h5py](https://docs.h5py.org/), [netCDF4](https://unidata.github.io/netcdf4-python/), [Zarr](https://zarr.readthedocs.io/) | Array storage formats; Zarr targets chunked cloud storage. |
| [scikit-rf](https://scikit-rf.readthedocs.io/) | RF and microwave engineering: S-parameters, networks, calibration, Touchstone files. |
| [python-control](https://python-control.readthedocs.io/) | Control systems: transfer functions, state space, frequency response. |
| [GNU Radio](https://wiki.gnuradio.org/) | SDR framework with Python bindings and flowgraph generation. |
| [SoapySDR](https://github.com/pothosware/SoapySDR/wiki), [UHD](https://files.ettus.com/manual/), [pyadi-iio](https://analogdevicesinc.github.io/pyadi-iio/) | SDR hardware abstraction; USRP and Analog Devices device APIs. |
| [pyFFTW](https://pyfftw.readthedocs.io/) | FFTW bindings, faster than `numpy.fft` for repeated transforms. |
| [PyVISA](https://pyvisa.readthedocs.io/) | Instrument control over GPIB, USB, Ethernet and serial. |
| [pySerial](https://pyserial.readthedocs.io/) | Serial port access. |
| [nidaqmx](https://nidaqmx-python.readthedocs.io/), [pyusb](https://github.com/pyusb/pyusb) | National Instruments DAQ hardware; raw USB device access. |
| [scikit-image](https://scikit-image.org/docs/stable/) | Image processing algorithms for scientific data. |
| [Dear PyGui](https://dearpygui.readthedocs.io/) | Immediate-mode GPU-rendered GUI toolkit; used for live instrument and signal displays. |
| [joblib](https://joblib.readthedocs.io/), [Ray](https://docs.ray.io/) | Parallel execution of independent runs on one machine and across a cluster respectively. |

**Automated RF measurement rig.**
`pytest → PyVISA (signal generator, spectrum analyser) + pySerial (DUT control) → NumPy/SciPy metrics → Parquet + Matplotlib report`

Instrument drivers are wrapped behind a small interface per instrument type so the same test runs against different lab equipment. Test cases are pytest functions with parametrized frequency and power points, and limits are asserted rather than eyeballed. Every run writes raw captures alongside computed metrics (EVM, ACLR, spectral mask margin) so a failure can be re-analysed without repeating the measurement — bench time is the scarce resource, not disk. scikit-rf handles de-embedding of cable and fixture losses from measured S-parameters.

**SDR receive chain.**
`SoapySDR or pyadi-iio capture → SciPy filter and decimate → NumPy demodulation → Numba timing recovery loop → Dear PyGui display (immediate-mode, GPU-rendered)`

Capture runs in its own thread writing IQ samples into a ring buffer; processing reads from it, so display stalls do not drop samples. Per-sample feedback loops (timing recovery, carrier tracking) cannot be vectorized and are compiled with Numba. A file-backed source implementing the same interface as the radio allows the whole chain to run against recorded IQ in tests, which is what makes the DSP testable at all.

**Monte Carlo parameter study.**
`Parameter grid → Ray or joblib workers → NumPy simulation → xarray results → Zarr → Seaborn summary`

Each worker returns an array plus its parameter coordinates; xarray assembles them into a labelled cube indexed by the swept variables. Results are written incrementally so a long sweep can be interrupted and resumed. Seeds are derived deterministically from the parameter index so any single run can be reproduced in isolation.
