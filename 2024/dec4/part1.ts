import { diagonalCenteredOn } from './utils.ts';

function countXmas(substring: string) {
  let count = 0;

  if (substring.startsWith('SAMX')) {
    count++;
  }

  if (substring.endsWith('XMAS')) {
    count++;
  }

  return count;
}

function countHorizontal(line: string, centeredOn: number) {
  const horizontalSubstring = line.substring(centeredOn - 3, centeredOn + 4);

  return countXmas(horizontalSubstring);
}

function countVertical(lines: string[], lineIndex: number, character: number) {
  let verticalSubstring = '';

  const minIndex = Math.max(lineIndex - 3, 0);
  const maxIndex = Math.min(lineIndex + 3, lines[0].length - 1);

  for (let i = minIndex; i <= maxIndex; i++) {
    verticalSubstring += lines[i].charAt(character);
  }

  return countXmas(verticalSubstring);
}

function countDiagonals(lines: string[], lineIndex: number, character: number) {
  const [firstDiagonalSubstring, secondDiagonalSubstring] = diagonalCenteredOn(
    lines,
    {
      centeredOn: [lineIndex, character],
      length: 3,
    },
  );

  return countXmas(firstDiagonalSubstring) + countXmas(secondDiagonalSubstring);
}

export function part1(lines: string[]) {
  let xmasCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
      if (line[j] !== 'X') continue;

      xmasCount += countHorizontal(line, j);
      xmasCount += countVertical(lines, i, j);
      xmasCount += countDiagonals(lines, i, j);
    }
  }

  return xmasCount;
}
