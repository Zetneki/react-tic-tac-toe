import { useEffect, useState } from "react";
import { calculateWinner } from "../../helpers/calculateWinner";
import type { PlayerSymbol } from "../../types/playerSymbol";
import type { Player } from "../../modules/player";
import Square from "../Square/Square";
import "./Board.scss";
import type { CurrentPlayerId } from "../../types/currentPlayerId";
import { getPlayerName } from "../../helpers/getPlayerName";
import { COMPUTER_ID } from "../../constants/computer";

function Board({
  players,
  currentPlayers,
  isNextX,
  currentSquares,
  onPlay,
  boardSize,
}: {
  players: Player[];
  currentPlayers: Record<PlayerSymbol, CurrentPlayerId>;
  isNextX: boolean;
  currentSquares: Array<PlayerSymbol | null>;
  onPlay: (nextSquares: Array<PlayerSymbol | null>) => void;
  boardSize: number;
}) {
  const [selectedSquare, setSelectedSquare] = useState<number>(0);
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);

  function handleClick(index: number) {
    const currentSymbol: PlayerSymbol = isNextX ? "X" : "O";

    if (currentPlayers[currentSymbol] === COMPUTER_ID) return;

    if (currentSquares[index] || calculateWinner(currentSquares, boardSize))
      return;

    const nextSquares = currentSquares.slice();
    nextSquares[index] = currentSymbol;
    onPlay(nextSquares);
  }

  const winner = calculateWinner(currentSquares, boardSize);
  let status;
  const currentPlayersNames = {
    X: getPlayerName(players, currentPlayers, "X"),
    O: getPlayerName(players, currentPlayers, "O"),
  };

  if (winner) {
    status = `Winner: ${currentPlayersNames[winner.square]}`;
  } else if (winner === false) {
    status = "No winner";
  } else {
    status = isNextX
      ? `Next: ${currentPlayersNames.X}`
      : `Next: ${currentPlayersNames.O}`;
  }

  const rows = getRows(currentSquares, boardSize);

  function getRows(squares: Array<PlayerSymbol | null>, size: number) {
    const rows = [];
    for (let i = 0; i < size; i++) {
      rows.push(squares.slice(i * size, (i + 1) * size));
    }
    return rows;
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isArrowKey = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
      ].includes(event.key);

      if (isArrowKey && !isKeyboardMode) {
        setIsKeyboardMode(true);
        return;
      }

      if (!isKeyboardMode) return;

      switch (event.key) {
        case "ArrowUp":
          setSelectedSquare((prev) =>
            prev - boardSize >= 0 ? prev - boardSize : prev,
          );
          break;
        case "ArrowDown":
          setSelectedSquare((prev) =>
            prev + boardSize < currentSquares.length ? prev + boardSize : prev,
          );
          break;
        case "ArrowLeft":
          setSelectedSquare((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
          break;
        case "ArrowRight":
          setSelectedSquare((prev) =>
            prev + 1 < currentSquares.length ? prev + 1 : prev,
          );
          break;
        case " ":
          handleClick(selectedSquare);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isKeyboardMode, selectedSquare]);

  useEffect(() => {
    const handleMouseDown = () => {
      setIsKeyboardMode(false);
    };

    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <>
      <h2 className="status">{status}</h2>

      {rows.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((square, squareIndex) => {
            const index = row.length * rowIndex + squareIndex;

            const isWinningSquare =
              winner !== null &&
              winner !== false &&
              winner.line.includes(index);

            const isSelectedSquare = isKeyboardMode && index === selectedSquare;

            return (
              <Square
                key={index}
                value={square}
                isWinning={isWinningSquare}
                isSelected={isSelectedSquare}
                onSquareClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

export default Board;
