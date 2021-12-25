import { IDay } from "../IDay";

type Point3D = { x: number, y: number, z: number };
type Matrix<T> = T[][];

const ROTATIONS: Matrix<number>[] = [
    [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
    [[-1, 0, 0], [0, -1, 0], [0, 0, 1]],
    [[-1, 0, 0], [0, 1, 0], [0, 0, -1]],
    [[1, 0, 0], [0, -1, 0], [0, 0, -1]],

    [[-1, 0, 0], [0, 0, 1], [0, 1, 0]],
    [[1, 0, 0], [0, 0, -1], [0, 1, 0]],
    [[1, 0, 0], [0, 0, 1], [0, -1, 0]],
    [[-1, 0, 0], [0, 0, -1], [0, -1, 0]],

    [[0, -1, 0], [1, 0, 0], [0, 0, 1]],
    [[0, 1, 0], [-1, 0, 0], [0, 0, 1]],
    [[0, 1, 0], [1, 0, 0], [0, 0, -1]],
    [[0, -1, 0], [-1, 0, 0], [0, 0, -1]],

    [[0, 1, 0], [0, 0, 1], [1, 0, 0]],
    [[0, -1, 0], [0, 0, -1], [1, 0, 0]],
    [[0, -1, 0], [0, 0, 1], [-1, 0, 0]],
    [[0, 1, 0], [0, 0, -1], [-1, 0, 0]],

    [[0, 0, 1], [1, 0, 0], [0, 1, 0]],
    [[0, 0, -1], [-1, 0, 0], [0, 1, 0]],
    [[0, 0, -1], [1, 0, 0], [0, -1, 0]],
    [[0, 0, 1], [-1, 0, 0], [0, -1, 0]],

    [[0, 0, -1], [0, 1, 0], [1, 0, 0]],
    [[0, 0, 1], [0, -1, 0], [1, 0, 0]],
    [[0, 0, 1], [0, 1, 0], [-1, 0, 0]],
    [[0, 0, -1], [0, -1, 0], [-1, 0, 0]],
]

const transform = (point: Point3D, mat: Matrix<number>): Point3D => {
    return {
        x: (point.x * mat[0][0]) + (point.y * mat[0][1]) + (point.z * mat[0][2]),
        y: (point.x * mat[1][0]) + (point.y * mat[1][1]) + (point.z * mat[1][2]),
        z: (point.x * mat[2][0]) + (point.y * mat[2][1]) + (point.z * mat[2][2]),
    }
}

export class Scanner {
    private _beacons: Map<string, Point3D>;
    private distances: Map<[Point3D, Point3D], number> = new Map();

    constructor(beaconlist: string, private scannerNum: number) {
        this._beacons = new Map(beaconlist.trim().split("\n").map(
            v => {
                const [x, y, z] = v.split(',');
                return [v, { x: Number(x), y: Number(y), z: Number(z) }];
            }
        ));
        this.calculateDistances();
    }

    private calculateDistances() {
        this.distances = new Map();
        for (const a of this._beacons.values()) {
            const result = [];

            for (const b of this._beacons.values()) {
                if (a === b) {
                    continue;
                }

                this.distances.set([a, b], Math.round(Math.sqrt(
                    Math.pow(a.x - b.x, 2)
                    + Math.pow(a.y - b.y, 2)
                    + Math.pow(a.z - b.z, 2)
                )));
            }
        }
    }

    public overlaps(otherScanner: Scanner): Point3D | undefined {
        const otherDistances = [...otherScanner.distances.entries()];
        const matchingDistances = [...this.distances.entries()].filter(([_, v]) => otherDistances.find((_, q) => v == q));
        if (matchingDistances.length < 16) {
            return undefined;
        }

        const possibleTranslations = new Map<string, number>();
        for (const [beaconPair, dist] of matchingDistances) {
            for (const [otherBeaconPair, _] of otherDistances.filter(([_, d]) => d == dist)) {
                for (const rotation of ROTATIONS) {
                    for (const otherBeacon of otherBeaconPair) {
                        const rotOther = transform(otherBeacon, rotation);

                        for (const beacon of beaconPair) {
                            const difference = [
                                beacon.x - rotOther.x,
                                beacon.y - rotOther.y,
                                beacon.z - rotOther.z,
                            ];
                            const numPossibles = 1 + (possibleTranslations.get(difference.join(',')) ?? 0);
                            if (numPossibles == 16) {
                                return {
                                    x: difference[0],
                                    y: difference[1],
                                    z: difference[2]
                                };
                            }
                            possibleTranslations.set(difference.join(','), numPossibles);
                        }
                    }
                }
            }
        }
       
        return undefined;
    }

    public addBeacons(otherScanner: Scanner, otherScannerPos: Point3D) {
        for (const beacon of otherScanner._beacons.values()) {
            const point = { x: beacon.x + otherScannerPos.x, y: beacon.y + otherScannerPos.y, z: beacon.z + otherScannerPos.z };
            this._beacons.set([point.x, point.y, point.z].join(','), point);
        }
        this.calculateDistances();
    }

    public get numBeacons(): number {
        return this._beacons.size;
    }

    public get scannerNumber(): number {
        return this.scannerNum;
    }

    public get beacons(): Point3D[] {
        return [...this._beacons.values()];
    }
}

export class Day19 implements IDay {
    private scanners: Scanner[];

    constructor(input: string) {
        this.scanners = input.trim().split(/--- scanner \d+ ---/).filter(v => v !== '').map(
            (beacons, n) => new Scanner(beacons, n)
        );
    }

    step1(): number {
        const scannerZero = this.scanners[0];
        const unknownScanners = new Set(this.scanners.slice(1));

        while (unknownScanners.size > 0) {
            let numUnknowns = unknownScanners.size;

            for (const findScanner of unknownScanners) {
                let scannerPos: Point3D | undefined;

                if (scannerPos = scannerZero.overlaps(findScanner)) {
                    console.log(findScanner.scannerNumber, scannerPos, scannerZero.numBeacons);
                    scannerZero.addBeacons(findScanner, scannerPos);
                    unknownScanners.delete(findScanner);
                    break;
                }
            }

            if (numUnknowns == unknownScanners.size) {
                throw new Error('found ' + numUnknowns + ' un-locatable scanners');
            }
        }
        console.log(scannerZero.beacons.sort((a, b) => (a.x - b.x)))
        return scannerZero.numBeacons;
    }
    step2(): number {
        throw new Error("Method not implemented.");
    }

}