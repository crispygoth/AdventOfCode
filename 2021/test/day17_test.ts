import { describe } from 'mocha';
import { expect } from 'chai';
import { Day17 } from '../day17/day17';

describe(("Day 17"), () => {
    var day = new Day17(`target area: x=20..30, y=-10..-5`);

    describe("step 1", () => {
        it("should return the correct result", () => {
            expect(day.step1())
                .to
                .equal(45)
        })
    })
    describe("step 2", () => {
        it("should return the correct result", () => {
            expect(day.step2())
                .to
                .equal(112)
        })
    })
});