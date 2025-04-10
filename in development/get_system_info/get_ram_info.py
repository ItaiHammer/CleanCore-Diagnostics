import platform
import psutil

def get_basic_memory_info():
    virtual_mem = psutil.virtual_memory()
    swap = psutil.swap_memory()

    return {
        "Total Memory (GB)": round(virtual_mem.total / (1024 ** 3), 2),
        "Used Memory (GB)": round(virtual_mem.used / (1024 ** 3), 2),
        "Usage (%)": virtual_mem.percent,
        "Compressed (Swap Used)": f"{round(swap.used / (1024 ** 2), 2)} MB",
        "Cached (Estimate)": f"{round(virtual_mem.cached / (1024 ** 2), 2)} MB" if hasattr(virtual_mem, "cached") else "N/A",
        "Paged Pool": "N/A",  # psutil doesn't show this
        "Non-paged Pool": "N/A",  # psutil doesn't show this
    }

def get_mac_memory_info():
    import subprocess
    import plistlib

    try:
        output = subprocess.check_output(["system_profiler", "-xml", "SPMemoryDataType"])
        plist = plistlib.loads(output)

        items = plist[0]['_items']
        speeds = []
        form_factors = []
        slots_used = len(items)

        for item in items:
            print(item)  # Debug: See what macOS returns
            speeds.append(item.get("dimm_speed", "N/A"))
            form_factors.append(item.get("dimm_type", "N/A"))

        return {
            "Speed (MHz)": speeds[0] if speeds else "N/A",
            "Form Factor": form_factors[0] if form_factors else "N/A",
            "Slots Used": f"{slots_used} of unknown",
            "Hardware Reserved": "Not exposed on macOS"
        }
    except Exception:
        return {
            "Speed (MHz)": "N/A",
            "Form Factor": "N/A",
            "Slots Used": "N/A",
            "Hardware Reserved": "N/A"
        }

def get_memory_info():
    system = platform.system()
    memory_info = get_basic_memory_info()

    if system == "Windows":
        # to be implemented
        print()
    elif system == "Darwin":
        memory_info.update(get_mac_memory_info())

    return memory_info

if __name__ == "__main__":
    from pprint import pprint
    pprint(get_memory_info())
