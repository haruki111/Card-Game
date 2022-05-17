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
  table.betDenominations.forEach((img, chips) => {
    if ((user.chips - bet.value) / Number(chips) >= 1)
      chipsArr.push(Number(chips));
  });

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
  return "sm:ml-[-78px] ml-[-58px]";
};
const betChips = () => {
  render.renderTableHelper(bet.value, table);
  render.renderBet = false;
  chipsInBet.clear();
};
</script>
<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex justify-center items-center sm:mt-4 mt-2">
      <TransitionGroup
        name="betChip"
        tag="div"
        v-for="[key, sheets] in Array.from(chipsInBet)"
        :key="key"
        class="flex sm:px-2 px-1"
        @click="minusBet(key)"
      >
        <div
          v-for="sheet in sheets"
          :key="sheet"
          :class="stackChipStyle(sheet)"
        >
          <img
            :src="table.betDenominations.get(key)"
            class="sm:h-16 sm:w-16 h-12 w-12 max-w-none"
            alt=""
          />
        </div>
      </TransitionGroup>
    </div>

    <TransitionGroup
      name="chipList"
      tag="div"
      class="flex justify-center sm:mt-4 mt-2"
    >
      <div v-for="chip in renderChips" :key="chip" class="sm:px-2 px-1">
        <img
          @click="plusBet(chip)"
          :src="table.betDenominations.get(chip)"
          class="sm:h-16 sm:w-16 h-12 w-12 max-w-none"
          alt=""
        />
      </div>
    </TransitionGroup>

    <div class="flex justify-center sm:mt-4 mt-2">
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
