import type { PlayerSymbol } from "../../types/playerSymbol";
import { getWinningLines } from "../getWinningLines";

export function evaluateBoard(
  currentSquares: Array<PlayerSymbol | null>,
  boardSize: number,
  computerSymbol: PlayerSymbol,
) {
  // heuristic evaluation

  const playerSymbol = computerSymbol === "X" ? "O" : "X";
  const lines = getWinningLines(boardSize);

  let score = 0;
  const weights = [0, 1, 10, 100, 1000, 10000];

  // check each line's values

  for (const line of lines) {
    const values = line.map((index) => currentSquares[index]);

    // count the number of player and computer symbols in the line

    const playerCount = values.filter((value) => value === playerSymbol).length;
    const computerCount = values.filter(
      (value) => value === computerSymbol,
    ).length;

    // if the line has only one player, a weighted score is added to the score
    // computer's score is added, player's score is subtracted

    if (playerCount === 0 && computerCount > 0) score += weights[computerCount];
    if (computerCount === 0 && playerCount > 0) score -= weights[playerCount];
  }
  return score;
}
