<template>
  <div class="header">
    <div class="l-content">
      <el-button size="small" @click="handleCollapse">
        <!-- <component class="icons" v-bind:is="menu"></component> -->
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link"
          ><img :src="getImageUrl()" class="user"
        /></span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>個人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
// import Image from "@/assets/user.jpeg";
import { useAllStore } from "@/stores";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useAllStore();
//獲取頭像
const getImageUrl = () => {
  return new URL(`../assets/user.jpeg`, import.meta.url).href;
};
//側邊選遠單收縮
const handleCollapse = () => {
  store.state.isCollapse = !store.state.isCollapse;
};
//處理登出
const handleLoginOut = async () => {
  try {
    store.clean(router);
    await router.push("/login");
  } catch (error) {
    console.error("登出失敗:", error);
  }
};
onMounted(() => {
  console.log(getImageUrl());
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}
.icons {
  width: 20px;
  height: 20px;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}

.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
:deep(.bread span) {
  color: #fff !important;
  cursor: pointer !important;
}
</style>
