import platform
import psutil

def _get_cpu_cache_info():
    l1_cache_size = 0
    l2_cache_size = 0
    l3_cache_size = 0

    return l1_cache_size, l2_cache_size, l3_cache_size

def _is_cpu_virtualization_enabled():
    return "N/A"

def _get_cpu_brand_string():
    system = platform.system()
    try:
        if system == "Darwin":
            import subprocess
            brand = subprocess.check_output(["sysctl", "-n", "machdep.cpu.brand_string"])
            return brand.decode().strip()
        
        elif system == "Windows":
            return platform.processor()
                    
    except Exception as e:
        return f"Unknown ({e})"
    
def get_cpu_temperature():
    return 0

def get_cpu_info():
    total_threads = 0
    total_handles = 0
    for proc in psutil.process_iter(['pid']):
        try:
            total_threads += proc.num_threads()
            
            if hasattr(proc, "num_fds"): # for unix systems
                total_handles += proc.num_fds()

            if hasattr(proc, "num_handles"): # for windows
                total_handles += proc.num_handles()

        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue

    l1_cache_size, l2_cache_size, l3_cache_size = _get_cpu_cache_info()

    cpu_freq = psutil.cpu_freq()
    base_speed = cpu_freq.max if cpu_freq and cpu_freq.max is not None else "N/A"
    current_speed = cpu_freq.current if cpu_freq and cpu_freq.current is not None else "N/A"

    info = {
        "CPU": _get_cpu_brand_string(),
        "Logical Cores": psutil.cpu_count(logical=True),
        "Physical Cores": psutil.cpu_count(logical=False),
        "CPU Usage (%)": psutil.cpu_percent(interval=0.1),
        "Base CPU Frequency (MHz)": base_speed,
        "Current CPU Frequency (MHz)": current_speed,
        "Processes": len(psutil.pids()),
        "Threads": total_threads,
        "Handles": total_handles,
        "L1 Cache (KB)": l1_cache_size,
        "L2 Cache (KB)": l2_cache_size,
        "L3 Cache (KB)": l3_cache_size,
        "Virtualization Enabled": _is_cpu_virtualization_enabled(),
        "CPU Temperature (°C)": get_cpu_temperature()
    }
    return info

if __name__ == "__main__":
    cpu_info = get_cpu_info()

    from pprint import pprint
    print("CPU Info:")
    pprint(cpu_info)
