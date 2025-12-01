export function part1(lines: string[], dialStart: number = 50) {
  let position = dialStart;
  let zeroHits = 0;

  for (const line of lines) {
    const sign = line[0] === 'R' ? 1 : -1;
    const number = Number(line.substring(1));

    position += sign * number;
    position %= 100;

    if (position === 0) {
      zeroHits++;
    }
  }

  return zeroHits;
}
