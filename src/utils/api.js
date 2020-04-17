// 引入 axios 封装方法
import { post, get, put, deletes, login, getLocal } from "./axios";

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
    /* mock
    getServerData: data => {
      return get("/admin/server/data", data);
    },
    getServerById: data => {
      return get("/admin/server/data", data);
    },
    */

    getServerData: data => {
      return get("/network-servers", data);
    },

    getServerDetail: data => {
      return get("/network-servers" + data.extra, data);
    },
    createServer: data => {
      return post("/network-servers", data);
    },
    updateServer: data => {
      return put("/network-servers/" + data.extra, data);
    },
    deleteServer: data => {
      return deletes("/network-servers/" + data.extra, data);
    },

    getMessage: data => {
      return post("/admin/server/message", data);
    },
    //消息
    getMessageDetail: data => {
      return post("/admin/server/message/detail", data);
    },
    deleteMessage: data => {
      return post("/admin/server/message/delete", data);
    }
  },

  serviceProfile: {
    getServices: data => {
      return get("/service-profiles", data);
    },
    createService: data => {
      return post("/service-profiles", data);
    },
    updateServer: data => {
      return put("/network-servers/" + data.extra, data);
    },
    updateService: data => {
      return put("/service-profiles/" + data.extra, data);
    },
    deleteService: data => {
      return deletes("/service-profiles/" + data.extra, data);
    }
  },

  gateway: {
    /* mock
    getGateway: data => {
      return get("/admin/gateway/data", data);
    },
    getGatewayById: data => {
      return get("/admin/gateway/data", data);
    },
    */
    //获取表格数据
    gatewayList: data => {
      return get("/gateways", data);
    },
    gatewayDetail: data => {
      return get("/gateways/" + data.extra, data);
    },
    createGateway: data => {
      return post("/gateways", data);
    },
    updateGateway: data => {
      return put("/gateways/" + data.extra, data);
    },

    deleteGateway: data => {
      return deletes("/gateways/" + data.extra, data);
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
      return post("/nodes", data);
    },
    firstPageNodeData: data => {
      return post("/admin/node/firstData", data);
    },
    nlogFlowData: data => {
      return post("/admin/gateway/nlogFlow/data", data);
    },

    getNode: data => {
      return get("/device-profiles", data);
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
  },
  util: {
    getAreaData: data => {
      return getLocal("../../util/areaData.json");
    }
  }
};
