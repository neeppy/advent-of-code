import fs from 'fs/promises';

const gears = /\*/g;
const numbers = /\d+/g;

async function part2() {
    const buffer = await fs.readFile('dec3/input.txt');
    const lines = buffer.toString('utf-8').split(/\n/);

    const allNumbers = lines.map(line => {
        const result = [] as { value: string, start: number, end: number }[];

        for (const match of line.matchAll(numbers)) {
            result.push({
                value: match[0],
                start: match.index,
                end: match.index + match[0].length - 1,
            });
        }

        return result;
    }, []);

    return lines.reduce((sum, line, idx) => {
        for (const { index: gearAt } of line.matchAll(gears)) {
            const currentLineNeighbours = allNumbers[idx].filter(someNumber => {
                return someNumber.start === gearAt + 1 || someNumber.end === gearAt - 1;
            });

            const prevLineNeighbours = allNumbers[idx - 1]?.filter(someNumber => {
                return Math.abs(someNumber.start - gearAt) <= 1
                    || Math.abs(someNumber.end - gearAt) <= 1
                    || (gearAt >= someNumber.start && gearAt <= someNumber.end); // also handles 4+ digits numbers
            }) ?? [];

            const nextLineNeighbours = allNumbers[idx + 1]?.filter(someNumber => {
                return Math.abs(someNumber.start - gearAt) <= 1
                    || Math.abs(someNumber.end - gearAt) <= 1
                    || (gearAt >= someNumber.start && gearAt <= someNumber.end); // also handles 4+ digits numbers
            }) ?? [];

            const totalNeighbours = [
                ...prevLineNeighbours,
                ...currentLineNeighbours,
                ...nextLineNeighbours,
            ];

            if (totalNeighbours.length === 2)
                sum += Number(totalNeighbours[0].value) * Number(totalNeighbours[1].value);
        }

        return sum;
    }, 0);
}

part2().then(console.log);
