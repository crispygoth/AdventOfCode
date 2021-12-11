import { describe } from 'mocha';
import { expect } from 'chai';
import { Day8 } from '../day8/day8';

describe(("Day 8"), () => {
    var dayminimal = new Day8("acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf");
    var day = new Day8(`be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`);

    describe("step 1", () => {
        it("minimal example should return the correct result", () => {
            expect(dayminimal.step1())
                .to
                .equal(0)
        })
        it("larger example should return the correct result", () => {
            expect(day.step1())
                .to
                .equal(26)
        })
    })
    describe("step 2", () => {
        it("minimal example should return the correct result", () => {
            expect(dayminimal.step2())
                .to
                .equal(5353)
        })
        it("should return the correct result", () => {
            expect(day.step2())
                .to
                .equal(61229)
        })
    })
});