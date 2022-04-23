<script setup lang="ts">
import { useTableStore } from "@/stores/table";
import { useRenderStore } from "@/stores/render";
import type { BlackJackTable } from "@/models/table/blackjackTable";

const table = useTableStore().table as BlackJackTable;
const render = useRenderStore();

const tableHeads: string[] = ["name", "result", "action", "won"];
const players = table.players;

const conversionGradesEng = (grades: number[]): string => {
  const newestGrade = grades[grades.length - 1];
  if (newestGrade == 1) return "win";
  else if (newestGrade == 0) return "draw";
  return "lose";
};

const resultOk = (): void => {
  render.renderResult = false;
  table.nextTurn();
  render.renderTable();
};
</script>

<template>
  <div class="fixed z-10 inset-0">
    <div class="flex items-center justify-center min-h-screen">
      <div
        class="w-1/2 m-auto relative overflow-x-auto shadow-md sm:rounded-lg"
      >
        <div class="py-2 text-center bg-white">
          <h3 class="text-2xl font-bold">Round {{ table.currRound }}</h3>
        </div>
        <table class="w-full text-sm text-center text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th
                v-for="(tableHead, index) in tableHeads"
                :key="index"
                scope="col"
                class="px-6 py-3"
              >
                {{ tableHead }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(player, index) in players"
              :key="index"
              class="bg-white border-b"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {{ player.name }}
              </th>
              <td class="px-6 py-4">
                {{ conversionGradesEng(player.grades) }}
              </td>
              <td class="px-6 py-4">{{ player.gameStatus }}</td>
              <td class="px-6 py-4">{{ player.winAmount }}</td>
            </tr>
          </tbody>
        </table>

        <div class="flex justify-center items-center py-2 bg-white">
          <button
            @click="resultOk"
            type="button"
            class="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
