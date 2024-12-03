export function part2(memory: string) {
  const instructions = memory.matchAll(
    /(mul\((\d+),(\d+)\))|(do\(\))|(don't\(\))/g,
  );

  let instructionsEnabled = true;
  let sum = 0;

  for (const instruction of instructions) {
    const [matchedInstruction, , x, y] = instruction;

    if (matchedInstruction === "don't()") {
      instructionsEnabled = false;
    } else if (matchedInstruction === 'do()') {
      instructionsEnabled = true;
    } else if (!instructionsEnabled) {
      continue;
    }

    sum += Number(x) * Number(y);
  }

  return sum;
}
