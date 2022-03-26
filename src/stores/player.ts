import { defineStore } from "pinia";
// import { Deck } from "./deck";
import { Card } from "./Card";
interface Player {
  name: string;
  type: string;
  gameType: string;
  chips: number;
  hand: Card[];
  grades: []; //成績
  bet: 0; // 現在のラウンドでのベットしているチップ
  winAmount: 0; // 勝利金額
  gameStatus: string;
}
export const usePlayerStore = defineStore({
  id: "players",
  state: () => ({
    house: {
      name: "Dealer",
      type: "house",
      gameType: "",
      chips: -1,
      hand: [new Card("?", "?"), new Card("?", "?")],
      grades: [],
      bet: 0,
      winAmount: 0,
      gameStatus: "waitingForBets",
    } as Player,

    players: [
      {
        name: "player1",
        type: "ai",
        gameType: "",
        chips: 400,
        hand: [new Card("D", "8"), new Card("D", "8")],
        grades: [],
        bet: 0,
        winAmount: 0,
        gameStatus: "betting",
      },
      {
        name: "player2",
        type: "ai",
        gameType: "",
        chips: 400,
        hand: [new Card("D", "8"), new Card("D", "8")],
        grades: [],
        bet: 0,
        winAmount: 0,
        gameStatus: "betting",
      },
      {
        name: "player3",
        type: "ai",
        gameType: "",
        chips: 400,
        hand: [new Card("D", "8"), new Card("D", "8")],
        grades: [],
        bet: 0,
        winAmount: 0,
        gameStatus: "betting",
      },
    ] as Player[],
  }),

  actions: {
    constructor(gameType: string) {
      this.house.gameType = gameType;
      for (let i = 0; i < this.players.length; i++) {
        this.players[i].gameType = gameType;
      }
    },
    getHandScore(index: number): number {
      const scoreAnd11AHash = this.scoreAnd11A(index);
      return scoreAnd11AHash["score"];
    },

    houseHandScore(): number {
      if (this.house.gameStatus == "waitingForBets") {
        return this.house.hand[0].getRankNumber();
      } else return 10;
    },

    scoreAnd11A(index: number): {
      score: number;
      haveA: number;
    } {
      const playerHand = this.players[index].hand;
      let score = 0;
      let haveA = 0;
      for (let i = 0; i < playerHand.length; i++) {
        score += playerHand[i].getRankNumber();
        if (playerHand[i].rank == "A") haveA++;
      }
      while (score > 21 && haveA > 0) {
        haveA--;
        score -= 10;
      }
      return { score: score, haveA: haveA };
    },
  },
});
