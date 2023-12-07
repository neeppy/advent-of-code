import { input } from './utils';

async function part2(lines: string[]) {
    const [tLine, dLine] = lines;

    const maxTime = Number(tLine.substring('Time:'.length).replace(/\s/g, ''));
    const maxDistance = Number(dLine.substring('Distance:'.length).replace(/\s/g, ''));

    // same thing as part1 applies here
    const smallRoot = (maxTime - Math.sqrt(maxTime * maxTime - 4 * maxDistance)) / 2;
    const bigRoot = (maxTime + Math.sqrt(maxTime * maxTime - 4 * maxDistance)) / 2;

    const winMin = Math.floor(smallRoot + 1);
    const winMax = Math.ceil(bigRoot - 1);

    return (winMax - winMin + 1);
}

input(true)
    .then(part2)
    .then(console.log);
