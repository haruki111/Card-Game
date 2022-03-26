<script setup lang="ts">
import { usePlayerStore } from "../stores/player";
import HouseInfo from "./HouseInfo.vue";
import GameCard from "./GameCard.vue";
const players = usePlayerStore();
const house = players.house;
</script>
<template>
  <HouseInfo />
  <div id="houseCards" class="flex justify-center pb-2">
    <GameCard v-for="(card, index) in house.hand" :key="index" :card="card" />
  </div>
</template>
