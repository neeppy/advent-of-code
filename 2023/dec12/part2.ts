import { arrayOfNumbers, sumOf } from './utils';
import { getArrangements } from './part1';

const EXPANSION_RATE = 5;

export async function part2(lines: string[]) {
    return sumOf(lines, (line, idx) => {
        let [springs, csSizes] = line.split(' ');
        const sizes = arrayOfNumbers(csSizes.replace(/,/g, ' '));

        // this will essentially be the response returned in part1
        const initialArrangements = getArrangements(springs, sizes);

        // generate the repeated component of the string
        let expandedSprings = springs.endsWith('?')
            ? springs + '?'
            : '?' + springs;

        const match = springs.match(/(#+)$/);

        if (match) {
            expandedSprings = match[1] + expandedSprings;
            sizes.unshift(sizes.at(-1));
        }

        // only compute this once, because it gets repeated 4 times
        const expandedArrangements = getArrangements(expandedSprings, sizes);

        // console.log(sizes);
        console.log(springs, '-->', initialArrangements);
        // console.log(expandedSprings, '-->', expandedArrangements);
        // console.log(initialArrangements * expandedArrangements ** (EXPANSION_RATE - 1));
        // console.log();

        // 2_841_907_073_432 too low
        // 2_956_300_272_739 too low, using Math.max

        // this works for the example, but not for the main input
        // lines starting with ? and ending with ? are sketchy
        return initialArrangements * expandedArrangements ** (EXPANSION_RATE - 1);
    });
}
