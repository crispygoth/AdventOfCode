import { describe } from 'mocha';
import { expect } from 'chai';
import { Day12 } from '../day12/day12';

describe(("Day 12"), () => {
    var test1 = new Day12(`start-A
start-b
A-c
A-b
b-d
A-end
b-end`);
    var test2 = new Day12(`dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`);
    var test3 = new Day12(`fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`);

    describe("step 1", () => {
        it("test1 should return the correct result", () => {
            expect(test1.step1())
                .to
                .equal(10)
        })
        it("test2 should return the correct result", () => {
            expect(test2.step1())
                .to
                .equal(19)
        })
        it("test3 should return the correct result", () => {
            expect(test3.step1())
                .to
                .equal(226)
        })
    })
    describe("step 2", () => {
        it("test1 should return the correct result", () => {
            expect(test1.step2())
                .to
                .equal(36)
        })
        it("test2 should return the correct result", () => {
            expect(test2.step2())
                .to
                .equal(103)
        })
        it("test3 should return the correct result", () => {
            expect(test3.step2())
                .to
                .equal(3509)
        })
    })
});