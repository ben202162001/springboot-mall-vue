<template>
  <div class="login-container">
    <div class="login-form">
      <input v-model="phone_Number" type="text" placeholder="Phone Number">
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
          this.$router.push('/Home'); // Redirect to home page if login is successful
        }
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
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
