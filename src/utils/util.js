import store from "../store/index";
import api from "./api";

export function initNetworkServer() {
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
      store.commit("util/setNetServer", netServerData);
    })
    .catch(err => {
      console.log(err);
    });
}

export function getNetworkServerOption() {
  return store.getters.getNetServer;
}

export function getNetServerOption() {
  return store.getters.getNetServerOption;
}

export function getNetServerIdByServer(server) {
  return store.getters.getNetServerIdByServer(server);
}

export function getArea() {
  return store.getters.getArea;
}

export function getNetServerById(id) {
  return store.getters.getNetServerById(id);
}

export function getNetServerNameById(id) {
  return store.getters.getNetServerNameById(id);
}

export function getOrganizationID() {
  return store.getters.getOrganizationID;
}

export function initServiceOption() {
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
      store.commit("util/setService", options);
    })
    .catch(err => {
      console.log(err);
    });
}

export function getServiceOption() {
  return store.getters.getServiceOptions;
}
