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
      if (this.hand[i].rank == "A") score -= 10;
    }

    return score;
  }

  public promptPlayer(
    userData: string | number | Card | null,
    cardPlace: Card
  ): GameDecision {
    if (this.gameStatus == "play") {
      const playCardArr: Card[] = [];
      const Card8Arr: Card[] = [];
      if (userData == null) {
        for (const handCard of this.hand) {
          if (
            handCard.suit == cardPlace.suit ||
            handCard.rank == cardPlace.rank
          ) {
            playCardArr.push(handCard);
          }
          if (handCard.rank == "8") {
            Card8Arr.push(handCard);
          }
        }

        if (playCardArr.length != 0) {
          const playCard =
            playCardArr[Math.floor(Math.random() * playCardArr.length)];
          return new GameDecision("play", playCard);
        } //8を持っているので引く
        else if (Card8Arr.length != 0) {
          const playCard =
            Card8Arr[Math.floor(Math.random() * Card8Arr.length)];
          return new GameDecision("play", playCard);
        }
        // 出せるカードがないので引く
        return new GameDecision("draw", 0);
      } else if (typeof userData === "object") {
        return new GameDecision("play", userData);
      } else {
        return new GameDecision("draw", 0);
      }
    } else if (this.gameStatus == "path") {
      return new GameDecision("path", 1);
    }
    return new GameDecision("draw", 1); //temp
  }
}
