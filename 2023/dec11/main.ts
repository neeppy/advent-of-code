import { inputByLine } from './utils';
import { part1 } from './part1';
import { part2 } from './part2';

async function main() {
    const lines = await inputByLine(true);

    const p1 = await part1(lines);
    const p2 = await part2(lines);

    console.log('Part 1:', p1);
    console.log('Part 2:', p2);
}

main();
