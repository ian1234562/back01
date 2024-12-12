import Mock from "mockjs";

interface MenuItem {
  path: string;
  name?: string;
  label: string;
  icon: string;
  url?: string;
  children?: MenuItem[];
}

interface UserConfig {
  password: string;
  menuList: MenuItem[];
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  code: number;
  data: {
    menuList?: MenuItem[];
    token?: string;
    message: string;
  };
}
// 定義用戶配置
const userConfigs: Record<string, UserConfig> = {
  admin: {
    password: "admin",
    menuList: [
      {
        path: "/home",
        name: "home",
        label: "首頁",
        icon: "house",
        url: "Home",
      },
      {
        path: "/mall",
        name: "mall",
        label: "商品管理",
        icon: "video-play",
        url: "Mall",
      },
      {
        path: "/user",
        name: "user",
        label: "用戶管理",
        icon: "user",
        // TODO url要跟views的名稱一樣 包含大小寫
        // URL
        url: "User",
      },
      {
        path: "/other",

        label: "其他",
        icon: "location",
        children: [
          {
            path: "/page1",
            name: "page1",
            label: "頁面1",
            icon: "setting",
            url: "page1",
          },
          {
            path: "/page2",
            name: "page2",
            label: "頁面2",
            icon: "setting",
            url: "page2",
          },
        ],
      },
    ],
  },
  ian: {
    password: "ian",
    menuList: [
      {
        path: "/home",
        name: "home",
        label: "首頁",
        icon: "house",
        url: "Home",
      },
      {
        path: "/user",
        name: "user",
        label: "用戶管理",
        icon: "user",
        url: "User",
      },
    ],
  },
  frank: {
    password: "frank",
    menuList: [
      {
        path: "/home",
        name: "home",
        label: "首頁",
        icon: "house",
        url: "Home",
      },
      {
        path: "/user",
        name: "user",
        label: "用戶管理",
        icon: "user",
        url: "User",
      },
    ],
  },
  wilson: {
    password: "wilson",
    menuList: [
      {
        path: "/home",
        name: "home",
        label: "首頁",
        icon: "house",
        url: "Home",
      },
      {
        path: "/user",
        name: "user",
        label: "用戶管理",
        icon: "user",
        url: "User",
      },
    ],
  },
};

export default {
  getMenu: (config: { body: string }): LoginResponse => {
    try {
      console.log("config", config);
      const { username, password } = JSON.parse(config.body) as LoginRequest;

      // 檢查用戶是否存在
      const userConfig = userConfigs[username];
      if (!userConfig) {
        return {
          code: -999,
          data: {
            message: "用戶不存在",
          },
        };
      }

      // 驗證密碼
      if (userConfig.password === password) {
        return {
          code: 200,
          data: {
            menuList: userConfig.menuList,
            token: Mock.Random.guid(),
            message: "獲取成功",
          },
        };
      } else {
        return {
          code: -999,
          data: {
            message: "密碼錯誤",
          },
        };
      }
    } catch (error: any) {
      console.log("Login error", error);
      return {
        code: -500,
        data: {
          message: "伺服器內部出錯",
        },
      };
    }
  },
};
