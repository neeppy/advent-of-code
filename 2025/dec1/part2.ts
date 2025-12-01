export function part2(lines: string[], dialStart: number = 50) {
  let position = dialStart;
  let zeroHits = 0;

  for (const line of lines) {
    const sign = line[0] === 'R' ? 1 : -1;
    const number = Number(line.substring(1));

    const absNumber = sign * number;

    const signBefore = Math.sign(position);
    const signAfter = Math.sign(position + absNumber);

    if (signBefore !== signAfter && signBefore !== 0) {
      zeroHits++;
    }

    position += absNumber;

    zeroHits += Math.floor(Math.abs(position / 100));

    position %= 100;
  }

  return zeroHits;
}
