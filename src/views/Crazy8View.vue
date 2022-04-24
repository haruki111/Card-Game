<script setup lang="ts">
import { useTableStore } from "@/stores/table";
import Crazy8Player from "../components/Crazy8Player.vue";
import GameRound from "@/components/GameRound.vue";

const table = useTableStore().table;
</script>
<template>
  <div
    id="playersWrap"
    class="flex justify-between flex-col w-4/5 m-auto"
    style="height: 70vh"
  >
    <Crazy8Player :index="0" class="h-1/4" />
    <div class="flex justify-between h-1/3">
      <Crazy8Player :index="1" class="flex items-center flex-row" />
      <Crazy8Player :index="3" class="flex items-center flex-row-reverse" />
    </div>
    <Crazy8Player
      :index="2"
      class="h-1/4 flex justify-center flex-col-reverse"
    />
  </div>

  <GameRound />

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
