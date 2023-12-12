import { count, range, sum } from './utils';

const EXPANSION_RATE = 1_000_000;

function getExpansionRateFactor(x: number): number {
    const factor = (EXPANSION_RATE - 1) * x;

    return Math.max(factor, 0);
}

export async function part2(lines: string[]) {
    const emptyColumns = range(0, lines[0].length -1).filter(column => lines.every(line => line.charAt(column) === '.'));
    const emptyRows = range(0, lines.length - 1).filter(row => !lines[row].includes('#'));

    const input = lines.join('');
    const length = lines[0].length;

    const galaxies = [...input.matchAll(/#/g)].map(match => match.index);

    const distanceMap = new Map<string, number>();

    for (const galaxy of galaxies) {
        for (const otherGalaxy of galaxies) {
            if (galaxy === otherGalaxy) continue;

            const min = Math.min(galaxy, otherGalaxy);
            const max = Math.max(galaxy, otherGalaxy);

            if (distanceMap.has(`${min}-${max}`)) continue;

            let gRow = Math.floor(galaxy / length + 1);
            let gCol = galaxy % length;

            gRow += getExpansionRateFactor(count(emptyRows, row => row < gRow));
            gCol += getExpansionRateFactor(count(emptyColumns, col => col < gCol));

            let ogRow = Math.floor(otherGalaxy / length + 1);
            let ogCol = otherGalaxy % length;

            ogRow += getExpansionRateFactor(count(emptyRows, row => row < ogRow));
            ogCol += getExpansionRateFactor(count(emptyColumns, col => col < ogCol));

            const xDist = Math.abs(gCol - ogCol);
            const yDist = Math.abs(gRow - ogRow);

            const distance = 2 * Math.min(xDist, yDist) + Math.abs(xDist - yDist);

            distanceMap.set(min + '-' + max, distance);
        }
    }

    return sum([...distanceMap.values()]);
}
