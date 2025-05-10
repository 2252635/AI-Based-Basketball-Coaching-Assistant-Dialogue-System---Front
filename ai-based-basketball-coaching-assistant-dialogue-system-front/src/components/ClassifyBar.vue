<template>
  <div class="classify-bar">
    <div class="title">全部分类</div>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#fff"
      text-color="#333"
      active-text-color="#ccc"
      :default-active="activeIndex"
      :unique-opened="true"
      @select="handleSelect"
    >
      <el-sub-menu
        v-for="(item, index) in menuItems"
        :key="index"
        :index="String(index)"
        :class="{ 'active-submenu': activeMainIndex === String(index) }"
      >
        <template #title>
          <el-icon :size="16">
            <component :is="item.icon" />
          </el-icon>
          <span class="menu-label">{{ item.label }}</span>
        </template>

        <!-- 子分类项 -->
        <el-menu-item
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          :index="`${index}-${subIndex}`"
        >
          {{ subItem }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

  
  <script setup>
  import {
  Position,
  Basketball,
  Share,
  Aim,
  TakeawayBox,
  Switch,
  User,
  UserFilled,
  } from '@element-plus/icons-vue'
  import { ref} from 'vue'

  const activeIndex = ref('');
  const activeMainIndex = ref('')

  const handleSelect = (index) => {
  activeIndex.value = index
  activeMainIndex.value = index.split('-')[0] // 取子菜单所属的主菜单 index
}

  const menuItems = [
    {
      label: '身体控制和移动技术',
      icon: Position,
      children: ['基本姿势', '跑步姿势', '起跑/落地姿势', '急停姿势','转身','防守移动'],
    },
    {
      label: '运球技术',
      icon: Basketball,
      children: ['直线运球', '变向运球'],
    },
    {
      label: '传接球技术',
      icon: Share,
      children: ['传球技术', '接球技术'],
    },
    {
      label: '投篮技术',
      icon: Aim,
      children: ['原地投篮', '行进间投篮'],
    },
    {
      label: '篮板球技术',
      icon: TakeawayBox,
      children: ['基础原则', '基本姿势2'],
    },
    {
      label: '一对一攻防战术',
      icon: Switch,
      children: ['进攻', '防守'],
    },
    {
      label: '二对二攻防战术',
      icon: User,
      children: ['进攻', '防守'],
    },
    {
      label: '三对三攻防战术',
      icon: UserFilled,
      children: ['进攻', '防守'],
    },
  ]

  </script>
  
  <style scoped>
.classify-bar {
  width: 290px;
  height: 770px;
  background-color: #fff;
  padding: 13px;
  border-radius: 6px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.menu-label {
  margin-left: 8px;
}

::v-deep(.el-menu-item) {
  height: 46px;
  background-color: #f6f6f6;
  color: #333;
  font-size: 15px;
  border-radius: 2px;
  transition: all 0.1s ease;
}

::v-deep(.el-menu-item:hover) {
  background-color: #eaeaea;
  color: #333;
}

::v-deep(.el-menu-item.is-active) {
  background-color: #e6f7ff;
  color: #2D8CF0; 
  border-right: 3px solid #2D8CF0;
}

::v-deep(.el-sub-menu__title:hover) {
  background-color: #fff;
  color: inherit;
}

::v-deep(.active-submenu > .el-sub-menu__title) {
  color: #2D8CF0 !important;
}
</style>

 
  