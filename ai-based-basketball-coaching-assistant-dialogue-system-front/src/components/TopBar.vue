<template>
  <el-container>
    <el-header class="top-header">
      <div class="logo">
        <img src="@/assets/book.png" alt="logo" class="logo-img" />
        <span class="logo-text">知识库</span>
        <div class="logo-divider"></div>
      </div>
      <el-menu
        mode="horizontal"
        :default-active="activeMenu"
        router
        class="top-menu"
        background-color="#000"
        text-color="#bbb"
        active-text-color="#fff"
      >
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/chat">ai对话</el-menu-item>
      </el-menu>
      <!-- 右侧登出按钮 -->
      <div class="logout-btn-wrapper">
        <el-button type="danger" size="small" @click="handleLogout">登出</el-button>
      </div>
    </el-header>
  </el-container>
</template>
  
<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const activeMenu = ref(route.path);

// 监听 route.path 的变化
watch(() => route.path, (newPath) => {
  activeMenu.value = newPath;
});
// 登出操作
const handleLogout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('userID');
  router.push('/') // 跳转到登录页
}
</script>

<style scoped>
.top-header {
  background-color: #000;
  display: flex;
  align-items: center;
  height: 54px;
  padding: 0px 16px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 39px;
  height: 39px;
  margin-right: 17px;
}

.logo-text {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.logo-divider {
  width: 1px;
  height: 39px;
  background-color: #ccc;
  margin-left: 20px;
}

.top-menu {
  flex: 1;
  height: 50px;
  border-bottom: none !important;
}

.top-menu ::v-deep(.el-menu-item) {
  font-size: 18px;
  line-height: 50px; 
}

.top-menu ::v-deep(.el-menu-item.is-active) {
  color: #fff !important;
  font-weight: bold;
  border-bottom: 2px solid #fff;
}

.logout-btn-wrapper {
  margin-left: auto;
}

.logout-btn-wrapper .el-button {
  margin-left: 20px;
  background-color: #f56c6c;
  color: white;
  border: none;
}
</style>
