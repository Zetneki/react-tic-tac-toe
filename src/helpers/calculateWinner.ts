import type { PlayerSymbol } from "../types/playerSymbol";
import type { Winner } from "../modules/winner";
import { getWinningLines } from "./getWinningLines";

export function calculateWinner(
  squares: Array<PlayerSymbol | null>,
  boardSize: number,
): Winner | false | null {
  const lines = getWinningLines(boardSize);

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
