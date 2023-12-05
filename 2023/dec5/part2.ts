import { arrayOfNumbers, input, isBetween, min, worker } from './utils';
import { Worker, isMainThread, workerData, parentPort } from 'worker_threads';

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

function getMinimumLocation(rootResource: ResourceMap, seeds: number[]) {
    let resource = rootResource;
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

    return min(converted);
}

async function part2(bulkSize = 1_000_000) {
    console.time('exec. time');

    const lines = (await input(5)).filter(e => e);
    const seedIntervals = arrayOfNumbers(lines[0].substring(6));

    const firstMap = lines.find(line => isMap.test(line) && line.startsWith('seed'));
    const [,, firstDest] = firstMap.match(isMap);

    const rootResource = new ResourceMap(firstDest, lines);
    const workers = [] as Promise<number>[];

    for (let i = 0; i < seedIntervals.length; i += 2) {
        let start = seedIntervals[i];
        let length = seedIntervals[i + 1];

        workers.push(worker(__filename, {
            rootResource,
            start,
            length,
            bulkSize,
        }));
    }

    const minimums = await Promise.all<number>(workers);

    const minimum = min(minimums);

    console.timeEnd('exec. time');

    return minimum;
}

if (isMainThread) {
    part2().then(console.log);
} else {
    let { start, length, bulkSize, rootResource } = workerData;

    console.log('Starting:', Intl.NumberFormat().format(start), '... Length:', Intl.NumberFormat().format(length));

    const minimums = [];

    while (length > 0) {
        const bulkLength = Math.min(bulkSize, length);

        start += bulkLength;
        length -= bulkLength;

        const seeds = (Array.from({ length: bulkLength }) as number[])
            .fill(start)
            .map((el, idx) => el + idx);

        minimums.push(getMinimumLocation(rootResource, seeds));
    }

    parentPort.postMessage(min(minimums));
}
