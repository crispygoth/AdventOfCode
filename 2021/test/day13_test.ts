import { describe } from 'mocha';
import { expect } from 'chai';
import { Day13 } from '../day13/day13';

describe(("Day 13"), () => {
    var day = new Day13(`6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`);

    describe("step 1", () => {
        it("should return the correct result", () => {
            expect(day.step1())
                .to
                .equal(17)
        })
    })
    describe("step 2", () => {
        it("should return the correct result", () => {
            expect(day.step2())
                .to
                .equal(`#####
#...#
#...#
#...#
#####
`)
        })
    })
});