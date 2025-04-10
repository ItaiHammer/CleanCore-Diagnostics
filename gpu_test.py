import json

def get_gpu_info():
    gpu_data = []
    # First, try using NVIDIA's NVML via pynvml
    try:
        from pynvml import (
            nvmlInit,
            nvmlDeviceGetCount,
            nvmlDeviceGetHandleByIndex,
            nvmlDeviceGetName,
            nvmlDeviceGetUtilizationRates,
            nvmlDeviceGetMemoryInfo,
            nvmlDeviceGetTemperature,
            nvmlDeviceGetFanSpeed,
            NVML_TEMPERATURE_GPU
        )
        nvmlInit()
        num_gpus = nvmlDeviceGetCount()
        for i in range(num_gpus):
            handle = nvmlDeviceGetHandleByIndex(i)
            # Handle both bytes and string outputs
            name_raw = nvmlDeviceGetName(handle)
            name = name_raw.decode("utf-8") if isinstance(name_raw, bytes) else name_raw
            utilization = nvmlDeviceGetUtilizationRates(handle)
            memory_info = nvmlDeviceGetMemoryInfo(handle)
            temperature = nvmlDeviceGetTemperature(handle, NVML_TEMPERATURE_GPU)
            try:
                fan_speed = nvmlDeviceGetFanSpeed(handle)
            except Exception:
                fan_speed = None  # Some devices may not support fan speed reading

            gpu_data.append({
                "vendor": "NVIDIA",
                "name": name,
                "utilization_percent": utilization.gpu,       # GPU utilization percentage
                "memory_total_bytes": memory_info.total,
                "memory_used_bytes": memory_info.used,
                "memory_free_bytes": memory_info.free,
                "temperature_celsius": temperature,
                "fan_speed_percent": fan_speed,
                "driver_version": "N/A"  # You could also query nvmlDeviceGetDriverVersion() if needed.
            })
        return gpu_data
    except Exception as e_nvml:
        # If NVML is unavailable, fall back to PyOpenCL for basic info.
        try:
            import pyopencl as cl
            platforms = cl.get_platforms()
            for platform_item in platforms:
                for device in platform_item.get_devices():
                    # Note: OpenCL doesn't readily provide utilization or temperature info.
                    gpu_data.append({
                        "vendor": device.vendor,
                        "name": device.name,
                        "global_memory_bytes": device.global_mem_size,
                        "compute_units": device.max_compute_units,
                        "max_clock_frequency_mhz": getattr(device, 'max_clock_frequency', 'N/A'),
                        "driver_version": getattr(device, 'driver_version', 'N/A'),
                        "utilization_percent": "N/A",
                        "temperature_celsius": "N/A",
                        "fan_speed_percent": "N/A"
                    })
            return gpu_data
        except Exception as e_cl:
            return {"error": f"NVML error: {e_nvml}; PyOpenCL error: {e_cl}"}

if __name__ == "__main__":
    info = get_gpu_info()
    # Output the GPU information in JSON format
    print(json.dumps(info, indent=2))
