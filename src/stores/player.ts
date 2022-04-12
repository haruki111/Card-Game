import { Card } from "./card";
import {
  Investments,
  MartingaleMethod,
  GranMartingaleMethod,
  TenPercentMethod,
  GoodManMethod,
} from "../models/Investments";

export class Player {
  public name: string;
  public type: string;
  public gameType: string;
  public chips: number;
  public hand: Card[];
  public grades: number[]; //成績
  public investment:
    | MartingaleMethod
    | GranMartingaleMethod
    | TenPercentMethod
    | GoodManMethod; //成績
  public bet: number; // 現在のラウンドでのベットしているチップ
  public winAmount: number; // 勝利金額
  public gameStatus: string;

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
    this.gameType = "";
    this.chips = 400;
    if (this.type == "house") this.chips = -1;
    this.hand = [new Card("?", "?"), new Card("?", "?")];
    this.grades = []; //成績
    this.investment = new Investments(this.chips).getInvestment(); //投資法
    this.bet = 0; // 現在のラウンドでのベットしているチップ
    this.winAmount = 0; // 勝利金額
    this.gameStatus = "betting";
  }

  public promptPlayer(
    userData: number | string | null,
    houseScore?: number
  ):
    | {
        action: string;
        amount: string | number;
      }
    | {
        action: string | number | null;
        amount: number;
      }
    | undefined {
    let gameDecision;
    if (this.gameStatus == "betting") {
      if (userData == null) {
        let latch = this.investment.method(this);
        if (latch >= this.chips * 0.7) latch = Math.floor(this.chips / 2);
        gameDecision = { action: "bet", amount: latch };
      } else gameDecision = { action: "bet", amount: userData };
    } else if (this.gameStatus == "bet" || this.gameStatus == "hit") {
      if (userData == null && typeof houseScore == "number") {
        const playerScore = this.getHandScore();

        if (this.isValid11AOnce()) {
          gameDecision = {
            action: this.softHandAction(playerScore, houseScore),
            amount: 0,
          };
        } else {
          gameDecision = {
            action: this.hardHandAction(playerScore, houseScore),
            amount: 0,
          };
        }
      } else gameDecision = { action: userData, amount: 0 };
    }
    return gameDecision;
  }

  public getHandScore() {
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
    if (playerScore < 9) playerSelect = 0;
    if (playerScore > 16) playerSelect = 9;

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

  public updateGrades() {
    if (this.winAmount > 0) this.grades.push(1);
    else if (this.winAmount == 0) this.grades.push(0);
    else if (this.winAmount < 0) this.grades.push(-1);
  }
}
// export interface Player {
//   name: string;
//   type: string;
//   gameType: string;
//   chips: number;
//   hand: Card[];
//   grades: []; //成績
//   bet: 0; // 現在のラウンドでのベットしているチップ
//   winAmount: 0; // 勝利金額
//   gameStatus: string;
// }
// export const usePlayerStore = defineStore({
//   id: "players",
//   state: () => ({
//     house: {
//       name: "Dealer",
//       type: "house",
//       gameType: "",
//       chips: -1,
//       hand: [new Card("?", "?"), new Card("?", "?")],
//       grades: [],
//       bet: 0,
//       winAmount: 0,
//       gameStatus: "waitingForBets",
//     } as Player,

//     players: [
//       {
//         name: "player1",
//         type: "ai",
//         gameType: "",
//         chips: 400,
//         hand: [new Card("D", "8"), new Card("D", "8")],
//         grades: [],
//         bet: 0,
//         winAmount: 0,
//         gameStatus: "betting",
//       },
//       {
//         name: "player2",
//         type: "ai",
//         gameType: "",
//         chips: 400,
//         hand: [new Card("D", "8"), new Card("D", "8")],
//         grades: [],
//         bet: 0,
//         winAmount: 0,
//         gameStatus: "betting",
//       },
//       {
//         name: "player3",
//         type: "ai",
//         gameType: "",
//         chips: 400,
//         hand: [new Card("D", "8"), new Card("D", "8")],
//         grades: [],
//         bet: 0,
//         winAmount: 0,
//         gameStatus: "betting",
//       },
//     ] as Player[],
//   }),
//   getters: {
//     promptPlayer(): number {
//       let gameDecision;
//       console.log("========");
//       return 1;
//       // if (state.players[id].gameStatus == "betting") {
//       //   if (userData == null) {
//       //     gameDecision = { bet: 50 };
//       //   } else gameDecision = { bet: userData };
//       // }
//       // return gameDecision;
//     },
//   },
//   actions: {
//     constructor(userName: string, gameType: string) {
//       const userType = userName == "ai" ? "ai" : "user";
//       this.players[1].name = userName;
//       this.players[1].type = userType;

//       this.house.gameType = gameType;
//       for (let i = 0; i < this.players.length; i++) {
//         this.players[i].gameType = gameType;
//       }
//     },
//     getHandScore(index: number): number {
//       const scoreAnd11AHash = this.scoreAnd11A(index);
//       return scoreAnd11AHash["score"];
//     },

//     houseHandScore(): number {
//       if (this.house.gameStatus == "waitingForBets") {
//         return this.house.hand[0].getRankNumber();
//       } else return 10;
//     },

//     scoreAnd11A(index: number): {
//       score: number;
//       haveA: number;
//     } {
//       const playerHand = this.players[index].hand;
//       let score = 0;
//       let haveA = 0;
//       for (let i = 0; i < playerHand.length; i++) {
//         score += playerHand[i].getRankNumber();
//         if (playerHand[i].rank == "A") haveA++;
//       }
//       while (score > 21 && haveA > 0) {
//         haveA--;
//         score -= 10;
//       }
//       return { score: score, haveA: haveA };
//     },
//   },
// });
