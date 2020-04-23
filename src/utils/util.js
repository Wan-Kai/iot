import store from "../store/index";
import api from "./api";

export function initOrganizations() {
  api.organization
    .getOrganizations({
      limit: 100
    })
    .then(res => {
      let getData = res.data.result;

      let organizationData = [];
      let temp = {
        id: "",
        name: "",
        displayName: "",
        canHaveGateways: "",
        createdAt: "",
        updatedAt: ""
      };

      for (let i = 0; i < getData.length; i++) {
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
      console.log(err);
    });
}

export function getOrganizationID() {
  return store.getters.getOrganization;
}

export function getOrganizationOptions() {
  return store.getters.getOrganizationOptions();
}

export function getOrganizationNameById(id) {
  let organizations = store.getters.getOrganizations;
  for (let i = 0; i < organizations.length; i++) {
    if (organizations[i].id === id) {
      return organizations[i].name;
    }
  }
  console.log("错误");
}

export function initNetworkServers() {
  api.networkServer
    .getServerData({
      limit: 100
    })
    .then(res => {
      let getData = res.data.result;

      let netServerData = [];
      let temp = {
        server: "",
        id: "",
        name: ""
      };

      for (let i = 0; i < getData.length; i++) {
        temp.server = getData[i].server;
        temp.id = getData[i].id;
        temp.name = getData[i].name;
        netServerData.push(temp);
      }
      store.commit("options/setNetworkServer", netServerData);
    })
    .catch(err => {
      console.log(err);
    });
}

export function getNetworkServerOptions() {
  return store.getters.getNetworkServerOptions();
}

export function getNetworkServerIdByServer(server) {
  return store.getters.getNetworkServerIdByServer(server);
}

export function getNetworkServerById(id) {
  return store.getters.getNetworkServerById(id);
}

export function getNetworkServerNameById(id) {
  return store.getters.getNetworkServerNameById(id);
}

export function getArea() {
  return store.getters.getArea;
}

export function getAreaLabel(province, city, district) {
  let area = store.getters.getArea;
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
}

export function initServiceOptions() {
  api.serviceProfile
    .getServices({
      limit: 100
    })
    .then(res => {
      let result = res.data.result;

      let options = [];
      let temp = {
        networkServerID: "",
        id: "",
        name: ""
      };

      for (let i = 0; i < result.length; i++) {
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
  return store.getters.getServiceOptions;
}
