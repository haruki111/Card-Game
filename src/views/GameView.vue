<script setup lang="ts">
import { useTableStore } from "@/stores/table";
import { useBlackJackRenderStore } from "@/stores/blackJackRender";
import type { BlackJackTable } from "@/models/table/blackjackTable";
import House from "../components/House.vue";
import Player from "../components/Player.vue";
import GameAction from "@/components/GameAction.vue";
import GameRound from "@/components/GameRound.vue";
import GameBet from "@/components/GameBet.vue";
import GameEndResult from "../components/GameEndResult.vue";
import GameCard from "@/components/GameCard.vue";

const table = useTableStore().table as BlackJackTable;
const render = useBlackJackRenderStore();

render.renderTable(table);

const stackDeckStyle = (index: number) => {
  if (index == 0) return "ml-0";
  return "-ml-12";
};
</script>
<template>
  <div class="">
    <div id="houseWrap" class="flex justify-start flex-col text-center h-48">
      <House />
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
          :rotate="{ isRotate: false, class: '' }"
          :class="stackDeckStyle(index)"
          class="mx-0"
        />
      </TransitionGroup>
    </div>
    <div id="playersWrap" class="flex justify-around mt-5">
      <Player
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
      <GameAction
        v-if="render.renderAction"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <GameBet
        v-else-if="render.renderBet"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <GameEndResult v-else-if="render.renderEndResult" />
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
