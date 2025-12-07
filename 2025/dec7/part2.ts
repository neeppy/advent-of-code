const graphNode = (i: number, j: number) => `${i}-${j}`;

function traverse(
  graph: Record<string, string[]>,
  fromNode: string,
  visitHistory: Record<string, number> = {},
) {
  // if it's an end node, we return 1, because it's a single path hitting this node
  // this is our recursion stopping condition
  if (fromNode === 'E') {
    return 1;
  }

  let total = 0;

  for (const child of graph[fromNode]) {
    if (visitHistory[child]) {
      // when we know a child's total, we simply add that instead of doing a new recursive call
      total += visitHistory[child];

      continue;
    }

    // recursive call using the child node
    // add the child's total paths count to this node's total
    total += traverse(graph, child, visitHistory);
  }

  visitHistory[fromNode] = total;

  // after all recursive calls are done, we get the grant total for our starting node
  return total;
}

export function part2(lines: string[]) {
  const graph: Record<string, string[]> = {};

  // this time, we do not just keep track of whether a column has a beam or not
  // we keep track of all the beams that are created on that column, so we can later differentiate between different paths
  const beams = Array.from({ length: lines[0].length }).map(() =>
    new Set<string>()
  );

  const startIndex = lines[0].indexOf('S');

  // we first have a single beam on the "startIndex" column
  beams[startIndex] = new Set([graphNode(0, startIndex)]);

  // create incidence list from the matrix
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] !== '^') {
        continue;
      }

      if (beams[j].size === 0) {
        continue;
      }

      // when beams hit a splitter, they break into two new beams, on the j-1 and j+1 columns (neighbouring)
      beams[j].forEach((beamNode) => {
        graph[beamNode] ??= [];
        graph[beamNode].push(graphNode(i, j - 1), graphNode(i, j + 1));
      });

      beams[j] = new Set();
      beams[j + 1].add(graphNode(i, j + 1));
      beams[j - 1].add(graphNode(i, j - 1));
    }
  }

  // add links to the final node
  beams.filter((beamNodes) => beamNodes.size > 0).forEach((beamNodes) => {
    beamNodes.forEach((beamNode) => {
      if (graph[beamNode]?.includes('E')) {
        return;
      }

      graph[beamNode] ??= [];
      graph[beamNode].push('E');
    });
  });

  const total = traverse(graph, graphNode(0, startIndex));

  return total;
}
