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
}

.main-content {
  display: flex;
  padding: 29px 23px;
}

.page-content {
  flex: 1;
  padding: 0; 
  background-color: transparent;
  border-radius: 8px;
  margin-left: 36px;
  margin-right: 16px;
}

.knowledge-section {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 40px;
}

.knowledge-card {
  width: 29%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
}

</style>
