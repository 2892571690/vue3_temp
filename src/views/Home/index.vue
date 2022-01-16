<template>
  <div>
    <el-button @click="logout">退出</el-button>
    <el-button type="primary">Primary</el-button>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "Home",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    // 退出
    const logout = () => {
      store.dispatch("user/logout").then(() => {
        // ElMessage({ message: '退出登录成功', type: 'success' })
        // record the back point
        // proxy.$router.push(`/login?redirect=${proxy.$route.fullPath}`)
        //此处reload清空路由和重置部分状态
        location.reload();
      });
    };

    return { logout };
  },
};
</script>
