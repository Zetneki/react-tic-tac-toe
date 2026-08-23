import type { Player } from "./player";
import type { GameResultType } from "../types/gameResultType";

export interface GameResult {
  type: GameResultType;
  player?: Player;
}
