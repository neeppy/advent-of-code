import { sum } from './utils';

export async function part1(lines: string[]) {
    for (let i = 0; i < lines[0].length; i++) {
        const isEmptyColumn = lines.every(line => line.charAt(i) === '.');

        if (isEmptyColumn) {
            lines = lines.map(line => line.substring(0, i) + '.' + line.substring(i));
            i++;
        }
    }

    for (let i = 0; i < lines.length; i++) {
        if (!lines[i].includes('#')) {
            lines = lines.slice(0, i)
                .concat([lines[i]])
                .concat(lines.slice(i));

            i++;
        }
    }

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

            const gRow = Math.floor(galaxy / length + 1);
            const gCol = galaxy % length;

            const ogRow = Math.floor(otherGalaxy / length + 1);
            const ogCol = otherGalaxy % length;

            const xDist = Math.abs(gCol - ogCol);
            const yDist = Math.abs(gRow - ogRow);

            const distance = 2 * Math.min(xDist, yDist) + Math.abs(xDist - yDist);

            distanceMap.set(min + '-' + max, distance);
        }
    }

    return sum([...distanceMap.values()]);
}
