import { inputByLine } from './utils.ts';
import { part1 } from './part1.ts';
import { part2 } from './part2.ts';

const lines = await inputByLine(Deno.args[0] === 'dry');

const p1 = await part1(lines);
const p2 = await part2(lines);

console.log('Part 1:', p1);
console.log('Part 2:', p2);
