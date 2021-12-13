type Point = { x: number, y: number };
type Axis = 'x' | 'y';
type Fold = { axis: Axis, coord: number };

export class Day13 {
    private dots: Set<Point>;
    private folds: Fold[];

    constructor(input: string) {
        const inputParts = input.trim().split(/^\s*$/m);
        this.dots = new Set<Point>(inputParts[0].trim().split("\n").map(
            v => {
                return { x: Number(v.split(',')[0]), y: Number(v.split(',')[1]) };
            }
        ));
        this.folds = inputParts[1].trim().split("\n").map(
            f => {
                const matches = f.match(/^fold along (x|y)=(\d+)$/);
                if (!matches) {
                    throw new Error("invalid input: " + f);
                }
                return { axis: <Axis>matches[1], coord: Number(matches[2]) };
            }
        )
    }
    private applyFold(dots: Set<Point>, fold: Fold) {
        return new Set([...dots].map(dot => {
            if (dot[fold.axis] > fold.coord) {
                dot[fold.axis] = fold.coord - (dot[fold.axis] - fold.coord);
            }
            return dot;
        })
        .filter(
            (dot, i, dots) => i == dots.findIndex(
                otherdot => dot.x == otherdot.x && dot.y == otherdot.y
            )
        ));
    }
    step1(): number {
        const folded = this.applyFold(this.dots, this.folds[0]);
        return folded.size;
    }
    step2(): string {
        let folded = this.dots;
        for (const fold of this.folds) {
            folded = this.applyFold(folded, fold);
        }
        const maxX = Math.max(...[...folded].map(v => v.x));
        const maxY = Math.max(...[...folded].map(v => v.y));
        let s = '';
        for (let y = 0; y <= maxY; y++) {
            for (let x = 0; x <= maxX; x++) {  
                s += [...folded].some(dot => (dot.x == x && dot.y == y)) ? "#" : ".";
            }
            s += "\n";
        }

        return s;
    }
}