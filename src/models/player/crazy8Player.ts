import { Player } from "@/models/player/player";
import { GameDecision } from "@/models/gameDecision";

export class Crazy8Player extends Player {
  constructor(name: string, type: string, chips: number) {
    super(name, type, chips);
  }
  public getHandScore(): number {
    let score = 0;
    for (let i = 0; i < this.hand.length; i++) {
      score += this.hand[i].getRankNumber();
    }

    return score;
  }

  public promptPlayer(
    userData: string | number | null,
    houseScore?: number
  ): GameDecision {
    return new GameDecision("draw", 1);
  }
}
