import type { PlayerSymbol } from "../../types/playerSymbol";
import { minimax } from "./minimax";

export function calculateHardMove(
  currentSquares: Array<PlayerSymbol | null>,
  boardSize: number,
  computerSymbol: PlayerSymbol,
): number | false {
  const availableSquareIndexes = [];

  for (let i = 0; i < currentSquares.length; i++) {
    if (currentSquares[i] === null) availableSquareIndexes.push(i);
  }

  if (availableSquareIndexes.length === 0) return false;

  // check all available squares

  let bestMove = availableSquareIndexes[0];
  let bestScore = -Infinity;
  const depth = boardSize === 3 ? 9 : boardSize === 4 ? 4 : 3;

  for (const index of availableSquareIndexes) {
    const nextSquares = currentSquares.slice();
    nextSquares[index] = computerSymbol;

    // false: player's turn, true: computer's turn
    const score = minimax(
      nextSquares,
      boardSize,
      computerSymbol,
      false,
      -Infinity,
      Infinity,
      depth,
    );

    // save which move has the best score

    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  return bestMove;
}
