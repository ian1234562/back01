// 首先定義環境類型
type EnvType = "development" | "test" | "prod";

// 定義配置項接口
interface EnvConfig {
  baseApi: string;
  mockApi: string;
}

// 定義完整配置接口
interface Config {
  development: EnvConfig;
  test: EnvConfig;
  prod: EnvConfig;
}

// 環境配置
const EnvConfig: Config = {
  development: {
    baseApi: "/api",
    mockApi:
      "https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api",
  },
  test: {
    baseApi: "//test.future.com/api",
    mockApi:
      "https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api",
  },
  prod: {
    baseApi: "//future.com/api",
    mockApi:
      "https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api",
  },
};

// 獲取環境變量
const env = (import.meta.env.MODE || "development") as EnvType;

export default {
  env,
  mock: false,
  namespace: "manager",
  ...EnvConfig[env], // 現在這裡不會有類型錯誤
};
