import { Player } from "@/models/player/player";
import { GameDecision } from "@/models/gameDecision";
import type { Card } from "@/stores/card";

export class Crazy8Player extends Player {
  constructor(name: string, type: string, chips: number) {
    super(name, type, chips);
  }
  public getHandScore(): number {
    let score = 0;

    for (let i = 0; i < this.hand.length; i++) {
      score += this.hand[i].getRankNumber();
      if (this.hand[i].rank === "A") score -= 10;
      if (this.hand[i].suit === "8") score += 42;
    }

    return score;
  }

  public promptPlayer(
    userData: string | number | { card: Card; nextSuit: string } | null,
    cardPlace: Card
  ): GameDecision {
    if (this.gameStatus == "play") {
      const playCardArr: Card[] = [];
      const Card8Arr: Card[] = [];
      const cardSuitMap: Map<string, number> = new Map([
        ["H", 0],
        ["D", 0],
        ["C", 0],
        ["S", 0],
      ]);
      if (userData == null) {
        for (const handCard of this.hand) {
          const suit: string = handCard.suit;
          const count: number = cardSuitMap.get(suit) ?? 0;
          cardSuitMap.set(suit, count + 1);

          if (
            handCard.rank !== "8" &&
            (handCard.suit == cardPlace.suit || handCard.rank == cardPlace.rank)
          ) {
            playCardArr.push(handCard);
          } else if (handCard.rank === "8") {
            Card8Arr.push(handCard);
          }
        }

        if (playCardArr.length) {
          const playCard =
            playCardArr[Math.floor(Math.random() * playCardArr.length)];
          return new GameDecision("play", { card: playCard, nextSuit: "" });
        } //8のみ持っているので出す
        else if (Card8Arr.length) {
          const playCard =
            Card8Arr[Math.floor(Math.random() * Card8Arr.length)];

          let nextSuit = "H";
          for (const cardSuit of cardSuitMap) {
            if (cardSuit[0] == playCard.suit) cardSuit[1]--;
            if (cardSuit[1] > (cardSuitMap.get(nextSuit) ?? 0))
              nextSuit = cardSuit[0];
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
    } else return new GameDecision("draw", 1); //temp
  }
}
