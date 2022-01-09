<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script>
import { ElConfigProvider } from "element-plus";
import { useStore } from "vuex";
import { ref, watch } from "vue";

import zh from "element-plus/lib/locale/lang/zh-cn";
import en from "element-plus/lib/locale/lang/en";
export default {
  components: {
    ElConfigProvider,
  },
  setup() {
    const store = useStore();
    let locale = ref()

    watch(()=>store.state.user.locale,(newValue, oldValue)=>{
      locale.value = newValue === 'zh' ? zh : en;
    },{immediate:true})

    return {
      locale,
    };
  },
};
</script>
