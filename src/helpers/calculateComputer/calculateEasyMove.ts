import type { PlayerSymbol } from "../../types/playerSymbol";

export function calculateEasyMove(
  currentSquares: Array<PlayerSymbol | null>,
): number | false {
  const availableSquareIndexes = [];

  for (let i = 0; i < currentSquares.length; i++) {
    if (currentSquares[i] === null) availableSquareIndexes.push(i);
  }

  if (availableSquareIndexes.length === 0) return false;

  const randomIndex = Math.floor(Math.random() * availableSquareIndexes.length);

  return availableSquareIndexes[randomIndex];
}
