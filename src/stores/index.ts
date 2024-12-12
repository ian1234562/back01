import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type { Router, RouteRecordRaw } from "vue-router";

interface MenuItem {
  path: string;
  name: string;
  label: string;
  icon: string;
  component?: any;
  url?: string;
  children?: MenuItem[];
}

interface State {
  isCollapse: boolean;
  tags: MenuItem[];
  currentMenu: string;
  menuList: MenuItem[];
  token: string;
  routerList: any[];
}

export const useAllStore = defineStore("all", () => {
  function initState(): State {
    return {
      isCollapse: false,
      tags: [
        {
          path: "/home",
          name: "home",
          label: "首頁",
          icon: "home",
        },
      ],
      currentMenu: "",
      menuList: [],
      token: "",
      routerList: [],
    };
  }
  const state = ref(initState());
  //監聽狀態變化並保存到 localStorage
  watch(
    state,
    (newState) => {
      if (!newState.token) return;
      localStorage.setItem("store", JSON.stringify(newState));
    },
    { deep: true }
  );
  //查找標籤
  function selectMenu(val: MenuItem) {
    try {
      if (val.name === "home" || val.name === "0") {
        state.value.currentMenu = "home";
        return;
      }
      //當前菜單
      state.value.currentMenu = val.name;
      //檢查標籤是否存在
      const isTag = state.value.tags.some((item) => item.name === val.name);
      //如果標籤不存在
      if (!isTag) {
        state.value.tags.push(val);
      }
    } catch (error) {
      console.error("處理菜單失敗：", error);
    }
  }
  //移除標籤
  function removeTags(tag: MenuItem) {
    //查找要移除的標籤
    try {
      const index = state.value.tags.findIndex(
        (item) => item.name === tag.name
      );
      if (index !== -1) {
        state.value.tags.splice(index, 1);
      }
      //如果沒標籤設置為首頁
      if (state.value.tags.length === 0) {
        state.value.currentMenu = "home";
        return { name: "home", path: "/", label: "首頁" };
      }
      // 如果刪除的是當前選中的標籤，則需要選擇新的活動標籤
      if (tag.name === state.value.currentMenu) {
        const newIndex = Math.max(0, index - 1);
        const newTags = state.value.tags[newIndex];
        state.value.currentMenu = newTags.name;
        return newTags;
      }
    } catch (error) {
      console.error("移除標籤失敗:", error);
    }
  }

  function updateMenuList(val: MenuItem[]) {
    state.value.menuList = val;
  }

  // 添加動態路由
  function addMenu(router: Router, type?: "refresh") {
    //存在local
    if (type === "refresh") {
      const savedState = localStorage.getItem("store");
      if (savedState) {
        state.value = JSON.parse(savedState);
        state.value.routerList = [];
      } else {
        return;
      }
    }
    // 獲取選單列表
    const menu = state.value.menuList;
    // 動態導入所有 Vue 組件
    const modules = import.meta.glob("../viewsPage/**/*.vue");
    // 存儲路由配置的數組
    const routerArr: RouteRecordRaw[] = [];

    //處理菜單項
    const processMenuItem = (item: MenuItem) => {
      const url = `../viewsPage/${item.url}.vue`;
      //檢查組建存不存在
      if (!modules[url]) {
        console.log(`找不到組件:${url}`);
        return;
      }
      item.component = modules[url];
    };

    // 遍歷選單並處理路由
    menu.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          processMenuItem(child);
          routerArr.push(...(item.children as RouteRecordRaw[]));
        });
      } else {
        processMenuItem(item);
        routerArr.push(item as RouteRecordRaw);
      }
    });
    cleanArr(router); //清除舊戶路由
    addArr(router, routerArr); //添加新路由
  }
  /*
方法help
*/
  //清除現有路由
  function cleanArr(router: Router): void {
    state.value.routerList = [];
    router.getRoutes().forEach((route) => {
      if (
        route.name &&
        typeof route.name === "string" &&
        //保護這2個不被清除
        !["main", "login"].includes(route.name)
      ) {
        router.removeRoute(route.name);
      }
    });
  }
  //添加現有用戶
  function addArr(router: Router, routes: RouteRecordRaw[]) {
    routes.forEach((route) => {
      if (!route.name) {
        console.warn("路由缺少name屬性:", route.path);
        return;
      }
      try {
        const result = router.addRoute("main", route);
        state.value.routerList.push(result);
      } catch (error) {
        console.error(`添加路由失敗:${String(route.name)}`, error);
      }
    });
  }

  //個人退出
  function clean(router: Router) {
    // 清理路由
    // cleanRoutes(router);
    router.getRoutes().forEach((route) => {
      if (
        route.name &&
        typeof route.name === "string" &&
        //保護這2個不被清除
        !["main", "login"].includes(route.name)
      ) {
        router.removeRoute(route.name);
      }
    });
    // state.value.routerList.forEach((item) => {
    //   if (item) item();
    // });
    // 重置狀態
    state.value = initState();
    // 清除 token
    localStorage.removeItem("token");
    localStorage.removeItem("state");
  }

  const activeTag = computed(() => {
    return (
      state.value.tags.find((tag) => tag.name === state.value.currentMenu) ||
      state.value.tags[0]
    );
  });

  return {
    state,
    selectMenu,
    removeTags,
    updateMenuList,
    clean,
    addMenu,
    activeTag,
  };
});
