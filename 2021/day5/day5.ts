import { IDay } from "../IDay";

export type Line = {
    x1: number,
    y1: number,
    x2: number,
    y2: number
};

export class Day5 implements IDay {
    private ventLines: Line[]; 

    constructor(input: string) {
        this.ventLines = input.trim().split("\n").map(
            l => {
                let matches = l.match(/(\d+),(\d+) -> (\d+),(\d+)/);
                if (!matches) {
                    throw new Error('invalid input line: ' + l);
                }
                return { 
                    x1: Number(matches[1]),
                    y1: Number(matches[2]),
                    x2: Number(matches[3]),
                    y2: Number(matches[4])
                };
            }
        )
    }
    private straightLines(): number[][] {
        let ventMap: number[][] = [];

        for (let line of this.ventLines) {
            if (line.x1 != line.x2 && line.y1 != line.y2) {
                continue;
            }
            for (let x = Math.min(line.x1, line.x2); x <= Math.max(line.x1, line.x2); x++) {
                if (!ventMap[x]) {
                    ventMap[x] = [];
                }
                for (let y = Math.min(line.y1, line.y2); y <= Math.max(line.y1, line.y2); y++) {
                    ventMap[x][y] = (ventMap[x][y] ?? 0) + 1;
                }
            }
        }

        return ventMap;
    }
    step1(): number {
        let ventMap = this.straightLines();

        return ventMap.map(
            row => (
                row.filter(v => v > 1).length
            )
        ).reduce(
            (prev, curr) => (prev + curr),
            0
        );
    }
    step2(): number {
        let ventMap = this.straightLines();

        for (let line of this.ventLines) {
            if (line.x1 == line.x2 || line.y1 == line.y2) {
                continue;
            }

            let xdelta = (line.x1 < line.x2) ? 1 : -1;
            let ydelta = (line.y1 < line.y2) ? 1 : -1;
            for (
                let x = line.x1, y = line.y1;
                (xdelta == 1 && x <= line.x2) || (xdelta == -1 && x >= line.x2),
                (ydelta == 1 && y <= line.y2) || (ydelta == -1 && y >= line.y2);
                x += xdelta, y += ydelta
            ) {
                if (!ventMap[x]) {
                    ventMap[x] = [];
                }
                ventMap[x][y] = (ventMap[x][y] ?? 0) + 1;
            }
        }
        return ventMap.map(
            row => (
                row.filter(v => v > 1).length
            )
        ).reduce(
            (prev, curr) => (prev + curr),
            0
        );
   }
}