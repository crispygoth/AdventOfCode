import { NumberLiteralType } from "typescript";
import { IDay } from "../IDay";

type Point = {
    x: number,
    y: number,
    cost: number
}

export class Day15 implements IDay {
    private points: Point[][];
    private maxX: number;
    private maxY: number;

    constructor(input: string) {
        this.points = input.trim().split("\n").map(
            (row, x) => (row.trim().split('').map(
                (cost, y) => { 
                    return { x: Number(x), y: Number(y), cost: Number(cost) }; 
                })
            )
        );
        this.maxX = this.points.length - 1;
        this.maxY = this.points[0].length - 1;
    }
    private neighbours(graph: Point[], point: Point): Point[] {
        return graph.filter((otherpoint) => {
            if (point.x == otherpoint.x) {
                return (point.y == otherpoint.y - 1) || (point.y == otherpoint.y + 1);
            } else if (point.y == otherpoint.y) {
                return (point.x == otherpoint.x - 1) || (point.x == otherpoint.x + 1);
            } else {
                return false;
            }
        });
    }
    private dijkstra(graph: Point[], start: Point, end: Point): Point[] {
        const unvisited = new Set<Point>(graph);
        const distances = new Map<Point, number>();
        const previous = new Map<Point, Point>();

        for (const point of graph) {
            distances.set(point, Infinity);
        }

        distances.set(start, 0);
        
        while (unvisited.size) {
            const nextPoint = [...unvisited].reduce((min, curr) => distances.get(min)! < distances.get(curr)! ? min : curr);
            const pointDistance = distances.get(nextPoint)!;

            unvisited.delete(nextPoint);
            if (nextPoint == end) {
                break;
            }
            
            for (const neighbour of this.neighbours([...unvisited.values()], nextPoint)) {
                const costFromRoot = pointDistance + neighbour.cost;
                if (costFromRoot < distances.get(neighbour)!) {
                    distances.set(neighbour, costFromRoot);
                    previous.set(neighbour, nextPoint);
                }
            }
        }
        const result: Point[] = [];
        let current: Point|undefined = end;
        if (previous.has(current) || current == start) {
            while (current) {
                result.push(current);
                current = previous.get(current);
            }
        }
        return result.reverse();
    }
    step1(): number {
        return this.dijkstra(
            this.points.reduce ((result, row) => [...row, ...result], []), this.points[0][0], this.points[this.maxX][this.maxY]
        ).reduce(
            (acc, p) => (p.x + p.y == 0) ? acc : (acc + p.cost), 0
        );
    }
    fiveByFiveify(points: Point[], xSkip: number, ySkip: number): Point[] {
        const fullMap: Point[] = [];
        for (const point of points) {
            for (let mx = 0; mx < 5; mx++) {
                for (let my = 0; my < 5; my++) {
                    fullMap.push({ x: point.x + (xSkip * mx), y: point.y + (ySkip * my), cost: 1 + ((point.cost + mx + my - 1) % 9) });
                }
            }
        }
        return fullMap;
    }
    step2(): number {
        const fullMap: Point[] = this.fiveByFiveify(
            this.points.reduce ((result, row) => [...row, ...result], []),
            this.maxX + 1,
            this.maxY + 1
        );
        const startPoint = fullMap.reduce((result, curr) => (result.x > curr.x || result.y > curr.y) ? curr : result);
        const endPoint = fullMap.reduce((result, curr) => (result.x < curr.x || result.y < curr.y) ? curr : result);
        return this.dijkstra(fullMap, startPoint, endPoint).reduce(
            (acc, p) => (p.x + p.y == 0) ? acc : (acc + p.cost), 0
        );
    }

}