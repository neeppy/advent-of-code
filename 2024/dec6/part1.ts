import { intervalValidator } from './utils.ts';

type Vector2 = [number, number];
type Direction = 'up' | 'down' | 'left' | 'right';

const directions: Record<Direction, Vector2> = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
} as const;

const rotations = new Map<Vector2, Vector2>([
  [directions.up, directions.right],
  [directions.down, directions.left],
  [directions.left, directions.up],
  [directions.right, directions.down],
]);

export function findPath(
  lines: string[],
  [startRow, startCol]: [number, number],
) {
  const isWithinMapHeight = intervalValidator(1, lines.length - 2);
  const isWithinMapWidth = intervalValidator(1, lines[0].length - 2);

  const visited = new Set<string>();

  let currentDirection = directions.up;

  let currentRow = startRow;
  let currentCol = startCol;

  while (isWithinMapHeight(currentRow) && isWithinMapWidth(currentCol)) {
    visited.add(currentRow + ',' + currentCol);

    const [dx, dy] = currentDirection;

    currentRow += dx;
    currentCol += dy;

    const potentialNextPosition = lines[currentRow + dx]?.[currentCol + dy];

    if (potentialNextPosition === '#') {
      currentDirection = rotations.get(currentDirection)!;
    }
  }

  visited.add(currentRow + ',' + currentCol);

  return visited;
}

export function part1(lines: string[], [startRow, startCol]: [number, number]) {
  const path = findPath(lines, [startRow, startCol]);

  return path.size;
}
