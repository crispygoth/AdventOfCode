import { IDay } from "../IDay";

const ROOM_POSITIONS = [2, 4, 6, 8];

export class MapState {
    private _estimatedCostToEnd: number;

    constructor(
        private hallway: string[],
        private sideRooms: string[][],
        private _cost: number
    ) {
        // 100 100 100 100 100 100 100 100 100 100 100100100100100100100100100100100100100100100
        if (this.isEndState()) {
            this._estimatedCostToEnd = 0;
        } else {
            this._estimatedCostToEnd = this.hallway.reduce(
                (a, v, pos) => (v == '' ? a : a + this.calculateCost(v, this.destRoom(v), this.sideRooms[this.destRoom(v)][0] == '', pos)),
                0
            ) + this.sideRooms.map(
                (room, roomNumber) => {
                    if (room.every(v => v === '') || room.every(v => this.destRoom(v) == roomNumber)
                    ) {
                        return 0;
                    }

                    if (this.destRoom(room[0]) !== roomNumber) {
                        return room.map((v, i) => v == '' ? 1 : this.calculateCost(v, roomNumber, i == 0, this.destRoom(v))).reduce((a, v) => a + v, 0);
                    } else if (room[1] != '' && this.destRoom(room[1]) !== roomNumber) {
                        return this.calculateCost(room[1], roomNumber, false, this.destRoom(room[1]));
                    } else {
                        return 0;
                    }
                }
            ).reduce((a, v) => a + v, 0);
        }
    }

    private destRoom(amphipod: string): number {
        return amphipod.charCodeAt(0) - 'A'.charCodeAt(0);
    }

    private calculateCost(amphipod: string, room: number, roomBottom: boolean, hallwayPos: number) {
        const multiplier = Math.pow(10, this.destRoom(amphipod));
        const hallwayToRoomPos = Math.abs(hallwayPos - ROOM_POSITIONS[room]);
        const intoRoom = roomBottom ? 2 : 1;

        return (hallwayToRoomPos + intoRoom) * multiplier;
    }

    *[Symbol.iterator]() {
        for (const [hallPosition, contents] of this.hallway.entries()) {
            if (contents == '') {
                continue;
            }

            const wantRoom = this.destRoom(contents);
            const newSideRooms = this.sideRooms.map(a => a.slice());
            let roomBottom: boolean;

            if (!this.pathIsFree(hallPosition, wantRoom)) {
                // something in the way
                continue;
            }

            if (this.sideRooms[wantRoom][0] == '') { // room empty
                newSideRooms[wantRoom][0] = contents;
                roomBottom = true;
            } else if (this.sideRooms[wantRoom][1] == '' && this.sideRooms[wantRoom][0] == contents) { // sharing room with right thing
                newSideRooms[wantRoom][1] = contents;
                roomBottom = false;
            } else {
                continue;
            }

            yield new MapState(
                this.hallway.map((v, k) => (k == hallPosition ? '' : v)),
                newSideRooms,
                this._cost + this.calculateCost(contents, wantRoom, roomBottom, hallPosition)
            );
        }

        for (const [roomNumber, sideRoom] of this.sideRooms.entries()) {
            if (
                (sideRoom[0] == '' && sideRoom[1] == '') ||
                (this.destRoom(sideRoom[0]) == roomNumber && this.destRoom(sideRoom[1]) == roomNumber)
            ) {
                continue;
            }

            let roomBottom: boolean;
            let amphipod: string;
            let newSideRooms: string[][] = this.sideRooms.map(a => a.slice());

            if (sideRoom[1] !== '') { // move top one out to hallway, we know either top or bottom pos is wrong (from the start of loop check)
                roomBottom = false;
                amphipod = sideRoom[1];
                newSideRooms[roomNumber][1] = '';
            } else if (sideRoom[1] === '' && this.destRoom(sideRoom[0]) !== roomNumber) { // move bottom one out to hallway
                roomBottom = true;
                amphipod = sideRoom[0];
                newSideRooms[roomNumber][0] = '';
            } else {
                continue;
            }

            const wantRoom = this.destRoom(amphipod);
            if (
                (this.sideRooms[wantRoom][0] == ''
                || (this.sideRooms[wantRoom][0] == amphipod && this.sideRooms[wantRoom][1] == ''))
                && this.pathIsFree(ROOM_POSITIONS[roomNumber], wantRoom)
            ) {
                // move straight from current room into destination room
                const newSideRooms2 = newSideRooms.map(a => a.slice());
                const moveToBottom = this.sideRooms[wantRoom][0] == '';

                newSideRooms2[wantRoom][moveToBottom ? 0 : 1] = amphipod;
                yield new MapState(
                    this.hallway.slice(),
                    newSideRooms2,
                    this.cost +
                    this.calculateCost(amphipod, roomNumber, roomBottom, ROOM_POSITIONS[roomNumber]) +
                    this.calculateCost(amphipod, wantRoom, moveToBottom, ROOM_POSITIONS[roomNumber])
                );
            }

            for (let possibleHallPos = 0; possibleHallPos < this.hallway.length; possibleHallPos++) {
                if (this.hallway[possibleHallPos] !== '' || ROOM_POSITIONS.includes(possibleHallPos) || !this.pathIsFree(possibleHallPos, roomNumber)) {
                    continue;
                }

                const newHallway = [...this.hallway];
                newHallway[possibleHallPos] = amphipod;
                yield new MapState(
                    newHallway,
                    newSideRooms,
                    this._cost + this.calculateCost(amphipod, roomNumber, roomBottom, possibleHallPos)
                );
            }
        }
    }

