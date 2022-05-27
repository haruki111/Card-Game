<script setup lang="ts">
import { computed } from "vue";
import { useTableStore } from "@/stores/table";
import { useBlackJackRenderStore } from "@/stores/blackJackRender";
import type { BlackJackTable } from "@/models/table/blackjackTable";

const table = useTableStore().table as BlackJackTable;
const render = useBlackJackRenderStore();

const validUserStatusBet = computed(() => {
  const user = table.players[1];
  return user.gameStatus != "bet";
});

const disabledBgWhiteColor = computed(() => {
  if (validUserStatusBet.value) return "bg-gray-100";
  return "bg-white";
});

const disabledBgRedColor = computed(() => {
  if (validUserStatusBet.value) return "bg-red-800";
  return "bg-red-700";
});

const action = (action: string) => {
  render.renderTableHelper(action, table);
  render.renderAction = false;
};
</script>
<template>
  <div class="flex items-center justify-center">
    <div class="action flex justify-center sm:text-sm text-xs">
      <button
        @click="action('surrender')"
        :disabled="validUserStatusBet"
        :class="disabledBgWhiteColor"
        type="button"
        class="text-gray-900 border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-full sm:px-5 px-2 sm:py-2.5 py-1 text-center mr-2"
      >
        Surrender
      </button>
      <button
        @click="action('stand')"
        type="button"
        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full sm:px-5 px-2 sm:py-2.5 py-1 text-center mr-2"
      >
        Stand
      </button>
      <button
        @click="action('hit')"
        type="button"
        class="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-full sm:px-5 px-2 sm:py-2.5 py-1 text-center mr-2"
      >
        Hit
      </button>
      <button
        @click="action('double')"
        :disabled="validUserStatusBet"
        :class="disabledBgRedColor"
        type="button"
        class="text-white focus:ring-4 focus:ring-red-300 font-medium rounded-full sm:px-5 px-2 sm:py-2.5 py-1 text-center mr-2"
      >
        Double
      </button>
    </div>
  </div>
</template>
