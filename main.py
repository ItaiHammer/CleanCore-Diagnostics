import webview
import socket
import os
from dotenv import load_dotenv, get_key

load_dotenv()

APP_MODE = get_key('.env', 'APP_MODE').lower()
print(f"APP_MODE value: {APP_MODE}")
print(f"Current directory: {os.getcwd()}")

class Api:
    def get_name(self):
        return socket.gethostname()

def run_pywebview():
    if APP_MODE == 'development':
        url = 'http://localhost:3000'
        print("🔧 Development mode: Using React dev server")
    else:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        build_path = os.path.join(base_dir, 'web', 'index.html')
        
        if not os.path.exists(build_path):
            raise FileNotFoundError(f"Production build not found at: {build_path}")
        
        url = f'./{build_path}'
        print("🚀 Production mode: Using built files")

    window = webview.create_window(
        'CleanCore',
        url=url,
        js_api=Api(),
        width=1440,
        height=1024
    )
    webview.start(
        icon='./frontend/public/logo512.png'
        )

if __name__ == '__main__':
    run_pywebview()
