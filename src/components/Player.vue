<script setup lang="ts">
import { computed } from "vue";
import { useTableStore } from "@/stores/table";
import type { BlackJackTable } from "@/models/table/blackjackTable";

import PlayerInfo from "./PlayerInfo.vue";
import GameCard from "./GameCard.vue";

let props = defineProps<{
  index: number;
}>();

const table = useTableStore().table as BlackJackTable;
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
</script>
<template>
  <div class="text-center">
    <PlayerInfo :player="player" />
    <TransitionGroup
      name="player-cards"
      tag="div"
      class="flex justify-center h-16"
    >
      <GameCard
        v-for="(card, index) in player.hand"
        :key="index"
        :card="card"
        :isHide="playerCardHide[index]"
        :rotate="{ isRotate: false, class: '' }"
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
