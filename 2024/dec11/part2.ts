type Node = {
  value: string;
  left?: Node;
  right?: Node;
};

const appearanceCount: Record<string, number> = {};

export function part2(arrangement: string[]) {
  const currentGeneration = arrangement;

  for (let generation = 0; generation < 75; generation++) {
    console.log(`Generation ${generation}:`, currentGeneration.length);

    const currentGenerationSize = currentGeneration.length;

    for (let i = 0; i < currentGenerationSize; i++) {
      const item = currentGeneration[i];

      appearanceCount[item] ??= 0;
      appearanceCount[item]++;

      if (item === '0') {
        currentGeneration[i] = '1';
      } else if (item.length % 2 === 0) {
        currentGeneration[i] = item.substring(0, item.length / 2);
        currentGeneration.push(String(Number(item.substring(item.length / 2))));
      } else {
        currentGeneration[i] = String(Number(item) * 2024);
      }
    }
  }

  return currentGeneration.length;
}
