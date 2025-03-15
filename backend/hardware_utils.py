import psutil
import math

cpu_data = {
    "percent_usage": psutil.cpu_percent(interval=0.1, percpu=False),
    "speed": psutil.cpu_freq(percpu=False).current
}

memory_data ={
    "total": psutil.virtual_memory().total,
    "used": psutil.virtual_memory().used,
    "percent_usage": psutil.virtual_memory().percent
}

def memory_total(decimalplace):
    return math.trunc((10 ** decimalplace) * (memory_data["used"] / (10 ** 9))) / (10 ** decimalplace)

def memory_used(decimalplace):
    return math.trunc((10 ** decimalplace) * (memory_data["used"] / (10 ** 9))) / (10 ** decimalplace)

print(cpu_data["percent_usage"])
print(cpu_data["speed"])
print(memory_data["percent_usage"])
print(memory_total(0))
print(memory_used(2))