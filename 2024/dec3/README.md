# [Day 3: Mull It Over](https://adventofcode.com/2024/day/3)

You are given a bunch of instructions from a corrupted computer's memory:

```
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
```

- the relevant instructions are in the format `mul(X,Y)`, where X and Y are both numbers
- everything else should be ignored

## Part One

Find all uncorrupted mul instructions. What do you get if you add up the results of the multiplications?

Example answer: `161`.
Full input answer: `189600467`.

### Solution

Use regex to find all the mul instructions. Add up the multiplication results.

## Part Two

There are a bunch of conditional statements in the program:

- `do()` enables future `mul` instructions
- `don't()` disables future `mul` instructions

```
xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
```

Example answer: `48`.
Full input answer: `107069718`.

### Solution

Use regex to find all the mul instructions and the conditional statements and store the boolean conditional in a variable, 
to know if `mul` matches should be counted or not.

Iterate over the regex matches and check if the current match is a mul instruction or a conditional:
- if it's either of the conditionals, update the boolean variable.
- if it's a mul instruction, check if the boolean variable is true, and if so, add the result to the sum
