import { describe } from 'mocha';
import { expect } from 'chai';
import { Day21 } from '../day21/day21';

describe(("Day 21"), () => {
    var day = new Day21(4,8);

    describe("step 1", () => {
        it("should return the correct result", () => {
            expect(day.step1())
                .to
                .equal(739785)
        })
    })
    describe("step 2", () => {
        it("should return the correct result", () => {
            expect(day.step2())
                .to
                .equal(444356092776315)
        })
    })
});