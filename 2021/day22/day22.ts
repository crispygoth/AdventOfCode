import { IDay } from "../IDay";

class Range {
    constructor(
        private x1: number,
        private x2: number,
        private y1: number,
        private y2: number,
        private z1: number,
        private z2: number
    ) {
    }

    limit(limitx: number, limity: number, limitz: number): Range {
        return new Range(
            Math.max(-1 * limitx, this.x1),
            Math.min(limitx, this.x2),
            Math.max(-1 * limity, this.y1),
            Math.min(limity, this.y2),
            Math.max(-1 * limitz, this.z1),
            Math.min(limitz, this.z2),
        );
    }

    public get volume(): number {
        return (1 + this.x2 - this.x1) * (1 + this.y2 - this.y1) * (1 + this.z2 - this.z1);
    }

    intersects(otherRange: Range): boolean {
        return (this.x1 <= otherRange.x2 && this.x2 >= otherRange.x1) &&
               (this.y1 <= otherRange.y2 && this.y2 >= otherRange.y1) &&
               (this.z1 <= otherRange.z2 && this.z2 >= otherRange.z1);
    }

    intersection(otherRange: Range): Range|undefined {
        if (!this.intersects(otherRange)) {
            return undefined;
        }
        return new Range(
            Math.max(this.x1, otherRange.x1),
            Math.min(this.x2, otherRange.x2),
            Math.max(this.y1, otherRange.y1),
            Math.min(this.y2, otherRange.y2),
            Math.max(this.z1, otherRange.z1),
            Math.min(this.z2, otherRange.z2)
        );
    }

    *[Symbol.iterator](): Generator<string> {
        for (let x = this.x1; x <= this.x2; x++) {
            for (let y = this.y1; y <= this.y2; y++) {
                for (let z = this.z1; z <= this.z2; z++) {
                    yield [x, y, z].join(',');
                }
            }
        }
    }
}

export class Day22 implements IDay {
    private rebootSteps: [boolean, Range][];

    constructor(input: string) {
        this.rebootSteps = input.trim().split("\n").map(line => {
            const matches = line.match(/^(on|off) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)$/);
            if (!matches) {
                throw new Error('unparsable line: ' + line);
            }
            return [matches[1] == 'on', new Range(
                Math.min(Number(matches[2]), Number(matches[3])),
                Math.max(Number(matches[2]), Number(matches[3])),
                Math.min(Number(matches[4]), Number(matches[5])),
                Math.max(Number(matches[4]), Number(matches[5])),
                Math.min(Number(matches[6]), Number(matches[7])),
                Math.max(Number(matches[6]), Number(matches[7]))
            )];
        });
    }
    step1(): number {
        const reactor: Map<string, boolean> = new Map();
        for (const pos of new Range(-50, -50, -50, 50, 50, 50)) {
            reactor.set(pos, false);
        }
        for (const [onOff, range] of this.rebootSteps) {
            for (const pos of range.limit(50,50,50)) {
                reactor.set(pos, onOff);
            }
        }

        return [...reactor.values()].reduce((a,v) => (v ? ++a : a), 0);
    }
    step2(): number {
        let rangesAndIntersects: [boolean, Range][] = [];

        for (const [newOnOff, newRange] of this.rebootSteps) {
            let newRanges: [boolean, Range][] = [];
            for (const [existingOnOff, existingRange] of rangesAndIntersects) {
                let intersection = existingRange.intersection(newRange);
                if (intersection) {
                    newRanges.push([!existingOnOff, intersection]);
                }
            }

            if (newOnOff) {
                newRanges.push([newOnOff, newRange]);
            }
            rangesAndIntersects.push(...newRanges);
        }

        return rangesAndIntersects.map(([onOff, range]) => range.volume * (onOff ? 1 : -1)).reduce((a,v) => a+v, 0);
    }

}