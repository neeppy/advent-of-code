## [Day 5: Print Queue](https://adventofcode.com/2024/day/5)

You are given a bunch of ordering rules for a printing queue. It has the following format:

```
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
```

- first part defines the ordering rules of the pages to be printed
    - `47|53` should be read like `if page 47 is in the same queue as 53, then page 47 should be printed first`
- second part defines the actual printing queues

## Part One

Check how many of the printing queues are in valid order. Add up the middle number of each **valid** queue.

Example result: `143`.
Full input result: `4689`.

### Solution

Create a precedence map of each page and all the numbers that should be printed after it. For example:
```
47 => [53, 13, 61, 29]
```

Iterate over the elements of the queue and for each element, check if all the numbers after it are in the precedence map.
If any of the numbers are not in the precedence map, the queue is not valid.

All that remains is adding up the middle number of each valid queue.

## Part Two

We now need to update the printing queues to be in the correct order. Add up the middle number of each queue after updating it.

Example result: `123`.
Full input result: `6336`.

### Solution

Use the algorithm from P1 to rule out all the queues that are already valid.
Now that we have a list of only invalid queues, iterate over them and perform a simple "bubble sort" to update the queues.

The algorithm is simple:
- iterate over the queue
- for each element, check if all the numbers after it are in the precedence map
- if any of the numbers are not in the precedence map, swap the element with the next element

This will update the queues in the correct order. 
This is essentially a "bubble sort" algorithm, but instead of comparing mathematically, we compare based on the precedence map.
