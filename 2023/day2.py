import typer
import re
from typing_extensions import Annotated
from pathlib import Path
from math import prod

app = typer.Typer()


def parse_file(input_file: Path):
    with input_file.open('r') as fp:
        for line in fp:
            lineparts = line.split(':')
            game_id = lineparts[0][4:]
            for game in lineparts[1].split(';'):
                for cubes in game.split(','):
                    matches = re.match(r'\s*(\d+) (red|green|blue)\s*', cubes)
                    if matches is None:
                        raise RuntimeError(f"invalid line '{cubes:s}'")
                    yield {
                        "game_id": game_id,
                        "colour": matches[2],
                        "count": int(matches[1])
                        }


@app.command()
def part1(input_file: Annotated[
        Path,
        typer.Option(
            exists=True,
            file_okay=True,
            dir_okay=False,
            writable=False,
            readable=True,
            resolve_path=True,
        ),
        ]):
    bag_contents = {
        "red": 12,
        "green": 13,
        "blue": 14
    }
    games = {}
    for cubes in parse_file(input_file):
        if cubes["game_id"] not in games:
            games[cubes["game_id"]] = True

        if (bag_contents[cubes["colour"]] < int(cubes["count"])):
            games[cubes["game_id"]] = False
            continue

    total = sum((int(x) for x in games.keys() if games[x]))

    print(total)
    return 0


@app.command()
def part2(input_file: Annotated[
        Path,
        typer.Option(
            exists=True,
            file_okay=True,
            dir_okay=False,
            writable=False,
            readable=True,
            resolve_path=True,
        ),
        ]):
    bag_contents = {}
    total = 0
    last_game_id = None
    for cubes in parse_file(input_file):
        if cubes["game_id"] != last_game_id:
            if last_game_id is not None:
                power = prod(bag_contents.values())
                total += power

            bag_contents = {
                "red": 0,
                "green": 0,
                "blue": 0
            }

        bag_contents[cubes["colour"]] = max(
            bag_contents[cubes["colour"]],
            cubes["count"]
            )
        last_game_id = cubes["game_id"]

    power = prod(bag_contents.values())
    total += power

    print(total)
    return 0
