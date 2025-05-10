<template>
    <div>
      <div class="title">
        <span>⬇️ 最热资料</span>
      </div>
      <div class="list-container">
        <ul class="list">
            <li v-for="(item, index) in knowledgeList" :key="index">
            <span class="index" :class="'index-' + (index + 1)">{{ index + 1 }}</span>
            <span class="text">{{ item.title }}</span>
            <span class="download">
                <el-icon><Download /></el-icon>{{ item.downloads }}
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
    import { Download} from '@element-plus/icons-vue'
    // import { ArrowRight } from '@element-plus/icons-vue'

    const knowledgeList = [
    { title: '2024考研政治大纲核心整理', downloads: 520 },
    { title: 'Web全栈开发面试宝典（附答案）', downloads: 497 },
    { title: '机器学习100讲：从零开始入门AI', downloads: 465 },
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
  
  .index-1 {
    color: red;
  }
  
  .index-2 {
    color: orange;
  }
  
  .index-3 {
    color: green;
  }
  
  .text {
    flex: 1;
    margin: 0 10px;
    word-break: break-word;
    text-align: left;
  }
  
  .download {
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
  