## [Day 8: Resonant Collinearity](https://adventofcode.com/2024/day/8)

You are given the map of a city containing a bunch of antennas:

```
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
```

- each different letter represents a different antenna frequency

## Part One

Two antennas of the same frequency create two antinodes, on each side of the antennas, at the same distance as the distance between the two antennas.
Find the number of unique antinodes in the map.

Example answer: `14`.
Full input answer: `354`.

## Part Two

Antennas do not only generate one antinode. They generate an infinite amount of antinodes, that are equidistant from each other. Also, an antinode is also generated at the location of each of the two antenna pairs.

Given this change, find the number of unique antinodes in the map.

Example answer: `34`.
Full input answer: `1263`.

## Solution

The same solution applies to both parts.

For ease of implementation, the antennas are parsed into a `Record<string, Location[]>`, where a Location is a 2D vector of `[row, column]`.
Then, for each different frequency, we get all the possible antenna pairs. Using the antenna pairs, we generate all the possible antinodes, using the `generateAntiNodes` function.

The unique antinodes are then counted uniquely using a `Set`.

The `generateAntiNodes` is a generator function which does the following in order to generate the antinodes:
- it takes the coordinates of two antennas
- it calculates the distance on each axis between the two antennas
- a `magnitude` variable is used to multiply the distance, in order to generate the further antinodes
- we use two `while` loops to generate antinodes until either the X or Y coordinate is out of bounds, or the magnitude is out of bounds
  - first `while` loop generates antinodes based on the first antenna
  - second `while` loop generates antinodes based on the second antenna
  - an antinode is found by adding/subtracting the distance from the coordinates of the antenna
    - by multiplying the distance by the magnitude, we can get the next antinodes

Now, the difference between the two parts is only in the way we call the `generateAntiNodes` function.
In the first part, we call it using a `[1, 1]` as the magnitude bounds. This ensures that we only generate the first antinode.
In the second part, we call it using the `[0, Infinity]` as the magnitude bounds. This ensures that we generate all the antinodes, starting with the antenna pairs.
