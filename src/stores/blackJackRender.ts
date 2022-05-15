import { defineStore } from "pinia";
import { useSpeechStore } from "@/stores/speech";
import type { BlackJackTable } from "@/models/table/blackjackTable";

export const useBlackJackRenderStore = defineStore({
  id: "blackJackRender",
  state: () => ({
    renderBet: false,
    renderAction: false,
    renderResult: false,
    renderEndResult: false,
    blinkPlayerName: false,
  }),
  actions: {
    renderTableHelper(userData: number | string | null, table: BlackJackTable) {
      let timer = 1000;
      const slowSpeedStatus = ["stand", "surrender", "double", "bust"];
      if (slowSpeedStatus.includes(table.getTurnPlayer().gameStatus)) {
        timer = 500;
      } else if (table.getTurnPlayer().type === "user") {
        timer = 0;
      }
      this.blinkPlayerName = true;
      setTimeout(async () => {
        await table.haveTurn(userData);
        this.blinkPlayerName = false;
        this.renderTable(table);
      }, timer);
    },

    renderTable(table: BlackJackTable) {
      const player = table.getTurnPlayer();
      if (table.gamePhase === "betting" && table.onFirstPlayer()) {
        useSpeechStore().mcSpeech("Round" + table.currRound);
      }
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
