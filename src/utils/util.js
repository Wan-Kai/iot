import store from "../store/index";
import api from "./api";
import options from "../store/modules/options";

export function getPhoneNumber() {
  return store.getters["retrieve/getPhoneNumber"];
}

export function getRetrieveNote() {
  return store.getters["retrieve/getRetrieveNote"];
}

export function getStep2State() {
  return store.getters["retrieve/getStep2State"];
}

export function initOrganizations() {
  api.organization
    .getOrganizations({
      limit: 100
    })
    .then(res => {
      debugger;
      let getData = res.data.result;

      let organizationData = [];
      for (let i = 0; i < getData.length; i++) {
        let temp = {
          id: "",
          name: "",
          displayName: "",
          canHaveGateways: "",
          createdAt: "",
          updatedAt: ""
        };
        temp.id = getData[i].id;
        temp.name = getData[i].name;
        temp.value = getData[i].id;
        temp.label = getData[i].name;
        temp.displayName = getData[i].displayName;
        temp.canHaveGateways = getData[i].canHaveGateways;
        temp.createdAt = getData[i].createdAt;
        temp.updatedAt = getData[i].updatedAt;
        organizationData.push(temp);
      }
      store.commit("options/setOrganizations", organizationData);
    })
    .catch(err => {
      debugger;
      console.log(err);
    });
}

export function getOrganizationID() {
  return store.getters["parameter/getOrganizationID"];
}

export function getOrganizationOptions() {
  return store.getters["options/getOrganizationOptions"];
}

export function getOrganizationNameById(id) {
  let organizations = store.getters["options/getOrganizations"];
  for (let i = 0; i < organizations.length; i++) {
    if (organizations[i].id === id) {
      return organizations[i].name;
    }
  }
}

export function initNetworkServers() {
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
  return store.getters["options/getArea"];
}

export function getCommunicationMode_options() {
  return store.getters["options/getCommunicationMode_options"];
}

export function getBand_options() {
  return store.getters["options/getBand_options"];
}

export function getAreaLabel(province, city, district) {
  let area = store.getters["options/getArea"];
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
  api.serviceProfile
    .getServices({
      limit: 100
    })
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
  store.commit("login/setUser", {
    sessionKey: sessionKey
  });
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
  store.commit("options/setArea", area_options);
}

export function setNetServer(netServerData) {
  store.commit("options/setNetworkServers", netServerData);
}
