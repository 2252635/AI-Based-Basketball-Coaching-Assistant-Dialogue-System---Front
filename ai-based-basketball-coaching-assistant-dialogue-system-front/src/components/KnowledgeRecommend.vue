<template>
    <div>
      <div class="title">
        <span>🔥 知识推荐</span>
      </div>
      <div class="list-container">
        <ul class="list">
            <li v-for="(item, index) in knowledgeList" :key="index">
            <span class="index" :class="'index-' + (index + 1)">{{ index + 1 }}</span>
            <span class="text">{{ item.title }}</span>
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
  import { View} from '@element-plus/icons-vue'
  // import { ArrowRight } from '@element-plus/icons-vue'
  
  const knowledgeList = [
    { title: '从入门到精通：篮球规则全图解', views: 156 },
    { title: '2024年NBA新秀潜力分析报告', views: 150 },
    { title: '5个被低估的防守技巧——职业球员也在用', views: 122 },
    { title: '篮球战术板：如何制定有效的比赛策略', views: 110 },
    { title: '篮球心理学：如何克服比赛焦虑', views: 98 },
    { title: 'NBA历史最佳球员排名及分析', views: 85 },
    
  ]
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
  