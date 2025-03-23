import os
import shutil
import subprocess

root_dir = os.path.abspath(os.path.dirname(__file__))
frontend_dir = os.path.join(root_dir, 'frontend')
web_dir = os.path.join(root_dir, 'web')
build_dir = os.path.join(frontend_dir, 'build')
config_file = os.path.join(root_dir, 'config.json')
default_config_file = os.path.join(root_dir, 'default-config.json')

# Find npm executable in the system's PATH
npm_path = shutil.which('npm')

# Delete the web folder in the root directory
if os.path.exists(web_dir):
    shutil.rmtree(web_dir)
    print('Deleted web folder in the root directory.')

# Navigate to the frontend directory and run npm run build
subprocess.run([npm_path, 'run', 'build'], cwd=frontend_dir, check=True)
print('Ran npm run build in the frontend directory.')

# Rename the build folder to web
shutil.move(build_dir, web_dir)
print('Renamed build folder to web.')

# Replace the config.json file in the root with the default settings
shutil.copyfile(default_config_file, config_file)
print('Replaced config.json with default settings.')
