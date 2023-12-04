import { input, sum } from './utils';

async function part2() {
    const lines = await input(4);

    const winCounts = lines.map(line => {
        let [rawWinningNumbers, rawChosenNumbers] = line.substring(line.indexOf(':') + 1).split('|');

        const winningNumbers = rawWinningNumbers.split(' ').filter(e => e).map(Number);
        const chosenNumbers = rawChosenNumbers.split(' ').filter(e => e).map(Number);

        const intersection = winningNumbers.filter(num => chosenNumbers.includes(num));

        return intersection.length;
    });

    const totalScratchCards = Array.from({ length: lines.length }).fill(1) as number[];

    winCounts.forEach((count, index) => {
        if (count == 0) return;

        const maxIndex = Math.min(lines.length, index + count + 1);

        for (let i = index + 1; i < maxIndex; i++) {
            totalScratchCards[i] = totalScratchCards[i] + totalScratchCards[index];
        }
    });

    return sum(totalScratchCards);
}

part2().then(console.log);
