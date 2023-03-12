<template>
  <li v-for="order in orders" :key="order.id">
    {{ order.id }} - {{ order.name }}
  </li>
</template>

<script lang="ts" src="./index.ts" />
