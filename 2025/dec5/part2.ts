import { Range } from './utils.ts';

const rangeKey = ([start, end]: Range) => `${start}-${end}`;

const intersects = (
  [start, end]: Range,
  [otherStart, otherEnd]: Range,
) => Math.max(start, otherStart) <= Math.min(end, otherEnd);

export function part2(ranges: Range[]) {
  const mergedRanges: Range[] = [];
  const merged = new Set<string>();

  for (const range of ranges) {
    const mergedRange = range.slice() as Range;
    let intersecting: Range[] = [];

    if (merged.has(rangeKey(range))) {
      continue;
    }

    do {
      intersecting = ranges.filter((otherRange) =>
        otherRange !== range &&
        !merged.has(rangeKey(otherRange)) &&
        intersects(mergedRange, otherRange)
      );

      for (const otherRange of intersecting) {
        const [start, end] = mergedRange;
        const [otherStart, otherEnd] = otherRange;

        merged.add(rangeKey(otherRange));

        mergedRange[0] = Math.min(start, otherStart);
        mergedRange[1] = Math.max(end, otherEnd);
      }
    } while (intersecting.length > 0);

    mergedRanges.push(mergedRange);
  }

  let totalFreshIngredients = 0;

  for (const range of mergedRanges) {
    const [start, end] = range;

    totalFreshIngredients += end - start + 1;
  }

  return totalFreshIngredients;
}
