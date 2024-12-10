export type Location = [number, number];

const directions = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
} as const;

type Direction = (typeof directions)[keyof typeof directions];

type Node = {
  location: Location;
  up?: Node;
  down?: Node;
  left?: Node;
  right?: Node;
};

export async function inputByLine(useExample?: boolean) {
  const file = useExample ? 'example.txt' : 'input.txt';
  const day = import.meta.dirname!.split('/').at(-1)!.substring(3);

  const content = await Deno.readTextFile(`dec${day}/${file}`);

  return content.split(/\n/).filter(Boolean);
}

export const sum = (nums: number[], startFrom = 0) =>
  nums.reduce((acc, num) => acc + num, startFrom);

export const sumOf = <T>(
  array: T[],
  callback: (el: T, idx: number) => number,
  startFrom: number = 0,
): number =>
  array.reduce<number>((acc, el, idx) => acc + callback(el, idx), startFrom);

export const lineOfNumbers = (line: string, separator = /\s+/g): number[] =>
  line.split(separator).map(Number);

export const intervalValidator = (min: number, max: number) => (x: number) =>
  x >= min && x <= max;

function moveInDirection(location: Location, direction: Direction) {
  return [
    location[0] + direction[0],
    location[1] + direction[1],
  ] satisfies Location;
}

export const topographicMapParser = (map: number[][]) => {
  const peaks = new Set<string>();
  let trailRating = 0;

  function isGradualIncrease(
    map: number[][],
    location: Location,
    direction: Direction,
  ) {
    const valueAt = map[location[0]][location[1]];
    const valueInDirection = map[location[0] + direction[0]]
      ?.[location[1] + direction[1]];

    return valueInDirection - valueAt === 1;
  }

  function traverseHikingTrails(
    location: Location,
  ): Node | undefined {
    const valueAt = map[location[0]][location[1]];

    if (valueAt === 9) {
      peaks.add(location.join(','));

      return {
        location,
        up: undefined,
        down: undefined,
        left: undefined,
        right: undefined,
      };
    }

    const up = isGradualIncrease(map, location, directions.up)
      ? traverseHikingTrails(moveInDirection(location, directions.up))
      : undefined;

    const down = isGradualIncrease(map, location, directions.down)
      ? traverseHikingTrails(moveInDirection(location, directions.down))
      : undefined;

    const left = isGradualIncrease(map, location, directions.left)
      ? traverseHikingTrails(moveInDirection(location, directions.left))
      : undefined;

    const right = isGradualIncrease(map, location, directions.right)
      ? traverseHikingTrails(moveInDirection(location, directions.right))
      : undefined;

    if (!up && !down && !left && !right) {
      return undefined;
    }

    const validDirections = [up, down, left, right].filter(Boolean).length;

    if (validDirections > 1) {
      trailRating += validDirections - 1;
    }

    return {
      location,
      up,
      down,
      left,
      right,
    };
  }

  return {
    traverse(location: Location): [Node, number, number] {
      const startNode = traverseHikingTrails(location);

      const peaksNo = peaks.size;
      const rating = trailRating + 1;

      peaks.clear();
      trailRating = 0;

      return [startNode!, peaksNo, rating];
    },
  } as const;
};
