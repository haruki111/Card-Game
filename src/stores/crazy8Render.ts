import { defineStore } from "pinia";
import { useTableStore } from "./table";
import type { Crazy8Table } from "@/models/table/crazy8Table";

const table = useTableStore().table as Crazy8Table;

export const useCrazy8RenderStore = defineStore({
  id: "crazy8Render",
  state: () => ({
    renderAction: false,
    renderResult: false,
    renderEndResult: false,
  }),
  actions: {
    async renderTableUserHelper(userData: number | string | null) {
      await table.haveTurn(userData);

      this.renderTable();
    },

    async renderTableAiHelper(userData: number | string | null) {
      await table.haveTurn(userData);
      setTimeout(() => {
        console.log("render");
        this.renderTable();
      }, 1000);
    },

    renderTable() {
      const player = table.getTurnPlayer();
      if (table.gamePhase === "distribute") {
        this.renderTableAiHelper(null);
      } else if (table.gamePhase === "play") {
        this.renderTableAiHelper(null);
      }
    },
  },
});
