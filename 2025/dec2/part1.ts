export function part1(ranges: number[][]) {
  let total = 0;

  for (const [rangeStart, rangeEnd] of ranges) {
    for (let i = rangeStart; i <= rangeEnd; i++) {
      const asString = String(i);

      const firstHalf = asString.slice(0, asString.length / 2);
      const secondHalf = asString.slice(asString.length / 2);

      if (firstHalf === secondHalf) {
        total += i;
      }
    }
  }

  return total;
}
