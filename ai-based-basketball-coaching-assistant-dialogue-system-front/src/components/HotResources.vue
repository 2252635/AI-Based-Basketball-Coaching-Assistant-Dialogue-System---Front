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
  import { Download } from '@element-plus/icons-vue';
  import { ref, onMounted } from 'vue';
  import API from '../api/axios';
  import { PDFDocument, rgb } from "pdf-lib";
  import fontkit from "@pdf-lib/fontkit"; // 引入fontkit以支持自定义字体

  const knowledgeList = ref([]);

  const fetchTopDownloads = async () => {
    try {
      const response = await API.get('/api/articles/downloads/top8');
      knowledgeList.value = response.data;
    } catch (error) {
      console.error('获取最热资料失败：', error);
    }
  };

  const downloadArticle = async (id, title) => {
    try {
      const response = await API.get(`/api/articles/${id}`);
      const content = response.data.content;

      const pdfDoc = await PDFDocument.create();
      pdfDoc.registerFontkit(fontkit);

      const fontBytes = await fetch('/fonts/NotoSansSC-Regular.otf').then(res => res.arrayBuffer()); // 替换为你的字体路径
      const customFont = await pdfDoc.embedFont(fontBytes);

      let page = pdfDoc.addPage([595, 842]);
      const { height } = page.getSize();
      let y = height - 80;

      page.setFont(customFont);
      page.setFontSize(12);

      page.drawText(title, { x: 40, y: y, size: 16, color: rgb(0, 0, 0) });
      y -= 40;

      const paragraphs = content.split("\n");
      const lineHeight = 18;
      paragraphs.forEach((paragraph) => {
        const lines = wrapText(paragraph, customFont, 520, 12);
        lines.forEach((line) => {
          if (y < 40) {
            page = pdfDoc.addPage([595, 842]);
            y = height - 40;
          }
          page.drawText(line, { x: 40, y, size: 12, color: rgb(0, 0, 0) });
          y -= lineHeight;
        });
        y -= lineHeight;
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${title}.pdf`;
      link.click();

      await API.put(`/api/articles/views/increment/${id}`);
      await API.put(`/api/articles/downloads/increment/${id}`);
      fetchTopDownloads();
    } catch (error) {
      console.error('下载文章失败：', error);
    }
  };

  const wrapText = (text, font, maxWidth, fontSize) => {
    const lines = [];
    let line = "";

    for (const char of text) {
      const width = font.widthOfTextAtSize(line + char, fontSize);
      if (width > maxWidth) {
        lines.push(line);
        line = char;
      } else {
        line += char;
      }
    }

    if (line) lines.push(line);
    return lines;
  };

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
  