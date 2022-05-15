import { defineStore } from "pinia";
import type { Crazy8Table } from "@/models/table/crazy8Table";
import type { Card } from "@/stores/card";

export const useCrazy8RenderStore = defineStore({
  id: "crazy8Render",
  state: () => ({
    renderAction: false,
    renderSelectSuit: false,
    renderEndResult: false,
  }),
  actions: {
    async renderTableHelper(
      userData: number | string | { card: Card; nextSuit: string } | null,
      table: Crazy8Table
    ) {
      await table.haveTurn(userData);
      setTimeout(() => {
        this.renderTable(table);
      }, 1000);
    },

    renderTable(table: Crazy8Table) {
      const player = table.getTurnPlayer();
      const nullRenderTableArr = [
        "distribute",
        "evaluatingDeckRunsOut",
        "evaluatingWinners",
      ];
      if (table.gamePhase === "end") this.renderEndResult = true;
      else if (nullRenderTableArr.includes(table.gamePhase)) {
        this.renderTableHelper(null, table);
      } else if (table.gamePhase === "play") {
        if (
          player.type === "user" &&
          (player.gameStatus === "play" || player.gameStatus === "path")
        )
          this.renderAction = true;
        else this.renderTableHelper(null, table);
      }
    },
  },
});
