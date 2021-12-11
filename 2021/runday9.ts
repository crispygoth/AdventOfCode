import { Day9 } from "./day9/day9";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day9/input.txt");
var day = new Day9(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());