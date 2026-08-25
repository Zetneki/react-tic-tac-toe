import type { Player } from "../modules/player";
import type { PlayerSymbol } from "../types/playerSymbol";
import type { CurrentPlayerId } from "../types/currentPlayerId";

export function getPlayerName(
  players: Player[],
  currentPlayers: Record<PlayerSymbol, CurrentPlayerId>,
  playerSymbol: PlayerSymbol,
): string {
  return (
    players.find((player) => player.id === currentPlayers[playerSymbol])
      ?.name ??
    (currentPlayers[playerSymbol] === "computer"
      ? "Computer"
      : `Player ${playerSymbol}`)
  );
}
