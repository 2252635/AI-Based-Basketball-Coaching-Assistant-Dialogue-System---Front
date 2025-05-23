<template>
  <div class="home-container">
    <TopBar />
    <div class="main-content">
      <ClassifyBar />
      <div class="page-content">
        <HomeSearch />
        <div class="knowledge-section">
          <div class="knowledge-card">
            <KnowledgeRecommend />
          </div>
          <div class="knowledge-card">
            <LatestKnowledge />
          </div>
          <div class="knowledge-card">
            <HotResources />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import TopBar from '../components/TopBar.vue'
import ClassifyBar from '../components/ClassifyBar.vue'
import HomeSearch from '../components/HomeSearch.vue'

import KnowledgeRecommend from '../components/KnowledgeRecommend.vue'
import LatestKnowledge from '../components/LatestKnowledge.vue'
import HotResources from '../components/HotResources.vue'
</script>

<style scoped>
.home-container {
  background-color: #e9f0f8;
  min-height: 100vh;
}

.main-content {
  display: flex;
  padding: 20px;
  flex-direction: column; /* 移动端默认垂直排列 */
}

.page-content {
  flex: 1;
  background-color: transparent;
  border-radius: 8px;
  margin: 0 15px; /* 移动端减少边距 */
}

.knowledge-section {
  display: flex;
  flex-direction: column; /* 移动端垂直排列 */
  gap: 20px; /* 卡片间距 */
  margin: 30px 0;
}

.knowledge-card {
  width: 100%; /* 移动端全宽 */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 15px;
  margin-bottom: 15px;
}

/* 平板设备适配 */
@media (min-width: 768px) {
  .main-content {
    flex-direction: row; /* 恢复水平布局 */
    padding: 29px 23px;
  }

  .page-content {
    margin-left: 36px;
    margin-right: 16px;
  }

  .knowledge-section {
    flex-direction: row; /* 恢复水平布局 */
    flex-wrap: wrap; /* 允许换行 */
    justify-content: space-between;
    gap: 0;
  }

  .knowledge-card {
    width: 48%; /* 平板显示两列 */
    margin-bottom: 0;
  }
}

/* 桌面设备适配 */
@media (min-width: 1024px) {
  .knowledge-section {
    flex-wrap: nowrap;
  }

  .knowledge-card {
    width: 29%; /* 桌面恢复三列布局 */
  }
}

/* 小尺寸手机适配 */
@media (max-width: 480px) {
  .main-content {
    padding: 15px;
  }

  .page-content {
    margin: 0 10px;
  }

  .knowledge-card {
    padding: 12px;
  }
}

/* 通用响应式调整 */
@media (max-width: 767px) {
  .knowledge-card h3 {
    font-size: 16px; /* 移动端缩小标题 */
  }
  
  .knowledge-card p {
    font-size: 14px; /* 移动端缩小正文 */
  }
}
</style>