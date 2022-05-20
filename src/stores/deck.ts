import { defineStore } from "pinia";
import { Card } from "./card";
import { userSoundStore } from "@/stores/sound";

export const useDeckStore = defineStore({
  id: "deck",
  state: () => ({
    gameType: "blackjack" as string,
    deck: [] as Card[],
    suitArr: ["H", "D", "C", "S"] as string[],
    rankArr: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
  }),
  actions: {
    setGameType(gameType: string): void {
      this.gameType = gameType;
    },
    generateDeck(): Card[] {
      const newDeck = [];

      if (this.gameType == "blackjack") {
        for (let i = 0; i < this.suitArr.length; i++) {
          for (let j = 0; j < this.rankArr.length; j++) {
            newDeck.push(new Card(this.suitArr[i], this.rankArr[j]));
          }
        }
      }

      this.deck = newDeck;
      return newDeck;
    },
    shuffleDeck(): void {
      const newDeck: Card[] = [];

      while (this.deck.length > 0) {
        const l: number = this.deck.length;
        const random: number = Math.floor(Math.random() * l);

        newDeck.push(this.deck[random]);
        this.deck.splice(random, 1);
      }
      this.deck = newDeck;
      userSoundStore().shuffleCardSound();
    },
    drawOne(): Card {
      const drawCard = this.deck[0];
      this.deck.shift();
      return drawCard;
    },
    resetDeck(): void {
      this.generateDeck();
      this.shuffleDeck();
    },

    reuseCards(cards: Card[]): void {
      for (const card of cards) {
        this.deck.push(card);
      }
      this.shuffleDeck();
    },
  },
});
