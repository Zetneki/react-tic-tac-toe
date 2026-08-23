import type { PlayerStats } from "../modules/playerStats";

export function updateStats(
  playersStats: PlayerStats[],
  winnerId: string,
  loserId: string,
  draw: boolean = false,
) {
  const winnerIndex = playersStats.findIndex(
    (player) => player.id === winnerId,
  );
  const loserIndex = playersStats.findIndex((player) => player.id === loserId);

  let updatedStats: PlayerStats[] = [];
  if (draw) {
    updatedStats = [
      {
        id: winnerId,
        wins: winnerIndex !== -1 ? playersStats[winnerIndex].wins : 0,
        draws: winnerIndex !== -1 ? playersStats[winnerIndex].draws + 1 : 1,
        losses: winnerIndex !== -1 ? playersStats[winnerIndex].losses : 0,
      },
      {
        id: loserId,
        wins: loserIndex !== -1 ? playersStats[loserIndex].wins : 0,
        draws: loserIndex !== -1 ? playersStats[loserIndex].draws + 1 : 1,
        losses: loserIndex !== -1 ? playersStats[loserIndex].losses : 0,
      },
    ];
  } else {
    updatedStats = [
      {
        id: winnerId,
        wins: winnerIndex !== -1 ? playersStats[winnerIndex].wins + 1 : 1,
        draws: winnerIndex !== -1 ? playersStats[winnerIndex].draws : 0,
        losses: winnerIndex !== -1 ? playersStats[winnerIndex].losses : 0,
      },
      {
        id: loserId,
        wins: loserIndex !== -1 ? playersStats[loserIndex].wins : 0,
        draws: loserIndex !== -1 ? playersStats[loserIndex].draws : 0,
        losses: loserIndex !== -1 ? playersStats[loserIndex].losses + 1 : 1,
      },
    ];
  }

  const nextPlayersStats = [...playersStats];
  for (const data of updatedStats) {
    const index = nextPlayersStats.findIndex((player) => player.id === data.id);
    index !== -1
      ? (nextPlayersStats[index] = data)
      : nextPlayersStats.push(data);
  }

  return nextPlayersStats;
}
