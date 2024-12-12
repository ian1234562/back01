<template>
  <el-aside :width="width">
    <el-menu
      text-color="#fff"
      background-color="#545c64"
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="activeMenu"
    >
      <h3 v-show="!isCollapse">後台管理系統</h3>
      <h3 v-show="isCollapse">後台</h3>

      <el-menu-item
        v-for="item in noChildren"
        :index="item.path"
        :key="item.path"
        @click="handleMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>

      <el-sub-menu
        v-for="item in hasChildren"
        :index="item.path"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>

        <el-menu-item-group>
          <!-- 遍歷在裡面是因為外圍標籤只是單純包住可查 -->
          <el-menu-item
            v-for="subItem in item.children"
            :index="subItem.path"
            :key="subItem.path"
            @click="handleMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAllStore } from "@/stores";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useAllStore();
//
//根據權限分配
//計算屬性
const list = computed(() => store.state.menuList);
//過濾沒有子項的選單
const noChildren = computed(() => list.value.filter((item) => !item.children));
//過濾有子項的選單
const hasChildren = computed(() => list.value.filter((item) => item.children));
//控制開關
const isCollapse = computed(() => store.state.isCollapse);
//計算側邊欄寬度
const width = computed(() => (store.state.isCollapse ? "64px" : "180px"));
//當前活動的選單項
const activeMenu = computed(() => route.path);
const handleMenu = (item: any) => {
  store.selectMenu(item);
  router.push(item.path);
};
</script>

<style lang="less" scoped>
.icons {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
.el-menu {
  border-right: none;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
.el-aside {
  height: 100vh;
  background-color: #545c64;
}
</style>
