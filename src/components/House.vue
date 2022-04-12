<script setup lang="ts">
import { computed } from "vue";
import { useTableStore } from "@/stores/table";
import HouseInfo from "./HouseInfo.vue";
import GameCard from "./GameCard.vue";

const table = useTableStore();

const house = table.house;

const houseCardHide = computed(() => {
  if (table.gamePhase == "betting") return [true, true];
  else if (
    table.gamePhase != "evaluatingWinners" &&
    table.gamePhase != "evaluatingEnd"
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
  <HouseInfo :isHide="houseCardHide[1]" />
  <div id="houseCards" class="flex justify-center pb-2">
    <GameCard
      v-for="(card, index) in house.hand"
      :key="index"
      :card="card"
      :isHide="houseCardHide[index]"
    />
  </div>
</template>
