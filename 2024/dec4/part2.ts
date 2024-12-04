import { diagonalCenteredOn } from './utils.ts';

const xmas = ['MAS', 'SAM'];

export function part2(lines: string[]) {
  let xmasCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
      if (line.charAt(j) !== 'A') continue;

      const [firstDiagonal, secondDiagonal] = diagonalCenteredOn(lines, {
        centeredOn: [i, j],
        length: 1,
      });

      if (xmas.includes(firstDiagonal) && xmas.includes(secondDiagonal)) {
        xmasCount++;
      }
    }
  }

  return xmasCount;
}
