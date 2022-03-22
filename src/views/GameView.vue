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
          <div class="playerStatus text-base flex justify-between">
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
          <div class="playerStatus text-base flex justify-between">
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
          <div class="playerStatus text-base flex justify-between">
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
  <div class="action mt-5 flex justify-center">
    <button
      type="button"
      id="surrenderBtn"
      class="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      Surrender
    </button>
    <button
      type="button"
      id="standBtn"
      class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      Stand
    </button>
    <button
      type="button"
      id="hitBtn"
      class="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      Hit
    </button>
    <button
      type="button"
      id="doubleBtn"
      class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      Double
    </button>
  </div>
  <div class="round flex justify-end text-white">
    <div class="roundTextWrap flex items-center flex-col">
      <h3 class="text-xl">Round</h3>
      <p>1 / 5</p>
    </div>
  </div>
  <div class="text-center mt-5">
    <router-link to="/">homeページ</router-link>
  </div>
</template>
