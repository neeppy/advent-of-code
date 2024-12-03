function isInBounds(x: number) {
  return x !== 0 && Math.abs(x) <= 3;
}

function isSafe(report: number[], failOnError = true): boolean {
  for (let i = 1; i < report.length - 1; i++) {
    const diffAfter = report[i + 1] - report[i];
    const diffBefore = report[i] - report[i - 1];

    if (
      !isInBounds(diffBefore) || !isInBounds(diffAfter) ||
      Math.sign(diffAfter) !== Math.sign(diffBefore)
    ) {
      if (failOnError) {
        return false;
      }

      return isSafe(report.toSpliced(i + 1, 1)) ||
        isSafe(report.toSpliced(i, 1)) ||
        isSafe(report.toSpliced(i - 1, 1));
    }
  }

  return true;
}

export function part2(reports: number[][]) {
  const safeReports = reports.filter((report) => isSafe(report, false));

  return safeReports.length;
}
