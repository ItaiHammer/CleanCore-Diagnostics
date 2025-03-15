import webview
import socket
import os
from dotenv import load_dotenv

load_dotenv()

print(f"APP_MODE value: {os.getenv('APP_MODE')}")
print(f"Current directory: {os.getcwd()}")

class Api:
    def get_name(self):
        return socket.gethostname()

def run_pywebview():
    app_mode = os.getenv('APP_MODE', 'production').lower()

    if app_mode == 'development':
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
    webview.start()

if __name__ == '__main__':
    run_pywebview()