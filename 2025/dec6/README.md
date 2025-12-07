## Day 6: Trash Compactor

Puzzle text: [here](https://adventofcode.com/2025/day/6).

## Part One

Simple enough - just apply the operator between all the numbers on the column.

Example answer: `4277556`.
Full input answer: `5784380717354`.

## Part Two

The problem is not too difficult. The solution I came up with was removing the operator line, then pivoting the "matrix", thus receiving an array of strings, where each string is a column of the matrix. For example:

```
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  
```

Becomes:
```json
[
  "1",   "24",  "356", "",
  "369", "248", "8",   "",
  "32",  "581", "175", "",
  "623", "431", "4"
]
```

Since all numbers are separated by a space, our array will strings (numbers), separated by a `""` (empty string). We apply the operators for each entry of the transformed array, until we reach an empty string, when we move on to the next operator.

Example answer: `3263827`.
Full input answer: `7996218225744`.
