<script setup lang="ts">
import { computed, ref, reactive, watch } from "vue";
import { useTableStore } from "@/stores/table";
import { useCrazy8RenderStore } from "@/stores/crazy8Render";
import type { Card } from "@/stores/card";
import GameCard from "./GameCard.vue";
import type { Crazy8Table } from "@/models/table/crazy8Table";
import { gsap } from "gsap";

const render = useCrazy8RenderStore();

let props = defineProps<{
  index: number;
}>();

const table = useTableStore().table as Crazy8Table;

const player = table.players[props.index];

const tweened = reactive({
  score: 0,
});

watch(useTableStore().table.players[props.index], (n) => {
  gsap.to(tweened, { duration: 0.5, score: Number(n.chips) || 0 });
});

const isDisplayBalloon = ref(false);

watch(player, (n) => {
  if (n.gameStatus === "path") {
    isDisplayBalloon.value = true;
    setTimeout(() => {
      isDisplayBalloon.value = false;
    }, 2000);
  }
});

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
    if (card.rank === "8") {
      render.renderAction = false;
      render.renderSelectSuit = true;
      table.cardPlaceArr.push(card);
    } else if (card.suit == cardPlace.suit || card.rank == cardPlace.rank) {
      render.renderAction = false;
      render.renderTableUserHelper({ card: card, nextSuit: "" }, table);
    }
  }
};

const blinkTurnPlayer = computed(() => {
  if (table.gamePhase == "play" && table.getTurnPlayer() == player) {
    return "blinkTurnPlayer";
  }
  return "";
});

const winOrLose = computed(() => {
  if (table.winPlayers.includes(player)) return "WIN";
  else return "LOSE";
});
</script>
<template>
  <div>
    <div id="playerInfo" class="text-gray-100 text-center relative">
      <div
        v-if="table.gamePhase === 'betweenGames'"
        class="text-3xl font-bold"
        style="text-shadow: 0px 2px 3px darkgrey"
      >
        {{ winOrLose }}
      </div>
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
        {{ tweened.score.toFixed(0) }}
      </p>
      <Transition name="fade">
        <div
          v-if="player.gameStatus === 'path' && isDisplayBalloon == true"
          class="status-balloon absolute -top-1/2 left-1/2 -translate-x-1/2"
        >
          <p class="sm:text-xl text-lg font-bold">
            {{ player.gameStatus }}
          </p>
        </div>
      </Transition>
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
.status-balloon {
  display: inline-block;
  padding: 7px 10px;
  max-width: 100%;
  color: #030303;
  font-size: 16px;
  background: #f9f9f9;
  border-radius: 15px;
}

.status-balloon:before {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -15px;
  border: 15px solid transparent;
  border-top: 15px solid #f9f9f9;
}

.status-balloon p {
  margin: 0;
  padding: 0;
}

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
