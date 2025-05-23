<template>
  <div class="search-container">
    <img src="@/assets/basketboy.png" alt="basketboy" class="basketboy-img" />

    <div class="search-bar">
      <el-input
        v-model="searchText"
        placeholder="请输入关键词"
        size="large"
        class="search-input"
        clearable  
        @keyup.enter="search"  
        @input="handleInput"  
      >
        <template #append>
          <el-button 
            type="primary" 
            @click="search"
            :loading="searchLoading"  
          >
            搜索
          </el-button>
        </template>
      </el-input>

      <!-- 搜索建议 -->
      <div 
        v-if="showSuggestions"
        class="suggestions-container"
      >
        <div 
          v-for="(item, index) in suggestions"
          :key="index"
          class="suggestion-item"
          @click="selectSuggestion(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { debounce } from 'lodash'

const router = useRouter()
const searchText = ref('')
const searchLoading = ref(false)
const lastSearch = ref('')

// 建议列表（示例数据）
const suggestionPool = ref([
  '篮球基础教学',
  'NBA球星解析',
  '三分球训练技巧',
  '篮球装备选购指南',
  '赛事精彩集锦'
])

// 动态占位符（示例）
const placeholders = ref([
  '搜索篮球技巧...',
  '输入球星名字...',
  '查找训练方法...'
])
const currentPlaceholder = ref(placeholders.value[0])

// 输入建议相关
const showSuggestions = ref(false)
const suggestions = computed(() => {
  if (!searchText.value) return []
  const text = searchText.value.toLowerCase()
  return suggestionPool.value.filter(item => 
    item.toLowerCase().includes(text)
  ).slice(0, 5) // 最多显示5条
})

// 防抖处理输入
const handleInput = debounce(() => {
  showSuggestions.value = searchText.value.length > 0
}, 300)

// 选择建议
const selectSuggestion = (text) => {
  searchText.value = text
  showSuggestions.value = false
  search()
}

// 搜索逻辑
const search = async () => {
  const keyword = searchText.value.trim()
  
  if (!keyword) {
    ElMessage.warning('请输入搜索内容')
    return
  }
  
  if (keyword === lastSearch.value) {
    ElMessage.info('已显示当前搜索结果')
    return
  }

  try {
    searchLoading.value = true
    lastSearch.value = keyword
    
    // 模拟搜索过程
    await new Promise(resolve => setTimeout(resolve, 800))
    
    router.push({ 
      name: 'searchResults', 
      query: { keyword } 
    })
  } finally {
    searchLoading.value = false
    showSuggestions.value = false
  }
}

// 随机占位符（组件挂载时）
onMounted(() => {
  currentPlaceholder.value = placeholders.value[
    Math.floor(Math.random() * placeholders.value.length)
  ]
})
</script>
  <style scoped>
.search-container {
  background-color: #323d82;
  color: white;
  padding: 40px 20px 70px;
  border-radius: 10px;
  position: relative;
  height: 160px;
  overflow: hidden;
  text-align: center;
}

.basketboy-img {
  position: absolute;
  bottom: 0;
  left: 6px;
  height: 100%;
  width: 194px;
}

/*.add-knowledge-btn {
  position: flex;
}*/

.search-bar {
  max-width: 700px;
  margin: 0 auto;
  margin-top: 50px;
}

.search-input :deep(.el-input__wrapper) {
  height: 54px !important; 
  align-items: center;
}

.search-input :deep(.el-input__inner) {
  font-size: 18px;
  line-height: 50px;
  border-radius: 4px 0 0 4px;
}

.search-input :deep(.el-button) {
  height: 54px;
  font-size: 18px;
  padding: 0 24px;
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
}

/*.hot-tags {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 14px;
}

.hot-tags-title {
  display: flex;
  align-items: center;
  color: white;
  font-size: 18px;
  margin-right: 30px;
  margin-left: -170px;
  gap: 6px;
  font-weight: bold;
}

.tag-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 10px;
  border-radius: 12px;
}*/
.suggestions-container {
  position: absolute;
  width: 100%;
  max-width: 700px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  margin-top: 4px;
  z-index: 2000;
}

.suggestion-item {
  padding: 12px 20px;
  color: #606266;
  cursor: pointer;
  transition: all 0.3s;
  text-align: left;
}

.suggestion-item:hover {
  background: #f5f7fa;
  color: #323d82;
}

/* 调整搜索容器高度 */
.search-container {
  height: 200px; /* 增加高度容纳建议列表 */
}

</style>
