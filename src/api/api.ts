//整個項目api統一管理  要全局掛載 每個組件都會使用
import request from "./request";

//請求首頁左側的數據
export default {
  getTableData() {
    //把請求丟進二次包裝
    return request({
      url: "/home/getTableData",
      method: "get",
    });
  },
  getCountData() {
    return request({
      url: "/home/getCountData",
      method: "get",
    });
  },
  getChartData() {
    return request({
      url: "/home/getChartData",
      method: "get",
    });
  },
  //搜索用戶並獲的用戶
  getUserData(data: any) {
    return request({
      url: "/user/getUserData",
      method: "get",
      //可以為參數params
      data,
    });
  },
  deleteUser(data: any) {
    return request({
      url: "/user/deleteUser",
      method: "get",
      data,
    });
  },
  addUser(data: any) {
    return request({
      url: "/user/addUser",
      method: "post",
      data,
    });
  },
  editUser(data: any) {
    return request({
      url: "/user/editUser",
      method: "post",
      data,
    });
  },
  getMenu(data: any) {
    return request({
      url: "/permission/getMenu",
      method: "post",
      data,
    });
  },
};
