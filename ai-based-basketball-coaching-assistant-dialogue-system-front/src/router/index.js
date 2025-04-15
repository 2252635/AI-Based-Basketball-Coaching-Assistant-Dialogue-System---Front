// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
  {
    path: '/',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue'),  
  },
  {
    path: '/home',
    name: 'HomePage',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/person',
    name: 'PersonCenter',
    component: () => import('../views/PersonCenter.vue'),  
  },
  {
    path: '/chat',
    name: 'ChatPage',
    component: () => import('../views/ChatPage.vue'),  
  },
],
});

export default router;
