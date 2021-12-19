import { Day18 } from "./day18/day18";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day18/input.txt");
var day = new Day18(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());