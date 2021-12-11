import { IDay } from "../IDay";

type Token = "(" | ")" | "[" | "]" | "{" | "}" | "<" | ">"
const TokenPairs = new Map<Token, Token>([
    ["(", ")"],
    ["[", "]"],
    ["{", "}"],
    ["<", ">"]
]);

export class Day10 implements IDay {
    private inputLines: string[];

    constructor(input: string) {
        this.inputLines = input.trim().split("\n");
    }
    private parseLine(line: string): Token[] {
        const tokenStack: Token[] = [];
        for (const token of line.split('').map(c => <Token>c)) {
            if (TokenPairs.has(token)) {
                tokenStack.push(token);
            } else {
                const context = tokenStack.pop();
                if (!context) {
                    throw new SyntaxError('Bare ' + token + ' found');
                }
                const expected = TokenPairs.get(context);
                if (token != expected) {
                    throw new SyntaxError(token + ' found, expected ' + expected);
                }
            }
        }
        return tokenStack;
    }
    private scoreValid(line: string): number {
        try {
            this.parseLine(line);
            return 0;
        } catch (e) {
            if (e instanceof SyntaxError) {
                switch ((<SyntaxError>e).message[0]) {
                    case ')': return 3;
                    case ']': return 57;
                    case '}': return 1197;
                    case '>': return 25137;
                }
            }
            return 0;
        }
    }
    private getCompletionStrings(): Token[][] {
        return this.inputLines.map(l => {
            try {
                const openTokens = this.parseLine(l);
                return openTokens.map(t => TokenPairs.get(t)??')').reverse();
            } catch (e) {
            }
            return [];
        }).filter(v => v.length);
    }
    step1(): number {
        return this.inputLines.map(l => this.scoreValid(l)).reduce((prev, curr) => prev + curr);
    }
    step2(): number {
        const scores = this.getCompletionStrings().map(
            cs => cs.map(t => ['(', ')', ']', '}', '>'].indexOf(t)).reduce((prev,curr) => (5 * prev) + curr, 0)
        ).sort((a,b) => a - b);
        return scores[Math.floor(scores.length / 2)];
    }

}