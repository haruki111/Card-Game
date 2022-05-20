<script setup lang="ts">
import { useTableStore } from "@/stores/table";
import { useCrazy8RenderStore } from "@/stores/crazy8Render";
import { Card } from "@/stores/card";
import type { Crazy8Table } from "@/models/table/crazy8Table";

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
      <img :src="new Card('H', '').getImg()" alt="" />
    </button>
    <button @click="selectSuit('D')" class="h-10 w-10 mx-2 bg-gray-50 rounded">
      <img :src="new Card('D', '').getImg()" alt="" />
    </button>
    <button @click="selectSuit('C')" class="h-10 w-10 mx-2 bg-gray-50 rounded">
      <img :src="new Card('C', '').getImg()" alt="" />
    </button>
    <button @click="selectSuit('S')" class="h-10 w-10 mx-2 bg-gray-50 rounded">
      <img :src="new Card('S', '').getImg()" alt="" />
    </button>
  </div>
</template>
