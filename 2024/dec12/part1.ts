type Region = {
  type: string;
  perimeter: number;
  area: number;
  visited: Record<string, true>;
};

const DEFAULT_REGION = {
  type: '?',
  perimeter: 0,
  area: 0,
  visited: {},
} satisfies Region;

function parseRegion(
  lines: string[],
  region: string,
  startRow: number,
  startCol: number,
  visited: Record<string, true> = {},
): Region | undefined {
  if (visited[`${startRow},${startCol}`]) {
    return undefined;
  }

  const currentRegion = lines[startRow]?.[startCol];

  if (currentRegion !== region) {
    // This is the end of the region
    // We increment the perimeter to add a fence here, but not the area
    return {
      type: currentRegion,
      perimeter: 1,
      area: 0,
      visited,
    };
  }

  visited[`${startRow},${startCol}`] = true;

  const above = parseRegion(lines, region, startRow - 1, startCol, visited) ??
    DEFAULT_REGION;

  const below = parseRegion(lines, region, startRow + 1, startCol, visited) ??
    DEFAULT_REGION;

  const left = parseRegion(lines, region, startRow, startCol - 1, visited) ??
    DEFAULT_REGION;

  const right = parseRegion(lines, region, startRow, startCol + 1, visited) ??
    DEFAULT_REGION;

  return {
    type: currentRegion,
    perimeter: above.perimeter + below.perimeter + left.perimeter +
      right.perimeter,
    area: 1 + above.area + below.area + left.area + right.area,
    visited,
  } satisfies Region;
}

export function part1(lines: string[]) {
  const visited: Record<string, true> = {};

  let totalFencePrice = 0;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (visited[`${i},${j}`]) continue;

      const regionType = lines[i][j];

      const region = parseRegion(lines, regionType, i, j)!;
      Object.assign(visited, region.visited);

      totalFencePrice += region.perimeter * region.area;
    }
  }

  return totalFencePrice;
}
