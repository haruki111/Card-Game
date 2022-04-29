import { Player } from "@/models/player/player";
import { GameDecision } from "@/models/gameDecision";
import { Card } from "@/stores/card";

export class BlackJackPlayer extends Player {
  constructor(name: string, type: string, chips: number) {
    super(name, type, chips);
    this._hand = [new Card("?", "?"), new Card("?", "?")];
  }

  // gameStatus if(betting, bet, hit)
  public promptPlayer(
    userData: number | string | null,
    houseScore?: number
  ): GameDecision {
    if (this.gameStatus == "betting") {
      if (userData == null) {
        let latch = this.investment.method(this);
        if (latch >= this.chips * 0.7) latch = Math.floor(this.chips / 2);
        return new GameDecision("bet", latch);
      } else return new GameDecision("bet", userData);
    } else if (this.gameStatus == "bet" || this.gameStatus == "hit") {
      if (userData == null && typeof houseScore == "number") {
        const playerScore = this.getHandScore();

        if (this.isValid11AOnce()) {
          return new GameDecision(
            this.softHandAction(playerScore, houseScore),
            0
          );
        } else {
          return new GameDecision(
            this.hardHandAction(playerScore, houseScore),
            0
          );
        }
      }
    }
    return new GameDecision(userData, 0);
  }

  public getHandScore(): number {
    const scoreAnd11AHash = this.scoreAnd11A();
    return scoreAnd11AHash["score"];
  }

  public isValid11AOnce() {
    const scoreAnd11AHash = this.scoreAnd11A();
    return scoreAnd11AHash["haveA"] == 1;
  }

  public scoreAnd11A(): {
    score: number;
    haveA: number;
  } {
    let score = 0;
    let haveA = 0;
    for (let i = 0; i < this.hand.length; i++) {
      score += this.hand[i].getRankNumber();
      if (this.hand[i].rank == "A") haveA++;
    }
    while (score > 21 && haveA > 0) {
      haveA--;
      score -= 10;
    }
    return { score: score, haveA: haveA };
  }

  public softHandAction(playerScore: number, houseScore: number) {
    const softHand: string[][] = [
      ["H", "H", "H", "D", "D", "H", "H", "H", "H", "H"],
      ["H", "H", "H", "D", "D", "H", "H", "H", "H", "H"],
      ["H", "H", "D", "D", "D", "H", "H", "H", "H", "H"],
      ["H", "H", "D", "D", "D", "H", "H", "H", "H", "H"],
      ["H", "D", "D", "D", "D", "H", "H", "H", "H", "H"],
      ["S", "D", "D", "D", "D", "S", "S", "H", "H", "H"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ];

    const mapAction: Map<string, string> = new Map([
      ["H", "hit"],
      ["D", "double"],
      ["S", "stand"],
      ["R", "surrender"],
    ]);

    const playerSelectArr: number[] = [13, 14, 15, 16, 17, 18, 19, 20];
    const houseSelectArr: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const houseSelect: number = houseSelectArr.indexOf(houseScore);
    let playerSelect: number = playerSelectArr.indexOf(playerScore);
    if (playerScore < 13) playerSelect = 0;
    if (playerScore > 20) playerSelect = 7;

    let playerAction = String(
      mapAction.get(softHand[playerSelect][houseSelect])
    );
    if (this.hand.length > 2 && playerAction == "double") playerAction = "hit";
    if (playerAction == "double" && this.bet > this.chips) playerAction = "hit";

    return playerAction;
  }

  public hardHandAction(playerScore: number, houseScore: number) {
    const hardHand = [
      ["H", "H", "H", "H", "H", "H", "H", "H", "H", "H"],
      ["H", "D", "D", "D", "D", "H", "H", "H", "H", "H"],
      ["D", "D", "D", "D", "D", "D", "D", "D", "H", "H"],
      ["D", "D", "D", "D", "D", "D", "D", "D", "D", "H"],
      ["H", "H", "S", "S", "S", "H", "H", "H", "H", "H"],
      ["S", "S", "S", "S", "S", "H", "H", "H", "H", "H"],
      ["S", "S", "S", "S", "S", "H", "H", "H", "R", "H"],
      ["S", "S", "S", "S", "S", "H", "H", "R", "R", "R"],
      ["S", "S", "S", "S", "S", "H", "H", "H", "H", "H"],
      ["S", "S", "S", "S", "S", "S", "S", "S", "S", "S"],
    ];

    const mapAction: Map<string, string> = new Map([
      ["H", "hit"],
      ["D", "double"],
      ["S", "stand"],
      ["R", "surrender"],
    ]);

    const playerSelectArr = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    const houseSelectArr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const houseSelect = houseSelectArr.indexOf(houseScore);
    let playerSelect = playerSelectArr.indexOf(playerScore);
    if (playerScore < 8) playerSelect = 0;
    if (playerScore > 17) playerSelect = 9;

    let playerAction = String(
      mapAction.get(hardHand[playerSelect][houseSelect])
    );

    if (
      this.hand.length > 2 &&
      (playerAction == "double" || playerAction == "surrender")
    )
      playerAction = "hit";
    if (playerAction == "double" && this.bet > this.chips) playerAction = "hit";

    return playerAction;
  }
}
