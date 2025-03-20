import psutil
import math

class HardwareUtils:
    def get_cpu_data(self):
        return {
            "percent_usage": psutil.cpu_percent(interval=0.1, percpu=False),
            "speed": psutil.cpu_freq(percpu=False).current
        }

    def get_memory_data(self):
        return {
            "total": psutil.virtual_memory().total,
            "used": psutil.virtual_memory().used,
            "percent_usage": psutil.virtual_memory().percent
        }

    def memory_total(self, decimalplace):
        return math.trunc((10 ** decimalplace) * (HardwareUtils.get_memory_data()["used"] / (10 ** 9))) / (10 ** decimalplace)

    def memory_used(self, decimalplace):
        return math.trunc((10 ** decimalplace) * (HardwareUtils.get_memory_data()["used"] / (10 ** 9))) / (10 ** decimalplace)