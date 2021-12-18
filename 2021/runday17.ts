import { Day17 } from "./day17/day17";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day17/input.txt");
var day = new Day17(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());