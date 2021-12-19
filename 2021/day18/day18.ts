import { number } from "yargs";
import { IDay } from "../IDay";

type FishParts = '[' | ',' | ']' | number;
type FishArray = number | [FishArray, FishArray];

export class SnailFish {
    static fromString(fish: string): SnailFish {
        return new SnailFish(
            fish
                .split(/([\[\],])/g)
                .filter(v => v !== '')
                .map(v => ['[', ',', ']'].includes(v) ? <FishParts>v : Number(v))
        );
    }

    constructor(private fish: FishParts[]) { }

    public toString(): string {
        return this.fish.join('');
    }

    public add(otherfish: SnailFish) {
        return new SnailFish(["[", ...this.fish, ",", ...otherfish.fish, "]"]);
    }

    public reduce(): SnailFish {
        let fish = [...this.fish];
        let result: FishParts[];
        let anyExploded: Boolean;
        let anySplit: Boolean;

        do {
            result = [];
            anyExploded = false;
            anySplit = false;
            let nestLevel: number = 0;
            let addToNext: number = 0;

            for (let fishIndex = 0; fishIndex < fish.length; fishIndex++) {
                switch (fish[fishIndex]) {
                    case '[':
                        nestLevel++;

                        if (!anyExploded && nestLevel == 5) {
                            anyExploded = true;

                            // look backwards through the result for a number to increase
                            for (let resultIndex = result.length - 1; resultIndex > 0; resultIndex--) {
                                if (typeof result[resultIndex] == 'number') {
                                    result[resultIndex] = <number>result[resultIndex] + <number>fish[fishIndex + 1];
                                    break;
                                }
                            }

                            // add the other side of the pair to the next number we find
                            addToNext = <number>fish[fishIndex + 3];

                            result.push(0);
                            fishIndex += 4;
                        } else {
                            result.push("[");
                        }

                        break;
                    case ']':
                        nestLevel--;
                        result.push("]");
                        break;

                    case ',':
                        result.push(',');
                        break;

                    default:
                        result.push(addToNext + <number>fish[fishIndex]);
                        addToNext = 0;
                        break;
                }
            }

            if (anyExploded) {
                fish = result;
                continue;
            }

            fish = new Array<FishParts>();
            for (let v of result) {
                if (!anySplit && typeof v == 'number' && <number>v >= 10) {
                    anySplit = true;

                    fish.push('[');
                    fish.push(Math.floor(<number>v / 2));
                    fish.push(',');
                    fish.push(Math.ceil(<number>v / 2));
                    fish.push(']');
                } else {
                    fish.push(v);
                }
            }
        } while (anySplit || anyExploded);

        return new SnailFish(result);
    }

    public get magnitude(): number {
        const fishArray: FishArray = JSON.parse(this.toString());
        const calc = (fish: FishArray): number => {
            if (typeof fish == 'number') {
                return <number>fish;
            } else {
                const [pairLeft, pairRight] = <[FishArray, FishArray]>fish;
                return (3 * calc(pairLeft)) + (2 * calc(pairRight));
            }
        }
        return calc(fishArray);
    }
}

export class Day18 implements IDay {
    private allFish: SnailFish[];

    constructor(input: string) {
        this.allFish = input.trim().split("\n").map(
            line => SnailFish.fromString(line)
        );
    }
    addFish(fish: SnailFish) {
    }
    step1(): number {
        const allFish = [...this.allFish];
        let currentFish = allFish.shift()!;
        while (allFish.length) {
            currentFish = currentFish.add(allFish.shift()!).reduce();
        }
        return currentFish.magnitude;
    }
    step2(): number {
        return Math.max(...this.allFish.map(
            firstFish => Math.max(...this.allFish.map(
                secondFish => firstFish.add(secondFish).reduce().magnitude
            ))
        ));
    }

}