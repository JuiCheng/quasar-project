import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { useTokenStore } from 'stores/useTokenStore';
import { storeToRefs } from 'pinia';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// // for each client)

// axios.create:
// baseURL: 設定基本 URL，這樣你在發送請求時只需指定相對 URL。
// timeout: 設定請求超時的時間，單位是毫秒。
// headers: 設定 HTTP 請求的標頭。你可以在這裡添加任意多的標頭。
// headers:
// Authorization: 用於設置 Bearer Token 或其他身份驗證信息。
// Content-Type: 指定請求體的 MIME 類型，常見的有 application/json、application/x-www-form-urlencoded 等。
// Accept: 指定客戶端接受的內容類型。
// X-Custom-Header: 自定義的標頭，可以用於攜帶應用程序特定的信息。
const api = axios.create({
  baseURL: 'https://api.example1.com',
});

// 設置請求攔截器來動態設置 Authorization 標頭
api.interceptors.request.use(
  (config) => {
    const store = useTokenStore();
    const { Token } = storeToRefs(store);
    if (Token) {
      config.headers.Authorization = `Bearer ${Token.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
