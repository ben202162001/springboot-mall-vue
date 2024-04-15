// src/store/index.js
import { createStore } from 'vuex';
console.log("index.js from 商店")
export const store = createStore({
  state: {
    user: null // 初始值為null，代表使用者尚未登入
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    loginUser({ commit }, user) {
      // 假設這裡是登入的邏輯，然後取得使用者資訊
      // 這裡假設 user 是一個包含使用者資訊的物件
      commit('setUser', user);
    }
  },
  getters: {
    currentUser(state) {
      return state.user;
    }
  }
});