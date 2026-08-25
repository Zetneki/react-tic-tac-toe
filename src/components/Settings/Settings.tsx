import { useState } from "react";
import "./Settings.scss";
import type { SettingsPage } from "../../types/settingsPage";
import PlayerManagement from "./PlayerManagement/PlayerManagement";
import type { Player } from "../../modules/player";
import type { PlayerSymbol } from "../../types/playerSymbol";
import type { SettingsValues } from "../../modules/settingsValues";
import type { GameType } from "../../types/gameType";
import type { CurrentPlayerId } from "../../types/currentPlayerId";

function Settings({
  players,
  currentPlayers,
  setCurrentPlayers,
  onCreatePlayer,
  onDeletePlayer,
  onSelectPlayer,
  settingsValues,
  setSettingsValues,
  newGame,
}: {
  players: Player[];
  currentPlayers: Record<PlayerSymbol, CurrentPlayerId>;
  setCurrentPlayers: (players: Record<PlayerSymbol, CurrentPlayerId>) => void;
  onCreatePlayer: (name: string) => void;
  onDeletePlayer: (id: string) => void;
  onSelectPlayer: (playerId: string, playerSymbol: PlayerSymbol) => void;
  settingsValues: SettingsValues;
  setSettingsValues: (values: SettingsValues) => void;
  newGame: (size: number) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<SettingsPage>("main");

  return (
    <>
      <button onClick={() => setOpen(!open)}>Settings</button>
      {open && (
        <div className="overlay">
          <div className="overlay__settings">
            <button className="close" onClick={() => setOpen(false)}>
              Close
            </button>

            {page === "main" && (
              <div className="main">
                <h2>Settings</h2>
                <ul>
                  <li>
                    <button onClick={() => setPage("players")}>
                      Player management
                    </button>
                  </li>
                  <li>
                    Show history
                    <span>
                      <input
                        type="checkbox"
                        checked={settingsValues.historyMode}
                        onChange={(e) =>
                          setSettingsValues({
                            ...settingsValues,
                            historyMode: e.target.checked,
                          })
                        }
                      ></input>
                    </span>
                  </li>
                  <li>
                    Show scoreboard
                    <span>
                      <input
                        type="checkbox"
                        checked={settingsValues.scoreBoardMode}
                        onChange={(e) =>
                          setSettingsValues({
                            ...settingsValues,
                            scoreBoardMode: e.target.checked,
                          })
                        }
                      ></input>
                    </span>
                  </li>
                  <li>
                    Board size
                    <span>
                      <select
                        value={settingsValues.boardSize}
                        onChange={(e) => {
                          const newSize = Number(e.target.value);

                          setSettingsValues({
                            ...settingsValues,
                            boardSize: newSize,
                          });

                          newGame(newSize);
                        }}
                      >
                        <option value="3">3x3</option>
                        <option value="4">4x4</option>
                        <option value="5">5x5</option>
                      </select>
                    </span>
                  </li>
                  <li>
                    Winning animation
                    <span>
                      <input
                        type="checkbox"
                        checked={settingsValues.winningAnimationMode}
                        onChange={(e) =>
                          setSettingsValues({
                            ...settingsValues,
                            winningAnimationMode: e.target.checked,
                          })
                        }
                      ></input>
                    </span>
                  </li>
                  <li>
                    Game mode:
                    <span>
                      <input
                        type="radio"
                        name="gamemode"
                        value="human-vs-human"
                        id="human-vs-human"
                        checked={settingsValues.gameMode === "human-vs-human"}
                        onChange={(e) => {
                          const gameMode = e.target.value as GameType;
                          setSettingsValues({
                            ...settingsValues,
                            gameMode,
                          });

                          setCurrentPlayers({
                            X: players[0].id,
                            O: players[1].id,
                          });

                          newGame(settingsValues.boardSize);
                        }}
                      />
                      <label htmlFor="human-vs-human">Human vs Human</label>
                      <input
                        type="radio"
                        name="gamemode"
                        value="human-vs-computer"
                        id="human-vs-computer"
                        checked={
                          settingsValues.gameMode === "human-vs-computer"
                        }
                        onChange={(e) => {
                          const gameMode = e.target.value as GameType;
                          setSettingsValues({
                            ...settingsValues,
                            gameMode,
                          });

                          setCurrentPlayers({
                            X: players[0].id,
                            O: "computer",
                          });

                          newGame(settingsValues.boardSize);
                        }}
                      />
                      <label htmlFor="human-vs-computer">
                        Human vs Computer
                      </label>
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {page === "players" && (
              <div className="player-management">
                <div className="header">
                  <h2>Player management</h2>
                  <button onClick={() => setPage("main")}>Back to main</button>
                </div>
                <PlayerManagement
                  players={players}
                  currentPlayers={currentPlayers}
                  onCreatePlayer={onCreatePlayer}
                  onDeletePlayer={onDeletePlayer}
                  onSelectPlayer={onSelectPlayer}
                  gameMode={settingsValues.gameMode}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Settings;