    private pathIsFree(hallPosition: number, wantRoom: number): boolean {
        return this.hallway.slice(
            Math.min(hallPosition + 1, ROOM_POSITIONS[wantRoom]),
            Math.max(hallPosition - 1, ROOM_POSITIONS[wantRoom]) + 1
        ).filter(v => v !== '').length === 0;
    }

    public toString(): string {
        let first: boolean = true;
        let s: string = "#############\n" +
            '#' + this.hallway.map(v => v == '' ? '.' : v).join('') + "\n";

        for (let i = this.sideRooms[0].length - 1; i >= 0; i--) {
            s += first ? '###' : '  #';
            s += this.sideRooms.map(v => (v[i] + '.').substring(0, 1)).join('#');
            s += first ? "###\n" : "#\n";
            first = false;
        }
        
        return s + "  #########\n";
    }

    public equals(otherState: MapState): boolean {
        return otherState.toString() == this.toString();
    }

    public isEndState(): boolean {
        return this.sideRooms.every(
            (roomContents, roomNumber) => roomContents.every(v => roomNumber == this.destRoom(v))
        );
    }

    public get estimateCostToEnd(): number {
        return this._estimatedCostToEnd;
    }

    public get cost(): number {
        return this._cost;
    }
}

export class Day23 implements IDay {
    private startState: MapState;

    constructor(input: string) {
        const inputLines = input.trim().split("\n");
        const hallwaySize = [...inputLines[1]].filter(v => v == '.').length;
        const sideRooms: string[][] = [[], [], [], []];

        for (const [roomNumber, pos] of ROOM_POSITIONS.entries()) {
            sideRooms[roomNumber][1] = inputLines[2][pos + 1];
            sideRooms[roomNumber][0] = inputLines[3][pos + 1];
        }

        this.startState = new MapState(
            new Array<string>(hallwaySize).fill(''),
            sideRooms,
            0
        );
    }

    private findPath(state: MapState): MapState[] | undefined {
        let openList: MapState[] = [state];
        let cameFrom: Map<MapState, MapState> = new Map();
        let gScores: Map<string, number> = new Map();
        let fScores: Map<string, number> = new Map();

        gScores.set(state.toString(), 0);
        fScores.set(state.toString(), state.estimateCostToEnd);

        while (openList.length) {
            const currentNode = openList.sort(
                (a, b) => (fScores.get(a.toString()) ?? Infinity) - (fScores.get(b.toString()) ?? Infinity)
            ).shift()!;
            //console.log(currentNode.toString(), currentNode.estimateCostToEnd, openList.length)
            if (currentNode.isEndState()) {
                const finalPath = [currentNode];
                let pathNode = currentNode;
                do {
                    pathNode = cameFrom.get(pathNode)!;
                    finalPath.push(pathNode);
                } while (cameFrom.has(pathNode));
                return finalPath.reverse();
            }

            openList = openList.filter(v => v !== currentNode);
            for (const neighbour of currentNode) {
                if (neighbour.cost < (gScores.get(neighbour.toString()) ?? Infinity)) {
                    cameFrom.set(neighbour, currentNode);
                    gScores.set(neighbour.toString(), neighbour.cost);
                    fScores.set(neighbour.toString(), neighbour.cost + neighbour.estimateCostToEnd);
                    if (!openList.some(v => v.equals(neighbour))) {
                        openList.push(neighbour);
                    }
                }
            }
        }

        throw new Error('no path');
    }

    step1(): number {
        const path = this.findPath(this.startState)!;
        //for (const v of path) { console.log(v.cost, v.toString()); }
        return path.pop()!.cost;
    }
    step2(): number {
        throw new Error("Method not implemented.");
    }

}