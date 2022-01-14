<template>
  <div>
    <div>User</div>
    <div>1231231231</div>
    <el-input v-model="input" placeholder="Please input" />
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "User",
  setup() {
    const input = ref("");
    return { input };
  },
};
</script>