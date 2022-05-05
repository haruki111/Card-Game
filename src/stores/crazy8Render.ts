import { defineStore } from "pinia";
import { useTableStore } from "./table";
import type { Crazy8Table } from "@/models/table/crazy8Table";
import type { Card } from "@/stores/card";

const table = useTableStore().table as Crazy8Table;

export const useCrazy8RenderStore = defineStore({
  id: "crazy8Render",
  state: () => ({
    renderAction: false,
    renderResult: false,
    renderEndResult: false,
  }),
  actions: {
    async renderTableUserHelper(userData: number | string | null | Card) {
      await table.haveTurn(userData);
      setTimeout(() => {
        this.renderTable();
      }, 1000);
    },

    async renderTableAiHelper(userData: number | string | null) {
      await table.haveTurn(userData);
      setTimeout(() => {
        this.renderTable();
      }, 1000);
    },

    renderTable() {
      const player = table.getTurnPlayer();
      if (table.gamePhase === "distribute") {
        this.renderTableAiHelper(null);
      } else if (table.gamePhase === "play") {
        if (player.type === "user" && player.gameStatus === "play")
          this.renderAction = true;
        else if (player.type === "user" && player.gameStatus === "path") {
          this.renderTableAiHelper(null);
        } else this.renderTableAiHelper(null);
      }
    },
  },
});
