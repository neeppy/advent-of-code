# [Day 7: Bridge Repair](https://adventofcode.com/2024/day/7)

You are given a list of equations in the following format:

```
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
```

- the first number is the result of the equation
- the rest of the line is a list of operands separated by spaces

## Part One

Given the `+` and `*` operators, find if any of the equations can be solved using any combination of these operators.
If so, add the result of the equation to your final answer.

Example result: `3749`.
Full input result: `4364915411363`.

![image](https://github.com/user-attachments/assets/6c25482f-ee2b-4c89-afc4-668b40fd0c32)

## Part Two

Another operator is added into the mix: `concatenation`. Unlike `+` and `*`, concatenation will stick the two numbers together.
For example, if the first operand is `1` and the second operand is `2`, the result will be `12`.

Find if any of the equations can be solved using any combination of the operators `+`, `*`, and `concatenation`.

Example result: `11387`.
Full input result: `38322057216320`.
