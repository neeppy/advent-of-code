## Day 3: Lobby

Puzzle text: [here](https://adventofcode.com/2025/day/3).

## Part One

I got quite tricked on this one. I realized that in order to find the largest combination, I needed to first find the largest in the string without the last number.
However, the way I did it was quite hacky. I looked for the largest joltage in the entire string, then checked on which index that occurred.
If it was on the last index, I would look for the second largest joltage to the left. Otherwise, I would look for the largest joltage to the right.

Hacky, but it works for batterySize = 2.

Example answer: `357`.
Full input answer: `17430`.

## Part Two

Obviously, P1 led me the wrong direction for this one. After a break, I realized what the generic rule actually was.
I ended up taking in a `batterySize` parameter. Afterwards, for each battery bank, I start iterating `batterySize` times, each time going through a chunk of the battery bank and retrieving the largest joltage.
First iteration goes through the first `bankSize - batterySize + 1` characters and finds the largest joltage.
Second iteration goes from the index of the first iteration, to `bankSize - batterySize + 1` further characters and does the same.

This step is repeated until we fill in the total joltage output of length `batterySize`.

Example answer: `3121910778619`.
Full input answer: `171975854269367`.
