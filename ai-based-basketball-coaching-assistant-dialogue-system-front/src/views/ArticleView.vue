<template>
    <div class="page-background">
    <TopBar />
      <!-- 显示加载中组件 -->
       <loadComponent v-if="loading" />
       <div v-else class="article-container">
        <div class="go-back" @click="goBack">
        <el-icon class="back-icon"><ArrowLeft /></el-icon>
        <span class="back-text">返回</span>
        </div>
        <div class="content-area">
        <h2>{{ articleTitle }}</h2>
        <div class="article-content">
            <p v-for="(paragraph, index) in paragraphs" :key="index">{{ paragraph }}</p>
        </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import TopBar from '../components/TopBar.vue';
import loadComponent from '../components/LoadComponent.vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import API from '../api/axios';

const route = useRoute();
const router = useRouter();
const articleId = route.params.id; // 从路由参数获取文章id
const articleTitle = ref("");
const paragraphs = ref([]);
const loading = ref(true);

const fetchArticleContent = async () => {
  try {
    const response = await API.get(`/api/articles/${articleId}`);
    articleTitle.value = response.data.title;
    paragraphs.value = response.data.content.split("\n").filter((p) => p.trim() !== "");
  } catch (error) {
    console.error("获取文章内容失败：", error);
  } finally {
    loading.value = false; // 数据加载完成后，设置 loading 为 false
  }
};

const goBack = () => {
  router.push("/home");
};

onMounted(() => {
  fetchArticleContent();
});
</script>

<style scoped>
.page-background {
  background-color: #f0f0f0;
  height: 100vh;
}
.article-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.go-back {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  background-color: #fbfbfb;
  border-radius: 8px;
}

.go-back:hover {
  background-color: #ebebeb;
}

.back-icon {
  font-size: 20px;
  color: black;
  margin-right: 6px;
}

.back-text {
  font-size: 16px;
  color: #333;
}

.content-area {
  margin-top: 40px;
  text-align: justify;
  line-height: 1.6;
  max-height: 750px;
  overflow-y: auto;
  padding-right: 8px;
}

h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.article-content {
  font-size: 16px;
  font-family: 'Songti-SC', serif;
  white-space: pre-line; 
}
</style>
