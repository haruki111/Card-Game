import type { Card } from "@/stores/card";
import type { GameDecision } from "@/models/gameDecision";
import {
  Investments,
  MartingaleMethod,
  GranMartingaleMethod,
  TenPercentMethod,
  GoodManMethod,
} from "@/models/Investments";

export abstract class Player {
  protected _name: string;
  protected _type: string;
  protected _chips: number;
  protected _hand: Card[];
  protected _grades: number[]; //成績
  protected _investment:
    | MartingaleMethod
    | GranMartingaleMethod
    | TenPercentMethod
    | GoodManMethod; //成績
  protected _bet: number; // 現在のラウンドでのベットしているチップ
  protected _winAmount: number; // 勝利金額
  protected _gameStatus: string;

  constructor(name: string, type: string, chips: number) {
    this._name = name;
    this._type = type;
    this._chips = chips;
    if (this._type == "house") this._chips = -1;
    this._hand = [];
    this._grades = []; //成績
    this._investment = new Investments(this._chips).getInvestment(); //投資法
    this._bet = 0; // 現在のラウンドでのベットしているチップ
    this._winAmount = 0; // 勝利金額
    this._gameStatus = "betting";
  }

  get name(): string {
    return this._name;
  }

  get type(): string {
    return this._type;
  }

  set type(type: string) {
    this._type = type;
  }

  get grades(): number[] {
    return this._grades;
  }

  set grades(grades: number[]) {
    this._grades = grades;
  }

  get chips(): number {
    return this._chips;
  }

  set chips(chips: number) {
    this._chips = chips;
  }

  get hand(): Card[] {
    return this._hand;
  }

  set hand(hand: Card[]) {
    this._hand = hand;
  }

  get bet(): number {
    return this._bet;
  }

  set bet(bet: number) {
    this._bet = bet;
  }

  get winAmount(): number {
    return this._winAmount;
  }

  set winAmount(winAmount: number) {
    this._winAmount = winAmount;
  }

  get gameStatus(): string {
    return this._gameStatus;
  }

  set gameStatus(gameStatus: string) {
    this._gameStatus = gameStatus;
  }

  get investment() {
    return this._investment;
  }

  set investment(
    investment:
      | MartingaleMethod
      | GranMartingaleMethod
      | TenPercentMethod
      | GoodManMethod
  ) {
    this._investment = investment;
  }

  abstract getHandScore(): number;

  abstract promptPlayer(
    userData: number | string | null,
    houseScore?: number
  ): GameDecision;

  public updateGrades() {
    if (this.winAmount > 0) this.grades.push(1);
    else if (this.winAmount == 0) this.grades.push(0);
    else if (this.winAmount < 0) this.grades.push(-1);
  }
}
