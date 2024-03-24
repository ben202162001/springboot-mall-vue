<template>
  <div>
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
            <tr v-for="product in productsData.value" :key="product.product_id" class="product-item">
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
const productsData = reactive([]);//列表資料的JSON
const dataLoaded = ref(false);// 新增一個狀態來表示資料是否載入完成
const loading = ref(false);// 新增一個狀態來表示資料是否正在載入中


const fetchData = async () => {
  try {
    loading.value = true;
    const response = await fetch('http://localhost:8080/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    products.results = await response.json();
    dataLoaded.value = true;
    productsData.value = products.results.results;
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
