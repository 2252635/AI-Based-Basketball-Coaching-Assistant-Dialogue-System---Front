<template>
  <div>
    <!-- 标题部分 -->
    <div class="title">
      <span>⬇️ 最热资料 <span class="download-text">(点击下载)</span></span>
    </div> 
    
    <!-- 加载状态组件 -->
    <loadComponent v-if="loading" />
    
    <!-- 数据加载完成后的列表容器 -->
    <div v-else class="list-container">
      <ul class="list">
          <!-- 循环渲染知识列表 -->
          <li v-for="(item, index) in knowledgeList" :key="index">
          <!-- 带样式的序号 -->
          <span class="index" :class="'index-' + (index + 1)">{{ index + 1 }}</span>
          <!-- 可点击的标题，触发下载 -->
          <span class="text" @click="downloadArticle(item.id, item.title)">{{ item.title }}</span>
          <!-- 下载次数显示 -->
          <span class="download">
              <el-icon><Download /></el-icon>{{ item.downloads }}
          </span>
          </li>
      </ul>
    </div>
  </div>
</template>


<script setup>
// 组件逻辑部分
import { Download } from '@element-plus/icons-vue';
import { ref, onMounted } from 'vue';
import API from '../api/axios';
import loadComponent from './LoadComponent.vue';
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit"; // 用于PDF字体处理

// 响应式数据
const knowledgeList = ref([]); // 存储知识列表数据
const loading = ref(true);     // 加载状态控制

// 获取下载量前8的文章
const fetchTopDownloads = async () => {
  try {
    const response = await API.get('/api/articles/downloads/top8');
    knowledgeList.value = response.data;
  } catch (error) {
    console.error('获取最热资料失败：', error);
  } finally {
    loading.value = false; // 无论成功失败都关闭加载状态
  }
};

// 下载文章并生成PDF
const downloadArticle = async (id, title) => {
  try {
    // 获取文章内容
    const response = await API.get(`/api/articles/${id}`);
    const content = response.data.content;

    // 创建PDF文档
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit); // 注册字体处理工具

    // 加载中文字体（需要确保字体文件存在）
    const fontBytes = await fetch('/fonts/NotoSansSC-Regular.otf').then(res => res.arrayBuffer());
    const customFont = await pdfDoc.embedFont(fontBytes);

    // 创建页面并设置初始坐标
    let page = pdfDoc.addPage([595, 842]); // A4尺寸
    const { height } = page.getSize();
    let y = height - 80; // 初始Y坐标

    // 设置字体样式
    page.setFont(customFont);
    page.setFontSize(12);

    // 绘制标题
    page.drawText(title, { x: 40, y: y, size: 16, color: rgb(0, 0, 0) });
    y -= 40; // 调整Y坐标

    // 处理内容换行和分页
    const paragraphs = content.split("\n");
    const lineHeight = 18; // 行高设置
    paragraphs.forEach((paragraph) => {
      // 文本换行处理
      const lines = wrapText(paragraph, customFont, 520, 12);
      lines.forEach((line) => {
        // 页面底部检测（留40边距）
        if (y < 40) {
          page = pdfDoc.addPage([595, 842]); // 创建新页面
          y = height - 40; // 重置Y坐标
        }
        page.drawText(line, { x: 40, y, size: 12, color: rgb(0, 0, 0) });
        y -= lineHeight; // 移动下一行
      });
      y -= lineHeight; // 段落间距
    });

    // 生成并下载PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.pdf`;
    link.click();

    // 更新浏览量和下载量
    await API.put(`/api/articles/views/increment/${id}`);
    await API.put(`/api/articles/downloads/increment/${id}`);
    fetchTopDownloads(); // 刷新列表数据
  } catch (error) {
    console.error('下载文章失败：', error);
  }
};

// 文本换行处理函数
const wrapText = (text, font, maxWidth, fontSize) => {
  const lines = [];
  let line = "";

  // 逐字符计算宽度
  for (const char of text) {
    const width = font.widthOfTextAtSize(line + char, fontSize);
    if (width > maxWidth) {
      lines.push(line); // 超过宽度换行
      line = char;
    } else {
      line += char;
    }
  }

  if (line) lines.push(line);
  return lines;
};

// 组件挂载时获取数据
onMounted(() => {
  fetchTopDownloads();
});
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
  .title .download-text {
    font-size: 14px;
    font-weight: normal;
    color: #3c89db;
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
  