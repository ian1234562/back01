import Mock from "mockjs";
import homeApi from "./mockData/home";
import userApi from "./mockData/user";
import menuApi from "./mockData/permission";
//讓攔截的接口和假數據聯通
// 函數的參數內容 1 攔截路徑寫  2方法  3製造的假數據
//還要在main.ts裡面引用
Mock.mock("/api/home/getTableData", "get", homeApi.getTableData);
Mock.mock("/api/home/getCountData", "get", homeApi.getCountData);
Mock.mock("/api/home/getChartData", "get", homeApi.getChartData);
Mock.mock("/api/user/getUserData", "get", userApi.getUserList);
Mock.mock("/api/user/deleteUser", "get", userApi.deleteUser);
Mock.mock("/api/user/addUser", "post", userApi.createUser);
Mock.mock("/api/user/editUser", "post", userApi.updateUser);
Mock.mock("/api/permission/getMenu", "post", menuApi.getMenu);
