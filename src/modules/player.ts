import type { PlayerType } from "../types/playerType";

export interface Player {
  id: string;
  name: string;
  type: PlayerType;
  isDefault: boolean;
}
