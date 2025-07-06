import webview
import socket
import os
import json
import sys
from dotenv import load_dotenv, get_key
from screeninfo import get_monitors

# backend imports
from backend.Api import Api

load_dotenv()

APP_MODE = get_key('.env', 'APP_MODE')
if APP_MODE is None:
    APP_MODE = 'production'
else:
    APP_MODE = APP_MODE.lower()

print(f"APP_MODE value: {APP_MODE}")
print(f"Current directory: {os.getcwd()}")

def run_pywebview():
    # using build or react server depending on the APP_MODE environment variable
    if APP_MODE == 'development':
        url = 'http://localhost:3000'
        print("🔧 Development mode: Using React dev server")
    else:
        build_path = Api.resource_path('web/index.html')
        
        if not os.path.exists(build_path):
            raise FileNotFoundError(f"Production build not found at: {build_path}")
        
        # Format the file:// URL for compatibility across platforms
        if sys.platform == 'win32':
            url = f'file:///{os.path.abspath(build_path).replace("\\", "/")}'
        else:
            url = f'file://{os.path.abspath(build_path)}'

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

    icon_path = Api.resource_path('./frontend/public/favicon.ico')
    webview.start(
        debug=APP_MODE == 'development',
        icon=icon_path
    )

if __name__ == '__main__':
    run_pywebview()
