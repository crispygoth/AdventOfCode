import { Day15 } from "./day15/day15";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day15/input.txt");
var day = new Day15(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());