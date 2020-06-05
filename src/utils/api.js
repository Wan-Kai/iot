// 引入 axios 封装方法
import { post, get, put, deletes, login, upload } from "./axios";
import common from "./common";
import areaData from "../../public/util/areaData.json";

export default {
  login: {
    login: data => {
      return login("/internal/login", data);
    },

    register: data => {
      var temp = {
        password: data.password,
        user: {
          username: data.username,
          email: data.email,
          phonenumber: data.phonenumber,
          isActive: data.isAdmin,
          isAdmin: data.isAdmin,
          note: data.note //电话号码
        }
      };
      return login("/wildusers", temp);
    },

    getProfile: data => {
      return get("/internal/profile", data);
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
  networkServer: {
    getServerData: data => {
      return get("/network-servers", data);
    },

    getServerDetail: data => {
      return get("/network-servers/" + data.extra, data);
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

    //get data of network server from mock
    /* mock
    getServerData: data => {
      return get("/admin/server/data", data);
    },
    getServerById: data => {
      return get("/admin/server/data", data);
    },
    */

    //get data of message from mock
    getMessage: data => {
      return post("/admin/server/message", data);
    },

    getMessageDetail: data => {
      return post("/admin/server/message/detail", data);
    },
    deleteMessage: data => {
      return post("/admin/server/message/delete", data);
    }
  },

  serviceProfile: {
    getServices: data => {
      if (!data.organizationID || common.isEmpty(data.organizationID)) {
        data.organizationID = common.getCurrentOrganizationID();
      }

      return get("/service-profiles", data);
    },
    createService: data => {
      return post("/service-profiles", data);
    },
    updateService: data => {
      return put("/service-profiles/" + data.extra, data);
    },
    getService: data => {
      return get("/service-profiles/" + data.extra, data);
    },
    deleteService: data => {
      return deletes("/service-profiles/" + data.extra, data);
    }
  },

  organization: {
    getOrganizations: data => {
      return get("/organizations", data);
    },
    createOrganization: data => {
      return post("/organizations", data);
    },
    updateOrganization: data => {
      return put("/organizations/" + data.extra, data);
    },
    getOrganization: data => {
      return get("/organizations/" + data.extra, data);
    },
    deleteOrganization: data => {
      return deletes("/organizations/" + data.extra, data);
    },

    //添加一个已经存在的用户，主要用于将当前用户添加至新建的组织机构中
    addUser: data => {
      return post("/organizations/" + data.extra + "/users", data);
    }
  },

  gateway: {
    getGatewayCount: data => {
      var param = {
        organizationID: common.getCurrentOrganizationID()
      };
      if (data && !common.isEmpty(data.organizationID)) {
        param.organizationID = data.organizationID;
      }
      return get("/gateways", param);
    },

    //获取表格数据
    gatewayList: data => {
      if (!data.organizationID || common.isEmpty(data.organizationID)) {
        data.organizationID = common.getCurrentOrganizationID();
      }
      return get("/gateways", data);
    },
    gatewayDetail: data => {
      return get("/gateways/" + data.extra);
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

    statGateway: data => {
      if (!data.interval || common.isEmpty(data.interval)) {
        data.interval = "hour";
      }

      if (!data.startTimestamp || common.isEmpty(data.startTimestamp)) {
        data.startTimestamp = common.getBeginTimestamp(new Date());
      } else {
        data.startTimestamp = common.getBeginTimestamp(
          common.getDateFromStr(data.startTimestamp)
        );
      }
      if (!data.endTimestamp || common.isEmpty(data.endTimestamp)) {
        data.endTimestamp = common.getEndTimestamp(new Date());
      } else {
        data.endTimestamp = common.getEndTimestamp(
          common.getDateFromStr(data.endTimestamp)
        );
      }
      console.log(data);
      return get("/gateways/" + data.extra + "/stats", data);
    },

    //get data from mock
    ilogFlowData: data => {
      return post("/admin/gateway/ilogFlow/data", data);
    },
    gatewayMap: data => {
      return post("/admin/gateway/gatewayMap/data", data);
    }
  },
  node: {
    getDeviceProfile: data => {
      if (!data.organizationID || common.isEmpty(data.organizationID)) {
        data.organizationID = common.getCurrentOrganizationID();
      }
      return get("/device-profiles", data);
    },

    getDeviceProfileAndDevice: data => {
      if (!data.OrganizationID || common.isEmpty(data.OrganizationID)) {
        data.OrganizationID = common.getCurrentOrganizationID();
      }
      return get("/DPsandDevs", data);
    },

    getDeviceProfileById: data => {
      return get("/device-profiles/" + data.extra, data);
    },

    getNodeCount: data => {
      var param = {
        organizationID: common.getCurrentOrganizationID()
      };
      if (data && !common.isEmpty(data.organizationID)) {
        param.organizationID = data.organizationID;
      }
      return get("/devices", param);
    },

    updateNode: data => {
      return put("/device-profiles/" + data.extra, data);
    },
    createNode: data => {
      return post("/device-profiles", data);
    },
    deleteNode: data => {
      return deletes("/device-profiles/" + data.extra, data);
    },

    //get data of node from mock
    nodeData: data => {
      return post("/admin/nodes/data", data);
    },
    nodeDetailData: data => {
      return post("/admin/node/data", data);
    },
    firstPageNodeData: data => {
      return get("/admin/node/firstData", data);
    },

    upFlowData: data => {
      return post("/admin/node/upFlowData/data", data);
    },

    //上行数据查询
    upDataQuery: data => {
      if (!data.startTimestamp || common.isEmpty(data.startTimestamp)) {
        data.startTimestamp = common.getBeginTimestamp(new Date());
      } else {
        data.startTimestamp = common.getBeginTimestamp(
          common.getDateFromStr(data.startTimestamp)
        );
      }
      if (!data.endTimestamp || common.isEmpty(data.endTimestamp)) {
        data.endTimestamp = common.getEndTimestamp(new Date());
      } else {
        data.endTimestamp = common.getEndTimestamp(
          common.getDateFromStr(data.endTimestamp)
        );
      }

      return get("/Devdata", data);
    },

    //下行数据查询
    downDataQuery: data => {
      return get("/devices/" + data.extra + "/queue", data);
    },

    //下发数据
    downDataSend: data => {
      return post("/devices/" + data.extra + "/queue", data);
    }
  },
  appManage: {
    getAppCount: data => {
      var param = {
        organizationID: common.getCurrentOrganizationID()
      };
      if (data && !common.isEmpty(data.organizationID)) {
        param.organizationID = data.organizationID;
      }
      return get("/applications", param);
    },

    getAppList: data => {
      if (!data.organizationID || common.isEmpty(data.organizationID)) {
        data.organizationID = common.getCurrentOrganizationID();
      }
      return get("/applications", data);
    },
    getAppDetail: data => {
      return get("/applications/" + data.extra, data);
    },
    createApp: data => {
      return post("/applications", data);
    },

    updateApp: data => {
      return put("/applications/" + data.extra, data);
    },

    deleteApp: data => {
      return deletes("/applications/" + data.extra, data);
    },

    getNodeInApp: data => {
      return get("/devices", data);
    },

    getAppNodeDetail: data => {
      return get("/devices/" + data.extra, data);
    },

    createAppNode: data => {
      return post("/devices", data);
    },

    updateAppNode: data => {
      return put("/devices/" + data.extra, data);
    },
    deleteAppNode: data => {
      return deletes("/devices/" + data.extra, data);
    },

    //获取节点的keys
    getNodeKey: data => {
      return get("/devices/" + data.extra + "/keys", data);
    },

    //创建节点的keys
    createModeKey: data => {
      return post("/devices/" + data.extra + "/keys", data);
    },

    //更新节点的keys
    updateModeKey: data => {
      return put("/devices/" + data.extra + "/keys", data);
    },

    //删除节点的keys
    deleteNodeKey: data => {
      return deletes("/devices/" + data.extra + "/keys", data);
    },

    //数据转发地址
    getAppDataTranspond: data => {
      return get("/applications/" + data.extra + "/integrations/http", data);
    },
    creatAppDataTranspond: data => {
      return post("/applications/" + data.extra + "/integrations/http", data);
    },
    updateAppDataTranspond: data => {
      return put("/applications/" + data.extra + "/integrations/http", data);
    },

    //上传
    uploadNode: data => {
      return upload("/upload", data);
    }
  },
  usersManage: {
    //查询当前组织机构的用户
    getOrganizationUsers: data => {
      if (!data.organizationID || common.isEmpty(data.organizationID)) {
        data.organizationID = common.getCurrentOrganizationID();
      }
      return get("/organizations/" + data.organizationID + "/users", data);
    },

    //查询用户详细信息
    getUserDetail: data => {
      return get("/users/" + data.extra, data);
    },

    //添加用户的同时，添加到当前组织机构中
    addUser: data => {
      if (!data.organizationID || common.isEmpty(data.organizationID)) {
        data.organizationID = common.getCurrentOrganizationID();
      }

      var temp = {
        organizations: [
          {
            isAdmin: data.isAdmin,
            isDeviceAdmin: data.isAdmin,
            isGatewayAdmin: data.isAdmin,
            organizationID: data.organizationID
          }
        ],
        password: data.password,
        user: {
          username: data.username,
          email: data.email,
          phonenumber: data.phonenumber,
          isActive: data.isAdmin,
          isAdmin: data.isAdmin,
          note: data.note //电话号码
        }
      };

      return post("/users", temp);
    },

    //在删除用户的同时，会自动删除组织机构中的用户
    deleteUser: data => {
      return deletes("/users/" + data.extra, data);
    },

    //更新用户信息
    updateUser: data => {
      return put("/users/" + data.extra, data);
    },

    //更新用户密码
    updatePassword: data => {
      return put("/users/" + data.extra + "/password", data);
    },

    //get data of user from mock
    usersData: data => {
      return post("/admin/users/data", data);
    }
  },
  util: {
    // getAreaData: data => {
    //   return getLocal("../../util/areaData.json");
    // }
    getAreaData: data => {
      return areaData;
    }
  }
};
