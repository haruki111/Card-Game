<script setup lang="ts">
import { computed } from "vue";
import type { Card } from "@/models/card";

let props = defineProps<{
  card: Card;
  isHide: boolean;
  isShadow: boolean;
  rotate: {
    isRotate: boolean;
    class: string;
  };
}>();

const rotateCard = (rotate: { isRotate: boolean; class: string }) => {
  if (rotate.isRotate == true && rotate.class == "-rotate-90") {
    return "flex justify-around items-center h-12 w-16 my-2";
  } else if (rotate.isRotate == true && rotate.class == "rotate-90") {
    return "flex flex-row-reverse justify-around items-center h-12 w-16 my-2";
  }
  return "sm:h-16 sm:w-12 h-10 w-8 sm:mx-2 mx-1";
};

const rotateImg = (isRotate: boolean) => {
  if (isRotate == true) return "my-auto";
  else return "mx-auto";
};

const shadowCard = computed(() => {
  if (props.isShadow) {
    return "bg-gray-400";
  }
  return "";
});
</script>
<template>
  <transition
    mode="out-in"
    tag="div"
    name="card-reverse"
    :class="[rotateCard(rotate), shadowCard]"
    class="card bg-white p-1 rounded border border-gray-500 shadow-md"
  >
    <div key="hide" v-if="isHide == true">
      <div class="bg-red-600 h-full w-full rounded"></div>
    </div>

    <div key="show" v-else>
      <div :class="rotateImg(rotate.isRotate)" class="sm:h-8 sm:w-8 h-4 w-4">
        <img :src="props.card.getImg()" :class="rotate.class" />
      </div>
      <div class="cardText pt-1 text-slate-900">
        <p :class="rotate.class" class="sm:text-base text-xs text-center">
          {{ props.card.rank }}
        </p>
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
