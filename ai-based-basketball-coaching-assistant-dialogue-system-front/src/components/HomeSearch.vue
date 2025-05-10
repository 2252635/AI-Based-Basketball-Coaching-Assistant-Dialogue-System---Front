<template>
    <div class="search-container">
      <!-- 左侧卡通图像 -->
      <img src="@/assets/basketboy.png" alt="basketboy" class="basketboy-img" />
  
      <!-- 新增知识按钮
      <el-button type="primary" class="add-knowledge-btn">
        <el-icon><Plus /></el-icon>
        新增知识
      </el-button>-->
  
      <!-- 搜索框 -->
      <div class="search-bar">
        <el-input
          v-model="searchText"
          placeholder="请输入关键词"
          size="large"
          class="search-input"  
        >
          <template #append>
            <el-button type="primary" @click="search">
              搜索
            </el-button>
          </template>
        </el-input>
      </div>
  
      <!-- 热门标签 
      <div class="hot-tags">
        <div class="hot-tags-title">
            <el-icon><CollectionTag /></el-icon>
            <span>热门标签</span>
        </div>
        <span class="tag-item">🏀 球星技术解析</span>
        <span class="tag-item">🔥 NBA季后赛密技</span>
        <span class="tag-item">👟 球鞋与装备指南</span>
      </div>-->
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  //import { Plus,CollectionTag } from '@element-plus/icons-vue'
  
  const searchText = ref('')
  
  const search = () => {
    console.log('搜索关键词：', searchText.value)
  }
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
</style>
