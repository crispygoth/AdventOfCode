import { describe } from 'mocha';
import { expect } from 'chai';
import { BinaryReader, Day16 } from '../day16/day16';

describe(("Day 16"), () => {
    const binaryDataTests: [string, number[]][] = [
        [ '0' , [0, 0, 0, 0, 0, 0, 0, 0] ],
        [ '1' , [0, 0, 0, 1, 0, 0, 0, 0] ],
        [ '2' , [0, 0, 1, 0, 0, 0, 0, 0] ],
        [ '3' , [0, 0, 1, 1, 0, 0, 0, 0] ],
        [ '4' , [0, 1, 0, 0, 0, 0, 0, 0] ],
        [ '5' , [0, 1, 0, 1, 0, 0, 0, 0] ],
        [ '6' , [0, 1, 1, 0, 0, 0, 0, 0] ],
        [ '7' , [0, 1, 1, 1, 0, 0, 0, 0] ],
        [ '8' , [1, 0, 0, 0, 0, 0, 0, 0] ],
        [ '9' , [1, 0, 0, 1, 0, 0, 0, 0] ],
        [ 'a' , [1, 0, 1, 0, 0, 0, 0, 0] ],
        [ 'b' , [1, 0, 1, 1, 0, 0, 0, 0] ],
        [ 'c' , [1, 1, 0, 0, 0, 0, 0, 0] ],
        [ 'd' , [1, 1, 0, 1, 0, 0, 0, 0] ],
        [ 'e' , [1, 1, 1, 0, 0, 0, 0, 0] ],
        [ 'f' , [1, 1, 1, 1, 0, 0, 0, 0] ],
        [ 'D2FE28', '110100101111111000101000'.split('').map(v => Number(v)) ],
    ];

    describe("BinaryDataReader", () => {
        for (const [input, binaryStream] of binaryDataTests) {
            it(input + " should return " + binaryStream.join(","), () => {
                const b = new BinaryReader(input);
                let a = [];
                for (let i = 0; i < b.length; i++) {
                    a.push(b.read(1));
                }
                expect(a.join(','))
                    .to
                    .equal(binaryStream.join(','));
            })
        }
    })

    const testCases: [string, number][] = [
        ['38006F45291200', 9],
        ['EE00D40C823060', 14],
        ['8A004A801A8002F478', 16],
        ['620080001611562C8802118E34', 12],
        ['C0015000016115A2E0802F182340', 23],
        ['A0016C880162017C3686B18A3D4780', 31]
    ];
    
    describe("step 1", () => {
        for (const [input, expected] of testCases) {
            it(input + " should return " + expected, () => {
                expect(new Day16(input).step1())
                    .to
                    .equal(expected)
            })
        }
    })  

    const step2TestCases: [string, number][] = [
        ['C200B40A82', 3],
        ['04005AC33890', 54],
        ['880086C3E88112', 7],
        ['CE00C43D881120', 9],
        ['D8005AC2A8F0', 1],
        ['F600BC2D8F', 0],
        ['9C005AC2F8F0', 0],
        ['9C0141080250320F1802104A08', 1]
    ]
    describe("step 2", () => {
        for (const [input, expected] of step2TestCases) {
            it(input + " should return " + expected, () => {
                expect(new Day16(input).step2())
                    .to
                    .equal(BigInt(expected))
            })
        }
    })
});