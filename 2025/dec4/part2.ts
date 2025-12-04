import { countAround } from './utils.ts';

const PAPER_ROLL = '@';

const countAccessiblePaperRolls = (lines: string[][]) => {
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
        lines[i][j] = '.';
      }
    }
  }

  return [totalAccessiblePaperRolls, lines] as const;
};

export function part2(lines: string[][]) {
  let totalAccessiblePaperRolls = 0;

  let previousAccessiblePaperRolls = 0;
  let modifiedPaperRollMap: string[][] = lines;

  do {
    [previousAccessiblePaperRolls, modifiedPaperRollMap] =
      countAccessiblePaperRolls(modifiedPaperRollMap);

    totalAccessiblePaperRolls += previousAccessiblePaperRolls;
  } while (previousAccessiblePaperRolls > 0);

  return totalAccessiblePaperRolls;
}
