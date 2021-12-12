import { IDay } from "../IDay";

class Cave {
    private _name: string;
    private _adjacent: Set<Cave> = new Set<Cave>();

    private readonly _isStart: boolean;
    private readonly _isFinal: boolean;
    private readonly _isLarge: boolean;

    constructor(name: string) {
        this._name = name;
        this._isLarge = /^[A-Z]+$/.test(name);
        this._isStart = name == 'start';
        this._isFinal = name == 'end';
    }

    public get name(): string {
        return this._name;
    }

    public get adjacent(): ReadonlySet<Cave> {
        return <ReadonlySet<Cave>> this._adjacent;
    }

    public isStart(): boolean {
        return this._isStart;
    }

    public isFinal(): boolean {
        return this._isFinal;
    }

    public isLarge(): boolean {
        return this._isLarge;
    }

    public addConnection(c: Cave) {
        this._adjacent.add(c);
        if (!c.adjacent.has(this)) {
            c.addConnection(this);
        }
    }

    public toString = () => this._name;
}

export class Day12 implements IDay {
    private caves: Map<string, Cave> = new Map<string, Cave>();

    constructor(input: string) {
        for (const connection of input.trim().split("\n")) {
            const sides = connection.split('-');

            if (!this.caves.has(sides[0])) {
                this.caves.set(sides[0], new Cave(sides[0]));
            }
            if (!this.caves.has(sides[1])) {
                this.caves.set(sides[1], new Cave(sides[1]));
            }

            this.caves.get(sides[0])!.addConnection(this.caves.get(sides[1])!);
        }
    }
    step1(): number {
        const finishedPaths: Cave[][] = [];
        const searchForPaths = (c: Cave, path: Cave[]) => {
            path.push(c);
            if (c.isFinal()) {
                finishedPaths.push(path);
                return;
            }
            for (const adj of [...c.adjacent].filter(adj => (adj.isLarge() || !path.includes(adj)))) {
                searchForPaths(adj, Array.from(path));
            }
        }

        searchForPaths(this.caves.get('start')!, []);
        return finishedPaths.length;
    }
    step2(): number {
        const finishedPaths: Cave[][] = [];
        const searchForPaths = (c: Cave, path: Cave[]) => {
            path.push(c);
            if (c.isFinal()) {
                finishedPaths.push(path);
                return;
            }

            const smallsInPath = new Map<Cave, number>();
            for (const pc of path) {
                if (pc.isStart() || pc.isLarge()) {
                    continue;
                }

                smallsInPath.set(pc, 1 + (smallsInPath.get(pc) ?? 0));
            }

            const filterFunc = (adj: Cave): boolean => {
                if (adj.isLarge()) {
                    return true;
                }
                if (adj.isStart()) {
                    return false;
                }
                if (smallsInPath.size == 0) {
                    return true;
                }
                if (smallsInPath.get(adj) == 1 && [...smallsInPath.values()].filter(v => v != 1).length == 0) {
                    return true;
                }
                
                return !path.includes(adj);
            }
            for (const adj of [...c.adjacent].filter(filterFunc)) {
                searchForPaths(adj, Array.from(path));
            }
        }

        searchForPaths(this.caves.get('start')!, []);
        return finishedPaths.length;
    }
}