<script setup lang="ts">
import { computed } from "vue";
import { useTableStore } from "@/stores/table";
import { useRenderStore } from "@/stores/render";

const table = useTableStore().table;
const render = useRenderStore();

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
  render.renderTableUserHelper(action);
  render.renderAction = false;
};
</script>
<template>
  <div class="fixed z-10 inset-0 mt-36">
    <div class="flex items-center justify-center min-h-screen">
      <div class="action mt-5 flex justify-center">
        <button
          @click="action('surrender')"
          :disabled="validUserStatusBet"
          :class="disabledBgWhiteColor"
          type="button"
          class="text-gray-900 border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Surrender
        </button>
        <button
          @click="action('stand')"
          type="button"
          class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Stand
        </button>
        <button
          @click="action('hit')"
          type="button"
          class="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Hit
        </button>
        <button
          @click="action('double')"
          :disabled="validUserStatusBet"
          :class="disabledBgRedColor"
          type="button"
          class="text-white focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Double
        </button>
      </div>
    </div>
  </div>
</template>
