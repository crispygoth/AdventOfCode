import { Day16 } from "./day16/day16";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day16/input.txt");
var day = new Day16(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());