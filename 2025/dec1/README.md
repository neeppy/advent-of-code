## Day X

This is the template directory for the day 1 of Advent of Code 2025. This contains boilerplate code for the solutions.

Run the following command to generate the boilerplate code and files for today:
```bash
deno task today
```

## Part One

Example answer: `3`.
Full input answer: `964`.

### Solution

Starting from `dialStart = 50`, we add the rotations count when the rotation direction is `R` or subtract it when the rotation direction is `L`.
To make sure we remain within the bounds of the dial, we take the 100 modulo and count up every time we reach `0`.

## Part Two

Example answer: `6`.
Full input answer: `5872`.

### Solution

Using part 1 as base for this, we get the sign of the position before and after the rotation. We add `1` zero hit if the signs are different.
Afterwards, we add up how many multiples of `100` we have after applying the rotation. Every time we rotate by `100`, we are guaranteed to have hit `0`.
