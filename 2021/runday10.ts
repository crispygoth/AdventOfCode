import { Day10 } from "./day10/day10";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day10/input.txt");
var day = new Day10(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());