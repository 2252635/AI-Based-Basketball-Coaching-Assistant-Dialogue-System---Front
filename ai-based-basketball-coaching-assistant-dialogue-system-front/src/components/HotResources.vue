<template>
    <div>
      <div class="title">
        <span>⬇️ 最热资料</span>
      </div>
      <div class="list-container">
        <ul class="list">
            <li v-for="(item, index) in knowledgeList" :key="index">
            <span class="index" :class="'index-' + (index + 1)">{{ index + 1 }}</span>
            <span class="text" @click="downloadArticle(item.id, item.title)">{{ item.title }}</span>
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
    // import { ref, onMounted } from 'vue';
    // import API from 'axios';
    // import { jsPDF } from "jspdf";
    // import { ArrowRight } from '@element-plus/icons-vue'

    //const knowledgeList = ref([]);
    const knowledgeList = [
    { id: 1, title: '2025年CBA总决赛战术复盘与核心解析', content: '篮球教练培训手册：战术设计与球员培养', downloads: 520 },
    { id: 2, title: '篮球教练培训手册：战术设计与球员培养', content: '篮球教练培训手册：战术设计与球员培养', downloads: 497 },
    { id: 3, title: '篮球训练100讲：从基本功到高阶技巧', content: '篮球训练100讲：从基本功到高阶技巧', downloads: 465 }
    ]

    // // 获取最热资料
    // const fetchTopDownloads = async () => {
    //   try {
    //     const response = await API.get('/api/articles/top-downloads');
    //     knowledgeList.value = response.data;
    //   } catch (error) {
    //     console.error('获取最热资料失败：', error);
    //   }
    // };

    // // 下载文章
    // const downloadArticle = async (id, title) => {
    //   try {
    //     const response = await API.get(`/api/articles/download/${id}`);
    //     const content = response.data.content;
        
    //     // 创建 PDF 文档
    //     const doc = new jsPDF({
    //       unit: 'pt',
    //       format: 'a4'
    //     });

    //     doc.setFont("Songti-SC"); // 设置字体：宋体
    //     doc.setFontSize(12);      // 字号：五号
    //     doc.setLineHeightFactor(1.3); // 行距：1.3倍

    //     // 标题
    //     doc.setFontSize(16);
    //     doc.text(title, 40, 40);
    //     doc.setFontSize(12);
    //     doc.setTextColor(0, 0, 0);

    //     // 将 content 按换行符分成段落，逐行写入
    //     const paragraphs = content.split("\n");
    //     let y = 80;
    //     paragraphs.forEach((paragraph) => {
    //       if (paragraph.trim()) {
    //         doc.text(paragraph, 40, y, { maxWidth: 520, align: "left" });
    //         y += 20; // 段落间空行
    //       }
    //     });

    //     // 保存 PDF
    //     doc.save(`${title}.pdf`);

    //     // 更新下载量和观看量
    //     await API.post(`/api/articles/update-downloads/${id}`);
    //     await API.post(`/api/articles/update-views/${id}`);
    //     fetchTopDownloads(); // 刷新列表
    //   } catch (error) {
    //     console.error('下载文章失败：', error);
    //   }
    // };

    // onMounted(() => {
    //   fetchTopDownloads();
    // });
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
    cursor: pointer;
    max-width: 280px; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .text:hover {
    color: #3c89db;
    text-decoration: underline;
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
  