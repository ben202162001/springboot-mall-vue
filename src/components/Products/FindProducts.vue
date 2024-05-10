<template>
  <div class="container">
    <!-- Query Conditions -->
    <div class="query-conditions">
      <form @submit.prevent="fetchData" class="query-form">
        <div class="form-group">
          <label for="limit">限制筆數:</label>
          <input type="number" id="limit" v-model="limit" class="small-input">
        </div>
        <div class="form-group">
          <label for="offset">自第幾筆開始:</label>
          <input type="number" id="offset" v-model="offset" class="small-input">
        </div>
        <div class="form-group">
          <label for="category">類型:</label>
          <input type="text" id="category" v-model="category" class="large-input">
        </div>
        <div class="form-group">
          <label for="lowPrice">最低價格:</label>
          <input type="number" id="lowPrice" v-model="lowPrice" class="small-input">
        </div>
        <div class="form-group">
          <label for="highPrice">最高價格:</label>
          <input type="number" id="highPrice" v-model="highPrice" class="small-input">
        </div>
        <div class="form-group">
          <label for="sort">排序依照:</label>
          <select id="sort" v-model="sort" class="large-input">
            <option value="">--</option>
            <option value="price">價格由低至高</option>
            <option value="-price">價格由高至低</option>
          </select>
        </div>
        <button type="submit">Search</button>
      </form>
      <p>{{ dataLoaded ? '搜尋完成' : '輸入搜尋條件' }}</p>
      <p v-if="loading">加载中...</p>
    </div>

    <!-- Search Results -->
    <div class="search-results">


      <p></p>
      <div v-if="dataLoaded">
        <table class="product-table">
          <thead>
            <tr>
              <th>圖片</th>
              <th>產品名稱</th>
              <th>分類</th>
              <th>價格</th>
              <th>描述</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products.value.results" :key="product.product_id" class="product-item">
              <td>
                <!-- Added img tag to display the image -->
                <img :src="product.image_url" alt="Product Image" style="max-width: 100px; max-height: 100px;">
              </td>
              <td>{{ product.product_name }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.price }}</td>
              <td>{{ product.description }}</td>
              <td>
                <router-link :to="{ name: 'OrderHome', params: { productId: product.product_id } }">
                  我要下訂！
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage <= 1" class="pagination-btn">上一頁</button>
          <span class="pagination-info">{{ currentPage }} / {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage >= totalPages" class="pagination-btn">下一頁</button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

const products = reactive([]);//物件，包含一些頁面資訊
const dataLoaded = ref(false);// 新增一個狀態來表示資料是否載入完成
const loading = ref(false);// 新增一個狀態來表示資料是否正在載入中
const totalProductsNum = ref(0); // 商品總數
const currentPage = ref(1); //現在頁數
const totalPages = ref(1);//頁面總數

// ----下sql在用的start----
const limit = ref(10);
const offset = ref(0);
const category = ref('');
const lowPrice = ref(0);
const highPrice = ref(0);
const sort = ref('');
// ----下sql在用的end----


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
    totalProductsNum.value = products.value.tatol;
    totalPages.value = Math.ceil(totalProductsNum.value / limit.value);
    currentPage.value = Math.floor(offset.value / limit.value) + 1;
    dataLoaded.value = true;
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false;
  }
};

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}/${month}/${day}`;
// };
const prevPage = () => {
  offset.value -= limit.value;
  fetchData();
};

const nextPage = () => {
  offset.value += limit.value;
  fetchData();
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.query-conditions {
  flex: 1;
  max-width: 300px;
  /* Limit query conditions width */
}

.query-form {
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.small-input {
  width: 80px;
  /* Set the width of small input fields */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.large-input {
  width: 200px;
  /* Set the width of large input fields */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-results {
  flex: 2;
  margin-left: 20px;
}

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
.pagination {
  margin-top: 20px; /* Add some space between pagination and other content */
}

.pagination-btn {
  padding: 8px 16px; /* Add padding to buttons */
  margin: 0 8px; /* Add margin between buttons */
  border: none; /* Remove default button border */
  background-color: #007bff; /* Set button background color */
  color: #fff; /* Set button text color */
  border-radius: 4px; /* Add border radius */
  cursor: pointer; /* Change cursor to pointer on hover */
}

.pagination-btn:disabled {
  background-color: #ccc; /* Change background color of disabled buttons */
  cursor: not-allowed; /* Change cursor to not-allowed on disabled buttons */
}

.pagination-info {
  font-size: 16px; /* Adjust font size of page information */
  margin: 0 8px; /* Add margin between page information and buttons */
  display: inline-block; /* Make it inline block to align with buttons */
}
</style>
