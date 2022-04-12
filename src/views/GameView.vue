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
  <div>
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
  <GameAction v-if="render.renderAction" />
  <GameBet v-if="render.renderBet" />
  <GameResult v-if="render.renderResult" />
  <GameEndResult v-if="render.renderEndResult" />

  <GameRound />

  <div class="text-center">
    <router-link to="/">homeページ</router-link>
  </div>
</template>
