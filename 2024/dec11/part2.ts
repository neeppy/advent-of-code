type Node = {
  value: string;
  count: number;
  left?: Node;
  right?: Node;
};

const allNodes: Record<string, Node> = {};

function traverse(from: string, generation = 0) {
  let left, right;

  if (generation >= 25) {
    return;
  }

  if (allNodes[from]) {
    allNodes[from].count += 1 + (allNodes[from].left?.count || 0) +
      (allNodes[from].right?.count || 0);

    return allNodes[from];
  }

  if (from === '0') {
    left = '1';
  } else if (from.length % 2 === 0) {
    left = from.substring(0, from.length / 2);
    right = String(Number(from.substring(from.length / 2)));
  } else {
    left = String(Number(from) * 2024);
  }

  console.log(from, `---${generation}--->`, left, right);

  const leftNode = traverse(left, generation + 1);
  const rightNode = right ? traverse(right, generation + 1) : undefined;

  allNodes[from] = {
    value: from,
    count: 1 + (leftNode?.count || 0) + (rightNode?.count || 0),
    left: leftNode,
    right: rightNode,
  };

  return allNodes[from];
}

export function part2(arrangement: string[]) {
  let steps = 0;

  for (const rootNode of arrangement) {
    const node = traverse(rootNode)!;

    steps += node.count;
  }

  console.log(allNodes);

  return steps;
}
