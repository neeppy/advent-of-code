import { inputByLine } from './utils.ts';
import { part1 } from './part1.ts';
import { part2 } from './part2.ts';

const lines = await inputByLine(Deno.args[0] === 'dry');

let start: [number, number] = [0, 0];

for (let i = 0; i < lines.length; i++) {
  const guardPosition = lines[i].indexOf('^');

  if (guardPosition > 0) {
    start = [i, guardPosition];
    break;
  }
}

const p1 = await part1(lines, start);
const p2 = await part2(lines, start);

console.log('Part 1:', p1);
console.log('Part 2:', p2);

Deno.bench({
  name: 'Part 1',
  fn: () => void part1(lines, start),
});

Deno.bench({
  name: 'Part 2',
  fn: () => void part2(lines, start),
});
