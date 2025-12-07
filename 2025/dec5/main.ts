import { inputByLine, lineOfNumbers, Range, splitMap } from './utils.ts';
import { part1 } from './part1.ts';
import { part2 } from './part2.ts';

const lines = await inputByLine(Deno.args[0] === 'dry');

const [parsedRanges, items] = splitMap(
  '',
  lines,
  (line) => line,
  Number,
);

const uniqueRanges = Object.keys(
  Object.fromEntries(parsedRanges.map((range) => [range, true])),
).map((range) => lineOfNumbers(range, /-/) as Range);

const p1 = await part1(uniqueRanges, items);
const p2 = await part2(uniqueRanges);

console.log('Part 1:', p1);
console.log('Part 2:', p2);

Deno.bench({
  name: 'Part 1',
  fn: () => void part1(uniqueRanges, items),
});

Deno.bench({
  name: 'Part 2',
  fn: () => void part2(uniqueRanges),
});
