<script setup lang="ts">
import { useTableStore } from "@/stores/table";
import { useBlackJackRenderStore } from "@/stores/blackJackRender";
import type { BlackJackTable } from "@/models/table/blackjackTable";
import House from "../components/House.vue";
import Player from "../components/Player.vue";
import GameAction from "@/components/GameAction.vue";
import GameRound from "@/components/GameRound.vue";
import GameBet from "@/components/GameBet.vue";
import GameResult from "../components/GameResult.vue";
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
  <div class="-mt-24">
    <div id="houseWrap" class="text-center">
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
