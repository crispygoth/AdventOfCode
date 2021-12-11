import { IDay } from "../IDay";

export class Day11 implements IDay {
    private octopuses: number[][] = [];
    private input: string;

    constructor(input: string) {
        this.input = input;
    }
    private initOctos() {
        this.octopuses = this.input.trim().split("\n").map(
            l => l.split('').map(n => Number(n))
        );
    }
    private step(): number {
        var flashes = 0;

        const incOcto = (x: number, y: number) => {
            if (++this.octopuses[x][y] == 10) {
                flashes++;

                if (x > 0) {
                    incOcto(x - 1, y);
                    if (y > 0) {
                        incOcto(x - 1, y - 1);
                    }
                    if (y < this.octopuses[x].length - 1) {
                        incOcto(x - 1, y + 1);
                    }
                }
                if (x < this.octopuses.length - 1) {
                    incOcto(x + 1, y);
                    if (y > 0) {
                        incOcto(x + 1, y - 1);
                    }
                    if (y < this.octopuses[x].length - 1) {
                        incOcto(x + 1, y + 1);
                    }
                }

                if (y > 0) {
                    incOcto(x, y - 1);
                }
                if (y < this.octopuses[x].length - 1) {
                    incOcto(x, y + 1);
                }
            }
        }

        this.octopuses.forEach(
            (row, x) => row.forEach(
                (_, y) => incOcto(x,y)
            )
        );

        this.octopuses = this.octopuses.map(row => row.map(v => v > 9 ? 0 : v));
        return flashes;
    }
    step1(): number {
        let flashes = 0;
        this.initOctos();
        for (let i = 0; i < 100; i++) {
            flashes += this.step();
        }
        return flashes;
    }
    step2(): number {
        let step = 0;
        this.initOctos();
        while (++step) {
            if (this.step() == 100) {
                return step; 
            }
        }
        return 0;
    }
}