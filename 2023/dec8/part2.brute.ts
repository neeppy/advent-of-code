import { input } from './utils';

type TreeNode = {
    name: string;
    l: TreeNode | string;
    r: TreeNode | string;
};

const treeNode = /^(\w+) = \((\w+), (\w+)\)$/;

async function part2Brute(lines: string[]) {
    const directions = lines.shift().toLowerCase();
    const graphMap = {} as Record<string, TreeNode>;

    lines.forEach(line => {
        const [, nodeName, left, right] = line.match(treeNode);

        graphMap[nodeName] = {
            name: nodeName,
            l: left,
            r: right
        };
    });

    Object.values(graphMap).forEach(node => {
        node.l = graphMap[node.l as string];
        node.r = graphMap[node.r as string];
    });

    const startingPoints = Object.keys(graphMap).filter(node => node.endsWith('A'));

    let steps = 0;
    let instruction = 0;
    let currentLocations = startingPoints.map(start => graphMap[start]);

    while (!currentLocations.every(node => node.name.endsWith('Z'))) {
        const direction = directions[instruction] as 'l' | 'r';

        if (steps % 100_000_000 === 0) {
            const percent = steps / 19185263738117;

            console.log(
                'Computed',
                Intl.NumberFormat().format(steps),
                `steps (${(percent * 100).toFixed(4)}%). Current locations array:`,
                currentLocations.map(node => node.name)
            );
        }

        for (let i = 0; i < currentLocations.length; i++) {
            currentLocations[i] = currentLocations[i][direction] as TreeNode;
        }

        instruction = (instruction + 1) % directions.length;
        steps++;
    }

    return steps;
}

input(true)
    .then(part2Brute)
    .then(console.log);
