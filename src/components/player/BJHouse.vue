<script setup lang="ts">
import { computed } from "vue";
import { useTableStore } from "@/stores/table";
import BJHouseInfo from "./BJHouseInfo.vue";
import GameCard from "../GameCard.vue";

import type { BlackJackTable } from "@/models/table/blackjackTable";

const table = useTableStore().table as BlackJackTable;
const house = table.house;

const houseCardHide = computed(() => {
  if (table.gamePhase == "betting" || table.gamePhase == "assignPlayerHands")
    return [true, true];
  else if (
    table.gamePhase != "evaluatingWinners" &&
    table.gamePhase != "evaluatingEnd" &&
    table.gamePhase != "end"
  ) {
    return [false, true];
  } else {
    let hideArr: boolean[] = [];
    for (let i = 0; i < house.hand.length; i++) {
      hideArr.push(false);
    }
    return hideArr;
  }
});
</script>
<template>
  <BJHouseInfo :isHide="houseCardHide" />
  <TransitionGroup
    name="house-cards"
    tag="div"
    class="flex justify-center sm:h-16 h-10"
  >
    <GameCard
      v-for="(card, index) in house.hand"
      :key="index"
      :card="card"
      :isHide="houseCardHide[index]"
      :isShadow="false"
      :rotate="{ isRotate: false, class: '' }"
    />
  </TransitionGroup>
</template>
<style scoped>
.house-cards-move,
.house-cards-enter-active,
.house-cards-leave-active {
  transition: all 0.3s ease;
}
.house-cards-enter-from,
.house-cards-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.player-cards-leave-active {
  position: absolute;
}
</style>
