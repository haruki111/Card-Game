<script setup lang="ts">
import { ref, computed } from "vue";
import { useTableStore } from "@/stores/table";
import { useRenderStore } from "@/stores/render";

const table = useTableStore();
const render = useRenderStore();

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
  if (num == 1) {
    return "";
  }
  return "margin-left: -105px";
};

const betChips = () => {
  render.renderTableHelper(bet.value);
  render.renderBet = false;
  chipsInBet.clear();
};
</script>
<template>
  <div class="flex justify-center items-center h-24 mt-4">
    <div
      v-for="[key, sheets] in Array.from(chipsInBet)"
      :key="key"
      class="flex px-2"
      @click="minusBet(key)"
    >
      <div v-for="sheet in sheets" :key="sheet" :style="stackChipStyle(sheet)">
        <img
          v-if="key == 5 || key == 20 || key == 50 || key == 100"
          :src="table.betDenominations[key]"
          alt=""
        />
      </div>
    </div>
  </div>

  <div class="mt-5 flex justify-center">
    <div
      v-for="(chip, index) in table.betDenominations"
      :key="index"
      @click="plusBet(Number(index))"
      class="px-2"
    >
      <img :src="chip" alt="" />
    </div>
  </div>
  <div class="mt-5 flex justify-center">
    <button
      :disabled="validBet"
      :class="disabledBgBlueColor"
      id="betSubmitBtn"
      type="submit"
      class="text-white focus:outline-none focus:ring-4 focus:ring-blue-500 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
      @click="betChips"
    >
      Submit your bet for {{ bet }}
    </button>
  </div>
</template>
