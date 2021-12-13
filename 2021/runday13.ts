import { Day13 } from "./day13/day13";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day13/input.txt");
var day = new Day13(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());