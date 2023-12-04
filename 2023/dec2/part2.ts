import fs from 'fs/promises';

const drawRegex = /(\d+) (red|green|blue)/g;

async function part2() {
    const buffer = await fs.readFile('dec2/input.txt');
    const games = buffer.toString('utf-8').split(/\n/);

    games.pop();

    return games.reduce((acc, game) => {
        const maximums = {
            red: 0,
            green: 0,
            blue: 0,
        } as Record<string, number>;

        for (const [, count, color] of game.matchAll(drawRegex)) {
            const amount = Number(count);

            if (amount > maximums[color])
                maximums[color] = amount;
        }

        const power = maximums.red * maximums.green * maximums.blue;

        return acc + power;
    }, 0);
}

part2().then(console.log);
