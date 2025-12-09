import { Vector2 } from './utils.ts';

const getRectangleEdges = (
  [x1, y1]: Vector2,
  [x2, y2]: Vector2,
): [Vector2, Vector2][] =>
  [
    [
      [x1, y1],
      [x1, y2],
    ],
    [
      [x1, y1],
      [x2, y1],
    ],
    [
      [x1, y2],
      [x2, y2],
    ],
    [
      [x2, y1],
      [x2, y2],
    ],
  ] satisfies [Vector2, Vector2][];

const isRectangleWithinArea = (
  edges: Map<Vector2, Vector2>,
  firstCorner: Vector2,
  secondCorner: Vector2,
) => {
  let tile: Vector2 = firstCorner;

  const rectangleEdges = getRectangleEdges(
    firstCorner,
    secondCorner,
  );

  const crosses = rectangleEdges.some((edge) => {
    const [[edgeX1, edgeY1], [edgeX2, edgeY2]] = edge;

    do {
      const nextTile = edges.get(tile)!;
    } while (tile !== firstCorner);
  });

  return true;
};

export function part2(coordinates: Vector2[]) {
  const edges: Map<Vector2, Vector2> = new Map();

  for (let i = 0; i < coordinates.length - 1; i++) {
    edges.set(coordinates[i], coordinates[i + 1]);
  }

  edges.set(coordinates[coordinates.length - 1], coordinates[0]);

  for (let i = 0; i < coordinates.length - 1; i++) {
    for (let j = i + 1; j < coordinates.length; j++) {
    }
  }
}
