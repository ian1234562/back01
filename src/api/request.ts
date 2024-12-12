//二次封裝
import axios from "axios";
//獲取錯誤提示
import { ElMessage } from "element-plus";
import config from "@/config";

//添加一個實例
const service = axios.create({
  baseURL: config.baseApi,
});
// const NETWORK_ERROR = "網路錯誤";

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器 請求之後
service.interceptors.response.use((res) => {
  console.log("res:", res);
  const { code, data } = res.data;
  console.log("res.data:", res.data);
  if (code === 200) {
    return data;
  } else {
    ElMessage.error(res.data.data.message);
    return Promise.reject(res.data.data.message);
  }
});

//這裡的options是api.js 調用時傳過來的參數
// 寫方法 暴露給外部使用; 就是使用這方法的參數 會變成service傳出去
function request(options: any) {
  // {
  //   url: `/home/getUserData`,
  //   method: "get",
  //   //可以為參數params
  //   data,
  // }
  console.log("options:", options);
  //如果有這方法 默認賦值 get請求
  // options.method = options.method || "get";
  // 關於get請求參數調整
  // if (options.method.toLowerCase() === "get") {
  //統一為data
  // options.params = options.data;
  // }
  //mock開關處裡
  let isMock = config.mock;
  if (typeof options.mock !== "undefined") {
    isMock = options.mock;
  }

  //如果為線上環境
  if (config.env === "prod") {
    //不用mock
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }

  //再透過service把option傳出去
  return service(options);
}
export default request;
