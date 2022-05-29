<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useTableStore } from "@/stores/table";
import statusBalloon from "@/components/statusBalloon.vue";

import type { BlackJackTable } from "@/models/table/blackjackTable";

const table = useTableStore().table as BlackJackTable;

const house = table.house;

let props = defineProps<{
  isHide: boolean[];
}>();

const isDisplayBalloon = ref(false);
const showBalloon = computed(() => {
  return (
    table.gamePhase == "evaluatingWinners" && isDisplayBalloon.value == true
  );
});

watch(house, (player) => {
  const displayStatus = ["stand", "hit", "bust", "blackjack"];
  if (displayStatus.includes(player.gameStatus)) {
    isDisplayBalloon.value = true;
    setTimeout(() => {
      isDisplayBalloon.value = false;
    }, table.balloonTime);
  }
});

const displayHouseScore = computed(() => {
  if (!house.hand.length) return 0;
  else if (!props.isHide[0] && props.isHide[1])
    return house.hand[0].getBJRankNumber();
  else if (!props.isHide[1]) {
    return house.getHandScore();
  }
  return 0;
});

const blinkTurnPlayer = computed(() => {
  if (table.getTurnPlayer() == house && table.gamePhase !== "evaluatingEnd") {
    return "blinkTurnPlayer";
  }
  return "";
});
</script>
<template>
  <div id="houseInfo" class="text-gray-100 relative">
    <p
      :class="blinkTurnPlayer"
      class="playerName md:text-3xl sm:text-2xl text-xl font-bold mb-2"
    >
      {{ house.name }}
    </p>
    <div id="playerScore" class="pb-2">
      <span
        class="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
        >{{ displayHouseScore }}
      </span>
    </div>
    <Transition name="fade">
      <statusBalloon :player="house" :showBalloon="showBalloon" />
    </Transition>
  </div>
</template>
<style scoped>
.blinkTurnPlayer {
  animation: blink 0.8s ease-in-out infinite alternate;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
