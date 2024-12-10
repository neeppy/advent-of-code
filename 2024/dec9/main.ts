import { inputByLine } from './utils.ts';
import { part1 } from './part1.ts';
import { part2 } from './part2.ts';

const [diskMap] = await inputByLine(Deno.args[0] === 'dry');

const fileSizes: number[] = [];
const freeSpaceSizes: number[] = [];

for (let i = 0; i < diskMap.length; i++) {
  if (i % 2 === 0) {
    fileSizes.push(Number(diskMap[i]));
  } else {
    freeSpaceSizes.push(Number(diskMap[i]));
  }
}

const p1 = await part1(fileSizes.slice(), freeSpaceSizes.slice());
const p2 = await part2(fileSizes.slice(), freeSpaceSizes.slice());

console.log('Part 1:', p1);
console.log('Part 2:', p2);

Deno.bench({
  name: 'Part 1',
  fn: () => void part1(fileSizes.slice(), freeSpaceSizes.slice()),
});

Deno.bench({
  name: 'Part 2',
  fn: () => void part2(fileSizes.slice(), freeSpaceSizes.slice()),
});
