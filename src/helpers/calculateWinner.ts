import type { PlayerSymbol } from "../types/playerSymbol";
import type { Winner } from "../modules/winner";

export function calculateWinner(
  squares: Array<PlayerSymbol | null>,
  boardSize: number,
): Winner | false | null {
  const lines = getWinningLines(boardSize);

  function getWinningLines(size: number): Array<Array<number>> {
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

  for (const line of lines) {
    const first = squares[line[0]];

    if (first && line.every((index) => squares[index] === first)) {
      return {
        square: first,
        line,
      };
    }
  }

  if (squares.filter((square) => square === null).length === 0) return false;

  return null;
}
