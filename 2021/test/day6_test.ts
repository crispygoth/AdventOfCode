import { describe } from 'mocha';
import { expect } from 'chai';
import { Day6 } from '../day6/day6';

describe(("Day 6"), () => {
    var day = new Day6("3,4,3,1,2");

    describe("step 1", () => {
        it("should return the correct result", () => {
            expect(day.step1())
                .to
                .equal(5934)
        })
    })
    describe("step 2", () => {
        it("should return the correct result", () => {
            expect(day.step2())
                .to
                .equal(26984457539)
        })
    })
});