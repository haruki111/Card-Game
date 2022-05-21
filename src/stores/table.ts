import { defineStore } from "pinia";
import router from "@/router";

import { BlackJackTable } from "@/models/table/blackjackTable";
import { Crazy8Table } from "@/models/table/crazy8Table";
import type { Table } from "@/models/table/table";

export const useTableStore = defineStore({
  id: "table",
  state: () => ({
    table: {} as Table | BlackJackTable | Crazy8Table,
  }),
  actions: {
    setTable(gameSettingHash: {
      name: string;
      game: string;
      round: number;
    }): void {
      if (gameSettingHash.game === "Black Jack") {
        this.table = new BlackJackTable(
          gameSettingHash.name,
          gameSettingHash.game,
          gameSettingHash.round
        );
        this.table.deck.resetDeck();
        router.push("game");
      } else if (gameSettingHash.game === "Crazy8") {
        this.table = new Crazy8Table(
          gameSettingHash.name,
          gameSettingHash.game,
          gameSettingHash.round
        );
        this.table.deck.resetDeck();
        router.push("Crazy8");
      }
      return;
    },
  },
});
