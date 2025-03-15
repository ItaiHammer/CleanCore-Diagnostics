import eel
import psutil
import socket

eel.init('web')

@eel.expose
def get_system_info():
    return {
        "cpu": psutil.cpu_percent(interval=1),
        "ram": psutil.virtual_memory().percent,
        "disk": psutil.disk_usage('/').percent
    }

@eel.expose
def get_name():
    return socket.gethostname()

eel.start('index.html', app_mode=True, size=(1440, 1024), mode='edge')
