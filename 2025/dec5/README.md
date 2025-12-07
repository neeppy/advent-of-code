## Day 5: Cafeteria

Puzzle text: [here](https://adventofcode.com/2025/day/5).

## Part One

Simply iterate over the ingredients and check if they are fresh or not. The solution is very straightforward.

Example answer: `3`.
Full input answer: `558`.

## Part Two

For part 2, we need to merge the intervals together, so that no numbers are repeated when counting.
I chose the simplest approach, which is an O(n^2) algorithm that merges the intersecting intervals together. Afterwards, simply doing `end - start + 1` for each merged interval will give us the total number of fresh ingredients.

Example answer: `14`.
Full input answer: `344813017450467`.
