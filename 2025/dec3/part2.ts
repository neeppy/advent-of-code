const JOLTAGE_RATINGS = '987654321';

function findLargestBattery(
  batteryBank: string,
) {
  for (const rating of JOLTAGE_RATINGS) {
    const index = batteryBank.indexOf(rating);

    if (index !== -1) {
      return [rating, index] as const;
    }
  }

  throw new Error('Battery bank does not contain any joltage ratings.');
}

export function part2(banks: string[], batterySize = 12) {
  let total = 0;

  for (const batteryBank of banks) {
    let currentIndex = 0;
    let largestJoltageOutput = '';

    for (let i = 0; i < batterySize; i++) {
      const chunkSize = batteryBank.length - batterySize + 1;
      const remainingBatteries = batterySize - largestJoltageOutput.length;

      const [largestJoltageForSegment, index] = findLargestBattery(
        batteryBank.slice(
          currentIndex,
          Math.min(
            currentIndex + chunkSize,
            batteryBank.length - remainingBatteries + 1,
          ),
        ),
      );

      currentIndex += index + 1;
      largestJoltageOutput += largestJoltageForSegment;
    }

    total += Number(largestJoltageOutput);
  }

  return total;
}
