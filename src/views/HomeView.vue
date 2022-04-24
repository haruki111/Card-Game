<script setup lang="ts">
import { reactive } from "vue";
import { useTableStore } from "@/stores/table";
const table = useTableStore();

const startGame = () => {
  if (gameSettingHash.name == "") inputs.alert = true;
  else {
    table.$reset();
    table.setTable(gameSettingHash);
  }
};

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
  name: "haruki",
  game: "Turn8",
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
  alert: boolean;
  alertText: string;
  method: () => void;
} = reactive({
  text: gameSettingHash.name,
  label: "Name",
  alert: false,
  alertText: "名前を入力してください",
  method: inputName,
});

const selects: {
  selected: string | number;
  options: string[] | number[];
  label: string;
  method: () => void;
}[] = reactive([
  {
    selected: gameSettingHash.game,
    options: ["Black Jack", "Turn8"],
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
    options: [10, 5, 2, 1],
    label: "Speed",
    method: selectSpeed,
  },
]);
</script>

<template>
  <h1 class="sm:text-3xl text-2xl font-bold text-gray-100 text-center mb-4">
    Welcome to Card Game!
  </h1>
  <form class="lg:w-1/2 md:w-2/3 mx-auto">
    <div class="mb-6">
      <div class="flex items-center">
        <label
          for="name-input"
          class="block mb-2 text-sm font-medium text-gray-100"
        >
          {{ inputs.label }}
        </label>
        <div
          v-show="inputs.alert"
          id="alert-1"
          class="flex p-2 ml-2 mb-2 bg-blue-100 rounded-lg"
          role="alert"
        >
          <svg
            class="flex-shrink-0 w-5 h-5 text-blue-700"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div class="ml-3 text-sm font-medium text-blue-700">
            {{ inputs.alertText }}
          </div>
        </div>
      </div>
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
        @click="startGame"
        type="button"
        class="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
      >
        Start Game
      </button>
    </div>
  </form>
</template>
