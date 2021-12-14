import { IDay } from "../IDay";

export class Day14 implements IDay {
    private startState: Map<string, number>;
    private polymerPairs: Map<string, string>;
    private lastChar: string = '';

    constructor(input: string) {
        const inputParts = input.split(/^$/m);
        this.startState = new Map<string, number>();

        const startStateChars = inputParts[0].trim().split('');
        startStateChars.forEach((ch, i) => {
            if (i < startStateChars.length - 1)            {
                this.startState.set(ch + startStateChars[i + 1], (this.startState.get(ch + startStateChars[i + 1]) ?? 0) + 1);
            } else {
                this.lastChar = ch;
            }
        });

        this.polymerPairs = new Map<string, string>(
            inputParts[1].trim().split("\n").map(v => {
                const line = v.split(" -> ", 2);
                return [line[0], line[1]];
            })
        );
    }
    private processPairInsertion(polymer: Map<string, number>): Map<string, number> {
        const result = new Map<string, number>();

        for (const [pairChars, pairCount] of polymer.entries()) {
            const splitChars = pairChars.split('');

            for (const ch of [splitChars[0] + this.polymerPairs.get(pairChars), this.polymerPairs.get(pairChars) + splitChars[1]]) {
                result.set(ch, pairCount + (result.get(ch) ?? 0));
            }
        }
        
        return result;
    }
    step1(): number {
        return this.runProcess(10);
    }
    private runProcess(times: number): number {
        let polymer = this.startState;
        for (let i = 0; i < times; i++) {
            polymer = this.processPairInsertion(polymer);
        }
        const letterFreq = new Map<string, number>();
        letterFreq.set(this.lastChar, 1);
        for (const [pairChars, pairCount] of polymer.entries()) {
            letterFreq.set(pairChars[0], (letterFreq.get(pairChars[0]) ?? 0) + pairCount);
        }
        return Math.max(...letterFreq.values()) - Math.min(...letterFreq.values());
    }

    step2(): number {
        return this.runProcess(40);
    }
}