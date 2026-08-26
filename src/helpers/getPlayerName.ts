import type { Player } from "../modules/player";
import type { PlayerSymbol } from "../types/playerSymbol";
import type { CurrentPlayerId } from "../types/currentPlayerId";
import type { GameType } from "../types/gameType";

export function getPlayerName(
  players: Player[],
  currentPlayers: Record<PlayerSymbol, CurrentPlayerId>,
  playerSymbol: PlayerSymbol,
  gameMode: GameType,
): string {
  const currentPlayerId = currentPlayers[playerSymbol];

  if (gameMode === "computer-vs-computer") {
    return playerSymbol === "X" ? "Computer 1" : "Computer 2";
  }

  return (
    players.find((player) => player.id === currentPlayerId)?.name ??
    (currentPlayerId === "computer" ? "Computer" : `Player ${playerSymbol}`)
  );
}
