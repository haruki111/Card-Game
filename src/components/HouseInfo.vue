<script setup lang="ts">
import { computed } from "vue";
import { useTableStore } from "@/stores/table";
import type { Player } from "../stores/player";

const house: Player = useTableStore().house;
interface Props {
  isHide: boolean;
}
let props = defineProps<Props>();

const displayHouseScore = computed(() => {
  if (props.isHide == true) return house.hand[0].getRankNumber();
  return house.getHandScore();
});

const statusColor = computed(() => {
  if (house.gameStatus == "blackjack") return "text-yellow-400";
  return "";
});
</script>
<template>
  <div id="houseInfo" class="text-gray-100 pb-2">
    <p class="playerName sm:text-3xl text-2xl font-bold mb-2">
      {{ house.name }}
    </p>
    <div class="playerStatus text-base">
      <p>
        S:<span :class="statusColor">{{ house.gameStatus }}</span>
      </p>
    </div>
    <div id="playerScore" class="pb-2">
      <span
        class="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
        >{{ displayHouseScore }}
      </span>
    </div>
  </div>
</template>
