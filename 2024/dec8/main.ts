import { inputByLine, Location } from './utils.ts';
import { part1 } from './part1.ts';
import { part2 } from './part2.ts';

const lines = await inputByLine(Deno.args[0] === 'dry');

const antennas: Record<string, Location[]> = {};

for (let row = 0; row < lines.length; row++) {
  const line = lines[row];

  for (let column = 0; column < line.length; column++) {
    if (line[column] !== '.') {
      antennas[line[column]] ??= [];
      antennas[line[column]].push([row, column]);
    }
  }
}

const p1 = await part1(antennas, lines[0].length - 1, lines.length - 1);
const p2 = await part2(antennas, lines[0].length - 1, lines.length - 1);

console.log('Part 1:', p1);
console.log('Part 2:', p2);

Deno.bench({
  name: 'Part 1',
  fn: () => void part1(antennas, lines[0].length - 1, lines.length - 1),
});

Deno.bench({
  name: 'Part 2',
  fn: () => void part2(antennas, lines[0].length - 1, lines.length - 1),
});
