<script setup lang="ts">
import { computed, ref, reactive, watch } from "vue";
import { useTableStore } from "@/stores/table";
import { useCrazy8RenderStore } from "@/stores/crazy8Render";
import type { Card } from "@/models/card";
import GameCard from "../GameCard.vue";
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
    }, table.balloonTime);
  }
});

const playerCardHide = computed(() => {
  let hideArr: boolean[] = [];

  if (player.type !== "user") {
    for (let i = 0; i < player.hand.length; i++) {
      hideArr.push(true);
    }
    return hideArr;
  } else {
    for (let i = 0; i < player.hand.length; i++) {
      hideArr.push(false);
    }
    return hideArr;
  }
});

const cardsRow = (index: number) => {
  if (index == 0) {
    return "flex-wrap-reverse w-[800px]";
  } else if (index == 1) {
    return "flex-col h-[600px]";
  } else if (index == 3) {
    return "flex-wrap-reverse flex-col h-[600px]";
  }
  return "w-[800px]";
};

const cardRotate = (
  index: number
): {
  isRotate: boolean;
  class: string;
} => {
  if (index == 1) {
    return { isRotate: true, class: "-rotate-90" };
  } else if (index == 3) {
    return { isRotate: true, class: "rotate-90" };
  }
  return { isRotate: false, class: "" };
};

const play = (card: Card): void => {
  const cardPlace = table.peekCardPlaceArr();
  if (render.renderAction == true && player.type == "user") {
    if (card.rank === "8") {
      render.renderAction = false;
      render.renderSelectSuit = true;
      table.cardPlaceArr.push(card);
    } else if (card.suit == cardPlace.suit || card.rank == cardPlace.rank) {
      render.renderAction = false;
      render.renderTableHelper({ card: card, nextSuit: "" }, table);
    }
  }
};

const shadowCard = (card: Card): boolean => {
  if (render.renderAction == true && player.type === "user")
    return !player.getHavePlayCard(table.peekCardPlaceArr()).includes(card);
  else return false;
};

const blinkTurnPlayer = computed(() => {
  if (table.gamePhase == "play" && table.getTurnPlayer() == player) {
    return "blinkTurnPlayer";
  }
  return "";
});

const winOrLose = computed(() => {
  if (table.winPlayers.includes(player)) return "Win";
  else return "Lose";
});

const winOrLoseColor = () => {
  if (winOrLose.value === "Win") {
    return "text-red-500";
  } else {
    return "text-blue-600";
  }
};
</script>
<template>
  <div>
    <div id="playerInfo" class="text-gray-100 text-center relative">
      <div
        v-if="table.gamePhase === 'betweenGames'"
        :class="winOrLoseColor()"
        class="text-3xl font-bold"
      >
        {{ winOrLose }}
      </div>

      <p
        :class="blinkTurnPlayer"
        class="playerName sm:text-3xl text-2xl font-bold flex items-center justify-center mb-2"
      >
        <span
          v-if="table.dealerNum == index"
          class="inline-block w-8 h-8 leading-8 mx-2 border border-gray-600 bg-gray-100 text-gray-800 text-sm font-medium rounded-full"
        >
          D
        </span>
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
          <p class="sm:text-xl text-lg font-bold mx-2.5">
            {{ player.gameStatus }}
          </p>
        </div>
      </Transition>
    </div>

    <TransitionGroup
      name="player-cards"
      tag="div"
      :class="cardsRow(props.index)"
      class="flex-wrap flex justify-center m-auto pb-2"
    >
      <GameCard
        v-for="(card, index) in player.hand"
        @click="play(card)"
        :key="index"
        :card="card"
        :isHide="playerCardHide[index]"
        :isShadow="shadowCard(card)"
        :rotate="cardRotate(props.index)"
        class="mx-1"
      />
    </TransitionGroup>
  </div>
</template>
<style scoped>
.box {
  width: 800px;
  flex-wrap: wrap;
  margin: auto;
}

.status-balloon {
  display: inline-block;
  padding: 7px 0px;
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
