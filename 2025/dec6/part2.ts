import { sum } from './utils.ts';

const doOperation = {
  '+': (a: number, b: number) => a + b,
  '*': (a: number, b: number) => a * b,
} as const;

type Operator = keyof typeof doOperation;

function pivot(lines: string[]) {
  const newLines: string[] = [];

  for (let i = 0; i < lines[0].length; i++) {
    newLines[i] = '';

    for (let j = 0; j < lines.length; j++) {
      newLines[i] += lines[j][i];
    }

    newLines[i] = newLines[i].trim();
  }

  return newLines;
}

export function part2(lines: string[]) {
  const operators = lines.pop()!.split(/\s+/).filter(Boolean) as Operator[];
  const newLines = pivot(lines);

  const totals = operators.map((operator) => {
    let factor = newLines.shift()!;
    let total = operator === '*' ? 1 : 0;

    while (factor) {
      total = doOperation[operator](total, Number(factor));

      factor = newLines.shift()!;
    }

    return total;
  });

  return sum(totals);
}
