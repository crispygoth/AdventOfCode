import { Day23 } from "./day23/day23";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day23/input.txt");
var day = new Day23(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());