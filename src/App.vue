<template>
  
  <div>
    

    <form @submit.prevent="fetchData">
      <label for="limit">Limit:</label>
      <input type="number" id="limit" v-model="limit">
      
      <label for="offset">Offset:</label>
      <input type="number" id="offset" v-model="offset">
      
      <label for="category">Category:</label>
      <input type="text" id="category" v-model="category">
      
      <label for="lowPrice">Low Price:</label>
      <input type="number" id="lowPrice" v-model="lowPrice">
      
      <label for="highPrice">High Price:</label>
      <input type="number" id="highPrice" v-model="highPrice">
      
      <label for="sort">Sort:</label>
      <select id="sort" v-model="sort">
        <option value="">--</option>
        <option value="price">Price Ascending</option>
        <option value="-price">Price Descending</option>
        <!-- Add more options for sorting if needed -->
      </select>
      
      <button type="submit">Fetch Data</button>
    </form>
    <p v-if="!dataLoaded && !loading">點擊按鈕以取得產品數據</p>
    <button @click="fetchData">取得產品數據</button> <!-- 点击按钮触发 fetchData 方法 -->

    <p v-if="loading">加载中...</p>
    <div v-if="dataLoaded">
        <table class="product-table">
          <thead>
            <tr>
              <th>產品名稱</th>
              <th>分類</th>
              <th>價格</th>
              <th>庫存</th>
              <th>描述</th>
              <th>創建日期</th>
              <th>最後修改日期</th>
              <th>圖片 URL</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products.value.results" :key="product.product_id" class="product-item">
              <td>{{ product.product_name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.stock }}</td>
              <td>{{ product.description }}</td>
              <td>{{ formatDate(product.created_date) }}</td>
              <td>{{ formatDate(product.last_modified_date) }}</td>
              <td>{{ product.image_url }}</td>
            </tr>
          </tbody>
        </table>
    </div>
    <p>{{ dataLoaded ? '資料已載入完成' : '資料尚未載入' }}</p>
    
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const products = reactive([]);//物件，包含一些頁面資訊
const dataLoaded = ref(false);// 新增一個狀態來表示資料是否載入完成
const loading = ref(false);// 新增一個狀態來表示資料是否正在載入中

const limit = ref(10);
const offset = ref(0);
const category = ref('');
const lowPrice = ref(0);
const highPrice = ref(0);
const sort = ref('');

const fetchData = async () => {
  try {
    loading.value = true;
    const queryParams = new URLSearchParams({
      limit: String(limit.value),
      offset: String(offset.value),
      category: category.value,
      low_price: String(lowPrice.value),
      high_price: String(highPrice.value),
      sort: sort.value
    });
    const url = `http://localhost:8080/Products?${queryParams.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    products.value = await response.json();
    dataLoaded.value = true;
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}/${month}/${day}`;
};
</script>

<style scoped>
.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.product-table th {
  background-color: #f2f2f2;
}

.product-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>