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
