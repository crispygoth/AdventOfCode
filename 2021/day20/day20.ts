import { IDay } from "../IDay";

type ImageData = Map<string, boolean>;

const OFFSETS = [
    [1, 1], [1, 0], [1, -1],
    [0, 1], [0, 0], [0, -1],
    [-1, 1], [-1, 0], [-1, -1],
]

export class Day20 implements IDay {
    private algo: Map<number, boolean>;
    private image: ImageData;

    constructor(input: string) {
        const inputLines = input.trim().split("\n");
        this.algo = new Map([...inputLines[0].trim()].map((ch, i) => [i, ch == '#']));
        this.image = new Map(inputLines.slice(2)
            .map((row, rowNum): [string, boolean][] => {
                return [...row].map((ch, colNum): [string, boolean] => [[rowNum, colNum].join(','), ch == '#'])
            })
            .reduce((acc, val) => acc.concat(val), [])
        );
    }
    enhance(image: ImageData, oobValue: boolean): ImageData {
        const result: ImageData = new Map<string, boolean>();
        const [[minX, minY], [maxX, maxY]] = this.limits(image);

        for (let x = minX - 10; x <= maxX + 10; x++) {
            for (let y = minY - 10; y <= maxY + 10; y++) {
                let value = 0;

                for (const [bit, [xoffset, yoffset]] of OFFSETS.entries()) {
                    const bitOn = image.get([x + xoffset, y + yoffset].join(',')) ?? oobValue;
                    if (bitOn) {
                        value = value | (1 << bit);
                    }
                }
                result.set([x, y].join(','), this.algo.get(value) ?? false);
            }
        }
        return result;
    }
    limits(image: ImageData): [[number, number], [number, number]] {
        const [minX, maxX] = [...image.keys()].reduce((prev, v) => { 
            const x = Number(v.split(',')[0]);
            return [ prev[0] < x ? prev[0] : x, prev[1] > x ? prev[1] : x ];
        }, [0,0]);
        const [minY, maxY] = [...image.keys()].reduce((prev, v) => { 
            const x = Number(v.split(',')[1]);
            return [ prev[0] < x ? prev[0] : x, prev[1] > x ? prev[1] : x ];
        }, [0,0]);

        return [[minX, minY], [maxX, maxY]];
    }
    imageToString(image: ImageData): string {
        const [[minX, minY], [maxX, maxY]] = this.limits(image);
        let result: string = '';

        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                result += image.get([x, y].join(',')) ? '#' : '.';
            }
            result += "\n";
        }

        return result;
    }
    step1(): number {
        const pass1 = this.enhance(this.image, this.algo.get(511)!);
        const pass2 = this.enhance(pass1, this.algo.get(0)!);

        return [...pass2.values()].reduce((acc, val) => val ? acc + 1 : acc, 0);
    }
    step2(): number {
        let image = this.image;

        for (let n = 0; n < 50; n++) {
            image = this.enhance(image, this.algo.get(n%2 ? 0 : 511)!);
        }

        return [...image.values()].reduce((acc, val) => val ? acc + 1 : acc, 0);
    }

}