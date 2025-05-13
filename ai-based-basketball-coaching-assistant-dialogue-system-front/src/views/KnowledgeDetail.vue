<template>
  <div class="page-background">
    <TopBar />
    <div class="article-container">
      <div class="go-back" @click="goBack">
        <el-icon class="back-icon"><ArrowLeft /></el-icon>
        <span class="back-text">返回</span>
      </div>
      <div class="content-area">
        <h2>{{ articleTitle }}</h2>

        <!-- 轮播图区域 -->
        <div class="image-carousel" v-if="images.length > 0">
          <el-carousel indicator-position="outside" arrow="always">
            <el-carousel-item v-for="(pair, index) in imagePairs" :key="index">
              <div class="image-row">
                <div
                  class="image-box"
                  v-for="(img, idx) in pair"
                  :key="idx"
                >
                  <img
                    :src="img.imageUrl"
                    class="carousel-image"
                    @error="handleImageError"
                  />
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 视频播放区域 -->
        <div class="video-section" v-if="videos.length > 0">
          <h3>相关教学视频</h3>
          <div class="video-list">
            <div class="video-card" v-for="(video, index) in videos" :key="index">
              <iframe
                class="video-iframe"
                :src="transformBilibiliUrl(video.videoUrl)"
                frameborder="0"
                allowfullscreen
              ></iframe>
              <p class="video-description">{{ video.description }}</p>
            </div>
          </div>
        </div>

        <!-- 正文内容 -->
        <div class="article-content">
          <p v-for="(paragraph, index) in paragraphs" :key="index" v-html="paragraph"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopBar from '../components/TopBar.vue';
import { ArrowLeft } from '@element-plus/icons-vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import API from '../api/axios';

const route = useRoute();
const router = useRouter();

const articleTitle = ref("");
const content = ref("");
const fullItem = ref(null);
const images = ref([]);
const videos = ref([]);

// 分组：每两个图为一组，奇数时补空图
const imagePairs = computed(() => {
  const paddedImages = [...images.value];
  if (paddedImages.length % 2 !== 0) {
    paddedImages.push({ imageUrl: "https://via.placeholder.com/300x300?text=空白" });
  }
  const pairs = [];
  for (let i = 0; i < paddedImages.length; i += 2) {
    pairs.push(paddedImages.slice(i, i + 2));
  }
  return pairs;
});

// 高亮关键词处理
const paragraphs = computed(() => {
  const keyword = route.query.keyword?.trim();
  const targetContent = fullItem.value?.content || content.value;

  if (!targetContent || !keyword) {
    return targetContent?.split("\n").filter(p => p.trim() !== "") || [];
  }

  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedKeyword})`, 'gi');

  return targetContent
    .split('\n')
    .filter(p => p.trim() !== '')
    .map(p => p.replace(regex, '<span style="color: red">$1</span>'));
});

const fetchArticleContent = async () => {
  try {
    const rawId = route.params.id;
    const parts = rawId.split('-');

    const chapterId = parts[0];
    const sectionId = parts.slice(0, 2).join('-');
    const subsectionId = rawId;

    const response = await API.get('/api/content', {
      params: {
        chapterId,
        sectionId,
        subsectionId
      }
    });

    fullItem.value = response.data;
    content.value = response.data.textContent;
    articleTitle.value = response.data.subsectionName;

    if (Array.isArray(response.data.images)) {
      images.value = response.data.images.map(img => ({ imageUrl: img.imageUrl }));
    }

    if (Array.isArray(response.data.videos)) {
      videos.value = response.data.videos;
    }

  } catch (error) {
    console.error("获取文章内容失败：", error);
  }
};

onMounted(() => {
  if (route.state?.item) {
    fullItem.value = route.state.item;
    articleTitle.value = route.state.item.subsectionName;
    content.value = route.state.item.content;
  } else {
    fetchArticleContent();
  }
});

const goBack = () => {
  router.back()
};

const handleImageError = (event) => {
  event.target.src = "https://via.placeholder.com/300x300?text=加载失败";
};

// 转换 Bilibili 短链为 iframe 嵌入链接
const transformBilibiliUrl = (shortUrl) => {
  const bvMatch = shortUrl.match(/\/(BV\w+)/i);
  if (bvMatch) {
    return `https://player.bilibili.com/player.html?bvid=${bvMatch[1]}&page=1`;
  }
  return shortUrl;
};
</script>

