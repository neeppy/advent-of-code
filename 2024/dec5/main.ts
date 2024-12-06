import { inputByLine } from './utils.ts';
import { part1 } from './part1.ts';
import { part2 } from './part2.ts';

const lines = await inputByLine(Deno.args[0] === 'dry');

const separatorIndex = lines.indexOf('');

const ordering = lines.slice(0, separatorIndex).map((line) =>
  line.split('|').map(Number)
);

const printingPages = lines.slice(separatorIndex + 1).map((line) =>
  line.split(',').map(Number)
);

const precedenceMap: Record<number, number[]> = {};

for (const [page, pageAfter] of ordering) {
  precedenceMap[page] ??= [];
  precedenceMap[page].push(pageAfter);
}

const p1 = await part1(precedenceMap, printingPages);
const p2 = await part2(precedenceMap, printingPages);

console.log('Part 1:', p1);
console.log('Part 2:', p2);

Deno.bench({
  name: 'Part 1',
  fn: () => void part1(precedenceMap, printingPages),
});

Deno.bench({
  name: 'Part 2',
  fn: () => void part2(precedenceMap, printingPages),
});
