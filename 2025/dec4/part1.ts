import { countAround } from './utils.ts';

const PAPER_ROLL = '@';

export function part1(lines: string[]) {
  let totalAccessiblePaperRolls = 0;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] !== PAPER_ROLL) {
        continue;
      }

      const paperRollCount = countAround(
        i,
        j,
        (neighbourRow, neighbourColumn) =>
          lines[neighbourRow]?.[neighbourColumn] === PAPER_ROLL,
      );

      if (paperRollCount < 4) {
        totalAccessiblePaperRolls++;
      }
    }
  }

  return totalAccessiblePaperRolls;
}
