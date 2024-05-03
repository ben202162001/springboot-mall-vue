<!-- src/components/Accounts/AccountLogin -->
<template>
  <div class="login-container">
    <div class="login-form">
      <p align="center">手機:</p>
      <input v-model="phone_Number" type="text" placeholder="Phone Number">
      <p align="center">密碼:</p>
      <input v-model="password" type="password" placeholder="Password">
      <button @click="login">Login</button>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="error">{{ error }}</p>
      <div v-else>
        <p>massageStatus: {{ massageStatus }}</p>
        <p>Error Time: {{ errorTime }}</p>
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '@/store'; // 直接從 Vuex 存儲文件中導入 store
export default {
  data() {
    return {
      phone_Number: '',
      password: '',
      massageStatus: '',
      errorTime: '',
      message: '',
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
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        this.massageStatus = responseData.massageStatus;
        this.errorTime = responseData.errorTime;
        this.message = responseData.massage;
        // Check if login is successful, then redirect
        if (this.massageStatus === 'success') {
          // Call another API to get user data
          await this.getUserData();
          // Redirect to home page if login is successful
          this.$router.push('/'); 
        }
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    async getUserData() {
      try {
        const url = `http://localhost:8080/getUserData?phone_Number=${this.phone_Number}&password=${this.password}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        // Pass the user data as props to the next component
        //this.$emit('userData', userData);
        // console.log(userData);
        store.dispatch('loginUser', userData);
        // console.log('下面是全域');
        // console.log(this.$store.state.user);
        // console.log(this.$store.state.user.userName);
        // console.log(this.$store.state.user.createTime);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

input[type="text"],
input[type="password"],
button {
  display: block;
  width: 95%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 10px;
}
</style>
