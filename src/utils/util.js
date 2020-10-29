import store from "../store/index";
import options from "../store/modules/options";
import api from "./api";
import common from "./common";

export function getPhoneNumber() {
  return store.getters["retrieve/getPhoneNumber"];
}

export function getRetrieveNote() {
  return store.getters["retrieve/getRetrieveNote"];
}

export function getStep2State() {
  return store.getters["retrieve/getStep2State"];
}

//初始化个人及所关联的组织机构信息
export function initProfile(sessionKey) {
  //debugger;
  store.commit("login/setSessionKey", sessionKey);
  //sessionStorage.setItem("current_session",sessionKey);

  let organizations;
  api.login
    .getProfile()
    .then(res => {
      debugger;
      let user = res.data.user;
      store.commit("login/setCurrentUser", user);

      organizations = res.data.organizations;
      store.commit("login/setCurrentOrganizationList", organizations);
    })
    .catch(err => {
      //bugger;
      console.log(err);
    })
    .finally(() => {
      //initOrganizations();
      initNetworkServers();
      initServiceOptions();
    });
}

export function initOrganizations() {
  //获取所有的组织机构

  api.organization
    .getOrganizations({
      limit: 100
    })
    .then(res => {
      //debugger;
      let getData = res.data.result;

      //仅显示在有权限的组织机构
      let currentOrganizations =
        store.getters["login/getCurrentOrganizationList"];
    })
    .catch(err => {
      //debugger;
      console.log(err);
    });
}

export function initDevProfileServices() {
  var parameter = {
    limit: 200
  };
  api.node
    .getDeviceProfile(parameter)
    .then(res => {
      let getData = res.data.result;

      let DevProfileServices = [];
      for (let i = 0; i < getData.length; i++) {
        let temp = {
          createdAt: "",
          id: "",
          name: "",
          networkServerID: "",
          organizationID: "",
          updatedAt: ""
        };
        temp.id = getData[i].id;
        temp.name = getData[i].name;
        temp.value = getData[i].id;
        temp.label = getData[i].name;
        temp.createdAt = getData[i].createdAt;
        temp.networkServerID = getData[i].networkServerID;
        temp.organizationID = getData[i].organizationID;
        temp.updatedAt = getData[i].updatedAt;
        DevProfileServices.push(temp);
      }
      store.commit(
        "options/setDeviceProfileService_options",
        DevProfileServices
      );

      console.log("initDevProfileServices");
    })
    .catch(err => {
      console.log(err);
    });
}

export function getDeviceProfile_options() {
  return store.getters["options/getDeviceProfile_options"];
}

export function getOrganizationNameById(id) {
  let organizations = store.getters["login/getCurrentOrganizationList"];
  for (let i = 0; i < organizations.length; i++) {
    if (organizations[i].organizationID === id) {
      return organizations[i].organizationName;
    }
  }

  return "";
}

export function initNetworkServers() {
  //debugger

  api.networkServer
    .getServerData({
      limit: 100
    })
    .then(res => {
      let getData = res.data.result;
      let netServerData = [];
      for (let i = 0; i < getData.length; i++) {
        let temp = {
          server: "",
          id: "",
          name: ""
        };
        temp.server = getData[i].server;
        temp.id = getData[i].id;
        temp.name = getData[i].name;
        netServerData.push(temp);
      }
      store.commit("options/setNetworkServers", netServerData);

      console.log("initNetworkServers");
    })
    .catch(err => {
      console.log(err);
    });
}

export function getNetworkServerOptions() {
  return store.getters["options/getNetworkServerOptions"];
}

export function getNetworkServerIdByServer(server) {
  let netServer = store.getters["options/getNetworkServers"];
  for (let i = 0; i < netServer.length; i++) {
    if (netServer[i].server === server) {
      return netServer[i].id;
    }
  }
  return null;
}

export function getNetworkServerById(id) {
  //return store.getters.getNetworkServerById(id);
  let netServer = store.getters["options/getNetworkServers"];
  for (let i = 0; i < netServer.length; i++) {
    if (netServer[i].id === id) {
      return netServer[i].server;
    }
  }
  return null;
}

export function getNetworkServerNameById(id) {
  //debugger
  let netServer = store.getters["options/getNetworkServers"];
  //console.log(netServer);
  for (let i = 0; i < netServer.length; i++) {
    if (netServer[i].id === id) {
      return netServer[i].name;
    }
  }
  return null;
}

export function getArea() {
  return store.getters["options/getAreaOptions"];
}

export function getCommunicationMode_options() {
  return store.getters["options/getCommunicationMode_options"];
}

export function getBand_options() {
  return store.getters["options/getBand_options"];
}

export function getAreaLabel(province, city, district) {
  let area = store.getters["options/getAreaOptions"];
  for (let i = 0; i < area.length; i++) {
    if (area[i].value === province) {
      for (let j = 0; j < area[i].children.length; j++) {
        if (area[i].children[j].value === city) {
          for (let k = 0; k < area[i].children[j].children.length; k++) {
            if (area[i].children[j].children[k].value === district) {
              return (
                area[i].label +
                "/" +
                area[i].children[j].label +
                "/" +
                area[i].children[j].children[k].label
              );
            }
          }
        }
      }
    }
  }

  return "";
}

export function initServiceOptions() {
  var parameter = {
    limit: 200
  };
  api.serviceProfile
    .getServices(parameter)
    .then(res => {
      let result = res.data.result;

      let options = [];
      for (let i = 0; i < result.length; i++) {
        let temp = {
          networkServerID: "",
          id: "",
          name: ""
        };
        temp.networkServerID = result[i].networkServerID;
        temp.id = result[i].id;
        temp.name = result[i].name;
        options.push(temp);
      }
      store.commit("options/setServices", options);

      console.log("initServiceOptions");
    })
    .catch(err => {
      console.log(err);
    });
}

export function getServiceOptions() {
  return store.getters["options/getServiceOptions"];
}

export function getProfessionOptions() {
  return store.getters["options/getProfessionOptions"];
}

export function setSessionKey(sessionKey) {
  store.commit("login/setSessionKey", sessionKey);
}

export function setPhoneNumber(phoneNumber) {
  store.commit("retrieve/setPhoneNumber", {
    phoneNumber: phoneNumber
  });
}

export function setNote(note) {
  store.commit("retrieve/setNote", {
    note: note
  });
}

export function setOldPassword(pre_password) {
  store.commit("retrieve/setOldPassword", {
    oldPassword: pre_password
  });
}

export function setNewPassword(now_password) {
  store.commit("retrieve/setNewPassword", {
    newPassword: now_password
  });
}

export function setConfirmPassword(confirm_password) {
  store.commit("retrieve/setConfirmPassword", {
    confirmPassword: confirm_password
  });
}

export function resetData() {
  store.commit("retrieve/resetData", {});
}

export function setArea(area_options) {
  store.commit("options/setAreaOptions", area_options);
}

export function setNetServer(netServerData) {
  store.commit("options/setNetworkServers", netServerData);
}
