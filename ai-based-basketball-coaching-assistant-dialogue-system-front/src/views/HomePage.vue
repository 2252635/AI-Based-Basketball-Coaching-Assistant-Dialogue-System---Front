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
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
  padding: 2vh 2vw;
  flex-grow: 1;
  flex-direction: column; /* 移动端优先改为垂直布局 */
}

.page-content {
  flex: 1;
  background-color: transparent;
  border-radius: 8px;
  margin: 1rem 0; /* 调整边距为相对单位 */
  width: 100%; /* 确保宽度充满容器 */
}

.knowledge-section {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  justify-content: space-around; /* 更灵活的间距控制 */
  gap: 2rem; /* 使用现代间距属性 */
  margin: 3vh 0;
}

.knowledge-card {
  flex: 1 1 300px; /* 弹性基础尺寸 */
  min-width: 300px; /* 最小宽度保证可读性 */
  max-width: 480px; /* 最大宽度避免过大 */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin: 1rem;
  box-sizing: border-box; /* 确保padding不影响尺寸 */
}

/* 媒体查询适配不同尺寸 */
@media (min-width: 1200px) {
  .main-content {
    flex-direction: row; /* 大屏幕恢复横向布局 */
  }
  .page-content {
    margin-left: 2vw;
    margin-right: 1vw;
  }
}

@media (max-width: 768px) {
  .knowledge-card {
    flex-basis: 100%; /* 小屏幕时卡片占满宽度 */
    min-width: auto;
    max-width: none;
    margin: 1rem 0;
  }
}

@media (min-width: 769px) and (max-width: 1199px) {
  .knowledge-card {
    flex-basis: 45%; /* 中等屏幕每行显示两个卡片 */
  }
}
</style>