import { useDeckStore } from "../../stores/deck";
import type { BlackJackPlayer } from "@/models/player/blackJackPlayer";
import type { Crazy8Player } from "@/models/player/crazy8Player";

export abstract class Table {
  protected _gameType: string;
  protected _gamePhase: string;
  protected _turnCounter: number;
  protected _round: number;
  protected _currRound: number;
  protected _deck;
  protected _players: BlackJackPlayer[] | Crazy8Player[];
  protected _drawTime: number;
  protected _balloonTime: number;
  protected _nextRoundTime: number;

  constructor(
    gameType: string,
    gamePhase: string,
    round: number,
    players: BlackJackPlayer[] | Crazy8Player[]
  ) {
    this._gameType = gameType;
    this._gamePhase = gamePhase;
    this._turnCounter = 1;
    this._round = round;
    this._currRound = 1;
    this._deck = useDeckStore();
    this._players = players;
    this._drawTime = 500;
    this._balloonTime = 500;
    this._nextRoundTime = 500;
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

  get players(): BlackJackPlayer[] | Crazy8Player[] {
    return this._players;
  }

  get deck() {
    return this._deck;
  }

  get drawTime(): number {
    return this._drawTime;
  }

  get balloonTime(): number {
    return this._balloonTime;
  }

  get nextRoundTime(): number {
    return this._nextRoundTime;
  }

  public onLastPlayer(): boolean {
    return this.getTurnPlayer() == this.players[this.players.length - 1];
  }

  public onFirstPlayer(): boolean {
    return this.getTurnPlayer() == this.players[0];
  }

  abstract getTurnPlayer(): BlackJackPlayer | Crazy8Player;

  abstract assignPlayerHands(): void;

  abstract haveTurn(userData: number | string | null): void;

  abstract nextRound(): void;
}
