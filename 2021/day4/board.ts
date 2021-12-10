export class Board {
    private board: number[][] = [];
    private marked: boolean[][] = [];
    private columns: number;

    constructor(boardString: string) {
        boardString.trim().split("\n").forEach((line: string, lineNum: number) => {
            this.board[lineNum] = [];
            this.marked[lineNum] = [];

            line.trim().split(/\s+/).forEach((value: string, column: number) => {
                this.board[lineNum][column] = Number(value);
                this.marked[lineNum][column] = false;
            })
        })
        this.columns = this.board[0].length;
    }

    callNumber(called: number) {
        this.board.forEach((row, rowNum) => {
            let colNum = row.indexOf(called);
            if (colNum >= 0) {
                this.marked[rowNum][colNum] = true;
            }
        });
    }

    areYouWinningSon(): boolean {
        if (this.marked.some(row => row.every(v => v))) {
            return true;
        } else {
            for (var n: number = 0; n < this.columns; n++) {
                if (this.marked.map(row => row[n]).every(v => v)) {
                    return true;
                }
            }
        }

        return false;
    }

    unmarkedSum(): number {
        return this.board
            .map(
                (row, rowNum) => 
                row.filter((n, colNum) => !this.marked[rowNum][colNum])
                    .reduce((prev, curr) => prev + curr, 0)
            ).reduce((prev, curr) => prev + curr, 0);
    }

    toString(): string {
        return this.board.map(
            (row, rowNum) => row.map(
                (val, colNum) => this.marked[rowNum][colNum] ? "*" + String(val) + "*" : val
            ).join("    ")
        ).join("\n");
    }
}