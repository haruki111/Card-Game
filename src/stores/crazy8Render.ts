import { defineStore } from "pinia";
import type { Crazy8Table } from "@/models/table/crazy8Table";
import type { Card } from "@/models/card";
import { useSpeechStore } from "@/stores/speech";

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
      let timer = 1000;
      if (table.getTurnPlayer().type === "user" && !this.isValidPath(table)) {
        timer = 0;
      }

      setTimeout(async () => {
        await table.haveTurn(userData);
        this.renderTable(table);
      }, timer);
    },

    renderTable(table: Crazy8Table) {
      const player = table.getTurnPlayer();
      const nullRenderTableArr = [
        "distribute",
        "evaluatingDeckRunsOut",
        "evaluatingWinners",
      ];
      this.speechEvent(table);

      if (table.gamePhase === "end") this.renderEndResult = true;
      else if (nullRenderTableArr.includes(table.gamePhase)) {
        this.renderTableHelper(null, table);
      } else if (table.gamePhase === "play") {
        if (this.isValidPath(table)) {
          this.renderTableHelper("path", table);
        } else if (
          player.type === "user" &&
          (player.gameStatus === "play" || player.gameStatus === "path")
        ) {
          this.renderAction = true;
        } else this.renderTableHelper(null, table);
      }
    },

    speechEvent(table: Crazy8Table) {
      if (table.gamePhase === "distribute") {
        useSpeechStore().mcSpeech("Round" + table.currRound);
      }
    },

    isValidPath(table: Crazy8Table): boolean {
      if (
        table.deck.deck.length == 0 &&
        !table.getTurnPlayer().isHavePlayCard(table.peekCardPlaceArr())
      ) {
        return true;
      }

      return false;
    },
  },
});
