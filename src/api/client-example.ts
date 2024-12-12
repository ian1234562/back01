// // import { authSession } from "@/utils/auth";
// import axios, {
//   AxiosError,
//   type AxiosErrorData,
//   type AxiosInstance,
//   type AxiosResponse,
// } from "axios";
// import MockAdapter from "axios-mock-adapter";
// import Qs from "qs";

// export interface Identifiable {
//   id: number;
// }

// export interface Auditable {
//   createdAt: string;
//   updatedAt?: string;
// }

// export interface QueryString<T> {
//   take: number;
//   skip: number;
//   orderby?: keyof T;
//   sortby?: "ASC" | "DESC";
// }

// export interface DataList<T> {
//   total: number;
//   data: T[];
//   items: T[];
// }

// export interface PaginationOptions {
//   page: number;
//   sortBy?: "asc" | "desc";
//   descending?: boolean;
//   rowsPerPage: number;
//   rowsNumber: number;
//   total?: number;
//   take?: number;
// }

// class ApiClient {
//   private service: AxiosInstance;
//   private mockAdapter: MockAdapter | undefined;
//   constructor(baseUrl?: string, options?: { mock?: boolean }) {
//     this.service = axios.create({
//       baseURL: baseUrl ?? import.meta.env.V_API_BASE_URL, // 根據實際情況調整
//       withCredentials: false,
//       timeout: 10000,
//       paramsSerializer: (params) =>
//         Qs.stringify(params, { arrayFormat: "comma" }) || "",
//     });
//     //     const params = [
//     //       "abc",

//     //       "aaa",
//     //       "bbb",
//     //     ];
//     // https://abc.com/api/v1/users?name=abc,aaa,bbb,ccc
//     // https://abc.com/api/v1/users?name=abc&name=aaa&name=bbb&name=ccc
//     // https://abc.com/api/v1/users?name=[]abc,aaa,bbb,ccc

//     if (options?.mock) {
//       this.mockAdapter = new MockAdapter(this.service, { delayResponse: 60 });
//     }

//     this.initializeRequestInterceptor();
//     this.initializeResponseInterceptor();
//   }

//   private initializeRequestInterceptor() {
//     this.service.interceptors.request.use(
//       (config) => {
//         // const { setGlobalLoading } = useAppStore()
//         // setGlobalLoading(true)

//         if (config.headers) {
//           // config.headers['Content-Type'] = 'application/json;charset=utf-8'
//           // const token = authSession.getId();
//           // if (token) {
//           //   config.headers["Authorization"] = `Bearer ${token}`;
//           // }
//         }
//         return config;
//       },
//       (error: AxiosError) => {
//         return Promise.reject(error);
//       }
//     );
//   }

//   private initializeResponseInterceptor() {
//     this.service.interceptors.response.use(
//       (response: AxiosResponse) => {
//         return response.data;
//       },
//       async (error: AxiosError<AxiosErrorData>) => {
//         if (error.response?.status === 500) {
//           const axiosNetworkErr = new AxiosError(
//             error.message,
//             error.code,
//             error.config,
//             error.request,
//             {
//               ...error.response,
//               data: {
//                 message: "Network Error",
//                 code: 500,
//                 error: undefined,
//               },
//             } as AxiosResponse<AxiosErrorData>
//           );
//           return Promise.reject(axiosNetworkErr);
//         }

//         return Promise.reject(error);
//       }
//     );
//   }

//   public client() {
//     return this.service;
//   }
// }

// export const userService = new ApiClient("https://xxxxx.com/users/v1", {
//   mock: true,
// });
// export const walletService = new ApiClient("https://xxxxx.com/wallet/v1");
// export const otcService = new ApiClient("https://xxxxx.com/otc/v1");
// export const otcServiceUrl = "https://xxxxx.com/otc/v1";

// export const deeplxService = new ApiClient("https://xxxxx.com/deeplx/v2");
