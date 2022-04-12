<script setup lang="ts">
import { computed } from "vue";
import { useTableStore } from "@/stores/table";

// import { usePlayerStore } from "../stores/player";
import PlayerInfo from "./PlayerInfo.vue";
import GameCard from "./GameCard.vue";

let table = useTableStore();
const playerCardHide = computed(() => {
  if (table.gamePhase == "betting") return [true, true];
  else {
    let hideArr = [];
    for (let i = 0; i < player.hand.length; i++) {
      hideArr.push(false);
    }
    return hideArr;
  }
});

interface Props {
  index: number;
}

let props = defineProps<Props>();

const players = useTableStore().players;
const player = players[props.index];
</script>
<template>
  <div class="text-center">
    <PlayerInfo :index="index" />
    <div id="playerCards" class="flex justify-center pb-2">
      <GameCard
        v-for="(card, index) in player.hand"
        :key="index"
        :card="card"
        :isHide="playerCardHide[index]"
      />
    </div>
  </div>
</template>
