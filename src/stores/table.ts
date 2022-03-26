import { useDeckStore } from "./deck";
import { usePlayerStore } from "./player";
import { defineStore } from "pinia";
// import { Deck } from "./deck";

export const useTableStore = defineStore({
  id: "table",
  state: () => ({
    gameType: "",
    round: "",
    gameSpeed: 1,
    betDenominations: [5, 20, 50, 100],
    deck: useDeckStore(),
    gamePhase: "betting", //betting, acting, 'evaluatingWinners, gameOver'
    players: usePlayerStore().players,
    house: usePlayerStore().house,
    resultsLog: [],
    turnCounter: 1,
    currRound: 1,
  }),
  actions: {
    constructor(gameType: string) {
      usePlayerStore().constructor(gameType);
    },
    blackjackAssignPlayerHands() {
      for (let i = 0; i < this.players.length; i++) {
        if (this.deck.drawOne() != undefined)
          this.players[i].hand[0] = this.deck.drawOne();
        this.players[i].hand[1] = this.deck.drawOne();
      }

      this.house.hand[0] = this.deck.drawOne();
      this.house.hand[1] = this.deck.drawOne();
    },
  },
});
