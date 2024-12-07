# [Day 4: Ceres Search](https://adventofcode.com/2024/day/4)

## Part One

You are given a word search puzzle:

```
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
```

- the word `XMAS` can appear in any orientation - horizontal, vertical, or diagonal, written forwards or backwards and even overlapping

## Part One

Find all the appearances of the word `XMAS` in the puzzle. How many times does it appear?

Example answer: `18`.
Full input answer: `2554`.

### Solution

Iterate over the input and whenever an `X` is found, compute 7-character substrings that are centered on the `X` in all directions.
At best case scenario, a 7-character substring will look like this: `SAMXMAS`.
After having computed all the substrings, check if the substring starts with `SAMX` or ends with `XMAS`.
A substring cannot start with `XMAS`, because the `X` is always in the center.

## Part Two

We actually need to search for the word `MAS`, but overlapping in an `X` shape - like the following:

```
M.S
.A.
M.S
```

- the word `MAS` can also be written forwards or backwards

Example answer: `9`.
Full input answer: `1916`.

### Solution

The solution is even simpler than the previous one. We just need to compute the diagonal substrings, but not for a length of 7, and not for the letter `X`.
Instead, we're computing the diagonal substrings for all letters `A`, for a length of 3. If the diagonals are either `SAM` or `MAS`, we count it as a match.
