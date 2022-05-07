<script setup lang="ts">
import { useTableStore } from "@/stores/table";
import type { Table } from "@/models/table/table";

const table = useTableStore().table as Table;
</script>
<template>
  <div class="round flex justify-end text-white">
    <div class="roundTextWrap flex items-center flex-col">
      <h3 class="text-xl">Round</h3>
      <p>{{ table.currRound }} / {{ table.round }}</p>
    </div>
  </div>
</template>
