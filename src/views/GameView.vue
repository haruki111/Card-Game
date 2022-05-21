<script setup lang="ts">
import { useTableStore } from "@/stores/table";
import { useBlackJackRenderStore } from "@/stores/blackJackRender";
import type { BlackJackTable } from "@/models/table/blackjackTable";
import BJHouse from "../components/player/BJHouse.vue";
import BJPlayer from "../components/player/BJPlayer.vue";
import BJAction from "@/components/BJAction.vue";
import BJBet from "@/components/BJBet.vue";
import BJEndResult from "../components/results/BJEndResult.vue";
import GameRound from "@/components/GameRound.vue";
import GameCard from "@/components/GameCard.vue";

const table = useTableStore().table as BlackJackTable;
const render = useBlackJackRenderStore();

const stackDeckStyle = (index: number) => {
  if (index == 0) return "ml-0";
  return "-ml-12";
};

render.renderTable(table);
</script>
<template>
  <div class="">
    <div id="houseWrap" class="flex justify-start flex-col text-center h-48">
      <BJHouse />
    </div>
    <div class="flex justify-center items-center mt-5">
      <TransitionGroup
        name="deck"
        tag="div"
        v-if="table.deck.deck.length"
        class="flex"
      >
        <GameCard
          v-for="(card, index) of table.deck.deck"
          :key="index"
          :card="card"
          :isHide="true"
          :isShadow="false"
          :rotate="{ isRotate: false, class: '' }"
          :class="stackDeckStyle(index)"
          class="mx-0"
        />
      </TransitionGroup>
    </div>
    <div id="playersWrap" class="flex justify-around mt-5">
      <BJPlayer
        v-for="(player, index) in table.players"
        :key="index"
        :index="index"
        class="w-1/3 flex justify-end flex-col h-52"
      />
    </div>
  </div>
  <div class="relative h-56 mt-2">
    <GameRound />
    <Transition name="fade">
      <BJAction
        v-if="render.renderAction"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <BJBet
        v-else-if="render.renderBet"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <BJEndResult v-else-if="render.renderEndResult" />
    </Transition>
  </div>
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

.deck-move,
.deck-enter-active,
.deck-leave-active {
  transition: all 0.5s ease;
}
.deck-enter-from,
.deck-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.deck-leave-active {
  position: absolute;
}
</style>
