import { describe } from 'mocha';
import { expect } from 'chai';
import { Day15 } from '../day15/day15';

describe(("Day 15"), () => {
    var day = new Day15(`1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`);

    describe("step 1", () => {
        it("should return the correct result", () => {
            expect(day.step1())
                .to
                .equal(40)
        })
    })
    describe("step 2", () => {
        it("should return the correct result", () => {
            expect(day.step2())
                .to
                .equal(315)
        })
    })
});