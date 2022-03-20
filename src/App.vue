<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div id="app" class="h-screen flex items-center">
    <main class="container mx-auto px-5 sm:py-12 py-4">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  background-color: #059669;
}
</style>
