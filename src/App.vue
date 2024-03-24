<template>
  <div>
    <p v-if="!dataLoaded && !loading">點擊按鈕以取得產品數據</p>
    <button @click="fetchData">取得產品數據</button> <!-- 点击按钮触发 fetchData 方法 -->
    <h1>---------------</h1>
    <p>products.results:{{ products.results }}</p> <!-- 输出数据加载状态 -->
    <p>productsData:{{productsData.value}}</p>
    <p v-if="loading">加载中...</p>
    
    <div v-if="dataLoaded">
        <li v-for="product in productsData.value" :key="product.product_id">
            <div>{{ product.product_name }}</div>
            <div>Category: {{ product.category }}</div>
            <div>Price: {{ product.price }}</div>
            <div>Stock: {{ product.stock }}</div>
            <div>Description: {{ product.description }}</div>
            <div>Created Date: {{ product.created_date }}</div>
            <div>Last Modified Date: {{ product.last_modified_date }}</div>
            <div>Image URL: {{ product.image_url }}</div>
        </li>
    </div>
    <H1>---------------</H1>
    <p>{{ dataLoaded ? '資料已載入完成' : '資料尚未載入' }}</p>
    
  </div>
</template>


<script setup>
import { reactive, ref } from 'vue';

//const products = ref([]);
const products = reactive([]);
//const products = reactive({ results: [] });
const dataLoaded = ref(false); // 添加一个状态来表示数据是否加载完成
const loading = ref(false); // 添加一个状态来表示数据是否正在加载中
const productsData = reactive([]);
const fetchData = async () => {
  try {
    console.log('開始api獲取數據');
    loading.value = true; // 设置为 true 表示数据正在加载中
    const response = await fetch('http://localhost:8080/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('成功api獲取數據');

    console.log('product的資料開始');
    products.results = await response.json();
    dataLoaded.value = true; // 数据加载完成后设置为 true
    console.log(products.results);
    console.log('product的資料結束');
    
    console.log('productsData.value的資料開始');
    productsData.value = products.results.results; // 将值分配给 productsData.value
    console.log(productsData.value);
    console.log('productsData.value的資料結束');
    
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false; // 无论加载成功或失败，都将 loading 设置为 false
  }
};
</script>
