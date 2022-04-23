import type { Player } from "../../stores/player";
import { useDeckStore } from "../../stores/deck";

export abstract class Table {
  public gameType: string;
  protected gamePhase: string;
  protected turnCounter: number;
  protected gameSpeed: number;
  protected deck;
  protected players: Player[];
  constructor(
    gameType: string,
    gamePhase: string,
    turnCounter: number,
    gameSpeed: number,
    players: Player[]
  ) {
    this.gameType = gameType;
    this.gamePhase = gamePhase;
    this.turnCounter = turnCounter;
    this.gameSpeed = gameSpeed;
    this.deck = useDeckStore();
    this.players = players;
  }
  public getTurnPlayer(): Player {
    const turnPlayer = this.turnCounter % this.players.length;
    return turnPlayer == 0
      ? this.players[this.players.length - 1]
      : this.players[turnPlayer - 1];
  }
  public onLastPlayer(): boolean {
    return this.getTurnPlayer() == this.players[this.players.length - 1];
  }

  abstract assignPlayerHands(): void;

  abstract haveTurn(userData: number | string | null): void;
}
