export function sumStringNumbers(rows: any[], accessor: string) {
  return rows
    .map((row) => parseInt(row[accessor].replace(/,/g, ""), 10))
    .reduce((sum, value) => sum + (isNaN(value) ? 0 : value), 0);
}
