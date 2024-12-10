## Day 10: Hoof It

You are given a topographic map of a mountain.

```
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
```

- each number represents the height of that tile
- a hiking trail starts at the **trail head** (0 values) and gradually increases in height (always by 1)
- a hiking trail ends when it reaches the highest elevation (9)

## Part One

The score of a **trail head** is the number of unique peaks that the trail can reach. Calculate the sum of each trail head's score.

Example answer: `36`.
Full input answer: `796`.

## Part Two

The rating of a **trail head** is the number of unique different trails that reach a peak. Calculate the sum of each trail head's rating.

Example answer: `81`.
Full input answer: `1942`.

## Solution

For the solution, I implemented a closure that encapsulates the logic of traversing the topographic map.
The closure exposes a `traverse` method that receives the starting location of the hiking trail and returns the following:

- the node of the hiking trail
- the number of peaks that the trail can reach
- the rating of the trail

That pretty much sums up both parts of the problem. But how do we traverse the topographic map?
The traversal logic relies on recursion and boils down to the following:

- if the current node is a peak, add it to the peaks set and return a node with no next direction
- otherwise, look at each of the four neighboring nodes and check if the elevation increases by exactly 1
  - if it does, traverse the neighboring node (recursive call using the neighboring node as the starting location)
  - if it doesn't, ignore the neighboring node
- if none of the neighboring nodes can be traversed, return `undefined` to indicate that the path is blocked
- if there are multiple valid paths, add the number of valid paths to the rating (decreasing one, as that's the main trail)

After the recursion is done, this will leave us with a structure of type:

```ts
type Node = {
  location: Location;
  up?: Node;
  down?: Node;
  left?: Node;
  right?: Node;
};
```

If any of the four directions is `undefined`, that means that the node cannot be traversed to **OR** the path is blocked somewhere further down the map.

![image](https://github.com/user-attachments/assets/c4a8d9cb-9642-407a-83f4-2d68854f1a3e)

