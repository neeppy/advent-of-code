import fs from 'fs/promises';

async function part1() {
    const buffer = await fs.readFile('dec1/part1.input');
    const lines = buffer.toString('utf-8').split(/\n|\r|\r\n/);

    return lines.reduce((acc, line) => {
        const chars = Array.from(line);
        const firstDigit = chars.find(char => char >= '0' && char <= '9');
        const lastDigit = chars.findLast(char => char >= '0' && char <= '9');

        return acc + Number(firstDigit + lastDigit);
    }, 0);
}

part1().then(console.log);
