<template>
  <div>
    <h1>Products</h1>
    <button @click="fetchData">获取产品数据</button> <!-- 点击按钮触发 fetchData 方法 -->
    <p v-if="!dataLoaded && !loading">点击按钮以获取产品数据</p>
    <p v-if="loading">加载中...</p>
    <div v-if="dataLoaded">
      <ul>
        <li v-for="product in products" :key="product.product_name">
            <div>{{ product.product_name }}</div>
            <div>Category: {{ product.category }}</div>
            <div>Price: {{ product.price }}</div>
            <div>Stock: {{ product.stock }}</div>
            <div>Description: {{ product.description }}</div>
            <div>Created Date: {{ product.created_date }}</div>
            <div>Last Modified Date: {{ product.last_modified_date }}</div>
            <div>Image URL: {{ product.image_url }}</div>
        </li>
      </ul>
    </div>
    <p>{{ dataLoaded ? '数据已加载完成' : '数据尚未加载' }}</p>
    <p>{{ products.value }}</p> <!-- 输出数据加载状态 -->
  </div>
</template>


<script setup>
import { reactive, ref } from 'vue';

//const products = ref([]);
const products = reactive([]);
const dataLoaded = ref(false); // 添加一个状态来表示数据是否加载完成
const loading = ref(false); // 添加一个状态来表示数据是否正在加载中

console.log('!!!');
const fetchData = async () => {
  try {
    console.log('开始获取数据');
    loading.value = true; // 设置为 true 表示数据正在加载中
    const response = await fetch('http://localhost:8080/products');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('成功获取数据');
    products.value = await response.json();
    dataLoaded.value = true; // 数据加载完成后设置为 true
    console.log('product的資料開始');
    console.log(products.value);
    console.log('product的資料結束');
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    loading.value = false; // 无论加载成功或失败，都将 loading 设置为 false
  }
};
</script>
