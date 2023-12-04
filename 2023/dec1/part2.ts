import fs from 'fs/promises';

const digits = {
    zero: '0',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
} as Record<string, string>;

function getFirstSpelledDigit(line: string): [string, number] | [null, -1] {
    // spelled digits are at least 3 characters long
    if (line.length < 3) return [null, -1];

    let firstSpelledDigitIndex = line.length;

    const firstSpelledDigit = Object.keys(digits).reduce((temp, digit) => {
        const digitIndex = line.indexOf(digit);

        if (digitIndex >= 0 && digitIndex <= firstSpelledDigitIndex) {
            firstSpelledDigitIndex = digitIndex;

            return digit;
        }

        return temp;
    }, null);

    return [digits[firstSpelledDigit] || null, firstSpelledDigitIndex];
}

function getLastSpelledDigit(line: string, indexOffset: number): [string, number] | [null, -1] {
    // spelled digits are at least 3 characters long
    if (line.length < 3) return [null, -1];

    let lastSpelledDigitIndex = -1;

    const lastSpelledDigit = Object.keys(digits).reduce((temp, digit) => {
        const digitIndex = line.lastIndexOf(digit);

        if (digitIndex >= 0 && digitIndex >= lastSpelledDigitIndex) {
            lastSpelledDigitIndex = digitIndex;

            return digit;
        }

        return temp;
    }, null);

    return [digits[lastSpelledDigit] || null, lastSpelledDigitIndex + indexOffset];
}

async function part2() {
    const buffer = await fs.readFile('dec1/input.txt');
    const lines = buffer.toString('utf-8').split(/\n|\r|\r\n/);

    return lines.reduce((acc, line) => {
        const chars = Array.from(line);

        let firstDigitIndex = chars.findIndex(char => char >= '0' && char <= '9');

        // no digits are available
        if (firstDigitIndex === -1) {
            const [firstSpelledDigit] = getFirstSpelledDigit(line);
            const [lastSpelledDigit] = getLastSpelledDigit(line, 0);

            return acc + Number(firstSpelledDigit + lastSpelledDigit);
        }

        let lastDigitIndex = chars.findLastIndex(char => char >= '0' && char <= '9');

        const stringBefore = line.substring(0, firstDigitIndex);
        const stringAfter = line.substring(lastDigitIndex);

        const [firstSpelledDigit, firstSpelledIndex] = getFirstSpelledDigit(stringBefore);
        const [lastSpelledDigit, lastSpelledIndex] = getLastSpelledDigit(stringAfter, lastDigitIndex);

        const firstDigit = firstDigitIndex <= firstSpelledIndex || firstSpelledIndex === -1 ? line[firstDigitIndex] : firstSpelledDigit;
        const lastDigit = lastDigitIndex >= lastSpelledIndex || lastSpelledIndex === -1 ? line[lastDigitIndex] : lastSpelledDigit;

        return acc +  Number(firstDigit + lastDigit);
    }, 0);
}

part2().then(console.log);
