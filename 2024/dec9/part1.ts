import { pushNTimesToArray } from './utils.ts';

export function part1(fileSizes: number[], freeSpaceSizes: number[]) {
  const occupiedSpace = Array(fileSizes[0]).fill(0);

  for (let i = 0; i < freeSpaceSizes.length; i++) {
    for (let fileId = fileSizes.length - 1; fileId >= i; fileId--) {
      if (freeSpaceSizes[i] === 0) break;
      if (fileSizes[fileId] === 0) continue;

      const minSize = Math.min(freeSpaceSizes[i], fileSizes[fileId]);

      pushNTimesToArray(occupiedSpace, minSize, fileId);

      freeSpaceSizes[i] -= minSize;
      fileSizes[fileId] -= minSize;
    }

    if (freeSpaceSizes[i] === 0) {
      pushNTimesToArray(occupiedSpace, fileSizes[i + 1], i + 1);
      fileSizes[i + 1] = 0;
    }
  }

  let checksum = 0;

  // skipping over the 0th file, because the fileId is 0, so the checksum doesn't change
  for (let i = fileSizes[0]; i < occupiedSpace.length; i++) {
    checksum += occupiedSpace[i] * i;
  }

  return checksum;
}
