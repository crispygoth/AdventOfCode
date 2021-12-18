import { IDay } from "../IDay";

type Point = { x: number, y: number };

class Probe {
    private position: Point = { x: 0, y: 0 };
    private _highPoint = { ...this.position };

    constructor(
        private vx: number,
        private vy: number
    ) {
    }

    public get highPoint(): Point {
        return this._highPoint;
    }

    public tick() {
        this.position.x += this.vx;
        this.position.y += this.vy;

        if (this.position.y > this._highPoint.y) {
            this._highPoint = { ...this.position };
        }

        if (this.vx) {
            this.vx -= (this.vx > 0) ? 1 : -1;
        }

        this.vy--;
    }

    public targetCompare(start: Point, end: Point): number {
        if (this.position.x > end.x || this.position.y < start.y) {
            return 1;
        } else if (
            this.position.x >= start.x && this.position.x <= end.x
            && this.position.y >= start.y && this.position.y <= end.y
        ) {
            return 0;
        } else {
            return -1;
        }
    }

    public checkForAHit(start: Point, end: Point): boolean {
        while (true) {
            this.tick();

            const t = this.targetCompare(start, end);

            if (t == 0) {
                return true;
            } else if (t == 1) {
                return false;
            }
        }

    }
}

export class Day17 implements IDay {
    private targetStart: Point;
    private targetEnd: Point;

    constructor(target: string) {
        const matches = target.match(/x=([0-9-]+)..([0-9-]+), y=([0-9-]+)..([0-9-]+)/);

        if (!matches) {
            throw new Error('invalid target: ' + target);
        }

        this.targetStart = { x: Number(matches[1]), y: Number(matches[3]) }
        this.targetEnd = { x: Number(matches[2]), y: Number(matches[4]) }
    }
    step1(): number {
        let maxY: number = 0;
        for (let vy = 0; vy < 1000; vy++) {
            for (let vx = 1; vx < this.targetEnd.x; vx++) {
                const probe = new Probe(vx, vy);
                if (probe.checkForAHit(this.targetStart, this.targetEnd)) {

                    if (probe.highPoint.y > maxY) {
                        maxY = probe.highPoint.y;
                    }
                }
            }
        }

        return maxY;
    }
    step2(): number {
        let hits: number = 0;
        for (let vy = -1000; vy < 1000; vy++) {
            for (let vx = 1; vx <= this.targetEnd.x; vx++) {
                const probe = new Probe(vx, vy);
                if (probe.checkForAHit(this.targetStart, this.targetEnd)) {
                    hits++;
                }
            }
        }

        return hits;
    }

}