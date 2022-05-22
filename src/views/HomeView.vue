<script setup lang="ts">
import { reactive, computed } from "vue";
import { useTableStore } from "@/stores/table";
import { useSpeechStore } from "@/stores/speech";
import alert from "@/components/alert.vue";

const table = useTableStore();
const speech = useSpeechStore();

speechSynthesis.onvoiceschanged = () => {
  speech.appendVoices();
};

const startGame = () => {
  if (gameSettingHash.name == "") inputs.alert = true;
  if (gameSettingHash.game == "") gamesHash.alert = true;
  else {
    table.$reset();
    table.setTable(gameSettingHash);
  }
};

const inputName = () => {
  gameSettingHash.name = inputs.text;
};

const selectBJ = () => {
  gameSettingHash.game = "Black Jack";
  gamesHash.games[0].state = true;
  gamesHash.games[1].state = false;
};

const selectCrazy8 = () => {
  gameSettingHash.game = "Crazy8";
  gamesHash.games[1].state = true;
  gamesHash.games[0].state = false;
};

const selectBJColor = computed(() => {
  if (gamesHash.games[0].state) {
    return "border-blue-400";
  }
  return "border-gray-50";
});

const selectCrazy8Color = computed(() => {
  if (gamesHash.games[1].state) {
    return "border-blue-400";
  }
  return "border-gray-50";
});

const selectRound = () => {
  gameSettingHash.round = Number(selects[1].selected);
};

const gameSettingHash: {
  name: string;
  game: string;
  round: number;
} = reactive({
  name: "You",
  game: "",
  round: 5,
});

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

const gamesHash = reactive({
  games: [
    { class: selectBJColor, name: "Black Jack", event: selectBJ, state: false },
    {
      class: selectCrazy8Color,
      name: "Crazy8",
      event: selectCrazy8,
      state: false,
    },
  ],
  alert: false,
  alertText: "ゲームを選択してください",
});

const selects: {
  selected: string | number;
  options: string[] | number[];
  label: string;
  method: () => void;
}[] = reactive([
  {
    selected: gameSettingHash.round,
    options: [5, 3, 1],
    label: "Round",
    method: selectRound,
  },
]);
</script>

<template>
  <h1 class="sm:text-3xl text-2xl font-bold text-gray-100 text-center mb-4">
    Welcome to Card Game!
  </h1>
  <form class="lg:w-1/2 md:w-2/3 mx-auto">
    <div class="mb-8">
      <div class="flex items-center">
        <label
          for="name-input"
          class="block mb-2 text-sm font-medium text-gray-100"
        >
          {{ inputs.label }}
        </label>
        <alert :isAlert="inputs.alert" :text="inputs.alertText" />
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

    <div class="mb-8" v-for="(select, index) in selects" :key="index">
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

    <div class="mb-8">
      <label class="block mb-2 text-sm font-medium text-gray-100">Game</label>
      <alert :isAlert="gamesHash.alert" :text="gamesHash.alertText" />

      <div class="sm:flex flex-none justify-around">
        <div
          v-for="(game, index) of gamesHash.games"
          :key="index"
          :class="game.class"
          @click="game.event"
          class="sm:w-2/5 sm:mb-0 mb-4 bg-white rounded-lg border-4 shadow-md"
        >
          <div class="p-5 text-center">
            <h5 class="text-2xl font-bold tracking-tight text-gray-900">
              {{ game.name }}
            </h5>
          </div>
        </div>
      </div>
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
