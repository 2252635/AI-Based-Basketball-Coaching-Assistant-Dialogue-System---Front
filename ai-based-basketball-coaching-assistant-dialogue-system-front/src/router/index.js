// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,  // 首页组件
  },
];

// 创建路由实例并传入配置
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  
  routes,
});

export default router;
