import axios from "axios"; // 引入axios
import store from "../store/index";
import router from "../router/index";

// 环境的切换
if (process.env.NODE_ENV === "development") {
  // if (!store.getters.getIsMock) {
  //   axios.defaults.baseURL = "/api";
  // }
  //axios.defaults.baseURL = "http://188.131.172.171:8080/api";
  axios.defaults.baseURL = "http://ns.zmvision.cn:8080/api";
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "http://188.131.172.171:8080/api";
  //axios.defaults.baseURL = "http://ns.zmvision.cn:8080/api";
} else {
  axios.defaults.baseURL = "http://188.131.172.171:8080/api";
}

// 项目地址加端口
export const base = axios.defaults.baseURL;

// 创建实例
const service = axios.create({
  timeout: 10000
});

let _self = this;
// request拦截器
// Authorization已在各请求体封装，无需再统一声明
service.interceptors.request.use(
  config => {
    //config.headers["Access-Control-Allow-Origin"] = "http://188.131.172.171:8080/api";
    //config.headers["Access-Control-Allow-Methods"] =
    //   "PUT,POST,GET,DELETE";

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
    // res.status = response.status;
    // res.data = response.data;
    res = response;
    return res;
  },
  error => {
    console.log("收到的错误");
    console.log(error.response);
    if (error.response && error.response.status === 403) {
      store.commit("login/reset");
      alert("登录失效，请重新登录！");
      router.push({ path: "/user/login" });
    } else if (error.response && error.response.status === 401) {
      store.commit("login/reset");
      alert("登录失效，请重新登录！");
      router.push({ path: "/user/login" });
    } else if (error.response && error.response.status === 500) {
      store.commit("login/reset");
      alert("登录失效，请重新登录！");
      router.push({ path: "/user/login" });
    }
    // return Promise.reject(error.response);
    return Promise.resolve(error.response);
  }
);

//login
export function login(url, data = {}) {
  //默认配置
  let sendObject = {
    url: url,
    method: "post",
    headers: {},
    data: data
  };
  //sendObject.data=JSON.stringify(data);
  return service(sendObject).catch(() => {});
}

//get方法
export function get(url, data = {}) {
  data.IERealTime = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
  return service({
    url: url,
    method: "get",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Grpc-Metadata-Authorization":
        "Bearer " + store.getters["login/getSessionKey"]
    },
    params: data
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
      "Grpc-Metadata-Authorization":
        "Bearer " + store.getters["login/getSessionKey"]
    },
    data: data
  };
  // sendObject.data=JSON.stringify(data);
  return service(sendObject).catch(() => {});
}

//封装put方法
export function put(url, data = {}) {
  return service({
    url: url,
    method: "put",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Grpc-Metadata-Authorization":
        "Bearer " + store.getters["login/getSessionKey"]
    },
    data: JSON.stringify(data)
  });
}

//删除方法(resfulAPI常用)
export function deletes(url, data = {}) {
  let sendObject = {
    url: url,
    method: "delete",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Grpc-Metadata-Authorization":
        "Bearer " + store.getters["login/getSessionKey"]
    },
    data: JSON.stringify(data)
  };
  // sendObject.data=JSON.stringify(data);
  return service(sendObject).catch(() => {});
}

export function upload(url, data = {}) {
  let sendObject = {
    url: url,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "text/plain",
      "Grpc-Metadata-Authorization":
        "Bearer " + store.getters["login/getSessionKey"]
    },
    data: data
  };

  // sendObject.data=JSON.stringify(data);
  return service(sendObject).catch(() => {});
}
