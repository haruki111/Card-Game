<script setup lang="ts">
import { RouterView } from "vue-router";
import router from "./router";
import { ref, computed } from "vue";

let path = ref("");
const justifyClass = computed(() => {
  if (path.value === "/BlackJack") {
    return "lg:justify-start justify-center";
  }
  return "justify-center";
});

router.afterEach((to) => {
  path.value = to.path;
});
</script>

<template>
  <div id="app">
    <main
      :class="justifyClass"
      class="container h-screen relative mx-auto flex flex-col px-5 xl:py-12 py-4"
    >
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  background-color: #059669;
}
</style>
