//index.js
import { createRouter, createWebHistory } from 'vue-router';
import ProductHome from '../components/Products/ProductHome.vue';
import HelloWorld from '../components/HelloWorld.vue';
import AccountLogin from '../components/Accounts/AccountLogin.vue';
import OrderHome from '../components/PurchaseOrder/OrderHome.vue';
import VueHome from '../components/VueHome.vue';
console.log("index.js from 路由器")
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
  },{
    path: '/',
    name: 'Home',
    component: VueHome
  },
  {
    path: '/OrderHome/:productId',
    name: 'OrderHome',
    component: OrderHome // 將路由設定為接收 productId 參數
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;