import { defineStore } from "pinia";
import router from "@/router";

import { BlackJackTable } from "@/models/table/blackjackTable";
import type { Table } from "@/models/table/table";

export const useTableStore = defineStore({
  id: "table",
  state: () => ({
    table: {} as Table | BlackJackTable,
  }),
  actions: {
    setTable(gameSettingHash: {
      name: string;
      game: string;
      round: number;
      speed: number;
    }): void {
      if (gameSettingHash.game === "Black Jack") {
        this.table = new BlackJackTable(
          gameSettingHash.name,
          gameSettingHash.game,
          gameSettingHash.round,
          gameSettingHash.speed
        );
        this.table.deck.resetDeck();
        router.push("game");
      } else if (gameSettingHash.game === "Turn8") alert("鋭意開発中");
      return;
    },
  },
});
