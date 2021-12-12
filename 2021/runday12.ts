import { Day12 } from "./day12/day12";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day12/input.txt");
var day = new Day12(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());