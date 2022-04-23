<script setup lang="ts">
import { computed } from "vue";
import { useTableStore } from "@/stores/table";

let props = defineProps<{
  index: number;
}>();

const players = useTableStore().table.players;
const player = players[props.index];

const statusColor = computed(() => {
  if (player.gameStatus == "blackjack") return "text-yellow-400";
  return "";
});
</script>

<template>
  <div id="playerInfo" class="text-gray-100">
    <p class="playerName sm:text-3xl text-2xl font-bold mb-2">
      {{ player.name }}
    </p>
    <div class="playerStatus text-base flex justify-between">
      <p class="px-1">
        S:<span :class="statusColor">{{ player.gameStatus }}</span>
      </p>
      <p class="px-1">B:{{ player.bet }}</p>
      <p class="px-1">C:{{ player.chips }}</p>
    </div>
    <div id="playerScore" class="pb-2">
      <span
        class="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
        >{{ player.getHandScore() }}
      </span>
    </div>
  </div>
</template>
