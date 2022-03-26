import { defineStore } from "pinia";
import { Card } from "./Card";

export class Deck {
  public gameType: string;
  public deck: Card[];
  constructor(gameType: string) {
    this.gameType = gameType;
    this.deck = Deck.generateDeck(gameType);
  }

  static generateDeck(gameType: string): Card[] {
    const newDeck = [];
    const suit = ["H", "D", "C", "S"];
    const rank = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    if (gameType == "blackjack") {
      for (let i = 0; i < suit.length; i++) {
        for (let j = 0; j < rank.length; j++) {
          newDeck.push(new Card(suit[i], rank[j]));
        }
      }
    }

    return newDeck;
  }

  shuffleDeck(): void {
    const newDeck = [];

    while (this.deck.length > 0) {
      const l = this.deck.length;
      const random = Math.floor(Math.random() * l);

      newDeck.push(this.deck[random]);
      this.deck.splice(random, 1);
    }
    this.deck = newDeck;
  }

  drawOne(): Card {
    const drawCard = this.deck[0];
    this.deck.pop();
    return drawCard;
  }

  resetDeck(): void {
    this.deck = Deck.generateDeck(this.gameType);
    this.shuffleDeck();
  }
}

export const useDeckStore = defineStore({
  id: "deck",
  state: () => ({
    gameType: "blackjack" as string,
    deck: [] as Card[],
  }),
  actions: {
    setGameType(gameType: string): void {
      this.gameType = gameType;
    },
    generateDeck(): Card[] {
      const newDeck = [];
      const suit = ["H", "D", "C", "S"];
      const rank = [
        "A",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
      ];

      if (this.gameType == "blackjack") {
        for (let i = 0; i < suit.length; i++) {
          for (let j = 0; j < rank.length; j++) {
            newDeck.push(new Card(suit[i], rank[j]));
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
  },
});
