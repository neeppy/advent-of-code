import fs from 'fs/promises';

const drawRegex = /(\d+) (red|green|blue)/g;

async function part1(maximum: Record<string, number>) {
    const buffer = await fs.readFile('dec2/part1.input');
    const games = buffer.toString('utf-8').split(/\n/);

    games.pop();

    return games.reduce((acc, game) => {
        const [, id] = game.match(/^Game (\d+):/i);

        for (const [, count, color] of game.matchAll(drawRegex)) {
            const amount = Number(count);

            if (amount > maximum[color]) return acc;
        }

        return acc + Number(id);
    }, 0);
}

part1({
    red: 12,
    green: 13,
    blue: 14,
}).then(console.log);
