<template>
  <el-button type="primary" @click="handleLogin">登录</el-button>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();
    // 登陆
    const handleLogin = () => {
      store
        .dispatch("user/login", {
          userName: "admin",
          passWord: 123456,
        })
        .then((res) => {
          router.replace({ path: "/" });
        });
    };

    return { handleLogin };
  },
};
</script>
