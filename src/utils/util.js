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
  return store.getters.getNetServer();
}

export function initServiceOption() {
  api.serviceProfile
    .getServices({
      limit: 100
    })
    .then(res => {
      debugger;
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
      store.commit("util/setNetServer", options);
    })
    .catch(err => {
      console.log(err);
    });
}

export function getServiceOption(networkServerID) {
  return store.getters.getServiceOptions(networkServerID);
}
