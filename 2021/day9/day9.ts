import { basename } from "path/posix";
import { IDay } from "../IDay";

type Point = {x:number, y:number, value:number};
type Basin = Set<Point>;

export class Day9 implements IDay {
    private heightMap: Point[][];

    constructor(input: string) {
        this.heightMap = input.trim().split("\n").map(
            (l,x) => l.split('').map((v,y) => { return {x:x, y:y, value:Number(v)}; })
        );
    }
    private neighbours(point: Point): Point[] {
        const result: Point[] = [];

        if (point.x > 0) {
            result.push(this.heightMap[point.x - 1][point.y]);
        }
        if (point.x < this.heightMap.length - 1) {
            result.push(this.heightMap[point.x + 1][point.y]);
        }
        
        if (point.y > 0) {
            result.push(this.heightMap[point.x][point.y - 1]);
        }
        if (point.y < this.heightMap[point.x].length - 1) {
            result.push(this.heightMap[point.x][point.y + 1]);
        }

        return result;
    }
    private findLowPoints(): Point[] {
        const result = [];
        for (const [x, row] of this.heightMap.entries()) {
            for (const [y, point] of row.entries()) {
                if (this.neighbours(point).every(p => p.value > point.value)) {
                    result.push(point);
                }
            }
        }
        return result;
    }
    private findBasins(): Basin[] {
        return this.findLowPoints().map(lowPoint => {
            const basin = new Set<Point>();

            const neighboursInBasin = (point: Point) =>
                this.neighbours(point).filter(neighbour => !(
                    basin.has(neighbour) || neighbour.value == 9
                ));

            const collectNeighbours = (point: Point) => {
                basin.add(point);

                neighboursInBasin(point).forEach(n => { collectNeighbours(n); })
            }
            collectNeighbours(lowPoint);
            return basin;
        });
    } 
    step1(): number {
        return this.findLowPoints().reduce((prev,curr) => prev+(curr.value + 1),0);
    }
    step2(): number {
        const basins = this.findBasins().map(v => v.size).sort((a,b) => b - a);
        return basins.slice(0,3).reduce((prev,curr) => prev * curr, 1);
    }
}