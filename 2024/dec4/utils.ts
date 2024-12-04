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

export const diagonalCenteredOn = (
  lines: string[],
  { centeredOn, length }: { centeredOn: [number, number]; length: number },
) => {
  // First Diagonal: \
  let firstDiagonal = '';

  // Second Diagonal: /
  let secondDiagonal = '';

  const [ln, char] = centeredOn;

  for (let i = -length; i <= length; i++) {
    firstDiagonal += lines[ln + i]?.charAt(char + i) ?? '';
    secondDiagonal += lines[ln - i]?.charAt(char + i) ?? '';
  }

  return [firstDiagonal, secondDiagonal] as const;
};
