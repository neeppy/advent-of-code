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

function getLinesWithObstacleAt(lines: string[], [row, col]: Vector2) {
  const linesClone = lines.slice();

  const newLine = Array.from(linesClone[row]);

  newLine[col] = 'O';
  linesClone[row] = newLine.join('');

  return linesClone;
}

function findPathWithLoops(
  lines: string[],
  [startRow, startCol]: [number, number],
  [replacedRow, replacedCol]: [number, number],
) {
  const isWithinMapHeight = intervalValidator(1, lines.length - 2);
  const isWithinMapWidth = intervalValidator(1, lines[0].length - 2);

  const visited = new Set<string>();
  const visitedWithDirection: Record<string, boolean> = {};

  let currentDirection = directions.up;

  let currentRow = startRow;
  let currentCol = startCol;

  let rotationCount = 0;
  let isLoop = false;

  while (isWithinMapHeight(currentRow) && isWithinMapWidth(currentCol)) {
    visited.add(currentRow + ',' + currentCol);

    const [dx, dy] = currentDirection;

    currentRow += dx;
    currentCol += dy;

    const cellKey = currentRow + ',' + currentCol + '-' + dx + ',' + dy;

    if (visitedWithDirection[cellKey]) {
      isLoop = true;
      break;
    }

    visitedWithDirection[cellKey] = true;

    let potentialNextPosition = lines[currentRow + dx]?.[currentCol + dy];

    while (potentialNextPosition === '#' || potentialNextPosition === 'O') {
      currentDirection = rotations.get(currentDirection)!;
      potentialNextPosition = lines[currentRow + currentDirection[0]]
        ?.[currentCol + currentDirection[1]];

      rotationCount++;
    }
  }

  visited.add(currentRow + ',' + currentCol);

  return [visited, isLoop] as const;
}

export function part2(lines: string[], startAt: [number, number]) {
  const [path] = findPathWithLoops(lines, startAt, startAt);

  let loops = 0;

  path.delete(startAt.join(','));

  for (const location of path) {
    const [row, col] = location.split(',').map(Number);

    const linesWithObstacle = getLinesWithObstacleAt(lines, [row, col]);

    const [, isLoop] = findPathWithLoops(linesWithObstacle, startAt, [
      row,
      col,
    ]);

    loops += Number(isLoop);
  }

  return loops;
}
