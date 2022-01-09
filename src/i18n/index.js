//引入vue-i18n组件
import { createI18n, useI18n } from 'vue-i18n'
import store from '@/store';

// 引入语言
import zh from './config/zh'
import en from './config/en'
const i18n = createI18n({
  globalInjection: true, // 全局注册 $t方法
  locale: store.state.user.locale || 'zh', // set locale
  messages: {
    zh,
    en
  },
})

export default i18n
