import { Day14 } from "./day14/day14";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day14/input.txt");
var day = new Day14(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());