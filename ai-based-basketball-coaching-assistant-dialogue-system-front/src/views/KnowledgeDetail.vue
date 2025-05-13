<template>
    <div class="knowledge-detail-container">
      <div class="detail-header">
        <button class="back-button" @click="goBack">← 返回</button>
        <h1 class="chapter-name">{{ detailData.chapterName }}</h1>
      </div>
      
      <div class="detail-content">
        <div class="section-info">
          <h2 class="section-name">{{ detailData.sectionName }}</h2>
          <h3 class="subsection-name" v-html="highlightedSubsectionName"></h3>
        </div>
        
        <div class="content-body" v-html="highlightedContent"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        detailData: {
          id: '',
          chapterName: '',
          sectionName: '',
          subsectionName: '',
          content: ''
        }
      };
    },
    computed: {
      highlightedSubsectionName() {
        return this.highlightText(this.detailData.subsectionName);
      },
      highlightedContent() {
        return this.highlightText(this.detailData.content);
      }
    },
    methods: {
      async fetchDetail() {
        try {
          const response = await axios.get(`/api/knowledge/${this.$route.params.id}`);
          this.detailData = response.data;
        } catch (error) {
          console.error('获取详情失败:', error);
        }
      },
      highlightText(text) {
        const keyword = this.$route.query.keyword;
        if (!text || !keyword) return text;
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedKeyword})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
      },
      goBack() {
        this.$router.go(-1);
      }
    },
    created() {
      this.fetchDetail();
    }
  };
  </script>
  
  <style scoped>
  .knowledge-detail-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 30px 20px;
  }
  
  .detail-header {
    margin-bottom: 30px;
    position: relative;
  }
  
  .back-button {
    background: none;
    border: none;
    color: #3498db;
    font-size: 16px;
    cursor: pointer;
    padding: 5px 10px;
    margin-bottom: 15px;
  }
  
  .back-button:hover {
    text-decoration: underline;
  }
  
  .chapter-name {
    font-size: 28px;
    color: #2c3e50;
    margin: 0;
  }
  
  .section-info {
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
  }
  
  .section-name {
    font-size: 22px;
    color: #34495e;
    margin-bottom: 10px;
  }
  
  .subsection-name {
    font-size: 18px;
    color: #7f8c8d;
    margin: 0;
  }
  
  .content-body {
    line-height: 1.8;
    font-size: 16px;
    color: #333;
    white-space: pre-line;
  }
  
  .highlight {
    color: #e74c3c;
    font-weight: bold;
    background-color: #fff9c4;
    padding: 0 2px;
    border-radius: 3px;
  }
  </style>