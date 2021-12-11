import { IDay } from "../IDay";

export class Day6 implements IDay {
    private input: string;
    private fishies: number[] = [];

    constructor(input: string) {
        this.input = input;
    }
    private initFishies() {
        this.fishies = Array(9).fill(0);
        for (let timer of this.input.trim().split(',')) {
            this.fishies[Number(timer)]++;
        }
    }
    private simFishies(cycles: number): number {
        for (let n = 0; n < cycles; n++) {
            let zeroFish = this.fishies[0];

            this.fishies = this.fishies.map((_, timer) => this.fishies[timer + 1]);

            // generate new fish at 8 for each fish at zero
            this.fishies[8] = zeroFish;

            // reset the zero fish to 6 (add to any existing fish at 6)
            this.fishies[6] += zeroFish;
        }
        return this.fishies.reduce(
            (prev,curr) => (prev + curr), 0
        );
    }
    step1(): number {
        this.initFishies();
        return this.simFishies(80);
    }
    step2(): number {
        this.initFishies();
        return this.simFishies(256);
    }
}