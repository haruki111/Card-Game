<script setup lang="ts"></script>
<template>
  <div>
    <div id="houseCardWrap" class="text-center">
      <div id="houseInfo" class="text-gray-100 pb-2">
        <p class="playerName sm:text-3xl text-2xl font-bold mb-2">Dealer</p>
        <div class="playerStatus text-base">
          <p>S:<span id="playerGameStatus">waitingForBets</span></p>
        </div>
      </div>
      <div id="playerScore" class="pb-2">
        <span
          class="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
          >50
        </span>
      </div>
      <div id="houseCards" class="flex justify-center pb-2">
        <div class="card bg-white mx-2 p-1 rounded">
          <div class="h-10 w-10">
            <img src="../assets/cardSuit/clover.png" />
          </div>
          <div class="cardText pt-1 text-slate-900">
            <p class="">10</p>
          </div>
        </div>
        <div class="card bg-white mx-2 p-1 rounded">
          <div class="h-10 w-10">
            <img src="../assets/cardSuit/clover.png" />
          </div>
          <div class="cardText pt-1 text-slate-900">
            <p class="">10</p>
          </div>
        </div>
      </div>
    </div>
    <div id="playersWrap" class="flex justify-around">
      <div id="player" class="text-center">
        <div id="playerInfo" class="text-gray-100">
          <p class="playerName sm:text-3xl text-2xl font-bold mb-2">player1</p>
          <div class="playerStatus text-base">
            <p>S:<span id="playerGameStatus">Bet</span></p>
            <p>B:0</p>
            <p>C:400</p>
          </div>
        </div>
        <div id="playerScore" class="pb-2">
          <span
            class="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
            >50
          </span>
        </div>
        <div id="playerCards" class="flex justify-center pb-2">
          <div class="card bg-white mx-2 p-1 rounded">
            <div class="h-10 w-10">
              <img src="../assets/cardSuit/clover.png" />
            </div>
            <div class="cardText pt-1 text-slate-900">
              <p class="">10</p>
            </div>
          </div>
          <div class="card bg-white mx-2 p-1 rounded">
            <div class="h-10 w-10">
              <img src="../assets/cardSuit/clover.png" />
            </div>
            <div class="cardText pt-1 text-slate-900">
              <p class="">10</p>
            </div>
          </div>
        </div>
      </div>
      <div id="player" class="text-center mt-24">
        <div id="playerInfo" class="text-gray-100">
          <p class="playerName sm:text-3xl text-2xl font-bold mb-2">player2</p>
          <div class="playerStatus text-base">
            <p>S:<span id="playerGameStatus">Bet</span></p>
            <p>B:0</p>
            <p>C:400</p>
          </div>
        </div>
        <div id="playerScore" class="pb-2">
          <span
            class="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
            >50
          </span>
        </div>
        <div id="playerCards" class="flex justify-center pb-2">
          <div class="card bg-white mx-2 p-1 rounded">
            <div class="h-10 w-10">
              <img src="../assets/cardSuit/clover.png" />
            </div>
            <div class="cardText pt-1 text-slate-900">
              <p class="">10</p>
            </div>
          </div>
          <div class="card bg-white mx-2 p-1 rounded">
            <div class="h-10 w-10">
              <img src="../assets/cardSuit/clover.png" />
            </div>
            <div class="cardText pt-1 text-slate-900">
              <p class="">10</p>
            </div>
          </div>
        </div>
      </div>
      <div id="player" class="text-center">
        <div id="playerInfo" class="text-gray-100">
          <p class="playerName sm:text-3xl text-2xl font-bold mb-2">player3</p>
          <div class="playerStatus text-base">
            <p>S:<span id="playerGameStatus">Bet</span></p>
            <p>B:0</p>
            <p>C:400</p>
          </div>
        </div>
        <div id="playerScore" class="pb-2">
          <span
            class="bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full"
            >50
          </span>
        </div>
        <div id="playerCards" class="flex justify-center pb-2">
          <div class="card bg-white mx-2 p-1 rounded">
            <div class="h-10 w-10">
              <img src="../assets/cardSuit/clover.png" />
            </div>
            <div class="cardText pt-1 text-slate-900">
              <p class="">10</p>
            </div>
          </div>
          <div class="card bg-white mx-2 p-1 rounded">
            <div class="h-10 w-10">
              <img src="../assets/cardSuit/clover.png" />
            </div>
            <div class="cardText pt-1 text-slate-900">
              <p class="">10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="text-center mt-5">
    <router-link to="/">homeページ</router-link>
  </div>
</template>
