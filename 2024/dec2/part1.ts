function isSafe(report: number[]) {
  const firstDiff = report[1] - report[0];
  const reportSign = Math.sign(firstDiff);

  if (firstDiff === 0 || Math.abs(firstDiff) > 3) {
    return false;
  }

  for (let i = 1; i < report.length - 1; i++) {
    const diff = report[i + 1] - report[i];

    if (diff === 0 || Math.abs(diff) > 3) {
      return false;
    }

    if (Math.sign(diff) !== reportSign) {
      return false;
    }
  }

  return true;
}

export function part1(reports: number[][]) {
  const safeReports = reports.filter(isSafe);

  return safeReports.length;
}
