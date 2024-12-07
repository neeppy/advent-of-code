# [Day 1: Historian Hysteria](https://adventofcode.com/2024/day/1)

You are given two lists of locations:

```
3   4
4   3
2   5
1   3
3   9
3   3
```

## Part One

Compare how different the two lists are by comparing the smallest number in the left list with the smallest in the right list and so on.
Add up the distances.

Example answer: `11`.
Full input answer: `2285373`.

### Solution

Sort both lists and then simply iterate over and compare the elements.

## Part Two

Find out how similar the two lists are by multiplying each number in the left list by the number of times it appears in the right list.
What is the total similarity score?

Example answer: `31`.
Full input answer: `21142653`.

### Solution

Create a frequency map for the left list and iterate over the right list.
Iterate over the left list and sum up the number, times the frequency of the number in the right list.
