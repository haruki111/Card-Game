<script setup lang="ts">
import { useTableStore } from "@/stores/table";
import type { Table } from "@/models/table/table";

const table = useTableStore().table as Table;
</script>
<template>
  <div class="text-white">
    <div class="sm:text-2xl text-xl roundTextWrap flex items-center flex-col">
      <h3>Round</h3>
      <p>{{ table.currRound }} / {{ table.round }}</p>
    </div>
  </div>
</template>
