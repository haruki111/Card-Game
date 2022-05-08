<script setup lang="ts">
import { useTableStore } from "@/stores/table";
import { useCrazy8RenderStore } from "@/stores/crazy8Render";
import { Card } from "@/stores/card";
import type { Crazy8Table } from "@/models/table/crazy8Table";
import Crazy8Player from "../components/Crazy8Player.vue";
import GameRound from "@/components/GameRound.vue";
import GameCard from "@/components/GameCard.vue";
import Crazy8EndResult from "@/components/results/Crazy8EndResult.vue";

const table = useTableStore().table as Crazy8Table;
const render = useCrazy8RenderStore();

const draw = () => {
  const player = table.getTurnPlayer();
  if (render.renderAction == true && player.type == "user") {
    const drawCard: Card = table.deck.drawOne();
    player.hand.push(drawCard);
  }
};

const selectSuit = (suit: string) => {
  const cardPlace = table.cardPlaceArr[table.cardPlaceArr.length - 1];
  cardPlace.suit = suit;
  render.renderSelectSuit = false;
  render.renderTableUserHelper(
    {
      card: cardPlace,
      nextSuit: suit,
    },
    table
  );
};

const stackDeckStyle = (index: number) => {
  if (index == 0) return "ml-12";
  return "-ml-12";
};

render.renderTable(table);
</script>
<template>
  <div
    id="playersWrap"
    class="flex justify-between flex-col w-4/5 m-auto z-10"
    style="height: 70vh"
  >
    <Crazy8Player :index="0" class="h-1/4" />
    <div class="flex justify-between items-center h-2/3">
      <Crazy8Player :index="3" class="flex items-center justify-around w-1/5" />
      <!-- コンポーネント化 -->
      <div class="flex relative">
        <div
          v-if="render.renderSelectSuit"
          class="flex absolute top-32 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <button
            @click="selectSuit('H')"
            class="h-10 w-10 mx-2 bg-gray-50 rounded"
          >
            <img :src="new Card('H', '').getImg()" alt="" />
          </button>
          <button
            @click="selectSuit('D')"
            class="h-10 w-10 mx-2 bg-gray-50 rounded"
          >
            <img :src="new Card('D', '').getImg()" alt="" />
          </button>
          <button
            @click="selectSuit('C')"
            class="h-10 w-10 mx-2 bg-gray-50 rounded"
          >
            <img :src="new Card('C', '').getImg()" alt="" />
          </button>
          <button
            @click="selectSuit('S')"
            class="h-10 w-10 mx-2 bg-gray-50 rounded"
          >
            <img :src="new Card('S', '').getImg()" alt="" />
          </button>
        </div>
        <GameCard
          v-if="table.cardPlaceArr.length != 0"
          :card="table.cardPlaceArr[table.cardPlaceArr.length - 1]"
          :isHide="false"
          :rotate="{ isRotate: false, class: '' }"
        />
        <TransitionGroup
          name="deck"
          tag="div"
          v-if="table.deck.deck.length != 0"
          class="flex"
        >
          <GameCard
            v-for="(card, index) of table.deck.deck"
            :key="index"
            @click="draw()"
            :card="card"
            :isHide="true"
            :rotate="{ isRotate: false, class: '' }"
            :class="stackDeckStyle(index)"
            class="mx-0"
          />
        </TransitionGroup>
      </div>

      <Crazy8Player
        :index="1"
        class="flex items-center flex-row-reverse justify-around w-1/5"
      />
    </div>
    <Crazy8Player :index="2" class="h-1/4" />
  </div>

  <GameRound />
  <div>{{ table.gamePhase }}</div>

  <Transition name="fade">
    <Crazy8EndResult v-if="render.renderEndResult == true" />
  </Transition>

  <!-- temp TODO デザイン -->
  <button
    v-if="
      render.renderAction == true &&
      table.deck.deck.length == 0 &&
      table.getTurnPlayer().type === 'user'
    "
    @click="
      render.renderAction = false;
      render.renderTableUserHelper('path', table);
    "
  >
    path
  </button>
  <!-- ↑ -->
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.deck-move,
.deck-enter-active,
.deck-leave-active {
  transition: all 0.5s ease;
}
.deck-enter-from,
.deck-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.deck-leave-active {
  position: absolute;
}
</style>
