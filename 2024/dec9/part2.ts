import { replaceNTimesAtIndex, sum } from './utils.ts';

export function part2(fileSizes: number[], freeSpaceSizes: number[]) {
  const totalDiskSize = sum(fileSizes) + sum(freeSpaceSizes);
  const occupiedSpace = Array(totalDiskSize).fill(-1);

  const filePointer: Record<number, number> = {};
  const freeSpacePointer: Record<number, [number, number]> = {};

  let totalIndex = 0;

  for (let i = 0; i < freeSpaceSizes.length; i++) {
    filePointer[i] = totalIndex;

    replaceNTimesAtIndex(occupiedSpace, totalIndex, fileSizes[i], i);

    totalIndex += fileSizes[i];
    freeSpacePointer[i] = [totalIndex, freeSpaceSizes[i]];

    replaceNTimesAtIndex(occupiedSpace, totalIndex, freeSpaceSizes[i], -1);
    totalIndex += freeSpaceSizes[i];
  }

  for (let fileId = fileSizes.length - 1; fileId >= 1; fileId--) {
    for (let i = 0; i < fileId; i++) {
      const [startAtIndex, spaceLeft] = freeSpacePointer[i];

      if (spaceLeft >= fileSizes[fileId]) {
        for (let j = 0; j < fileSizes[fileId]; j++) {
          occupiedSpace[startAtIndex + j] = fileId;
          occupiedSpace[filePointer[fileId] + j] = -1;
        }

        freeSpacePointer[i][0] = startAtIndex + fileSizes[fileId];
        freeSpacePointer[i][1] -= fileSizes[fileId];
        freeSpacePointer[fileId - 1][1] += fileSizes[fileId];
        freeSpaceSizes[i] -= fileSizes[fileId];

        break;
      }
    }
  }

  let checksum = 0;

  // skipping over the 0th file, because the fileId is 0, so the checksum doesn't change
  for (let i = fileSizes[0]; i < occupiedSpace.length; i++) {
    if (occupiedSpace[i] === -1) continue;

    checksum += occupiedSpace[i] * i;
  }

  return checksum;
}
