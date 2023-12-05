import { arrayOfNumbers, input, isBetween } from './utils';

const isMap = /^(\w+)-to-(\w+) map:$/i;

type MapValue = [number, number, number];

class ResourceMap {
    dest: string;
    ranges: Range[] = [];
    next: ResourceMap = null;

    constructor(dest: string, lines: string[]) {
        this.dest = dest;

        const startsAt = lines.findIndex(line => isMap.test(line) && line.includes(`-to-${dest}`));

        for (let i = startsAt + 1; i < lines.length && !isMap.test(lines[i]); i++) {
            this.addRange(...arrayOfNumbers(lines[i]) as MapValue);
        }

        const [,, nextDest] = lines.find(line => isMap.test(line) && line.startsWith(dest))?.match(isMap) ?? [];

        if (nextDest) {
            this.next = new ResourceMap(nextDest, lines);
        }
    }

    addRange(destStart: number, srcStart: number, length: number) {
        this.ranges.push({
            src: [srcStart, srcStart + length - 1],
            dest: [destStart, destStart + length - 1],
        });

        return this;
    }
}

type Range = {
    src: [number, number];
    dest: [number, number];
};

async function part1() {
    const lines = (await input(5)).filter(e => e);
    const seeds = arrayOfNumbers(lines[0].substring(6));

    const firstMap = lines.find(line => isMap.test(line) && line.startsWith('seed'));
    const [,, firstDest] = firstMap.match(isMap);

    let resource = new ResourceMap(firstDest, lines);
    let converted = seeds;

    while (resource) {
        converted = converted.map(value => {
            const conversionRange = resource.ranges.find(range => isBetween(value, range.src));

            if (!conversionRange) return value;

            const rangeOffset = value - conversionRange.src[0];

            return conversionRange.dest[0] + rangeOffset;
        });

        resource = resource.next;
    }

    return Math.min(...converted);
}

part1().then(console.log);
