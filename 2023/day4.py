import typer
from typing_extensions import Annotated
from pathlib import Path

app = typer.Typer()


class ScratchCard:
    def __init__(self,
                 card_num: int,
                 winning_numbers: list[int],
                 have_numbers: list[int]):
        self.card_num = card_num
        self.winning_numbers = winning_numbers
        self.have_numbers = have_numbers

    def winners(self) -> int:
        return len([v for v in self.have_numbers if v in self.winning_numbers])

    def score(self) -> int:
        return pow(2, winners - 1) if (winners := self.winners()) > 0 else 0


def parse_file(input_file: Path):
    cards = []
    with input_file.open('r') as fp:
        for line in fp:
            cardnumbers = line.split(':')[1].split('|')
            cards.append(
                ScratchCard(
                    len(cards),
                    cardnumbers[0].split(),
                    cardnumbers[1].split()
                    )
                )

    return cards


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
    cards = parse_file(input_file)
    print(sum([card.score() for card in cards]))
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
    cards = parse_file(input_file)
    won_cards = 0
    card_queue = []

    card_queue += cards
    try:
        while card := card_queue.pop():
            won_cards += 1
            for n in range(card.card_num + 1,
                           card.card_num + 1 + card.winners()
                           ):
                card_queue.append(cards[n])
    except IndexError:
        pass

    print(won_cards)
    return 0
