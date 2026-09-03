import { useEffect, useState } from "react";
import "./App.scss";
import Board from "./components/Board/Board";
import MoveHistory from "./components/MoveHistory/MoveHistory";
import type { Player } from "./modules/player";
import type { PlayerStats } from "./modules/playerStats";
import { calculateWinner } from "./helpers/calculateWinner";
import type { PlayerSymbol } from "./types/playerSymbol";
import { updateStats } from "./helpers/updateStats";
import Scoreboard from "./components/ScoreBoard/ScoreBoard";
import Settings from "./components/Settings/Settings";
import type { SettingsValues } from "./modules/settingsValues";
import WinningAnimation from "./components/WinningAnimation/WinningAnimation";
import type { GameResult } from "./modules/gameResult";
import type { CurrentPlayerId } from "./types/currentPlayerId";
import { calculateComputerMove } from "./helpers/calculateComputerMove";
import { COMPUTER_ID } from "./constants/computer";

function App() {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: crypto.randomUUID(),
      name: "Player 1",
      isDefault: true,
    },
    {
      id: crypto.randomUUID(),
      name: "Player 2",
      isDefault: true,
    },
  ]);
  const [currentPlayers, setCurrentPlayers] = useState<
    Record<PlayerSymbol, CurrentPlayerId>
  >({
    X: players[0].id,
    O: players[1].id,
  });
  const [settingsValues, setSettingsValues] = useState<SettingsValues>({
    historyMode: false,
    scoreBoardMode: false,
    boardSize: 3,
    winningAnimationMode: false,
    gameMode: "human-vs-human",
    difficulty: "easy",
  });
  const [playersStats, setPlayersStats] = useState<PlayerStats[]>([]);
  const [history, setHistory] = useState([
    Array(settingsValues.boardSize ** 2).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const isNextX = currentMove % 2 === 0;
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult>({
    type: null,
  });

  function handlePlay(nextSquares: Array<PlayerSymbol | null>) {
    const winner = calculateWinner(nextSquares, settingsValues.boardSize);

    if (winner) {
      const winnerId =
        winner.square === "X" ? currentPlayers.X : currentPlayers.O;
      const loserId =
        winner.square !== "X" ? currentPlayers.X : currentPlayers.O;

      const winnerPlayer = players.find((player) => player.id === winnerId);
      if (winnerPlayer) {
        setGameResult({
          type: "win",
          player: winnerPlayer,
        });
      }

      finishGame(winnerId, loserId);
    } else if (winner === false) {
      setGameResult({
        type: "draw",
      });

      finishGame(currentPlayers.X, currentPlayers.O, true);
    }

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  useEffect(() => {
    const isComputerGame =
      settingsValues.gameMode === "human-vs-computer" ||
      settingsValues.gameMode === "computer-vs-computer";

    if (!isComputerGame) return;

    const winner = calculateWinner(currentSquares, settingsValues.boardSize);
    if (winner) return;

    const currentSymbol = isNextX ? "X" : "O";
    if (currentPlayers[currentSymbol] !== COMPUTER_ID) return;

    const computerMove = calculateComputerMove(
      currentSquares,
      settingsValues.boardSize,
      settingsValues.difficulty,
      currentSymbol,
    );
    if (computerMove === false) return;

    const nextSquares = currentSquares.slice();

    nextSquares[computerMove] = currentSymbol;

    const timeout = setTimeout(() => {
      handlePlay(nextSquares);
    }, 400);

    return () => clearTimeout(timeout);
  }, [
    currentSquares,
    isNextX,
    settingsValues.gameMode,
    settingsValues.boardSize,
    settingsValues.difficulty,
    currentPlayers,
  ]);

  function handleNewGame(size = settingsValues.boardSize) {
    setHistory([Array(size ** 2).fill(null)]);
    setCurrentMove(0);
    setIsGameFinished(false);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function createPlayer(userName: string) {
    if (!userName) return alert("Please enter a name");
    const existingPlayer = players.find((player) => player.name === userName);
    if (existingPlayer) return alert("Player already exists");

    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name: userName,
      isDefault: false,
    };

    setPlayers([...players, newPlayer]);
  }

  function deletePlayer(id: string) {
    const selectedPlayer = players.find((player) => player.id === id);
    if (!selectedPlayer) return;
    if (selectedPlayer.isDefault) return;
    if (currentPlayers.X === id) {
      selectPlayer(players[0].id, "X");
    } else if (currentPlayers.O === id) {
      selectPlayer(players[1].id, "O");
    }

    const updatedPlayers = players.filter((player) => player.id !== id);
    setPlayers(updatedPlayers);
  }

  function selectPlayer(playerId: string, playerSymbol: PlayerSymbol) {
    if (currentPlayers[playerSymbol] === playerId) return;

    handleNewGame();

    if (settingsValues.gameMode === "human-vs-computer") {
      if (playerSymbol === "X") {
        setCurrentPlayers({
          X: playerId,
          O: "computer",
        });
      } else {
        setCurrentPlayers({
          X: "computer",
          O: playerId,
        });
      }

      return;
    }

    setCurrentPlayers((current) => {
      const updatedPlayers = { ...current };

      if (playerSymbol === "X" && updatedPlayers.O === playerId) {
        updatedPlayers.O = current.X;
      }

      if (playerSymbol === "O" && updatedPlayers.X === playerId) {
        updatedPlayers.X = current.O;
      }

      updatedPlayers[playerSymbol] = playerId;

      return updatedPlayers;
    });
  }

  function finishGame(
    winnerId: string,
    loserId: string,
    draw: boolean = false,
  ) {
    if (isGameFinished || winnerId === COMPUTER_ID || loserId === COMPUTER_ID)
      return;

    const updatedStats = updateStats(playersStats, winnerId, loserId, draw);
    setPlayersStats(updatedStats);
    setIsGameFinished(true);
  }

  return (
    <div className="game">
      <div className="game-settings">
        {settingsValues.winningAnimationMode && isGameFinished && (
          <WinningAnimation result={gameResult} onRestart={handleNewGame} />
        )}
        <Settings
          players={players}
          currentPlayers={currentPlayers}
          setCurrentPlayers={setCurrentPlayers}
          onCreatePlayer={createPlayer}
          onDeletePlayer={deletePlayer}
          onSelectPlayer={selectPlayer}
          settingsValues={settingsValues}
          setSettingsValues={setSettingsValues}
          newGame={handleNewGame}
        />
      </div>
      {settingsValues.scoreBoardMode && (
        <div className="game-score">
          <h2>Scoreboard</h2>
          <Scoreboard
            playersStats={playersStats}
            players={players}
            gameMode={settingsValues.gameMode}
            currentPlayers={currentPlayers}
          />
        </div>
      )}
      <div className="game-board">
        <Board
          players={players}
          currentPlayers={currentPlayers}
          gameMode={settingsValues.gameMode}
          isNextX={isNextX}
          currentSquares={currentSquares}
          onPlay={handlePlay}
          boardSize={settingsValues.boardSize}
        />
        <button onClick={() => handleNewGame()}>New game</button>
      </div>
      {settingsValues.historyMode && (
        <div className="game-info">
          <div className="game-info__title">
            <h2>Moves</h2>
            <h2 title="History mode lets you review moves. Finished games keep their original result.">
              ⓘ
            </h2>
          </div>

          <MoveHistory history={history} jumpTo={jumpTo} />
        </div>
      )}
    </div>
  );
}

export default App;
