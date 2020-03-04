// 引入 axios 封装方法
import { post } from "./axios";

export default {
  login: {
    login: data => {
      return post("/admin/login", data);
    }
  },
  interServer: {
    // 发送登录信息
    getServerData: data => {
      return post("/admin/server/data", data);
    },
    getMessage: data => {
      return post("/admin/server/message", data);
    }
  }
};
