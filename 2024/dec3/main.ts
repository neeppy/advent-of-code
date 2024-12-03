import { inputByLine } from './utils.ts';
import { part1 } from './part1.ts';
import { part2 } from './part2.ts';

const lines = await inputByLine(Deno.args[0] === 'dry');

const memory = lines.join('');

const p1 = await part1(memory);
const p2 = await part2(memory);

console.log('Part 1:', p1);
console.log('Part 2:', p2);

Deno.bench({
  name: 'Part 1',
  fn: () => void part1(memory),
});

Deno.bench({
  name: 'Part 2',
  fn: () => void part2(memory),
});
