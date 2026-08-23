import type { PlayerSymbol } from "../types/playerSymbol";

export interface Winner {
  square: PlayerSymbol;
  line: Array<number>;
}
