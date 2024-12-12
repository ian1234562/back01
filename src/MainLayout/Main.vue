<template>
  <div>
    <el-container>
      <!-- 自定義左側組件 -->
      <CommonAside />
      <el-container>
        <el-header class="el-header">
          <CommonHeader />
        </el-header>
        <CommonTab />
        <el-main class="right-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import CommonAside from "@/MainLayout/CommonAside.vue";
import CommonHeader from "@/MainLayout/CommonHeader.vue";
import CommonTab from "@/MainLayout/CommonTab.vue";
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
}
</style>
