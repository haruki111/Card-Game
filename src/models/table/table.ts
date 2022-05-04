import type { Player } from "@/models/player/player";
import type { Card } from "@/stores/card";
import { useDeckStore } from "../../stores/deck";

export abstract class Table {
  protected _gameType: string;
  protected _gamePhase: string;
  protected _turnCounter: number;
  protected _round: number;
  protected _currRound: number;
  protected _gameSpeed: number;
  protected _deck;
  protected _players: Player[];
  constructor(
    gameType: string,
    gamePhase: string,
    round: number,
    gameSpeed: number,
    players: Player[]
  ) {
    this._gameType = gameType;
    this._gamePhase = gamePhase;
    this._turnCounter = 1;
    this._round = round; // todo totalRound 後日書き換え
    this._currRound = 1;
    this._gameSpeed = gameSpeed;
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

  get round(): number {
    return this._round;
  }

  get currRound(): number {
    return this._currRound;
  }

  set currRound(round: number) {
    this._currRound = round;
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
    const turnPlayer: number = this.turnCounter % this.players.length;
    return turnPlayer == 0
      ? this.players[this.players.length - 1]
      : this.players[turnPlayer - 1];
  }
  public onLastPlayer(): boolean {
    return this.getTurnPlayer() == this.players[this.players.length - 1];
  }

  abstract assignPlayerHands(): void;

  abstract haveTurn(userData: number | string | Card | null): void;

  abstract nextRound(): void;
}
