<script setup lang="ts">
import House from "../components/House.vue";
import Player from "../components/Player.vue";
import GameAction from "@/components/GameAction.vue";
import GameRound from "@/components/GameRound.vue";
import { usePlayerStore } from "@/stores/player";
const players = usePlayerStore();
</script>
<template>
  <div>
    <div id="houseWrap" class="text-center">
      <House />
    </div>
    <div id="playersWrap" class="flex justify-around">
      <Player
        v-for="(player, index) in players.players"
        :key="index"
        :index="index"
      />
    </div>
  </div>
  <GameAction />
  <GameRound />

  <div class="text-center mt-5">
    <router-link to="/">homeページ</router-link>
  </div>
</template>
