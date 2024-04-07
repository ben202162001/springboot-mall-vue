<template>
  <div>
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
</template>

<script>
export default {
  data() {
    return {
      phone_Number: '',
      password: '',
      MassageStatus: '',
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
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>