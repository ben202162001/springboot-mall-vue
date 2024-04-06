//index.js
import { createRouter, createWebHistory } from 'vue-router';
import ProductHome from '../components/Products/ProductHome.vue';
import HelloWorld from '../components/HelloWorld.vue';
import AccountLogin from '../components/Accounts/AccountLogin.vue';
console.log("index.js")
const routes = [
  {
    path: '/product',
    name: 'ProductHome',
    component: ProductHome
  },{
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  },{
    path: '/Login',
    name: 'Login',
    component: AccountLogin
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;