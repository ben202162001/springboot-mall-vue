<!-- OrderHome.vue -->
<template>
  <div>
    <VueHome />
  </div>
  <div>
    <p>{{ dataLoaded ? '搜尋完成' : '未搜尋' }}</p>
    <p v-if="loading">加载中...</p>
    <div class="product-details">
      <h2>產品詳細資訊</h2>
      <div class="detail-item" v-for="(value, key) in productDetail" :key="key">
        <span class="detail-label">{{ key }}</span>
        <span class="detail-value">{{ value }}</span>
      </div>
      
      <p v-if="$store.state.user">
        <button @click="purchase">購買產品</button>
      </p>
      <p v-else>
        <a>請先登入</a>
      </p>

    </div>
  </div>
  
</template>

<script setup>
import VueHome from '../VueHome.vue'; 
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { store } from '@/store'; // 直接從 Vuex 存儲文件中導入 store
 console.log(store.state.user);

const route = useRoute();
const productId = ref(null);
const loading = ref(false); // 用於追蹤資料是否正在加載中
const dataLoaded = ref(false); // 用於追蹤資料是否已加載完成
const productDetail = ref([]); // 用於儲存從服務器返回的產品資料
const fetchData = async () => {
  try {
    loading.value = true;
    // 這裡放入你的 URL 和需要的參數
    const queryParams = new URLSearchParams({
      productId: String(productId.value), // 使用之前獲取的 productId
    });
    const url = `http://localhost:8080/ProductDetail?${queryParams.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // 在這裡處理從服務器返回的資料
    // 例如，將資料設置到 products 中
    productDetail.value = data;
    dataLoaded.value = true;
  } catch (error) {
    console.error('Error fetching product details:', error);
  } finally {
    loading.value = false;
  }
};

const purchase = async () => {
  try {
    const purchaseData = {
      phone_number: store.state.user.phoneNumber,
      product_id: productDetail.value.productId, // 使用產品詳細資訊中的產品 ID
      quantity: 1, // 假設預設購買 1 個
      total_price: productDetail.value.price, // 假設購買 1 個的價格即總價格
      buy_date: new Date().toISOString(), // 現在時間
      remark: "This is a remark."
    };

    const response = await fetch('http://localhost:8080/Purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(purchaseData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // 處理購買成功後的操作
    console.log('Purchase successful!');
     // 顯示購買成功的彈跳視窗
    alert('購買成功！');

  } catch (error) {
    console.error('Error purchasing product:', error);
  }
};


onMounted(() => {
  productId.value = route.params.productId;
  fetchData();
});

// onMounted(() => {
//   console.log('组件挂载完成');
// });

// onUpdated(() => {
//   console.log('组件更新完成');
// });

// onUnmounted(() => {
//   console.log('组件将要卸载');
// });
</script>

  
<style scoped>
.product-details {
  margin-top: 20px;
}

.detail-item {
  display: flex;
  margin-bottom: 8px;
}

.detail-label {
  flex: 1;
  font-weight: bold;
}

.detail-value {
  flex: 3;
}
</style>