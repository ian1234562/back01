/// <reference types="vite/client" />
// declare module '*.vue' {

//      import type { DefineComponent } from 'vue';

//      const vueComponent: DefineComponent<{}, {}, any>;

//      export default vueComponent;

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<object, object, any>;
  export default component;
}
