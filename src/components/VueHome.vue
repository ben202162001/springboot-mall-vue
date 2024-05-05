<!-- App.vue -->
<template>
  <div id = "app">
    <div>
    <div class="button-container">
      <button @click="goToProductHome" class="styled-button">查詢商品</button>
      <button @click="goToAccountOrders" class="styled-button">查詢我的訂單</button>
      <button @click="goToHelloWorld" class="styled-button">管理員管理商品</button>
    </div>
    <router-view/>
  </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { store } from '@/store'; // 直接從 Vuex 存儲文件中導入 store
const router = useRouter();
let PhoneNumber = null; // 預設 PhoneNumber 為 null

// 如果 store.state.user 不為 null 且 store.state.user.phoneNumber 不為 null，則將其賦值給 PhoneNumber
if (store.state.user !== null && store.state.user.phoneNumber !== null) {
  PhoneNumber = store.state.user.phoneNumber;
}
const goToProductHome = () => {
  router.push({ name: 'ProductHome' });
};
const goToAccountOrders = () => {
  if (store.state.user == null || store.state.user.phoneNumber == null) {
  alert('請先登入');
}else{
  router.push({ name: 'AccountOrders', params: { PhoneNumber: PhoneNumber } });}
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
