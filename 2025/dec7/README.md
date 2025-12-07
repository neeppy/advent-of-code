## Day 7: Laboratories

Puzzle text: [here](https://adventofcode.com/2025/day/7).

## Part One

The solution to this problem is easy to understand. The `beams` array is of the same length as our matrix. Whenever a splitter is encountered, the `beams` array flips to `true` on the neighbouring columns.

Example answer: `21`.
Full input answer: `1533`.

## Part Two

The second part was done using [DFS](https://en.wikipedia.org/wiki/Depth-first_search). The algorithm is technically split in two parts:
- first, we traverse the matrix and create a graph of the beams, where each splitter creates a node to its sides (`E` is the final node);
- second, we traverse the graph using DFS and simply count all the different paths that we go down on.

Example answer: `40`.
Full input answer: `10733529153890`.
