import { IDay } from "../IDay";

type NotesEntry = {
    observedSignals: Set<string[]>,
    outputSignal: string[]
}

// expected (unmapped) number signals
const NUMBER_SIGNALS = [
    'abcefg',
    'cf',
    'acdeg',
    'acdfg',
    'bcdf', 
    'abdfg', 
    'abdefg',
    'acf',
    'abcdefg',
    'abcdfg'
];

export class Day8 implements IDay {
    private notes: NotesEntry[];

    constructor(input: string) {
        this.notes = input.trim().split("\n").map(
            line => {
                const parsedLine = line.trim().split("|");
                return {
                    observedSignals: new Set(parsedLine[0].trim().split(" ").map(v => v.split('').sort())),
                    outputSignal: parsedLine[1].trim().split(" ").map(v => v.split('').sort().join(''))
                };
            }
        );
    }
    step1(): number {
        return this.notes.map(
            v => v.outputSignal.filter(
                signal => [2, 3, 4, 7].includes(signal.length)
            ).length
        ).reduce((prev,curr) => prev + curr);
    }
    private findObservation(note: NotesEntry, length: number): string[] {
        const result = this.findObservations(note, length)?.pop();

        if (!result) {
            throw new Error('Unable to find observation of length ' + length)
        }

        return result;
    }
    private findObservations(note: NotesEntry, length: number): string[][] {
        return [...note.observedSignals].filter(v => v.length == length);
    }

    step2(): number {
        /**
         * standard segment layout:
         
             aaaa    
            b    c
            b    c
             dddd
            e    f
            e    f
             gggg 
         */
        return this.notes.map(note => {
            const signalMapping = new Map<string, string>();

            // find the 1 and 7, that will let us find segment 'a'
            const signalOne = this.findObservation(note, 2);
            const signalSeven = this.findObservation(note, 3);

            if (signalOne.filter(v => signalSeven.includes(v)).length != 2) {
                throw new Error("one and seven do not seem to intersect")
            }

            signalMapping.set('a', signalSeven.filter(v => !signalOne.includes(v))[0]);

            // sum up how many times each segment appears across the ten observed signal patterns
            // this can give us b, e and f as these are unique, as well a C since that is only
            // shared with A which we now know
            const segmentSums = new Map<string, number>();
            for (let obs of note.observedSignals) {
                for (let segment of obs) {
                    segmentSums.set(segment, 1 + (segmentSums.get(segment) ?? 0));
                }
            }
            //console.log(segmentSums);
            for (const [segment, count] of segmentSums) {
                switch (count) {
                    case 4:
                        signalMapping.set('e', segment);
                        break;
                    case 6:
                        signalMapping.set('b', segment);
                        break;
                    case 7:
                        // 7 is D or G. D will also appear in 4 which has a unique number of segments.
                        if (this.findObservation(note, 4).includes(segment)) {
                            signalMapping.set('d', segment);
                        } else {
                            signalMapping.set('g', segment);
                        }
                        break;
                    case 8:
                        if (segment != signalMapping.get('a')) {
                            signalMapping.set('c', segment);
                        }
                        break;
                    case 9:
                        signalMapping.set('f', segment);
                        break;
                }
            }

            if (signalMapping.size != 7) {
                throw new Error('could not find all the mappings: ' + [...signalMapping.keys()]);
            }
            // need to invert the map when looking up the output
            const inverseSignalMap = new Map<string,string>();
            signalMapping.forEach((from, to) => inverseSignalMap.set(from, to))

            const outputNumbers = note.outputSignal.map(signal => {
                const mappedSignal = signal.split('').map(v => inverseSignalMap.get(v)).sort().join('');
                const n = NUMBER_SIGNALS.indexOf(mappedSignal);

                if (n == -1) {
                    throw new Error('invalid signal ' + signal + ", " + mappedSignal);
                }

                return String(n);
            });

            return Number(outputNumbers.join(''));
        }).reduce((prev,curr) => prev+curr);
    }
}