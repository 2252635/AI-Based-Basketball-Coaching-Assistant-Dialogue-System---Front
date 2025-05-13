<template>
    <div class="home-container">
      <TopBar />
      <div class="main-content">
        <ClassifyBar />
        <div class="page-content">
          <div class="search-results-container">
  
            <div class="knowledge-list" v-if="pagedList.length">
              <KnowledgeItem
                v-for="(item, index) in pagedList"
                :key="index"
                :item="item"
              />
            </div>
            <div v-else>
              <p>没有找到相关的知识。</p>
            </div>
  
            <div class="pagination" v-if="totalPages > 1">
              <button :disabled="currentPage === 1" @click="currentPage--">上一页</button>
              <span>第 {{ currentPage }} / {{ totalPages }} 页</span>
              <button :disabled="currentPage === totalPages" @click="currentPage++">下一页</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import TopBar from '../components/TopBar.vue'
  import ClassifyBar from '../components/ClassifyBar.vue'
  import KnowledgeItem from '../components/KnowledgeItem.vue'
  import { ref, computed, onMounted,watch } from 'vue'
  import { useRoute} from 'vue-router'
  import API from '../api/axios';
  
  const route = useRoute()
  const sectionName = ref(route.params.name || '')
  const knowledgeList = ref([])
  const currentPage = ref(1)
  const pageSize = 4
  
  const total = computed(() => knowledgeList.value.length)
  const totalPages = computed(() => Math.ceil(total.value / pageSize))
  const pagedList = computed(() => {
    const start = (currentPage.value - 1) * pageSize
    return knowledgeList.value.slice(start, start + pageSize)
  })
  
  const fetchKnowledge = async () => {
    try {
        
      const response = await API.get('http://localhost:8081/api/content/by-section-name', {
        params: {
        sectionName: sectionName.value
    }
      })
      knowledgeList.value = response.data || []
      currentPage.value = 1
    } catch (error) {
      console.error('获取知识列表失败', error)
    }
  }
  
  onMounted(() => {
      fetchKnowledge()
  })
  watch(() => route.params.name, (newName) => {
    sectionName.value = newName
    fetchKnowledge()
    })
  </script>
  
  <style scoped>
  .home-container {
    background-color: #e9f0f8;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .main-content {
    display: flex;
    flex-direction: column; /* 移动端优先垂直布局 */
    padding: 2vh 3vw; /* 使用视窗单位 */
    flex: 1;
    gap: 1.5rem; /* 使用现代间距属性 */
  }
  
  .page-content {
    flex: 1;
    margin: 0; /* 重置默认边距 */
    width: 100%;
    transition: margin 0.3s ease; /* 添加过渡动画 */
  }
  
  .search-results-container {
    padding: 1.5rem;
    background-color: #f9f9f9;
    border-radius: 10px;
    min-height: calc(100vh - 160px); /* 动态调整最小高度 */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .search-bar {
    display: flex;
    flex-wrap: wrap; /* 允许换行 */
    gap: 1rem;
    margin-bottom: 1.5rem;
    max-width: 800px; /* 限制最大宽度 */
    margin: 0 auto 1.5rem; /* 居中显示 */
  }
  
  .search-input {
    flex: 1 1 250px; /* 弹性宽度 */
    min-width: 200px; /* 最小可读宽度 */
    padding: 0.8rem;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
  
  .search-button {
    flex: 0 0 auto; /* 保持按钮原始宽度 */
    padding: 0.8rem 2rem;
    font-size: 1rem;
    transition: all 0.2s ease;
  }
  
  .search-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .search-header h2 {
    font-size: clamp(1.5rem, 2.5vw, 2rem); /* 响应式字体大小 */
    margin-bottom: 0.5rem;
  }
  
  .knowledge-list {
    display: grid;
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2rem;
    padding: 1rem 0;
  }
  
  .pagination button {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
  
  /* 平板设备适配 */
  @media (min-width: 768px) {
    .main-content {
      flex-direction: row; /* 恢复横向布局 */
    }
    
    .page-content {
      margin-left: 2vw;
      margin-right: 1vw;
    }
  
    .search-results-container {
      padding: 2rem;
    }
  }
  
  /* 小屏幕适配 */
  @media (max-width: 767px) {
    .main-content {
      padding: 2vh 1.5vw;
    }
  
    .search-bar {
      flex-direction: column; /* 垂直排列 */
    }
  
    .search-input {
      width: 100%;
      min-width: auto;
    }
  
    .search-button {
      width: 100%;
    }
  
    .pagination {
      flex-direction: column;
    }
  }
  
  /* 大屏幕优化 */
  @media (min-width: 1200px) {
    .search-results-container {
      max-width: 1400px;
      margin: 0 auto;
    }
  }
  </style>