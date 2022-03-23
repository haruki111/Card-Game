<script setup lang="ts">
import HouseInfo from "@/components/HouseInfo.vue";
import PlayerInfo from "@/components/PlayerInfo.vue";
import GameCard from "@/components/GameCard.vue";
import GameAction from "@/components/GameAction.vue";
import GameRound from "@/components/GameRound.vue";
</script>
<template>
  <div>
    <div id="houseWrap" class="text-center">
      <HouseInfo />
      <div id="houseCards" class="flex justify-center pb-2">
        <GameCard />
        <GameCard />
      </div>
    </div>
    <div id="playersWrap" class="flex justify-around">
      <div id="player" class="text-center">
        <PlayerInfo />

        <div id="playerCards" class="flex justify-center pb-2">
          <GameCard />
          <GameCard />
        </div>
      </div>
      <div id="player" class="text-center mt-24">
        <PlayerInfo />

        <div id="playerCards" class="flex justify-center pb-2">
          <GameCard />
          <GameCard />
        </div>
      </div>
      <div id="player" class="text-center">
        <PlayerInfo />
        <div id="playerCards" class="flex justify-center pb-2">
          <GameCard />
          <GameCard />
        </div>
      </div>
    </div>
  </div>
  <gameAction />
  <gameRound />

  <div class="text-center mt-5">
    <router-link to="/">homeページ</router-link>
  </div>
</template>
