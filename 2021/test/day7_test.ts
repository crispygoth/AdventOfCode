import { describe } from 'mocha';
import { expect } from 'chai';
import { Day7 } from '../day7/day7';

describe(("Day 7"), () => {
    var day = new Day7("16,1,2,0,4,2,7,1,2,14");

    describe("step 1", () => {
        it("should return the correct result", () => {
            expect(day.step1())
                .to
                .equal(37)
        })
    })
    describe("step 2", () => {
        it("should return the correct result", () => {
            expect(day.step2())
                .to
                .equal(168)
        })
    })
});