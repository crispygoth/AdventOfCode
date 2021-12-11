import { describe } from 'mocha';
import { expect } from 'chai';
import { Day9 } from '../day9/day9';

describe(("Day 9"), () => {
    var day = new Day9(`2199943210
3987894921
9856789892
8767896789
9899965678`);

    describe("step 1", () => {
        it("should return the correct result", () => {
            expect(day.step1())
                .to
                .equal(15)
        })
    })
    describe("step 2", () => {
        it("should return the correct result", () => {
            expect(day.step2())
                .to
                .equal(1134)
        })
    })
});