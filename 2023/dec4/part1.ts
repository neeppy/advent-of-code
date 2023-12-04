import { input } from './utils';

async function part1() {
    const lines = await input(4);

    return lines.reduce((acc, line) => {
        let [rawWinningNumbers, rawChosenNumbers] = line.substring(line.indexOf(':') + 1).split('|');

        const winningNumbers = rawWinningNumbers.split(' ').filter(e => e).map(Number);
        const chosenNumbers = rawChosenNumbers.split(' ').filter(e => e).map(Number);

        const intersection = winningNumbers.filter(num => chosenNumbers.includes(num));

        const points = Math.floor(2 ** (intersection.length - 1));

        return acc + points;
    }, 0);
}

part1().then(console.log);
