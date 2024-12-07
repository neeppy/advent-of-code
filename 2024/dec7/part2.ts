import { Operation, validateOperands } from './utils.ts';

const operators = [
  (x: number, y: number) => x + y,
  (x: number, y: number) => x * y,
  (x: number, y: number) => Number(`${x}${y}`),
] satisfies Operation[];

export function part2(lines: string[]) {
  let sum = 0;

  for (const line of lines) {
    const [result, values] = line.split(/:\s+/);

    const target = Number(result);
    const operands = values.split(/\s+/).map(Number);

    sum += validateOperands(target, operands, operators);
  }

  return sum;
}
