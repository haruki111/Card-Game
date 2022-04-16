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
    renderTableUserHelper(userData: number | string | null) {
      table.haveTurn(userData);
      this.renderTable();
    },

    renderTableAiHelper(userData: number | string | null) {
      setTimeout(() => {
        table.haveTurn(userData);
        this.renderTable();
      }, 1000 / table.gameSpeed);
    },

    renderTable() {
      const player = table.getTurnPlayer;
      if (table.gamePhase == "end") this.renderEndResult = true;
      else if (table.gamePhase == "evaluatingEnd") this.renderResult = true;
      else if (player.type == "user") {
        if (table.gamePhase == "betting") {
          this.renderBet = true;
        } else if (table.gamePhase == "acting") {
          if (player.gameStatus == "bet" || player.gameStatus == "hit") {
            this.renderAction = true;
          } else this.renderTableAiHelper(player.gameStatus);
        }
      } else if (player.type == "ai" || player.type == "house")
        this.renderTableAiHelper(null);
    },
  },
});
