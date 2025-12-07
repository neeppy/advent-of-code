export function part1(lines: string[]) {
  let totalSplits = 0;

  const beams = Array.from({ length: lines[0].length }).map(() => false);

  beams[lines[0].indexOf('S')] = true;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] !== '^') {
        continue;
      }

      if (!beams[j]) {
        continue;
      }

      totalSplits++;

      beams[j] = false;
      beams[j + 1] = true;
      beams[j - 1] = true;
    }
  }

  return totalSplits;
}
