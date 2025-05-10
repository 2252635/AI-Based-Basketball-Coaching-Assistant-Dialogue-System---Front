import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // 导入路由配置
import * as ElementPlusIconsVue from '@element-plus/icons-vue' //引入全部 Element Plus 图标
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'//引入中文语言包

const app = createApp(App)

// 注册所有图标组件为全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用 Element Plus，并设置语言为中文
app.use(ElementPlus, {
  locale: zhCn,
})

app.use(router)
app.mount('#app')
  