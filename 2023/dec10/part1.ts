import { input } from './utils';

type Move = '-' | '|' | 'J' | 'F' | 'L' | '7' | 'S';
type CardinalMovements = {
    north: string;
    south: string;
    east: string;
    west: string;
};

const cardinals = (override: Partial<CardinalMovements>): CardinalMovements => ({
    north: '',
    south: '',
    east: '',
    west: '',
    ...override
});

const validMoves = {
    '-': cardinals({ east: '-7JS', west: '-FLS' }),
    '|': cardinals({ north: '|7FS', south: '|JLS' }),
    'L': cardinals({ north: '|7FS', east: '-7JS' }),
    '7': cardinals({ west: '-LFS', south: '|LJS' }),
    'J': cardinals({ north: '|F7S', west: '-FLS' }),
    'F': cardinals({ east: '-7JS', south: '|LJS' }),
    'S': cardinals({
        north: '|7F',
        south: '|JL',
        east: '-7J',
        west: '-FL'
    })
} as Record<Move, CardinalMovements>;

export async function part1(input: string) {
    const lineLength = input.indexOf('\n');
    const startAt = input.indexOf('S');

    let currentIndex = startAt;
    const visited = [] as number[];

    const canGo = (
        direction: 'north' | 'south' | 'east' | 'west',
        current: Move,
        toCheck: number,
    ) => {
        if (visited.includes(toCheck))
            return false;

        return validMoves[current][direction].includes(input[toCheck]);
    };

    do {
        const current = input[currentIndex] as Move;

        if (visited.includes(currentIndex)) break;

        visited.push(currentIndex);

        switch (true) {
            case canGo('east', current, currentIndex + 1):
                currentIndex = currentIndex + 1;
                break;
            case canGo('west', current, currentIndex - 1):
                currentIndex = currentIndex - 1;
                break;
            case canGo('north', current, currentIndex - lineLength - 1):
                currentIndex = currentIndex - lineLength - 1;
                break;
            case canGo('south', current, currentIndex + lineLength + 1):
                currentIndex = currentIndex + lineLength + 1;
                break;
        }
    } while (currentIndex !== startAt);

    return visited;
}
