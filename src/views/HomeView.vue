<script setup lang="ts">
import { reactive, computed } from "vue";
import { useTableStore } from "@/stores/table";
import { useSpeechStore } from "@/stores/speech";
import alert from "@/components/alert.vue";

// ブラウザバックを無効化
addEventListener("popstate", () => {
  history.pushState(null, "", null);
});

const table = useTableStore();
const speech = useSpeechStore();

const startGame = () => {
  if (gameSettingHash.name != "" && gameSettingHash.game != "") {
    table.$reset();
    table.setTable(gameSettingHash);
    speechSynthesis.onvoiceschanged = () => {
      speech.appendVoices();
    };
  }

  if (gameSettingHash.name == "") inputs.alert = true;
  if (gameSettingHash.game == "") gamesHash.alert = true;
};

const inputName = () => {
  if (inputs.alert) {
    inputs.alert = false;
  }
  gameSettingHash.name = inputs.text;
};

const selectBJ = () => {
  if (gamesHash.alert) {
    gamesHash.alert = false;
  }
  gameSettingHash.game = "Black Jack";
  gamesHash.games[0].state = true;
  gamesHash.games[1].state = false;
};

const selectCrazy8 = () => {
  if (gamesHash.alert) {
    gamesHash.alert = false;
  }
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
  gameSettingHash.round = Number(selects[0].selected);
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
  <h1 class="sm:text-4xl text-2xl font-bold text-gray-100 text-center mb-4">
    Welcome to Card Game!
  </h1>
  <form class="lg:w-1/2 w-full mx-auto">
    <div class="md:mb-8 sm:mb-6 mb-4">
      <div class="flex items-center h-10 mb-2">
        <label
          for="name-input"
          class="block sm:text-xl text-lg font-medium text-gray-100"
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
        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </div>

    <div
      class="md:mb-8 sm:mb-6 mb-4"
      v-for="(select, index) in selects"
      :key="index"
    >
      <label
        class="block h-10 mb-2 sm:text-xl text-lg font-medium text-gray-100"
      >
        {{ select.label }}
      </label>
      <select
        v-model="select.selected"
        @change="select.method"
        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
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

    <div class="md:mb-8 sm:mb-6 mb-4">
      <div class="flex items-center h-10 mb-2">
        <label class="block sm:text-xl text-lg font-medium text-gray-100"
          >Game</label
        >
        <alert :isAlert="gamesHash.alert" :text="gamesHash.alertText" />
      </div>
      <div class="sm:flex flex-none justify-around">
        <div
          v-for="(game, index) of gamesHash.games"
          :key="index"
          :class="game.class"
          @click="game.event"
          class="flex items-center justify-center sm:w-2/5 sm:mb-0 mb-4 bg-white rounded-lg border-4 shadow-md"
        >
          <div class="sm:p-5 p-2 text-center">
            <h5
              class="sm:text-2xl text-xl font-bold tracking-tight text-gray-900"
            >
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
        class="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 rounded-full text-lg font-bold px-5 py-2.5 text-center"
      >
        Start Game
      </button>
    </div>
  </form>
</template>
