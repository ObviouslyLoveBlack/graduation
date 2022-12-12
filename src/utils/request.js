import axios from "axios";
import storage from "store";
import router from '@/router/index'
import { VueAxios } from "./axios";

const {ACCESS_TOKEN} ='=access-token'

// 创建axios实例
const request = axios.create({
    baseURL:process.env.VUE_APP_API_BASE_URL,
    timeout:60000
})

/* 请求拦截器 */
request.interceptors.request.use(
  (config) => {
    const token = storage.get(ACCESS_TOKEN);
    //如果token存在，就携带自定义的token
    if (token) {
      config.headers.Authorization = "Bear" + token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err).catch(() => {});
  }
);
/* 响应拦截器 */
request.interceptors.response.use(
  (response) => {
    if (response && response.status === 200) {
      return response.data;
    } else {
      return Promise.reject(response.data.msg).catch(() => {
        router.push({ path: "/" });
      });
    }
  },
  (error) => {
    return Promise.reject(error).catch(() => {});
  }
);

const installer = {
    vm: {},
    install (Vue) {
      Vue.use(VueAxios, request)
    }
  }
  
  export default request
  
  export {
    installer as VueAxios,
    request as axios
  }