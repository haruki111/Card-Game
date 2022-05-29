<script setup lang="ts">
import { computed, ref, reactive, watch } from "vue";
import { useTableStore } from "@/stores/table";
import { useCrazy8RenderStore } from "@/stores/crazy8Render";
import type { Card } from "@/models/card";
import GameCard from "@/components/GameCard.vue";
import statusBalloon from "@/components/statusBalloon.vue";

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
const showBalloon = computed(() => {
  return player.gameStatus === "path" && isDisplayBalloon.value == true;
});

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
    return "flex-wrap-reverse xl:w-[800px] lg:w-[600px] w-[500px] min-h-[100px] mx-auto";
  } else if (index == 1) {
    return "flex-col xl:h-[450px] h-[350px]";
  } else if (index == 3) {
    return "flex-wrap-reverse flex-col xl:h-[450px] h-[350px]";
  }
  return "xl:w-[800px] lg:w-[600px] w-[500px] min-h-[100px] m-auto";
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

const dealerBudgePosition = computed(() => {
  if (cardRotate(props.index).isRotate) {
    return "absolute top-[5px] left-[-15px] -translate-x-full ";
  }
  return "";
});
</script>
<template>
  <div>
    <div
      id="playerInfo"
      :class="cardRotate(props.index).class"
      class="text-gray-100 text-center relative"
    >
      <div
        v-if="table.gamePhase === 'betweenGames'"
        :class="winOrLoseColor()"
        class="text-3xl font-bold"
      >
        {{ winOrLose }}
      </div>

      <p
        :class="blinkTurnPlayer"
        class="relative playerName xl:text-3xl sm:text-2xl text-xl font-bold flex items-center justify-center mb-2"
      >
        <span
          v-if="table.dealerNum == index"
          :class="dealerBudgePosition"
          class="inline-block w-8 h-8 leading-8 mx-2 border border-gray-600 bg-gray-100 text-gray-800 text-sm font-medium rounded-full"
        >
          D
        </span>
        {{ player.name }}
      </p>

      <p class="xl:text-3xl sm:text-2xl text-xl font-bold">
        {{ tweened.score.toFixed(0) }}
      </p>
      <Transition name="fade">
        <statusBalloon :player="player" :showBalloon="showBalloon" />
      </Transition>
    </div>

    <TransitionGroup
      name="player-cards"
      tag="div"
      :class="cardsRow(props.index)"
      class="flex-wrap flex justify-center pb-2"
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
