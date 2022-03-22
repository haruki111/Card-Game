<script setup lang="ts">
import { reactive } from "vue";
import { RouterLink } from "vue-router";

const inputName = () => {
  gameSettingHash.name = inputs.text;
};

const selectGame = () => {
  gameSettingHash.game = String(selects[0].selected);
};
const selectRound = () => {
  gameSettingHash.round = Number(selects[1].selected);
};
const selectSpeed = () => {
  gameSettingHash.speed = Number(selects[2].selected);
};

const gameSettingHash = reactive({
  name: "",
  game: "Black Jack",
  round: 5,
  speed: 1,
}) as {
  name: string;
  game: string;
  round: number;
  speed: number;
};

const inputs: {
  text: string;
  label: string;
  method: () => void;
} = { text: gameSettingHash.name, label: "Name", method: inputName };

const selects: {
  selected: string | number;
  options: string[] | number[];
  label: string;
  method: () => void;
}[] = [
  {
    selected: gameSettingHash.game,
    options: ["Black Jack", "Poker"],
    label: "Game",
    method: selectGame,
  },
  {
    selected: gameSettingHash.round,
    options: [5, 3, 1],
    label: "Round",
    method: selectRound,
  },
  {
    selected: gameSettingHash.speed,
    options: [1, 2],
    label: "Speed",
    method: selectSpeed,
  },
];
</script>

<template>
  <h1 class="sm:text-3xl text-2xl font-bold text-gray-100 text-center mb-4">
    Welcome to Card Game!
  </h1>
  <form class="lg:w-1/2 md:w-2/3 mx-auto">
    <div class="mb-6">
      <label
        for="name-input"
        class="block mb-2 text-sm font-medium text-gray-100"
      >
        {{ inputs.label }}
      </label>
      <input
        v-model="inputs.text"
        @input="inputs.method"
        type="text"
        id="name-input"
        placeholder="name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </div>

    <div class="mb-6" v-for="(select, index) in selects" :key="index">
      <label class="block mb-2 text-sm font-medium text-gray-100">
        {{ select.label }}
      </label>
      <select
        v-model="select.selected"
        @change="select.method"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
      >
        <option
          v-for="(option, index) in select.options"
          :key="index"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <div class="flex justify-center items-center">
      <button
        type="button"
        class="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
      >
        Start Game
      </button>
    </div>
  </form>
  <div class="text-center mt-5">
    <router-link to="/game">gameページ</router-link>
  </div>
</template>
