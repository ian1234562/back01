<template>
  <div class="body-login">
    <el-form :model="loginForm" class="login-container">
      <h1>歡迎登錄</h1>
      <el-form-item>
        <el-input
          type="input"
          placeholder="請輸入帳號"
          v-model="loginForm.username"
          clearable
        ></el-input> </el-form-item
      ><el-form-item>
        <el-input
          type="password"
          placeholder="請輸入密碼"
          v-model="loginForm.password"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin" class="button"
          >登入</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, getCurrentInstance } from "vue";
import { useAllStore } from "@/stores";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const store = useAllStore();
const router = useRouter();
const loginForm = reactive({
  username: "",
  password: "",
});
const instance = getCurrentInstance();
if (!instance) {
  throw new Error("組件實例不存在");
}
// const { proxy } = getCurrentInstance();
const handleLogin = async () => {
  if (!loginForm.username || !loginForm.password) {
    ElMessage.error("請輸入帳號或密碼");
  }
  const res = await (instance.proxy as any).$api.getMenu(loginForm);
  console.log("login", res);
  //拿到菜單之後顯示
  store.updateMenuList(res.menuList);
  store.state.token = res.token;
  store.addMenu(router);
  router.push("/home");
};
</script>

<style scoped lang="scss">
.body-login {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/image/back.jpg");
  background-size: 100%;
  overflow: hidden;
  filter: grayscale(40%);
}
.login-container {
  width: 600px;
  height: 300px;
  background-color: #ffffffc6;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;
  margin: 200px auto;
  h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 26px;
  }
  :deep(.el-form-item__content) {
    justify-content: center;
  }
  .button {
    width: 100px;
    height: 35px;
    margin-top: 20px;
  }
}
</style>
