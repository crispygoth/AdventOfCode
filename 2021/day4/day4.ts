import { IDay } from "../IDay";
import { Board } from "./board";

export class Day4 implements IDay {
    private calledNumbers: number[];
    private boards: Board[] = [];

    constructor(input: string) {
        var inputBlocks: string[];

        inputBlocks = input.split(/^\s*$/m);
        if (!inputBlocks) {
            throw new Error('invalid input');
        }
        this.calledNumbers = inputBlocks
            ?.shift()
            ?.trim()
            ?.split(",")
            ?.map(v => Number(v))
            ?? [];
        this.boards = inputBlocks.map((boardString: string) => { return new Board(boardString); })
    }
    step1(): number {
        for (let called of this.calledNumbers) {
            this.boards.forEach(board => board.callNumber(called));
            
            let winner = this.boards.find(board => board.areYouWinningSon());
            if (winner) {
                return winner.unmarkedSum() * called; 
            }
        }

        throw new Error('now nobody wins');
    }
    step2(): number {
        for (let called of this.calledNumbers) {
            this.boards.forEach(board => board.callNumber(called));
            
            if (this.boards.length == 1 && this.boards[0].areYouWinningSon()) {
                return this.boards[0].unmarkedSum() * called;
            }

            this.boards = this.boards.filter(v => !v.areYouWinningSon());
        }

        throw new Error('now nobody wins');
    }
}