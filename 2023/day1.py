import typer
import re
import os
from typing_extensions import Annotated
from pathlib import Path

TEXT_NUMS = ["IGNOREME","one","two","three","four","five","six","seven","eight","nine"]

app = typer.Typer()

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
    total = 0
    with input_file.open('r') as fp:
        for line in fp:
            numbers = [c for c in line if c.isnumeric()]
            if len(numbers) == 0:
                continue
            line_num = int(f'{numbers[0]}{numbers[-1]}')
            total += line_num
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
    total = 0
    with input_file.open('r') as fp:
        for line in fp:
            numbers = []
            for match in re.finditer(r'(?i)(?=(\d|one|two|three|four|five|six|seven|eight|nine))', line):
                if match[1].isnumeric():
                    numbers.append(int(match[1]))
                else:
                    numbers.append(TEXT_NUMS.index(match[1]))

            if len(numbers) == 0:
                continue

            line_num = int(f'{numbers[0]}{numbers[-1]}')
            total += line_num
    print(total)
    return 0