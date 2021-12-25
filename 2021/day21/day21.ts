import { IDay } from "../IDay";

class Die {
    private current = 0;
    private _rolls = 0;

    *roll(): Generator<number> {
        while (true) {
            this._rolls++;
            yield (1 + (this.current++ % 100));
        }
    }

    public get rolls(): number {
        return this._rolls;
    }
}

const ROLL_FREQUENCIES = [
    0, 0, 0,
    1, 3, 6, 7, 6, 3, 1
]

export class Day21 implements IDay {
    constructor(private player1Start: number, private player2Start: number) { }

    step1(): number {
        let pos = [this.player1Start, this.player2Start],
            score = [0, 0];
        let currPlayer = 0;
        const die = new Die();
        const dieRoll = die.roll();

        while (score.every(v => v < 1000)) {
            const roll = dieRoll.next().value + dieRoll.next().value + dieRoll.next().value;
            pos[currPlayer] = 1 + (((pos[currPlayer] - 1) + roll) % 10);
            score[currPlayer] += pos[currPlayer];

            currPlayer = (++currPlayer) % 2;
        }

        return score.filter(v => v < 1000).pop()! * die.rolls;
    }
    step2(): number {

        const universeRecurse = (currPlayer: number, pos: [number, number], score: [number, number]): [number, number] => {
            const nextPlayer = (currPlayer + 1) % 2;
            let wins: [number, number] = [0,0];
            let newPos: [number,number] = [...pos];
            let newScore: [number,number] = [...score];

            for (let roll = 3; roll < 10; roll++) {
                const rollFreq = ROLL_FREQUENCIES[roll];

                newPos[currPlayer] = 1 + (((pos[currPlayer] - 1) + roll) % 10);
                newScore[currPlayer] = score[currPlayer] + newPos[currPlayer];

                if (newScore[currPlayer] >= 21) {
                    wins[currPlayer] += rollFreq;
                } else {
                    let subWins = universeRecurse(nextPlayer, newPos, newScore);
                    wins[0] += subWins[0] * rollFreq;
                    wins[1] += subWins[1] * rollFreq;
                }
            }
            return wins;    
        }

        const wins = universeRecurse(0, [this.player1Start, this.player2Start], [0,0]);
        return Math.max(...wins);
    }

}