import type { PlayerSymbol } from "../types/playerSymbol";
import type { DifficultyType } from "../types/difficultyType";
import { calculateEasyMove } from "./calculateComputer/calculateEasyMove";
import { calculateMediumMove } from "./calculateComputer/calculateMediumMove";
import { calculateHardMove } from "./calculateComputer/calculateHardMove";

export function calculateComputerMove(
  currentSquares: Array<PlayerSymbol | null>,
  boardSize: number,
  difficulty: DifficultyType = "easy",
  computerSymbol: PlayerSymbol,
): number | false {
  switch (difficulty) {
    case "easy":
      return calculateEasyMove(currentSquares);
    case "medium":
      return calculateMediumMove(currentSquares, boardSize, computerSymbol);
    case "hard":
      return calculateHardMove(currentSquares, boardSize, computerSymbol);
  }
}
