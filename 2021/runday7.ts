import { Day7 } from "./day7/day7";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day7/input.txt");
var day = new Day7(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());