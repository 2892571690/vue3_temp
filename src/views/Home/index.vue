<template>
  <el-button @click="logout">退出</el-button>
</template>
<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  name:'Home',
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    // 退出
    const logout = () => {
      store.dispatch("user/logout").then(() => {
        router.push(`/login?redirect=${route.fullPath}`);
      });
    };

    return { logout };
  },
};
</script>
