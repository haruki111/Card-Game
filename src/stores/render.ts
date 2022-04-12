import { defineStore } from "pinia";
import { useTableStore } from "./table";
const table = useTableStore();

export const useRenderStore = defineStore({
  id: "render",
  state: () => ({
    renderBet: false,
    renderAction: false,
    renderResult: false,
    renderEndResult: false,
  }),
  actions: {
    renderTableHelper(userData: number | string | null) {
      table.haveTurn(userData);
      console.log("renderTable");
      setTimeout(() => {
        this.renderTable();
      }, 1000 / table.gameSpeed);
    },
    renderTable() {
      console.log(table.gamePhase);
      if (table.gamePhase == "end") this.renderEndResult = true;
      else if (table.gamePhase == "evaluatingEnd") this.renderResult = true;
      else if (table.getTurnPlayer.type == "user") {
        const player = table.getTurnPlayer;
        if (table.gamePhase == "betting") {
          this.renderBet = true;
        } else if (table.gamePhase == "acting") {
          if (player.gameStatus == "bet" || player.gameStatus == "hit") {
            this.renderAction = true;
          } else this.renderTableHelper(player.gameStatus);
        }
      } else if (table.getTurnPlayer.type == "ai") this.renderTableHelper(null);
      else if (table.getTurnPlayer.type == "house") {
        this.renderTableHelper(null);
      }
    },
  },
});
