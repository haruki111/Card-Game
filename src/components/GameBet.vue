<script setup lang="ts">
import { ref, computed } from "vue";
import { useTableStore } from "@/stores/table";
import { useBlackJackRenderStore } from "@/stores/blackJackRender";

import type { BlackJackTable } from "@/models/table/blackjackTable";

const table = useTableStore().table as BlackJackTable;
const render = useBlackJackRenderStore();

const user = table.players[1];

let bet = ref(0);
let chipsInBet = new Map<number, number>();

const validBet = computed(() => {
  return bet.value <= 0;
});

const disabledBgBlueColor = computed(() => {
  if (validBet.value) return "bg-blue-700";
  return "bg-blue-600";
});

const renderChips = computed(() => {
  let chipsArr: number[] = [];
  for (let chips in table.betDenominations) {
    if ((user.chips - bet.value) / Number(chips) >= 1)
      chipsArr.push(Number(chips));
  }

  return chipsArr;
});

const plusBet = (num: number): void => {
  if (user.chips >= bet.value + num) {
    bet.value += num;
    if (!chipsInBet.has(num)) {
      chipsInBet.set(num, 1);
    } else {
      chipsInBet.set(num, Number(chipsInBet.get(num)) + 1);
    }
  }
};

const minusBet = (num: number): void => {
  if (chipsInBet.has(num)) {
    bet.value -= num;
    chipsInBet.set(num, Number(chipsInBet.get(num)) - 1);
    if (chipsInBet.get(num) == 0) {
      chipsInBet.delete(num);
    }
  }
};

const stackChipStyle = (num: number) => {
  if (num == 1) return "";
  return "margin-left: -78px";
};

const betChips = () => {
  render.renderTableHelper(bet.value, table);
  render.renderBet = false;
  chipsInBet.clear();
};
</script>
<template>
  <div class="fixed z-10 inset-0 mt-60">
    <div class="flex flex-col items-center justify-center min-h-screen">
      <div class="flex justify-center items-center h-16 mt-4">
        <TransitionGroup
          name="betChip"
          tag="div"
          v-for="[key, sheets] in Array.from(chipsInBet)"
          :key="key"
          class="flex px-2"
          @click="minusBet(key)"
        >
          <div
            v-for="sheet in sheets"
            :key="sheet"
            :style="stackChipStyle(sheet)"
          >
            <img :src="table.betDenominations[key]" class="h-16" alt="" />
          </div>
        </TransitionGroup>
      </div>

      <TransitionGroup
        name="chipList"
        tag="div"
        class="h-16 mt-4 flex justify-center"
      >
        <div v-for="chip in renderChips" :key="chip" class="px-2">
          <img
            @click="plusBet(chip)"
            :src="table.betDenominations[chip]"
            class="h-16"
            alt=""
          />
        </div>
      </TransitionGroup>

      <div class="mt-4 flex justify-center">
        <button
          :disabled="validBet"
          :class="disabledBgBlueColor"
          id="betSubmitBtn"
          type="submit"
          class="text-white focus:outline-none focus:ring-4 focus:ring-blue-500 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          @click="betChips"
        >
          Submit your bet for {{ bet }}
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.betChip-move,
.betChip-enter-active,
.betChip-leave-active {
  transition: all 0.5s ease;
}
.betChip-enter-from,
.betChip-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.betChip-leave-active {
  position: absolute;
}

.chipList-move,
.chipList-enter-active,
.chipList-leave-active {
  transition: all 0.5s ease;
}
.chipList-enter-from,
.chipList-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.chipList-leave-active {
  position: absolute;
}
</style>
