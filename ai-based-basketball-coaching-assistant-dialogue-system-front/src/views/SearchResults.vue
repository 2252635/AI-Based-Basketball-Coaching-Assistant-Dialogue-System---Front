<template>
  <div class="home-container">
    <TopBar />
    <div class="main-content">
      <ClassifyBar />
      <div class="page-content">
        <div class="search-results-container">
          <div class="search-bar">
            <input
              v-model="inputKeyword"
              :placeholder="`当前关键词：${keyword}`"
              @keyup.enter="searchAgain"
              class="search-input"
            />
            <button @click="searchAgain" class="search-button">搜索</button>
          </div>

          <div class="search-header">
            <h2>搜索结果</h2>
            <p>关键词：{{ keyword }}，共 {{ total }} 条结果</p>
          </div>

          <div class="knowledge-list" v-if="pagedList.length">
            <KnowledgeItem
              v-for="(item, index) in pagedList"
              :key="index"
              :item="item"
              :keyword="keyword"
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const keyword = ref(route.query.keyword || '')
const inputKeyword = ref(keyword.value)
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
    const response = await axios.post('http://localhost:8081/api/search', {
      keyword: keyword.value
    })
    knowledgeList.value = response.data || []
    currentPage.value = 1
  } catch (error) {
    console.error('获取知识列表失败', error)
  }
}

const searchAgain = () => {
  if (inputKeyword.value.trim()) {
    keyword.value = inputKeyword.value.trim()
    router.replace({ query: { keyword: keyword.value } })
    fetchKnowledge()
  }
}

onMounted(() => {
  if (keyword.value) {
    fetchKnowledge()
  }
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
  padding: 29px 23px;
  flex: 1;
}

.page-content {
  flex: 1;
  margin-left: 36px;
  margin-right: 16px;
}

.search-results-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  min-height: calc(100vh - 200px); /* 根据实际情况调整这个值 */
}

.search-bar {
  display: flex;
  margin-bottom: 16px;
  gap: 10px;
  justify-content: center;
}

.search-input {
  width: 300px;
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.search-button {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #0056b3;
}

.search-header {
  text-align: center;
  margin-bottom: 20px;
}

.knowledge-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination button {
  padding: 6px 12px;
  margin: 0 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>