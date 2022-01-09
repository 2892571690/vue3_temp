<template>
  <el-select @change="handleChange">
    <el-option label="中文" value="zh"></el-option>
    <el-option label="英文" value="en"></el-option>
  </el-select>
  <el-button type="primary">{{ $t("select") }}</el-button>
  <el-date-picker type="date"> </el-date-picker>
</template>
<script>
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
export default {
  setup() {
    const { locale } = useI18n();
    const store = useStore();
    const handleChange = (value) => {
      localStorage.setItem("locale", value);
      store.commit("user/SET_LOCALE", value);
      locale.value = value;
    };

    return { handleChange };
  },
};
</script>
