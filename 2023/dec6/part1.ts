import { input, arrayOfNumbers } from './utils';

async function part1(lines: string[]) {
    const [tLine, dLine] = lines;

    const times = arrayOfNumbers(tLine.substring('Time:'.length).trim());
    const distances = arrayOfNumbers(dLine.substring('Distance:'.length).trim());

    return times.reduce((product, maxTime, index) => {
        const maxDistance = distances[index];

        // problem is described by "-t^2 + nt > k" quadratic inequation,
        //                                  where n = maxTime
        //                              and where k = maxDistance
        const smallRoot = (maxTime - Math.sqrt(maxTime * maxTime - 4 * maxDistance)) / 2;
        const bigRoot = (maxTime + Math.sqrt(maxTime * maxTime - 4 * maxDistance)) / 2;

        // add and subtract one because the winning values are between (bigRoot, smallRoot) interval, which is exclusive
        const winMin = Math.floor(smallRoot + 1);
        const winMax = Math.ceil(bigRoot - 1);

        return product * (winMax - winMin + 1);
    }, 1);
}

input(true)
    .then(part1)
    .then(console.log);
