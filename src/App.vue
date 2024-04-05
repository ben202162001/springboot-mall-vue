<!-- App.vue -->
<template>
  <div id = "app">
    <TopHeader />
    <div>
    <button @click="goToProductHome">查詢商品</button>
    <button @click="goToHelloWorld">HelloWorld</button>
    <!-- <router-link :to="{ name: 'ProductHome' }">Go to Product Home</router-link> -->
    <router-view/>
  </div>
  </div>
</template>

<script setup>
console.log("這裡是App.vue")
import TopHeader from './components/TopHeader.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const goToProductHome = () => {
  console.log("goToProductHome")
  router.push({ name: 'ProductHome' });
  console.log("goToProductHome End")
  // 或者使用 $router.push
  // $router.push({ name: 'ProductHome' });
};
const goToHelloWorld = () => {
  console.log("goToHelloWorld")
  router.push({ name: 'HelloWorld' });
};

</script>

<style scoped>
</style>
