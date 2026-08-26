export function getWinningLines(size: number): Array<Array<number>> {
  const lines: number[][] = [];

  //get horizontal lines
  for (let i = 0; i < size; i++) {
    const horizontalLine: Array<number> = [];
    for (let j = 0; j < size; j++) {
      horizontalLine.push(i * size + j);
    }
    lines.push(horizontalLine);
  }
  //get vertical lines
  for (let i = 0; i < size; i++) {
    const verticalLine: Array<number> = [];
    for (let j = 0; j < size; j++) {
      verticalLine.push(i + j * size);
    }
    lines.push(verticalLine);
  }
  //get diagonal lines
  const diagonalLine1: Array<number> = [];
  for (let i = 0; i < size; i++) {
    diagonalLine1.push(i * size + i);
  }
  lines.push(diagonalLine1);

  const diagonalLine2: Array<number> = [];
  for (let i = 0; i < size; i++) {
    diagonalLine2.push(i * size + (size - 1 - i));
  }
  lines.push(diagonalLine2);

  return lines;
}
