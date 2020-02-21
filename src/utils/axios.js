import axios from "axios"; // 引入axios

// 项目地址加端口
export const base = axios.defaults.baseURL;

// 创建实例
const service = axios.create({
  timeout: 10000
});

//封装post请求
export function post(url, data = {}) {
  //默认配置
  let sendObject = {
    url: url,
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    data: data
  };
  // sendObject.data=JSON.stringify(data);
  return service(sendObject);
}
