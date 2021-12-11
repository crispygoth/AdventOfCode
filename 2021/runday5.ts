import { Day5 } from "./day5/day5";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day5/input.txt");
var day = new Day5(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());