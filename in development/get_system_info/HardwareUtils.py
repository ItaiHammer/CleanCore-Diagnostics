import sys, os

sys.path.append(os.path.abspath(os.path.join("..", "..", 'backend')))
from PlatformRouter import PlatformRouter

platform_router = PlatformRouter()

class HardwareUtils:
    @staticmethod
    def get_cpu_info():
        return platform_router.run(
            windows="windows.get_cpu_info.get_cpu_info",
            mac="mac.get_cpu_info.get_cpu_info",
            linux=None
        )

if __name__ == "__main__":
    print(HardwareUtils.get_cpu_info())