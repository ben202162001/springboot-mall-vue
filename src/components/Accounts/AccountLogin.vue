<template>
    <div>
      <input v-model="phone_Number" type="text" placeholder="Phone Number">
      <input v-model="password" type="password" placeholder="Password">
      <button @click="login">Login</button>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="error">Error: {{ error }}</p>
      <div v-else>
        <p>User ID: {{ user.userId }}</p>
        <p>User Name: {{ user.userName }}</p>
        <p>Password: {{ user.password }}</p>
        <p>Phone Number: {{ user.phoneNumber }}</p>
        <p>Create Time: {{ user.createTime }}</p>
        <p>Edit Time: {{ user.editTime }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        phone_Number: '',
        password: '',
        user: {},
        isLoading: false,
        error: null
      };
    },
    methods: {
      async login() {
        try {
          this.isLoading = true;
          const url = `http://localhost:8080/login?phone_Number=${this.phone_Number}&password=${this.password}`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          this.user = await response.json();
        } catch (error) {
          this.error = error.message;
        } finally {
          this.isLoading = false;
        }
      }
    }
  };
  </script>
  