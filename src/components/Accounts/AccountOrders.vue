<!-- AccountOrders.vue -->
<template>
  <div>
    <VueHome />
    <div v-if="loading">載入中...</div>
    <div v-else>
      <h2>會員訂單資料</h2>
      <div v-for="order in orders" :key="order.buy_date" class="order-container">
  <div class="order-details">
    <p><strong>訂單日期:</strong> {{ order.buy_date }}</p>
    <p><strong>商品編號:</strong> {{ order.product_id }}</p>
    <p><strong>數量:</strong> {{ order.quantity }}</p>
    <p><strong>總價:</strong> {{ order.total_price }}</p>
    <p><strong>備註:</strong> {{ order.remark }}</p>
  </div>
  <hr class="order-divider">
</div>
    </div>
  </div>
</template>

<script setup>
import VueHome from '../VueHome.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // 導入 useRoute 從 vue-router

const loading = ref(true);
const orders = ref([]);
const route = useRoute(); // 使用 useRoute 來取得 $route

onMounted(async () => {
  try {
    const phoneNumber = route.params.PhoneNumber; // 會員的電話號碼
    const response = await fetch(`http://localhost:8080/members/${phoneNumber}/orders`);
    const data = await response.json();
    orders.value = data.orders;
  } catch (error) {
    console.error('無法取得會員訂單資料:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.order-container {
  margin-bottom: 20px;
}

.order-details {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}

.order-details p {
  margin: 5px 0;
}

.order-details p strong {
  font-weight: bold;
}

.order-divider {
  margin-top: 10px;
}
</style>