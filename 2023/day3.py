import typer
from typing_extensions import Annotated
from pathlib import Path
from math import prod

app = typer.Typer()


class EnginePart:
    def __init__(self, part_num: int, symbol: chr, sym_x: int, sym_y: int):
        self.part_num = part_num
        self.symbol = symbol
        self.sym_x = sym_x
        self.sym_y = sym_y


def is_symbol(c: chr):
    return c != '.' and not c.isnumeric()


def parse_file(input_file: Path):
    with input_file.open('r') as fp:
        grid = [[*line.strip()] for line in fp]

    parts = []
    for y in range(0, len(grid)):
        part_num: str = ''
        num_start: int = None

        for x in range(0, len(grid[y])):
            chr = grid[y][x]

            if x < len(grid[y]) - 1:
                next_chr = grid[y][x + 1]
            else:
                next_chr = None

            if chr.isnumeric():
                if num_start is None:
                    num_start = x
                part_num += chr

            if part_num != '' and (next_chr is None or not next_chr.isnumeric()):  # noqa: E501
                min_x = max(0, num_start - 1)
                max_x = min(x + 1, len(grid[y]) - 1)

                if num_start > min_x and is_symbol(grid[y][min_x]):
                    parts.append(
                        EnginePart(int(part_num), grid[y][min_x], min_x, y)
                        )
                elif x < max_x and is_symbol(grid[y][max_x]):
                    parts.append(
                        EnginePart(int(part_num), grid[y][max_x], max_x, y)
                        )
                else:
                    for xs in range(min_x, max_x + 1):
                        if y > 0 and is_symbol(grid[y - 1][xs]):
                            parts.append(
                                EnginePart(
                                    int(part_num),
                                    grid[y - 1][xs],
                                    xs,
                                    y - 1
                                    )
                                )
                            break
                        if y < len(grid) - 1 and is_symbol(grid[y + 1][xs]):
                            parts.append(
                                EnginePart(
                                    int(part_num),
                                    grid[y + 1][xs],
                                    xs,
                                    y + 1
                                    )
                                )
                            break

                part_num = ''
                num_start = None

    return parts


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
    parts = parse_file(input_file)
    print(sum([part.part_num for part in parts]))
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
    parts = parse_file(input_file)
    gears = {}
    for p in ([p for p in parts if p.symbol == '*']):
        if (p.sym_x, p.sym_y) not in gears:
            gears[(p.sym_x, p.sym_y)] = []

        gears[(p.sym_x, p.sym_y)].append(p.part_num)

    total = sum([prod(gearpair) for gearpair in gears.values() if len(gearpair) == 2])
    print(total)
    return 0
