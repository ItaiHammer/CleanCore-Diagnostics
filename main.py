import webview
import socket
import os
from dotenv import load_dotenv

load_dotenv()

print(f"PY_ENV value: {os.getenv('PY_ENV')}")
print(f"Current directory: {os.getcwd()}")
print(f"File location: {os.path.abspath(__file__)}")

class Api:
    def get_name(self):
        return socket.gethostname()

def run_pywebview():
    env = os.getenv('PY_ENV', 'Development').lower()
    
    if env == 'development':
        url = 'http://localhost:3000'
        print("Using development server")
    else:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        build_path = os.path.join(base_dir, 'web', 'index.html')
        print(f"Looking for build at: {build_path}")
        
        if not os.path.exists(build_path):
            print("Production build not found! Falling back to development server")
            url = 'http://localhost:3000'
        else:
            url = f'file:///{build_path}'
            print("Using production build")

    print(f"Final URL: {url}")
    
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