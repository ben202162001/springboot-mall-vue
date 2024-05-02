<!-- OrderHome.vue -->
<template>
    <div>
      <VueHome />
    </div>
    <div>
      <h1>訂單詳細信息</h1>
      <p>產品 ID: {{ productId }}</p>
    </div>
</template>

<script setup>
import VueHome from '../VueHome.vue'; 
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const productId = ref(null);
console.log("001")
onMounted(() => {
  productId.value = route.params.productId;
});
</script>

  
  <style scoped>
  </style>