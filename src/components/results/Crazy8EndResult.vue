<script setup lang="ts">
import { useTableStore } from "@/stores/table";
import { useCrazy8RenderStore } from "@/stores/crazy8Render";
import { useRouter } from "vue-router";
import type { Crazy8Table } from "@/models/table/crazy8Table";
import type { Player } from "@/models/player/player";

const table = useTableStore().table as Crazy8Table;
const render = useCrazy8RenderStore();
const router = useRouter();

const players = table.players;
let sortPlayers: Player[];

const tableHeadsRound = (): string[] => {
  const tableHeads: string[] = ["name", "score"];
  return tableHeads;
};

const toContinue = (): void => {
  render.renderEndResult = false;
  table.formatTable();
  table.formatPlayer();
  render.renderTableHelper(null, table);
};

const toHome = (): void => {
  render.renderEndResult = false;
  useTableStore().$reset();
  router.push("/");
};

const sortRankPlayers = (players: Player[]) => {
  sortPlayers = Array.from(players).sort(function (a, b) {
    if (a.chips > b.chips) return -1;
    if (a.chips < b.chips) return 1;
    return 0;
  });
  return sortPlayers;
};

const rankAndName = (index: number, player: Player): string => {
  for (let i = 0; i < index + 1; i++) {
    if (sortPlayers[i].chips == player.chips && sortPlayers[i] != player) {
      index--;
    }
  }

  let arr = ["st", "nd", "rd", "th"];
  return index + 1 + arr[index] + "   " + player.name;
};
</script>

<template>
  <div class="fixed z-10 inset-0">
    <div class="flex items-center justify-center min-h-screen">
      <div
        class="min-w-[50%] m-auto relative overflow-x-auto shadow-md sm:rounded-lg"
      >
        <div class="py-2 text-center bg-white">
          <h3 class="text-2xl font-bold">Result</h3>
        </div>
        <table class="w-full text-sm text-center text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th
                v-for="(tableHead, index) in tableHeadsRound()"
                :key="index"
                scope="col"
                class="xl:px-6 px-4 py-3"
              >
                {{ tableHead }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(player, index) in sortRankPlayers(players)"
              :key="index"
              class="bg-white border-b"
            >
              <th
                scope="row"
                class="xl:px-6 px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {{ rankAndName(index, player) }}
              </th>
              <td class="xl:px-6 px-4 py-4">
                {{ player.chips }}
              </td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-center items-center py-2 bg-white">
          <button
            @click="toContinue()"
            type="button"
            class="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm mx-2 px-5 py-2.5"
          >
            Continue
          </button>
          <button
            @click="toHome()"
            type="button"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm mx-2 px-5 py-2.5"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
