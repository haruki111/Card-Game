<script setup lang="ts"></script>
<template>
  <h1 class="sm:text-3xl text-2xl font-bold text-gray-100 text-center mb-4">
    Welcome to Card Game!
  </h1>
  <form class="lg:w-1/2 md:w-2/3 mx-auto">
    <div class="mb-6">
      <label
        for="name-input"
        class="block mb-2 text-sm font-medium text-gray-100"
        >Name</label
      >
      <input
        type="text"
        id="name-input"
        placeholder="name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </div>
    <div class="mb-6">
      <label for="games" class="block mb-2 text-sm font-medium text-gray-100"
        >Game</label
      >
      <select
        id="games"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
      >
        <option>Black Jack</option>
        <option>Poker</option>
      </select>
    </div>
    <div class="mb-6">
      <label for="rounds" class="block mb-2 text-sm font-medium text-gray-100"
        >Round</label
      >
      <select
        id="rounds"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
      >
        <option>5</option>
        <option>3</option>
        <option>1</option>
      </select>
    </div>
    <div class="mb-6">
      <label for="speeds" class="block mb-2 text-sm font-medium text-gray-100"
        >Speed</label
      >
      <select
        id="speeds"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
      >
        <option>1</option>
        <option>2</option>
      </select>
    </div>

    <div class="flex justify-center items-center">
      <button
        type="button"
        class="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
      >
        Start Game
      </button>
    </div>
  </form>
</template>
