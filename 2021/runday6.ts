import { Day6 } from "./day6/day6";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day6/input.txt");
var day = new Day6(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());
