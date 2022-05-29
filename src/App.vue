<script setup lang="ts">
import { RouterView } from "vue-router";
import router from "./router";
import { ref, computed } from "vue";

let path = ref("");

const setFillHeight = () => {
  const vh = innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

// 画面のサイズ変動があった時に高さを再計算する
addEventListener("resize", setFillHeight);

// 初期化
setFillHeight();

const justifyClass = computed(() => {
  if (path.value === "/BlackJack") {
    return "lg:justify-start justify-center";
  }
  return "justify-center";
});

router.afterEach((to) => {
  path.value = to.path;
});

onload = () => {
  let perfEntries = performance.getEntriesByType("navigation");
  perfEntries.forEach(function (pe) {
    if (pe.type === "reload") {
      router.push("/");
    }
  });
};
</script>

<template>
  <div id="app">
    <main
      :class="justifyClass"
      class="hero-header container relative mx-auto flex flex-col px-5 xl:py-12 py-4"
    >
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  background-color: #059669;
}

.hero-header {
  min-height: 100vh; /* Fallback */
  min-height: calc(var(--vh, 1vh) * 100);
}
</style>
