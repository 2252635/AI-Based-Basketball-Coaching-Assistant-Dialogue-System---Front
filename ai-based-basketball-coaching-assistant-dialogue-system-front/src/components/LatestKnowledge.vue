<template>
    <div>
      <div class="title">
        <span>⚡最新知识</span>
      </div>
      <loadComponent v-if="loading" />
      <div v-else class="list-container">
        <ul class="list">
            <li v-for="(item, index) in knowledgeList" :key="index">
            <span class="index" :class="'index-' + (index + 1)">{{ index + 1 }}</span>
            <span class="text" @click="viewArticle(item.id)">{{ item.title }}</span>
            <span class="upload-time">
              <el-icon><Upload /></el-icon>
              {{ formatDate(item.uploadTime) }}
            </span>
            </li>
        </ul>
        <!-- <div class="more">
            <el-icon class="more-icon"><ArrowRight /></el-icon>
            更多
        </div> -->
      </div>
    </div>
  </template>  
  
  <script setup>
  import { Upload} from '@element-plus/icons-vue'
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import API from '../api/axios';
  import loadComponent from './LoadComponent.vue';
  // import { ArrowRight } from '@element-plus/icons-vue'
  
  const router = useRouter()
  const knowledgeList = ref([])
  const loading = ref(true);
  
   // 获取最新文章
  const fetchLatestArticles = async () => {
    try {
      const response = await API.get('/api/articles/recent/top8');
      knowledgeList.value = response.data;
    } catch (error) {
      console.error('Error fetching latest articles:', error);
    } finally {
      loading.value = false; // 数据加载完成后，隐藏加载中组件
    }
  };

  // 跳转并更新阅读量
  const viewArticle = async (id) => {
    try {
      await API.put(`/api/articles/views/increment/${id}`);
      router.push(`/article/${id}`);
    } catch (error) {
      console.error('Error updating views:', error);
    }
  };

  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
  }

  // 初始化获取数据
  onMounted(() => {
    fetchLatestArticles();
  });
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
    max-width: 240px; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .text:hover {
    color: #3c89db;
  }
  
  .upload-time {
    color: gray;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
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
  