<script setup lang="ts">
import { usePlayerStore } from "../stores/player";
import PlayerInfo from "./PlayerInfo.vue";
import GameCard from "./GameCard.vue";

interface Props {
  index: number;
}

let props = defineProps<Props>();

const players = usePlayerStore();
const player = players.players[props.index];
</script>
<template>
  <div class="text-center">
    <PlayerInfo :index="index" />
    <div id="playerCards" class="flex justify-center pb-2">
      <GameCard
        v-for="(card, index) in player.hand"
        :key="index"
        :card="card"
      />
    </div>
  </div>
</template>
