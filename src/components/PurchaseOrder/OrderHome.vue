<!-- OrderHome.vue -->
<template>
  <div>
    <VueHome />
  </div>
  <div class="centered-content">
    <div>
      <p v-if="loading">加载中...</p>
      <div class="product-details">
        <h2>產品詳細資訊</h2>
        <div class="detail-item" v-for="(value, key) in productDetail" :key="key">
          <span class="detail-label"> {{ key }}</span>
          <span class="detail-value">:{{ value }}</span>
        </div>
        <div>------------------------------------------------------------------------------------------------------------</div>
        <h2>產品資訊</h2>
        <div class="detail-item" v-for="(value, key) in product" :key="key">
          <span class="detail-label"> {{ key }}</span>
          <span class="detail-value">:{{ value }}</span>
        </div>
        <div>------------------------------------------------------------------------------------------------------------</div>

        <div v-if="$store.state.user">
          <h3>購買數量<input type="number" id="quantity" v-model="quantity"></h3>
          <h3>單價 {{product.price}}</h3>
          <h3>總價 {{product.price*quantity}}</h3>
          <div class="button-container">
            <h3><button class="custom-button" @click="purchase">下單!</button></h3>
          </div>
        </div>
        <div v-else>
          尚未登入，請先<button class="custom-button" @click="goToLogin">登入</button>
        </div>
        

        <div v-if="ispurchase">
          <div v-if="responseData.massageStatus === 'success'">
            <p>購買成功！</p>
            <p>massageStatus: {{ responseData.massageStatus }}</p>
            <p>Error Time: {{ responseData.errorTime }}</p>
            <p>{{ responseData.massage }}</p>
            <button @click="goToMyOrder" >查看訂單</button>
            
          </div>
          <div v-else>
            <p>購買失敗！</p>
            <p>massageStatus: {{ responseData.massageStatus }}</p>
            <p>Error Time: {{ responseData.errorTime }}</p>
            <p>{{ responseData.massage }}</p>
          </div>
        </div>
        <div class="button-container">
          <button class="custom-button" @click="goBack">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueHome from '../VueHome.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { store } from '@/store'; // 直接從 Vuex 存儲文件中導入 store
import { useRouter } from 'vue-router';

const quantity = ref(1);
const productId = ref(null);
const loading = ref(false); // 用於追蹤資料是否正在加載中
const productDetail = ref({}); // 用於儲存從服務器返回的產品資料細項
const product = ref({}); // 用於儲存從服務器返回的產品資料
const ispurchase = ref(false); // 用於追蹤資料是否已加載完成
const responseData = ref({});
const fetchData = async () => {
  try {
    loading.value = true;


    //取商品的詳細資料
    const queryParams_productDetail = new URLSearchParams({
      productId: String(productId.value), // 使用之前獲取的 productId
    });
    const url_productDetail = `http://localhost:8080/ProductDetail?${queryParams_productDetail.toString()}`;
    const response_productDetail = await fetch(url_productDetail);
    if (!response_productDetail.ok) {
      throw new Error('Network response_productDetail was not ok');
    }
    productDetail.value = await response_productDetail.json();
  
    //取商品的資料
    const queryParams_product = new URLSearchParams({
      productId: String(productId.value), // 使用之前獲取的 productId
    });
    const url_product = `http://localhost:8080/Product?${queryParams_product.toString()}`;
    const response_product = await fetch(url_product);
    if (!response_product.ok) {
      throw new Error('Network response_product was not ok');
    }
    product.value = await response_product.json();

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
      quantity: quantity.value, // 購買數量
      total_price: product.value.price * quantity.value, // 計算總價格
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

    // 解析 JSON 数据
    responseData.value = await response.json();

    // 访问 JSON 数据中的属性
    console.log(responseData.value);
    // 處理購買成功後的操作
    console.log('Purchase successful!');
    ispurchase.value = true;
  } catch (error) {
    console.error('Error purchasing product:', error);
  }
};

const router = useRouter();

const goToLogin = () => {
  router.push({ name: 'Login' });
};
const goBack = () => {
  router.go(-1);
};
const goToMyOrder = () => {
  router.push({ name: 'AccountOrders', params: { PhoneNumber: store.state.user.phoneNumber } });
};

const route = useRoute();
onMounted(() => {
  productId.value = route.params.productId;
  fetchData();
});
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

.centered-content {
  display: flex;
  justify-content: center;
  /* 水平居中 */
  height: 100vh;
  /* 设置高度以铺满整个视口 */
}

.button-container {
  display: flex;
  justify-content: center;
}

.custom-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.custom-button:hover {
  background-color: #45a049;
}
</style>
