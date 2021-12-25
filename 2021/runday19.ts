import { Day19 } from "./day19/day19";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day19/input.txt");
var day = new Day19(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());