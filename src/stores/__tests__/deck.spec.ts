import { beforeEach, describe, it, expect } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useDeckStore } from "../deck";

describe("Deck Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("setGameType", () => {
    const deck = useDeckStore();
    deck.setGameType("blackjack");
    expect(deck.gameType).toEqual("blackjack");
  });

  it("generateDeckBlackJack", () => {
    const deck = useDeckStore();
    deck.setGameType("blackjack");
    deck.generateDeck();
    expect(deck.deck.length).toEqual(52);
  });

  it("drawOne", () => {
    const deck = useDeckStore();
    deck.setGameType("blackjack");
    deck.generateDeck();
    expect(deck.drawOne()).toEqual({ rank: "A", suit: "H" });
    expect(deck.drawOne()).toEqual({ rank: "2", suit: "H" });
  });
});
