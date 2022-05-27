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
  if (index != 0) return "xl:-ml-12 sm:-ml-9 -ml-8";
};

render.renderTable(table);
</script>
<template>
  <div>
    <div id="houseWrap" class="flex justify-start flex-col text-center xl:h-48">
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
          class="sm:mx-0 mx-0"
        />
      </TransitionGroup>
    </div>
    <div id="playersWrap" class="flex justify-around mt-5">
      <BJPlayer
        v-for="(player, index) in table.players"
        :key="index"
        :index="index"
        class="w-1/3 flex justify-end flex-col xl:h-52"
      />
    </div>
  </div>
  <div class="md:h-[300px] mt-5 flex items-center justify-around">
    <Transition name="fade" class="sm:w-1/2">
      <BJAction v-if="render.renderAction" class="" />
      <BJBet v-else-if="render.renderBet" class="-mt-12" />
      <BJEndResult v-else-if="render.renderEndResult" class="sm:w-full" />
    </Transition>
    <GameRound class="round" />
  </div>
</template>

<style scoped>
.round {
  position: absolute;
  top: 90%;
  left: 90%;
  transform: translate(-90%, -90%);
}
@media (max-width: 640px) {
  .round {
    top: 95%;
    left: 90%;
    transform: translate(-90%, -95%);
  }
}
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
