import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
// import "@unocss/reset/tailwind.css"
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import App from "./App.vue";
import router from "./router";
//為了動態路由
import { useAllStore } from "@/stores";

//截取api network就不會顯示
import "@/api/mock.js";

//全局註冊
import api from "@/api/api";
const app = createApp(App);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
//全局掛載
app.config.globalProperties.$api = api;
app.use(createPinia());
const store = useAllStore();
store.addMenu(router, "refresh");
app.use(router);
app.mount("#app");
