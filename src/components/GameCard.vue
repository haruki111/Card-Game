<script setup lang="ts">
import type { Card } from "../stores/card";

const imgMap: Map<string, string> = new Map([
  ["?", "/src/assets/cardSuit/questionMark.png"],
  ["H", "/src/assets/cardSuit/heart.png"],
  ["D", "/src/assets/cardSuit/diamond.png"],
  ["C", "/src/assets/cardSuit/clover.png"],
  ["S", "/src/assets/cardSuit/spade.png"],
]);

interface Props {
  card: Card;
  isHide: boolean;
}
let props = defineProps<Props>();
</script>
<template>
  <div
    class="card bg-white h-16 w-12 mx-2 p-1 rounded border border-gray-500 shadow-md"
  >
    <div v-if="isHide == true" class="bg-red-600 h-full w-full rounded"></div>

    <div v-else>
      <div class="h-8 w-8 m-auto">
        <img :src="imgMap.get(props.card.suit)" />
      </div>
      <div class="cardText pt-1 text-slate-900">
        <p class="">{{ props.card.rank }}</p>
      </div>
    </div>
  </div>
</template>
