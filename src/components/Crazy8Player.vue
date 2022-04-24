<script setup lang="ts">
import { computed } from "vue";
import { useTableStore } from "@/stores/table";

import GameCard from "./GameCard.vue";

let props = defineProps<{
  index: number;
}>();

const table = useTableStore().table;

const players = table.players;
const player = players[props.index];

const playerCardHide = computed(() => {
  if (table.gamePhase == "betting" || table.gamePhase == "distribute")
    return [true, true];
  else {
    let hideArr: boolean[] = [];
    for (let i = 0; i < player.hand.length; i++) {
      hideArr.push(false);
    }
    return hideArr;
  }
});

const cardRotate = (index: number) => {
  if (index == 1) {
    return "rotate-90";
  } else if (index == 3) {
    return "-rotate-90";
  }
  return "";
};
</script>
<template>
  <div>
    <div id="playerInfo" class="text-gray-100 text-center">
      <p class="playerName sm:text-3xl text-2xl font-bold mb-2">
        {{ player.name }}
      </p>
    </div>
    <TransitionGroup
      name="player-cards"
      tag="div"
      :class="cardRotate(props.index)"
      class="flex justify-center pb-2"
    >
      <GameCard
        v-for="(card, index) in player.hand"
        :key="index"
        :card="card"
        :isHide="playerCardHide[index]"
      />
    </TransitionGroup>
  </div>
</template>
<style scoped>
.player-cards-move,
.player-cards-enter-active,
.player-cards-leave-active {
  transition: all 0.3s ease;
}
.player-cards-enter-from,
.player-cards-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.player-cards-leave-active {
  position: absolute;
}
</style>
