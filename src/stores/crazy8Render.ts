import { defineStore } from "pinia";
import type { Crazy8Table } from "@/models/table/crazy8Table";
import type { Card } from "@/stores/card";

export const useCrazy8RenderStore = defineStore({
  id: "crazy8Render",
  state: () => ({
    renderAction: false,
    renderEndResult: false,
  }),
  actions: {
    async renderTableUserHelper(
      userData: number | string | null | Card,
      table: Crazy8Table
    ) {
      await table.haveTurn(userData);
      setTimeout(() => {
        this.renderTable(table);
      }, 1000);
    },

    async renderTableAiHelper(
      userData: number | string | null,
      table: Crazy8Table
    ) {
      await table.haveTurn(userData);
      setTimeout(() => {
        this.renderTable(table);
      }, 1000);
    },

    renderTable(table: Crazy8Table) {
      const player = table.getTurnPlayer();
      if (table.gamePhase === "end") this.renderEndResult = true;
      else if (
        table.gamePhase === "evaluatingDeckRunsOut" ||
        table.gamePhase === "evaluatingWinners"
      ) {
        this.renderTableAiHelper(null, table);
      } else if (table.gamePhase === "distribute") {
        this.renderTableAiHelper(null, table);
      } else if (table.gamePhase === "play") {
        if (
          player.type === "user" &&
          (player.gameStatus === "play" || player.gameStatus === "path")
        )
          this.renderAction = true;
        else this.renderTableAiHelper(null, table);
      }
    },
  },
});