<style scoped>
.page-background {
  background-color: #f8fafc;
  min-height: 100vh;
}

.article-container {
  max-width: 1400px;  /* 增大容器宽度 */
  margin: 30px auto;
  padding: 40px 60px;  /* 增加内边距 */
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.content-area {
  margin-top: 30px;
  padding-right: 15px;
}

h2 {
  font-size: 2.2rem;  /* 使用rem单位 */
  margin-bottom: 2.5rem;
  color: #1a1a1a;
  text-align: center;
  position: relative;
  padding-bottom: 1.2rem;
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
}

.article-content {
  font-size: 1.1rem;
  line-height: 1.9;
  margin: 3rem 0;
  color: #4b5563;
  max-width: 900px;
  margin: 0 auto;  /* 内容区居中 */
}

.article-content p {
  margin: 1.5rem 0;
  text-indent: 2em;
}

/* 图片轮播优化 */
.image-carousel {
  margin: 4rem 0;
  border-radius: 16px;
  overflow: visible;  /* 显示完整阴影 */
}

:deep(.el-carousel) {
  --el-carousel-indicator-width: 30px;
  --el-carousel-indicator-height: 4px;
}

.image-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  padding: 2rem;
}

.image-box {
  flex: 1;
  max-width: 600px;  /* 控制最大宽度 */
  min-width: 400px;  /* 保证最小宽度 */
  background-color: #f3f4f6;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.image-box:hover {
  transform: translateY(-5px);
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;  /* 完整显示图片 */
  padding: 1rem;
}

/* 视频区域优化 */
.video-section {
  margin: 5rem 0;
}

.video-section h3 {
  font-size: 1.8rem;
  margin-bottom: 2.5rem;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.video-section h3::before {
  content: '';
  display: block;
  width: 24px;
  height: 24px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%233b82f6"><path d="M18.54 9.88L7.88 3.46C6.72 2.79 5.28 2.79 4.12 3.46C2.93 4.15 2 5.8 2 7.21v9.58c0 1.41.93 3.06 2.12 3.75c1.16.67 2.6.67 3.76 0l10.66-6.42c1.16-.67 1.16-2.56 0-3.24zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5z"/></svg>');
}

.video-list {
  display: grid;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

.video-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.video-card:hover {
  transform: translateY(-3px);
}

.video-iframe {
  width: 100%;
  height: 500px;  /* 增大视频高度 */
  border: none;
  border-radius: 12px 12px 0 0;
}

.video-description {
  padding: 1.5rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #475569;
  background: #f8fafc;
  margin: 0;
}

/* 响应式调整 */
@media (max-width: 1600px) {
  .article-container {
    max-width: 90%;
  }
}

@media (max-width: 1200px) {
  .image-box {
    max-width: 500px;
    min-width: 350px;
  }
}

@media (max-width: 992px) {
  .article-container {
    padding: 30px;
  }
  
  .image-row {
    flex-direction: column;
    gap: 2rem;
  }
  
  .image-box {
    max-width: 100%;
    min-width: auto;
  }
  
  .video-iframe {
    height: 400px;
  }
}

@media (max-width: 768px) {
  h2 {
    font-size: 1.8rem;
  }
  
  .article-content {
    font-size: 1rem;
  }
  
  .video-iframe {
    height: 300px;
  }
  
  .video-section h3 {
    font-size: 1.5rem;
  }
}

/* 滚动条美化 */
.content-area::-webkit-scrollbar {
  width: 8px;
}

.content-area::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.5);
  border-radius: 4px;
}

.content-area::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.content-area::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.go-back {
  /* 保持原有返回按钮样式不变 */
}
</style>