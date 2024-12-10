## [Day 9: Disk Fragmenter](https://adventofcode.com/2024/day/9)

You are given a disk map of a file system.

```
2333133121414131402
```

- first digit represents file sizes 
- second digit represents free space

... and so on.

## Part One

We want to write a disk fragmentation program that moves parts of the file to the left, so that all the free space is at the end of the disk.
Compute a checksum for the resulting disk map, which can be calculated by summing up products between each index and the file ID stored at that index.

Example answer: `1928`.
Full input answer: `6353658451014`.

### Solution

First part is not all that difficult. For each free space of the disk, we are taking up files starting from the end and moving them to the left.
On each iteration, we are adding filling the free space with the file size of the file we are moving (or part of it, if the free space is smaller than the file size).
When there's no more free space on this iteration, we continue by adding the next file that was already there and is not moving (because we know that free spaces are mixed in with files).
After that, we continue with the next free space.

## Part Two

This time, we want to move entire files to the left, if the free space allows it. We must attempt moving every file **only once**.
If a file cannot be moved, we must not try to move it again, even if space frees up.
With this new arrangement, we can calculate the checksum for the resulting disk map.

Example answer: `2858`.
Full input answer: `6382582136592`.

### Solution

Part 2 is a bit more complicated than part 1. This time, we cannot avoid creating the full disk map.
Therefore, the first step is using the input to create the full disk map, where -1 means that the space is free.

After that, the problem becomes quite simple. For each file (starting from the end), we look up through all the available free spaces to its left.
If the free space can contain the entire file, we move it there and update the pointers with the new starting position of the free space, as well as the remaining size of the free space. We also have to update the free space that comes before the file - to mark the old file location as free.

After one single loop over the files, we've moved all the files to the left, and we can calculate the checksum.
