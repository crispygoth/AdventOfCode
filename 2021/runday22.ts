import { Day22 } from "./day22/day22";
import * as fs from 'fs';

var fileBuffer = fs.readFileSync("day22/input.txt");
var day = new Day22(fileBuffer.toString());

console.log(day.step1());
console.log(day.step2());