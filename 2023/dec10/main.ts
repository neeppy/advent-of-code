import { input } from './utils';
import { part1 } from './part1';
import { part2 } from './part2';

async function main() {
    const todayInput = await input(true);

    const p1 = await part1(todayInput);
    const p2 = await part2(todayInput);

    console.log('Part 1:', p1.length / 2);
    console.log('Part 2:', p2);
}

main();
