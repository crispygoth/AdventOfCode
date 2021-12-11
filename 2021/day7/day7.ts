import { mean, median } from "stats-lite";
import { IDay } from "../IDay";

export class Day7 implements IDay {
    private crabPositions: number[] = [];

    constructor(input: string) {
        this.crabPositions = input.trim().split(',').map(s => Number(s));
    }
    step1(): number {
        const medianPosition = median(this.crabPositions);
        return this.crabPositions.map(pos => Math.abs(medianPosition - pos)).reduce((prev,curr) => prev+curr, 0);
    }
    private step2fuel(targetPos: number, currPos: number): number {
        const n = Math.abs(targetPos - currPos);
        return (n * (n + 1)) / 2;
    }
    step2(): number {
        const meanFloorPosition = Math.floor(mean(this.crabPositions));
        const meanCeilPosition = Math.ceil(mean(this.crabPositions));

        // sample data gave correct result with ceil, but turns out the actual input data required floor
        // even though the decimal part was just over .5 (so not just a simple rounding operation)
        // rather than over-think this, just try both and return the minimum
        return Math.min(
            this.crabPositions.map(pos => this.step2fuel(meanFloorPosition, pos)).reduce((prev,curr) => prev+curr, 0),
            this.crabPositions.map(pos => this.step2fuel(meanCeilPosition, pos)).reduce((prev,curr) => prev+curr, 0)
        );  
    }
}