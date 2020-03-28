import axios from "axios"; // 引入axios
import store from "../store/index";

// 环境的切换
if (process.env.NODE_ENV === "development") {
  //TODO
  axios.defaults.baseURL = "";
} else if (process.env.NODE_ENV === "debug") {
  axios.defaults.baseURL = "";
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "";
}

// 项目地址加端口
export const base = axios.defaults.baseURL;

// 创建实例
const service = axios.create({
  timeout: 10000
});

// request拦截器
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);
// response 拦截器
service.interceptors.response.use(
  response => {
    let res = {};
    res.status = response.status;
    res.data = response.data;
    return res;
  },
  error => {
    if (error.response && error.response.status === 404) {
      this.$router.push({ path: "/404" });
    } else if (error.response && error.response.status === 403) {
      this.$store.commit("login/reset");
      alert("登录失效，请重新登录！");
      this.$router.push({ path: "/user/login" });
    }
    return Promise.reject(error.response);
  }
);

//get方法
export function get(url, data = {}) {
  data.IERealTime = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
  return service({
    url: url,
    method: "get",
    headers: {
      Authorization: store.getters.getAttr("sessionKey")
    },
    data: data
  });
}

//封装post请求
export function post(url, data = {}) {
  //默认配置
  let sendObject = {
    url: url,
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: store.getters.getAttr("sessionKey")
    },
    data: data
  };
  // sendObject.data=JSON.stringify(data);
  return service(sendObject);
}

//封装put方法
export function put(url, data = {}) {
  return service({
    url: url,
    method: "put",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: store.getters.getAttr("sessionKey")
    },
    data: JSON.stringify(data)
  });
}

//删除方法(resfulAPI常用)
export function deletes(url) {
  return service({
    url: url,
    method: "delete",
    headers: {
      Authorization: store.getters.getAttr("sessionKey")
    }
  });
}
