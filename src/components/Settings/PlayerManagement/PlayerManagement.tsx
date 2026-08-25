import { useState } from "react";
import type { Player } from "../../../modules/player";
import "./PlayerManagement.scss";
import type { PlayerSymbol } from "../../../types/playerSymbol";
import type { GameType } from "../../../types/gameType";

function PlayerManagement({
  players,
  currentPlayers,
  onCreatePlayer,
  onDeletePlayer,
  onSelectPlayer,
  gameMode,
}: {
  players: Player[];
  currentPlayers: Record<PlayerSymbol, string>;
  onCreatePlayer: (name: string) => void;
  onDeletePlayer: (id: string) => void;
  onSelectPlayer: (playerId: string, playerSymbol: PlayerSymbol) => void;
  gameMode: GameType;
}) {
  const [playerName, setPlayerName] = useState<string>("");

  function handleCreatePlayer() {
    onCreatePlayer(playerName);
    setPlayerName("");
  }

  if (gameMode === "human-vs-computer") {
    return (
      <div className="player-management">
        <div className="player-management__header">
          <input
            type="text"
            placeholder="Player name"
            value={playerName}
            maxLength={20}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={() => handleCreatePlayer()}>
            Create new player
          </button>
        </div>

        {players.map((player) => (
          <div className="player-row" key={player.id}>
            <div className="player-row__name">
              <p>{player.name}</p>

              {player.id === currentPlayers.X && <p>Currently playing as X</p>}
              {player.id === currentPlayers.O && <p>Currently playing as O</p>}
            </div>

            <div className="player-row__handle">
              <button
                disabled={player.id === currentPlayers.X}
                onClick={() => onSelectPlayer(player.id, "X")}
              >
                Play as X
              </button>

              <button
                disabled={player.id === currentPlayers.O}
                onClick={() => onSelectPlayer(player.id, "O")}
              >
                Play as O
              </button>

              {!player.isDefault && (
                <button onClick={() => onDeletePlayer(player.id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="player-management">
      <div className="player-management__header">
        <input
          type="text"
          placeholder="Player name"
          value={playerName}
          maxLength={20}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button onClick={() => handleCreatePlayer()}>Create new player</button>
      </div>

      {players.map((player) => (
        <div className="player-row" key={player.id}>
          <div className="player-row__name">
            <p>{player.name}</p>
            {player.id === currentPlayers.X && <p>Current X</p>}
            {player.id === currentPlayers.O && <p>Current O</p>}
          </div>
          <div className="player-row__handle">
            <button
              disabled={player.id === currentPlayers.X}
              onClick={() => onSelectPlayer(player.id, "X")}
            >
              Select for X
            </button>
            <button
              disabled={player.id === currentPlayers.O}
              onClick={() => onSelectPlayer(player.id, "O")}
            >
              Select for O
            </button>
            {!player.isDefault && (
              <button onClick={() => onDeletePlayer(player.id)}>Delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlayerManagement;
