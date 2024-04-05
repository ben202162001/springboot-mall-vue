<!-- App.vue -->
<template>
  <div id = "app">
    <TopHeader />
    <div>
    <div class="button-container">
      <button @click="goToProductHome" class="styled-button">查詢商品</button>
      <button @click="goToHelloWorld" class="styled-button">HelloWorld</button>
    </div>
    <router-view/>
  </div>
  </div>
</template>

<script setup>
import TopHeader from './components/TopHeader.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const goToProductHome = () => {
  router.push({ name: 'ProductHome' });
};
const goToHelloWorld = () => {
  router.push({ name: 'HelloWorld' });
};

</script>
<style scoped>
.button-container {
  background-color: #2c3e50; /* Background color of the header block */
  padding: 10px 0; /* Add padding to space out buttons */
  text-align: left; /* Center-align buttons */
}

.styled-button {
  background-color: #3498db; /* Button background color */
  color: #fff; /* Button text color */
  border: none; /* Remove button border */
  padding: 10px 20px; /* Add padding to buttons */
  margin: 0 10px; /* Add margin to space out buttons */
  border-radius: 5px; /* Add border radius for rounded corners */
  cursor: pointer; /* Add cursor pointer on hover */
  transition: background-color 0.3s ease; /* Smooth transition on hover */
}

.styled-button:hover {
  background-color: #2980b9; /* Darker background color on hover */
}
</style>
