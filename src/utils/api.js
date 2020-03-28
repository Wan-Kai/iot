// 引入 axios 封装方法
import { post } from "./axios";

export default {
  login: {
    login: data => {
      return post("/admin/login", data);
    }
  },
  interServer: {
    getServerData: data => {
      return post("/admin/server/data", data);
    },
    getMessage: data => {
      return post("/admin/server/message", data);
    },
    getCheckData: data => {
      return post("/admin/server/check", data);
    },

    //消息
    getMessageDetail: data => {
      return post("/admin/server/message/detail", data);
    },
    deleteMessage: data => {
      return post("/admin/server/message/delete", data);
    }
  },
  gateway: {
    //获取表格数据
    gatewayData: data => {
      return post("/admin/gateway/data", data);
    },
    gatewayDetailData: data => {
      return post("/api/gateways", data);
    },
    ilogFlowData: data => {
      return post("/admin/gateway/ilogFlow/data", data);
    },
    gatewayMap: data => {
      return post("/admin/gateway/gatewayMap/data", data);
    }
  },
  node: {
    nodeData: data => {
      return post("/admin/node/data", data);
    },
    nodeDetailData: data => {
      return post("/api/nodes", data);
    },
    firstPageNodeData: data => {
      return post("/admin/node/firstData", data);
    },
    nlogFlowData: data => {
      return post("/admin/gateway/nlogFlow/data", data);
    }
  },
  appManage: {
    appData: data => {
      return post("/admin/app/data", data);
    },
    appDetailData: data => {
      return post("/admin/app/details", data);
    },
    getAppDetail: data => {
      return post("/admin/app/detail", data);
    },
    appNodeData: data => {
      return post("/admin/app/nodeData", data);
    }
  },
  usersManage: {
    usersData: data => {
      return post("/admin/users/data", data);
    }
  }
};
