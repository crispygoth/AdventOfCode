import { describe } from 'mocha';
import { expect } from 'chai';
import { Day23, MapState } from '../day23/day23';

describe(("Day 23"), () => {
    var simpleDay = new Day23(`#############
#...........#
###B#A#C#D###
  #A#B#C#D#
  #########`);
  var simpleDay2 = new Day23(`#############
#...........#
###B#B#C#D###
  #A#A#C#D#
  #########`);
    var fullDay = new Day23(`#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`);
    var stepByStep = [
        [
            new MapState(['','','','','','','','','','',''], [['A','B'], ['D','C'], ['C','B'],['A','D']], 0),
            new MapState(['','','','B','','','','','','',''], [['A','B'], ['D','C'], ['C',''],['A','D']], 40),
        ],
        [
            new MapState(['','','','B','','','','','','',''], [['A','B'], ['D','C'], ['C',''],['A','D']], 40),
            new MapState(['','','','B','','','','','','',''], [['A','B'], ['D',''], ['C','C'],['A','D']], 440),
        ],
        [
            new MapState(['','','','B','','','','','','',''], [['A','B'], ['D',''], ['C','C'],['A','D']], 440),
            new MapState(['','','','B','','D','','','','',''], [['A','B'], ['',''], ['C','C'],['A','D']], 3440),
        ],
        [
            new MapState(['','','','B','','D','','','','',''], [['A','B'], ['',''], ['C','C'],['A','D']], 3440),
            new MapState(['','','','','','D','','','','',''], [['A','B'], ['B',''], ['C','C'],['A','D']], 3470),
        ],
        [
            new MapState(['','','','','','D','','','','',''], [['A','B'], ['B',''], ['C','C'],['A','D']], 3470),
            new MapState(['','','','','','D','','','','',''], [['A',''], ['B','B'], ['C','C'],['A','D']], 3510),
        ],
        [
            new MapState(['','','','','','D','','','','',''], [['A',''], ['B','B'], ['C','C'],['A','D']], 3510),
            new MapState(['','','','','','D','','D','','',''], [['A',''], ['B','B'], ['C','C'],['A','']], 5510),
        ],
        [
            new MapState(['','','','','','D','','D','','',''], [['A',''], ['B','B'], ['C','C'],['A','']], 5510),
            new MapState(['','','','','','D','','D','','A',''], [['A',''], ['B','B'], ['C','C'],['','']], 5513),
        ],
        [
            new MapState(['','','','','','D','','D','','A',''], [['A',''], ['B','B'], ['C','C'],['','']], 5513),
            new MapState(['','','','','','D','','','','A',''], [['A',''], ['B','B'], ['C','C'],['D','']], 8513),
        ],
        [
            new MapState(['','','','','','D','','','','A',''], [['A',''], ['B','B'], ['C','C'],['D','']], 8513),
            new MapState(['','','','','','','','','','A',''], [['A',''], ['B','B'], ['C','C'],['D','D']], 12513),
        ],
        [
            new MapState(['','','','','','','','','','A',''], [['A',''], ['B','B'], ['C','C'],['D','D']], 12513),
            new MapState(['','','','','','','','','','',''], [['A','A'], ['B','B'], ['C','C'],['D','D']], 12521),
        ]
    ];

    describe("step 1", () => {
        it("simple example should return the correct result", () => {
            expect(simpleDay.step1())
                .to
                .equal(46)
        })
        it("second simple example should return the correct result", () => {
            expect(simpleDay2.step1())
                .to
                .equal(97)
        })
        for (const [step, [from, to]] of stepByStep.entries()) {
            it("step " + step + " should find " + to.toString() + " from " + from.toString(), () => {
                expect([...from].some(v => v.equals(to)))
                    .to
                    .equal(true)
            })
            it("step " + step + " should have cost " + to.cost, () => {
                expect([...from].find(v => v.equals(to))?.cost)
                    .to
                    .equal(to.cost)
            })
        }
        it("full example should return the correct result", () => {
            expect(fullDay.step1())
                .to
                .equal(12521)
        }).timeout(300000)
    })
    describe("step 2", () => {
        it("should return the correct result", () => {
            expect(fullDay.step2())
                .to
                .equal(323)
        })
    })
});