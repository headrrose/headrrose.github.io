# lowercase_filename.py

from pathlib import path

folder = Path(__file__).parent
folder.mkdir('out')
for file in folder.itrdir():
    if file.is_file():
        old_name = file.parent
        new_name = old_name / 'out' / file.name.lower()
        file.rename(new_name)
