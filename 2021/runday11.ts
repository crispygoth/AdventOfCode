import { Day11 } from "./day11/day11";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day11/input.txt");
var day = new Day11(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());