const JOLTAGE_RATINGS = '987654321';

function findLargestBattery(batteryBank: string) {
  for (const rating of JOLTAGE_RATINGS) {
    const index = batteryBank.indexOf(rating);

    if (index !== -1) {
      return [rating, index] as const;
    }
  }

  throw new Error('No battery found');
}

export function part1(banks: string[]) {
  let total = 0;

  for (const batteryBank of banks) {
    let largestJoltageOutput = '';

    const [largestJoltage, index] = findLargestBattery(batteryBank);

    const [secondLargestJoltage] = findLargestBattery(
      index === batteryBank.length - 1
        ? batteryBank.slice(0, index)
        : batteryBank.slice(index + 1),
    );

    if (index === batteryBank.length - 1) {
      largestJoltageOutput = secondLargestJoltage + largestJoltage;
    } else {
      largestJoltageOutput = largestJoltage + secondLargestJoltage;
    }

    total += Number(largestJoltageOutput);
  }

  return total;
}
