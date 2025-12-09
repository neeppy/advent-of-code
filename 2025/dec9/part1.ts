import { Vector2 } from './utils.ts';

const area = ([xA, yA]: Vector2, [xB, yB]: Vector2) => {
  const dx = Math.abs(xA - xB) + 1;
  const dy = Math.abs(yA - yB) + 1;

  return dx * dy;
};

export function part1(coordinates: Vector2[]) {
  let largestArea = 0;

  for (let i = 0; i < coordinates.length - 1; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
      const rectangleArea = area(coordinates[i], coordinates[j]);

      if (rectangleArea < largestArea) {
        continue;
      }

      largestArea = rectangleArea;
    }
  }

  return largestArea;
}
