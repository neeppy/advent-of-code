export function part1(arrangement: string[]) {
  const currentGeneration = arrangement.slice();

  for (let generation = 0; generation < 25; generation++) {
    const currentGenerationSize = currentGeneration.length;

    for (let i = 0; i < currentGenerationSize; i++) {
      const item = currentGeneration[i];

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
