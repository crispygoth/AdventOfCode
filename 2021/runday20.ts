import { Day20 } from "./day20/day20";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day20/input.txt");
var day = new Day20(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());