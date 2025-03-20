import os
import json

CONFIG_FILE = 'config.json'

class ConfigManager:
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
