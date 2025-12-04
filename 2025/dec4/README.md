## Day 4: Printing Department

Puzzle text: [here](https://adventofcode.com/2025/day/4)

## Part One

Simple go through the map and whenever you find a `@`, look around it and count how many other `@` are there. If there are less than 4, increment the total count.

Example answer: `13`.
Full input answer: `1464`.

## Part Two

This part is an extension of the previous one. 

We essentially run the P1 function in a loop, with each iteration providing a total count and an updated map.

Example:
- Iteration 1: Call P1 with the initial input and get a total count of `13`. Update all 13 of `@` to `.`.
- Iteration 2: Call P1 with the update map and get a new total count. Add the new total count to the previous total count.
... and so on.

Example answer: `43`.
Full input answer: `8409`.
