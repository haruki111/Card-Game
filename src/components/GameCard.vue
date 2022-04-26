<script setup lang="ts">
import type { Card } from "../stores/card";

let props = defineProps<{
  card: Card;
  isHide: boolean;
}>();
</script>
<template>
  <transition
    mode="out-in"
    tag="div"
    name="card-reverse"
    class="card bg-white h-16 w-12 mx-2 p-1 rounded border border-gray-500 shadow-md"
  >
    <div key="hide" v-if="isHide == true">
      <div class="bg-red-600 h-full w-full rounded"></div>
    </div>

    <div key="show" v-else>
      <div class="h-8 w-8 m-auto">
        <img :src="props.card.getImg()" />
      </div>
      <div class="cardText pt-1 text-slate-900">
        <p class="text-center">{{ props.card.rank }}</p>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.card-reverse-enter-active {
  animation: move 0.3s;
}
.card-reverse-leave-active {
  animation: move 0.3s reverse;
}

@keyframes move {
  0% {
    opacity: 0;
    transform: rotateY(90deg);
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
}
</style>
