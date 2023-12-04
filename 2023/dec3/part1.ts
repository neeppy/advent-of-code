import fs from 'fs/promises';

const isSymbol = /[^.0-9]/;
const numbers = /\d+/g;

async function part1() {
    const buffer = await fs.readFile('dec3/input.txt');
    const lines = buffer.toString('utf-8').split(/\n/);

    return lines.reduce((sum, line, currentIndex) => {
        for (const match of line.matchAll(numbers)) {
            const [numberAsString] = match;
            const { index } = match;

            const boundaryLeft = index - 1;
            const boundaryRight = index + numberAsString.length + 1;

            const hasSymbolOnSameLine = isSymbol.test(line.charAt(boundaryLeft)) || isSymbol.test(line.charAt(boundaryRight - 1));
            const hasSymbolOnPrevLine = lines[currentIndex - 1] && isSymbol.test(lines[currentIndex - 1].substring(boundaryLeft, boundaryRight));
            const hasSymbolOnNextLine = lines[currentIndex + 1] && isSymbol.test(lines[currentIndex + 1].substring(boundaryLeft, boundaryRight));

            if (hasSymbolOnSameLine || hasSymbolOnPrevLine || hasSymbolOnNextLine) {
                sum += Number(numberAsString);
            }
        }

        return sum;
    }, 0);
}

part1().then(console.log);
