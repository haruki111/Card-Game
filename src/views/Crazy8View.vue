<script setup lang="ts">
import { useTableStore } from "@/stores/table";
import Crazy8Player from "../components/Crazy8Player.vue";
import GameRound from "@/components/GameRound.vue";
import GameCard from "@/components/GameCard.vue";
import type { Crazy8Table } from "@/models/table/crazy8Table";

const table = useTableStore().table as Crazy8Table;
</script>
<template>
  <div
    id="playersWrap"
    class="flex justify-between flex-col w-4/5 m-auto"
    style="height: 70vh"
  >
    <Crazy8Player :index="0" class="h-1/4" />
    <div class="flex justify-between items-center h-2/3">
      <Crazy8Player
        :index="3"
        class="flex items-center flex-row justify-around w-1/5"
      />

      <GameCard
        v-if="table.cardPlaceArr.length != 0"
        :card="table.cardPlaceArr[table.cardPlaceArr.length - 1]"
        :isHide="false"
      />
      <Crazy8Player
        :index="1"
        class="flex items-center flex-row-reverse justify-around w-1/5"
      />
    </div>
    <Crazy8Player :index="2" class="h-1/4" />
  </div>

  <GameRound />
  <div>{{ table.gamePhase }}</div>
  <button
    @click="table.haveTurn(null)"
    type="button"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
  >
    Default
  </button>

  <Transition name="fade"> </Transition>
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
