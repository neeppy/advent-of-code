## Day 8: Playground

Puzzle text: [here](https://adventofcode.com/2025/day/8).

## Part One

We compute the distance between each pair of boxes. We then sort the distances from shortest to longest.
After that, we make the first N connections and we make sure to merge circuits if a certain connection falls in two different circuits.

Example answer: `40`.
Full input answer: `164475`.

## Part Two

Part two is nearly identical to part one, except that instead of a `for` loop counting the number of connections, we use a `while` loop that only stops when we have a single big circuit.

Example answer: `25272`.
Full input answer: `169521198`.
