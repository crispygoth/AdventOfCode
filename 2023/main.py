import typer
from importlib import import_module
from importlib.util import find_spec

app = typer.Typer()
app.name = 'aoc'

for day in range(1, 26):
    module_name = f'day{day:d}'
    if not find_spec(module_name):
        break
    day = import_module(module_name)
    app.add_typer(day.app, name=module_name)

if __name__ == "__main__":
    app()
