import { input } from './utils';

type TreeNode = {
    name: string;
    l: TreeNode | string;
    r: TreeNode | string;
};

const treeNode = /^(\w+) = \((\w+), (\w+)\)$/;

async function part1(lines: string[]) {
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

    let steps = 0;
    let instruction = 0;
    let currentLocation = graphMap['AAA'];

    while (currentLocation.name !== 'ZZZ') {
        const direction = directions[instruction] as 'l' | 'r';

        currentLocation = currentLocation[direction] as TreeNode;

        instruction = (instruction + 1) % directions.length;
        steps++;
    }

    return steps;
}

input(true)
    .then(part1)
    .then(console.log);
