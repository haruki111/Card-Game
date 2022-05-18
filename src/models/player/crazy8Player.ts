import { Player } from "@/models/player/player";
import { GameDecision } from "@/models/gameDecision";
import type { Card } from "@/stores/card";
import { userSoundStore } from "@/stores/sound";

export class Crazy8Player extends Player {
  private _cardSuitMap: Map<string, Card[]>;
  private _cardRankMap: Map<string, Card[]>;
  private _card8Arr: Card[];

  constructor(name: string, type: string, chips: number) {
    super(name, type, chips);
    this._cardSuitMap = new Map([
      ["H", []],
      ["D", []],
      ["C", []],
      ["S", []],
    ]);
    this._cardRankMap = new Map([
      ["A", []],
      ["2", []],
      ["3", []],
      ["4", []],
      ["5", []],
      ["6", []],
      ["7", []],
      ["9", []],
      ["10", []],
      ["J", []],
      ["Q", []],
      ["K", []],
    ]);

    this._card8Arr = [];
  }

  get cardSuitMap(): Map<string, Card[]> {
    return this._cardSuitMap;
  }
  set cardSuitMap(map: Map<string, Card[]>) {
    this._cardSuitMap = map;
  }

  get cardRankMap(): Map<string, Card[]> {
    return this._cardRankMap;
  }
  set cardRankMap(map: Map<string, Card[]>) {
    this._cardRankMap = map;
  }

  get card8Arr(): Card[] {
    return this._card8Arr;
  }
  set card8Arr(arr: Card[]) {
    this._card8Arr = arr;
  }

  public getHandScore(): number {
    let score = 0;

    for (let i = 0; i < this.hand.length; i++) {
      score += this.hand[i].getRankNumber();
      if (this.hand[i].rank === "A") score -= 10;
      if (this.hand[i].rank === "8") score += 42;
    }

    return score;
  }

  public drawCard(card: Card) {
    userSoundStore().distributeCardSound();
    this.hand.push(card);

    const suit: string = card.suit;
    const rank: string = card.rank;

    if (rank !== "8") {
      const suitArr: Card[] = this.cardSuitMap.get(suit) ?? [];
      suitArr.push(card);
      this.cardSuitMap.set(suit, suitArr);

      const rankArr = this.cardRankMap.get(rank) ?? [];
      rankArr.push(card);
      this.cardRankMap.set(rank, rankArr);
    } else {
      this.card8Arr.push(card);
    }
  }

  public outCard(card: Card) {
    userSoundStore().playCardSound();
    this.hand.splice(this.hand.indexOf(card), 1);

    const suit: string = card.suit;
    const rank: string = card.rank;

    if (rank !== "8") {
      const suitArr: Card[] = this.cardSuitMap.get(suit) ?? [];
      suitArr.splice(suitArr.indexOf(card), 1);
      this.cardSuitMap.set(suit, suitArr);

      const rankArr = this.cardRankMap.get(rank) ?? [];
      rankArr.splice(rankArr.indexOf(card), 1);
      this.cardRankMap.set(rank, rankArr);
    } else {
      this.card8Arr.splice(this.card8Arr.indexOf(card), 1);
    }
  }

  public promptPlayer(
    userData: string | number | { card: Card; nextSuit: string } | null,
    cardPlace: Card
  ): GameDecision {
    if (this.gameStatus == "play") {
      if (userData == null) {
        const suitArr = this.cardSuitMap.get(cardPlace.suit) ?? [];
        const rankArr = this.cardRankMap.get(cardPlace.rank) ?? [];
        let playCard: Card;

        if (suitArr.length > 0) {
          playCard = suitArr[Math.floor(Math.random() * suitArr.length)];
          return new GameDecision("play", { card: playCard, nextSuit: "" });
        } else if (rankArr.length > 0) {
          playCard = rankArr[Math.floor(Math.random() * rankArr.length)];
          return new GameDecision("play", { card: playCard, nextSuit: "" });
        } //8のみ持っているので出す
        else if (this.card8Arr.length > 0) {
          playCard =
            this.card8Arr[Math.floor(Math.random() * this.card8Arr.length)];

          let nextSuit = "H";

          for (const [suit, cardArr] of this.cardSuitMap) {
            const nextSuitArr = this.cardSuitMap.get(nextSuit) ?? [];
            if (cardArr.length > nextSuitArr.length) nextSuit = suit;
          }

          return new GameDecision("play", {
            card: playCard,
            nextSuit: nextSuit,
          });
        }
        // 出せるカードがないので引く
        return new GameDecision("draw", 0);
      } else if (typeof userData === "object") {
        return new GameDecision("play", userData);
      } else {
        return new GameDecision("draw", 0);
      }
    } else if (userData === "path") {
      this.gameStatus = "path";
      return new GameDecision("path", 1);
    } else return new GameDecision("draw", 1);
  }
}
