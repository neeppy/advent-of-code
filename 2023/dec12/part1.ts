import { arrayOfNumbers, sumOf } from './utils';

function isValidArrangement(arrangement: string, blocks: number[]) {
    let regexString = '';

    blocks.forEach(blockSize => {
        regexString += `\\.*#{${blockSize}}\\.`;
    });

    return new RegExp(`^${regexString}*?$`).test(arrangement);
}

export function getArrangements(pattern: string, blocks: number[]): number {
    if (!pattern.includes('?')) {
        return Number(isValidArrangement(pattern, blocks));
    }

    return getArrangements(pattern.replace('?', '.'), blocks) + getArrangements(pattern.replace('?', '#'), blocks);
}

export async function part1(lines: string[]) {
    return sumOf(lines, line => {
        const [springs, csSizes] = line.split(' ');
        const sizes = arrayOfNumbers(csSizes.replace(/,/g, ' '));

        return getArrangements(springs, sizes);
    });
}
