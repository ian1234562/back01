<template>
  <div class="tags">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      closable
      :disable-transitions="false"
      :effect="route.name === tag.name ? 'dark' : 'plain'"
      @click="handleMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAllStore } from "@/stores";
const store = useAllStore();
const route = useRoute();
const router = useRouter();
const tags = ref(store.state.tags);
const handleMenu = (tag: any) => {
  router.push(tag.name);
  store.selectMenu(tag);
  console.log("tag", tag);
};
//關閉標籤
const handleClose = (tag: any, index: any) => {
  store.removeTags(tag);
  //點擊關閉的tag不是當前頁面 則退出
  if (tag.name !== route.name) return;
  //如果沒有剩餘標籤跳轉首頁
  if (store.state.tags.length === 0) {
    store.selectMenu({ name: "home", path: "/home", label: "首頁" } as any);
    router.push("/home");
    return;
  }
  //如果是最後一個標籤
  if (index === store.state.tags.length) {
    const prevTag = store.state.tags[index - 1];
    store.selectMenu(prevTag);
    router.push(prevTag.path);
  } else {
    const newTag = store.state.tags[index];
    store.selectMenu(newTag);
    router.push(newTag.path);
  }
};
</script>

<style scoped>
.tags {
  margin: 20px 0 0 20px;
}
.el-tag {
  margin-right: 10px;
}
</style>
