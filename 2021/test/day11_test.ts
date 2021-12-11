import { describe } from 'mocha';
import { expect } from 'chai';
import { Day11 } from '../day11/day11';

describe(("Day 11"), () => {
    var day = new Day11(`5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`);

    describe("step 1", () => {
        it("should return the correct result", () => {
            expect(day.step1())
                .to
                .equal(1656)
        })
    })
    describe("step 2", () => {
        it("should return the correct result", () => {
            expect(day.step2())
                .to
                .equal(195)
        })
    })
});