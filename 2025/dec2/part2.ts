const splitStringInParts = (str: string, parts: number) => {
  const splitParts: string[] = [];
  const length = str.length / parts;

  for (let i = 0; i < parts; i++) {
    const part = str.slice(i * length, Math.min((i + 1) * length, str.length));

    splitParts.push(part);
  }

  return splitParts;
};

export function part2(ranges: number[][]) {
  let total = 0;

  for (const [rangeStart, rangeEnd] of ranges) {
    for (let i = rangeStart; i <= rangeEnd; i++) {
      const asString = String(i);

      let splitIn = 2;

      while (splitIn <= asString.length) {
        const splitParts = splitStringInParts(asString, splitIn);

        if (splitParts.every((part) => part === splitParts[0])) {
          total += i;
          break;
        }

        splitIn++;
      }
    }
  }

  return total;
}
