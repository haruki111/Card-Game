import { defineStore } from "pinia";
// import { Deck } from "./deck";
import { Card } from "./card";
interface Player {
  name: string;
  type: string;
  gameType: string;
  chips: number;
  hand: Card[];
  grades: []; //成績
  bet: 0; // 現在のラウンドでのベットしているチップ
  winAmount: 0; // 勝利金額
  gameStatus: "betting";
}
export const usePlayerStore = defineStore({
  id: "players",
  state: () => ({
    house: {
      name: "Dealer",
      type: "house",
      gameType: "blackjack",
      chips: -1,
      hand: [new Card("D", "8"), new Card("?", "?")],
      grades: [],
      bet: 0,
      winAmount: 0,
      gameStatus: "betting",
    },

    players: [
      {
        name: "player1",
        type: "ai",
        gameType: "blackjack",
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
        gameType: "blackjack",
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
        gameType: "blackjack",
        chips: 400,
        hand: [new Card("D", "8"), new Card("D", "8")],
        grades: [],
        bet: 0,
        winAmount: 0,
        gameStatus: "betting",
      },
    ] as Player[],
    // deck: new Deck("blackjack"),
  }),

  actions: {
    getHandScore(index: number): number {
      const scoreAnd11AHash = this.scoreAnd11A(index);
      return scoreAnd11AHash["score"];
    },

    houseHandScore(): number {
      if (this.house.gameStatus == "betting") {
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
