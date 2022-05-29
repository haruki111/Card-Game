<script setup lang="ts">
import { computed, ref, reactive, watch } from "vue";
import { useTableStore } from "@/stores/table";
import { useBlackJackRenderStore } from "@/stores/blackJackRender";

import type { BlackJackPlayer } from "@/models/player/blackJackPlayer";
import type { BlackJackTable } from "@/models/table/blackjackTable";
import { gsap } from "gsap";

let props = defineProps<{
  player: BlackJackPlayer;
  isHide: boolean[];
}>();
const table = useTableStore().table as BlackJackTable;
const render = useBlackJackRenderStore();

const tweened = reactive({
  chips: props.player.chips,
  bet: props.player.bet,
});

watch(props.player, (player) => {
  gsap.to(tweened, {
    duration: 0.5,
    chips: Number(player.chips) || 0,
    bet: Number(player.bet) || 0,
  });
});

const isDisplayBalloon = ref(false);

watch(props.player, (player) => {
  const displayStatus = [
    "surrender",
    "stand",
    "hit",
    "double",
    "bust",
    "blackjack",
  ];
  if (
    displayStatus.includes(player.gameStatus) &&
    (player.isAction || player.gameStatus === "bust")
  ) {
    isDisplayBalloon.value = true;
    setTimeout(() => {
      isDisplayBalloon.value = false;
    }, table.balloonTime);
  }
});

const statusColor = computed(() => {
  if (props.player.gameStatus == "blackjack") {
    return "text-yellow-500";
  }
  return "";
});

const blinkTurnPlayer = computed(() => {
  if (
    table.getTurnPlayer() === props.player &&
    table.gamePhase !== "assignPlayerHands" &&
    (render.blinkPlayerName || render.renderAction || render.renderBet)
  ) {
    return "blinkTurnPlayer";
  }
  return "";
});

const displayScore = computed(() => {
  const player = props.player;
  if (!player.hand.length) {
    return 0;
  } else if (!props.isHide[0]) {
    return player.getHandScore();
  }
  return 0;
});

const winOrLose = computed(() => {
  const player = props.player;
  const newestGrade = player.grades[player.grades.length - 1];
  if (newestGrade == 1) {
    return "Win";
  } else if (newestGrade == 0) {
    return "Draw";
  }
  return "Lose";
});

const winOrLoseColor = () => {
  if (winOrLose.value === "Win") {
    return "text-red-500";
  } else if (winOrLose.value === "Draw") {
    return "text-gray-200";
  } else {
    return "text-blue-600";
  }
};
</script>

<template>
  <div id="playerInfo" class="text-gray-100 relative">
    <div
      v-if="table.gamePhase === 'evaluatingEnd'"
      :class="winOrLoseColor()"
      class="md:text-3xl sm:text-2xl text-xl font-bold"
    >
      {{ winOrLose }}
    </div>
    <p
      :class="blinkTurnPlayer"
      class="playerName md:text-3xl sm:text-2xl text-xl font-bold mb-2"
    >
      {{ player.name }}
    </p>
    <div class="playerStatus sm:text-base text-xs flex justify-center">
      <p class="px-2 w-16">B:{{ tweened.bet.toFixed(0) }}</p>
      <p class="px-2 w-16">C:{{ tweened.chips.toFixed(0) }}</p>
    </div>
    <div id="playerScore" class="pb-2">
      <span
        :class="statusColor"
        class="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
        >{{ displayScore }}
      </span>
    </div>
    <Transition name="fade">
      <div
        v-if="
          (table.gamePhase == 'acting' ||
            table.gamePhase == 'evaluatingWinners') &&
          isDisplayBalloon == true
        "
        class="status-balloon absolute -top-1/2 left-1/2 -translate-x-1/2"
      >
        <p class="sm:text-xl text-lg font-bold mx-6">
          {{ player.gameStatus }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
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
