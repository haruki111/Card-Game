<script setup lang="ts">
import { computed } from "vue";
import { useTableStore } from "@/stores/table";
import { useCrazy8RenderStore } from "@/stores/crazy8Render";
import type { Card } from "@/stores/card";
import GameCard from "./GameCard.vue";
import type { Crazy8Table } from "@/models/table/crazy8Table";

const render = useCrazy8RenderStore();

let props = defineProps<{
  index: number;
}>();

const table = useTableStore().table as Crazy8Table;

const players = table.players;
const player = players[props.index];

const playerCardHide = computed(() => {
  if (table.gamePhase == "betting" || table.gamePhase == "distribute")
    return [false, false, false, false, false];
  else {
    let hideArr: boolean[] = [];
    for (let i = 0; i < player.hand.length; i++) {
      hideArr.push(false);
    }
    return hideArr;
  }
});

const cardsRow = (index: number) => {
  if (index == 1 || index == 3) {
    return "flex-col";
  }
  return "";
};

const cardRotate = (index: number) => {
  if (index == 1) {
    return { isRotate: true, class: "-rotate-90" };
  } else if (index == 3) {
    return { isRotate: true, class: "rotate-90" };
  }
  return { isRotate: false, class: "" };
};

const play = (card: Card) => {
  const cardPlace = table.cardPlaceArr[table.cardPlaceArr.length - 1];
  if (render.renderAction == true && player.type == "user") {
    if (
      card.suit == cardPlace.suit ||
      card.rank == cardPlace.rank ||
      card.rank == "8"
    ) {
      render.renderAction = false;
      render.renderTableUserHelper(card);
    }
  }
};

const blinkTurnPlayer = computed(() => {
  if (table.gamePhase == "play" && table.getTurnPlayer() == player) {
    return "blinkTurnPlayer";
  }
  return "";
});
</script>
<template>
  <div>
    <div id="playerInfo" class="text-gray-100 text-center">
      <div
        v-if="table.dealerNum == index"
        class="w-8 h-8 m-auto flex items-center justify-center border border-gray-600 bg-gray-100 text-gray-800 text-sm font-medium rounded-full"
      >
        D
      </div>

      <p
        :class="blinkTurnPlayer"
        class="playerName sm:text-3xl text-2xl font-bold mb-2"
      >
        {{ player.name }}
      </p>

      <p class="sm:text-3xl text-2xl font-bold mb-2">
        {{ player.chips }}
      </p>
    </div>
    <TransitionGroup
      name="player-cards"
      tag="div"
      :class="cardsRow(props.index)"
      class="flex justify-center pb-2"
    >
      <GameCard
        v-for="(card, index) in player.hand"
        @click="play(card)"
        :key="index"
        :card="card"
        :isHide="playerCardHide[index]"
        :rotate="cardRotate(props.index)"
        class="mx-1"
      />
    </TransitionGroup>
  </div>
</template>
<style scoped>
.player-cards-move,
.player-cards-enter-active,
.player-cards-leave-active {
  transition: all 0.3s ease;
}
.player-cards-enter-from,
.player-cards-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.player-cards-leave-active {
  position: absolute;
}

.blinkTurnPlayer {
  animation: blink 0.8s ease-in-out infinite alternate;
}

@keyframes blink {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
</style>
