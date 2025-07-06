from .hardware_utils.HardwareUtils import HardwareUtils
import socket

class System:
    def __init__(self):
        self.HardwareUtils = HardwareUtils()

    def get_hostname(self):
        return socket.gethostname()
