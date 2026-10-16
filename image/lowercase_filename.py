from pathlib import Path

folder = Path(__file__).parent

out_folder = folder / 'out'
out_folder.mkdir(exist_ok=True)

for file in folder.iterdir():
    if file.is_file() and file.name != 'lowercase_filename.py':
        new_name = out_folder / file.name.lower()
        file.rename(new_name)

print("Done! Check the 'out' folder for your lowercased images.")