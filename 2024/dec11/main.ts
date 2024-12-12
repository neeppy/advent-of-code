import { inputByLine } from './utils.ts';
import { part1 } from './part1.ts';
import { part2 } from './part2.ts';

const [line] = await inputByLine(Deno.args[0] === 'dry'); 

const arrangement = line.split(' ');

const p1 = await part1(arrangement);
const p2 = await part2(arrangement);

console.log('Part 1:', p1);
console.log('Part 2:', p2);

Deno.bench({
  name: 'Part 1',
  fn: () => void part1(arrangement),
});

Deno.bench({
  name: 'Part 2',
  fn: () => void part2(arrangement),
});
