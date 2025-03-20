import webview
import socket
import os
import json
import sys
from dotenv import load_dotenv, get_key
from screeninfo import get_monitors

# backend imports
import backend.hardware_utils as hardware_utils

load_dotenv()

APP_MODE = get_key('.env', 'APP_MODE')
if APP_MODE is None:
    APP_MODE = 'production'
else:
    APP_MODE = APP_MODE.lower()

print(f"APP_MODE value: {APP_MODE}")
print(f"Current directory: {os.getcwd()}")

CONFIG_FILE = 'config.json'

class Api:
    def get_name(self):
        return socket.gethostname()

    def get_cpu_data(self):
        return hardware_utils.get_cpu_data()

    def get_memory_data(self):
        return hardware_utils.get_memory_data()

    def get_config_value(self, key):
        if os.path.exists(CONFIG_FILE):
            with open(CONFIG_FILE, 'r') as file:
                config = json.load(file)
                return config.get(key, None)
        return None

    def set_config_value(self, key, value):
        config = {}
        if os.path.exists(CONFIG_FILE):
            with open(CONFIG_FILE, 'r') as file:
                config = json.load(file)
        config[key] = value
        with open(CONFIG_FILE, 'w') as file:
            json.dump(config, file)

def resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    try:
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

def run_pywebview():
    # using build or react server depending on the APP_MODE environment variable
    if APP_MODE == 'development':
        url = 'http://localhost:3000'
        print("🔧 Development mode: Using React dev server")
    else:
        build_path = resource_path('web/index.html')
        
        if not os.path.exists(build_path):
            raise FileNotFoundError(f"Production build not found at: {build_path}")
        
        url = f'./{build_path}'

    # Get primary screen size
    primary_monitor = next(m for m in get_monitors() if m.is_primary)
    screen_width = primary_monitor.width
    screen_height = primary_monitor.height

    window = webview.create_window(
        'CleanCore',
        url=url,
        js_api=Api(),
        min_size=(900, 700),
        width=int(screen_width * 0.8),
        height=int(screen_height * 0.8),
    )

    icon_path = resource_path('./frontend/public/favicon.ico')
    webview.start(
        debug=APP_MODE == 'development',
        icon=icon_path
    )

if __name__ == '__main__':
    run_pywebview()
