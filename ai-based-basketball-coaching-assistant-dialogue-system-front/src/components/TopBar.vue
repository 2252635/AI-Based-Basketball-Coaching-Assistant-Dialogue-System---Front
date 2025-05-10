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
        <el-menu-item index="/library">知识库</el-menu-item>
        <el-menu-item index="/person">个人中心</el-menu-item>
        <el-menu-item index="/chat">ai对话</el-menu-item>
      </el-menu>
    </el-header>
  </el-container>
</template>
  
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute();
const activeMenu = ref(route.path);

// 监听 route.path 的变化
watch(() => route.path, (newPath) => {
  activeMenu.value = newPath;
});
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
</style>
