<script setup lang="ts">
import { useTableStore } from "@/stores/table";
import { useCrazy8RenderStore } from "@/stores/crazy8Render";
import type { Crazy8Table } from "@/models/table/crazy8Table";

import Heart from "../assets/cardSuit/heart.png";
import Diamond from "../assets/cardSuit/diamond.png";
import Clover from "../assets/cardSuit/clover.png";
import Spade from "../assets/cardSuit/spade.png";

const table = useTableStore().table as Crazy8Table;
const render = useCrazy8RenderStore();

const selectSuit = (suit: string) => {
  const cardPlace = table.peekCardPlaceArr();
  cardPlace.suit = suit;
  render.renderSelectSuit = false;
  render.renderTableHelper(
    {
      card: cardPlace,
      nextSuit: suit,
    },
    table
  );
};
</script>

<template>
  <div class="flex absolute top-32 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <button @click="selectSuit('H')" class="h-10 w-10 mx-2 bg-gray-50 rounded">
      <img :src="Heart" alt="" />
    </button>
    <button @click="selectSuit('D')" class="h-10 w-10 mx-2 bg-gray-50 rounded">
      <img :src="Diamond" alt="" />
    </button>
    <button @click="selectSuit('C')" class="h-10 w-10 mx-2 bg-gray-50 rounded">
      <img :src="Clover" alt="" />
    </button>
    <button @click="selectSuit('S')" class="h-10 w-10 mx-2 bg-gray-50 rounded">
      <img :src="Spade" alt="" />
    </button>
  </div>
</template>
