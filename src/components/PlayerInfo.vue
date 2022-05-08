<script setup lang="ts">
import { computed } from "vue";
import { useTableStore } from "@/stores/table";
import type { Player } from "@/models/player/player";

let props = defineProps<{
  player: Player;
}>();
const table = useTableStore().table;

const statusColor = computed(() => {
  if (props.player.gameStatus == "blackjack") return "text-yellow-400";
  return "";
});

const blinkTurnPlayer = computed(() => {
  if (table.getTurnPlayer() == props.player) {
    return "blinkTurnPlayer";
  }
  return "";
});
</script>

<template>
  <div id="playerInfo" class="text-gray-100">
    <p
      :class="blinkTurnPlayer"
      class="playerName sm:text-3xl text-2xl font-bold mb-2"
    >
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

<style scoped>
.blinkTurnPlayer {
  animation: blink 0.8s ease-in-out infinite alternate;
}

@keyframes blink {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
</style>
