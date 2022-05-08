<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { useTableStore } from "@/stores/table";
import type { Player } from "@/models/player/player";
import type { BlackJackTable } from "@/models/table/blackjackTable";
import { gsap } from "gsap";

let props = defineProps<{
  player: Player;
}>();
const table = useTableStore().table as BlackJackTable;

const tweened = reactive({
  chips: props.player.chips,
  bet: props.player.bet,
});

watch(props.player, (n) => {
  gsap.to(tweened, {
    duration: 0.5,
    chips: Number(n.chips) || 0,
    bet: Number(n.bet) || 0,
  });
});

const statusColor = computed(() => {
  if (props.player.gameStatus == "blackjack") return "text-yellow-400";
  return "";
});

const blinkTurnPlayer = computed(() => {
  if (table.getTurnPlayer() == props.player) {
    return "blinkTurnPlayer";
  }
  return "";
});

const displayScore = computed(() => {
  const player = props.player;
  if (!player.hand.length) return 0;
  else return player.getHandScore();
});

const winOrLose = computed(() => {
  const player = props.player;
  const newestGrade = player.grades[player.grades.length - 1];
  if (newestGrade == 1) return "win";
  else if (newestGrade == 0) return "draw";
  return "lose";
});
</script>

<template>
  <div id="playerInfo" class="text-gray-100">
    <div
      v-if="table.gamePhase === 'evaluatingEnd'"
      class="text-3xl font-bold"
      style="text-shadow: 0px 2px 3px darkgrey"
    >
      {{ winOrLose }}
    </div>
    <p
      :class="blinkTurnPlayer"
      class="playerName sm:text-3xl text-2xl font-bold mb-2"
    >
      {{ player.name }}
    </p>
    <div class="playerStatus text-base flex justify-between">
      <p class="px-1">
        S:<span :class="statusColor">{{ player.gameStatus }}</span>
      </p>
      <p class="px-1">B:{{ tweened.bet.toFixed(0) }}</p>
      <p class="px-1">C:{{ tweened.chips.toFixed(0) }}</p>
    </div>
    <div id="playerScore" class="pb-2">
      <span
        class="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
        >{{ displayScore }}
      </span>
    </div>
  </div>
</template>

<style scoped>
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
