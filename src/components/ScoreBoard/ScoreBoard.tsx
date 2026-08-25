import { COMPUTER_ID } from "../../constants/computer";
import type { Player } from "../../modules/player";
import type { PlayerStats } from "../../modules/playerStats";
import type { CurrentPlayerId } from "../../types/currentPlayerId";
import type { GameType } from "../../types/gameType";
import type { PlayerSymbol } from "../../types/playerSymbol";
import "./ScoreBoard.scss";

function Scoreboard({
  playersStats,
  players,
  gameMode,
  currentPlayers,
}: {
  playersStats: PlayerStats[];
  players: Player[];
  gameMode: GameType;
  currentPlayers: Record<PlayerSymbol, CurrentPlayerId>;
}) {
  const humanPlayerId =
    currentPlayers.X === COMPUTER_ID ? currentPlayers.O : currentPlayers.X;
  const visibleStats =
    gameMode === "human-vs-computer"
      ? playersStats.filter((stat) => stat.id === humanPlayerId)
      : playersStats;

  return (
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Wins</th>
          <th>Draws</th>
          <th>Losses</th>
        </tr>
      </thead>
      <tbody>
        {visibleStats
          .sort((a, b) => b.wins - a.wins)
          .map((stat) => (
            <tr key={stat.id}>
              <td>
                {players.find((player) => player.id === stat.id)?.name ??
                  "Unknown"}
              </td>
              <td>{stat.wins}</td>
              <td>{stat.draws}</td>
              <td>{stat.losses}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Scoreboard;
