<script setup lang="ts">
import type { Player } from "@/models/player/player";

defineProps<{
  player: Player;
  showBalloon: boolean;
}>();
</script>

<template>
  <div
    v-if="showBalloon"
    class="status-balloon absolute -top-1/2 left-1/2 -translate-x-1/2"
  >
    <p class="sm:text-xl text-lg font-bold mx-6">
      {{ player.gameStatus }}
    </p>
  </div>
</template>

<style scoped>
.status-balloon {
  display: inline-block;
  padding: 7px 0px;
  max-width: 100%;
  color: #030303;
  font-size: 16px;
  background: #f9f9f9;
  border-radius: 15px;
}

.status-balloon:before {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -15px;
  border: 15px solid transparent;
  border-top: 15px solid #f9f9f9;
}

.status-balloon p {
  padding: 0;
}
</style>
