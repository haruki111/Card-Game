<script setup lang="ts">
import { useTableStore } from "@/stores/table";
import { useBlackJackRenderStore } from "@/stores/blackJackRender";
import { useRouter } from "vue-router";
import type { BlackJackTable } from "@/models/table/blackjackTable";

const table = useTableStore().table as BlackJackTable;
const render = useBlackJackRenderStore();
const router = useRouter();

const players = table.players;

const tableHeadsRound = (): string[] => {
  const tableHeads: string[] = ["name"];
  for (let i = 0; i < table.currRound; i++) {
    tableHeads.push("Round" + Number(i + 1));
  }
  return tableHeads;
};

const toContinue = (): void => {
  render.renderEndResult = false;
  table.formatTable();
  table.formatPlayer();
  render.renderTable(table);
};

const toHome = (): void => {
  render.renderEndResult = false;
  table.deck.resetDeck();
  useTableStore().$reset();
  router.push("/");
};
</script>

<template>
  <div class="fixed z-10 inset-0">
    <div class="flex items-center justify-center min-h-screen">
      <div
        class="w-1/2 m-auto relative overflow-x-auto shadow-md sm:rounded-lg"
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
              <td
                v-for="round in table.currRound"
                :key="round"
                class="px-6 py-4"
              >
                {{ table.resultsLog[round - 1].result[index].chips }}
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
