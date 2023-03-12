<template>
  <div className="flex row justify-center items-center mt-4 w-full">
    <router-link to="/orders">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Orders
      </button>
    </router-link>
    <router-link to="user/orders" className="ml-4">
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        User Orders
      </button>
    </router-link>
  </div>
</template>

<script lang="ts" src="./index.ts" />
