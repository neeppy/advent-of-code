import { inputByLine, Location } from './utils.ts';
import { part1 } from './part1.ts';
import { part2 } from './part2.ts';

const lines = await inputByLine(Deno.args[0] === 'dry');

const map = lines.map((line) => Array.from(line).map(Number));
const trailHeads: Location[] = [];

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === 0) {
      trailHeads.push([i, j]);
    }
  }
}

const p1 = await part1(map, trailHeads);
const p2 = await part2(map, trailHeads);

console.log('Part 1:', p1);
console.log('Part 2:', p2);

Deno.bench({
  name: 'Part 1',
  fn: () => void part1(map, trailHeads),
});

Deno.bench({
  name: 'Part 2',
  fn: () => void part2(map, trailHeads),
});
