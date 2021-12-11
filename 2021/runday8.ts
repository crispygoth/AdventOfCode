import { Day8 } from "./day8/day8";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day8/input.txt");
var day = new Day8(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());