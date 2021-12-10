import { Day4 } from "./day4/day4";
import { argv } from 'process';
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day4/input.txt");
var day = new Day4(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());