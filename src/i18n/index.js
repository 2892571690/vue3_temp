import Vue from 'vue';
import VueI18n from 'vue-i18n';
// import ElementLocale from 'element-ui/lib/locale';
// 引入各个语言配置文件
import zh from './config/zh';
import en from './config/en';
Vue.use(VueI18n);
// 创建vue-i18n实例i18n
const i18n = new VueI18n({
  // 设置默认语言
  locale: localStorage.getItem('locale') || 'zh', // 语言标识
  messages: {
    zh,
    en,
  },
})
// ElementLocale.i18n((key, value) => i18n.t(key, value))
// 暴露i18n
export default i18n;
