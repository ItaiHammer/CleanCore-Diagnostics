import socket
import os
import sys

# backend imports
from backend.app.AppManager import App
from backend.system.SystemManager import System

class Api:
    def __init__(self):
        self.App = App()
        self.System = System()

    def get_name(self):
        name = self.App.ConfigManager.get_config_value('systemName')
        if name:
            return name
        return socket.gethostname()

    def set_name(self, name):
        self.App.ConfigManager.set_config_value('systemName', name)

    def delete_name(self):
        return self.App.ConfigManager.delete_config_value('systemName')
    
    @staticmethod
    def resource_path(relative_path):
        """ Get absolute path to resource, works for dev and for PyInstaller """
        try:
            base_path = sys._MEIPASS
        except Exception:
            base_path = os.path.abspath(".")

        return os.path.join(base_path, relative_path)
