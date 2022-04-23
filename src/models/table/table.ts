import type { Player } from "@/models/player/player";
import { useDeckStore } from "../../stores/deck";

export abstract class Table {
  protected _gameType: string;
  protected _gamePhase: string;
  protected _turnCounter: number;
  protected _gameSpeed: number;
  protected _deck;
  protected _players: Player[];
  constructor(
    gameType: string,
    gamePhase: string,
    turnCounter: number,
    players: Player[]
  ) {
    this._gameType = gameType;
    this._gamePhase = gamePhase;
    this._turnCounter = turnCounter;
    this._gameSpeed = 1;
    this._deck = useDeckStore();
    this._players = players;
  }

  get gameType(): string {
    return this._gameType;
  }

  get gamePhase(): string {
    return this._gamePhase;
  }

  set gamePhase(gamePhase: string) {
    this._gamePhase = gamePhase;
  }

  get turnCounter(): number {
    return this._turnCounter;
  }

  set turnCounter(num: number) {
    this._turnCounter = num;
  }

  get players(): Player[] {
    return this._players;
  }

  get gameSpeed(): number {
    return this._gameSpeed;
  }

  get deck() {
    return this._deck;
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

  abstract nextTurn(): void;
}
