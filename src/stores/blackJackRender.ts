import { defineStore } from "pinia";
import type { BlackJackTable } from "@/models/table/blackjackTable";

export const useBlackJackRenderStore = defineStore({
  id: "blackJackRender",
  state: () => ({
    renderBet: false,
    renderAction: false,
    renderResult: false,
    renderEndResult: false,
  }),
  actions: {
    async renderTableHelper(
      userData: number | string | null,
      table: BlackJackTable
    ) {
      await table.haveTurn(userData);
      setTimeout(() => {
        this.renderTable(table);
      }, 1000 / table.gameSpeed);
    },

    renderTable(table: BlackJackTable) {
      const player = table.getTurnPlayer();

      if (table.gamePhase == "end") this.renderEndResult = true;
      else if (player.type == "user") {
        if (table.gamePhase == "betting") {
          this.renderBet = true;
        } else if (table.gamePhase == "acting") {
          if (player.gameStatus == "bet" || player.gameStatus == "hit") {
            this.renderAction = true;
          } else this.renderTableHelper(player.gameStatus, table);
        }
      } else if (player.type == "ai" || player.type == "house")
        this.renderTableHelper(null, table);
    },
  },
});
