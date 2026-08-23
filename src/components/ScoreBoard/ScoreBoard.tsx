import type { Player } from "../../modules/player";
import type { PlayerStats } from "../../modules/playerStats";
import "./ScoreBoard.scss";

function Scoreboard({
  playersStats,
  players,
}: {
  playersStats: PlayerStats[];
  players: Player[];
}) {
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
        {[...playersStats]
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
