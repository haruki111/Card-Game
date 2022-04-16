<script setup lang="ts">
import { useTableStore } from "@/stores/table";
const table = useTableStore();
</script>
<template>
  <div class="round flex justify-end text-white">
    <div class="roundTextWrap flex items-center flex-col">
      <h3 class="text-xl">Round</h3>
      <p>{{ table.currRound }} / {{ table.round }}</p>
    </div>
  </div>
</template>
