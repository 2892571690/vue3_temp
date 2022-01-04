<template>
  <el-button type="primary" @click="handleLogin">登录</el-button>
</template>

<script>
export default {
  name: "Login",
  setup() {
    const handleLogin = () => {
      console.log('登录');
    };

    return { handleLogin };
  },
};
</script>