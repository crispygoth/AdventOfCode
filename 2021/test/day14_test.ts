import { describe } from 'mocha';
import { expect } from 'chai';
import { Day14 } from '../day14/day14';

describe(("Day 14"), () => {
    var day = new Day14(`NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`);

    describe("step 1", () => {
        it("should return the correct result", () => {
            expect(day.step1())
                .to
                .equal(1588)
        })
    })
    describe("step 2", () => {
        it("should return the correct result", () => {
            expect(day.step2())
                .to
                .equal(2188189693529)
        })
    })
});