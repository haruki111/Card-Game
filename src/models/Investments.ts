import type { Player } from "../stores/player";

export class Investments {
  private item;
  private random: number;
  constructor(basicChips: number) {
    this.item = [
      new MartingaleMethod(basicChips),
      new GranMartingaleMethod(basicChips),
      new TenPercentMethod(),
      new GoodManMethod(),
    ];
    this.random = Math.floor(Math.random() * this.item.length);
  }

  public getInvestment() {
    return this.item[this.random];
  }
}

interface BasicMethod {
  method(Player: Player): number;
}

export class MartingaleMethod implements BasicMethod {
  private basic: number;
  private bet: number;
  constructor(chips: number) {
    this.basic = Math.floor(chips * 0.05);
    this.bet = 0;
  }

  public method(player: Player): number {
    const winOrLose: number = player.grades[player.grades.length - 1];
    if (player.grades.length == 0) {
      this.bet = this.basic;
      return this.bet;
    } else {
      if (winOrLose != 1) {
        //負けOr引き分けの場合
        this.bet *= 2;
        return this.bet;
      } else {
        this.bet = this.basic;
        return this.bet;
      }
    }
  }
}

export class GranMartingaleMethod implements BasicMethod {
  private basic: number;
  private additional: number;
  private bet: number;
  constructor(chips: number) {
    this.basic = Math.floor(chips * 0.05);
    this.additional = this.basic;
    this.bet = 0;
  }

  method(player: Player) {
    const winOrLose: number = player.grades[player.grades.length - 1];
    if (player.grades.length == 0) {
      this.bet = this.basic;
      return this.bet;
    } else {
      if (winOrLose != 1) {
        //負けOr引き分けの場合
        this.bet = this.bet * 2 + this.additional;
        return this.bet;
      } else {
        this.bet = this.basic;
        return this.bet;
      }
    }
  }
}

export class GoodManMethod implements BasicMethod {
  private basic: number[];
  private bet: number;
  constructor() {
    this.basic = [10, 20, 30, 50];
    this.bet = 0;
  }

  method(player: Player) {
    const winOrLose: number = player.grades[player.grades.length - 1];
    if (player.grades.length == 0) {
      this.bet = this.basic[0];
      return this.basic[0];
    } else {
      if (winOrLose != 1) {
        //負けOr引き分けの場合
        this.bet = this.basic[0];
        return this.bet;
      } else {
        const order = this.basic.indexOf(this.bet);
        if (order == this.basic.length) this.bet = this.basic[order];
        else this.bet = this.basic[order + 1];
        return this.bet;
      }
    }
  }
}

export class TenPercentMethod implements BasicMethod {
  method(player: Player) {
    return Math.floor(player.chips * 0.1);
  }
}
