# [Day 2: Red-Nosed Reports](https://adventofcode.com/2024/day/2)

You are given a a bunch of reports from the [Red-Nosed Reindeer nuclear fusion/fission](https://adventofcode.com/2015/day/19) plant:

```
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
```

- a report is valid if all the numbers are either increasing or decreasing
- a report is valid if adjacent numbers only differ by at least 1 and at most 3

## Part One

How many reports are valid?

Example answer: `2`.
Full input answer: `663`.

### Solution

Simply iterate over the reports and check if the current report is in order and if adjacent numbers differ by at most 3 and at least 1.

## Part Two

We can perform a single update to the reports to try making them valid. Taking this into account, how many reports are valid after the update?

Example answer: `4`.
Full input answer: `692`.

### Solution

We are using a recursive algorithm to check if a report is valid:
- start iterating over the report, from the second element
- compute the difference to the previous element and to the next element
- check if both differences have the same sign and if they are within the bounds of the report
    - if we find an instability, we do 3 recursive calls:
        - one where we're removing the previous element
        - one where we're removing the current element
        - one where we're removing the next element
- if either of the recursive calls returns true, we return true
- the recursion only goes one level deep, because we can only make one correction per report
