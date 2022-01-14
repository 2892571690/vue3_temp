import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入相关插件
import ElementPlus from 'element-plus'
import dayjs from "dayjs";
import i18n from '@/i18n';

// dayjs引入中文
import "dayjs/locale/zh-cn";

// 引入样式
import 'element-plus/dist/index.css'
import '@/styles/index.scss'

dayjs.locale("zh-cn"); // 改变dayjs全局语言

// 引入相关文件
import './permission';
import settings from './settings'

const app = createApp(App)

// 添加原型方法
app.config.globalProperties.$dayjs = dayjs;

app.use(store)
app.use(router)
app.use(ElementPlus, {
    size: localStorage.getItem('size') || settings.defaultSize,
})
app.use(i18n)
app.mount('#app')

// 引入icons
import SvgIcon from '@/components/SvgIcon'// svg component
// svg-icon自动录入
app.component('svg-icon', SvgIcon)
const req = require.context('@/assets/icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
