<template>
    <div>
      <div class="title">
        <span>🔥 知识推荐</span>
      </div>
      <loadComponent v-if="loading" />
      <div v-else class="list-container">
        <ul class="list">
            <li v-for="(item, index) in knowledgeList" :key="index">
            <span class="index" :class="'index-' + (index + 1)">{{ index + 1 }}</span>
            <span class="text" @click="viewArticle(item.id)">{{ item.title }}</span>
            <span class="view"><el-icon><View /></el-icon>{{ item.views }}</span>
            </li>
        </ul>
        <!-- <div class="more">
            <el-icon class="more-icon"><ArrowRight /></el-icon>
            更多</div> -->
        </div>
    </div>
  </template>
  
  <script setup>
  import { View } from '@element-plus/icons-vue'
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import API from '../api/axios';
  import loadComponent from './LoadComponent.vue';
  // import { ArrowRight } from '@element-plus/icons-vue'
  
  const router = useRouter()
  const knowledgeList = ref([])
  const loading = ref(true);
  
  // 获取文章数据（观看次数前8）
  const fetchKnowledgeList = async () => {
    try {
      const response = await API.get('/api/articles/views/top8');
      knowledgeList.value = response.data;
    } catch (error) {
      console.error('获取文章列表失败：', error);
    } finally {
      loading.value = false; // 数据加载完成后，隐藏加载中组件
    }
  };


  // 点击标题跳转并更新views
  const viewArticle = async (id) => {
    try {
      // 更新后端的views
      await API.put(`/api/articles/views/increment/${id}`);
      // 跳转到对应文章页面
      router.push(`/article/${id}`)
      // 更新文章列表（刷新views数据）
      fetchKnowledgeList()
    } catch (error) {
      console.error('加载浏览量失败:', error)
    }
  }
  
    onMounted(() => {
    fetchKnowledgeList()
  })
  </script>
  
  <style scoped>
  .title {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
    color: #000;
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0; 
  }

  .list-container {
    display: flex;             
    flex-direction: column;    
    height: 400px;            
    justify-content: space-between;  
  }
  
  .list {
    list-style: none;
    padding: 0;
    margin: 0;
    flex-grow: 1;  
  }
  
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 30px; 
    padding: 10px 0;     
    font-size: 14px;
  }
  
  .index {
    width: 24px;
    text-align: center;
    font-weight: bold;
  }
  
  .index-1 { color: red; }
  .index-2 { color: orange; }
  .index-3 { color: green; }
  
  .text {
    flex: 1;
    margin: 0 10px;
    word-break: break-word;
    text-align: left;
    cursor: pointer;
    max-width: 280px; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .text:hover {
    color: #3c89db;
  }
  
  .view {
    color: gray;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  /* .more {
    text-align: right;
    color: #0c1f69;
    font-weight: bold;
    font-size: 13px;
    margin-top: 12px;
    cursor: pointer;
    align-items: center;
  }
  
  .more-icon {
    width: 15px;
    height: 15px;
    align-items: center;
    background-color: #758dc9;  
    border-radius: 50%;         
    color: white;      
    font-weight:bold        
  } */
  </style>
  