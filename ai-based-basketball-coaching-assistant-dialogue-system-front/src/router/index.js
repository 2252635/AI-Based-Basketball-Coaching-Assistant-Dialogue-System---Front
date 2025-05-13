// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
  {
    path: '/',
    name: 'LoginAndRegisterView',
    component: () => import('../views/LoginAndRegisterView.vue'),  
  },
  {
    path: '/home',
    name: 'HomePage',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/library',
    name: 'LibraryPage',
    component: () => import('../views/LibraryPage.vue'), 
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
  {
    path: '/article/:id',
    name: 'ArticleView',
    component: () => import('../views/ArticleView.vue'),  
  },
  {
    path: '/knowledge/:id', 
    name: 'KnowledgeView',
    component: () => import('../views/KnowledgeDetail.vue'),  
  },
  {
    path: '/search-results',
    name: 'searchResults',
    component: () => import('../views/SearchResults.vue'), 
  },
  {
    path: '/knowledgeclass/:name',
    name: 'KnowledgeClass',
    component: () => import('@/views/KnowledgeClass.vue')
  },
  {
      path:"/load",
      name:"load",
      component: () => import("../components/LoadComponent.vue"),
  },
  
],
});

export default router;
