// import { defineStore } from "pinia";
import Heart from "../assets/cardSuit/heart.png";
import Diamond from "../assets/cardSuit/diamond.png";
import Clover from "../assets/cardSuit/clover.png";
import Spade from "../assets/cardSuit/spade.png";

export class Card {
  public suit: string;
  public rank: string;

  static readonly imgMap: Map<string, string> = new Map([
    ["H", Heart],
    ["D", Diamond],
    ["C", Clover],
    ["S", Spade],
  ]);

  constructor(suit: string, rank: string) {
    this.suit = suit;
    this.rank = rank;
  }

  public getRankNumber(): number {
    if (this.rank == "?") return 0;
    if (this.rank == "A") return 11;
    else if (this.rank == "J" || this.rank == "Q" || this.rank == "K")
      return 10;
    return Number(this.rank);
  }

  public getImg(): string {
    return String(Card.imgMap.get(this.suit));
  }
}
