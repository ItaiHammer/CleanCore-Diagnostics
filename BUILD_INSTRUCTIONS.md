# Building the Executable

To build the executable for the CleanCore project, follow these steps:

1. **Install Dependencies**:
   Ensure you have all dependencies installed. You can install them using pip:
   ```sh
   pip install -r requirements.txt
   ```

2. **Navigate to the Project Directory**:
   Ensure you are in the root project directory:
   ```sh
   cd path\to\project\root
   ```

3. **Run PyInstaller**:
   Use PyInstaller to build the executable:
   ```sh
   pyinstaller CleanCore.spec
   ```

4. **Locate the Executable**:
   After the build process completes, you can find the executable in the `dist` directory inside your project folder.

## Notes

- Ensure all dependencies and required files are correctly specified.
- You can customize the build process by modifying the PyInstaller command as needed.

For more information on PyInstaller, refer to the [PyInstaller documentation](https://pyinstaller.readthedocs.io/en/stable/).
