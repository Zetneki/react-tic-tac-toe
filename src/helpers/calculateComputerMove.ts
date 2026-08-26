import type { PlayerSymbol } from "../types/playerSymbol";
import type { DifficultyType } from "../types/difficultyType";
import { getWinningLines } from "./getWinningLines";

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
      return calculateHardMove(currentSquares);
  }
}

function calculateEasyMove(
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

function calculateMediumMove(
  currentSquares: Array<PlayerSymbol | null>,
  boardSize: number,
  computerSymbol: PlayerSymbol,
): number | false {
  const availableSquareIndexes = [];

  for (let i = 0; i < currentSquares.length; i++) {
    if (currentSquares[i] === null) availableSquareIndexes.push(i);
  }

  if (availableSquareIndexes.length === 0) return false;

  const playerSymbol = computerSymbol === "X" ? "O" : "X";

  const lines = getWinningLines(boardSize);

  // try to win

  for (const line of lines) {
    let availableSpot: number | null = null;
    let usedSpotByComputer: number = 0;

    for (const index of line) {
      if (currentSquares[index] === null) availableSpot = index;
      else if (currentSquares[index] === computerSymbol) usedSpotByComputer++;
    }
    if (availableSpot !== null && usedSpotByComputer === line.length - 1)
      return availableSpot;
  }

  // try block

  for (const line of lines) {
    let availableSpot: number | null = null;
    let usedSpotByPlayer: number = 0;

    for (const index of line) {
      if (currentSquares[index] === null) availableSpot = index;
      else if (currentSquares[index] === playerSymbol) usedSpotByPlayer++;
    }
    if (availableSpot !== null && usedSpotByPlayer === line.length - 1)
      return availableSpot;
  }

  // try winning line

  let bestLine: number[] | null = null;
  let bestImportance = 0;

  // check the lines' values for the computer symbol if no playerSymbol in the line and save the best one

  for (const line of lines) {
    const lineValues = line.map((index) => currentSquares[index]);

    if (
      lineValues.includes(computerSymbol) &&
      !lineValues.includes(playerSymbol)
    ) {
      const importance = lineValues.filter(
        (value) => value === computerSymbol,
      ).length;

      if (importance > bestImportance) {
        bestLine = line;
        bestImportance = importance;
      }
    }
  }
  // return the empty square index

  if (bestLine !== null) {
    for (const index of bestLine) {
      if (currentSquares[index] === null) return index;
    }
  }

  //random

  const randomIndex = Math.floor(Math.random() * availableSquareIndexes.length);

  return availableSquareIndexes[randomIndex];
}

function calculateHardMove(
  currentSquares: Array<PlayerSymbol | null>,
): number | false {
  return false;
}
