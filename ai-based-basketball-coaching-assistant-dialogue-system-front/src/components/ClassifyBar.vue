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
    QuestionFilled,
    TrendCharts,
    Warning,
    FirstAidKit,
    Food,
  } from '@element-plus/icons-vue'
  import { ref} from 'vue'
  import { useRouter } from 'vue-router' // ✅ 添加这一行

  const router = useRouter() // ✅ 添加这一行

  const activeIndex = ref('');
  const activeMainIndex = ref('')

  const handleSelect = (index) => {
    activeIndex.value = index
    const [mainIndex, subIndex] = index.split('-')
    activeMainIndex.value = mainIndex

    if (subIndex !== undefined) {
      const selectedItem = menuItems[mainIndex]?.children[subIndex]
      if (selectedItem) {
        // ✅ 通过 params 跳转到新页面
        router.push({
          name: 'KnowledgeClass', // 你需要在 router 配置中定义这个 name 的路由
          params: { name: selectedItem }
        })
      }
    }
  }

  const menuItems = [
    {
      label: '篮球运动发展概述',
      icon: QuestionFilled,
      children: [
        '世界篮球发展概述',
        '中国篮球发展概述',
        '世界篮球三人制发展概述',
        '中国篮球三人制发展概述'
      ],
    },
    {
      label: '篮球运动的特点及发展趋势',
      icon: TrendCharts,
      children: [
        '现代篮球运动的特点',
        '现代篮球运动的发展趋势'
      ],
    },
    {
      label: '身体控制和移动技术',
      icon: Position,
      children: [
        '身体控制和移动技术概述',
        '身体控制和移动技术动作',
        '身体控制和移动技术训练方法'
      ],
    },
    {
      label: '运球技术',
      icon: Basketball,
      children: [
        '运球技术概述',
        '运球技术动作',
        '运球技术训练方法'
      ],
    },
    {
      label: '传接球技术',
      icon: Share,
      children: [
        '传、接球技术概述',
        '传、接球技术动作',
        '传、接球技术训练方法'
      ],
    },
    {
      label: '投篮技术',
      icon: Aim,
      children: [
        '投篮技术概述',
        '投篮技术动作',
        '投篮技术训练方法'
      ],
    },
    {
      label: '篮板球技术',
      icon: TakeawayBox,
      children: [
        '篮板球技术概述',
        '篮板球技术动作',
        '篮板球技术训练方法'
      ],
    },
    {
      label: '一对一攻防技术',
      icon: Switch,
      children: [
        '一对一进攻技术概述',
        '一对一进攻技术动作',
        '一对一进攻技术训练方法',
        '一对一防守技术概述',
        '一对一防守技术动作',
        '一对一防守技术训练方法'
      ],
    },
    {
      label: '二对二攻防战术',
      icon: User,
      children: [
        '二对二进攻战术概述',
        '二对二进攻战术配合',
        '二对二进攻战术训练方法',
        '二对二防守战术概述',
        '二对二防守战术配合',
        '二对二防守战术训练方法'
      ],
    },
    {
      label: '三对三攻防战术',
      icon: UserFilled,
      children: [
        '三对三进攻战术概述',
        '三对三进攻战术配合',
        '三对三进攻战术训练方法',
        '三对三防守战术概述',
        '三对三防守战术配合',
        '三对三防守战术训练方法'
      ],
    },
    {
      label: '运动损伤概论',
      icon: Warning,
      children: [
        '运动损伤的基本概念',
        '运动损伤的原因',
        '运动损伤的分类'
      ],
    },
    {
      label: '常见的篮球运动损伤及其处理',
      icon: FirstAidKit,
      children: [
        '篮球运动不同位置球员常见损伤',
        '开放性损伤及其处理',
        '闭合性损伤及其处理',
        '篮球运动损伤的预防'
      ],
    },
    {
      label: '篮球运动的营养需求与补充策略',
      icon: Food,
      children: [
        '篮球运动的能量与营养需求',
        '篮球运动的营养补充策略'
      ],
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

 
  