// 引入 axios 封装方法
import { post, get, put, deletes, login } from "./axios";

export default {
  login: {
    login: data => {
      return login("/internal/login", data);
    }
  },
  index: {
    mapMarkers: data => {
      return get("/index/mapMarkers", data);
    },
    message: data => {
      return get("/index/message", data);
    }
  },
  interServer: {
    getServerData: data => {
      return get("/network-servers", data);
    },
    getMessage: data => {
      return post("/admin/server/message", data);
    },
    getCheckData: data => {
      return get("/network-servers" + data.extra, data);
    },
    //消息
    getMessageDetail: data => {
      return post("/admin/server/message/detail", data);
    },
    deleteMessage: data => {
      return post("/admin/server/message/delete", data);
    },

    getServer: data => {
      return get("/admin/server/data", data);
    },
    getServerById: data => {
      return get("/admin/server/data", data);
    },
    updateServer: data => {
      return put("/network-servers/" + data.extra, data);
    },
    creatServer: data => {
      return post("/network-servers", data);
    },
    deleteServer: data => {
      return deletes("/network-servers/" + data.extra, data);
    }
  },
  gateway: {
    //获取表格数据
    gatewayData: data => {
      return get("/gateways", data);
    },
    gatewayDetailData: data => {
      return get("/gateways/" + data.extra, data);
    },
    ilogFlowData: data => {
      return post("/admin/gateway/ilogFlow/data", data);
    },
    gatewayMap: data => {
      return post("/admin/gateway/gatewayMap/data", data);
    },

    getGateway: data => {
      return get("/admin/gateway/data", data);
    },
    getGatewayById: data => {
      return get("/admin/gateway/data", data);
    },
    updateGateway: data => {
      return put("/gateways/" + data.extra, data);
    },
    creatGateway: data => {
      return post("/gateways", data);
    },
    deleteGateway: data => {
      return deletes("/gateways/" + data.extra, data);
    }
  },
  node: {
    nodeData: data => {
      return post("/admin/node/data", data);
    },
    nodeDetailData: data => {
      return post("/nodes", data);
    },
    firstPageNodeData: data => {
      return post("/admin/node/firstData", data);
    },
    nlogFlowData: data => {
      return post("/admin/gateway/nlogFlow/data", data);
    },

    getNode: data => {
      return get("/admin/node/data", data);
    },
    getNodeById: data => {
      return get("/admin/node/data", data);
    },
    updateNode: data => {
      return put("/admin/node/data", data);
    },
    creatNode: data => {
      return post("/admin/node/data", data);
    },
    deleteNode: data => {
      return deletes("/admin/node/data", data);
    }
  },
  appManage: {
    appData: data => {
      return get("/api/applications", data);
    },
    updateAppData: data => {
      return put("/api/applications", data);
    },
    appDetailData: data => {
      return post("/admin/app/details", data);
    },
    appAdd: data => {
      return post("/api/applications", data);
    },
    getAppDetail: data => {
      return post("/admin/app/detail", data);
    },
    appNodeData: data => {
      return post("/admin/app/nodeData", data);
    },
    deleteApp: data => {
      return deletes("/admin/app/delete", data);
    }
  },
  usersManage: {
    usersData: data => {
      return post("/admin/users/data", data);
    }
  }
};
