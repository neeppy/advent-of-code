# [Day 6: Guard Gallivant](https://adventofcode.com/2024/day/6)

You are given a map of an area where a guard is patrolling.

```
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
```

- the guard is initially facing up and is moving straight forward until he meets a `#` tile
- when a `#` tile is reached, the guard turns right and continues moving forward

## Part One

How many distinct tiles will the guard visit before going outside the map?

Example result: `41`.
Full input result: `5080`.

### Solution

Given the starting position of the guard, go straight forward one step at a time until you reach a `#` tile.
Once a `#` tile is reached, turn right and continue moving forward. Each step is recorded in a `visited` set, which will contain the coordinates of the visited tiles.

When the guard reaches any of the four boundaries of the map, return the size of the `visited` set.

## Part Two

We can now place **one obstacle** anywhere on the map. The target is getting the guard stuck in a loop.
How many different obstacles can be placed to always have the guard walk in a loop?

Example result: `6`.
Full input result: `1919`.

### Solution

Re-use the same algorithm as the one in P1 to find the path that the guard will take.
The obstacles should only be placed on a tile from that path, otherwise, the guard would never reach it.

Iterate over the path and place obstacles on each tile at a time. This is done by reconstructing the map, with one extra obstacle.
After that, re-use the P1 algorithm to find the path for this new map. 

To determine whether the guard is stuck in a loop, check if the guard reaches the same tile (with the same direction) twice.
If he does, we count this solution in.

**Possible improvements**
- instead of going one by one through the path, we could create a map of the obstacles
    - this would require less iterations, as the guard would "teleport" from one obstacle to another
