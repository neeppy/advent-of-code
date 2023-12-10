import { isBetween, max, min } from './utils';
import { part1 } from './part1';

const lrange = (i: number, length: number) => [length * i, length * (i + 1) - 1] as [number, number];

// this solution taught me of the "non-zero winding rule"
// basically, counting how many times you cross a curve clockwise and counter-clockwise
// if the counter (crossCount) is different than 0, then the tokens are inside the loop
export async function part2(input: string) {
    const visited = await part1(input);
    const lineLength = input.indexOf('\n') + 1;
    const lineCount = Math.ceil(input.length / lineLength);

    const inside = [] as number[];

    // skip first and last lines, because tokens on those lines will never be inside the loop
    for (let i = 1; i < lineCount - 1; i++) {
        const lineRange = lrange(i, lineLength);

        // get the visited elements on the current line
        const inRange = visited.filter(index => isBetween(index, lineRange));

        // minimum and maximum visited on this line – anything outside this range is outside the loop
        const rangeMin = min(inRange);
        const rangeMax = max(inRange);

        let crossCount = 0;

        for (let j = rangeMin; j <= rangeMax; j++) {
            const jd = visited.indexOf(j);

            // if the token is not visited and we currently have a 0 crossCount, then the token is inside the loop
            if (jd === -1) {
                crossCount !== 0 && inside.push(j);
                continue;
            }

            // get the token below the current one
            const below = visited.indexOf(j + lineLength);

            // if it's on the loop and it's at a 1 difference from the current one, then we've got a cross
            // we increment the crossCount based on the direction of the cross
            if (below !== -1 && Math.abs(jd - below) === 1) {
                crossCount += jd - below;
            }
        }
    }

    return inside.length;
}
