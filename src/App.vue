<!-- App.vue -->
<template>
  <div id = "app">
    <TopHeader />
    <router-view/>
  </div>
</template>

<script setup>
import TopHeader from './components/TopHeader.vue';
</script>
<style scoped>
</style>
