import { input, lcm } from './utils';

type TreeNode = {
    name: string;
    l: TreeNode | string;
    r: TreeNode | string;
};

const treeNode = /^(\w+) = \((\w+), (\w+)\)$/;

function getCyclePeriod(from: TreeNode, directions: string) {
    let steps = 0;
    let instruction = 0;
    let currentLocation = from;

    const visited = [];

    while (!currentLocation.name.endsWith('Z')) {
        const direction = directions[instruction] as 'l' | 'r';

        visited.push(currentLocation.name);
        currentLocation = currentLocation[direction] as TreeNode;

        instruction = (instruction + 1) % directions.length;
        steps++;
    }

    return steps;
}

async function part2(lines: string[]) {
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

    const startPoints = Object.keys(graphMap).filter(node => node.endsWith('A'));

    const cycles = startPoints.map(start => getCyclePeriod(graphMap[start], directions));

    // used LCM of the cycle periods to determine after how many moves they would all collapse onto a Z-ending
    // the alternative would be going step by step, but that would take ages to complete... check out part2.brute.ts
    return lcm(cycles);
}

input(true)
    .then(part2)
    .then(console.log);
