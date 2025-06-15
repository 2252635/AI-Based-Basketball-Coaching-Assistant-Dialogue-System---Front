<template>
  <div class="home-container">
    <TopBar />
    <div class="main-content">
      <ClassifyBar />
      <div class="page-content">
        <loadComponent v-if="loading" />
        <div v-else class="search-results-container">
          <div class="search-bar">
            <div class="input-wrapper">
              <input
                v-model="inputKeyword"
                :placeholder="mobilePlaceholder"
                @keyup.enter="searchAgain"
                class="search-input"
                ref="searchInput"
              />
              <button @click="searchAgain" class="search-button">
                <span class="desktop-text">搜索</span>
                <svg class="mobile-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>
            <p v-if="warningMessage" class="warning-text">{{ warningMessage }}</p>
          </div>

          <div class="search-header">
            <h2>搜索结果</h2>
            <p class="summary-text">关键词：{{ keyword }}，共 {{ total }} 条结果</p>
          </div>

          <div class="knowledge-list" v-if="pagedList.length">
            <KnowledgeItem
              v-for="(item, index) in pagedList"
              :key="index"
              :item="item"
              :keyword="keyword"
            />
          </div>
          <div v-else class="no-results">
            <p>没有找到相关的知识。</p>
          </div>

          <div class="pagination" v-if="totalPages > 1">
            <button 
              :disabled="currentPage === 1" 
              @click="currentPage--"
              class="pagination-button"
            >
              <span class="desktop-text">上一页</span>
              <span class="mobile-text">←</span>
            </button>
            <span class="page-indicator">第 {{ currentPage }} / {{ totalPages }} 页</span>
            <button 
              :disabled="currentPage === totalPages" 
              @click="currentPage++"
              class="pagination-button"
            >
              <span class="desktop-text">下一页</span>
              <span class="mobile-text">→</span>
            </button>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import loadComponent from '../components/LoadComponent.vue';

const route = useRoute()
const router = useRouter()
const keyword = ref(route.query.keyword || '')
const inputKeyword = ref(keyword.value)
const knowledgeList = ref([])
const currentPage = ref(1)
const pageSize = 3
const loading = ref(true)
const warningMessage = ref('')

const total = computed(() => knowledgeList.value.length)
const totalPages = computed(() => Math.ceil(total.value / pageSize))
const pagedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return knowledgeList.value.slice(start, start + pageSize)
})

const fetchKnowledge = async () => {
  try {
    loading.value = true
    const response = await API.post('/api/search', {
      keyword: keyword.value
    })

    const rawList = response.data || []
    const uniqueMap = new Map()
    rawList.forEach(item => {
      if (!uniqueMap.has(item.subsectionId)) {
        uniqueMap.set(item.subsectionId, item)
      }
    })

    knowledgeList.value = Array.from(uniqueMap.values())
    currentPage.value = 1
  } catch (error) {
    console.error('获取知识列表失败', error)
  } finally {
    loading.value = false
  }
}

const searchAgain = () => {
  if (!inputKeyword.value.trim()) {
    warningMessage.value = '请输入关键词后再搜索。'
    setTimeout(() => {
      warningMessage.value = ''
    }, 2500)
    return
  }

  if (inputKeyword.value.trim() === keyword.value) {
    // 如果搜索的内容和当前关键词相同，不重新加载
    return
  }

  keyword.value = inputKeyword.value.trim()
  router.replace({ query: { keyword: keyword.value } })
  fetchKnowledge()
}

const mobilePlaceholder = computed(() => {
  return window.innerWidth < 768 ? '输入关键词...' : `当前关键词：${keyword.value}`
})

const searchInput = ref(null)

onMounted(() => {
  if (window.innerWidth < 768 && searchInput.value) {
    searchInput.value.focus()
  }

  if (keyword.value) {
    fetchKnowledge()
  }
})
</script>

<style scoped>
.warning-text {
  color: #d9534f;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
  transition: opacity 0.3s ease;
}

.home-container {
  background-color: #e9f0f8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
  flex-direction: column;
  padding: 2vh 3vw;
  flex: 1;
  gap: 1.5rem;
}

.classify-bar {
  display: none; /* 移动端隐藏分类栏 */
}

.page-content {
  flex: 1;
  margin: 0;
  width: 100%;
}

.search-results-container {
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  min-height: calc(100vh - 120px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-bar {
  margin-bottom: 1.5rem;
}

.input-wrapper {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border-radius: 30px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
  background-color: white;
}

.search-input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 8px rgba(74, 144, 226, 0.3);
}

.search-button {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.8rem 2rem;
  border-radius: 30px;
  background: #4a90e2;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  background: #357abd;
}

.mobile-icon {
  display: none;
}

.search-header {
  text-align: center;
  margin-bottom: 2rem;
}

.search-header h2 {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  margin-bottom: 0.5rem;
}

.summary-text {
  font-size: clamp(0.9rem, 2vw, 1rem);
  color: #666;
}

.knowledge-list {
  display: grid;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem 0;
}

.pagination-button {
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-indicator {
  font-size: 0.95rem;
  color: #666;
}

/* 移动端适配 */
@media (max-width: 767px) {
  .classify-bar {
    display: block; /* 显示移动端优化后的分类栏 */
  }

  .search-results-container {
    padding: 1rem;
    min-height: calc(100vh - 100px);
  }

  .search-input {
    padding: 0.8rem 1rem;
    padding-right: 60px;
    font-size: 0.95rem;
  }

  .search-button {
    padding: 0.6rem;
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  .desktop-text {
    display: none;
  }

  .mobile-icon {
    display: block;
    width: 24px;
    height: 24px;
  }

  .pagination {
    gap: 0.5rem;
  }

  .pagination-button {
    padding: 0.6rem 1rem;
    min-width: 80px;
  }

  .mobile-text {
    display: inline;
  }

  .desktop-text {
    display: none;
  }

  .page-indicator {
    font-size: 0.85rem;
  }
}

/* 平板适配 */
@media (min-width: 768px) and (max-width: 1023px) {
  .search-input {
    padding: 1rem 1.2rem;
  }

  .search-button {
    padding: 0.8rem 1.5rem;
  }

  .mobile-text {
    display: none;
  }
}

/* 桌面端优化 */
@media (min-width: 1024px) {
  .main-content {
    flex-direction: row;
  }

  .page-content {
    margin-left: 2vw;
  }

  .search-results-container {
    padding: 2rem;
  }

  .mobile-text {
    display: none;
  }
}
</style>