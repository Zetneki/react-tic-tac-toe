import type { PlayerSymbol } from "../../types/playerSymbol";
import { calculateWinner } from "../calculateWinner";
import { evaluateBoard } from "./evaluateBoard";

export function minimax(
  currentSquares: Array<PlayerSymbol | null>,
  boardSize: number,
  computerSymbol: PlayerSymbol,
  isMaximizing: boolean,
  alpha: number,
  beta: number,
  depth: number,
) {
  // check if the game is finished

  const result = calculateWinner(currentSquares, boardSize);
  const playerSymbol = computerSymbol === "X" ? "O" : "X";

  // return a score based on the result

  if (result) return result.square === computerSymbol ? 10000 : -10000;

  if (result === false) return 0;

  // if no depth is left, evaluate the board

  if (depth === 0)
    return evaluateBoard(currentSquares, boardSize, computerSymbol);

  if (isMaximizing) {
    let bestScore = -Infinity;

    // check all available squares

    for (let i = 0; i < currentSquares.length; i++) {
      if (currentSquares[i] !== null) continue;

      const nextSquares = currentSquares.slice();
      nextSquares[i] = computerSymbol;

      // save score if it's better than the best score
      // change alpha if the score is better than the current alpha

      const score = minimax(
        nextSquares,
        boardSize,
        computerSymbol,
        false,
        alpha,
        beta,
        depth - 1,
      );

      bestScore = Math.max(bestScore, score);
      alpha = Math.max(alpha, bestScore);

      // if alpha is greater than beta, the game is over

      if (beta <= alpha) break;
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    // check all available squares

    for (let i = 0; i < currentSquares.length; i++) {
      if (currentSquares[i] !== null) continue;

      const nextSquares = currentSquares.slice();
      nextSquares[i] = playerSymbol;

      // save score if it's better than the best score
      // change beta if the score is better than the current beta

      const score = minimax(
        nextSquares,
        boardSize,
        computerSymbol,
        true,
        alpha,
        beta,
        depth - 1,
      );

      bestScore = Math.min(bestScore, score);
      beta = Math.min(beta, bestScore);

      // if alpha is greater than beta, the game is over

      if (beta <= alpha) break;
    }

    return bestScore;
  }
}
