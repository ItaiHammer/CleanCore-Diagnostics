import platform
import psutil
import math

from .get_system_info.get_cpu_info import get_cpu_info

class HardwareUtils:
    def get_cpu_data(self):
        return get_cpu_info()

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
    
    def get_disk_data(self):
        return {
            "total": psutil.disk_usage().total,
            "used": psutil.disk_usage().used,
            "percent_usage": psutil.disk_usage().percent
        }
    
    def get_network_data(self):
        return {

        }