<script setup lang="ts">
import { Card } from "../stores/Card";

const img = {
  "?": "https://recursionist.io/img/questionMark.png",
  H: "https://recursionist.io/img/heart.png",
  D: "https://recursionist.io/img/diamond.png",
  C: "https://recursionist.io/img/clover.png",
  S: "https://recursionist.io/img/spade.png",
};

interface Props {
  card: Card;
}
let props = defineProps<Props>();
</script>
<template>
  <div class="card bg-white mx-2 p-1 rounded">
    <div class="h-10 w-10">
      <img :src="img[props.card.suit]" />
    </div>
    <div class="cardText pt-1 text-slate-900">
      <p class="">{{ props.card.rank }}</p>
    </div>
  </div>
</template>
