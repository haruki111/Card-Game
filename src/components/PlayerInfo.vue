<script setup lang="ts">
import { usePlayerStore } from "../stores/player";

interface Props {
  index: number;
}

let props = defineProps<Props>();
const players = usePlayerStore();
const player = players.players[props.index];
</script>

<template>
  <div id="playerInfo" class="text-gray-100">
    <p class="playerName sm:text-3xl text-2xl font-bold mb-2">
      {{ player.name }}
    </p>
    <div class="playerStatus text-base flex justify-between">
      <p class="px-1">S:{{ player.gameStatus }}</p>
      <p class="px-1">B:{{ player.bet }}</p>
      <p class="px-1">C:{{ player.chips }}</p>
    </div>
    <div id="playerScore" class="pb-2">
      <span
        class="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
        >{{ players.getHandScore(index) }}
      </span>
    </div>
  </div>
</template>
