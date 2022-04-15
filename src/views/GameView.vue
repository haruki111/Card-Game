<script setup lang="ts">
import House from "../components/House.vue";
import Player from "../components/Player.vue";
import GameAction from "@/components/GameAction.vue";
import GameRound from "@/components/GameRound.vue";
import GameBet from "@/components/GameBet.vue";
import GameResult from "../components/GameResult.vue";
import GameEndResult from "../components/GameEndResult.vue";

import { useTableStore } from "@/stores/table";
import { useRenderStore } from "@/stores/render";

const table = useTableStore();
const render = useRenderStore();

render.renderTable();
</script>
<template>
  <div class="-mt-24">
    <div id="houseWrap" class="text-center">
      <House />
    </div>
    <div id="playersWrap" class="flex justify-around mt-5">
      <Player
        v-for="(player, index) in table.players"
        :key="index"
        :index="index"
      />
    </div>
  </div>
  <GameRound />

  <Transition name="fade">
    <GameAction v-if="render.renderAction" />
    <GameBet v-else-if="render.renderBet" />
    <GameResult v-else-if="render.renderResult" />
    <GameEndResult v-else-if="render.renderEndResult" />
  </Transition>

  <!-- <div class="text-center">
    <router-link to="/">homeページ</router-link>
  </div> -->
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
