<script setup lang="ts">
import { computed } from "vue";
import { useTableStore } from "@/stores/table";

import type { BlackJackTable } from "@/models/table/blackjackTable";

const table = useTableStore().table as BlackJackTable;

const house = table.house;

let props = defineProps<{
  isHide: boolean;
}>();

const displayHouseScore = computed(() => {
  if (!house.hand.length) return 0;
  else if (props.isHide == true) return house.hand[0].getRankNumber();
  return house.getHandScore();
});

const statusColor = computed(() => {
  if (house.gameStatus == "blackjack") return "text-yellow-400";
  return "";
});

const blinkTurnPlayer = computed(() => {
  if (table.getTurnPlayer() == house && table.gamePhase !== "evaluatingEnd") {
    return "blinkTurnPlayer";
  }
  return "";
});
</script>
<template>
  <div id="houseInfo" class="text-gray-100">
    <p
      :class="blinkTurnPlayer"
      class="playerName sm:text-3xl text-2xl font-bold mb-2"
    >
      {{ house.name }}
    </p>
    <div class="playerStatus text-base">
      <p>
        S:<span :class="statusColor">{{ house.gameStatus }}</span>
      </p>
    </div>
    <div id="playerScore" class="pb-2">
      <span
        class="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
        >{{ displayHouseScore }}
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
